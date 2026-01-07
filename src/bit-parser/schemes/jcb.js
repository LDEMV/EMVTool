/**
 * JCB Card Scheme Bit Definitions
 * Extends EMV base definitions with JCB-specific interpretations
 */

import { EMV_BIT_DEFINITIONS, mergeTagDefinition } from './emv-base.js';

export const JCB_BIT_DEFINITIONS = {
  // TVR (95) - Override specific bits with JCB interpretations
  '95': mergeTagDefinition(EMV_BIT_DEFINITIONS['95'], {
    bytes: [
      { byte: 5, bits: [
        { bit: 'b4', name: 'JCB specific - Reserved for proprietary use' }
      ]}
    ]
  }),
  
  // TSI (9B) - Override specific bits with JCB interpretations
  '9B': mergeTagDefinition(EMV_BIT_DEFINITIONS['9B'], {
    bytes: [
      { byte: 2, bits: [
        { bit: 'b8', name: 'JCB specific - Proprietary authentication performed' }
      ]}
    ]
  })
};

/**
 * You can also add JCB-only tags that don't exist in EMV
 * For example:
 * 
 * '9F50': {
 *   name: 'JCB Proprietary Tag',
 *   bytes: [...]
 * }
 */
