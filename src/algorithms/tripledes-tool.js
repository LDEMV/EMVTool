/**
 * 3DES Tool Component
 */
import CryptoJS from 'crypto-js';

export class TripleDESTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="tripledes-tool">
        <div class="form-group">
          <label for="tripledes-input">Input Text</label>
          <textarea id="tripledes-input" placeholder="Enter text to encrypt/decrypt"></textarea>
        </div>
        <div class="form-group">
          <label for="tripledes-key">Key (24 characters for 3DES)</label>
          <input type="text" id="tripledes-key" placeholder="Enter encryption key (24 characters)">
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="tripledes-encrypt">Encrypt</button>
          <button class="btn btn-secondary" id="tripledes-decrypt">Decrypt</button>
        </div>
        <div class="form-group">
          <label>Result</label>
          <div class="output-area" id="tripledes-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="tripledes-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const inputElement = this.container.querySelector('#tripledes-input');
    const keyElement = this.container.querySelector('#tripledes-key');
    const outputElement = this.container.querySelector('#tripledes-output');
    const encryptButton = this.container.querySelector('#tripledes-encrypt');
    const decryptButton = this.container.querySelector('#tripledes-decrypt');
    const copyButton = this.container.querySelector('#tripledes-copy-to-clipboard');

    encryptButton.addEventListener('click', () => {
      const inputValue = inputElement.value;
      const key = keyElement.value;
      
      if (!key) {
        outputElement.textContent = 'Error: Please enter a key';
        return;
      }
      
      try {
        const encrypted = this.encryptTripleDES(inputValue, key);
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
        const decrypted = this.decryptTripleDES(inputValue, key);
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
          const button = document.getElementById('tripledes-copy-to-clipboard');
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

  // Encrypt using 3DES
  encryptTripleDES(message, key) {
    // Ensure key is 24 characters for 3DES
    let paddedKey = key;
    if (key.length < 24) {
      paddedKey = key.padEnd(24, '0');
    } else if (key.length > 24) {
      paddedKey = key.substring(0, 24);
    }
    
    const keyWordArray = CryptoJS.enc.Utf8.parse(paddedKey);
    const encrypted = CryptoJS.TripleDES.encrypt(message, keyWordArray, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return encrypted.toString();
  }

  // Decrypt using 3DES
  decryptTripleDES(encryptedMessage, key) {
    // Ensure key is 24 characters for 3DES
    let paddedKey = key;
    if (key.length < 24) {
      paddedKey = key.padEnd(24, '0');
    } else if (key.length > 24) {
      paddedKey = key.substring(0, 24);
    }
    
    const keyWordArray = CryptoJS.enc.Utf8.parse(paddedKey);
    
    try {
      const decrypted = CryptoJS.TripleDES.decrypt(encryptedMessage, keyWordArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      throw new Error('Decryption failed. Check your key or input data.');
    }
  }
}

export default TripleDESTool;