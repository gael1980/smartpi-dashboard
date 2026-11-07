var Ca=Object.defineProperty;var Ea=Object.getOwnPropertyDescriptor;var Y=(t,e,n,i)=>{for(var s=i>1?void 0:i?Ea(e,n):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(s=(i?a(e,n,s):a(s))||s);return i&&s&&Ca(e,n,s),s};var Nn=globalThis,qn=Nn.ShadowRoot&&(Nn.ShadyCSS===void 0||Nn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ds=Symbol(),tr=new WeakMap,fn=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Ds)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o,n=this.t;if(qn&&e===void 0){let i=n!==void 0&&n.length===1;i&&(e=tr.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&tr.set(n,e))}return e}toString(){return this.cssText}},Un=t=>new fn(typeof t=="string"?t:t+"",void 0,Ds),Et=(t,...e)=>{let n=t.length===1?t[0]:e.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new fn(n,t,Ds)},ir=(t,e)=>{if(qn)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let i=document.createElement("style"),s=Nn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,t.appendChild(i)}},Rs=qn?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(let i of e.cssRules)n+=i.cssText;return Un(n)})(t):t;var{is:Ta,defineProperty:Ma,getOwnPropertyDescriptor:Pa,getOwnPropertyNames:Fa,getOwnPropertySymbols:La,getPrototypeOf:Da}=Object,Vn=globalThis,nr=Vn.trustedTypes,Ra=nr?nr.emptyScript:"",za=Vn.reactiveElementPolyfillSupport,hn=(t,e)=>t,mn={toAttribute(t,e){switch(e){case Boolean:t=t?Ra:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},Bn=(t,e)=>!Ta(t,e),sr={attribute:!0,type:String,converter:mn,reflect:!1,useDefault:!1,hasChanged:Bn};Symbol.metadata??=Symbol("metadata"),Vn.litPropertyMetadata??=new WeakMap;var jt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=sr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,n);s!==void 0&&Ma(this.prototype,e,s)}}static getPropertyDescriptor(e,n,i){let{get:s,set:o}=Pa(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){let u=s?.call(this);o?.call(this,a),this.requestUpdate(e,u,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??sr}static _$Ei(){if(this.hasOwnProperty(hn("elementProperties")))return;let e=Da(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(hn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(hn("properties"))){let n=this.properties,i=[...Fa(n),...La(n)];for(let s of i)this.createProperty(s,n[s])}let e=this[Symbol.metadata];if(e!==null){let n=litPropertyMetadata.get(e);if(n!==void 0)for(let[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[n,i]of this.elementProperties){let s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let n=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)n.unshift(Rs(s))}else e!==void 0&&n.push(Rs(e));return n}static _$Eu(e,n){let i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,n=this.constructor.elementProperties;for(let i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ir(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:mn).toAttribute(n,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,n){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:mn;this._$Em=s;let u=a.fromAttribute(n,o.type);this[s]=u??this._$Ej?.get(s)??u,this._$Em=null}}requestUpdate(e,n,i,s=!1,o){if(e!==void 0){let a=this.constructor;if(s===!1&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??Bn)(o,n)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:a}=o,u=this[s];a!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,o,u)}}let e=!1,n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};jt.elementStyles=[],jt.shadowRootOptions={mode:"open"},jt[hn("elementProperties")]=new Map,jt[hn("finalized")]=new Map,za?.({ReactiveElement:jt}),(Vn.reactiveElementVersions??=[]).push("2.1.2");var Us=globalThis,lr=t=>t,jn=Us.trustedTypes,rr=jn?jn.createPolicy("lit-html",{createHTML:t=>t}):void 0,dr="$lit$",ti=`lit$${Math.random().toFixed(9).slice(2)}$`,fr="?"+ti,Ha=`<${fr}>`,vi=document,bn=()=>vi.createComment(""),vn=t=>t===null||typeof t!="object"&&typeof t!="function",Vs=Array.isArray,Ia=t=>Vs(t)||typeof t?.[Symbol.iterator]=="function",zs=`[ 	
\f\r]`,gn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,or=/-->/g,ar=/>/g,gi=RegExp(`>|${zs}(?:([^\\s"'>=/]+)(${zs}*=${zs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),cr=/'/g,pr=/"/g,hr=/^(?:script|style|textarea|title)$/i,Bs=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),C=Bs(1),xn=Bs(2),Xp=Bs(3),yi=Symbol.for("lit-noChange"),te=Symbol.for("lit-nothing"),ur=new WeakMap,bi=vi.createTreeWalker(vi,129);function mr(t,e){if(!Vs(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return rr!==void 0?rr.createHTML(e):e}var Oa=(t,e)=>{let n=t.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",a=gn;for(let u=0;u<n;u++){let d=t[u],f,v,m=-1,b=0;for(;b<d.length&&(a.lastIndex=b,v=a.exec(d),v!==null);)b=a.lastIndex,a===gn?v[1]==="!--"?a=or:v[1]!==void 0?a=ar:v[2]!==void 0?(hr.test(v[2])&&(s=RegExp("</"+v[2],"g")),a=gi):v[3]!==void 0&&(a=gi):a===gi?v[0]===">"?(a=s??gn,m=-1):v[1]===void 0?m=-2:(m=a.lastIndex-v[2].length,f=v[1],a=v[3]===void 0?gi:v[3]==='"'?pr:cr):a===pr||a===cr?a=gi:a===or||a===ar?a=gn:(a=gi,s=void 0);let w=a===gi&&t[u+1].startsWith("/>")?" ":"";o+=a===gn?d+Ha:m>=0?(i.push(f),d.slice(0,m)+dr+d.slice(m)+ti+w):d+ti+(m===-2?u:w)}return[mr(t,o+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},yn=class t{constructor({strings:e,_$litType$:n},i){let s;this.parts=[];let o=0,a=0,u=e.length-1,d=this.parts,[f,v]=Oa(e,n);if(this.el=t.createElement(f,i),bi.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=bi.nextNode())!==null&&d.length<u;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(dr)){let b=v[a++],w=s.getAttribute(m).split(ti),S=/([.?@])?(.*)/.exec(b);d.push({type:1,index:o,name:S[2],strings:w,ctor:S[1]==="."?Is:S[1]==="?"?Os:S[1]==="@"?Ns:Wi}),s.removeAttribute(m)}else m.startsWith(ti)&&(d.push({type:6,index:o}),s.removeAttribute(m));if(hr.test(s.tagName)){let m=s.textContent.split(ti),b=m.length-1;if(b>0){s.textContent=jn?jn.emptyScript:"";for(let w=0;w<b;w++)s.append(m[w],bn()),bi.nextNode(),d.push({type:2,index:++o});s.append(m[b],bn())}}}else if(s.nodeType===8)if(s.data===fr)d.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ti,m+1))!==-1;)d.push({type:7,index:o}),m+=ti.length-1}o++}}static createElement(e,n){let i=vi.createElement("template");return i.innerHTML=e,i}};function ji(t,e,n=t,i){if(e===yi)return e;let s=i!==void 0?n._$Co?.[i]:n._$Cl,o=vn(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,n,i)),i!==void 0?(n._$Co??=[])[i]=s:n._$Cl=s),s!==void 0&&(e=ji(t,s._$AS(t,e.values),s,i)),e}var Hs=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:i}=this._$AD,s=(e?.creationScope??vi).importNode(n,!0);bi.currentNode=s;let o=bi.nextNode(),a=0,u=0,d=i[0];for(;d!==void 0;){if(a===d.index){let f;d.type===2?f=new wn(o,o.nextSibling,this,e):d.type===1?f=new d.ctor(o,d.name,d.strings,this,e):d.type===6&&(f=new qs(o,this,e)),this._$AV.push(f),d=i[++u]}a!==d?.index&&(o=bi.nextNode(),a++)}return bi.currentNode=vi,s}p(e){let n=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}},wn=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,i,s){this.type=2,this._$AH=te,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=ji(this,e,n),vn(e)?e===te||e==null||e===""?(this._$AH!==te&&this._$AR(),this._$AH=te):e!==this._$AH&&e!==yi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ia(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==te&&vn(this._$AH)?this._$AA.nextSibling.data=e:this.T(vi.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=yn.createElement(mr(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Hs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(e){let n=ur.get(e.strings);return n===void 0&&ur.set(e.strings,n=new yn(e)),n}k(e){Vs(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,i,s=0;for(let o of e)s===n.length?n.push(i=new t(this.O(bn()),this.O(bn()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let i=lr(e).nextSibling;lr(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Wi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,s,o){this.type=1,this._$AH=te,this._$AN=void 0,this.element=e,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=te}_$AI(e,n=this,i,s){let o=this.strings,a=!1;if(o===void 0)e=ji(this,e,n,0),a=!vn(e)||e!==this._$AH&&e!==yi,a&&(this._$AH=e);else{let u=e,d,f;for(e=o[0],d=0;d<o.length-1;d++)f=ji(this,u[i+d],n,d),f===yi&&(f=this._$AH[d]),a||=!vn(f)||f!==this._$AH[d],f===te?e=te:e!==te&&(e+=(f??"")+o[d+1]),this._$AH[d]=f}a&&!s&&this.j(e)}j(e){e===te?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Is=class extends Wi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===te?void 0:e}},Os=class extends Wi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==te)}},Ns=class extends Wi{constructor(e,n,i,s,o){super(e,n,i,s,o),this.type=5}_$AI(e,n=this){if((e=ji(this,e,n,0)??te)===yi)return;let i=this._$AH,s=e===te&&i!==te||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==te&&(i===te||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},qs=class{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ji(this,e)}};var Na=Us.litHtmlPolyfillSupport;Na?.(yn,wn),(Us.litHtmlVersions??=[]).push("3.3.3");var gr=(t,e,n)=>{let i=n?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=n?.renderBefore??null;i._$litPart$=s=new wn(e.insertBefore(bn(),o),o,void 0,n??{})}return s._$AI(t),s};var js=globalThis,Ge=class extends jt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=gr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return yi}};Ge._$litElement$=!0,Ge.finalized=!0,js.litElementHydrateSupport?.({LitElement:Ge});var qa=js.litElementPolyfillSupport;qa?.({LitElement:Ge});(js.litElementVersions??=[]).push("4.2.2");var Nt=t=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Ua={attribute:!0,type:String,converter:mn,reflect:!1,hasChanged:Bn},Va=(t=Ua,e,n)=>{let{kind:i,metadata:s}=n,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),i==="accessor"){let{name:a}=n;return{set(u){let d=e.get.call(this);e.set.call(this,u),this.requestUpdate(a,d,t,!0,u)},init(u){return u!==void 0&&this.C(a,void 0,t,u),u}}}if(i==="setter"){let{name:a}=n;return function(u){let d=this[a];e.call(this,u),this.requestUpdate(a,d,t,!0,u)}}throw Error("Unsupported decorator location: "+i)};function ke(t){return(e,n)=>typeof n=="object"?Va(t,e,n):((i,s,o)=>{let a=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(s,o):void 0})(t,e,n)}function je(t){return ke({...t,state:!0,attribute:!1})}function ct(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function D(t,e){return e.split(".").reduce((n,i)=>ct(n)?n[i]:void 0,t)}function Xe(t){return typeof t=="number"&&Number.isFinite(t)?t:null}function ie(t,e="",n=2){let i=Xe(t);return i!==null?i.toLocaleString("fr-FR",{maximumFractionDigits:n})+e:typeof t=="boolean"?t?"Oui":"Non":typeof t=="string"&&t.trim()!==""?t:"Indisponible"}function _n(t){return D(t.live,"control.mode")==="hysteresis"||D(t.live,"learning.stage")==="bootstrap"}function wt(t,e,n){if(!(n&&D(t,n)!==!0)&&!(e.startsWith("analysis.twin.")&&!e.endsWith("reliable")&&(D(t,"analysis.twin.twin_model_reliable")!==!0||D(t,"analysis.twin.twin_warming_up")!==!1)))return D(t,e)}function Ba(t,e){return Object.values(t.states).find(i=>i.entity_id.startsWith("climate.")&&D(i.attributes,"specific_states.regulation_diagnostics")===e)??null}function Ws(t){if(!t||!ct(t.states))return[];let e=[];for(let n of Object.values(t.states)){if(!n?.entity_id?.startsWith("sensor.")||!ct(n.attributes))continue;let i=n.attributes;if(i.schema_version!==2||!ct(i.live)||!ct(i.history))continue;let s=Ba(t,n.entity_id),a=(typeof i.friendly_name=="string"?i.friendly_name:n.entity_id).replace(/ SmartPI Diagnostics$/i,"");e.push({entityId:n.entity_id,climateId:s?.entity_id??null,name:typeof s?.attributes.friendly_name=="string"?s.attributes.friendly_name:a,state:n.state,lastUpdated:n.last_updated??null,available:n.state!=="unknown"&&n.state!=="unavailable",live:n.state==="unknown"||n.state==="unavailable"?{}:i.live,history:i.history})}return e.sort((n,i)=>n.name.localeCompare(i.name,"fr"))}function br(t){let e=[];if(!t.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];e.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),_n(t)&&e.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),D(t.live,"control.in_deadtime_window")===!0&&e.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),D(t.live,"model.tau_reliable")===!1&&e.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),D(t.live,"analysis.twin.twin_T_steady_reliable")===!1&&e.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let n=D(t.live,"feedforward.ff3_status");return typeof n=="string"&&n.startsWith("disabled:")&&e.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+n+"."),e}var ja=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function Kn(t){if(typeof t=="number")return Number.isFinite(t)&&t>0?t:null;if(typeof t!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(t))return null;let e=Date.parse(t);return Number.isFinite(e)?e/1e3:null}function yr(t){if(!Array.isArray(t))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let e=[];for(let n of t){if(!ct(n))continue;let i=Kn(n.lu??n.last_updated);if(i===null)continue;let s=ct(n.a)?n.a:ct(n.attributes)?n.attributes:{},o=typeof n.s=="string"?n.s:typeof n.state=="string"?n.state:"unknown",a=s.schema_version===2&&o!=="unavailable"&&o!=="unknown";e.push({time:i,state:o,history:a&&ct(s.history)?s.history:{},live:a&&ct(s.live)?s.live:{}})}return Yn(e)}function Yn(t){return[...new Map(t.map(e=>[e.time,e])).values()].sort((e,n)=>e.time-n.time)}function Tt(t,e){if(e==="error"){let n=Xe(D(t.history,"temperature.indoor")),i=Xe(D(t.history,"setpoint.filtered_setpoint"));return n===null||i===null?null:Xe(i-n)}return e.startsWith("live.")?Xe(wt(t.live,e.slice(5))):Xe(D(t.history,e))}function vr(t){if(t.length<2)return null;t.sort((n,i)=>n-i);let e=Math.floor(t.length/2);return t.length%2?t[e]:t[e-1]/2+t[e]/2}function wr(t){let e=[],n=null,i=null;for(let o of t){let a=Tt(o,"error");a!==null&&(e.push(a),n!==null&&(i=Math.max(i??0,o.time-n)),n=o.time)}let s=e.map(Math.abs);return{pairs:e.length,signedMedian:vr(e),absoluteMedian:vr(s),largestInterval:i}}function Gs(t){return t.some(e=>ja.some(n=>Tt(e,n)!==null))}function xr(t){let e=[];for(let n=1;n<t.length;n++){let i=t[n-1],s=t[n],o=Xe(D(i.history,"setpoint.filtered_setpoint")),a=Xe(D(s.history,"setpoint.filtered_setpoint"));o!==null&&a!==null&&o!==a&&e.push({time:s.time,label:`Consigne filtr\xE9e ${o} \u2192 ${a} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),i.state!==s.state&&e.push({time:s.time,label:`Phase / \xE9tat : ${i.state} \u2192 ${s.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[u,d]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let f=D(i.live,u),v=D(s.live,u);f!=null&&v!==void 0&&v!==null&&f!==v&&e.push({time:s.time,label:`${d} : ${String(v)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${u}.`})}}return e}var Gn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(e,n,i=Date.now()/1e3){let s=new Set(e.map(o=>o.entityId));for(let o of this.buffers.keys())s.has(o)||(this.buffers.delete(o),this.revisions.delete(o));for(let o of e){let a=n[o.entityId]?.last_updated,u=Kn(a);if(!a||u===null||this.revisions.get(o.entityId)===a)continue;this.revisions.set(o.entityId,a);let d=this.buffers.get(o.entityId)??[];if(d.length&&u<=d[d.length-1].time)continue;let v={time:d.length===0?i:u,observedAt:d.length===0,state:o.state,history:o.available?o.history:{},live:o.live};this.buffers.set(o.entityId,Yn([...d,v]).filter(m=>m.time>=i-48*3600).slice(-12e3))}}get(e){return this.buffers.get(e)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};async function _r(t,e,n,i,s=()=>!1){if(!e.startsWith("sensor.")||!Number.isFinite(n)||!Number.isFinite(i)||i<=n||i-n>48*3600)throw new Error("Fen\xEAtre historique invalide.");let o=[];for(let a=n;a<i;a+=12*3600){if(s())throw new Error("Lecture annul\xE9e.");let u=Math.min(i,a+12*3600),d=await t.callWS({type:"history/history_during_period",start_time:new Date(a*1e3).toISOString(),end_time:new Date(u*1e3).toISOString(),entity_ids:[e],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!ct(d))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let f=yr(d[e]??[]);if(o.push(...f.filter(v=>v.time>=a&&v.time<=u)),o.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return Yn(o)}var Wa={setpoint:[["Trajectoire active","setpoint.trajectory_active"],["Boost actif","setpoint.boost_active"]],temperature:[["Temp\xE9rature ext\xE9rieure","temperature.outdoor"," \xB0C"],["Pente int\xE9rieure publi\xE9e","analysis.control.temperature_slope_h"," \xB0C/h",3]],pi:[["Erreur de la voie P","analysis.control.error_p"," \xB0C",4],["Erreur brute de la voie I","temperature.error"," \xB0C",4],["\xC9tat de l\u2019int\xE9grale","temperature.integral_error","",6],["Gain proportionnel Kp","control.kp","",6],["Gain int\xE9gral Ki","control.ki","",6],["Temps int\xE9gral Ti","control.ti_min"," min"],["Source de Kp","analysis.governance.kp_source"],["D\xE9cision sur les gains","analysis.governance.last_decision_gains"]],ff:[["FF1 \xB7 anticipation thermique","analysis.feedforward.u_ff1"," (ratio)",6],["FF2 \xB7 correction apprise","analysis.feedforward.u_ff2"," (ratio)",6],["FF3 \xB7 correction pr\xE9dictive","analysis.feedforward.u_ff3"," (ratio)",6],["Candidat avec FF3","analysis.feedforward.u_ff_effective"," (ratio)",6],["Bande morte active","control.in_deadband"],["Anticipation avant FF3","analysis.feedforward.u_ff_final"," (ratio)",6],["Motif de gel de FF2","analysis.feedforward.ff2_freeze_reason"],["Observateur stationnaire","feedforward.fftrim.stationary.state"],["Dernier rejet stationnaire","feedforward.fftrim.stationary.last_reject_reason"],["Observateur p\xE9riodique","feedforward.fftrim.periodic.state"],["Dernier rejet p\xE9riodique","feedforward.fftrim.periodic.last_reject_reason"],["Transfert de correction","feedforward.fftrim.transfer.state"],["Motif du transfert","feedforward.fftrim.transfer.reason"]],command:[["Sortie PI publi\xE9e","power.pi_percent"," %"],["Anticipation retenue","power.ff_percent"," %"]],direct:[["\xC9tat de l\u2019hyst\xE9r\xE9sis","control.hysteresis_state"],["Phase de calibration","calibration.state"],["Autocalibration","autocalib.state"]],limits:[["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"],["Saturation d\xE9clar\xE9e","control.saturation_state"],["Timing impos\xE9","analysis.control.forced_by_timing"],["Correction anti-windup \u0394u","analysis.control.aw_du"," (ratio)",6],["Source de protection de l\u2019int\xE9grale","temperature.integral_guard_source"]],applied:[["Cycle engag\xE9","power.current_cycle_percent"," %"],["Cycle suivant","power.next_cycle_percent"," %"],["Lin\xE9arisation de vanne","power.valve_linearization_enabled"],["Cycle engag\xE9 \xB7 espace lin\xE9aire","power.linear_current_cycle_percent"," %"],["Cycle suivant \xB7 espace lin\xE9aire","power.linear_next_cycle_percent"," %"],["Statut du retour de commande","feedforward.fftrim.command_ownership.status"]],model:[["Pertes B","model.b"," min\u207B\xB9",6],["Constante thermique \u03C4","model.tau_min"," min",2,"model.tau_reliable"],["Temps mort en chauffe","model.deadtime_heat_s"," s",0,"model.deadtime_heat_reliable"],["Temps mort en refroidissement","model.deadtime_cool_s"," s",0,"model.deadtime_cool_reliable"],["\xC9tape d\u2019apprentissage","learning.stage"],["Dernier motif d\u2019apprentissage","learning.last_reason"],["Gouvernance thermique","governance.thermal_update_decision"],["Motif de gouvernance","governance.thermal_update_reason"],["\xC9tat du jumeau thermique","feedforward.twin_status"],["Temp\xE9rature pr\xE9dite","analysis.twin.twin_T_pred"," \xB0C"],["\xC9quilibre pr\xE9dit","analysis.twin.twin_T_steady"," \xB0C",2,"analysis.twin.twin_T_steady_reliable"]]},Ga={pi:6,ff:5,limits:5},ii=class{constructor(e){this.diagnostic=e}get live(){return this.diagnostic.available?this.diagnostic.live:{}}get bypass(){return this.diagnostic.available?_n(this.diagnostic)||["CoolDown","HeatUp","CoolDownFinal"].includes(String(D(this.live,"calibration.state")))||D(this.live,"control.phase")==="Calibration":!1}get route(){return this.bypass?"direct":D(this.live,"control.mode")==="smartpi"?"pi":"unavailable"}detail(e,n){let i=e.id==="command"&&this.bypass?"direct":e.id,s=Wa[i]??[];return(n?s:s.slice(0,Ga[i]??4)).map(([o,a,u,d,f])=>{let v=wt(this.live,a,f);return{label:o,path:a,reliability:f,value:ie(u===void 0?v:Xe(v),u,d)}})}blocks(){let e=this.live,n=this.bypass,i=this.route==="pi"?"Voie SmartPI":"Chemin non v\xE9rifi\xE9",s=(o,a,u,d,f,v,m)=>({id:o,title:a,path:u,value:ie(D(e,u),d,u==="model.a"?6:2),explanation:f,reason:ie(D(e,v)),reasonPath:v,status:m==="Contourn\xE9"?m:D(e,u)==null?"Indisponible":m??"Publi\xE9"});return[s("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),s("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),s("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",n?"Contourn\xE9":i),s("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",n?"Contourn\xE9":i),s("command",n?"Hyst\xE9r\xE9sis / calibration":"Commande demand\xE9e",n?"power.applied_percent":"power.command_percent"," %",n?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.",n?"control.phase":"control.saturation_state",n?"Voir sortie appliqu\xE9e":"Publi\xE9"),s("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",n?"Contourn\xE9":i),s("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),s("model","Pi\xE8ce et mod\xE8le A/B","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let e=this.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([n,i,s])=>{let o=Xe(D(e,i));return{label:n,path:i,value:o===null?null:o*(s?100:1)}})}};var Ka="uplot",Ya="u-hz",Ja="u-vt",Za="u-title",Qa="u-wrap",Xa="u-under",ec="u-over",tc="u-axis",_i="u-off",ic="u-select",nc="u-cursor-x",sc="u-cursor-y",lc="u-cursor-pt",rc="u-legend",oc="u-live",ac="u-inline",cc="u-series",pc="u-marker",$r="u-label",uc="u-value",Sn="width",kn="height";var Sr="bottom",Gi="left",Ks="right",ul="#000",kr=ul+"0",Ys="mousemove",Ar="mousedown",Js="mouseup",Cr="mouseenter",Er="mouseleave",Tr="dblclick",dc="resize",fc="scroll",Mr="change",es="dppxchange",dl="--",en=typeof window<"u",tl=en?document:null,Yi=en?window:null,hc=en?navigator:null,pe,Jn;function il(){let t=devicePixelRatio;pe!=t&&(pe=t,Jn&&sl(Mr,Jn,il),Jn=matchMedia(`(min-resolution: ${pe-.001}dppx) and (max-resolution: ${pe+.001}dppx)`),$i(Mr,Jn,il),Yi.dispatchEvent(new CustomEvent(es)))}function pt(t,e){if(e!=null){let n=t.classList;!n.contains(e)&&n.add(e)}}function nl(t,e){let n=t.classList;n.contains(e)&&n.remove(e)}function xe(t,e,n){t.style[e]=n+"px"}function Mt(t,e,n,i){let s=tl.createElement(t);return e!=null&&pt(s,e),n?.insertBefore(s,i),s}function xt(t,e){return Mt("div",t,e)}var Pr=new WeakMap;function qt(t,e,n,i,s){let o="translate("+e+"px,"+n+"px)",a=Pr.get(t);o!=a&&(t.style.transform=o,Pr.set(t,o),e<0||n<0||e>i||n>s?pt(t,_i):nl(t,_i))}var Fr=new WeakMap;function Lr(t,e,n){let i=e+n,s=Fr.get(t);i!=s&&(Fr.set(t,i),t.style.background=e,t.style.borderColor=n)}var Dr=new WeakMap;function Rr(t,e,n,i){let s=e+""+n,o=Dr.get(t);s!=o&&(Dr.set(t,s),t.style.height=n+"px",t.style.width=e+"px",t.style.marginLeft=i?-e/2+"px":0,t.style.marginTop=i?-n/2+"px":0)}var fl={passive:!0},mc={...fl,capture:!0};function $i(t,e,n,i){e.addEventListener(t,n,i?mc:fl)}function sl(t,e,n,i){e.removeEventListener(t,n,fl)}en&&il();function Pt(t,e,n,i){let s;n=n||0,i=i||e.length-1;let o=i<=2147483647;for(;i-n>1;)s=o?n+i>>1:ut((n+i)/2),e[s]<t?n=s:i=s;return t-e[n]<=e[i]-t?n:i}function co(t){return(n,i,s)=>{let o=-1,a=-1;for(let u=i;u<=s;u++)if(t(n[u])){o=u;break}for(let u=s;u>=i;u--)if(t(n[u])){a=u;break}return[o,a]}}var po=t=>t!=null,uo=t=>t!=null&&t>0,ns=co(po),gc=co(uo);function bc(t,e,n,i=0,s=!1){let o=s?gc:ns,a=s?uo:po;[e,n]=o(t,e,n);let u=t[e],d=t[e];if(e>-1)if(i==1)u=t[e],d=t[n];else if(i==-1)u=t[n],d=t[e];else for(let f=e;f<=n;f++){let v=t[f];a(v)&&(v<u?u=v:v>d&&(d=v))}return[u??me,d??-me]}function ss(t,e,n,i){let s=Ir(t),o=Ir(e);t==e&&(s==-1?(t*=n,e/=n):(t/=n,e*=n));let a=n==10?Wt:fo,u=s==1?ut:_t,d=o==1?_t:ut,f=u(a(Re(t))),v=d(a(Re(e))),m=Ji(n,f),b=Ji(n,v);return n==10&&(f<0&&(m=ge(m,-f)),v<0&&(b=ge(b,-v))),i||n==2?(t=m*s,e=b*o):(t=bo(t,m),e=ls(e,b)),[t,e]}function hl(t,e,n,i){let s=ss(t,e,n,i);return t==0&&(s[0]=0),e==0&&(s[1]=0),s}var ml=.1,zr={mode:3,pad:ml},Cn={pad:0,soft:null,mode:0},vc={min:Cn,max:Cn};function ts(t,e,n,i){return rs(n)?Hr(t,e,n):(Cn.pad=n,Cn.soft=i?0:null,Cn.mode=i?3:0,Hr(t,e,vc))}function ae(t,e){return t??e}function yc(t,e,n){for(e=ae(e,0),n=ae(n,t.length-1);e<=n;){if(t[e]!=null)return!0;e++}return!1}function Hr(t,e,n){let i=n.min,s=n.max,o=ae(i.pad,0),a=ae(s.pad,0),u=ae(i.hard,-me),d=ae(s.hard,me),f=ae(i.soft,me),v=ae(s.soft,-me),m=ae(i.mode,0),b=ae(s.mode,0),w=e-t,S=Wt(w),F=et(Re(t),Re(e)),z=Wt(F),R=Re(z-S);(w<1e-24||R>10)&&(w=0,(t==0||e==0)&&(w=1e-24,m==2&&f!=me&&(o=0),b==2&&v!=-me&&(a=0)));let x=w||F||1e3,H=Wt(x),k=Ji(10,ut(H)),Z=x*(w==0?t==0?.1:1:o),L=ge(bo(t-Z,k/10),24),Q=t>=f&&(m==1||m==3&&L<=f||m==2&&L>=f)?f:me,G=et(u,L<Q&&t>=Q?Q:Ft(Q,L)),ne=x*(w==0?e==0?.1:1:a),W=ge(ls(e+ne,k/10),24),A=e<=v&&(b==1||b==3&&W>=v||b==2&&W<=v)?v:-me,J=Ft(d,W>A&&e<=A?A:et(A,W));return G==J&&G==0&&(J=100),[G,J]}var wc=new Intl.NumberFormat(en?hc.language:"en-US"),gl=t=>wc.format(t),dt=Math,Xn=dt.PI,Re=dt.abs,ut=dt.floor,De=dt.round,_t=dt.ceil,Ft=dt.min,et=dt.max,Ji=dt.pow,Ir=dt.sign,Wt=dt.log10,fo=dt.log2,xc=(t,e=1)=>dt.sinh(t)*e,Zs=(t,e=1)=>dt.asinh(t/e),me=1/0;function Or(t){return(Wt((t^t>>31)-(t>>31))|0)+1}function ll(t,e,n){return Ft(et(t,e),n)}function ho(t){return typeof t=="function"}function se(t){return ho(t)?t:()=>t}var _c=()=>{},mo=t=>t,go=(t,e)=>e,$c=t=>null,Nr=t=>!0,qr=(t,e)=>t==e,Sc=/\.\d*?(?=9{6,}|0{6,})/gm,Si=t=>{if(yo(t)||si.has(t))return t;let e=`${t}`,n=e.match(Sc);if(n==null)return t;let i=n[0].length-1;if(e.indexOf("e-")!=-1){let[s,o]=e.split("e");return+`${Si(s)}e${o}`}return ge(t,i)};function wi(t,e){return Si(ge(Si(t/e))*e)}function ls(t,e){return Si(_t(Si(t/e))*e)}function bo(t,e){return Si(ut(Si(t/e))*e)}function ge(t,e=0){if(yo(t))return t;let n=10**e,i=t*n*(1+Number.EPSILON);return De(i)/n}var si=new Map;function vo(t){return((""+t).split(".")[1]||"").length}function Tn(t,e,n,i){let s=[],o=i.map(vo);for(let a=e;a<n;a++){let u=Re(a),d=ge(Ji(t,a),u);for(let f=0;f<i.length;f++){let v=t==10?+`${i[f]}e${a}`:i[f]*d,m=(a>=0?0:u)+(a>=o[f]?0:o[f]),b=t==10?v:ge(v,m);s.push(b),si.set(b,m)}}return s}var En={},bl=[],Zi=[null,null],ni=Array.isArray,yo=Number.isInteger,kc=t=>t===void 0;function Ur(t){return typeof t=="string"}function rs(t){let e=!1;if(t!=null){let n=t.constructor;e=n==null||n==Object}return e}function Ac(t){return t!=null&&typeof t=="object"}var Cc=Object.getPrototypeOf(Uint8Array),wo="__proto__";function Qi(t,e=rs){let n;if(ni(t)){let i=t.find(s=>s!=null);if(ni(i)||e(i)){n=Array(t.length);for(let s=0;s<t.length;s++)n[s]=Qi(t[s],e)}else n=t.slice()}else if(t instanceof Cc)n=t.slice();else if(e(t)){n={};for(let i in t)i!=wo&&(n[i]=Qi(t[i],e))}else n=t;return n}function Me(t){let e=arguments;for(let n=1;n<e.length;n++){let i=e[n];for(let s in i)s!=wo&&(rs(t[s])?Me(t[s],Qi(i[s])):t[s]=Qi(i[s]))}return t}var Ec=0,Tc=1,Mc=2;function Pc(t,e,n){for(let i=0,s,o=-1;i<e.length;i++){let a=e[i];if(a>o){for(s=a-1;s>=0&&t[s]==null;)t[s--]=null;for(s=a+1;s<n&&t[s]==null;)t[o=s++]=null}}}function Fc(t,e){if(Rc(t)){let a=t[0].slice();for(let u=1;u<t.length;u++)a.push(...t[u].slice(1));return zc(a[0])||(a=Dc(a)),a}let n=new Set;for(let a=0;a<t.length;a++){let d=t[a][0],f=d.length;for(let v=0;v<f;v++)n.add(d[v])}let i=[Array.from(n).sort((a,u)=>a-u)],s=i[0].length,o=new Map;for(let a=0;a<s;a++)o.set(i[0][a],a);for(let a=0;a<t.length;a++){let u=t[a],d=u[0];for(let f=1;f<u.length;f++){let v=u[f],m=Array(s).fill(void 0),b=e?e[a][f]:Tc,w=[];for(let S=0;S<v.length;S++){let F=v[S],z=o.get(d[S]);F===null?b!=Ec&&(m[z]=F,b==Mc&&w.push(z)):m[z]=F}Pc(m,w,s),i.push(m)}}return i}var Lc=typeof queueMicrotask>"u"?t=>Promise.resolve().then(t):queueMicrotask;function Dc(t){let e=t[0],n=e.length,i=Array(n);for(let o=0;o<i.length;o++)i[o]=o;i.sort((o,a)=>e[o]-e[a]);let s=[];for(let o=0;o<t.length;o++){let a=t[o],u=Array(n);for(let d=0;d<n;d++)u[d]=a[i[d]];s.push(u)}return s}function Rc(t){let e=t[0][0],n=e.length;for(let i=1;i<t.length;i++){let s=t[i][0];if(s.length!=n)return!1;if(s!=e){for(let o=0;o<n;o++)if(s[o]!=e[o])return!1}}return!0}function zc(t,e=100){let n=t.length;if(n<=1)return!0;let i=0,s=n-1;for(;i<=s&&t[i]==null;)i++;for(;s>=i&&t[s]==null;)s--;if(s<=i)return!0;let o=et(1,ut((s-i+1)/e));for(let a=t[i],u=i+o;u<=s;u+=o){let d=t[u];if(d!=null){if(d<=a)return!1;a=d}}return!0}var xo=["January","February","March","April","May","June","July","August","September","October","November","December"],_o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function $o(t){return t.slice(0,3)}var Hc=_o.map($o),Ic=xo.map($o),Oc={MMMM:xo,MMM:Ic,WWWW:_o,WWW:Hc};function $n(t){return(t<10?"0":"")+t}function Nc(t){return(t<10?"00":t<100?"0":"")+t}var qc={YYYY:t=>t.getFullYear(),YY:t=>(t.getFullYear()+"").slice(2),MMMM:(t,e)=>e.MMMM[t.getMonth()],MMM:(t,e)=>e.MMM[t.getMonth()],MM:t=>$n(t.getMonth()+1),M:t=>t.getMonth()+1,DD:t=>$n(t.getDate()),D:t=>t.getDate(),WWWW:(t,e)=>e.WWWW[t.getDay()],WWW:(t,e)=>e.WWW[t.getDay()],HH:t=>$n(t.getHours()),H:t=>t.getHours(),h:t=>{let e=t.getHours();return e==0?12:e>12?e-12:e},AA:t=>t.getHours()>=12?"PM":"AM",aa:t=>t.getHours()>=12?"pm":"am",a:t=>t.getHours()>=12?"p":"a",mm:t=>$n(t.getMinutes()),m:t=>t.getMinutes(),ss:t=>$n(t.getSeconds()),s:t=>t.getSeconds(),fff:t=>Nc(t.getMilliseconds())};function vl(t,e){e=e||Oc;let n=[],i=/\{([a-z]+)\}|[^{]+/gi,s;for(;s=i.exec(t);)n.push(s[0][0]=="{"?qc[s[1]]:s[0]);return o=>{let a="";for(let u=0;u<n.length;u++)a+=typeof n[u]=="string"?n[u]:n[u](o,e);return a}}var Uc=new Intl.DateTimeFormat().resolvedOptions().timeZone;function Vc(t,e){let n;return e=="UTC"||e=="Etc/UTC"?n=new Date(+t+t.getTimezoneOffset()*6e4):e==Uc?n=t:(n=new Date(t.toLocaleString("en-US",{timeZone:e})),n.setMilliseconds(t.getMilliseconds())),n}var So=t=>t%1==0,is=[1,2,2.5,5],Bc=Tn(10,-32,0,is),ko=Tn(10,0,32,is),jc=ko.filter(So),xi=Bc.concat(ko),yl=`
`,Ao="{YYYY}",Vr=yl+Ao,Co="{M}/{D}",An=yl+Co,Zn=An+"/{YY}",Eo="{aa}",Wc="{h}:{mm}",Ki=Wc+Eo,Br=yl+Ki,jr=":{ss}",de=null;function To(t){let e=t*1e3,n=e*60,i=n*60,s=i*24,o=s*30,a=s*365,d=(t==1?Tn(10,0,3,is).filter(So):Tn(10,-3,0,is)).concat([e,e*5,e*10,e*15,e*30,n,n*5,n*10,n*15,n*30,i,i*2,i*3,i*4,i*6,i*8,i*12,s,s*2,s*3,s*4,s*5,s*6,s*7,s*8,s*9,s*10,s*15,o,o*2,o*3,o*4,o*6,a,a*2,a*5,a*10,a*25,a*50,a*100]),f=[[a,Ao,de,de,de,de,de,de,1],[s*28,"{MMM}",Vr,de,de,de,de,de,1],[s,Co,Vr,de,de,de,de,de,1],[i,"{h}"+Eo,Zn,de,An,de,de,de,1],[n,Ki,Zn,de,An,de,de,de,1],[e,jr,Zn+" "+Ki,de,An+" "+Ki,de,Br,de,1],[t,jr+".{fff}",Zn+" "+Ki,de,An+" "+Ki,de,Br,de,1]];function v(m){return(b,w,S,F,z,R)=>{let x=[],H=z>=a,k=z>=o&&z<a,Z=m(S),L=ge(Z*t,3),Q=Qs(Z.getFullYear(),H?0:Z.getMonth(),k||H?1:Z.getDate()),G=ge(Q*t,3);if(k||H){let ne=k?z/o:0,W=H?z/a:0,A=L==G?L:ge(Qs(Q.getFullYear()+W,Q.getMonth()+ne,1)*t,3),J=new Date(De(A/t)),I=J.getFullYear(),B=J.getMonth();for(let U=0;A<=F;U++){let le=Qs(I+W*U,B+ne*U,1),q=le-m(ge(le*t,3));A=ge((+le+q)*t,3),A<=F&&x.push(A)}}else{let ne=z>=s?s:z,W=ut(S)-ut(L),A=G+W+ls(L-G,ne);x.push(A);let J=m(A),I=J.getHours()+J.getMinutes()/n+J.getSeconds()/i,B=z/i,U=b.axes[w]._space,le=R/U;for(;A=ge(A+z,t==1?0:3),!(A>F);)if(B>1){let q=ut(ge(I+B,6))%24,re=m(A).getHours()-q;re>1&&(re=-1),A-=re*i,I=(I+B)%24;let fe=x[x.length-1];ge((A-fe)/z,3)*le>=.7&&x.push(A)}else x.push(A)}return x}}return[d,f,v]}var[Gc,Kc,Yc]=To(1),[Jc,Zc,Qc]=To(.001);Tn(2,-53,53,[1]);function Wr(t,e){return t.map(n=>n.map((i,s)=>s==0||s==8||i==null?i:e(s==1||n[8]==0?i:n[1]+i)))}function Gr(t,e){return(n,i,s,o,a)=>{let u=e.find(S=>a>=S[0])||e[e.length-1],d,f,v,m,b,w;return i.map(S=>{let F=t(S),z=F.getFullYear(),R=F.getMonth(),x=F.getDate(),H=F.getHours(),k=F.getMinutes(),Z=F.getSeconds(),L=z!=d&&u[2]||R!=f&&u[3]||x!=v&&u[4]||H!=m&&u[5]||k!=b&&u[6]||Z!=w&&u[7]||u[1];return d=z,f=R,v=x,m=H,b=k,w=Z,L(F)})}}function Xc(t,e){let n=vl(e);return(i,s,o,a,u)=>s.map(d=>n(t(d)))}function Qs(t,e,n){return new Date(t,e,n)}function Kr(t,e){return e(t)}var ep="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Yr(t,e){return(n,i,s,o)=>o==null?dl:e(t(i))}function tp(t,e){let n=t.series[e];return n.width?n.stroke(t,e):n.points.width?n.points.stroke(t,e):null}function ip(t,e){return t.series[e].fill(t,e)}var np={show:!0,live:!0,isolate:!1,mount:_c,markers:{show:!0,width:2,stroke:tp,fill:ip,dash:"solid"},idx:null,idxs:null,values:[]};function sp(t,e){let n=t.cursor.points,i=xt(),s=n.size(t,e);xe(i,Sn,s),xe(i,kn,s);let o=s/-2;xe(i,"marginLeft",o),xe(i,"marginTop",o);let a=n.width(t,e,s);return a&&xe(i,"borderWidth",a),i}function lp(t,e){let n=t.series[e].points;return n._fill||n._stroke}function rp(t,e){let n=t.series[e].points;return n._stroke||n._fill}function op(t,e){return t.series[e].points.size}var Xs=[0,0];function ap(t,e,n){return Xs[0]=e,Xs[1]=n,Xs}function Qn(t,e,n,i=!0){return s=>{s.button==0&&(!i||s.target==e)&&n(s)}}function el(t,e,n,i=!0){return s=>{(!i||s.target==e)&&n(s)}}var cp={show:!0,x:!0,y:!0,lock:!1,move:ap,points:{one:!1,show:sp,size:op,width:0,stroke:rp,fill:lp},bind:{mousedown:Qn,mouseup:Qn,click:Qn,dblclick:Qn,mousemove:el,mouseleave:el,mouseenter:el},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(t,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(t,e,n,i,s)=>i-s,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Mo={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},wl=Me({},Mo,{filter:go}),Po=Me({},wl,{size:10}),Fo=Me({},Mo,{show:!1}),xl='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Lo="bold "+xl,Do=1.5,Jr={show:!0,scale:"x",stroke:ul,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Lo,side:2,grid:wl,ticks:Po,border:Fo,font:xl,lineGap:Do,rotate:0},pp="Value",up="Time",Zr={show:!0,scale:"x",auto:!1,sorted:1,min:me,max:-me,idxs:[]};function dp(t,e,n,i,s){return e.map(o=>o==null?"":gl(o))}function fp(t,e,n,i,s,o,a){let u=[],d=si.get(s)||0;n=a?n:ge(ls(n,s),d);for(let f=n;f<=i;f=ge(f+s,d))u.push(Object.is(f,-0)?0:f);return u}function rl(t,e,n,i,s,o,a){let u=[],d=t.scales[t.axes[e].scale].log,f=d==10?Wt:fo,v=ut(f(n));s=Ji(d,v),d==10&&(s=xi[Pt(s,xi)]);let m=n,b=s*d;d==10&&(b=xi[Pt(b,xi)]);do u.push(m),m=m+s,d==10&&!si.has(m)&&(m=ge(m,si.get(s))),m>=b&&(s=m,b=s*d,d==10&&(b=xi[Pt(b,xi)]));while(m<=i);return u}function hp(t,e,n,i,s,o,a){let d=t.scales[t.axes[e].scale].asinh,f=i>d?rl(t,e,et(d,n),i,s):[d],v=i>=0&&n<=0?[0]:[];return(n<-d?rl(t,e,et(d,-i),-n,s):[d]).reverse().map(b=>-b).concat(v,f)}var Ro=/./,mp=/[12357]/,gp=/[125]/,Qr=/1/,ol=(t,e,n,i)=>t.map((s,o)=>e==4&&s==0||o%i==0&&n.test(s.toExponential()[s<0?1:0])?s:null);function bp(t,e,n,i,s){let o=t.axes[n],a=o.scale,u=t.scales[a],d=t.valToPos,f=o._space,v=d(10,a),m=d(9,a)-v>=f?Ro:d(7,a)-v>=f?mp:d(5,a)-v>=f?gp:Qr;if(m==Qr){let b=Re(d(1,a)-v);if(b<f)return ol(e.slice().reverse(),u.distr,m,_t(f/b)).reverse()}return ol(e,u.distr,m,1)}function vp(t,e,n,i,s){let o=t.axes[n],a=o.scale,u=o._space,d=t.valToPos,f=Re(d(1,a)-d(2,a));return f<u?ol(e.slice().reverse(),3,Ro,_t(u/f)).reverse():e}function yp(t,e,n,i){return i==null?dl:e==null?"":gl(e)}var Xr={show:!0,scale:"y",stroke:ul,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Lo,side:3,grid:wl,ticks:Po,border:Fo,font:xl,lineGap:Do,rotate:0};function wp(t,e){let n=3+(t||1)*2;return ge(n*e,3)}function xp(t,e){let{scale:n,idxs:i}=t.series[0],s=t._data[0],o=t.valToPos(s[i[0]],n,!0),a=t.valToPos(s[i[1]],n,!0),u=Re(a-o),d=t.series[e],f=u/(d.points.space*pe);return i[1]-i[0]<=f}var eo={scale:null,auto:!0,sorted:0,min:me,max:-me},zo=(t,e,n,i,s)=>s,to={show:!0,auto:!0,sorted:0,gaps:zo,alpha:1,facets:[Me({},eo,{scale:"x"}),Me({},eo,{scale:"y"})]},io={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:zo,alpha:1,points:{show:xp,filter:null},values:null,min:me,max:-me,idxs:[],path:null,clip:null};function _p(t,e,n,i,s){return n/10}var Ho={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},$p=Me({},Ho,{time:!1,ori:1}),no={};function Io(t,e){let n=no[t];return n||(n={key:t,plots:[],sub(i){n.plots.push(i)},unsub(i){n.plots=n.plots.filter(s=>s!=i)},pub(i,s,o,a,u,d,f){for(let v=0;v<n.plots.length;v++)n.plots[v]!=s&&n.plots[v].pub(i,s,o,a,u,d,f)}},t!=null&&(no[t]=n)),n}var Xi=1,al=2;function ki(t,e,n){let i=t.mode,s=t.series[e],o=i==2?t._data[e]:t._data,a=t.scales,u=t.bbox,d=o[0],f=i==2?o[1]:o[e],v=i==2?a[s.facets[0].scale]:a[t.series[0].scale],m=i==2?a[s.facets[1].scale]:a[s.scale],b=u.left,w=u.top,S=u.width,F=u.height,z=t.valToPosH,R=t.valToPosV;return v.ori==0?n(s,d,f,v,m,z,R,b,w,S,F,as,tn,ps,No,Uo):n(s,d,f,v,m,R,z,w,b,F,S,cs,nn,Sl,qo,Vo)}function _l(t,e){let n=0,i=0,s=ae(t.bands,bl);for(let o=0;o<s.length;o++){let a=s[o];a.series[0]==e?n=a.dir:a.series[1]==e&&(a.dir==1?i|=1:i|=2)}return[n,i==1?-1:i==2?1:i==3?2:0]}function Sp(t,e,n,i,s){let o=t.mode,a=t.series[e],u=o==2?a.facets[1].scale:a.scale,d=t.scales[u];return s==-1?d.min:s==1?d.max:d.distr==3?d.dir==1?d.min:d.max:0}function Gt(t,e,n,i,s,o){return ki(t,e,(a,u,d,f,v,m,b,w,S,F,z)=>{let R=a.pxRound,x=f.dir*(f.ori==0?1:-1),H=f.ori==0?tn:nn,k,Z;x==1?(k=n,Z=i):(k=i,Z=n);let L=R(m(u[k],f,F,w)),Q=R(b(d[k],v,z,S)),G=R(m(u[Z],f,F,w)),ne=R(b(o==1?v.max:v.min,v,z,S)),W=new Path2D(s);return H(W,G,ne),H(W,L,ne),H(W,L,Q),W})}function os(t,e,n,i,s,o){let a=null;if(t.length>0){a=new Path2D;let u=e==0?ps:Sl,d=n;for(let m=0;m<t.length;m++){let b=t[m];if(b[1]>b[0]){let w=b[0]-d;w>0&&u(a,d,i,w,i+o),d=b[1]}}let f=n+s-d,v=10;f>0&&u(a,d,i-v/2,f,i+o+v)}return a}function kp(t,e,n){let i=t[t.length-1];i&&i[0]==e?i[1]=n:t.push([e,n])}function $l(t,e,n,i,s,o,a){let u=[],d=t.length;for(let f=s==1?n:i;f>=n&&f<=i;f+=s)if(e[f]===null){let m=f,b=f;if(s==1)for(;++f<=i&&e[f]===null;)b=f;else for(;--f>=n&&e[f]===null;)b=f;let w=o(t[m]),S=b==m?w:o(t[b]),F=m-s;w=a<=0&&F>=0&&F<d?o(t[F]):w;let R=b+s;S=a>=0&&R>=0&&R<d?o(t[R]):S,S>=w&&u.push([w,S])}return u}function so(t){return t==0?mo:t==1?De:e=>wi(e,t)}function Oo(t){let e=t==0?as:cs,n=t==0?(s,o,a,u,d,f)=>{s.arcTo(o,a,u,d,f)}:(s,o,a,u,d,f)=>{s.arcTo(a,o,d,u,f)},i=t==0?(s,o,a,u,d)=>{s.rect(o,a,u,d)}:(s,o,a,u,d)=>{s.rect(a,o,d,u)};return(s,o,a,u,d,f=0,v=0)=>{f==0&&v==0?i(s,o,a,u,d):(f=Ft(f,u/2,d/2),v=Ft(v,u/2,d/2),e(s,o+f,a),n(s,o+u,a,o+u,a+d,f),n(s,o+u,a+d,o,a+d,v),n(s,o,a+d,o,a,v),n(s,o,a,o+u,a,f),s.closePath())}}var as=(t,e,n)=>{t.moveTo(e,n)},cs=(t,e,n)=>{t.moveTo(n,e)},tn=(t,e,n)=>{t.lineTo(e,n)},nn=(t,e,n)=>{t.lineTo(n,e)},ps=Oo(0),Sl=Oo(1),No=(t,e,n,i,s,o)=>{t.arc(e,n,i,s,o)},qo=(t,e,n,i,s,o)=>{t.arc(n,e,i,s,o)},Uo=(t,e,n,i,s,o,a)=>{t.bezierCurveTo(e,n,i,s,o,a)},Vo=(t,e,n,i,s,o,a)=>{t.bezierCurveTo(n,e,s,i,a,o)};function Bo(t){return(e,n,i,s,o)=>ki(e,n,(a,u,d,f,v,m,b,w,S,F,z)=>{let{pxRound:R,points:x}=a,H,k;f.ori==0?(H=as,k=No):(H=cs,k=qo);let Z=ge(x.width*pe,3),L=(x.size-x.width)/2*pe,Q=ge(L*2,3),G=new Path2D,ne=new Path2D,{left:W,top:A,width:J,height:I}=e.bbox;ps(ne,W-Q,A-Q,J+Q*2,I+Q*2);let B=U=>{if(d[U]!=null){let le=R(m(u[U],f,F,w)),q=R(b(d[U],v,z,S));H(G,le+L,q),k(G,le,q,L,0,Xn*2)}};if(o)o.forEach(B);else for(let U=i;U<=s;U++)B(U);return{stroke:Z>0?G:null,fill:G,clip:ne,flags:Xi|al}})}function jo(t){return(e,n,i,s,o,a)=>{i!=s&&(o!=i&&a!=i&&t(e,n,i),o!=s&&a!=s&&t(e,n,s),t(e,n,a))}}var Ap=jo(tn),Cp=jo(nn);function Wo(t){let e=ae(t?.alignGaps,0);return(n,i,s,o)=>ki(n,i,(a,u,d,f,v,m,b,w,S,F,z)=>{[s,o]=ns(d,s,o);let R=a.pxRound,x=I=>R(m(I,f,F,w)),H=I=>R(b(I,v,z,S)),k,Z;f.ori==0?(k=tn,Z=Ap):(k=nn,Z=Cp);let L=f.dir*(f.ori==0?1:-1),Q={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},G=Q.stroke,ne=!1;if(o-s>=F*4){let I=O=>n.posToVal(O,f.key,!0),B=null,U=null,le,q,tt,_e=x(u[L==1?s:o]),re=x(u[s]),fe=x(u[o]),X=I(L==1?re+1:fe-1);for(let O=L==1?s:o;O>=s&&O<=o;O+=L){let Fe=u[O],$e=(L==1?Fe<X:Fe>X)?_e:x(Fe),ue=d[O];$e==_e?ue!=null?(q=ue,B==null?(k(G,$e,H(q)),le=B=U=q):q<B?B=q:q>U&&(U=q)):ue===null&&(ne=!0):(B!=null&&Z(G,_e,H(B),H(U),H(le),H(q)),ue!=null?(q=ue,k(G,$e,H(q)),B=U=le=q):(B=U=null,ue===null&&(ne=!0)),_e=$e,X=I(_e+L))}B!=null&&B!=U&&tt!=_e&&Z(G,_e,H(B),H(U),H(le),H(q))}else for(let I=L==1?s:o;I>=s&&I<=o;I+=L){let B=d[I];B===null?ne=!0:B!=null&&k(G,x(u[I]),H(B))}let[A,J]=_l(n,i);if(a.fill!=null||A!=0){let I=Q.fill=new Path2D(G),B=a.fillTo(n,i,a.min,a.max,A),U=H(B),le=x(u[s]),q=x(u[o]);L==-1&&([q,le]=[le,q]),k(I,q,U),k(I,le,U)}if(!a.spanGaps){let I=[];ne&&I.push(...$l(u,d,s,o,L,x,e)),Q.gaps=I=a.gaps(n,i,s,o,I),Q.clip=os(I,f.ori,w,S,F,z)}return J!=0&&(Q.band=J==2?[Gt(n,i,s,o,G,-1),Gt(n,i,s,o,G,1)]:Gt(n,i,s,o,G,J)),Q})}function Ep(t){let e=ae(t.align,1),n=ae(t.ascDesc,!1),i=ae(t.alignGaps,0),s=ae(t.extend,!1);return(o,a,u,d)=>ki(o,a,(f,v,m,b,w,S,F,z,R,x,H)=>{[u,d]=ns(m,u,d);let k=f.pxRound,{left:Z,width:L}=o.bbox,Q=re=>k(S(re,b,x,z)),G=re=>k(F(re,w,H,R)),ne=b.ori==0?tn:nn,W={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},A=W.stroke,J=b.dir*(b.ori==0?1:-1),I=G(m[J==1?u:d]),B=Q(v[J==1?u:d]),U=B,le=B;s&&e==-1&&(le=Z,ne(A,le,I)),ne(A,B,I);for(let re=J==1?u:d;re>=u&&re<=d;re+=J){let fe=m[re];if(fe==null)continue;let X=Q(v[re]),O=G(fe);e==1?ne(A,X,I):ne(A,U,O),ne(A,X,O),I=O,U=X}let q=U;s&&e==1&&(q=Z+L,ne(A,q,I));let[tt,_e]=_l(o,a);if(f.fill!=null||tt!=0){let re=W.fill=new Path2D(A),fe=f.fillTo(o,a,f.min,f.max,tt),X=G(fe);ne(re,q,X),ne(re,le,X)}if(!f.spanGaps){let re=[];re.push(...$l(v,m,u,d,J,Q,i));let fe=f.width*pe/2,X=n||e==1?fe:-fe,O=n||e==-1?-fe:fe;re.forEach(Fe=>{Fe[0]+=X,Fe[1]+=O}),W.gaps=re=f.gaps(o,a,u,d,re),W.clip=os(re,b.ori,z,R,x,H)}return _e!=0&&(W.band=_e==2?[Gt(o,a,u,d,A,-1),Gt(o,a,u,d,A,1)]:Gt(o,a,u,d,A,_e)),W})}function lo(t,e,n,i,s,o,a=me){if(t.length>1){let u=null;for(let d=0,f=1/0;d<t.length;d++)if(e[d]!==void 0){if(u!=null){let v=Re(t[d]-t[u]);v<f&&(f=v,a=Re(n(t[d],i,s,o)-n(t[u],i,s,o)))}u=d}}return a}function Tp(t){t=t||En;let e=ae(t.size,[.6,me,1]),n=t.align||0,i=t.gap||0,s=t.radius;s=s==null?[0,0]:typeof s=="number"?[s,0]:s;let o=se(s),a=1-e[0],u=ae(e[1],me),d=ae(e[2],1),f=ae(t.disp,En),v=ae(t.each,w=>{}),{fill:m,stroke:b}=f;return(w,S,F,z)=>ki(w,S,(R,x,H,k,Z,L,Q,G,ne,W,A)=>{let J=R.pxRound,I=n,B=i*pe,U=u*pe,le=d*pe,q,tt;k.ori==0?[q,tt]=o(w,S):[tt,q]=o(w,S);let _e=k.dir*(k.ori==0?1:-1),re=k.ori==0?ps:Sl,fe=k.ori==0?v:(M,be,Le,Ti,ai,Dt,ci)=>{v(M,be,Le,ai,Ti,ci,Dt)},X=ae(w.bands,bl).find(M=>M.series[0]==S),O=X!=null?X.dir:0,Fe=R.fillTo(w,S,R.min,R.max,O),Ke=J(Q(Fe,Z,A,ne)),$e,ue,$t,st=W,Ae=J(R.width*pe),Lt=!1,Ut=null,ht=null,Yt=null,Ai=null;m!=null&&(Ae==0||b!=null)&&(Lt=!0,Ut=m.values(w,S,F,z),ht=new Map,new Set(Ut).forEach(M=>{M!=null&&ht.set(M,new Path2D)}),Ae>0&&(Yt=b.values(w,S,F,z),Ai=new Map,new Set(Yt).forEach(M=>{M!=null&&Ai.set(M,new Path2D)})));let{x0:Ci,size:ln}=f;if(Ci!=null&&ln!=null){I=1,x=Ci.values(w,S,F,z),Ci.unit==2&&(x=x.map(Le=>w.posToVal(G+Le*W,k.key,!0)));let M=ln.values(w,S,F,z);ln.unit==2?ue=M[0]*W:ue=L(M[0],k,W,G)-L(0,k,W,G),st=lo(x,H,L,k,W,G,st),$t=st-ue+B}else st=lo(x,H,L,k,W,G,st),$t=st*a+B,ue=st-$t;$t<1&&($t=0),Ae>=ue/2&&(Ae=0),$t<5&&(J=mo);let Mn=$t>0,ri=st-$t-(Mn?Ae:0);ue=J(ll(ri,le,U)),$e=(I==0?ue/2:I==_e?0:ue)-I*_e*((I==0?B/2:0)+(Mn?Ae/2:0));let Ye={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Ei=Lt?null:new Path2D,Vt=null;if(X!=null)Vt=w.data[X.series[1]];else{let{y0:M,y1:be}=f;M!=null&&be!=null&&(H=be.values(w,S,F,z),Vt=M.values(w,S,F,z))}let oi=q*ue,K=tt*ue;for(let M=_e==1?F:z;M>=F&&M<=z;M+=_e){let be=H[M];if(be==null)continue;if(Vt!=null){let it=Vt[M]??0;if(be-it==0)continue;Ke=Q(it,Z,A,ne)}let Le=k.distr!=2||f!=null?x[M]:M,Ti=L(Le,k,W,G),ai=Q(ae(be,Fe),Z,A,ne),Dt=J(Ti-$e),ci=J(et(ai,Ke)),lt=J(Ft(ai,Ke)),mt=ci-lt;if(be!=null){let it=be<0?K:oi,St=be<0?oi:K;Lt?(Ae>0&&Yt[M]!=null&&re(Ai.get(Yt[M]),Dt,lt+ut(Ae/2),ue,et(0,mt-Ae),it,St),Ut[M]!=null&&re(ht.get(Ut[M]),Dt,lt+ut(Ae/2),ue,et(0,mt-Ae),it,St)):re(Ei,Dt,lt+ut(Ae/2),ue,et(0,mt-Ae),it,St),fe(w,S,M,Dt-Ae/2,lt,ue+Ae,mt)}}return Ae>0?Ye.stroke=Lt?Ai:Ei:Lt||(Ye._fill=R.width==0?R._fill:R._stroke??R._fill,Ye.width=0),Ye.fill=Lt?ht:Ei,Ye})}function Mp(t,e){let n=ae(e?.alignGaps,0);return(i,s,o,a)=>ki(i,s,(u,d,f,v,m,b,w,S,F,z,R)=>{[o,a]=ns(f,o,a);let x=u.pxRound,H=q=>x(b(q,v,z,S)),k=q=>x(w(q,m,R,F)),Z,L,Q;v.ori==0?(Z=as,Q=tn,L=Uo):(Z=cs,Q=nn,L=Vo);let G=v.dir*(v.ori==0?1:-1),ne=H(d[G==1?o:a]),W=ne,A=[],J=[];for(let q=G==1?o:a;q>=o&&q<=a;q+=G)if(f[q]!=null){let _e=d[q],re=H(_e);A.push(W=re),J.push(k(f[q]))}let I={stroke:t(A,J,Z,Q,L,x),fill:null,clip:null,band:null,gaps:null,flags:Xi},B=I.stroke,[U,le]=_l(i,s);if(u.fill!=null||U!=0){let q=I.fill=new Path2D(B),tt=u.fillTo(i,s,u.min,u.max,U),_e=k(tt);Q(q,W,_e),Q(q,ne,_e)}if(!u.spanGaps){let q=[];q.push(...$l(d,f,o,a,G,H,n)),I.gaps=q=u.gaps(i,s,o,a,q),I.clip=os(q,v.ori,S,F,z,R)}return le!=0&&(I.band=le==2?[Gt(i,s,o,a,B,-1),Gt(i,s,o,a,B,1)]:Gt(i,s,o,a,B,le)),I})}function Pp(t){return Mp(Fp,t)}function Fp(t,e,n,i,s,o){let a=t.length;if(a<2)return null;let u=new Path2D;if(n(u,t[0],e[0]),a==2)i(u,t[1],e[1]);else{let d=Array(a),f=Array(a-1),v=Array(a-1),m=Array(a-1);for(let b=0;b<a-1;b++)v[b]=e[b+1]-e[b],m[b]=t[b+1]-t[b],f[b]=v[b]/m[b];d[0]=f[0];for(let b=1;b<a-1;b++)f[b]===0||f[b-1]===0||f[b-1]>0!=f[b]>0?d[b]=0:(d[b]=3*(m[b-1]+m[b])/((2*m[b]+m[b-1])/f[b-1]+(m[b]+2*m[b-1])/f[b]),isFinite(d[b])||(d[b]=0));d[a-1]=f[a-2];for(let b=0;b<a-1;b++)s(u,t[b]+m[b]/3,e[b]+d[b]*m[b]/3,t[b+1]-m[b]/3,e[b+1]-d[b+1]*m[b]/3,t[b+1],e[b+1])}return u}var cl=new Set;function ro(){for(let t of cl)t.syncRect(!0)}en&&($i(dc,Yi,ro),$i(fc,Yi,ro,!0),$i(es,Yi,()=>{Ue.pxRatio=pe}));var Lp=Wo(),Dp=Bo();function oo(t,e,n,i){return(i?[t[0],t[1]].concat(t.slice(2)):[t[0]].concat(t.slice(1))).map((o,a)=>pl(o,a,e,n))}function Rp(t,e){return t.map((n,i)=>i==0?{}:Me({},e,n))}function pl(t,e,n,i){return Me({},e==0?n:i,t)}function Go(t,e,n){return e==null?Zi:[e,n]}var zp=Go;function Hp(t,e,n){return e==null?Zi:ts(e,n,ml,!0)}function Ko(t,e,n,i){return e==null?Zi:ss(e,n,t.scales[i].log,!1)}var Ip=Ko;function Yo(t,e,n,i){return e==null?Zi:hl(e,n,t.scales[i].log,!1)}var Op=Yo;function Np(t,e,n,i,s){let o=et(Or(t),Or(e)),a=e-t,u=Pt(s/i*a,n);do{let d=n[u],f=i*d/a;if(f>=s&&o+(d<5?si.get(d):0)<=17)return[d,f]}while(++u<n.length);return[0,0]}function ao(t){let e,n;return t=t.replace(/(\d+)px/,(i,s)=>(e=De((n=+s)*pe))+"px"),[t,e,n]}function qp(t){t.show&&[t.font,t.labelFont].forEach(e=>{let n=ge(e[2]*pe,1);e[0]=e[0].replace(/[0-9.]+px/,n+"px"),e[1]=n})}function Ue(t,e,n){let i={mode:ae(t.mode,1)},s=i.mode;function o(l,r,c,p){let h=r.valToPct(l);return p+c*(r.dir==-1?1-h:h)}function a(l,r,c,p){let h=r.valToPct(l);return p+c*(r.dir==-1?h:1-h)}function u(l,r,c,p){return r.ori==0?o(l,r,c,p):a(l,r,c,p)}i.valToPosH=o,i.valToPosV=a;let d=!1;i.status=0;let f=i.root=xt(Ka);if(t.id!=null&&(f.id=t.id),pt(f,t.class),t.title){let l=xt(Za,f);l.textContent=t.title}let v=Mt("canvas"),m=i.ctx=v.getContext("2d"),b=xt(Qa,f);$i("click",b,l=>{l.target===S&&(ve!=Ni||Se!=qi)&&Be.click(i,l)},!0);let w=i.under=xt(Xa,b);b.appendChild(v);let S=i.over=xt(ec,b);t=Qi(t);let F=+ae(t.pxAlign,1),z=so(F);(t.plugins||[]).forEach(l=>{l.opts&&(t=l.opts(i,t)||t)});let R=t.ms||.001,x=i.series=s==1?oo(t.series||[],Zr,io,!1):Rp(t.series||[null],to),H=i.axes=oo(t.axes||[],Jr,Xr,!0),k=i.scales={},Z=i.bands=t.bands||[];Z.forEach(l=>{l.fill=se(l.fill||null),l.dir=ae(l.dir,-1)});let L=s==2?x[1].facets[0].scale:x[0].scale,Q={axes:da,series:oa},G=(t.drawOrder||["axes","series"]).map(l=>Q[l]);function ne(l){let r=l.distr==3?c=>Wt(c>0?c:l.clamp(i,c,l.min,l.max,l.key)):l.distr==4?c=>Zs(c,l.asinh):l.distr==100?c=>l.fwd(c):c=>c;return c=>{let p=r(c),{_min:h,_max:g}=l,y=g-h;return(p-h)/y}}function W(l){let r=k[l];if(r==null){let c=(t.scales||En)[l]||En;if(c.from!=null){W(c.from);let p=Me({},k[c.from],c,{key:l});p.valToPct=ne(p),k[l]=p}else{r=k[l]=Me({},l==L?Ho:$p,c),r.key=l;let p=r.time,h=r.range,g=ni(h);if((l!=L||s==2&&!p)&&(g&&(h[0]==null||h[1]==null)&&(h={min:h[0]==null?zr:{mode:1,hard:h[0],soft:h[0]},max:h[1]==null?zr:{mode:1,hard:h[1],soft:h[1]}},g=!1),!g&&rs(h))){let y=h;h=(_,$,E)=>$==null?Zi:ts($,E,y)}r.range=se(h||(p?zp:l==L?r.distr==3?Ip:r.distr==4?Op:Go:r.distr==3?Ko:r.distr==4?Yo:Hp)),r.auto=se(g?!1:r.auto),r.clamp=se(r.clamp||_p),r._min=r._max=null,r.valToPct=ne(r)}}}W("x"),W("y"),s==1&&x.forEach(l=>{W(l.scale)}),H.forEach(l=>{W(l.scale)});for(let l in t.scales)W(l);let A=k[L],J=A.distr,I,B;A.ori==0?(pt(f,Ya),I=o,B=a):(pt(f,Ja),I=a,B=o);let U={};for(let l in k){let r=k[l];(r.min!=null||r.max!=null)&&(U[l]={min:r.min,max:r.max},r.min=r.max=null)}let le=t.tzDate||(l=>new Date(De(l/R))),q=t.fmtDate||vl,tt=R==1?Yc(le):Qc(le),_e=Gr(le,Wr(R==1?Kc:Zc,q)),re=Yr(le,Kr(ep,q)),fe=[],X=i.legend=Me({},np,t.legend),O=i.cursor=Me({},cp,{drag:{y:s==2}},t.cursor),Fe=X.show,Ke=O.show,$e=X.markers;X.idxs=fe,$e.width=se($e.width),$e.dash=se($e.dash),$e.stroke=se($e.stroke),$e.fill=se($e.fill);let ue,$t,st,Ae=[],Lt=[],Ut,ht=!1,Yt={};if(X.live){let l=x[1]?x[1].values:null;ht=l!=null,Ut=ht?l(i,1,0):{_:0};for(let r in Ut)Yt[r]=dl}if(Fe)if(ue=Mt("table",rc,f),st=Mt("tbody",null,ue),X.mount(i,ue),ht){$t=Mt("thead",null,ue,st);let l=Mt("tr",null,$t);Mt("th",null,l);for(var Ai in Ut)Mt("th",$r,l).textContent=Ai}else pt(ue,ac),X.live&&pt(ue,oc);let Ci={show:!0},ln={show:!1};function Mn(l,r){if(r==0&&(ht||!X.live||s==2))return Zi;let c=[],p=Mt("tr",cc,st,st.childNodes[r]);pt(p,l.class),l.show||pt(p,_i);let h=Mt("th",null,p);if($e.show){let _=xt(pc,h);if(r>0){let $=$e.width(i,r);$&&(_.style.border=$+"px "+$e.dash(i,r)+" "+$e.stroke(i,r)),_.style.background=$e.fill(i,r)}}let g=xt($r,h);l.label instanceof HTMLElement?g.appendChild(l.label):g.textContent=l.label,r>0&&($e.show||(g.style.color=l.width>0?$e.stroke(i,r):$e.fill(i,r)),Ye("click",h,_=>{if(O._lock)return;ui(_);let $=x.indexOf(l);if((_.ctrlKey||_.metaKey)!=X.isolate){let E=x.some((T,P)=>P>0&&P!=$&&T.show);x.forEach((T,P)=>{P>0&&zt(P,E?P==$?Ci:ln:Ci,!0,Te.setSeries)})}else zt($,{show:!l.show},!0,Te.setSeries)},!1),Pi&&Ye(Cr,h,_=>{O._lock||(ui(_),zt(x.indexOf(l),Vi,!0,Te.setSeries))},!1));for(var y in Ut){let _=Mt("td",uc,p);_.textContent="--",c.push(_)}return[p,c]}let ri=new Map;function Ye(l,r,c,p=!0){let h=ri.get(r)||{},g=O.bind[l](i,r,c,p);g&&($i(l,r,h[l]=g),ri.set(r,h))}function Ei(l,r,c){let p=ri.get(r)||{};for(let h in p)(l==null||h==l)&&(sl(h,r,p[h]),delete p[h]);l==null&&ri.delete(r)}let Vt=0,oi=0,K=0,M=0,be=0,Le=0,Ti=be,ai=Le,Dt=K,ci=M,lt=0,mt=0,it=0,St=0;i.bbox={};let us=!1,Pn=!1,Mi=!1,pi=!1,Fn=!1,gt=!1;function ds(l,r,c){(c||l!=i.width||r!=i.height)&&kl(l,r),zi(!1),Mi=!0,Pn=!0,Hi()}function kl(l,r){i.width=Vt=K=l,i.height=oi=M=r,be=Le=0,ea(),ta();let c=i.bbox;lt=c.left=wi(be*pe,.5),mt=c.top=wi(Le*pe,.5),it=c.width=wi(K*pe,.5),St=c.height=wi(M*pe,.5)}let Zo=3;function Qo(){let l=!1,r=0;for(;!l;){r++;let c=pa(r),p=ua(r);l=r==Zo||c&&p,l||(kl(i.width,i.height),Pn=!0)}}function Xo({width:l,height:r}){ds(l,r)}i.setSize=Xo;function ea(){let l=!1,r=!1,c=!1,p=!1;H.forEach((h,g)=>{if(h.show&&h._show){let{side:y,_size:_}=h,$=y%2,E=h.label!=null?h.labelSize:0,T=_+E;T>0&&($?(K-=T,y==3?(be+=T,p=!0):c=!0):(M-=T,y==0?(Le+=T,l=!0):r=!0))}}),di[0]=l,di[1]=c,di[2]=r,di[3]=p,K-=Jt[1]+Jt[3],be+=Jt[3],M-=Jt[2]+Jt[0],Le+=Jt[0]}function ta(){let l=be+K,r=Le+M,c=be,p=Le;function h(g,y){switch(g){case 1:return l+=y,l-y;case 2:return r+=y,r-y;case 3:return c-=y,c+y;case 0:return p-=y,p+y}}H.forEach((g,y)=>{if(g.show&&g._show){let _=g.side;g._pos=h(_,g._size),g.label!=null&&(g._lpos=h(_,g.labelSize))}})}if(O.dataIdx==null){let l=O.hover,r=l.skip=new Set(l.skip??[]);r.add(void 0);let c=l.prox=se(l.prox),p=l.bias??=0;O.dataIdx=(h,g,y,_)=>{if(g==0)return y;let $=y,E=c(h,g,y,_)??me,T=E>=0&&E<me,P=A.ori==0?K:M,j=O.left,ce=e[0],oe=e[g];if(r.has(oe[y])){$=null;let ee=null,V=null,N;if(p==0||p==-1)for(N=y;ee==null&&N-- >0;)r.has(oe[N])||(ee=N);if(p==0||p==1)for(N=y;V==null&&N++<oe.length;)r.has(oe[N])||(V=N);if(ee!=null||V!=null)if(T){let we=ee==null?-1/0:I(ce[ee],A,P,0),Ce=V==null?1/0:I(ce[V],A,P,0),qe=j-we,he=Ce-j;qe<=he?qe<=E&&($=ee):he<=E&&($=V)}else $=V==null?ee:ee==null?V:y-ee<=V-y?ee:V}else T&&Re(j-I(ce[y],A,P,0))>E&&($=null);return $}}let ui=l=>{O.event=l};O.idxs=fe,O._lock=!1;let We=O.points;We.show=se(We.show),We.size=se(We.size),We.stroke=se(We.stroke),We.width=se(We.width),We.fill=se(We.fill);let Rt=i.focus=Me({},t.focus||{alpha:.3},O.focus),Pi=Rt.prox>=0,Fi=Pi&&We.one,bt=[],Li=[],Di=[];function Al(l,r){let c=We.show(i,r);if(c instanceof HTMLElement)return pt(c,lc),pt(c,l.class),qt(c,-10,-10,K,M),S.insertBefore(c,bt[r]),c}function Cl(l,r){if(s==1||r>0){let c=s==1&&k[l.scale].time,p=l.value;l.value=c?Ur(p)?Yr(le,Kr(p,q)):p||re:p||yp,l.label=l.label||(c?up:pp)}if(Fi||r>0){l.width=l.width==null?1:l.width,l.paths=l.paths||Lp||$c,l.fillTo=se(l.fillTo||Sp),l.pxAlign=+ae(l.pxAlign,F),l.pxRound=so(l.pxAlign),l.stroke=se(l.stroke||null),l.fill=se(l.fill||null),l._stroke=l._fill=l._paths=l._focus=null;let c=wp(et(1,l.width),1),p=l.points=Me({},{size:c,width:et(1,c*.2),stroke:l.stroke,space:c*2,paths:Dp,_stroke:null,_fill:null},l.points);p.show=se(p.show),p.filter=se(p.filter),p.fill=se(p.fill),p.stroke=se(p.stroke),p.paths=se(p.paths),p.pxAlign=l.pxAlign}if(Fe){let c=Mn(l,r);Ae.splice(r,0,c[0]),Lt.splice(r,0,c[1]),X.values.push(null)}if(Ke){fe.splice(r,0,null);let c=null;Fi?r==0&&(c=Al(l,r)):r>0&&(c=Al(l,r)),bt.splice(r,0,c),Li.splice(r,0,0),Di.splice(r,0,0)}Ne("addSeries",r)}function ia(l,r){r=r??x.length,l=s==1?pl(l,r,Zr,io):pl(l,r,{},to),x.splice(r,0,l),Cl(x[r],r)}i.addSeries=ia;function na(l){if(x.splice(l,1),Fe){X.values.splice(l,1),Lt.splice(l,1);let r=Ae.splice(l,1)[0];Ei(null,r.firstChild),r.remove()}Ke&&(fe.splice(l,1),bt.splice(l,1)[0].remove(),Li.splice(l,1),Di.splice(l,1)),Ne("delSeries",l)}i.delSeries=na;let di=[!1,!1,!1,!1];function sa(l,r){if(l._show=l.show,l.show){let c=l.side%2,p=k[l.scale];p==null&&(l.scale=c?x[1].scale:L,p=k[l.scale]);let h=p.time;l.size=se(l.size),l.space=se(l.space),l.rotate=se(l.rotate),ni(l.incrs)&&l.incrs.forEach(y=>{!si.has(y)&&si.set(y,vo(y))}),l.incrs=se(l.incrs||(p.distr==2?jc:h?R==1?Gc:Jc:xi)),l.splits=se(l.splits||(h&&p.distr==1?tt:p.distr==3?rl:p.distr==4?hp:fp)),l.stroke=se(l.stroke),l.grid.stroke=se(l.grid.stroke),l.ticks.stroke=se(l.ticks.stroke),l.border.stroke=se(l.border.stroke);let g=l.values;l.values=ni(g)&&!ni(g[0])?se(g):h?ni(g)?Gr(le,Wr(g,q)):Ur(g)?Xc(le,g):g||_e:g||dp,l.filter=se(l.filter||(p.distr>=3&&p.log==10?bp:p.distr==3&&p.log==2?vp:go)),l.font=ao(l.font),l.labelFont=ao(l.labelFont),l._size=l.size(i,null,r,0),l._space=l._rotate=l._incrs=l._found=l._splits=l._values=null,l._size>0&&(di[r]=!0,l._el=xt(tc,b))}}function rn(l,r,c,p){let[h,g,y,_]=c,$=r%2,E=0;return $==0&&(_||g)&&(E=r==0&&!h||r==2&&!y?De(Jr.size/3):0),$==1&&(h||y)&&(E=r==1&&!g||r==3&&!_?De(Xr.size/2):0),E}let El=i.padding=(t.padding||[rn,rn,rn,rn]).map(l=>se(ae(l,rn))),Jt=i._padding=El.map((l,r)=>l(i,r,di,0)),Ve,ze=null,He=null,Ln=s==1?x[0].idxs:null,kt=null,on=!1;function Tl(l,r){if(e=l??[],i.data=i._data=e,s==2){Ve=0;for(let c=1;c<x.length;c++)Ve+=e[c][0].length}else{e.length==0&&(i.data=i._data=e=[[]]),kt=e[0],Ve=kt.length;let c=e;if(J==2){c=e.slice();let p=c[0]=Array(Ve);for(let h=0;h<Ve;h++)p[h]=h}i._data=e=c}if(zi(!0),Ne("setData"),J==2&&(Mi=!0),r!==!1){let c=A;c.auto(i,on)?fs():Qt(L,c.min,c.max),pi=pi||O.left>=0,gt=!0,Hi()}}i.setData=Tl;function fs(){on=!0;let l,r;s==1&&(Ve>0?(ze=Ln[0]=0,He=Ln[1]=Ve-1,l=e[0][ze],r=e[0][He],J==2?(l=ze,r=He):l==r&&(J==3?[l,r]=ss(l,l,A.log,!1):J==4?[l,r]=hl(l,l,A.log,!1):A.time?r=l+De(86400/R):[l,r]=ts(l,r,ml,!0))):(ze=Ln[0]=l=null,He=Ln[1]=r=null)),Qt(L,l,r)}let Dn,Ri,hs,ms,gs,bs,vs,ys,ws,nt;function Ml(l,r,c,p,h,g){l??=kr,c??=bl,p??="butt",h??=kr,g??="round",l!=Dn&&(m.strokeStyle=Dn=l),h!=Ri&&(m.fillStyle=Ri=h),r!=hs&&(m.lineWidth=hs=r),g!=gs&&(m.lineJoin=gs=g),p!=bs&&(m.lineCap=bs=p),c!=ms&&m.setLineDash(ms=c)}function Pl(l,r,c,p){r!=Ri&&(m.fillStyle=Ri=r),l!=vs&&(m.font=vs=l),c!=ys&&(m.textAlign=ys=c),p!=ws&&(m.textBaseline=ws=p)}function xs(l,r,c,p,h=0){if(p.length>0&&l.auto(i,on)&&(r==null||r.min==null)){let g=ae(ze,0),y=ae(He,p.length-1),_=c.min==null?bc(p,g,y,h,l.distr==3):[c.min,c.max];l.min=Ft(l.min,c.min=_[0]),l.max=et(l.max,c.max=_[1])}}let Fl={min:null,max:null};function la(){for(let p in k){let h=k[p];U[p]==null&&(h.min==null||U[L]!=null&&h.auto(i,on))&&(U[p]=Fl)}for(let p in k){let h=k[p];U[p]==null&&h.from!=null&&U[h.from]!=null&&(U[p]=Fl)}U[L]!=null&&zi(!0);let l={};for(let p in U){let h=U[p];if(h!=null){let g=l[p]=Qi(k[p],Ac);if(h.min!=null)Me(g,h);else if(p!=L||s==2)if(Ve==0&&g.from==null){let y=g.range(i,null,null,p);g.min=y[0],g.max=y[1]}else g.min=me,g.max=-me}}if(Ve>0){x.forEach((p,h)=>{if(s==1){let g=p.scale,y=U[g];if(y==null)return;let _=l[g];if(h==0){let $=_.range(i,_.min,_.max,g);_.min=$[0],_.max=$[1],ze=Pt(_.min,e[0]),He=Pt(_.max,e[0]),He-ze>1&&(e[0][ze]<_.min&&ze++,e[0][He]>_.max&&He--),p.min=kt[ze],p.max=kt[He]}else p.show&&p.auto&&xs(_,y,p,e[h],p.sorted);p.idxs[0]=ze,p.idxs[1]=He}else if(h>0&&p.show&&p.auto){let[g,y]=p.facets,_=g.scale,$=y.scale,[E,T]=e[h],P=l[_],j=l[$];P!=null&&xs(P,U[_],g,E,g.sorted),j!=null&&xs(j,U[$],y,T,y.sorted),p.min=y.min,p.max=y.max}});for(let p in l){let h=l[p],g=U[p];if(h.from==null&&(g==null||g.min==null)){let y=h.range(i,h.min==me?null:h.min,h.max==-me?null:h.max,p);h.min=y[0],h.max=y[1]}}}for(let p in l){let h=l[p];if(h.from!=null){let g=l[h.from];if(g.min==null)h.min=h.max=null;else{let y=h.range(i,g.min,g.max,p);h.min=y[0],h.max=y[1]}}}let r={},c=!1;for(let p in l){let h=l[p],g=k[p];if(g.min!=h.min||g.max!=h.max){g.min=h.min,g.max=h.max;let y=g.distr;g._min=y==3?Wt(g.min):y==4?Zs(g.min,g.asinh):y==100?g.fwd(g.min):g.min,g._max=y==3?Wt(g.max):y==4?Zs(g.max,g.asinh):y==100?g.fwd(g.max):g.max,r[p]=c=!0}}if(c){x.forEach((p,h)=>{s==2?h>0&&r.y&&(p._paths=null):r[p.scale]&&(p._paths=null)});for(let p in r)Mi=!0,Ne("setScale",p);Ke&&O.left>=0&&(pi=gt=!0)}for(let p in U)U[p]=null}function ra(l){let r=ll(ze-1,0,Ve-1),c=ll(He+1,0,Ve-1);for(;l[r]==null&&r>0;)r--;for(;l[c]==null&&c<Ve-1;)c++;return[r,c]}function oa(){if(Ve>0){let l=x.some(r=>r._focus)&&nt!=Rt.alpha;l&&(m.globalAlpha=nt=Rt.alpha),x.forEach((r,c)=>{if(c>0&&r.show&&(Ll(c,!1),Ll(c,!0),r._paths==null)){let p=nt;nt!=r.alpha&&(m.globalAlpha=nt=r.alpha);let h=s==2?[0,e[c][0].length-1]:ra(e[c]);r._paths=r.paths(i,c,h[0],h[1]),nt!=p&&(m.globalAlpha=nt=p)}}),x.forEach((r,c)=>{if(c>0&&r.show){let p=nt;nt!=r.alpha&&(m.globalAlpha=nt=r.alpha),r._paths!=null&&Dl(c,!1);{let h=r._paths!=null?r._paths.gaps:null,g=r.points.show(i,c,ze,He,h),y=r.points.filter(i,c,g,h);(g||y)&&(r.points._paths=r.points.paths(i,c,ze,He,y),Dl(c,!0))}nt!=p&&(m.globalAlpha=nt=p),Ne("drawSeries",c)}}),l&&(m.globalAlpha=nt=1)}}function Ll(l,r){let c=r?x[l].points:x[l];c._stroke=c.stroke(i,l),c._fill=c.fill(i,l)}function Dl(l,r){let c=r?x[l].points:x[l],{stroke:p,fill:h,clip:g,flags:y,_stroke:_=c._stroke,_fill:$=c._fill,_width:E=c.width}=c._paths;E=ge(E*pe,3);let T=null,P=E%2/2;r&&$==null&&($=E>0?"#fff":_);let j=c.pxAlign==1&&P>0;if(j&&m.translate(P,P),!r){let ce=lt-E/2,oe=mt-E/2,ee=it+E,V=St+E;T=new Path2D,T.rect(ce,oe,ee,V)}r?_s(_,E,c.dash,c.cap,$,p,h,y,g):aa(l,_,E,c.dash,c.cap,$,p,h,y,T,g),j&&m.translate(-P,-P)}function aa(l,r,c,p,h,g,y,_,$,E,T){let P=!1;$!=0&&Z.forEach((j,ce)=>{if(j.series[0]==l){let oe=x[j.series[1]],ee=e[j.series[1]],V=(oe._paths||En).band;ni(V)&&(V=j.dir==1?V[0]:V[1]);let N,we=null;oe.show&&V&&yc(ee,ze,He)?(we=j.fill(i,ce)||g,N=oe._paths.clip):V=null,_s(r,c,p,h,we,y,_,$,E,T,N,V),P=!0}}),P||_s(r,c,p,h,g,y,_,$,E,T)}let Rl=Xi|al;function _s(l,r,c,p,h,g,y,_,$,E,T,P){Ml(l,r,c,p,h),($||E||P)&&(m.save(),$&&m.clip($),E&&m.clip(E)),P?(_&Rl)==Rl?(m.clip(P),T&&m.clip(T),zn(h,y),Rn(l,g,r)):_&al?(zn(h,y),m.clip(P),Rn(l,g,r)):_&Xi&&(m.save(),m.clip(P),T&&m.clip(T),zn(h,y),m.restore(),Rn(l,g,r)):(zn(h,y),Rn(l,g,r)),($||E||P)&&m.restore()}function Rn(l,r,c){c>0&&(r instanceof Map?r.forEach((p,h)=>{m.strokeStyle=Dn=h,m.stroke(p)}):r!=null&&l&&m.stroke(r))}function zn(l,r){r instanceof Map?r.forEach((c,p)=>{m.fillStyle=Ri=p,m.fill(c)}):r!=null&&l&&m.fill(r)}function ca(l,r,c,p){let h=H[l],g;if(p<=0)g=[0,0];else{let y=h._space=h.space(i,l,r,c,p),_=h._incrs=h.incrs(i,l,r,c,p,y);g=Np(r,c,_,p,y)}return h._found=g}function $s(l,r,c,p,h,g,y,_,$,E){let T=y%2/2;F==1&&m.translate(T,T),Ml(_,y,$,E,_),m.beginPath();let P,j,ce,oe,ee=h+(p==0||p==3?-g:g);c==0?(j=h,oe=ee):(P=h,ce=ee);for(let V=0;V<l.length;V++)r[V]!=null&&(c==0?P=ce=l[V]:j=oe=l[V],m.moveTo(P,j),m.lineTo(ce,oe));m.stroke(),F==1&&m.translate(-T,-T)}function pa(l){let r=!0;return H.forEach((c,p)=>{if(!c.show)return;let h=k[c.scale];if(h.min==null){c._show&&(r=!1,c._show=!1,zi(!1));return}else c._show||(r=!1,c._show=!0,zi(!1));let g=c.side,y=g%2,{min:_,max:$}=h,[E,T]=ca(p,_,$,y==0?K:M);if(T==0)return;let P=h.distr==2,j=c._splits=c.splits(i,p,_,$,E,T,P),ce=h.distr==2?j.map(N=>kt[N]):j,oe=h.distr==2?kt[j[1]]-kt[j[0]]:E,ee=c._values=c.values(i,c.filter(i,ce,p,T,oe),p,T,oe);c._rotate=g==2?c.rotate(i,ee,p,T):0;let V=c._size;c._size=_t(c.size(i,ee,p,l)),V!=null&&c._size!=V&&(r=!1)}),r}function ua(l){let r=!0;return El.forEach((c,p)=>{let h=c(i,p,di,l);h!=Jt[p]&&(r=!1),Jt[p]=h}),r}function da(){for(let l=0;l<H.length;l++){let r=H[l];if(!r.show||!r._show)continue;let c=r.side,p=c%2,h,g,y=r.stroke(i,l),_=c==0||c==3?-1:1,[$,E]=r._found;if(r.label!=null){let Ze=r.labelGap*_,at=De((r._lpos+Ze)*pe);Pl(r.labelFont[0],y,"center",c==2?"top":Sr),m.save(),p==1?(h=g=0,m.translate(at,De(mt+St/2)),m.rotate((c==3?-Xn:Xn)/2)):(h=De(lt+it/2),g=at);let mi=ho(r.label)?r.label(i,l,$,E):r.label;m.fillText(mi,h,g),m.restore()}if(E==0)continue;let T=k[r.scale],P=p==0?it:St,j=p==0?lt:mt,ce=r._splits,oe=T.distr==2?ce.map(Ze=>kt[Ze]):ce,ee=T.distr==2?kt[ce[1]]-kt[ce[0]]:$,V=r.ticks,N=r.border,we=V.show?V.size:0,Ce=De(we*pe),qe=De((r.alignTo==2?r._size-we-r.gap:r.gap)*pe),he=r._rotate*-Xn/180,Ee=z(r._pos*pe),rt=(Ce+qe)*_,Je=Ee+rt;g=p==0?Je:0,h=p==1?Je:0;let vt=r.font[0],At=r.align==1?Gi:r.align==2?Ks:he>0?Gi:he<0?Ks:p==0?"center":c==3?Ks:Gi,It=he||p==1?"middle":c==2?"top":Sr;Pl(vt,y,At,It);let ot=r.font[1]*r.lineGap,yt=ce.map(Ze=>z(u(Ze,T,P,j))),Ct=r._values;for(let Ze=0;Ze<Ct.length;Ze++){let at=Ct[Ze];if(at!=null){p==0?h=yt[Ze]:g=yt[Ze],at=""+at;let mi=at.indexOf(`
`)==-1?[at]:at.split(/\n/gm);for(let Qe=0;Qe<mi.length;Qe++){let er=mi[Qe];he?(m.save(),m.translate(h,g+Qe*ot),m.rotate(he),m.fillText(er,0,0),m.restore()):m.fillText(er,h,g+Qe*ot)}}}V.show&&$s(yt,V.filter(i,oe,l,E,ee),p,c,Ee,Ce,ge(V.width*pe,3),V.stroke(i,l),V.dash,V.cap);let Ot=r.grid;Ot.show&&$s(yt,Ot.filter(i,oe,l,E,ee),p,p==0?2:1,p==0?mt:lt,p==0?St:it,ge(Ot.width*pe,3),Ot.stroke(i,l),Ot.dash,Ot.cap),N.show&&$s([Ee],[1],p==0?1:0,p==0?1:2,p==1?mt:lt,p==1?St:it,ge(N.width*pe,3),N.stroke(i,l),N.dash,N.cap)}Ne("drawAxes")}function zi(l){x.forEach((r,c)=>{c>0&&(r._paths=null,l&&(s==1?(r.min=null,r.max=null):r.facets.forEach(p=>{p.min=null,p.max=null})))})}let Hn=!1,Ss=!1,an=[];function fa(){Ss=!1;for(let l=0;l<an.length;l++)Ne(...an[l]);an.length=0}function Hi(){Hn||(Lc(zl),Hn=!0)}function ha(l,r=!1){Hn=!0,Ss=r,l(i),zl(),r&&an.length>0&&queueMicrotask(fa)}i.batch=ha;function zl(){if(us&&(la(),us=!1),Mi&&(Qo(),Mi=!1),Pn){if(xe(w,Gi,be),xe(w,"top",Le),xe(w,Sn,K),xe(w,kn,M),xe(S,Gi,be),xe(S,"top",Le),xe(S,Sn,K),xe(S,kn,M),xe(b,Sn,Vt),xe(b,kn,oi),v.width=De(Vt*pe),v.height=De(oi*pe),H.forEach(({_el:l,_show:r,_size:c,_pos:p,side:h})=>{if(l!=null)if(r){let g=h===3||h===0?c:0,y=h%2==1;xe(l,y?"left":"top",p-g),xe(l,y?"width":"height",c),xe(l,y?"top":"left",y?Le:be),xe(l,y?"height":"width",y?M:K),nl(l,_i)}else pt(l,_i)}),Dn=Ri=hs=gs=bs=vs=ys=ws=ms=null,nt=1,un(!0),be!=Ti||Le!=ai||K!=Dt||M!=ci){zi(!1);let l=K/Dt,r=M/ci;if(Ke&&!pi&&O.left>=0){O.left*=l,O.top*=r,Ii&&qt(Ii,De(O.left),0,K,M),Oi&&qt(Oi,0,De(O.top),K,M);for(let c=0;c<bt.length;c++){let p=bt[c];p!=null&&(Li[c]*=l,Di[c]*=r,qt(p,_t(Li[c]),_t(Di[c]),K,M))}}if(ye.show&&!Fn&&ye.left>=0&&ye.width>0){ye.left*=l,ye.width*=l,ye.top*=r,ye.height*=r;for(let c in Ms)xe(Ui,c,ye[c])}Ti=be,ai=Le,Dt=K,ci=M}Ne("setSize"),Pn=!1}Vt>0&&oi>0&&(m.clearRect(0,0,v.width,v.height),Ne("drawClear"),G.forEach(l=>l()),Ne("draw")),ye.show&&Fn&&(In(ye),Fn=!1),Ke&&pi&&(hi(null,!0,!1),pi=!1),X.show&&X.live&&gt&&(Es(),gt=!1),d||(d=!0,i.status=1,Ne("ready")),on=!1,Hn=!1}i.redraw=(l,r)=>{Mi=r||!1,l!==!1?Qt(L,A.min,A.max):Hi()};function ks(l,r){let c=k[l];if(c.from==null){if(Ve==0){let p=c.range(i,r.min,r.max,l);r.min=p[0],r.max=p[1]}if(r.min>r.max){let p=r.min;r.min=r.max,r.max=p}if(Ve>1&&r.min!=null&&r.max!=null&&r.max-r.min<1e-16)return;l==L&&c.distr==2&&Ve>0&&(r.min=Pt(r.min,e[0]),r.max=Pt(r.max,e[0]),r.min==r.max&&r.max++),U[l]=r,us=!0,Hi()}}i.setScale=ks;let As,Cs,Ii,Oi,Hl,Il,Ni,qi,Ol,Nl,ve,Se,Zt=!1,Be=O.drag,Ie=Be.x,Oe=Be.y;Ke&&(O.x&&(As=xt(nc,S)),O.y&&(Cs=xt(sc,S)),A.ori==0?(Ii=As,Oi=Cs):(Ii=Cs,Oi=As),ve=O.left,Se=O.top);let ye=i.select=Me({show:!0,over:!0,left:0,width:0,top:0,height:0},t.select),Ui=ye.show?xt(ic,ye.over?S:w):null;function In(l,r){if(ye.show){for(let c in l)ye[c]=l[c],c in Ms&&xe(Ui,c,l[c]);r!==!1&&Ne("setSelect")}}i.setSelect=In;function ma(l){if(x[l].show)Fe&&nl(Ae[l],_i);else if(Fe&&pt(Ae[l],_i),Ke){let c=Fi?bt[0]:bt[l];c!=null&&qt(c,-10,-10,K,M)}}function Qt(l,r,c){ks(l,{min:r,max:c})}function zt(l,r,c,p){r.focus!=null&&wa(l),r.show!=null&&x.forEach((h,g)=>{g>0&&(l==g||l==null)&&(h.show=r.show,ma(g),s==2?(Qt(h.facets[0].scale,null,null),Qt(h.facets[1].scale,null,null)):Qt(h.scale,null,null),Hi())}),c!==!1&&Ne("setSeries",l,r),p&&dn("setSeries",i,l,r)}i.setSeries=zt;function ga(l,r){Me(Z[l],r)}function ba(l,r){l.fill=se(l.fill||null),l.dir=ae(l.dir,-1),r=r??Z.length,Z.splice(r,0,l)}function va(l){l==null?Z.length=0:Z.splice(l,1)}i.addBand=ba,i.setBand=ga,i.delBand=va;function ya(l,r){x[l].alpha=r,Ke&&bt[l]!=null&&(bt[l].style.opacity=r),Fe&&Ae[l]&&(Ae[l].style.opacity=r)}let Bt,Xt,fi,Vi={focus:!0};function wa(l){if(l!=fi){let r=l==null,c=Rt.alpha!=1;x.forEach((p,h)=>{if(s==1||h>0){let g=r||h==0||h==l;p._focus=r?null:g,c&&ya(h,g?1:Rt.alpha)}}),fi=l,c&&Hi()}}Fe&&Pi&&Ye(Er,ue,l=>{O._lock||(ui(l),fi!=null&&zt(null,Vi,!0,Te.setSeries))});function Ht(l,r,c){let p=k[r];c&&(l=l/pe-(p.ori==1?Le:be));let h=K;p.ori==1&&(h=M,l=h-l),p.dir==-1&&(l=h-l);let g=p._min,y=p._max,_=l/h,$=g+(y-g)*_,E=p.distr;return E==3?Ji(10,$):E==4?xc($,p.asinh):E==100?p.bwd($):$}function xa(l,r){let c=Ht(l,L,r);return Pt(c,e[0],ze,He)}i.valToIdx=l=>Pt(l,e[0]),i.posToIdx=xa,i.posToVal=Ht,i.valToPos=(l,r,c)=>k[r].ori==0?o(l,k[r],c?it:K,c?lt:0):a(l,k[r],c?St:M,c?mt:0),i.setCursor=(l,r,c)=>{ve=l.left,Se=l.top,hi(null,r,c)};function ql(l,r){xe(Ui,Gi,ye.left=l),xe(Ui,Sn,ye.width=r)}function Ul(l,r){xe(Ui,"top",ye.top=l),xe(Ui,kn,ye.height=r)}let cn=A.ori==0?ql:Ul,pn=A.ori==1?ql:Ul;function _a(){if(Fe&&X.live)for(let l=s==2?1:0;l<x.length;l++){if(l==0&&ht)continue;let r=X.values[l],c=0;for(let p in r)Lt[l][c++].firstChild.nodeValue=r[p]}}function Es(l,r){if(l!=null&&(l.idxs?l.idxs.forEach((c,p)=>{fe[p]=c}):kc(l.idx)||fe.fill(l.idx),X.idx=fe[0]),Fe&&X.live){for(let c=0;c<x.length;c++)(c>0||s==1&&!ht)&&$a(c,fe[c]);_a()}gt=!1,r!==!1&&Ne("setLegend")}i.setLegend=Es;function $a(l,r){let c=x[l],p=l==0&&J==2?kt:e[l],h;ht?h=c.values(i,l,r)??Yt:(h=c.value(i,r==null?null:p[r],l,r),h=h==null?Yt:{_:h}),X.values[l]=h}function hi(l,r,c){Ol=ve,Nl=Se,[ve,Se]=O.move(i,ve,Se),O.left=ve,O.top=Se,Ke&&(Ii&&qt(Ii,De(ve),0,K,M),Oi&&qt(Oi,0,De(Se),K,M));let p,h=ze>He;Bt=me,Xt=null;let g=A.ori==0?K:M,y=A.ori==1?K:M;if(ve<0||Ve==0||h){p=O.idx=null;for(let _=0;_<x.length;_++){let $=bt[_];$!=null&&qt($,-10,-10,K,M)}Pi&&zt(null,Vi,!0,l==null&&Te.setSeries),X.live&&(fe.fill(p),gt=!0)}else{let _,$,E;s==1&&(_=A.ori==0?ve:Se,$=Ht(_,L),p=O.idx=Pt($,e[0],ze,He),E=I(e[0][p],A,g,0));let T=-10,P=-10,j=0,ce=0,oe=!0,ee="",V="";for(let N=s==2?1:0;N<x.length;N++){let we=x[N],Ce=fe[N],qe=Ce==null?null:s==1?e[N][Ce]:e[N][1][Ce],he=O.dataIdx(i,N,p,$),Ee=he==null?null:s==1?e[N][he]:e[N][1][he];if(gt=gt||Ee!=qe||he!=Ce,fe[N]=he,N>0&&we.show){let rt=he==null?-10:he==p?E:I(s==1?e[0][he]:e[N][0][he],A,g,0),Je=Ee==null?-10:B(Ee,s==1?k[we.scale]:k[we.facets[1].scale],y,0);if(Pi&&Ee!=null){let vt=A.ori==1?ve:Se,At=Re(Rt.dist(i,N,he,Je,vt));if(At<Bt){let It=Rt.bias;if(It!=0){let ot=Ht(vt,we.scale),yt=Ee>=0?1:-1,Ct=ot>=0?1:-1;Ct==yt&&(Ct==1?It==1?Ee>=ot:Ee<=ot:It==1?Ee<=ot:Ee>=ot)&&(Bt=At,Xt=N)}else Bt=At,Xt=N}}if(gt||Fi){let vt,At;A.ori==0?(vt=rt,At=Je):(vt=Je,At=rt);let It,ot,yt,Ct,Ot,Ze,at=!0,mi=We.bbox;if(mi!=null){at=!1;let Qe=mi(i,N);yt=Qe.left,Ct=Qe.top,It=Qe.width,ot=Qe.height}else yt=vt,Ct=At,It=ot=We.size(i,N);if(Ze=We.fill(i,N),Ot=We.stroke(i,N),Fi)N==Xt&&Bt<=Rt.prox&&(T=yt,P=Ct,j=It,ce=ot,oe=at,ee=Ze,V=Ot);else{let Qe=bt[N];Qe!=null&&(Li[N]=yt,Di[N]=Ct,Rr(Qe,It,ot,at),Lr(Qe,Ze,Ot),qt(Qe,_t(yt),_t(Ct),K,M))}}}}if(Fi){let N=Rt.prox,we=fi==null?Bt<=N:Bt>N||Xt!=fi;if(gt||we){let Ce=bt[0];Ce!=null&&(Li[0]=T,Di[0]=P,Rr(Ce,j,ce,oe),Lr(Ce,ee,V),qt(Ce,_t(T),_t(P),K,M))}}}if(ye.show&&Zt)if(l!=null){let[_,$]=Te.scales,[E,T]=Te.match,[P,j]=l.cursor.sync.scales,ce=l.cursor.drag;if(Ie=ce._x,Oe=ce._y,Ie||Oe){let{left:oe,top:ee,width:V,height:N}=l.select,we=l.scales[P].ori,Ce=l.posToVal,qe,he,Ee,rt,Je,vt=_!=null&&E(_,P),At=$!=null&&T($,j);vt&&Ie?(we==0?(qe=oe,he=V):(qe=ee,he=N),Ee=k[_],rt=I(Ce(qe,P),Ee,g,0),Je=I(Ce(qe+he,P),Ee,g,0),cn(Ft(rt,Je),Re(Je-rt))):cn(0,g),At&&Oe?(we==1?(qe=oe,he=V):(qe=ee,he=N),Ee=k[$],rt=B(Ce(qe,j),Ee,y,0),Je=B(Ce(qe+he,j),Ee,y,0),pn(Ft(rt,Je),Re(Je-rt))):pn(0,y)}else Ps()}else{let _=Re(Ol-Hl),$=Re(Nl-Il);if(A.ori==1){let j=_;_=$,$=j}Ie=Be.x&&_>=Be.dist,Oe=Be.y&&$>=Be.dist;let E=Be.uni;E!=null?Ie&&Oe&&(Ie=_>=E,Oe=$>=E,!Ie&&!Oe&&($>_?Oe=!0:Ie=!0)):Be.x&&Be.y&&(Ie||Oe)&&(Ie=Oe=!0);let T,P;Ie&&(A.ori==0?(T=Ni,P=ve):(T=qi,P=Se),cn(Ft(T,P),Re(P-T)),Oe||pn(0,y)),Oe&&(A.ori==1?(T=Ni,P=ve):(T=qi,P=Se),pn(Ft(T,P),Re(P-T)),Ie||cn(0,g)),!Ie&&!Oe&&(cn(0,0),pn(0,0))}if(Be._x=Ie,Be._y=Oe,l==null){if(c){if(Xl!=null){let[_,$]=Te.scales;Te.values[0]=_!=null?Ht(A.ori==0?ve:Se,_):null,Te.values[1]=$!=null?Ht(A.ori==1?ve:Se,$):null}dn(Ys,i,ve,Se,K,M,p)}if(Pi){let _=c&&Te.setSeries,$=Rt.prox;fi==null?Bt<=$&&zt(Xt,Vi,!0,_):Bt>$?zt(null,Vi,!0,_):Xt!=fi&&zt(Xt,Vi,!0,_)}}gt&&(X.idx=p,Es()),r!==!1&&Ne("setCursor")}let ei=null;Object.defineProperty(i,"rect",{get(){return ei==null&&un(!1),ei}});function un(l=!1){l?ei=null:(ei=S.getBoundingClientRect(),Ne("syncRect",ei))}function Vl(l,r,c,p,h,g,y){O._lock||Zt&&l!=null&&l.movementX==0&&l.movementY==0||(Ts(l,r,c,p,h,g,y,!1,l!=null),l!=null?hi(null,!0,!0):hi(r,!0,!1))}function Ts(l,r,c,p,h,g,y,_,$){if(ei==null&&un(!1),ui(l),l!=null)c=l.clientX-ei.left,p=l.clientY-ei.top;else{if(c<0||p<0){ve=-10,Se=-10;return}let[E,T]=Te.scales,P=r.cursor.sync,[j,ce]=P.values,[oe,ee]=P.scales,[V,N]=Te.match,we=r.axes[0].side%2==1,Ce=A.ori==0?K:M,qe=A.ori==1?K:M,he=we?g:h,Ee=we?h:g,rt=we?p:c,Je=we?c:p;if(oe!=null?c=V(E,oe)?u(j,k[E],Ce,0):-10:c=Ce*(rt/he),ee!=null?p=N(T,ee)?u(ce,k[T],qe,0):-10:p=qe*(Je/Ee),A.ori==1){let vt=c;c=p,p=vt}}$&&(r==null||r.cursor.event.type==Ys)&&((c<=1||c>=K-1)&&(c=wi(c,K)),(p<=1||p>=M-1)&&(p=wi(p,M))),_?(Hl=c,Il=p,[Ni,qi]=O.move(i,c,p)):(ve=c,Se=p)}let Ms={width:0,height:0,left:0,top:0};function Ps(){In(Ms,!1)}let Bl,jl,Wl,Gl;function Kl(l,r,c,p,h,g,y){Zt=!0,Ie=Oe=Be._x=Be._y=!1,Ts(l,r,c,p,h,g,y,!0,!1),l!=null&&(Ye(Js,tl,Yl,!1),dn(Ar,i,Ni,qi,K,M,null));let{left:_,top:$,width:E,height:T}=ye;Bl=_,jl=$,Wl=E,Gl=T}function Yl(l,r,c,p,h,g,y){Zt=Be._x=Be._y=!1,Ts(l,r,c,p,h,g,y,!1,!0);let{left:_,top:$,width:E,height:T}=ye,P=E>0||T>0,j=Bl!=_||jl!=$||Wl!=E||Gl!=T;if(P&&j&&In(ye),Be.setScale&&P&&j){let ce=_,oe=E,ee=$,V=T;if(A.ori==1&&(ce=$,oe=T,ee=_,V=E),Ie&&Qt(L,Ht(ce,L),Ht(ce+oe,L)),Oe)for(let N in k){let we=k[N];N!=L&&we.from==null&&we.min!=me&&Qt(N,Ht(ee+V,N),Ht(ee,N))}Ps()}else O.lock&&(O._lock=!O._lock,hi(r,!0,l!=null));l!=null&&(Ei(Js,tl),dn(Js,i,ve,Se,K,M,null))}function Sa(l,r,c,p,h,g,y){if(O._lock)return;ui(l);let _=Zt;if(Zt){let $=!0,E=!0,T=10,P,j;A.ori==0?(P=Ie,j=Oe):(P=Oe,j=Ie),P&&j&&($=ve<=T||ve>=K-T,E=Se<=T||Se>=M-T),P&&$&&(ve=ve<Ni?0:K),j&&E&&(Se=Se<qi?0:M),hi(null,!0,!0),Zt=!1}ve=-10,Se=-10,fe.fill(null),hi(null,!0,!0),_&&(Zt=_)}function Jl(l,r,c,p,h,g,y){O._lock||(ui(l),fs(),Ps(),l!=null&&dn(Tr,i,ve,Se,K,M,null))}function Zl(){H.forEach(qp),ds(i.width,i.height,!0)}$i(es,Yi,Zl);let Bi={};Bi.mousedown=Kl,Bi.mousemove=Vl,Bi.mouseup=Yl,Bi.dblclick=Jl,Bi.setSeries=(l,r,c,p)=>{let h=Te.match[2];c=h(i,r,c),c!=-1&&zt(c,p,!0,!1)},Ke&&(Ye(Ar,S,Kl),Ye(Ys,S,Vl),Ye(Cr,S,l=>{ui(l),un(!1)}),Ye(Er,S,Sa),Ye(Tr,S,Jl),cl.add(i),i.syncRect=un);let On=i.hooks=t.hooks||{};function Ne(l,r,c){Ss?an.push([l,r,c]):l in On&&On[l].forEach(p=>{p.call(null,i,r,c)})}(t.plugins||[]).forEach(l=>{for(let r in l.hooks)On[r]=(On[r]||[]).concat(l.hooks[r])});let Ql=(l,r,c)=>c,Te=Me({key:null,setSeries:!1,filters:{pub:Nr,sub:Nr},scales:[L,x[1]?x[1].scale:null],match:[qr,qr,Ql],values:[null,null]},O.sync);Te.match.length==2&&Te.match.push(Ql),O.sync=Te;let Xl=Te.key,Fs=Io(Xl);function dn(l,r,c,p,h,g,y){Te.filters.pub(l,r,c,p,h,g,y)&&Fs.pub(l,r,c,p,h,g,y)}Fs.sub(i);function ka(l,r,c,p,h,g,y){Te.filters.sub(l,r,c,p,h,g,y)&&Bi[l](null,r,c,p,h,g,y)}i.pub=ka;function Aa(){Fs.unsub(i),cl.delete(i),ri.clear(),sl(es,Yi,Zl),f.remove(),ue?.remove(),Ne("destroy")}i.destroy=Aa;function Ls(){Ne("init",t,e),Tl(e||t.data,!1),U[L]?ks(L,U[L]):fs(),Fn=ye.show&&(ye.width>0||ye.height>0),pi=gt=!0,ds(t.width,t.height)}return x.forEach(Cl),H.forEach(sa),n?n instanceof HTMLElement?(n.appendChild(f),Ls()):n(i,Ls):Ls(),i}Ue.assign=Me;Ue.fmtNum=gl;Ue.rangeNum=ts;Ue.rangeLog=ss;Ue.rangeAsinh=hl;Ue.orient=ki;Ue.pxRatio=pe;Ue.join=Fc;Ue.fmtDate=vl,Ue.tzDate=Vc;Ue.sync=Io;{Ue.addGap=kp,Ue.clipGaps=os;let t=Ue.paths={points:Bo};t.linear=Wo,t.stepped=Ep,t.bars=Tp,t.spline=Pp}var Jo='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';var ft=class extends Ge{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.inspectable=!1;this.selectedTime=null;this.lastSignature="";this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(n){let i=JSON.stringify([this.curves,this.heading,this.syncKey,this.percent,this.range]);if(this.lastSamples===this.samples&&this.lastSignature===i){n.has("selectedTime")&&this.plot?.redraw(!1,!1);return}this.lastSamples=this.samples,this.lastSignature=i,this.draw()}inspect(n){this.inspectable&&this.dispatchEvent(new CustomEvent("inspect-publication",{detail:n,bubbles:!0,composed:!0}))}toggleSeries(n){let i=this.curves[n].label,s=this.hiddenCurves.has(i);this.plot&&this.plot.setSeries(n+1,{show:s}),s?this.hiddenCurves.delete(i):this.hiddenCurves.add(i),this.requestUpdate()}showCurve(n){let i=this.curves.findIndex(s=>s.path===n);i>=0&&this.hiddenCurves.has(this.curves[i].label)&&this.toggleSeries(i)}draw(){if(!this.isConnected)return;let n=this.renderRoot.querySelector(".plot");if(!n)return;let i=this.plot;if(i&&i.series.forEach((u,d)=>{d&&typeof u.label=="string"&&(u.show===!1?this.hiddenCurves.add(u.label):this.hiddenCurves.delete(u.label))}),this.dispose(),!this.samples.length||!this.samples.some(u=>this.curves.some(d=>Tt(u,d.path)!==null)))return;let s=getComputedStyle(this),o=s.getPropertyValue("--primary-text-color").trim()||"#555",a=[this.samples.map(u=>u.time),...this.curves.map(u=>this.samples.map(d=>Tt(d,u.path)))];this.applying=!0,this.plot=new Ue({width:Math.max(240,n.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(u,d,f)=>[Math.min(0,d??0),Math.max(100,f??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},axes:[{stroke:o,space:100,grid:{show:!1},values:(u,d)=>d.map(f=>new Date(f*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(f*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:o,values:(u,d)=>d.map(f=>f.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(u,d)=>d==null?"\u2014":new Date(d*1e3).toLocaleString()},...this.curves.map(u=>({label:u.label,stroke:u.color,width:2,spanGaps:!1,show:!this.hiddenCurves.has(u.label),paths:u.step?Ue.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(d,f)=>f==null?"Indisponible":`${f.toLocaleString(void 0,{maximumFractionDigits:u.unit.includes("min")?6:3})} ${u.unit}`}))],hooks:{draw:[u=>{if(this.selectedTime===null)return;let{left:d,top:f,width:v,height:m}=u.bbox,b=u.valToPos(this.selectedTime,"x",!0);if(b<d||b>d+v)return;let w=u.ctx;w.save(),w.strokeStyle=o,w.setLineDash([5,4]),w.beginPath(),w.moveTo(b,f),w.lineTo(b,f+m),w.stroke(),w.restore()}],setSeries:[u=>{u.status!==1||u!==this.plot||(u.series.forEach((d,f)=>{f&&typeof d.label=="string"&&(d.show===!1?this.hiddenCurves.add(d.label):this.hiddenCurves.delete(d.label))}),this.requestUpdate())}],setScale:[(u,d)=>{d==="x"&&u.status===1&&u===this.plot&&!this.applying&&u.scales.x.min!=null&&u.scales.x.max!=null&&(Math.abs(u.scales.x.min-this.range[0])>.01||Math.abs(u.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[u.scales.x.min,u.scales.x.max],bubbles:!0,composed:!0}))}]}},a,n),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,n.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,n.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(n)}render(){let n=this.samples.filter(i=>this.curves.some(s=>Tt(i,s.path)!==null)).length;return C`<h3>${this.heading}</h3>
      <div class="series-controls" role="group" aria-label="Séries affichées">
        ${this.curves.map((i,s)=>C`<button
              aria-pressed=${!this.hiddenCurves.has(i.label)}
              @click=${()=>this.toggleSeries(s)}
            >
              <span style=${"background:"+i.color} aria-hidden="true"></span
              >${i.label}
            </button>`)}
      </div>
      <div class="plot" aria-label=${this.heading}
        @pointerdown=${i=>{this.pointerStart=i.button===0?i.clientX:void 0}}
        @click=${{capture:!0,handleEvent:i=>{let s=this.plot;if(!s||!i.composedPath().includes(s.over)||this.pointerStart===void 0||Math.abs(i.clientX-this.pointerStart)>4)return;let o=s.data[0][s.posToIdx(i.clientX-s.over.getBoundingClientRect().left)];o!==void 0&&this.inspect(o)}}}></div>
      ${n?C`<details>
            <summary>
              Table de données accessible · ${n} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(i=>C`<th>${i.label} (${i.unit})</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(i=>C`<tr>
                        <td>${this.inspectable?C`<button type="button" aria-pressed=${i.time===this.selectedTime}
                              @click=${()=>this.inspect(i.time)}>${new Date(i.time*1e3).toLocaleString()}</button>`:new Date(i.time*1e3).toLocaleString()}</td>
                        ${this.curves.map(s=>C`<td>
                              ${Tt(i,s.path)??"Indisponible"}
                            </td>`)}
                      </tr>`)}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
            </p>
          </details>`:C`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};ft.styles=[Un(Jo),Et`
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
    `],Y([ke({attribute:!1})],ft.prototype,"samples",2),Y([ke({attribute:!1})],ft.prototype,"curves",2),Y([ke({attribute:!1})],ft.prototype,"range",2),Y([ke()],ft.prototype,"heading",2),Y([ke()],ft.prototype,"syncKey",2),Y([ke({type:Boolean})],ft.prototype,"percent",2),Y([ke({type:Boolean})],ft.prototype,"inspectable",2),Y([ke({attribute:!1})],ft.prototype,"selectedTime",2),ft=Y([Nt("smartpi-time-chart")],ft);var li=class extends Ge{constructor(){super(...arguments);this.expert=!1;this.selected="pi"}render(){if(!this.diagnostic)return C``;let n=new ii(this.diagnostic),i=n.blocks(),s=i.find(f=>f.id===this.selected)??i[0],o=this.diagnostic.lastUpdated,a=o?new Date(o):null,u=this.diagnostic.available&&a&&Number.isFinite(a.valueOf())?C`Dernière mise à jour du capteur : <time datetime=${a.toISOString()}>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"short",timeStyle:"medium"}).format(a)}</time>`:"Horodatage des donn\xE9es actuelles indisponible",d=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return C`<div class="intro">
        <div>
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge"
          >${n.bypass?"Chemin direct \xB7 PI/FF contourn\xE9s":n.route==="pi"?"Voie PI + feedforward":"Chemin de commande non v\xE9rifi\xE9"}</span
        >
      </div>
      <p class="muted">
        ${u}. Les flèches pleines montrent le chemin logique déclaré.
        Les pointillés représentent le retour de la pièce par la mesure.
      </p>
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
          ${n.route==="pi"?xn`<path class="flow" d="M205 65 H235"/><path class="flow" d="M205 195 H220 V95 H235"/><path class="flow" d="M420 65 H435 V115 H450"/><path class="flow" d="M420 195 H435 V145 H450"/>`:n.bypass?xn`<path class="flow bypass" d="M205 65 H220 V10 H440 V100 H450"/><path class="flow bypass" d="M205 195 H220 V132 H450"/><path class="flow bypass" d="M635 125 H647 V310 H660"/>`:null}
          ${n.route==="pi"?xn`<path class="flow" d="M635 125 H660"/><path class="flow" d="M752 170 V265"/>`:null}
          <path class="flow feedback" d="M660 315 H420" />
          <path class="flow feedback" d="M235 345 H110 V245" />
          ${i.map((f,v)=>xn`<g role="button" tabindex="0" aria-pressed=${f.id===s.id} aria-label=${`${f.title} : ${f.value}. ${f.status}`} class=${"block "+(f.id===s.id?"selected":"")+(f.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${d[v][0]},${d[v][1]})`} @click=${()=>this.selected=f.id} @keydown=${m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),this.selected=f.id)}}>
          <title>${f.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${f.title}</text><text x="13" y="50" class="value">${f.value}</text><text x="13" y="73" class="status">${f.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${i.map(f=>C`<button
              aria-pressed=${f.id===s.id}
              @click=${()=>this.selected=f.id}
            >
              ${f.title}<strong>${f.value}</strong><small>${f.status}</small>
            </button>`)}
      </div>
      <aside aria-live="polite">
        <h4>${s.title} <span class="badge">${s.status}</span></h4>
        <p><b>Principe.</b> ${s.explanation}</p>
        <dl>
          <div><dt>Valeur du bloc</dt><dd>${s.value}</dd>
            ${this.expert?C`<code>attributes.live.${s.path}</code>`:null}</div>
          <div><dt>Motif ou contexte publié</dt><dd>${s.reason}</dd>
            ${this.expert?C`<code>attributes.live.${s.reasonPath}</code>`:null}</div>
          ${n.detail(s,this.expert).map(f=>C`<div>
            <dt>${f.label}</dt><dd>${f.value}</dd>
            ${this.expert?C`<code>attributes.live.${f.path}</code>${f.reliability?C`<code>Fiabilité : ${f.reliability}</code>`:null}`:null}
          </div>`)}
        </dl>
        ${s.status==="Contourn\xE9"?C`<p class="muted">Ce bloc est hors du chemin actif. Ses valeurs publiées ne décrivent pas la commande directe.</p>`:null}
      </aside>`}};li.styles=Et`
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
      font-size: 11px;
      border: 1px solid var(--divider-color);
      padding: 5px 9px;
      border-radius: 20px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
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
      border-left: 3px solid var(--primary-color);
      padding: 16px;
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
    }
    button[aria-pressed="true"] {
      border-color: var(--primary-color);
    }
    strong,
    small {
      display: block;
      margin-top: 6px;
    }
    :focus-visible {
      outline: 3px solid var(--primary-color);
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
        flex-direction: column;
      }
    }
  `,Y([ke({attribute:!1})],li.prototype,"diagnostic",2),Y([ke({type:Boolean})],li.prototype,"expert",2),Y([je()],li.prototype,"selected",2),li=Y([Nt("smartpi-control-diagram")],li);var sn=class extends Ge{render(){if(!this.diagnostic)return C``;let e=new ii(this.diagnostic),n=e.chain(),i=Math.max(100,...n.map(s=>Math.abs(s.value??0)));return C`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${e.bypass?"Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliqu\xE9e.":"FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu pr\xE9c\xE8dent les limites ; Hold est un \xE9tat de maintien, pas une contribution \xE0 additionner."}
      </p>
      ${n.map(s=>C`<div class="row">
            <span title=${"attributes.live."+s.path}>${s.label}</span>
            <div class="track">
              <i></i>${s.value===null?null:C`<b
                    style=${`left:${s.value<0?50+s.value/i*50:50}%;width:${Math.abs(s.value)/i*50}%`}
                    class=${s.value<0?"negative":""}
                  ></b>`}
            </div>
            <strong>${ie(s.value," %",2)}</strong>
          </div>`)}
      <p>
        Ces diagnostics peuvent décrire un candidat et un cycle déjà engagé.
        Leurs différences ne sont pas une preuve de perte ni de limitation.
      </p>
      <p>
        Échelle symétrique ±${ie(i," %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${ie(D(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${ie(D(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${ie(D(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${D(this.diagnostic.live,"power.valve_linearization_enabled")===!0?C`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`:null}`}};sn.styles=Et`
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
  `,Y([ke({attribute:!1})],sn.prototype,"diagnostic",2),sn=Y([Nt("smartpi-command-chain")],sn);var Vp=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],Bp=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],jp=new Intl.NumberFormat("fr-FR",{maximumFractionDigits:2,signDisplay:"exceptZero"}),Pe=class extends Ge{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.followNow=!0;this.generation=0;this.recorderEntity=""}async inspectBlock(n){this.block=n,n!=="model"&&this.renderRoot.querySelector(".command-chart smartpi-time-chart")?.showCurve(`power.${n}_percent`),await this.updateComplete,this.renderRoot.querySelector("#block-title")?.focus()}inspect(n){this.diagnostic&&(this.followNow=!1,this.inspection={entityId:this.diagnostic.entityId,recorder:this.usingRecorder,time:n})}async inspectEvent(n){this.inspect(n),await this.updateComplete,this.renderRoot.querySelector("#inspection-title")?.focus()}get usingRecorder(){return this.recorderEntity===this.diagnostic?.entityId&&!this.preferSession&&Gs(this.recorder)}willUpdate(n){if(this.followNow&&!this.usingRecorder&&(n.has("session")||n.has("preferSession")||n.has("recorder"))){let i=this.session.at(-1)?.time;i!==void 0&&i>this.range[1]&&(this.end=i,this.range=[i-this.hours*3600,i])}}windowData(n){if(this.filteredCache?.all===n&&this.filteredCache.start===this.range[0]&&this.filteredCache.end===this.range[1])return this.filteredCache;let i=n.filter(s=>s.time>=this.range[0]&&s.time<=this.range[1]);return this.filteredCache={all:n,start:this.range[0],end:this.range[1],samples:i,tracking:wr(i),events:xr(n).filter(s=>s.time>=this.range[0]&&s.time<=this.range[1])}}updated(n){let i=n.get("diagnostic");n.has("diagnostic")&&i?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.filteredCache=void 0,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.followNow=!0,this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(n){this.followNow=!1;let i=this.range[1]-this.range[0],s=Date.now()/1e3,o=this.end-48*3600,a=Math.min(s,Math.max(o+i,this.range[1]+n*i/2));this.range=[a-i,a]}zoom(n){this.followNow=!1;let[i,s]=this.range,o=Math.max(60,Math.min(48*3600,(s-i)*n));this.range=[s-o,s]}async load(){this.inspection=void 0;let n=++this.generation,i=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!i||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let s=Date.now()/1e3,o=await _r(this.hass,i.entityId,s-48*3600,s,()=>n!==this.generation);if(n!==this.generation)return;this.recorderEntity=i.entityId,this.recorder=o,Gs(o)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(s){if(n!==this.generation)return;this.error=s instanceof Error&&s.message.startsWith("Format")?s.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{n===this.generation&&(this.loading=!1)}}trackingPanel(n,i){let{pairs:s,signedMedian:o,absoluteMedian:a,largestInterval:u}=n;return C`<section class="pane tracking" aria-labelledby="tracking-heading">
      <div class="tracking-title">
        <h3 id="tracking-heading">Écart à la consigne filtrée</h3>
        <span>Consigne filtrée − température intérieure</span>
      </div>
      <dl class="metrics">
        <div><dt>Couples valides</dt><dd>${s} / ${i}</dd></div>
        <div><dt>Médiane signée</dt><dd>${o===null?"Indisponible":`${jp.format(o)} \xB0C`}</dd></div>
        <div><dt>Médiane absolue</dt><dd>${ie(a," \xB0C")}</dd></div>
        <div><dt>Plus long intervalle entre couples</dt><dd>${ie(u===null?null:u/60," min",1)}</dd></div>
      </dl>
      <p>${s<2?"Deux couples valides dans la fen\xEAtre sont n\xE9cessaires pour r\xE9sumer l\u2019\xE9cart.":"Un \xE9cart positif indique une temp\xE9rature sous la consigne filtr\xE9e. La m\xE9diane absolue indique la taille typique de l\u2019\xE9cart observ\xE9."}</p>
      <details>
        <summary>Méthode et limites</summary>
        <p>Chaque couple provient d’une même publication et compte une fois, indépendamment de l’intervalle entre les points. Les publications incomplètes sont exclues des médianes. Le plus long intervalle décrit l’espacement des couples valides.</p>
        <p>Ces valeurs décrivent les publications de la source et de la fenêtre affichées. L’évaluation d’une durée de confort ou d’une réponse à un changement de consigne demande des données et un protocole adaptés.</p>
      </details>
    </section>`}inspectionPanel(n,i,s){let o=i?{...n,state:i.state,available:i.state!=="unknown"&&i.state!=="unavailable",live:i.live,history:i.history}:n,a=new ii(o).route,u=i?s?"Recorder":"Session":"Instantan\xE9 SmartPI",d=i?new Date(i.time*1e3):n.lastUpdated?new Date(n.lastUpdated):null,f=(R,x="")=>R==null&&i&&o.available?"Non archiv\xE9":ie(R,x),v=[["Temp\xE9rature int\xE9rieure mesur\xE9e","temperature.indoor"," \xB0C"],["Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C"],["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"]],m=this.block,b=(R,x)=>C`<button type="button" aria-pressed=${m===R} aria-controls="block-detail"
        @click=${()=>void this.inspectBlock(R)}>${x}</button>`,w=a==="direct"?["Consigne et mesure","Hyst\xE9r\xE9sis ou calibration","Commande publi\xE9e","Pi\xE8ce"]:["Consigne et mesure",C`<span>Voies P et I</span> → ${b("pi","PI")}`,C`+ ${b("ff","Anticipation")}`,"Limites et temporisation","Commande publi\xE9e","Pi\xE8ce"],S={pi:[["Contribution PI","power.pi_percent"," %"]],ff:[["Anticipation retenue","power.ff_percent"," %"]],model:[["Gain thermique estim\xE9 A","model.a"," \xB0C/min/u"],["Pertes estim\xE9es B","model.b"," min\u207B\xB9"]]},F="analysis.twin.twin_T_steady",z=D(o.live,F)==null?f(void 0):ie(wt(o.live,F,"analysis.twin.twin_T_steady_reliable")," \xB0C");return C`<section class="synoptic" aria-labelledby="synoptic-title">
        <h3 id="synoptic-title">Synoptique de régulation</h3>
        <ol class="signal-path" aria-label=${a==="unavailable"?"Sch\xE9ma de r\xE9f\xE9rence":"Voie d\xE9clar\xE9e"}>
          ${w.map((R,x)=>C`<li class=${a==="unavailable"?"":"active-path"}>
            ${x?C`<span aria-hidden="true">${x===2&&a!=="direct"?"":"\u2192"}</span>`:te}
            ${R}</li>`)}
        </ol>
        <p>${a==="pi"?"Voie PI active":a==="direct"?"Voie directe d\xE9clar\xE9e":"Chemin actif non v\xE9rifi\xE9"}</p>
        <p>↶ Retour de la mesure · ${b("model","Mod\xE8le thermique")}</p>
      </section>
      <aside class="publication" aria-labelledby="inspection-title">
        <h3 id="inspection-title" tabindex="-1">${i?"Publication s\xE9lectionn\xE9e":"En direct"}</h3>
        <p role="status" class="inspection-status">
          ${u} · ${i?.observedAt?"Observation de session":"Publication"} ·
          ${d&&Number.isFinite(d.valueOf())?C`<time datetime=${d.toISOString()}>${d.toLocaleString()}</time>`:"Horodatage indisponible"}
        </p>
        <dl>
          <dt>État publié</dt><dd>${o.state}</dd>
          ${v.map(([R,x,H])=>C`<dt>${R}</dt>
            <dd>${f(i?Tt(i,x):D(n.live,x),H)}</dd>`)}
          ${i?C`<dt>Écart à la consigne filtrée</dt><dd>${f(Tt(i,"error")," \xB0C")}</dd>`:te}
          <dt>État de l’intégrale</dt><dd>${f(D(o.live,"temperature.integral_mode"))}</dd>
          <dt>Saturation déclarée</dt><dd>${f(D(o.live,"control.saturation_state"))}</dd>
          <dt>Limitation par temporisation</dt><dd>${f(D(o.live,"analysis.control.forced_by_timing"))}</dd>
        </dl>
        <div id="block-detail">
          ${m?C`<h4 id="block-title" tabindex="-1">
              ${{pi:"D\xE9tails PI",ff:"D\xE9tails anticipation",model:"D\xE9tails du mod\xE8le"}[m]}
            </h4>
            <dl>${S[m].map(([R,x,H])=>C`<dt>${R}</dt>
              <dd>${f(i?Tt(i,x):D(n.live,x),H)}</dd>`)}
              ${m==="pi"?C`<dt>Erreur de la voie P</dt>
                <dd>${f(D(o.live,"analysis.control.error_p")," \xB0C")}</dd>
                <dt>Erreur brute de la voie I</dt>
                <dd>${f(D(o.live,"temperature.error")," \xB0C")}</dd>`:te}
              ${m==="ff"?C`<dt>État FF3</dt>
                <dd>${f(D(o.live,"feedforward.ff3_status"))}</dd>`:te}
              ${m==="model"?C`<dt>Équilibre estimé par le Twin</dt><dd>${z}</dd>`:te}
            </dl>`:te}
        </div>
        <button type="button" aria-disabled=${!i} @click=${()=>{this.inspection=void 0}}>
          Revenir au direct
        </button>
        <button type="button" @click=${()=>this.renderRoot.querySelector("#journal-title")?.focus()}>
          Voir le journal
        </button>
      </aside>`}render(){let n=this.diagnostic;if(!n)return te;let i=this.usingRecorder,s=i?this.recorder:this.session,{samples:o,events:a,tracking:u}=this.windowData(s),d=this.tab==="regulation",f=this.tab==="evolution",v=this.inspection,m=f&&v?.entityId===n.entityId&&v.recorder===i?o.find(w=>w.time===v.time):void 0,b=(w,S,F=!1)=>C`<section class=${F?"chart command-chart":"chart"}>
        <smartpi-time-chart
          .heading=${w}
          .samples=${o}
          .curves=${S}
          .range=${this.range}
          .percent=${F}
          .syncKey=${n.entityId}
          .inspectable=${f}
          .selectedTime=${m?.time??null}
          @inspect-publication=${z=>this.inspect(z.detail)}
          @time-range=${z=>{z.detail[1]>z.detail[0]&&(this.followNow=!1,this.range=z.detail)}}
        ></smartpi-time-chart>
      </section>`;return C`<div class="workspace">
      <div class="top">
        <div>
          <h2>Observatoire de la régulation</h2>
          <span class="subtitle">${n.name}</span>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${w=>this.expert=w.target.checked}
          />
          Mode expert</label
        >
      </div>
      <nav aria-label="Vues de diagnostic">
        ${[["evolution","Supervision"],["regulation","R\xE9gulation en direct"],["model","Sant\xE9 du mod\xE8le"]].map(([w,S])=>C`<button
              class=${this.tab===w?"active":""}
              aria-pressed=${this.tab===w}
              @click=${()=>this.tab=w}
            >
              ${S}
            </button>`)}
      </nav>
      ${d?te:C`<div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
          ${[1,3,6,12,24,48].map(w=>C`<button
                aria-pressed=${w===this.hours}
                class=${w===this.hours?"chosen":""}
                @click=${()=>{this.hours=w,this.reset()}}
              >
                ${w} h
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
      </div>
      <div class="source">
        <strong
          >${i?"Recorder \xB7 historique persistant":"Historique de session \xB7 m\xE9moire temporaire"}</strong
        ><span
          >${o.length} publications ·
          ${new Date(this.range[0]*1e3).toLocaleString()} →
          ${new Date(this.range[1]*1e3).toLocaleString()}</span
        ><label
          ><input
            type="checkbox"
            .checked=${this.preferSession}
            @change=${w=>{this.inspection=void 0,this.preferSession=w.target.checked}}
          />
          Session uniquement</label
        >
      </div>
      ${i?te:C`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${w=>{this.followNow=w.target.checked,this.followNow&&this.reset()}}
            />
            Suivre les nouvelles publications de session</label
          >`}
      ${this.loading?C`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:te}
      ${this.error?C`<p role="status" class="notice">${this.error}</p>`:te}
      ${o.length?te:C`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}`}
      ${this.tab==="evolution"?C`<div class="supervision">
            ${this.inspectionPanel(n,m,i)}
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
            </div></div>`:this.tab==="regulation"?C`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${n}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
              </section>
              <section class="pane">
                <smartpi-command-chain .diagnostic=${n}></smartpi-command-chain>
              </section>`:C`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${ie(D(n.live,"model.confidence"))}</span
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
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([w,S,F])=>C`<div>
                        <span>${w}</span
                        ><strong
                          >${ie(wt(n.live,S,F),S==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${ie(D(n.live,F))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${ie(D(n.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${ie(D(n.live,"analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${ie(D(n.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE 30","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([w,S,F])=>C`<div>
                        <span>${w}</span
                        ><strong
                          >${ie(wt(n.live,"analysis.twin."+S),F,4)}</strong
                        >
                      </div>`)}
                </div>
                <p>
                  Équilibre :
                  ${ie(wt(n.live,"analysis.twin.twin_T_steady","analysis.twin.twin_T_steady_reliable")," \xB0C")}
                  · Consigne atteignable (prédiction) :
                  ${ie(wt(n.live,"analysis.twin.twin_setpoint_reachable","analysis.twin.twin_T_steady_reliable"))}
                </p>
                <p class="foot">
                  Aucune courbe Twin : ces valeurs ne font pas partie des huit
                  séries Recorder standard. Fiabilité déclarée ≠ exactitude
                  physique démontrée.
                </p>
              </section>
            `}
      ${d?te:C`<section class="timeline">
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
          ${a.slice(-60).reverse().map(w=>C`<li>
                  <time>${new Date(w.time*1e3).toLocaleString()}</time>
                  <div>
                    ${f?C`<button type="button" aria-pressed=${m?.time===w.time}
                          @click=${()=>void this.inspectEvent(w.time)}>${w.label}</button>`:C`<strong>${w.label}</strong>`}${this.expert?C`<p>${w.provenance}</p>`:te}
                  </div>
                </li>`)}
        </ol>
        ${a.length===0?C`<p>Aucune transition observable sur cette fenêtre.</p>`:C`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>`}
      ${this.expert?C`<details class="provenance">
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
          </details>`:te}
    </div>`}};Pe.styles=Et`
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
  `,Y([ke({attribute:!1})],Pe.prototype,"hass",2),Y([ke({attribute:!1})],Pe.prototype,"diagnostic",2),Y([ke({attribute:!1})],Pe.prototype,"session",2),Y([je()],Pe.prototype,"tab",2),Y([je()],Pe.prototype,"expert",2),Y([je()],Pe.prototype,"hours",2),Y([je()],Pe.prototype,"end",2),Y([je()],Pe.prototype,"range",2),Y([je()],Pe.prototype,"recorder",2),Y([je()],Pe.prototype,"loading",2),Y([je()],Pe.prototype,"error",2),Y([je()],Pe.prototype,"preferSession",2),Y([je()],Pe.prototype,"followNow",2),Y([je()],Pe.prototype,"inspection",2),Y([je()],Pe.prototype,"block",2),Pe=Y([Nt("smartpi-visual-diagnostics")],Pe);var Wp=new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium",timeStyle:"short"}),Gp=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],Kt=class extends Ge{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new Gn}willUpdate(n){n.has("hass")&&this.hass&&this.sessionHistory.collect(Ws(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(n,i,s="",o=2){return C`<div class="metric"><span>${n}</span><strong>${ie(i,s,o)}</strong></div>`}power(n,i,s){let o=Xe(i),a=o===null?0:Math.min(100,Math.max(0,o));return C`<div class="power"><div class="power-label"><span>${n}</span><strong>${ie(i," %",1)}</strong></div>
      <div class="track" aria-label=${n+" "+ie(i," %",1)}>
        <div class=${"fill "+s} style=${"width:"+a+"%"}></div>
      </div></div>`}field(n,i){let s=ie(wt(i,n.path,n.reliable),n.unit??"",n.digits??2);return C`<div class="detail" title=${n.path}><span>${n.label}</span><strong>${s}</strong></div>`}showDiagnostic(n){let i=n.live,s=br(n),o=_n(n),a=Xe(D(i,"learning.bootstrap_progress_percent")),u=Kn(n.lastUpdated);return C`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${n.name}</h2>
            <div class="muted small">${n.climateId??n.entityId}</div></div>
          <span class="tag">${o?"Apprentissage / hyst\xE9r\xE9sis":ie(D(i,"control.phase"))}</span>
        </div>
        <p class="muted small">Dernière publication ${u===null?"indisponible":C`<time datetime=${n.lastUpdated??""}>${Wp.format(u*1e3)}</time>`}</p>
        <div class="metrics">
          ${this.metric("Temp\xE9rature int\xE9rieure",D(i,"temperature.indoor")," \xB0C")}
          ${this.metric("Consigne filtr\xE9e",D(i,"setpoint.filtered_setpoint")," \xB0C")}
          ${this.metric("Commande appliqu\xE9e",D(i,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",D(i,"temperature.outdoor")," \xB0C")}
        </div>
        ${o?C`<div class="learn">
          <div class="flex spread"><span>Progression de l’apprentissage</span><strong>${ie(a," %",0)}</strong></div>
          <div class="track"><div class="fill applied" style=${"width:"+(a===null?0:Math.max(0,Math.min(100,a)))+"%"}></div></div>
          <div class="muted small">A : ${ie(D(i,"learning.emea_samples_a"),"",0)} / ${ie(D(i,"learning.bootstrap_target_a"),"",0)}
            · B : ${ie(D(i,"learning.emea_samples_b"),"",0)} / ${ie(D(i,"learning.bootstrap_target_b"),"",0)}</div>
        </div>`:te}
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${n} .session=${this.sessionHistory.get(n.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${s.map(d=>C`<li>${d}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${Gp.map(d=>C`<details class="surface">
          <summary>${d.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${d.note}</p>
          <div class="detail-grid">${d.fields.map(f=>this.field(f,i))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:n.state,live:n.live,history:n.history},null,2)}</pre>
      </details>
      </details>
    `}render(){let n=Ws(this.hass),i=n.find(s=>s.entityId===this.selectedId)??n[0];return C`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Lecture seule</span></div>
      <main>
        <div class="flex spread intro"><h2>Mes thermostats</h2>
          <span class="muted small">${n.length} diagnostic${n.length>1?"s":""} SmartPI v2</span></div>
        ${n.length===0?C`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:C`<div class="tiles">${n.map(s=>C`<button type="button" class=${"tile "+(i?.entityId===s.entityId?"selected":"")}
           @click=${()=>{this.selectedId=s.entityId}} aria-pressed=${i?.entityId===s.entityId}>
            <strong>${s.name}</strong>
            <span class="big">${ie(D(s.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom">Consigne filtrée ${ie(D(s.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
          </button>`)}</div>
          ${i?this.showDiagnostic(i):te}`}
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
  `,Y([ke({attribute:!1})],Kt.prototype,"hass",2),Y([ke({attribute:!1})],Kt.prototype,"panel",2),Y([ke({type:Boolean})],Kt.prototype,"narrow",2),Y([je()],Kt.prototype,"selectedId",2),Kt=Y([Nt("smartpi-dashboard-panel")],Kt);export{Kt as SmartPIDashboardPanel};
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
