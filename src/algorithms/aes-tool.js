/**
 * AES Tool Component
 */
import CryptoJS from 'crypto-js';

export class AESTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="aes-tool">
        <div class="form-group">
          <label for="aes-input">Input Text</label>
          <textarea id="aes-input" placeholder="Enter text to encrypt/decrypt"></textarea>
        </div>
        <div class="form-group">
          <label for="aes-key">Key (16, 24, or 32 characters for AES-128, AES-192, or AES-256)</label>
          <input type="text" id="aes-key" placeholder="Enter encryption key">
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="aes-encrypt">Encrypt</button>
          <button class="btn btn-secondary" id="aes-decrypt">Decrypt</button>
        </div>
        <div class="form-group">
          <label>Result</label>
          <div class="output-area" id="aes-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="aes-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const inputElement = this.container.querySelector('#aes-input');
    const keyElement = this.container.querySelector('#aes-key');
    const outputElement = this.container.querySelector('#aes-output');
    const encryptButton = this.container.querySelector('#aes-encrypt');
    const decryptButton = this.container.querySelector('#aes-decrypt');
    const copyButton = this.container.querySelector('#aes-copy-to-clipboard');

    encryptButton.addEventListener('click', () => {
      const inputValue = inputElement.value;
      const key = keyElement.value;
      
      if (!key) {
        outputElement.textContent = 'Error: Please enter a key';
        return;
      }
      
      try {
        const encrypted = this.encryptAES(inputValue, key);
        outputElement.textContent = encrypted;
      } catch (e) {
        outputElement.textContent = `Error: ${e.message}`;
      }
    });

    decryptButton.addEventListener('click', () => {
      const inputValue = inputElement.value;
      const key = keyElement.value;
      
      if (!key) {
        outputElement.textContent = 'Error: Please enter a key';
        return;
      }
      
      try {
        const decrypted = this.decryptAES(inputValue, key);
        outputElement.textContent = decrypted;
      } catch (e) {
        outputElement.textContent = `Error: ${e.message}`;
      }
    });

    copyButton.addEventListener('click', () => {
      const result = outputElement.textContent;
      if (result) {
        navigator.clipboard.writeText(result).then(() => {
          // Optional: Add visual feedback
          const button = document.getElementById('aes-copy-to-clipboard');
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

  // Encrypt using AES
  encryptAES(message, key) {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    return encrypted;
  }

  // Decrypt using AES
  decryptAES(encryptedMessage, key) {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      throw new Error('Decryption failed. Check your key or input data.');
    }
  }
}

export default AESTool;