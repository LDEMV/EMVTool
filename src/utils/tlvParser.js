/**
 * TLV Parser for EMV data
 */

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
    // Check if it's a multi-byte tag
    if ((tag & 0x1F) === 0x1F) {
      // Multi-byte tag, continue reading while the most significant bit is set
      let nextByte;
      do {
        nextByte = bytes[offset++];
        tag = (tag << 8) | nextByte;
      } while ((nextByte & 0x80) === 0x80 && offset < bytes.length);
    }

    // Parse Length
    if (offset >= bytes.length) break;
    
    let length = bytes[offset++];
    // Check for multi-byte length
    if ((length & 0x80) === 0x80) {
      const lengthBytesCount = length & 0x7F;
      length = 0;
      for (let i = 0; i < lengthBytesCount && offset < bytes.length; i++) {
        length = (length << 8) | bytes[offset++];
      }
    }

    // Parse Value
    if (offset + length > bytes.length) {
      // Incomplete TLV, break
      break;
    }

    const value = bytes.slice(offset, offset + length);
    const valueHex = bytesToHex(value);
    offset += length;

    // Check if value is itself TLV data (constructed tag)
    const isConstructed = (tag & 0x20) === 0x20;
    let nestedTLVs = null;
    
    if (isConstructed && length > 0) {
      // Try to parse nested TLVs
      try {
        nestedTLVs = parseTLV(value);
      } catch (e) {
        // If parsing fails, treat as primitive
        nestedTLVs = null;
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
 * @param {number} depth - Current depth level for indentation
 * @returns {string} Formatted string in tree structure
 */
export function formatTLVTree(tlvData, depth = 0) {
  let output = '';
  const indent = '   '.repeat(depth);
  
  tlvData.forEach(item => {
    const description = getTagDescription(item.tag);
    const tagPart = `${item.tag}${item.isConstructed ? '(constructed)' : ''}`;
    const lengthPart = `(${item.length.toString().padStart(2, '0')})`;
    
    if (item.isConstructed && item.nestedTLVs) {
      // Constructed tag with nested TLVs
      output += `${indent}|__${tagPart}${lengthPart}******${description}******\n`;
      output += formatTLVTree(item.nestedTLVs, depth + 1);
    } else {
      // Primitive tag
      let valueDisplay = item.value;
      // Try to decode certain values
      const decodedValue = decodeValue(item.tag, item.value);
      if (decodedValue) {
        valueDisplay += `  ${decodedValue}`;
      }
      
      output += `${indent}|__${tagPart}${lengthPart}==${valueDisplay}  ${description}\n`;
    }
  });
  
  return output;
}

/**
 * Format TLV data in a human-readable way
 * @param {Array} tlvData - Array of TLV objects from parseTLV()
 * @returns {string} Formatted string
 */
export function formatTLV(tlvData) {
  let output = '';
  tlvData.forEach(item => {
    output += `Tag: ${item.tag}\n`;
    output += `Length: ${item.length}\n`;
    output += `Value: ${item.value}\n`;
    output += '---\n';
  });
  return output;
}

// Common EMV tag descriptions (can be expanded)
const EMV_TAGS = {
  '9F02': 'Amount, Authorized (Numeric)',
  '9F03': 'Amount, Other (Numeric)',
  '9F1A': 'Terminal Country Code',
  '5F2A': 'Transaction Currency Code',
  '9A': 'Transaction Date',
  '9F36': 'Application Transaction Counter (ATC)',
  '9F26': 'Application Cryptogram',
  '9F27': 'Cryptogram Information Data',
  '9F10': 'Issuer Application Data',
  '82': 'Application Interchange Profile',
  '9F34': 'Cardholder Verification Method (CVM) Results',
  '84': 'Dedicated File (DF) Name',
  '9F06': 'Application Identifier (AID) - terminal',
  '9F07': 'Application Usage Control',
  '9F08': 'Application Version Number',
  '9F0D': 'Issuer Action Code - Default',
  '9F0E': 'Issuer Action Code - Denial',
  '9F0F': 'Issuer Action Code - Online',
  '5A': 'Application Primary Account Number (PAN)',
  '5F34': 'Application Primary Account Number (PAN) Sequence Number',
  '9F33': 'Terminal Capabilities',
  '9F1E': 'Interface Device (IFD) Serial Number',
  '9F35': 'Terminal Type',
  'BF0C': 'FCI Issuer Discretionary Data',
  'C1': 'Service Currency Code'
};

/**
 * Get description for EMV tag
 * @param {string} tag - Tag in hex format
 * @returns {string} Description of the tag
 */
export function getTagDescription(tag) {
  return EMV_TAGS[tag.toUpperCase()] || 'Unknown Tag';
}

/**
 * Decode value based on tag type
 * @param {string} tag - Tag in hex format
 * @param {string} value - Value in hex format
 * @returns {string|null} Decoded value or null if not applicable
 */
export function decodeValue(tag, value) {
  try {
    if (tag === '9A') {
      // Transaction Date - YYMMDD
      if (value.length === 6) {
        const year = '20' + value.substring(0, 2);
        const month = value.substring(2, 4);
        const day = value.substring(4, 6);
        return `[${year}-${month}-${day}]`;
      }
    } else if (tag === '9F1A' || tag === '5F2A') {
      // Country Code or Currency Code - 2 bytes
      if (value.length === 4) {
        const code = parseInt(value, 16);
        return `[${code}]`;
      }
    } else if (tag === '9F02' || tag === '9F03') {
      // Amount values - 6 bytes binary
      if (value.length === 12) {
        // Simplified interpretation - in practice would depend on currency exponent
        const amount = parseInt(value, 16) / 100; // Assuming 2 decimal places
        return `[${amount.toFixed(2)}]`;
      }
    } else if (tag === '82') {
      // Application Interchange Profile - 2 bytes
      if (value.length === 4) {
        return `[AIP]`;
      }
    } else if (tag === '9F36') {
      // Application Transaction Counter - 2 bytes
      if (value.length === 4) {
        const atc = parseInt(value, 16);
        return `[ATC: ${atc}]`;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Format TLV data with descriptions
 * @param {Array} tlvData - Array of TLV objects from parseTLV()
 * @returns {string} Formatted string with descriptions
 */
export function formatTLVWithDescriptions(tlvData) {
  let output = '';
  tlvData.forEach(item => {
    const description = getTagDescription(item.tag);
    output += `Tag: ${item.tag} (${description})\n`;
    output += `Length: ${item.length}\n`;
    output += `Value: ${item.value}\n`;
    
    // Try to interpret some common values
    const decodedValue = decodeValue(item.tag, item.value);
    if (decodedValue) {
      output += `  Decoded: ${decodedValue}\n`;
    }
    
    output += '---\n';
  });
  return output;
}