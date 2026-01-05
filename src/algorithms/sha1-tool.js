/**
 * SHA1 Tool Component
 */

export class SHA1Tool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.inputElement = null;
    this.outputElement = null;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="sha1-tool">
        <div class="form-group">
          <label for="sha1-input">Input Text</label>
          <textarea id="sha1-input" placeholder="Enter text to calculate SHA1"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="sha1-calculate">Calculate</button>
          <button class="btn btn-secondary" id="sha1-clear">Clear</button>
        </div>
        <div class="form-group">
          <label>SHA1 Result</label>
          <div class="output-area" id="sha1-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="sha1-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `;

    // Initialize DOM elements
    this.inputElement = document.getElementById('sha1-input');
    this.outputElement = document.getElementById('sha1-output');

    // Bind events
    this.bindEvents();
  }

  bindEvents() {
    // Calculate SHA1 button
    document.getElementById('sha1-calculate').addEventListener('click', async () => {
      const inputValue = this.inputElement.value;
      if (inputValue.trim()) {
        const result = await this.calculateSHA1(inputValue);
        this.outputElement.textContent = result;
      }
    });

    // Clear button
    document.getElementById('sha1-clear').addEventListener('click', () => {
      this.inputElement.value = '';
      this.outputElement.textContent = '';
    });

    // Copy to clipboard button
    document.getElementById('sha1-copy-to-clipboard').addEventListener('click', () => {
      const result = this.outputElement.textContent;
      if (result) {
        navigator.clipboard.writeText(result).then(() => {
          // Optional: Add visual feedback
          const button = document.getElementById('sha1-copy-to-clipboard');
          const originalText = button.textContent;
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = originalText;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    });
  }

  // Calculate SHA1 hash
  async calculateSHA1(text) {
    // Convert string to ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Calculate SHA-1 hash
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    
    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex.toUpperCase();
  }
}

// 导出组件
export default SHA1Tool;