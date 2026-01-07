/**
 * Bitwise Calculator Tool Component
 */

export class BitwiseTool {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="bitwise-tool">
        <div class="form-row">
          <div class="form-group">
            <label for="bitwise-input1">Input 1 (Hex)</label>
            <input type="text" id="bitwise-input1" placeholder="Enter hex value (e.g., FF)">
          </div>
          <div class="form-group">
            <label for="bitwise-input2">Input 2 (Hex)</label>
            <input type="text" id="bitwise-input2" placeholder="Enter hex value (e.g., 0F)">
          </div>
        </div>
        
        <div class="btn-group">
          <button class="btn btn-primary" id="bitwise-and">AND</button>
          <button class="btn btn-primary" id="bitwise-or">OR</button>
          <button class="btn btn-primary" id="bitwise-xor">XOR</button>
          <button class="btn btn-primary" id="bitwise-not">NOT (Input 1)</button>
        </div>
        
        <div class="form-group">
          <label>Result (Binary)</label>
          <div class="output-area" id="bitwise-output-binary"></div>
        </div>
        
        <div class="form-group">
          <label>Result (Hex)</label>
          <div class="output-area" id="bitwise-output-hex"></div>
        </div>
        
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="bitwise-copy">Copy Hex Result</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const input1Element = this.container.querySelector('#bitwise-input1');
    const input2Element = this.container.querySelector('#bitwise-input2');
    const outputBinaryElement = this.container.querySelector('#bitwise-output-binary');
    const outputHexElement = this.container.querySelector('#bitwise-output-hex');

    // AND operation
    document.getElementById('bitwise-and').addEventListener('click', () => {
      this.performOperation('AND', input1Element.value, input2Element.value, outputBinaryElement, outputHexElement);
    });

    // OR operation
    document.getElementById('bitwise-or').addEventListener('click', () => {
      this.performOperation('OR', input1Element.value, input2Element.value, outputBinaryElement, outputHexElement);
    });

    // XOR operation
    document.getElementById('bitwise-xor').addEventListener('click', () => {
      this.performOperation('XOR', input1Element.value, input2Element.value, outputBinaryElement, outputHexElement);
    });

    // NOT operation
    document.getElementById('bitwise-not').addEventListener('click', () => {
      this.performOperation('NOT', input1Element.value, '', outputBinaryElement, outputHexElement);
    });

    // Copy to clipboard
    document.getElementById('bitwise-copy').addEventListener('click', () => {
      const result = outputHexElement.textContent;
      if (result) {
        navigator.clipboard.writeText(result).then(() => {
          const button = document.getElementById('bitwise-copy');
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

  performOperation(operation, input1, input2, outputBinaryElement, outputHexElement) {
    try {
      // Parse hex inputs
      const num1 = parseInt(input1.replace(/\s/g, ''), 16);
      
      if (isNaN(num1)) {
        outputBinaryElement.textContent = 'Error: Invalid input 1';
        outputHexElement.textContent = '';
        return;
      }

      let result;
      
      switch (operation) {
        case 'AND':
          const num2And = parseInt(input2.replace(/\s/g, ''), 16);
          if (isNaN(num2And)) {
            outputBinaryElement.textContent = 'Error: Invalid input 2';
            outputHexElement.textContent = '';
            return;
          }
          result = num1 & num2And;
          break;
          
        case 'OR':
          const num2Or = parseInt(input2.replace(/\s/g, ''), 16);
          if (isNaN(num2Or)) {
            outputBinaryElement.textContent = 'Error: Invalid input 2';
            outputHexElement.textContent = '';
            return;
          }
          result = num1 | num2Or;
          break;
          
        case 'XOR':
          const num2Xor = parseInt(input2.replace(/\s/g, ''), 16);
          if (isNaN(num2Xor)) {
            outputBinaryElement.textContent = 'Error: Invalid input 2';
            outputHexElement.textContent = '';
            return;
          }
          result = num1 ^ num2Xor;
          break;
          
        case 'NOT':
          // For NOT, we need to determine the bit width
          const bitWidth = Math.ceil(Math.log2(num1 + 1));
          const mask = (1 << bitWidth) - 1;
          result = ~num1 & mask;
          break;
          
        default:
          outputBinaryElement.textContent = 'Error: Unknown operation';
          outputHexElement.textContent = '';
          return;
      }

      // Display results
      const binaryStr = result.toString(2).padStart(8, '0');
      const hexStr = result.toString(16).toUpperCase().padStart(2, '0');
      
      outputBinaryElement.textContent = binaryStr;
      outputHexElement.textContent = hexStr;
      
    } catch (e) {
      outputBinaryElement.textContent = `Error: ${e.message}`;
      outputHexElement.textContent = '';
    }
  }
}

export default BitwiseTool;
