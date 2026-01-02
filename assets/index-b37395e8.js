(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(o){if(o.ep)return;o.ep=!0;const t=n(o);fetch(o.href,t)}})();const b="modulepreload",C=function(s){return"/EMVTool/"+s},x={},B=function(e,n,r){if(!n||n.length===0)return e();const o=document.getElementsByTagName("link");return Promise.all(n.map(t=>{if(t=C(t),t in x)return;x[t]=!0;const l=t.endsWith(".css"),p=l?'[rel="stylesheet"]':"";if(!!r)for(let m=o.length-1;m>=0;m--){const v=o[m];if(v.href===t&&(!l||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${p}`))return;const g=document.createElement("link");if(g.rel=l?"stylesheet":b,l||(g.as="script",g.crossOrigin=""),g.href=t,document.head.appendChild(g),l)return new Promise((m,v)=>{g.addEventListener("load",m),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>e()).catch(t=>{const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=t,window.dispatchEvent(l),!l.defaultPrevented)throw t})};class S{constructor(e){this.container=document.getElementById(e),this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents()}bindEvents(){const e=this.container.querySelector("#parseBtn"),n=this.container.querySelector("#clearBtn"),r=this.container.querySelector("#sampleBtn"),o=this.container.querySelector("#tlvInput");e.addEventListener("click",()=>{const t=this.container.querySelector("#cardScheme").value;this.parseAndDisplay(o.value,t)}),n.addEventListener("click",()=>{o.value="";const t=this.container.querySelector("#tlvOutput");t.textContent=""}),r.addEventListener("click",()=>{o.value="9F0206010203040506BF0C05C1030102039F0306000000000000";const t=this.container.querySelector("#cardScheme").value;this.parseAndDisplay(o.value,t)})}parseAndDisplay(e,n="EMV"){try{const r=e.replace(/[^0-9A-Fa-f]/g,"");if(r.length===0)throw new Error("Please enter TLV format data");if(r.length%2!==0)throw new Error("Hexadecimal data length is incorrect, please check input");B(()=>import("./tlvParser-a2a6b317.js"),[]).then(o=>{try{const t=o.parseTLV(r),l=o.formatTLVTree(t,n),p=this.container.querySelector("#tlvOutput");p.textContent=l}catch(t){const l=this.container.querySelector("#tlvOutput");l.textContent=`TLV Parsing failed:

Error: ${t.message}

Please check your input data.`}})}catch(r){const o=this.container.querySelector("#tlvOutput");o.textContent=`Pre-parsing validation failed:

Error: ${r.message}`}}}class I{constructor(e){this.container=document.getElementById(e),this.init()}init(){this.container.innerHTML=`
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
          <button class="btn btn-secondary" id="string-clear">Clear</button>
        </div>
        <div class="form-group">
          <label>Processing Result</label>
          <div class="output-area" id="string-output"></div>
          <div id="string-output-stats" style="margin-top: 5px; font-size: 14px; color: #666;">Result Count: 0 bytes (0x00)</div>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){const e=this.container.querySelector("#string-input"),n=this.container.querySelector("#string-output"),r=this.container.querySelector("#string-input-stats"),o=this.container.querySelector("#string-output-stats");e.addEventListener("input",()=>{const a=e.value.replace(/[\s\\x]/g,""),i=a.length/2,c=a.length%2!==0?(a.length/2).toFixed(1):Math.floor(i),h=Math.floor(i).toString(16).toUpperCase().padStart(2,"0");r.textContent=`Entered Count: ${c} bytes (0x${h})`});const t=()=>{const a=(n.textContent||n.innerText).replace(/[\s\\x]/g,""),i=a.length/2,c=a.length%2!==0?(a.length/2).toFixed(1):Math.floor(i),h=Math.floor(i).toString(16).toUpperCase().padStart(2,"0");o.textContent=`Result Count: ${c} bytes (0x${h})`},p=e.value.replace(/[\s\\x]/g,""),y=p.length/2,m=p.length%2!==0?(p.length/2).toFixed(1):Math.floor(y),v=Math.floor(y).toString(16).toUpperCase().padStart(2,"0");r.textContent=`Entered Count: ${m} bytes (0x${v})`,setTimeout(t,0),this.container.querySelector("#hex-to-utf8").addEventListener("click",()=>{const d=e.value.trim();try{const a=d.replace(/[^0-9a-fA-F]/g,"");if(a.length%2!==0)throw new Error("Hex string length must be even");let i="";for(let c=0;c<a.length;c+=2){const h=a.substr(c,2);i+=String.fromCharCode(parseInt(h,16))}const u=decodeURIComponent(escape(i));n.textContent=u,t()}catch(a){n.textContent=`Error: ${a.message}`,t()}}),this.container.querySelector("#utf8-to-hex").addEventListener("click",()=>{const d=e.value;try{const a=unescape(encodeURIComponent(d));let i="";for(let u=0;u<a.length;u++){const c=a.charCodeAt(u).toString(16).padStart(2,"0");i+=c}n.textContent=i.toUpperCase(),t()}catch(a){n.textContent=`Error: ${a.message}`,t()}}),this.container.querySelector("#string-toupper").addEventListener("click",()=>{const d=e.value;try{const a=d.replace(/[\s\r\n]+/g,"").toUpperCase();n.textContent=a,t()}catch(a){n.textContent=`Error: ${a.message}`,t()}}),this.container.querySelector("#string-tolower").addEventListener("click",()=>{const d=e.value;try{const a=d.toLowerCase();n.textContent=a,t()}catch(a){n.textContent=`Error: ${a.message}`,t()}}),this.container.querySelector("#string-add-space").addEventListener("click",()=>{var a;const d=e.value;try{const u=((a=d.replace(/[\s\r\n]+/g,"").match(/.{1,2}/g))==null?void 0:a.join(" "))||"";n.textContent=u,t()}catch(i){n.textContent=`Error: ${i.message}`,t()}}),this.container.querySelector("#string-add-slashx").addEventListener("click",()=>{var a;const d=e.value;try{const i=d.replace(/[\s\r\n]+/g,"");if(/^[0-9a-fA-F]*$/.test(i)){const u=((a=i.match(/.{1,2}/g))==null?void 0:a.map(c=>"\\x"+c).join(" "))||"";n.textContent=u}else{let u="";for(let c=0;c<i.length;c++){const h=i.charCodeAt(c).toString(16).padStart(2,"0");u+="\\x"+h}n.textContent=u.toUpperCase()}t()}catch(i){n.textContent=`Error: ${i.message}`,t()}}),this.container.querySelector("#string-clear").addEventListener("click",()=>{e.value="",n.textContent="",r.textContent="Entered Count: 0 bytes (0x00)",o.textContent="Result Count: 0 bytes (0x00)"})}}new S("tlv-viewer-container");new I("string-tools-container");const E=document.querySelectorAll(".tab-btn"),L=document.querySelectorAll(".tab-content");E.forEach(s=>{s.addEventListener("click",()=>{E.forEach(n=>n.classList.remove("active")),L.forEach(n=>n.classList.remove("active")),s.classList.add("active");const e=s.getAttribute("data-tab");document.getElementById(e).classList.add("active")})});function f(s,e){document.getElementById(s).addEventListener("click",()=>{e.forEach(n=>{const r=document.getElementById(n);r.tagName==="TEXTAREA"||r.tagName==="INPUT"?r.value="":r.textContent=""})})}f("bit-clear",["bit-tag","bit-value","bit-value-full","bit-output"]);f("algo-clear",["algo-input1","algo-input2","algo-textarea","algo-output"]);document.getElementById("bit-parse").addEventListener("click",()=>{const s=document.getElementById("bit-tag").value.trim(),e=document.getElementById("bit-value").value.trim()||document.getElementById("bit-value-full").value.trim();if(!s||!e){document.getElementById("bit-output").textContent="Please enter tag number and tag value";return}document.getElementById("bit-output").textContent=`Bit parsing result (example):
Tag: ${s}
Value: ${e}
Parsing status: Parsing logic to be implemented`});document.getElementById("algo-sha1").addEventListener("click",()=>{const s=document.getElementById("algo-input1").value.trim(),e=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim();document.getElementById("algo-output").textContent=`SHA1 calculation result (example):
Data 1: ${s}
Data 2: ${e}
Detailed data: ${n.substring(0,20)}...
Calculation result: Calculation logic to be implemented`});document.getElementById("algo-md5").addEventListener("click",()=>{const s=document.getElementById("algo-input1").value.trim(),e=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim();document.getElementById("algo-output").textContent=`MD5 calculation result (example):
Data 1: ${s}
Data 2: ${e}
Detailed data: ${n.substring(0,20)}...
Calculation result: Calculation logic to be implemented`});document.getElementById("algo-crc").addEventListener("click",()=>{const s=document.getElementById("algo-input1").value.trim(),e=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim();document.getElementById("algo-output").textContent=`CRC calculation result (example):
Data 1: ${s}
Data 2: ${e}
Detailed data: ${n.substring(0,20)}...
Calculation result: Calculation logic to be implemented`});document.getElementById("algo-base64-encode").addEventListener("click",()=>{const s=document.getElementById("algo-input1").value.trim(),e=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim(),r=s+e+n;try{const o=btoa(r);document.getElementById("algo-output").textContent=o}catch(o){document.getElementById("algo-output").textContent=`Base64 encoding error: ${o.message}`}});document.getElementById("algo-base64-decode").addEventListener("click",()=>{const s=document.getElementById("algo-input1").value.trim(),e=document.getElementById("algo-input2").value.trim(),n=document.getElementById("algo-textarea").value.trim(),r=s+e+n;try{const o=atob(r);document.getElementById("algo-output").textContent=o}catch(o){document.getElementById("algo-output").textContent=`Base64 decoding error: ${o.message}`}});
