/**
 * TLV Parser for EMV data
 */

import { getTagDefinitions } from '../data/tags.js';

/**
 * Convert a hex string to a byte array
 * @param {string} hex - Hex string
 * @returns {Uint8Array} Byte array
 */
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

/**
 * Convert a byte array to a hex string
 * @param {Uint8Array|number[]} bytes - Byte array
 * @returns {string} Hex string
 */
function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

/**
 * Parse TLV data
 * @param {string|Uint8Array} data - Hex string or byte array of TLV data
 * @returns {Array} Array of TLV objects
 */
export function parseTLV(data) {
  const bytes = typeof data === 'string' ? hexToBytes(data) : data;
  const result = [];
  let offset = 0;

  while (offset < bytes.length) {
    // Parse Tag
    let tag = bytes[offset++];
    const isConstructed = (tag & 0x20) === 0x20;
    
    // Check if it's a multi-byte tag
    // First byte has bits 5-1 set to 1 (0x1F) indicating a multi-byte tag
    if ((tag & 0x1F) === 0x1F) {
      // Multi-byte tag, continue reading while the most significant bit is set
      let nextByte;
      do {
        if (offset >= bytes.length) {
          throw new Error(`Malformed multi-byte tag at position ${offset}. Unexpected end of data.`);
        }
        nextByte = bytes[offset++];
        tag = (tag << 8) | nextByte;
      } while ((nextByte & 0x80) === 0x80 && offset < bytes.length);
    }

    // Parse Length
    if (offset >= bytes.length) {
      throw new Error(`Incomplete TLV structure. Expected length field at position ${offset}, but data ended.`);
    }
    
    let length = bytes[offset++];
    // Check for multi-byte length
    if ((length & 0x80) === 0x80) {
      const lengthBytesCount = length & 0x7F;
      if (lengthBytesCount > 4) {
        throw new Error(`Invalid length field at position ${offset - 1}. Length byte count ${lengthBytesCount} exceeds maximum allowed (4).`);
      }
      length = 0;
      for (let i = 0; i < lengthBytesCount && offset < bytes.length; i++) {
        length = (length << 8) | bytes[offset++];
      }
      
      if (offset >= bytes.length && lengthBytesCount > 0) {
        throw new Error(`Incomplete TLV structure. Expected ${lengthBytesCount} length bytes but data ended.`);
      }
    }

    // Parse Value
    if (offset + length > bytes.length) {
      throw new Error(`Incomplete TLV structure. Expected ${length} value bytes at position ${offset}, but data ended. Only ${bytes.length - offset} bytes remaining.`);
    }

    const value = bytes.slice(offset, offset + length);
    const valueHex = bytesToHex(value);
    offset += length;

    // Check if it's a constructed tag
    let nestedTLVs = null;
    if (isConstructed && length > 0) {
      // Try to parse nested TLVs
      try {
        nestedTLVs = parseTLV(value);
      } catch (e) {
        // Re-throw with context
        throw new Error(`Error parsing nested TLV at tag ${tag.toString(16).toUpperCase()}: ${e.message}`);
      }
    }

    result.push({
      tag: tag.toString(16).toUpperCase().padStart(2, '0'),
      length: length,
      value: valueHex,
      rawValue: value,
      isConstructed: isConstructed,
      nestedTLVs: nestedTLVs
    });
  }

  return result;
}

/**
 * Format TLV data in a tree structure
 * @param {Array} tlvData - Array of TLV objects from parseTLV()
 * @param {string} scheme - Card scheme (EMV, VISA, MASTERCARD, etc.)
 * @param {number} depth - Current depth level for indentation
 * @returns {string} Formatted string in tree structure
 */
export function formatTLVTree(tlvData, scheme = 'EMV', depth = 0) {
  let output = '';
  const indent = '   '.repeat(depth);
  
  tlvData.forEach(item => {
    const description = getTagDescription(item.tag, scheme);
    const lengthPart = `(${item.length.toString().padStart(2, '0')})`;
    
    if (item.isConstructed && item.nestedTLVs && item.nestedTLVs.length > 0) {
      // Constructed tag with nested TLVs that were already parsed
      output += `${indent}|__${item.tag.padEnd(5, ' ')}${lengthPart}==${description}\n`;
      output += formatTLVTree(item.nestedTLVs, scheme, depth + 1);
    } else if (item.isConstructed) {
      // Constructed tag without nested TLVs parsed (try to parse now)
      output += `${indent}|__${item.tag.padEnd(5, ' ')}${lengthPart}==$${description}\n`;
      // Try to parse nested TLVs
      try {
        const nestedTLVs = parseTLV(item.rawValue);
        if (nestedTLVs && nestedTLVs.length > 0) {
          output += formatTLVTree(nestedTLVs, scheme, depth + 1);
        }
      } catch (e) {
        // If parsing fails, just show as primitive
      }
    } else {
      // Primitive tag
      let valueDisplay = item.value;
      // If value is empty, only show the description
      if (!valueDisplay) {
        output += `${indent}|__${item.tag.padEnd(5, ' ')}${lengthPart}==${description}\n`;
      } else {
        output += `${indent}|__${item.tag.padEnd(5, ' ')}${lengthPart}==${valueDisplay}  ${description}\n`;
      }
    }
  });
  
  return output;
}

/**
 * Get description for EMV tag based on card scheme
 * @param {string} tag - Tag in hex format
 * @param {string} scheme - Card scheme
 * @returns {string} Description of the tag
 */
export function getTagDescription(tag, scheme = 'EMV') {
  const tags = getTagDefinitions(scheme);
  return tags[tag.toUpperCase()] || 'Unknown Tag';
}

