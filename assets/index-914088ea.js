(function(){const C=document.createElement("link").relList;if(C&&C.supports&&C.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&t(p)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const Be="modulepreload",ye=function(m){return"/EMVTool/"+m},Et={},ge=function(C,r,t){if(!r||r.length===0)return C();const n=document.getElementsByTagName("link");return Promise.all(r.map(o=>{if(o=ye(o),o in Et)return;Et[o]=!0;const p=o.endsWith(".css"),x=p?'[rel="stylesheet"]':"";if(!!t)for(let a=n.length-1;a>=0;a--){const b=n[a];if(b.href===o&&(!p||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${x}`))return;const e=document.createElement("link");if(e.rel=p?"stylesheet":Be,p||(e.as="script",e.crossOrigin=""),e.href=o,document.head.appendChild(e),p)return new Promise((a,b)=>{e.addEventListener("load",a),e.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>C()).catch(o=>{const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=o,window.dispatchEvent(p),!p.defaultPrevented)throw o})};class Ae{constructor(C){this.container=document.getElementById(C),this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents()}bindEvents(){const C=this.container.querySelector("#parseBtn"),r=this.container.querySelector("#clearBtn"),t=this.container.querySelector("#sampleBtn"),n=this.container.querySelector("#tlvInput");C.addEventListener("click",()=>{const o=this.container.querySelector("#cardScheme").value;this.parseAndDisplay(n.value,o)}),r.addEventListener("click",()=>{n.value="";const o=this.container.querySelector("#tlvOutput");o.textContent=""}),t.addEventListener("click",()=>{n.value="9F0206010203040506BF0C05C1030102039F0306000000000000";const o=this.container.querySelector("#cardScheme").value;this.parseAndDisplay(n.value,o)})}parseAndDisplay(C,r="EMV"){try{const t=C.replace(/[^0-9A-Fa-f]/g,"");if(t.length===0)throw new Error("Please enter TLV format data");if(t.length%2!==0)throw new Error("Hexadecimal data length is incorrect, please check input");ge(()=>import("./tlvParser-3ec3548a.js"),[]).then(n=>{try{const o=n.parseTLV(t),p=n.formatTLVTree(o,r),x=this.container.querySelector("#tlvOutput");x.textContent=p}catch(o){const p=this.container.querySelector("#tlvOutput");p.textContent=`TLV Parsing failed:

Error: ${o.message}

Please check your input data.`}})}catch(t){const n=this.container.querySelector("#tlvOutput");n.textContent=`Pre-parsing validation failed:

Error: ${t.message}`}}}class Fe{constructor(C){this.container=document.getElementById(C),this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents()}bindEvents(){const C=this.container.querySelector("#string-input"),r=this.container.querySelector("#string-output"),t=this.container.querySelector("#string-input-stats"),n=this.container.querySelector("#string-output-stats");C.addEventListener("input",()=>{const s=C.value.replace(/[\s\\x]/g,""),c=s.length/2,d=s.length%2!==0?(s.length/2).toFixed(1):Math.floor(c),E=Math.floor(c).toString(16).toUpperCase().padStart(2,"0");t.textContent=`Entered Count: ${d} bytes (0x${E})`});const o=()=>{const s=(r.textContent||r.innerText).replace(/[\s\\x]/g,""),c=s.length/2,d=s.length%2!==0?(s.length/2).toFixed(1):Math.floor(c),E=Math.floor(c).toString(16).toUpperCase().padStart(2,"0");n.textContent=`Result Count: ${d} bytes (0x${E})`},x=C.value.replace(/[\s\\x]/g,""),f=x.length/2,a=x.length%2!==0?(x.length/2).toFixed(1):Math.floor(f),b=Math.floor(f).toString(16).toUpperCase().padStart(2,"0");t.textContent=`Entered Count: ${a} bytes (0x${b})`,setTimeout(o,0),this.container.querySelector("#copy-result-to-input").addEventListener("click",()=>{const i=r.textContent||r.innerText;C.value=i;const s=i.replace(/[\s\\x]/g,""),c=s.length/2,d=s.length%2!==0?(s.length/2).toFixed(1):Math.floor(c),E=Math.floor(c).toString(16).toUpperCase().padStart(2,"0");t.textContent=`Entered Count: ${d} bytes (0x${E})`}),this.container.querySelector("#copy-result-to-clipboard").addEventListener("click",()=>{const i=r.textContent||r.innerText;navigator.clipboard.writeText(i).then(()=>{const s=this.container.querySelector("#copy-result-to-clipboard").textContent;this.container.querySelector("#copy-result-to-clipboard").textContent="Copied!",setTimeout(()=>{this.container.querySelector("#copy-result-to-clipboard").textContent=s},2e3)}).catch(s=>{console.error("Failed to copy text: ",s),alert("Failed to copy text to clipboard")})}),this.container.querySelector("#hex-to-utf8").addEventListener("click",()=>{const i=C.value.trim();try{const s=i.replace(/[^0-9a-fA-F]/g,"");if(s.length%2!==0)throw new Error("Hex string length must be even");let c="";for(let d=0;d<s.length;d+=2){const E=s.substr(d,2);c+=String.fromCharCode(parseInt(E,16))}const h=decodeURIComponent(escape(c));r.textContent=h,o()}catch(s){r.textContent=`Error: ${s.message}`,o()}}),this.container.querySelector("#utf8-to-hex").addEventListener("click",()=>{const i=C.value;try{const s=unescape(encodeURIComponent(i));let c="";for(let h=0;h<s.length;h++){const d=s.charCodeAt(h).toString(16).padStart(2,"0");c+=d}r.textContent=c.toUpperCase(),o()}catch(s){r.textContent=`Error: ${s.message}`,o()}}),this.container.querySelector("#string-toupper").addEventListener("click",()=>{const i=C.value;try{const s=i.replace(/[\s\r\n]+/g,"").toUpperCase();r.textContent=s,o()}catch(s){r.textContent=`Error: ${s.message}`,o()}}),this.container.querySelector("#string-tolower").addEventListener("click",()=>{const i=C.value;try{const s=i.replace(/[\s\r\n]+/g,"").toLowerCase();r.textContent=s,o()}catch(s){r.textContent=`Error: ${s.message}`,o()}}),this.container.querySelector("#string-add-space").addEventListener("click",()=>{var s;const i=C.value;try{const h=((s=i.replace(/[\s\r\n]+/g,"").match(/.{1,2}/g))==null?void 0:s.join(" "))||"";r.textContent=h,o()}catch(c){r.textContent=`Error: ${c.message}`,o()}}),this.container.querySelector("#string-add-slashx").addEventListener("click",()=>{var s;const i=C.value;try{const c=i.replace(/[\s\r\n]+/g,"");if(/^[0-9a-fA-F]*$/.test(c)){const h=((s=c.match(/.{1,2}/g))==null?void 0:s.map(d=>"\\x"+d).join(""))||"";r.textContent=h}else{let h="";for(let d=0;d<c.length;d++){const E=c.charCodeAt(d).toString(16).padStart(2,"0");h+="\\x"+E}r.textContent=h.toUpperCase()}o()}catch(c){r.textContent=`Error: ${c.message}`,o()}}),this.container.querySelector("#string-remove-slashx").addEventListener("click",()=>{const i=C.value;try{const s=i.replace(/\\x/g,"");r.textContent=s,o()}catch(s){r.textContent=`Error: ${s.message}`,o()}}),this.container.querySelector("#string-clear").addEventListener("click",()=>{C.value="",r.textContent="",t.textContent="Entered Count: 0 bytes (0x00)",n.textContent="Result Count: 0 bytes (0x00)"})}}class De{constructor(C){this.container=document.getElementById(C),this.inputElement=null,this.outputElement=null,this.init()}init(){this.container.innerHTML=`
      <div class="sha1-tool">
        <div class="form-group">
          <label for="sha1-input">Input Text</label>
          <textarea id="sha1-input" placeholder="Enter text to calculate SHA1"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="sha1-calculate">Calculate</button>
          <button class="btn btn-secondary" id="sha1-clear">Clear</button>
        </div>
        <div class="form-group">
          <label>SHA1 Result</label>
          <div class="output-area" id="sha1-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="sha1-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `,this.inputElement=document.getElementById("sha1-input"),this.outputElement=document.getElementById("sha1-output"),this.bindEvents()}bindEvents(){document.getElementById("sha1-calculate").addEventListener("click",async()=>{const C=this.inputElement.value;if(C.trim()){const r=await this.calculateSHA1(C);this.outputElement.textContent=r}}),document.getElementById("sha1-clear").addEventListener("click",()=>{this.inputElement.value="",this.outputElement.textContent=""}),document.getElementById("sha1-copy-to-clipboard").addEventListener("click",()=>{const C=this.outputElement.textContent;C&&navigator.clipboard.writeText(C).then(()=>{const r=document.getElementById("sha1-copy-to-clipboard"),t=r.textContent;r.textContent="Copied!",setTimeout(()=>{r.textContent=t},2e3)}).catch(r=>{console.error("Failed to copy: ",r)})})}async calculateSHA1(C){const t=new TextEncoder().encode(C),n=await crypto.subtle.digest("SHA-1",t);return Array.from(new Uint8Array(n)).map(x=>x.toString(16).padStart(2,"0")).join("").toUpperCase()}}class me{constructor(C){this.container=document.getElementById(C),this.inputElement=null,this.outputElement=null,this.init()}init(){this.container.innerHTML=`
      <div class="sha256-tool">
        <div class="form-group">
          <label for="sha256-input">Input Text</label>
          <textarea id="sha256-input" placeholder="Enter text to calculate SHA256"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="sha256-calculate">Calculate</button>
          <button class="btn btn-secondary" id="sha256-clear">Clear</button>
        </div>
        <div class="form-group">
          <label>SHA256 Result</label>
          <div class="output-area" id="sha256-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="sha256-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `,this.inputElement=document.getElementById("sha256-input"),this.outputElement=document.getElementById("sha256-output"),this.bindEvents()}bindEvents(){document.getElementById("sha256-calculate").addEventListener("click",async()=>{const C=this.inputElement.value;if(C.trim()){const r=await this.calculateSHA256(C);this.outputElement.textContent=r}}),document.getElementById("sha256-clear").addEventListener("click",()=>{this.inputElement.value="",this.outputElement.textContent=""}),document.getElementById("sha256-copy-to-clipboard").addEventListener("click",()=>{const C=this.outputElement.textContent;C&&navigator.clipboard.writeText(C).then(()=>{const r=document.getElementById("sha256-copy-to-clipboard"),t=r.textContent;r.textContent="Copied!",setTimeout(()=>{r.textContent=t},2e3)}).catch(r=>{console.error("Failed to copy: ",r)})})}async calculateSHA256(C){const t=new TextEncoder().encode(C),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(x=>x.toString(16).padStart(2,"0")).join("").toUpperCase()}}var q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function _e(m){return m&&m.__esModule&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m}function Se(m){if(m.__esModule)return m;var C=m.default;if(typeof C=="function"){var r=function t(){return this instanceof t?Reflect.construct(C,arguments,this.constructor):C.apply(this,arguments)};r.prototype=C.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(m).forEach(function(t){var n=Object.getOwnPropertyDescriptor(m,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:function(){return m[t]}})}),r}var ne={exports:{}};function ke(m){throw new Error('Could not dynamically require "'+m+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var F0={exports:{}};const we={},Te=Object.freeze(Object.defineProperty({__proto__:null,default:we},Symbol.toStringTag,{value:"Module"})),Ie=Se(Te);var Bt;function N(){return Bt||(Bt=1,function(m,C){(function(r,t){m.exports=t()})(q,function(){var r=r||function(t,n){var o;if(typeof window<"u"&&window.crypto&&(o=window.crypto),typeof self<"u"&&self.crypto&&(o=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(o=globalThis.crypto),!o&&typeof window<"u"&&window.msCrypto&&(o=window.msCrypto),!o&&typeof q<"u"&&q.crypto&&(o=q.crypto),!o&&typeof ke=="function")try{o=Ie}catch{}var p=function(){if(o){if(typeof o.getRandomValues=="function")try{return o.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof o.randomBytes=="function")try{return o.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},x=Object.create||function(){function l(){}return function(u){var v;return l.prototype=u,v=new l,l.prototype=null,v}}(),f={},e=f.lib={},a=e.Base=function(){return{extend:function(l){var u=x(this);return l&&u.mixIn(l),(!u.hasOwnProperty("init")||this.init===u.init)&&(u.init=function(){u.$super.init.apply(this,arguments)}),u.init.prototype=u,u.$super=this,u},create:function(){var l=this.extend();return l.init.apply(l,arguments),l},init:function(){},mixIn:function(l){for(var u in l)l.hasOwnProperty(u)&&(this[u]=l[u]);l.hasOwnProperty("toString")&&(this.toString=l.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),b=e.WordArray=a.extend({init:function(l,u){l=this.words=l||[],u!=n?this.sigBytes=u:this.sigBytes=l.length*4},toString:function(l){return(l||s).stringify(this)},concat:function(l){var u=this.words,v=l.words,g=this.sigBytes,y=l.sigBytes;if(this.clamp(),g%4)for(var A=0;A<y;A++){var D=v[A>>>2]>>>24-A%4*8&255;u[g+A>>>2]|=D<<24-(g+A)%4*8}else for(var R=0;R<y;R+=4)u[g+R>>>2]=v[R>>>2];return this.sigBytes+=y,this},clamp:function(){var l=this.words,u=this.sigBytes;l[u>>>2]&=4294967295<<32-u%4*8,l.length=t.ceil(u/4)},clone:function(){var l=a.clone.call(this);return l.words=this.words.slice(0),l},random:function(l){for(var u=[],v=0;v<l;v+=4)u.push(p());return new b.init(u,l)}}),i=f.enc={},s=i.Hex={stringify:function(l){for(var u=l.words,v=l.sigBytes,g=[],y=0;y<v;y++){var A=u[y>>>2]>>>24-y%4*8&255;g.push((A>>>4).toString(16)),g.push((A&15).toString(16))}return g.join("")},parse:function(l){for(var u=l.length,v=[],g=0;g<u;g+=2)v[g>>>3]|=parseInt(l.substr(g,2),16)<<24-g%8*4;return new b.init(v,u/2)}},c=i.Latin1={stringify:function(l){for(var u=l.words,v=l.sigBytes,g=[],y=0;y<v;y++){var A=u[y>>>2]>>>24-y%4*8&255;g.push(String.fromCharCode(A))}return g.join("")},parse:function(l){for(var u=l.length,v=[],g=0;g<u;g++)v[g>>>2]|=(l.charCodeAt(g)&255)<<24-g%4*8;return new b.init(v,u)}},h=i.Utf8={stringify:function(l){try{return decodeURIComponent(escape(c.stringify(l)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(l){return c.parse(unescape(encodeURIComponent(l)))}},d=e.BufferedBlockAlgorithm=a.extend({reset:function(){this._data=new b.init,this._nDataBytes=0},_append:function(l){typeof l=="string"&&(l=h.parse(l)),this._data.concat(l),this._nDataBytes+=l.sigBytes},_process:function(l){var u,v=this._data,g=v.words,y=v.sigBytes,A=this.blockSize,D=A*4,R=y/D;l?R=t.ceil(R):R=t.max((R|0)-this._minBufferSize,0);var B=R*A,F=t.min(B*4,y);if(B){for(var S=0;S<B;S+=A)this._doProcessBlock(g,S);u=g.splice(0,B),v.sigBytes-=F}return new b.init(u,F)},clone:function(){var l=a.clone.call(this);return l._data=this._data.clone(),l},_minBufferSize:0});e.Hasher=d.extend({cfg:a.extend(),init:function(l){this.cfg=this.cfg.extend(l),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(l){return this._append(l),this._process(),this},finalize:function(l){l&&this._append(l);var u=this._doFinalize();return u},blockSize:16,_createHelper:function(l){return function(u,v){return new l.init(v).finalize(u)}},_createHmacHelper:function(l){return function(u,v){return new E.HMAC.init(l,v).finalize(u)}}});var E=f.algo={};return f}(Math);return r})}(F0)),F0.exports}var D0={exports:{}},yt;function y0(){return yt||(yt=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(t){var n=r,o=n.lib,p=o.Base,x=o.WordArray,f=n.x64={};f.Word=p.extend({init:function(e,a){this.high=e,this.low=a}}),f.WordArray=p.extend({init:function(e,a){e=this.words=e||[],a!=t?this.sigBytes=a:this.sigBytes=e.length*8},toX32:function(){for(var e=this.words,a=e.length,b=[],i=0;i<a;i++){var s=e[i];b.push(s.high),b.push(s.low)}return x.create(b,this.sigBytes)},clone:function(){for(var e=p.clone.call(this),a=e.words=this.words.slice(0),b=a.length,i=0;i<b;i++)a[i]=a[i].clone();return e}})}(),r})}(D0)),D0.exports}var m0={exports:{}},gt;function Re(){return gt||(gt=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(){if(typeof ArrayBuffer=="function"){var t=r,n=t.lib,o=n.WordArray,p=o.init,x=o.init=function(f){if(f instanceof ArrayBuffer&&(f=new Uint8Array(f)),(f instanceof Int8Array||typeof Uint8ClampedArray<"u"&&f instanceof Uint8ClampedArray||f instanceof Int16Array||f instanceof Uint16Array||f instanceof Int32Array||f instanceof Uint32Array||f instanceof Float32Array||f instanceof Float64Array)&&(f=new Uint8Array(f.buffer,f.byteOffset,f.byteLength)),f instanceof Uint8Array){for(var e=f.byteLength,a=[],b=0;b<e;b++)a[b>>>2]|=f[b]<<24-b%4*8;p.call(this,a,e)}else p.apply(this,arguments)};x.prototype=o}}(),r.lib.WordArray})}(m0)),m0.exports}var _0={exports:{}},At;function He(){return At||(At=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(){var t=r,n=t.lib,o=n.WordArray,p=t.enc;p.Utf16=p.Utf16BE={stringify:function(f){for(var e=f.words,a=f.sigBytes,b=[],i=0;i<a;i+=2){var s=e[i>>>2]>>>16-i%4*8&65535;b.push(String.fromCharCode(s))}return b.join("")},parse:function(f){for(var e=f.length,a=[],b=0;b<e;b++)a[b>>>1]|=f.charCodeAt(b)<<16-b%2*16;return o.create(a,e*2)}},p.Utf16LE={stringify:function(f){for(var e=f.words,a=f.sigBytes,b=[],i=0;i<a;i+=2){var s=x(e[i>>>2]>>>16-i%4*8&65535);b.push(String.fromCharCode(s))}return b.join("")},parse:function(f){for(var e=f.length,a=[],b=0;b<e;b++)a[b>>>1]|=x(f.charCodeAt(b)<<16-b%2*16);return o.create(a,e*2)}};function x(f){return f<<8&4278255360|f>>>8&16711935}}(),r.enc.Utf16})}(_0)),_0.exports}var S0={exports:{}},Ft;function n0(){return Ft||(Ft=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(){var t=r,n=t.lib,o=n.WordArray,p=t.enc;p.Base64={stringify:function(f){var e=f.words,a=f.sigBytes,b=this._map;f.clamp();for(var i=[],s=0;s<a;s+=3)for(var c=e[s>>>2]>>>24-s%4*8&255,h=e[s+1>>>2]>>>24-(s+1)%4*8&255,d=e[s+2>>>2]>>>24-(s+2)%4*8&255,E=c<<16|h<<8|d,l=0;l<4&&s+l*.75<a;l++)i.push(b.charAt(E>>>6*(3-l)&63));var u=b.charAt(64);if(u)for(;i.length%4;)i.push(u);return i.join("")},parse:function(f){var e=f.length,a=this._map,b=this._reverseMap;if(!b){b=this._reverseMap=[];for(var i=0;i<a.length;i++)b[a.charCodeAt(i)]=i}var s=a.charAt(64);if(s){var c=f.indexOf(s);c!==-1&&(e=c)}return x(f,e,b)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function x(f,e,a){for(var b=[],i=0,s=0;s<e;s++)if(s%4){var c=a[f.charCodeAt(s-1)]<<s%4*2,h=a[f.charCodeAt(s)]>>>6-s%4*2,d=c|h;b[i>>>2]|=d<<24-i%4*8,i++}return o.create(b,i)}}(),r.enc.Base64})}(S0)),S0.exports}var k0={exports:{}},Dt;function Le(){return Dt||(Dt=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(){var t=r,n=t.lib,o=n.WordArray,p=t.enc;p.Base64url={stringify:function(f,e){e===void 0&&(e=!0);var a=f.words,b=f.sigBytes,i=e?this._safe_map:this._map;f.clamp();for(var s=[],c=0;c<b;c+=3)for(var h=a[c>>>2]>>>24-c%4*8&255,d=a[c+1>>>2]>>>24-(c+1)%4*8&255,E=a[c+2>>>2]>>>24-(c+2)%4*8&255,l=h<<16|d<<8|E,u=0;u<4&&c+u*.75<b;u++)s.push(i.charAt(l>>>6*(3-u)&63));var v=i.charAt(64);if(v)for(;s.length%4;)s.push(v);return s.join("")},parse:function(f,e){e===void 0&&(e=!0);var a=f.length,b=e?this._safe_map:this._map,i=this._reverseMap;if(!i){i=this._reverseMap=[];for(var s=0;s<b.length;s++)i[b.charCodeAt(s)]=s}var c=b.charAt(64);if(c){var h=f.indexOf(c);h!==-1&&(a=h)}return x(f,a,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_safe_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"};function x(f,e,a){for(var b=[],i=0,s=0;s<e;s++)if(s%4){var c=a[f.charCodeAt(s-1)]<<s%4*2,h=a[f.charCodeAt(s)]>>>6-s%4*2,d=c|h;b[i>>>2]|=d<<24-i%4*8,i++}return o.create(b,i)}}(),r.enc.Base64url})}(k0)),k0.exports}var w0={exports:{}},mt;function o0(){return mt||(mt=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(t){var n=r,o=n.lib,p=o.WordArray,x=o.Hasher,f=n.algo,e=[];(function(){for(var h=0;h<64;h++)e[h]=t.abs(t.sin(h+1))*4294967296|0})();var a=f.MD5=x.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(h,d){for(var E=0;E<16;E++){var l=d+E,u=h[l];h[l]=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360}var v=this._hash.words,g=h[d+0],y=h[d+1],A=h[d+2],D=h[d+3],R=h[d+4],B=h[d+5],F=h[d+6],S=h[d+7],k=h[d+8],H=h[d+9],L=h[d+10],P=h[d+11],$=h[d+12],O=h[d+13],V=h[d+14],M=h[d+15],_=v[0],T=v[1],I=v[2],w=v[3];_=b(_,T,I,w,g,7,e[0]),w=b(w,_,T,I,y,12,e[1]),I=b(I,w,_,T,A,17,e[2]),T=b(T,I,w,_,D,22,e[3]),_=b(_,T,I,w,R,7,e[4]),w=b(w,_,T,I,B,12,e[5]),I=b(I,w,_,T,F,17,e[6]),T=b(T,I,w,_,S,22,e[7]),_=b(_,T,I,w,k,7,e[8]),w=b(w,_,T,I,H,12,e[9]),I=b(I,w,_,T,L,17,e[10]),T=b(T,I,w,_,P,22,e[11]),_=b(_,T,I,w,$,7,e[12]),w=b(w,_,T,I,O,12,e[13]),I=b(I,w,_,T,V,17,e[14]),T=b(T,I,w,_,M,22,e[15]),_=i(_,T,I,w,y,5,e[16]),w=i(w,_,T,I,F,9,e[17]),I=i(I,w,_,T,P,14,e[18]),T=i(T,I,w,_,g,20,e[19]),_=i(_,T,I,w,B,5,e[20]),w=i(w,_,T,I,L,9,e[21]),I=i(I,w,_,T,M,14,e[22]),T=i(T,I,w,_,R,20,e[23]),_=i(_,T,I,w,H,5,e[24]),w=i(w,_,T,I,V,9,e[25]),I=i(I,w,_,T,D,14,e[26]),T=i(T,I,w,_,k,20,e[27]),_=i(_,T,I,w,O,5,e[28]),w=i(w,_,T,I,A,9,e[29]),I=i(I,w,_,T,S,14,e[30]),T=i(T,I,w,_,$,20,e[31]),_=s(_,T,I,w,B,4,e[32]),w=s(w,_,T,I,k,11,e[33]),I=s(I,w,_,T,P,16,e[34]),T=s(T,I,w,_,V,23,e[35]),_=s(_,T,I,w,y,4,e[36]),w=s(w,_,T,I,R,11,e[37]),I=s(I,w,_,T,S,16,e[38]),T=s(T,I,w,_,L,23,e[39]),_=s(_,T,I,w,O,4,e[40]),w=s(w,_,T,I,g,11,e[41]),I=s(I,w,_,T,D,16,e[42]),T=s(T,I,w,_,F,23,e[43]),_=s(_,T,I,w,H,4,e[44]),w=s(w,_,T,I,$,11,e[45]),I=s(I,w,_,T,M,16,e[46]),T=s(T,I,w,_,A,23,e[47]),_=c(_,T,I,w,g,6,e[48]),w=c(w,_,T,I,S,10,e[49]),I=c(I,w,_,T,V,15,e[50]),T=c(T,I,w,_,B,21,e[51]),_=c(_,T,I,w,$,6,e[52]),w=c(w,_,T,I,D,10,e[53]),I=c(I,w,_,T,L,15,e[54]),T=c(T,I,w,_,y,21,e[55]),_=c(_,T,I,w,k,6,e[56]),w=c(w,_,T,I,M,10,e[57]),I=c(I,w,_,T,F,15,e[58]),T=c(T,I,w,_,O,21,e[59]),_=c(_,T,I,w,R,6,e[60]),w=c(w,_,T,I,P,10,e[61]),I=c(I,w,_,T,A,15,e[62]),T=c(T,I,w,_,H,21,e[63]),v[0]=v[0]+_|0,v[1]=v[1]+T|0,v[2]=v[2]+I|0,v[3]=v[3]+w|0},_doFinalize:function(){var h=this._data,d=h.words,E=this._nDataBytes*8,l=h.sigBytes*8;d[l>>>5]|=128<<24-l%32;var u=t.floor(E/4294967296),v=E;d[(l+64>>>9<<4)+15]=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360,d[(l+64>>>9<<4)+14]=(v<<8|v>>>24)&16711935|(v<<24|v>>>8)&4278255360,h.sigBytes=(d.length+1)*4,this._process();for(var g=this._hash,y=g.words,A=0;A<4;A++){var D=y[A];y[A]=(D<<8|D>>>24)&16711935|(D<<24|D>>>8)&4278255360}return g},clone:function(){var h=x.clone.call(this);return h._hash=this._hash.clone(),h}});function b(h,d,E,l,u,v,g){var y=h+(d&E|~d&l)+u+g;return(y<<v|y>>>32-v)+d}function i(h,d,E,l,u,v,g){var y=h+(d&l|E&~l)+u+g;return(y<<v|y>>>32-v)+d}function s(h,d,E,l,u,v,g){var y=h+(d^E^l)+u+g;return(y<<v|y>>>32-v)+d}function c(h,d,E,l,u,v,g){var y=h+(E^(d|~l))+u+g;return(y<<v|y>>>32-v)+d}n.MD5=x._createHelper(a),n.HmacMD5=x._createHmacHelper(a)}(Math),r.MD5})}(w0)),w0.exports}var T0={exports:{}},_t;function oe(){return _t||(_t=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(){var t=r,n=t.lib,o=n.WordArray,p=n.Hasher,x=t.algo,f=[],e=x.SHA1=p.extend({_doReset:function(){this._hash=new o.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(a,b){for(var i=this._hash.words,s=i[0],c=i[1],h=i[2],d=i[3],E=i[4],l=0;l<80;l++){if(l<16)f[l]=a[b+l]|0;else{var u=f[l-3]^f[l-8]^f[l-14]^f[l-16];f[l]=u<<1|u>>>31}var v=(s<<5|s>>>27)+E+f[l];l<20?v+=(c&h|~c&d)+1518500249:l<40?v+=(c^h^d)+1859775393:l<60?v+=(c&h|c&d|h&d)-1894007588:v+=(c^h^d)-899497514,E=d,d=h,h=c<<30|c>>>2,c=s,s=v}i[0]=i[0]+s|0,i[1]=i[1]+c|0,i[2]=i[2]+h|0,i[3]=i[3]+d|0,i[4]=i[4]+E|0},_doFinalize:function(){var a=this._data,b=a.words,i=this._nDataBytes*8,s=a.sigBytes*8;return b[s>>>5]|=128<<24-s%32,b[(s+64>>>9<<4)+14]=Math.floor(i/4294967296),b[(s+64>>>9<<4)+15]=i,a.sigBytes=b.length*4,this._process(),this._hash},clone:function(){var a=p.clone.call(this);return a._hash=this._hash.clone(),a}});t.SHA1=p._createHelper(e),t.HmacSHA1=p._createHmacHelper(e)}(),r.SHA1})}(T0)),T0.exports}var I0={exports:{}},St;function it(){return St||(St=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){return function(t){var n=r,o=n.lib,p=o.WordArray,x=o.Hasher,f=n.algo,e=[],a=[];(function(){function s(E){for(var l=t.sqrt(E),u=2;u<=l;u++)if(!(E%u))return!1;return!0}function c(E){return(E-(E|0))*4294967296|0}for(var h=2,d=0;d<64;)s(h)&&(d<8&&(e[d]=c(t.pow(h,1/2))),a[d]=c(t.pow(h,1/3)),d++),h++})();var b=[],i=f.SHA256=x.extend({_doReset:function(){this._hash=new p.init(e.slice(0))},_doProcessBlock:function(s,c){for(var h=this._hash.words,d=h[0],E=h[1],l=h[2],u=h[3],v=h[4],g=h[5],y=h[6],A=h[7],D=0;D<64;D++){if(D<16)b[D]=s[c+D]|0;else{var R=b[D-15],B=(R<<25|R>>>7)^(R<<14|R>>>18)^R>>>3,F=b[D-2],S=(F<<15|F>>>17)^(F<<13|F>>>19)^F>>>10;b[D]=B+b[D-7]+S+b[D-16]}var k=v&g^~v&y,H=d&E^d&l^E&l,L=(d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22),P=(v<<26|v>>>6)^(v<<21|v>>>11)^(v<<7|v>>>25),$=A+P+k+a[D]+b[D],O=L+H;A=y,y=g,g=v,v=u+$|0,u=l,l=E,E=d,d=$+O|0}h[0]=h[0]+d|0,h[1]=h[1]+E|0,h[2]=h[2]+l|0,h[3]=h[3]+u|0,h[4]=h[4]+v|0,h[5]=h[5]+g|0,h[6]=h[6]+y|0,h[7]=h[7]+A|0},_doFinalize:function(){var s=this._data,c=s.words,h=this._nDataBytes*8,d=s.sigBytes*8;return c[d>>>5]|=128<<24-d%32,c[(d+64>>>9<<4)+14]=t.floor(h/4294967296),c[(d+64>>>9<<4)+15]=h,s.sigBytes=c.length*4,this._process(),this._hash},clone:function(){var s=x.clone.call(this);return s._hash=this._hash.clone(),s}});n.SHA256=x._createHelper(i),n.HmacSHA256=x._createHmacHelper(i)}(Math),r.SHA256})}(I0)),I0.exports}var R0={exports:{}},kt;function Pe(){return kt||(kt=1,function(m,C){(function(r,t,n){m.exports=t(N(),it())})(q,function(r){return function(){var t=r,n=t.lib,o=n.WordArray,p=t.algo,x=p.SHA256,f=p.SHA224=x.extend({_doReset:function(){this._hash=new o.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var e=x._doFinalize.call(this);return e.sigBytes-=4,e}});t.SHA224=x._createHelper(f),t.HmacSHA224=x._createHmacHelper(f)}(),r.SHA224})}(R0)),R0.exports}var H0={exports:{}},wt;function ie(){return wt||(wt=1,function(m,C){(function(r,t,n){m.exports=t(N(),y0())})(q,function(r){return function(){var t=r,n=t.lib,o=n.Hasher,p=t.x64,x=p.Word,f=p.WordArray,e=t.algo;function a(){return x.create.apply(x,arguments)}var b=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],i=[];(function(){for(var c=0;c<80;c++)i[c]=a()})();var s=e.SHA512=o.extend({_doReset:function(){this._hash=new f.init([new x.init(1779033703,4089235720),new x.init(3144134277,2227873595),new x.init(1013904242,4271175723),new x.init(2773480762,1595750129),new x.init(1359893119,2917565137),new x.init(2600822924,725511199),new x.init(528734635,4215389547),new x.init(1541459225,327033209)])},_doProcessBlock:function(c,h){for(var d=this._hash.words,E=d[0],l=d[1],u=d[2],v=d[3],g=d[4],y=d[5],A=d[6],D=d[7],R=E.high,B=E.low,F=l.high,S=l.low,k=u.high,H=u.low,L=v.high,P=v.low,$=g.high,O=g.low,V=y.high,M=y.low,_=A.high,T=A.low,I=D.high,w=D.low,W=R,U=B,X=F,z=S,c0=k,a0=H,g0=L,l0=P,Q=$,G=O,C0=V,d0=M,E0=_,u0=T,A0=I,f0=w,J=0;J<80;J++){var Y,t0,B0=i[J];if(J<16)t0=B0.high=c[h+J*2]|0,Y=B0.low=c[h+J*2+1]|0;else{var st=i[J-15],s0=st.high,p0=st.low,se=(s0>>>1|p0<<31)^(s0>>>8|p0<<24)^s0>>>7,xt=(p0>>>1|s0<<31)^(p0>>>8|s0<<24)^(p0>>>7|s0<<25),ct=i[J-2],x0=ct.high,h0=ct.low,xe=(x0>>>19|h0<<13)^(x0<<3|h0>>>29)^x0>>>6,lt=(h0>>>19|x0<<13)^(h0<<3|x0>>>29)^(h0>>>6|x0<<26),dt=i[J-7],ce=dt.high,le=dt.low,ut=i[J-16],de=ut.high,ft=ut.low;Y=xt+le,t0=se+ce+(Y>>>0<xt>>>0?1:0),Y=Y+lt,t0=t0+xe+(Y>>>0<lt>>>0?1:0),Y=Y+ft,t0=t0+de+(Y>>>0<ft>>>0?1:0),B0.high=t0,B0.low=Y}var ue=Q&C0^~Q&E0,pt=G&d0^~G&u0,fe=W&X^W&c0^X&c0,pe=U&z^U&a0^z&a0,he=(W>>>28|U<<4)^(W<<30|U>>>2)^(W<<25|U>>>7),ht=(U>>>28|W<<4)^(U<<30|W>>>2)^(U<<25|W>>>7),ve=(Q>>>14|G<<18)^(Q>>>18|G<<14)^(Q<<23|G>>>9),be=(G>>>14|Q<<18)^(G>>>18|Q<<14)^(G<<23|Q>>>9),vt=b[J],Ce=vt.high,bt=vt.low,j=f0+be,e0=A0+ve+(j>>>0<f0>>>0?1:0),j=j+pt,e0=e0+ue+(j>>>0<pt>>>0?1:0),j=j+bt,e0=e0+Ce+(j>>>0<bt>>>0?1:0),j=j+Y,e0=e0+t0+(j>>>0<Y>>>0?1:0),Ct=ht+pe,Ee=he+fe+(Ct>>>0<ht>>>0?1:0);A0=E0,f0=u0,E0=C0,u0=d0,C0=Q,d0=G,G=l0+j|0,Q=g0+e0+(G>>>0<l0>>>0?1:0)|0,g0=c0,l0=a0,c0=X,a0=z,X=W,z=U,U=j+Ct|0,W=e0+Ee+(U>>>0<j>>>0?1:0)|0}B=E.low=B+U,E.high=R+W+(B>>>0<U>>>0?1:0),S=l.low=S+z,l.high=F+X+(S>>>0<z>>>0?1:0),H=u.low=H+a0,u.high=k+c0+(H>>>0<a0>>>0?1:0),P=v.low=P+l0,v.high=L+g0+(P>>>0<l0>>>0?1:0),O=g.low=O+G,g.high=$+Q+(O>>>0<G>>>0?1:0),M=y.low=M+d0,y.high=V+C0+(M>>>0<d0>>>0?1:0),T=A.low=T+u0,A.high=_+E0+(T>>>0<u0>>>0?1:0),w=D.low=w+f0,D.high=I+A0+(w>>>0<f0>>>0?1:0)},_doFinalize:function(){var c=this._data,h=c.words,d=this._nDataBytes*8,E=c.sigBytes*8;h[E>>>5]|=128<<24-E%32,h[(E+128>>>10<<5)+30]=Math.floor(d/4294967296),h[(E+128>>>10<<5)+31]=d,c.sigBytes=h.length*4,this._process();var l=this._hash.toX32();return l},clone:function(){var c=o.clone.call(this);return c._hash=this._hash.clone(),c},blockSize:1024/32});t.SHA512=o._createHelper(s),t.HmacSHA512=o._createHmacHelper(s)}(),r.SHA512})}(H0)),H0.exports}var L0={exports:{}},Tt;function qe(){return Tt||(Tt=1,function(m,C){(function(r,t,n){m.exports=t(N(),y0(),ie())})(q,function(r){return function(){var t=r,n=t.x64,o=n.Word,p=n.WordArray,x=t.algo,f=x.SHA512,e=x.SHA384=f.extend({_doReset:function(){this._hash=new p.init([new o.init(3418070365,3238371032),new o.init(1654270250,914150663),new o.init(2438529370,812702999),new o.init(355462360,4144912697),new o.init(1731405415,4290775857),new o.init(2394180231,1750603025),new o.init(3675008525,1694076839),new o.init(1203062813,3204075428)])},_doFinalize:function(){var a=f._doFinalize.call(this);return a.sigBytes-=16,a}});t.SHA384=f._createHelper(e),t.HmacSHA384=f._createHmacHelper(e)}(),r.SHA384})}(L0)),L0.exports}var P0={exports:{}},It;function ze(){return It||(It=1,function(m,C){(function(r,t,n){m.exports=t(N(),y0())})(q,function(r){return function(t){var n=r,o=n.lib,p=o.WordArray,x=o.Hasher,f=n.x64,e=f.Word,a=n.algo,b=[],i=[],s=[];(function(){for(var d=1,E=0,l=0;l<24;l++){b[d+5*E]=(l+1)*(l+2)/2%64;var u=E%5,v=(2*d+3*E)%5;d=u,E=v}for(var d=0;d<5;d++)for(var E=0;E<5;E++)i[d+5*E]=E+(2*d+3*E)%5*5;for(var g=1,y=0;y<24;y++){for(var A=0,D=0,R=0;R<7;R++){if(g&1){var B=(1<<R)-1;B<32?D^=1<<B:A^=1<<B-32}g&128?g=g<<1^113:g<<=1}s[y]=e.create(A,D)}})();var c=[];(function(){for(var d=0;d<25;d++)c[d]=e.create()})();var h=a.SHA3=x.extend({cfg:x.cfg.extend({outputLength:512}),_doReset:function(){for(var d=this._state=[],E=0;E<25;E++)d[E]=new e.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(d,E){for(var l=this._state,u=this.blockSize/2,v=0;v<u;v++){var g=d[E+2*v],y=d[E+2*v+1];g=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360,y=(y<<8|y>>>24)&16711935|(y<<24|y>>>8)&4278255360;var A=l[v];A.high^=y,A.low^=g}for(var D=0;D<24;D++){for(var R=0;R<5;R++){for(var B=0,F=0,S=0;S<5;S++){var A=l[R+5*S];B^=A.high,F^=A.low}var k=c[R];k.high=B,k.low=F}for(var R=0;R<5;R++)for(var H=c[(R+4)%5],L=c[(R+1)%5],P=L.high,$=L.low,B=H.high^(P<<1|$>>>31),F=H.low^($<<1|P>>>31),S=0;S<5;S++){var A=l[R+5*S];A.high^=B,A.low^=F}for(var O=1;O<25;O++){var B,F,A=l[O],V=A.high,M=A.low,_=b[O];_<32?(B=V<<_|M>>>32-_,F=M<<_|V>>>32-_):(B=M<<_-32|V>>>64-_,F=V<<_-32|M>>>64-_);var T=c[i[O]];T.high=B,T.low=F}var I=c[0],w=l[0];I.high=w.high,I.low=w.low;for(var R=0;R<5;R++)for(var S=0;S<5;S++){var O=R+5*S,A=l[O],W=c[O],U=c[(R+1)%5+5*S],X=c[(R+2)%5+5*S];A.high=W.high^~U.high&X.high,A.low=W.low^~U.low&X.low}var A=l[0],z=s[D];A.high^=z.high,A.low^=z.low}},_doFinalize:function(){var d=this._data,E=d.words;this._nDataBytes*8;var l=d.sigBytes*8,u=this.blockSize*32;E[l>>>5]|=1<<24-l%32,E[(t.ceil((l+1)/u)*u>>>5)-1]|=128,d.sigBytes=E.length*4,this._process();for(var v=this._state,g=this.cfg.outputLength/8,y=g/8,A=[],D=0;D<y;D++){var R=v[D],B=R.high,F=R.low;B=(B<<8|B>>>24)&16711935|(B<<24|B>>>8)&4278255360,F=(F<<8|F>>>24)&16711935|(F<<24|F>>>8)&4278255360,A.push(F),A.push(B)}return new p.init(A,g)},clone:function(){for(var d=x.clone.call(this),E=d._state=this._state.slice(0),l=0;l<25;l++)E[l]=E[l].clone();return d}});n.SHA3=x._createHelper(h),n.HmacSHA3=x._createHmacHelper(h)}(Math),r.SHA3})}(P0)),P0.exports}var q0={exports:{}},Rt;function Ne(){return Rt||(Rt=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){/** @preserve
			(c) 2012 by Cédric Mesnil. All rights reserved.

			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			*/return function(t){var n=r,o=n.lib,p=o.WordArray,x=o.Hasher,f=n.algo,e=p.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),a=p.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),b=p.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),i=p.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),s=p.create([0,1518500249,1859775393,2400959708,2840853838]),c=p.create([1352829926,1548603684,1836072691,2053994217,0]),h=f.RIPEMD160=x.extend({_doReset:function(){this._hash=p.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(y,A){for(var D=0;D<16;D++){var R=A+D,B=y[R];y[R]=(B<<8|B>>>24)&16711935|(B<<24|B>>>8)&4278255360}var F=this._hash.words,S=s.words,k=c.words,H=e.words,L=a.words,P=b.words,$=i.words,O,V,M,_,T,I,w,W,U,X;I=O=F[0],w=V=F[1],W=M=F[2],U=_=F[3],X=T=F[4];for(var z,D=0;D<80;D+=1)z=O+y[A+H[D]]|0,D<16?z+=d(V,M,_)+S[0]:D<32?z+=E(V,M,_)+S[1]:D<48?z+=l(V,M,_)+S[2]:D<64?z+=u(V,M,_)+S[3]:z+=v(V,M,_)+S[4],z=z|0,z=g(z,P[D]),z=z+T|0,O=T,T=_,_=g(M,10),M=V,V=z,z=I+y[A+L[D]]|0,D<16?z+=v(w,W,U)+k[0]:D<32?z+=u(w,W,U)+k[1]:D<48?z+=l(w,W,U)+k[2]:D<64?z+=E(w,W,U)+k[3]:z+=d(w,W,U)+k[4],z=z|0,z=g(z,$[D]),z=z+X|0,I=X,X=U,U=g(W,10),W=w,w=z;z=F[1]+M+U|0,F[1]=F[2]+_+X|0,F[2]=F[3]+T+I|0,F[3]=F[4]+O+w|0,F[4]=F[0]+V+W|0,F[0]=z},_doFinalize:function(){var y=this._data,A=y.words,D=this._nDataBytes*8,R=y.sigBytes*8;A[R>>>5]|=128<<24-R%32,A[(R+64>>>9<<4)+14]=(D<<8|D>>>24)&16711935|(D<<24|D>>>8)&4278255360,y.sigBytes=(A.length+1)*4,this._process();for(var B=this._hash,F=B.words,S=0;S<5;S++){var k=F[S];F[S]=(k<<8|k>>>24)&16711935|(k<<24|k>>>8)&4278255360}return B},clone:function(){var y=x.clone.call(this);return y._hash=this._hash.clone(),y}});function d(y,A,D){return y^A^D}function E(y,A,D){return y&A|~y&D}function l(y,A,D){return(y|~A)^D}function u(y,A,D){return y&D|A&~D}function v(y,A,D){return y^(A|~D)}function g(y,A){return y<<A|y>>>32-A}n.RIPEMD160=x._createHelper(h),n.HmacRIPEMD160=x._createHmacHelper(h)}(),r.RIPEMD160})}(q0)),q0.exports}var z0={exports:{}},Ht;function at(){return Ht||(Ht=1,function(m,C){(function(r,t){m.exports=t(N())})(q,function(r){(function(){var t=r,n=t.lib,o=n.Base,p=t.enc,x=p.Utf8,f=t.algo;f.HMAC=o.extend({init:function(e,a){e=this._hasher=new e.init,typeof a=="string"&&(a=x.parse(a));var b=e.blockSize,i=b*4;a.sigBytes>i&&(a=e.finalize(a)),a.clamp();for(var s=this._oKey=a.clone(),c=this._iKey=a.clone(),h=s.words,d=c.words,E=0;E<b;E++)h[E]^=1549556828,d[E]^=909522486;s.sigBytes=c.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var a=this._hasher,b=a.finalize(e);a.reset();var i=a.finalize(this._oKey.clone().concat(b));return i}})})()})}(z0)),z0.exports}var N0={exports:{}},Lt;function Oe(){return Lt||(Lt=1,function(m,C){(function(r,t,n){m.exports=t(N(),it(),at())})(q,function(r){return function(){var t=r,n=t.lib,o=n.Base,p=n.WordArray,x=t.algo,f=x.SHA256,e=x.HMAC,a=x.PBKDF2=o.extend({cfg:o.extend({keySize:128/32,hasher:f,iterations:25e4}),init:function(b){this.cfg=this.cfg.extend(b)},compute:function(b,i){for(var s=this.cfg,c=e.create(s.hasher,b),h=p.create(),d=p.create([1]),E=h.words,l=d.words,u=s.keySize,v=s.iterations;E.length<u;){var g=c.update(i).finalize(d);c.reset();for(var y=g.words,A=y.length,D=g,R=1;R<v;R++){D=c.finalize(D),c.reset();for(var B=D.words,F=0;F<A;F++)y[F]^=B[F]}h.concat(g),l[0]++}return h.sigBytes=u*4,h}});t.PBKDF2=function(b,i,s){return a.create(s).compute(b,i)}}(),r.PBKDF2})}(N0)),N0.exports}var O0={exports:{}},Pt;function r0(){return Pt||(Pt=1,function(m,C){(function(r,t,n){m.exports=t(N(),oe(),at())})(q,function(r){return function(){var t=r,n=t.lib,o=n.Base,p=n.WordArray,x=t.algo,f=x.MD5,e=x.EvpKDF=o.extend({cfg:o.extend({keySize:128/32,hasher:f,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){for(var i,s=this.cfg,c=s.hasher.create(),h=p.create(),d=h.words,E=s.keySize,l=s.iterations;d.length<E;){i&&c.update(i),i=c.update(a).finalize(b),c.reset();for(var u=1;u<l;u++)i=c.finalize(i),c.reset();h.concat(i)}return h.sigBytes=E*4,h}});t.EvpKDF=function(a,b,i){return e.create(i).compute(a,b)}}(),r.EvpKDF})}(O0)),O0.exports}var M0={exports:{}},qt;function K(){return qt||(qt=1,function(m,C){(function(r,t,n){m.exports=t(N(),r0())})(q,function(r){r.lib.Cipher||function(t){var n=r,o=n.lib,p=o.Base,x=o.WordArray,f=o.BufferedBlockAlgorithm,e=n.enc;e.Utf8;var a=e.Base64,b=n.algo,i=b.EvpKDF,s=o.Cipher=f.extend({cfg:p.extend(),createEncryptor:function(B,F){return this.create(this._ENC_XFORM_MODE,B,F)},createDecryptor:function(B,F){return this.create(this._DEC_XFORM_MODE,B,F)},init:function(B,F,S){this.cfg=this.cfg.extend(S),this._xformMode=B,this._key=F,this.reset()},reset:function(){f.reset.call(this),this._doReset()},process:function(B){return this._append(B),this._process()},finalize:function(B){B&&this._append(B);var F=this._doFinalize();return F},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function B(F){return typeof F=="string"?R:y}return function(F){return{encrypt:function(S,k,H){return B(k).encrypt(F,S,k,H)},decrypt:function(S,k,H){return B(k).decrypt(F,S,k,H)}}}}()});o.StreamCipher=s.extend({_doFinalize:function(){var B=this._process(!0);return B},blockSize:1});var c=n.mode={},h=o.BlockCipherMode=p.extend({createEncryptor:function(B,F){return this.Encryptor.create(B,F)},createDecryptor:function(B,F){return this.Decryptor.create(B,F)},init:function(B,F){this._cipher=B,this._iv=F}}),d=c.CBC=function(){var B=h.extend();B.Encryptor=B.extend({processBlock:function(S,k){var H=this._cipher,L=H.blockSize;F.call(this,S,k,L),H.encryptBlock(S,k),this._prevBlock=S.slice(k,k+L)}}),B.Decryptor=B.extend({processBlock:function(S,k){var H=this._cipher,L=H.blockSize,P=S.slice(k,k+L);H.decryptBlock(S,k),F.call(this,S,k,L),this._prevBlock=P}});function F(S,k,H){var L,P=this._iv;P?(L=P,this._iv=t):L=this._prevBlock;for(var $=0;$<H;$++)S[k+$]^=L[$]}return B}(),E=n.pad={},l=E.Pkcs7={pad:function(B,F){for(var S=F*4,k=S-B.sigBytes%S,H=k<<24|k<<16|k<<8|k,L=[],P=0;P<k;P+=4)L.push(H);var $=x.create(L,k);B.concat($)},unpad:function(B){var F=B.words[B.sigBytes-1>>>2]&255;B.sigBytes-=F}};o.BlockCipher=s.extend({cfg:s.cfg.extend({mode:d,padding:l}),reset:function(){var B;s.reset.call(this);var F=this.cfg,S=F.iv,k=F.mode;this._xformMode==this._ENC_XFORM_MODE?B=k.createEncryptor:(B=k.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==B?this._mode.init(this,S&&S.words):(this._mode=B.call(k,this,S&&S.words),this._mode.__creator=B)},_doProcessBlock:function(B,F){this._mode.processBlock(B,F)},_doFinalize:function(){var B,F=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(F.pad(this._data,this.blockSize),B=this._process(!0)):(B=this._process(!0),F.unpad(B)),B},blockSize:128/32});var u=o.CipherParams=p.extend({init:function(B){this.mixIn(B)},toString:function(B){return(B||this.formatter).stringify(this)}}),v=n.format={},g=v.OpenSSL={stringify:function(B){var F,S=B.ciphertext,k=B.salt;return k?F=x.create([1398893684,1701076831]).concat(k).concat(S):F=S,F.toString(a)},parse:function(B){var F,S=a.parse(B),k=S.words;return k[0]==1398893684&&k[1]==1701076831&&(F=x.create(k.slice(2,4)),k.splice(0,4),S.sigBytes-=16),u.create({ciphertext:S,salt:F})}},y=o.SerializableCipher=p.extend({cfg:p.extend({format:g}),encrypt:function(B,F,S,k){k=this.cfg.extend(k);var H=B.createEncryptor(S,k),L=H.finalize(F),P=H.cfg;return u.create({ciphertext:L,key:S,iv:P.iv,algorithm:B,mode:P.mode,padding:P.padding,blockSize:B.blockSize,formatter:k.format})},decrypt:function(B,F,S,k){k=this.cfg.extend(k),F=this._parse(F,k.format);var H=B.createDecryptor(S,k).finalize(F.ciphertext);return H},_parse:function(B,F){return typeof B=="string"?F.parse(B,this):B}}),A=n.kdf={},D=A.OpenSSL={execute:function(B,F,S,k,H){if(k||(k=x.random(64/8)),H)var L=i.create({keySize:F+S,hasher:H}).compute(B,k);else var L=i.create({keySize:F+S}).compute(B,k);var P=x.create(L.words.slice(F),S*4);return L.sigBytes=F*4,u.create({key:L,iv:P,salt:k})}},R=o.PasswordBasedCipher=y.extend({cfg:y.cfg.extend({kdf:D}),encrypt:function(B,F,S,k){k=this.cfg.extend(k);var H=k.kdf.execute(S,B.keySize,B.ivSize,k.salt,k.hasher);k.iv=H.iv;var L=y.encrypt.call(this,B,F,H.key,k);return L.mixIn(H),L},decrypt:function(B,F,S,k){k=this.cfg.extend(k),F=this._parse(F,k.format);var H=k.kdf.execute(S,B.keySize,B.ivSize,F.salt,k.hasher);k.iv=H.iv;var L=y.decrypt.call(this,B,F,H.key,k);return L}})}()})}(M0)),M0.exports}var V0={exports:{}},zt;function Me(){return zt||(zt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.mode.CFB=function(){var t=r.lib.BlockCipherMode.extend();t.Encryptor=t.extend({processBlock:function(o,p){var x=this._cipher,f=x.blockSize;n.call(this,o,p,f,x),this._prevBlock=o.slice(p,p+f)}}),t.Decryptor=t.extend({processBlock:function(o,p){var x=this._cipher,f=x.blockSize,e=o.slice(p,p+f);n.call(this,o,p,f,x),this._prevBlock=e}});function n(o,p,x,f){var e,a=this._iv;a?(e=a.slice(0),this._iv=void 0):e=this._prevBlock,f.encryptBlock(e,0);for(var b=0;b<x;b++)o[p+b]^=e[b]}return t}(),r.mode.CFB})}(V0)),V0.exports}var U0={exports:{}},Nt;function Ve(){return Nt||(Nt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.mode.CTR=function(){var t=r.lib.BlockCipherMode.extend(),n=t.Encryptor=t.extend({processBlock:function(o,p){var x=this._cipher,f=x.blockSize,e=this._iv,a=this._counter;e&&(a=this._counter=e.slice(0),this._iv=void 0);var b=a.slice(0);x.encryptBlock(b,0),a[f-1]=a[f-1]+1|0;for(var i=0;i<f;i++)o[p+i]^=b[i]}});return t.Decryptor=n,t}(),r.mode.CTR})}(U0)),U0.exports}var $0={exports:{}},Ot;function Ue(){return Ot||(Ot=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */return r.mode.CTRGladman=function(){var t=r.lib.BlockCipherMode.extend();function n(x){if((x>>24&255)===255){var f=x>>16&255,e=x>>8&255,a=x&255;f===255?(f=0,e===255?(e=0,a===255?a=0:++a):++e):++f,x=0,x+=f<<16,x+=e<<8,x+=a}else x+=1<<24;return x}function o(x){return(x[0]=n(x[0]))===0&&(x[1]=n(x[1])),x}var p=t.Encryptor=t.extend({processBlock:function(x,f){var e=this._cipher,a=e.blockSize,b=this._iv,i=this._counter;b&&(i=this._counter=b.slice(0),this._iv=void 0),o(i);var s=i.slice(0);e.encryptBlock(s,0);for(var c=0;c<a;c++)x[f+c]^=s[c]}});return t.Decryptor=p,t}(),r.mode.CTRGladman})}($0)),$0.exports}var W0={exports:{}},Mt;function $e(){return Mt||(Mt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.mode.OFB=function(){var t=r.lib.BlockCipherMode.extend(),n=t.Encryptor=t.extend({processBlock:function(o,p){var x=this._cipher,f=x.blockSize,e=this._iv,a=this._keystream;e&&(a=this._keystream=e.slice(0),this._iv=void 0),x.encryptBlock(a,0);for(var b=0;b<f;b++)o[p+b]^=a[b]}});return t.Decryptor=n,t}(),r.mode.OFB})}(W0)),W0.exports}var K0={exports:{}},Vt;function We(){return Vt||(Vt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.mode.ECB=function(){var t=r.lib.BlockCipherMode.extend();return t.Encryptor=t.extend({processBlock:function(n,o){this._cipher.encryptBlock(n,o)}}),t.Decryptor=t.extend({processBlock:function(n,o){this._cipher.decryptBlock(n,o)}}),t}(),r.mode.ECB})}(K0)),K0.exports}var X0={exports:{}},Ut;function Ke(){return Ut||(Ut=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.pad.AnsiX923={pad:function(t,n){var o=t.sigBytes,p=n*4,x=p-o%p,f=o+x-1;t.clamp(),t.words[f>>>2]|=x<<24-f%4*8,t.sigBytes+=x},unpad:function(t){var n=t.words[t.sigBytes-1>>>2]&255;t.sigBytes-=n}},r.pad.Ansix923})}(X0)),X0.exports}var G0={exports:{}},$t;function Xe(){return $t||($t=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.pad.Iso10126={pad:function(t,n){var o=n*4,p=o-t.sigBytes%o;t.concat(r.lib.WordArray.random(p-1)).concat(r.lib.WordArray.create([p<<24],1))},unpad:function(t){var n=t.words[t.sigBytes-1>>>2]&255;t.sigBytes-=n}},r.pad.Iso10126})}(G0)),G0.exports}var j0={exports:{}},Wt;function Ge(){return Wt||(Wt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.pad.Iso97971={pad:function(t,n){t.concat(r.lib.WordArray.create([2147483648],1)),r.pad.ZeroPadding.pad(t,n)},unpad:function(t){r.pad.ZeroPadding.unpad(t),t.sigBytes--}},r.pad.Iso97971})}(j0)),j0.exports}var Z0={exports:{}},Kt;function je(){return Kt||(Kt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.pad.ZeroPadding={pad:function(t,n){var o=n*4;t.clamp(),t.sigBytes+=o-(t.sigBytes%o||o)},unpad:function(t){for(var n=t.words,o=t.sigBytes-1,o=t.sigBytes-1;o>=0;o--)if(n[o>>>2]>>>24-o%4*8&255){t.sigBytes=o+1;break}}},r.pad.ZeroPadding})}(Z0)),Z0.exports}var Y0={exports:{}},Xt;function Ze(){return Xt||(Xt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return r.pad.NoPadding={pad:function(){},unpad:function(){}},r.pad.NoPadding})}(Y0)),Y0.exports}var Q0={exports:{}},Gt;function Ye(){return Gt||(Gt=1,function(m,C){(function(r,t,n){m.exports=t(N(),K())})(q,function(r){return function(t){var n=r,o=n.lib,p=o.CipherParams,x=n.enc,f=x.Hex,e=n.format;e.Hex={stringify:function(a){return a.ciphertext.toString(f)},parse:function(a){var b=f.parse(a);return p.create({ciphertext:b})}}}(),r.format.Hex})}(Q0)),Q0.exports}var J0={exports:{}},jt;function Qe(){return jt||(jt=1,function(m,C){(function(r,t,n){m.exports=t(N(),n0(),o0(),r0(),K())})(q,function(r){return function(){var t=r,n=t.lib,o=n.BlockCipher,p=t.algo,x=[],f=[],e=[],a=[],b=[],i=[],s=[],c=[],h=[],d=[];(function(){for(var u=[],v=0;v<256;v++)v<128?u[v]=v<<1:u[v]=v<<1^283;for(var g=0,y=0,v=0;v<256;v++){var A=y^y<<1^y<<2^y<<3^y<<4;A=A>>>8^A&255^99,x[g]=A,f[A]=g;var D=u[g],R=u[D],B=u[R],F=u[A]*257^A*16843008;e[g]=F<<24|F>>>8,a[g]=F<<16|F>>>16,b[g]=F<<8|F>>>24,i[g]=F;var F=B*16843009^R*65537^D*257^g*16843008;s[A]=F<<24|F>>>8,c[A]=F<<16|F>>>16,h[A]=F<<8|F>>>24,d[A]=F,g?(g=D^u[u[u[B^D]]],y^=u[u[y]]):g=y=1}})();var E=[0,1,2,4,8,16,32,64,128,27,54],l=p.AES=o.extend({_doReset:function(){var u;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var v=this._keyPriorReset=this._key,g=v.words,y=v.sigBytes/4,A=this._nRounds=y+6,D=(A+1)*4,R=this._keySchedule=[],B=0;B<D;B++)B<y?R[B]=g[B]:(u=R[B-1],B%y?y>6&&B%y==4&&(u=x[u>>>24]<<24|x[u>>>16&255]<<16|x[u>>>8&255]<<8|x[u&255]):(u=u<<8|u>>>24,u=x[u>>>24]<<24|x[u>>>16&255]<<16|x[u>>>8&255]<<8|x[u&255],u^=E[B/y|0]<<24),R[B]=R[B-y]^u);for(var F=this._invKeySchedule=[],S=0;S<D;S++){var B=D-S;if(S%4)var u=R[B];else var u=R[B-4];S<4||B<=4?F[S]=u:F[S]=s[x[u>>>24]]^c[x[u>>>16&255]]^h[x[u>>>8&255]]^d[x[u&255]]}}},encryptBlock:function(u,v){this._doCryptBlock(u,v,this._keySchedule,e,a,b,i,x)},decryptBlock:function(u,v){var g=u[v+1];u[v+1]=u[v+3],u[v+3]=g,this._doCryptBlock(u,v,this._invKeySchedule,s,c,h,d,f);var g=u[v+1];u[v+1]=u[v+3],u[v+3]=g},_doCryptBlock:function(u,v,g,y,A,D,R,B){for(var F=this._nRounds,S=u[v]^g[0],k=u[v+1]^g[1],H=u[v+2]^g[2],L=u[v+3]^g[3],P=4,$=1;$<F;$++){var O=y[S>>>24]^A[k>>>16&255]^D[H>>>8&255]^R[L&255]^g[P++],V=y[k>>>24]^A[H>>>16&255]^D[L>>>8&255]^R[S&255]^g[P++],M=y[H>>>24]^A[L>>>16&255]^D[S>>>8&255]^R[k&255]^g[P++],_=y[L>>>24]^A[S>>>16&255]^D[k>>>8&255]^R[H&255]^g[P++];S=O,k=V,H=M,L=_}var O=(B[S>>>24]<<24|B[k>>>16&255]<<16|B[H>>>8&255]<<8|B[L&255])^g[P++],V=(B[k>>>24]<<24|B[H>>>16&255]<<16|B[L>>>8&255]<<8|B[S&255])^g[P++],M=(B[H>>>24]<<24|B[L>>>16&255]<<16|B[S>>>8&255]<<8|B[k&255])^g[P++],_=(B[L>>>24]<<24|B[S>>>16&255]<<16|B[k>>>8&255]<<8|B[H&255])^g[P++];u[v]=O,u[v+1]=V,u[v+2]=M,u[v+3]=_},keySize:256/32});t.AES=o._createHelper(l)}(),r.AES})}(J0)),J0.exports}var tt={exports:{}},Zt;function Je(){return Zt||(Zt=1,function(m,C){(function(r,t,n){m.exports=t(N(),n0(),o0(),r0(),K())})(q,function(r){return function(){var t=r,n=t.lib,o=n.WordArray,p=n.BlockCipher,x=t.algo,f=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],e=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],a=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],b=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],i=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],s=x.DES=p.extend({_doReset:function(){for(var E=this._key,l=E.words,u=[],v=0;v<56;v++){var g=f[v]-1;u[v]=l[g>>>5]>>>31-g%32&1}for(var y=this._subKeys=[],A=0;A<16;A++){for(var D=y[A]=[],R=a[A],v=0;v<24;v++)D[v/6|0]|=u[(e[v]-1+R)%28]<<31-v%6,D[4+(v/6|0)]|=u[28+(e[v+24]-1+R)%28]<<31-v%6;D[0]=D[0]<<1|D[0]>>>31;for(var v=1;v<7;v++)D[v]=D[v]>>>(v-1)*4+3;D[7]=D[7]<<5|D[7]>>>27}for(var B=this._invSubKeys=[],v=0;v<16;v++)B[v]=y[15-v]},encryptBlock:function(E,l){this._doCryptBlock(E,l,this._subKeys)},decryptBlock:function(E,l){this._doCryptBlock(E,l,this._invSubKeys)},_doCryptBlock:function(E,l,u){this._lBlock=E[l],this._rBlock=E[l+1],c.call(this,4,252645135),c.call(this,16,65535),h.call(this,2,858993459),h.call(this,8,16711935),c.call(this,1,1431655765);for(var v=0;v<16;v++){for(var g=u[v],y=this._lBlock,A=this._rBlock,D=0,R=0;R<8;R++)D|=b[R][((A^g[R])&i[R])>>>0];this._lBlock=A,this._rBlock=y^D}var B=this._lBlock;this._lBlock=this._rBlock,this._rBlock=B,c.call(this,1,1431655765),h.call(this,8,16711935),h.call(this,2,858993459),c.call(this,16,65535),c.call(this,4,252645135),E[l]=this._lBlock,E[l+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function c(E,l){var u=(this._lBlock>>>E^this._rBlock)&l;this._rBlock^=u,this._lBlock^=u<<E}function h(E,l){var u=(this._rBlock>>>E^this._lBlock)&l;this._lBlock^=u,this._rBlock^=u<<E}t.DES=p._createHelper(s);var d=x.TripleDES=p.extend({_doReset:function(){var E=this._key,l=E.words;if(l.length!==2&&l.length!==4&&l.length<6)throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var u=l.slice(0,2),v=l.length<4?l.slice(0,2):l.slice(2,4),g=l.length<6?l.slice(0,2):l.slice(4,6);this._des1=s.createEncryptor(o.create(u)),this._des2=s.createEncryptor(o.create(v)),this._des3=s.createEncryptor(o.create(g))},encryptBlock:function(E,l){this._des1.encryptBlock(E,l),this._des2.decryptBlock(E,l),this._des3.encryptBlock(E,l)},decryptBlock:function(E,l){this._des3.decryptBlock(E,l),this._des2.encryptBlock(E,l),this._des1.decryptBlock(E,l)},keySize:192/32,ivSize:64/32,blockSize:64/32});t.TripleDES=p._createHelper(d)}(),r.TripleDES})}(tt)),tt.exports}var et={exports:{}},Yt;function tr(){return Yt||(Yt=1,function(m,C){(function(r,t,n){m.exports=t(N(),n0(),o0(),r0(),K())})(q,function(r){return function(){var t=r,n=t.lib,o=n.StreamCipher,p=t.algo,x=p.RC4=o.extend({_doReset:function(){for(var a=this._key,b=a.words,i=a.sigBytes,s=this._S=[],c=0;c<256;c++)s[c]=c;for(var c=0,h=0;c<256;c++){var d=c%i,E=b[d>>>2]>>>24-d%4*8&255;h=(h+s[c]+E)%256;var l=s[c];s[c]=s[h],s[h]=l}this._i=this._j=0},_doProcessBlock:function(a,b){a[b]^=f.call(this)},keySize:256/32,ivSize:0});function f(){for(var a=this._S,b=this._i,i=this._j,s=0,c=0;c<4;c++){b=(b+1)%256,i=(i+a[b])%256;var h=a[b];a[b]=a[i],a[i]=h,s|=a[(a[b]+a[i])%256]<<24-c*8}return this._i=b,this._j=i,s}t.RC4=o._createHelper(x);var e=p.RC4Drop=x.extend({cfg:x.cfg.extend({drop:192}),_doReset:function(){x._doReset.call(this);for(var a=this.cfg.drop;a>0;a--)f.call(this)}});t.RC4Drop=o._createHelper(e)}(),r.RC4})}(et)),et.exports}var rt={exports:{}},Qt;function er(){return Qt||(Qt=1,function(m,C){(function(r,t,n){m.exports=t(N(),n0(),o0(),r0(),K())})(q,function(r){return function(){var t=r,n=t.lib,o=n.StreamCipher,p=t.algo,x=[],f=[],e=[],a=p.Rabbit=o.extend({_doReset:function(){for(var i=this._key.words,s=this.cfg.iv,c=0;c<4;c++)i[c]=(i[c]<<8|i[c]>>>24)&16711935|(i[c]<<24|i[c]>>>8)&4278255360;var h=this._X=[i[0],i[3]<<16|i[2]>>>16,i[1],i[0]<<16|i[3]>>>16,i[2],i[1]<<16|i[0]>>>16,i[3],i[2]<<16|i[1]>>>16],d=this._C=[i[2]<<16|i[2]>>>16,i[0]&4294901760|i[1]&65535,i[3]<<16|i[3]>>>16,i[1]&4294901760|i[2]&65535,i[0]<<16|i[0]>>>16,i[2]&4294901760|i[3]&65535,i[1]<<16|i[1]>>>16,i[3]&4294901760|i[0]&65535];this._b=0;for(var c=0;c<4;c++)b.call(this);for(var c=0;c<8;c++)d[c]^=h[c+4&7];if(s){var E=s.words,l=E[0],u=E[1],v=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360,g=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360,y=v>>>16|g&4294901760,A=g<<16|v&65535;d[0]^=v,d[1]^=y,d[2]^=g,d[3]^=A,d[4]^=v,d[5]^=y,d[6]^=g,d[7]^=A;for(var c=0;c<4;c++)b.call(this)}},_doProcessBlock:function(i,s){var c=this._X;b.call(this),x[0]=c[0]^c[5]>>>16^c[3]<<16,x[1]=c[2]^c[7]>>>16^c[5]<<16,x[2]=c[4]^c[1]>>>16^c[7]<<16,x[3]=c[6]^c[3]>>>16^c[1]<<16;for(var h=0;h<4;h++)x[h]=(x[h]<<8|x[h]>>>24)&16711935|(x[h]<<24|x[h]>>>8)&4278255360,i[s+h]^=x[h]},blockSize:128/32,ivSize:64/32});function b(){for(var i=this._X,s=this._C,c=0;c<8;c++)f[c]=s[c];s[0]=s[0]+1295307597+this._b|0,s[1]=s[1]+3545052371+(s[0]>>>0<f[0]>>>0?1:0)|0,s[2]=s[2]+886263092+(s[1]>>>0<f[1]>>>0?1:0)|0,s[3]=s[3]+1295307597+(s[2]>>>0<f[2]>>>0?1:0)|0,s[4]=s[4]+3545052371+(s[3]>>>0<f[3]>>>0?1:0)|0,s[5]=s[5]+886263092+(s[4]>>>0<f[4]>>>0?1:0)|0,s[6]=s[6]+1295307597+(s[5]>>>0<f[5]>>>0?1:0)|0,s[7]=s[7]+3545052371+(s[6]>>>0<f[6]>>>0?1:0)|0,this._b=s[7]>>>0<f[7]>>>0?1:0;for(var c=0;c<8;c++){var h=i[c]+s[c],d=h&65535,E=h>>>16,l=((d*d>>>17)+d*E>>>15)+E*E,u=((h&4294901760)*h|0)+((h&65535)*h|0);e[c]=l^u}i[0]=e[0]+(e[7]<<16|e[7]>>>16)+(e[6]<<16|e[6]>>>16)|0,i[1]=e[1]+(e[0]<<8|e[0]>>>24)+e[7]|0,i[2]=e[2]+(e[1]<<16|e[1]>>>16)+(e[0]<<16|e[0]>>>16)|0,i[3]=e[3]+(e[2]<<8|e[2]>>>24)+e[1]|0,i[4]=e[4]+(e[3]<<16|e[3]>>>16)+(e[2]<<16|e[2]>>>16)|0,i[5]=e[5]+(e[4]<<8|e[4]>>>24)+e[3]|0,i[6]=e[6]+(e[5]<<16|e[5]>>>16)+(e[4]<<16|e[4]>>>16)|0,i[7]=e[7]+(e[6]<<8|e[6]>>>24)+e[5]|0}t.Rabbit=o._createHelper(a)}(),r.Rabbit})}(rt)),rt.exports}var nt={exports:{}},Jt;function rr(){return Jt||(Jt=1,function(m,C){(function(r,t,n){m.exports=t(N(),n0(),o0(),r0(),K())})(q,function(r){return function(){var t=r,n=t.lib,o=n.StreamCipher,p=t.algo,x=[],f=[],e=[],a=p.RabbitLegacy=o.extend({_doReset:function(){var i=this._key.words,s=this.cfg.iv,c=this._X=[i[0],i[3]<<16|i[2]>>>16,i[1],i[0]<<16|i[3]>>>16,i[2],i[1]<<16|i[0]>>>16,i[3],i[2]<<16|i[1]>>>16],h=this._C=[i[2]<<16|i[2]>>>16,i[0]&4294901760|i[1]&65535,i[3]<<16|i[3]>>>16,i[1]&4294901760|i[2]&65535,i[0]<<16|i[0]>>>16,i[2]&4294901760|i[3]&65535,i[1]<<16|i[1]>>>16,i[3]&4294901760|i[0]&65535];this._b=0;for(var d=0;d<4;d++)b.call(this);for(var d=0;d<8;d++)h[d]^=c[d+4&7];if(s){var E=s.words,l=E[0],u=E[1],v=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360,g=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360,y=v>>>16|g&4294901760,A=g<<16|v&65535;h[0]^=v,h[1]^=y,h[2]^=g,h[3]^=A,h[4]^=v,h[5]^=y,h[6]^=g,h[7]^=A;for(var d=0;d<4;d++)b.call(this)}},_doProcessBlock:function(i,s){var c=this._X;b.call(this),x[0]=c[0]^c[5]>>>16^c[3]<<16,x[1]=c[2]^c[7]>>>16^c[5]<<16,x[2]=c[4]^c[1]>>>16^c[7]<<16,x[3]=c[6]^c[3]>>>16^c[1]<<16;for(var h=0;h<4;h++)x[h]=(x[h]<<8|x[h]>>>24)&16711935|(x[h]<<24|x[h]>>>8)&4278255360,i[s+h]^=x[h]},blockSize:128/32,ivSize:64/32});function b(){for(var i=this._X,s=this._C,c=0;c<8;c++)f[c]=s[c];s[0]=s[0]+1295307597+this._b|0,s[1]=s[1]+3545052371+(s[0]>>>0<f[0]>>>0?1:0)|0,s[2]=s[2]+886263092+(s[1]>>>0<f[1]>>>0?1:0)|0,s[3]=s[3]+1295307597+(s[2]>>>0<f[2]>>>0?1:0)|0,s[4]=s[4]+3545052371+(s[3]>>>0<f[3]>>>0?1:0)|0,s[5]=s[5]+886263092+(s[4]>>>0<f[4]>>>0?1:0)|0,s[6]=s[6]+1295307597+(s[5]>>>0<f[5]>>>0?1:0)|0,s[7]=s[7]+3545052371+(s[6]>>>0<f[6]>>>0?1:0)|0,this._b=s[7]>>>0<f[7]>>>0?1:0;for(var c=0;c<8;c++){var h=i[c]+s[c],d=h&65535,E=h>>>16,l=((d*d>>>17)+d*E>>>15)+E*E,u=((h&4294901760)*h|0)+((h&65535)*h|0);e[c]=l^u}i[0]=e[0]+(e[7]<<16|e[7]>>>16)+(e[6]<<16|e[6]>>>16)|0,i[1]=e[1]+(e[0]<<8|e[0]>>>24)+e[7]|0,i[2]=e[2]+(e[1]<<16|e[1]>>>16)+(e[0]<<16|e[0]>>>16)|0,i[3]=e[3]+(e[2]<<8|e[2]>>>24)+e[1]|0,i[4]=e[4]+(e[3]<<16|e[3]>>>16)+(e[2]<<16|e[2]>>>16)|0,i[5]=e[5]+(e[4]<<8|e[4]>>>24)+e[3]|0,i[6]=e[6]+(e[5]<<16|e[5]>>>16)+(e[4]<<16|e[4]>>>16)|0,i[7]=e[7]+(e[6]<<8|e[6]>>>24)+e[5]|0}t.RabbitLegacy=o._createHelper(a)}(),r.RabbitLegacy})}(nt)),nt.exports}var ot={exports:{}},te;function nr(){return te||(te=1,function(m,C){(function(r,t,n){m.exports=t(N(),n0(),o0(),r0(),K())})(q,function(r){return function(){var t=r,n=t.lib,o=n.BlockCipher,p=t.algo;const x=16,f=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],e=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var a={pbox:[],sbox:[]};function b(d,E){let l=E>>24&255,u=E>>16&255,v=E>>8&255,g=E&255,y=d.sbox[0][l]+d.sbox[1][u];return y=y^d.sbox[2][v],y=y+d.sbox[3][g],y}function i(d,E,l){let u=E,v=l,g;for(let y=0;y<x;++y)u=u^d.pbox[y],v=b(d,u)^v,g=u,u=v,v=g;return g=u,u=v,v=g,v=v^d.pbox[x],u=u^d.pbox[x+1],{left:u,right:v}}function s(d,E,l){let u=E,v=l,g;for(let y=x+1;y>1;--y)u=u^d.pbox[y],v=b(d,u)^v,g=u,u=v,v=g;return g=u,u=v,v=g,v=v^d.pbox[1],u=u^d.pbox[0],{left:u,right:v}}function c(d,E,l){for(let A=0;A<4;A++){d.sbox[A]=[];for(let D=0;D<256;D++)d.sbox[A][D]=e[A][D]}let u=0;for(let A=0;A<x+2;A++)d.pbox[A]=f[A]^E[u],u++,u>=l&&(u=0);let v=0,g=0,y=0;for(let A=0;A<x+2;A+=2)y=i(d,v,g),v=y.left,g=y.right,d.pbox[A]=v,d.pbox[A+1]=g;for(let A=0;A<4;A++)for(let D=0;D<256;D+=2)y=i(d,v,g),v=y.left,g=y.right,d.sbox[A][D]=v,d.sbox[A][D+1]=g;return!0}var h=p.Blowfish=o.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var d=this._keyPriorReset=this._key,E=d.words,l=d.sigBytes/4;c(a,E,l)}},encryptBlock:function(d,E){var l=i(a,d[E],d[E+1]);d[E]=l.left,d[E+1]=l.right},decryptBlock:function(d,E){var l=s(a,d[E],d[E+1]);d[E]=l.left,d[E+1]=l.right},blockSize:64/32,keySize:128/32,ivSize:64/32});t.Blowfish=o._createHelper(h)}(),r.Blowfish})}(ot)),ot.exports}(function(m,C){(function(r,t,n){m.exports=t(N(),y0(),Re(),He(),n0(),Le(),o0(),oe(),it(),Pe(),ie(),qe(),ze(),Ne(),at(),Oe(),r0(),K(),Me(),Ve(),Ue(),$e(),We(),Ke(),Xe(),Ge(),je(),Ze(),Ye(),Qe(),Je(),tr(),er(),rr(),nr())})(q,function(r){return r})})(ne);var or=ne.exports;const Z=_e(or);class ir{constructor(C){this.container=document.getElementById(C),this.init()}init(){this.container.innerHTML=`
      <div class="md5-tool">
        <div class="form-group">
          <label for="md5-input">Input Text</label>
          <textarea id="md5-input" placeholder="Enter text to process"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="md5-calculate">Calculate</button>
        </div>
        <div class="form-group">
          <label>MD5 Result</label>
          <div class="output-area" id="md5-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="md5-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){const C=this.container.querySelector("#md5-input"),r=this.container.querySelector("#md5-output"),t=this.container.querySelector("#md5-calculate"),n=this.container.querySelector("#md5-copy-to-clipboard");t.addEventListener("click",async()=>{const o=C.value;try{const p=await this.calculateMD5(o);r.textContent=p}catch(p){r.textContent=`Error: ${p.message}`}}),n.addEventListener("click",()=>{const o=r.textContent;o&&navigator.clipboard.writeText(o).then(()=>{const p=document.getElementById("md5-copy-to-clipboard"),x=p.textContent;p.textContent="Copied!",setTimeout(()=>{p.textContent=x},2e3)}).catch(p=>{console.error("Failed to copy: ",p)})})}async calculateMD5(C){return Z.MD5(C).toString().toUpperCase()}}class ar{constructor(C){this.container=document.getElementById(C),this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents()}bindEvents(){const C=this.container.querySelector("#des-input"),r=this.container.querySelector("#des-key"),t=this.container.querySelector("#des-output"),n=this.container.querySelector("#des-encrypt"),o=this.container.querySelector("#des-decrypt"),p=this.container.querySelector("#des-copy-to-clipboard");n.addEventListener("click",()=>{const x=C.value,f=r.value;if(!f){t.textContent="Error: Please enter a key";return}try{const e=this.encryptDES(x,f);t.textContent=e}catch(e){t.textContent=`Error: ${e.message}`}}),o.addEventListener("click",()=>{const x=C.value,f=r.value;if(!f){t.textContent="Error: Please enter a key";return}try{const e=this.decryptDES(x,f);t.textContent=e}catch(e){t.textContent=`Error: ${e.message}`}}),p.addEventListener("click",()=>{const x=t.textContent;x&&navigator.clipboard.writeText(x).then(()=>{const f=document.getElementById("des-copy-to-clipboard"),e=f.textContent;f.textContent="Copied!",setTimeout(()=>{f.textContent=e},2e3)}).catch(f=>{console.error("Failed to copy: ",f)})})}encryptDES(C,r){let t=r;r.length<8?t=r.padEnd(8,"0"):r.length>8&&(t=r.substring(0,8));const n=Z.enc.Utf8.parse(t);return Z.DES.encrypt(C,n,{mode:Z.mode.ECB,padding:Z.pad.Pkcs7}).toString()}decryptDES(C,r){let t=r;r.length<8?t=r.padEnd(8,"0"):r.length>8&&(t=r.substring(0,8));const n=Z.enc.Utf8.parse(t);try{return Z.DES.decrypt(C,n,{mode:Z.mode.ECB,padding:Z.pad.Pkcs7}).toString(Z.enc.Utf8)}catch{throw new Error("Decryption failed. Check your key or input data.")}}}class sr{constructor(C){this.container=document.getElementById(C),this.init()}init(){this.container.innerHTML=`
      <div class="aes-tool">
        <div class="form-group">
          <label for="aes-input">Input Text</label>
          <textarea id="aes-input" placeholder="Enter text to encrypt/decrypt"></textarea>
        </div>
        <div class="form-group">
          <label for="aes-key">Key (16, 24, or 32 characters for AES-128, AES-192, or AES-256)</label>
          <input type="text" id="aes-key" placeholder="Enter encryption key">
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="aes-encrypt">Encrypt</button>
          <button class="btn btn-secondary" id="aes-decrypt">Decrypt</button>
        </div>
        <div class="form-group">
          <label>Result</label>
          <div class="output-area" id="aes-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="aes-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){const C=this.container.querySelector("#aes-input"),r=this.container.querySelector("#aes-key"),t=this.container.querySelector("#aes-output"),n=this.container.querySelector("#aes-encrypt"),o=this.container.querySelector("#aes-decrypt"),p=this.container.querySelector("#aes-copy-to-clipboard");n.addEventListener("click",()=>{const x=C.value,f=r.value;if(!f){t.textContent="Error: Please enter a key";return}try{const e=this.encryptAES(x,f);t.textContent=e}catch(e){t.textContent=`Error: ${e.message}`}}),o.addEventListener("click",()=>{const x=C.value,f=r.value;if(!f){t.textContent="Error: Please enter a key";return}try{const e=this.decryptAES(x,f);t.textContent=e}catch(e){t.textContent=`Error: ${e.message}`}}),p.addEventListener("click",()=>{const x=t.textContent;x&&navigator.clipboard.writeText(x).then(()=>{const f=document.getElementById("aes-copy-to-clipboard"),e=f.textContent;f.textContent="Copied!",setTimeout(()=>{f.textContent=e},2e3)}).catch(f=>{console.error("Failed to copy: ",f)})})}encryptAES(C,r){return Z.AES.encrypt(C,r).toString()}decryptAES(C,r){try{return Z.AES.decrypt(C,r).toString(Z.enc.Utf8)}catch{throw new Error("Decryption failed. Check your key or input data.")}}}class xr{constructor(C){this.container=document.getElementById(C),this.init()}init(){this.container.innerHTML=`
      <div class="base64-tool">
        <div class="form-group">
          <label for="base64-input">Input Text</label>
          <textarea id="base64-input" placeholder="Enter text to process"></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" id="base64-encode">Encode</button>
          <button class="btn btn-primary" id="base64-decode">Decode</button>
        </div>
        <div class="form-group">
          <label>Result</label>
          <div class="output-area" id="base64-output"></div>
        </div>
        <div class="output-controls" style="margin-top: 10px;">
          <button class="btn btn-primary" id="base64-copy-to-clipboard">Copy Result</button>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){const C=this.container.querySelector("#base64-input"),r=this.container.querySelector("#base64-output"),t=this.container.querySelector("#base64-encode"),n=this.container.querySelector("#base64-decode"),o=this.container.querySelector("#base64-copy-to-clipboard");t.addEventListener("click",()=>{const p=C.value;try{const x=btoa(p);r.textContent=x}catch{r.textContent="Error: Invalid input for encoding"}}),n.addEventListener("click",()=>{const p=C.value;try{const x=atob(p);r.textContent=x}catch{r.textContent="Error: Invalid base64 string"}}),o.addEventListener("click",()=>{const p=r.textContent;p&&navigator.clipboard.writeText(p).then(()=>{const x=document.getElementById("base64-copy-to-clipboard"),f=x.textContent;x.textContent="Copied!",setTimeout(()=>{x.textContent=f},2e3)}).catch(x=>{console.error("Failed to copy: ",x)})})}}class cr{constructor(C){this.container=document.getElementById(C),this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents()}bindEvents(){const C=this.container.querySelector("#bitwise-input1"),r=this.container.querySelector("#bitwise-input2"),t=this.container.querySelector("#bitwise-output-binary"),n=this.container.querySelector("#bitwise-output-hex");document.getElementById("bitwise-and").addEventListener("click",()=>{this.performOperation("AND",C.value,r.value,t,n)}),document.getElementById("bitwise-or").addEventListener("click",()=>{this.performOperation("OR",C.value,r.value,t,n)}),document.getElementById("bitwise-xor").addEventListener("click",()=>{this.performOperation("XOR",C.value,r.value,t,n)}),document.getElementById("bitwise-not").addEventListener("click",()=>{this.performOperation("NOT",C.value,"",t,n)}),document.getElementById("bitwise-copy").addEventListener("click",()=>{const o=n.textContent;o&&navigator.clipboard.writeText(o).then(()=>{const p=document.getElementById("bitwise-copy"),x=p.textContent;p.textContent="Copied!",setTimeout(()=>{p.textContent=x},2e3)}).catch(p=>{console.error("Failed to copy: ",p)})})}performOperation(C,r,t,n,o){try{const p=parseInt(r.replace(/\s/g,""),16);if(isNaN(p)){n.textContent="Error: Invalid input 1",o.textContent="";return}let x;switch(C){case"AND":const a=parseInt(t.replace(/\s/g,""),16);if(isNaN(a)){n.textContent="Error: Invalid input 2",o.textContent="";return}x=p&a;break;case"OR":const b=parseInt(t.replace(/\s/g,""),16);if(isNaN(b)){n.textContent="Error: Invalid input 2",o.textContent="";return}x=p|b;break;case"XOR":const i=parseInt(t.replace(/\s/g,""),16);if(isNaN(i)){n.textContent="Error: Invalid input 2",o.textContent="";return}x=p^i;break;case"NOT":const c=(1<<Math.ceil(Math.log2(p+1)))-1;x=~p&c;break;default:n.textContent="Error: Unknown operation",o.textContent="";return}const f=x.toString(2).padStart(8,"0"),e=x.toString(16).toUpperCase().padStart(2,"0");n.textContent=f,o.textContent=e}catch(p){n.textContent=`Error: ${p.message}`,o.textContent=""}}}const i0={"5F57":"Account Type","9F01":"Acquirer Identifier","9F40":"Additional Terminal Capabilities",81:"Amount, Authorised (Binary)","9F02":"Amount, Authorized (Numeric)","9F04":"Amount, Other (Binary)","9F03":"Amount, Other (Numeric)","9F3A":"Amount, Reference Currency","9F26":"Application Cryptogram","9F42":"Application Currency Code","9F44":"Application Currency Exponent","9F05":"Application Discretionary Data","5F25":"Application Effective Date","5F24":"Application Expiration Date",94:"Application File Locator (AFL)","4F":"Application Dedicated File (ADF) Name","9F06":"Application Identifier (AID) - terminal",82:"Application Interchange Profile",50:"Application Label","9F12":"Application Preferred Name","5A":"Application Primary Account Number (PAN)","5F34":"Application Primary Account Number (PAN) Sequence Number","9F3B":"Application Reference Currency","9F43":"Application Reference Currency Exponent","9F07":"Application Usage Control","9F08":"Application Version Number","9F09":"Application Version Number (Payment System)","9F36":"Application Transaction Counter (ATC)","8A":"Authorisation Response Code",89:"Authorisation Code","5F54":"Bank Identifier Code (BIC)",A1:"Biometric Header Template (BHT)","7F60":"Biometric Information Template (BIT)",90:"Biometric Solution ID",81:"Biometric Type",82:"Biometric Subtype","9F30":"Biometric Terminal Capabilities",BF4C:"Biometric Try Counters Template",BF4E:"Biometric Verification Data Template","9F31":"Card BIT Group Template","8C":"Card Risk Management Data Object List 1 (CDOL1)","8D":"Card Risk Management Data Object List 2 (CDOL2)","5F20":"Cardholder Name","9F0B":"Cardholder Name Extended","8E":"Cardholder Verification Method (CVM) List","9F34":"Cardholder Verification Method (CVM) Results","8F":"Certification Authority Public Key Index (ICC)","9F22":"Certification Authority Public Key Index (Terminal)","9F45":"Data Authentication Code",84:"Dedicated File (DF) Name","9F49":"Dynamic Data Authentication Data Object List (DDOL)",DF51:"Enciphered Biometric Data",DF50:"Enciphered Biometric Key Seed",DF52:"MAC of Enciphered Biometric Data","6F":"File Control Information (FCI) Template",BF0C:"File Control Information (FCI) Issuer Discretionary Data","9F2D":"Integrated Circuit Card (ICC) PIN Encipherment Public Key Certificate","9F2E":"Integrated Circuit Card (ICC) PIN Encipherment Public Key Exponent","9F2F":"Integrated Circuit Card (ICC) PIN Encipherment Public Key Remainder","9F46":"Integrated Circuit Card (ICC) Public Key Certificate","9F47":"Integrated Circuit Card (ICC) Public Key Exponent","9F48":"Integrated Circuit Card (ICC) Public Key Remainder","5F53":"International Bank Account Number (IBAN)",90:"Issuer Public Key Certificate","9F32":"Issuer Public Key Exponent",92:"Issuer Public Key Remainder",86:"Issuer Script Command","9F18":"Issuer Script Identifier",71:"Issuer Script Template 1",72:"Issuer Script Template 2","5F50":"Issuer URL","5F28":"Issuer Country Code (Numeric)","5F55":"Issuer Country Code (alpha2 format)","5F56":"Issuer Country Code (alpha3 format)",42:"Issuer Identification Number (IIN)","9F0C":"Issuer Identification Number Extended (IINE)","9F10":"Issuer Application Data","9F11":"Issuer Code Table Index","9F0D":"Issuer Action Code - Default","9F0E":"Issuer Action Code - Denial","9F0F":"Issuer Action Code - Online","5F2D":"Language Preference","9F25":"Last 4 Digits of PAN","9F13":"Last Online Application Transaction Counter (ATC) Register","9F4D":"Log Entry","9F4F":"Log Format","9F14":"Lower Consecutive Offline Limit","9F15":"Merchant Category Code","9F16":"Merchant Identifier","9F4E":"Merchant Name and Location",BF4A:"Offline BIT Group Template",BF4B:"Online BIT Group Template","9F24":"Payment Account Reference (PAR)","9F17":"Personal Identification Number (PIN) Try Counter","9F39":"Point-of-Service (POS) Entry Mode",BF4D:"Preferred Attempts Template",DF50:"Preferred Facial Attempts / Facial Try Counter",DF51:"Preferred Finger Attempts / Finger Try Counter",DF52:"Preferred Iris Attempts / Iris Try Counter",DF53:"Preferred Palm Attempts / Palm Try Counter",DF54:"Preferred Voice Attempts / Voice Try Counter",88:"Short File Identifier (SFI)","5F30":"Service Code",93:"Signed Static Application Data","9F4B":"Signed Dynamic Application Data","9F4A":"Static Data Authentication Tag List","9F33":"Terminal Capabilities","9F1A":"Terminal Country Code","9F1B":"Terminal Floor Limit","9F1C":"Terminal Identification","9F1D":"Terminal Risk Management Data","9F35":"Terminal Type",95:"Terminal Verification Results","9F19":"Token Requestor ID","9F1F":"Track 1 Discretionary Data","9F20":"Track 2 Discretionary Data",57:"Track 2 Equivalent Data",97:"Transaction Certificate Data Object List (TDOL)",98:"Transaction Certificate (TC) Hash Value","5F2A":"Transaction Currency Code","5F36":"Transaction Currency Exponent","9A":"Transaction Date",99:"Transaction Personal Identification Number (PIN) Data","9F3C":"Transaction Reference Currency Code","9F3D":"Transaction Reference Currency Exponent","9F41":"Transaction Sequence Counter","9B":"Transaction Status Information","9F21":"Transaction Time","9C":"Transaction Type","9F37":"Unpredictable Number","9F23":"Upper Consecutive Offline Limit","9D":"Directory Definition File (DDF) Name",73:"Directory Discretionary Template",70:"READ RECORD Response Message Template",77:"Response Message Template Format 2",80:"Response Message Template Format 1"},lr={...i0,"9F6E":"Form Factor Indicator","9F7C":"Customer Exclusive Data"},dr={...i0,"9F6E":"Third Party Data","9F7E":"Personal Identification Number (PIN) Try Limit"},ur={...i0},fr={...i0,"9F61":"Amount, Authorised Binary","9F62":"Upper Consecutive Offline Limit","9F63":"Lower Consecutive Offline Limit","9F66":"Terminal Transaction Qualifiers (TTQ)","9F77":"Consecutive Transaction Count"},pr={...i0},hr={...i0,"9F6E":"Form Factor Indicator (Contactless)"};function Ar(m="EMV"){switch(m.toUpperCase()){case"VISA":return lr;case"MASTERCARD":return dr;case"JCB":return ur;case"UNIONPAY":return fr;case"DISCOVER":return pr;case"AMEX":return hr;default:return i0}}const b0={95:{name:"TVR (Terminal Verification Results)",bytes:[{byte:1,bits:[{bit:"b8",name:"Offline data authentication was not performed"},{bit:"b7",name:"SDA failed"},{bit:"b6",name:"ICC data missing"},{bit:"b5",name:"Card appears on terminal exception file"},{bit:"b4",name:"DDA failed"},{bit:"b3",name:"CDA failed"},{bit:"b2",name:"SDA selected"},{bit:"b1",name:"RFU"}]},{byte:2,bits:[{bit:"b8",name:"ICC and terminal have different application versions"},{bit:"b7",name:"Expired application"},{bit:"b6",name:"Application not yet effective"},{bit:"b5",name:"Service not allowed for card product"},{bit:"b4",name:"New card"},{bit:"b3",name:"RFU"},{bit:"b2",name:"RFU"},{bit:"b1",name:"RFU"}]},{byte:3,bits:[{bit:"b8",name:"Cardholder verification was not successful"},{bit:"b7",name:"Unrecognised CVM"},{bit:"b6",name:"PIN try limit exceeded"},{bit:"b5",name:"PIN entry required and PIN pad not present or not working"},{bit:"b4",name:"PIN entry required, PIN pad present, but PIN was not entered"},{bit:"b3",name:"Online PIN entered"},{bit:"b2",name:"RFU"},{bit:"b1",name:"RFU"}]},{byte:4,bits:[{bit:"b8",name:"Transaction exceeds floor limit"},{bit:"b7",name:"Lower consecutive offline limit exceeded"},{bit:"b6",name:"Upper consecutive offline limit exceeded"},{bit:"b5",name:"Transaction selected randomly for online processing"},{bit:"b4",name:"Merchant forced transaction online"},{bit:"b3",name:"RFU"},{bit:"b2",name:"RFU"},{bit:"b1",name:"RFU"}]},{byte:5,bits:[{bit:"b8",name:"Default TDOL used"},{bit:"b7",name:"Issuer authentication failed"},{bit:"b6",name:"Script processing failed before final GENERATE AC"},{bit:"b5",name:"Script processing failed after final GENERATE AC"},{bit:"b4",name:"RFU"},{bit:"b3",name:"RFU"},{bit:"b2",name:"RFU"},{bit:"b1",name:"RFU"}]}]},"9B":{name:"TSI (Transaction Status Information)",bytes:[{byte:1,bits:[{bit:"b8",name:"Offline data authentication was performed"},{bit:"b7",name:"Cardholder verification was performed"},{bit:"b6",name:"Card risk management was performed"},{bit:"b5",name:"Issuer authentication was performed"},{bit:"b4",name:"Terminal risk management was performed"},{bit:"b3",name:"Script processing was performed"},{bit:"b2",name:"RFU"},{bit:"b1",name:"RFU"}]},{byte:2,bits:[{bit:"b8",name:"RFU"},{bit:"b7",name:"RFU"},{bit:"b6",name:"RFU"},{bit:"b5",name:"RFU"},{bit:"b4",name:"RFU"},{bit:"b3",name:"RFU"},{bit:"b2",name:"RFU"},{bit:"b1",name:"RFU"}]}]}};function vr(m){return JSON.parse(JSON.stringify(m))}function ee(m,C){const r=vr(m);return C.name&&(r.name=C.name),C.bytes&&C.bytes.forEach(t=>{const n=r.bytes.find(o=>o.byte===t.byte);n&&t.bits&&t.bits.forEach(o=>{const p=n.bits.find(x=>x.bit===o.bit);p&&(p.name=o.name)})}),r}const br={95:ee(b0[95],{bytes:[{byte:5,bits:[{bit:"b4",name:"JCB specific - Reserved for proprietary use"}]}]}),"9B":ee(b0["9B"],{bytes:[{byte:2,bits:[{bit:"b8",name:"JCB specific - Proprietary authentication performed"}]}]})},Cr={95:b0[95],"9B":b0["9B"]},v0={EMV:b0,JCB:br,VISA:Cr};class ae{constructor(){this.currentScheme="EMV",this.bitDefinitions=v0}setCardScheme(C){this.currentScheme=C}decodeBits(C,r){const n=(v0[this.currentScheme]||v0.EMV)[C];if(!n)return{error:`No bit definition found for tag ${C} in ${this.currentScheme} scheme`};const o=this.hexToBinary(r),p=[];for(let x=0;x<n.bytes.length;x++){const f=n.bytes[x],e=x*8;if(e+8>o.length)break;for(let b=0;b<8;b++){const i=7-b,s=e+i;if(s<o.length){const c=o[s],h=`b${8-b}`,d=f.bits.find(E=>E.bit===h);d&&p.push({byte:x+1,bit:h,value:parseInt(c),meaning:d.name})}}}return{tag:C,hex:r,binary:o,results:p}}encodeBits(C,r){const n=(v0[this.currentScheme]||v0.EMV)[C];if(!n)return{error:`No bit definition found for tag ${C} in ${this.currentScheme} scheme`};const o=n.bytes.length*8;let p=Array(o).fill("0");for(const f of r){const{byte:e,bit:a,value:b}=f,i=e-1,c=8-parseInt(a.substring(1)),h=i*8+c;h<o&&(p[h]=b.toString())}const x=this.binaryToHex(p.join(""));return{tag:C,hex:x,binary:p.join(""),bitValues:r}}hexToBinary(C){return C.split("").map(r=>parseInt(r,16).toString(2).padStart(4,"0")).join("")}binaryToHex(C){const r=[];for(let t=0;t<C.length;t+=4){const n=C.substr(t,4);r.push(parseInt(n,2).toString(16).toUpperCase())}return r.join("")}}class Er{constructor(C){this.container=document.getElementById(C),this.bitParser=new ae,this.currentScheme="EMV",this.currentTag="95",this.displayMode="table",this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents();const C=this.container.querySelector("#bit-decode-input-label"),r=this.container.querySelector("#bit-decode-tag"),n=r.options[r.selectedIndex].text.split(" - ")[1]||"Input Value (Hex)";C.textContent=n.split(" (")[0]}bindEvents(){const C=this.container.querySelector("#bit-decode-tag"),r=this.container.querySelector("#bit-decode-scheme"),t=this.container.querySelector("#bit-decode-input"),n=this.container.querySelector("#bit-decode-input-label"),o=this.container.querySelector("#bit-decode-length"),p=this.container.querySelector("#bit-decode-output"),x=this.container.querySelector("#bit-decode-btn"),f=this.container.querySelector("#bit-decode-clear"),e=this.container.querySelector("#view-mode-toggle"),a=()=>{const i=t.value.trim().replace(/\s/g,"").length/2;o.textContent=`Length: ${i} byte${i!==1?"s":""}`};a(),t.addEventListener("input",a),C.addEventListener("change",b=>{this.currentTag=b.target.value;const s=b.target.options[b.target.selectedIndex].text.split(" - ")[1]||"Input Value (Hex)";n.textContent=s.split(" (")[0]}),r.addEventListener("change",b=>{this.currentScheme=b.target.value,this.bitParser.setCardScheme(this.currentScheme)}),e.addEventListener("click",()=>{e.classList.toggle("active"),this.displayMode=e.classList.contains("active")?"flat":"table",t.value.trim()&&this.performDecode()}),x.addEventListener("click",()=>{this.performDecode()}),f.addEventListener("click",()=>{t.value="",p.innerHTML=""})}performDecode(){const C=this.container.querySelector("#bit-decode-tag"),r=this.container.querySelector("#bit-decode-input"),t=this.container.querySelector("#bit-decode-output"),n=C.value.trim(),o=r.value.trim().replace(/\s/g,"");if(!n||!o){t.innerHTML='<div style="color: #d9534f; padding: 12px; background: #f2dede; border-radius: 4px;">Error: Please enter input value</div>';return}try{const p=this.bitParser.decodeBits(n,o);if(p.error){t.innerHTML=`<div style="color: #d9534f; padding: 12px; background: #f2dede; border-radius: 4px;">Error: ${p.error}</div>`;return}this.displayMode==="table"?this.renderTableView(p,t):this.renderFlatView(p,t)}catch(p){t.innerHTML=`<div style="color: #d9534f; padding: 12px; background: #f2dede; border-radius: 4px;">Error: ${p.message}</div>`}}renderTableView(C,r){const t=this.groupResultsByByte(C.results),n=Object.keys(t).length;let o='<div class="bit-decode-tab-container">';o+='<div class="bit-decode-tabs">';for(let e=1;e<=n;e++)o+=`<button class="bit-decode-tab ${e===1?"active":""}" data-byte="${e}">Byte ${e}</button>`;o+="</div>";const p=["b8","b7","b6","b5","b4","b3","b2","b1"];for(let e=1;e<=n;e++){o+=`<div class="bit-decode-tab-content ${e===1?"active":""}" data-byte="${e}">`,o+='<table class="bit-result-table">',o+="<thead><tr>",o+="<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>",o+="<th>Meaning</th>",o+="</tr></thead>",o+="<tbody>";const a=t[e]||[];for(const b of p){const i=a.find(s=>s.bit===b);if(i){const s=i.value===1;o+=`<tr class="${s?"highlight":""}">`;for(const c of p)c===b?o+=`<td class="bit-cell ${s?"active":""}">${i.value}</td>`:o+='<td class="bit-cell"></td>';o+=`<td>${i.meaning}</td>`,o+="</tr>"}}o+="</tbody></table>",o+="</div>"}o+="</div>",r.innerHTML=o;const x=r.querySelectorAll(".bit-decode-tab"),f=r.querySelectorAll(".bit-decode-tab-content");x.forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-byte");x.forEach(b=>b.classList.remove("active")),e.classList.add("active"),f.forEach(b=>{b.classList.remove("active"),b.getAttribute("data-byte")===a&&b.classList.add("active")})})})}renderFlatView(C,r){const t=this.groupResultsByByte(C.results);let n='<div class="bit-result-flat">';for(const[o,p]of Object.entries(t)){n+='<div class="flat-byte-section">',n+=`<div class="flat-byte-title">TVR Byte ${o} ${o==="1"?"(Leftmost)":""}:</div>`,n+='<table class="flat-bit-table">',n+="<thead><tr>",n+="<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>",n+="<th>Meaning</th>",n+="</tr></thead>",n+="<tbody>";const x=["b8","b7","b6","b5","b4","b3","b2","b1"];for(const f of x){const e=p.find(a=>a.bit===f);if(e){const a=e.value===1;n+=`<tr class="${a?"highlight":""}">`;for(const b of x)b===f?n+=`<td class="bit-cell ${a?"active":""}">${e.value}</td>`:n+='<td class="bit-cell"></td>';n+=`<td>${e.meaning}</td>`,n+="</tr>"}}n+="</tbody></table>",n+="</div>"}n+="</div>",r.innerHTML=n}groupResultsByByte(C){const r={};for(const t of C)r[t.byte]||(r[t.byte]=[]),r[t.byte].push(t);return r}}class Br{constructor(C){this.container=document.getElementById(C),this.bitParser=new ae,this.currentScheme="EMV",this.currentTag="95",this.displayMode="table",this.selectedBits={},this.currentActiveTab=1,this.init()}init(){this.container.innerHTML=`
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
    `,this.bindEvents(),this.renderBitSelector()}bindEvents(){const C=this.container.querySelector("#bit-encode-tag"),r=this.container.querySelector("#bit-encode-scheme"),t=this.container.querySelector("#bit-encode-clear"),n=this.container.querySelector("#bit-encode-copy"),o=this.container.querySelector("#encode-view-mode-toggle");C.addEventListener("change",p=>{this.currentTag=p.target.value,this.selectedBits={},this.currentActiveTab=1,this.renderBitSelector()}),r.addEventListener("change",p=>{this.currentScheme=p.target.value,this.bitParser.setCardScheme(this.currentScheme),this.selectedBits={},this.currentActiveTab=1,this.renderBitSelector()}),o.addEventListener("click",()=>{o.classList.toggle("active"),this.displayMode=o.classList.contains("active")?"flat":"table",this.renderBitSelector()}),t.addEventListener("click",()=>{this.selectedBits={},this.currentActiveTab=1,this.renderBitSelector(),this.updateHexOutput()}),n.addEventListener("click",()=>{const p=this.container.querySelector("#bit-encode-hex-output").textContent;navigator.clipboard.writeText(p).then(()=>{const x=n.textContent;n.textContent="Copied!",setTimeout(()=>{n.textContent=x},2e3)})})}renderBitSelector(){const C=this.container.querySelector("#bit-encode-content"),r=this.bitParser.bitDefinitions[this.currentScheme]||this.bitParser.bitDefinitions.EMV,t=r==null?void 0:r[this.currentTag];if(!t){C.innerHTML='<p style="color: #d9534f;">No bit definition found for this tag and scheme combination.</p>';return}this.displayMode==="table"?this.renderTableView(t,C):this.renderFlatView(t,C)}renderTableView(C,r){const t=C.bytes.length;let n='<div class="bit-encode-tab-container">';n+='<div class="bit-encode-tabs">';for(let p=1;p<=t;p++)n+=`<button class="bit-encode-tab ${p===this.currentActiveTab?"active":""}" data-byte="${p}">Byte ${p}</button>`;n+="</div>";const o=["b8","b7","b6","b5","b4","b3","b2","b1"];for(let p=1;p<=t;p++){n+=`<div class="bit-encode-tab-content ${p===this.currentActiveTab?"active":""}" data-byte="${p}">`,n+='<table class="bit-encode-table">',n+="<thead><tr>",n+="<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>",n+="<th>Meaning</th>",n+="</tr></thead>",n+="<tbody>";const x=C.bytes.find(f=>f.byte===p);if(x)for(const f of o){const e=x.bits.find(a=>a.bit===f);if(e){const a=`${p}-${f}`,b=this.selectedBits[a]||!1;n+=`<tr${b?' style="background-color: #90EE90;"':""}>`;for(const s of o)s===f?n+=`<td class="bit-checkbox-cell">
                  <input type="checkbox" data-byte="${p}" data-bit="${f}" ${b?"checked":""}>
                </td>`:n+='<td class="bit-checkbox-cell"></td>';n+=`<td>${e.name}</td>`,n+="</tr>"}}n+="</tbody></table>",n+="</div>"}n+="</div>",r.innerHTML=n,this.bindTabEvents(r),this.bindCheckboxEvents(r)}renderFlatView(C,r){const t=["b8","b7","b6","b5","b4","b3","b2","b1"];let n='<div class="bit-encode-flat">';for(const o of C.bytes){n+='<div class="flat-byte-section">',n+=`<div class="flat-byte-title">Byte ${o.byte} ${o.byte===1?"(Leftmost)":""}:</div>`,n+='<table class="flat-encode-table">',n+="<thead><tr>",n+="<th>b8</th><th>b7</th><th>b6</th><th>b5</th><th>b4</th><th>b3</th><th>b2</th><th>b1</th>",n+="<th>Meaning</th>",n+="</tr></thead>",n+="<tbody>";for(const p of t){const x=o.bits.find(f=>f.bit===p);if(x){const f=`${o.byte}-${p}`,e=this.selectedBits[f]||!1;n+=`<tr${e?' style="background-color: #90EE90;"':""}>`;for(const b of t)b===p?n+=`<td class="bit-checkbox-cell">
                <input type="checkbox" data-byte="${o.byte}" data-bit="${p}" ${e?"checked":""}>
              </td>`:n+='<td class="bit-checkbox-cell"></td>';n+=`<td>${x.name}</td>`,n+="</tr>"}}n+="</tbody></table>",n+="</div>"}n+="</div>",r.innerHTML=n,this.bindCheckboxEvents(r)}bindTabEvents(C){const r=C.querySelectorAll(".bit-encode-tab"),t=C.querySelectorAll(".bit-encode-tab-content");r.forEach(n=>{n.addEventListener("click",()=>{const o=parseInt(n.getAttribute("data-byte"));this.currentActiveTab=o,r.forEach(p=>p.classList.remove("active")),n.classList.add("active"),t.forEach(p=>{p.classList.remove("active"),parseInt(p.getAttribute("data-byte"))===o&&p.classList.add("active")})})})}bindCheckboxEvents(C){C.querySelectorAll('input[type="checkbox"]').forEach(t=>{t.addEventListener("change",n=>{const o=n.target.getAttribute("data-byte"),p=n.target.getAttribute("data-bit"),x=`${o}-${p}`;n.target.checked?this.selectedBits[x]=!0:delete this.selectedBits[x],this.updateHexOutput();const f=n.target.closest("tr");n.target.checked?f.style.backgroundColor="#90EE90":f.style.backgroundColor=""})})}updateHexOutput(){const C=this.container.querySelector("#bit-encode-hex-output"),r=this.bitParser.bitDefinitions[this.currentScheme]||this.bitParser.bitDefinitions.EMV;if(!(r==null?void 0:r[this.currentTag])){C.textContent="Error";return}const n=[];for(const p in this.selectedBits){const[x,f]=p.split("-");n.push({byte:parseInt(x),bit:f,value:1})}const o=this.bitParser.encodeBits(this.currentTag,n);o.error?C.textContent="Error":C.textContent=o.hex}}new Ae("tlv-viewer-container");new Fe("string-tools-container");new De("sha1-container");new me("sha256-container");new ir("md5-container");new ar("des-container");new sr("aes-container");new xr("base64-container");new cr("bitwise-container");new Er("bit-decode-container");new Br("bit-encode-container");const yr=document.querySelectorAll(".category-header");yr.forEach(m=>{m.addEventListener("click",()=>{const C=m.getAttribute("data-category"),r=document.querySelector(`[data-category-content="${C}"]`);m.classList.toggle("collapsed"),r.classList.toggle("collapsed")})});const re=document.querySelectorAll(".menu-item"),gr=document.querySelectorAll(".content-section");re.forEach(m=>{m.addEventListener("click",()=>{re.forEach(r=>r.classList.remove("active")),gr.forEach(r=>r.classList.remove("active")),m.classList.add("active");const C=m.getAttribute("data-section");document.getElementById(C).classList.add("active")})});export{Ar as g};
