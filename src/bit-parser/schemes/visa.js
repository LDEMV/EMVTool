/**
 * VISA Card Scheme Bit Definitions
 * Extends EMV base definitions with VISA-specific interpretations
 * 
 * This is a template - actual VISA-specific bit meanings should be 
 * referenced from official VISA specifications
 */

import { EMV_BIT_DEFINITIONS, mergeTagDefinition } from './emv-base.js';

export const VISA_BIT_DEFINITIONS = {
  // TVR (95) - Currently uses EMV standard
  // Override specific bits if VISA has different interpretations
  '95': EMV_BIT_DEFINITIONS['95'],
  
  // TSI (9B) - Currently uses EMV standard
  '9B': EMV_BIT_DEFINITIONS['9B']
  
  /**
   * Example of overriding specific bits:
   * 
   * '95': mergeTagDefinition(EMV_BIT_DEFINITIONS['95'], {
   *   bytes: [
   *     { byte: 5, bits: [
   *       { bit: 'b4', name: 'VISA specific - Some proprietary meaning' }
   *     ]}
   *   ]
   * }),
   */
};
