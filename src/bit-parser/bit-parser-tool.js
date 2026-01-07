/**
 * Bit Parser Tool Component with Sub Tabs
 */

import { BitDecodeTool } from './bit-decode-tool.js';
import { BitEncodeTool } from './bit-encode-tool.js';

export class BitParserTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    // The HTML for this component is handled in the main index.html
    // This class just serves as a placeholder to maintain the import structure
    // The actual functionality is handled by BitDecodeTool and BitEncodeTool
  }
}

export default BitParserTool;