(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const p="modulepreload",v=function(a){return"/EMVTool/"+a},m={},E=function(t,n,r){if(!n||n.length===0)return t();const e=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=v(o),o in m)return;m[o]=!0;const l=o.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(!!r)for(let i=e.length-1;i>=0;i--){const s=e[i];if(s.href===o&&(!l||s.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${u}`))return;const c=document.createElement("link");if(c.rel=l?"stylesheet":p,l||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),l)return new Promise((i,s)=>{c.addEventListener("load",i),c.addEventListener("error",()=>s(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t()).catch(o=>{const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o})};class y{constructor(t){this.container=document.getElementById(t),this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents()}bindEvents(){const t=this.container.querySelector("#parseBtn"),n=this.container.querySelector("#clearBtn"),r=this.container.querySelector("#sampleBtn"),e=this.container.querySelector("#tlvInput");t.addEventListener("click",()=>{const o=this.container.querySelector("#cardScheme").value;this.parseAndDisplay(e.value,o)}),n.addEventListener("click",()=>{e.value="";const o=this.container.querySelector("#tlvOutput");o.textContent=""}),r.addEventListener("click",()=>{e.value="9F0206010203040506BF0C05C1030102039F0306000000000000";const o=this.container.querySelector("#cardScheme").value;this.parseAndDisplay(e.value,o)})}parseAndDisplay(t,n="EMV"){try{const r=t.replace(/[^0-9A-Fa-f]/g,"");if(r.length===0)throw new Error("Please enter TLV format data");if(r.length%2!==0)throw new Error("Hexadecimal data length is incorrect, please check input");E(()=>import("./tlvParser-a2a6b317.js"),[]).then(e=>{try{const o=e.parseTLV(r),l=e.formatTLVTree(o,n),u=this.container.querySelector("#tlvOutput");u.textContent=l}catch(o){const l=this.container.querySelector("#tlvOutput");l.textContent=`TLV Parsing failed:

Error: ${o.message}

Please check your input data.`}})}catch(r){const e=this.container.querySelector("#tlvOutput");e.textContent=`Pre-parsing validation failed:

Error: ${r.message}`}}}new y("tlv-viewer-container");const g=document.querySelectorAll(".tab-btn"),h=document.querySelectorAll(".tab-content");g.forEach(a=>{a.addEventListener("click",()=>{g.forEach(n=>n.classList.remove("active")),h.forEach(n=>n.classList.remove("active")),a.classList.add("active");const t=a.getAttribute("data-tab");document.getElementById(t).classList.add("active")})});function d(a,t){document.getElementById(a).addEventListener("click",()=>{t.forEach(n=>{const r=document.getElementById(n);r.tagName==="TEXTAREA"||r.tagName==="INPUT"?r.value="":r.textContent=""})})}d("bit-clear",["bit-tag","bit-value","bit-value-full","bit-output"]);d("string-clear",["string-input","string-output"]);d("algo-clear",["algo-input1","algo-input2","algo-textarea","algo-output"]);document.getElementById("string-to-hex").addEventListener("click",()=>{const a=document.getElementById("string-input").value;try{let t="";for(let n=0;n<a.length;n++){const r=a.charCodeAt(n).toString(16).padStart(2,"0");t+=r}document.getElementById("string-output").textContent=t.toUpperCase()}catch(t){document.getElementById("string-output").textContent=`Error: ${t.message}`}});document.getElementById("hex-to-string").addEventListener("click",()=>{const a=document.getElementById("string-input").value.trim();try{const t=a.replace(/[^0-9a-fA-F]/g,"");if(t.length%2!==0)throw new Error("Hex string length must be even");let n="";for(let r=0;r<t.length;r+=2){const e=t.substr(r,2);n+=String.fromCharCode(parseInt(e,16))}document.getElementById("string-output").textContent=n}catch(t){document.getElementById("string-output").textContent=`Error: ${t.message}`}});document.getElementById("string-to-ascii").addEventListener("click",()=>{const a=document.getElementById("string-input").value;try{let t="";for(let n=0;n<a.length;n++)t+=a.charCodeAt(n)+" ";document.getElementById("string-output").textContent=t.trim()}catch(t){document.getElementById("string-output").textContent=`Error: ${t.message}`}});document.getElementById("string-remove-space").addEventListener("click",()=>{const t=document.getElementById("string-input").value.replace(/\s+/g,"");document.getElementById("string-output").textContent=t});document.getElementById("string-remove-enter").addEventListener("click",()=>{const t=document.getElementById("string-input").value.replace(/[\r\n]/g,"");document.getElementById("string-output").textContent=t});document.getElementById("bit-parse").addEventListener("click",()=>{const a=document.getElementById("bit-tag").value.trim(),t=document.getElementById("bit-value").value.trim()||document.getElementById("bit-value-full").value.trim();if(!a||!t){document.getElementById("bit-output").textContent="Please enter tag number and tag value";return}document.getElementById("bit-output").textContent=`Bit parsing result (example):
Tag: ${a}
Value: ${t}
Parsing status: Parsing logic to be implemented`});document.getElementById("algo-sha1").addEventListener("click",()=>{const a=document.getElementById("algo-input1").value.trim(),t=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim();document.getElementById("algo-output").textContent=`SHA1 calculation result (example):
Data 1: ${a}
Data 2: ${t}
Detailed data: ${n.substring(0,20)}...
Calculation result: Calculation logic to be implemented`});document.getElementById("algo-md5").addEventListener("click",()=>{const a=document.getElementById("algo-input1").value.trim(),t=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim();document.getElementById("algo-output").textContent=`MD5 calculation result (example):
Data 1: ${a}
Data 2: ${t}
Detailed data: ${n.substring(0,20)}...
Calculation result: Calculation logic to be implemented`});document.getElementById("algo-crc").addEventListener("click",()=>{const a=document.getElementById("algo-input1").value.trim(),t=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim();document.getElementById("algo-output").textContent=`CRC calculation result (example):
Data 1: ${a}
Data 2: ${t}
Detailed data: ${n.substring(0,20)}...
Calculation result: Calculation logic to be implemented`});document.getElementById("algo-base64-encode").addEventListener("click",()=>{const a=document.getElementById("algo-input1").value.trim(),t=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim(),r=a+t+n;try{const e=btoa(r);document.getElementById("algo-output").textContent=e}catch(e){document.getElementById("algo-output").textContent=`Base64 encoding error: ${e.message}`}});document.getElementById("algo-base64-decode").addEventListener("click",()=>{const a=document.getElementById("algo-input1").value.trim(),t=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim(),r=a+t+n;try{const e=atob(r);document.getElementById("algo-output").textContent=e}catch(e){document.getElementById("algo-output").textContent=`Base64 decoding error: ${e.message}`}});
