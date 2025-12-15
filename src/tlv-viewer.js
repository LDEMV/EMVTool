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
        <h2>TLV 解析器</h2>
        <div class="input-section">
          <label for="tlvInput">输入十六进制 TLV 数据:</label>
          <textarea id="tlvInput" placeholder="例如: 9F020600000000010082023900"></textarea>
          <div class="button-group">
            <button id="parseBtn">解析</button>
            <button id="sampleBtn">加载示例</button>
          </div>
        </div>
        <div class="output-section">
          <h3>解析结果:</h3>
          <pre id="tlvOutput" class="tree-output"></pre>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const parseBtn = this.container.querySelector('#parseBtn');
    const sampleBtn = this.container.querySelector('#sampleBtn');
    const tlvInput = this.container.querySelector('#tlvInput');
    
    parseBtn.addEventListener('click', () => {
      this.parseAndDisplay(tlvInput.value);
    });

    sampleBtn.addEventListener('click', () => {
      // 示例数据包含嵌套结构
      tlvInput.value = "9F0206010203040506BF0C05C101019F0306000000000000";
      this.parseAndDisplay(tlvInput.value);
    });
  }

  parseAndDisplay(hexData) {
    try {
      // Remove spaces and other non-hex characters
      const cleanHex = hexData.replace(/[^0-9A-Fa-f]/g, '');
      
      if (cleanHex.length === 0) {
        throw new Error("请输入有效的十六进制数据");
      }
      
      if (cleanHex.length % 2 !== 0) {
        throw new Error("十六进制数据长度不正确，请检查输入");
      }

      // Import the parser functions dynamically
      import('./utils/tlvParser.js').then((parserModule) => {
        const parsed = parserModule.parseTLV(cleanHex);
        const formatted = parserModule.formatTLVTree(parsed);
        
        const output = this.container.querySelector('#tlvOutput');
        output.textContent = formatted;
      });
    } catch (error) {
      const output = this.container.querySelector('#tlvOutput');
      output.textContent = `解析错误: ${error.message}`;
    }
  }
}