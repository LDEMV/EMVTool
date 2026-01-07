/**
 * Bit Decode Tool Component
 */

import { BitParser } from './bit-parser.js';

export class BitDecodeTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.bitParser = new BitParser();
    this.currentScheme = 'EMV';
    this.currentTag = '95';
    this.displayMode = 'table'; // 'table' or 'flat'
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <style>
        .bit-decode-input-row {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          margin-bottom: 12px;
        }
        
        .bit-decode-input-group {
          flex: 1;
        }
        
        .bit-decode-input-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          font-size: 14px;
        }
        
        .bit-decode-input-group input,
        .bit-decode-input-group select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .bit-decode-tab-container {
          margin-top: 20px;
        }
        
        .bit-decode-tabs {
          display: flex;
          gap: 4px;
          border-bottom: 2px solid #e0e0e0;
          margin-bottom: 16px;
        }
        
        .bit-decode-tab {
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
        
        .bit-decode-tab:hover {
          background-color: #E8F0FE;
        }
        
        .bit-decode-tab.active {
          background-color: #3367D6;
          color: white;
          font-weight: 600;
        }
        
        .bit-decode-tab-content {
          display: none;
        }
        
        .bit-decode-tab-content.active {
          display: block;
        }
        
        .bit-decode-controls {
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
        
        .bit-result-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          font-size: 13px;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .bit-result-table thead {
          background-color: #f5f5f5;
        }
        
        .bit-result-table th,
        .bit-result-table td {
          padding: 8px 10px;
          text-align: left;
          border: 1px solid #999;
        }
        
        .bit-result-table th {
          font-weight: 600;
          color: #333;
          background-color: #f8f8f8;
        }
        
        .bit-result-table .byte-header {
          color: #3367D6;
          text-align: center;
          font-size: 14px;
        }
        
        .bit-result-table tbody tr:hover {
          background-color: #f9f9f9;
        }
        
        .bit-result-table tbody tr.highlight {
          background-color: #90EE90;
        }
        
        .bit-result-table tbody tr.highlight:hover {
          background-color: #7FDD7F;
        }
        
        .bit-cell {
          text-align: center;
          min-width: 40px;
          font-family: 'Courier New', monospace;
        }
        
        .bit-cell.active {
          font-weight: bold;
        }
        
        .bit-meaning-cell {
          padding-left: 16px !important;
        }
        
        .bit-result-flat {
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
        
        .flat-bit-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        
        .flat-bit-table th,
        .flat-bit-table td {
          padding: 8px 12px;
          text-align: left;
          border: 1px solid #999;
        }
        
        .flat-bit-table th {
          background-color: #f5f5f5;
          font-weight: 600;
        }
        
        .flat-bit-table .bit-cell {
          text-align: center;
          width: 50px;
        }
        
        .flat-bit-table tbody tr.highlight {
          background-color: #90EE90;
        }
        
        .flat-bit-table tbody tr.highlight:hover {
          background-color: #7FDD7F;
        }
        
        .flat-bit-table .bit-cell.active {
          font-weight: bold;
        }
      </style>
      
      <div class="bit-decode-tool">
        <div class="bit-decode-input-row">
          <div class="bit-decode-input-group" style="flex: 0 0 400px;">
            <label for="bit-decode-tag">Tag</label>
            <select id="bit-decode-tag">
              <option value="95">95 - TVR (Terminal Verification Results)</option>
              <option value="9B">9B - TSI (Transaction Status Information)</option>
            </select>
          </div>
        </div>
        
        <div class="bit-decode-input-row">
          <div class="bit-decode-input-group" style="flex: 0 0 400px;">
            <label for="bit-decode-scheme">Card Scheme</label>
            <select id="bit-decode-scheme">
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
        
        <div class="bit-decode-input-row">
          <div class="bit-decode-input-group">
            <label for="bit-decode-input" id="bit-decode-input-label">Input Value (Hex)</label>
            <input type="text" id="bit-decode-input" placeholder="e.g., 2121212121" value="2121212121">
            <div id="bit-decode-length" style="font-size: 12px; color: #666; margin-top: 4px;">Length: 5 bytes</div>
          </div>
        </div>
        
        <div class="bit-decode-controls">
          <button class="btn btn-primary" id="bit-decode-btn">Decode</button>
          <button class="btn btn-secondary" id="bit-decode-clear">Clear</button>
          
          <div class="view-mode-toggle">
            <span>Flat</span>
            <div class="toggle-switch" id="view-mode-toggle">
              <div class="toggle-slider"></div>
            </div>
          </div>
        </div>
        
        <div id="bit-decode-output"></div>
      </div>
    `;

    this.bindEvents();
    
    // Set initial label based on default tag
    const inputLabel = this.container.querySelector('#bit-decode-input-label');
    const tagElement = this.container.querySelector('#bit-decode-tag');
    const selectedOption = tagElement.options[tagElement.selectedIndex];
    const tagName = selectedOption.text.split(' - ')[1] || 'Input Value (Hex)';
    inputLabel.textContent = tagName.split(' (')[0];
  }

  bindEvents() {
    const tagElement = this.container.querySelector('#bit-decode-tag');
    const schemeElement = this.container.querySelector('#bit-decode-scheme');
    const inputElement = this.container.querySelector('#bit-decode-input');
    const inputLabel = this.container.querySelector('#bit-decode-input-label');
    const lengthDisplay = this.container.querySelector('#bit-decode-length');
    const outputElement = this.container.querySelector('#bit-decode-output');
    const decodeButton = this.container.querySelector('#bit-decode-btn');
    const clearButton = this.container.querySelector('#bit-decode-clear');
    const toggleSwitch = this.container.querySelector('#view-mode-toggle');

    // Update length display
    const updateLengthDisplay = () => {
      const value = inputElement.value.trim().replace(/\s/g, '');
      const bytes = value.length / 2;
      lengthDisplay.textContent = `Length: ${bytes} byte${bytes !== 1 ? 's' : ''}`;
    };
    
    // Initialize length display
    updateLengthDisplay();
    
    // Update length on input
    inputElement.addEventListener('input', updateLengthDisplay);

    // Tag selection change - update input label
    tagElement.addEventListener('change', (e) => {
      this.currentTag = e.target.value;
      const selectedOption = e.target.options[e.target.selectedIndex];
      const tagName = selectedOption.text.split(' - ')[1] || 'Input Value (Hex)';
      inputLabel.textContent = tagName.split(' (')[0]; // Extract short name like "TVR" or "TSI"
    });

    // Set card scheme when selection changes
    schemeElement.addEventListener('change', (e) => {
      this.currentScheme = e.target.value;
      this.bitParser.setCardScheme(this.currentScheme);
    });

    // View mode toggle
    toggleSwitch.addEventListener('click', () => {
      toggleSwitch.classList.toggle('active');
      this.displayMode = toggleSwitch.classList.contains('active') ? 'flat' : 'table';
      
      // Re-render if there's a result
      const inputValue = inputElement.value.trim();
      if (inputValue) {
        this.performDecode();
      }
    });

    // Decode button
    decodeButton.addEventListener('click', () => {
      this.performDecode();
    });

    // Clear button
    clearButton.addEventListener('click', () => {
      inputElement.value = '';
      outputElement.innerHTML = '';
    });
  }
  
  performDecode() {
    const tagElement = this.container.querySelector('#bit-decode-tag');
    const inputElement = this.container.querySelector('#bit-decode-input');
    const outputElement = this.container.querySelector('#bit-decode-output');
    
    const tag = tagElement.value.trim();
    const inputValue = inputElement.value.trim().replace(/\s/g, '');
    
    if (!tag || !inputValue) {
      outputElement.innerHTML = '<div style="color: #d9534f; padding: 12px; background: #f2dede; border-radius: 4px;">Error: Please enter input value</div>';
      return;
    }
    
    try {
      const result = this.bitParser.decodeBits(tag, inputValue);
      if (result.error) {
        outputElement.innerHTML = `<div style="color: #d9534f; padding: 12px; background: #f2dede; border-radius: 4px;">Error: ${result.error}</div>`;
        return;
      }
      
      if (this.displayMode === 'table') {
        this.renderTableView(result, outputElement);
      } else {
        this.renderFlatView(result, outputElement);
      }
    } catch (e) {
      outputElement.innerHTML = `<div style="color: #d9534f; padding: 12px; background: #f2dede; border-radius: 4px;">Error: ${e.message}</div>`;
    }
  }
  
  renderTableView(result, outputElement) {
    const bytes = this.groupResultsByByte(result.results);
    const numBytes = Object.keys(bytes).length;
    
    let html = '<div class="bit-decode-tab-container">';
    html += '<div class="bit-decode-tabs">';
    
    // Create tab buttons for each byte
    for (let i = 1; i <= numBytes; i++) {
      html += `<button class="bit-decode-tab ${i === 1 ? 'active' : ''}" data-byte="${i}">Byte ${i}</button>`;
    }
    html += '</div>';
    
    const bitPositions = ['b8', 'b7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1'];
    
    // Create content for each byte tab
    for (let byteNum = 1; byteNum <= numBytes; byteNum++) {
      html += `<div class="bit-decode-tab-content ${byteNum === 1 ? 'active' : ''}" data-byte="${byteNum}">`;
      html += '<table class="bit-result-table">';
      html += '<thead><tr>';
      html += '<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>';
      html += '<th>Meaning</th>';
      html += '</tr></thead>';
      html += '<tbody>';
      
      const byteBits = bytes[byteNum] || [];
      
      // Render each bit in this byte
      for (const bitPos of bitPositions) {
        const bitData = byteBits.find(b => b.bit === bitPos);
        if (bitData) {
          const isHighlight = bitData.value === 1;
          html += `<tr class="${isHighlight ? 'highlight' : ''}">`;
          
          // Add all bit cells
          for (const pos of bitPositions) {
            if (pos === bitPos) {
              html += `<td class="bit-cell ${isHighlight ? 'active' : ''}">${bitData.value}</td>`;
            } else {
              html += '<td class="bit-cell"></td>';
            }
          }
          
          html += `<td>${bitData.meaning}</td>`;
          html += '</tr>';
        }
      }
      
      html += '</tbody></table>';
      html += '</div>';
    }
    
    html += '</div>';
    outputElement.innerHTML = html;
    
    // Bind tab click events
    const tabs = outputElement.querySelectorAll('.bit-decode-tab');
    const contents = outputElement.querySelectorAll('.bit-decode-tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetByte = tab.getAttribute('data-byte');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        contents.forEach(c => {
          c.classList.remove('active');
          if (c.getAttribute('data-byte') === targetByte) {
            c.classList.add('active');
          }
        });
      });
    });
  }
  
  renderFlatView(result, outputElement) {
    const bytes = this.groupResultsByByte(result.results);
    
    let html = '<div class="bit-result-flat">';
    
    for (const [byteNum, bits] of Object.entries(bytes)) {
      html += '<div class="flat-byte-section">';
      html += `<div class="flat-byte-title">TVR Byte ${byteNum} ${byteNum === '1' ? '(Leftmost)' : ''}:</div>`;
      html += '<table class="flat-bit-table">';
      html += '<thead><tr>';
      html += '<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>';
      html += '<th>Meaning</th>';
      html += '</tr></thead>';
      html += '<tbody>';
      
      const bitPositions = ['b8', 'b7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1'];
      
      for (const bitPos of bitPositions) {
        const bitData = bits.find(b => b.bit === bitPos);
        if (bitData) {
          const isHighlight = bitData.value === 1;
          html += `<tr class="${isHighlight ? 'highlight' : ''}">`;
          
          // Add all bit cells
          for (const pos of bitPositions) {
            if (pos === bitPos) {
              html += `<td class="bit-cell ${isHighlight ? 'active' : ''}">${bitData.value}</td>`;
            } else {
              html += '<td class="bit-cell"></td>';
            }
          }
          
          html += `<td>${bitData.meaning}</td>`;
          html += '</tr>';
        }
      }
      
      html += '</tbody></table>';
      html += '</div>';
    }
    
    html += '</div>';
    outputElement.innerHTML = html;
  }
  
  groupResultsByByte(results) {
    const bytes = {};
    for (const result of results) {
      if (!bytes[result.byte]) {
        bytes[result.byte] = [];
      }
      bytes[result.byte].push(result);
    }
    return bytes;
  }
}

export default BitDecodeTool;