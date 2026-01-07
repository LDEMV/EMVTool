/**
 * EMV Base Bit Definitions
 * Standard EMV specification bit definitions
 * This serves as the base for all card schemes
 */

export const EMV_BIT_DEFINITIONS = {
  // Terminal Verification Results (95)
  '95': {
    name: 'TVR (Terminal Verification Results)',
    bytes: [
      { byte: 1, bits: [
        { bit: 'b8', name: 'Offline data authentication was not performed' },
        { bit: 'b7', name: 'SDA failed' },
        { bit: 'b6', name: 'ICC data missing' },
        { bit: 'b5', name: 'Card appears on terminal exception file' },
        { bit: 'b4', name: 'DDA failed' },
        { bit: 'b3', name: 'CDA failed' },
        { bit: 'b2', name: 'SDA selected' },
        { bit: 'b1', name: 'RFU' }
      ]},
      { byte: 2, bits: [
        { bit: 'b8', name: 'ICC and terminal have different application versions' },
        { bit: 'b7', name: 'Expired application' },
        { bit: 'b6', name: 'Application not yet effective' },
        { bit: 'b5', name: 'Service not allowed for card product' },
        { bit: 'b4', name: 'New card' },
        { bit: 'b3', name: 'RFU' },
        { bit: 'b2', name: 'RFU' },
        { bit: 'b1', name: 'RFU' }
      ]},
      { byte: 3, bits: [
        { bit: 'b8', name: 'Cardholder verification was not successful' },
        { bit: 'b7', name: 'Unrecognised CVM' },
        { bit: 'b6', name: 'PIN try limit exceeded' },
        { bit: 'b5', name: 'PIN entry required and PIN pad not present or not working' },
        { bit: 'b4', name: 'PIN entry required, PIN pad present, but PIN was not entered' },
        { bit: 'b3', name: 'Online PIN entered' },
        { bit: 'b2', name: 'RFU' },
        { bit: 'b1', name: 'RFU' }
      ]},
      { byte: 4, bits: [
        { bit: 'b8', name: 'Transaction exceeds floor limit' },
        { bit: 'b7', name: 'Lower consecutive offline limit exceeded' },
        { bit: 'b6', name: 'Upper consecutive offline limit exceeded' },
        { bit: 'b5', name: 'Transaction selected randomly for online processing' },
        { bit: 'b4', name: 'Merchant forced transaction online' },
        { bit: 'b3', name: 'RFU' },
        { bit: 'b2', name: 'RFU' },
        { bit: 'b1', name: 'RFU' }
      ]},
      { byte: 5, bits: [
        { bit: 'b8', name: 'Default TDOL used' },
        { bit: 'b7', name: 'Issuer authentication failed' },
        { bit: 'b6', name: 'Script processing failed before final GENERATE AC' },
        { bit: 'b5', name: 'Script processing failed after final GENERATE AC' },
        { bit: 'b4', name: 'RFU' },
        { bit: 'b3', name: 'RFU' },
        { bit: 'b2', name: 'RFU' },
        { bit: 'b1', name: 'RFU' }
      ]}
    ]
  },
  
  // Transaction Status Information (9B)
  '9B': {
    name: 'TSI (Transaction Status Information)',
    bytes: [
      { byte: 1, bits: [
        { bit: 'b8', name: 'Offline data authentication was performed' },
        { bit: 'b7', name: 'Cardholder verification was performed' },
        { bit: 'b6', name: 'Card risk management was performed' },
        { bit: 'b5', name: 'Issuer authentication was performed' },
        { bit: 'b4', name: 'Terminal risk management was performed' },
        { bit: 'b3', name: 'Script processing was performed' },
        { bit: 'b2', name: 'RFU' },
        { bit: 'b1', name: 'RFU' }
      ]},
      { byte: 2, bits: [
        { bit: 'b8', name: 'RFU' },
        { bit: 'b7', name: 'RFU' },
        { bit: 'b6', name: 'RFU' },
        { bit: 'b5', name: 'RFU' },
        { bit: 'b4', name: 'RFU' },
        { bit: 'b3', name: 'RFU' },
        { bit: 'b2', name: 'RFU' },
        { bit: 'b1', name: 'RFU' }
      ]}
    ]
  }
};

/**
 * Helper function to deep clone tag definitions
 * Used when extending base definitions
 */
export function cloneTagDefinition(tagDef) {
  return JSON.parse(JSON.stringify(tagDef));
}

/**
 * Helper function to merge bit definitions
 * Allows overriding specific bits while keeping others from base
 * @param {Object} baseTag - Base tag definition
 * @param {Object} overrides - Overrides for specific bytes/bits
 * @returns {Object} Merged tag definition
 */
export function mergeTagDefinition(baseTag, overrides) {
  const result = cloneTagDefinition(baseTag);
  
  if (overrides.name) {
    result.name = overrides.name;
  }
  
  if (overrides.bytes) {
    overrides.bytes.forEach(overrideByte => {
      const targetByte = result.bytes.find(b => b.byte === overrideByte.byte);
      if (targetByte && overrideByte.bits) {
        overrideByte.bits.forEach(overrideBit => {
          const targetBit = targetByte.bits.find(b => b.bit === overrideBit.bit);
          if (targetBit) {
            targetBit.name = overrideBit.name;
          }
        });
      }
    });
  }
  
  return result;
}
