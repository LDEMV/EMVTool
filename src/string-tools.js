/**
 * String Tools Component
 */

export class StringTools {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="string-tools">
        <div class="form-group">
          <label for="string-input">Input Text</label>
          <textarea id="string-input" placeholder="Enter text to process"></textarea>
          <div id="string-input-stats" style="margin-top: 5px; font-size: 14px; color: #666;">Entered Count: 0 bytes (0x00)</div>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="hex-to-utf8">Hex to UTF8</button>
          <button class="btn btn-primary" id="utf8-to-hex">UTF8 to Hex</button>
          <button class="btn btn-primary" id="string-toupper">ToUpper</button>
          <button class="btn btn-primary" id="string-tolower">ToLower</button>
          <button class="btn btn-primary" id="string-add-space">Add Space</button>
          <button class="btn btn-primary" id="string-add-slashx">Add '\\x'</button>
          <button class="btn btn-primary" id="string-remove-slashx">Remove '\\x'</button>
          <button class="btn btn-secondary" id="string-clear">Clear</button>
        </div>
        <div class="form-group">
          <label>Processing Result</label>
          <div class="output-area" id="string-output"></div>
          <div id="string-output-stats" style="margin-top: 5px; font-size: 14px; color: #666;">Result Count: 0 bytes (0x00)</div>
          <div class="output-controls" style="margin-top: 10px;">
            <button class="btn btn-primary" id="copy-result-to-input" style="margin-right: 10px;">Copy to Input</button>
            <button class="btn btn-primary" id="copy-result-to-clipboard">Copy Result</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Get all the elements
    const stringInput = this.container.querySelector('#string-input');
    const stringOutput = this.container.querySelector('#string-output');
    const stringInputStats = this.container.querySelector('#string-input-stats');
    const stringOutputStats = this.container.querySelector('#string-output-stats');
    
    // Update input stats when input changes
    stringInput.addEventListener('input', () => {
      const text = stringInput.value;
      // Calculate effective bytes: 2 hex characters = 1 byte, ignore spaces and \x
      const effectiveText = text.replace(/[\s\\x]/g, '');
      const byteLength = effectiveText.length / 2;
      const isHalfByte = effectiveText.length % 2 !== 0;
      const byteDisplay = isHalfByte ? (effectiveText.length / 2).toFixed(1) : Math.floor(byteLength);
      const hexValue = Math.floor(byteLength).toString(16).toUpperCase().padStart(2, '0');
      stringInputStats.textContent = `Entered Count: ${byteDisplay} bytes (0x${hexValue})`;
    });
    
    // Function to update output stats
    const updateOutputStats = () => {
      const text = stringOutput.textContent || stringOutput.innerText;
      // Calculate effective bytes: 2 hex characters = 1 byte, ignore spaces and \x
      const effectiveText = text.replace(/[\s\\x]/g, '');
      const outputByteLength = effectiveText.length / 2;
      const isOutputHalfByte = effectiveText.length % 2 !== 0;
      const outputByteDisplay = isOutputHalfByte ? (effectiveText.length / 2).toFixed(1) : Math.floor(outputByteLength);
      const outputHexValue = Math.floor(outputByteLength).toString(16).toUpperCase().padStart(2, '0');
      stringOutputStats.textContent = `Result Count: ${outputByteDisplay} bytes (0x${outputHexValue})`;
    };
    
    // Trigger initial stats update
    const initialText = stringInput.value;
    const initialEffectiveText = initialText.replace(/[\s\\x]/g, '');
    const initialByteLength = initialEffectiveText.length / 2;
    const isInitialHalfByte = initialEffectiveText.length % 2 !== 0;
    const initialByteDisplay = isInitialHalfByte ? (initialEffectiveText.length / 2).toFixed(1) : Math.floor(initialByteLength);
    const initialHexValue = Math.floor(initialByteLength).toString(16).toUpperCase().padStart(2, '0');
    stringInputStats.textContent = `Entered Count: ${initialByteDisplay} bytes (0x${initialHexValue})`;
    
    // Update output stats after a delay to allow DOM updates
    setTimeout(updateOutputStats, 0);

    // Copy Result to Input button functionality
    this.container.querySelector('#copy-result-to-input').addEventListener('click', () => {
      const outputText = stringOutput.textContent || stringOutput.innerText;
      stringInput.value = outputText;
      
      // Update input stats
      const effectiveText = outputText.replace(/[\s\\x]/g, '');
      const byteLength = effectiveText.length / 2;
      const isHalfByte = effectiveText.length % 2 !== 0;
      const byteDisplay = isHalfByte ? (effectiveText.length / 2).toFixed(1) : Math.floor(byteLength);
      const hexValue = Math.floor(byteLength).toString(16).toUpperCase().padStart(2, '0');
      stringInputStats.textContent = `Entered Count: ${byteDisplay} bytes (0x${hexValue})`;
    });

