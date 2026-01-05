/**
 * DES Tool Component
 */
import CryptoJS from 'crypto-js';

export class DESTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="des-tool">
        <div class="form-group">
          <label for="des-input">Input Text</label>
          <textarea id="des-input" placeholder="Enter text to encrypt/decrypt"></textarea>
        </div>
        <div class="form-group">
          <label for="des-key">Key (8 characters for DES)</label>
          <input type="text" id="des-key" placeholder="Enter encryption key (8 characters)">
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="des-encrypt">Encrypt</button>
          <button class="btn btn-secondary" id="des-decrypt">Decrypt</button>
        </div>
        <div class="form-group">
          <label>Result</label>
          <div class="output-area" id="des-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="des-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const inputElement = this.container.querySelector('#des-input');
    const keyElement = this.container.querySelector('#des-key');
    const outputElement = this.container.querySelector('#des-output');
    const encryptButton = this.container.querySelector('#des-encrypt');
    const decryptButton = this.container.querySelector('#des-decrypt');
    const copyButton = this.container.querySelector('#des-copy-to-clipboard');

    encryptButton.addEventListener('click', () => {
      const inputValue = inputElement.value;
      const key = keyElement.value;
      
      if (!key) {
        outputElement.textContent = 'Error: Please enter a key';
        return;
      }
      
      try {
        const encrypted = this.encryptDES(inputValue, key);
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
        const decrypted = this.decryptDES(inputValue, key);
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
          const button = document.getElementById('des-copy-to-clipboard');
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

  // Encrypt using DES
  encryptDES(message, key) {
    // Ensure key is 8 characters for DES
    let paddedKey = key;
    if (key.length < 8) {
      paddedKey = key.padEnd(8, '0');
    } else if (key.length > 8) {
      paddedKey = key.substring(0, 8);
    }
    
    const keyWordArray = CryptoJS.enc.Utf8.parse(paddedKey);
    const encrypted = CryptoJS.DES.encrypt(message, keyWordArray, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return encrypted.toString();
  }

  // Decrypt using DES
  decryptDES(encryptedMessage, key) {
    // Ensure key is 8 characters for DES
    let paddedKey = key;
    if (key.length < 8) {
      paddedKey = key.padEnd(8, '0');
    } else if (key.length > 8) {
      paddedKey = key.substring(0, 8);
    }
    
    const keyWordArray = CryptoJS.enc.Utf8.parse(paddedKey);
    
    try {
      const decrypted = CryptoJS.DES.decrypt(encryptedMessage, keyWordArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      throw new Error('Decryption failed. Check your key or input data.');
    }
  }
}

export default DESTool;