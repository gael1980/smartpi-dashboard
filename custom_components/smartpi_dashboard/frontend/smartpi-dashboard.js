var Ta=Object.defineProperty;var La=Object.getOwnPropertyDescriptor;var Y=(i,e,n,t)=>{for(var s=t>1?void 0:t?La(e,n):e,r=i.length-1,a;r>=0;r--)(a=i[r])&&(s=(t?a(e,n,s):a(s))||s);return t&&s&&Ta(e,n,s),s};var qn=globalThis,Un=qn.ShadowRoot&&(qn.ShadyCSS===void 0||qn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ds=Symbol(),ir=new WeakMap,mn=class{constructor(e,n,t){if(this._$cssResult$=!0,t!==Ds)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o,n=this.t;if(Un&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=ir.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&ir.set(n,e))}return e}toString(){return this.cssText}},Bn=i=>new mn(typeof i=="string"?i:i+"",void 0,Ds),Pt=(i,...e)=>{let n=i.length===1?i[0]:e.reduce((t,s,r)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[r+1],i[0]);return new mn(n,i,Ds)},nr=(i,e)=>{if(Un)i.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let t=document.createElement("style"),s=qn.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=n.cssText,i.appendChild(t)}},Rs=Un?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let n="";for(let t of e.cssRules)n+=t.cssText;return Bn(n)})(i):i;var{is:Fa,defineProperty:Da,getOwnPropertyDescriptor:Ra,getOwnPropertyNames:za,getOwnPropertySymbols:Ia,getPrototypeOf:Ha}=Object,Vn=globalThis,sr=Vn.trustedTypes,Oa=sr?sr.emptyScript:"",Na=Vn.reactiveElementPolyfillSupport,gn=(i,e)=>i,bn={toAttribute(i,e){switch(e){case Boolean:i=i?Oa:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let n=i;switch(e){case Boolean:n=i!==null;break;case Number:n=i===null?null:Number(i);break;case Object:case Array:try{n=JSON.parse(i)}catch{n=null}}return n}},jn=(i,e)=>!Fa(i,e),lr={attribute:!0,type:String,converter:bn,reflect:!1,useDefault:!1,hasChanged:jn};Symbol.metadata??=Symbol("metadata"),Vn.litPropertyMetadata??=new WeakMap;var jt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=lr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(e,t,n);s!==void 0&&Da(this.prototype,e,s)}}static getPropertyDescriptor(e,n,t){let{get:s,set:r}=Ra(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){let c=s?.call(this);r?.call(this,a),this.requestUpdate(e,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??lr}static _$Ei(){if(this.hasOwnProperty(gn("elementProperties")))return;let e=Ha(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(gn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gn("properties"))){let n=this.properties,t=[...za(n),...Ia(n)];for(let s of t)this.createProperty(s,n[s])}let e=this[Symbol.metadata];if(e!==null){let n=litPropertyMetadata.get(e);if(n!==void 0)for(let[t,s]of n)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[n,t]of this.elementProperties){let s=this._$Eu(n,t);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let n=[];if(Array.isArray(e)){let t=new Set(e.flat(1/0).reverse());for(let s of t)n.unshift(Rs(s))}else e!==void 0&&n.push(Rs(e));return n}static _$Eu(e,n){let t=n.attribute;return t===!1?void 0:typeof t=="string"?t:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,n=this.constructor.elementProperties;for(let t of n.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,t){this._$AK(e,t)}_$ET(e,n){let t=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,t);if(s!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:bn).toAttribute(n,t.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,n){let t=this.constructor,s=t._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=t.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:bn;this._$Em=s;let c=a.fromAttribute(n,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,n,t,s=!1,r){if(e!==void 0){let a=this.constructor;if(s===!1&&(r=this[e]),t??=a.getPropertyOptions(e),!((t.hasChanged??jn)(r,n)||t.useDefault&&t.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,t))))return;this.C(e,n,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:t,reflect:s,wrapped:r},a){t&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||t||(n=void 0),this._$AL.set(e,n)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,r]of t){let{wrapped:a}=r,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let e=!1,n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(n)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};jt.elementStyles=[],jt.shadowRootOptions={mode:"open"},jt[gn("elementProperties")]=new Map,jt[gn("finalized")]=new Map,Na?.({ReactiveElement:jt}),(Vn.reactiveElementVersions??=[]).push("2.1.2");var Us=globalThis,rr=i=>i,Wn=Us.trustedTypes,or=Wn?Wn.createPolicy("lit-html",{createHTML:i=>i}):void 0,fr="$lit$",ti=`lit$${Math.random().toFixed(9).slice(2)}$`,hr="?"+ti,qa=`<${hr}>`,vi=document,yn=()=>vi.createComment(""),xn=i=>i===null||typeof i!="object"&&typeof i!="function",Bs=Array.isArray,Ua=i=>Bs(i)||typeof i?.[Symbol.iterator]=="function",zs=`[ 	
\f\r]`,vn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ar=/-->/g,cr=/>/g,gi=RegExp(`>|${zs}(?:([^\\s"'>=/]+)(${zs}*=${zs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pr=/'/g,dr=/"/g,mr=/^(?:script|style|textarea|title)$/i,Vs=i=>(e,...n)=>({_$litType$:i,strings:e,values:n}),A=Vs(1),Gi=Vs(2),id=Vs(3),yi=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),ur=new WeakMap,bi=vi.createTreeWalker(vi,129);function gr(i,e){if(!Bs(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return or!==void 0?or.createHTML(e):e}var Ba=(i,e)=>{let n=i.length-1,t=[],s,r=e===2?"<svg>":e===3?"<math>":"",a=vn;for(let c=0;c<n;c++){let p=i[c],f,b,h=-1,g=0;for(;g<p.length&&(a.lastIndex=g,b=a.exec(p),b!==null);)g=a.lastIndex,a===vn?b[1]==="!--"?a=ar:b[1]!==void 0?a=cr:b[2]!==void 0?(mr.test(b[2])&&(s=RegExp("</"+b[2],"g")),a=gi):b[3]!==void 0&&(a=gi):a===gi?b[0]===">"?(a=s??vn,h=-1):b[1]===void 0?h=-2:(h=a.lastIndex-b[2].length,f=b[1],a=b[3]===void 0?gi:b[3]==='"'?dr:pr):a===dr||a===pr?a=gi:a===ar||a===cr?a=vn:(a=gi,s=void 0);let w=a===gi&&i[c+1].startsWith("/>")?" ":"";r+=a===vn?p+qa:h>=0?(t.push(f),p.slice(0,h)+fr+p.slice(h)+ti+w):p+ti+(h===-2?c:w)}return[gr(i,r+(i[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]},wn=class i{constructor({strings:e,_$litType$:n},t){let s;this.parts=[];let r=0,a=0,c=e.length-1,p=this.parts,[f,b]=Ba(e,n);if(this.el=i.createElement(f,t),bi.currentNode=this.el.content,n===2||n===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=bi.nextNode())!==null&&p.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(fr)){let g=b[a++],w=s.getAttribute(h).split(ti),$=/([.?@])?(.*)/.exec(g);p.push({type:1,index:r,name:$[2],strings:w,ctor:$[1]==="."?Hs:$[1]==="?"?Os:$[1]==="@"?Ns:Wi}),s.removeAttribute(h)}else h.startsWith(ti)&&(p.push({type:6,index:r}),s.removeAttribute(h));if(mr.test(s.tagName)){let h=s.textContent.split(ti),g=h.length-1;if(g>0){s.textContent=Wn?Wn.emptyScript:"";for(let w=0;w<g;w++)s.append(h[w],yn()),bi.nextNode(),p.push({type:2,index:++r});s.append(h[g],yn())}}}else if(s.nodeType===8)if(s.data===hr)p.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(ti,h+1))!==-1;)p.push({type:7,index:r}),h+=ti.length-1}r++}}static createElement(e,n){let t=vi.createElement("template");return t.innerHTML=e,t}};function ji(i,e,n=i,t){if(e===yi)return e;let s=t!==void 0?n._$Co?.[t]:n._$Cl,r=xn(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(i),s._$AT(i,n,t)),t!==void 0?(n._$Co??=[])[t]=s:n._$Cl=s),s!==void 0&&(e=ji(i,s._$AS(i,e.values),s,t)),e}var Is=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:t}=this._$AD,s=(e?.creationScope??vi).importNode(n,!0);bi.currentNode=s;let r=bi.nextNode(),a=0,c=0,p=t[0];for(;p!==void 0;){if(a===p.index){let f;p.type===2?f=new _n(r,r.nextSibling,this,e):p.type===1?f=new p.ctor(r,p.name,p.strings,this,e):p.type===6&&(f=new qs(r,this,e)),this._$AV.push(f),p=t[++c]}a!==p?.index&&(r=bi.nextNode(),a++)}return bi.currentNode=vi,s}p(e){let n=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,n),n+=t.strings.length-2):t._$AI(e[n])),n++}},_n=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,t,s){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=ji(this,e,n),xn(e)?e===j||e==null||e===""?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==yi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ua(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&xn(this._$AH)?this._$AA.nextSibling.data=e:this.T(vi.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:t}=e,s=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=wn.createElement(gr(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(n);else{let r=new Is(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(e){let n=ur.get(e.strings);return n===void 0&&ur.set(e.strings,n=new wn(e)),n}k(e){Bs(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,t,s=0;for(let r of e)s===n.length?n.push(t=new i(this.O(yn()),this.O(yn()),this,this.options)):t=n[s],t._$AI(r),s++;s<n.length&&(this._$AR(t&&t._$AB.nextSibling,s),n.length=s)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let t=rr(e).nextSibling;rr(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Wi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,t,s,r){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=n,this._$AM=s,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=j}_$AI(e,n=this,t,s){let r=this.strings,a=!1;if(r===void 0)e=ji(this,e,n,0),a=!xn(e)||e!==this._$AH&&e!==yi,a&&(this._$AH=e);else{let c=e,p,f;for(e=r[0],p=0;p<r.length-1;p++)f=ji(this,c[t+p],n,p),f===yi&&(f=this._$AH[p]),a||=!xn(f)||f!==this._$AH[p],f===j?e=j:e!==j&&(e+=(f??"")+r[p+1]),this._$AH[p]=f}a&&!s&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Hs=class extends Wi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}},Os=class extends Wi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}},Ns=class extends Wi{constructor(e,n,t,s,r){super(e,n,t,s,r),this.type=5}_$AI(e,n=this){if((e=ji(this,e,n,0)??j)===yi)return;let t=this._$AH,s=e===j&&t!==j||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,r=e!==j&&(t===j||s);s&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},qs=class{constructor(e,n,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){ji(this,e)}};var Va=Us.litHtmlPolyfillSupport;Va?.(wn,_n),(Us.litHtmlVersions??=[]).push("3.3.3");var br=(i,e,n)=>{let t=n?.renderBefore??e,s=t._$litPart$;if(s===void 0){let r=n?.renderBefore??null;t._$litPart$=s=new _n(e.insertBefore(yn(),r),r,void 0,n??{})}return s._$AI(i),s};var js=globalThis,Ke=class extends jt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=br(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return yi}};Ke._$litElement$=!0,Ke.finalized=!0,js.litElementHydrateSupport?.({LitElement:Ke});var ja=js.litElementPolyfillSupport;ja?.({LitElement:Ke});(js.litElementVersions??=[]).push("4.2.2");var Nt=i=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Wa={attribute:!0,type:String,converter:bn,reflect:!1,hasChanged:jn},Ga=(i=Wa,e,n)=>{let{kind:t,metadata:s}=n,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),t==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(n.name,i),t==="accessor"){let{name:a}=n;return{set(c){let p=e.get.call(this);e.set.call(this,c),this.requestUpdate(a,p,i,!0,c)},init(c){return c!==void 0&&this.C(a,void 0,i,c),c}}}if(t==="setter"){let{name:a}=n;return function(c){let p=this[a];e.call(this,c),this.requestUpdate(a,p,i,!0,c)}}throw Error("Unsupported decorator location: "+t)};function ve(i){return(e,n)=>typeof n=="object"?Ga(i,e,n):((t,s,r)=>{let a=s.hasOwnProperty(r);return s.constructor.createProperty(r,t),a?Object.getOwnPropertyDescriptor(s,r):void 0})(i,e,n)}function Re(i){return ve({...i,state:!0,attribute:!1})}function ut(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function C(i,e){return e.split(".").reduce((n,t)=>ut(n)?n[t]:void 0,i)}function Ce(i){return typeof i=="number"&&Number.isFinite(i)?i:null}function B(i,e="",n=2){let t=Ce(i);return t!==null?t.toLocaleString("fr-FR",{maximumFractionDigits:n})+e:typeof i=="boolean"?i?"Oui":"Non":typeof i=="string"&&i.trim()!==""?i:"Indisponible"}function $n(i){return C(i.live,"control.mode")==="hysteresis"||C(i.live,"learning.stage")==="bootstrap"}function et(i,e,n){if(!(n&&C(i,n)!==!0)&&!(e.startsWith("analysis.twin.")&&!e.endsWith("reliable")&&(C(i,"analysis.twin.twin_model_reliable")!==!0||C(i,"analysis.twin.twin_warming_up")!==!1)))return C(i,e)}function Ka(i,e){return Object.values(i.states).find(t=>t.entity_id.startsWith("climate.")&&C(t.attributes,"specific_states.regulation_diagnostics")===e)??null}function Ws(i){if(!i||!ut(i.states))return[];let e=[];for(let n of Object.values(i.states)){if(!n?.entity_id?.startsWith("sensor.")||!ut(n.attributes))continue;let t=n.attributes;if(t.schema_version!==2||!ut(t.live)||!ut(t.history))continue;let s=Ka(i,n.entity_id),a=(typeof t.friendly_name=="string"?t.friendly_name:n.entity_id).replace(/ SmartPI Diagnostics$/i,"");e.push({entityId:n.entity_id,climateId:s?.entity_id??null,name:typeof s?.attributes.friendly_name=="string"?s.attributes.friendly_name:a,state:n.state,lastUpdated:n.last_updated??null,available:n.state!=="unknown"&&n.state!=="unavailable",live:n.state==="unknown"||n.state==="unavailable"?{}:t.live,history:t.history})}return e.sort((n,t)=>n.name.localeCompare(t.name,"fr"))}function vr(i){let e=[];if(!i.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];e.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),$n(i)&&e.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),C(i.live,"control.in_deadtime_window")===!0&&e.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),C(i.live,"model.tau_reliable")===!1&&e.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),C(i.live,"analysis.twin.twin_T_steady_reliable")===!1&&e.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let n=C(i.live,"feedforward.ff3_status");return typeof n=="string"&&n.startsWith("disabled:")&&e.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+n+"."),e}var Ya=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function Ki(i){if(typeof i=="number")return Number.isFinite(i)&&i>0?i:null;if(typeof i!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(i))return null;let e=Date.parse(i);return Number.isFinite(e)?e/1e3:null}function xr(i){if(!Array.isArray(i))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let e=[];for(let n of i){if(!ut(n))continue;let t=Ki(n.lu??n.last_updated);if(t===null)continue;let s=ut(n.a)?n.a:ut(n.attributes)?n.attributes:{},r=typeof n.s=="string"?n.s:typeof n.state=="string"?n.state:"unknown",a=s.schema_version===2&&r!=="unavailable"&&r!=="unknown";e.push({time:t,state:r,history:a&&ut(s.history)?s.history:{},live:a&&ut(s.live)?s.live:{}})}return Yn(e)}function Yn(i){return[...new Map(i.map(e=>[e.time,e])).values()].sort((e,n)=>e.time-n.time)}function tt(i,e){if(e==="error"){let n=Ce(C(i.history,"temperature.indoor")),t=Ce(C(i.history,"setpoint.filtered_setpoint"));return n===null||t===null?null:Ce(t-n)}return e.startsWith("live.")?Ce(et(i.live,e.slice(5))):Ce(C(i.history,e))}function yr(i){if(i.length<2)return null;i.sort((n,t)=>n-t);let e=Math.floor(i.length/2);return i.length%2?i[e]:i[e-1]/2+i[e]/2}function wr(i){let e=[],n=null,t=null;for(let r of i){let a=tt(r,"error");a!==null&&(e.push(a),n!==null&&(t=Math.max(t??0,r.time-n)),n=r.time)}let s=e.map(Math.abs);return{pairs:e.length,signedMedian:yr(e),absoluteMedian:yr(s),largestInterval:t}}function Gs(i){return i.some(e=>Ya.some(n=>tt(e,n)!==null))}function _r(i){let e=[];for(let n=1;n<i.length;n++){let t=i[n-1],s=i[n],r=Ce(C(t.history,"setpoint.filtered_setpoint")),a=Ce(C(s.history,"setpoint.filtered_setpoint"));r!==null&&a!==null&&r!==a&&e.push({time:s.time,label:`Consigne filtr\xE9e ${r} \u2192 ${a} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),t.state!==s.state&&e.push({time:s.time,label:`Phase / \xE9tat : ${t.state} \u2192 ${s.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[c,p]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let f=C(t.live,c),b=C(s.live,c);f!=null&&b!==void 0&&b!==null&&f!==b&&e.push({time:s.time,label:`${p} : ${String(b)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${c}.`})}}return e}var Kn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(e,n,t=Date.now()/1e3){let s=new Set(e.map(r=>r.entityId));for(let r of this.buffers.keys())s.has(r)||(this.buffers.delete(r),this.revisions.delete(r));for(let r of e){let a=n[r.entityId]?.last_updated,c=Ki(a);if(!a||c===null||this.revisions.get(r.entityId)===a)continue;this.revisions.set(r.entityId,a);let p=this.buffers.get(r.entityId)??[];if(p.length&&c<=p[p.length-1].time)continue;let b={time:p.length===0?t:c,observedAt:p.length===0,state:r.state,history:r.available?r.history:{},live:r.live};this.buffers.set(r.entityId,Yn([...p,b]).filter(h=>h.time>=t-48*3600).slice(-12e3))}}get(e){return this.buffers.get(e)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};function $r(i){let e=[],n=(t,s)=>{let r=Ce(C(t.live,`learning.accepted_updates_${s}`));return r!==null&&Number.isSafeInteger(r)&&r>=0?r:null};for(let t=1;t<i.length;t++){let[s,r]=[i[t-1],i[t]];if([s,r].some(c=>["unknown","unavailable","inactive"].includes(c.state)))continue;let a={time:r.time,observedAt:r.observedAt,temperature:tt(r,"temperature.indoor")};for(let c of["A","B"]){let p=c.toLowerCase(),f=n(s,p),b=n(r,p),h=tt(r,`model.${p}`),w=h===null?"valeur indisponible":`${h} ${c==="A"?"\xB0C/min/u":"min\u207B\xB9"}`;f!==null&&b!==null&&b>f&&e.push({...a,kind:c,label:`${c} \xB7 +${b-f} accept\xE9(s) entre ${new Date(s.time*1e3).toLocaleString()} et cette publication \xB7 ${w}`});let $=Ce(C(s.live,`learning.emea_samples_${p}`)),y=Ce(C(r.live,`learning.emea_samples_${p}`));!(f!==null&&b!==null&&b>f)&&$!==null&&y!==null&&$>=0&&y>$&&e.push({...a,kind:c,label:`${c} \xB7 +${y-$} mesure(s) collect\xE9e(s) entre ${new Date(s.time*1e3).toLocaleString()} et cette publication \xB7 ${w}`})}for(let[c,p]of[["heat","Chauffe"],["cool","Refroidissement"]]){let f=$=>Ce(et($.live,`model.deadtime_${c}_s`,`model.deadtime_${c}_reliable`)),b=f(r),h=`analysis.deadtime.${c}_last_outcome`,g=C(s.live,h),w=typeof g=="string"&&g!=="detected"&&C(r.live,h)==="detected";if(w||b!==null&&b>=0&&b!==f(s)){let $=b!==null&&b>=0?`m\xE9diane ${b} s`:"m\xE9diane indisponible";e.push({...a,kind:p,label:`${p} \xB7 ${w?"d\xE9tection observ\xE9e \xB7 ":""}${$}`})}}}return e}async function Sr(i,e,n,t,s=()=>!1){if(!e.startsWith("sensor.")||!Number.isFinite(n)||!Number.isFinite(t)||t<=n||t-n>48*3600)throw new Error("Fen\xEAtre historique invalide.");let r=[];for(let a=n;a<t;a+=12*3600){if(s())throw new Error("Lecture annul\xE9e.");let c=Math.min(t,a+12*3600),p=await i.callWS({type:"history/history_during_period",start_time:new Date(a*1e3).toISOString(),end_time:new Date(c*1e3).toISOString(),entity_ids:[e],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!ut(p))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let f=xr(p[e]??[]);if(r.push(...f.filter(b=>b.time>=a&&b.time<=c)),r.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return Yn(r)}var Ja={setpoint:[["Trajectoire active","setpoint.trajectory_active"],["Boost actif","setpoint.boost_active"]],temperature:[["Temp\xE9rature ext\xE9rieure","temperature.outdoor"," \xB0C"],["Pente int\xE9rieure publi\xE9e","analysis.control.temperature_slope_h"," \xB0C/h",3]],pi:[["Erreur de la voie P","analysis.control.error_p"," \xB0C",4],["Erreur brute de la voie I","temperature.error"," \xB0C",4],["\xC9tat de l\u2019int\xE9grale","temperature.integral_error","",6],["Gain proportionnel Kp","control.kp","",6],["Gain int\xE9gral Ki","control.ki","",6],["Temps int\xE9gral Ti","control.ti_min"," min"],["Source de Kp","analysis.governance.kp_source"],["D\xE9cision sur les gains","analysis.governance.last_decision_gains"]],ff:[["FF1 \xB7 anticipation thermique","analysis.feedforward.u_ff1"," (ratio)",6],["FF2 \xB7 correction apprise","analysis.feedforward.u_ff2"," (ratio)",6],["FF3 \xB7 correction pr\xE9dictive","analysis.feedforward.u_ff3"," (ratio)",6],["Candidat avec FF3","analysis.feedforward.u_ff_effective"," (ratio)",6],["Bande morte active","control.in_deadband"],["Anticipation avant FF3","analysis.feedforward.u_ff_final"," (ratio)",6],["Motif de gel de FF2","analysis.feedforward.ff2_freeze_reason"],["Observateur stationnaire","feedforward.fftrim.stationary.state"],["Dernier rejet stationnaire","feedforward.fftrim.stationary.last_reject_reason"],["Observateur p\xE9riodique","feedforward.fftrim.periodic.state"],["Dernier rejet p\xE9riodique","feedforward.fftrim.periodic.last_reject_reason"],["Transfert de correction","feedforward.fftrim.transfer.state"],["Motif du transfert","feedforward.fftrim.transfer.reason"]],command:[["Sortie PI publi\xE9e","power.pi_percent"," %"],["Anticipation retenue","power.ff_percent"," %"]],direct:[["\xC9tat de l\u2019hyst\xE9r\xE9sis","control.hysteresis_state"],["Phase de calibration","calibration.state"],["Autocalibration","autocalib.state"]],limits:[["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"],["Saturation d\xE9clar\xE9e","control.saturation_state"],["Temporisation impos\xE9e","analysis.control.forced_by_timing"],["Correction anti-windup \u0394u","analysis.control.aw_du"," (ratio)",6],["Source de protection de l\u2019int\xE9grale","temperature.integral_guard_source"]],applied:[["Cycle engag\xE9","power.current_cycle_percent"," %"],["Candidat au cycle suivant","power.next_cycle_percent"," %"],["Lin\xE9arisation de vanne","power.valve_linearization_enabled"],["Cycle engag\xE9 \xB7 espace lin\xE9aire","power.linear_current_cycle_percent"," %"],["Candidat au cycle suivant \xB7 espace lin\xE9aire","power.linear_next_cycle_percent"," %"],["Statut du retour de commande","feedforward.fftrim.command_ownership.status"]],model:[["Pertes B","model.b"," min\u207B\xB9",6],["Constante thermique \u03C4","model.tau_min"," min",2,"model.tau_reliable"],["Temps mort en chauffe","model.deadtime_heat_s"," s",0,"model.deadtime_heat_reliable"],["Temps mort en refroidissement","model.deadtime_cool_s"," s",0,"model.deadtime_cool_reliable"],["\xC9tape d\u2019apprentissage","learning.stage"],["Dernier motif d\u2019apprentissage","learning.last_reason"],["Gouvernance thermique","governance.thermal_update_decision"],["Motif de gouvernance","governance.thermal_update_reason"],["\xC9tat du jumeau thermique","feedforward.twin_status"],["Temp\xE9rature pr\xE9dite","analysis.twin.twin_T_pred"," \xB0C"],["\xC9quilibre pr\xE9dit","analysis.twin.twin_T_steady"," \xB0C",2,"analysis.twin.twin_T_steady_reliable"]]},Za={pi:6,ff:5,limits:5},ii=class{constructor(e){this.diagnostic=e}get live(){return this.diagnostic.available?this.diagnostic.live:{}}get directMode(){return this.diagnostic.available?["CoolDown","HeatUp","CoolDownFinal"].includes(String(C(this.live,"calibration.state")))||C(this.live,"control.phase")==="Calibration"?"Calibration":$n(this.diagnostic)||C(this.live,"control.phase")==="Hysteresis"?"Hyst\xE9r\xE9sis":null:null}get bypass(){return this.directMode!==null}get route(){return this.bypass?"direct":C(this.live,"control.mode")==="smartpi"?"pi":"unavailable"}get timingForced(){let e=C(this.live,"analysis.control.forced_by_timing");return typeof e=="boolean"?e:null}get saturation(){let e=C(this.live,"control.saturation_state");return e==="SAT_HI"?"Saturation haute d\xE9clar\xE9e":e==="SAT_LO"?"Saturation basse d\xE9clar\xE9e":null}detail(e,n){let t=e.id==="command"&&this.bypass?"direct":e.id,s=Ja[t]??[];return(n?s:s.slice(0,Za[t]??4)).map(([r,a,c,p,f])=>{let b=et(this.live,a,f);return{label:r,path:a,reliability:f,value:B(c===void 0?b:Ce(b),c,p)}})}blocks(){let e=this.live,n=this.bypass,t=this.route==="pi"?"Voie SmartPI":"Chemin non v\xE9rifi\xE9",s=(r,a,c,p,f,b,h)=>({id:r,title:a,path:c,value:B(Ce(C(e,c)),p,c==="model.a"?6:2),explanation:f,reason:B(C(e,b)),reasonPath:b,status:h==="Contourn\xE9"?h:Ce(C(e,c))===null?"Indisponible":h??"Publi\xE9"});return[s("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),s("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),s("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",n?"Contourn\xE9":t),s("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",n?"Contourn\xE9":t),s("command",this.directMode??"Commande demand\xE9e",n?"power.applied_percent":"power.command_percent"," %",n?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.",n?"control.phase":"control.saturation_state",n?"Voir sortie appliqu\xE9e":"Publi\xE9"),s("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",n?"Contourn\xE9":t),s("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),s("model","Pi\xE8ce et mod\xE8le A/B","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let e=this.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([n,t,s])=>{let r=Ce(C(e,t));return{label:n,path:t,value:r===null?null:r*(s?100:1)}})}};var Qa="uplot",Xa="u-hz",ec="u-vt",tc="u-title",ic="u-wrap",nc="u-under",sc="u-over",lc="u-axis",_i="u-off",rc="u-select",oc="u-cursor-x",ac="u-cursor-y",cc="u-cursor-pt",pc="u-legend",dc="u-live",uc="u-inline",fc="u-series",hc="u-marker",kr="u-label",mc="u-value",kn="width",An="height";var Ar="bottom",Yi="left",Ks="right",dl="#000",Cr=dl+"0",Ys="mousemove",Er="mousedown",Js="mouseup",Pr="mouseenter",Mr="mouseleave",Tr="dblclick",gc="resize",bc="scroll",Lr="change",es="dppxchange",ul="--",nn=typeof window<"u",tl=nn?document:null,Zi=nn?window:null,vc=nn?navigator:null,pe,Jn;function il(){let i=devicePixelRatio;pe!=i&&(pe=i,Jn&&sl(Lr,Jn,il),Jn=matchMedia(`(min-resolution: ${pe-.001}dppx) and (max-resolution: ${pe+.001}dppx)`),$i(Lr,Jn,il),Zi.dispatchEvent(new CustomEvent(es)))}function ft(i,e){if(e!=null){let n=i.classList;!n.contains(e)&&n.add(e)}}function nl(i,e){let n=i.classList;n.contains(e)&&n.remove(e)}function _e(i,e,n){i.style[e]=n+"px"}function Mt(i,e,n,t){let s=tl.createElement(i);return e!=null&&ft(s,e),n?.insertBefore(s,t),s}function _t(i,e){return Mt("div",i,e)}var Fr=new WeakMap;function qt(i,e,n,t,s){let r="translate("+e+"px,"+n+"px)",a=Fr.get(i);r!=a&&(i.style.transform=r,Fr.set(i,r),e<0||n<0||e>t||n>s?ft(i,_i):nl(i,_i))}var Dr=new WeakMap;function Rr(i,e,n){let t=e+n,s=Dr.get(i);t!=s&&(Dr.set(i,t),i.style.background=e,i.style.borderColor=n)}var zr=new WeakMap;function Ir(i,e,n,t){let s=e+""+n,r=zr.get(i);s!=r&&(zr.set(i,s),i.style.height=n+"px",i.style.width=e+"px",i.style.marginLeft=t?-e/2+"px":0,i.style.marginTop=t?-n/2+"px":0)}var fl={passive:!0},yc={...fl,capture:!0};function $i(i,e,n,t){e.addEventListener(i,n,t?yc:fl)}function sl(i,e,n,t){e.removeEventListener(i,n,fl)}nn&&il();function Tt(i,e,n,t){let s;n=n||0,t=t||e.length-1;let r=t<=2147483647;for(;t-n>1;)s=r?n+t>>1:ht((n+t)/2),e[s]<i?n=s:t=s;return i-e[n]<=e[t]-i?n:t}function uo(i){return(n,t,s)=>{let r=-1,a=-1;for(let c=t;c<=s;c++)if(i(n[c])){r=c;break}for(let c=s;c>=t;c--)if(i(n[c])){a=c;break}return[r,a]}}var fo=i=>i!=null,ho=i=>i!=null&&i>0,ns=uo(fo),xc=uo(ho);function wc(i,e,n,t=0,s=!1){let r=s?xc:ns,a=s?ho:fo;[e,n]=r(i,e,n);let c=i[e],p=i[e];if(e>-1)if(t==1)c=i[e],p=i[n];else if(t==-1)c=i[n],p=i[e];else for(let f=e;f<=n;f++){let b=i[f];a(b)&&(b<c?c=b:b>p&&(p=b))}return[c??me,p??-me]}function ss(i,e,n,t){let s=Nr(i),r=Nr(e);i==e&&(s==-1?(i*=n,e/=n):(i/=n,e*=n));let a=n==10?Wt:mo,c=s==1?ht:$t,p=r==1?$t:ht,f=c(a(Ie(i))),b=p(a(Ie(e))),h=Qi(n,f),g=Qi(n,b);return n==10&&(f<0&&(h=ge(h,-f)),b<0&&(g=ge(g,-b))),t||n==2?(i=h*s,e=g*r):(i=yo(i,h),e=ls(e,g)),[i,e]}function hl(i,e,n,t){let s=ss(i,e,n,t);return i==0&&(s[0]=0),e==0&&(s[1]=0),s}var ml=.1,Hr={mode:3,pad:ml},En={pad:0,soft:null,mode:0},_c={min:En,max:En};function ts(i,e,n,t){return rs(n)?Or(i,e,n):(En.pad=n,En.soft=t?0:null,En.mode=t?3:0,Or(i,e,_c))}function ae(i,e){return i??e}function $c(i,e,n){for(e=ae(e,0),n=ae(n,i.length-1);e<=n;){if(i[e]!=null)return!0;e++}return!1}function Or(i,e,n){let t=n.min,s=n.max,r=ae(t.pad,0),a=ae(s.pad,0),c=ae(t.hard,-me),p=ae(s.hard,me),f=ae(t.soft,me),b=ae(s.soft,-me),h=ae(t.mode,0),g=ae(s.mode,0),w=e-i,$=Wt(w),y=it(Ie(i),Ie(e)),D=Wt(y),T=Ie(D-$);(w<1e-24||T>10)&&(w=0,(i==0||e==0)&&(w=1e-24,h==2&&f!=me&&(r=0),g==2&&b!=-me&&(a=0)));let _=w||y||1e3,L=Wt(_),P=Qi(10,ht(L)),Q=_*(w==0?i==0?.1:1:r),I=ge(yo(i-Q,P/10),24),ee=i>=f&&(h==1||h==3&&I<=f||h==2&&I>=f)?f:me,J=it(c,I<ee&&i>=ee?ee:Lt(ee,I)),te=_*(w==0?e==0?.1:1:a),G=ge(ls(e+te,P/10),24),M=e<=b&&(g==1||g==3&&G>=b||g==2&&G<=b)?b:-me,Z=Lt(p,G>M&&e<=M?M:it(M,G));return J==Z&&J==0&&(Z=100),[J,Z]}var Sc=new Intl.NumberFormat(nn?vc.language:"en-US"),gl=i=>Sc.format(i),mt=Math,Xn=mt.PI,Ie=mt.abs,ht=mt.floor,ze=mt.round,$t=mt.ceil,Lt=mt.min,it=mt.max,Qi=mt.pow,Nr=mt.sign,Wt=mt.log10,mo=mt.log2,kc=(i,e=1)=>mt.sinh(i)*e,Zs=(i,e=1)=>mt.asinh(i/e),me=1/0;function qr(i){return(Wt((i^i>>31)-(i>>31))|0)+1}function ll(i,e,n){return Lt(it(i,e),n)}function go(i){return typeof i=="function"}function le(i){return go(i)?i:()=>i}var Ac=()=>{},bo=i=>i,vo=(i,e)=>e,Cc=i=>null,Ur=i=>!0,Br=(i,e)=>i==e,Ec=/\.\d*?(?=9{6,}|0{6,})/gm,Si=i=>{if(wo(i)||si.has(i))return i;let e=`${i}`,n=e.match(Ec);if(n==null)return i;let t=n[0].length-1;if(e.indexOf("e-")!=-1){let[s,r]=e.split("e");return+`${Si(s)}e${r}`}return ge(i,t)};function xi(i,e){return Si(ge(Si(i/e))*e)}function ls(i,e){return Si($t(Si(i/e))*e)}function yo(i,e){return Si(ht(Si(i/e))*e)}function ge(i,e=0){if(wo(i))return i;let n=10**e,t=i*n*(1+Number.EPSILON);return ze(t)/n}var si=new Map;function xo(i){return((""+i).split(".")[1]||"").length}function Mn(i,e,n,t){let s=[],r=t.map(xo);for(let a=e;a<n;a++){let c=Ie(a),p=ge(Qi(i,a),c);for(let f=0;f<t.length;f++){let b=i==10?+`${t[f]}e${a}`:t[f]*p,h=(a>=0?0:c)+(a>=r[f]?0:r[f]),g=i==10?b:ge(b,h);s.push(g),si.set(g,h)}}return s}var Pn={},bl=[],Xi=[null,null],ni=Array.isArray,wo=Number.isInteger,Pc=i=>i===void 0;function Vr(i){return typeof i=="string"}function rs(i){let e=!1;if(i!=null){let n=i.constructor;e=n==null||n==Object}return e}function Mc(i){return i!=null&&typeof i=="object"}var Tc=Object.getPrototypeOf(Uint8Array),_o="__proto__";function en(i,e=rs){let n;if(ni(i)){let t=i.find(s=>s!=null);if(ni(t)||e(t)){n=Array(i.length);for(let s=0;s<i.length;s++)n[s]=en(i[s],e)}else n=i.slice()}else if(i instanceof Tc)n=i.slice();else if(e(i)){n={};for(let t in i)t!=_o&&(n[t]=en(i[t],e))}else n=i;return n}function Le(i){let e=arguments;for(let n=1;n<e.length;n++){let t=e[n];for(let s in t)s!=_o&&(rs(i[s])?Le(i[s],en(t[s])):i[s]=en(t[s]))}return i}var Lc=0,Fc=1,Dc=2;function Rc(i,e,n){for(let t=0,s,r=-1;t<e.length;t++){let a=e[t];if(a>r){for(s=a-1;s>=0&&i[s]==null;)i[s--]=null;for(s=a+1;s<n&&i[s]==null;)i[r=s++]=null}}}function zc(i,e){if(Oc(i)){let a=i[0].slice();for(let c=1;c<i.length;c++)a.push(...i[c].slice(1));return Nc(a[0])||(a=Hc(a)),a}let n=new Set;for(let a=0;a<i.length;a++){let p=i[a][0],f=p.length;for(let b=0;b<f;b++)n.add(p[b])}let t=[Array.from(n).sort((a,c)=>a-c)],s=t[0].length,r=new Map;for(let a=0;a<s;a++)r.set(t[0][a],a);for(let a=0;a<i.length;a++){let c=i[a],p=c[0];for(let f=1;f<c.length;f++){let b=c[f],h=Array(s).fill(void 0),g=e?e[a][f]:Fc,w=[];for(let $=0;$<b.length;$++){let y=b[$],D=r.get(p[$]);y===null?g!=Lc&&(h[D]=y,g==Dc&&w.push(D)):h[D]=y}Rc(h,w,s),t.push(h)}}return t}var Ic=typeof queueMicrotask>"u"?i=>Promise.resolve().then(i):queueMicrotask;function Hc(i){let e=i[0],n=e.length,t=Array(n);for(let r=0;r<t.length;r++)t[r]=r;t.sort((r,a)=>e[r]-e[a]);let s=[];for(let r=0;r<i.length;r++){let a=i[r],c=Array(n);for(let p=0;p<n;p++)c[p]=a[t[p]];s.push(c)}return s}function Oc(i){let e=i[0][0],n=e.length;for(let t=1;t<i.length;t++){let s=i[t][0];if(s.length!=n)return!1;if(s!=e){for(let r=0;r<n;r++)if(s[r]!=e[r])return!1}}return!0}function Nc(i,e=100){let n=i.length;if(n<=1)return!0;let t=0,s=n-1;for(;t<=s&&i[t]==null;)t++;for(;s>=t&&i[s]==null;)s--;if(s<=t)return!0;let r=it(1,ht((s-t+1)/e));for(let a=i[t],c=t+r;c<=s;c+=r){let p=i[c];if(p!=null){if(p<=a)return!1;a=p}}return!0}var $o=["January","February","March","April","May","June","July","August","September","October","November","December"],So=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function ko(i){return i.slice(0,3)}var qc=So.map(ko),Uc=$o.map(ko),Bc={MMMM:$o,MMM:Uc,WWWW:So,WWW:qc};function Sn(i){return(i<10?"0":"")+i}function Vc(i){return(i<10?"00":i<100?"0":"")+i}var jc={YYYY:i=>i.getFullYear(),YY:i=>(i.getFullYear()+"").slice(2),MMMM:(i,e)=>e.MMMM[i.getMonth()],MMM:(i,e)=>e.MMM[i.getMonth()],MM:i=>Sn(i.getMonth()+1),M:i=>i.getMonth()+1,DD:i=>Sn(i.getDate()),D:i=>i.getDate(),WWWW:(i,e)=>e.WWWW[i.getDay()],WWW:(i,e)=>e.WWW[i.getDay()],HH:i=>Sn(i.getHours()),H:i=>i.getHours(),h:i=>{let e=i.getHours();return e==0?12:e>12?e-12:e},AA:i=>i.getHours()>=12?"PM":"AM",aa:i=>i.getHours()>=12?"pm":"am",a:i=>i.getHours()>=12?"p":"a",mm:i=>Sn(i.getMinutes()),m:i=>i.getMinutes(),ss:i=>Sn(i.getSeconds()),s:i=>i.getSeconds(),fff:i=>Vc(i.getMilliseconds())};function vl(i,e){e=e||Bc;let n=[],t=/\{([a-z]+)\}|[^{]+/gi,s;for(;s=t.exec(i);)n.push(s[0][0]=="{"?jc[s[1]]:s[0]);return r=>{let a="";for(let c=0;c<n.length;c++)a+=typeof n[c]=="string"?n[c]:n[c](r,e);return a}}var Wc=new Intl.DateTimeFormat().resolvedOptions().timeZone;function Gc(i,e){let n;return e=="UTC"||e=="Etc/UTC"?n=new Date(+i+i.getTimezoneOffset()*6e4):e==Wc?n=i:(n=new Date(i.toLocaleString("en-US",{timeZone:e})),n.setMilliseconds(i.getMilliseconds())),n}var Ao=i=>i%1==0,is=[1,2,2.5,5],Kc=Mn(10,-32,0,is),Co=Mn(10,0,32,is),Yc=Co.filter(Ao),wi=Kc.concat(Co),yl=`
`,Eo="{YYYY}",jr=yl+Eo,Po="{M}/{D}",Cn=yl+Po,Zn=Cn+"/{YY}",Mo="{aa}",Jc="{h}:{mm}",Ji=Jc+Mo,Wr=yl+Ji,Gr=":{ss}",ue=null;function To(i){let e=i*1e3,n=e*60,t=n*60,s=t*24,r=s*30,a=s*365,p=(i==1?Mn(10,0,3,is).filter(Ao):Mn(10,-3,0,is)).concat([e,e*5,e*10,e*15,e*30,n,n*5,n*10,n*15,n*30,t,t*2,t*3,t*4,t*6,t*8,t*12,s,s*2,s*3,s*4,s*5,s*6,s*7,s*8,s*9,s*10,s*15,r,r*2,r*3,r*4,r*6,a,a*2,a*5,a*10,a*25,a*50,a*100]),f=[[a,Eo,ue,ue,ue,ue,ue,ue,1],[s*28,"{MMM}",jr,ue,ue,ue,ue,ue,1],[s,Po,jr,ue,ue,ue,ue,ue,1],[t,"{h}"+Mo,Zn,ue,Cn,ue,ue,ue,1],[n,Ji,Zn,ue,Cn,ue,ue,ue,1],[e,Gr,Zn+" "+Ji,ue,Cn+" "+Ji,ue,Wr,ue,1],[i,Gr+".{fff}",Zn+" "+Ji,ue,Cn+" "+Ji,ue,Wr,ue,1]];function b(h){return(g,w,$,y,D,T)=>{let _=[],L=D>=a,P=D>=r&&D<a,Q=h($),I=ge(Q*i,3),ee=Qs(Q.getFullYear(),L?0:Q.getMonth(),P||L?1:Q.getDate()),J=ge(ee*i,3);if(P||L){let te=P?D/r:0,G=L?D/a:0,M=I==J?I:ge(Qs(ee.getFullYear()+G,ee.getMonth()+te,1)*i,3),Z=new Date(ze(M/i)),k=Z.getFullYear(),V=Z.getMonth();for(let O=0;M<=y;O++){let ne=Qs(k+G*O,V+te*O,1),N=ne-h(ge(ne*i,3));M=ge((+ne+N)*i,3),M<=y&&_.push(M)}}else{let te=D>=s?s:D,G=ht($)-ht(I),M=J+G+ls(I-J,te);_.push(M);let Z=h(M),k=Z.getHours()+Z.getMinutes()/n+Z.getSeconds()/t,V=D/t,O=g.axes[w]._space,ne=T/O;for(;M=ge(M+D,i==1?0:3),!(M>y);)if(V>1){let N=ht(ge(k+V,6))%24,re=h(M).getHours()-N;re>1&&(re=-1),M-=re*t,k=(k+V)%24;let fe=_[_.length-1];ge((M-fe)/D,3)*ne>=.7&&_.push(M)}else _.push(M)}return _}}return[p,f,b]}var[Zc,Qc,Xc]=To(1),[ep,tp,ip]=To(.001);Mn(2,-53,53,[1]);function Kr(i,e){return i.map(n=>n.map((t,s)=>s==0||s==8||t==null?t:e(s==1||n[8]==0?t:n[1]+t)))}function Yr(i,e){return(n,t,s,r,a)=>{let c=e.find($=>a>=$[0])||e[e.length-1],p,f,b,h,g,w;return t.map($=>{let y=i($),D=y.getFullYear(),T=y.getMonth(),_=y.getDate(),L=y.getHours(),P=y.getMinutes(),Q=y.getSeconds(),I=D!=p&&c[2]||T!=f&&c[3]||_!=b&&c[4]||L!=h&&c[5]||P!=g&&c[6]||Q!=w&&c[7]||c[1];return p=D,f=T,b=_,h=L,g=P,w=Q,I(y)})}}function np(i,e){let n=vl(e);return(t,s,r,a,c)=>s.map(p=>n(i(p)))}function Qs(i,e,n){return new Date(i,e,n)}function Jr(i,e){return e(i)}var sp="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Zr(i,e){return(n,t,s,r)=>r==null?ul:e(i(t))}function lp(i,e){let n=i.series[e];return n.width?n.stroke(i,e):n.points.width?n.points.stroke(i,e):null}function rp(i,e){return i.series[e].fill(i,e)}var op={show:!0,live:!0,isolate:!1,mount:Ac,markers:{show:!0,width:2,stroke:lp,fill:rp,dash:"solid"},idx:null,idxs:null,values:[]};function ap(i,e){let n=i.cursor.points,t=_t(),s=n.size(i,e);_e(t,kn,s),_e(t,An,s);let r=s/-2;_e(t,"marginLeft",r),_e(t,"marginTop",r);let a=n.width(i,e,s);return a&&_e(t,"borderWidth",a),t}function cp(i,e){let n=i.series[e].points;return n._fill||n._stroke}function pp(i,e){let n=i.series[e].points;return n._stroke||n._fill}function dp(i,e){return i.series[e].points.size}var Xs=[0,0];function up(i,e,n){return Xs[0]=e,Xs[1]=n,Xs}function Qn(i,e,n,t=!0){return s=>{s.button==0&&(!t||s.target==e)&&n(s)}}function el(i,e,n,t=!0){return s=>{(!t||s.target==e)&&n(s)}}var fp={show:!0,x:!0,y:!0,lock:!1,move:up,points:{one:!1,show:ap,size:dp,width:0,stroke:pp,fill:cp},bind:{mousedown:Qn,mouseup:Qn,click:Qn,dblclick:Qn,mousemove:el,mouseleave:el,mouseenter:el},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(i,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(i,e,n,t,s)=>t-s,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Lo={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},xl=Le({},Lo,{filter:vo}),Fo=Le({},xl,{size:10}),Do=Le({},Lo,{show:!1}),wl='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Ro="bold "+wl,zo=1.5,Qr={show:!0,scale:"x",stroke:dl,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Ro,side:2,grid:xl,ticks:Fo,border:Do,font:wl,lineGap:zo,rotate:0},hp="Value",mp="Time",Xr={show:!0,scale:"x",auto:!1,sorted:1,min:me,max:-me,idxs:[]};function gp(i,e,n,t,s){return e.map(r=>r==null?"":gl(r))}function bp(i,e,n,t,s,r,a){let c=[],p=si.get(s)||0;n=a?n:ge(ls(n,s),p);for(let f=n;f<=t;f=ge(f+s,p))c.push(Object.is(f,-0)?0:f);return c}function rl(i,e,n,t,s,r,a){let c=[],p=i.scales[i.axes[e].scale].log,f=p==10?Wt:mo,b=ht(f(n));s=Qi(p,b),p==10&&(s=wi[Tt(s,wi)]);let h=n,g=s*p;p==10&&(g=wi[Tt(g,wi)]);do c.push(h),h=h+s,p==10&&!si.has(h)&&(h=ge(h,si.get(s))),h>=g&&(s=h,g=s*p,p==10&&(g=wi[Tt(g,wi)]));while(h<=t);return c}function vp(i,e,n,t,s,r,a){let p=i.scales[i.axes[e].scale].asinh,f=t>p?rl(i,e,it(p,n),t,s):[p],b=t>=0&&n<=0?[0]:[];return(n<-p?rl(i,e,it(p,-t),-n,s):[p]).reverse().map(g=>-g).concat(b,f)}var Io=/./,yp=/[12357]/,xp=/[125]/,eo=/1/,ol=(i,e,n,t)=>i.map((s,r)=>e==4&&s==0||r%t==0&&n.test(s.toExponential()[s<0?1:0])?s:null);function wp(i,e,n,t,s){let r=i.axes[n],a=r.scale,c=i.scales[a],p=i.valToPos,f=r._space,b=p(10,a),h=p(9,a)-b>=f?Io:p(7,a)-b>=f?yp:p(5,a)-b>=f?xp:eo;if(h==eo){let g=Ie(p(1,a)-b);if(g<f)return ol(e.slice().reverse(),c.distr,h,$t(f/g)).reverse()}return ol(e,c.distr,h,1)}function _p(i,e,n,t,s){let r=i.axes[n],a=r.scale,c=r._space,p=i.valToPos,f=Ie(p(1,a)-p(2,a));return f<c?ol(e.slice().reverse(),3,Io,$t(c/f)).reverse():e}function $p(i,e,n,t){return t==null?ul:e==null?"":gl(e)}var to={show:!0,scale:"y",stroke:dl,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Ro,side:3,grid:xl,ticks:Fo,border:Do,font:wl,lineGap:zo,rotate:0};function Sp(i,e){let n=3+(i||1)*2;return ge(n*e,3)}function kp(i,e){let{scale:n,idxs:t}=i.series[0],s=i._data[0],r=i.valToPos(s[t[0]],n,!0),a=i.valToPos(s[t[1]],n,!0),c=Ie(a-r),p=i.series[e],f=c/(p.points.space*pe);return t[1]-t[0]<=f}var io={scale:null,auto:!0,sorted:0,min:me,max:-me},Ho=(i,e,n,t,s)=>s,no={show:!0,auto:!0,sorted:0,gaps:Ho,alpha:1,facets:[Le({},io,{scale:"x"}),Le({},io,{scale:"y"})]},so={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:Ho,alpha:1,points:{show:kp,filter:null},values:null,min:me,max:-me,idxs:[],path:null,clip:null};function Ap(i,e,n,t,s){return n/10}var Oo={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},Cp=Le({},Oo,{time:!1,ori:1}),lo={};function No(i,e){let n=lo[i];return n||(n={key:i,plots:[],sub(t){n.plots.push(t)},unsub(t){n.plots=n.plots.filter(s=>s!=t)},pub(t,s,r,a,c,p,f){for(let b=0;b<n.plots.length;b++)n.plots[b]!=s&&n.plots[b].pub(t,s,r,a,c,p,f)}},i!=null&&(lo[i]=n)),n}var tn=1,al=2;function ki(i,e,n){let t=i.mode,s=i.series[e],r=t==2?i._data[e]:i._data,a=i.scales,c=i.bbox,p=r[0],f=t==2?r[1]:r[e],b=t==2?a[s.facets[0].scale]:a[i.series[0].scale],h=t==2?a[s.facets[1].scale]:a[s.scale],g=c.left,w=c.top,$=c.width,y=c.height,D=i.valToPosH,T=i.valToPosV;return b.ori==0?n(s,p,f,b,h,D,T,g,w,$,y,as,sn,ps,Uo,Vo):n(s,p,f,b,h,T,D,w,g,y,$,cs,ln,Sl,Bo,jo)}function _l(i,e){let n=0,t=0,s=ae(i.bands,bl);for(let r=0;r<s.length;r++){let a=s[r];a.series[0]==e?n=a.dir:a.series[1]==e&&(a.dir==1?t|=1:t|=2)}return[n,t==1?-1:t==2?1:t==3?2:0]}function Ep(i,e,n,t,s){let r=i.mode,a=i.series[e],c=r==2?a.facets[1].scale:a.scale,p=i.scales[c];return s==-1?p.min:s==1?p.max:p.distr==3?p.dir==1?p.min:p.max:0}function Gt(i,e,n,t,s,r){return ki(i,e,(a,c,p,f,b,h,g,w,$,y,D)=>{let T=a.pxRound,_=f.dir*(f.ori==0?1:-1),L=f.ori==0?sn:ln,P,Q;_==1?(P=n,Q=t):(P=t,Q=n);let I=T(h(c[P],f,y,w)),ee=T(g(p[P],b,D,$)),J=T(h(c[Q],f,y,w)),te=T(g(r==1?b.max:b.min,b,D,$)),G=new Path2D(s);return L(G,J,te),L(G,I,te),L(G,I,ee),G})}function os(i,e,n,t,s,r){let a=null;if(i.length>0){a=new Path2D;let c=e==0?ps:Sl,p=n;for(let h=0;h<i.length;h++){let g=i[h];if(g[1]>g[0]){let w=g[0]-p;w>0&&c(a,p,t,w,t+r),p=g[1]}}let f=n+s-p,b=10;f>0&&c(a,p,t-b/2,f,t+r+b)}return a}function Pp(i,e,n){let t=i[i.length-1];t&&t[0]==e?t[1]=n:i.push([e,n])}function $l(i,e,n,t,s,r,a){let c=[],p=i.length;for(let f=s==1?n:t;f>=n&&f<=t;f+=s)if(e[f]===null){let h=f,g=f;if(s==1)for(;++f<=t&&e[f]===null;)g=f;else for(;--f>=n&&e[f]===null;)g=f;let w=r(i[h]),$=g==h?w:r(i[g]),y=h-s;w=a<=0&&y>=0&&y<p?r(i[y]):w;let T=g+s;$=a>=0&&T>=0&&T<p?r(i[T]):$,$>=w&&c.push([w,$])}return c}function ro(i){return i==0?bo:i==1?ze:e=>xi(e,i)}function qo(i){let e=i==0?as:cs,n=i==0?(s,r,a,c,p,f)=>{s.arcTo(r,a,c,p,f)}:(s,r,a,c,p,f)=>{s.arcTo(a,r,p,c,f)},t=i==0?(s,r,a,c,p)=>{s.rect(r,a,c,p)}:(s,r,a,c,p)=>{s.rect(a,r,p,c)};return(s,r,a,c,p,f=0,b=0)=>{f==0&&b==0?t(s,r,a,c,p):(f=Lt(f,c/2,p/2),b=Lt(b,c/2,p/2),e(s,r+f,a),n(s,r+c,a,r+c,a+p,f),n(s,r+c,a+p,r,a+p,b),n(s,r,a+p,r,a,b),n(s,r,a,r+c,a,f),s.closePath())}}var as=(i,e,n)=>{i.moveTo(e,n)},cs=(i,e,n)=>{i.moveTo(n,e)},sn=(i,e,n)=>{i.lineTo(e,n)},ln=(i,e,n)=>{i.lineTo(n,e)},ps=qo(0),Sl=qo(1),Uo=(i,e,n,t,s,r)=>{i.arc(e,n,t,s,r)},Bo=(i,e,n,t,s,r)=>{i.arc(n,e,t,s,r)},Vo=(i,e,n,t,s,r,a)=>{i.bezierCurveTo(e,n,t,s,r,a)},jo=(i,e,n,t,s,r,a)=>{i.bezierCurveTo(n,e,s,t,a,r)};function Wo(i){return(e,n,t,s,r)=>ki(e,n,(a,c,p,f,b,h,g,w,$,y,D)=>{let{pxRound:T,points:_}=a,L,P;f.ori==0?(L=as,P=Uo):(L=cs,P=Bo);let Q=ge(_.width*pe,3),I=(_.size-_.width)/2*pe,ee=ge(I*2,3),J=new Path2D,te=new Path2D,{left:G,top:M,width:Z,height:k}=e.bbox;ps(te,G-ee,M-ee,Z+ee*2,k+ee*2);let V=O=>{if(p[O]!=null){let ne=T(h(c[O],f,y,w)),N=T(g(p[O],b,D,$));L(J,ne+I,N),P(J,ne,N,I,0,Xn*2)}};if(r)r.forEach(V);else for(let O=t;O<=s;O++)V(O);return{stroke:Q>0?J:null,fill:J,clip:te,flags:tn|al}})}function Go(i){return(e,n,t,s,r,a)=>{t!=s&&(r!=t&&a!=t&&i(e,n,t),r!=s&&a!=s&&i(e,n,s),i(e,n,a))}}var Mp=Go(sn),Tp=Go(ln);function Ko(i){let e=ae(i?.alignGaps,0);return(n,t,s,r)=>ki(n,t,(a,c,p,f,b,h,g,w,$,y,D)=>{[s,r]=ns(p,s,r);let T=a.pxRound,_=k=>T(h(k,f,y,w)),L=k=>T(g(k,b,D,$)),P,Q;f.ori==0?(P=sn,Q=Mp):(P=ln,Q=Tp);let I=f.dir*(f.ori==0?1:-1),ee={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:tn},J=ee.stroke,te=!1;if(r-s>=y*4){let k=q=>n.posToVal(q,f.key,!0),V=null,O=null,ne,N,st,$e=_(c[I==1?s:r]),re=_(c[s]),fe=_(c[r]),ie=k(I==1?re+1:fe-1);for(let q=I==1?s:r;q>=s&&q<=r;q+=I){let Fe=c[q],Se=(I==1?Fe<ie:Fe>ie)?$e:_(Fe),de=p[q];Se==$e?de!=null?(N=de,V==null?(P(J,Se,L(N)),ne=V=O=N):N<V?V=N:N>O&&(O=N)):de===null&&(te=!0):(V!=null&&Q(J,$e,L(V),L(O),L(ne),L(N)),de!=null?(N=de,P(J,Se,L(N)),V=O=ne=N):(V=O=null,de===null&&(te=!0)),$e=Se,ie=k($e+I))}V!=null&&V!=O&&st!=$e&&Q(J,$e,L(V),L(O),L(ne),L(N))}else for(let k=I==1?s:r;k>=s&&k<=r;k+=I){let V=p[k];V===null?te=!0:V!=null&&P(J,_(c[k]),L(V))}let[M,Z]=_l(n,t);if(a.fill!=null||M!=0){let k=ee.fill=new Path2D(J),V=a.fillTo(n,t,a.min,a.max,M),O=L(V),ne=_(c[s]),N=_(c[r]);I==-1&&([N,ne]=[ne,N]),P(k,N,O),P(k,ne,O)}if(!a.spanGaps){let k=[];te&&k.push(...$l(c,p,s,r,I,_,e)),ee.gaps=k=a.gaps(n,t,s,r,k),ee.clip=os(k,f.ori,w,$,y,D)}return Z!=0&&(ee.band=Z==2?[Gt(n,t,s,r,J,-1),Gt(n,t,s,r,J,1)]:Gt(n,t,s,r,J,Z)),ee})}function Lp(i){let e=ae(i.align,1),n=ae(i.ascDesc,!1),t=ae(i.alignGaps,0),s=ae(i.extend,!1);return(r,a,c,p)=>ki(r,a,(f,b,h,g,w,$,y,D,T,_,L)=>{[c,p]=ns(h,c,p);let P=f.pxRound,{left:Q,width:I}=r.bbox,ee=re=>P($(re,g,_,D)),J=re=>P(y(re,w,L,T)),te=g.ori==0?sn:ln,G={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:tn},M=G.stroke,Z=g.dir*(g.ori==0?1:-1),k=J(h[Z==1?c:p]),V=ee(b[Z==1?c:p]),O=V,ne=V;s&&e==-1&&(ne=Q,te(M,ne,k)),te(M,V,k);for(let re=Z==1?c:p;re>=c&&re<=p;re+=Z){let fe=h[re];if(fe==null)continue;let ie=ee(b[re]),q=J(fe);e==1?te(M,ie,k):te(M,O,q),te(M,ie,q),k=q,O=ie}let N=O;s&&e==1&&(N=Q+I,te(M,N,k));let[st,$e]=_l(r,a);if(f.fill!=null||st!=0){let re=G.fill=new Path2D(M),fe=f.fillTo(r,a,f.min,f.max,st),ie=J(fe);te(re,N,ie),te(re,ne,ie)}if(!f.spanGaps){let re=[];re.push(...$l(b,h,c,p,Z,ee,t));let fe=f.width*pe/2,ie=n||e==1?fe:-fe,q=n||e==-1?-fe:fe;re.forEach(Fe=>{Fe[0]+=ie,Fe[1]+=q}),G.gaps=re=f.gaps(r,a,c,p,re),G.clip=os(re,g.ori,D,T,_,L)}return $e!=0&&(G.band=$e==2?[Gt(r,a,c,p,M,-1),Gt(r,a,c,p,M,1)]:Gt(r,a,c,p,M,$e)),G})}function oo(i,e,n,t,s,r,a=me){if(i.length>1){let c=null;for(let p=0,f=1/0;p<i.length;p++)if(e[p]!==void 0){if(c!=null){let b=Ie(i[p]-i[c]);b<f&&(f=b,a=Ie(n(i[p],t,s,r)-n(i[c],t,s,r)))}c=p}}return a}function Fp(i){i=i||Pn;let e=ae(i.size,[.6,me,1]),n=i.align||0,t=i.gap||0,s=i.radius;s=s==null?[0,0]:typeof s=="number"?[s,0]:s;let r=le(s),a=1-e[0],c=ae(e[1],me),p=ae(e[2],1),f=ae(i.disp,Pn),b=ae(i.each,w=>{}),{fill:h,stroke:g}=f;return(w,$,y,D)=>ki(w,$,(T,_,L,P,Q,I,ee,J,te,G,M)=>{let Z=T.pxRound,k=n,V=t*pe,O=c*pe,ne=p*pe,N,st;P.ori==0?[N,st]=r(w,$):[st,N]=r(w,$);let $e=P.dir*(P.ori==0?1:-1),re=P.ori==0?ps:Sl,fe=P.ori==0?b:(z,be,De,Pi,ai,Dt,ci)=>{b(z,be,De,ai,Pi,ci,Dt)},ie=ae(w.bands,bl).find(z=>z.series[0]==$),q=ie!=null?ie.dir:0,Fe=T.fillTo(w,$,T.min,T.max,q),Ye=Z(ee(Fe,Q,M,te)),Se,de,St,ot=G,Ae=Z(T.width*pe),Ft=!1,Ut=null,gt=null,Yt=null,Ai=null;h!=null&&(Ae==0||g!=null)&&(Ft=!0,Ut=h.values(w,$,y,D),gt=new Map,new Set(Ut).forEach(z=>{z!=null&&gt.set(z,new Path2D)}),Ae>0&&(Yt=g.values(w,$,y,D),Ai=new Map,new Set(Yt).forEach(z=>{z!=null&&Ai.set(z,new Path2D)})));let{x0:Ci,size:on}=f;if(Ci!=null&&on!=null){k=1,_=Ci.values(w,$,y,D),Ci.unit==2&&(_=_.map(De=>w.posToVal(J+De*G,P.key,!0)));let z=on.values(w,$,y,D);on.unit==2?de=z[0]*G:de=I(z[0],P,G,J)-I(0,P,G,J),ot=oo(_,L,I,P,G,J,ot),St=ot-de+V}else ot=oo(_,L,I,P,G,J,ot),St=ot*a+V,de=ot-St;St<1&&(St=0),Ae>=de/2&&(Ae=0),St<5&&(Z=bo);let Tn=St>0,ri=ot-St-(Tn?Ae:0);de=Z(ll(ri,ne,O)),Se=(k==0?de/2:k==$e?0:de)-k*$e*((k==0?V/2:0)+(Tn?Ae/2:0));let Je={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Ei=Ft?null:new Path2D,Bt=null;if(ie!=null)Bt=w.data[ie.series[1]];else{let{y0:z,y1:be}=f;z!=null&&be!=null&&(L=be.values(w,$,y,D),Bt=z.values(w,$,y,D))}let oi=N*de,X=st*de;for(let z=$e==1?y:D;z>=y&&z<=D;z+=$e){let be=L[z];if(be==null)continue;if(Bt!=null){let lt=Bt[z]??0;if(be-lt==0)continue;Ye=ee(lt,Q,M,te)}let De=P.distr!=2||f!=null?_[z]:z,Pi=I(De,P,G,J),ai=ee(ae(be,Fe),Q,M,te),Dt=Z(Pi-Se),ci=Z(it(ai,Ye)),at=Z(Lt(ai,Ye)),bt=ci-at;if(be!=null){let lt=be<0?X:oi,kt=be<0?oi:X;Ft?(Ae>0&&Yt[z]!=null&&re(Ai.get(Yt[z]),Dt,at+ht(Ae/2),de,it(0,bt-Ae),lt,kt),Ut[z]!=null&&re(gt.get(Ut[z]),Dt,at+ht(Ae/2),de,it(0,bt-Ae),lt,kt)):re(Ei,Dt,at+ht(Ae/2),de,it(0,bt-Ae),lt,kt),fe(w,$,z,Dt-Ae/2,at,de+Ae,bt)}}return Ae>0?Je.stroke=Ft?Ai:Ei:Ft||(Je._fill=T.width==0?T._fill:T._stroke??T._fill,Je.width=0),Je.fill=Ft?gt:Ei,Je})}function Dp(i,e){let n=ae(e?.alignGaps,0);return(t,s,r,a)=>ki(t,s,(c,p,f,b,h,g,w,$,y,D,T)=>{[r,a]=ns(f,r,a);let _=c.pxRound,L=N=>_(g(N,b,D,$)),P=N=>_(w(N,h,T,y)),Q,I,ee;b.ori==0?(Q=as,ee=sn,I=Vo):(Q=cs,ee=ln,I=jo);let J=b.dir*(b.ori==0?1:-1),te=L(p[J==1?r:a]),G=te,M=[],Z=[];for(let N=J==1?r:a;N>=r&&N<=a;N+=J)if(f[N]!=null){let $e=p[N],re=L($e);M.push(G=re),Z.push(P(f[N]))}let k={stroke:i(M,Z,Q,ee,I,_),fill:null,clip:null,band:null,gaps:null,flags:tn},V=k.stroke,[O,ne]=_l(t,s);if(c.fill!=null||O!=0){let N=k.fill=new Path2D(V),st=c.fillTo(t,s,c.min,c.max,O),$e=P(st);ee(N,G,$e),ee(N,te,$e)}if(!c.spanGaps){let N=[];N.push(...$l(p,f,r,a,J,L,n)),k.gaps=N=c.gaps(t,s,r,a,N),k.clip=os(N,b.ori,$,y,D,T)}return ne!=0&&(k.band=ne==2?[Gt(t,s,r,a,V,-1),Gt(t,s,r,a,V,1)]:Gt(t,s,r,a,V,ne)),k})}function Rp(i){return Dp(zp,i)}function zp(i,e,n,t,s,r){let a=i.length;if(a<2)return null;let c=new Path2D;if(n(c,i[0],e[0]),a==2)t(c,i[1],e[1]);else{let p=Array(a),f=Array(a-1),b=Array(a-1),h=Array(a-1);for(let g=0;g<a-1;g++)b[g]=e[g+1]-e[g],h[g]=i[g+1]-i[g],f[g]=b[g]/h[g];p[0]=f[0];for(let g=1;g<a-1;g++)f[g]===0||f[g-1]===0||f[g-1]>0!=f[g]>0?p[g]=0:(p[g]=3*(h[g-1]+h[g])/((2*h[g]+h[g-1])/f[g-1]+(h[g]+2*h[g-1])/f[g]),isFinite(p[g])||(p[g]=0));p[a-1]=f[a-2];for(let g=0;g<a-1;g++)s(c,i[g]+h[g]/3,e[g]+p[g]*h[g]/3,i[g+1]-h[g]/3,e[g+1]-p[g+1]*h[g]/3,i[g+1],e[g+1])}return c}var cl=new Set;function ao(){for(let i of cl)i.syncRect(!0)}nn&&($i(gc,Zi,ao),$i(bc,Zi,ao,!0),$i(es,Zi,()=>{Ve.pxRatio=pe}));var Ip=Ko(),Hp=Wo();function co(i,e,n,t){return(t?[i[0],i[1]].concat(i.slice(2)):[i[0]].concat(i.slice(1))).map((r,a)=>pl(r,a,e,n))}function Op(i,e){return i.map((n,t)=>t==0?{}:Le({},e,n))}function pl(i,e,n,t){return Le({},e==0?n:t,i)}function Yo(i,e,n){return e==null?Xi:[e,n]}var Np=Yo;function qp(i,e,n){return e==null?Xi:ts(e,n,ml,!0)}function Jo(i,e,n,t){return e==null?Xi:ss(e,n,i.scales[t].log,!1)}var Up=Jo;function Zo(i,e,n,t){return e==null?Xi:hl(e,n,i.scales[t].log,!1)}var Bp=Zo;function Vp(i,e,n,t,s){let r=it(qr(i),qr(e)),a=e-i,c=Tt(s/t*a,n);do{let p=n[c],f=t*p/a;if(f>=s&&r+(p<5?si.get(p):0)<=17)return[p,f]}while(++c<n.length);return[0,0]}function po(i){let e,n;return i=i.replace(/(\d+)px/,(t,s)=>(e=ze((n=+s)*pe))+"px"),[i,e,n]}function jp(i){i.show&&[i.font,i.labelFont].forEach(e=>{let n=ge(e[2]*pe,1);e[0]=e[0].replace(/[0-9.]+px/,n+"px"),e[1]=n})}function Ve(i,e,n){let t={mode:ae(i.mode,1)},s=t.mode;function r(l,o,d,u){let m=o.valToPct(l);return u+d*(o.dir==-1?1-m:m)}function a(l,o,d,u){let m=o.valToPct(l);return u+d*(o.dir==-1?m:1-m)}function c(l,o,d,u){return o.ori==0?r(l,o,d,u):a(l,o,d,u)}t.valToPosH=r,t.valToPosV=a;let p=!1;t.status=0;let f=t.root=_t(Qa);if(i.id!=null&&(f.id=i.id),ft(f,i.class),i.title){let l=_t(tc,f);l.textContent=i.title}let b=Mt("canvas"),h=t.ctx=b.getContext("2d"),g=_t(ic,f);$i("click",g,l=>{l.target===$&&(ye!=Ni||ke!=qi)&&We.click(t,l)},!0);let w=t.under=_t(nc,g);g.appendChild(b);let $=t.over=_t(sc,g);i=en(i);let y=+ae(i.pxAlign,1),D=ro(y);(i.plugins||[]).forEach(l=>{l.opts&&(i=l.opts(t,i)||i)});let T=i.ms||.001,_=t.series=s==1?co(i.series||[],Xr,so,!1):Op(i.series||[null],no),L=t.axes=co(i.axes||[],Qr,to,!0),P=t.scales={},Q=t.bands=i.bands||[];Q.forEach(l=>{l.fill=le(l.fill||null),l.dir=ae(l.dir,-1)});let I=s==2?_[1].facets[0].scale:_[0].scale,ee={axes:ga,series:da},J=(i.drawOrder||["axes","series"]).map(l=>ee[l]);function te(l){let o=l.distr==3?d=>Wt(d>0?d:l.clamp(t,d,l.min,l.max,l.key)):l.distr==4?d=>Zs(d,l.asinh):l.distr==100?d=>l.fwd(d):d=>d;return d=>{let u=o(d),{_min:m,_max:v}=l,x=v-m;return(u-m)/x}}function G(l){let o=P[l];if(o==null){let d=(i.scales||Pn)[l]||Pn;if(d.from!=null){G(d.from);let u=Le({},P[d.from],d,{key:l});u.valToPct=te(u),P[l]=u}else{o=P[l]=Le({},l==I?Oo:Cp,d),o.key=l;let u=o.time,m=o.range,v=ni(m);if((l!=I||s==2&&!u)&&(v&&(m[0]==null||m[1]==null)&&(m={min:m[0]==null?Hr:{mode:1,hard:m[0],soft:m[0]},max:m[1]==null?Hr:{mode:1,hard:m[1],soft:m[1]}},v=!1),!v&&rs(m))){let x=m;m=(S,E,F)=>E==null?Xi:ts(E,F,x)}o.range=le(m||(u?Np:l==I?o.distr==3?Up:o.distr==4?Bp:Yo:o.distr==3?Jo:o.distr==4?Zo:qp)),o.auto=le(v?!1:o.auto),o.clamp=le(o.clamp||Ap),o._min=o._max=null,o.valToPct=te(o)}}}G("x"),G("y"),s==1&&_.forEach(l=>{G(l.scale)}),L.forEach(l=>{G(l.scale)});for(let l in i.scales)G(l);let M=P[I],Z=M.distr,k,V;M.ori==0?(ft(f,Xa),k=r,V=a):(ft(f,ec),k=a,V=r);let O={};for(let l in P){let o=P[l];(o.min!=null||o.max!=null)&&(O[l]={min:o.min,max:o.max},o.min=o.max=null)}let ne=i.tzDate||(l=>new Date(ze(l/T))),N=i.fmtDate||vl,st=T==1?Xc(ne):ip(ne),$e=Yr(ne,Kr(T==1?Qc:tp,N)),re=Zr(ne,Jr(sp,N)),fe=[],ie=t.legend=Le({},op,i.legend),q=t.cursor=Le({},fp,{drag:{y:s==2}},i.cursor),Fe=ie.show,Ye=q.show,Se=ie.markers;ie.idxs=fe,Se.width=le(Se.width),Se.dash=le(Se.dash),Se.stroke=le(Se.stroke),Se.fill=le(Se.fill);let de,St,ot,Ae=[],Ft=[],Ut,gt=!1,Yt={};if(ie.live){let l=_[1]?_[1].values:null;gt=l!=null,Ut=gt?l(t,1,0):{_:0};for(let o in Ut)Yt[o]=ul}if(Fe)if(de=Mt("table",pc,f),ot=Mt("tbody",null,de),ie.mount(t,de),gt){St=Mt("thead",null,de,ot);let l=Mt("tr",null,St);Mt("th",null,l);for(var Ai in Ut)Mt("th",kr,l).textContent=Ai}else ft(de,uc),ie.live&&ft(de,dc);let Ci={show:!0},on={show:!1};function Tn(l,o){if(o==0&&(gt||!ie.live||s==2))return Xi;let d=[],u=Mt("tr",fc,ot,ot.childNodes[o]);ft(u,l.class),l.show||ft(u,_i);let m=Mt("th",null,u);if(Se.show){let S=_t(hc,m);if(o>0){let E=Se.width(t,o);E&&(S.style.border=E+"px "+Se.dash(t,o)+" "+Se.stroke(t,o)),S.style.background=Se.fill(t,o)}}let v=_t(kr,m);l.label instanceof HTMLElement?v.appendChild(l.label):v.textContent=l.label,o>0&&(Se.show||(v.style.color=l.width>0?Se.stroke(t,o):Se.fill(t,o)),Je("click",m,S=>{if(q._lock)return;di(S);let E=_.indexOf(l);if((S.ctrlKey||S.metaKey)!=ie.isolate){let F=_.some((R,H)=>H>0&&H!=E&&R.show);_.forEach((R,H)=>{H>0&&zt(H,F?H==E?Ci:on:Ci,!0,Te.setSeries)})}else zt(E,{show:!l.show},!0,Te.setSeries)},!1),Ti&&Je(Pr,m,S=>{q._lock||(di(S),zt(_.indexOf(l),Bi,!0,Te.setSeries))},!1));for(var x in Ut){let S=Mt("td",mc,u);S.textContent="--",d.push(S)}return[u,d]}let ri=new Map;function Je(l,o,d,u=!0){let m=ri.get(o)||{},v=q.bind[l](t,o,d,u);v&&($i(l,o,m[l]=v),ri.set(o,m))}function Ei(l,o,d){let u=ri.get(o)||{};for(let m in u)(l==null||m==l)&&(sl(m,o,u[m]),delete u[m]);l==null&&ri.delete(o)}let Bt=0,oi=0,X=0,z=0,be=0,De=0,Pi=be,ai=De,Dt=X,ci=z,at=0,bt=0,lt=0,kt=0;t.bbox={};let ds=!1,Ln=!1,Mi=!1,pi=!1,Fn=!1,vt=!1;function us(l,o,d){(d||l!=t.width||o!=t.height)&&Al(l,o),zi(!1),Mi=!0,Ln=!0,Ii()}function Al(l,o){t.width=Bt=X=l,t.height=oi=z=o,be=De=0,sa(),la();let d=t.bbox;at=d.left=xi(be*pe,.5),bt=d.top=xi(De*pe,.5),lt=d.width=xi(X*pe,.5),kt=d.height=xi(z*pe,.5)}let ta=3;function ia(){let l=!1,o=0;for(;!l;){o++;let d=ha(o),u=ma(o);l=o==ta||d&&u,l||(Al(t.width,t.height),Ln=!0)}}function na({width:l,height:o}){us(l,o)}t.setSize=na;function sa(){let l=!1,o=!1,d=!1,u=!1;L.forEach((m,v)=>{if(m.show&&m._show){let{side:x,_size:S}=m,E=x%2,F=m.label!=null?m.labelSize:0,R=S+F;R>0&&(E?(X-=R,x==3?(be+=R,u=!0):d=!0):(z-=R,x==0?(De+=R,l=!0):o=!0))}}),ui[0]=l,ui[1]=d,ui[2]=o,ui[3]=u,X-=Jt[1]+Jt[3],be+=Jt[3],z-=Jt[2]+Jt[0],De+=Jt[0]}function la(){let l=be+X,o=De+z,d=be,u=De;function m(v,x){switch(v){case 1:return l+=x,l-x;case 2:return o+=x,o-x;case 3:return d-=x,d+x;case 0:return u-=x,u+x}}L.forEach((v,x)=>{if(v.show&&v._show){let S=v.side;v._pos=m(S,v._size),v.label!=null&&(v._lpos=m(S,v.labelSize))}})}if(q.dataIdx==null){let l=q.hover,o=l.skip=new Set(l.skip??[]);o.add(void 0);let d=l.prox=le(l.prox),u=l.bias??=0;q.dataIdx=(m,v,x,S)=>{if(v==0)return x;let E=x,F=d(m,v,x,S)??me,R=F>=0&&F<me,H=M.ori==0?X:z,K=q.left,ce=e[0],oe=e[v];if(o.has(oe[x])){E=null;let se=null,W=null,U;if(u==0||u==-1)for(U=x;se==null&&U-- >0;)o.has(oe[U])||(se=U);if(u==0||u==1)for(U=x;W==null&&U++<oe.length;)o.has(oe[U])||(W=U);if(se!=null||W!=null)if(R){let we=se==null?-1/0:k(ce[se],M,H,0),Ee=W==null?1/0:k(ce[W],M,H,0),Be=K-we,he=Ee-K;Be<=he?Be<=F&&(E=se):he<=F&&(E=W)}else E=W==null?se:se==null?W:x-se<=W-x?se:W}else R&&Ie(K-k(ce[x],M,H,0))>F&&(E=null);return E}}let di=l=>{q.event=l};q.idxs=fe,q._lock=!1;let Ge=q.points;Ge.show=le(Ge.show),Ge.size=le(Ge.size),Ge.stroke=le(Ge.stroke),Ge.width=le(Ge.width),Ge.fill=le(Ge.fill);let Rt=t.focus=Le({},i.focus||{alpha:.3},q.focus),Ti=Rt.prox>=0,Li=Ti&&Ge.one,yt=[],Fi=[],Di=[];function Cl(l,o){let d=Ge.show(t,o);if(d instanceof HTMLElement)return ft(d,cc),ft(d,l.class),qt(d,-10,-10,X,z),$.insertBefore(d,yt[o]),d}function El(l,o){if(s==1||o>0){let d=s==1&&P[l.scale].time,u=l.value;l.value=d?Vr(u)?Zr(ne,Jr(u,N)):u||re:u||$p,l.label=l.label||(d?mp:hp)}if(Li||o>0){l.width=l.width==null?1:l.width,l.paths=l.paths||Ip||Cc,l.fillTo=le(l.fillTo||Ep),l.pxAlign=+ae(l.pxAlign,y),l.pxRound=ro(l.pxAlign),l.stroke=le(l.stroke||null),l.fill=le(l.fill||null),l._stroke=l._fill=l._paths=l._focus=null;let d=Sp(it(1,l.width),1),u=l.points=Le({},{size:d,width:it(1,d*.2),stroke:l.stroke,space:d*2,paths:Hp,_stroke:null,_fill:null},l.points);u.show=le(u.show),u.filter=le(u.filter),u.fill=le(u.fill),u.stroke=le(u.stroke),u.paths=le(u.paths),u.pxAlign=l.pxAlign}if(Fe){let d=Tn(l,o);Ae.splice(o,0,d[0]),Ft.splice(o,0,d[1]),ie.values.push(null)}if(Ye){fe.splice(o,0,null);let d=null;Li?o==0&&(d=Cl(l,o)):o>0&&(d=Cl(l,o)),yt.splice(o,0,d),Fi.splice(o,0,0),Di.splice(o,0,0)}Ue("addSeries",o)}function ra(l,o){o=o??_.length,l=s==1?pl(l,o,Xr,so):pl(l,o,{},no),_.splice(o,0,l),El(_[o],o)}t.addSeries=ra;function oa(l){if(_.splice(l,1),Fe){ie.values.splice(l,1),Ft.splice(l,1);let o=Ae.splice(l,1)[0];Ei(null,o.firstChild),o.remove()}Ye&&(fe.splice(l,1),yt.splice(l,1)[0].remove(),Fi.splice(l,1),Di.splice(l,1)),Ue("delSeries",l)}t.delSeries=oa;let ui=[!1,!1,!1,!1];function aa(l,o){if(l._show=l.show,l.show){let d=l.side%2,u=P[l.scale];u==null&&(l.scale=d?_[1].scale:I,u=P[l.scale]);let m=u.time;l.size=le(l.size),l.space=le(l.space),l.rotate=le(l.rotate),ni(l.incrs)&&l.incrs.forEach(x=>{!si.has(x)&&si.set(x,xo(x))}),l.incrs=le(l.incrs||(u.distr==2?Yc:m?T==1?Zc:ep:wi)),l.splits=le(l.splits||(m&&u.distr==1?st:u.distr==3?rl:u.distr==4?vp:bp)),l.stroke=le(l.stroke),l.grid.stroke=le(l.grid.stroke),l.ticks.stroke=le(l.ticks.stroke),l.border.stroke=le(l.border.stroke);let v=l.values;l.values=ni(v)&&!ni(v[0])?le(v):m?ni(v)?Yr(ne,Kr(v,N)):Vr(v)?np(ne,v):v||$e:v||gp,l.filter=le(l.filter||(u.distr>=3&&u.log==10?wp:u.distr==3&&u.log==2?_p:vo)),l.font=po(l.font),l.labelFont=po(l.labelFont),l._size=l.size(t,null,o,0),l._space=l._rotate=l._incrs=l._found=l._splits=l._values=null,l._size>0&&(ui[o]=!0,l._el=_t(lc,g))}}function an(l,o,d,u){let[m,v,x,S]=d,E=o%2,F=0;return E==0&&(S||v)&&(F=o==0&&!m||o==2&&!x?ze(Qr.size/3):0),E==1&&(m||x)&&(F=o==1&&!v||o==3&&!S?ze(to.size/2):0),F}let Pl=t.padding=(i.padding||[an,an,an,an]).map(l=>le(ae(l,an))),Jt=t._padding=Pl.map((l,o)=>l(t,o,ui,0)),je,He=null,Oe=null,Dn=s==1?_[0].idxs:null,At=null,cn=!1;function Ml(l,o){if(e=l??[],t.data=t._data=e,s==2){je=0;for(let d=1;d<_.length;d++)je+=e[d][0].length}else{e.length==0&&(t.data=t._data=e=[[]]),At=e[0],je=At.length;let d=e;if(Z==2){d=e.slice();let u=d[0]=Array(je);for(let m=0;m<je;m++)u[m]=m}t._data=e=d}if(zi(!0),Ue("setData"),Z==2&&(Mi=!0),o!==!1){let d=M;d.auto(t,cn)?fs():Qt(I,d.min,d.max),pi=pi||q.left>=0,vt=!0,Ii()}}t.setData=Ml;function fs(){cn=!0;let l,o;s==1&&(je>0?(He=Dn[0]=0,Oe=Dn[1]=je-1,l=e[0][He],o=e[0][Oe],Z==2?(l=He,o=Oe):l==o&&(Z==3?[l,o]=ss(l,l,M.log,!1):Z==4?[l,o]=hl(l,l,M.log,!1):M.time?o=l+ze(86400/T):[l,o]=ts(l,o,ml,!0))):(He=Dn[0]=l=null,Oe=Dn[1]=o=null)),Qt(I,l,o)}let Rn,Ri,hs,ms,gs,bs,vs,ys,xs,rt;function Tl(l,o,d,u,m,v){l??=Cr,d??=bl,u??="butt",m??=Cr,v??="round",l!=Rn&&(h.strokeStyle=Rn=l),m!=Ri&&(h.fillStyle=Ri=m),o!=hs&&(h.lineWidth=hs=o),v!=gs&&(h.lineJoin=gs=v),u!=bs&&(h.lineCap=bs=u),d!=ms&&h.setLineDash(ms=d)}function Ll(l,o,d,u){o!=Ri&&(h.fillStyle=Ri=o),l!=vs&&(h.font=vs=l),d!=ys&&(h.textAlign=ys=d),u!=xs&&(h.textBaseline=xs=u)}function ws(l,o,d,u,m=0){if(u.length>0&&l.auto(t,cn)&&(o==null||o.min==null)){let v=ae(He,0),x=ae(Oe,u.length-1),S=d.min==null?wc(u,v,x,m,l.distr==3):[d.min,d.max];l.min=Lt(l.min,d.min=S[0]),l.max=it(l.max,d.max=S[1])}}let Fl={min:null,max:null};function ca(){for(let u in P){let m=P[u];O[u]==null&&(m.min==null||O[I]!=null&&m.auto(t,cn))&&(O[u]=Fl)}for(let u in P){let m=P[u];O[u]==null&&m.from!=null&&O[m.from]!=null&&(O[u]=Fl)}O[I]!=null&&zi(!0);let l={};for(let u in O){let m=O[u];if(m!=null){let v=l[u]=en(P[u],Mc);if(m.min!=null)Le(v,m);else if(u!=I||s==2)if(je==0&&v.from==null){let x=v.range(t,null,null,u);v.min=x[0],v.max=x[1]}else v.min=me,v.max=-me}}if(je>0){_.forEach((u,m)=>{if(s==1){let v=u.scale,x=O[v];if(x==null)return;let S=l[v];if(m==0){let E=S.range(t,S.min,S.max,v);S.min=E[0],S.max=E[1],He=Tt(S.min,e[0]),Oe=Tt(S.max,e[0]),Oe-He>1&&(e[0][He]<S.min&&He++,e[0][Oe]>S.max&&Oe--),u.min=At[He],u.max=At[Oe]}else u.show&&u.auto&&ws(S,x,u,e[m],u.sorted);u.idxs[0]=He,u.idxs[1]=Oe}else if(m>0&&u.show&&u.auto){let[v,x]=u.facets,S=v.scale,E=x.scale,[F,R]=e[m],H=l[S],K=l[E];H!=null&&ws(H,O[S],v,F,v.sorted),K!=null&&ws(K,O[E],x,R,x.sorted),u.min=x.min,u.max=x.max}});for(let u in l){let m=l[u],v=O[u];if(m.from==null&&(v==null||v.min==null)){let x=m.range(t,m.min==me?null:m.min,m.max==-me?null:m.max,u);m.min=x[0],m.max=x[1]}}}for(let u in l){let m=l[u];if(m.from!=null){let v=l[m.from];if(v.min==null)m.min=m.max=null;else{let x=m.range(t,v.min,v.max,u);m.min=x[0],m.max=x[1]}}}let o={},d=!1;for(let u in l){let m=l[u],v=P[u];if(v.min!=m.min||v.max!=m.max){v.min=m.min,v.max=m.max;let x=v.distr;v._min=x==3?Wt(v.min):x==4?Zs(v.min,v.asinh):x==100?v.fwd(v.min):v.min,v._max=x==3?Wt(v.max):x==4?Zs(v.max,v.asinh):x==100?v.fwd(v.max):v.max,o[u]=d=!0}}if(d){_.forEach((u,m)=>{s==2?m>0&&o.y&&(u._paths=null):o[u.scale]&&(u._paths=null)});for(let u in o)Mi=!0,Ue("setScale",u);Ye&&q.left>=0&&(pi=vt=!0)}for(let u in O)O[u]=null}function pa(l){let o=ll(He-1,0,je-1),d=ll(Oe+1,0,je-1);for(;l[o]==null&&o>0;)o--;for(;l[d]==null&&d<je-1;)d++;return[o,d]}function da(){if(je>0){let l=_.some(o=>o._focus)&&rt!=Rt.alpha;l&&(h.globalAlpha=rt=Rt.alpha),_.forEach((o,d)=>{if(d>0&&o.show&&(Dl(d,!1),Dl(d,!0),o._paths==null)){let u=rt;rt!=o.alpha&&(h.globalAlpha=rt=o.alpha);let m=s==2?[0,e[d][0].length-1]:pa(e[d]);o._paths=o.paths(t,d,m[0],m[1]),rt!=u&&(h.globalAlpha=rt=u)}}),_.forEach((o,d)=>{if(d>0&&o.show){let u=rt;rt!=o.alpha&&(h.globalAlpha=rt=o.alpha),o._paths!=null&&Rl(d,!1);{let m=o._paths!=null?o._paths.gaps:null,v=o.points.show(t,d,He,Oe,m),x=o.points.filter(t,d,v,m);(v||x)&&(o.points._paths=o.points.paths(t,d,He,Oe,x),Rl(d,!0))}rt!=u&&(h.globalAlpha=rt=u),Ue("drawSeries",d)}}),l&&(h.globalAlpha=rt=1)}}function Dl(l,o){let d=o?_[l].points:_[l];d._stroke=d.stroke(t,l),d._fill=d.fill(t,l)}function Rl(l,o){let d=o?_[l].points:_[l],{stroke:u,fill:m,clip:v,flags:x,_stroke:S=d._stroke,_fill:E=d._fill,_width:F=d.width}=d._paths;F=ge(F*pe,3);let R=null,H=F%2/2;o&&E==null&&(E=F>0?"#fff":S);let K=d.pxAlign==1&&H>0;if(K&&h.translate(H,H),!o){let ce=at-F/2,oe=bt-F/2,se=lt+F,W=kt+F;R=new Path2D,R.rect(ce,oe,se,W)}o?_s(S,F,d.dash,d.cap,E,u,m,x,v):ua(l,S,F,d.dash,d.cap,E,u,m,x,R,v),K&&h.translate(-H,-H)}function ua(l,o,d,u,m,v,x,S,E,F,R){let H=!1;E!=0&&Q.forEach((K,ce)=>{if(K.series[0]==l){let oe=_[K.series[1]],se=e[K.series[1]],W=(oe._paths||Pn).band;ni(W)&&(W=K.dir==1?W[0]:W[1]);let U,we=null;oe.show&&W&&$c(se,He,Oe)?(we=K.fill(t,ce)||v,U=oe._paths.clip):W=null,_s(o,d,u,m,we,x,S,E,F,R,U,W),H=!0}}),H||_s(o,d,u,m,v,x,S,E,F,R)}let zl=tn|al;function _s(l,o,d,u,m,v,x,S,E,F,R,H){Tl(l,o,d,u,m),(E||F||H)&&(h.save(),E&&h.clip(E),F&&h.clip(F)),H?(S&zl)==zl?(h.clip(H),R&&h.clip(R),In(m,x),zn(l,v,o)):S&al?(In(m,x),h.clip(H),zn(l,v,o)):S&tn&&(h.save(),h.clip(H),R&&h.clip(R),In(m,x),h.restore(),zn(l,v,o)):(In(m,x),zn(l,v,o)),(E||F||H)&&h.restore()}function zn(l,o,d){d>0&&(o instanceof Map?o.forEach((u,m)=>{h.strokeStyle=Rn=m,h.stroke(u)}):o!=null&&l&&h.stroke(o))}function In(l,o){o instanceof Map?o.forEach((d,u)=>{h.fillStyle=Ri=u,h.fill(d)}):o!=null&&l&&h.fill(o)}function fa(l,o,d,u){let m=L[l],v;if(u<=0)v=[0,0];else{let x=m._space=m.space(t,l,o,d,u),S=m._incrs=m.incrs(t,l,o,d,u,x);v=Vp(o,d,S,u,x)}return m._found=v}function $s(l,o,d,u,m,v,x,S,E,F){let R=x%2/2;y==1&&h.translate(R,R),Tl(S,x,E,F,S),h.beginPath();let H,K,ce,oe,se=m+(u==0||u==3?-v:v);d==0?(K=m,oe=se):(H=m,ce=se);for(let W=0;W<l.length;W++)o[W]!=null&&(d==0?H=ce=l[W]:K=oe=l[W],h.moveTo(H,K),h.lineTo(ce,oe));h.stroke(),y==1&&h.translate(-R,-R)}function ha(l){let o=!0;return L.forEach((d,u)=>{if(!d.show)return;let m=P[d.scale];if(m.min==null){d._show&&(o=!1,d._show=!1,zi(!1));return}else d._show||(o=!1,d._show=!0,zi(!1));let v=d.side,x=v%2,{min:S,max:E}=m,[F,R]=fa(u,S,E,x==0?X:z);if(R==0)return;let H=m.distr==2,K=d._splits=d.splits(t,u,S,E,F,R,H),ce=m.distr==2?K.map(U=>At[U]):K,oe=m.distr==2?At[K[1]]-At[K[0]]:F,se=d._values=d.values(t,d.filter(t,ce,u,R,oe),u,R,oe);d._rotate=v==2?d.rotate(t,se,u,R):0;let W=d._size;d._size=$t(d.size(t,se,u,l)),W!=null&&d._size!=W&&(o=!1)}),o}function ma(l){let o=!0;return Pl.forEach((d,u)=>{let m=d(t,u,ui,l);m!=Jt[u]&&(o=!1),Jt[u]=m}),o}function ga(){for(let l=0;l<L.length;l++){let o=L[l];if(!o.show||!o._show)continue;let d=o.side,u=d%2,m,v,x=o.stroke(t,l),S=d==0||d==3?-1:1,[E,F]=o._found;if(o.label!=null){let Qe=o.labelGap*S,dt=ze((o._lpos+Qe)*pe);Ll(o.labelFont[0],x,"center",d==2?"top":Ar),h.save(),u==1?(m=v=0,h.translate(dt,ze(bt+kt/2)),h.rotate((d==3?-Xn:Xn)/2)):(m=ze(at+lt/2),v=dt);let mi=go(o.label)?o.label(t,l,E,F):o.label;h.fillText(mi,m,v),h.restore()}if(F==0)continue;let R=P[o.scale],H=u==0?lt:kt,K=u==0?at:bt,ce=o._splits,oe=R.distr==2?ce.map(Qe=>At[Qe]):ce,se=R.distr==2?At[ce[1]]-At[ce[0]]:E,W=o.ticks,U=o.border,we=W.show?W.size:0,Ee=ze(we*pe),Be=ze((o.alignTo==2?o._size-we-o.gap:o.gap)*pe),he=o._rotate*-Xn/180,Pe=D(o._pos*pe),ct=(Ee+Be)*S,Ze=Pe+ct;v=u==0?Ze:0,m=u==1?Ze:0;let xt=o.font[0],Ct=o.align==1?Yi:o.align==2?Ks:he>0?Yi:he<0?Ks:u==0?"center":d==3?Ks:Yi,Ht=he||u==1?"middle":d==2?"top":Ar;Ll(xt,x,Ct,Ht);let pt=o.font[1]*o.lineGap,wt=ce.map(Qe=>D(c(Qe,R,H,K))),Et=o._values;for(let Qe=0;Qe<Et.length;Qe++){let dt=Et[Qe];if(dt!=null){u==0?m=wt[Qe]:v=wt[Qe],dt=""+dt;let mi=dt.indexOf(`
`)==-1?[dt]:dt.split(/\n/gm);for(let Xe=0;Xe<mi.length;Xe++){let tr=mi[Xe];he?(h.save(),h.translate(m,v+Xe*pt),h.rotate(he),h.fillText(tr,0,0),h.restore()):h.fillText(tr,m,v+Xe*pt)}}}W.show&&$s(wt,W.filter(t,oe,l,F,se),u,d,Pe,Ee,ge(W.width*pe,3),W.stroke(t,l),W.dash,W.cap);let Ot=o.grid;Ot.show&&$s(wt,Ot.filter(t,oe,l,F,se),u,u==0?2:1,u==0?bt:at,u==0?kt:lt,ge(Ot.width*pe,3),Ot.stroke(t,l),Ot.dash,Ot.cap),U.show&&$s([Pe],[1],u==0?1:0,u==0?1:2,u==1?bt:at,u==1?kt:lt,ge(U.width*pe,3),U.stroke(t,l),U.dash,U.cap)}Ue("drawAxes")}function zi(l){_.forEach((o,d)=>{d>0&&(o._paths=null,l&&(s==1?(o.min=null,o.max=null):o.facets.forEach(u=>{u.min=null,u.max=null})))})}let Hn=!1,Ss=!1,pn=[];function ba(){Ss=!1;for(let l=0;l<pn.length;l++)Ue(...pn[l]);pn.length=0}function Ii(){Hn||(Ic(Il),Hn=!0)}function va(l,o=!1){Hn=!0,Ss=o,l(t),Il(),o&&pn.length>0&&queueMicrotask(ba)}t.batch=va;function Il(){if(ds&&(ca(),ds=!1),Mi&&(ia(),Mi=!1),Ln){if(_e(w,Yi,be),_e(w,"top",De),_e(w,kn,X),_e(w,An,z),_e($,Yi,be),_e($,"top",De),_e($,kn,X),_e($,An,z),_e(g,kn,Bt),_e(g,An,oi),b.width=ze(Bt*pe),b.height=ze(oi*pe),L.forEach(({_el:l,_show:o,_size:d,_pos:u,side:m})=>{if(l!=null)if(o){let v=m===3||m===0?d:0,x=m%2==1;_e(l,x?"left":"top",u-v),_e(l,x?"width":"height",d),_e(l,x?"top":"left",x?De:be),_e(l,x?"height":"width",x?z:X),nl(l,_i)}else ft(l,_i)}),Rn=Ri=hs=gs=bs=vs=ys=xs=ms=null,rt=1,fn(!0),be!=Pi||De!=ai||X!=Dt||z!=ci){zi(!1);let l=X/Dt,o=z/ci;if(Ye&&!pi&&q.left>=0){q.left*=l,q.top*=o,Hi&&qt(Hi,ze(q.left),0,X,z),Oi&&qt(Oi,0,ze(q.top),X,z);for(let d=0;d<yt.length;d++){let u=yt[d];u!=null&&(Fi[d]*=l,Di[d]*=o,qt(u,$t(Fi[d]),$t(Di[d]),X,z))}}if(xe.show&&!Fn&&xe.left>=0&&xe.width>0){xe.left*=l,xe.width*=l,xe.top*=o,xe.height*=o;for(let d in Ms)_e(Ui,d,xe[d])}Pi=be,ai=De,Dt=X,ci=z}Ue("setSize"),Ln=!1}Bt>0&&oi>0&&(h.clearRect(0,0,b.width,b.height),Ue("drawClear"),J.forEach(l=>l()),Ue("draw")),xe.show&&Fn&&(On(xe),Fn=!1),Ye&&pi&&(hi(null,!0,!1),pi=!1),ie.show&&ie.live&&vt&&(Es(),vt=!1),p||(p=!0,t.status=1,Ue("ready")),cn=!1,Hn=!1}t.redraw=(l,o)=>{Mi=o||!1,l!==!1?Qt(I,M.min,M.max):Ii()};function ks(l,o){let d=P[l];if(d.from==null){if(je==0){let u=d.range(t,o.min,o.max,l);o.min=u[0],o.max=u[1]}if(o.min>o.max){let u=o.min;o.min=o.max,o.max=u}if(je>1&&o.min!=null&&o.max!=null&&o.max-o.min<1e-16)return;l==I&&d.distr==2&&je>0&&(o.min=Tt(o.min,e[0]),o.max=Tt(o.max,e[0]),o.min==o.max&&o.max++),O[l]=o,ds=!0,Ii()}}t.setScale=ks;let As,Cs,Hi,Oi,Hl,Ol,Ni,qi,Nl,ql,ye,ke,Zt=!1,We=q.drag,Ne=We.x,qe=We.y;Ye&&(q.x&&(As=_t(oc,$)),q.y&&(Cs=_t(ac,$)),M.ori==0?(Hi=As,Oi=Cs):(Hi=Cs,Oi=As),ye=q.left,ke=q.top);let xe=t.select=Le({show:!0,over:!0,left:0,width:0,top:0,height:0},i.select),Ui=xe.show?_t(rc,xe.over?$:w):null;function On(l,o){if(xe.show){for(let d in l)xe[d]=l[d],d in Ms&&_e(Ui,d,l[d]);o!==!1&&Ue("setSelect")}}t.setSelect=On;function ya(l){if(_[l].show)Fe&&nl(Ae[l],_i);else if(Fe&&ft(Ae[l],_i),Ye){let d=Li?yt[0]:yt[l];d!=null&&qt(d,-10,-10,X,z)}}function Qt(l,o,d){ks(l,{min:o,max:d})}function zt(l,o,d,u){o.focus!=null&&Sa(l),o.show!=null&&_.forEach((m,v)=>{v>0&&(l==v||l==null)&&(m.show=o.show,ya(v),s==2?(Qt(m.facets[0].scale,null,null),Qt(m.facets[1].scale,null,null)):Qt(m.scale,null,null),Ii())}),d!==!1&&Ue("setSeries",l,o),u&&hn("setSeries",t,l,o)}t.setSeries=zt;function xa(l,o){Le(Q[l],o)}function wa(l,o){l.fill=le(l.fill||null),l.dir=ae(l.dir,-1),o=o??Q.length,Q.splice(o,0,l)}function _a(l){l==null?Q.length=0:Q.splice(l,1)}t.addBand=wa,t.setBand=xa,t.delBand=_a;function $a(l,o){_[l].alpha=o,Ye&&yt[l]!=null&&(yt[l].style.opacity=o),Fe&&Ae[l]&&(Ae[l].style.opacity=o)}let Vt,Xt,fi,Bi={focus:!0};function Sa(l){if(l!=fi){let o=l==null,d=Rt.alpha!=1;_.forEach((u,m)=>{if(s==1||m>0){let v=o||m==0||m==l;u._focus=o?null:v,d&&$a(m,v?1:Rt.alpha)}}),fi=l,d&&Ii()}}Fe&&Ti&&Je(Mr,de,l=>{q._lock||(di(l),fi!=null&&zt(null,Bi,!0,Te.setSeries))});function It(l,o,d){let u=P[o];d&&(l=l/pe-(u.ori==1?De:be));let m=X;u.ori==1&&(m=z,l=m-l),u.dir==-1&&(l=m-l);let v=u._min,x=u._max,S=l/m,E=v+(x-v)*S,F=u.distr;return F==3?Qi(10,E):F==4?kc(E,u.asinh):F==100?u.bwd(E):E}function ka(l,o){let d=It(l,I,o);return Tt(d,e[0],He,Oe)}t.valToIdx=l=>Tt(l,e[0]),t.posToIdx=ka,t.posToVal=It,t.valToPos=(l,o,d)=>P[o].ori==0?r(l,P[o],d?lt:X,d?at:0):a(l,P[o],d?kt:z,d?bt:0),t.setCursor=(l,o,d)=>{ye=l.left,ke=l.top,hi(null,o,d)};function Ul(l,o){_e(Ui,Yi,xe.left=l),_e(Ui,kn,xe.width=o)}function Bl(l,o){_e(Ui,"top",xe.top=l),_e(Ui,An,xe.height=o)}let dn=M.ori==0?Ul:Bl,un=M.ori==1?Ul:Bl;function Aa(){if(Fe&&ie.live)for(let l=s==2?1:0;l<_.length;l++){if(l==0&&gt)continue;let o=ie.values[l],d=0;for(let u in o)Ft[l][d++].firstChild.nodeValue=o[u]}}function Es(l,o){if(l!=null&&(l.idxs?l.idxs.forEach((d,u)=>{fe[u]=d}):Pc(l.idx)||fe.fill(l.idx),ie.idx=fe[0]),Fe&&ie.live){for(let d=0;d<_.length;d++)(d>0||s==1&&!gt)&&Ca(d,fe[d]);Aa()}vt=!1,o!==!1&&Ue("setLegend")}t.setLegend=Es;function Ca(l,o){let d=_[l],u=l==0&&Z==2?At:e[l],m;gt?m=d.values(t,l,o)??Yt:(m=d.value(t,o==null?null:u[o],l,o),m=m==null?Yt:{_:m}),ie.values[l]=m}function hi(l,o,d){Nl=ye,ql=ke,[ye,ke]=q.move(t,ye,ke),q.left=ye,q.top=ke,Ye&&(Hi&&qt(Hi,ze(ye),0,X,z),Oi&&qt(Oi,0,ze(ke),X,z));let u,m=He>Oe;Vt=me,Xt=null;let v=M.ori==0?X:z,x=M.ori==1?X:z;if(ye<0||je==0||m){u=q.idx=null;for(let S=0;S<_.length;S++){let E=yt[S];E!=null&&qt(E,-10,-10,X,z)}Ti&&zt(null,Bi,!0,l==null&&Te.setSeries),ie.live&&(fe.fill(u),vt=!0)}else{let S,E,F;s==1&&(S=M.ori==0?ye:ke,E=It(S,I),u=q.idx=Tt(E,e[0],He,Oe),F=k(e[0][u],M,v,0));let R=-10,H=-10,K=0,ce=0,oe=!0,se="",W="";for(let U=s==2?1:0;U<_.length;U++){let we=_[U],Ee=fe[U],Be=Ee==null?null:s==1?e[U][Ee]:e[U][1][Ee],he=q.dataIdx(t,U,u,E),Pe=he==null?null:s==1?e[U][he]:e[U][1][he];if(vt=vt||Pe!=Be||he!=Ee,fe[U]=he,U>0&&we.show){let ct=he==null?-10:he==u?F:k(s==1?e[0][he]:e[U][0][he],M,v,0),Ze=Pe==null?-10:V(Pe,s==1?P[we.scale]:P[we.facets[1].scale],x,0);if(Ti&&Pe!=null){let xt=M.ori==1?ye:ke,Ct=Ie(Rt.dist(t,U,he,Ze,xt));if(Ct<Vt){let Ht=Rt.bias;if(Ht!=0){let pt=It(xt,we.scale),wt=Pe>=0?1:-1,Et=pt>=0?1:-1;Et==wt&&(Et==1?Ht==1?Pe>=pt:Pe<=pt:Ht==1?Pe<=pt:Pe>=pt)&&(Vt=Ct,Xt=U)}else Vt=Ct,Xt=U}}if(vt||Li){let xt,Ct;M.ori==0?(xt=ct,Ct=Ze):(xt=Ze,Ct=ct);let Ht,pt,wt,Et,Ot,Qe,dt=!0,mi=Ge.bbox;if(mi!=null){dt=!1;let Xe=mi(t,U);wt=Xe.left,Et=Xe.top,Ht=Xe.width,pt=Xe.height}else wt=xt,Et=Ct,Ht=pt=Ge.size(t,U);if(Qe=Ge.fill(t,U),Ot=Ge.stroke(t,U),Li)U==Xt&&Vt<=Rt.prox&&(R=wt,H=Et,K=Ht,ce=pt,oe=dt,se=Qe,W=Ot);else{let Xe=yt[U];Xe!=null&&(Fi[U]=wt,Di[U]=Et,Ir(Xe,Ht,pt,dt),Rr(Xe,Qe,Ot),qt(Xe,$t(wt),$t(Et),X,z))}}}}if(Li){let U=Rt.prox,we=fi==null?Vt<=U:Vt>U||Xt!=fi;if(vt||we){let Ee=yt[0];Ee!=null&&(Fi[0]=R,Di[0]=H,Ir(Ee,K,ce,oe),Rr(Ee,se,W),qt(Ee,$t(R),$t(H),X,z))}}}if(xe.show&&Zt)if(l!=null){let[S,E]=Te.scales,[F,R]=Te.match,[H,K]=l.cursor.sync.scales,ce=l.cursor.drag;if(Ne=ce._x,qe=ce._y,Ne||qe){let{left:oe,top:se,width:W,height:U}=l.select,we=l.scales[H].ori,Ee=l.posToVal,Be,he,Pe,ct,Ze,xt=S!=null&&F(S,H),Ct=E!=null&&R(E,K);xt&&Ne?(we==0?(Be=oe,he=W):(Be=se,he=U),Pe=P[S],ct=k(Ee(Be,H),Pe,v,0),Ze=k(Ee(Be+he,H),Pe,v,0),dn(Lt(ct,Ze),Ie(Ze-ct))):dn(0,v),Ct&&qe?(we==1?(Be=oe,he=W):(Be=se,he=U),Pe=P[E],ct=V(Ee(Be,K),Pe,x,0),Ze=V(Ee(Be+he,K),Pe,x,0),un(Lt(ct,Ze),Ie(Ze-ct))):un(0,x)}else Ts()}else{let S=Ie(Nl-Hl),E=Ie(ql-Ol);if(M.ori==1){let K=S;S=E,E=K}Ne=We.x&&S>=We.dist,qe=We.y&&E>=We.dist;let F=We.uni;F!=null?Ne&&qe&&(Ne=S>=F,qe=E>=F,!Ne&&!qe&&(E>S?qe=!0:Ne=!0)):We.x&&We.y&&(Ne||qe)&&(Ne=qe=!0);let R,H;Ne&&(M.ori==0?(R=Ni,H=ye):(R=qi,H=ke),dn(Lt(R,H),Ie(H-R)),qe||un(0,x)),qe&&(M.ori==1?(R=Ni,H=ye):(R=qi,H=ke),un(Lt(R,H),Ie(H-R)),Ne||dn(0,v)),!Ne&&!qe&&(dn(0,0),un(0,0))}if(We._x=Ne,We._y=qe,l==null){if(d){if(er!=null){let[S,E]=Te.scales;Te.values[0]=S!=null?It(M.ori==0?ye:ke,S):null,Te.values[1]=E!=null?It(M.ori==1?ye:ke,E):null}hn(Ys,t,ye,ke,X,z,u)}if(Ti){let S=d&&Te.setSeries,E=Rt.prox;fi==null?Vt<=E&&zt(Xt,Bi,!0,S):Vt>E?zt(null,Bi,!0,S):Xt!=fi&&zt(Xt,Bi,!0,S)}}vt&&(ie.idx=u,Es()),o!==!1&&Ue("setCursor")}let ei=null;Object.defineProperty(t,"rect",{get(){return ei==null&&fn(!1),ei}});function fn(l=!1){l?ei=null:(ei=$.getBoundingClientRect(),Ue("syncRect",ei))}function Vl(l,o,d,u,m,v,x){q._lock||Zt&&l!=null&&l.movementX==0&&l.movementY==0||(Ps(l,o,d,u,m,v,x,!1,l!=null),l!=null?hi(null,!0,!0):hi(o,!0,!1))}function Ps(l,o,d,u,m,v,x,S,E){if(ei==null&&fn(!1),di(l),l!=null)d=l.clientX-ei.left,u=l.clientY-ei.top;else{if(d<0||u<0){ye=-10,ke=-10;return}let[F,R]=Te.scales,H=o.cursor.sync,[K,ce]=H.values,[oe,se]=H.scales,[W,U]=Te.match,we=o.axes[0].side%2==1,Ee=M.ori==0?X:z,Be=M.ori==1?X:z,he=we?v:m,Pe=we?m:v,ct=we?u:d,Ze=we?d:u;if(oe!=null?d=W(F,oe)?c(K,P[F],Ee,0):-10:d=Ee*(ct/he),se!=null?u=U(R,se)?c(ce,P[R],Be,0):-10:u=Be*(Ze/Pe),M.ori==1){let xt=d;d=u,u=xt}}E&&(o==null||o.cursor.event.type==Ys)&&((d<=1||d>=X-1)&&(d=xi(d,X)),(u<=1||u>=z-1)&&(u=xi(u,z))),S?(Hl=d,Ol=u,[Ni,qi]=q.move(t,d,u)):(ye=d,ke=u)}let Ms={width:0,height:0,left:0,top:0};function Ts(){On(Ms,!1)}let jl,Wl,Gl,Kl;function Yl(l,o,d,u,m,v,x){Zt=!0,Ne=qe=We._x=We._y=!1,Ps(l,o,d,u,m,v,x,!0,!1),l!=null&&(Je(Js,tl,Jl,!1),hn(Er,t,Ni,qi,X,z,null));let{left:S,top:E,width:F,height:R}=xe;jl=S,Wl=E,Gl=F,Kl=R}function Jl(l,o,d,u,m,v,x){Zt=We._x=We._y=!1,Ps(l,o,d,u,m,v,x,!1,!0);let{left:S,top:E,width:F,height:R}=xe,H=F>0||R>0,K=jl!=S||Wl!=E||Gl!=F||Kl!=R;if(H&&K&&On(xe),We.setScale&&H&&K){let ce=S,oe=F,se=E,W=R;if(M.ori==1&&(ce=E,oe=R,se=S,W=F),Ne&&Qt(I,It(ce,I),It(ce+oe,I)),qe)for(let U in P){let we=P[U];U!=I&&we.from==null&&we.min!=me&&Qt(U,It(se+W,U),It(se,U))}Ts()}else q.lock&&(q._lock=!q._lock,hi(o,!0,l!=null));l!=null&&(Ei(Js,tl),hn(Js,t,ye,ke,X,z,null))}function Ea(l,o,d,u,m,v,x){if(q._lock)return;di(l);let S=Zt;if(Zt){let E=!0,F=!0,R=10,H,K;M.ori==0?(H=Ne,K=qe):(H=qe,K=Ne),H&&K&&(E=ye<=R||ye>=X-R,F=ke<=R||ke>=z-R),H&&E&&(ye=ye<Ni?0:X),K&&F&&(ke=ke<qi?0:z),hi(null,!0,!0),Zt=!1}ye=-10,ke=-10,fe.fill(null),hi(null,!0,!0),S&&(Zt=S)}function Zl(l,o,d,u,m,v,x){q._lock||(di(l),fs(),Ts(),l!=null&&hn(Tr,t,ye,ke,X,z,null))}function Ql(){L.forEach(jp),us(t.width,t.height,!0)}$i(es,Zi,Ql);let Vi={};Vi.mousedown=Yl,Vi.mousemove=Vl,Vi.mouseup=Jl,Vi.dblclick=Zl,Vi.setSeries=(l,o,d,u)=>{let m=Te.match[2];d=m(t,o,d),d!=-1&&zt(d,u,!0,!1)},Ye&&(Je(Er,$,Yl),Je(Ys,$,Vl),Je(Pr,$,l=>{di(l),fn(!1)}),Je(Mr,$,Ea),Je(Tr,$,Zl),cl.add(t),t.syncRect=fn);let Nn=t.hooks=i.hooks||{};function Ue(l,o,d){Ss?pn.push([l,o,d]):l in Nn&&Nn[l].forEach(u=>{u.call(null,t,o,d)})}(i.plugins||[]).forEach(l=>{for(let o in l.hooks)Nn[o]=(Nn[o]||[]).concat(l.hooks[o])});let Xl=(l,o,d)=>d,Te=Le({key:null,setSeries:!1,filters:{pub:Ur,sub:Ur},scales:[I,_[1]?_[1].scale:null],match:[Br,Br,Xl],values:[null,null]},q.sync);Te.match.length==2&&Te.match.push(Xl),q.sync=Te;let er=Te.key,Ls=No(er);function hn(l,o,d,u,m,v,x){Te.filters.pub(l,o,d,u,m,v,x)&&Ls.pub(l,o,d,u,m,v,x)}Ls.sub(t);function Pa(l,o,d,u,m,v,x){Te.filters.sub(l,o,d,u,m,v,x)&&Vi[l](null,o,d,u,m,v,x)}t.pub=Pa;function Ma(){Ls.unsub(t),cl.delete(t),ri.clear(),sl(es,Zi,Ql),f.remove(),de?.remove(),Ue("destroy")}t.destroy=Ma;function Fs(){Ue("init",i,e),Ml(e||i.data,!1),O[I]?ks(I,O[I]):fs(),Fn=xe.show&&(xe.width>0||xe.height>0),pi=vt=!0,us(i.width,i.height)}return _.forEach(El),L.forEach(aa),n?n instanceof HTMLElement?(n.appendChild(f),Fs()):n(t,Fs):Fs(),t}Ve.assign=Le;Ve.fmtNum=gl;Ve.rangeNum=ts;Ve.rangeLog=ss;Ve.rangeAsinh=hl;Ve.orient=ki;Ve.pxRatio=pe;Ve.join=zc;Ve.fmtDate=vl,Ve.tzDate=Gc;Ve.sync=No;{Ve.addGap=Pp,Ve.clipGaps=os;let i=Ve.paths={points:Wo};i.linear=Ko,i.stepped=Lp,i.bars=Fp,i.spline=Rp}var Qo='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';var nt=class extends Ke{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.inspectable=!1;this.selectedTime=null;this.marks=[];this.thermalPhases=!1;this.lastSignature="";this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(n){let t=JSON.stringify([this.curves,this.heading,this.syncKey,this.percent,this.thermalPhases,this.range]);if(this.lastSamples===this.samples&&this.lastSignature===t){(n.has("selectedTime")||n.has("marks"))&&this.plot?.redraw(!1,!1);return}this.lastSamples=this.samples,this.lastSignature=t,this.draw()}inspect(n){this.inspectable&&this.dispatchEvent(new CustomEvent("inspect-publication",{detail:n,bubbles:!0,composed:!0}))}toggleSeries(n){let t=this.curves[n].label,s=this.hiddenCurves.has(t);this.plot&&this.plot.setSeries(n+1,{show:s}),s?this.hiddenCurves.delete(t):this.hiddenCurves.add(t),this.requestUpdate()}showCurve(n){let t=this.curves.findIndex(s=>s.path===n);t>=0&&this.hiddenCurves.has(this.curves[t].label)&&this.toggleSeries(t)}drawThermalPhases(n){if(!this.thermalPhases)return;let{left:t,top:s,width:r,height:a}=n.bbox,c=n.ctx;c.save(),c.beginPath(),c.rect(t,s,r,a),c.clip(),c.globalAlpha=1;let p=0,f=0,b=0,h=()=>{if(!b)return;let g=n.valToPos(p,"x",!0),w=n.valToPos(f,"x",!0)-g;c.fillStyle=b>0?"rgba(216,137,46,.14)":"rgba(38,137,202,.14)",c.fillRect(g,s,w,a),c.fillStyle=b>0?"#d8892e":"#2689ca",c.fillRect(g,s+a-6*devicePixelRatio,w,6*devicePixelRatio)};for(let g=1;g<this.samples.length;g++){let w=this.samples[g-1],$=this.samples[g],y=tt(w,"temperature.indoor"),D=tt($,"temperature.indoor"),T=y===null||D===null?0:Math.sign(D-y);T!==b&&(h(),p=w.time,b=T),f=$.time}h(),c.restore()}drawMarks(n,t){if(!this.marks.length)return;let{left:s,top:r,width:a,height:c}=n.bbox,p=n.ctx,f=8*devicePixelRatio;p.save(),p.font=`bold ${f}px sans-serif`,p.textAlign="center",p.textBaseline="middle";let b=new Map;for(let h of this.marks){let g=n.valToPos(h.time,"x",!0);if(g<s||g>s+a||g-(b.get(h.kind)??-1/0)<f*3)continue;b.set(h.kind,g);let w=h.kind==="A"||h.kind==="B",$=h.kind==="A"||h.kind==="Chauffe",y=w?h.temperature===null||this.hiddenCurves.has("Int\xE9rieure mesur\xE9e")?r+f*($?1:3):Math.max(r+f*2,Math.min(r+c-f*6,n.valToPos(h.temperature,"y",!0)))+f*($?-1.1:1.1):r+c-f*($?3:1);p.fillStyle=$?"#17638d":"#6f448a",p.strokeStyle=t,p.beginPath(),h.kind==="B"?(p.moveTo(g,y-f),p.lineTo(g+f,y),p.lineTo(g,y+f),p.lineTo(g-f,y),p.closePath()):p.arc(g,y,f*.8,0,2*Math.PI),p.fill(),p.stroke(),p.fillStyle="#fff",p.fillText(h.kind==="Chauffe"?"\u2191":h.kind==="Refroidissement"?"\u2193":h.kind,g,y)}p.restore()}draw(){if(!this.isConnected)return;let n=this.renderRoot.querySelector(".plot");if(!n)return;let t=this.plot;if(t&&t.series.forEach((c,p)=>{p&&typeof c.label=="string"&&(c.show===!1?this.hiddenCurves.add(c.label):this.hiddenCurves.delete(c.label))}),this.dispose(),!this.samples.length||!this.samples.some(c=>this.curves.some(p=>tt(c,p.path)!==null)))return;let s=getComputedStyle(this),r=s.getPropertyValue("--primary-text-color").trim()||"#555",a=[this.samples.map(c=>c.time),...this.curves.map(c=>this.samples.map(p=>tt(p,c.path)))];this.applying=!0,this.plot=new Ve({width:Math.max(240,n.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(c,p,f)=>[Math.min(0,p??0),Math.max(100,f??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},axes:[{stroke:r,space:100,grid:{show:!1},values:(c,p)=>p.map(f=>new Date(f*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(f*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:r,values:(c,p)=>p.map(f=>f.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(c,p)=>p==null?"\u2014":new Date(p*1e3).toLocaleString()},...this.curves.map(c=>({label:c.label,stroke:c.color,width:2,dash:c.dash,spanGaps:!1,show:!this.hiddenCurves.has(c.label),paths:c.step?Ve.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(p,f)=>f==null?"Indisponible":`${f.toLocaleString(void 0,{maximumFractionDigits:c.unit.includes("min")?6:3})} ${c.unit}`}))],hooks:{draw:[c=>{if(this.drawThermalPhases(c),this.drawMarks(c,r),this.selectedTime===null)return;let{left:p,top:f,width:b,height:h}=c.bbox,g=c.valToPos(this.selectedTime,"x",!0);if(g<p||g>p+b)return;let w=c.ctx;w.save(),w.strokeStyle=r,w.setLineDash([5,4]),w.beginPath(),w.moveTo(g,f),w.lineTo(g,f+h),w.stroke(),w.restore()}],setSeries:[c=>{c.status!==1||c!==this.plot||(c.series.forEach((p,f)=>{f&&typeof p.label=="string"&&(p.show===!1?this.hiddenCurves.add(p.label):this.hiddenCurves.delete(p.label))}),this.requestUpdate())}],setScale:[(c,p)=>{p==="x"&&c.status===1&&c===this.plot&&!this.applying&&c.scales.x.min!=null&&c.scales.x.max!=null&&(Math.abs(c.scales.x.min-this.range[0])>.01||Math.abs(c.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[c.scales.x.min,c.scales.x.max],bubbles:!0,composed:!0}))}]}},a,n),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,n.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,n.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(n)}render(){let n=this.samples.filter(t=>this.curves.some(s=>tt(t,s.path)!==null)).length;return A`<h3>${this.heading}</h3>
      <div class="series-controls" role="group" aria-label="Séries affichées">
        ${this.curves.map((t,s)=>A`<button
              aria-pressed=${!this.hiddenCurves.has(t.label)}
              @click=${()=>this.toggleSeries(s)}
            >
              <span style=${"background:"+t.color} aria-hidden="true"></span
              >${t.label}
            </button>`)}
      </div>
      <div class="plot" aria-label=${this.heading}
        @pointerdown=${t=>{this.pointerStart=t.button===0?t.clientX:void 0}}
        @click=${{capture:!0,handleEvent:t=>{let s=this.plot;if(!s||!t.composedPath().includes(s.over)||this.pointerStart===void 0||Math.abs(t.clientX-this.pointerStart)>4)return;let r=s.data[0][s.posToIdx(t.clientX-s.over.getBoundingClientRect().left)];r!==void 0&&this.inspect(r)}}}></div>
      ${n?A`<details>
            <summary>
              Table de données accessible · ${n} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(t=>A`<th>${t.label} (${t.unit})</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(t=>A`<tr>
                        <td>${this.inspectable?A`<button type="button" aria-pressed=${t.time===this.selectedTime}
                              @click=${()=>this.inspect(t.time)}>${new Date(t.time*1e3).toLocaleString()}</button>`:new Date(t.time*1e3).toLocaleString()}</td>
                        ${this.curves.map(s=>A`<td>
                              ${tt(t,s.path)??"Indisponible"}
                            </td>`)}
                      </tr>`)}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
            </p>
          </details>`:A`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};nt.styles=[Bn(Qo),Pt`
      :host {
        display: block;
        min-width: 0;
      }
      h3 {
        font-size: 15px;
        margin: 0 0 12px;
      }
      .series-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 10px;
      }
      .series-controls button {
        font: inherit;
        font-size: 12px;
        color: inherit;
        background: transparent;
        border: 1px solid var(--divider-color);
        border-radius: 5px;
        min-height: 32px;
        padding: 6px 9px;
        cursor: pointer;
      }
      .series-controls button[aria-pressed="false"] {
        text-decoration: line-through;
      }
      .series-controls span {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        margin-right: 6px;
      }
      .plot {
        width: 100%;
        min-width: 0;
      }
      .uplot {
        font-family: inherit;
        color: var(--primary-text-color);
      }
      .u-legend {
        font-size: 12px;
        max-width: 100%;
        white-space: normal;
      }
      .u-value {
        font-variant-numeric: tabular-nums;
      }
      .table {
        max-height: 280px;
        overflow: auto;
      }
      table {
        border-collapse: collapse;
        font-size: 12px;
      }
      td,
      th {
        padding: 8px;
        border-bottom: 1px solid var(--divider-color);
        white-space: nowrap;
      }
      details,
      p {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      summary {
        cursor: pointer;
        padding: 10px 0;
      }
      :focus-visible {
        outline: 2px solid var(--primary-color);
      }
    `],Y([ve({attribute:!1})],nt.prototype,"samples",2),Y([ve({attribute:!1})],nt.prototype,"curves",2),Y([ve({attribute:!1})],nt.prototype,"range",2),Y([ve()],nt.prototype,"heading",2),Y([ve()],nt.prototype,"syncKey",2),Y([ve({type:Boolean})],nt.prototype,"percent",2),Y([ve({type:Boolean})],nt.prototype,"inspectable",2),Y([ve({attribute:!1})],nt.prototype,"selectedTime",2),Y([ve({attribute:!1})],nt.prototype,"marks",2),Y([ve({type:Boolean})],nt.prototype,"thermalPhases",2),nt=Y([Nt("smartpi-time-chart")],nt);var li=class extends Ke{constructor(){super(...arguments);this.expert=!1}render(){if(!this.diagnostic)return j;let n=new ii(this.diagnostic),t=n.blocks(),[s,r,a,c,p,f,b,h]=t,g=n.route,w=n.directMode,$=n.timingForced,y=n.saturation,D=`${this.diagnostic.entityId}/${w??g}`,T=k=>{this.selected={context:D,id:k}},_=g==="direct"?p:g==="pi"&&($===!0||y)?f:b,L=(this.selected?.context===D?t.find(k=>k.id===this.selected?.id):void 0)??_,P=w?`Voie directe \xB7 ${w}`:g==="pi"?"Voie PI + anticipation":"Chemin non v\xE9rifi\xE9",Q=w?["PI/FF contourn\xE9s",`SmartPI d\xE9clare une voie directe en ${w.toLocaleLowerCase("fr-FR")}.`]:g!=="pi"?["Motif indisponible","Cette publication ne permet pas de v\xE9rifier le chemin de commande."]:$===!0?["Temporisation impos\xE9e","SmartPI signale une contrainte de dur\xE9e minimale."]:y?[y,"SmartPI publie l\u2019\xE9tat de saturation de la voie PI."]:$===!1?["Temporisation non impos\xE9e","Le drapeau de temporisation impos\xE9e est inactif."]:["Motif indisponible","Cette publication ne renseigne pas la temporisation."],I=g==="pi"&&($===!0||y!==null),ee=g==="direct"?[[p,"D\xE9cision",w,"Voie directe"],[b,"Sortie","Appliqu\xE9e",b.value]]:[[p,"Demande",g==="pi"?"PI + anticipation":"Demand\xE9e",p.value],[f,"Contraintes","Limites et timing",g==="pi"?f.value:"Chemin non v\xE9rifi\xE9"],[b,"Sortie","Appliqu\xE9e",b.value]],J=g==="pi"?[r,s,a,c,h]:[r,s,h],te=this.diagnostic.lastUpdated,G=te?new Date(te):null,M=this.diagnostic.available&&G&&Number.isFinite(G.valueOf())?A`Dernière mise à jour du capteur : <time datetime=${G.toISOString()}>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"short",timeStyle:"medium"}).format(G)}</time>`:"Horodatage des donn\xE9es actuelles indisponible",Z=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return A`<div class="intro">
        <div>
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge route-badge">${P}</span>
      </div>
      <p class="muted stamp">${M}</p>
      <dl class="snapshot">
        <div><dt>Température intérieure</dt><dd>${r.value}</dd><small>Mesure publiée</small></div>
        <div><dt>Consigne filtrée</dt><dd>${s.value}</dd><small>${n.bypass?"Voie P contourn\xE9e":"Voie proportionnelle"}</small></div>
        <div><dt>Commande demandée</dt><dd>${n.bypass?"\u2014":p.value}</dd>
          <small>${n.bypass?"Voie PI contourn\xE9e":"Demande publi\xE9e"}</small></div>
        <div><dt>Commande appliquée</dt><dd>${b.value}</dd><small>Signal de commande</small></div>
      </dl>
      <div class="work">
      <section class="route" aria-labelledby="route-title">
        <h4 id="route-title">Chemin de commande</h4>
        <div class="note ${I?"warning":""}">
          <strong>${Q[0]}</strong><p>${Q[1]}</p>
        </div>
        <ol class="steps">
          ${ee.map(([k,V,O,ne],N)=>A`<li>
            ${N>0&&g!=="unavailable"?A`<span class="arrow" aria-hidden="true">→</span>`:j}
            <button type="button" class="step" data-block=${k.id} aria-pressed=${k.id===L.id}
              aria-controls="signal-inspector" @click=${()=>T(k.id)}>
              <small>${V}</small><strong>${O}</strong><span>${ne}</span>
            </button></li>`)}
        </ol>
        <div class="quick-blocks" role="group" aria-label="Signaux associés">
          ${J.map(k=>A`<button type="button" aria-pressed=${k.id===L.id}
            aria-controls="signal-inspector" @click=${()=>T(k.id)}>${k.id==="ff"?"Anticipation":k.title}</button>`)}
        </div>
      </section>
      <aside id="signal-inspector" aria-labelledby="signal-title">
        <span class="eyebrow">INSPECTION DU SIGNAL</span>
        <h4 id="signal-title" aria-live="polite">${L.title} <span class="badge">${L.status}</span></h4>
        <p>${L.explanation}</p>
        <dl>
          <div><dt>Valeur du bloc</dt><dd>${L.value}</dd>
            ${this.expert?A`<code>attributes.live.${L.path}</code>`:null}</div>
          <div><dt>Motif ou contexte publié</dt><dd>${L.reason}</dd>
            ${this.expert?A`<code>attributes.live.${L.reasonPath}</code>`:null}</div>
          ${n.detail(L,this.expert).map(k=>A`<div>
            <dt>${k.label}</dt><dd>${k.value}</dd>
            ${this.expert?A`<code>attributes.live.${k.path}</code>${k.reliability?A`<code>Fiabilité · ${k.reliability}</code>`:null}`:null}
          </div>`)}
        </dl>
        ${L.status==="Contourn\xE9"?A`<p class="muted">Ces valeurs décrivent un bloc hors du chemin actif.</p>`:j}
      </aside>
      </div>
      <details class="full">
        <summary>Schéma complet de la boucle</summary>
        <p class="muted">Les flèches pleines montrent le chemin déclaré. Les pointillés représentent le retour de la mesure.</p>
      <div class="diagram">
        <svg
          viewBox="0 0 880 415"
          aria-label="Schéma logique de SmartPI"
          role="group"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>
          ${n.route==="pi"?Gi`<path class="flow" d="M205 65 H235"/><path class="flow" d="M205 195 H220 V95 H235"/><path class="flow" d="M420 65 H435 V115 H450"/><path class="flow" d="M420 195 H435 V145 H450"/>`:n.bypass?Gi`<path class="flow bypass" d="M635 125 H647 V310 H660"/>`:null}
          ${n.route==="pi"?Gi`<path class="flow" d="M635 125 H660"/><path class="flow" d="M752 170 V265"/>`:null}
          ${g!=="unavailable"?Gi`<path class="flow feedback" d="M660 315 H420" />
            <path class="flow feedback" d="M235 345 H110 V245" />`:j}
          ${t.map((k,V)=>Gi`<g role="button" tabindex="0" aria-pressed=${k.id===L.id} aria-label=${`${k.title} : ${k.value}. ${k.status}`} class=${"block "+(k.id===L.id?"selected":"")+(k.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${Z[V][0]},${Z[V][1]})`} @click=${()=>T(k.id)} @keydown=${O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),T(k.id))}}>
          <title>${k.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${k.title}</text><text x="13" y="50" class="value">${k.value}</text><text x="13" y="73" class="status">${k.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${t.map(k=>A`<button
              type="button"
              aria-pressed=${k.id===L.id}
              @click=${()=>T(k.id)}
            >
              ${k.title}<strong>${k.value}</strong><small>${k.status}</small>
            </button>`)}
      </div>
      </details>`}};li.styles=Pt`
    :host {
      display: block;
    }
    h3 {
      font-size: 20px;
      margin: 5px 0;
    }
    h4 {
      margin: 0;
    }
    p {
      line-height: 1.6;
      font-size: 13px;
    }
    .intro {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .eyebrow {
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--secondary-text-color);
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      border: 1px solid var(--divider-color);
      padding: 5px 9px;
      border-radius: 20px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .route-badge {
      font-weight: 650;
      background: var(--secondary-background-color);
    }
    .stamp { margin: 6px 0 16px; }
    .snapshot {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0;
      border-block: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      margin: 0;
    }
    .snapshot > div { padding: 12px 14px; border: 0; }
    .snapshot > div + div { border-left: 1px solid var(--divider-color); }
    .snapshot dd {
      font-size: clamp(16px, 2vw, 24px);
      font-variant-numeric: tabular-nums;
    }
    .snapshot small, .step small, .step > span { color: var(--secondary-text-color); }
    .work { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
    .route, aside { min-width: 0; padding: 16px; }
    .note {
      border-inline-start: 3px solid var(--primary-color);
      background: var(--secondary-background-color);
      padding: 8px 12px;
      margin: 12px 0;
    }
    .note.warning { border-inline-start-color: var(--warning-color, #ce8d2c); }
    .note strong, .note p { margin: 0; }
    .steps {
      display: flex;
      gap: 6px;
      list-style: none;
      padding: 0;
      margin: 12px 0;
    }
    .steps li {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1 1 0;
      min-width: 0;
    }
    .arrow { color: var(--primary-text-color); }
    .step { flex: 1; align-self: stretch; min-width: 0; overflow-wrap: anywhere; }
    .step small { margin-top: 0; }
    .step > span { display: block; margin-top: 3px; font-size: 12px; }
    .quick-blocks { display: flex; flex-wrap: wrap; gap: 6px; }
    .quick-blocks button { min-height: 44px; padding: 7px 10px; font-size: 12px; }
    .full { border-top: 1px solid var(--divider-color); }
    summary { cursor: pointer; min-height: 44px; box-sizing: border-box; padding: 12px 0; }
    svg {
      width: 100%;
      display: block;
    }
    .flow {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 2;
      marker-end: url(#arrow);
    }
    .bypass {
      stroke: var(--warning-color, #ce8d2c);
    }
    .feedback {
      stroke: var(--secondary-text-color);
      stroke-dasharray: 4 4;
    }
    .block {
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .block rect {
      fill: var(--card-background-color);
      stroke: var(--divider-color);
      stroke-width: 1.5;
    }
    .block.selected rect {
      stroke: var(--primary-color);
      stroke-width: 3;
    }
    .block:focus rect {
      stroke: var(--primary-color);
      stroke-width: 3;
    }
    .block.inactive {
      opacity: 0.5;
    }
    text {
      fill: var(--primary-text-color);
      font-family: inherit;
    }
    .title {
      font-size: 12px;
    }
    .value {
      font-size: 19px;
      font-weight: 600;
    }
    .status {
      font-size: 10px;
      fill: var(--secondary-text-color);
    }
    aside {
      background: var(--secondary-background-color);
      border-left: 1px solid var(--divider-color);
      min-height: 120px;
    }
    code {
      display: block;
      font-size: 11px;
      overflow-wrap: anywhere;
    }
    dl {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
      gap: 12px 18px;
      margin: 14px 0 0;
    }
    dl > div {
      border-top: 1px solid var(--divider-color);
      padding-top: 7px;
      overflow-wrap: anywhere;
    }
    dt { color: var(--secondary-text-color); font-size: 12px; }
    dd { margin: 3px 0; font-weight: 600; }
    .mobile {
      display: none;
    }
    button {
      font: inherit;
      background: var(--card-background-color);
      color: inherit;
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 8px;
      text-align: left;
      min-height: 80px;
      cursor: pointer;
    }
    button[aria-pressed="true"] {
      border-color: var(--primary-color);
      box-shadow: inset 0 0 0 1px var(--primary-color);
    }
    strong,
    small {
      display: block;
      margin-top: 6px;
    }
    :focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 2px;
    }
    @media (max-width: 920px) {
      .work { grid-template-columns: 1fr; }
      aside { border-left: 0; border-top: 1px solid var(--divider-color); }
    }
    @media (max-width: 600px) {
      .diagram {
        display: none;
      }
      .mobile {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin: 16px 0;
      }
      .intro {
        align-items: flex-start;
      }
      .snapshot { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .snapshot > div:nth-child(3) { border-left: 0; }
      .snapshot > div:nth-child(n + 3) { border-top: 1px solid var(--divider-color); }
      .route, aside { padding: 14px 0; }
      aside { padding-inline: 12px; }
      .step { padding: 7px 5px; font-size: 12px; }
    }
  `,Y([ve({attribute:!1})],li.prototype,"diagnostic",2),Y([ve({type:Boolean})],li.prototype,"expert",2),Y([Re()],li.prototype,"selected",2),li=Y([Nt("smartpi-control-diagram")],li);var rn=class extends Ke{render(){if(!this.diagnostic)return A``;let e=new ii(this.diagnostic),n=e.chain(),t=Math.max(100,...n.map(s=>Math.abs(s.value??0)));return A`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${e.bypass?"Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliqu\xE9e.":"FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu pr\xE9c\xE8dent les limites ; Hold est un \xE9tat de maintien, pas une contribution \xE0 additionner."}
      </p>
      ${n.map(s=>A`<div class="row">
            <span title=${"attributes.live."+s.path}>${s.label}</span>
            <div class="track">
              <i></i>${s.value===null?null:A`<b
                    style=${`left:${s.value<0?50+s.value/t*50:50}%;width:${Math.abs(s.value)/t*50}%`}
                    class=${s.value<0?"negative":""}
                  ></b>`}
            </div>
            <strong>${B(s.value," %",2)}</strong>
          </div>`)}
      <p>
        Ces diagnostics peuvent décrire un candidat et un cycle déjà engagé.
        Leurs différences ne sont pas une preuve de perte ni de limitation.
      </p>
      <p>
        Échelle symétrique ±${B(t," %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${B(C(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${B(C(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${B(C(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${C(this.diagnostic.live,"power.valve_linearization_enabled")===!0?A`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`:null}`}};rn.styles=Pt`
    :host {
      display: block;
    }
    h3 {
      font-size: 18px;
    }
    h3 span,
    p {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.6;
    }
    h3 span {
      font-weight: 400;
      margin-left: 10px;
    }
    .row {
      display: grid;
      grid-template-columns: 100px 1fr 110px;
      gap: 12px;
      align-items: center;
      margin: 13px 0;
      font-size: 13px;
    }
    .track {
      height: 9px;
      position: relative;
      background: var(--divider-color);
      border-radius: 3px;
    }
    .track i {
      position: absolute;
      left: 50%;
      height: 15px;
      top: -3px;
      border-left: 1px solid var(--secondary-text-color);
    }
    b {
      position: absolute;
      top: 0;
      height: 9px;
      background: #3587c4;
      border-radius: 3px;
    }
    b.negative {
      background: #cb7f32;
    }
    strong {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 500px) {
      .row {
        grid-template-columns: 75px 1fr 90px;
        font-size: 12px;
        gap: 6px;
      }
    }
  `,Y([ve({attribute:!1})],rn.prototype,"diagnostic",2),rn=Y([Nt("smartpi-command-chain")],rn);var ea=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],kl=ea.map(i=>i.step?{...i,dash:[6,4]}:i),Gp=["A","B","Chauffe","Refroidissement"],Xo=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],Kp=new Intl.NumberFormat("fr-FR",{maximumFractionDigits:2,signDisplay:"exceptZero"}),Me=class extends Ke{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.hiddenLearning=[];this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.followNow=!0;this.livePublicationMissing=!1;this.generation=0;this.recorderEntity=""}async inspectBlock(n){this.block=n,n!=="model"&&this.renderRoot.querySelector(".command-chart smartpi-time-chart")?.showCurve(`power.${n}_percent`),await this.updateComplete,this.renderRoot.querySelector("#block-title")?.focus()}inspect(n){this.diagnostic&&(this.livePublicationMissing=!1,this.followNow=!1,this.inspection={entityId:this.diagnostic.entityId,recorder:this.usingRecorder,time:n})}async inspectEvent(n){this.inspect(n),await this.updateComplete,this.renderRoot.querySelector("#inspection-title")?.focus()}async openLivePublication(){let n=Ki(this.diagnostic?.lastUpdated),t=this.usingRecorder?this.recorder:this.session,s=this.diagnostic?.available&&n!==null?this.windowData(t).samples.find(r=>!r.observedAt&&r.time===n):void 0;this.tab="evolution",this.inspection=void 0,this.livePublicationMissing=!s,s&&this.inspect(s.time),await this.updateComplete,this.renderRoot.querySelector("#inspection-title")?.focus()}get usingRecorder(){return this.recorderEntity===this.diagnostic?.entityId&&!this.preferSession&&Gs(this.recorder)}willUpdate(n){if(this.followNow&&!this.usingRecorder&&(n.has("session")||n.has("preferSession")||n.has("recorder"))){let t=this.session.at(-1)?.time;t!==void 0&&t>this.range[1]&&(this.end=t,this.range=[t-this.hours*3600,t])}}windowData(n){if(this.filteredCache?.all===n&&this.filteredCache.start===this.range[0]&&this.filteredCache.end===this.range[1])return this.filteredCache;let t=n.filter(s=>s.time>=this.range[0]&&s.time<=this.range[1]);return this.filteredCache={all:n,start:this.range[0],end:this.range[1],samples:t,tracking:wr(t),events:_r(n).filter(s=>s.time>=this.range[0]&&s.time<=this.range[1])}}updated(n){let t=n.get("diagnostic");n.has("diagnostic")&&t?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.livePublicationMissing=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.filteredCache=void 0,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.followNow=!0,this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(n){this.followNow=!1;let t=this.range[1]-this.range[0],s=Date.now()/1e3,r=this.end-48*3600,a=Math.min(s,Math.max(r+t,this.range[1]+n*t/2));this.range=[a-t,a]}zoom(n){this.followNow=!1;let[t,s]=this.range,r=Math.max(60,Math.min(48*3600,(s-t)*n));this.range=[s-r,s]}async load(){this.inspection=void 0,this.livePublicationMissing=!1;let n=++this.generation,t=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!t||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let s=Date.now()/1e3,r=await Sr(this.hass,t.entityId,s-48*3600,s,()=>n!==this.generation);if(n!==this.generation)return;this.recorderEntity=t.entityId,this.recorder=r,Gs(r)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(s){if(n!==this.generation)return;this.error=s instanceof Error&&s.message.startsWith("Format")?s.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{n===this.generation&&(this.loading=!1)}}trackingPanel(n,t){let{pairs:s,signedMedian:r,absoluteMedian:a,largestInterval:c}=n;return A`<section class="pane tracking" aria-labelledby="tracking-heading">
      <div class="tracking-title">
        <h3 id="tracking-heading">Écart à la consigne filtrée</h3>
        <span>Consigne filtrée − température intérieure</span>
      </div>
      <dl class="metrics">
        <div><dt>Couples valides</dt><dd>${s} / ${t}</dd></div>
        <div><dt>Médiane signée</dt><dd>${r===null?"Indisponible":`${Kp.format(r)} \xB0C`}</dd></div>
        <div><dt>Médiane absolue</dt><dd>${B(a," \xB0C")}</dd></div>
        <div><dt>Plus long intervalle entre couples</dt><dd>${B(c===null?null:c/60," min",1)}</dd></div>
      </dl>
      <p>${s<2?"Deux couples valides dans la fen\xEAtre sont n\xE9cessaires pour r\xE9sumer l\u2019\xE9cart.":"Un \xE9cart positif indique une temp\xE9rature sous la consigne filtr\xE9e. La m\xE9diane absolue indique la taille typique de l\u2019\xE9cart observ\xE9."}</p>
      <details>
        <summary>Méthode et limites</summary>
        <p>Chaque couple provient d’une même publication et compte une fois, indépendamment de l’intervalle entre les points. Les publications incomplètes sont exclues des médianes. Le plus long intervalle décrit l’espacement des couples valides.</p>
        <p>Ces valeurs décrivent les publications de la source et de la fenêtre affichées. L’évaluation d’une durée de confort ou d’une réponse à un changement de consigne demande des données et un protocole adaptés.</p>
      </details>
    </section>`}inspectionPanel(n,t,s){let r=t?{...n,state:t.state,available:t.state!=="unknown"&&t.state!=="unavailable",live:t.live,history:t.history}:n,a=new ii(r).route,c=t?s?"Recorder":"Session":"Instantan\xE9 SmartPI",p=t?new Date(t.time*1e3):n.lastUpdated?new Date(n.lastUpdated):null,f=(T,_="")=>T==null&&t&&r.available?"Non archiv\xE9":B(T,_),b=[["Temp\xE9rature int\xE9rieure mesur\xE9e","temperature.indoor"," \xB0C"],["Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C"],["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"]],h=this.block,g=(T,_)=>A`<button type="button" aria-pressed=${h===T} aria-controls="block-detail"
        @click=${()=>void this.inspectBlock(T)}>${_}</button>`,w=a==="direct"?["Consigne et mesure","Hyst\xE9r\xE9sis ou calibration","Commande publi\xE9e","Pi\xE8ce"]:["Consigne et mesure",A`<span>Voies P et I</span> → ${g("pi","PI")}`,A`+ ${g("ff","Anticipation")}`,"Limites et temporisation","Commande publi\xE9e","Pi\xE8ce"],$={pi:[["Contribution PI","power.pi_percent"," %"]],ff:[["Anticipation retenue","power.ff_percent"," %"]],model:[["Gain thermique estim\xE9 A","model.a"," \xB0C/min/u"],["Pertes estim\xE9es B","model.b"," min\u207B\xB9"]]},y="analysis.twin.twin_T_steady",D=C(r.live,y)==null?f(void 0):B(et(r.live,y,"analysis.twin.twin_T_steady_reliable")," \xB0C");return A`<section class="synoptic" aria-labelledby="synoptic-title">
        <h3 id="synoptic-title">Synoptique de régulation</h3>
        <ol class="signal-path" aria-label=${a==="unavailable"?"Sch\xE9ma de r\xE9f\xE9rence":"Voie d\xE9clar\xE9e"}>
          ${w.map((T,_)=>A`<li class=${a==="unavailable"?"":"active-path"}>
            ${_?A`<span aria-hidden="true">${_===2&&a!=="direct"?"":"\u2192"}</span>`:j}
            ${T}</li>`)}
        </ol>
        <p>${a==="pi"?"Voie PI active":a==="direct"?"Voie directe d\xE9clar\xE9e":"Chemin actif non v\xE9rifi\xE9"}</p>
        <p>↶ Retour de la mesure · ${g("model","Mod\xE8le thermique")}</p>
      </section>
      <aside class="publication" aria-labelledby="inspection-title">
        <h3 id="inspection-title" tabindex="-1">${t?"Publication s\xE9lectionn\xE9e":"En direct"}</h3>
        <p role="status" class="inspection-status">
          ${c} · ${t?.observedAt?"Observation de session":"Publication"} ·
          ${p&&Number.isFinite(p.valueOf())?A`<time datetime=${p.toISOString()}>${p.toLocaleString()}</time>`:"Horodatage indisponible"}
        </p>
        <dl>
          <dt>État publié</dt><dd>${r.state}</dd>
          ${b.map(([T,_,L])=>A`<dt>${T}</dt>
            <dd>${f(t?tt(t,_):C(n.live,_),L)}</dd>`)}
          ${t?A`<dt>Écart à la consigne filtrée</dt><dd>${f(tt(t,"error")," \xB0C")}</dd>`:j}
          <dt>État de l’intégrale</dt><dd>${f(C(r.live,"temperature.integral_mode"))}</dd>
          <dt>Saturation déclarée</dt><dd>${f(C(r.live,"control.saturation_state"))}</dd>
          <dt>Limitation par temporisation</dt><dd>${f(C(r.live,"analysis.control.forced_by_timing"))}</dd>
        </dl>
        <div id="block-detail">
          ${h?A`<h4 id="block-title" tabindex="-1">
              ${{pi:"D\xE9tails PI",ff:"D\xE9tails anticipation",model:"D\xE9tails du mod\xE8le"}[h]}
            </h4>
            <dl>${$[h].map(([T,_,L])=>A`<dt>${T}</dt>
              <dd>${f(t?tt(t,_):C(n.live,_),L)}</dd>`)}
              ${h==="pi"?A`<dt>Erreur de la voie P</dt>
                <dd>${f(C(r.live,"analysis.control.error_p")," \xB0C")}</dd>
                <dt>Erreur brute de la voie I</dt>
                <dd>${f(C(r.live,"temperature.error")," \xB0C")}</dd>`:j}
              ${h==="ff"?A`<dt>État FF3</dt>
                <dd>${f(C(r.live,"feedforward.ff3_status"))}</dd>`:j}
              ${h==="model"?A`<dt>Équilibre estimé par le Twin</dt><dd>${D}</dd>`:j}
            </dl>`:j}
        </div>
        <button type="button" aria-disabled=${!t} @click=${()=>{this.inspection=void 0}}>
          Revenir au direct
        </button>
        <button type="button" @click=${()=>this.renderRoot.querySelector("#journal-title")?.focus()}>
          Voir le journal
        </button>
      </aside>`}render(){let n=this.diagnostic;if(!n)return j;let t=this.usingRecorder,s=t?this.recorder:this.session,{samples:r,events:a,tracking:c}=this.windowData(s),p=this.tab==="learning",f=p?$r(s).filter(y=>y.time>=this.range[0]&&y.time<=this.range[1]&&!this.hiddenLearning.includes(y.kind)):[],b=this.tab==="regulation",h=this.tab==="evolution",g=this.inspection,w=h&&g?.entityId===n.entityId&&g.recorder===t?r.find(y=>y.time===g.time):void 0,$=(y,D,T=!1)=>A`<section class=${T?"chart command-chart":"chart"}>
        <smartpi-time-chart
          .heading=${y}
          .marks=${p&&D===kl?f:[]}
          .thermalPhases=${p&&D===kl}
          .samples=${r}
          .curves=${D}
          .range=${this.range}
          .percent=${T}
          .syncKey=${n.entityId}
          .inspectable=${h}
          .selectedTime=${w?.time??null}
          @inspect-publication=${_=>this.inspect(_.detail)}
          @time-range=${_=>{_.detail[1]>_.detail[0]&&(this.followNow=!1,this.range=_.detail)}}
        ></smartpi-time-chart>
      </section>`;return A`<div class="workspace">
      <div class="top">
        <div>
          <h2>Observatoire de la régulation</h2>
          <span class="subtitle">${n.name}</span>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${y=>this.expert=y.target.checked}
          />
          Mode expert</label
        >
      </div>
      <nav aria-label="Vues de diagnostic">
        ${[["evolution","Supervision"],["regulation","R\xE9gulation en direct"],["model","Sant\xE9 du mod\xE8le"],["learning","Apprentissage"]].map(([y,D])=>A`<button
              class=${this.tab===y?"active":""}
              aria-pressed=${this.tab===y}
              @click=${()=>{this.livePublicationMissing=!1,this.tab=y}}
            >
              ${D}
            </button>`)}
      </nav>
      ${b?j:A`<div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
          ${[1,3,6,12,24,48].map(y=>A`<button
                aria-pressed=${y===this.hours}
                class=${y===this.hours?"chosen":""}
                @click=${()=>{this.hours=y,this.reset()}}
              >
                ${y} h
              </button>`)}
        </div>
        <div class="tools">
          <button
            aria-label="Période précédente"
            @click=${()=>this.shift(-1)}
          >
            ←</button
          ><button aria-label="Période suivante" @click=${()=>this.shift(1)}>
            →</button
          ><button aria-label="Zoom avant" @click=${()=>this.zoom(.5)}>
            +</button
          ><button aria-label="Zoom arrière" @click=${()=>this.zoom(2)}>
            −</button
          ><button @click=${()=>this.reset()}>Réinitialiser</button
          ><button
            ?disabled=${this.loading}
            @click=${()=>{this.reset(),this.load()}}
          >
            Actualiser Recorder
          </button>
        </div>
      </div>`}
      ${b?j:A`<div class="source">
        <strong
          >${t?"Recorder \xB7 historique persistant":"Historique de session \xB7 m\xE9moire temporaire"}</strong
        ><span
          >${r.length} publications ·
          ${new Date(this.range[0]*1e3).toLocaleString()} →
          ${new Date(this.range[1]*1e3).toLocaleString()}</span
        ><label
          ><input
            type="checkbox"
            .checked=${this.preferSession}
            @change=${y=>{this.inspection=void 0,this.livePublicationMissing=!1,this.preferSession=y.target.checked}}
          />
          Session uniquement</label
        >
      </div>
      ${t?j:A`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${y=>{this.followNow=y.target.checked,this.followNow&&this.reset()}}
            />
            Suivre les nouvelles publications de session</label
          >`}
      ${this.loading?A`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:j}
      ${this.error?A`<p role="status" class="notice">${this.error}</p>`:j}
      ${r.length?j:A`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}
      ${h&&this.livePublicationMissing?A`<p class="notice" role="status">La publication du direct est introuvable dans la source et la fenêtre affichées. L’inspecteur affiche l’instantané actuel.</p>`:j}`}
      ${this.tab==="evolution"?A`<div class="supervision">
            ${this.inspectionPanel(n,w,t)}
            <div class="trends">
            ${$("Temp\xE9rature et consigne filtr\xE9e",ea)}
            ${$("Commande du r\xE9gulateur \xB7 pas des watts",Xo,!0)}
            ${$("\xC9cart consigne filtr\xE9e \u2212 temp\xE9rature int\xE9rieure",[{label:"\xC9cart filtr\xE9",path:"error",color:"#bc7254",unit:"\xB0C"}])}
            <p class="foot">
              Écart calculé uniquement avec deux valeurs du même état. Ce n’est
              pas l’erreur de l’intégrateur ni une mesure de confort. Aucune
              zone de bande morte n’est extrapolée. Les points sont des
              publications irrégulières ; une ligne ne constitue pas une mesure
              intermédiaire.
            </p>
            ${this.trackingPanel(c,r.length)}
            </div></div>`:this.tab==="regulation"?A`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${n}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
                <button class="open-supervision" type="button"
                  @click=${()=>void this.openLivePublication()}>Voir dans Supervision</button>
              </section>
              <details class="pane chain-details">
                <summary>Chaîne de commande détaillée</summary>
                <smartpi-command-chain .diagnostic=${n}></smartpi-command-chain>
              </details>`:p?A`
              <section class="pane">
                <div class="periods" role="group" aria-label="Repères d’apprentissage">
                  ${Gp.map((y,D)=>A`
                    <button type="button" aria-pressed=${!this.hiddenLearning.includes(y)}
                      @click=${()=>{this.hiddenLearning=this.hiddenLearning.includes(y)?this.hiddenLearning.filter(T=>T!==y):[...this.hiddenLearning,y]}}>${["\u25CF","\u25C6","\u2191","\u2193"][D]} ${y}</button>`)}
                </div>
                <p class="foot">Les repères sont datés à la publication ou à l’observation.
                  Les lettres A et B indiquent une hausse du compteur de mises à jour
                  acceptées ou de mesures collectées entre deux publications. Le détail distingue les deux. Deux lettres à la même date peuvent
                  regrouper des apprentissages survenus à des instants différents.
                  ${r.some(y=>C(y.live,"learning")!==void 0)?"Consultez le d\xE9tail pour conna\xEEtre l\u2019intervalle observ\xE9.":"Cette source ne contient pas les compteurs historiques. Les rep\xE8res A/B sont indisponibles ici. La session conserve les diagnostics re\xE7us pendant l\u2019ouverture du panneau."}
                  Zoomez pour séparer les repères rapprochés.</p>
                <p class="foot">Fond orange · température en hausse. Fond bleu · température
                  en baisse. Fond neutre · valeur stable ou absente. Ces intervalles
                  comparent les mesures successives.</p>
                ${t&&!r.some(y=>C(y.live,"learning")!==void 0)?A`<p class="notice">Le Recorder sélectionné contient les courbes, mais pas les
                    compteurs d’apprentissage. Les événements passés ne peuvent pas être datés.
                    <button type="button" @click=${()=>{this.preferSession=!0,this.inspection=void 0}}>
                      Observer les prochains apprentissages en session</button></p>`:j}
                ${$("Temp\xE9rature et consigne filtr\xE9e",kl)}
                ${$("Activit\xE9 du r\xE9gulateur \xB7 commande appliqu\xE9e",[Xo[0]],!0)}
                <p class="foot">En mode chauffage, une commande positive correspond à une
                  chauffe commandée, zéro à un arrêt de commande. La température peut
                  encore monter après l’arrêt. La commande est exprimée en pourcentage.</p>
                ${r.some(y=>C(y.live,"learning.emea_samples_a")!==void 0||C(y.live,"learning.emea_samples_b")!==void 0)?$("Collecte du mod\xE8le \xB7 nombre de mesures conserv\xE9es",[{label:"Mesures A",path:"live.learning.emea_samples_a",color:"#17638d",unit:"mesures",step:!0},{label:"Mesures B",path:"live.learning.emea_samples_b",color:"#6f448a",unit:"mesures",step:!0}]):j}
                <p>Temps morts actuels · chauffe
                  ${B(et(n.live,"model.deadtime_heat_s","model.deadtime_heat_reliable")," s")}
                  · refroidissement
                  ${B(et(n.live,"model.deadtime_cool_s","model.deadtime_cool_reliable")," s")}</p>
                <p class="foot">↑ Chauffe et ↓ Refroidissement repèrent des publications.
                  Les durées sont des médianes. Les bornes des épisodes ne sont pas publiées.
                  ${r.some(y=>C(y.live,"analysis.deadtime")||C(y.live,"model.deadtime_heat_reliable")!==void 0||C(y.live,"model.deadtime_cool_reliable")!==void 0)?"La couverture d\xE9pend des donn\xE9es pr\xE9sentes dans chaque publication.":"Cette fen\xEAtre ne contient pas de diagnostics historiques de temps mort."}</p>
                <details>
                  <summary>Détail des repères (${f.length})</summary>
                  ${f.length?A`<ol>
                    ${f.slice(-60).reverse().map(y=>A`<li>
                      <time datetime=${new Date(y.time*1e3).toISOString()}>${new Date(y.time*1e3).toLocaleString()}</time>
                      ${y.observedAt?" (observation)":""} · ${y.label}
                    </li>`)}
                  </ol>
                  ${f.length>60?A`<p class="foot">60 derniers repères. Zoomez pour consulter une plage plus courte.</p>`:j}`:A`<p>Aucun repère observable avec les filtres et les données de cette fenêtre.</p>`}
                </details>
              </section>`:A`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${B(C(n.live,"model.confidence"))}</span
                >
              </div>
              ${$("A \xB7 gain de chauffe estim\xE9",[{label:"A appris",path:"model.a",color:"#2689ca",unit:"\xB0C/min/u",step:!0}])}
              ${$("B \xB7 pertes thermiques estim\xE9es",[{label:"B appris",path:"model.b",color:"#39a38a",unit:"min\u207B\xB9",step:!0}])}
              <p class="foot">
                La confiance actuelle ne valide pas rétroactivement ces séries.
                Le contrat history ne contient pas de confiance historique ni de
                mesures de référence A/B.
              </p>
              <section class="pane">
                <h3>Temps morts · instantané</h3>
                <div class="metrics">
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([y,D,T])=>A`<div>
                        <span>${y}</span
                        ><strong
                          >${B(et(n.live,D,T),D==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${B(C(n.live,T))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${B(C(n.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${B(C(n.live,"analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${B(C(n.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE 30","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([y,D,T])=>A`<div>
                        <span>${y}</span
                        ><strong
                          >${B(et(n.live,"analysis.twin."+D),T,4)}</strong
                        >
                      </div>`)}
                </div>
                <p>
                  Équilibre :
                  ${B(et(n.live,"analysis.twin.twin_T_steady","analysis.twin.twin_T_steady_reliable")," \xB0C")}
                  · Consigne atteignable (prédiction) :
                  ${B(et(n.live,"analysis.twin.twin_setpoint_reachable","analysis.twin.twin_T_steady_reliable"))}
                </p>
                <p class="foot">
                  Aucune courbe Twin : ces valeurs ne font pas partie des huit
                  séries Recorder standard. Fiabilité déclarée ≠ exactitude
                  physique démontrée.
                </p>
              </section>
            `}
      ${b||p?j:A`<section class="timeline">
        <h3 id="journal-title" tabindex="-1">
          Journal des publications
          <span>${a.length} variations observées</span>
        </h3>
        <p class="foot">
          Annotations issues d’une comparaison d’états, pas d’événements
          internes explicitement horodatés. Les motifs absents de Recorder ne
          sont pas reconstruits.
        </p>
        <ol>
          ${a.slice(-60).reverse().map(y=>A`<li>
                  <time>${new Date(y.time*1e3).toLocaleString()}</time>
                  <div>
                    ${h?A`<button type="button" aria-pressed=${w?.time===y.time}
                          @click=${()=>void this.inspectEvent(y.time)}>${y.label}</button>`:A`<strong>${y.label}</strong>`}${this.expert?A`<p>${y.provenance}</p>`:j}
                  </div>
                </li>`)}
        </ol>
        ${a.length===0?A`<p>Aucune transition observable sur cette fenêtre.</p>`:A`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>`}
      ${this.expert?A`<details class="provenance">
            <summary>Provenance et interactions</summary>
            <p>
              attributes.history pour les huit séries ; attributes.live pour le
              schéma actuel. Glisser horizontalement pour zoomer, légende
              cliquable, curseurs synchronisés ; boutons de zoom/déplacement
              accessibles au clavier et au tactile. Dates affichées dans le
              fuseau du navigateur, avec détails dans les tables.
            </p>
            <p>
              Requête officielle history/history_during_period, attributs
              complets. Aucun service ni changement d’état. La source choisie
              reste distincte : aucune fusion silencieuse entre Recorder et
              session.
            </p>
          </details>`:j}
    </div>`}};Me.styles=Pt`
    :host {
      display: block;
      margin-top: 22px;
    }
    .workspace {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
    }
    .top {
      padding: 22px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .subtitle {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    h2 {
      font-size: 21px;
      margin: 6px 0;
    }
    h3 {
      font-size: 16px;
    }
    nav {
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid var(--divider-color);
      gap: 18px;
    }
    button {
      font: inherit;
      color: inherit;
      background: transparent;
      border: 1px solid var(--divider-color);
      padding: 9px 12px;
      border-radius: 6px;
      cursor: pointer;
      min-height: 40px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: wait;
    }
    nav button {
      border: 0;
      border-radius: 0;
      border-bottom: 3px solid transparent;
      padding: 12px 2px;
    }
    nav button.active {
      border-bottom-color: var(--primary-color);
      font-weight: 650;
    }
    button.chosen {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .toolbar {
      padding: 18px 24px 12px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .periods,
    .tools {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
    .source {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
      padding: 0 24px 16px;
      font-size: 11px;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color);
    }
    .source strong {
      color: var(--primary-text-color);
    }
    .expert {
      font-size: 12px;
      white-space: nowrap;
    }
    label {
      display: flex;
      align-items: center;
      gap: 5px;
      min-height: 32px;
    }
    input {
      accent-color: var(--primary-color);
    }
    .notice {
      padding: 12px 24px;
      background: var(--secondary-background-color);
      font-size: 13px;
    }
    .open-supervision, .chain-details summary { min-height: 44px; }
    .chain-details summary { cursor: pointer; }
    .chart,
    .pane {
      padding: 22px 24px;
      border-bottom: 1px solid var(--divider-color);
      min-width: 0;
    }
    .foot {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.6;
      margin: 14px 24px;
    }
    .supervision {
      display: grid;
      grid-template-columns: minmax(0, 3fr) minmax(220px, 1fr);
      grid-template-areas: "synoptic synoptic" "trends publication";
    }
    .synoptic { grid-area: synoptic; padding: 12px 24px; border-bottom: 1px solid var(--divider-color); }
    .trends { grid-area: trends; min-width: 0; }
    .publication { grid-area: publication; padding: 12px 18px; border-inline-start: 1px solid var(--divider-color); }
    .publication dt, .inspection-status, .synoptic p { color: var(--secondary-text-color); font-size: 13px; }
    .publication dd { margin: 4px 0 12px; overflow-wrap: anywhere; }
    .signal-path { display: flex; flex-wrap: wrap; gap: 8px; }
    .signal-path li { border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; }
    .signal-path .active-path, .timeline button[aria-pressed="true"] { border-color: var(--primary-color); }
    @media (max-width: 760px) {
      .supervision { grid-template-columns: minmax(0, 1fr); grid-template-areas: "trends" "publication" "synoptic"; }
      .publication { border-inline-start: 0; }
    }
    .model-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      gap: 12px;
    }
    .model-heading span {
      font-size: 12px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 18px;
    }
    .metrics span,
    .metrics small {
      display: block;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 7px 0;
    }
    .metrics strong {
      font-size: 20px;
      font-variant-numeric: tabular-nums;
    }
    .tracking {
      background: var(--secondary-background-color, var(--card-background-color));
      border-inline-start: 3px solid var(--primary-color);
    }
    .tracking-title h3 { margin: 0 0 5px; }
    .tracking-title span, .tracking dt {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .tracking dl { margin: 16px 0 12px; }
    .tracking dd {
      margin: 4px 0 0;
      font-size: 19px;
      font-weight: 650;
      font-variant-numeric: tabular-nums;
    }
    .tracking p { margin: 10px 0; }
    .tracking summary { font-size: 13px; font-weight: 600; cursor: pointer; }
    .pane p {
      font-size: 13px;
      line-height: 1.6;
    }
    .timeline {
      padding: 16px 24px;
    }
    .timeline h3 {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
    .timeline h3 span {
      font-size: 11px;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .timeline .foot {
      margin: 10px 0;
    }
    ol {
      list-style: none;
      max-height: 350px;
      overflow: auto;
      padding: 0;
    }
    li {
      display: flex;
      gap: 20px;
      border-top: 1px solid var(--divider-color);
      padding: 12px 0;
      font-size: 12px;
    }
    li time {
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    li strong {
      font-weight: 500;
    }
    li p {
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
    .provenance {
      padding: 18px 24px;
      font-size: 12px;
      line-height: 1.6;
    }
    :focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 2px;
    }
    @media (max-width: 600px) {
      .top {
        align-items: flex-start;
        flex-direction: column;
      }
      h2 {
        font-size: 18px;
      }
      nav {
        gap: 14px;
        font-size: 13px;
      }
      nav button { min-height: 44px; text-align: start; }
      .chart,
      .pane {
        padding: 18px 10px;
      }
      .toolbar,
      .top,
      .source,
      .timeline {
        padding-left: 14px;
        padding-right: 14px;
      }
      .tools button {
        font-size: 12px;
        padding: 8px;
      }
      li {
        flex-direction: column;
        gap: 6px;
      }
      .metrics strong {
        font-size: 17px;
      }
      .model-heading {
        flex-direction: column;
        align-items: flex-start;
      }
      .timeline h3 {
        flex-direction: column;
      }
      .foot {
        margin: 12px 14px;
      }
    }
  `,Y([ve({attribute:!1})],Me.prototype,"hass",2),Y([ve({attribute:!1})],Me.prototype,"diagnostic",2),Y([ve({attribute:!1})],Me.prototype,"session",2),Y([Re()],Me.prototype,"tab",2),Y([Re()],Me.prototype,"hiddenLearning",2),Y([Re()],Me.prototype,"expert",2),Y([Re()],Me.prototype,"hours",2),Y([Re()],Me.prototype,"end",2),Y([Re()],Me.prototype,"range",2),Y([Re()],Me.prototype,"recorder",2),Y([Re()],Me.prototype,"loading",2),Y([Re()],Me.prototype,"error",2),Y([Re()],Me.prototype,"preferSession",2),Y([Re()],Me.prototype,"followNow",2),Y([Re()],Me.prototype,"inspection",2),Y([Re()],Me.prototype,"livePublicationMissing",2),Y([Re()],Me.prototype,"block",2),Me=Y([Nt("smartpi-visual-diagnostics")],Me);var Yp=new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium",timeStyle:"short"}),Jp=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],Kt=class extends Ke{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new Kn}willUpdate(n){n.has("hass")&&this.hass&&this.sessionHistory.collect(Ws(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(n,t,s="",r=2){return A`<div class="metric"><span>${n}</span><strong>${B(t,s,r)}</strong></div>`}power(n,t,s){let r=Ce(t),a=r===null?0:Math.min(100,Math.max(0,r));return A`<div class="power"><div class="power-label"><span>${n}</span><strong>${B(t," %",1)}</strong></div>
      <div class="track" aria-label=${n+" "+B(t," %",1)}>
        <div class=${"fill "+s} style=${"width:"+a+"%"}></div>
      </div></div>`}field(n,t){let s=B(et(t,n.path,n.reliable),n.unit??"",n.digits??2);return A`<div class="detail" title=${n.path}><span>${n.label}</span><strong>${s}</strong></div>`}showDiagnostic(n){let t=n.live,s=vr(n),r=$n(n),a=Ki(n.lastUpdated);return A`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${n.name}</h2>
            <div class="muted small">${n.climateId??n.entityId}</div></div>
          <span class="tag">${r?"Apprentissage / hyst\xE9r\xE9sis":B(C(t,"control.phase"))}</span>
        </div>
        <p class="muted small">Dernière publication ${a===null?"indisponible":A`<time datetime=${n.lastUpdated??""}>${Yp.format(a*1e3)}</time>`}</p>
        <div class="metrics">
          ${this.metric("Temp\xE9rature int\xE9rieure",C(t,"temperature.indoor")," \xB0C")}
          ${this.metric("Consigne filtr\xE9e",C(t,"setpoint.filtered_setpoint")," \xB0C")}
          ${this.metric("Commande appliqu\xE9e",C(t,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",C(t,"temperature.outdoor")," \xB0C")}
        </div>
        <section class="learn" aria-label="Avancement de l’apprentissage">
          <div class="flex spread"><h3>Apprentissage du modèle</h3>
            <strong>${B({bootstrap:"Initialisation",learning:"Collecte du mod\xE8le",monitoring:"Surveillance",degraded:"Mod\xE8le \xE0 consolider"}[String(C(t,"learning.stage"))]??C(t,"learning.stage"))}</strong></div>
          <div class="columns">
            ${["a","b"].map(c=>{let p=Ce(C(t,`learning.emea_samples_${c}`)),f=Ce(C(t,`learning.bootstrap_target_${c}`)),b=Ce(C(t,"learning.history_target")),h=p!==null&&p>=0&&b!==null&&b>0,g=h?Math.min(100,100*p/b):null;return A`<div>
                <div class="flex spread"><strong>${c.toUpperCase()} · ${c==="a"?"chauffe":"pertes thermiques"}</strong>
                  <span>${B(g," %",0)}</span></div>
                <progress aria-label=${`Historique de ${c.toUpperCase()}`}
                  max=${b??1} value=${h?Math.min(p,b):j}></progress>
                <p class="muted small">${B(p,"",0)} / ${B(b,"",0)} mesures conservées
                  · premier palier ${B(f,"",0)}
                  ${p!==null&&f!==null?p>=f?"atteint":"en cours":""}</p>
                <p class="muted small">Mises à jour acceptées · ${B(C(t,`learning.accepted_updates_${c}`),"",0)}</p>
              </div>`})}
          </div>
          <p class="muted small">Les pourcentages décrivent le remplissage de l’historique.
            Confiance publiée · ${B(C(t,"model.confidence"))}
            · τ fiable · ${B(C(t,"model.tau_reliable"))}</p>
          <div class="columns">
            ${["heat","cool"].map(c=>{let p=C(t,`model.deadtime_${c}_reliable`);return A`<div><strong>Temps mort · ${c==="heat"?"chauffe":"refroidissement"}</strong>
                <p>${p===!0?B(C(t,`model.deadtime_${c}_s`)," s",0):p===!1?"En attente d\u2019une mesure fiable":"Indisponible"}</p>
                <p class="muted small">Dernière issue · ${B(C(t,`analysis.deadtime.${c}_last_outcome`))}</p></div>`})}
          </div>
          ${r?A`<p><strong>Prochaine étape</strong> ·
            ${String(C(t,"learning.bootstrap_status")).includes("waiting response lag")?"Les premi\xE8res mesures sont collect\xE9es. SmartPI attend de r\xE9soudre le d\xE9lai de r\xE9ponse.":C(t,"model.deadtime_heat_reliable")===!1||C(t,"model.deadtime_cool_reliable")===!1?"Acqu\xE9rir les temps morts encore en attente pour d\xE9bloquer les observations correspondantes.":"Collecter les premi\xE8res mesures A et B acceptables par SmartPI."}</p>`:j}
          ${r?A`<p><strong>Étape initiale</strong> · ${B(C(t,"learning.bootstrap_status"))}</p>`:j}
          ${C(t,"learning.enabled")===!1?A`<p>Apprentissage désactivé selon SmartPI.</p>`:j}
          <p>Détection en cours · ${B(C(t,"analysis.deadtime.state"))}
            · attente écoulée ${B(C(t,"analysis.deadtime.waiting_elapsed_s")," s",0)}</p>
          <p>Délai de réponse · ${B(C(t,"analysis.learning.response_lag.lag_s")," s",0)}
            · épisodes ${B(C(t,"analysis.learning.response_lag.episodes"),"",0)}</p>
          <p class="muted small">Motif d’apprentissage · ${B(C(t,"learning.last_reason"))}
            · motif du délai · ${B(C(t,"analysis.learning.response_lag.last_reason"))}</p>
          <p class="muted small">Si les compteurs restent à zéro, les états et motifs ci-dessus
            décrivent la dernière situation publiée. Une nouvelle mesure dépend d’une
            observation exploitable acceptée par SmartPI.</p>
        </section>
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${n} .session=${this.sessionHistory.get(n.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${s.map(c=>A`<li>${c}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${Jp.map(c=>A`<details class="surface">
          <summary>${c.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${c.note}</p>
          <div class="detail-grid">${c.fields.map(p=>this.field(p,t))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:n.state,live:n.live,history:n.history},null,2)}</pre>
      </details>
      </details>
    `}render(){let n=Ws(this.hass),t=n.find(s=>s.entityId===this.selectedId)??n[0];return A`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Lecture seule</span></div>
      <main>
        <div class="flex spread intro"><h2>Mes thermostats</h2>
          <span class="muted small">${n.length} diagnostic${n.length>1?"s":""} SmartPI v2</span></div>
        ${n.length===0?A`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:A`<div class="tiles">${n.map(s=>A`<button type="button" class=${"tile "+(t?.entityId===s.entityId?"selected":"")}
           @click=${()=>{this.selectedId=s.entityId}} aria-pressed=${t?.entityId===s.entityId}>
            <strong>${s.name}</strong>
            <span class="big">${B(C(s.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom">Consigne filtrée ${B(C(s.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
          </button>`)}</div>
          ${t?this.showDiagnostic(t):j}`}
        <footer>Source : capteurs SmartPI Diagnostics v2 · Lecture seule · Aucune commande Home Assistant</footer>
      </main>`}};Kt.styles=Pt`
    :host{display:block;min-height:100vh;background:var(--primary-background-color);color:var(--primary-text-color);
      font-family:var(--primary-font-family,Roboto,Arial,sans-serif)}
    *{box-sizing:border-box}
    .header{display:flex;align-items:center;gap:12px;background:var(--app-header-background-color,var(--card-background-color));
      color:var(--app-header-text-color,var(--primary-text-color));padding:10px 18px;border-bottom:1px solid var(--divider-color);min-height:66px}
    .head-text{flex:1}.head-text h1{font-size:20px;margin:0}.head-text span{font-size:12px;opacity:.75}
    .eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;color:var(--secondary-text-color)}
    .tag{border:1px solid var(--divider-color);border-radius:30px;padding:7px 11px;font-size:12px;white-space:nowrap}
    main{max-width:1260px;margin:auto;padding:23px 18px}
    .flex{display:flex;gap:10px;align-items:center}.spread{justify-content:space-between}.intro{margin-bottom:14px}
    .intro h2,.subhead h2{font-size:22px;margin:5px 0}.small{font-size:12px}.muted{color:var(--secondary-text-color)}
    .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:10px;margin-bottom:15px}
    .tile{background:var(--card-background-color);color:inherit;border:1px solid var(--divider-color);border-radius:14px;
      min-height:105px;padding:12px 14px;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:5px}
    button:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color);outline-offset:3px}
    .tile{overflow-wrap:anywhere;min-width:0}
    .tile:hover{border-color:var(--primary-color)}.tile.selected{box-shadow:inset 0 -3px var(--primary-color);border-color:var(--primary-color)}
    .big{font-size:24px;font-weight:700;font-variant-numeric:tabular-nums}.tile-bottom{font-size:12px;margin-top:auto;color:var(--secondary-text-color)}
    .hero,.surface{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px}
    .hero{padding:20px;border-inline-start:3px solid var(--primary-color)}.hero h2{margin:4px 0;font-size:25px;overflow-wrap:anywhere}
    .metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin-top:14px}
    .metric{background:var(--secondary-background-color,var(--primary-background-color));border-radius:10px;
      padding:14px;display:flex;flex-direction:column;gap:8px;min-width:0}
    .metric span{font-size:12px;color:var(--secondary-text-color)}.metric strong{font-size:21px;overflow-wrap:anywhere}
    .track{height:9px;background:var(--divider-color);border-radius:20px;overflow:hidden;margin-top:8px}
    .fill{height:100%;border-radius:20px}.applied{background:var(--primary-color)}.pi{background:#529ad8}.ff{background:#ab82c6}.cmd{background:#999}
    progress{width:100%;height:16px;accent-color:var(--primary-color)}
    .learn{margin-top:20px;font-size:13px}.columns{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:16px}
    .surface{padding:20px}.surface h3{margin:0 0 13px;font-size:17px}
    .surface p,.surface li{font-size:14px;line-height:1.55}.surface ul{margin:0;padding-left:18px}.surface li{margin-bottom:8px}
    .power{margin:14px 0}.power-label{display:flex;justify-content:space-between;gap:8px;font-size:13px}
    .foot{font-size:12px!important;color:var(--secondary-text-color)}
    .subhead{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:28px 0 12px}
    .details-list{display:grid;gap:10px;margin-bottom:10px}
    summary{display:flex;justify-content:space-between;cursor:pointer;list-style:none;font-weight:600;font-size:15px}
    summary::-webkit-details-marker{display:none}details[open] .chevron{transform:rotate(180deg)}
    .detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 18px;margin-top:12px}
    .detail{border-bottom:1px solid var(--divider-color);padding:11px 0;display:flex;justify-content:space-between;gap:12px;font-size:13px}
    .detail span{color:var(--secondary-text-color)}.detail strong{text-align:right;overflow-wrap:anywhere}
    .raw pre{overflow:auto;max-height:340px;background:var(--primary-background-color);padding:12px;border-radius:8px;font-size:11px}
    .soon{margin-top:10px}.empty{margin-bottom:18px}footer{padding:21px 0;color:var(--secondary-text-color);font-size:12px}
    @media(max-width:850px){.metrics{grid-template-columns:repeat(2,1fr)}.columns,.detail-grid{grid-template-columns:1fr}}
    @media(max-width:520px){main{padding:14px 11px}.hero,.surface{padding:15px}.tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      .tile{padding:10px;min-height:93px}.big{font-size:21px}
      .metric strong{font-size:18px}.hero h2{font-size:23px}.hero .spread{align-items:flex-start;flex-direction:column}
      .subhead{display:block}.readonly{font-size:10px}.head-text h1{font-size:17px}}
  `,Y([ve({attribute:!1})],Kt.prototype,"hass",2),Y([ve({attribute:!1})],Kt.prototype,"panel",2),Y([ve({type:Boolean})],Kt.prototype,"narrow",2),Y([Re()],Kt.prototype,"selectedId",2),Kt=Y([Nt("smartpi-dashboard-panel")],Kt);export{Kt as SmartPIDashboardPanel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
