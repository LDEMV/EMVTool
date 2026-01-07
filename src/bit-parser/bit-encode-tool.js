/**
 * Bit Encode Tool Component
 * Supports checkbox-based bit selection with real-time hex generation
 */

import { BitParser } from './bit-parser.js';

export class BitEncodeTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.bitParser = new BitParser();
    this.currentScheme = 'EMV';
    this.currentTag = '95';
    this.displayMode = 'table'; // 'table' or 'flat'
    this.selectedBits = {}; // Store selected bit states
    this.currentActiveTab = 1; // Track current active tab
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <style>
        .bit-encode-input-row {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          margin-bottom: 12px;
        }
        
        .bit-encode-input-group {
          flex: 1;
        }
        
        .bit-encode-input-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          font-size: 14px;
        }
        
        .bit-encode-input-group select,
        .bit-encode-input-group input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .bit-encode-tab-container {
          margin-top: 20px;
        }
        
        .bit-encode-tabs {
          display: flex;
          gap: 4px;
          border-bottom: 2px solid #e0e0e0;
          margin-bottom: 16px;
        }
        
        .bit-encode-tab {
          padding: 10px 20px;
          background-color: #f5f5f5;
          border: none;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          transition: all 0.2s;
        }
        
        .bit-encode-tab:hover {
          background-color: #E8F0FE;
        }
        
        .bit-encode-tab.active {
          background-color: #3367D6;
          color: white;
          font-weight: 600;
        }
        
        .bit-encode-tab-content {
          display: none;
        }
        
        .bit-encode-tab-content.active {
          display: block;
        }
        
        .bit-encode-controls {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .view-mode-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }
        
        .toggle-switch {
          position: relative;
          width: 50px;
          height: 24px;
          background-color: #ccc;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .toggle-switch.active {
          background-color: #3367D6;
        }
        
        .toggle-slider {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.3s;
        }
        
        .toggle-switch.active .toggle-slider {
          transform: translateX(26px);
        }
        
        .bit-encode-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          font-size: 13px;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .bit-encode-table thead {
          background-color: #f5f5f5;
        }
        
        .bit-encode-table th,
        .bit-encode-table td {
          padding: 8px 10px;
          text-align: left;
          border: 1px solid #999;
        }
        
        .bit-encode-table th {
          font-weight: 600;
          color: #333;
          background-color: #f8f8f8;
        }
        
        .bit-encode-table .bit-checkbox-cell {
          text-align: center;
          min-width: 40px;
        }
        
        .bit-encode-table input[type="checkbox"] {
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
        
        .bit-encode-flat {
          margin-top: 16px;
        }
        
        .flat-byte-section {
          margin-bottom: 24px;
        }
        
        .flat-byte-title {
          font-weight: bold;
          margin-bottom: 12px;
          font-size: 15px;
        }
        
        .flat-encode-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        
        .flat-encode-table th,
        .flat-encode-table td {
          padding: 8px 12px;
          text-align: left;
          border: 1px solid #999;
        }
        
        .flat-encode-table th {
          background-color: #f5f5f5;
          font-weight: 600;
        }
        
        .flat-encode-table .bit-checkbox-cell {
          text-align: center;
          width: 50px;
        }
        
        .hex-output-area {
          margin-top: 20px;
          padding: 16px;
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          font-weight: bold;
          color: #3367D6;
          text-align: center;
        }
        
        .hex-output-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 8px;
        }
        
        .hex-output-value {
          font-size: 20px;
          letter-spacing: 2px;
        }
      </style>
      
      <div class="bit-encode-tool">
        <div class="bit-encode-input-row">
          <div class="bit-encode-input-group" style="flex: 0 0 400px;">
            <label for="bit-encode-tag">Tag</label>
            <select id="bit-encode-tag">
              <option value="95">95 - TVR (Terminal Verification Results)</option>
              <option value="9B">9B - TSI (Transaction Status Information)</option>
            </select>
          </div>
        </div>
        
        <div class="bit-encode-input-row">
          <div class="bit-encode-input-group" style="flex: 0 0 400px;">
            <label for="bit-encode-scheme">Card Scheme</label>
            <select id="bit-encode-scheme">
              <option value="EMV">EMV</option>
              <option value="JCB">JCB</option>
              <option value="VISA">VISA</option>
              <option value="MASTERCARD">Mastercard</option>
              <option value="UNIONPAY">UnionPay</option>
              <option value="DISCOVER">Discover</option>
              <option value="AMEX">AMEX</option>
            </select>
          </div>
        </div>
        
        <div class="hex-output-area">
          <div class="hex-output-label">Generated Hex Value:</div>
          <div class="hex-output-value" id="bit-encode-hex-output">0000000000</div>
        </div>
        
        <div class="bit-encode-controls" style="margin-top: 20px;">
          <button class="btn btn-secondary" id="bit-encode-clear">Clear All</button>
          <button class="btn btn-primary" id="bit-encode-copy">Copy Hex</button>
          
          <div class="view-mode-toggle">
            <span>Flat</span>
            <div class="toggle-switch" id="encode-view-mode-toggle">
              <div class="toggle-slider"></div>
            </div>
          </div>
        </div>
        
        <div id="bit-encode-content"></div>
      </div>
    `;

    this.bindEvents();
    this.renderBitSelector();
  }

  bindEvents() {
    const tagElement = this.container.querySelector('#bit-encode-tag');
    const schemeElement = this.container.querySelector('#bit-encode-scheme');
    const clearButton = this.container.querySelector('#bit-encode-clear');
    const copyButton = this.container.querySelector('#bit-encode-copy');
    const toggleSwitch = this.container.querySelector('#encode-view-mode-toggle');

    // Tag selection change
    tagElement.addEventListener('change', (e) => {
      this.currentTag = e.target.value;
      this.selectedBits = {};
      this.currentActiveTab = 1; // Reset to first tab
      this.renderBitSelector();
    });

    // Scheme selection change
    schemeElement.addEventListener('change', (e) => {
      this.currentScheme = e.target.value;
      this.bitParser.setCardScheme(this.currentScheme);
      this.selectedBits = {};
      this.currentActiveTab = 1; // Reset to first tab
      this.renderBitSelector();
    });

    // View mode toggle
    toggleSwitch.addEventListener('click', () => {
      toggleSwitch.classList.toggle('active');
      this.displayMode = toggleSwitch.classList.contains('active') ? 'flat' : 'table';
      this.renderBitSelector();
    });

    // Clear button
    clearButton.addEventListener('click', () => {
      this.selectedBits = {};
      this.currentActiveTab = 1; // Reset to first tab
      this.renderBitSelector();
      this.updateHexOutput();
    });

    // Copy button
    copyButton.addEventListener('click', () => {
      const hexValue = this.container.querySelector('#bit-encode-hex-output').textContent;
      navigator.clipboard.writeText(hexValue).then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 2000);
      });
    });
  }

  renderBitSelector() {
    const contentElement = this.container.querySelector('#bit-encode-content');
    
    // Get tag definition
    const schemeDefs = this.bitParser.bitDefinitions[this.currentScheme] || this.bitParser.bitDefinitions['EMV'];
    const tagDef = schemeDefs?.[this.currentTag];
    
    if (!tagDef) {
      contentElement.innerHTML = '<p style="color: #d9534f;">No bit definition found for this tag and scheme combination.</p>';
      return;
    }

    if (this.displayMode === 'table') {
      this.renderTableView(tagDef, contentElement);
    } else {
      this.renderFlatView(tagDef, contentElement);
    }
  }

  renderTableView(tagDef, outputElement) {
    const numBytes = tagDef.bytes.length;
    
    let html = '<div class="bit-encode-tab-container">';
    html += '<div class="bit-encode-tabs">';
    
    // Create tab buttons for each byte
    for (let i = 1; i <= numBytes; i++) {
      html += `<button class="bit-encode-tab ${i === this.currentActiveTab ? 'active' : ''}" data-byte="${i}">Byte ${i}</button>`;
    }
    html += '</div>';
    
    const bitPositions = ['b8', 'b7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1'];
    
    // Create content for each byte tab
    for (let byteNum = 1; byteNum <= numBytes; byteNum++) {
      html += `<div class="bit-encode-tab-content ${byteNum === this.currentActiveTab ? 'active' : ''}" data-byte="${byteNum}">`;
      html += '<table class="bit-encode-table">';
      html += '<thead><tr>';
      html += '<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>';
      html += '<th>Meaning</th>';
      html += '</tr></thead>';
      html += '<tbody>';
      
      const byteDef = tagDef.bytes.find(b => b.byte === byteNum);
      
      if (byteDef) {
        // Render each bit in this byte
        for (const bitPos of bitPositions) {
          const bitDef = byteDef.bits.find(b => b.bit === bitPos);
          if (bitDef) {
            const bitKey = `${byteNum}-${bitPos}`;
            const isChecked = this.selectedBits[bitKey] || false;
            const rowStyle = isChecked ? ' style="background-color: #90EE90;"' : '';
            
            html += `<tr${rowStyle}>`;
            
            // Add checkbox cells
            for (const pos of bitPositions) {
              if (pos === bitPos) {
                html += `<td class="bit-checkbox-cell">
                  <input type="checkbox" data-byte="${byteNum}" data-bit="${bitPos}" ${isChecked ? 'checked' : ''}>
                </td>`;
              } else {
                html += '<td class="bit-checkbox-cell"></td>';
              }
            }
            
            html += `<td>${bitDef.name}</td>`;
            html += '</tr>';
          }
        }
      }
      
      html += '</tbody></table>';
      html += '</div>';
    }
    
    html += '</div>';
    outputElement.innerHTML = html;
    
    // Bind tab click events
    this.bindTabEvents(outputElement);
    // Bind checkbox events
    this.bindCheckboxEvents(outputElement);
  }

  renderFlatView(tagDef, outputElement) {
    const bitPositions = ['b8', 'b7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1'];
    
    let html = '<div class="bit-encode-flat">';
    
    for (const byteDef of tagDef.bytes) {
      html += '<div class="flat-byte-section">';
      html += `<div class="flat-byte-title">Byte ${byteDef.byte} ${byteDef.byte === 1 ? '(Leftmost)' : ''}:</div>`;
      html += '<table class="flat-encode-table">';
      html += '<thead><tr>';
      html += '<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>';
      html += '<th>Meaning</th>';
      html += '</tr></thead>';
      html += '<tbody>';
      
      // Render each bit
      for (const bitPos of bitPositions) {
        const bitDef = byteDef.bits.find(b => b.bit === bitPos);
        if (bitDef) {
          const bitKey = `${byteDef.byte}-${bitPos}`;
          const isChecked = this.selectedBits[bitKey] || false;
          const rowStyle = isChecked ? ' style="background-color: #90EE90;"' : '';
          
          html += `<tr${rowStyle}>`;
          
          // Add checkbox cells
          for (const pos of bitPositions) {
            if (pos === bitPos) {
              html += `<td class="bit-checkbox-cell">
                <input type="checkbox" data-byte="${byteDef.byte}" data-bit="${bitPos}" ${isChecked ? 'checked' : ''}>
              </td>`;
            } else {
              html += '<td class="bit-checkbox-cell"></td>';
            }
          }
          
          html += `<td>${bitDef.name}</td>`;
          html += '</tr>';
        }
      }
      
      html += '</tbody></table>';
      html += '</div>';
    }
    
    html += '</div>';
    outputElement.innerHTML = html;
    
    // Bind checkbox events
    this.bindCheckboxEvents(outputElement);
  }

  bindTabEvents(outputElement) {
    const tabs = outputElement.querySelectorAll('.bit-encode-tab');
    const contents = outputElement.querySelectorAll('.bit-encode-tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetByte = parseInt(tab.getAttribute('data-byte'));
        
        // Save current active tab
        this.currentActiveTab = targetByte;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        contents.forEach(c => {
          c.classList.remove('active');
          if (parseInt(c.getAttribute('data-byte')) === targetByte) {
            c.classList.add('active');
          }
        });
      });
    });
  }

  bindCheckboxEvents(outputElement) {
    const checkboxes = outputElement.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const byte = e.target.getAttribute('data-byte');
        const bit = e.target.getAttribute('data-bit');
        const bitKey = `${byte}-${bit}`;
        
        if (e.target.checked) {
          this.selectedBits[bitKey] = true;
        } else {
          delete this.selectedBits[bitKey];
        }
        
        this.updateHexOutput();
        
        // Update row highlighting without re-rendering entire view
        const row = e.target.closest('tr');
        if (e.target.checked) {
          row.style.backgroundColor = '#90EE90';
        } else {
          row.style.backgroundColor = '';
        }
      });
    });
  }

  updateHexOutput() {
    const hexOutputElement = this.container.querySelector('#bit-encode-hex-output');
    
    // Get tag definition to know how many bytes
    const schemeDefs = this.bitParser.bitDefinitions[this.currentScheme] || this.bitParser.bitDefinitions['EMV'];
    const tagDef = schemeDefs?.[this.currentTag];
    
    if (!tagDef) {
      hexOutputElement.textContent = 'Error';
      return;
    }
    
    // Convert selected bits to bit values array
    const bitValues = [];
    for (const bitKey in this.selectedBits) {
      const [byte, bit] = bitKey.split('-');
      bitValues.push({
        byte: parseInt(byte),
        bit: bit,
        value: 1
      });
    }
    
    // Use BitParser to encode
    const result = this.bitParser.encodeBits(this.currentTag, bitValues);
    
    if (result.error) {
      hexOutputElement.textContent = 'Error';
    } else {
      hexOutputElement.textContent = result.hex;
    }
  }
}

export default BitEncodeTool;
