/**
 * Base64 Tool Component
 */

export class Base64Tool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="base64-tool">
        <div class="form-group">
          <label for="base64-input">Input Text</label>
          <textarea id="base64-input" placeholder="Enter text to process"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="base64-encode">Encode</button>
          <button class="btn btn-primary" id="base64-decode">Decode</button>
        </div>
        <div class="form-group">
          <label>Result</label>
          <div class="output-area" id="base64-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="base64-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const inputElement = this.container.querySelector('#base64-input');
    const outputElement = this.container.querySelector('#base64-output');
    const encodeButton = this.container.querySelector('#base64-encode');
    const decodeButton = this.container.querySelector('#base64-decode');
    const copyButton = this.container.querySelector('#base64-copy-to-clipboard');

    encodeButton.addEventListener('click', () => {
      const inputValue = inputElement.value;
      try {
        const encoded = btoa(inputValue);
        outputElement.textContent = encoded;
      } catch (e) {
        outputElement.textContent = `Error: Invalid input for encoding`;
      }
    });

    decodeButton.addEventListener('click', () => {
      const inputValue = inputElement.value;
      try {
        const decoded = atob(inputValue);
        outputElement.textContent = decoded;
      } catch (e) {
        outputElement.textContent = `Error: Invalid base64 string`;
      }
    });

    copyButton.addEventListener('click', () => {
      const result = outputElement.textContent;
      if (result) {
        navigator.clipboard.writeText(result).then(() => {
          // Optional: Add visual feedback
          const button = document.getElementById('base64-copy-to-clipboard');
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
}

export default Base64Tool;