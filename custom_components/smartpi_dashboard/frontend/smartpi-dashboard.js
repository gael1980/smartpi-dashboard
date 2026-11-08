var Ca=Object.defineProperty;var Ea=Object.getOwnPropertyDescriptor;var Z=(i,e,n,t)=>{for(var s=t>1?void 0:t?Ea(e,n):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(s=(t?a(e,n,s):a(s))||s);return t&&s&&Ca(e,n,s),s};var qn=globalThis,Un=qn.ShadowRoot&&(qn.ShadyCSS===void 0||qn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ds=Symbol(),tr=new WeakMap,mn=class{constructor(e,n,t){if(this._$cssResult$=!0,t!==Ds)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o,n=this.t;if(Un&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=tr.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&tr.set(n,e))}return e}toString(){return this.cssText}},Vn=i=>new mn(typeof i=="string"?i:i+"",void 0,Ds),Et=(i,...e)=>{let n=i.length===1?i[0]:e.reduce((t,s,o)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new mn(n,i,Ds)},ir=(i,e)=>{if(Un)i.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let t=document.createElement("style"),s=qn.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=n.cssText,i.appendChild(t)}},Rs=Un?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let n="";for(let t of e.cssRules)n+=t.cssText;return Vn(n)})(i):i;var{is:Ma,defineProperty:Pa,getOwnPropertyDescriptor:Ta,getOwnPropertyNames:Fa,getOwnPropertySymbols:La,getPrototypeOf:Da}=Object,Bn=globalThis,nr=Bn.trustedTypes,Ra=nr?nr.emptyScript:"",za=Bn.reactiveElementPolyfillSupport,gn=(i,e)=>i,bn={toAttribute(i,e){switch(e){case Boolean:i=i?Ra:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let n=i;switch(e){case Boolean:n=i!==null;break;case Number:n=i===null?null:Number(i);break;case Object:case Array:try{n=JSON.parse(i)}catch{n=null}}return n}},jn=(i,e)=>!Ma(i,e),sr={attribute:!0,type:String,converter:bn,reflect:!1,useDefault:!1,hasChanged:jn};Symbol.metadata??=Symbol("metadata"),Bn.litPropertyMetadata??=new WeakMap;var jt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=sr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(e,t,n);s!==void 0&&Pa(this.prototype,e,s)}}static getPropertyDescriptor(e,n,t){let{get:s,set:o}=Ta(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){let u=s?.call(this);o?.call(this,a),this.requestUpdate(e,u,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??sr}static _$Ei(){if(this.hasOwnProperty(gn("elementProperties")))return;let e=Da(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(gn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gn("properties"))){let n=this.properties,t=[...Fa(n),...La(n)];for(let s of t)this.createProperty(s,n[s])}let e=this[Symbol.metadata];if(e!==null){let n=litPropertyMetadata.get(e);if(n!==void 0)for(let[t,s]of n)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[n,t]of this.elementProperties){let s=this._$Eu(n,t);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let n=[];if(Array.isArray(e)){let t=new Set(e.flat(1/0).reverse());for(let s of t)n.unshift(Rs(s))}else e!==void 0&&n.push(Rs(e));return n}static _$Eu(e,n){let t=n.attribute;return t===!1?void 0:typeof t=="string"?t:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,n=this.constructor.elementProperties;for(let t of n.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ir(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,t){this._$AK(e,t)}_$ET(e,n){let t=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,t);if(s!==void 0&&t.reflect===!0){let o=(t.converter?.toAttribute!==void 0?t.converter:bn).toAttribute(n,t.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,n){let t=this.constructor,s=t._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=t.getPropertyOptions(s),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:bn;this._$Em=s;let u=a.fromAttribute(n,o.type);this[s]=u??this._$Ej?.get(s)??u,this._$Em=null}}requestUpdate(e,n,t,s=!1,o){if(e!==void 0){let a=this.constructor;if(s===!1&&(o=this[e]),t??=a.getPropertyOptions(e),!((t.hasChanged??jn)(o,n)||t.useDefault&&t.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,t))))return;this.C(e,n,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:t,reflect:s,wrapped:o},a){t&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||t||(n=void 0),this._$AL.set(e,n)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,o]of t){let{wrapped:a}=o,u=this[s];a!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,o,u)}}let e=!1,n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(n)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};jt.elementStyles=[],jt.shadowRootOptions={mode:"open"},jt[gn("elementProperties")]=new Map,jt[gn("finalized")]=new Map,za?.({ReactiveElement:jt}),(Bn.reactiveElementVersions??=[]).push("2.1.2");var Us=globalThis,lr=i=>i,Wn=Us.trustedTypes,rr=Wn?Wn.createPolicy("lit-html",{createHTML:i=>i}):void 0,dr="$lit$",ti=`lit$${Math.random().toFixed(9).slice(2)}$`,fr="?"+ti,Ia=`<${fr}>`,vi=document,yn=()=>vi.createComment(""),xn=i=>i===null||typeof i!="object"&&typeof i!="function",Vs=Array.isArray,Ha=i=>Vs(i)||typeof i?.[Symbol.iterator]=="function",zs=`[ 	
\f\r]`,vn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,or=/-->/g,ar=/>/g,gi=RegExp(`>|${zs}(?:([^\\s"'>=/]+)(${zs}*=${zs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),cr=/'/g,pr=/"/g,hr=/^(?:script|style|textarea|title)$/i,Bs=i=>(e,...n)=>({_$litType$:i,strings:e,values:n}),A=Bs(1),Gi=Bs(2),Xp=Bs(3),yi=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),ur=new WeakMap,bi=vi.createTreeWalker(vi,129);function mr(i,e){if(!Vs(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return rr!==void 0?rr.createHTML(e):e}var Oa=(i,e)=>{let n=i.length-1,t=[],s,o=e===2?"<svg>":e===3?"<math>":"",a=vn;for(let u=0;u<n;u++){let d=i[u],f,v,m=-1,b=0;for(;b<d.length&&(a.lastIndex=b,v=a.exec(d),v!==null);)b=a.lastIndex,a===vn?v[1]==="!--"?a=or:v[1]!==void 0?a=ar:v[2]!==void 0?(hr.test(v[2])&&(s=RegExp("</"+v[2],"g")),a=gi):v[3]!==void 0&&(a=gi):a===gi?v[0]===">"?(a=s??vn,m=-1):v[1]===void 0?m=-2:(m=a.lastIndex-v[2].length,f=v[1],a=v[3]===void 0?gi:v[3]==='"'?pr:cr):a===pr||a===cr?a=gi:a===or||a===ar?a=vn:(a=gi,s=void 0);let y=a===gi&&i[u+1].startsWith("/>")?" ":"";o+=a===vn?d+Ia:m>=0?(t.push(f),d.slice(0,m)+dr+d.slice(m)+ti+y):d+ti+(m===-2?u:y)}return[mr(i,o+(i[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]},wn=class i{constructor({strings:e,_$litType$:n},t){let s;this.parts=[];let o=0,a=0,u=e.length-1,d=this.parts,[f,v]=Oa(e,n);if(this.el=i.createElement(f,t),bi.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=bi.nextNode())!==null&&d.length<u;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(dr)){let b=v[a++],y=s.getAttribute(m).split(ti),k=/([.?@])?(.*)/.exec(b);d.push({type:1,index:o,name:k[2],strings:y,ctor:k[1]==="."?Hs:k[1]==="?"?Os:k[1]==="@"?Ns:Wi}),s.removeAttribute(m)}else m.startsWith(ti)&&(d.push({type:6,index:o}),s.removeAttribute(m));if(hr.test(s.tagName)){let m=s.textContent.split(ti),b=m.length-1;if(b>0){s.textContent=Wn?Wn.emptyScript:"";for(let y=0;y<b;y++)s.append(m[y],yn()),bi.nextNode(),d.push({type:2,index:++o});s.append(m[b],yn())}}}else if(s.nodeType===8)if(s.data===fr)d.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ti,m+1))!==-1;)d.push({type:7,index:o}),m+=ti.length-1}o++}}static createElement(e,n){let t=vi.createElement("template");return t.innerHTML=e,t}};function ji(i,e,n=i,t){if(e===yi)return e;let s=t!==void 0?n._$Co?.[t]:n._$Cl,o=xn(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,n,t)),t!==void 0?(n._$Co??=[])[t]=s:n._$Cl=s),s!==void 0&&(e=ji(i,s._$AS(i,e.values),s,t)),e}var Is=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:t}=this._$AD,s=(e?.creationScope??vi).importNode(n,!0);bi.currentNode=s;let o=bi.nextNode(),a=0,u=0,d=t[0];for(;d!==void 0;){if(a===d.index){let f;d.type===2?f=new _n(o,o.nextSibling,this,e):d.type===1?f=new d.ctor(o,d.name,d.strings,this,e):d.type===6&&(f=new qs(o,this,e)),this._$AV.push(f),d=t[++u]}a!==d?.index&&(o=bi.nextNode(),a++)}return bi.currentNode=vi,s}p(e){let n=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,n),n+=t.strings.length-2):t._$AI(e[n])),n++}},_n=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,t,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=ji(this,e,n),xn(e)?e===K||e==null||e===""?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==yi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ha(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&xn(this._$AH)?this._$AA.nextSibling.data=e:this.T(vi.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:t}=e,s=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=wn.createElement(mr(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Is(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(e){let n=ur.get(e.strings);return n===void 0&&ur.set(e.strings,n=new wn(e)),n}k(e){Vs(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,t,s=0;for(let o of e)s===n.length?n.push(t=new i(this.O(yn()),this.O(yn()),this,this.options)):t=n[s],t._$AI(o),s++;s<n.length&&(this._$AR(t&&t._$AB.nextSibling,s),n.length=s)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let t=lr(e).nextSibling;lr(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Wi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,t,s,o){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=n,this._$AM=s,this.options=o,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=K}_$AI(e,n=this,t,s){let o=this.strings,a=!1;if(o===void 0)e=ji(this,e,n,0),a=!xn(e)||e!==this._$AH&&e!==yi,a&&(this._$AH=e);else{let u=e,d,f;for(e=o[0],d=0;d<o.length-1;d++)f=ji(this,u[t+d],n,d),f===yi&&(f=this._$AH[d]),a||=!xn(f)||f!==this._$AH[d],f===K?e=K:e!==K&&(e+=(f??"")+o[d+1]),this._$AH[d]=f}a&&!s&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Hs=class extends Wi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}},Os=class extends Wi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}},Ns=class extends Wi{constructor(e,n,t,s,o){super(e,n,t,s,o),this.type=5}_$AI(e,n=this){if((e=ji(this,e,n,0)??K)===yi)return;let t=this._$AH,s=e===K&&t!==K||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,o=e!==K&&(t===K||s);s&&this.element.removeEventListener(this.name,this,t),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},qs=class{constructor(e,n,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){ji(this,e)}};var Na=Us.litHtmlPolyfillSupport;Na?.(wn,_n),(Us.litHtmlVersions??=[]).push("3.3.3");var gr=(i,e,n)=>{let t=n?.renderBefore??e,s=t._$litPart$;if(s===void 0){let o=n?.renderBefore??null;t._$litPart$=s=new _n(e.insertBefore(yn(),o),o,void 0,n??{})}return s._$AI(i),s};var js=globalThis,Ke=class extends jt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=gr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return yi}};Ke._$litElement$=!0,Ke.finalized=!0,js.litElementHydrateSupport?.({LitElement:Ke});var qa=js.litElementPolyfillSupport;qa?.({LitElement:Ke});(js.litElementVersions??=[]).push("4.2.2");var Nt=i=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Ua={attribute:!0,type:String,converter:bn,reflect:!1,hasChanged:jn},Va=(i=Ua,e,n)=>{let{kind:t,metadata:s}=n,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),t==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(n.name,i),t==="accessor"){let{name:a}=n;return{set(u){let d=e.get.call(this);e.set.call(this,u),this.requestUpdate(a,d,i,!0,u)},init(u){return u!==void 0&&this.C(a,void 0,i,u),u}}}if(t==="setter"){let{name:a}=n;return function(u){let d=this[a];e.call(this,u),this.requestUpdate(a,d,i,!0,u)}}throw Error("Unsupported decorator location: "+t)};function ke(i){return(e,n)=>typeof n=="object"?Va(i,e,n):((t,s,o)=>{let a=s.hasOwnProperty(o);return s.constructor.createProperty(o,t),a?Object.getOwnPropertyDescriptor(s,o):void 0})(i,e,n)}function Ue(i){return ke({...i,state:!0,attribute:!1})}function ct(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function I(i,e){return e.split(".").reduce((n,t)=>ct(n)?n[t]:void 0,i)}function We(i){return typeof i=="number"&&Number.isFinite(i)?i:null}function se(i,e="",n=2){let t=We(i);return t!==null?t.toLocaleString("fr-FR",{maximumFractionDigits:n})+e:typeof i=="boolean"?i?"Oui":"Non":typeof i=="string"&&i.trim()!==""?i:"Indisponible"}function $n(i){return I(i.live,"control.mode")==="hysteresis"||I(i.live,"learning.stage")==="bootstrap"}function xt(i,e,n){if(!(n&&I(i,n)!==!0)&&!(e.startsWith("analysis.twin.")&&!e.endsWith("reliable")&&(I(i,"analysis.twin.twin_model_reliable")!==!0||I(i,"analysis.twin.twin_warming_up")!==!1)))return I(i,e)}function Ba(i,e){return Object.values(i.states).find(t=>t.entity_id.startsWith("climate.")&&I(t.attributes,"specific_states.regulation_diagnostics")===e)??null}function Ws(i){if(!i||!ct(i.states))return[];let e=[];for(let n of Object.values(i.states)){if(!n?.entity_id?.startsWith("sensor.")||!ct(n.attributes))continue;let t=n.attributes;if(t.schema_version!==2||!ct(t.live)||!ct(t.history))continue;let s=Ba(i,n.entity_id),a=(typeof t.friendly_name=="string"?t.friendly_name:n.entity_id).replace(/ SmartPI Diagnostics$/i,"");e.push({entityId:n.entity_id,climateId:s?.entity_id??null,name:typeof s?.attributes.friendly_name=="string"?s.attributes.friendly_name:a,state:n.state,lastUpdated:n.last_updated??null,available:n.state!=="unknown"&&n.state!=="unavailable",live:n.state==="unknown"||n.state==="unavailable"?{}:t.live,history:t.history})}return e.sort((n,t)=>n.name.localeCompare(t.name,"fr"))}function br(i){let e=[];if(!i.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];e.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),$n(i)&&e.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),I(i.live,"control.in_deadtime_window")===!0&&e.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),I(i.live,"model.tau_reliable")===!1&&e.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),I(i.live,"analysis.twin.twin_T_steady_reliable")===!1&&e.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let n=I(i.live,"feedforward.ff3_status");return typeof n=="string"&&n.startsWith("disabled:")&&e.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+n+"."),e}var ja=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function Ki(i){if(typeof i=="number")return Number.isFinite(i)&&i>0?i:null;if(typeof i!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(i))return null;let e=Date.parse(i);return Number.isFinite(e)?e/1e3:null}function yr(i){if(!Array.isArray(i))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let e=[];for(let n of i){if(!ct(n))continue;let t=Ki(n.lu??n.last_updated);if(t===null)continue;let s=ct(n.a)?n.a:ct(n.attributes)?n.attributes:{},o=typeof n.s=="string"?n.s:typeof n.state=="string"?n.state:"unknown",a=s.schema_version===2&&o!=="unavailable"&&o!=="unknown";e.push({time:t,state:o,history:a&&ct(s.history)?s.history:{},live:a&&ct(s.live)?s.live:{}})}return Yn(e)}function Yn(i){return[...new Map(i.map(e=>[e.time,e])).values()].sort((e,n)=>e.time-n.time)}function Mt(i,e){if(e==="error"){let n=We(I(i.history,"temperature.indoor")),t=We(I(i.history,"setpoint.filtered_setpoint"));return n===null||t===null?null:We(t-n)}return e.startsWith("live.")?We(xt(i.live,e.slice(5))):We(I(i.history,e))}function vr(i){if(i.length<2)return null;i.sort((n,t)=>n-t);let e=Math.floor(i.length/2);return i.length%2?i[e]:i[e-1]/2+i[e]/2}function xr(i){let e=[],n=null,t=null;for(let o of i){let a=Mt(o,"error");a!==null&&(e.push(a),n!==null&&(t=Math.max(t??0,o.time-n)),n=o.time)}let s=e.map(Math.abs);return{pairs:e.length,signedMedian:vr(e),absoluteMedian:vr(s),largestInterval:t}}function Gs(i){return i.some(e=>ja.some(n=>Mt(e,n)!==null))}function wr(i){let e=[];for(let n=1;n<i.length;n++){let t=i[n-1],s=i[n],o=We(I(t.history,"setpoint.filtered_setpoint")),a=We(I(s.history,"setpoint.filtered_setpoint"));o!==null&&a!==null&&o!==a&&e.push({time:s.time,label:`Consigne filtr\xE9e ${o} \u2192 ${a} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),t.state!==s.state&&e.push({time:s.time,label:`Phase / \xE9tat : ${t.state} \u2192 ${s.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[u,d]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let f=I(t.live,u),v=I(s.live,u);f!=null&&v!==void 0&&v!==null&&f!==v&&e.push({time:s.time,label:`${d} : ${String(v)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${u}.`})}}return e}var Kn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(e,n,t=Date.now()/1e3){let s=new Set(e.map(o=>o.entityId));for(let o of this.buffers.keys())s.has(o)||(this.buffers.delete(o),this.revisions.delete(o));for(let o of e){let a=n[o.entityId]?.last_updated,u=Ki(a);if(!a||u===null||this.revisions.get(o.entityId)===a)continue;this.revisions.set(o.entityId,a);let d=this.buffers.get(o.entityId)??[];if(d.length&&u<=d[d.length-1].time)continue;let v={time:d.length===0?t:u,observedAt:d.length===0,state:o.state,history:o.available?o.history:{},live:o.live};this.buffers.set(o.entityId,Yn([...d,v]).filter(m=>m.time>=t-48*3600).slice(-12e3))}}get(e){return this.buffers.get(e)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};async function _r(i,e,n,t,s=()=>!1){if(!e.startsWith("sensor.")||!Number.isFinite(n)||!Number.isFinite(t)||t<=n||t-n>48*3600)throw new Error("Fen\xEAtre historique invalide.");let o=[];for(let a=n;a<t;a+=12*3600){if(s())throw new Error("Lecture annul\xE9e.");let u=Math.min(t,a+12*3600),d=await i.callWS({type:"history/history_during_period",start_time:new Date(a*1e3).toISOString(),end_time:new Date(u*1e3).toISOString(),entity_ids:[e],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!ct(d))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let f=yr(d[e]??[]);if(o.push(...f.filter(v=>v.time>=a&&v.time<=u)),o.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return Yn(o)}var Wa={setpoint:[["Trajectoire active","setpoint.trajectory_active"],["Boost actif","setpoint.boost_active"]],temperature:[["Temp\xE9rature ext\xE9rieure","temperature.outdoor"," \xB0C"],["Pente int\xE9rieure publi\xE9e","analysis.control.temperature_slope_h"," \xB0C/h",3]],pi:[["Erreur de la voie P","analysis.control.error_p"," \xB0C",4],["Erreur brute de la voie I","temperature.error"," \xB0C",4],["\xC9tat de l\u2019int\xE9grale","temperature.integral_error","",6],["Gain proportionnel Kp","control.kp","",6],["Gain int\xE9gral Ki","control.ki","",6],["Temps int\xE9gral Ti","control.ti_min"," min"],["Source de Kp","analysis.governance.kp_source"],["D\xE9cision sur les gains","analysis.governance.last_decision_gains"]],ff:[["FF1 \xB7 anticipation thermique","analysis.feedforward.u_ff1"," (ratio)",6],["FF2 \xB7 correction apprise","analysis.feedforward.u_ff2"," (ratio)",6],["FF3 \xB7 correction pr\xE9dictive","analysis.feedforward.u_ff3"," (ratio)",6],["Candidat avec FF3","analysis.feedforward.u_ff_effective"," (ratio)",6],["Bande morte active","control.in_deadband"],["Anticipation avant FF3","analysis.feedforward.u_ff_final"," (ratio)",6],["Motif de gel de FF2","analysis.feedforward.ff2_freeze_reason"],["Observateur stationnaire","feedforward.fftrim.stationary.state"],["Dernier rejet stationnaire","feedforward.fftrim.stationary.last_reject_reason"],["Observateur p\xE9riodique","feedforward.fftrim.periodic.state"],["Dernier rejet p\xE9riodique","feedforward.fftrim.periodic.last_reject_reason"],["Transfert de correction","feedforward.fftrim.transfer.state"],["Motif du transfert","feedforward.fftrim.transfer.reason"]],command:[["Sortie PI publi\xE9e","power.pi_percent"," %"],["Anticipation retenue","power.ff_percent"," %"]],direct:[["\xC9tat de l\u2019hyst\xE9r\xE9sis","control.hysteresis_state"],["Phase de calibration","calibration.state"],["Autocalibration","autocalib.state"]],limits:[["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"],["Saturation d\xE9clar\xE9e","control.saturation_state"],["Temporisation impos\xE9e","analysis.control.forced_by_timing"],["Correction anti-windup \u0394u","analysis.control.aw_du"," (ratio)",6],["Source de protection de l\u2019int\xE9grale","temperature.integral_guard_source"]],applied:[["Cycle engag\xE9","power.current_cycle_percent"," %"],["Candidat au cycle suivant","power.next_cycle_percent"," %"],["Lin\xE9arisation de vanne","power.valve_linearization_enabled"],["Cycle engag\xE9 \xB7 espace lin\xE9aire","power.linear_current_cycle_percent"," %"],["Candidat au cycle suivant \xB7 espace lin\xE9aire","power.linear_next_cycle_percent"," %"],["Statut du retour de commande","feedforward.fftrim.command_ownership.status"]],model:[["Pertes B","model.b"," min\u207B\xB9",6],["Constante thermique \u03C4","model.tau_min"," min",2,"model.tau_reliable"],["Temps mort en chauffe","model.deadtime_heat_s"," s",0,"model.deadtime_heat_reliable"],["Temps mort en refroidissement","model.deadtime_cool_s"," s",0,"model.deadtime_cool_reliable"],["\xC9tape d\u2019apprentissage","learning.stage"],["Dernier motif d\u2019apprentissage","learning.last_reason"],["Gouvernance thermique","governance.thermal_update_decision"],["Motif de gouvernance","governance.thermal_update_reason"],["\xC9tat du jumeau thermique","feedforward.twin_status"],["Temp\xE9rature pr\xE9dite","analysis.twin.twin_T_pred"," \xB0C"],["\xC9quilibre pr\xE9dit","analysis.twin.twin_T_steady"," \xB0C",2,"analysis.twin.twin_T_steady_reliable"]]},Ga={pi:6,ff:5,limits:5},ii=class{constructor(e){this.diagnostic=e}get live(){return this.diagnostic.available?this.diagnostic.live:{}}get directMode(){return this.diagnostic.available?["CoolDown","HeatUp","CoolDownFinal"].includes(String(I(this.live,"calibration.state")))||I(this.live,"control.phase")==="Calibration"?"Calibration":$n(this.diagnostic)||I(this.live,"control.phase")==="Hysteresis"?"Hyst\xE9r\xE9sis":null:null}get bypass(){return this.directMode!==null}get route(){return this.bypass?"direct":I(this.live,"control.mode")==="smartpi"?"pi":"unavailable"}get timingForced(){let e=I(this.live,"analysis.control.forced_by_timing");return typeof e=="boolean"?e:null}get saturation(){let e=I(this.live,"control.saturation_state");return e==="SAT_HI"?"Saturation haute d\xE9clar\xE9e":e==="SAT_LO"?"Saturation basse d\xE9clar\xE9e":null}detail(e,n){let t=e.id==="command"&&this.bypass?"direct":e.id,s=Wa[t]??[];return(n?s:s.slice(0,Ga[t]??4)).map(([o,a,u,d,f])=>{let v=xt(this.live,a,f);return{label:o,path:a,reliability:f,value:se(u===void 0?v:We(v),u,d)}})}blocks(){let e=this.live,n=this.bypass,t=this.route==="pi"?"Voie SmartPI":"Chemin non v\xE9rifi\xE9",s=(o,a,u,d,f,v,m)=>({id:o,title:a,path:u,value:se(We(I(e,u)),d,u==="model.a"?6:2),explanation:f,reason:se(I(e,v)),reasonPath:v,status:m==="Contourn\xE9"?m:We(I(e,u))===null?"Indisponible":m??"Publi\xE9"});return[s("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),s("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),s("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",n?"Contourn\xE9":t),s("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",n?"Contourn\xE9":t),s("command",this.directMode??"Commande demand\xE9e",n?"power.applied_percent":"power.command_percent"," %",n?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.",n?"control.phase":"control.saturation_state",n?"Voir sortie appliqu\xE9e":"Publi\xE9"),s("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",n?"Contourn\xE9":t),s("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),s("model","Pi\xE8ce et mod\xE8le A/B","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let e=this.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([n,t,s])=>{let o=We(I(e,t));return{label:n,path:t,value:o===null?null:o*(s?100:1)}})}};var Ka="uplot",Ya="u-hz",Ja="u-vt",Za="u-title",Qa="u-wrap",Xa="u-under",ec="u-over",tc="u-axis",_i="u-off",ic="u-select",nc="u-cursor-x",sc="u-cursor-y",lc="u-cursor-pt",rc="u-legend",oc="u-live",ac="u-inline",cc="u-series",pc="u-marker",$r="u-label",uc="u-value",kn="width",An="height";var Sr="bottom",Yi="left",Ks="right",ul="#000",kr=ul+"0",Ys="mousemove",Ar="mousedown",Js="mouseup",Cr="mouseenter",Er="mouseleave",Mr="dblclick",dc="resize",fc="scroll",Pr="change",es="dppxchange",dl="--",nn=typeof window<"u",tl=nn?document:null,Zi=nn?window:null,hc=nn?navigator:null,pe,Jn;function il(){let i=devicePixelRatio;pe!=i&&(pe=i,Jn&&sl(Pr,Jn,il),Jn=matchMedia(`(min-resolution: ${pe-.001}dppx) and (max-resolution: ${pe+.001}dppx)`),$i(Pr,Jn,il),Zi.dispatchEvent(new CustomEvent(es)))}function pt(i,e){if(e!=null){let n=i.classList;!n.contains(e)&&n.add(e)}}function nl(i,e){let n=i.classList;n.contains(e)&&n.remove(e)}function we(i,e,n){i.style[e]=n+"px"}function Pt(i,e,n,t){let s=tl.createElement(i);return e!=null&&pt(s,e),n?.insertBefore(s,t),s}function wt(i,e){return Pt("div",i,e)}var Tr=new WeakMap;function qt(i,e,n,t,s){let o="translate("+e+"px,"+n+"px)",a=Tr.get(i);o!=a&&(i.style.transform=o,Tr.set(i,o),e<0||n<0||e>t||n>s?pt(i,_i):nl(i,_i))}var Fr=new WeakMap;function Lr(i,e,n){let t=e+n,s=Fr.get(i);t!=s&&(Fr.set(i,t),i.style.background=e,i.style.borderColor=n)}var Dr=new WeakMap;function Rr(i,e,n,t){let s=e+""+n,o=Dr.get(i);s!=o&&(Dr.set(i,s),i.style.height=n+"px",i.style.width=e+"px",i.style.marginLeft=t?-e/2+"px":0,i.style.marginTop=t?-n/2+"px":0)}var fl={passive:!0},mc={...fl,capture:!0};function $i(i,e,n,t){e.addEventListener(i,n,t?mc:fl)}function sl(i,e,n,t){e.removeEventListener(i,n,fl)}nn&&il();function Tt(i,e,n,t){let s;n=n||0,t=t||e.length-1;let o=t<=2147483647;for(;t-n>1;)s=o?n+t>>1:ut((n+t)/2),e[s]<i?n=s:t=s;return i-e[n]<=e[t]-i?n:t}function co(i){return(n,t,s)=>{let o=-1,a=-1;for(let u=t;u<=s;u++)if(i(n[u])){o=u;break}for(let u=s;u>=t;u--)if(i(n[u])){a=u;break}return[o,a]}}var po=i=>i!=null,uo=i=>i!=null&&i>0,ns=co(po),gc=co(uo);function bc(i,e,n,t=0,s=!1){let o=s?gc:ns,a=s?uo:po;[e,n]=o(i,e,n);let u=i[e],d=i[e];if(e>-1)if(t==1)u=i[e],d=i[n];else if(t==-1)u=i[n],d=i[e];else for(let f=e;f<=n;f++){let v=i[f];a(v)&&(v<u?u=v:v>d&&(d=v))}return[u??me,d??-me]}function ss(i,e,n,t){let s=Hr(i),o=Hr(e);i==e&&(s==-1?(i*=n,e/=n):(i/=n,e*=n));let a=n==10?Wt:fo,u=s==1?ut:_t,d=o==1?_t:ut,f=u(a(Re(i))),v=d(a(Re(e))),m=Qi(n,f),b=Qi(n,v);return n==10&&(f<0&&(m=ge(m,-f)),v<0&&(b=ge(b,-v))),t||n==2?(i=m*s,e=b*o):(i=bo(i,m),e=ls(e,b)),[i,e]}function hl(i,e,n,t){let s=ss(i,e,n,t);return i==0&&(s[0]=0),e==0&&(s[1]=0),s}var ml=.1,zr={mode:3,pad:ml},En={pad:0,soft:null,mode:0},vc={min:En,max:En};function ts(i,e,n,t){return rs(n)?Ir(i,e,n):(En.pad=n,En.soft=t?0:null,En.mode=t?3:0,Ir(i,e,vc))}function ae(i,e){return i??e}function yc(i,e,n){for(e=ae(e,0),n=ae(n,i.length-1);e<=n;){if(i[e]!=null)return!0;e++}return!1}function Ir(i,e,n){let t=n.min,s=n.max,o=ae(t.pad,0),a=ae(s.pad,0),u=ae(t.hard,-me),d=ae(s.hard,me),f=ae(t.soft,me),v=ae(s.soft,-me),m=ae(t.mode,0),b=ae(s.mode,0),y=e-i,k=Wt(y),F=et(Re(i),Re(e)),H=Wt(F),z=Re(H-k);(y<1e-24||z>10)&&(y=0,(i==0||e==0)&&(y=1e-24,m==2&&f!=me&&(o=0),b==2&&v!=-me&&(a=0)));let w=y||F||1e3,M=Wt(w),C=Qi(10,ut(M)),J=w*(y==0?i==0?.1:1:o),D=ge(bo(i-J,C/10),24),X=i>=f&&(m==1||m==3&&D<=f||m==2&&D>=f)?f:me,G=et(u,D<X&&i>=X?X:Ft(X,D)),ee=w*(y==0?e==0?.1:1:a),j=ge(ls(e+ee,C/10),24),E=e<=v&&(b==1||b==3&&j>=v||b==2&&j<=v)?v:-me,Y=Ft(d,j>E&&e<=E?E:et(E,j));return G==Y&&G==0&&(Y=100),[G,Y]}var xc=new Intl.NumberFormat(nn?hc.language:"en-US"),gl=i=>xc.format(i),dt=Math,Xn=dt.PI,Re=dt.abs,ut=dt.floor,De=dt.round,_t=dt.ceil,Ft=dt.min,et=dt.max,Qi=dt.pow,Hr=dt.sign,Wt=dt.log10,fo=dt.log2,wc=(i,e=1)=>dt.sinh(i)*e,Zs=(i,e=1)=>dt.asinh(i/e),me=1/0;function Or(i){return(Wt((i^i>>31)-(i>>31))|0)+1}function ll(i,e,n){return Ft(et(i,e),n)}function ho(i){return typeof i=="function"}function le(i){return ho(i)?i:()=>i}var _c=()=>{},mo=i=>i,go=(i,e)=>e,$c=i=>null,Nr=i=>!0,qr=(i,e)=>i==e,Sc=/\.\d*?(?=9{6,}|0{6,})/gm,Si=i=>{if(yo(i)||si.has(i))return i;let e=`${i}`,n=e.match(Sc);if(n==null)return i;let t=n[0].length-1;if(e.indexOf("e-")!=-1){let[s,o]=e.split("e");return+`${Si(s)}e${o}`}return ge(i,t)};function xi(i,e){return Si(ge(Si(i/e))*e)}function ls(i,e){return Si(_t(Si(i/e))*e)}function bo(i,e){return Si(ut(Si(i/e))*e)}function ge(i,e=0){if(yo(i))return i;let n=10**e,t=i*n*(1+Number.EPSILON);return De(t)/n}var si=new Map;function vo(i){return((""+i).split(".")[1]||"").length}function Pn(i,e,n,t){let s=[],o=t.map(vo);for(let a=e;a<n;a++){let u=Re(a),d=ge(Qi(i,a),u);for(let f=0;f<t.length;f++){let v=i==10?+`${t[f]}e${a}`:t[f]*d,m=(a>=0?0:u)+(a>=o[f]?0:o[f]),b=i==10?v:ge(v,m);s.push(b),si.set(b,m)}}return s}var Mn={},bl=[],Xi=[null,null],ni=Array.isArray,yo=Number.isInteger,kc=i=>i===void 0;function Ur(i){return typeof i=="string"}function rs(i){let e=!1;if(i!=null){let n=i.constructor;e=n==null||n==Object}return e}function Ac(i){return i!=null&&typeof i=="object"}var Cc=Object.getPrototypeOf(Uint8Array),xo="__proto__";function en(i,e=rs){let n;if(ni(i)){let t=i.find(s=>s!=null);if(ni(t)||e(t)){n=Array(i.length);for(let s=0;s<i.length;s++)n[s]=en(i[s],e)}else n=i.slice()}else if(i instanceof Cc)n=i.slice();else if(e(i)){n={};for(let t in i)t!=xo&&(n[t]=en(i[t],e))}else n=i;return n}function Te(i){let e=arguments;for(let n=1;n<e.length;n++){let t=e[n];for(let s in t)s!=xo&&(rs(i[s])?Te(i[s],en(t[s])):i[s]=en(t[s]))}return i}var Ec=0,Mc=1,Pc=2;function Tc(i,e,n){for(let t=0,s,o=-1;t<e.length;t++){let a=e[t];if(a>o){for(s=a-1;s>=0&&i[s]==null;)i[s--]=null;for(s=a+1;s<n&&i[s]==null;)i[o=s++]=null}}}function Fc(i,e){if(Rc(i)){let a=i[0].slice();for(let u=1;u<i.length;u++)a.push(...i[u].slice(1));return zc(a[0])||(a=Dc(a)),a}let n=new Set;for(let a=0;a<i.length;a++){let d=i[a][0],f=d.length;for(let v=0;v<f;v++)n.add(d[v])}let t=[Array.from(n).sort((a,u)=>a-u)],s=t[0].length,o=new Map;for(let a=0;a<s;a++)o.set(t[0][a],a);for(let a=0;a<i.length;a++){let u=i[a],d=u[0];for(let f=1;f<u.length;f++){let v=u[f],m=Array(s).fill(void 0),b=e?e[a][f]:Mc,y=[];for(let k=0;k<v.length;k++){let F=v[k],H=o.get(d[k]);F===null?b!=Ec&&(m[H]=F,b==Pc&&y.push(H)):m[H]=F}Tc(m,y,s),t.push(m)}}return t}var Lc=typeof queueMicrotask>"u"?i=>Promise.resolve().then(i):queueMicrotask;function Dc(i){let e=i[0],n=e.length,t=Array(n);for(let o=0;o<t.length;o++)t[o]=o;t.sort((o,a)=>e[o]-e[a]);let s=[];for(let o=0;o<i.length;o++){let a=i[o],u=Array(n);for(let d=0;d<n;d++)u[d]=a[t[d]];s.push(u)}return s}function Rc(i){let e=i[0][0],n=e.length;for(let t=1;t<i.length;t++){let s=i[t][0];if(s.length!=n)return!1;if(s!=e){for(let o=0;o<n;o++)if(s[o]!=e[o])return!1}}return!0}function zc(i,e=100){let n=i.length;if(n<=1)return!0;let t=0,s=n-1;for(;t<=s&&i[t]==null;)t++;for(;s>=t&&i[s]==null;)s--;if(s<=t)return!0;let o=et(1,ut((s-t+1)/e));for(let a=i[t],u=t+o;u<=s;u+=o){let d=i[u];if(d!=null){if(d<=a)return!1;a=d}}return!0}var wo=["January","February","March","April","May","June","July","August","September","October","November","December"],_o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function $o(i){return i.slice(0,3)}var Ic=_o.map($o),Hc=wo.map($o),Oc={MMMM:wo,MMM:Hc,WWWW:_o,WWW:Ic};function Sn(i){return(i<10?"0":"")+i}function Nc(i){return(i<10?"00":i<100?"0":"")+i}var qc={YYYY:i=>i.getFullYear(),YY:i=>(i.getFullYear()+"").slice(2),MMMM:(i,e)=>e.MMMM[i.getMonth()],MMM:(i,e)=>e.MMM[i.getMonth()],MM:i=>Sn(i.getMonth()+1),M:i=>i.getMonth()+1,DD:i=>Sn(i.getDate()),D:i=>i.getDate(),WWWW:(i,e)=>e.WWWW[i.getDay()],WWW:(i,e)=>e.WWW[i.getDay()],HH:i=>Sn(i.getHours()),H:i=>i.getHours(),h:i=>{let e=i.getHours();return e==0?12:e>12?e-12:e},AA:i=>i.getHours()>=12?"PM":"AM",aa:i=>i.getHours()>=12?"pm":"am",a:i=>i.getHours()>=12?"p":"a",mm:i=>Sn(i.getMinutes()),m:i=>i.getMinutes(),ss:i=>Sn(i.getSeconds()),s:i=>i.getSeconds(),fff:i=>Nc(i.getMilliseconds())};function vl(i,e){e=e||Oc;let n=[],t=/\{([a-z]+)\}|[^{]+/gi,s;for(;s=t.exec(i);)n.push(s[0][0]=="{"?qc[s[1]]:s[0]);return o=>{let a="";for(let u=0;u<n.length;u++)a+=typeof n[u]=="string"?n[u]:n[u](o,e);return a}}var Uc=new Intl.DateTimeFormat().resolvedOptions().timeZone;function Vc(i,e){let n;return e=="UTC"||e=="Etc/UTC"?n=new Date(+i+i.getTimezoneOffset()*6e4):e==Uc?n=i:(n=new Date(i.toLocaleString("en-US",{timeZone:e})),n.setMilliseconds(i.getMilliseconds())),n}var So=i=>i%1==0,is=[1,2,2.5,5],Bc=Pn(10,-32,0,is),ko=Pn(10,0,32,is),jc=ko.filter(So),wi=Bc.concat(ko),yl=`
`,Ao="{YYYY}",Vr=yl+Ao,Co="{M}/{D}",Cn=yl+Co,Zn=Cn+"/{YY}",Eo="{aa}",Wc="{h}:{mm}",Ji=Wc+Eo,Br=yl+Ji,jr=":{ss}",de=null;function Mo(i){let e=i*1e3,n=e*60,t=n*60,s=t*24,o=s*30,a=s*365,d=(i==1?Pn(10,0,3,is).filter(So):Pn(10,-3,0,is)).concat([e,e*5,e*10,e*15,e*30,n,n*5,n*10,n*15,n*30,t,t*2,t*3,t*4,t*6,t*8,t*12,s,s*2,s*3,s*4,s*5,s*6,s*7,s*8,s*9,s*10,s*15,o,o*2,o*3,o*4,o*6,a,a*2,a*5,a*10,a*25,a*50,a*100]),f=[[a,Ao,de,de,de,de,de,de,1],[s*28,"{MMM}",Vr,de,de,de,de,de,1],[s,Co,Vr,de,de,de,de,de,1],[t,"{h}"+Eo,Zn,de,Cn,de,de,de,1],[n,Ji,Zn,de,Cn,de,de,de,1],[e,jr,Zn+" "+Ji,de,Cn+" "+Ji,de,Br,de,1],[i,jr+".{fff}",Zn+" "+Ji,de,Cn+" "+Ji,de,Br,de,1]];function v(m){return(b,y,k,F,H,z)=>{let w=[],M=H>=a,C=H>=o&&H<a,J=m(k),D=ge(J*i,3),X=Qs(J.getFullYear(),M?0:J.getMonth(),C||M?1:J.getDate()),G=ge(X*i,3);if(C||M){let ee=C?H/o:0,j=M?H/a:0,E=D==G?D:ge(Qs(X.getFullYear()+j,X.getMonth()+ee,1)*i,3),Y=new Date(De(E/i)),$=Y.getFullYear(),V=Y.getMonth();for(let O=0;E<=F;O++){let ie=Qs($+j*O,V+ee*O,1),N=ie-m(ge(ie*i,3));E=ge((+ie+N)*i,3),E<=F&&w.push(E)}}else{let ee=H>=s?s:H,j=ut(k)-ut(D),E=G+j+ls(D-G,ee);w.push(E);let Y=m(E),$=Y.getHours()+Y.getMinutes()/n+Y.getSeconds()/t,V=H/t,O=b.axes[y]._space,ie=z/O;for(;E=ge(E+H,i==1?0:3),!(E>F);)if(V>1){let N=ut(ge($+V,6))%24,re=m(E).getHours()-N;re>1&&(re=-1),E-=re*t,$=($+V)%24;let fe=w[w.length-1];ge((E-fe)/H,3)*ie>=.7&&w.push(E)}else w.push(E)}return w}}return[d,f,v]}var[Gc,Kc,Yc]=Mo(1),[Jc,Zc,Qc]=Mo(.001);Pn(2,-53,53,[1]);function Wr(i,e){return i.map(n=>n.map((t,s)=>s==0||s==8||t==null?t:e(s==1||n[8]==0?t:n[1]+t)))}function Gr(i,e){return(n,t,s,o,a)=>{let u=e.find(k=>a>=k[0])||e[e.length-1],d,f,v,m,b,y;return t.map(k=>{let F=i(k),H=F.getFullYear(),z=F.getMonth(),w=F.getDate(),M=F.getHours(),C=F.getMinutes(),J=F.getSeconds(),D=H!=d&&u[2]||z!=f&&u[3]||w!=v&&u[4]||M!=m&&u[5]||C!=b&&u[6]||J!=y&&u[7]||u[1];return d=H,f=z,v=w,m=M,b=C,y=J,D(F)})}}function Xc(i,e){let n=vl(e);return(t,s,o,a,u)=>s.map(d=>n(i(d)))}function Qs(i,e,n){return new Date(i,e,n)}function Kr(i,e){return e(i)}var ep="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Yr(i,e){return(n,t,s,o)=>o==null?dl:e(i(t))}function tp(i,e){let n=i.series[e];return n.width?n.stroke(i,e):n.points.width?n.points.stroke(i,e):null}function ip(i,e){return i.series[e].fill(i,e)}var np={show:!0,live:!0,isolate:!1,mount:_c,markers:{show:!0,width:2,stroke:tp,fill:ip,dash:"solid"},idx:null,idxs:null,values:[]};function sp(i,e){let n=i.cursor.points,t=wt(),s=n.size(i,e);we(t,kn,s),we(t,An,s);let o=s/-2;we(t,"marginLeft",o),we(t,"marginTop",o);let a=n.width(i,e,s);return a&&we(t,"borderWidth",a),t}function lp(i,e){let n=i.series[e].points;return n._fill||n._stroke}function rp(i,e){let n=i.series[e].points;return n._stroke||n._fill}function op(i,e){return i.series[e].points.size}var Xs=[0,0];function ap(i,e,n){return Xs[0]=e,Xs[1]=n,Xs}function Qn(i,e,n,t=!0){return s=>{s.button==0&&(!t||s.target==e)&&n(s)}}function el(i,e,n,t=!0){return s=>{(!t||s.target==e)&&n(s)}}var cp={show:!0,x:!0,y:!0,lock:!1,move:ap,points:{one:!1,show:sp,size:op,width:0,stroke:rp,fill:lp},bind:{mousedown:Qn,mouseup:Qn,click:Qn,dblclick:Qn,mousemove:el,mouseleave:el,mouseenter:el},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(i,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(i,e,n,t,s)=>t-s,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Po={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},xl=Te({},Po,{filter:go}),To=Te({},xl,{size:10}),Fo=Te({},Po,{show:!1}),wl='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Lo="bold "+wl,Do=1.5,Jr={show:!0,scale:"x",stroke:ul,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Lo,side:2,grid:xl,ticks:To,border:Fo,font:wl,lineGap:Do,rotate:0},pp="Value",up="Time",Zr={show:!0,scale:"x",auto:!1,sorted:1,min:me,max:-me,idxs:[]};function dp(i,e,n,t,s){return e.map(o=>o==null?"":gl(o))}function fp(i,e,n,t,s,o,a){let u=[],d=si.get(s)||0;n=a?n:ge(ls(n,s),d);for(let f=n;f<=t;f=ge(f+s,d))u.push(Object.is(f,-0)?0:f);return u}function rl(i,e,n,t,s,o,a){let u=[],d=i.scales[i.axes[e].scale].log,f=d==10?Wt:fo,v=ut(f(n));s=Qi(d,v),d==10&&(s=wi[Tt(s,wi)]);let m=n,b=s*d;d==10&&(b=wi[Tt(b,wi)]);do u.push(m),m=m+s,d==10&&!si.has(m)&&(m=ge(m,si.get(s))),m>=b&&(s=m,b=s*d,d==10&&(b=wi[Tt(b,wi)]));while(m<=t);return u}function hp(i,e,n,t,s,o,a){let d=i.scales[i.axes[e].scale].asinh,f=t>d?rl(i,e,et(d,n),t,s):[d],v=t>=0&&n<=0?[0]:[];return(n<-d?rl(i,e,et(d,-t),-n,s):[d]).reverse().map(b=>-b).concat(v,f)}var Ro=/./,mp=/[12357]/,gp=/[125]/,Qr=/1/,ol=(i,e,n,t)=>i.map((s,o)=>e==4&&s==0||o%t==0&&n.test(s.toExponential()[s<0?1:0])?s:null);function bp(i,e,n,t,s){let o=i.axes[n],a=o.scale,u=i.scales[a],d=i.valToPos,f=o._space,v=d(10,a),m=d(9,a)-v>=f?Ro:d(7,a)-v>=f?mp:d(5,a)-v>=f?gp:Qr;if(m==Qr){let b=Re(d(1,a)-v);if(b<f)return ol(e.slice().reverse(),u.distr,m,_t(f/b)).reverse()}return ol(e,u.distr,m,1)}function vp(i,e,n,t,s){let o=i.axes[n],a=o.scale,u=o._space,d=i.valToPos,f=Re(d(1,a)-d(2,a));return f<u?ol(e.slice().reverse(),3,Ro,_t(u/f)).reverse():e}function yp(i,e,n,t){return t==null?dl:e==null?"":gl(e)}var Xr={show:!0,scale:"y",stroke:ul,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Lo,side:3,grid:xl,ticks:To,border:Fo,font:wl,lineGap:Do,rotate:0};function xp(i,e){let n=3+(i||1)*2;return ge(n*e,3)}function wp(i,e){let{scale:n,idxs:t}=i.series[0],s=i._data[0],o=i.valToPos(s[t[0]],n,!0),a=i.valToPos(s[t[1]],n,!0),u=Re(a-o),d=i.series[e],f=u/(d.points.space*pe);return t[1]-t[0]<=f}var eo={scale:null,auto:!0,sorted:0,min:me,max:-me},zo=(i,e,n,t,s)=>s,to={show:!0,auto:!0,sorted:0,gaps:zo,alpha:1,facets:[Te({},eo,{scale:"x"}),Te({},eo,{scale:"y"})]},io={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:zo,alpha:1,points:{show:wp,filter:null},values:null,min:me,max:-me,idxs:[],path:null,clip:null};function _p(i,e,n,t,s){return n/10}var Io={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},$p=Te({},Io,{time:!1,ori:1}),no={};function Ho(i,e){let n=no[i];return n||(n={key:i,plots:[],sub(t){n.plots.push(t)},unsub(t){n.plots=n.plots.filter(s=>s!=t)},pub(t,s,o,a,u,d,f){for(let v=0;v<n.plots.length;v++)n.plots[v]!=s&&n.plots[v].pub(t,s,o,a,u,d,f)}},i!=null&&(no[i]=n)),n}var tn=1,al=2;function ki(i,e,n){let t=i.mode,s=i.series[e],o=t==2?i._data[e]:i._data,a=i.scales,u=i.bbox,d=o[0],f=t==2?o[1]:o[e],v=t==2?a[s.facets[0].scale]:a[i.series[0].scale],m=t==2?a[s.facets[1].scale]:a[s.scale],b=u.left,y=u.top,k=u.width,F=u.height,H=i.valToPosH,z=i.valToPosV;return v.ori==0?n(s,d,f,v,m,H,z,b,y,k,F,as,sn,ps,No,Uo):n(s,d,f,v,m,z,H,y,b,F,k,cs,ln,Sl,qo,Vo)}function _l(i,e){let n=0,t=0,s=ae(i.bands,bl);for(let o=0;o<s.length;o++){let a=s[o];a.series[0]==e?n=a.dir:a.series[1]==e&&(a.dir==1?t|=1:t|=2)}return[n,t==1?-1:t==2?1:t==3?2:0]}function Sp(i,e,n,t,s){let o=i.mode,a=i.series[e],u=o==2?a.facets[1].scale:a.scale,d=i.scales[u];return s==-1?d.min:s==1?d.max:d.distr==3?d.dir==1?d.min:d.max:0}function Gt(i,e,n,t,s,o){return ki(i,e,(a,u,d,f,v,m,b,y,k,F,H)=>{let z=a.pxRound,w=f.dir*(f.ori==0?1:-1),M=f.ori==0?sn:ln,C,J;w==1?(C=n,J=t):(C=t,J=n);let D=z(m(u[C],f,F,y)),X=z(b(d[C],v,H,k)),G=z(m(u[J],f,F,y)),ee=z(b(o==1?v.max:v.min,v,H,k)),j=new Path2D(s);return M(j,G,ee),M(j,D,ee),M(j,D,X),j})}function os(i,e,n,t,s,o){let a=null;if(i.length>0){a=new Path2D;let u=e==0?ps:Sl,d=n;for(let m=0;m<i.length;m++){let b=i[m];if(b[1]>b[0]){let y=b[0]-d;y>0&&u(a,d,t,y,t+o),d=b[1]}}let f=n+s-d,v=10;f>0&&u(a,d,t-v/2,f,t+o+v)}return a}function kp(i,e,n){let t=i[i.length-1];t&&t[0]==e?t[1]=n:i.push([e,n])}function $l(i,e,n,t,s,o,a){let u=[],d=i.length;for(let f=s==1?n:t;f>=n&&f<=t;f+=s)if(e[f]===null){let m=f,b=f;if(s==1)for(;++f<=t&&e[f]===null;)b=f;else for(;--f>=n&&e[f]===null;)b=f;let y=o(i[m]),k=b==m?y:o(i[b]),F=m-s;y=a<=0&&F>=0&&F<d?o(i[F]):y;let z=b+s;k=a>=0&&z>=0&&z<d?o(i[z]):k,k>=y&&u.push([y,k])}return u}function so(i){return i==0?mo:i==1?De:e=>xi(e,i)}function Oo(i){let e=i==0?as:cs,n=i==0?(s,o,a,u,d,f)=>{s.arcTo(o,a,u,d,f)}:(s,o,a,u,d,f)=>{s.arcTo(a,o,d,u,f)},t=i==0?(s,o,a,u,d)=>{s.rect(o,a,u,d)}:(s,o,a,u,d)=>{s.rect(a,o,d,u)};return(s,o,a,u,d,f=0,v=0)=>{f==0&&v==0?t(s,o,a,u,d):(f=Ft(f,u/2,d/2),v=Ft(v,u/2,d/2),e(s,o+f,a),n(s,o+u,a,o+u,a+d,f),n(s,o+u,a+d,o,a+d,v),n(s,o,a+d,o,a,v),n(s,o,a,o+u,a,f),s.closePath())}}var as=(i,e,n)=>{i.moveTo(e,n)},cs=(i,e,n)=>{i.moveTo(n,e)},sn=(i,e,n)=>{i.lineTo(e,n)},ln=(i,e,n)=>{i.lineTo(n,e)},ps=Oo(0),Sl=Oo(1),No=(i,e,n,t,s,o)=>{i.arc(e,n,t,s,o)},qo=(i,e,n,t,s,o)=>{i.arc(n,e,t,s,o)},Uo=(i,e,n,t,s,o,a)=>{i.bezierCurveTo(e,n,t,s,o,a)},Vo=(i,e,n,t,s,o,a)=>{i.bezierCurveTo(n,e,s,t,a,o)};function Bo(i){return(e,n,t,s,o)=>ki(e,n,(a,u,d,f,v,m,b,y,k,F,H)=>{let{pxRound:z,points:w}=a,M,C;f.ori==0?(M=as,C=No):(M=cs,C=qo);let J=ge(w.width*pe,3),D=(w.size-w.width)/2*pe,X=ge(D*2,3),G=new Path2D,ee=new Path2D,{left:j,top:E,width:Y,height:$}=e.bbox;ps(ee,j-X,E-X,Y+X*2,$+X*2);let V=O=>{if(d[O]!=null){let ie=z(m(u[O],f,F,y)),N=z(b(d[O],v,H,k));M(G,ie+D,N),C(G,ie,N,D,0,Xn*2)}};if(o)o.forEach(V);else for(let O=t;O<=s;O++)V(O);return{stroke:J>0?G:null,fill:G,clip:ee,flags:tn|al}})}function jo(i){return(e,n,t,s,o,a)=>{t!=s&&(o!=t&&a!=t&&i(e,n,t),o!=s&&a!=s&&i(e,n,s),i(e,n,a))}}var Ap=jo(sn),Cp=jo(ln);function Wo(i){let e=ae(i?.alignGaps,0);return(n,t,s,o)=>ki(n,t,(a,u,d,f,v,m,b,y,k,F,H)=>{[s,o]=ns(d,s,o);let z=a.pxRound,w=$=>z(m($,f,F,y)),M=$=>z(b($,v,H,k)),C,J;f.ori==0?(C=sn,J=Ap):(C=ln,J=Cp);let D=f.dir*(f.ori==0?1:-1),X={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:tn},G=X.stroke,ee=!1;if(o-s>=F*4){let $=q=>n.posToVal(q,f.key,!0),V=null,O=null,ie,N,tt,_e=w(u[D==1?s:o]),re=w(u[s]),fe=w(u[o]),te=$(D==1?re+1:fe-1);for(let q=D==1?s:o;q>=s&&q<=o;q+=D){let Fe=u[q],$e=(D==1?Fe<te:Fe>te)?_e:w(Fe),ue=d[q];$e==_e?ue!=null?(N=ue,V==null?(C(G,$e,M(N)),ie=V=O=N):N<V?V=N:N>O&&(O=N)):ue===null&&(ee=!0):(V!=null&&J(G,_e,M(V),M(O),M(ie),M(N)),ue!=null?(N=ue,C(G,$e,M(N)),V=O=ie=N):(V=O=null,ue===null&&(ee=!0)),_e=$e,te=$(_e+D))}V!=null&&V!=O&&tt!=_e&&J(G,_e,M(V),M(O),M(ie),M(N))}else for(let $=D==1?s:o;$>=s&&$<=o;$+=D){let V=d[$];V===null?ee=!0:V!=null&&C(G,w(u[$]),M(V))}let[E,Y]=_l(n,t);if(a.fill!=null||E!=0){let $=X.fill=new Path2D(G),V=a.fillTo(n,t,a.min,a.max,E),O=M(V),ie=w(u[s]),N=w(u[o]);D==-1&&([N,ie]=[ie,N]),C($,N,O),C($,ie,O)}if(!a.spanGaps){let $=[];ee&&$.push(...$l(u,d,s,o,D,w,e)),X.gaps=$=a.gaps(n,t,s,o,$),X.clip=os($,f.ori,y,k,F,H)}return Y!=0&&(X.band=Y==2?[Gt(n,t,s,o,G,-1),Gt(n,t,s,o,G,1)]:Gt(n,t,s,o,G,Y)),X})}function Ep(i){let e=ae(i.align,1),n=ae(i.ascDesc,!1),t=ae(i.alignGaps,0),s=ae(i.extend,!1);return(o,a,u,d)=>ki(o,a,(f,v,m,b,y,k,F,H,z,w,M)=>{[u,d]=ns(m,u,d);let C=f.pxRound,{left:J,width:D}=o.bbox,X=re=>C(k(re,b,w,H)),G=re=>C(F(re,y,M,z)),ee=b.ori==0?sn:ln,j={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:tn},E=j.stroke,Y=b.dir*(b.ori==0?1:-1),$=G(m[Y==1?u:d]),V=X(v[Y==1?u:d]),O=V,ie=V;s&&e==-1&&(ie=J,ee(E,ie,$)),ee(E,V,$);for(let re=Y==1?u:d;re>=u&&re<=d;re+=Y){let fe=m[re];if(fe==null)continue;let te=X(v[re]),q=G(fe);e==1?ee(E,te,$):ee(E,O,q),ee(E,te,q),$=q,O=te}let N=O;s&&e==1&&(N=J+D,ee(E,N,$));let[tt,_e]=_l(o,a);if(f.fill!=null||tt!=0){let re=j.fill=new Path2D(E),fe=f.fillTo(o,a,f.min,f.max,tt),te=G(fe);ee(re,N,te),ee(re,ie,te)}if(!f.spanGaps){let re=[];re.push(...$l(v,m,u,d,Y,X,t));let fe=f.width*pe/2,te=n||e==1?fe:-fe,q=n||e==-1?-fe:fe;re.forEach(Fe=>{Fe[0]+=te,Fe[1]+=q}),j.gaps=re=f.gaps(o,a,u,d,re),j.clip=os(re,b.ori,H,z,w,M)}return _e!=0&&(j.band=_e==2?[Gt(o,a,u,d,E,-1),Gt(o,a,u,d,E,1)]:Gt(o,a,u,d,E,_e)),j})}function lo(i,e,n,t,s,o,a=me){if(i.length>1){let u=null;for(let d=0,f=1/0;d<i.length;d++)if(e[d]!==void 0){if(u!=null){let v=Re(i[d]-i[u]);v<f&&(f=v,a=Re(n(i[d],t,s,o)-n(i[u],t,s,o)))}u=d}}return a}function Mp(i){i=i||Mn;let e=ae(i.size,[.6,me,1]),n=i.align||0,t=i.gap||0,s=i.radius;s=s==null?[0,0]:typeof s=="number"?[s,0]:s;let o=le(s),a=1-e[0],u=ae(e[1],me),d=ae(e[2],1),f=ae(i.disp,Mn),v=ae(i.each,y=>{}),{fill:m,stroke:b}=f;return(y,k,F,H)=>ki(y,k,(z,w,M,C,J,D,X,G,ee,j,E)=>{let Y=z.pxRound,$=n,V=t*pe,O=u*pe,ie=d*pe,N,tt;C.ori==0?[N,tt]=o(y,k):[tt,N]=o(y,k);let _e=C.dir*(C.ori==0?1:-1),re=C.ori==0?ps:Sl,fe=C.ori==0?v:(L,be,Le,Mi,ai,Dt,ci)=>{v(L,be,Le,ai,Mi,ci,Dt)},te=ae(y.bands,bl).find(L=>L.series[0]==k),q=te!=null?te.dir:0,Fe=z.fillTo(y,k,z.min,z.max,q),Ye=Y(X(Fe,J,E,ee)),$e,ue,$t,st=j,Ae=Y(z.width*pe),Lt=!1,Ut=null,ht=null,Yt=null,Ai=null;m!=null&&(Ae==0||b!=null)&&(Lt=!0,Ut=m.values(y,k,F,H),ht=new Map,new Set(Ut).forEach(L=>{L!=null&&ht.set(L,new Path2D)}),Ae>0&&(Yt=b.values(y,k,F,H),Ai=new Map,new Set(Yt).forEach(L=>{L!=null&&Ai.set(L,new Path2D)})));let{x0:Ci,size:on}=f;if(Ci!=null&&on!=null){$=1,w=Ci.values(y,k,F,H),Ci.unit==2&&(w=w.map(Le=>y.posToVal(G+Le*j,C.key,!0)));let L=on.values(y,k,F,H);on.unit==2?ue=L[0]*j:ue=D(L[0],C,j,G)-D(0,C,j,G),st=lo(w,M,D,C,j,G,st),$t=st-ue+V}else st=lo(w,M,D,C,j,G,st),$t=st*a+V,ue=st-$t;$t<1&&($t=0),Ae>=ue/2&&(Ae=0),$t<5&&(Y=mo);let Tn=$t>0,ri=st-$t-(Tn?Ae:0);ue=Y(ll(ri,ie,O)),$e=($==0?ue/2:$==_e?0:ue)-$*_e*(($==0?V/2:0)+(Tn?Ae/2:0));let Je={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Ei=Lt?null:new Path2D,Vt=null;if(te!=null)Vt=y.data[te.series[1]];else{let{y0:L,y1:be}=f;L!=null&&be!=null&&(M=be.values(y,k,F,H),Vt=L.values(y,k,F,H))}let oi=N*ue,Q=tt*ue;for(let L=_e==1?F:H;L>=F&&L<=H;L+=_e){let be=M[L];if(be==null)continue;if(Vt!=null){let it=Vt[L]??0;if(be-it==0)continue;Ye=X(it,J,E,ee)}let Le=C.distr!=2||f!=null?w[L]:L,Mi=D(Le,C,j,G),ai=X(ae(be,Fe),J,E,ee),Dt=Y(Mi-$e),ci=Y(et(ai,Ye)),lt=Y(Ft(ai,Ye)),mt=ci-lt;if(be!=null){let it=be<0?Q:oi,St=be<0?oi:Q;Lt?(Ae>0&&Yt[L]!=null&&re(Ai.get(Yt[L]),Dt,lt+ut(Ae/2),ue,et(0,mt-Ae),it,St),Ut[L]!=null&&re(ht.get(Ut[L]),Dt,lt+ut(Ae/2),ue,et(0,mt-Ae),it,St)):re(Ei,Dt,lt+ut(Ae/2),ue,et(0,mt-Ae),it,St),fe(y,k,L,Dt-Ae/2,lt,ue+Ae,mt)}}return Ae>0?Je.stroke=Lt?Ai:Ei:Lt||(Je._fill=z.width==0?z._fill:z._stroke??z._fill,Je.width=0),Je.fill=Lt?ht:Ei,Je})}function Pp(i,e){let n=ae(e?.alignGaps,0);return(t,s,o,a)=>ki(t,s,(u,d,f,v,m,b,y,k,F,H,z)=>{[o,a]=ns(f,o,a);let w=u.pxRound,M=N=>w(b(N,v,H,k)),C=N=>w(y(N,m,z,F)),J,D,X;v.ori==0?(J=as,X=sn,D=Uo):(J=cs,X=ln,D=Vo);let G=v.dir*(v.ori==0?1:-1),ee=M(d[G==1?o:a]),j=ee,E=[],Y=[];for(let N=G==1?o:a;N>=o&&N<=a;N+=G)if(f[N]!=null){let _e=d[N],re=M(_e);E.push(j=re),Y.push(C(f[N]))}let $={stroke:i(E,Y,J,X,D,w),fill:null,clip:null,band:null,gaps:null,flags:tn},V=$.stroke,[O,ie]=_l(t,s);if(u.fill!=null||O!=0){let N=$.fill=new Path2D(V),tt=u.fillTo(t,s,u.min,u.max,O),_e=C(tt);X(N,j,_e),X(N,ee,_e)}if(!u.spanGaps){let N=[];N.push(...$l(d,f,o,a,G,M,n)),$.gaps=N=u.gaps(t,s,o,a,N),$.clip=os(N,v.ori,k,F,H,z)}return ie!=0&&($.band=ie==2?[Gt(t,s,o,a,V,-1),Gt(t,s,o,a,V,1)]:Gt(t,s,o,a,V,ie)),$})}function Tp(i){return Pp(Fp,i)}function Fp(i,e,n,t,s,o){let a=i.length;if(a<2)return null;let u=new Path2D;if(n(u,i[0],e[0]),a==2)t(u,i[1],e[1]);else{let d=Array(a),f=Array(a-1),v=Array(a-1),m=Array(a-1);for(let b=0;b<a-1;b++)v[b]=e[b+1]-e[b],m[b]=i[b+1]-i[b],f[b]=v[b]/m[b];d[0]=f[0];for(let b=1;b<a-1;b++)f[b]===0||f[b-1]===0||f[b-1]>0!=f[b]>0?d[b]=0:(d[b]=3*(m[b-1]+m[b])/((2*m[b]+m[b-1])/f[b-1]+(m[b]+2*m[b-1])/f[b]),isFinite(d[b])||(d[b]=0));d[a-1]=f[a-2];for(let b=0;b<a-1;b++)s(u,i[b]+m[b]/3,e[b]+d[b]*m[b]/3,i[b+1]-m[b]/3,e[b+1]-d[b+1]*m[b]/3,i[b+1],e[b+1])}return u}var cl=new Set;function ro(){for(let i of cl)i.syncRect(!0)}nn&&($i(dc,Zi,ro),$i(fc,Zi,ro,!0),$i(es,Zi,()=>{Ve.pxRatio=pe}));var Lp=Wo(),Dp=Bo();function oo(i,e,n,t){return(t?[i[0],i[1]].concat(i.slice(2)):[i[0]].concat(i.slice(1))).map((o,a)=>pl(o,a,e,n))}function Rp(i,e){return i.map((n,t)=>t==0?{}:Te({},e,n))}function pl(i,e,n,t){return Te({},e==0?n:t,i)}function Go(i,e,n){return e==null?Xi:[e,n]}var zp=Go;function Ip(i,e,n){return e==null?Xi:ts(e,n,ml,!0)}function Ko(i,e,n,t){return e==null?Xi:ss(e,n,i.scales[t].log,!1)}var Hp=Ko;function Yo(i,e,n,t){return e==null?Xi:hl(e,n,i.scales[t].log,!1)}var Op=Yo;function Np(i,e,n,t,s){let o=et(Or(i),Or(e)),a=e-i,u=Tt(s/t*a,n);do{let d=n[u],f=t*d/a;if(f>=s&&o+(d<5?si.get(d):0)<=17)return[d,f]}while(++u<n.length);return[0,0]}function ao(i){let e,n;return i=i.replace(/(\d+)px/,(t,s)=>(e=De((n=+s)*pe))+"px"),[i,e,n]}function qp(i){i.show&&[i.font,i.labelFont].forEach(e=>{let n=ge(e[2]*pe,1);e[0]=e[0].replace(/[0-9.]+px/,n+"px"),e[1]=n})}function Ve(i,e,n){let t={mode:ae(i.mode,1)},s=t.mode;function o(l,r,c,p){let h=r.valToPct(l);return p+c*(r.dir==-1?1-h:h)}function a(l,r,c,p){let h=r.valToPct(l);return p+c*(r.dir==-1?h:1-h)}function u(l,r,c,p){return r.ori==0?o(l,r,c,p):a(l,r,c,p)}t.valToPosH=o,t.valToPosV=a;let d=!1;t.status=0;let f=t.root=wt(Ka);if(i.id!=null&&(f.id=i.id),pt(f,i.class),i.title){let l=wt(Za,f);l.textContent=i.title}let v=Pt("canvas"),m=t.ctx=v.getContext("2d"),b=wt(Qa,f);$i("click",b,l=>{l.target===k&&(ve!=Ni||Se!=qi)&&je.click(t,l)},!0);let y=t.under=wt(Xa,b);b.appendChild(v);let k=t.over=wt(ec,b);i=en(i);let F=+ae(i.pxAlign,1),H=so(F);(i.plugins||[]).forEach(l=>{l.opts&&(i=l.opts(t,i)||i)});let z=i.ms||.001,w=t.series=s==1?oo(i.series||[],Zr,io,!1):Rp(i.series||[null],to),M=t.axes=oo(i.axes||[],Jr,Xr,!0),C=t.scales={},J=t.bands=i.bands||[];J.forEach(l=>{l.fill=le(l.fill||null),l.dir=ae(l.dir,-1)});let D=s==2?w[1].facets[0].scale:w[0].scale,X={axes:da,series:oa},G=(i.drawOrder||["axes","series"]).map(l=>X[l]);function ee(l){let r=l.distr==3?c=>Wt(c>0?c:l.clamp(t,c,l.min,l.max,l.key)):l.distr==4?c=>Zs(c,l.asinh):l.distr==100?c=>l.fwd(c):c=>c;return c=>{let p=r(c),{_min:h,_max:g}=l,x=g-h;return(p-h)/x}}function j(l){let r=C[l];if(r==null){let c=(i.scales||Mn)[l]||Mn;if(c.from!=null){j(c.from);let p=Te({},C[c.from],c,{key:l});p.valToPct=ee(p),C[l]=p}else{r=C[l]=Te({},l==D?Io:$p,c),r.key=l;let p=r.time,h=r.range,g=ni(h);if((l!=D||s==2&&!p)&&(g&&(h[0]==null||h[1]==null)&&(h={min:h[0]==null?zr:{mode:1,hard:h[0],soft:h[0]},max:h[1]==null?zr:{mode:1,hard:h[1],soft:h[1]}},g=!1),!g&&rs(h))){let x=h;h=(_,S,P)=>S==null?Xi:ts(S,P,x)}r.range=le(h||(p?zp:l==D?r.distr==3?Hp:r.distr==4?Op:Go:r.distr==3?Ko:r.distr==4?Yo:Ip)),r.auto=le(g?!1:r.auto),r.clamp=le(r.clamp||_p),r._min=r._max=null,r.valToPct=ee(r)}}}j("x"),j("y"),s==1&&w.forEach(l=>{j(l.scale)}),M.forEach(l=>{j(l.scale)});for(let l in i.scales)j(l);let E=C[D],Y=E.distr,$,V;E.ori==0?(pt(f,Ya),$=o,V=a):(pt(f,Ja),$=a,V=o);let O={};for(let l in C){let r=C[l];(r.min!=null||r.max!=null)&&(O[l]={min:r.min,max:r.max},r.min=r.max=null)}let ie=i.tzDate||(l=>new Date(De(l/z))),N=i.fmtDate||vl,tt=z==1?Yc(ie):Qc(ie),_e=Gr(ie,Wr(z==1?Kc:Zc,N)),re=Yr(ie,Kr(ep,N)),fe=[],te=t.legend=Te({},np,i.legend),q=t.cursor=Te({},cp,{drag:{y:s==2}},i.cursor),Fe=te.show,Ye=q.show,$e=te.markers;te.idxs=fe,$e.width=le($e.width),$e.dash=le($e.dash),$e.stroke=le($e.stroke),$e.fill=le($e.fill);let ue,$t,st,Ae=[],Lt=[],Ut,ht=!1,Yt={};if(te.live){let l=w[1]?w[1].values:null;ht=l!=null,Ut=ht?l(t,1,0):{_:0};for(let r in Ut)Yt[r]=dl}if(Fe)if(ue=Pt("table",rc,f),st=Pt("tbody",null,ue),te.mount(t,ue),ht){$t=Pt("thead",null,ue,st);let l=Pt("tr",null,$t);Pt("th",null,l);for(var Ai in Ut)Pt("th",$r,l).textContent=Ai}else pt(ue,ac),te.live&&pt(ue,oc);let Ci={show:!0},on={show:!1};function Tn(l,r){if(r==0&&(ht||!te.live||s==2))return Xi;let c=[],p=Pt("tr",cc,st,st.childNodes[r]);pt(p,l.class),l.show||pt(p,_i);let h=Pt("th",null,p);if($e.show){let _=wt(pc,h);if(r>0){let S=$e.width(t,r);S&&(_.style.border=S+"px "+$e.dash(t,r)+" "+$e.stroke(t,r)),_.style.background=$e.fill(t,r)}}let g=wt($r,h);l.label instanceof HTMLElement?g.appendChild(l.label):g.textContent=l.label,r>0&&($e.show||(g.style.color=l.width>0?$e.stroke(t,r):$e.fill(t,r)),Je("click",h,_=>{if(q._lock)return;ui(_);let S=w.indexOf(l);if((_.ctrlKey||_.metaKey)!=te.isolate){let P=w.some((T,R)=>R>0&&R!=S&&T.show);w.forEach((T,R)=>{R>0&&zt(R,P?R==S?Ci:on:Ci,!0,Pe.setSeries)})}else zt(S,{show:!l.show},!0,Pe.setSeries)},!1),Ti&&Je(Cr,h,_=>{q._lock||(ui(_),zt(w.indexOf(l),Vi,!0,Pe.setSeries))},!1));for(var x in Ut){let _=Pt("td",uc,p);_.textContent="--",c.push(_)}return[p,c]}let ri=new Map;function Je(l,r,c,p=!0){let h=ri.get(r)||{},g=q.bind[l](t,r,c,p);g&&($i(l,r,h[l]=g),ri.set(r,h))}function Ei(l,r,c){let p=ri.get(r)||{};for(let h in p)(l==null||h==l)&&(sl(h,r,p[h]),delete p[h]);l==null&&ri.delete(r)}let Vt=0,oi=0,Q=0,L=0,be=0,Le=0,Mi=be,ai=Le,Dt=Q,ci=L,lt=0,mt=0,it=0,St=0;t.bbox={};let us=!1,Fn=!1,Pi=!1,pi=!1,Ln=!1,gt=!1;function ds(l,r,c){(c||l!=t.width||r!=t.height)&&kl(l,r),zi(!1),Pi=!0,Fn=!0,Ii()}function kl(l,r){t.width=Vt=Q=l,t.height=oi=L=r,be=Le=0,ea(),ta();let c=t.bbox;lt=c.left=xi(be*pe,.5),mt=c.top=xi(Le*pe,.5),it=c.width=xi(Q*pe,.5),St=c.height=xi(L*pe,.5)}let Zo=3;function Qo(){let l=!1,r=0;for(;!l;){r++;let c=pa(r),p=ua(r);l=r==Zo||c&&p,l||(kl(t.width,t.height),Fn=!0)}}function Xo({width:l,height:r}){ds(l,r)}t.setSize=Xo;function ea(){let l=!1,r=!1,c=!1,p=!1;M.forEach((h,g)=>{if(h.show&&h._show){let{side:x,_size:_}=h,S=x%2,P=h.label!=null?h.labelSize:0,T=_+P;T>0&&(S?(Q-=T,x==3?(be+=T,p=!0):c=!0):(L-=T,x==0?(Le+=T,l=!0):r=!0))}}),di[0]=l,di[1]=c,di[2]=r,di[3]=p,Q-=Jt[1]+Jt[3],be+=Jt[3],L-=Jt[2]+Jt[0],Le+=Jt[0]}function ta(){let l=be+Q,r=Le+L,c=be,p=Le;function h(g,x){switch(g){case 1:return l+=x,l-x;case 2:return r+=x,r-x;case 3:return c-=x,c+x;case 0:return p-=x,p+x}}M.forEach((g,x)=>{if(g.show&&g._show){let _=g.side;g._pos=h(_,g._size),g.label!=null&&(g._lpos=h(_,g.labelSize))}})}if(q.dataIdx==null){let l=q.hover,r=l.skip=new Set(l.skip??[]);r.add(void 0);let c=l.prox=le(l.prox),p=l.bias??=0;q.dataIdx=(h,g,x,_)=>{if(g==0)return x;let S=x,P=c(h,g,x,_)??me,T=P>=0&&P<me,R=E.ori==0?Q:L,W=q.left,ce=e[0],oe=e[g];if(r.has(oe[x])){S=null;let ne=null,B=null,U;if(p==0||p==-1)for(U=x;ne==null&&U-- >0;)r.has(oe[U])||(ne=U);if(p==0||p==1)for(U=x;B==null&&U++<oe.length;)r.has(oe[U])||(B=U);if(ne!=null||B!=null)if(T){let xe=ne==null?-1/0:$(ce[ne],E,R,0),Ce=B==null?1/0:$(ce[B],E,R,0),qe=W-xe,he=Ce-W;qe<=he?qe<=P&&(S=ne):he<=P&&(S=B)}else S=B==null?ne:ne==null?B:x-ne<=B-x?ne:B}else T&&Re(W-$(ce[x],E,R,0))>P&&(S=null);return S}}let ui=l=>{q.event=l};q.idxs=fe,q._lock=!1;let Ge=q.points;Ge.show=le(Ge.show),Ge.size=le(Ge.size),Ge.stroke=le(Ge.stroke),Ge.width=le(Ge.width),Ge.fill=le(Ge.fill);let Rt=t.focus=Te({},i.focus||{alpha:.3},q.focus),Ti=Rt.prox>=0,Fi=Ti&&Ge.one,bt=[],Li=[],Di=[];function Al(l,r){let c=Ge.show(t,r);if(c instanceof HTMLElement)return pt(c,lc),pt(c,l.class),qt(c,-10,-10,Q,L),k.insertBefore(c,bt[r]),c}function Cl(l,r){if(s==1||r>0){let c=s==1&&C[l.scale].time,p=l.value;l.value=c?Ur(p)?Yr(ie,Kr(p,N)):p||re:p||yp,l.label=l.label||(c?up:pp)}if(Fi||r>0){l.width=l.width==null?1:l.width,l.paths=l.paths||Lp||$c,l.fillTo=le(l.fillTo||Sp),l.pxAlign=+ae(l.pxAlign,F),l.pxRound=so(l.pxAlign),l.stroke=le(l.stroke||null),l.fill=le(l.fill||null),l._stroke=l._fill=l._paths=l._focus=null;let c=xp(et(1,l.width),1),p=l.points=Te({},{size:c,width:et(1,c*.2),stroke:l.stroke,space:c*2,paths:Dp,_stroke:null,_fill:null},l.points);p.show=le(p.show),p.filter=le(p.filter),p.fill=le(p.fill),p.stroke=le(p.stroke),p.paths=le(p.paths),p.pxAlign=l.pxAlign}if(Fe){let c=Tn(l,r);Ae.splice(r,0,c[0]),Lt.splice(r,0,c[1]),te.values.push(null)}if(Ye){fe.splice(r,0,null);let c=null;Fi?r==0&&(c=Al(l,r)):r>0&&(c=Al(l,r)),bt.splice(r,0,c),Li.splice(r,0,0),Di.splice(r,0,0)}Ne("addSeries",r)}function ia(l,r){r=r??w.length,l=s==1?pl(l,r,Zr,io):pl(l,r,{},to),w.splice(r,0,l),Cl(w[r],r)}t.addSeries=ia;function na(l){if(w.splice(l,1),Fe){te.values.splice(l,1),Lt.splice(l,1);let r=Ae.splice(l,1)[0];Ei(null,r.firstChild),r.remove()}Ye&&(fe.splice(l,1),bt.splice(l,1)[0].remove(),Li.splice(l,1),Di.splice(l,1)),Ne("delSeries",l)}t.delSeries=na;let di=[!1,!1,!1,!1];function sa(l,r){if(l._show=l.show,l.show){let c=l.side%2,p=C[l.scale];p==null&&(l.scale=c?w[1].scale:D,p=C[l.scale]);let h=p.time;l.size=le(l.size),l.space=le(l.space),l.rotate=le(l.rotate),ni(l.incrs)&&l.incrs.forEach(x=>{!si.has(x)&&si.set(x,vo(x))}),l.incrs=le(l.incrs||(p.distr==2?jc:h?z==1?Gc:Jc:wi)),l.splits=le(l.splits||(h&&p.distr==1?tt:p.distr==3?rl:p.distr==4?hp:fp)),l.stroke=le(l.stroke),l.grid.stroke=le(l.grid.stroke),l.ticks.stroke=le(l.ticks.stroke),l.border.stroke=le(l.border.stroke);let g=l.values;l.values=ni(g)&&!ni(g[0])?le(g):h?ni(g)?Gr(ie,Wr(g,N)):Ur(g)?Xc(ie,g):g||_e:g||dp,l.filter=le(l.filter||(p.distr>=3&&p.log==10?bp:p.distr==3&&p.log==2?vp:go)),l.font=ao(l.font),l.labelFont=ao(l.labelFont),l._size=l.size(t,null,r,0),l._space=l._rotate=l._incrs=l._found=l._splits=l._values=null,l._size>0&&(di[r]=!0,l._el=wt(tc,b))}}function an(l,r,c,p){let[h,g,x,_]=c,S=r%2,P=0;return S==0&&(_||g)&&(P=r==0&&!h||r==2&&!x?De(Jr.size/3):0),S==1&&(h||x)&&(P=r==1&&!g||r==3&&!_?De(Xr.size/2):0),P}let El=t.padding=(i.padding||[an,an,an,an]).map(l=>le(ae(l,an))),Jt=t._padding=El.map((l,r)=>l(t,r,di,0)),Be,ze=null,Ie=null,Dn=s==1?w[0].idxs:null,kt=null,cn=!1;function Ml(l,r){if(e=l??[],t.data=t._data=e,s==2){Be=0;for(let c=1;c<w.length;c++)Be+=e[c][0].length}else{e.length==0&&(t.data=t._data=e=[[]]),kt=e[0],Be=kt.length;let c=e;if(Y==2){c=e.slice();let p=c[0]=Array(Be);for(let h=0;h<Be;h++)p[h]=h}t._data=e=c}if(zi(!0),Ne("setData"),Y==2&&(Pi=!0),r!==!1){let c=E;c.auto(t,cn)?fs():Qt(D,c.min,c.max),pi=pi||q.left>=0,gt=!0,Ii()}}t.setData=Ml;function fs(){cn=!0;let l,r;s==1&&(Be>0?(ze=Dn[0]=0,Ie=Dn[1]=Be-1,l=e[0][ze],r=e[0][Ie],Y==2?(l=ze,r=Ie):l==r&&(Y==3?[l,r]=ss(l,l,E.log,!1):Y==4?[l,r]=hl(l,l,E.log,!1):E.time?r=l+De(86400/z):[l,r]=ts(l,r,ml,!0))):(ze=Dn[0]=l=null,Ie=Dn[1]=r=null)),Qt(D,l,r)}let Rn,Ri,hs,ms,gs,bs,vs,ys,xs,nt;function Pl(l,r,c,p,h,g){l??=kr,c??=bl,p??="butt",h??=kr,g??="round",l!=Rn&&(m.strokeStyle=Rn=l),h!=Ri&&(m.fillStyle=Ri=h),r!=hs&&(m.lineWidth=hs=r),g!=gs&&(m.lineJoin=gs=g),p!=bs&&(m.lineCap=bs=p),c!=ms&&m.setLineDash(ms=c)}function Tl(l,r,c,p){r!=Ri&&(m.fillStyle=Ri=r),l!=vs&&(m.font=vs=l),c!=ys&&(m.textAlign=ys=c),p!=xs&&(m.textBaseline=xs=p)}function ws(l,r,c,p,h=0){if(p.length>0&&l.auto(t,cn)&&(r==null||r.min==null)){let g=ae(ze,0),x=ae(Ie,p.length-1),_=c.min==null?bc(p,g,x,h,l.distr==3):[c.min,c.max];l.min=Ft(l.min,c.min=_[0]),l.max=et(l.max,c.max=_[1])}}let Fl={min:null,max:null};function la(){for(let p in C){let h=C[p];O[p]==null&&(h.min==null||O[D]!=null&&h.auto(t,cn))&&(O[p]=Fl)}for(let p in C){let h=C[p];O[p]==null&&h.from!=null&&O[h.from]!=null&&(O[p]=Fl)}O[D]!=null&&zi(!0);let l={};for(let p in O){let h=O[p];if(h!=null){let g=l[p]=en(C[p],Ac);if(h.min!=null)Te(g,h);else if(p!=D||s==2)if(Be==0&&g.from==null){let x=g.range(t,null,null,p);g.min=x[0],g.max=x[1]}else g.min=me,g.max=-me}}if(Be>0){w.forEach((p,h)=>{if(s==1){let g=p.scale,x=O[g];if(x==null)return;let _=l[g];if(h==0){let S=_.range(t,_.min,_.max,g);_.min=S[0],_.max=S[1],ze=Tt(_.min,e[0]),Ie=Tt(_.max,e[0]),Ie-ze>1&&(e[0][ze]<_.min&&ze++,e[0][Ie]>_.max&&Ie--),p.min=kt[ze],p.max=kt[Ie]}else p.show&&p.auto&&ws(_,x,p,e[h],p.sorted);p.idxs[0]=ze,p.idxs[1]=Ie}else if(h>0&&p.show&&p.auto){let[g,x]=p.facets,_=g.scale,S=x.scale,[P,T]=e[h],R=l[_],W=l[S];R!=null&&ws(R,O[_],g,P,g.sorted),W!=null&&ws(W,O[S],x,T,x.sorted),p.min=x.min,p.max=x.max}});for(let p in l){let h=l[p],g=O[p];if(h.from==null&&(g==null||g.min==null)){let x=h.range(t,h.min==me?null:h.min,h.max==-me?null:h.max,p);h.min=x[0],h.max=x[1]}}}for(let p in l){let h=l[p];if(h.from!=null){let g=l[h.from];if(g.min==null)h.min=h.max=null;else{let x=h.range(t,g.min,g.max,p);h.min=x[0],h.max=x[1]}}}let r={},c=!1;for(let p in l){let h=l[p],g=C[p];if(g.min!=h.min||g.max!=h.max){g.min=h.min,g.max=h.max;let x=g.distr;g._min=x==3?Wt(g.min):x==4?Zs(g.min,g.asinh):x==100?g.fwd(g.min):g.min,g._max=x==3?Wt(g.max):x==4?Zs(g.max,g.asinh):x==100?g.fwd(g.max):g.max,r[p]=c=!0}}if(c){w.forEach((p,h)=>{s==2?h>0&&r.y&&(p._paths=null):r[p.scale]&&(p._paths=null)});for(let p in r)Pi=!0,Ne("setScale",p);Ye&&q.left>=0&&(pi=gt=!0)}for(let p in O)O[p]=null}function ra(l){let r=ll(ze-1,0,Be-1),c=ll(Ie+1,0,Be-1);for(;l[r]==null&&r>0;)r--;for(;l[c]==null&&c<Be-1;)c++;return[r,c]}function oa(){if(Be>0){let l=w.some(r=>r._focus)&&nt!=Rt.alpha;l&&(m.globalAlpha=nt=Rt.alpha),w.forEach((r,c)=>{if(c>0&&r.show&&(Ll(c,!1),Ll(c,!0),r._paths==null)){let p=nt;nt!=r.alpha&&(m.globalAlpha=nt=r.alpha);let h=s==2?[0,e[c][0].length-1]:ra(e[c]);r._paths=r.paths(t,c,h[0],h[1]),nt!=p&&(m.globalAlpha=nt=p)}}),w.forEach((r,c)=>{if(c>0&&r.show){let p=nt;nt!=r.alpha&&(m.globalAlpha=nt=r.alpha),r._paths!=null&&Dl(c,!1);{let h=r._paths!=null?r._paths.gaps:null,g=r.points.show(t,c,ze,Ie,h),x=r.points.filter(t,c,g,h);(g||x)&&(r.points._paths=r.points.paths(t,c,ze,Ie,x),Dl(c,!0))}nt!=p&&(m.globalAlpha=nt=p),Ne("drawSeries",c)}}),l&&(m.globalAlpha=nt=1)}}function Ll(l,r){let c=r?w[l].points:w[l];c._stroke=c.stroke(t,l),c._fill=c.fill(t,l)}function Dl(l,r){let c=r?w[l].points:w[l],{stroke:p,fill:h,clip:g,flags:x,_stroke:_=c._stroke,_fill:S=c._fill,_width:P=c.width}=c._paths;P=ge(P*pe,3);let T=null,R=P%2/2;r&&S==null&&(S=P>0?"#fff":_);let W=c.pxAlign==1&&R>0;if(W&&m.translate(R,R),!r){let ce=lt-P/2,oe=mt-P/2,ne=it+P,B=St+P;T=new Path2D,T.rect(ce,oe,ne,B)}r?_s(_,P,c.dash,c.cap,S,p,h,x,g):aa(l,_,P,c.dash,c.cap,S,p,h,x,T,g),W&&m.translate(-R,-R)}function aa(l,r,c,p,h,g,x,_,S,P,T){let R=!1;S!=0&&J.forEach((W,ce)=>{if(W.series[0]==l){let oe=w[W.series[1]],ne=e[W.series[1]],B=(oe._paths||Mn).band;ni(B)&&(B=W.dir==1?B[0]:B[1]);let U,xe=null;oe.show&&B&&yc(ne,ze,Ie)?(xe=W.fill(t,ce)||g,U=oe._paths.clip):B=null,_s(r,c,p,h,xe,x,_,S,P,T,U,B),R=!0}}),R||_s(r,c,p,h,g,x,_,S,P,T)}let Rl=tn|al;function _s(l,r,c,p,h,g,x,_,S,P,T,R){Pl(l,r,c,p,h),(S||P||R)&&(m.save(),S&&m.clip(S),P&&m.clip(P)),R?(_&Rl)==Rl?(m.clip(R),T&&m.clip(T),In(h,x),zn(l,g,r)):_&al?(In(h,x),m.clip(R),zn(l,g,r)):_&tn&&(m.save(),m.clip(R),T&&m.clip(T),In(h,x),m.restore(),zn(l,g,r)):(In(h,x),zn(l,g,r)),(S||P||R)&&m.restore()}function zn(l,r,c){c>0&&(r instanceof Map?r.forEach((p,h)=>{m.strokeStyle=Rn=h,m.stroke(p)}):r!=null&&l&&m.stroke(r))}function In(l,r){r instanceof Map?r.forEach((c,p)=>{m.fillStyle=Ri=p,m.fill(c)}):r!=null&&l&&m.fill(r)}function ca(l,r,c,p){let h=M[l],g;if(p<=0)g=[0,0];else{let x=h._space=h.space(t,l,r,c,p),_=h._incrs=h.incrs(t,l,r,c,p,x);g=Np(r,c,_,p,x)}return h._found=g}function $s(l,r,c,p,h,g,x,_,S,P){let T=x%2/2;F==1&&m.translate(T,T),Pl(_,x,S,P,_),m.beginPath();let R,W,ce,oe,ne=h+(p==0||p==3?-g:g);c==0?(W=h,oe=ne):(R=h,ce=ne);for(let B=0;B<l.length;B++)r[B]!=null&&(c==0?R=ce=l[B]:W=oe=l[B],m.moveTo(R,W),m.lineTo(ce,oe));m.stroke(),F==1&&m.translate(-T,-T)}function pa(l){let r=!0;return M.forEach((c,p)=>{if(!c.show)return;let h=C[c.scale];if(h.min==null){c._show&&(r=!1,c._show=!1,zi(!1));return}else c._show||(r=!1,c._show=!0,zi(!1));let g=c.side,x=g%2,{min:_,max:S}=h,[P,T]=ca(p,_,S,x==0?Q:L);if(T==0)return;let R=h.distr==2,W=c._splits=c.splits(t,p,_,S,P,T,R),ce=h.distr==2?W.map(U=>kt[U]):W,oe=h.distr==2?kt[W[1]]-kt[W[0]]:P,ne=c._values=c.values(t,c.filter(t,ce,p,T,oe),p,T,oe);c._rotate=g==2?c.rotate(t,ne,p,T):0;let B=c._size;c._size=_t(c.size(t,ne,p,l)),B!=null&&c._size!=B&&(r=!1)}),r}function ua(l){let r=!0;return El.forEach((c,p)=>{let h=c(t,p,di,l);h!=Jt[p]&&(r=!1),Jt[p]=h}),r}function da(){for(let l=0;l<M.length;l++){let r=M[l];if(!r.show||!r._show)continue;let c=r.side,p=c%2,h,g,x=r.stroke(t,l),_=c==0||c==3?-1:1,[S,P]=r._found;if(r.label!=null){let Qe=r.labelGap*_,at=De((r._lpos+Qe)*pe);Tl(r.labelFont[0],x,"center",c==2?"top":Sr),m.save(),p==1?(h=g=0,m.translate(at,De(mt+St/2)),m.rotate((c==3?-Xn:Xn)/2)):(h=De(lt+it/2),g=at);let mi=ho(r.label)?r.label(t,l,S,P):r.label;m.fillText(mi,h,g),m.restore()}if(P==0)continue;let T=C[r.scale],R=p==0?it:St,W=p==0?lt:mt,ce=r._splits,oe=T.distr==2?ce.map(Qe=>kt[Qe]):ce,ne=T.distr==2?kt[ce[1]]-kt[ce[0]]:S,B=r.ticks,U=r.border,xe=B.show?B.size:0,Ce=De(xe*pe),qe=De((r.alignTo==2?r._size-xe-r.gap:r.gap)*pe),he=r._rotate*-Xn/180,Ee=H(r._pos*pe),rt=(Ce+qe)*_,Ze=Ee+rt;g=p==0?Ze:0,h=p==1?Ze:0;let vt=r.font[0],At=r.align==1?Yi:r.align==2?Ks:he>0?Yi:he<0?Ks:p==0?"center":c==3?Ks:Yi,Ht=he||p==1?"middle":c==2?"top":Sr;Tl(vt,x,At,Ht);let ot=r.font[1]*r.lineGap,yt=ce.map(Qe=>H(u(Qe,T,R,W))),Ct=r._values;for(let Qe=0;Qe<Ct.length;Qe++){let at=Ct[Qe];if(at!=null){p==0?h=yt[Qe]:g=yt[Qe],at=""+at;let mi=at.indexOf(`
`)==-1?[at]:at.split(/\n/gm);for(let Xe=0;Xe<mi.length;Xe++){let er=mi[Xe];he?(m.save(),m.translate(h,g+Xe*ot),m.rotate(he),m.fillText(er,0,0),m.restore()):m.fillText(er,h,g+Xe*ot)}}}B.show&&$s(yt,B.filter(t,oe,l,P,ne),p,c,Ee,Ce,ge(B.width*pe,3),B.stroke(t,l),B.dash,B.cap);let Ot=r.grid;Ot.show&&$s(yt,Ot.filter(t,oe,l,P,ne),p,p==0?2:1,p==0?mt:lt,p==0?St:it,ge(Ot.width*pe,3),Ot.stroke(t,l),Ot.dash,Ot.cap),U.show&&$s([Ee],[1],p==0?1:0,p==0?1:2,p==1?mt:lt,p==1?St:it,ge(U.width*pe,3),U.stroke(t,l),U.dash,U.cap)}Ne("drawAxes")}function zi(l){w.forEach((r,c)=>{c>0&&(r._paths=null,l&&(s==1?(r.min=null,r.max=null):r.facets.forEach(p=>{p.min=null,p.max=null})))})}let Hn=!1,Ss=!1,pn=[];function fa(){Ss=!1;for(let l=0;l<pn.length;l++)Ne(...pn[l]);pn.length=0}function Ii(){Hn||(Lc(zl),Hn=!0)}function ha(l,r=!1){Hn=!0,Ss=r,l(t),zl(),r&&pn.length>0&&queueMicrotask(fa)}t.batch=ha;function zl(){if(us&&(la(),us=!1),Pi&&(Qo(),Pi=!1),Fn){if(we(y,Yi,be),we(y,"top",Le),we(y,kn,Q),we(y,An,L),we(k,Yi,be),we(k,"top",Le),we(k,kn,Q),we(k,An,L),we(b,kn,Vt),we(b,An,oi),v.width=De(Vt*pe),v.height=De(oi*pe),M.forEach(({_el:l,_show:r,_size:c,_pos:p,side:h})=>{if(l!=null)if(r){let g=h===3||h===0?c:0,x=h%2==1;we(l,x?"left":"top",p-g),we(l,x?"width":"height",c),we(l,x?"top":"left",x?Le:be),we(l,x?"height":"width",x?L:Q),nl(l,_i)}else pt(l,_i)}),Rn=Ri=hs=gs=bs=vs=ys=xs=ms=null,nt=1,fn(!0),be!=Mi||Le!=ai||Q!=Dt||L!=ci){zi(!1);let l=Q/Dt,r=L/ci;if(Ye&&!pi&&q.left>=0){q.left*=l,q.top*=r,Hi&&qt(Hi,De(q.left),0,Q,L),Oi&&qt(Oi,0,De(q.top),Q,L);for(let c=0;c<bt.length;c++){let p=bt[c];p!=null&&(Li[c]*=l,Di[c]*=r,qt(p,_t(Li[c]),_t(Di[c]),Q,L))}}if(ye.show&&!Ln&&ye.left>=0&&ye.width>0){ye.left*=l,ye.width*=l,ye.top*=r,ye.height*=r;for(let c in Ps)we(Ui,c,ye[c])}Mi=be,ai=Le,Dt=Q,ci=L}Ne("setSize"),Fn=!1}Vt>0&&oi>0&&(m.clearRect(0,0,v.width,v.height),Ne("drawClear"),G.forEach(l=>l()),Ne("draw")),ye.show&&Ln&&(On(ye),Ln=!1),Ye&&pi&&(hi(null,!0,!1),pi=!1),te.show&&te.live&&gt&&(Es(),gt=!1),d||(d=!0,t.status=1,Ne("ready")),cn=!1,Hn=!1}t.redraw=(l,r)=>{Pi=r||!1,l!==!1?Qt(D,E.min,E.max):Ii()};function ks(l,r){let c=C[l];if(c.from==null){if(Be==0){let p=c.range(t,r.min,r.max,l);r.min=p[0],r.max=p[1]}if(r.min>r.max){let p=r.min;r.min=r.max,r.max=p}if(Be>1&&r.min!=null&&r.max!=null&&r.max-r.min<1e-16)return;l==D&&c.distr==2&&Be>0&&(r.min=Tt(r.min,e[0]),r.max=Tt(r.max,e[0]),r.min==r.max&&r.max++),O[l]=r,us=!0,Ii()}}t.setScale=ks;let As,Cs,Hi,Oi,Il,Hl,Ni,qi,Ol,Nl,ve,Se,Zt=!1,je=q.drag,He=je.x,Oe=je.y;Ye&&(q.x&&(As=wt(nc,k)),q.y&&(Cs=wt(sc,k)),E.ori==0?(Hi=As,Oi=Cs):(Hi=Cs,Oi=As),ve=q.left,Se=q.top);let ye=t.select=Te({show:!0,over:!0,left:0,width:0,top:0,height:0},i.select),Ui=ye.show?wt(ic,ye.over?k:y):null;function On(l,r){if(ye.show){for(let c in l)ye[c]=l[c],c in Ps&&we(Ui,c,l[c]);r!==!1&&Ne("setSelect")}}t.setSelect=On;function ma(l){if(w[l].show)Fe&&nl(Ae[l],_i);else if(Fe&&pt(Ae[l],_i),Ye){let c=Fi?bt[0]:bt[l];c!=null&&qt(c,-10,-10,Q,L)}}function Qt(l,r,c){ks(l,{min:r,max:c})}function zt(l,r,c,p){r.focus!=null&&xa(l),r.show!=null&&w.forEach((h,g)=>{g>0&&(l==g||l==null)&&(h.show=r.show,ma(g),s==2?(Qt(h.facets[0].scale,null,null),Qt(h.facets[1].scale,null,null)):Qt(h.scale,null,null),Ii())}),c!==!1&&Ne("setSeries",l,r),p&&hn("setSeries",t,l,r)}t.setSeries=zt;function ga(l,r){Te(J[l],r)}function ba(l,r){l.fill=le(l.fill||null),l.dir=ae(l.dir,-1),r=r??J.length,J.splice(r,0,l)}function va(l){l==null?J.length=0:J.splice(l,1)}t.addBand=ba,t.setBand=ga,t.delBand=va;function ya(l,r){w[l].alpha=r,Ye&&bt[l]!=null&&(bt[l].style.opacity=r),Fe&&Ae[l]&&(Ae[l].style.opacity=r)}let Bt,Xt,fi,Vi={focus:!0};function xa(l){if(l!=fi){let r=l==null,c=Rt.alpha!=1;w.forEach((p,h)=>{if(s==1||h>0){let g=r||h==0||h==l;p._focus=r?null:g,c&&ya(h,g?1:Rt.alpha)}}),fi=l,c&&Ii()}}Fe&&Ti&&Je(Er,ue,l=>{q._lock||(ui(l),fi!=null&&zt(null,Vi,!0,Pe.setSeries))});function It(l,r,c){let p=C[r];c&&(l=l/pe-(p.ori==1?Le:be));let h=Q;p.ori==1&&(h=L,l=h-l),p.dir==-1&&(l=h-l);let g=p._min,x=p._max,_=l/h,S=g+(x-g)*_,P=p.distr;return P==3?Qi(10,S):P==4?wc(S,p.asinh):P==100?p.bwd(S):S}function wa(l,r){let c=It(l,D,r);return Tt(c,e[0],ze,Ie)}t.valToIdx=l=>Tt(l,e[0]),t.posToIdx=wa,t.posToVal=It,t.valToPos=(l,r,c)=>C[r].ori==0?o(l,C[r],c?it:Q,c?lt:0):a(l,C[r],c?St:L,c?mt:0),t.setCursor=(l,r,c)=>{ve=l.left,Se=l.top,hi(null,r,c)};function ql(l,r){we(Ui,Yi,ye.left=l),we(Ui,kn,ye.width=r)}function Ul(l,r){we(Ui,"top",ye.top=l),we(Ui,An,ye.height=r)}let un=E.ori==0?ql:Ul,dn=E.ori==1?ql:Ul;function _a(){if(Fe&&te.live)for(let l=s==2?1:0;l<w.length;l++){if(l==0&&ht)continue;let r=te.values[l],c=0;for(let p in r)Lt[l][c++].firstChild.nodeValue=r[p]}}function Es(l,r){if(l!=null&&(l.idxs?l.idxs.forEach((c,p)=>{fe[p]=c}):kc(l.idx)||fe.fill(l.idx),te.idx=fe[0]),Fe&&te.live){for(let c=0;c<w.length;c++)(c>0||s==1&&!ht)&&$a(c,fe[c]);_a()}gt=!1,r!==!1&&Ne("setLegend")}t.setLegend=Es;function $a(l,r){let c=w[l],p=l==0&&Y==2?kt:e[l],h;ht?h=c.values(t,l,r)??Yt:(h=c.value(t,r==null?null:p[r],l,r),h=h==null?Yt:{_:h}),te.values[l]=h}function hi(l,r,c){Ol=ve,Nl=Se,[ve,Se]=q.move(t,ve,Se),q.left=ve,q.top=Se,Ye&&(Hi&&qt(Hi,De(ve),0,Q,L),Oi&&qt(Oi,0,De(Se),Q,L));let p,h=ze>Ie;Bt=me,Xt=null;let g=E.ori==0?Q:L,x=E.ori==1?Q:L;if(ve<0||Be==0||h){p=q.idx=null;for(let _=0;_<w.length;_++){let S=bt[_];S!=null&&qt(S,-10,-10,Q,L)}Ti&&zt(null,Vi,!0,l==null&&Pe.setSeries),te.live&&(fe.fill(p),gt=!0)}else{let _,S,P;s==1&&(_=E.ori==0?ve:Se,S=It(_,D),p=q.idx=Tt(S,e[0],ze,Ie),P=$(e[0][p],E,g,0));let T=-10,R=-10,W=0,ce=0,oe=!0,ne="",B="";for(let U=s==2?1:0;U<w.length;U++){let xe=w[U],Ce=fe[U],qe=Ce==null?null:s==1?e[U][Ce]:e[U][1][Ce],he=q.dataIdx(t,U,p,S),Ee=he==null?null:s==1?e[U][he]:e[U][1][he];if(gt=gt||Ee!=qe||he!=Ce,fe[U]=he,U>0&&xe.show){let rt=he==null?-10:he==p?P:$(s==1?e[0][he]:e[U][0][he],E,g,0),Ze=Ee==null?-10:V(Ee,s==1?C[xe.scale]:C[xe.facets[1].scale],x,0);if(Ti&&Ee!=null){let vt=E.ori==1?ve:Se,At=Re(Rt.dist(t,U,he,Ze,vt));if(At<Bt){let Ht=Rt.bias;if(Ht!=0){let ot=It(vt,xe.scale),yt=Ee>=0?1:-1,Ct=ot>=0?1:-1;Ct==yt&&(Ct==1?Ht==1?Ee>=ot:Ee<=ot:Ht==1?Ee<=ot:Ee>=ot)&&(Bt=At,Xt=U)}else Bt=At,Xt=U}}if(gt||Fi){let vt,At;E.ori==0?(vt=rt,At=Ze):(vt=Ze,At=rt);let Ht,ot,yt,Ct,Ot,Qe,at=!0,mi=Ge.bbox;if(mi!=null){at=!1;let Xe=mi(t,U);yt=Xe.left,Ct=Xe.top,Ht=Xe.width,ot=Xe.height}else yt=vt,Ct=At,Ht=ot=Ge.size(t,U);if(Qe=Ge.fill(t,U),Ot=Ge.stroke(t,U),Fi)U==Xt&&Bt<=Rt.prox&&(T=yt,R=Ct,W=Ht,ce=ot,oe=at,ne=Qe,B=Ot);else{let Xe=bt[U];Xe!=null&&(Li[U]=yt,Di[U]=Ct,Rr(Xe,Ht,ot,at),Lr(Xe,Qe,Ot),qt(Xe,_t(yt),_t(Ct),Q,L))}}}}if(Fi){let U=Rt.prox,xe=fi==null?Bt<=U:Bt>U||Xt!=fi;if(gt||xe){let Ce=bt[0];Ce!=null&&(Li[0]=T,Di[0]=R,Rr(Ce,W,ce,oe),Lr(Ce,ne,B),qt(Ce,_t(T),_t(R),Q,L))}}}if(ye.show&&Zt)if(l!=null){let[_,S]=Pe.scales,[P,T]=Pe.match,[R,W]=l.cursor.sync.scales,ce=l.cursor.drag;if(He=ce._x,Oe=ce._y,He||Oe){let{left:oe,top:ne,width:B,height:U}=l.select,xe=l.scales[R].ori,Ce=l.posToVal,qe,he,Ee,rt,Ze,vt=_!=null&&P(_,R),At=S!=null&&T(S,W);vt&&He?(xe==0?(qe=oe,he=B):(qe=ne,he=U),Ee=C[_],rt=$(Ce(qe,R),Ee,g,0),Ze=$(Ce(qe+he,R),Ee,g,0),un(Ft(rt,Ze),Re(Ze-rt))):un(0,g),At&&Oe?(xe==1?(qe=oe,he=B):(qe=ne,he=U),Ee=C[S],rt=V(Ce(qe,W),Ee,x,0),Ze=V(Ce(qe+he,W),Ee,x,0),dn(Ft(rt,Ze),Re(Ze-rt))):dn(0,x)}else Ts()}else{let _=Re(Ol-Il),S=Re(Nl-Hl);if(E.ori==1){let W=_;_=S,S=W}He=je.x&&_>=je.dist,Oe=je.y&&S>=je.dist;let P=je.uni;P!=null?He&&Oe&&(He=_>=P,Oe=S>=P,!He&&!Oe&&(S>_?Oe=!0:He=!0)):je.x&&je.y&&(He||Oe)&&(He=Oe=!0);let T,R;He&&(E.ori==0?(T=Ni,R=ve):(T=qi,R=Se),un(Ft(T,R),Re(R-T)),Oe||dn(0,x)),Oe&&(E.ori==1?(T=Ni,R=ve):(T=qi,R=Se),dn(Ft(T,R),Re(R-T)),He||un(0,g)),!He&&!Oe&&(un(0,0),dn(0,0))}if(je._x=He,je._y=Oe,l==null){if(c){if(Xl!=null){let[_,S]=Pe.scales;Pe.values[0]=_!=null?It(E.ori==0?ve:Se,_):null,Pe.values[1]=S!=null?It(E.ori==1?ve:Se,S):null}hn(Ys,t,ve,Se,Q,L,p)}if(Ti){let _=c&&Pe.setSeries,S=Rt.prox;fi==null?Bt<=S&&zt(Xt,Vi,!0,_):Bt>S?zt(null,Vi,!0,_):Xt!=fi&&zt(Xt,Vi,!0,_)}}gt&&(te.idx=p,Es()),r!==!1&&Ne("setCursor")}let ei=null;Object.defineProperty(t,"rect",{get(){return ei==null&&fn(!1),ei}});function fn(l=!1){l?ei=null:(ei=k.getBoundingClientRect(),Ne("syncRect",ei))}function Vl(l,r,c,p,h,g,x){q._lock||Zt&&l!=null&&l.movementX==0&&l.movementY==0||(Ms(l,r,c,p,h,g,x,!1,l!=null),l!=null?hi(null,!0,!0):hi(r,!0,!1))}function Ms(l,r,c,p,h,g,x,_,S){if(ei==null&&fn(!1),ui(l),l!=null)c=l.clientX-ei.left,p=l.clientY-ei.top;else{if(c<0||p<0){ve=-10,Se=-10;return}let[P,T]=Pe.scales,R=r.cursor.sync,[W,ce]=R.values,[oe,ne]=R.scales,[B,U]=Pe.match,xe=r.axes[0].side%2==1,Ce=E.ori==0?Q:L,qe=E.ori==1?Q:L,he=xe?g:h,Ee=xe?h:g,rt=xe?p:c,Ze=xe?c:p;if(oe!=null?c=B(P,oe)?u(W,C[P],Ce,0):-10:c=Ce*(rt/he),ne!=null?p=U(T,ne)?u(ce,C[T],qe,0):-10:p=qe*(Ze/Ee),E.ori==1){let vt=c;c=p,p=vt}}S&&(r==null||r.cursor.event.type==Ys)&&((c<=1||c>=Q-1)&&(c=xi(c,Q)),(p<=1||p>=L-1)&&(p=xi(p,L))),_?(Il=c,Hl=p,[Ni,qi]=q.move(t,c,p)):(ve=c,Se=p)}let Ps={width:0,height:0,left:0,top:0};function Ts(){On(Ps,!1)}let Bl,jl,Wl,Gl;function Kl(l,r,c,p,h,g,x){Zt=!0,He=Oe=je._x=je._y=!1,Ms(l,r,c,p,h,g,x,!0,!1),l!=null&&(Je(Js,tl,Yl,!1),hn(Ar,t,Ni,qi,Q,L,null));let{left:_,top:S,width:P,height:T}=ye;Bl=_,jl=S,Wl=P,Gl=T}function Yl(l,r,c,p,h,g,x){Zt=je._x=je._y=!1,Ms(l,r,c,p,h,g,x,!1,!0);let{left:_,top:S,width:P,height:T}=ye,R=P>0||T>0,W=Bl!=_||jl!=S||Wl!=P||Gl!=T;if(R&&W&&On(ye),je.setScale&&R&&W){let ce=_,oe=P,ne=S,B=T;if(E.ori==1&&(ce=S,oe=T,ne=_,B=P),He&&Qt(D,It(ce,D),It(ce+oe,D)),Oe)for(let U in C){let xe=C[U];U!=D&&xe.from==null&&xe.min!=me&&Qt(U,It(ne+B,U),It(ne,U))}Ts()}else q.lock&&(q._lock=!q._lock,hi(r,!0,l!=null));l!=null&&(Ei(Js,tl),hn(Js,t,ve,Se,Q,L,null))}function Sa(l,r,c,p,h,g,x){if(q._lock)return;ui(l);let _=Zt;if(Zt){let S=!0,P=!0,T=10,R,W;E.ori==0?(R=He,W=Oe):(R=Oe,W=He),R&&W&&(S=ve<=T||ve>=Q-T,P=Se<=T||Se>=L-T),R&&S&&(ve=ve<Ni?0:Q),W&&P&&(Se=Se<qi?0:L),hi(null,!0,!0),Zt=!1}ve=-10,Se=-10,fe.fill(null),hi(null,!0,!0),_&&(Zt=_)}function Jl(l,r,c,p,h,g,x){q._lock||(ui(l),fs(),Ts(),l!=null&&hn(Mr,t,ve,Se,Q,L,null))}function Zl(){M.forEach(qp),ds(t.width,t.height,!0)}$i(es,Zi,Zl);let Bi={};Bi.mousedown=Kl,Bi.mousemove=Vl,Bi.mouseup=Yl,Bi.dblclick=Jl,Bi.setSeries=(l,r,c,p)=>{let h=Pe.match[2];c=h(t,r,c),c!=-1&&zt(c,p,!0,!1)},Ye&&(Je(Ar,k,Kl),Je(Ys,k,Vl),Je(Cr,k,l=>{ui(l),fn(!1)}),Je(Er,k,Sa),Je(Mr,k,Jl),cl.add(t),t.syncRect=fn);let Nn=t.hooks=i.hooks||{};function Ne(l,r,c){Ss?pn.push([l,r,c]):l in Nn&&Nn[l].forEach(p=>{p.call(null,t,r,c)})}(i.plugins||[]).forEach(l=>{for(let r in l.hooks)Nn[r]=(Nn[r]||[]).concat(l.hooks[r])});let Ql=(l,r,c)=>c,Pe=Te({key:null,setSeries:!1,filters:{pub:Nr,sub:Nr},scales:[D,w[1]?w[1].scale:null],match:[qr,qr,Ql],values:[null,null]},q.sync);Pe.match.length==2&&Pe.match.push(Ql),q.sync=Pe;let Xl=Pe.key,Fs=Ho(Xl);function hn(l,r,c,p,h,g,x){Pe.filters.pub(l,r,c,p,h,g,x)&&Fs.pub(l,r,c,p,h,g,x)}Fs.sub(t);function ka(l,r,c,p,h,g,x){Pe.filters.sub(l,r,c,p,h,g,x)&&Bi[l](null,r,c,p,h,g,x)}t.pub=ka;function Aa(){Fs.unsub(t),cl.delete(t),ri.clear(),sl(es,Zi,Zl),f.remove(),ue?.remove(),Ne("destroy")}t.destroy=Aa;function Ls(){Ne("init",i,e),Ml(e||i.data,!1),O[D]?ks(D,O[D]):fs(),Ln=ye.show&&(ye.width>0||ye.height>0),pi=gt=!0,ds(i.width,i.height)}return w.forEach(Cl),M.forEach(sa),n?n instanceof HTMLElement?(n.appendChild(f),Ls()):n(t,Ls):Ls(),t}Ve.assign=Te;Ve.fmtNum=gl;Ve.rangeNum=ts;Ve.rangeLog=ss;Ve.rangeAsinh=hl;Ve.orient=ki;Ve.pxRatio=pe;Ve.join=Fc;Ve.fmtDate=vl,Ve.tzDate=Vc;Ve.sync=Ho;{Ve.addGap=kp,Ve.clipGaps=os;let i=Ve.paths={points:Bo};i.linear=Wo,i.stepped=Ep,i.bars=Mp,i.spline=Tp}var Jo='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';var ft=class extends Ke{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.inspectable=!1;this.selectedTime=null;this.lastSignature="";this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(n){let t=JSON.stringify([this.curves,this.heading,this.syncKey,this.percent,this.range]);if(this.lastSamples===this.samples&&this.lastSignature===t){n.has("selectedTime")&&this.plot?.redraw(!1,!1);return}this.lastSamples=this.samples,this.lastSignature=t,this.draw()}inspect(n){this.inspectable&&this.dispatchEvent(new CustomEvent("inspect-publication",{detail:n,bubbles:!0,composed:!0}))}toggleSeries(n){let t=this.curves[n].label,s=this.hiddenCurves.has(t);this.plot&&this.plot.setSeries(n+1,{show:s}),s?this.hiddenCurves.delete(t):this.hiddenCurves.add(t),this.requestUpdate()}showCurve(n){let t=this.curves.findIndex(s=>s.path===n);t>=0&&this.hiddenCurves.has(this.curves[t].label)&&this.toggleSeries(t)}draw(){if(!this.isConnected)return;let n=this.renderRoot.querySelector(".plot");if(!n)return;let t=this.plot;if(t&&t.series.forEach((u,d)=>{d&&typeof u.label=="string"&&(u.show===!1?this.hiddenCurves.add(u.label):this.hiddenCurves.delete(u.label))}),this.dispose(),!this.samples.length||!this.samples.some(u=>this.curves.some(d=>Mt(u,d.path)!==null)))return;let s=getComputedStyle(this),o=s.getPropertyValue("--primary-text-color").trim()||"#555",a=[this.samples.map(u=>u.time),...this.curves.map(u=>this.samples.map(d=>Mt(d,u.path)))];this.applying=!0,this.plot=new Ve({width:Math.max(240,n.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(u,d,f)=>[Math.min(0,d??0),Math.max(100,f??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},axes:[{stroke:o,space:100,grid:{show:!1},values:(u,d)=>d.map(f=>new Date(f*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(f*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:o,values:(u,d)=>d.map(f=>f.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(u,d)=>d==null?"\u2014":new Date(d*1e3).toLocaleString()},...this.curves.map(u=>({label:u.label,stroke:u.color,width:2,spanGaps:!1,show:!this.hiddenCurves.has(u.label),paths:u.step?Ve.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(d,f)=>f==null?"Indisponible":`${f.toLocaleString(void 0,{maximumFractionDigits:u.unit.includes("min")?6:3})} ${u.unit}`}))],hooks:{draw:[u=>{if(this.selectedTime===null)return;let{left:d,top:f,width:v,height:m}=u.bbox,b=u.valToPos(this.selectedTime,"x",!0);if(b<d||b>d+v)return;let y=u.ctx;y.save(),y.strokeStyle=o,y.setLineDash([5,4]),y.beginPath(),y.moveTo(b,f),y.lineTo(b,f+m),y.stroke(),y.restore()}],setSeries:[u=>{u.status!==1||u!==this.plot||(u.series.forEach((d,f)=>{f&&typeof d.label=="string"&&(d.show===!1?this.hiddenCurves.add(d.label):this.hiddenCurves.delete(d.label))}),this.requestUpdate())}],setScale:[(u,d)=>{d==="x"&&u.status===1&&u===this.plot&&!this.applying&&u.scales.x.min!=null&&u.scales.x.max!=null&&(Math.abs(u.scales.x.min-this.range[0])>.01||Math.abs(u.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[u.scales.x.min,u.scales.x.max],bubbles:!0,composed:!0}))}]}},a,n),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,n.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,n.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(n)}render(){let n=this.samples.filter(t=>this.curves.some(s=>Mt(t,s.path)!==null)).length;return A`<h3>${this.heading}</h3>
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
        @click=${{capture:!0,handleEvent:t=>{let s=this.plot;if(!s||!t.composedPath().includes(s.over)||this.pointerStart===void 0||Math.abs(t.clientX-this.pointerStart)>4)return;let o=s.data[0][s.posToIdx(t.clientX-s.over.getBoundingClientRect().left)];o!==void 0&&this.inspect(o)}}}></div>
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
                              ${Mt(t,s.path)??"Indisponible"}
                            </td>`)}
                      </tr>`)}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
            </p>
          </details>`:A`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};ft.styles=[Vn(Jo),Et`
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
    `],Z([ke({attribute:!1})],ft.prototype,"samples",2),Z([ke({attribute:!1})],ft.prototype,"curves",2),Z([ke({attribute:!1})],ft.prototype,"range",2),Z([ke()],ft.prototype,"heading",2),Z([ke()],ft.prototype,"syncKey",2),Z([ke({type:Boolean})],ft.prototype,"percent",2),Z([ke({type:Boolean})],ft.prototype,"inspectable",2),Z([ke({attribute:!1})],ft.prototype,"selectedTime",2),ft=Z([Nt("smartpi-time-chart")],ft);var li=class extends Ke{constructor(){super(...arguments);this.expert=!1}render(){if(!this.diagnostic)return K;let n=new ii(this.diagnostic),t=n.blocks(),[s,o,a,u,d,f,v,m]=t,b=n.route,y=n.directMode,k=n.timingForced,F=n.saturation,H=`${this.diagnostic.entityId}/${y??b}`,z=$=>{this.selected={context:H,id:$}},w=b==="direct"?d:b==="pi"&&(k===!0||F)?f:v,M=(this.selected?.context===H?t.find($=>$.id===this.selected?.id):void 0)??w,C=y?`Voie directe \xB7 ${y}`:b==="pi"?"Voie PI + anticipation":"Chemin non v\xE9rifi\xE9",J=y?["PI/FF contourn\xE9s",`SmartPI d\xE9clare une voie directe en ${y.toLocaleLowerCase("fr-FR")}.`]:b!=="pi"?["Motif indisponible","Cette publication ne permet pas de v\xE9rifier le chemin de commande."]:k===!0?["Temporisation impos\xE9e","SmartPI signale une contrainte de dur\xE9e minimale."]:F?[F,"SmartPI publie l\u2019\xE9tat de saturation de la voie PI."]:k===!1?["Temporisation non impos\xE9e","Le drapeau de temporisation impos\xE9e est inactif."]:["Motif indisponible","Cette publication ne renseigne pas la temporisation."],D=b==="pi"&&(k===!0||F!==null),X=b==="direct"?[[d,"D\xE9cision",y,"Voie directe"],[v,"Sortie","Appliqu\xE9e",v.value]]:[[d,"Demande",b==="pi"?"PI + anticipation":"Demand\xE9e",d.value],[f,"Contraintes","Limites et timing",b==="pi"?f.value:"Chemin non v\xE9rifi\xE9"],[v,"Sortie","Appliqu\xE9e",v.value]],G=b==="pi"?[o,s,a,u,m]:[o,s,m],ee=this.diagnostic.lastUpdated,j=ee?new Date(ee):null,E=this.diagnostic.available&&j&&Number.isFinite(j.valueOf())?A`Dernière mise à jour du capteur : <time datetime=${j.toISOString()}>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"short",timeStyle:"medium"}).format(j)}</time>`:"Horodatage des donn\xE9es actuelles indisponible",Y=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return A`<div class="intro">
        <div>
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge route-badge">${C}</span>
      </div>
      <p class="muted stamp">${E}</p>
      <dl class="snapshot">
        <div><dt>Température intérieure</dt><dd>${o.value}</dd><small>Mesure publiée</small></div>
        <div><dt>Consigne filtrée</dt><dd>${s.value}</dd><small>${n.bypass?"Voie P contourn\xE9e":"Voie proportionnelle"}</small></div>
        <div><dt>Commande demandée</dt><dd>${n.bypass?"\u2014":d.value}</dd>
          <small>${n.bypass?"Voie PI contourn\xE9e":"Demande publi\xE9e"}</small></div>
        <div><dt>Commande appliquée</dt><dd>${v.value}</dd><small>Signal de commande</small></div>
      </dl>
      <div class="work">
      <section class="route" aria-labelledby="route-title">
        <h4 id="route-title">Chemin de commande</h4>
        <div class="note ${D?"warning":""}">
          <strong>${J[0]}</strong><p>${J[1]}</p>
        </div>
        <ol class="steps">
          ${X.map(([$,V,O,ie],N)=>A`<li>
            ${N>0&&b!=="unavailable"?A`<span class="arrow" aria-hidden="true">→</span>`:K}
            <button type="button" class="step" data-block=${$.id} aria-pressed=${$.id===M.id}
              aria-controls="signal-inspector" @click=${()=>z($.id)}>
              <small>${V}</small><strong>${O}</strong><span>${ie}</span>
            </button></li>`)}
        </ol>
        <div class="quick-blocks" role="group" aria-label="Signaux associés">
          ${G.map($=>A`<button type="button" aria-pressed=${$.id===M.id}
            aria-controls="signal-inspector" @click=${()=>z($.id)}>${$.id==="ff"?"Anticipation":$.title}</button>`)}
        </div>
      </section>
      <aside id="signal-inspector" aria-labelledby="signal-title">
        <span class="eyebrow">INSPECTION DU SIGNAL</span>
        <h4 id="signal-title" aria-live="polite">${M.title} <span class="badge">${M.status}</span></h4>
        <p>${M.explanation}</p>
        <dl>
          <div><dt>Valeur du bloc</dt><dd>${M.value}</dd>
            ${this.expert?A`<code>attributes.live.${M.path}</code>`:null}</div>
          <div><dt>Motif ou contexte publié</dt><dd>${M.reason}</dd>
            ${this.expert?A`<code>attributes.live.${M.reasonPath}</code>`:null}</div>
          ${n.detail(M,this.expert).map($=>A`<div>
            <dt>${$.label}</dt><dd>${$.value}</dd>
            ${this.expert?A`<code>attributes.live.${$.path}</code>${$.reliability?A`<code>Fiabilité · ${$.reliability}</code>`:null}`:null}
          </div>`)}
        </dl>
        ${M.status==="Contourn\xE9"?A`<p class="muted">Ces valeurs décrivent un bloc hors du chemin actif.</p>`:K}
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
          ${b!=="unavailable"?Gi`<path class="flow feedback" d="M660 315 H420" />
            <path class="flow feedback" d="M235 345 H110 V245" />`:K}
          ${t.map(($,V)=>Gi`<g role="button" tabindex="0" aria-pressed=${$.id===M.id} aria-label=${`${$.title} : ${$.value}. ${$.status}`} class=${"block "+($.id===M.id?"selected":"")+($.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${Y[V][0]},${Y[V][1]})`} @click=${()=>z($.id)} @keydown=${O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),z($.id))}}>
          <title>${$.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${$.title}</text><text x="13" y="50" class="value">${$.value}</text><text x="13" y="73" class="status">${$.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${t.map($=>A`<button
              type="button"
              aria-pressed=${$.id===M.id}
              @click=${()=>z($.id)}
            >
              ${$.title}<strong>${$.value}</strong><small>${$.status}</small>
            </button>`)}
      </div>
      </details>`}};li.styles=Et`
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
  `,Z([ke({attribute:!1})],li.prototype,"diagnostic",2),Z([ke({type:Boolean})],li.prototype,"expert",2),Z([Ue()],li.prototype,"selected",2),li=Z([Nt("smartpi-control-diagram")],li);var rn=class extends Ke{render(){if(!this.diagnostic)return A``;let e=new ii(this.diagnostic),n=e.chain(),t=Math.max(100,...n.map(s=>Math.abs(s.value??0)));return A`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
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
            <strong>${se(s.value," %",2)}</strong>
          </div>`)}
      <p>
        Ces diagnostics peuvent décrire un candidat et un cycle déjà engagé.
        Leurs différences ne sont pas une preuve de perte ni de limitation.
      </p>
      <p>
        Échelle symétrique ±${se(t," %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${se(I(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${se(I(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${se(I(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${I(this.diagnostic.live,"power.valve_linearization_enabled")===!0?A`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`:null}`}};rn.styles=Et`
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
  `,Z([ke({attribute:!1})],rn.prototype,"diagnostic",2),rn=Z([Nt("smartpi-command-chain")],rn);var Vp=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],Bp=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],jp=new Intl.NumberFormat("fr-FR",{maximumFractionDigits:2,signDisplay:"exceptZero"}),Me=class extends Ke{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.followNow=!0;this.livePublicationMissing=!1;this.generation=0;this.recorderEntity=""}async inspectBlock(n){this.block=n,n!=="model"&&this.renderRoot.querySelector(".command-chart smartpi-time-chart")?.showCurve(`power.${n}_percent`),await this.updateComplete,this.renderRoot.querySelector("#block-title")?.focus()}inspect(n){this.diagnostic&&(this.livePublicationMissing=!1,this.followNow=!1,this.inspection={entityId:this.diagnostic.entityId,recorder:this.usingRecorder,time:n})}async inspectEvent(n){this.inspect(n),await this.updateComplete,this.renderRoot.querySelector("#inspection-title")?.focus()}async openLivePublication(){let n=Ki(this.diagnostic?.lastUpdated),t=this.usingRecorder?this.recorder:this.session,s=this.diagnostic?.available&&n!==null?this.windowData(t).samples.find(o=>!o.observedAt&&o.time===n):void 0;this.tab="evolution",this.inspection=void 0,this.livePublicationMissing=!s,s&&this.inspect(s.time),await this.updateComplete,this.renderRoot.querySelector("#inspection-title")?.focus()}get usingRecorder(){return this.recorderEntity===this.diagnostic?.entityId&&!this.preferSession&&Gs(this.recorder)}willUpdate(n){if(this.followNow&&!this.usingRecorder&&(n.has("session")||n.has("preferSession")||n.has("recorder"))){let t=this.session.at(-1)?.time;t!==void 0&&t>this.range[1]&&(this.end=t,this.range=[t-this.hours*3600,t])}}windowData(n){if(this.filteredCache?.all===n&&this.filteredCache.start===this.range[0]&&this.filteredCache.end===this.range[1])return this.filteredCache;let t=n.filter(s=>s.time>=this.range[0]&&s.time<=this.range[1]);return this.filteredCache={all:n,start:this.range[0],end:this.range[1],samples:t,tracking:xr(t),events:wr(n).filter(s=>s.time>=this.range[0]&&s.time<=this.range[1])}}updated(n){let t=n.get("diagnostic");n.has("diagnostic")&&t?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.livePublicationMissing=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.filteredCache=void 0,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.followNow=!0,this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(n){this.followNow=!1;let t=this.range[1]-this.range[0],s=Date.now()/1e3,o=this.end-48*3600,a=Math.min(s,Math.max(o+t,this.range[1]+n*t/2));this.range=[a-t,a]}zoom(n){this.followNow=!1;let[t,s]=this.range,o=Math.max(60,Math.min(48*3600,(s-t)*n));this.range=[s-o,s]}async load(){this.inspection=void 0,this.livePublicationMissing=!1;let n=++this.generation,t=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!t||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let s=Date.now()/1e3,o=await _r(this.hass,t.entityId,s-48*3600,s,()=>n!==this.generation);if(n!==this.generation)return;this.recorderEntity=t.entityId,this.recorder=o,Gs(o)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(s){if(n!==this.generation)return;this.error=s instanceof Error&&s.message.startsWith("Format")?s.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{n===this.generation&&(this.loading=!1)}}trackingPanel(n,t){let{pairs:s,signedMedian:o,absoluteMedian:a,largestInterval:u}=n;return A`<section class="pane tracking" aria-labelledby="tracking-heading">
      <div class="tracking-title">
        <h3 id="tracking-heading">Écart à la consigne filtrée</h3>
        <span>Consigne filtrée − température intérieure</span>
      </div>
      <dl class="metrics">
        <div><dt>Couples valides</dt><dd>${s} / ${t}</dd></div>
        <div><dt>Médiane signée</dt><dd>${o===null?"Indisponible":`${jp.format(o)} \xB0C`}</dd></div>
        <div><dt>Médiane absolue</dt><dd>${se(a," \xB0C")}</dd></div>
        <div><dt>Plus long intervalle entre couples</dt><dd>${se(u===null?null:u/60," min",1)}</dd></div>
      </dl>
      <p>${s<2?"Deux couples valides dans la fen\xEAtre sont n\xE9cessaires pour r\xE9sumer l\u2019\xE9cart.":"Un \xE9cart positif indique une temp\xE9rature sous la consigne filtr\xE9e. La m\xE9diane absolue indique la taille typique de l\u2019\xE9cart observ\xE9."}</p>
      <details>
        <summary>Méthode et limites</summary>
        <p>Chaque couple provient d’une même publication et compte une fois, indépendamment de l’intervalle entre les points. Les publications incomplètes sont exclues des médianes. Le plus long intervalle décrit l’espacement des couples valides.</p>
        <p>Ces valeurs décrivent les publications de la source et de la fenêtre affichées. L’évaluation d’une durée de confort ou d’une réponse à un changement de consigne demande des données et un protocole adaptés.</p>
      </details>
    </section>`}inspectionPanel(n,t,s){let o=t?{...n,state:t.state,available:t.state!=="unknown"&&t.state!=="unavailable",live:t.live,history:t.history}:n,a=new ii(o).route,u=t?s?"Recorder":"Session":"Instantan\xE9 SmartPI",d=t?new Date(t.time*1e3):n.lastUpdated?new Date(n.lastUpdated):null,f=(z,w="")=>z==null&&t&&o.available?"Non archiv\xE9":se(z,w),v=[["Temp\xE9rature int\xE9rieure mesur\xE9e","temperature.indoor"," \xB0C"],["Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C"],["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"]],m=this.block,b=(z,w)=>A`<button type="button" aria-pressed=${m===z} aria-controls="block-detail"
        @click=${()=>void this.inspectBlock(z)}>${w}</button>`,y=a==="direct"?["Consigne et mesure","Hyst\xE9r\xE9sis ou calibration","Commande publi\xE9e","Pi\xE8ce"]:["Consigne et mesure",A`<span>Voies P et I</span> → ${b("pi","PI")}`,A`+ ${b("ff","Anticipation")}`,"Limites et temporisation","Commande publi\xE9e","Pi\xE8ce"],k={pi:[["Contribution PI","power.pi_percent"," %"]],ff:[["Anticipation retenue","power.ff_percent"," %"]],model:[["Gain thermique estim\xE9 A","model.a"," \xB0C/min/u"],["Pertes estim\xE9es B","model.b"," min\u207B\xB9"]]},F="analysis.twin.twin_T_steady",H=I(o.live,F)==null?f(void 0):se(xt(o.live,F,"analysis.twin.twin_T_steady_reliable")," \xB0C");return A`<section class="synoptic" aria-labelledby="synoptic-title">
        <h3 id="synoptic-title">Synoptique de régulation</h3>
        <ol class="signal-path" aria-label=${a==="unavailable"?"Sch\xE9ma de r\xE9f\xE9rence":"Voie d\xE9clar\xE9e"}>
          ${y.map((z,w)=>A`<li class=${a==="unavailable"?"":"active-path"}>
            ${w?A`<span aria-hidden="true">${w===2&&a!=="direct"?"":"\u2192"}</span>`:K}
            ${z}</li>`)}
        </ol>
        <p>${a==="pi"?"Voie PI active":a==="direct"?"Voie directe d\xE9clar\xE9e":"Chemin actif non v\xE9rifi\xE9"}</p>
        <p>↶ Retour de la mesure · ${b("model","Mod\xE8le thermique")}</p>
      </section>
      <aside class="publication" aria-labelledby="inspection-title">
        <h3 id="inspection-title" tabindex="-1">${t?"Publication s\xE9lectionn\xE9e":"En direct"}</h3>
        <p role="status" class="inspection-status">
          ${u} · ${t?.observedAt?"Observation de session":"Publication"} ·
          ${d&&Number.isFinite(d.valueOf())?A`<time datetime=${d.toISOString()}>${d.toLocaleString()}</time>`:"Horodatage indisponible"}
        </p>
        <dl>
          <dt>État publié</dt><dd>${o.state}</dd>
          ${v.map(([z,w,M])=>A`<dt>${z}</dt>
            <dd>${f(t?Mt(t,w):I(n.live,w),M)}</dd>`)}
          ${t?A`<dt>Écart à la consigne filtrée</dt><dd>${f(Mt(t,"error")," \xB0C")}</dd>`:K}
          <dt>État de l’intégrale</dt><dd>${f(I(o.live,"temperature.integral_mode"))}</dd>
          <dt>Saturation déclarée</dt><dd>${f(I(o.live,"control.saturation_state"))}</dd>
          <dt>Limitation par temporisation</dt><dd>${f(I(o.live,"analysis.control.forced_by_timing"))}</dd>
        </dl>
        <div id="block-detail">
          ${m?A`<h4 id="block-title" tabindex="-1">
              ${{pi:"D\xE9tails PI",ff:"D\xE9tails anticipation",model:"D\xE9tails du mod\xE8le"}[m]}
            </h4>
            <dl>${k[m].map(([z,w,M])=>A`<dt>${z}</dt>
              <dd>${f(t?Mt(t,w):I(n.live,w),M)}</dd>`)}
              ${m==="pi"?A`<dt>Erreur de la voie P</dt>
                <dd>${f(I(o.live,"analysis.control.error_p")," \xB0C")}</dd>
                <dt>Erreur brute de la voie I</dt>
                <dd>${f(I(o.live,"temperature.error")," \xB0C")}</dd>`:K}
              ${m==="ff"?A`<dt>État FF3</dt>
                <dd>${f(I(o.live,"feedforward.ff3_status"))}</dd>`:K}
              ${m==="model"?A`<dt>Équilibre estimé par le Twin</dt><dd>${H}</dd>`:K}
            </dl>`:K}
        </div>
        <button type="button" aria-disabled=${!t} @click=${()=>{this.inspection=void 0}}>
          Revenir au direct
        </button>
        <button type="button" @click=${()=>this.renderRoot.querySelector("#journal-title")?.focus()}>
          Voir le journal
        </button>
      </aside>`}render(){let n=this.diagnostic;if(!n)return K;let t=this.usingRecorder,s=t?this.recorder:this.session,{samples:o,events:a,tracking:u}=this.windowData(s),d=this.tab==="regulation",f=this.tab==="evolution",v=this.inspection,m=f&&v?.entityId===n.entityId&&v.recorder===t?o.find(y=>y.time===v.time):void 0,b=(y,k,F=!1)=>A`<section class=${F?"chart command-chart":"chart"}>
        <smartpi-time-chart
          .heading=${y}
          .samples=${o}
          .curves=${k}
          .range=${this.range}
          .percent=${F}
          .syncKey=${n.entityId}
          .inspectable=${f}
          .selectedTime=${m?.time??null}
          @inspect-publication=${H=>this.inspect(H.detail)}
          @time-range=${H=>{H.detail[1]>H.detail[0]&&(this.followNow=!1,this.range=H.detail)}}
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
        ${[["evolution","Supervision"],["regulation","R\xE9gulation en direct"],["model","Sant\xE9 du mod\xE8le"]].map(([y,k])=>A`<button
              class=${this.tab===y?"active":""}
              aria-pressed=${this.tab===y}
              @click=${()=>{this.livePublicationMissing=!1,this.tab=y}}
            >
              ${k}
            </button>`)}
      </nav>
      ${d?K:A`<div class="toolbar">
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
      ${d?K:A`<div class="source">
        <strong
          >${t?"Recorder \xB7 historique persistant":"Historique de session \xB7 m\xE9moire temporaire"}</strong
        ><span
          >${o.length} publications ·
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
      ${t?K:A`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${y=>{this.followNow=y.target.checked,this.followNow&&this.reset()}}
            />
            Suivre les nouvelles publications de session</label
          >`}
      ${this.loading?A`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:K}
      ${this.error?A`<p role="status" class="notice">${this.error}</p>`:K}
      ${o.length?K:A`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}
      ${f&&this.livePublicationMissing?A`<p class="notice" role="status">La publication du direct est introuvable dans la source et la fenêtre affichées. L’inspecteur affiche l’instantané actuel.</p>`:K}`}
      ${this.tab==="evolution"?A`<div class="supervision">
            ${this.inspectionPanel(n,m,t)}
            <div class="trends">
            ${b("Temp\xE9rature et consigne filtr\xE9e",Vp)}
            ${b("Commande du r\xE9gulateur \xB7 pas des watts",Bp,!0)}
            ${b("\xC9cart consigne filtr\xE9e \u2212 temp\xE9rature int\xE9rieure",[{label:"\xC9cart filtr\xE9",path:"error",color:"#bc7254",unit:"\xB0C"}])}
            <p class="foot">
              Écart calculé uniquement avec deux valeurs du même état. Ce n’est
              pas l’erreur de l’intégrateur ni une mesure de confort. Aucune
              zone de bande morte n’est extrapolée. Les points sont des
              publications irrégulières ; une ligne ne constitue pas une mesure
              intermédiaire.
            </p>
            ${this.trackingPanel(u,o.length)}
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
              </details>`:A`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${se(I(n.live,"model.confidence"))}</span
                >
              </div>
              ${b("A \xB7 gain de chauffe estim\xE9",[{label:"A appris",path:"model.a",color:"#2689ca",unit:"\xB0C/min/u",step:!0}])}
              ${b("B \xB7 pertes thermiques estim\xE9es",[{label:"B appris",path:"model.b",color:"#39a38a",unit:"min\u207B\xB9",step:!0}])}
              <p class="foot">
                La confiance actuelle ne valide pas rétroactivement ces séries.
                Le contrat history ne contient pas de confiance historique ni de
                mesures de référence A/B.
              </p>
              <section class="pane">
                <h3>Temps morts · instantané</h3>
                <div class="metrics">
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([y,k,F])=>A`<div>
                        <span>${y}</span
                        ><strong
                          >${se(xt(n.live,k,F),k==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${se(I(n.live,F))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${se(I(n.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${se(I(n.live,"analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${se(I(n.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE 30","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([y,k,F])=>A`<div>
                        <span>${y}</span
                        ><strong
                          >${se(xt(n.live,"analysis.twin."+k),F,4)}</strong
                        >
                      </div>`)}
                </div>
                <p>
                  Équilibre :
                  ${se(xt(n.live,"analysis.twin.twin_T_steady","analysis.twin.twin_T_steady_reliable")," \xB0C")}
                  · Consigne atteignable (prédiction) :
                  ${se(xt(n.live,"analysis.twin.twin_setpoint_reachable","analysis.twin.twin_T_steady_reliable"))}
                </p>
                <p class="foot">
                  Aucune courbe Twin : ces valeurs ne font pas partie des huit
                  séries Recorder standard. Fiabilité déclarée ≠ exactitude
                  physique démontrée.
                </p>
              </section>
            `}
      ${d?K:A`<section class="timeline">
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
                    ${f?A`<button type="button" aria-pressed=${m?.time===y.time}
                          @click=${()=>void this.inspectEvent(y.time)}>${y.label}</button>`:A`<strong>${y.label}</strong>`}${this.expert?A`<p>${y.provenance}</p>`:K}
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
          </details>`:K}
    </div>`}};Me.styles=Et`
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
  `,Z([ke({attribute:!1})],Me.prototype,"hass",2),Z([ke({attribute:!1})],Me.prototype,"diagnostic",2),Z([ke({attribute:!1})],Me.prototype,"session",2),Z([Ue()],Me.prototype,"tab",2),Z([Ue()],Me.prototype,"expert",2),Z([Ue()],Me.prototype,"hours",2),Z([Ue()],Me.prototype,"end",2),Z([Ue()],Me.prototype,"range",2),Z([Ue()],Me.prototype,"recorder",2),Z([Ue()],Me.prototype,"loading",2),Z([Ue()],Me.prototype,"error",2),Z([Ue()],Me.prototype,"preferSession",2),Z([Ue()],Me.prototype,"followNow",2),Z([Ue()],Me.prototype,"inspection",2),Z([Ue()],Me.prototype,"livePublicationMissing",2),Z([Ue()],Me.prototype,"block",2),Me=Z([Nt("smartpi-visual-diagnostics")],Me);var Wp=new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium",timeStyle:"short"}),Gp=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],Kt=class extends Ke{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new Kn}willUpdate(n){n.has("hass")&&this.hass&&this.sessionHistory.collect(Ws(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(n,t,s="",o=2){return A`<div class="metric"><span>${n}</span><strong>${se(t,s,o)}</strong></div>`}power(n,t,s){let o=We(t),a=o===null?0:Math.min(100,Math.max(0,o));return A`<div class="power"><div class="power-label"><span>${n}</span><strong>${se(t," %",1)}</strong></div>
      <div class="track" aria-label=${n+" "+se(t," %",1)}>
        <div class=${"fill "+s} style=${"width:"+a+"%"}></div>
      </div></div>`}field(n,t){let s=se(xt(t,n.path,n.reliable),n.unit??"",n.digits??2);return A`<div class="detail" title=${n.path}><span>${n.label}</span><strong>${s}</strong></div>`}showDiagnostic(n){let t=n.live,s=br(n),o=$n(n),a=We(I(t,"learning.bootstrap_progress_percent")),u=Ki(n.lastUpdated);return A`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${n.name}</h2>
            <div class="muted small">${n.climateId??n.entityId}</div></div>
          <span class="tag">${o?"Apprentissage / hyst\xE9r\xE9sis":se(I(t,"control.phase"))}</span>
        </div>
        <p class="muted small">Dernière publication ${u===null?"indisponible":A`<time datetime=${n.lastUpdated??""}>${Wp.format(u*1e3)}</time>`}</p>
        <div class="metrics">
          ${this.metric("Temp\xE9rature int\xE9rieure",I(t,"temperature.indoor")," \xB0C")}
          ${this.metric("Consigne filtr\xE9e",I(t,"setpoint.filtered_setpoint")," \xB0C")}
          ${this.metric("Commande appliqu\xE9e",I(t,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",I(t,"temperature.outdoor")," \xB0C")}
        </div>
        ${o?A`<div class="learn">
          <div class="flex spread"><span>Progression de l’apprentissage</span><strong>${se(a," %",0)}</strong></div>
          <div class="track"><div class="fill applied" style=${"width:"+(a===null?0:Math.max(0,Math.min(100,a)))+"%"}></div></div>
          <div class="muted small">A : ${se(I(t,"learning.emea_samples_a"),"",0)} / ${se(I(t,"learning.bootstrap_target_a"),"",0)}
            · B : ${se(I(t,"learning.emea_samples_b"),"",0)} / ${se(I(t,"learning.bootstrap_target_b"),"",0)}</div>
        </div>`:K}
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${n} .session=${this.sessionHistory.get(n.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${s.map(d=>A`<li>${d}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${Gp.map(d=>A`<details class="surface">
          <summary>${d.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${d.note}</p>
          <div class="detail-grid">${d.fields.map(f=>this.field(f,t))}</div>
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
            <span class="big">${se(I(s.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom">Consigne filtrée ${se(I(s.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
          </button>`)}</div>
          ${t?this.showDiagnostic(t):K}`}
        <footer>Source : capteurs SmartPI Diagnostics v2 · Lecture seule · Aucune commande Home Assistant</footer>
      </main>`}};Kt.styles=Et`
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
  `,Z([ke({attribute:!1})],Kt.prototype,"hass",2),Z([ke({attribute:!1})],Kt.prototype,"panel",2),Z([ke({type:Boolean})],Kt.prototype,"narrow",2),Z([Ue()],Kt.prototype,"selectedId",2),Kt=Z([Nt("smartpi-dashboard-panel")],Kt);export{Kt as SmartPIDashboardPanel};
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