    // Copy Result to Clipboard button functionality
    this.container.querySelector('#copy-result-to-clipboard').addEventListener('click', () => {
      const outputText = stringOutput.textContent || stringOutput.innerText;
      navigator.clipboard.writeText(outputText).then(() => {
        // Show user feedback
        const originalText = this.container.querySelector('#copy-result-to-clipboard').textContent;
        this.container.querySelector('#copy-result-to-clipboard').textContent = 'Copied!';
        setTimeout(() => {
          this.container.querySelector('#copy-result-to-clipboard').textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text to clipboard');
      });
    });

    // Basic string processing functions
    this.container.querySelector('#hex-to-utf8').addEventListener('click', () => {
      const hexStr = stringInput.value.trim();
      try {
        // Remove non-hex characters
        const cleanHex = hexStr.replace(/[^0-9a-fA-F]/g, '');
        if (cleanHex.length % 2 !== 0) {
          throw new Error('Hex string length must be even');
        }
        
        // Convert hex to UTF-8
        let result = '';
        for (let i = 0; i < cleanHex.length; i += 2) {
          const byte = cleanHex.substr(i, 2);
          result += String.fromCharCode(parseInt(byte, 16));
        }
        
        // Decode UTF-8 bytes to string
        const utf8String = decodeURIComponent(escape(result));
        stringOutput.textContent = utf8String;
        updateOutputStats();
      } catch (e) {
        stringOutput.textContent = `Error: ${e.message}`;
        updateOutputStats();
      }
    });

    this.container.querySelector('#utf8-to-hex').addEventListener('click', () => {
      const str = stringInput.value;
      try {
        // Encode string to UTF-8 bytes
        const utf8String = unescape(encodeURIComponent(str));
        let hex = '';
        for (let i = 0; i < utf8String.length; i++) {
          const hexChar = utf8String.charCodeAt(i).toString(16).padStart(2, '0');
          hex += hexChar;
        }
        stringOutput.textContent = hex.toUpperCase();
        updateOutputStats();
      } catch (e) {
        stringOutput.textContent = `Error: ${e.message}`;
        updateOutputStats();
      }
    });

    this.container.querySelector('#string-toupper').addEventListener('click', () => {
      const str = stringInput.value;
      try {
        // Remove spaces and line breaks, then convert to uppercase
        const result = str.replace(/[\s\r\n]+/g, '').toUpperCase();
        stringOutput.textContent = result;
        updateOutputStats();
      } catch (e) {
        stringOutput.textContent = `Error: ${e.message}`;
        updateOutputStats();
      }
    });

    this.container.querySelector('#string-tolower').addEventListener('click', () => {
      const str = stringInput.value;
      try {
        // Remove spaces and line breaks, then convert to lowercase
        const result = str.replace(/[\s\r\n]+/g, '').toLowerCase();
        stringOutput.textContent = result;
        updateOutputStats();
      } catch (e) {
        stringOutput.textContent = `Error: ${e.message}`;
        updateOutputStats();
      }
    });

    this.container.querySelector('#string-add-space').addEventListener('click', () => {
      const str = stringInput.value;
      try {
        // Remove spaces and line breaks, then add space every 2 characters
        const cleaned = str.replace(/[\s\r\n]+/g, '');
        const spaced = cleaned.match(/.{1,2}/g)?.join(' ') || '';
        stringOutput.textContent = spaced;
        updateOutputStats();
      } catch (e) {
        stringOutput.textContent = `Error: ${e.message}`;
        updateOutputStats();
      }
    });

    this.container.querySelector('#string-add-slashx').addEventListener('click', () => {
      const str = stringInput.value;
      try {
        // Remove spaces and line breaks
        const cleaned = str.replace(/[\s\r\n]+/g, '');
        
        // Check if it's hex format (contains only hex characters)
        if (/^[0-9a-fA-F]*$/.test(cleaned)) {
          // Add \x prefix every 2 characters without spaces
          const withSlashes = cleaned.match(/.{1,2}/g)?.map(part => '\\x' + part).join('') || '';
          stringOutput.textContent = withSlashes;
        } else {
          // If not hex, convert to hex first then add \x without spaces
          let hex = '';
          for (let i = 0; i < cleaned.length; i++) {
            const hexChar = cleaned.charCodeAt(i).toString(16).padStart(2, '0');
            hex += '\\x' + hexChar;
          }
          stringOutput.textContent = hex.toUpperCase();
        }
        updateOutputStats();
      } catch (e) {
        stringOutput.textContent = `Error: ${e.message}`;
        updateOutputStats();
      }
    });

    this.container.querySelector('#string-remove-slashx').addEventListener('click', () => {
      const str = stringInput.value;
      try {
        // Remove \x prefixes and keep only hex values
        const result = str.replace(/\\x/g, '');
        stringOutput.textContent = result;
        updateOutputStats();
      } catch (e) {
        stringOutput.textContent = `Error: ${e.message}`;
        updateOutputStats();
      }
    });

    // Clear button
    this.container.querySelector('#string-clear').addEventListener('click', () => {
      stringInput.value = '';
      stringOutput.textContent = '';
      
      // Update stats after clearing
      stringInputStats.textContent = 'Entered Count: 0 bytes (0x00)';
      stringOutputStats.textContent = 'Result Count: 0 bytes (0x00)';
    });
  }
}