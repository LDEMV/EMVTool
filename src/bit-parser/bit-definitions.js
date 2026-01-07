/**
 * Bit Definitions Manager
 * Dynamically loads bit definitions for different card schemes
 * Each card scheme is maintained in a separate file under schemes/
 */

import { EMV_BIT_DEFINITIONS } from './schemes/emv-base.js';
import { JCB_BIT_DEFINITIONS } from './schemes/jcb.js';
import { VISA_BIT_DEFINITIONS } from './schemes/visa.js';

/**
 * Central registry of all card scheme definitions
 * Add new schemes here after creating their definition files
 */
export const BIT_DEFINITIONS = {
  'EMV': EMV_BIT_DEFINITIONS,
  'JCB': JCB_BIT_DEFINITIONS,
  'VISA': VISA_BIT_DEFINITIONS,
  // Add more schemes here:
  // 'MASTERCARD': MASTERCARD_BIT_DEFINITIONS,
  // 'UNIONPAY': UNIONPAY_BIT_DEFINITIONS,
  // 'DISCOVER': DISCOVER_BIT_DEFINITIONS,
  // 'AMEX': AMEX_BIT_DEFINITIONS,
};

/**
 * Get bit definitions for a specific tag and card scheme
 * @param {string} tag - Tag identifier
 * @param {string} scheme - Card scheme (EMV, JCB, VISA, etc.)
 * @returns {Object} Bit definitions for the specified tag
 */
export function getBitDefinitions(tag, scheme = 'EMV') {
  const schemeDefs = BIT_DEFINITIONS[scheme] || BIT_DEFINITIONS['EMV'];
  return schemeDefs[tag] || null;
}
