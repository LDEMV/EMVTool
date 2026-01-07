/**
 * Bit Parser Module
 * Handles bit decoding and encoding for EMV tags
 */

import { getTagDefinitions } from '../data/tags.js';
import { BIT_DEFINITIONS } from './bit-definitions.js';

export class BitParser {
  constructor() {
    this.currentScheme = 'EMV';
    this.bitDefinitions = BIT_DEFINITIONS; // Expose for external access
  }

  // Set the card scheme for bit parsing
  setCardScheme(scheme) {
    this.currentScheme = scheme;
  }

  // Decode bits for a specific tag
  decodeBits(tag, hexString) {
    // Get definitions for current scheme, fallback to EMV
    const schemeDefs = BIT_DEFINITIONS[this.currentScheme] || BIT_DEFINITIONS['EMV'];
    const tagDef = schemeDefs[tag];
    
    if (!tagDef) {
      return { error: `No bit definition found for tag ${tag} in ${this.currentScheme} scheme` };
    }
    
    // Convert hex string to binary
    const binary = this.hexToBinary(hexString);
    
    // Parse bits according to definition
    const result = [];
    
    // Process each byte definition
    for (let i = 0; i < tagDef.bytes.length; i++) {
      const byteDef = tagDef.bytes[i];
      const byteStart = i * 8;
      const byteEnd = byteStart + 8;
      
      // Check if we have enough bits
      if (byteEnd > binary.length) {
        break;
      }
      
      // Process each bit in the byte
      for (let j = 0; j < 8; j++) {
        const bitPos = 7 - j; // b8 to b1
        const bitIndex = byteStart + bitPos;
        
        if (bitIndex < binary.length) {
          const bitValue = binary[bitIndex];
          const bitName = `b${8-j}`;
          
          // Find if this bit has a definition in the byte
          const bitDef = byteDef.bits.find(b => b.bit === bitName);
          if (bitDef) {
            result.push({
              byte: i + 1,
              bit: bitName,
              value: parseInt(bitValue),
              meaning: bitDef.name
            });
          }
        }
      }
    }
    
    return {
      tag: tag,
      hex: hexString,
      binary: binary,
      results: result
    };
  }

  // Encode bits for a specific tag
  encodeBits(tag, bitValues) {
    // Get definitions for current scheme, fallback to EMV
    const schemeDefs = BIT_DEFINITIONS[this.currentScheme] || BIT_DEFINITIONS['EMV'];
    const tagDef = schemeDefs[tag];
    
    if (!tagDef) {
      return { error: `No bit definition found for tag ${tag} in ${this.currentScheme} scheme` };
    }
    
    // Initialize binary array with zeros
    const binaryLength = tagDef.bytes.length * 8;
    let binary = Array(binaryLength).fill('0');
    
    // Set bit values according to input
    for (const bitValue of bitValues) {
      const { byte, bit, value } = bitValue;
      const byteIndex = byte - 1;
      // bit format is 'b8', 'b7', etc.
      // b8 is bit position 0 (leftmost in byte), b1 is bit position 7 (rightmost)
      const bitNumber = parseInt(bit.substring(1)); // Extract number from 'b8' -> 8
      const bitPos = 8 - bitNumber; // b8 -> 0, b7 -> 1, ..., b1 -> 7
      const bitIndex = byteIndex * 8 + bitPos;
      
      if (bitIndex < binaryLength) {
        binary[bitIndex] = value.toString();
      }
    }
    
    // Convert binary to hex
    const hex = this.binaryToHex(binary.join(''));
    
    return {
      tag: tag,
      hex: hex,
      binary: binary.join(''),
      bitValues: bitValues
    };
  }

  // Helper: Convert hex to binary
  hexToBinary(hex) {
    return hex.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
  }

  // Helper: Convert binary to hex
  binaryToHex(binary) {
    const hex = [];
    for (let i = 0; i < binary.length; i += 4) {
      const chunk = binary.substr(i, 4);
      hex.push(parseInt(chunk, 2).toString(16).toUpperCase());
    }
    return hex.join('');
  }
}

// Export as default
export default BitParser;