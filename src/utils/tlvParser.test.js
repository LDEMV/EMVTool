/**
 * Test file for TLV parser
 */

import { parseTLV, formatTLV, formatTLVWithDescriptions } from './tlvParser.js';

// Simple test case
const sampleTLV = "9F0206000000000100820239009F36020001";

console.log("Parsing TLV:", sampleTLV);
const parsed = parseTLV(sampleTLV);
console.log("Parsed TLV:");
console.log(parsed);

console.log("\nFormatted TLV:");
console.log(formatTLV(parsed));

console.log("\nFormatted TLV with descriptions:");
console.log(formatTLVWithDescriptions(parsed));