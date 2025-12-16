/**
 * TLV Viewer Component
 */

export class TLVViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="tlv-viewer">
        <div class="input-section">
          <div class="form-group">
            <label for="tlvInput">TLV Data (Hex Format)</label>
            <textarea id="tlvInput" placeholder="Enter TLV hex string, e.g.: 9F26081234567890ABCDEF129F370412345678"></textarea>
          </div>
          
          <!-- Card Scheme Selection -->
          <div class="scheme-selection" style="display: flex; align-items: center; gap: 16px; margin: 16px 0;">
            <label for="cardScheme" style="margin-bottom: 0;">Card Scheme</label>
            <select id="cardScheme" class="form-control" style="max-width: 250px; height: 32px; padding: 4px 12px;">
              <option value="EMV">EMV</option>
              <option value="VISA">VISA</option>
              <option value="MASTERCARD">Mastercard</option>
              <option value="JCB">JCB</option>
              <option value="UNIONPAY">UnionPay</option>
              <option value="DISCOVER">Discover</option>
              <option value="AMEX">AMEX</option>
            </select>
          </div>
          
          <div class="button-group">
            <button id="parseBtn">Parse TLV</button>
            <button id="clearBtn">Clear</button>
            <button id="sampleBtn">Sample</button>
          </div>
        </div>
        <div class="output-section">
          <h3>Parsing Result</h3>
          <pre id="tlvOutput" class="tree-output"></pre>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const parseBtn = this.container.querySelector('#parseBtn');
    const clearBtn = this.container.querySelector('#clearBtn');
    const sampleBtn = this.container.querySelector('#sampleBtn');
    const tlvInput = this.container.querySelector('#tlvInput');
    
    parseBtn.addEventListener('click', () => {
      const scheme = this.container.querySelector('#cardScheme').value;
      this.parseAndDisplay(tlvInput.value, scheme);
    });

    clearBtn.addEventListener('click', () => {
      tlvInput.value = '';
      const output = this.container.querySelector('#tlvOutput');
      output.textContent = '';
    });

    sampleBtn.addEventListener('click', () => {
      // Sample data includes nested structure
      tlvInput.value = "9F0206010203040506BF0C05C1030102039F0306000000000000";
      const scheme = this.container.querySelector('#cardScheme').value;
      this.parseAndDisplay(tlvInput.value, scheme);
    });
  }

  parseAndDisplay(hexData, scheme = 'EMV') {
    try {
      // Remove spaces and other non-hex characters
      const cleanHex = hexData.replace(/[^0-9A-Fa-f]/g, '');
      
      if (cleanHex.length === 0) {
        throw new Error("Please enter TLV format data");
      }
      
      if (cleanHex.length % 2 !== 0) {
        throw new Error("Hexadecimal data length is incorrect, please check input");
      }

      // Import the parser functions dynamically
      import('./utils/tlvParser.js').then((parserModule) => {
        try {
          const parsed = parserModule.parseTLV(cleanHex);
          const formatted = parserModule.formatTLVTree(parsed, scheme);
          
          const output = this.container.querySelector('#tlvOutput');
          output.textContent = formatted;
        } catch (parseError) {
          const output = this.container.querySelector('#tlvOutput');
          output.textContent = `TLV Parsing failed:

Error: ${parseError.message}

Please check your input data.`;
        }
      });
    } catch (error) {
      const output = this.container.querySelector('#tlvOutput');
      output.textContent = `Pre-parsing validation failed:\n\nError: ${error.message}`;
    }
  }
}