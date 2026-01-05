/**
 * MD5 Tool Component
 */
import CryptoJS from 'crypto-js';

export class MD5Tool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="md5-tool">
        <div class="form-group">
          <label for="md5-input">Input Text</label>
          <textarea id="md5-input" placeholder="Enter text to process"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="md5-calculate">Calculate</button>
        </div>
        <div class="form-group">
          <label>MD5 Result</label>
          <div class="output-area" id="md5-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="md5-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const inputElement = this.container.querySelector('#md5-input');
    const outputElement = this.container.querySelector('#md5-output');
    const calculateButton = this.container.querySelector('#md5-calculate');
    const copyButton = this.container.querySelector('#md5-copy-to-clipboard');

    calculateButton.addEventListener('click', async () => {
      const inputValue = inputElement.value;
      try {
        const hash = await this.calculateMD5(inputValue);
        outputElement.textContent = hash;
      } catch (e) {
        outputElement.textContent = `Error: ${e.message}`;
      }
    });

    copyButton.addEventListener('click', () => {
      const result = outputElement.textContent;
      if (result) {
        navigator.clipboard.writeText(result).then(() => {
          // Optional: Add visual feedback
          const button = document.getElementById('md5-copy-to-clipboard');
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

  // Calculate MD5 hash using crypto-js library
  async calculateMD5(message) {
    return CryptoJS.MD5(message).toString().toUpperCase();
  }
}

export default MD5Tool;