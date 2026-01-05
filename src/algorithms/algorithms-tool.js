/**
 * Algorithms Tool Component
 */

import { SHA1Tool } from './sha1-tool.js';
import { Base64Tool } from './base64-tool.js';
import { MD5Tool } from './md5-tool.js';

export class AlgorithmsTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentTool = null;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="algorithms-tool">
        <div class="form-group">
          <label>Select Algorithm</label>
          <select id="algorithm-selector" class="form-control" style="width: 300px;">
            <option value="sha1">SHA1</option>
            <option value="base64">Base64</option>
            <option value="md5">MD5</option>
          </select>
        </div>
        <div id="algorithm-container"></div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const algorithmSelector = this.container.querySelector('#algorithm-selector');
    const algorithmContainer = this.container.querySelector('#algorithm-container');
    
    // Initialize with the default algorithm (SHA1)
    this.loadAlgorithm('sha1');
    
    // Change algorithm when selection changes
    algorithmSelector.addEventListener('change', (e) => {
      this.loadAlgorithm(e.target.value);
    });
  }

  loadAlgorithm(algorithmType) {
    // Clear the algorithm container
    const algorithmContainer = this.container.querySelector('#algorithm-container');
    algorithmContainer.innerHTML = '';

    // Create a new instance of the selected algorithm tool
    switch (algorithmType) {
      case 'sha1':
        this.currentTool = new SHA1Tool('algorithm-container');
        break;
      case 'base64':
        this.currentTool = new Base64Tool('algorithm-container');
        break;
      case 'md5':
        this.currentTool = new MD5Tool('algorithm-container');
        break;
      default:
        console.error(`Unknown algorithm type: ${algorithmType}`);
        break;
    }
  }
}