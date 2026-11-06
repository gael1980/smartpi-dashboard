var Aa=Object.defineProperty;var ka=Object.getOwnPropertyDescriptor;var te=(t,e,n,i)=>{for(var s=i>1?void 0:i?ka(e,n):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(s=(i?a(e,n,s):a(s))||s);return i&&s&&Aa(e,n,s),s};var Nn=globalThis,Un=Nn.ShadowRoot&&(Nn.ShadyCSS===void 0||Nn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ls=Symbol(),er=new WeakMap,hn=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Ls)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o,n=this.t;if(Un&&e===void 0){let i=n!==void 0&&n.length===1;i&&(e=er.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&er.set(n,e))}return e}toString(){return this.cssText}},qn=t=>new hn(typeof t=="string"?t:t+"",void 0,Ls),kt=(t,...e)=>{let n=t.length===1?t[0]:e.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new hn(n,t,Ls)},tr=(t,e)=>{if(Un)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let i=document.createElement("style"),s=Nn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,t.appendChild(i)}},Rs=Un?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(let i of e.cssRules)n+=i.cssText;return qn(n)})(t):t;var{is:Ea,defineProperty:Ca,getOwnPropertyDescriptor:Ma,getOwnPropertyNames:Pa,getOwnPropertySymbols:Ta,getPrototypeOf:Fa}=Object,Vn=globalThis,ir=Vn.trustedTypes,La=ir?ir.emptyScript:"",Ra=Vn.reactiveElementPolyfillSupport,mn=(t,e)=>t,gn={toAttribute(t,e){switch(e){case Boolean:t=t?La:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},Bn=(t,e)=>!Ea(t,e),nr={attribute:!0,type:String,converter:gn,reflect:!1,useDefault:!1,hasChanged:Bn};Symbol.metadata??=Symbol("metadata"),Vn.litPropertyMetadata??=new WeakMap;var Vt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=nr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,n);s!==void 0&&Ca(this.prototype,e,s)}}static getPropertyDescriptor(e,n,i){let{get:s,set:o}=Ma(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){let d=s?.call(this);o?.call(this,a),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??nr}static _$Ei(){if(this.hasOwnProperty(mn("elementProperties")))return;let e=Fa(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(mn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(mn("properties"))){let n=this.properties,i=[...Pa(n),...Ta(n)];for(let s of i)this.createProperty(s,n[s])}let e=this[Symbol.metadata];if(e!==null){let n=litPropertyMetadata.get(e);if(n!==void 0)for(let[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[n,i]of this.elementProperties){let s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let n=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)n.unshift(Rs(s))}else e!==void 0&&n.push(Rs(e));return n}static _$Eu(e,n){let i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,n=this.constructor.elementProperties;for(let i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return tr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:gn).toAttribute(n,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,n){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:gn;this._$Em=s;let d=a.fromAttribute(n,o.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,n,i,s=!1,o){if(e!==void 0){let a=this.constructor;if(s===!1&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??Bn)(o,n)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:a}=o,d=this[s];a!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,o,d)}}let e=!1,n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};Vt.elementStyles=[],Vt.shadowRootOptions={mode:"open"},Vt[mn("elementProperties")]=new Map,Vt[mn("finalized")]=new Map,Ra?.({ReactiveElement:Vt}),(Vn.reactiveElementVersions??=[]).push("2.1.2");var Us=globalThis,sr=t=>t,jn=Us.trustedTypes,lr=jn?jn.createPolicy("lit-html",{createHTML:t=>t}):void 0,pr="$lit$",ei=`lit$${Math.random().toFixed(9).slice(2)}$`,dr="?"+ei,Da=`<${dr}>`,gi=document,vn=()=>gi.createComment(""),yn=t=>t===null||typeof t!="object"&&typeof t!="function",qs=Array.isArray,za=t=>qs(t)||typeof t?.[Symbol.iterator]=="function",Ds=`[ 	
\f\r]`,bn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rr=/-->/g,or=/>/g,hi=RegExp(`>|${Ds}(?:([^\\s"'>=/]+)(${Ds}*=${Ds}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ar=/'/g,cr=/"/g,fr=/^(?:script|style|textarea|title)$/i,Vs=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),N=Vs(1),_n=Vs(2),Gu=Vs(3),bi=Symbol.for("lit-noChange"),de=Symbol.for("lit-nothing"),ur=new WeakMap,mi=gi.createTreeWalker(gi,129);function hr(t,e){if(!qs(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return lr!==void 0?lr.createHTML(e):e}var Ha=(t,e)=>{let n=t.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",a=bn;for(let d=0;d<n;d++){let p=t[d],h,b,m=-1,v=0;for(;v<p.length&&(a.lastIndex=v,b=a.exec(p),b!==null);)v=a.lastIndex,a===bn?b[1]==="!--"?a=rr:b[1]!==void 0?a=or:b[2]!==void 0?(fr.test(b[2])&&(s=RegExp("</"+b[2],"g")),a=hi):b[3]!==void 0&&(a=hi):a===hi?b[0]===">"?(a=s??bn,m=-1):b[1]===void 0?m=-2:(m=a.lastIndex-b[2].length,h=b[1],a=b[3]===void 0?hi:b[3]==='"'?cr:ar):a===cr||a===ar?a=hi:a===rr||a===or?a=bn:(a=hi,s=void 0);let k=a===hi&&t[d+1].startsWith("/>")?" ":"";o+=a===bn?p+Da:m>=0?(i.push(h),p.slice(0,m)+pr+p.slice(m)+ei+k):p+ei+(m===-2?d:k)}return[hr(t,o+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},xn=class t{constructor({strings:e,_$litType$:n},i){let s;this.parts=[];let o=0,a=0,d=e.length-1,p=this.parts,[h,b]=Ha(e,n);if(this.el=t.createElement(h,i),mi.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=mi.nextNode())!==null&&p.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(pr)){let v=b[a++],k=s.getAttribute(m).split(ei),C=/([.?@])?(.*)/.exec(v);p.push({type:1,index:o,name:C[2],strings:k,ctor:C[1]==="."?Hs:C[1]==="?"?Is:C[1]==="@"?Os:Bi}),s.removeAttribute(m)}else m.startsWith(ei)&&(p.push({type:6,index:o}),s.removeAttribute(m));if(fr.test(s.tagName)){let m=s.textContent.split(ei),v=m.length-1;if(v>0){s.textContent=jn?jn.emptyScript:"";for(let k=0;k<v;k++)s.append(m[k],vn()),mi.nextNode(),p.push({type:2,index:++o});s.append(m[v],vn())}}}else if(s.nodeType===8)if(s.data===dr)p.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ei,m+1))!==-1;)p.push({type:7,index:o}),m+=ei.length-1}o++}}static createElement(e,n){let i=gi.createElement("template");return i.innerHTML=e,i}};function Vi(t,e,n=t,i){if(e===bi)return e;let s=i!==void 0?n._$Co?.[i]:n._$Cl,o=yn(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,n,i)),i!==void 0?(n._$Co??=[])[i]=s:n._$Cl=s),s!==void 0&&(e=Vi(t,s._$AS(t,e.values),s,i)),e}var zs=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:i}=this._$AD,s=(e?.creationScope??gi).importNode(n,!0);mi.currentNode=s;let o=mi.nextNode(),a=0,d=0,p=i[0];for(;p!==void 0;){if(a===p.index){let h;p.type===2?h=new wn(o,o.nextSibling,this,e):p.type===1?h=new p.ctor(o,p.name,p.strings,this,e):p.type===6&&(h=new Ns(o,this,e)),this._$AV.push(h),p=i[++d]}a!==p?.index&&(o=mi.nextNode(),a++)}return mi.currentNode=gi,s}p(e){let n=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}},wn=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,i,s){this.type=2,this._$AH=de,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Vi(this,e,n),yn(e)?e===de||e==null||e===""?(this._$AH!==de&&this._$AR(),this._$AH=de):e!==this._$AH&&e!==bi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):za(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==de&&yn(this._$AH)?this._$AA.nextSibling.data=e:this.T(gi.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=xn.createElement(hr(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new zs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(e){let n=ur.get(e.strings);return n===void 0&&ur.set(e.strings,n=new xn(e)),n}k(e){qs(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,i,s=0;for(let o of e)s===n.length?n.push(i=new t(this.O(vn()),this.O(vn()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let i=sr(e).nextSibling;sr(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Bi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,s,o){this.type=1,this._$AH=de,this._$AN=void 0,this.element=e,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=de}_$AI(e,n=this,i,s){let o=this.strings,a=!1;if(o===void 0)e=Vi(this,e,n,0),a=!yn(e)||e!==this._$AH&&e!==bi,a&&(this._$AH=e);else{let d=e,p,h;for(e=o[0],p=0;p<o.length-1;p++)h=Vi(this,d[i+p],n,p),h===bi&&(h=this._$AH[p]),a||=!yn(h)||h!==this._$AH[p],h===de?e=de:e!==de&&(e+=(h??"")+o[p+1]),this._$AH[p]=h}a&&!s&&this.j(e)}j(e){e===de?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Hs=class extends Bi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===de?void 0:e}},Is=class extends Bi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==de)}},Os=class extends Bi{constructor(e,n,i,s,o){super(e,n,i,s,o),this.type=5}_$AI(e,n=this){if((e=Vi(this,e,n,0)??de)===bi)return;let i=this._$AH,s=e===de&&i!==de||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==de&&(i===de||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ns=class{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Vi(this,e)}};var Ia=Us.litHtmlPolyfillSupport;Ia?.(xn,wn),(Us.litHtmlVersions??=[]).push("3.3.3");var mr=(t,e,n)=>{let i=n?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=n?.renderBefore??null;i._$litPart$=s=new wn(e.insertBefore(vn(),o),o,void 0,n??{})}return s._$AI(t),s};var Bs=globalThis,We=class extends Vt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=mr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return bi}};We._$litElement$=!0,We.finalized=!0,Bs.litElementHydrateSupport?.({LitElement:We});var Oa=Bs.litElementPolyfillSupport;Oa?.({LitElement:We});(Bs.litElementVersions??=[]).push("4.2.2");var It=t=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Na={attribute:!0,type:String,converter:gn,reflect:!1,hasChanged:Bn},Ua=(t=Na,e,n)=>{let{kind:i,metadata:s}=n,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),i==="accessor"){let{name:a}=n;return{set(d){let p=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,p,t,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,t,d),d}}}if(i==="setter"){let{name:a}=n;return function(d){let p=this[a];e.call(this,d),this.requestUpdate(a,p,t,!0,d)}}throw Error("Unsupported decorator location: "+i)};function Ce(t){return(e,n)=>typeof n=="object"?Ua(t,e,n):((i,s,o)=>{let a=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(s,o):void 0})(t,e,n)}function Qe(t){return Ce({...t,state:!0,attribute:!1})}function at(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function D(t,e){return e.split(".").reduce((n,i)=>at(n)?n[i]:void 0,t)}function ct(t){return typeof t=="number"&&Number.isFinite(t)?t:null}function X(t,e="",n=2){let i=ct(t);return i!==null?i.toLocaleString("fr-FR",{maximumFractionDigits:n})+e:typeof t=="boolean"?t?"Oui":"Non":typeof t=="string"&&t.trim()!==""?t:"Indisponible"}function ji(t){return D(t.live,"control.mode")==="hysteresis"||D(t.live,"learning.stage")==="bootstrap"}function Bt(t,e,n){if(!(n&&D(t,n)!==!0)&&!(e.startsWith("analysis.twin.")&&!e.endsWith("reliable")&&(D(t,"analysis.twin.twin_model_reliable")!==!0||D(t,"analysis.twin.twin_warming_up")!==!1)))return D(t,e)}function qa(t,e){return Object.values(t.states).find(i=>i.entity_id.startsWith("climate.")&&D(i.attributes,"specific_states.regulation_diagnostics")===e)??null}function js(t){if(!t||!at(t.states))return[];let e=[];for(let n of Object.values(t.states)){if(!n?.entity_id?.startsWith("sensor.")||!at(n.attributes))continue;let i=n.attributes;if(i.schema_version!==2||!at(i.live)||!at(i.history))continue;let s=qa(t,n.entity_id),a=(typeof i.friendly_name=="string"?i.friendly_name:n.entity_id).replace(/ SmartPI Diagnostics$/i,"");e.push({entityId:n.entity_id,climateId:s?.entity_id??null,name:typeof s?.attributes.friendly_name=="string"?s.attributes.friendly_name:a,state:n.state,lastUpdated:n.last_updated??null,available:n.state!=="unknown"&&n.state!=="unavailable",live:n.state==="unknown"||n.state==="unavailable"?{}:i.live,history:i.history})}return e.sort((n,i)=>n.name.localeCompare(i.name,"fr"))}function gr(t){let e=[];if(!t.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];e.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),ji(t)&&e.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),D(t.live,"control.in_deadtime_window")===!0&&e.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),D(t.live,"model.tau_reliable")===!1&&e.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),D(t.live,"analysis.twin.twin_T_steady_reliable")===!1&&e.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let n=D(t.live,"feedforward.ff3_status");return typeof n=="string"&&n.startsWith("disabled:")&&e.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+n+"."),e}var Va=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function br(t){if(typeof t=="number")return Number.isFinite(t)&&t>0?t:null;if(typeof t!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(t))return null;let e=Date.parse(t);return Number.isFinite(e)?e/1e3:null}function vr(t){if(!Array.isArray(t))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let e=[];for(let n of t){if(!at(n))continue;let i=br(n.lu??n.last_updated);if(i===null)continue;let s=at(n.a)?n.a:at(n.attributes)?n.attributes:{},o=typeof n.s=="string"?n.s:typeof n.state=="string"?n.state:"unknown",a=s.schema_version===2&&o!=="unavailable"&&o!=="unknown";e.push({time:i,state:o,history:a&&at(s.history)?s.history:{},live:a&&at(s.live)?s.live:{}})}return Yn(e)}function Yn(t){return[...new Map(t.map(e=>[e.time,e])).values()].sort((e,n)=>e.time-n.time)}function Wi(t,e){if(e==="error"){let n=ct(D(t.history,"temperature.indoor")),i=ct(D(t.history,"setpoint.filtered_setpoint"));return n===null||i===null?null:i-n}return e.startsWith("live.")?ct(Bt(t.live,e.slice(5))):ct(D(t.history,e))}function Ws(t){return t.some(e=>Va.some(n=>Wi(e,n)!==null))}function yr(t){let e=[];for(let n=1;n<t.length;n++){let i=t[n-1],s=t[n],o=ct(D(i.history,"setpoint.filtered_setpoint")),a=ct(D(s.history,"setpoint.filtered_setpoint"));o!==null&&a!==null&&o!==a&&e.push({time:s.time,label:`Consigne filtr\xE9e ${o} \u2192 ${a} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),i.state!==s.state&&e.push({time:s.time,label:`Phase / \xE9tat : ${i.state} \u2192 ${s.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[d,p]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let h=D(i.live,d),b=D(s.live,d);h!=null&&b!==void 0&&b!==null&&h!==b&&e.push({time:s.time,label:`${p} : ${String(b)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${d}.`})}}return e}var Gn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(e,n,i=Date.now()/1e3){let s=new Set(e.map(o=>o.entityId));for(let o of this.buffers.keys())s.has(o)||(this.buffers.delete(o),this.revisions.delete(o));for(let o of e){let a=n[o.entityId]?.last_updated,d=br(a);if(!a||d===null||this.revisions.get(o.entityId)===a)continue;this.revisions.set(o.entityId,a);let p=this.buffers.get(o.entityId)??[];if(p.length&&d<=p[p.length-1].time)continue;let b={time:p.length===0?i:d,state:o.state,history:o.available?o.history:{},live:o.live};this.buffers.set(o.entityId,Yn([...p,b]).filter(m=>m.time>=i-48*3600).slice(-12e3))}}get(e){return this.buffers.get(e)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};async function xr(t,e,n,i,s=()=>!1){if(!e.startsWith("sensor.")||!Number.isFinite(n)||!Number.isFinite(i)||i<=n||i-n>48*3600)throw new Error("Fen\xEAtre historique invalide.");let o=[];for(let a=n;a<i;a+=12*3600){if(s())throw new Error("Lecture annul\xE9e.");let d=Math.min(i,a+12*3600),p=await t.callWS({type:"history/history_during_period",start_time:new Date(a*1e3).toISOString(),end_time:new Date(d*1e3).toISOString(),entity_ids:[e],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!at(p))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let h=vr(p[e]??[]);if(o.push(...h.filter(b=>b.time>=a&&b.time<=d)),o.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return Yn(o)}var Ba="uplot",ja="u-hz",Wa="u-vt",Ga="u-title",Ya="u-wrap",Ka="u-under",Ja="u-over",Za="u-axis",xi="u-off",Qa="u-select",Xa="u-cursor-x",ec="u-cursor-y",tc="u-cursor-pt",ic="u-legend",nc="u-live",sc="u-inline",lc="u-series",rc="u-marker",wr="u-label",oc="u-value",$n="width",An="height";var _r="bottom",Gi="left",Gs="right",ul="#000",Sr=ul+"0",Ys="mousemove",$r="mousedown",Ks="mouseup",Ar="mouseenter",kr="mouseleave",Er="dblclick",ac="resize",cc="scroll",Cr="change",Xn="dppxchange",pl="--",en=typeof window<"u",el=en?document:null,Ki=en?window:null,uc=en?navigator:null,ce,Kn;function tl(){let t=devicePixelRatio;ce!=t&&(ce=t,Kn&&nl(Cr,Kn,tl),Kn=matchMedia(`(min-resolution: ${ce-.001}dppx) and (max-resolution: ${ce+.001}dppx)`),wi(Cr,Kn,tl),Ki.dispatchEvent(new CustomEvent(Xn)))}function ut(t,e){if(e!=null){let n=t.classList;!n.contains(e)&&n.add(e)}}function il(t,e){let n=t.classList;n.contains(e)&&n.remove(e)}function we(t,e,n){t.style[e]=n+"px"}function Et(t,e,n,i){let s=el.createElement(t);return e!=null&&ut(s,e),n?.insertBefore(s,i),s}function yt(t,e){return Et("div",t,e)}var Mr=new WeakMap;function Ot(t,e,n,i,s){let o="translate("+e+"px,"+n+"px)",a=Mr.get(t);o!=a&&(t.style.transform=o,Mr.set(t,o),e<0||n<0||e>i||n>s?ut(t,xi):il(t,xi))}var Pr=new WeakMap;function Tr(t,e,n){let i=e+n,s=Pr.get(t);i!=s&&(Pr.set(t,i),t.style.background=e,t.style.borderColor=n)}var Fr=new WeakMap;function Lr(t,e,n,i){let s=e+""+n,o=Fr.get(t);s!=o&&(Fr.set(t,s),t.style.height=n+"px",t.style.width=e+"px",t.style.marginLeft=i?-e/2+"px":0,t.style.marginTop=i?-n/2+"px":0)}var dl={passive:!0},pc={...dl,capture:!0};function wi(t,e,n,i){e.addEventListener(t,n,i?pc:dl)}function nl(t,e,n,i){e.removeEventListener(t,n,dl)}en&&tl();function Ct(t,e,n,i){let s;n=n||0,i=i||e.length-1;let o=i<=2147483647;for(;i-n>1;)s=o?n+i>>1:pt((n+i)/2),e[s]<t?n=s:i=s;return t-e[n]<=e[i]-t?n:i}function oo(t){return(n,i,s)=>{let o=-1,a=-1;for(let d=i;d<=s;d++)if(t(n[d])){o=d;break}for(let d=s;d>=i;d--)if(t(n[d])){a=d;break}return[o,a]}}var ao=t=>t!=null,co=t=>t!=null&&t>0,is=oo(ao),dc=oo(co);function fc(t,e,n,i=0,s=!1){let o=s?dc:is,a=s?co:ao;[e,n]=o(t,e,n);let d=t[e],p=t[e];if(e>-1)if(i==1)d=t[e],p=t[n];else if(i==-1)d=t[n],p=t[e];else for(let h=e;h<=n;h++){let b=t[h];a(b)&&(b<d?d=b:b>p&&(p=b))}return[d??me,p??-me]}function ns(t,e,n,i){let s=zr(t),o=zr(e);t==e&&(s==-1?(t*=n,e/=n):(t/=n,e*=n));let a=n==10?jt:uo,d=s==1?pt:xt,p=o==1?xt:pt,h=d(a(Re(t))),b=p(a(Re(e))),m=Ji(n,h),v=Ji(n,b);return n==10&&(h<0&&(m=ge(m,-h)),b<0&&(v=ge(v,-b))),i||n==2?(t=m*s,e=v*o):(t=mo(t,m),e=ss(e,v)),[t,e]}function fl(t,e,n,i){let s=ns(t,e,n,i);return t==0&&(s[0]=0),e==0&&(s[1]=0),s}var hl=.1,Rr={mode:3,pad:hl},En={pad:0,soft:null,mode:0},hc={min:En,max:En};function es(t,e,n,i){return ls(n)?Dr(t,e,n):(En.pad=n,En.soft=i?0:null,En.mode=i?3:0,Dr(t,e,hc))}function oe(t,e){return t??e}function mc(t,e,n){for(e=oe(e,0),n=oe(n,t.length-1);e<=n;){if(t[e]!=null)return!0;e++}return!1}function Dr(t,e,n){let i=n.min,s=n.max,o=oe(i.pad,0),a=oe(s.pad,0),d=oe(i.hard,-me),p=oe(s.hard,me),h=oe(i.soft,me),b=oe(s.soft,-me),m=oe(i.mode,0),v=oe(s.mode,0),k=e-t,C=jt(k),I=Xe(Re(t),Re(e)),U=jt(I),V=Re(U-C);(k<1e-24||V>10)&&(k=0,(t==0||e==0)&&(k=1e-24,m==2&&h!=me&&(o=0),v==2&&b!=-me&&(a=0)));let _=k||I||1e3,O=jt(_),S=Ji(10,pt(O)),J=_*(k==0?t==0?.1:1:o),T=ge(mo(t-J,S/10),24),Z=t>=h&&(m==1||m==3&&T<=h||m==2&&T>=h)?h:me,G=Xe(d,T<Z&&t>=Z?Z:Mt(Z,T)),ie=_*(k==0?e==0?.1:1:a),W=ge(ss(e+ie,S/10),24),$=e<=b&&(v==1||v==3&&W>=b||v==2&&W<=b)?b:-me,K=Mt(p,W>$&&e<=$?$:Xe($,W));return G==K&&G==0&&(K=100),[G,K]}var gc=new Intl.NumberFormat(en?uc.language:"en-US"),ml=t=>gc.format(t),dt=Math,Qn=dt.PI,Re=dt.abs,pt=dt.floor,Le=dt.round,xt=dt.ceil,Mt=dt.min,Xe=dt.max,Ji=dt.pow,zr=dt.sign,jt=dt.log10,uo=dt.log2,bc=(t,e=1)=>dt.sinh(t)*e,Js=(t,e=1)=>dt.asinh(t/e),me=1/0;function Hr(t){return(jt((t^t>>31)-(t>>31))|0)+1}function sl(t,e,n){return Mt(Xe(t,e),n)}function po(t){return typeof t=="function"}function ne(t){return po(t)?t:()=>t}var vc=()=>{},fo=t=>t,ho=(t,e)=>e,yc=t=>null,Ir=t=>!0,Or=(t,e)=>t==e,xc=/\.\d*?(?=9{6,}|0{6,})/gm,_i=t=>{if(bo(t)||ii.has(t))return t;let e=`${t}`,n=e.match(xc);if(n==null)return t;let i=n[0].length-1;if(e.indexOf("e-")!=-1){let[s,o]=e.split("e");return+`${_i(s)}e${o}`}return ge(t,i)};function vi(t,e){return _i(ge(_i(t/e))*e)}function ss(t,e){return _i(xt(_i(t/e))*e)}function mo(t,e){return _i(pt(_i(t/e))*e)}function ge(t,e=0){if(bo(t))return t;let n=10**e,i=t*n*(1+Number.EPSILON);return Le(i)/n}var ii=new Map;function go(t){return((""+t).split(".")[1]||"").length}function Mn(t,e,n,i){let s=[],o=i.map(go);for(let a=e;a<n;a++){let d=Re(a),p=ge(Ji(t,a),d);for(let h=0;h<i.length;h++){let b=t==10?+`${i[h]}e${a}`:i[h]*p,m=(a>=0?0:d)+(a>=o[h]?0:o[h]),v=t==10?b:ge(b,m);s.push(v),ii.set(v,m)}}return s}var Cn={},gl=[],Zi=[null,null],ti=Array.isArray,bo=Number.isInteger,wc=t=>t===void 0;function Nr(t){return typeof t=="string"}function ls(t){let e=!1;if(t!=null){let n=t.constructor;e=n==null||n==Object}return e}function _c(t){return t!=null&&typeof t=="object"}var Sc=Object.getPrototypeOf(Uint8Array),vo="__proto__";function Qi(t,e=ls){let n;if(ti(t)){let i=t.find(s=>s!=null);if(ti(i)||e(i)){n=Array(t.length);for(let s=0;s<t.length;s++)n[s]=Qi(t[s],e)}else n=t.slice()}else if(t instanceof Sc)n=t.slice();else if(e(t)){n={};for(let i in t)i!=vo&&(n[i]=Qi(t[i],e))}else n=t;return n}function Pe(t){let e=arguments;for(let n=1;n<e.length;n++){let i=e[n];for(let s in i)s!=vo&&(ls(t[s])?Pe(t[s],Qi(i[s])):t[s]=Qi(i[s]))}return t}var $c=0,Ac=1,kc=2;function Ec(t,e,n){for(let i=0,s,o=-1;i<e.length;i++){let a=e[i];if(a>o){for(s=a-1;s>=0&&t[s]==null;)t[s--]=null;for(s=a+1;s<n&&t[s]==null;)t[o=s++]=null}}}function Cc(t,e){if(Tc(t)){let a=t[0].slice();for(let d=1;d<t.length;d++)a.push(...t[d].slice(1));return Fc(a[0])||(a=Pc(a)),a}let n=new Set;for(let a=0;a<t.length;a++){let p=t[a][0],h=p.length;for(let b=0;b<h;b++)n.add(p[b])}let i=[Array.from(n).sort((a,d)=>a-d)],s=i[0].length,o=new Map;for(let a=0;a<s;a++)o.set(i[0][a],a);for(let a=0;a<t.length;a++){let d=t[a],p=d[0];for(let h=1;h<d.length;h++){let b=d[h],m=Array(s).fill(void 0),v=e?e[a][h]:Ac,k=[];for(let C=0;C<b.length;C++){let I=b[C],U=o.get(p[C]);I===null?v!=$c&&(m[U]=I,v==kc&&k.push(U)):m[U]=I}Ec(m,k,s),i.push(m)}}return i}var Mc=typeof queueMicrotask>"u"?t=>Promise.resolve().then(t):queueMicrotask;function Pc(t){let e=t[0],n=e.length,i=Array(n);for(let o=0;o<i.length;o++)i[o]=o;i.sort((o,a)=>e[o]-e[a]);let s=[];for(let o=0;o<t.length;o++){let a=t[o],d=Array(n);for(let p=0;p<n;p++)d[p]=a[i[p]];s.push(d)}return s}function Tc(t){let e=t[0][0],n=e.length;for(let i=1;i<t.length;i++){let s=t[i][0];if(s.length!=n)return!1;if(s!=e){for(let o=0;o<n;o++)if(s[o]!=e[o])return!1}}return!0}function Fc(t,e=100){let n=t.length;if(n<=1)return!0;let i=0,s=n-1;for(;i<=s&&t[i]==null;)i++;for(;s>=i&&t[s]==null;)s--;if(s<=i)return!0;let o=Xe(1,pt((s-i+1)/e));for(let a=t[i],d=i+o;d<=s;d+=o){let p=t[d];if(p!=null){if(p<=a)return!1;a=p}}return!0}var yo=["January","February","March","April","May","June","July","August","September","October","November","December"],xo=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function wo(t){return t.slice(0,3)}var Lc=xo.map(wo),Rc=yo.map(wo),Dc={MMMM:yo,MMM:Rc,WWWW:xo,WWW:Lc};function Sn(t){return(t<10?"0":"")+t}function zc(t){return(t<10?"00":t<100?"0":"")+t}var Hc={YYYY:t=>t.getFullYear(),YY:t=>(t.getFullYear()+"").slice(2),MMMM:(t,e)=>e.MMMM[t.getMonth()],MMM:(t,e)=>e.MMM[t.getMonth()],MM:t=>Sn(t.getMonth()+1),M:t=>t.getMonth()+1,DD:t=>Sn(t.getDate()),D:t=>t.getDate(),WWWW:(t,e)=>e.WWWW[t.getDay()],WWW:(t,e)=>e.WWW[t.getDay()],HH:t=>Sn(t.getHours()),H:t=>t.getHours(),h:t=>{let e=t.getHours();return e==0?12:e>12?e-12:e},AA:t=>t.getHours()>=12?"PM":"AM",aa:t=>t.getHours()>=12?"pm":"am",a:t=>t.getHours()>=12?"p":"a",mm:t=>Sn(t.getMinutes()),m:t=>t.getMinutes(),ss:t=>Sn(t.getSeconds()),s:t=>t.getSeconds(),fff:t=>zc(t.getMilliseconds())};function bl(t,e){e=e||Dc;let n=[],i=/\{([a-z]+)\}|[^{]+/gi,s;for(;s=i.exec(t);)n.push(s[0][0]=="{"?Hc[s[1]]:s[0]);return o=>{let a="";for(let d=0;d<n.length;d++)a+=typeof n[d]=="string"?n[d]:n[d](o,e);return a}}var Ic=new Intl.DateTimeFormat().resolvedOptions().timeZone;function Oc(t,e){let n;return e=="UTC"||e=="Etc/UTC"?n=new Date(+t+t.getTimezoneOffset()*6e4):e==Ic?n=t:(n=new Date(t.toLocaleString("en-US",{timeZone:e})),n.setMilliseconds(t.getMilliseconds())),n}var _o=t=>t%1==0,ts=[1,2,2.5,5],Nc=Mn(10,-32,0,ts),So=Mn(10,0,32,ts),Uc=So.filter(_o),yi=Nc.concat(So),vl=`
`,$o="{YYYY}",Ur=vl+$o,Ao="{M}/{D}",kn=vl+Ao,Jn=kn+"/{YY}",ko="{aa}",qc="{h}:{mm}",Yi=qc+ko,qr=vl+Yi,Vr=":{ss}",pe=null;function Eo(t){let e=t*1e3,n=e*60,i=n*60,s=i*24,o=s*30,a=s*365,p=(t==1?Mn(10,0,3,ts).filter(_o):Mn(10,-3,0,ts)).concat([e,e*5,e*10,e*15,e*30,n,n*5,n*10,n*15,n*30,i,i*2,i*3,i*4,i*6,i*8,i*12,s,s*2,s*3,s*4,s*5,s*6,s*7,s*8,s*9,s*10,s*15,o,o*2,o*3,o*4,o*6,a,a*2,a*5,a*10,a*25,a*50,a*100]),h=[[a,$o,pe,pe,pe,pe,pe,pe,1],[s*28,"{MMM}",Ur,pe,pe,pe,pe,pe,1],[s,Ao,Ur,pe,pe,pe,pe,pe,1],[i,"{h}"+ko,Jn,pe,kn,pe,pe,pe,1],[n,Yi,Jn,pe,kn,pe,pe,pe,1],[e,Vr,Jn+" "+Yi,pe,kn+" "+Yi,pe,qr,pe,1],[t,Vr+".{fff}",Jn+" "+Yi,pe,kn+" "+Yi,pe,qr,pe,1]];function b(m){return(v,k,C,I,U,V)=>{let _=[],O=U>=a,S=U>=o&&U<a,J=m(C),T=ge(J*t,3),Z=Zs(J.getFullYear(),O?0:J.getMonth(),S||O?1:J.getDate()),G=ge(Z*t,3);if(S||O){let ie=S?U/o:0,W=O?U/a:0,$=T==G?T:ge(Zs(Z.getFullYear()+W,Z.getMonth()+ie,1)*t,3),K=new Date(Le($/t)),F=K.getFullYear(),B=K.getMonth();for(let H=0;$<=I;H++){let se=Zs(F+W*H,B+ie*H,1),z=se-m(ge(se*t,3));$=ge((+se+z)*t,3),$<=I&&_.push($)}}else{let ie=U>=s?s:U,W=pt(C)-pt(T),$=G+W+ss(T-G,ie);_.push($);let K=m($),F=K.getHours()+K.getMinutes()/n+K.getSeconds()/i,B=U/i,H=v.axes[k]._space,se=V/H;for(;$=ge($+U,t==1?0:3),!($>I);)if(B>1){let z=pt(ge(F+B,6))%24,le=m($).getHours()-z;le>1&&(le=-1),$-=le*i,F=(F+B)%24;let fe=_[_.length-1];ge(($-fe)/U,3)*se>=.7&&_.push($)}else _.push($)}return _}}return[p,h,b]}var[Vc,Bc,jc]=Eo(1),[Wc,Gc,Yc]=Eo(.001);Mn(2,-53,53,[1]);function Br(t,e){return t.map(n=>n.map((i,s)=>s==0||s==8||i==null?i:e(s==1||n[8]==0?i:n[1]+i)))}function jr(t,e){return(n,i,s,o,a)=>{let d=e.find(C=>a>=C[0])||e[e.length-1],p,h,b,m,v,k;return i.map(C=>{let I=t(C),U=I.getFullYear(),V=I.getMonth(),_=I.getDate(),O=I.getHours(),S=I.getMinutes(),J=I.getSeconds(),T=U!=p&&d[2]||V!=h&&d[3]||_!=b&&d[4]||O!=m&&d[5]||S!=v&&d[6]||J!=k&&d[7]||d[1];return p=U,h=V,b=_,m=O,v=S,k=J,T(I)})}}function Kc(t,e){let n=bl(e);return(i,s,o,a,d)=>s.map(p=>n(t(p)))}function Zs(t,e,n){return new Date(t,e,n)}function Wr(t,e){return e(t)}var Jc="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Gr(t,e){return(n,i,s,o)=>o==null?pl:e(t(i))}function Zc(t,e){let n=t.series[e];return n.width?n.stroke(t,e):n.points.width?n.points.stroke(t,e):null}function Qc(t,e){return t.series[e].fill(t,e)}var Xc={show:!0,live:!0,isolate:!1,mount:vc,markers:{show:!0,width:2,stroke:Zc,fill:Qc,dash:"solid"},idx:null,idxs:null,values:[]};function eu(t,e){let n=t.cursor.points,i=yt(),s=n.size(t,e);we(i,$n,s),we(i,An,s);let o=s/-2;we(i,"marginLeft",o),we(i,"marginTop",o);let a=n.width(t,e,s);return a&&we(i,"borderWidth",a),i}function tu(t,e){let n=t.series[e].points;return n._fill||n._stroke}function iu(t,e){let n=t.series[e].points;return n._stroke||n._fill}function nu(t,e){return t.series[e].points.size}var Qs=[0,0];function su(t,e,n){return Qs[0]=e,Qs[1]=n,Qs}function Zn(t,e,n,i=!0){return s=>{s.button==0&&(!i||s.target==e)&&n(s)}}function Xs(t,e,n,i=!0){return s=>{(!i||s.target==e)&&n(s)}}var lu={show:!0,x:!0,y:!0,lock:!1,move:su,points:{one:!1,show:eu,size:nu,width:0,stroke:iu,fill:tu},bind:{mousedown:Zn,mouseup:Zn,click:Zn,dblclick:Zn,mousemove:Xs,mouseleave:Xs,mouseenter:Xs},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(t,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(t,e,n,i,s)=>i-s,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Co={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},yl=Pe({},Co,{filter:ho}),Mo=Pe({},yl,{size:10}),Po=Pe({},Co,{show:!1}),xl='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',To="bold "+xl,Fo=1.5,Yr={show:!0,scale:"x",stroke:ul,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:To,side:2,grid:yl,ticks:Mo,border:Po,font:xl,lineGap:Fo,rotate:0},ru="Value",ou="Time",Kr={show:!0,scale:"x",auto:!1,sorted:1,min:me,max:-me,idxs:[]};function au(t,e,n,i,s){return e.map(o=>o==null?"":ml(o))}function cu(t,e,n,i,s,o,a){let d=[],p=ii.get(s)||0;n=a?n:ge(ss(n,s),p);for(let h=n;h<=i;h=ge(h+s,p))d.push(Object.is(h,-0)?0:h);return d}function ll(t,e,n,i,s,o,a){let d=[],p=t.scales[t.axes[e].scale].log,h=p==10?jt:uo,b=pt(h(n));s=Ji(p,b),p==10&&(s=yi[Ct(s,yi)]);let m=n,v=s*p;p==10&&(v=yi[Ct(v,yi)]);do d.push(m),m=m+s,p==10&&!ii.has(m)&&(m=ge(m,ii.get(s))),m>=v&&(s=m,v=s*p,p==10&&(v=yi[Ct(v,yi)]));while(m<=i);return d}function uu(t,e,n,i,s,o,a){let p=t.scales[t.axes[e].scale].asinh,h=i>p?ll(t,e,Xe(p,n),i,s):[p],b=i>=0&&n<=0?[0]:[];return(n<-p?ll(t,e,Xe(p,-i),-n,s):[p]).reverse().map(v=>-v).concat(b,h)}var Lo=/./,pu=/[12357]/,du=/[125]/,Jr=/1/,rl=(t,e,n,i)=>t.map((s,o)=>e==4&&s==0||o%i==0&&n.test(s.toExponential()[s<0?1:0])?s:null);function fu(t,e,n,i,s){let o=t.axes[n],a=o.scale,d=t.scales[a],p=t.valToPos,h=o._space,b=p(10,a),m=p(9,a)-b>=h?Lo:p(7,a)-b>=h?pu:p(5,a)-b>=h?du:Jr;if(m==Jr){let v=Re(p(1,a)-b);if(v<h)return rl(e.slice().reverse(),d.distr,m,xt(h/v)).reverse()}return rl(e,d.distr,m,1)}function hu(t,e,n,i,s){let o=t.axes[n],a=o.scale,d=o._space,p=t.valToPos,h=Re(p(1,a)-p(2,a));return h<d?rl(e.slice().reverse(),3,Lo,xt(d/h)).reverse():e}function mu(t,e,n,i){return i==null?pl:e==null?"":ml(e)}var Zr={show:!0,scale:"y",stroke:ul,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:To,side:3,grid:yl,ticks:Mo,border:Po,font:xl,lineGap:Fo,rotate:0};function gu(t,e){let n=3+(t||1)*2;return ge(n*e,3)}function bu(t,e){let{scale:n,idxs:i}=t.series[0],s=t._data[0],o=t.valToPos(s[i[0]],n,!0),a=t.valToPos(s[i[1]],n,!0),d=Re(a-o),p=t.series[e],h=d/(p.points.space*ce);return i[1]-i[0]<=h}var Qr={scale:null,auto:!0,sorted:0,min:me,max:-me},Ro=(t,e,n,i,s)=>s,Xr={show:!0,auto:!0,sorted:0,gaps:Ro,alpha:1,facets:[Pe({},Qr,{scale:"x"}),Pe({},Qr,{scale:"y"})]},eo={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:Ro,alpha:1,points:{show:bu,filter:null},values:null,min:me,max:-me,idxs:[],path:null,clip:null};function vu(t,e,n,i,s){return n/10}var Do={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},yu=Pe({},Do,{time:!1,ori:1}),to={};function zo(t,e){let n=to[t];return n||(n={key:t,plots:[],sub(i){n.plots.push(i)},unsub(i){n.plots=n.plots.filter(s=>s!=i)},pub(i,s,o,a,d,p,h){for(let b=0;b<n.plots.length;b++)n.plots[b]!=s&&n.plots[b].pub(i,s,o,a,d,p,h)}},t!=null&&(to[t]=n)),n}var Xi=1,ol=2;function Si(t,e,n){let i=t.mode,s=t.series[e],o=i==2?t._data[e]:t._data,a=t.scales,d=t.bbox,p=o[0],h=i==2?o[1]:o[e],b=i==2?a[s.facets[0].scale]:a[t.series[0].scale],m=i==2?a[s.facets[1].scale]:a[s.scale],v=d.left,k=d.top,C=d.width,I=d.height,U=t.valToPosH,V=t.valToPosV;return b.ori==0?n(s,p,h,b,m,U,V,v,k,C,I,os,tn,cs,Io,No):n(s,p,h,b,m,V,U,k,v,I,C,as,nn,Sl,Oo,Uo)}function wl(t,e){let n=0,i=0,s=oe(t.bands,gl);for(let o=0;o<s.length;o++){let a=s[o];a.series[0]==e?n=a.dir:a.series[1]==e&&(a.dir==1?i|=1:i|=2)}return[n,i==1?-1:i==2?1:i==3?2:0]}function xu(t,e,n,i,s){let o=t.mode,a=t.series[e],d=o==2?a.facets[1].scale:a.scale,p=t.scales[d];return s==-1?p.min:s==1?p.max:p.distr==3?p.dir==1?p.min:p.max:0}function Wt(t,e,n,i,s,o){return Si(t,e,(a,d,p,h,b,m,v,k,C,I,U)=>{let V=a.pxRound,_=h.dir*(h.ori==0?1:-1),O=h.ori==0?tn:nn,S,J;_==1?(S=n,J=i):(S=i,J=n);let T=V(m(d[S],h,I,k)),Z=V(v(p[S],b,U,C)),G=V(m(d[J],h,I,k)),ie=V(v(o==1?b.max:b.min,b,U,C)),W=new Path2D(s);return O(W,G,ie),O(W,T,ie),O(W,T,Z),W})}function rs(t,e,n,i,s,o){let a=null;if(t.length>0){a=new Path2D;let d=e==0?cs:Sl,p=n;for(let m=0;m<t.length;m++){let v=t[m];if(v[1]>v[0]){let k=v[0]-p;k>0&&d(a,p,i,k,i+o),p=v[1]}}let h=n+s-p,b=10;h>0&&d(a,p,i-b/2,h,i+o+b)}return a}function wu(t,e,n){let i=t[t.length-1];i&&i[0]==e?i[1]=n:t.push([e,n])}function _l(t,e,n,i,s,o,a){let d=[],p=t.length;for(let h=s==1?n:i;h>=n&&h<=i;h+=s)if(e[h]===null){let m=h,v=h;if(s==1)for(;++h<=i&&e[h]===null;)v=h;else for(;--h>=n&&e[h]===null;)v=h;let k=o(t[m]),C=v==m?k:o(t[v]),I=m-s;k=a<=0&&I>=0&&I<p?o(t[I]):k;let V=v+s;C=a>=0&&V>=0&&V<p?o(t[V]):C,C>=k&&d.push([k,C])}return d}function io(t){return t==0?fo:t==1?Le:e=>vi(e,t)}function Ho(t){let e=t==0?os:as,n=t==0?(s,o,a,d,p,h)=>{s.arcTo(o,a,d,p,h)}:(s,o,a,d,p,h)=>{s.arcTo(a,o,p,d,h)},i=t==0?(s,o,a,d,p)=>{s.rect(o,a,d,p)}:(s,o,a,d,p)=>{s.rect(a,o,p,d)};return(s,o,a,d,p,h=0,b=0)=>{h==0&&b==0?i(s,o,a,d,p):(h=Mt(h,d/2,p/2),b=Mt(b,d/2,p/2),e(s,o+h,a),n(s,o+d,a,o+d,a+p,h),n(s,o+d,a+p,o,a+p,b),n(s,o,a+p,o,a,b),n(s,o,a,o+d,a,h),s.closePath())}}var os=(t,e,n)=>{t.moveTo(e,n)},as=(t,e,n)=>{t.moveTo(n,e)},tn=(t,e,n)=>{t.lineTo(e,n)},nn=(t,e,n)=>{t.lineTo(n,e)},cs=Ho(0),Sl=Ho(1),Io=(t,e,n,i,s,o)=>{t.arc(e,n,i,s,o)},Oo=(t,e,n,i,s,o)=>{t.arc(n,e,i,s,o)},No=(t,e,n,i,s,o,a)=>{t.bezierCurveTo(e,n,i,s,o,a)},Uo=(t,e,n,i,s,o,a)=>{t.bezierCurveTo(n,e,s,i,a,o)};function qo(t){return(e,n,i,s,o)=>Si(e,n,(a,d,p,h,b,m,v,k,C,I,U)=>{let{pxRound:V,points:_}=a,O,S;h.ori==0?(O=os,S=Io):(O=as,S=Oo);let J=ge(_.width*ce,3),T=(_.size-_.width)/2*ce,Z=ge(T*2,3),G=new Path2D,ie=new Path2D,{left:W,top:$,width:K,height:F}=e.bbox;cs(ie,W-Z,$-Z,K+Z*2,F+Z*2);let B=H=>{if(p[H]!=null){let se=V(m(d[H],h,I,k)),z=V(v(p[H],b,U,C));O(G,se+T,z),S(G,se,z,T,0,Qn*2)}};if(o)o.forEach(B);else for(let H=i;H<=s;H++)B(H);return{stroke:J>0?G:null,fill:G,clip:ie,flags:Xi|ol}})}function Vo(t){return(e,n,i,s,o,a)=>{i!=s&&(o!=i&&a!=i&&t(e,n,i),o!=s&&a!=s&&t(e,n,s),t(e,n,a))}}var _u=Vo(tn),Su=Vo(nn);function Bo(t){let e=oe(t?.alignGaps,0);return(n,i,s,o)=>Si(n,i,(a,d,p,h,b,m,v,k,C,I,U)=>{[s,o]=is(p,s,o);let V=a.pxRound,_=F=>V(m(F,h,I,k)),O=F=>V(v(F,b,U,C)),S,J;h.ori==0?(S=tn,J=_u):(S=nn,J=Su);let T=h.dir*(h.ori==0?1:-1),Z={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},G=Z.stroke,ie=!1;if(o-s>=I*4){let F=L=>n.posToVal(L,h.key,!0),B=null,H=null,se,z,et,_e=_(d[T==1?s:o]),le=_(d[s]),fe=_(d[o]),Q=F(T==1?le+1:fe-1);for(let L=T==1?s:o;L>=s&&L<=o;L+=T){let Te=d[L],Se=(T==1?Te<Q:Te>Q)?_e:_(Te),ue=p[L];Se==_e?ue!=null?(z=ue,B==null?(S(G,Se,O(z)),se=B=H=z):z<B?B=z:z>H&&(H=z)):ue===null&&(ie=!0):(B!=null&&J(G,_e,O(B),O(H),O(se),O(z)),ue!=null?(z=ue,S(G,Se,O(z)),B=H=se=z):(B=H=null,ue===null&&(ie=!0)),_e=Se,Q=F(_e+T))}B!=null&&B!=H&&et!=_e&&J(G,_e,O(B),O(H),O(se),O(z))}else for(let F=T==1?s:o;F>=s&&F<=o;F+=T){let B=p[F];B===null?ie=!0:B!=null&&S(G,_(d[F]),O(B))}let[$,K]=wl(n,i);if(a.fill!=null||$!=0){let F=Z.fill=new Path2D(G),B=a.fillTo(n,i,a.min,a.max,$),H=O(B),se=_(d[s]),z=_(d[o]);T==-1&&([z,se]=[se,z]),S(F,z,H),S(F,se,H)}if(!a.spanGaps){let F=[];ie&&F.push(..._l(d,p,s,o,T,_,e)),Z.gaps=F=a.gaps(n,i,s,o,F),Z.clip=rs(F,h.ori,k,C,I,U)}return K!=0&&(Z.band=K==2?[Wt(n,i,s,o,G,-1),Wt(n,i,s,o,G,1)]:Wt(n,i,s,o,G,K)),Z})}function $u(t){let e=oe(t.align,1),n=oe(t.ascDesc,!1),i=oe(t.alignGaps,0),s=oe(t.extend,!1);return(o,a,d,p)=>Si(o,a,(h,b,m,v,k,C,I,U,V,_,O)=>{[d,p]=is(m,d,p);let S=h.pxRound,{left:J,width:T}=o.bbox,Z=le=>S(C(le,v,_,U)),G=le=>S(I(le,k,O,V)),ie=v.ori==0?tn:nn,W={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},$=W.stroke,K=v.dir*(v.ori==0?1:-1),F=G(m[K==1?d:p]),B=Z(b[K==1?d:p]),H=B,se=B;s&&e==-1&&(se=J,ie($,se,F)),ie($,B,F);for(let le=K==1?d:p;le>=d&&le<=p;le+=K){let fe=m[le];if(fe==null)continue;let Q=Z(b[le]),L=G(fe);e==1?ie($,Q,F):ie($,H,L),ie($,Q,L),F=L,H=Q}let z=H;s&&e==1&&(z=J+T,ie($,z,F));let[et,_e]=wl(o,a);if(h.fill!=null||et!=0){let le=W.fill=new Path2D($),fe=h.fillTo(o,a,h.min,h.max,et),Q=G(fe);ie(le,z,Q),ie(le,se,Q)}if(!h.spanGaps){let le=[];le.push(..._l(b,m,d,p,K,Z,i));let fe=h.width*ce/2,Q=n||e==1?fe:-fe,L=n||e==-1?-fe:fe;le.forEach(Te=>{Te[0]+=Q,Te[1]+=L}),W.gaps=le=h.gaps(o,a,d,p,le),W.clip=rs(le,v.ori,U,V,_,O)}return _e!=0&&(W.band=_e==2?[Wt(o,a,d,p,$,-1),Wt(o,a,d,p,$,1)]:Wt(o,a,d,p,$,_e)),W})}function no(t,e,n,i,s,o,a=me){if(t.length>1){let d=null;for(let p=0,h=1/0;p<t.length;p++)if(e[p]!==void 0){if(d!=null){let b=Re(t[p]-t[d]);b<h&&(h=b,a=Re(n(t[p],i,s,o)-n(t[d],i,s,o)))}d=p}}return a}function Au(t){t=t||Cn;let e=oe(t.size,[.6,me,1]),n=t.align||0,i=t.gap||0,s=t.radius;s=s==null?[0,0]:typeof s=="number"?[s,0]:s;let o=ne(s),a=1-e[0],d=oe(e[1],me),p=oe(e[2],1),h=oe(t.disp,Cn),b=oe(t.each,k=>{}),{fill:m,stroke:v}=h;return(k,C,I,U)=>Si(k,C,(V,_,O,S,J,T,Z,G,ie,W,$)=>{let K=V.pxRound,F=n,B=i*ce,H=d*ce,se=p*ce,z,et;S.ori==0?[z,et]=o(k,C):[et,z]=o(k,C);let _e=S.dir*(S.ori==0?1:-1),le=S.ori==0?cs:Sl,fe=S.ori==0?b:(M,be,Fe,Ei,ri,Ft,oi)=>{b(M,be,Fe,ri,Ei,oi,Ft)},Q=oe(k.bands,gl).find(M=>M.series[0]==C),L=Q!=null?Q.dir:0,Te=V.fillTo(k,C,V.min,V.max,L),Ge=K(Z(Te,J,$,ie)),Se,ue,wt,nt=W,Ae=K(V.width*ce),Tt=!1,Nt=null,ft=null,Yt=null,$i=null;m!=null&&(Ae==0||v!=null)&&(Tt=!0,Nt=m.values(k,C,I,U),ft=new Map,new Set(Nt).forEach(M=>{M!=null&&ft.set(M,new Path2D)}),Ae>0&&(Yt=v.values(k,C,I,U),$i=new Map,new Set(Yt).forEach(M=>{M!=null&&$i.set(M,new Path2D)})));let{x0:Ai,size:rn}=h;if(Ai!=null&&rn!=null){F=1,_=Ai.values(k,C,I,U),Ai.unit==2&&(_=_.map(Fe=>k.posToVal(G+Fe*W,S.key,!0)));let M=rn.values(k,C,I,U);rn.unit==2?ue=M[0]*W:ue=T(M[0],S,W,G)-T(0,S,W,G),nt=no(_,O,T,S,W,G,nt),wt=nt-ue+B}else nt=no(_,O,T,S,W,G,nt),wt=nt*a+B,ue=nt-wt;wt<1&&(wt=0),Ae>=ue/2&&(Ae=0),wt<5&&(K=fo);let Pn=wt>0,si=nt-wt-(Pn?Ae:0);ue=K(sl(si,se,H)),Se=(F==0?ue/2:F==_e?0:ue)-F*_e*((F==0?B/2:0)+(Pn?Ae/2:0));let Ye={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},ki=Tt?null:new Path2D,Ut=null;if(Q!=null)Ut=k.data[Q.series[1]];else{let{y0:M,y1:be}=h;M!=null&&be!=null&&(O=be.values(k,C,I,U),Ut=M.values(k,C,I,U))}let li=z*ue,Y=et*ue;for(let M=_e==1?I:U;M>=I&&M<=U;M+=_e){let be=O[M];if(be==null)continue;if(Ut!=null){let tt=Ut[M]??0;if(be-tt==0)continue;Ge=Z(tt,J,$,ie)}let Fe=S.distr!=2||h!=null?_[M]:M,Ei=T(Fe,S,W,G),ri=Z(oe(be,Te),J,$,ie),Ft=K(Ei-Se),oi=K(Xe(ri,Ge)),st=K(Mt(ri,Ge)),ht=oi-st;if(be!=null){let tt=be<0?Y:li,_t=be<0?li:Y;Tt?(Ae>0&&Yt[M]!=null&&le($i.get(Yt[M]),Ft,st+pt(Ae/2),ue,Xe(0,ht-Ae),tt,_t),Nt[M]!=null&&le(ft.get(Nt[M]),Ft,st+pt(Ae/2),ue,Xe(0,ht-Ae),tt,_t)):le(ki,Ft,st+pt(Ae/2),ue,Xe(0,ht-Ae),tt,_t),fe(k,C,M,Ft-Ae/2,st,ue+Ae,ht)}}return Ae>0?Ye.stroke=Tt?$i:ki:Tt||(Ye._fill=V.width==0?V._fill:V._stroke??V._fill,Ye.width=0),Ye.fill=Tt?ft:ki,Ye})}function ku(t,e){let n=oe(e?.alignGaps,0);return(i,s,o,a)=>Si(i,s,(d,p,h,b,m,v,k,C,I,U,V)=>{[o,a]=is(h,o,a);let _=d.pxRound,O=z=>_(v(z,b,U,C)),S=z=>_(k(z,m,V,I)),J,T,Z;b.ori==0?(J=os,Z=tn,T=No):(J=as,Z=nn,T=Uo);let G=b.dir*(b.ori==0?1:-1),ie=O(p[G==1?o:a]),W=ie,$=[],K=[];for(let z=G==1?o:a;z>=o&&z<=a;z+=G)if(h[z]!=null){let _e=p[z],le=O(_e);$.push(W=le),K.push(S(h[z]))}let F={stroke:t($,K,J,Z,T,_),fill:null,clip:null,band:null,gaps:null,flags:Xi},B=F.stroke,[H,se]=wl(i,s);if(d.fill!=null||H!=0){let z=F.fill=new Path2D(B),et=d.fillTo(i,s,d.min,d.max,H),_e=S(et);Z(z,W,_e),Z(z,ie,_e)}if(!d.spanGaps){let z=[];z.push(..._l(p,h,o,a,G,O,n)),F.gaps=z=d.gaps(i,s,o,a,z),F.clip=rs(z,b.ori,C,I,U,V)}return se!=0&&(F.band=se==2?[Wt(i,s,o,a,B,-1),Wt(i,s,o,a,B,1)]:Wt(i,s,o,a,B,se)),F})}function Eu(t){return ku(Cu,t)}function Cu(t,e,n,i,s,o){let a=t.length;if(a<2)return null;let d=new Path2D;if(n(d,t[0],e[0]),a==2)i(d,t[1],e[1]);else{let p=Array(a),h=Array(a-1),b=Array(a-1),m=Array(a-1);for(let v=0;v<a-1;v++)b[v]=e[v+1]-e[v],m[v]=t[v+1]-t[v],h[v]=b[v]/m[v];p[0]=h[0];for(let v=1;v<a-1;v++)h[v]===0||h[v-1]===0||h[v-1]>0!=h[v]>0?p[v]=0:(p[v]=3*(m[v-1]+m[v])/((2*m[v]+m[v-1])/h[v-1]+(m[v]+2*m[v-1])/h[v]),isFinite(p[v])||(p[v]=0));p[a-1]=h[a-2];for(let v=0;v<a-1;v++)s(d,t[v]+m[v]/3,e[v]+p[v]*m[v]/3,t[v+1]-m[v]/3,e[v+1]-p[v+1]*m[v]/3,t[v+1],e[v+1])}return d}var al=new Set;function so(){for(let t of al)t.syncRect(!0)}en&&(wi(ac,Ki,so),wi(cc,Ki,so,!0),wi(Xn,Ki,()=>{Ue.pxRatio=ce}));var Mu=Bo(),Pu=qo();function lo(t,e,n,i){return(i?[t[0],t[1]].concat(t.slice(2)):[t[0]].concat(t.slice(1))).map((o,a)=>cl(o,a,e,n))}function Tu(t,e){return t.map((n,i)=>i==0?{}:Pe({},e,n))}function cl(t,e,n,i){return Pe({},e==0?n:i,t)}function jo(t,e,n){return e==null?Zi:[e,n]}var Fu=jo;function Lu(t,e,n){return e==null?Zi:es(e,n,hl,!0)}function Wo(t,e,n,i){return e==null?Zi:ns(e,n,t.scales[i].log,!1)}var Ru=Wo;function Go(t,e,n,i){return e==null?Zi:fl(e,n,t.scales[i].log,!1)}var Du=Go;function zu(t,e,n,i,s){let o=Xe(Hr(t),Hr(e)),a=e-t,d=Ct(s/i*a,n);do{let p=n[d],h=i*p/a;if(h>=s&&o+(p<5?ii.get(p):0)<=17)return[p,h]}while(++d<n.length);return[0,0]}function ro(t){let e,n;return t=t.replace(/(\d+)px/,(i,s)=>(e=Le((n=+s)*ce))+"px"),[t,e,n]}function Hu(t){t.show&&[t.font,t.labelFont].forEach(e=>{let n=ge(e[2]*ce,1);e[0]=e[0].replace(/[0-9.]+px/,n+"px"),e[1]=n})}function Ue(t,e,n){let i={mode:oe(t.mode,1)},s=i.mode;function o(l,r,c,u){let f=r.valToPct(l);return u+c*(r.dir==-1?1-f:f)}function a(l,r,c,u){let f=r.valToPct(l);return u+c*(r.dir==-1?f:1-f)}function d(l,r,c,u){return r.ori==0?o(l,r,c,u):a(l,r,c,u)}i.valToPosH=o,i.valToPosV=a;let p=!1;i.status=0;let h=i.root=yt(Ba);if(t.id!=null&&(h.id=t.id),ut(h,t.class),t.title){let l=yt(Ga,h);l.textContent=t.title}let b=Et("canvas"),m=i.ctx=b.getContext("2d"),v=yt(Ya,h);wi("click",v,l=>{l.target===C&&(ve!=Ii||$e!=Oi)&&Be.click(i,l)},!0);let k=i.under=yt(Ka,v);v.appendChild(b);let C=i.over=yt(Ja,v);t=Qi(t);let I=+oe(t.pxAlign,1),U=io(I);(t.plugins||[]).forEach(l=>{l.opts&&(t=l.opts(i,t)||t)});let V=t.ms||.001,_=i.series=s==1?lo(t.series||[],Kr,eo,!1):Tu(t.series||[null],Xr),O=i.axes=lo(t.axes||[],Yr,Zr,!0),S=i.scales={},J=i.bands=t.bands||[];J.forEach(l=>{l.fill=ne(l.fill||null),l.dir=oe(l.dir,-1)});let T=s==2?_[1].facets[0].scale:_[0].scale,Z={axes:ua,series:la},G=(t.drawOrder||["axes","series"]).map(l=>Z[l]);function ie(l){let r=l.distr==3?c=>jt(c>0?c:l.clamp(i,c,l.min,l.max,l.key)):l.distr==4?c=>Js(c,l.asinh):l.distr==100?c=>l.fwd(c):c=>c;return c=>{let u=r(c),{_min:f,_max:g}=l,y=g-f;return(u-f)/y}}function W(l){let r=S[l];if(r==null){let c=(t.scales||Cn)[l]||Cn;if(c.from!=null){W(c.from);let u=Pe({},S[c.from],c,{key:l});u.valToPct=ie(u),S[l]=u}else{r=S[l]=Pe({},l==T?Do:yu,c),r.key=l;let u=r.time,f=r.range,g=ti(f);if((l!=T||s==2&&!u)&&(g&&(f[0]==null||f[1]==null)&&(f={min:f[0]==null?Rr:{mode:1,hard:f[0],soft:f[0]},max:f[1]==null?Rr:{mode:1,hard:f[1],soft:f[1]}},g=!1),!g&&ls(f))){let y=f;f=(x,w,A)=>w==null?Zi:es(w,A,y)}r.range=ne(f||(u?Fu:l==T?r.distr==3?Ru:r.distr==4?Du:jo:r.distr==3?Wo:r.distr==4?Go:Lu)),r.auto=ne(g?!1:r.auto),r.clamp=ne(r.clamp||vu),r._min=r._max=null,r.valToPct=ie(r)}}}W("x"),W("y"),s==1&&_.forEach(l=>{W(l.scale)}),O.forEach(l=>{W(l.scale)});for(let l in t.scales)W(l);let $=S[T],K=$.distr,F,B;$.ori==0?(ut(h,ja),F=o,B=a):(ut(h,Wa),F=a,B=o);let H={};for(let l in S){let r=S[l];(r.min!=null||r.max!=null)&&(H[l]={min:r.min,max:r.max},r.min=r.max=null)}let se=t.tzDate||(l=>new Date(Le(l/V))),z=t.fmtDate||bl,et=V==1?jc(se):Yc(se),_e=jr(se,Br(V==1?Bc:Gc,z)),le=Gr(se,Wr(Jc,z)),fe=[],Q=i.legend=Pe({},Xc,t.legend),L=i.cursor=Pe({},lu,{drag:{y:s==2}},t.cursor),Te=Q.show,Ge=L.show,Se=Q.markers;Q.idxs=fe,Se.width=ne(Se.width),Se.dash=ne(Se.dash),Se.stroke=ne(Se.stroke),Se.fill=ne(Se.fill);let ue,wt,nt,Ae=[],Tt=[],Nt,ft=!1,Yt={};if(Q.live){let l=_[1]?_[1].values:null;ft=l!=null,Nt=ft?l(i,1,0):{_:0};for(let r in Nt)Yt[r]=pl}if(Te)if(ue=Et("table",ic,h),nt=Et("tbody",null,ue),Q.mount(i,ue),ft){wt=Et("thead",null,ue,nt);let l=Et("tr",null,wt);Et("th",null,l);for(var $i in Nt)Et("th",wr,l).textContent=$i}else ut(ue,sc),Q.live&&ut(ue,nc);let Ai={show:!0},rn={show:!1};function Pn(l,r){if(r==0&&(ft||!Q.live||s==2))return Zi;let c=[],u=Et("tr",lc,nt,nt.childNodes[r]);ut(u,l.class),l.show||ut(u,xi);let f=Et("th",null,u);if(Se.show){let x=yt(rc,f);if(r>0){let w=Se.width(i,r);w&&(x.style.border=w+"px "+Se.dash(i,r)+" "+Se.stroke(i,r)),x.style.background=Se.fill(i,r)}}let g=yt(wr,f);l.label instanceof HTMLElement?g.appendChild(l.label):g.textContent=l.label,r>0&&(Se.show||(g.style.color=l.width>0?Se.stroke(i,r):Se.fill(i,r)),Ye("click",f,x=>{if(L._lock)return;ci(x);let w=_.indexOf(l);if((x.ctrlKey||x.metaKey)!=Q.isolate){let A=_.some((E,P)=>P>0&&P!=w&&E.show);_.forEach((E,P)=>{P>0&&Rt(P,A?P==w?Ai:rn:Ai,!0,Me.setSeries)})}else Rt(w,{show:!l.show},!0,Me.setSeries)},!1),Mi&&Ye(Ar,f,x=>{L._lock||(ci(x),Rt(_.indexOf(l),Ui,!0,Me.setSeries))},!1));for(var y in Nt){let x=Et("td",oc,u);x.textContent="--",c.push(x)}return[u,c]}let si=new Map;function Ye(l,r,c,u=!0){let f=si.get(r)||{},g=L.bind[l](i,r,c,u);g&&(wi(l,r,f[l]=g),si.set(r,f))}function ki(l,r,c){let u=si.get(r)||{};for(let f in u)(l==null||f==l)&&(nl(f,r,u[f]),delete u[f]);l==null&&si.delete(r)}let Ut=0,li=0,Y=0,M=0,be=0,Fe=0,Ei=be,ri=Fe,Ft=Y,oi=M,st=0,ht=0,tt=0,_t=0;i.bbox={};let us=!1,Tn=!1,Ci=!1,ai=!1,Fn=!1,mt=!1;function ps(l,r,c){(c||l!=i.width||r!=i.height)&&$l(l,r),Ri(!1),Ci=!0,Tn=!0,Di()}function $l(l,r){i.width=Ut=Y=l,i.height=li=M=r,be=Fe=0,Qo(),Xo();let c=i.bbox;st=c.left=vi(be*ce,.5),ht=c.top=vi(Fe*ce,.5),tt=c.width=vi(Y*ce,.5),_t=c.height=vi(M*ce,.5)}let Ko=3;function Jo(){let l=!1,r=0;for(;!l;){r++;let c=aa(r),u=ca(r);l=r==Ko||c&&u,l||($l(i.width,i.height),Tn=!0)}}function Zo({width:l,height:r}){ps(l,r)}i.setSize=Zo;function Qo(){let l=!1,r=!1,c=!1,u=!1;O.forEach((f,g)=>{if(f.show&&f._show){let{side:y,_size:x}=f,w=y%2,A=f.label!=null?f.labelSize:0,E=x+A;E>0&&(w?(Y-=E,y==3?(be+=E,u=!0):c=!0):(M-=E,y==0?(Fe+=E,l=!0):r=!0))}}),ui[0]=l,ui[1]=c,ui[2]=r,ui[3]=u,Y-=Kt[1]+Kt[3],be+=Kt[3],M-=Kt[2]+Kt[0],Fe+=Kt[0]}function Xo(){let l=be+Y,r=Fe+M,c=be,u=Fe;function f(g,y){switch(g){case 1:return l+=y,l-y;case 2:return r+=y,r-y;case 3:return c-=y,c+y;case 0:return u-=y,u+y}}O.forEach((g,y)=>{if(g.show&&g._show){let x=g.side;g._pos=f(x,g._size),g.label!=null&&(g._lpos=f(x,g.labelSize))}})}if(L.dataIdx==null){let l=L.hover,r=l.skip=new Set(l.skip??[]);r.add(void 0);let c=l.prox=ne(l.prox),u=l.bias??=0;L.dataIdx=(f,g,y,x)=>{if(g==0)return y;let w=y,A=c(f,g,y,x)??me,E=A>=0&&A<me,P=$.ori==0?Y:M,j=L.left,ae=e[0],re=e[g];if(r.has(re[y])){w=null;let ee=null,q=null,R;if(u==0||u==-1)for(R=y;ee==null&&R-- >0;)r.has(re[R])||(ee=R);if(u==0||u==1)for(R=y;q==null&&R++<re.length;)r.has(re[R])||(q=R);if(ee!=null||q!=null)if(E){let xe=ee==null?-1/0:F(ae[ee],$,P,0),ke=q==null?1/0:F(ae[q],$,P,0),Ne=j-xe,he=ke-j;Ne<=he?Ne<=A&&(w=ee):he<=A&&(w=q)}else w=q==null?ee:ee==null?q:y-ee<=q-y?ee:q}else E&&Re(j-F(ae[y],$,P,0))>A&&(w=null);return w}}let ci=l=>{L.event=l};L.idxs=fe,L._lock=!1;let je=L.points;je.show=ne(je.show),je.size=ne(je.size),je.stroke=ne(je.stroke),je.width=ne(je.width),je.fill=ne(je.fill);let Lt=i.focus=Pe({},t.focus||{alpha:.3},L.focus),Mi=Lt.prox>=0,Pi=Mi&&je.one,gt=[],Ti=[],Fi=[];function Al(l,r){let c=je.show(i,r);if(c instanceof HTMLElement)return ut(c,tc),ut(c,l.class),Ot(c,-10,-10,Y,M),C.insertBefore(c,gt[r]),c}function kl(l,r){if(s==1||r>0){let c=s==1&&S[l.scale].time,u=l.value;l.value=c?Nr(u)?Gr(se,Wr(u,z)):u||le:u||mu,l.label=l.label||(c?ou:ru)}if(Pi||r>0){l.width=l.width==null?1:l.width,l.paths=l.paths||Mu||yc,l.fillTo=ne(l.fillTo||xu),l.pxAlign=+oe(l.pxAlign,I),l.pxRound=io(l.pxAlign),l.stroke=ne(l.stroke||null),l.fill=ne(l.fill||null),l._stroke=l._fill=l._paths=l._focus=null;let c=gu(Xe(1,l.width),1),u=l.points=Pe({},{size:c,width:Xe(1,c*.2),stroke:l.stroke,space:c*2,paths:Pu,_stroke:null,_fill:null},l.points);u.show=ne(u.show),u.filter=ne(u.filter),u.fill=ne(u.fill),u.stroke=ne(u.stroke),u.paths=ne(u.paths),u.pxAlign=l.pxAlign}if(Te){let c=Pn(l,r);Ae.splice(r,0,c[0]),Tt.splice(r,0,c[1]),Q.values.push(null)}if(Ge){fe.splice(r,0,null);let c=null;Pi?r==0&&(c=Al(l,r)):r>0&&(c=Al(l,r)),gt.splice(r,0,c),Ti.splice(r,0,0),Fi.splice(r,0,0)}Oe("addSeries",r)}function ea(l,r){r=r??_.length,l=s==1?cl(l,r,Kr,eo):cl(l,r,{},Xr),_.splice(r,0,l),kl(_[r],r)}i.addSeries=ea;function ta(l){if(_.splice(l,1),Te){Q.values.splice(l,1),Tt.splice(l,1);let r=Ae.splice(l,1)[0];ki(null,r.firstChild),r.remove()}Ge&&(fe.splice(l,1),gt.splice(l,1)[0].remove(),Ti.splice(l,1),Fi.splice(l,1)),Oe("delSeries",l)}i.delSeries=ta;let ui=[!1,!1,!1,!1];function ia(l,r){if(l._show=l.show,l.show){let c=l.side%2,u=S[l.scale];u==null&&(l.scale=c?_[1].scale:T,u=S[l.scale]);let f=u.time;l.size=ne(l.size),l.space=ne(l.space),l.rotate=ne(l.rotate),ti(l.incrs)&&l.incrs.forEach(y=>{!ii.has(y)&&ii.set(y,go(y))}),l.incrs=ne(l.incrs||(u.distr==2?Uc:f?V==1?Vc:Wc:yi)),l.splits=ne(l.splits||(f&&u.distr==1?et:u.distr==3?ll:u.distr==4?uu:cu)),l.stroke=ne(l.stroke),l.grid.stroke=ne(l.grid.stroke),l.ticks.stroke=ne(l.ticks.stroke),l.border.stroke=ne(l.border.stroke);let g=l.values;l.values=ti(g)&&!ti(g[0])?ne(g):f?ti(g)?jr(se,Br(g,z)):Nr(g)?Kc(se,g):g||_e:g||au,l.filter=ne(l.filter||(u.distr>=3&&u.log==10?fu:u.distr==3&&u.log==2?hu:ho)),l.font=ro(l.font),l.labelFont=ro(l.labelFont),l._size=l.size(i,null,r,0),l._space=l._rotate=l._incrs=l._found=l._splits=l._values=null,l._size>0&&(ui[r]=!0,l._el=yt(Za,v))}}function on(l,r,c,u){let[f,g,y,x]=c,w=r%2,A=0;return w==0&&(x||g)&&(A=r==0&&!f||r==2&&!y?Le(Yr.size/3):0),w==1&&(f||y)&&(A=r==1&&!g||r==3&&!x?Le(Zr.size/2):0),A}let El=i.padding=(t.padding||[on,on,on,on]).map(l=>ne(oe(l,on))),Kt=i._padding=El.map((l,r)=>l(i,r,ui,0)),Ve,De=null,ze=null,Ln=s==1?_[0].idxs:null,St=null,an=!1;function Cl(l,r){if(e=l??[],i.data=i._data=e,s==2){Ve=0;for(let c=1;c<_.length;c++)Ve+=e[c][0].length}else{e.length==0&&(i.data=i._data=e=[[]]),St=e[0],Ve=St.length;let c=e;if(K==2){c=e.slice();let u=c[0]=Array(Ve);for(let f=0;f<Ve;f++)u[f]=f}i._data=e=c}if(Ri(!0),Oe("setData"),K==2&&(Ci=!0),r!==!1){let c=$;c.auto(i,an)?ds():Zt(T,c.min,c.max),ai=ai||L.left>=0,mt=!0,Di()}}i.setData=Cl;function ds(){an=!0;let l,r;s==1&&(Ve>0?(De=Ln[0]=0,ze=Ln[1]=Ve-1,l=e[0][De],r=e[0][ze],K==2?(l=De,r=ze):l==r&&(K==3?[l,r]=ns(l,l,$.log,!1):K==4?[l,r]=fl(l,l,$.log,!1):$.time?r=l+Le(86400/V):[l,r]=es(l,r,hl,!0))):(De=Ln[0]=l=null,ze=Ln[1]=r=null)),Zt(T,l,r)}let Rn,Li,fs,hs,ms,gs,bs,vs,ys,it;function Ml(l,r,c,u,f,g){l??=Sr,c??=gl,u??="butt",f??=Sr,g??="round",l!=Rn&&(m.strokeStyle=Rn=l),f!=Li&&(m.fillStyle=Li=f),r!=fs&&(m.lineWidth=fs=r),g!=ms&&(m.lineJoin=ms=g),u!=gs&&(m.lineCap=gs=u),c!=hs&&m.setLineDash(hs=c)}function Pl(l,r,c,u){r!=Li&&(m.fillStyle=Li=r),l!=bs&&(m.font=bs=l),c!=vs&&(m.textAlign=vs=c),u!=ys&&(m.textBaseline=ys=u)}function xs(l,r,c,u,f=0){if(u.length>0&&l.auto(i,an)&&(r==null||r.min==null)){let g=oe(De,0),y=oe(ze,u.length-1),x=c.min==null?fc(u,g,y,f,l.distr==3):[c.min,c.max];l.min=Mt(l.min,c.min=x[0]),l.max=Xe(l.max,c.max=x[1])}}let Tl={min:null,max:null};function na(){for(let u in S){let f=S[u];H[u]==null&&(f.min==null||H[T]!=null&&f.auto(i,an))&&(H[u]=Tl)}for(let u in S){let f=S[u];H[u]==null&&f.from!=null&&H[f.from]!=null&&(H[u]=Tl)}H[T]!=null&&Ri(!0);let l={};for(let u in H){let f=H[u];if(f!=null){let g=l[u]=Qi(S[u],_c);if(f.min!=null)Pe(g,f);else if(u!=T||s==2)if(Ve==0&&g.from==null){let y=g.range(i,null,null,u);g.min=y[0],g.max=y[1]}else g.min=me,g.max=-me}}if(Ve>0){_.forEach((u,f)=>{if(s==1){let g=u.scale,y=H[g];if(y==null)return;let x=l[g];if(f==0){let w=x.range(i,x.min,x.max,g);x.min=w[0],x.max=w[1],De=Ct(x.min,e[0]),ze=Ct(x.max,e[0]),ze-De>1&&(e[0][De]<x.min&&De++,e[0][ze]>x.max&&ze--),u.min=St[De],u.max=St[ze]}else u.show&&u.auto&&xs(x,y,u,e[f],u.sorted);u.idxs[0]=De,u.idxs[1]=ze}else if(f>0&&u.show&&u.auto){let[g,y]=u.facets,x=g.scale,w=y.scale,[A,E]=e[f],P=l[x],j=l[w];P!=null&&xs(P,H[x],g,A,g.sorted),j!=null&&xs(j,H[w],y,E,y.sorted),u.min=y.min,u.max=y.max}});for(let u in l){let f=l[u],g=H[u];if(f.from==null&&(g==null||g.min==null)){let y=f.range(i,f.min==me?null:f.min,f.max==-me?null:f.max,u);f.min=y[0],f.max=y[1]}}}for(let u in l){let f=l[u];if(f.from!=null){let g=l[f.from];if(g.min==null)f.min=f.max=null;else{let y=f.range(i,g.min,g.max,u);f.min=y[0],f.max=y[1]}}}let r={},c=!1;for(let u in l){let f=l[u],g=S[u];if(g.min!=f.min||g.max!=f.max){g.min=f.min,g.max=f.max;let y=g.distr;g._min=y==3?jt(g.min):y==4?Js(g.min,g.asinh):y==100?g.fwd(g.min):g.min,g._max=y==3?jt(g.max):y==4?Js(g.max,g.asinh):y==100?g.fwd(g.max):g.max,r[u]=c=!0}}if(c){_.forEach((u,f)=>{s==2?f>0&&r.y&&(u._paths=null):r[u.scale]&&(u._paths=null)});for(let u in r)Ci=!0,Oe("setScale",u);Ge&&L.left>=0&&(ai=mt=!0)}for(let u in H)H[u]=null}function sa(l){let r=sl(De-1,0,Ve-1),c=sl(ze+1,0,Ve-1);for(;l[r]==null&&r>0;)r--;for(;l[c]==null&&c<Ve-1;)c++;return[r,c]}function la(){if(Ve>0){let l=_.some(r=>r._focus)&&it!=Lt.alpha;l&&(m.globalAlpha=it=Lt.alpha),_.forEach((r,c)=>{if(c>0&&r.show&&(Fl(c,!1),Fl(c,!0),r._paths==null)){let u=it;it!=r.alpha&&(m.globalAlpha=it=r.alpha);let f=s==2?[0,e[c][0].length-1]:sa(e[c]);r._paths=r.paths(i,c,f[0],f[1]),it!=u&&(m.globalAlpha=it=u)}}),_.forEach((r,c)=>{if(c>0&&r.show){let u=it;it!=r.alpha&&(m.globalAlpha=it=r.alpha),r._paths!=null&&Ll(c,!1);{let f=r._paths!=null?r._paths.gaps:null,g=r.points.show(i,c,De,ze,f),y=r.points.filter(i,c,g,f);(g||y)&&(r.points._paths=r.points.paths(i,c,De,ze,y),Ll(c,!0))}it!=u&&(m.globalAlpha=it=u),Oe("drawSeries",c)}}),l&&(m.globalAlpha=it=1)}}function Fl(l,r){let c=r?_[l].points:_[l];c._stroke=c.stroke(i,l),c._fill=c.fill(i,l)}function Ll(l,r){let c=r?_[l].points:_[l],{stroke:u,fill:f,clip:g,flags:y,_stroke:x=c._stroke,_fill:w=c._fill,_width:A=c.width}=c._paths;A=ge(A*ce,3);let E=null,P=A%2/2;r&&w==null&&(w=A>0?"#fff":x);let j=c.pxAlign==1&&P>0;if(j&&m.translate(P,P),!r){let ae=st-A/2,re=ht-A/2,ee=tt+A,q=_t+A;E=new Path2D,E.rect(ae,re,ee,q)}r?ws(x,A,c.dash,c.cap,w,u,f,y,g):ra(l,x,A,c.dash,c.cap,w,u,f,y,E,g),j&&m.translate(-P,-P)}function ra(l,r,c,u,f,g,y,x,w,A,E){let P=!1;w!=0&&J.forEach((j,ae)=>{if(j.series[0]==l){let re=_[j.series[1]],ee=e[j.series[1]],q=(re._paths||Cn).band;ti(q)&&(q=j.dir==1?q[0]:q[1]);let R,xe=null;re.show&&q&&mc(ee,De,ze)?(xe=j.fill(i,ae)||g,R=re._paths.clip):q=null,ws(r,c,u,f,xe,y,x,w,A,E,R,q),P=!0}}),P||ws(r,c,u,f,g,y,x,w,A,E)}let Rl=Xi|ol;function ws(l,r,c,u,f,g,y,x,w,A,E,P){Ml(l,r,c,u,f),(w||A||P)&&(m.save(),w&&m.clip(w),A&&m.clip(A)),P?(x&Rl)==Rl?(m.clip(P),E&&m.clip(E),zn(f,y),Dn(l,g,r)):x&ol?(zn(f,y),m.clip(P),Dn(l,g,r)):x&Xi&&(m.save(),m.clip(P),E&&m.clip(E),zn(f,y),m.restore(),Dn(l,g,r)):(zn(f,y),Dn(l,g,r)),(w||A||P)&&m.restore()}function Dn(l,r,c){c>0&&(r instanceof Map?r.forEach((u,f)=>{m.strokeStyle=Rn=f,m.stroke(u)}):r!=null&&l&&m.stroke(r))}function zn(l,r){r instanceof Map?r.forEach((c,u)=>{m.fillStyle=Li=u,m.fill(c)}):r!=null&&l&&m.fill(r)}function oa(l,r,c,u){let f=O[l],g;if(u<=0)g=[0,0];else{let y=f._space=f.space(i,l,r,c,u),x=f._incrs=f.incrs(i,l,r,c,u,y);g=zu(r,c,x,u,y)}return f._found=g}function _s(l,r,c,u,f,g,y,x,w,A){let E=y%2/2;I==1&&m.translate(E,E),Ml(x,y,w,A,x),m.beginPath();let P,j,ae,re,ee=f+(u==0||u==3?-g:g);c==0?(j=f,re=ee):(P=f,ae=ee);for(let q=0;q<l.length;q++)r[q]!=null&&(c==0?P=ae=l[q]:j=re=l[q],m.moveTo(P,j),m.lineTo(ae,re));m.stroke(),I==1&&m.translate(-E,-E)}function aa(l){let r=!0;return O.forEach((c,u)=>{if(!c.show)return;let f=S[c.scale];if(f.min==null){c._show&&(r=!1,c._show=!1,Ri(!1));return}else c._show||(r=!1,c._show=!0,Ri(!1));let g=c.side,y=g%2,{min:x,max:w}=f,[A,E]=oa(u,x,w,y==0?Y:M);if(E==0)return;let P=f.distr==2,j=c._splits=c.splits(i,u,x,w,A,E,P),ae=f.distr==2?j.map(R=>St[R]):j,re=f.distr==2?St[j[1]]-St[j[0]]:A,ee=c._values=c.values(i,c.filter(i,ae,u,E,re),u,E,re);c._rotate=g==2?c.rotate(i,ee,u,E):0;let q=c._size;c._size=xt(c.size(i,ee,u,l)),q!=null&&c._size!=q&&(r=!1)}),r}function ca(l){let r=!0;return El.forEach((c,u)=>{let f=c(i,u,ui,l);f!=Kt[u]&&(r=!1),Kt[u]=f}),r}function ua(){for(let l=0;l<O.length;l++){let r=O[l];if(!r.show||!r._show)continue;let c=r.side,u=c%2,f,g,y=r.stroke(i,l),x=c==0||c==3?-1:1,[w,A]=r._found;if(r.label!=null){let Je=r.labelGap*x,ot=Le((r._lpos+Je)*ce);Pl(r.labelFont[0],y,"center",c==2?"top":_r),m.save(),u==1?(f=g=0,m.translate(ot,Le(ht+_t/2)),m.rotate((c==3?-Qn:Qn)/2)):(f=Le(st+tt/2),g=ot);let fi=po(r.label)?r.label(i,l,w,A):r.label;m.fillText(fi,f,g),m.restore()}if(A==0)continue;let E=S[r.scale],P=u==0?tt:_t,j=u==0?st:ht,ae=r._splits,re=E.distr==2?ae.map(Je=>St[Je]):ae,ee=E.distr==2?St[ae[1]]-St[ae[0]]:w,q=r.ticks,R=r.border,xe=q.show?q.size:0,ke=Le(xe*ce),Ne=Le((r.alignTo==2?r._size-xe-r.gap:r.gap)*ce),he=r._rotate*-Qn/180,Ee=U(r._pos*ce),lt=(ke+Ne)*x,Ke=Ee+lt;g=u==0?Ke:0,f=u==1?Ke:0;let bt=r.font[0],$t=r.align==1?Gi:r.align==2?Gs:he>0?Gi:he<0?Gs:u==0?"center":c==3?Gs:Gi,zt=he||u==1?"middle":c==2?"top":_r;Pl(bt,y,$t,zt);let rt=r.font[1]*r.lineGap,vt=ae.map(Je=>U(d(Je,E,P,j))),At=r._values;for(let Je=0;Je<At.length;Je++){let ot=At[Je];if(ot!=null){u==0?f=vt[Je]:g=vt[Je],ot=""+ot;let fi=ot.indexOf(`
`)==-1?[ot]:ot.split(/\n/gm);for(let Ze=0;Ze<fi.length;Ze++){let Xl=fi[Ze];he?(m.save(),m.translate(f,g+Ze*rt),m.rotate(he),m.fillText(Xl,0,0),m.restore()):m.fillText(Xl,f,g+Ze*rt)}}}q.show&&_s(vt,q.filter(i,re,l,A,ee),u,c,Ee,ke,ge(q.width*ce,3),q.stroke(i,l),q.dash,q.cap);let Ht=r.grid;Ht.show&&_s(vt,Ht.filter(i,re,l,A,ee),u,u==0?2:1,u==0?ht:st,u==0?_t:tt,ge(Ht.width*ce,3),Ht.stroke(i,l),Ht.dash,Ht.cap),R.show&&_s([Ee],[1],u==0?1:0,u==0?1:2,u==1?ht:st,u==1?_t:tt,ge(R.width*ce,3),R.stroke(i,l),R.dash,R.cap)}Oe("drawAxes")}function Ri(l){_.forEach((r,c)=>{c>0&&(r._paths=null,l&&(s==1?(r.min=null,r.max=null):r.facets.forEach(u=>{u.min=null,u.max=null})))})}let Hn=!1,Ss=!1,cn=[];function pa(){Ss=!1;for(let l=0;l<cn.length;l++)Oe(...cn[l]);cn.length=0}function Di(){Hn||(Mc(Dl),Hn=!0)}function da(l,r=!1){Hn=!0,Ss=r,l(i),Dl(),r&&cn.length>0&&queueMicrotask(pa)}i.batch=da;function Dl(){if(us&&(na(),us=!1),Ci&&(Jo(),Ci=!1),Tn){if(we(k,Gi,be),we(k,"top",Fe),we(k,$n,Y),we(k,An,M),we(C,Gi,be),we(C,"top",Fe),we(C,$n,Y),we(C,An,M),we(v,$n,Ut),we(v,An,li),b.width=Le(Ut*ce),b.height=Le(li*ce),O.forEach(({_el:l,_show:r,_size:c,_pos:u,side:f})=>{if(l!=null)if(r){let g=f===3||f===0?c:0,y=f%2==1;we(l,y?"left":"top",u-g),we(l,y?"width":"height",c),we(l,y?"top":"left",y?Fe:be),we(l,y?"height":"width",y?M:Y),il(l,xi)}else ut(l,xi)}),Rn=Li=fs=ms=gs=bs=vs=ys=hs=null,it=1,dn(!0),be!=Ei||Fe!=ri||Y!=Ft||M!=oi){Ri(!1);let l=Y/Ft,r=M/oi;if(Ge&&!ai&&L.left>=0){L.left*=l,L.top*=r,zi&&Ot(zi,Le(L.left),0,Y,M),Hi&&Ot(Hi,0,Le(L.top),Y,M);for(let c=0;c<gt.length;c++){let u=gt[c];u!=null&&(Ti[c]*=l,Fi[c]*=r,Ot(u,xt(Ti[c]),xt(Fi[c]),Y,M))}}if(ye.show&&!Fn&&ye.left>=0&&ye.width>0){ye.left*=l,ye.width*=l,ye.top*=r,ye.height*=r;for(let c in Ms)we(Ni,c,ye[c])}Ei=be,ri=Fe,Ft=Y,oi=M}Oe("setSize"),Tn=!1}Ut>0&&li>0&&(m.clearRect(0,0,b.width,b.height),Oe("drawClear"),G.forEach(l=>l()),Oe("draw")),ye.show&&Fn&&(In(ye),Fn=!1),Ge&&ai&&(di(null,!0,!1),ai=!1),Q.show&&Q.live&&mt&&(Es(),mt=!1),p||(p=!0,i.status=1,Oe("ready")),an=!1,Hn=!1}i.redraw=(l,r)=>{Ci=r||!1,l!==!1?Zt(T,$.min,$.max):Di()};function $s(l,r){let c=S[l];if(c.from==null){if(Ve==0){let u=c.range(i,r.min,r.max,l);r.min=u[0],r.max=u[1]}if(r.min>r.max){let u=r.min;r.min=r.max,r.max=u}if(Ve>1&&r.min!=null&&r.max!=null&&r.max-r.min<1e-16)return;l==T&&c.distr==2&&Ve>0&&(r.min=Ct(r.min,e[0]),r.max=Ct(r.max,e[0]),r.min==r.max&&r.max++),H[l]=r,us=!0,Di()}}i.setScale=$s;let As,ks,zi,Hi,zl,Hl,Ii,Oi,Il,Ol,ve,$e,Jt=!1,Be=L.drag,He=Be.x,Ie=Be.y;Ge&&(L.x&&(As=yt(Xa,C)),L.y&&(ks=yt(ec,C)),$.ori==0?(zi=As,Hi=ks):(zi=ks,Hi=As),ve=L.left,$e=L.top);let ye=i.select=Pe({show:!0,over:!0,left:0,width:0,top:0,height:0},t.select),Ni=ye.show?yt(Qa,ye.over?C:k):null;function In(l,r){if(ye.show){for(let c in l)ye[c]=l[c],c in Ms&&we(Ni,c,l[c]);r!==!1&&Oe("setSelect")}}i.setSelect=In;function fa(l){if(_[l].show)Te&&il(Ae[l],xi);else if(Te&&ut(Ae[l],xi),Ge){let c=Pi?gt[0]:gt[l];c!=null&&Ot(c,-10,-10,Y,M)}}function Zt(l,r,c){$s(l,{min:r,max:c})}function Rt(l,r,c,u){r.focus!=null&&va(l),r.show!=null&&_.forEach((f,g)=>{g>0&&(l==g||l==null)&&(f.show=r.show,fa(g),s==2?(Zt(f.facets[0].scale,null,null),Zt(f.facets[1].scale,null,null)):Zt(f.scale,null,null),Di())}),c!==!1&&Oe("setSeries",l,r),u&&fn("setSeries",i,l,r)}i.setSeries=Rt;function ha(l,r){Pe(J[l],r)}function ma(l,r){l.fill=ne(l.fill||null),l.dir=oe(l.dir,-1),r=r??J.length,J.splice(r,0,l)}function ga(l){l==null?J.length=0:J.splice(l,1)}i.addBand=ma,i.setBand=ha,i.delBand=ga;function ba(l,r){_[l].alpha=r,Ge&&gt[l]!=null&&(gt[l].style.opacity=r),Te&&Ae[l]&&(Ae[l].style.opacity=r)}let qt,Qt,pi,Ui={focus:!0};function va(l){if(l!=pi){let r=l==null,c=Lt.alpha!=1;_.forEach((u,f)=>{if(s==1||f>0){let g=r||f==0||f==l;u._focus=r?null:g,c&&ba(f,g?1:Lt.alpha)}}),pi=l,c&&Di()}}Te&&Mi&&Ye(kr,ue,l=>{L._lock||(ci(l),pi!=null&&Rt(null,Ui,!0,Me.setSeries))});function Dt(l,r,c){let u=S[r];c&&(l=l/ce-(u.ori==1?Fe:be));let f=Y;u.ori==1&&(f=M,l=f-l),u.dir==-1&&(l=f-l);let g=u._min,y=u._max,x=l/f,w=g+(y-g)*x,A=u.distr;return A==3?Ji(10,w):A==4?bc(w,u.asinh):A==100?u.bwd(w):w}function ya(l,r){let c=Dt(l,T,r);return Ct(c,e[0],De,ze)}i.valToIdx=l=>Ct(l,e[0]),i.posToIdx=ya,i.posToVal=Dt,i.valToPos=(l,r,c)=>S[r].ori==0?o(l,S[r],c?tt:Y,c?st:0):a(l,S[r],c?_t:M,c?ht:0),i.setCursor=(l,r,c)=>{ve=l.left,$e=l.top,di(null,r,c)};function Nl(l,r){we(Ni,Gi,ye.left=l),we(Ni,$n,ye.width=r)}function Ul(l,r){we(Ni,"top",ye.top=l),we(Ni,An,ye.height=r)}let un=$.ori==0?Nl:Ul,pn=$.ori==1?Nl:Ul;function xa(){if(Te&&Q.live)for(let l=s==2?1:0;l<_.length;l++){if(l==0&&ft)continue;let r=Q.values[l],c=0;for(let u in r)Tt[l][c++].firstChild.nodeValue=r[u]}}function Es(l,r){if(l!=null&&(l.idxs?l.idxs.forEach((c,u)=>{fe[u]=c}):wc(l.idx)||fe.fill(l.idx),Q.idx=fe[0]),Te&&Q.live){for(let c=0;c<_.length;c++)(c>0||s==1&&!ft)&&wa(c,fe[c]);xa()}mt=!1,r!==!1&&Oe("setLegend")}i.setLegend=Es;function wa(l,r){let c=_[l],u=l==0&&K==2?St:e[l],f;ft?f=c.values(i,l,r)??Yt:(f=c.value(i,r==null?null:u[r],l,r),f=f==null?Yt:{_:f}),Q.values[l]=f}function di(l,r,c){Il=ve,Ol=$e,[ve,$e]=L.move(i,ve,$e),L.left=ve,L.top=$e,Ge&&(zi&&Ot(zi,Le(ve),0,Y,M),Hi&&Ot(Hi,0,Le($e),Y,M));let u,f=De>ze;qt=me,Qt=null;let g=$.ori==0?Y:M,y=$.ori==1?Y:M;if(ve<0||Ve==0||f){u=L.idx=null;for(let x=0;x<_.length;x++){let w=gt[x];w!=null&&Ot(w,-10,-10,Y,M)}Mi&&Rt(null,Ui,!0,l==null&&Me.setSeries),Q.live&&(fe.fill(u),mt=!0)}else{let x,w,A;s==1&&(x=$.ori==0?ve:$e,w=Dt(x,T),u=L.idx=Ct(w,e[0],De,ze),A=F(e[0][u],$,g,0));let E=-10,P=-10,j=0,ae=0,re=!0,ee="",q="";for(let R=s==2?1:0;R<_.length;R++){let xe=_[R],ke=fe[R],Ne=ke==null?null:s==1?e[R][ke]:e[R][1][ke],he=L.dataIdx(i,R,u,w),Ee=he==null?null:s==1?e[R][he]:e[R][1][he];if(mt=mt||Ee!=Ne||he!=ke,fe[R]=he,R>0&&xe.show){let lt=he==null?-10:he==u?A:F(s==1?e[0][he]:e[R][0][he],$,g,0),Ke=Ee==null?-10:B(Ee,s==1?S[xe.scale]:S[xe.facets[1].scale],y,0);if(Mi&&Ee!=null){let bt=$.ori==1?ve:$e,$t=Re(Lt.dist(i,R,he,Ke,bt));if($t<qt){let zt=Lt.bias;if(zt!=0){let rt=Dt(bt,xe.scale),vt=Ee>=0?1:-1,At=rt>=0?1:-1;At==vt&&(At==1?zt==1?Ee>=rt:Ee<=rt:zt==1?Ee<=rt:Ee>=rt)&&(qt=$t,Qt=R)}else qt=$t,Qt=R}}if(mt||Pi){let bt,$t;$.ori==0?(bt=lt,$t=Ke):(bt=Ke,$t=lt);let zt,rt,vt,At,Ht,Je,ot=!0,fi=je.bbox;if(fi!=null){ot=!1;let Ze=fi(i,R);vt=Ze.left,At=Ze.top,zt=Ze.width,rt=Ze.height}else vt=bt,At=$t,zt=rt=je.size(i,R);if(Je=je.fill(i,R),Ht=je.stroke(i,R),Pi)R==Qt&&qt<=Lt.prox&&(E=vt,P=At,j=zt,ae=rt,re=ot,ee=Je,q=Ht);else{let Ze=gt[R];Ze!=null&&(Ti[R]=vt,Fi[R]=At,Lr(Ze,zt,rt,ot),Tr(Ze,Je,Ht),Ot(Ze,xt(vt),xt(At),Y,M))}}}}if(Pi){let R=Lt.prox,xe=pi==null?qt<=R:qt>R||Qt!=pi;if(mt||xe){let ke=gt[0];ke!=null&&(Ti[0]=E,Fi[0]=P,Lr(ke,j,ae,re),Tr(ke,ee,q),Ot(ke,xt(E),xt(P),Y,M))}}}if(ye.show&&Jt)if(l!=null){let[x,w]=Me.scales,[A,E]=Me.match,[P,j]=l.cursor.sync.scales,ae=l.cursor.drag;if(He=ae._x,Ie=ae._y,He||Ie){let{left:re,top:ee,width:q,height:R}=l.select,xe=l.scales[P].ori,ke=l.posToVal,Ne,he,Ee,lt,Ke,bt=x!=null&&A(x,P),$t=w!=null&&E(w,j);bt&&He?(xe==0?(Ne=re,he=q):(Ne=ee,he=R),Ee=S[x],lt=F(ke(Ne,P),Ee,g,0),Ke=F(ke(Ne+he,P),Ee,g,0),un(Mt(lt,Ke),Re(Ke-lt))):un(0,g),$t&&Ie?(xe==1?(Ne=re,he=q):(Ne=ee,he=R),Ee=S[w],lt=B(ke(Ne,j),Ee,y,0),Ke=B(ke(Ne+he,j),Ee,y,0),pn(Mt(lt,Ke),Re(Ke-lt))):pn(0,y)}else Ps()}else{let x=Re(Il-zl),w=Re(Ol-Hl);if($.ori==1){let j=x;x=w,w=j}He=Be.x&&x>=Be.dist,Ie=Be.y&&w>=Be.dist;let A=Be.uni;A!=null?He&&Ie&&(He=x>=A,Ie=w>=A,!He&&!Ie&&(w>x?Ie=!0:He=!0)):Be.x&&Be.y&&(He||Ie)&&(He=Ie=!0);let E,P;He&&($.ori==0?(E=Ii,P=ve):(E=Oi,P=$e),un(Mt(E,P),Re(P-E)),Ie||pn(0,y)),Ie&&($.ori==1?(E=Ii,P=ve):(E=Oi,P=$e),pn(Mt(E,P),Re(P-E)),He||un(0,g)),!He&&!Ie&&(un(0,0),pn(0,0))}if(Be._x=He,Be._y=Ie,l==null){if(c){if(Ql!=null){let[x,w]=Me.scales;Me.values[0]=x!=null?Dt($.ori==0?ve:$e,x):null,Me.values[1]=w!=null?Dt($.ori==1?ve:$e,w):null}fn(Ys,i,ve,$e,Y,M,u)}if(Mi){let x=c&&Me.setSeries,w=Lt.prox;pi==null?qt<=w&&Rt(Qt,Ui,!0,x):qt>w?Rt(null,Ui,!0,x):Qt!=pi&&Rt(Qt,Ui,!0,x)}}mt&&(Q.idx=u,Es()),r!==!1&&Oe("setCursor")}let Xt=null;Object.defineProperty(i,"rect",{get(){return Xt==null&&dn(!1),Xt}});function dn(l=!1){l?Xt=null:(Xt=C.getBoundingClientRect(),Oe("syncRect",Xt))}function ql(l,r,c,u,f,g,y){L._lock||Jt&&l!=null&&l.movementX==0&&l.movementY==0||(Cs(l,r,c,u,f,g,y,!1,l!=null),l!=null?di(null,!0,!0):di(r,!0,!1))}function Cs(l,r,c,u,f,g,y,x,w){if(Xt==null&&dn(!1),ci(l),l!=null)c=l.clientX-Xt.left,u=l.clientY-Xt.top;else{if(c<0||u<0){ve=-10,$e=-10;return}let[A,E]=Me.scales,P=r.cursor.sync,[j,ae]=P.values,[re,ee]=P.scales,[q,R]=Me.match,xe=r.axes[0].side%2==1,ke=$.ori==0?Y:M,Ne=$.ori==1?Y:M,he=xe?g:f,Ee=xe?f:g,lt=xe?u:c,Ke=xe?c:u;if(re!=null?c=q(A,re)?d(j,S[A],ke,0):-10:c=ke*(lt/he),ee!=null?u=R(E,ee)?d(ae,S[E],Ne,0):-10:u=Ne*(Ke/Ee),$.ori==1){let bt=c;c=u,u=bt}}w&&(r==null||r.cursor.event.type==Ys)&&((c<=1||c>=Y-1)&&(c=vi(c,Y)),(u<=1||u>=M-1)&&(u=vi(u,M))),x?(zl=c,Hl=u,[Ii,Oi]=L.move(i,c,u)):(ve=c,$e=u)}let Ms={width:0,height:0,left:0,top:0};function Ps(){In(Ms,!1)}let Vl,Bl,jl,Wl;function Gl(l,r,c,u,f,g,y){Jt=!0,He=Ie=Be._x=Be._y=!1,Cs(l,r,c,u,f,g,y,!0,!1),l!=null&&(Ye(Ks,el,Yl,!1),fn($r,i,Ii,Oi,Y,M,null));let{left:x,top:w,width:A,height:E}=ye;Vl=x,Bl=w,jl=A,Wl=E}function Yl(l,r,c,u,f,g,y){Jt=Be._x=Be._y=!1,Cs(l,r,c,u,f,g,y,!1,!0);let{left:x,top:w,width:A,height:E}=ye,P=A>0||E>0,j=Vl!=x||Bl!=w||jl!=A||Wl!=E;if(P&&j&&In(ye),Be.setScale&&P&&j){let ae=x,re=A,ee=w,q=E;if($.ori==1&&(ae=w,re=E,ee=x,q=A),He&&Zt(T,Dt(ae,T),Dt(ae+re,T)),Ie)for(let R in S){let xe=S[R];R!=T&&xe.from==null&&xe.min!=me&&Zt(R,Dt(ee+q,R),Dt(ee,R))}Ps()}else L.lock&&(L._lock=!L._lock,di(r,!0,l!=null));l!=null&&(ki(Ks,el),fn(Ks,i,ve,$e,Y,M,null))}function _a(l,r,c,u,f,g,y){if(L._lock)return;ci(l);let x=Jt;if(Jt){let w=!0,A=!0,E=10,P,j;$.ori==0?(P=He,j=Ie):(P=Ie,j=He),P&&j&&(w=ve<=E||ve>=Y-E,A=$e<=E||$e>=M-E),P&&w&&(ve=ve<Ii?0:Y),j&&A&&($e=$e<Oi?0:M),di(null,!0,!0),Jt=!1}ve=-10,$e=-10,fe.fill(null),di(null,!0,!0),x&&(Jt=x)}function Kl(l,r,c,u,f,g,y){L._lock||(ci(l),ds(),Ps(),l!=null&&fn(Er,i,ve,$e,Y,M,null))}function Jl(){O.forEach(Hu),ps(i.width,i.height,!0)}wi(Xn,Ki,Jl);let qi={};qi.mousedown=Gl,qi.mousemove=ql,qi.mouseup=Yl,qi.dblclick=Kl,qi.setSeries=(l,r,c,u)=>{let f=Me.match[2];c=f(i,r,c),c!=-1&&Rt(c,u,!0,!1)},Ge&&(Ye($r,C,Gl),Ye(Ys,C,ql),Ye(Ar,C,l=>{ci(l),dn(!1)}),Ye(kr,C,_a),Ye(Er,C,Kl),al.add(i),i.syncRect=dn);let On=i.hooks=t.hooks||{};function Oe(l,r,c){Ss?cn.push([l,r,c]):l in On&&On[l].forEach(u=>{u.call(null,i,r,c)})}(t.plugins||[]).forEach(l=>{for(let r in l.hooks)On[r]=(On[r]||[]).concat(l.hooks[r])});let Zl=(l,r,c)=>c,Me=Pe({key:null,setSeries:!1,filters:{pub:Ir,sub:Ir},scales:[T,_[1]?_[1].scale:null],match:[Or,Or,Zl],values:[null,null]},L.sync);Me.match.length==2&&Me.match.push(Zl),L.sync=Me;let Ql=Me.key,Ts=zo(Ql);function fn(l,r,c,u,f,g,y){Me.filters.pub(l,r,c,u,f,g,y)&&Ts.pub(l,r,c,u,f,g,y)}Ts.sub(i);function Sa(l,r,c,u,f,g,y){Me.filters.sub(l,r,c,u,f,g,y)&&qi[l](null,r,c,u,f,g,y)}i.pub=Sa;function $a(){Ts.unsub(i),al.delete(i),si.clear(),nl(Xn,Ki,Jl),h.remove(),ue?.remove(),Oe("destroy")}i.destroy=$a;function Fs(){Oe("init",t,e),Cl(e||t.data,!1),H[T]?$s(T,H[T]):ds(),Fn=ye.show&&(ye.width>0||ye.height>0),ai=mt=!0,ps(t.width,t.height)}return _.forEach(kl),O.forEach(ia),n?n instanceof HTMLElement?(n.appendChild(h),Fs()):n(i,Fs):Fs(),i}Ue.assign=Pe;Ue.fmtNum=ml;Ue.rangeNum=es;Ue.rangeLog=ns;Ue.rangeAsinh=fl;Ue.orient=Si;Ue.pxRatio=ce;Ue.join=Cc;Ue.fmtDate=bl,Ue.tzDate=Oc;Ue.sync=zo;{Ue.addGap=wu,Ue.clipGaps=rs;let t=Ue.paths={points:qo};t.linear=Bo,t.stepped=$u,t.bars=Au,t.spline=Eu}var Yo='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';var Pt=class extends We{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.lastSignature="";this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(){let n=JSON.stringify([this.curves,this.heading,this.syncKey,this.percent,this.range]);this.lastSamples===this.samples&&this.lastSignature===n||(this.lastSamples=this.samples,this.lastSignature=n,this.draw())}toggleSeries(n){let i=this.curves[n].label,s=this.hiddenCurves.has(i);this.plot&&this.plot.setSeries(n+1,{show:s}),s?this.hiddenCurves.delete(i):this.hiddenCurves.add(i),this.requestUpdate()}draw(){if(!this.isConnected)return;let n=this.renderRoot.querySelector(".plot");if(!n)return;let i=this.plot;if(i&&i.series.forEach((d,p)=>{p&&typeof d.label=="string"&&(d.show===!1?this.hiddenCurves.add(d.label):this.hiddenCurves.delete(d.label))}),this.dispose(),!this.samples.length||!this.samples.some(d=>this.curves.some(p=>Wi(d,p.path)!==null)))return;let s=getComputedStyle(this),o=s.getPropertyValue("--primary-text-color").trim()||"#555",a=[this.samples.map(d=>d.time),...this.curves.map(d=>this.samples.map(p=>Wi(p,d.path)))];this.applying=!0,this.plot=new Ue({width:Math.max(240,n.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(d,p,h)=>[Math.min(0,p??0),Math.max(100,h??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},axes:[{stroke:o,space:100,grid:{show:!1},values:(d,p)=>p.map(h=>new Date(h*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(h*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:o,values:(d,p)=>p.map(h=>h.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(d,p)=>p==null?"\u2014":new Date(p*1e3).toLocaleString()},...this.curves.map(d=>({label:d.label,stroke:d.color,width:2,spanGaps:!1,show:!this.hiddenCurves.has(d.label),paths:d.step?Ue.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(p,h)=>h==null?"Indisponible":`${h.toLocaleString(void 0,{maximumFractionDigits:d.unit.includes("min")?6:3})} ${d.unit}`}))],hooks:{setSeries:[d=>{d.status!==1||d!==this.plot||(d.series.forEach((p,h)=>{h&&typeof p.label=="string"&&(p.show===!1?this.hiddenCurves.add(p.label):this.hiddenCurves.delete(p.label))}),this.requestUpdate())}],setScale:[(d,p)=>{p==="x"&&d.status===1&&d===this.plot&&!this.applying&&d.scales.x.min!=null&&d.scales.x.max!=null&&(Math.abs(d.scales.x.min-this.range[0])>.01||Math.abs(d.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[d.scales.x.min,d.scales.x.max],bubbles:!0,composed:!0}))}]}},a,n),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,n.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,n.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(n)}render(){let n=this.samples.filter(i=>this.curves.some(s=>Wi(i,s.path)!==null)).length;return N`<h3>${this.heading}</h3>
      <div class="series-controls" role="group" aria-label="Séries affichées">
        ${this.curves.map((i,s)=>N`<button
              aria-pressed=${!this.hiddenCurves.has(i.label)}
              @click=${()=>this.toggleSeries(s)}
            >
              <span style=${"background:"+i.color} aria-hidden="true"></span
              >${i.label}
            </button>`)}
      </div>
      <div class="plot" aria-label=${this.heading}></div>
      ${n?N`<details>
            <summary>
              Table de données accessible · ${n} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(i=>N`<th>${i.label} (${i.unit})</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(i=>N`<tr>
                        <td>${new Date(i.time*1e3).toLocaleString()}</td>
                        ${this.curves.map(s=>N`<td>
                              ${Wi(i,s.path)??"Indisponible"}
                            </td>`)}
                      </tr>`)}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
            </p>
          </details>`:N`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};Pt.styles=[qn(Yo),kt`
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
    `],te([Ce({attribute:!1})],Pt.prototype,"samples",2),te([Ce({attribute:!1})],Pt.prototype,"curves",2),te([Ce({attribute:!1})],Pt.prototype,"range",2),te([Ce()],Pt.prototype,"heading",2),te([Ce()],Pt.prototype,"syncKey",2),te([Ce({type:Boolean})],Pt.prototype,"percent",2),Pt=te([It("smartpi-time-chart")],Pt);var sn=class{constructor(e){this.diagnostic=e}get bypass(){return ji(this.diagnostic)||["CoolDown","HeatUp","CoolDownFinal"].includes(String(D(this.diagnostic.live,"calibration.state")))||D(this.diagnostic.live,"control.phase")==="Calibration"}get route(){return this.bypass?"direct":D(this.diagnostic.live,"control.mode")==="smartpi"?"pi":"unavailable"}blocks(){let e=this.diagnostic,n=e.live,i=this.bypass,s=(o,a,d,p,h,b,m)=>({id:o,title:a,path:d,value:X(D(n,d),p,d==="model.a"?6:2),explanation:h,reason:X(D(n,b)),status:!e.available||D(n,d)==null?"Indisponible":m??"Publi\xE9"});return[s("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),s("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),s("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",i?"Contourn\xE9":"Voie SmartPI"),s("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",i?"Contourn\xE9":"Voie SmartPI"),s("command",i?"Hyst\xE9r\xE9sis / calibration":"Commande demand\xE9e",i?"power.applied_percent":"power.command_percent"," %",i?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.","control.saturation_state",i?"Voir sortie appliqu\xE9e":"Publi\xE9"),s("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",i?"Contourn\xE9 (voie directe)":"Publi\xE9"),s("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),s("model","Syst\xE8me thermique / mod\xE8le","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let e=this.diagnostic.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([n,i,s])=>{let o=ct(D(e,i));return{label:n,path:i,value:o===null?null:o*(s?100:1)}})}};var ni=class extends We{constructor(){super(...arguments);this.expert=!1;this.selected="pi"}render(){if(!this.diagnostic)return N``;let n=new sn(this.diagnostic),i=n.blocks(),s=i.find(a=>a.id===this.selected)??i[0],o=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return N`<div class="intro">
        <div>
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge"
          >${n.bypass?"Chemin direct \xB7 PI/FF contourn\xE9s":n.route==="pi"?"Voie PI + feedforward":"Chemin de commande non v\xE9rifi\xE9"}</span
        >
      </div>
      <p class="muted">
        Relations logiques SmartPI — pas des flux de chaleur mesurés. Les
        priorités externes HA ne sont pas entièrement décrites par ce schéma.
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
          ${n.route==="pi"?_n`<path class="flow" d="M205 65 H235 M205 195 H220 V95 H235 M420 65 H435 V115 H450 M420 195 H435 V145 H450"/>`:n.bypass?_n`<path class="flow bypass" d="M205 65 H440 V100 H450 M635 125 H647 V310 H660"/>`:null}
          ${n.route==="pi"?_n`<path class="flow" d="M635 125 H660 M752 180 V265"/>`:null}
          <path class="flow" d="M660 315 H420 M235 345 H110 V245" />
          ${i.map((a,d)=>_n`<g role="button" tabindex="0" aria-label=${`${a.title} : ${a.value}. ${a.status}`} class=${"block "+(a.id===s.id?"selected":"")+(a.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${o[d][0]},${o[d][1]})`} @click=${()=>this.selected=a.id} @keydown=${p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),this.selected=a.id)}}>
          <title>${a.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${a.title}</text><text x="13" y="50" class="value">${a.value}</text><text x="13" y="73" class="status">${a.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${i.map(a=>N`<button
              aria-pressed=${a.id===s.id}
              @click=${()=>this.selected=a.id}
            >
              ${a.title}<strong>${a.value}</strong><small>${a.status}</small>
            </button>`)}
      </div>
      <aside aria-live="polite">
        <h4>${s.title} <span class="badge">${s.status}</span></h4>
        <p>${s.explanation}</p>
        <p>Raison / contexte publié : <strong>${s.reason}</strong></p>
        ${this.expert?N`<code>attributes.live.${s.path}</code>
              <p>
                Source : SmartPI Diagnostics v2. Les informations absentes ne
                sont pas reconstituées.
              </p>
              <p>
                Bande morte :
                ${X(D(this.diagnostic.live,"control.in_deadband"))} ·
                Temps mort :
                ${X(D(this.diagnostic.live,"control.in_deadtime_window"))}
                · Gouvernance :
                ${X(D(this.diagnostic.live,"governance.thermal_update_reason"))}
              </p>`:null}
      </aside>`}};ni.styles=kt`
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
      stroke: var(--secondary-text-color);
      stroke-width: 2;
      marker-end: url(#arrow);
    }
    .bypass {
      stroke: #ce8d2c;
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
      font-size: 11px;
      overflow-wrap: anywhere;
    }
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
  `,te([Ce({attribute:!1})],ni.prototype,"diagnostic",2),te([Ce({type:Boolean})],ni.prototype,"expert",2),te([Qe()],ni.prototype,"selected",2),ni=te([It("smartpi-control-diagram")],ni);var ln=class extends We{render(){if(!this.diagnostic)return N``;let e=new sn(this.diagnostic),n=e.chain(),i=Math.max(100,...n.map(s=>Math.abs(s.value??0)));return N`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${e.bypass?"Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliqu\xE9e.":"FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu pr\xE9c\xE8dent les limites ; Hold est un \xE9tat de maintien, pas une contribution \xE0 additionner."}
      </p>
      ${n.map(s=>N`<div class="row">
            <span title=${"attributes.live."+s.path}>${s.label}</span>
            <div class="track">
              <i></i>${s.value===null?null:N`<b
                    style=${`left:${s.value<0?50+s.value/i*50:50}%;width:${Math.abs(s.value)/i*50}%`}
                    class=${s.value<0?"negative":""}
                  ></b>`}
            </div>
            <strong>${X(s.value," %",2)}</strong>
          </div>`)}
      <p>
        Ces diagnostics peuvent décrire un candidat et un cycle déjà engagé.
        Leurs différences ne sont pas une preuve de perte ni de limitation.
      </p>
      <p>
        Échelle symétrique ±${X(i," %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${X(D(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${X(D(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${X(D(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${D(this.diagnostic.live,"power.valve_linearization_enabled")===!0?N`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`:null}`}};ln.styles=kt`
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
  `,te([Ce({attribute:!1})],ln.prototype,"diagnostic",2),ln=te([It("smartpi-command-chain")],ln);var Ou=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],Nu=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],qe=class extends We{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.followNow=!0;this.generation=0;this.recorderEntity=""}get usingRecorder(){return this.recorderEntity===this.diagnostic?.entityId&&!this.preferSession&&Ws(this.recorder)}willUpdate(n){if(this.followNow&&!this.usingRecorder&&(n.has("session")||n.has("preferSession")||n.has("recorder"))){let i=this.session.at(-1)?.time;i!==void 0&&i>this.range[1]&&(this.end=i,this.range=[i-this.hours*3600,i])}}windowData(n){return this.filteredCache?.all===n&&this.filteredCache.start===this.range[0]&&this.filteredCache.end===this.range[1]?this.filteredCache:this.filteredCache={all:n,start:this.range[0],end:this.range[1],samples:n.filter(i=>i.time>=this.range[0]&&i.time<=this.range[1]),events:yr(n).filter(i=>i.time>=this.range[0]&&i.time<=this.range[1])}}updated(n){let i=n.get("diagnostic");n.has("diagnostic")&&i?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.filteredCache=void 0,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.followNow=!0,this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(n){this.followNow=!1;let i=this.range[1]-this.range[0],s=Date.now()/1e3,o=this.end-48*3600,a=Math.min(s,Math.max(o+i,this.range[1]+n*i/2));this.range=[a-i,a]}zoom(n){this.followNow=!1;let[i,s]=this.range,o=Math.max(60,Math.min(48*3600,(s-i)*n));this.range=[s-o,s]}async load(){let n=++this.generation,i=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!i||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let s=Date.now()/1e3,o=await xr(this.hass,i.entityId,s-48*3600,s,()=>n!==this.generation);if(n!==this.generation)return;this.recorderEntity=i.entityId,this.recorder=o,Ws(o)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(s){if(n!==this.generation)return;this.error=s instanceof Error&&s.message.startsWith("Format")?s.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{n===this.generation&&(this.loading=!1)}}render(){let n=this.diagnostic;if(!n)return de;let i=this.usingRecorder,s=i?this.recorder:this.session,{samples:o,events:a}=this.windowData(s),d=(p,h,b=!1)=>N`<section class="chart">
        <smartpi-time-chart
          .heading=${p}
          .samples=${o}
          .curves=${h}
          .range=${this.range}
          .percent=${b}
          .syncKey=${n.entityId}
          @time-range=${m=>{m.detail[1]>m.detail[0]&&(this.followNow=!1,this.range=m.detail)}}
        ></smartpi-time-chart>
      </section>`;return N`<div class="workspace">
      <div class="top">
        <div>
          <span class="eyebrow">OBSERVATOIRE SMARTPI</span>
          <h2>Une commande, une réponse thermique</h2>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${p=>this.expert=p.target.checked}
          />
          Mode expert</label
        >
      </div>
      <nav aria-label="Vues de diagnostic">
        ${[["evolution","\xC9volution"],["regulation","R\xE9gulation"],["model","Sant\xE9 du mod\xE8le"]].map(([p,h])=>N`<button
              class=${this.tab===p?"active":""}
              aria-pressed=${this.tab===p}
              @click=${()=>this.tab=p}
            >
              ${h}
            </button>`)}
      </nav>
      <div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
          ${[1,3,6,12,24,48].map(p=>N`<button
                aria-pressed=${p===this.hours}
                class=${p===this.hours?"chosen":""}
                @click=${()=>{this.hours=p,this.reset()}}
              >
                ${p} h
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
            @change=${p=>this.preferSession=p.target.checked}
          />
          Session uniquement</label
        >
      </div>
      ${i?de:N`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${p=>{this.followNow=p.target.checked,this.followNow&&this.reset()}}
            />
            Suivre les nouvelles publications de session</label
          >`}
      ${this.loading?N`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:de}
      ${this.error?N`<p role="status" class="notice">${this.error}</p>`:de}
      ${o.length?de:N`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}
      ${this.tab==="evolution"?N`
            ${d("Temp\xE9rature et consigne filtr\xE9e",Ou)}
            ${d("Commande du r\xE9gulateur \xB7 pas des watts",Nu,!0)}
            ${d("\xC9cart consigne filtr\xE9e \u2212 temp\xE9rature int\xE9rieure",[{label:"\xC9cart filtr\xE9",path:"error",color:"#bc7254",unit:"\xB0C"}])}
            <p class="foot">
              Écart calculé uniquement avec deux valeurs du même état. Ce n’est
              pas l’erreur de l’intégrateur ni une mesure de confort. Aucune
              zone de bande morte n’est extrapolée. Les points sont des
              publications irrégulières ; une ligne ne constitue pas une mesure
              intermédiaire.
            </p>
          `:this.tab==="regulation"?N`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${n}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
              </section>
              <section class="pane">
                <smartpi-command-chain .diagnostic=${n}></smartpi-command-chain>
              </section>`:N`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${X(D(n.live,"model.confidence"))}</span
                >
              </div>
              ${d("A \xB7 gain de chauffe estim\xE9",[{label:"A appris",path:"model.a",color:"#2689ca",unit:"\xB0C/min/u",step:!0}])}
              ${d("B \xB7 pertes thermiques estim\xE9es",[{label:"B appris",path:"model.b",color:"#39a38a",unit:"min\u207B\xB9",step:!0}])}
              <p class="foot">
                La confiance actuelle ne valide pas rétroactivement ces séries.
                Le contrat history ne contient pas de confiance historique ni de
                mesures de référence A/B.
              </p>
              <section class="pane">
                <h3>Temps morts · instantané</h3>
                <div class="metrics">
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([p,h,b])=>N`<div>
                        <span>${p}</span
                        ><strong
                          >${X(Bt(n.live,h,b),h==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${X(D(n.live,b))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${X(D(n.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${X(D(n.live,"analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${X(D(n.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE 30","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([p,h,b])=>N`<div>
                        <span>${p}</span
                        ><strong
                          >${X(Bt(n.live,"analysis.twin."+h),b,4)}</strong
                        >
                      </div>`)}
                </div>
                <p>
                  Équilibre :
                  ${X(Bt(n.live,"analysis.twin.twin_T_steady","analysis.twin.twin_T_steady_reliable")," \xB0C")}
                  · Consigne atteignable (prédiction) :
                  ${X(Bt(n.live,"analysis.twin.twin_setpoint_reachable","analysis.twin.twin_T_steady_reliable"))}
                </p>
                <p class="foot">
                  Aucune courbe Twin : ces valeurs ne font pas partie des huit
                  séries Recorder standard. Fiabilité déclarée ≠ exactitude
                  physique démontrée.
                </p>
              </section>
            `}
      <section class="timeline">
        <h3>
          Journal des publications
          <span>${a.length} variations observées</span>
        </h3>
        <p class="foot">
          Annotations issues d’une comparaison d’états, pas d’événements
          internes explicitement horodatés. Les motifs absents de Recorder ne
          sont pas reconstruits.
        </p>
        <ol>
          ${a.slice(-60).reverse().map(p=>N`<li>
                  <time>${new Date(p.time*1e3).toLocaleString()}</time>
                  <div>
                    <strong>${p.label}</strong>${this.expert?N`<p>${p.provenance}</p>`:de}
                  </div>
                </li>`)}
        </ol>
        ${a.length===0?N`<p>Aucune transition observable sur cette fenêtre.</p>`:N`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>
      ${this.expert?N`<details class="provenance">
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
          </details>`:de}
    </div>`}};qe.styles=kt`
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
    .eyebrow {
      font-size: 10px;
      letter-spacing: 0.16em;
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
      color: var(--primary-color);
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
  `,te([Ce({attribute:!1})],qe.prototype,"hass",2),te([Ce({attribute:!1})],qe.prototype,"diagnostic",2),te([Ce({attribute:!1})],qe.prototype,"session",2),te([Qe()],qe.prototype,"tab",2),te([Qe()],qe.prototype,"expert",2),te([Qe()],qe.prototype,"hours",2),te([Qe()],qe.prototype,"end",2),te([Qe()],qe.prototype,"range",2),te([Qe()],qe.prototype,"recorder",2),te([Qe()],qe.prototype,"loading",2),te([Qe()],qe.prototype,"error",2),te([Qe()],qe.prototype,"preferSession",2),te([Qe()],qe.prototype,"followNow",2),qe=te([It("smartpi-visual-diagnostics")],qe);var Uu=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],Gt=class extends We{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new Gn}willUpdate(n){n.has("hass")&&this.hass&&this.sessionHistory.collect(js(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(n,i,s="",o=2){return N`<div class="metric"><span>${n}</span><strong>${X(i,s,o)}</strong></div>`}power(n,i,s){let o=ct(i),a=o===null?0:Math.min(100,Math.max(0,o));return N`<div class="power"><div class="power-label"><span>${n}</span><strong>${X(i," %",1)}</strong></div>
      <div class="track" aria-label=${n+" "+X(i," %",1)}>
        <div class=${"fill "+s} style=${"width:"+a+"%"}></div>
      </div></div>`}field(n,i){let s=X(Bt(i,n.path,n.reliable),n.unit??"",n.digits??2);return N`<div class="detail" title=${n.path}><span>${n.label}</span><strong>${s}</strong></div>`}showDiagnostic(n){let i=n.live,s=gr(n),o=ji(n),a=ct(D(i,"learning.bootstrap_progress_percent"));return N`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${n.name}</h2>
            <div class="muted small">${n.climateId??n.entityId}</div></div>
          <span class="tag">${o?"Apprentissage / hyst\xE9r\xE9sis":X(D(i,"control.phase"))}</span>
        </div>
        <p class="muted small">État : ${n.state} · Dernière publication : ${n.lastUpdated??"Indisponible"}. Une publication ancienne ne prouve pas une panne.</p>
        <div class="metrics">
          ${this.metric("Temp\xE9rature int\xE9rieure",D(i,"temperature.indoor")," \xB0C")}
          ${this.metric("Consigne filtr\xE9e",D(i,"setpoint.filtered_setpoint")," \xB0C")}
          ${this.metric("Commande appliqu\xE9e",D(i,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",D(i,"temperature.outdoor")," \xB0C")}
        </div>
        ${o?N`<div class="learn">
          <div class="flex spread"><span>Progression de l’apprentissage</span><strong>${X(a," %",0)}</strong></div>
          <div class="track"><div class="fill applied" style=${"width:"+(a===null?0:Math.max(0,Math.min(100,a)))+"%"}></div></div>
          <div class="muted small">A : ${X(D(i,"learning.emea_samples_a"),"",0)} / ${X(D(i,"learning.bootstrap_target_a"),"",0)}
            · B : ${X(D(i,"learning.emea_samples_b"),"",0)} / ${X(D(i,"learning.bootstrap_target_b"),"",0)}</div>
        </div>`:de}
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${n} .session=${this.sessionHistory.get(n.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${s.map(d=>N`<li>${d}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${Uu.map(d=>N`<details class="surface">
          <summary>${d.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${d.note}</p>
          <div class="detail-grid">${d.fields.map(p=>this.field(p,i))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:n.state,live:n.live,history:n.history},null,2)}</pre>
      </details>
      </details>
    `}render(){let n=js(this.hass),i=n.find(s=>s.entityId===this.selectedId)??n[0];return N`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Lecture seule · 0.2</span></div>
      <main>
        <div class="flex spread intro"><div><span class="eyebrow">SYNTHÈSE</span><h2>Mes thermostats</h2></div>
          <span class="muted small">${n.length} diagnostic${n.length>1?"s":""} SmartPI v2</span></div>
        ${n.length===0?N`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:N`<div class="tiles">${n.map(s=>N`<button type="button" class=${"tile "+(i?.entityId===s.entityId?"selected":"")}
           @click=${()=>{this.selectedId=s.entityId}} aria-pressed=${i?.entityId===s.entityId}>
            <strong>${s.name}</strong><span class="muted small">${ji(s)?"Bootstrap":X(D(s.live,"control.phase"))}</span>
            <span class="big">${X(D(s.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom"><span>Cible ${X(D(s.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
              <span>${X(D(s.live,"power.applied_percent")," %",1)}</span></span>
          </button>`)}</div>
          ${i?this.showDiagnostic(i):de}`}
        <footer>Source : capteurs SmartPI Diagnostics v2 · Lecture seule · Aucune commande Home Assistant</footer>
      </main>`}};Gt.styles=kt`
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
    .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin-bottom:20px}
    .tile{background:var(--card-background-color);color:inherit;border:1px solid var(--divider-color);border-radius:14px;
      min-height:150px;padding:16px;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:8px}
    button:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color);outline-offset:3px}
    .tile{overflow-wrap:anywhere;min-width:0}
    .tile:hover{border-color:var(--primary-color)}.tile.selected{outline:2px solid var(--primary-color);outline-offset:-2px}
    .big{font-size:27px;font-weight:700}.tile-bottom{display:flex;justify-content:space-between;gap:7px;font-size:12px;margin-top:auto}
    .hero,.surface{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px}
    .hero{padding:23px}.hero h2{margin:5px 0;font-size:27px}
    .metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin-top:20px}
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
      .tile{padding:11px;min-height:134px}.tile-bottom{flex-direction:column}.big{font-size:23px}
      .metric strong{font-size:18px}.hero h2{font-size:23px}.hero .spread{align-items:flex-start;flex-direction:column}
      .subhead{display:block}.readonly{font-size:10px}.head-text h1{font-size:17px}}
  `,te([Ce({attribute:!1})],Gt.prototype,"hass",2),te([Ce({attribute:!1})],Gt.prototype,"panel",2),te([Ce({type:Boolean})],Gt.prototype,"narrow",2),te([Qe()],Gt.prototype,"selectedId",2),Gt=te([It("smartpi-dashboard-panel")],Gt);export{Gt as SmartPIDashboardPanel};
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
