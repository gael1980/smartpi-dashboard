var ka=Object.defineProperty;var Aa=Object.getOwnPropertyDescriptor;var ee=(t,e,n,i)=>{for(var s=i>1?void 0:i?Aa(e,n):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(s=(i?a(e,n,s):a(s))||s);return i&&s&&ka(e,n,s),s};var Nn=globalThis,Un=Nn.ShadowRoot&&(Nn.ShadyCSS===void 0||Nn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ls=Symbol(),er=new WeakMap,hn=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Ls)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o,n=this.t;if(Un&&e===void 0){let i=n!==void 0&&n.length===1;i&&(e=er.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&er.set(n,e))}return e}toString(){return this.cssText}},qn=t=>new hn(typeof t=="string"?t:t+"",void 0,Ls),At=(t,...e)=>{let n=t.length===1?t[0]:e.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new hn(n,t,Ls)},tr=(t,e)=>{if(Un)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let i=document.createElement("style"),s=Nn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,t.appendChild(i)}},Ds=Un?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(let i of e.cssRules)n+=i.cssText;return qn(n)})(t):t;var{is:Ca,defineProperty:Ea,getOwnPropertyDescriptor:Ma,getOwnPropertyNames:Ta,getOwnPropertySymbols:Pa,getPrototypeOf:Fa}=Object,Vn=globalThis,ir=Vn.trustedTypes,La=ir?ir.emptyScript:"",Da=Vn.reactiveElementPolyfillSupport,mn=(t,e)=>t,gn={toAttribute(t,e){switch(e){case Boolean:t=t?La:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},jn=(t,e)=>!Ca(t,e),nr={attribute:!0,type:String,converter:gn,reflect:!1,useDefault:!1,hasChanged:jn};Symbol.metadata??=Symbol("metadata"),Vn.litPropertyMetadata??=new WeakMap;var jt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=nr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,n);s!==void 0&&Ea(this.prototype,e,s)}}static getPropertyDescriptor(e,n,i){let{get:s,set:o}=Ma(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){let d=s?.call(this);o?.call(this,a),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??nr}static _$Ei(){if(this.hasOwnProperty(mn("elementProperties")))return;let e=Fa(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(mn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(mn("properties"))){let n=this.properties,i=[...Ta(n),...Pa(n)];for(let s of i)this.createProperty(s,n[s])}let e=this[Symbol.metadata];if(e!==null){let n=litPropertyMetadata.get(e);if(n!==void 0)for(let[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[n,i]of this.elementProperties){let s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let n=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)n.unshift(Ds(s))}else e!==void 0&&n.push(Ds(e));return n}static _$Eu(e,n){let i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,n=this.constructor.elementProperties;for(let i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return tr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:gn).toAttribute(n,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,n){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:gn;this._$Em=s;let d=a.fromAttribute(n,o.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(e,n,i,s=!1,o){if(e!==void 0){let a=this.constructor;if(s===!1&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??jn)(o,n)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:a}=o,d=this[s];a!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,o,d)}}let e=!1,n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};jt.elementStyles=[],jt.shadowRootOptions={mode:"open"},jt[mn("elementProperties")]=new Map,jt[mn("finalized")]=new Map,Da?.({ReactiveElement:jt}),(Vn.reactiveElementVersions??=[]).push("2.1.2");var Us=globalThis,sr=t=>t,Bn=Us.trustedTypes,lr=Bn?Bn.createPolicy("lit-html",{createHTML:t=>t}):void 0,ur="$lit$",ei=`lit$${Math.random().toFixed(9).slice(2)}$`,dr="?"+ei,Ra=`<${dr}>`,gi=document,vn=()=>gi.createComment(""),yn=t=>t===null||typeof t!="object"&&typeof t!="function",qs=Array.isArray,za=t=>qs(t)||typeof t?.[Symbol.iterator]=="function",Rs=`[ 	
\f\r]`,bn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rr=/-->/g,or=/>/g,hi=RegExp(`>|${Rs}(?:([^\\s"'>=/]+)(${Rs}*=${Rs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ar=/'/g,cr=/"/g,fr=/^(?:script|style|textarea|title)$/i,Vs=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),R=Vs(1),xn=Vs(2),Yp=Vs(3),bi=Symbol.for("lit-noChange"),de=Symbol.for("lit-nothing"),pr=new WeakMap,mi=gi.createTreeWalker(gi,129);function hr(t,e){if(!qs(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return lr!==void 0?lr.createHTML(e):e}var Ha=(t,e)=>{let n=t.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",a=bn;for(let d=0;d<n;d++){let u=t[d],f,b,m=-1,v=0;for(;v<u.length&&(a.lastIndex=v,b=a.exec(u),b!==null);)v=a.lastIndex,a===bn?b[1]==="!--"?a=rr:b[1]!==void 0?a=or:b[2]!==void 0?(fr.test(b[2])&&(s=RegExp("</"+b[2],"g")),a=hi):b[3]!==void 0&&(a=hi):a===hi?b[0]===">"?(a=s??bn,m=-1):b[1]===void 0?m=-2:(m=a.lastIndex-b[2].length,f=b[1],a=b[3]===void 0?hi:b[3]==='"'?cr:ar):a===cr||a===ar?a=hi:a===rr||a===or?a=bn:(a=hi,s=void 0);let A=a===hi&&t[d+1].startsWith("/>")?" ":"";o+=a===bn?u+Ra:m>=0?(i.push(f),u.slice(0,m)+ur+u.slice(m)+ei+A):u+ei+(m===-2?d:A)}return[hr(t,o+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},_n=class t{constructor({strings:e,_$litType$:n},i){let s;this.parts=[];let o=0,a=0,d=e.length-1,u=this.parts,[f,b]=Ha(e,n);if(this.el=t.createElement(f,i),mi.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=mi.nextNode())!==null&&u.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ur)){let v=b[a++],A=s.getAttribute(m).split(ei),E=/([.?@])?(.*)/.exec(v);u.push({type:1,index:o,name:E[2],strings:A,ctor:E[1]==="."?Hs:E[1]==="?"?Is:E[1]==="@"?Os:ji}),s.removeAttribute(m)}else m.startsWith(ei)&&(u.push({type:6,index:o}),s.removeAttribute(m));if(fr.test(s.tagName)){let m=s.textContent.split(ei),v=m.length-1;if(v>0){s.textContent=Bn?Bn.emptyScript:"";for(let A=0;A<v;A++)s.append(m[A],vn()),mi.nextNode(),u.push({type:2,index:++o});s.append(m[v],vn())}}}else if(s.nodeType===8)if(s.data===dr)u.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ei,m+1))!==-1;)u.push({type:7,index:o}),m+=ei.length-1}o++}}static createElement(e,n){let i=gi.createElement("template");return i.innerHTML=e,i}};function Vi(t,e,n=t,i){if(e===bi)return e;let s=i!==void 0?n._$Co?.[i]:n._$Cl,o=yn(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,n,i)),i!==void 0?(n._$Co??=[])[i]=s:n._$Cl=s),s!==void 0&&(e=Vi(t,s._$AS(t,e.values),s,i)),e}var zs=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:i}=this._$AD,s=(e?.creationScope??gi).importNode(n,!0);mi.currentNode=s;let o=mi.nextNode(),a=0,d=0,u=i[0];for(;u!==void 0;){if(a===u.index){let f;u.type===2?f=new wn(o,o.nextSibling,this,e):u.type===1?f=new u.ctor(o,u.name,u.strings,this,e):u.type===6&&(f=new Ns(o,this,e)),this._$AV.push(f),u=i[++d]}a!==u?.index&&(o=mi.nextNode(),a++)}return mi.currentNode=gi,s}p(e){let n=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}},wn=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,i,s){this.type=2,this._$AH=de,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Vi(this,e,n),yn(e)?e===de||e==null||e===""?(this._$AH!==de&&this._$AR(),this._$AH=de):e!==this._$AH&&e!==bi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):za(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==de&&yn(this._$AH)?this._$AA.nextSibling.data=e:this.T(gi.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=_n.createElement(hr(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new zs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(e){let n=pr.get(e.strings);return n===void 0&&pr.set(e.strings,n=new _n(e)),n}k(e){qs(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,i,s=0;for(let o of e)s===n.length?n.push(i=new t(this.O(vn()),this.O(vn()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let i=sr(e).nextSibling;sr(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ji=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,s,o){this.type=1,this._$AH=de,this._$AN=void 0,this.element=e,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=de}_$AI(e,n=this,i,s){let o=this.strings,a=!1;if(o===void 0)e=Vi(this,e,n,0),a=!yn(e)||e!==this._$AH&&e!==bi,a&&(this._$AH=e);else{let d=e,u,f;for(e=o[0],u=0;u<o.length-1;u++)f=Vi(this,d[i+u],n,u),f===bi&&(f=this._$AH[u]),a||=!yn(f)||f!==this._$AH[u],f===de?e=de:e!==de&&(e+=(f??"")+o[u+1]),this._$AH[u]=f}a&&!s&&this.j(e)}j(e){e===de?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Hs=class extends ji{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===de?void 0:e}},Is=class extends ji{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==de)}},Os=class extends ji{constructor(e,n,i,s,o){super(e,n,i,s,o),this.type=5}_$AI(e,n=this){if((e=Vi(this,e,n,0)??de)===bi)return;let i=this._$AH,s=e===de&&i!==de||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==de&&(i===de||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ns=class{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Vi(this,e)}};var Ia=Us.litHtmlPolyfillSupport;Ia?.(_n,wn),(Us.litHtmlVersions??=[]).push("3.3.3");var mr=(t,e,n)=>{let i=n?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=n?.renderBefore??null;i._$litPart$=s=new wn(e.insertBefore(vn(),o),o,void 0,n??{})}return s._$AI(t),s};var js=globalThis,We=class extends jt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=mr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return bi}};We._$litElement$=!0,We.finalized=!0,js.litElementHydrateSupport?.({LitElement:We});var Oa=js.litElementPolyfillSupport;Oa?.({LitElement:We});(js.litElementVersions??=[]).push("4.2.2");var Ot=t=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Na={attribute:!0,type:String,converter:gn,reflect:!1,hasChanged:jn},Ua=(t=Na,e,n)=>{let{kind:i,metadata:s}=n,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),i==="accessor"){let{name:a}=n;return{set(d){let u=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,u,t,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,t,d),d}}}if(i==="setter"){let{name:a}=n;return function(d){let u=this[a];e.call(this,d),this.requestUpdate(a,u,t,!0,d)}}throw Error("Unsupported decorator location: "+i)};function Ee(t){return(e,n)=>typeof n=="object"?Ua(t,e,n):((i,s,o)=>{let a=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(s,o):void 0})(t,e,n)}function Qe(t){return Ee({...t,state:!0,attribute:!1})}function ct(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function N(t,e){return e.split(".").reduce((n,i)=>ct(n)?n[i]:void 0,t)}function nt(t){return typeof t=="number"&&Number.isFinite(t)?t:null}function se(t,e="",n=2){let i=nt(t);return i!==null?i.toLocaleString("fr-FR",{maximumFractionDigits:n})+e:typeof t=="boolean"?t?"Oui":"Non":typeof t=="string"&&t.trim()!==""?t:"Indisponible"}function Bi(t){return N(t.live,"control.mode")==="hysteresis"||N(t.live,"learning.stage")==="bootstrap"}function Ct(t,e,n){if(!(n&&N(t,n)!==!0)&&!(e.startsWith("analysis.twin.")&&!e.endsWith("reliable")&&(N(t,"analysis.twin.twin_model_reliable")!==!0||N(t,"analysis.twin.twin_warming_up")!==!1)))return N(t,e)}function qa(t,e){return Object.values(t.states).find(i=>i.entity_id.startsWith("climate.")&&N(i.attributes,"specific_states.regulation_diagnostics")===e)??null}function Bs(t){if(!t||!ct(t.states))return[];let e=[];for(let n of Object.values(t.states)){if(!n?.entity_id?.startsWith("sensor.")||!ct(n.attributes))continue;let i=n.attributes;if(i.schema_version!==2||!ct(i.live)||!ct(i.history))continue;let s=qa(t,n.entity_id),a=(typeof i.friendly_name=="string"?i.friendly_name:n.entity_id).replace(/ SmartPI Diagnostics$/i,"");e.push({entityId:n.entity_id,climateId:s?.entity_id??null,name:typeof s?.attributes.friendly_name=="string"?s.attributes.friendly_name:a,state:n.state,lastUpdated:n.last_updated??null,available:n.state!=="unknown"&&n.state!=="unavailable",live:n.state==="unknown"||n.state==="unavailable"?{}:i.live,history:i.history})}return e.sort((n,i)=>n.name.localeCompare(i.name,"fr"))}function gr(t){let e=[];if(!t.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];e.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),Bi(t)&&e.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),N(t.live,"control.in_deadtime_window")===!0&&e.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),N(t.live,"model.tau_reliable")===!1&&e.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),N(t.live,"analysis.twin.twin_T_steady_reliable")===!1&&e.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let n=N(t.live,"feedforward.ff3_status");return typeof n=="string"&&n.startsWith("disabled:")&&e.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+n+"."),e}var Va=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function br(t){if(typeof t=="number")return Number.isFinite(t)&&t>0?t:null;if(typeof t!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(t))return null;let e=Date.parse(t);return Number.isFinite(e)?e/1e3:null}function vr(t){if(!Array.isArray(t))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let e=[];for(let n of t){if(!ct(n))continue;let i=br(n.lu??n.last_updated);if(i===null)continue;let s=ct(n.a)?n.a:ct(n.attributes)?n.attributes:{},o=typeof n.s=="string"?n.s:typeof n.state=="string"?n.state:"unknown",a=s.schema_version===2&&o!=="unavailable"&&o!=="unknown";e.push({time:i,state:o,history:a&&ct(s.history)?s.history:{},live:a&&ct(s.live)?s.live:{}})}return Kn(e)}function Kn(t){return[...new Map(t.map(e=>[e.time,e])).values()].sort((e,n)=>e.time-n.time)}function Wi(t,e){if(e==="error"){let n=nt(N(t.history,"temperature.indoor")),i=nt(N(t.history,"setpoint.filtered_setpoint"));return n===null||i===null?null:i-n}return e.startsWith("live.")?nt(Ct(t.live,e.slice(5))):nt(N(t.history,e))}function Ws(t){return t.some(e=>Va.some(n=>Wi(e,n)!==null))}function yr(t){let e=[];for(let n=1;n<t.length;n++){let i=t[n-1],s=t[n],o=nt(N(i.history,"setpoint.filtered_setpoint")),a=nt(N(s.history,"setpoint.filtered_setpoint"));o!==null&&a!==null&&o!==a&&e.push({time:s.time,label:`Consigne filtr\xE9e ${o} \u2192 ${a} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),i.state!==s.state&&e.push({time:s.time,label:`Phase / \xE9tat : ${i.state} \u2192 ${s.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[d,u]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let f=N(i.live,d),b=N(s.live,d);f!=null&&b!==void 0&&b!==null&&f!==b&&e.push({time:s.time,label:`${u} : ${String(b)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${d}.`})}}return e}var Gn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(e,n,i=Date.now()/1e3){let s=new Set(e.map(o=>o.entityId));for(let o of this.buffers.keys())s.has(o)||(this.buffers.delete(o),this.revisions.delete(o));for(let o of e){let a=n[o.entityId]?.last_updated,d=br(a);if(!a||d===null||this.revisions.get(o.entityId)===a)continue;this.revisions.set(o.entityId,a);let u=this.buffers.get(o.entityId)??[];if(u.length&&d<=u[u.length-1].time)continue;let b={time:u.length===0?i:d,state:o.state,history:o.available?o.history:{},live:o.live};this.buffers.set(o.entityId,Kn([...u,b]).filter(m=>m.time>=i-48*3600).slice(-12e3))}}get(e){return this.buffers.get(e)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};async function _r(t,e,n,i,s=()=>!1){if(!e.startsWith("sensor.")||!Number.isFinite(n)||!Number.isFinite(i)||i<=n||i-n>48*3600)throw new Error("Fen\xEAtre historique invalide.");let o=[];for(let a=n;a<i;a+=12*3600){if(s())throw new Error("Lecture annul\xE9e.");let d=Math.min(i,a+12*3600),u=await t.callWS({type:"history/history_during_period",start_time:new Date(a*1e3).toISOString(),end_time:new Date(d*1e3).toISOString(),entity_ids:[e],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!ct(u))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let f=vr(u[e]??[]);if(o.push(...f.filter(b=>b.time>=a&&b.time<=d)),o.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return Kn(o)}var ja="uplot",Ba="u-hz",Wa="u-vt",Ga="u-title",Ka="u-wrap",Ya="u-under",Ja="u-over",Za="u-axis",_i="u-off",Qa="u-select",Xa="u-cursor-x",ec="u-cursor-y",tc="u-cursor-pt",ic="u-legend",nc="u-live",sc="u-inline",lc="u-series",rc="u-marker",wr="u-label",oc="u-value",$n="width",kn="height";var xr="bottom",Gi="left",Gs="right",pl="#000",Sr=pl+"0",Ks="mousemove",$r="mousedown",Ys="mouseup",kr="mouseenter",Ar="mouseleave",Cr="dblclick",ac="resize",cc="scroll",Er="change",Xn="dppxchange",ul="--",en=typeof window<"u",el=en?document:null,Yi=en?window:null,pc=en?navigator:null,ce,Yn;function tl(){let t=devicePixelRatio;ce!=t&&(ce=t,Yn&&nl(Er,Yn,tl),Yn=matchMedia(`(min-resolution: ${ce-.001}dppx) and (max-resolution: ${ce+.001}dppx)`),wi(Er,Yn,tl),Yi.dispatchEvent(new CustomEvent(Xn)))}function pt(t,e){if(e!=null){let n=t.classList;!n.contains(e)&&n.add(e)}}function il(t,e){let n=t.classList;n.contains(e)&&n.remove(e)}function we(t,e,n){t.style[e]=n+"px"}function Et(t,e,n,i){let s=el.createElement(t);return e!=null&&pt(s,e),n?.insertBefore(s,i),s}function yt(t,e){return Et("div",t,e)}var Mr=new WeakMap;function Nt(t,e,n,i,s){let o="translate("+e+"px,"+n+"px)",a=Mr.get(t);o!=a&&(t.style.transform=o,Mr.set(t,o),e<0||n<0||e>i||n>s?pt(t,_i):il(t,_i))}var Tr=new WeakMap;function Pr(t,e,n){let i=e+n,s=Tr.get(t);i!=s&&(Tr.set(t,i),t.style.background=e,t.style.borderColor=n)}var Fr=new WeakMap;function Lr(t,e,n,i){let s=e+""+n,o=Fr.get(t);s!=o&&(Fr.set(t,s),t.style.height=n+"px",t.style.width=e+"px",t.style.marginLeft=i?-e/2+"px":0,t.style.marginTop=i?-n/2+"px":0)}var dl={passive:!0},uc={...dl,capture:!0};function wi(t,e,n,i){e.addEventListener(t,n,i?uc:dl)}function nl(t,e,n,i){e.removeEventListener(t,n,dl)}en&&tl();function Mt(t,e,n,i){let s;n=n||0,i=i||e.length-1;let o=i<=2147483647;for(;i-n>1;)s=o?n+i>>1:ut((n+i)/2),e[s]<t?n=s:i=s;return t-e[n]<=e[i]-t?n:i}function oo(t){return(n,i,s)=>{let o=-1,a=-1;for(let d=i;d<=s;d++)if(t(n[d])){o=d;break}for(let d=s;d>=i;d--)if(t(n[d])){a=d;break}return[o,a]}}var ao=t=>t!=null,co=t=>t!=null&&t>0,is=oo(ao),dc=oo(co);function fc(t,e,n,i=0,s=!1){let o=s?dc:is,a=s?co:ao;[e,n]=o(t,e,n);let d=t[e],u=t[e];if(e>-1)if(i==1)d=t[e],u=t[n];else if(i==-1)d=t[n],u=t[e];else for(let f=e;f<=n;f++){let b=t[f];a(b)&&(b<d?d=b:b>u&&(u=b))}return[d??me,u??-me]}function ns(t,e,n,i){let s=zr(t),o=zr(e);t==e&&(s==-1?(t*=n,e/=n):(t/=n,e*=n));let a=n==10?Bt:po,d=s==1?ut:_t,u=o==1?_t:ut,f=d(a(De(t))),b=u(a(De(e))),m=Ji(n,f),v=Ji(n,b);return n==10&&(f<0&&(m=ge(m,-f)),b<0&&(v=ge(v,-b))),i||n==2?(t=m*s,e=v*o):(t=mo(t,m),e=ss(e,v)),[t,e]}function fl(t,e,n,i){let s=ns(t,e,n,i);return t==0&&(s[0]=0),e==0&&(s[1]=0),s}var hl=.1,Dr={mode:3,pad:hl},Cn={pad:0,soft:null,mode:0},hc={min:Cn,max:Cn};function es(t,e,n,i){return ls(n)?Rr(t,e,n):(Cn.pad=n,Cn.soft=i?0:null,Cn.mode=i?3:0,Rr(t,e,hc))}function oe(t,e){return t??e}function mc(t,e,n){for(e=oe(e,0),n=oe(n,t.length-1);e<=n;){if(t[e]!=null)return!0;e++}return!1}function Rr(t,e,n){let i=n.min,s=n.max,o=oe(i.pad,0),a=oe(s.pad,0),d=oe(i.hard,-me),u=oe(s.hard,me),f=oe(i.soft,me),b=oe(s.soft,-me),m=oe(i.mode,0),v=oe(s.mode,0),A=e-t,E=Bt(A),I=Xe(De(t),De(e)),U=Bt(I),V=De(U-E);(A<1e-24||V>10)&&(A=0,(t==0||e==0)&&(A=1e-24,m==2&&f!=me&&(o=0),v==2&&b!=-me&&(a=0)));let x=A||I||1e3,O=Bt(x),S=Ji(10,ut(O)),J=x*(A==0?t==0?.1:1:o),P=ge(mo(t-J,S/10),24),Z=t>=f&&(m==1||m==3&&P<=f||m==2&&P>=f)?f:me,G=Xe(d,P<Z&&t>=Z?Z:Tt(Z,P)),te=x*(A==0?e==0?.1:1:a),W=ge(ss(e+te,S/10),24),$=e<=b&&(v==1||v==3&&W>=b||v==2&&W<=b)?b:-me,Y=Tt(u,W>$&&e<=$?$:Xe($,W));return G==Y&&G==0&&(Y=100),[G,Y]}var gc=new Intl.NumberFormat(en?pc.language:"en-US"),ml=t=>gc.format(t),dt=Math,Qn=dt.PI,De=dt.abs,ut=dt.floor,Le=dt.round,_t=dt.ceil,Tt=dt.min,Xe=dt.max,Ji=dt.pow,zr=dt.sign,Bt=dt.log10,po=dt.log2,bc=(t,e=1)=>dt.sinh(t)*e,Js=(t,e=1)=>dt.asinh(t/e),me=1/0;function Hr(t){return(Bt((t^t>>31)-(t>>31))|0)+1}function sl(t,e,n){return Tt(Xe(t,e),n)}function uo(t){return typeof t=="function"}function ie(t){return uo(t)?t:()=>t}var vc=()=>{},fo=t=>t,ho=(t,e)=>e,yc=t=>null,Ir=t=>!0,Or=(t,e)=>t==e,_c=/\.\d*?(?=9{6,}|0{6,})/gm,xi=t=>{if(bo(t)||ii.has(t))return t;let e=`${t}`,n=e.match(_c);if(n==null)return t;let i=n[0].length-1;if(e.indexOf("e-")!=-1){let[s,o]=e.split("e");return+`${xi(s)}e${o}`}return ge(t,i)};function vi(t,e){return xi(ge(xi(t/e))*e)}function ss(t,e){return xi(_t(xi(t/e))*e)}function mo(t,e){return xi(ut(xi(t/e))*e)}function ge(t,e=0){if(bo(t))return t;let n=10**e,i=t*n*(1+Number.EPSILON);return Le(i)/n}var ii=new Map;function go(t){return((""+t).split(".")[1]||"").length}function Mn(t,e,n,i){let s=[],o=i.map(go);for(let a=e;a<n;a++){let d=De(a),u=ge(Ji(t,a),d);for(let f=0;f<i.length;f++){let b=t==10?+`${i[f]}e${a}`:i[f]*u,m=(a>=0?0:d)+(a>=o[f]?0:o[f]),v=t==10?b:ge(b,m);s.push(v),ii.set(v,m)}}return s}var En={},gl=[],Zi=[null,null],ti=Array.isArray,bo=Number.isInteger,wc=t=>t===void 0;function Nr(t){return typeof t=="string"}function ls(t){let e=!1;if(t!=null){let n=t.constructor;e=n==null||n==Object}return e}function xc(t){return t!=null&&typeof t=="object"}var Sc=Object.getPrototypeOf(Uint8Array),vo="__proto__";function Qi(t,e=ls){let n;if(ti(t)){let i=t.find(s=>s!=null);if(ti(i)||e(i)){n=Array(t.length);for(let s=0;s<t.length;s++)n[s]=Qi(t[s],e)}else n=t.slice()}else if(t instanceof Sc)n=t.slice();else if(e(t)){n={};for(let i in t)i!=vo&&(n[i]=Qi(t[i],e))}else n=t;return n}function Te(t){let e=arguments;for(let n=1;n<e.length;n++){let i=e[n];for(let s in i)s!=vo&&(ls(t[s])?Te(t[s],Qi(i[s])):t[s]=Qi(i[s]))}return t}var $c=0,kc=1,Ac=2;function Cc(t,e,n){for(let i=0,s,o=-1;i<e.length;i++){let a=e[i];if(a>o){for(s=a-1;s>=0&&t[s]==null;)t[s--]=null;for(s=a+1;s<n&&t[s]==null;)t[o=s++]=null}}}function Ec(t,e){if(Pc(t)){let a=t[0].slice();for(let d=1;d<t.length;d++)a.push(...t[d].slice(1));return Fc(a[0])||(a=Tc(a)),a}let n=new Set;for(let a=0;a<t.length;a++){let u=t[a][0],f=u.length;for(let b=0;b<f;b++)n.add(u[b])}let i=[Array.from(n).sort((a,d)=>a-d)],s=i[0].length,o=new Map;for(let a=0;a<s;a++)o.set(i[0][a],a);for(let a=0;a<t.length;a++){let d=t[a],u=d[0];for(let f=1;f<d.length;f++){let b=d[f],m=Array(s).fill(void 0),v=e?e[a][f]:kc,A=[];for(let E=0;E<b.length;E++){let I=b[E],U=o.get(u[E]);I===null?v!=$c&&(m[U]=I,v==Ac&&A.push(U)):m[U]=I}Cc(m,A,s),i.push(m)}}return i}var Mc=typeof queueMicrotask>"u"?t=>Promise.resolve().then(t):queueMicrotask;function Tc(t){let e=t[0],n=e.length,i=Array(n);for(let o=0;o<i.length;o++)i[o]=o;i.sort((o,a)=>e[o]-e[a]);let s=[];for(let o=0;o<t.length;o++){let a=t[o],d=Array(n);for(let u=0;u<n;u++)d[u]=a[i[u]];s.push(d)}return s}function Pc(t){let e=t[0][0],n=e.length;for(let i=1;i<t.length;i++){let s=t[i][0];if(s.length!=n)return!1;if(s!=e){for(let o=0;o<n;o++)if(s[o]!=e[o])return!1}}return!0}function Fc(t,e=100){let n=t.length;if(n<=1)return!0;let i=0,s=n-1;for(;i<=s&&t[i]==null;)i++;for(;s>=i&&t[s]==null;)s--;if(s<=i)return!0;let o=Xe(1,ut((s-i+1)/e));for(let a=t[i],d=i+o;d<=s;d+=o){let u=t[d];if(u!=null){if(u<=a)return!1;a=u}}return!0}var yo=["January","February","March","April","May","June","July","August","September","October","November","December"],_o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function wo(t){return t.slice(0,3)}var Lc=_o.map(wo),Dc=yo.map(wo),Rc={MMMM:yo,MMM:Dc,WWWW:_o,WWW:Lc};function Sn(t){return(t<10?"0":"")+t}function zc(t){return(t<10?"00":t<100?"0":"")+t}var Hc={YYYY:t=>t.getFullYear(),YY:t=>(t.getFullYear()+"").slice(2),MMMM:(t,e)=>e.MMMM[t.getMonth()],MMM:(t,e)=>e.MMM[t.getMonth()],MM:t=>Sn(t.getMonth()+1),M:t=>t.getMonth()+1,DD:t=>Sn(t.getDate()),D:t=>t.getDate(),WWWW:(t,e)=>e.WWWW[t.getDay()],WWW:(t,e)=>e.WWW[t.getDay()],HH:t=>Sn(t.getHours()),H:t=>t.getHours(),h:t=>{let e=t.getHours();return e==0?12:e>12?e-12:e},AA:t=>t.getHours()>=12?"PM":"AM",aa:t=>t.getHours()>=12?"pm":"am",a:t=>t.getHours()>=12?"p":"a",mm:t=>Sn(t.getMinutes()),m:t=>t.getMinutes(),ss:t=>Sn(t.getSeconds()),s:t=>t.getSeconds(),fff:t=>zc(t.getMilliseconds())};function bl(t,e){e=e||Rc;let n=[],i=/\{([a-z]+)\}|[^{]+/gi,s;for(;s=i.exec(t);)n.push(s[0][0]=="{"?Hc[s[1]]:s[0]);return o=>{let a="";for(let d=0;d<n.length;d++)a+=typeof n[d]=="string"?n[d]:n[d](o,e);return a}}var Ic=new Intl.DateTimeFormat().resolvedOptions().timeZone;function Oc(t,e){let n;return e=="UTC"||e=="Etc/UTC"?n=new Date(+t+t.getTimezoneOffset()*6e4):e==Ic?n=t:(n=new Date(t.toLocaleString("en-US",{timeZone:e})),n.setMilliseconds(t.getMilliseconds())),n}var xo=t=>t%1==0,ts=[1,2,2.5,5],Nc=Mn(10,-32,0,ts),So=Mn(10,0,32,ts),Uc=So.filter(xo),yi=Nc.concat(So),vl=`
`,$o="{YYYY}",Ur=vl+$o,ko="{M}/{D}",An=vl+ko,Jn=An+"/{YY}",Ao="{aa}",qc="{h}:{mm}",Ki=qc+Ao,qr=vl+Ki,Vr=":{ss}",ue=null;function Co(t){let e=t*1e3,n=e*60,i=n*60,s=i*24,o=s*30,a=s*365,u=(t==1?Mn(10,0,3,ts).filter(xo):Mn(10,-3,0,ts)).concat([e,e*5,e*10,e*15,e*30,n,n*5,n*10,n*15,n*30,i,i*2,i*3,i*4,i*6,i*8,i*12,s,s*2,s*3,s*4,s*5,s*6,s*7,s*8,s*9,s*10,s*15,o,o*2,o*3,o*4,o*6,a,a*2,a*5,a*10,a*25,a*50,a*100]),f=[[a,$o,ue,ue,ue,ue,ue,ue,1],[s*28,"{MMM}",Ur,ue,ue,ue,ue,ue,1],[s,ko,Ur,ue,ue,ue,ue,ue,1],[i,"{h}"+Ao,Jn,ue,An,ue,ue,ue,1],[n,Ki,Jn,ue,An,ue,ue,ue,1],[e,Vr,Jn+" "+Ki,ue,An+" "+Ki,ue,qr,ue,1],[t,Vr+".{fff}",Jn+" "+Ki,ue,An+" "+Ki,ue,qr,ue,1]];function b(m){return(v,A,E,I,U,V)=>{let x=[],O=U>=a,S=U>=o&&U<a,J=m(E),P=ge(J*t,3),Z=Zs(J.getFullYear(),O?0:J.getMonth(),S||O?1:J.getDate()),G=ge(Z*t,3);if(S||O){let te=S?U/o:0,W=O?U/a:0,$=P==G?P:ge(Zs(Z.getFullYear()+W,Z.getMonth()+te,1)*t,3),Y=new Date(Le($/t)),F=Y.getFullYear(),j=Y.getMonth();for(let H=0;$<=I;H++){let ne=Zs(F+W*H,j+te*H,1),z=ne-m(ge(ne*t,3));$=ge((+ne+z)*t,3),$<=I&&x.push($)}}else{let te=U>=s?s:U,W=ut(E)-ut(P),$=G+W+ss(P-G,te);x.push($);let Y=m($),F=Y.getHours()+Y.getMinutes()/n+Y.getSeconds()/i,j=U/i,H=v.axes[A]._space,ne=V/H;for(;$=ge($+U,t==1?0:3),!($>I);)if(j>1){let z=ut(ge(F+j,6))%24,le=m($).getHours()-z;le>1&&(le=-1),$-=le*i,F=(F+j)%24;let fe=x[x.length-1];ge(($-fe)/U,3)*ne>=.7&&x.push($)}else x.push($)}return x}}return[u,f,b]}var[Vc,jc,Bc]=Co(1),[Wc,Gc,Kc]=Co(.001);Mn(2,-53,53,[1]);function jr(t,e){return t.map(n=>n.map((i,s)=>s==0||s==8||i==null?i:e(s==1||n[8]==0?i:n[1]+i)))}function Br(t,e){return(n,i,s,o,a)=>{let d=e.find(E=>a>=E[0])||e[e.length-1],u,f,b,m,v,A;return i.map(E=>{let I=t(E),U=I.getFullYear(),V=I.getMonth(),x=I.getDate(),O=I.getHours(),S=I.getMinutes(),J=I.getSeconds(),P=U!=u&&d[2]||V!=f&&d[3]||x!=b&&d[4]||O!=m&&d[5]||S!=v&&d[6]||J!=A&&d[7]||d[1];return u=U,f=V,b=x,m=O,v=S,A=J,P(I)})}}function Yc(t,e){let n=bl(e);return(i,s,o,a,d)=>s.map(u=>n(t(u)))}function Zs(t,e,n){return new Date(t,e,n)}function Wr(t,e){return e(t)}var Jc="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Gr(t,e){return(n,i,s,o)=>o==null?ul:e(t(i))}function Zc(t,e){let n=t.series[e];return n.width?n.stroke(t,e):n.points.width?n.points.stroke(t,e):null}function Qc(t,e){return t.series[e].fill(t,e)}var Xc={show:!0,live:!0,isolate:!1,mount:vc,markers:{show:!0,width:2,stroke:Zc,fill:Qc,dash:"solid"},idx:null,idxs:null,values:[]};function ep(t,e){let n=t.cursor.points,i=yt(),s=n.size(t,e);we(i,$n,s),we(i,kn,s);let o=s/-2;we(i,"marginLeft",o),we(i,"marginTop",o);let a=n.width(t,e,s);return a&&we(i,"borderWidth",a),i}function tp(t,e){let n=t.series[e].points;return n._fill||n._stroke}function ip(t,e){let n=t.series[e].points;return n._stroke||n._fill}function np(t,e){return t.series[e].points.size}var Qs=[0,0];function sp(t,e,n){return Qs[0]=e,Qs[1]=n,Qs}function Zn(t,e,n,i=!0){return s=>{s.button==0&&(!i||s.target==e)&&n(s)}}function Xs(t,e,n,i=!0){return s=>{(!i||s.target==e)&&n(s)}}var lp={show:!0,x:!0,y:!0,lock:!1,move:sp,points:{one:!1,show:ep,size:np,width:0,stroke:ip,fill:tp},bind:{mousedown:Zn,mouseup:Zn,click:Zn,dblclick:Zn,mousemove:Xs,mouseleave:Xs,mouseenter:Xs},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(t,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(t,e,n,i,s)=>i-s,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Eo={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},yl=Te({},Eo,{filter:ho}),Mo=Te({},yl,{size:10}),To=Te({},Eo,{show:!1}),_l='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Po="bold "+_l,Fo=1.5,Kr={show:!0,scale:"x",stroke:pl,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Po,side:2,grid:yl,ticks:Mo,border:To,font:_l,lineGap:Fo,rotate:0},rp="Value",op="Time",Yr={show:!0,scale:"x",auto:!1,sorted:1,min:me,max:-me,idxs:[]};function ap(t,e,n,i,s){return e.map(o=>o==null?"":ml(o))}function cp(t,e,n,i,s,o,a){let d=[],u=ii.get(s)||0;n=a?n:ge(ss(n,s),u);for(let f=n;f<=i;f=ge(f+s,u))d.push(Object.is(f,-0)?0:f);return d}function ll(t,e,n,i,s,o,a){let d=[],u=t.scales[t.axes[e].scale].log,f=u==10?Bt:po,b=ut(f(n));s=Ji(u,b),u==10&&(s=yi[Mt(s,yi)]);let m=n,v=s*u;u==10&&(v=yi[Mt(v,yi)]);do d.push(m),m=m+s,u==10&&!ii.has(m)&&(m=ge(m,ii.get(s))),m>=v&&(s=m,v=s*u,u==10&&(v=yi[Mt(v,yi)]));while(m<=i);return d}function pp(t,e,n,i,s,o,a){let u=t.scales[t.axes[e].scale].asinh,f=i>u?ll(t,e,Xe(u,n),i,s):[u],b=i>=0&&n<=0?[0]:[];return(n<-u?ll(t,e,Xe(u,-i),-n,s):[u]).reverse().map(v=>-v).concat(b,f)}var Lo=/./,up=/[12357]/,dp=/[125]/,Jr=/1/,rl=(t,e,n,i)=>t.map((s,o)=>e==4&&s==0||o%i==0&&n.test(s.toExponential()[s<0?1:0])?s:null);function fp(t,e,n,i,s){let o=t.axes[n],a=o.scale,d=t.scales[a],u=t.valToPos,f=o._space,b=u(10,a),m=u(9,a)-b>=f?Lo:u(7,a)-b>=f?up:u(5,a)-b>=f?dp:Jr;if(m==Jr){let v=De(u(1,a)-b);if(v<f)return rl(e.slice().reverse(),d.distr,m,_t(f/v)).reverse()}return rl(e,d.distr,m,1)}function hp(t,e,n,i,s){let o=t.axes[n],a=o.scale,d=o._space,u=t.valToPos,f=De(u(1,a)-u(2,a));return f<d?rl(e.slice().reverse(),3,Lo,_t(d/f)).reverse():e}function mp(t,e,n,i){return i==null?ul:e==null?"":ml(e)}var Zr={show:!0,scale:"y",stroke:pl,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Po,side:3,grid:yl,ticks:Mo,border:To,font:_l,lineGap:Fo,rotate:0};function gp(t,e){let n=3+(t||1)*2;return ge(n*e,3)}function bp(t,e){let{scale:n,idxs:i}=t.series[0],s=t._data[0],o=t.valToPos(s[i[0]],n,!0),a=t.valToPos(s[i[1]],n,!0),d=De(a-o),u=t.series[e],f=d/(u.points.space*ce);return i[1]-i[0]<=f}var Qr={scale:null,auto:!0,sorted:0,min:me,max:-me},Do=(t,e,n,i,s)=>s,Xr={show:!0,auto:!0,sorted:0,gaps:Do,alpha:1,facets:[Te({},Qr,{scale:"x"}),Te({},Qr,{scale:"y"})]},eo={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:Do,alpha:1,points:{show:bp,filter:null},values:null,min:me,max:-me,idxs:[],path:null,clip:null};function vp(t,e,n,i,s){return n/10}var Ro={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},yp=Te({},Ro,{time:!1,ori:1}),to={};function zo(t,e){let n=to[t];return n||(n={key:t,plots:[],sub(i){n.plots.push(i)},unsub(i){n.plots=n.plots.filter(s=>s!=i)},pub(i,s,o,a,d,u,f){for(let b=0;b<n.plots.length;b++)n.plots[b]!=s&&n.plots[b].pub(i,s,o,a,d,u,f)}},t!=null&&(to[t]=n)),n}var Xi=1,ol=2;function Si(t,e,n){let i=t.mode,s=t.series[e],o=i==2?t._data[e]:t._data,a=t.scales,d=t.bbox,u=o[0],f=i==2?o[1]:o[e],b=i==2?a[s.facets[0].scale]:a[t.series[0].scale],m=i==2?a[s.facets[1].scale]:a[s.scale],v=d.left,A=d.top,E=d.width,I=d.height,U=t.valToPosH,V=t.valToPosV;return b.ori==0?n(s,u,f,b,m,U,V,v,A,E,I,os,tn,cs,Io,No):n(s,u,f,b,m,V,U,A,v,I,E,as,nn,Sl,Oo,Uo)}function wl(t,e){let n=0,i=0,s=oe(t.bands,gl);for(let o=0;o<s.length;o++){let a=s[o];a.series[0]==e?n=a.dir:a.series[1]==e&&(a.dir==1?i|=1:i|=2)}return[n,i==1?-1:i==2?1:i==3?2:0]}function _p(t,e,n,i,s){let o=t.mode,a=t.series[e],d=o==2?a.facets[1].scale:a.scale,u=t.scales[d];return s==-1?u.min:s==1?u.max:u.distr==3?u.dir==1?u.min:u.max:0}function Wt(t,e,n,i,s,o){return Si(t,e,(a,d,u,f,b,m,v,A,E,I,U)=>{let V=a.pxRound,x=f.dir*(f.ori==0?1:-1),O=f.ori==0?tn:nn,S,J;x==1?(S=n,J=i):(S=i,J=n);let P=V(m(d[S],f,I,A)),Z=V(v(u[S],b,U,E)),G=V(m(d[J],f,I,A)),te=V(v(o==1?b.max:b.min,b,U,E)),W=new Path2D(s);return O(W,G,te),O(W,P,te),O(W,P,Z),W})}function rs(t,e,n,i,s,o){let a=null;if(t.length>0){a=new Path2D;let d=e==0?cs:Sl,u=n;for(let m=0;m<t.length;m++){let v=t[m];if(v[1]>v[0]){let A=v[0]-u;A>0&&d(a,u,i,A,i+o),u=v[1]}}let f=n+s-u,b=10;f>0&&d(a,u,i-b/2,f,i+o+b)}return a}function wp(t,e,n){let i=t[t.length-1];i&&i[0]==e?i[1]=n:t.push([e,n])}function xl(t,e,n,i,s,o,a){let d=[],u=t.length;for(let f=s==1?n:i;f>=n&&f<=i;f+=s)if(e[f]===null){let m=f,v=f;if(s==1)for(;++f<=i&&e[f]===null;)v=f;else for(;--f>=n&&e[f]===null;)v=f;let A=o(t[m]),E=v==m?A:o(t[v]),I=m-s;A=a<=0&&I>=0&&I<u?o(t[I]):A;let V=v+s;E=a>=0&&V>=0&&V<u?o(t[V]):E,E>=A&&d.push([A,E])}return d}function io(t){return t==0?fo:t==1?Le:e=>vi(e,t)}function Ho(t){let e=t==0?os:as,n=t==0?(s,o,a,d,u,f)=>{s.arcTo(o,a,d,u,f)}:(s,o,a,d,u,f)=>{s.arcTo(a,o,u,d,f)},i=t==0?(s,o,a,d,u)=>{s.rect(o,a,d,u)}:(s,o,a,d,u)=>{s.rect(a,o,u,d)};return(s,o,a,d,u,f=0,b=0)=>{f==0&&b==0?i(s,o,a,d,u):(f=Tt(f,d/2,u/2),b=Tt(b,d/2,u/2),e(s,o+f,a),n(s,o+d,a,o+d,a+u,f),n(s,o+d,a+u,o,a+u,b),n(s,o,a+u,o,a,b),n(s,o,a,o+d,a,f),s.closePath())}}var os=(t,e,n)=>{t.moveTo(e,n)},as=(t,e,n)=>{t.moveTo(n,e)},tn=(t,e,n)=>{t.lineTo(e,n)},nn=(t,e,n)=>{t.lineTo(n,e)},cs=Ho(0),Sl=Ho(1),Io=(t,e,n,i,s,o)=>{t.arc(e,n,i,s,o)},Oo=(t,e,n,i,s,o)=>{t.arc(n,e,i,s,o)},No=(t,e,n,i,s,o,a)=>{t.bezierCurveTo(e,n,i,s,o,a)},Uo=(t,e,n,i,s,o,a)=>{t.bezierCurveTo(n,e,s,i,a,o)};function qo(t){return(e,n,i,s,o)=>Si(e,n,(a,d,u,f,b,m,v,A,E,I,U)=>{let{pxRound:V,points:x}=a,O,S;f.ori==0?(O=os,S=Io):(O=as,S=Oo);let J=ge(x.width*ce,3),P=(x.size-x.width)/2*ce,Z=ge(P*2,3),G=new Path2D,te=new Path2D,{left:W,top:$,width:Y,height:F}=e.bbox;cs(te,W-Z,$-Z,Y+Z*2,F+Z*2);let j=H=>{if(u[H]!=null){let ne=V(m(d[H],f,I,A)),z=V(v(u[H],b,U,E));O(G,ne+P,z),S(G,ne,z,P,0,Qn*2)}};if(o)o.forEach(j);else for(let H=i;H<=s;H++)j(H);return{stroke:J>0?G:null,fill:G,clip:te,flags:Xi|ol}})}function Vo(t){return(e,n,i,s,o,a)=>{i!=s&&(o!=i&&a!=i&&t(e,n,i),o!=s&&a!=s&&t(e,n,s),t(e,n,a))}}var xp=Vo(tn),Sp=Vo(nn);function jo(t){let e=oe(t?.alignGaps,0);return(n,i,s,o)=>Si(n,i,(a,d,u,f,b,m,v,A,E,I,U)=>{[s,o]=is(u,s,o);let V=a.pxRound,x=F=>V(m(F,f,I,A)),O=F=>V(v(F,b,U,E)),S,J;f.ori==0?(S=tn,J=xp):(S=nn,J=Sp);let P=f.dir*(f.ori==0?1:-1),Z={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},G=Z.stroke,te=!1;if(o-s>=I*4){let F=L=>n.posToVal(L,f.key,!0),j=null,H=null,ne,z,et,xe=x(d[P==1?s:o]),le=x(d[s]),fe=x(d[o]),Q=F(P==1?le+1:fe-1);for(let L=P==1?s:o;L>=s&&L<=o;L+=P){let Pe=d[L],Se=(P==1?Pe<Q:Pe>Q)?xe:x(Pe),pe=u[L];Se==xe?pe!=null?(z=pe,j==null?(S(G,Se,O(z)),ne=j=H=z):z<j?j=z:z>H&&(H=z)):pe===null&&(te=!0):(j!=null&&J(G,xe,O(j),O(H),O(ne),O(z)),pe!=null?(z=pe,S(G,Se,O(z)),j=H=ne=z):(j=H=null,pe===null&&(te=!0)),xe=Se,Q=F(xe+P))}j!=null&&j!=H&&et!=xe&&J(G,xe,O(j),O(H),O(ne),O(z))}else for(let F=P==1?s:o;F>=s&&F<=o;F+=P){let j=u[F];j===null?te=!0:j!=null&&S(G,x(d[F]),O(j))}let[$,Y]=wl(n,i);if(a.fill!=null||$!=0){let F=Z.fill=new Path2D(G),j=a.fillTo(n,i,a.min,a.max,$),H=O(j),ne=x(d[s]),z=x(d[o]);P==-1&&([z,ne]=[ne,z]),S(F,z,H),S(F,ne,H)}if(!a.spanGaps){let F=[];te&&F.push(...xl(d,u,s,o,P,x,e)),Z.gaps=F=a.gaps(n,i,s,o,F),Z.clip=rs(F,f.ori,A,E,I,U)}return Y!=0&&(Z.band=Y==2?[Wt(n,i,s,o,G,-1),Wt(n,i,s,o,G,1)]:Wt(n,i,s,o,G,Y)),Z})}function $p(t){let e=oe(t.align,1),n=oe(t.ascDesc,!1),i=oe(t.alignGaps,0),s=oe(t.extend,!1);return(o,a,d,u)=>Si(o,a,(f,b,m,v,A,E,I,U,V,x,O)=>{[d,u]=is(m,d,u);let S=f.pxRound,{left:J,width:P}=o.bbox,Z=le=>S(E(le,v,x,U)),G=le=>S(I(le,A,O,V)),te=v.ori==0?tn:nn,W={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},$=W.stroke,Y=v.dir*(v.ori==0?1:-1),F=G(m[Y==1?d:u]),j=Z(b[Y==1?d:u]),H=j,ne=j;s&&e==-1&&(ne=J,te($,ne,F)),te($,j,F);for(let le=Y==1?d:u;le>=d&&le<=u;le+=Y){let fe=m[le];if(fe==null)continue;let Q=Z(b[le]),L=G(fe);e==1?te($,Q,F):te($,H,L),te($,Q,L),F=L,H=Q}let z=H;s&&e==1&&(z=J+P,te($,z,F));let[et,xe]=wl(o,a);if(f.fill!=null||et!=0){let le=W.fill=new Path2D($),fe=f.fillTo(o,a,f.min,f.max,et),Q=G(fe);te(le,z,Q),te(le,ne,Q)}if(!f.spanGaps){let le=[];le.push(...xl(b,m,d,u,Y,Z,i));let fe=f.width*ce/2,Q=n||e==1?fe:-fe,L=n||e==-1?-fe:fe;le.forEach(Pe=>{Pe[0]+=Q,Pe[1]+=L}),W.gaps=le=f.gaps(o,a,d,u,le),W.clip=rs(le,v.ori,U,V,x,O)}return xe!=0&&(W.band=xe==2?[Wt(o,a,d,u,$,-1),Wt(o,a,d,u,$,1)]:Wt(o,a,d,u,$,xe)),W})}function no(t,e,n,i,s,o,a=me){if(t.length>1){let d=null;for(let u=0,f=1/0;u<t.length;u++)if(e[u]!==void 0){if(d!=null){let b=De(t[u]-t[d]);b<f&&(f=b,a=De(n(t[u],i,s,o)-n(t[d],i,s,o)))}d=u}}return a}function kp(t){t=t||En;let e=oe(t.size,[.6,me,1]),n=t.align||0,i=t.gap||0,s=t.radius;s=s==null?[0,0]:typeof s=="number"?[s,0]:s;let o=ie(s),a=1-e[0],d=oe(e[1],me),u=oe(e[2],1),f=oe(t.disp,En),b=oe(t.each,A=>{}),{fill:m,stroke:v}=f;return(A,E,I,U)=>Si(A,E,(V,x,O,S,J,P,Z,G,te,W,$)=>{let Y=V.pxRound,F=n,j=i*ce,H=d*ce,ne=u*ce,z,et;S.ori==0?[z,et]=o(A,E):[et,z]=o(A,E);let xe=S.dir*(S.ori==0?1:-1),le=S.ori==0?cs:Sl,fe=S.ori==0?b:(M,be,Fe,Ci,ri,Lt,oi)=>{b(M,be,Fe,ri,Ci,oi,Lt)},Q=oe(A.bands,gl).find(M=>M.series[0]==E),L=Q!=null?Q.dir:0,Pe=V.fillTo(A,E,V.min,V.max,L),Ge=Y(Z(Pe,J,$,te)),Se,pe,wt,st=W,ke=Y(V.width*ce),Ft=!1,Ut=null,ft=null,Kt=null,$i=null;m!=null&&(ke==0||v!=null)&&(Ft=!0,Ut=m.values(A,E,I,U),ft=new Map,new Set(Ut).forEach(M=>{M!=null&&ft.set(M,new Path2D)}),ke>0&&(Kt=v.values(A,E,I,U),$i=new Map,new Set(Kt).forEach(M=>{M!=null&&$i.set(M,new Path2D)})));let{x0:ki,size:rn}=f;if(ki!=null&&rn!=null){F=1,x=ki.values(A,E,I,U),ki.unit==2&&(x=x.map(Fe=>A.posToVal(G+Fe*W,S.key,!0)));let M=rn.values(A,E,I,U);rn.unit==2?pe=M[0]*W:pe=P(M[0],S,W,G)-P(0,S,W,G),st=no(x,O,P,S,W,G,st),wt=st-pe+j}else st=no(x,O,P,S,W,G,st),wt=st*a+j,pe=st-wt;wt<1&&(wt=0),ke>=pe/2&&(ke=0),wt<5&&(Y=fo);let Tn=wt>0,si=st-wt-(Tn?ke:0);pe=Y(sl(si,ne,H)),Se=(F==0?pe/2:F==xe?0:pe)-F*xe*((F==0?j/2:0)+(Tn?ke/2:0));let Ke={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Ai=Ft?null:new Path2D,qt=null;if(Q!=null)qt=A.data[Q.series[1]];else{let{y0:M,y1:be}=f;M!=null&&be!=null&&(O=be.values(A,E,I,U),qt=M.values(A,E,I,U))}let li=z*pe,K=et*pe;for(let M=xe==1?I:U;M>=I&&M<=U;M+=xe){let be=O[M];if(be==null)continue;if(qt!=null){let tt=qt[M]??0;if(be-tt==0)continue;Ge=Z(tt,J,$,te)}let Fe=S.distr!=2||f!=null?x[M]:M,Ci=P(Fe,S,W,G),ri=Z(oe(be,Pe),J,$,te),Lt=Y(Ci-Se),oi=Y(Xe(ri,Ge)),lt=Y(Tt(ri,Ge)),ht=oi-lt;if(be!=null){let tt=be<0?K:li,xt=be<0?li:K;Ft?(ke>0&&Kt[M]!=null&&le($i.get(Kt[M]),Lt,lt+ut(ke/2),pe,Xe(0,ht-ke),tt,xt),Ut[M]!=null&&le(ft.get(Ut[M]),Lt,lt+ut(ke/2),pe,Xe(0,ht-ke),tt,xt)):le(Ai,Lt,lt+ut(ke/2),pe,Xe(0,ht-ke),tt,xt),fe(A,E,M,Lt-ke/2,lt,pe+ke,ht)}}return ke>0?Ke.stroke=Ft?$i:Ai:Ft||(Ke._fill=V.width==0?V._fill:V._stroke??V._fill,Ke.width=0),Ke.fill=Ft?ft:Ai,Ke})}function Ap(t,e){let n=oe(e?.alignGaps,0);return(i,s,o,a)=>Si(i,s,(d,u,f,b,m,v,A,E,I,U,V)=>{[o,a]=is(f,o,a);let x=d.pxRound,O=z=>x(v(z,b,U,E)),S=z=>x(A(z,m,V,I)),J,P,Z;b.ori==0?(J=os,Z=tn,P=No):(J=as,Z=nn,P=Uo);let G=b.dir*(b.ori==0?1:-1),te=O(u[G==1?o:a]),W=te,$=[],Y=[];for(let z=G==1?o:a;z>=o&&z<=a;z+=G)if(f[z]!=null){let xe=u[z],le=O(xe);$.push(W=le),Y.push(S(f[z]))}let F={stroke:t($,Y,J,Z,P,x),fill:null,clip:null,band:null,gaps:null,flags:Xi},j=F.stroke,[H,ne]=wl(i,s);if(d.fill!=null||H!=0){let z=F.fill=new Path2D(j),et=d.fillTo(i,s,d.min,d.max,H),xe=S(et);Z(z,W,xe),Z(z,te,xe)}if(!d.spanGaps){let z=[];z.push(...xl(u,f,o,a,G,O,n)),F.gaps=z=d.gaps(i,s,o,a,z),F.clip=rs(z,b.ori,E,I,U,V)}return ne!=0&&(F.band=ne==2?[Wt(i,s,o,a,j,-1),Wt(i,s,o,a,j,1)]:Wt(i,s,o,a,j,ne)),F})}function Cp(t){return Ap(Ep,t)}function Ep(t,e,n,i,s,o){let a=t.length;if(a<2)return null;let d=new Path2D;if(n(d,t[0],e[0]),a==2)i(d,t[1],e[1]);else{let u=Array(a),f=Array(a-1),b=Array(a-1),m=Array(a-1);for(let v=0;v<a-1;v++)b[v]=e[v+1]-e[v],m[v]=t[v+1]-t[v],f[v]=b[v]/m[v];u[0]=f[0];for(let v=1;v<a-1;v++)f[v]===0||f[v-1]===0||f[v-1]>0!=f[v]>0?u[v]=0:(u[v]=3*(m[v-1]+m[v])/((2*m[v]+m[v-1])/f[v-1]+(m[v]+2*m[v-1])/f[v]),isFinite(u[v])||(u[v]=0));u[a-1]=f[a-2];for(let v=0;v<a-1;v++)s(d,t[v]+m[v]/3,e[v]+u[v]*m[v]/3,t[v+1]-m[v]/3,e[v+1]-u[v+1]*m[v]/3,t[v+1],e[v+1])}return d}var al=new Set;function so(){for(let t of al)t.syncRect(!0)}en&&(wi(ac,Yi,so),wi(cc,Yi,so,!0),wi(Xn,Yi,()=>{Ue.pxRatio=ce}));var Mp=jo(),Tp=qo();function lo(t,e,n,i){return(i?[t[0],t[1]].concat(t.slice(2)):[t[0]].concat(t.slice(1))).map((o,a)=>cl(o,a,e,n))}function Pp(t,e){return t.map((n,i)=>i==0?{}:Te({},e,n))}function cl(t,e,n,i){return Te({},e==0?n:i,t)}function Bo(t,e,n){return e==null?Zi:[e,n]}var Fp=Bo;function Lp(t,e,n){return e==null?Zi:es(e,n,hl,!0)}function Wo(t,e,n,i){return e==null?Zi:ns(e,n,t.scales[i].log,!1)}var Dp=Wo;function Go(t,e,n,i){return e==null?Zi:fl(e,n,t.scales[i].log,!1)}var Rp=Go;function zp(t,e,n,i,s){let o=Xe(Hr(t),Hr(e)),a=e-t,d=Mt(s/i*a,n);do{let u=n[d],f=i*u/a;if(f>=s&&o+(u<5?ii.get(u):0)<=17)return[u,f]}while(++d<n.length);return[0,0]}function ro(t){let e,n;return t=t.replace(/(\d+)px/,(i,s)=>(e=Le((n=+s)*ce))+"px"),[t,e,n]}function Hp(t){t.show&&[t.font,t.labelFont].forEach(e=>{let n=ge(e[2]*ce,1);e[0]=e[0].replace(/[0-9.]+px/,n+"px"),e[1]=n})}function Ue(t,e,n){let i={mode:oe(t.mode,1)},s=i.mode;function o(l,r,c,p){let h=r.valToPct(l);return p+c*(r.dir==-1?1-h:h)}function a(l,r,c,p){let h=r.valToPct(l);return p+c*(r.dir==-1?h:1-h)}function d(l,r,c,p){return r.ori==0?o(l,r,c,p):a(l,r,c,p)}i.valToPosH=o,i.valToPosV=a;let u=!1;i.status=0;let f=i.root=yt(ja);if(t.id!=null&&(f.id=t.id),pt(f,t.class),t.title){let l=yt(Ga,f);l.textContent=t.title}let b=Et("canvas"),m=i.ctx=b.getContext("2d"),v=yt(Ka,f);wi("click",v,l=>{l.target===E&&(ve!=Ii||$e!=Oi)&&je.click(i,l)},!0);let A=i.under=yt(Ya,v);v.appendChild(b);let E=i.over=yt(Ja,v);t=Qi(t);let I=+oe(t.pxAlign,1),U=io(I);(t.plugins||[]).forEach(l=>{l.opts&&(t=l.opts(i,t)||t)});let V=t.ms||.001,x=i.series=s==1?lo(t.series||[],Yr,eo,!1):Pp(t.series||[null],Xr),O=i.axes=lo(t.axes||[],Kr,Zr,!0),S=i.scales={},J=i.bands=t.bands||[];J.forEach(l=>{l.fill=ie(l.fill||null),l.dir=oe(l.dir,-1)});let P=s==2?x[1].facets[0].scale:x[0].scale,Z={axes:pa,series:la},G=(t.drawOrder||["axes","series"]).map(l=>Z[l]);function te(l){let r=l.distr==3?c=>Bt(c>0?c:l.clamp(i,c,l.min,l.max,l.key)):l.distr==4?c=>Js(c,l.asinh):l.distr==100?c=>l.fwd(c):c=>c;return c=>{let p=r(c),{_min:h,_max:g}=l,y=g-h;return(p-h)/y}}function W(l){let r=S[l];if(r==null){let c=(t.scales||En)[l]||En;if(c.from!=null){W(c.from);let p=Te({},S[c.from],c,{key:l});p.valToPct=te(p),S[l]=p}else{r=S[l]=Te({},l==P?Ro:yp,c),r.key=l;let p=r.time,h=r.range,g=ti(h);if((l!=P||s==2&&!p)&&(g&&(h[0]==null||h[1]==null)&&(h={min:h[0]==null?Dr:{mode:1,hard:h[0],soft:h[0]},max:h[1]==null?Dr:{mode:1,hard:h[1],soft:h[1]}},g=!1),!g&&ls(h))){let y=h;h=(_,w,k)=>w==null?Zi:es(w,k,y)}r.range=ie(h||(p?Fp:l==P?r.distr==3?Dp:r.distr==4?Rp:Bo:r.distr==3?Wo:r.distr==4?Go:Lp)),r.auto=ie(g?!1:r.auto),r.clamp=ie(r.clamp||vp),r._min=r._max=null,r.valToPct=te(r)}}}W("x"),W("y"),s==1&&x.forEach(l=>{W(l.scale)}),O.forEach(l=>{W(l.scale)});for(let l in t.scales)W(l);let $=S[P],Y=$.distr,F,j;$.ori==0?(pt(f,Ba),F=o,j=a):(pt(f,Wa),F=a,j=o);let H={};for(let l in S){let r=S[l];(r.min!=null||r.max!=null)&&(H[l]={min:r.min,max:r.max},r.min=r.max=null)}let ne=t.tzDate||(l=>new Date(Le(l/V))),z=t.fmtDate||bl,et=V==1?Bc(ne):Kc(ne),xe=Br(ne,jr(V==1?jc:Gc,z)),le=Gr(ne,Wr(Jc,z)),fe=[],Q=i.legend=Te({},Xc,t.legend),L=i.cursor=Te({},lp,{drag:{y:s==2}},t.cursor),Pe=Q.show,Ge=L.show,Se=Q.markers;Q.idxs=fe,Se.width=ie(Se.width),Se.dash=ie(Se.dash),Se.stroke=ie(Se.stroke),Se.fill=ie(Se.fill);let pe,wt,st,ke=[],Ft=[],Ut,ft=!1,Kt={};if(Q.live){let l=x[1]?x[1].values:null;ft=l!=null,Ut=ft?l(i,1,0):{_:0};for(let r in Ut)Kt[r]=ul}if(Pe)if(pe=Et("table",ic,f),st=Et("tbody",null,pe),Q.mount(i,pe),ft){wt=Et("thead",null,pe,st);let l=Et("tr",null,wt);Et("th",null,l);for(var $i in Ut)Et("th",wr,l).textContent=$i}else pt(pe,sc),Q.live&&pt(pe,nc);let ki={show:!0},rn={show:!1};function Tn(l,r){if(r==0&&(ft||!Q.live||s==2))return Zi;let c=[],p=Et("tr",lc,st,st.childNodes[r]);pt(p,l.class),l.show||pt(p,_i);let h=Et("th",null,p);if(Se.show){let _=yt(rc,h);if(r>0){let w=Se.width(i,r);w&&(_.style.border=w+"px "+Se.dash(i,r)+" "+Se.stroke(i,r)),_.style.background=Se.fill(i,r)}}let g=yt(wr,h);l.label instanceof HTMLElement?g.appendChild(l.label):g.textContent=l.label,r>0&&(Se.show||(g.style.color=l.width>0?Se.stroke(i,r):Se.fill(i,r)),Ke("click",h,_=>{if(L._lock)return;ci(_);let w=x.indexOf(l);if((_.ctrlKey||_.metaKey)!=Q.isolate){let k=x.some((C,T)=>T>0&&T!=w&&C.show);x.forEach((C,T)=>{T>0&&Rt(T,k?T==w?ki:rn:ki,!0,Me.setSeries)})}else Rt(w,{show:!l.show},!0,Me.setSeries)},!1),Mi&&Ke(kr,h,_=>{L._lock||(ci(_),Rt(x.indexOf(l),Ui,!0,Me.setSeries))},!1));for(var y in Ut){let _=Et("td",oc,p);_.textContent="--",c.push(_)}return[p,c]}let si=new Map;function Ke(l,r,c,p=!0){let h=si.get(r)||{},g=L.bind[l](i,r,c,p);g&&(wi(l,r,h[l]=g),si.set(r,h))}function Ai(l,r,c){let p=si.get(r)||{};for(let h in p)(l==null||h==l)&&(nl(h,r,p[h]),delete p[h]);l==null&&si.delete(r)}let qt=0,li=0,K=0,M=0,be=0,Fe=0,Ci=be,ri=Fe,Lt=K,oi=M,lt=0,ht=0,tt=0,xt=0;i.bbox={};let ps=!1,Pn=!1,Ei=!1,ai=!1,Fn=!1,mt=!1;function us(l,r,c){(c||l!=i.width||r!=i.height)&&$l(l,r),Di(!1),Ei=!0,Pn=!0,Ri()}function $l(l,r){i.width=qt=K=l,i.height=li=M=r,be=Fe=0,Qo(),Xo();let c=i.bbox;lt=c.left=vi(be*ce,.5),ht=c.top=vi(Fe*ce,.5),tt=c.width=vi(K*ce,.5),xt=c.height=vi(M*ce,.5)}let Yo=3;function Jo(){let l=!1,r=0;for(;!l;){r++;let c=aa(r),p=ca(r);l=r==Yo||c&&p,l||($l(i.width,i.height),Pn=!0)}}function Zo({width:l,height:r}){us(l,r)}i.setSize=Zo;function Qo(){let l=!1,r=!1,c=!1,p=!1;O.forEach((h,g)=>{if(h.show&&h._show){let{side:y,_size:_}=h,w=y%2,k=h.label!=null?h.labelSize:0,C=_+k;C>0&&(w?(K-=C,y==3?(be+=C,p=!0):c=!0):(M-=C,y==0?(Fe+=C,l=!0):r=!0))}}),pi[0]=l,pi[1]=c,pi[2]=r,pi[3]=p,K-=Yt[1]+Yt[3],be+=Yt[3],M-=Yt[2]+Yt[0],Fe+=Yt[0]}function Xo(){let l=be+K,r=Fe+M,c=be,p=Fe;function h(g,y){switch(g){case 1:return l+=y,l-y;case 2:return r+=y,r-y;case 3:return c-=y,c+y;case 0:return p-=y,p+y}}O.forEach((g,y)=>{if(g.show&&g._show){let _=g.side;g._pos=h(_,g._size),g.label!=null&&(g._lpos=h(_,g.labelSize))}})}if(L.dataIdx==null){let l=L.hover,r=l.skip=new Set(l.skip??[]);r.add(void 0);let c=l.prox=ie(l.prox),p=l.bias??=0;L.dataIdx=(h,g,y,_)=>{if(g==0)return y;let w=y,k=c(h,g,y,_)??me,C=k>=0&&k<me,T=$.ori==0?K:M,B=L.left,ae=e[0],re=e[g];if(r.has(re[y])){w=null;let X=null,q=null,D;if(p==0||p==-1)for(D=y;X==null&&D-- >0;)r.has(re[D])||(X=D);if(p==0||p==1)for(D=y;q==null&&D++<re.length;)r.has(re[D])||(q=D);if(X!=null||q!=null)if(C){let _e=X==null?-1/0:F(ae[X],$,T,0),Ae=q==null?1/0:F(ae[q],$,T,0),Ne=B-_e,he=Ae-B;Ne<=he?Ne<=k&&(w=X):he<=k&&(w=q)}else w=q==null?X:X==null?q:y-X<=q-y?X:q}else C&&De(B-F(ae[y],$,T,0))>k&&(w=null);return w}}let ci=l=>{L.event=l};L.idxs=fe,L._lock=!1;let Be=L.points;Be.show=ie(Be.show),Be.size=ie(Be.size),Be.stroke=ie(Be.stroke),Be.width=ie(Be.width),Be.fill=ie(Be.fill);let Dt=i.focus=Te({},t.focus||{alpha:.3},L.focus),Mi=Dt.prox>=0,Ti=Mi&&Be.one,gt=[],Pi=[],Fi=[];function kl(l,r){let c=Be.show(i,r);if(c instanceof HTMLElement)return pt(c,tc),pt(c,l.class),Nt(c,-10,-10,K,M),E.insertBefore(c,gt[r]),c}function Al(l,r){if(s==1||r>0){let c=s==1&&S[l.scale].time,p=l.value;l.value=c?Nr(p)?Gr(ne,Wr(p,z)):p||le:p||mp,l.label=l.label||(c?op:rp)}if(Ti||r>0){l.width=l.width==null?1:l.width,l.paths=l.paths||Mp||yc,l.fillTo=ie(l.fillTo||_p),l.pxAlign=+oe(l.pxAlign,I),l.pxRound=io(l.pxAlign),l.stroke=ie(l.stroke||null),l.fill=ie(l.fill||null),l._stroke=l._fill=l._paths=l._focus=null;let c=gp(Xe(1,l.width),1),p=l.points=Te({},{size:c,width:Xe(1,c*.2),stroke:l.stroke,space:c*2,paths:Tp,_stroke:null,_fill:null},l.points);p.show=ie(p.show),p.filter=ie(p.filter),p.fill=ie(p.fill),p.stroke=ie(p.stroke),p.paths=ie(p.paths),p.pxAlign=l.pxAlign}if(Pe){let c=Tn(l,r);ke.splice(r,0,c[0]),Ft.splice(r,0,c[1]),Q.values.push(null)}if(Ge){fe.splice(r,0,null);let c=null;Ti?r==0&&(c=kl(l,r)):r>0&&(c=kl(l,r)),gt.splice(r,0,c),Pi.splice(r,0,0),Fi.splice(r,0,0)}Oe("addSeries",r)}function ea(l,r){r=r??x.length,l=s==1?cl(l,r,Yr,eo):cl(l,r,{},Xr),x.splice(r,0,l),Al(x[r],r)}i.addSeries=ea;function ta(l){if(x.splice(l,1),Pe){Q.values.splice(l,1),Ft.splice(l,1);let r=ke.splice(l,1)[0];Ai(null,r.firstChild),r.remove()}Ge&&(fe.splice(l,1),gt.splice(l,1)[0].remove(),Pi.splice(l,1),Fi.splice(l,1)),Oe("delSeries",l)}i.delSeries=ta;let pi=[!1,!1,!1,!1];function ia(l,r){if(l._show=l.show,l.show){let c=l.side%2,p=S[l.scale];p==null&&(l.scale=c?x[1].scale:P,p=S[l.scale]);let h=p.time;l.size=ie(l.size),l.space=ie(l.space),l.rotate=ie(l.rotate),ti(l.incrs)&&l.incrs.forEach(y=>{!ii.has(y)&&ii.set(y,go(y))}),l.incrs=ie(l.incrs||(p.distr==2?Uc:h?V==1?Vc:Wc:yi)),l.splits=ie(l.splits||(h&&p.distr==1?et:p.distr==3?ll:p.distr==4?pp:cp)),l.stroke=ie(l.stroke),l.grid.stroke=ie(l.grid.stroke),l.ticks.stroke=ie(l.ticks.stroke),l.border.stroke=ie(l.border.stroke);let g=l.values;l.values=ti(g)&&!ti(g[0])?ie(g):h?ti(g)?Br(ne,jr(g,z)):Nr(g)?Yc(ne,g):g||xe:g||ap,l.filter=ie(l.filter||(p.distr>=3&&p.log==10?fp:p.distr==3&&p.log==2?hp:ho)),l.font=ro(l.font),l.labelFont=ro(l.labelFont),l._size=l.size(i,null,r,0),l._space=l._rotate=l._incrs=l._found=l._splits=l._values=null,l._size>0&&(pi[r]=!0,l._el=yt(Za,v))}}function on(l,r,c,p){let[h,g,y,_]=c,w=r%2,k=0;return w==0&&(_||g)&&(k=r==0&&!h||r==2&&!y?Le(Kr.size/3):0),w==1&&(h||y)&&(k=r==1&&!g||r==3&&!_?Le(Zr.size/2):0),k}let Cl=i.padding=(t.padding||[on,on,on,on]).map(l=>ie(oe(l,on))),Yt=i._padding=Cl.map((l,r)=>l(i,r,pi,0)),Ve,Re=null,ze=null,Ln=s==1?x[0].idxs:null,St=null,an=!1;function El(l,r){if(e=l??[],i.data=i._data=e,s==2){Ve=0;for(let c=1;c<x.length;c++)Ve+=e[c][0].length}else{e.length==0&&(i.data=i._data=e=[[]]),St=e[0],Ve=St.length;let c=e;if(Y==2){c=e.slice();let p=c[0]=Array(Ve);for(let h=0;h<Ve;h++)p[h]=h}i._data=e=c}if(Di(!0),Oe("setData"),Y==2&&(Ei=!0),r!==!1){let c=$;c.auto(i,an)?ds():Zt(P,c.min,c.max),ai=ai||L.left>=0,mt=!0,Ri()}}i.setData=El;function ds(){an=!0;let l,r;s==1&&(Ve>0?(Re=Ln[0]=0,ze=Ln[1]=Ve-1,l=e[0][Re],r=e[0][ze],Y==2?(l=Re,r=ze):l==r&&(Y==3?[l,r]=ns(l,l,$.log,!1):Y==4?[l,r]=fl(l,l,$.log,!1):$.time?r=l+Le(86400/V):[l,r]=es(l,r,hl,!0))):(Re=Ln[0]=l=null,ze=Ln[1]=r=null)),Zt(P,l,r)}let Dn,Li,fs,hs,ms,gs,bs,vs,ys,it;function Ml(l,r,c,p,h,g){l??=Sr,c??=gl,p??="butt",h??=Sr,g??="round",l!=Dn&&(m.strokeStyle=Dn=l),h!=Li&&(m.fillStyle=Li=h),r!=fs&&(m.lineWidth=fs=r),g!=ms&&(m.lineJoin=ms=g),p!=gs&&(m.lineCap=gs=p),c!=hs&&m.setLineDash(hs=c)}function Tl(l,r,c,p){r!=Li&&(m.fillStyle=Li=r),l!=bs&&(m.font=bs=l),c!=vs&&(m.textAlign=vs=c),p!=ys&&(m.textBaseline=ys=p)}function _s(l,r,c,p,h=0){if(p.length>0&&l.auto(i,an)&&(r==null||r.min==null)){let g=oe(Re,0),y=oe(ze,p.length-1),_=c.min==null?fc(p,g,y,h,l.distr==3):[c.min,c.max];l.min=Tt(l.min,c.min=_[0]),l.max=Xe(l.max,c.max=_[1])}}let Pl={min:null,max:null};function na(){for(let p in S){let h=S[p];H[p]==null&&(h.min==null||H[P]!=null&&h.auto(i,an))&&(H[p]=Pl)}for(let p in S){let h=S[p];H[p]==null&&h.from!=null&&H[h.from]!=null&&(H[p]=Pl)}H[P]!=null&&Di(!0);let l={};for(let p in H){let h=H[p];if(h!=null){let g=l[p]=Qi(S[p],xc);if(h.min!=null)Te(g,h);else if(p!=P||s==2)if(Ve==0&&g.from==null){let y=g.range(i,null,null,p);g.min=y[0],g.max=y[1]}else g.min=me,g.max=-me}}if(Ve>0){x.forEach((p,h)=>{if(s==1){let g=p.scale,y=H[g];if(y==null)return;let _=l[g];if(h==0){let w=_.range(i,_.min,_.max,g);_.min=w[0],_.max=w[1],Re=Mt(_.min,e[0]),ze=Mt(_.max,e[0]),ze-Re>1&&(e[0][Re]<_.min&&Re++,e[0][ze]>_.max&&ze--),p.min=St[Re],p.max=St[ze]}else p.show&&p.auto&&_s(_,y,p,e[h],p.sorted);p.idxs[0]=Re,p.idxs[1]=ze}else if(h>0&&p.show&&p.auto){let[g,y]=p.facets,_=g.scale,w=y.scale,[k,C]=e[h],T=l[_],B=l[w];T!=null&&_s(T,H[_],g,k,g.sorted),B!=null&&_s(B,H[w],y,C,y.sorted),p.min=y.min,p.max=y.max}});for(let p in l){let h=l[p],g=H[p];if(h.from==null&&(g==null||g.min==null)){let y=h.range(i,h.min==me?null:h.min,h.max==-me?null:h.max,p);h.min=y[0],h.max=y[1]}}}for(let p in l){let h=l[p];if(h.from!=null){let g=l[h.from];if(g.min==null)h.min=h.max=null;else{let y=h.range(i,g.min,g.max,p);h.min=y[0],h.max=y[1]}}}let r={},c=!1;for(let p in l){let h=l[p],g=S[p];if(g.min!=h.min||g.max!=h.max){g.min=h.min,g.max=h.max;let y=g.distr;g._min=y==3?Bt(g.min):y==4?Js(g.min,g.asinh):y==100?g.fwd(g.min):g.min,g._max=y==3?Bt(g.max):y==4?Js(g.max,g.asinh):y==100?g.fwd(g.max):g.max,r[p]=c=!0}}if(c){x.forEach((p,h)=>{s==2?h>0&&r.y&&(p._paths=null):r[p.scale]&&(p._paths=null)});for(let p in r)Ei=!0,Oe("setScale",p);Ge&&L.left>=0&&(ai=mt=!0)}for(let p in H)H[p]=null}function sa(l){let r=sl(Re-1,0,Ve-1),c=sl(ze+1,0,Ve-1);for(;l[r]==null&&r>0;)r--;for(;l[c]==null&&c<Ve-1;)c++;return[r,c]}function la(){if(Ve>0){let l=x.some(r=>r._focus)&&it!=Dt.alpha;l&&(m.globalAlpha=it=Dt.alpha),x.forEach((r,c)=>{if(c>0&&r.show&&(Fl(c,!1),Fl(c,!0),r._paths==null)){let p=it;it!=r.alpha&&(m.globalAlpha=it=r.alpha);let h=s==2?[0,e[c][0].length-1]:sa(e[c]);r._paths=r.paths(i,c,h[0],h[1]),it!=p&&(m.globalAlpha=it=p)}}),x.forEach((r,c)=>{if(c>0&&r.show){let p=it;it!=r.alpha&&(m.globalAlpha=it=r.alpha),r._paths!=null&&Ll(c,!1);{let h=r._paths!=null?r._paths.gaps:null,g=r.points.show(i,c,Re,ze,h),y=r.points.filter(i,c,g,h);(g||y)&&(r.points._paths=r.points.paths(i,c,Re,ze,y),Ll(c,!0))}it!=p&&(m.globalAlpha=it=p),Oe("drawSeries",c)}}),l&&(m.globalAlpha=it=1)}}function Fl(l,r){let c=r?x[l].points:x[l];c._stroke=c.stroke(i,l),c._fill=c.fill(i,l)}function Ll(l,r){let c=r?x[l].points:x[l],{stroke:p,fill:h,clip:g,flags:y,_stroke:_=c._stroke,_fill:w=c._fill,_width:k=c.width}=c._paths;k=ge(k*ce,3);let C=null,T=k%2/2;r&&w==null&&(w=k>0?"#fff":_);let B=c.pxAlign==1&&T>0;if(B&&m.translate(T,T),!r){let ae=lt-k/2,re=ht-k/2,X=tt+k,q=xt+k;C=new Path2D,C.rect(ae,re,X,q)}r?ws(_,k,c.dash,c.cap,w,p,h,y,g):ra(l,_,k,c.dash,c.cap,w,p,h,y,C,g),B&&m.translate(-T,-T)}function ra(l,r,c,p,h,g,y,_,w,k,C){let T=!1;w!=0&&J.forEach((B,ae)=>{if(B.series[0]==l){let re=x[B.series[1]],X=e[B.series[1]],q=(re._paths||En).band;ti(q)&&(q=B.dir==1?q[0]:q[1]);let D,_e=null;re.show&&q&&mc(X,Re,ze)?(_e=B.fill(i,ae)||g,D=re._paths.clip):q=null,ws(r,c,p,h,_e,y,_,w,k,C,D,q),T=!0}}),T||ws(r,c,p,h,g,y,_,w,k,C)}let Dl=Xi|ol;function ws(l,r,c,p,h,g,y,_,w,k,C,T){Ml(l,r,c,p,h),(w||k||T)&&(m.save(),w&&m.clip(w),k&&m.clip(k)),T?(_&Dl)==Dl?(m.clip(T),C&&m.clip(C),zn(h,y),Rn(l,g,r)):_&ol?(zn(h,y),m.clip(T),Rn(l,g,r)):_&Xi&&(m.save(),m.clip(T),C&&m.clip(C),zn(h,y),m.restore(),Rn(l,g,r)):(zn(h,y),Rn(l,g,r)),(w||k||T)&&m.restore()}function Rn(l,r,c){c>0&&(r instanceof Map?r.forEach((p,h)=>{m.strokeStyle=Dn=h,m.stroke(p)}):r!=null&&l&&m.stroke(r))}function zn(l,r){r instanceof Map?r.forEach((c,p)=>{m.fillStyle=Li=p,m.fill(c)}):r!=null&&l&&m.fill(r)}function oa(l,r,c,p){let h=O[l],g;if(p<=0)g=[0,0];else{let y=h._space=h.space(i,l,r,c,p),_=h._incrs=h.incrs(i,l,r,c,p,y);g=zp(r,c,_,p,y)}return h._found=g}function xs(l,r,c,p,h,g,y,_,w,k){let C=y%2/2;I==1&&m.translate(C,C),Ml(_,y,w,k,_),m.beginPath();let T,B,ae,re,X=h+(p==0||p==3?-g:g);c==0?(B=h,re=X):(T=h,ae=X);for(let q=0;q<l.length;q++)r[q]!=null&&(c==0?T=ae=l[q]:B=re=l[q],m.moveTo(T,B),m.lineTo(ae,re));m.stroke(),I==1&&m.translate(-C,-C)}function aa(l){let r=!0;return O.forEach((c,p)=>{if(!c.show)return;let h=S[c.scale];if(h.min==null){c._show&&(r=!1,c._show=!1,Di(!1));return}else c._show||(r=!1,c._show=!0,Di(!1));let g=c.side,y=g%2,{min:_,max:w}=h,[k,C]=oa(p,_,w,y==0?K:M);if(C==0)return;let T=h.distr==2,B=c._splits=c.splits(i,p,_,w,k,C,T),ae=h.distr==2?B.map(D=>St[D]):B,re=h.distr==2?St[B[1]]-St[B[0]]:k,X=c._values=c.values(i,c.filter(i,ae,p,C,re),p,C,re);c._rotate=g==2?c.rotate(i,X,p,C):0;let q=c._size;c._size=_t(c.size(i,X,p,l)),q!=null&&c._size!=q&&(r=!1)}),r}function ca(l){let r=!0;return Cl.forEach((c,p)=>{let h=c(i,p,pi,l);h!=Yt[p]&&(r=!1),Yt[p]=h}),r}function pa(){for(let l=0;l<O.length;l++){let r=O[l];if(!r.show||!r._show)continue;let c=r.side,p=c%2,h,g,y=r.stroke(i,l),_=c==0||c==3?-1:1,[w,k]=r._found;if(r.label!=null){let Je=r.labelGap*_,at=Le((r._lpos+Je)*ce);Tl(r.labelFont[0],y,"center",c==2?"top":xr),m.save(),p==1?(h=g=0,m.translate(at,Le(ht+xt/2)),m.rotate((c==3?-Qn:Qn)/2)):(h=Le(lt+tt/2),g=at);let fi=uo(r.label)?r.label(i,l,w,k):r.label;m.fillText(fi,h,g),m.restore()}if(k==0)continue;let C=S[r.scale],T=p==0?tt:xt,B=p==0?lt:ht,ae=r._splits,re=C.distr==2?ae.map(Je=>St[Je]):ae,X=C.distr==2?St[ae[1]]-St[ae[0]]:w,q=r.ticks,D=r.border,_e=q.show?q.size:0,Ae=Le(_e*ce),Ne=Le((r.alignTo==2?r._size-_e-r.gap:r.gap)*ce),he=r._rotate*-Qn/180,Ce=U(r._pos*ce),rt=(Ae+Ne)*_,Ye=Ce+rt;g=p==0?Ye:0,h=p==1?Ye:0;let bt=r.font[0],$t=r.align==1?Gi:r.align==2?Gs:he>0?Gi:he<0?Gs:p==0?"center":c==3?Gs:Gi,Ht=he||p==1?"middle":c==2?"top":xr;Tl(bt,y,$t,Ht);let ot=r.font[1]*r.lineGap,vt=ae.map(Je=>U(d(Je,C,T,B))),kt=r._values;for(let Je=0;Je<kt.length;Je++){let at=kt[Je];if(at!=null){p==0?h=vt[Je]:g=vt[Je],at=""+at;let fi=at.indexOf(`
`)==-1?[at]:at.split(/\n/gm);for(let Ze=0;Ze<fi.length;Ze++){let Xl=fi[Ze];he?(m.save(),m.translate(h,g+Ze*ot),m.rotate(he),m.fillText(Xl,0,0),m.restore()):m.fillText(Xl,h,g+Ze*ot)}}}q.show&&xs(vt,q.filter(i,re,l,k,X),p,c,Ce,Ae,ge(q.width*ce,3),q.stroke(i,l),q.dash,q.cap);let It=r.grid;It.show&&xs(vt,It.filter(i,re,l,k,X),p,p==0?2:1,p==0?ht:lt,p==0?xt:tt,ge(It.width*ce,3),It.stroke(i,l),It.dash,It.cap),D.show&&xs([Ce],[1],p==0?1:0,p==0?1:2,p==1?ht:lt,p==1?xt:tt,ge(D.width*ce,3),D.stroke(i,l),D.dash,D.cap)}Oe("drawAxes")}function Di(l){x.forEach((r,c)=>{c>0&&(r._paths=null,l&&(s==1?(r.min=null,r.max=null):r.facets.forEach(p=>{p.min=null,p.max=null})))})}let Hn=!1,Ss=!1,cn=[];function ua(){Ss=!1;for(let l=0;l<cn.length;l++)Oe(...cn[l]);cn.length=0}function Ri(){Hn||(Mc(Rl),Hn=!0)}function da(l,r=!1){Hn=!0,Ss=r,l(i),Rl(),r&&cn.length>0&&queueMicrotask(ua)}i.batch=da;function Rl(){if(ps&&(na(),ps=!1),Ei&&(Jo(),Ei=!1),Pn){if(we(A,Gi,be),we(A,"top",Fe),we(A,$n,K),we(A,kn,M),we(E,Gi,be),we(E,"top",Fe),we(E,$n,K),we(E,kn,M),we(v,$n,qt),we(v,kn,li),b.width=Le(qt*ce),b.height=Le(li*ce),O.forEach(({_el:l,_show:r,_size:c,_pos:p,side:h})=>{if(l!=null)if(r){let g=h===3||h===0?c:0,y=h%2==1;we(l,y?"left":"top",p-g),we(l,y?"width":"height",c),we(l,y?"top":"left",y?Fe:be),we(l,y?"height":"width",y?M:K),il(l,_i)}else pt(l,_i)}),Dn=Li=fs=ms=gs=bs=vs=ys=hs=null,it=1,dn(!0),be!=Ci||Fe!=ri||K!=Lt||M!=oi){Di(!1);let l=K/Lt,r=M/oi;if(Ge&&!ai&&L.left>=0){L.left*=l,L.top*=r,zi&&Nt(zi,Le(L.left),0,K,M),Hi&&Nt(Hi,0,Le(L.top),K,M);for(let c=0;c<gt.length;c++){let p=gt[c];p!=null&&(Pi[c]*=l,Fi[c]*=r,Nt(p,_t(Pi[c]),_t(Fi[c]),K,M))}}if(ye.show&&!Fn&&ye.left>=0&&ye.width>0){ye.left*=l,ye.width*=l,ye.top*=r,ye.height*=r;for(let c in Ms)we(Ni,c,ye[c])}Ci=be,ri=Fe,Lt=K,oi=M}Oe("setSize"),Pn=!1}qt>0&&li>0&&(m.clearRect(0,0,b.width,b.height),Oe("drawClear"),G.forEach(l=>l()),Oe("draw")),ye.show&&Fn&&(In(ye),Fn=!1),Ge&&ai&&(di(null,!0,!1),ai=!1),Q.show&&Q.live&&mt&&(Cs(),mt=!1),u||(u=!0,i.status=1,Oe("ready")),an=!1,Hn=!1}i.redraw=(l,r)=>{Ei=r||!1,l!==!1?Zt(P,$.min,$.max):Ri()};function $s(l,r){let c=S[l];if(c.from==null){if(Ve==0){let p=c.range(i,r.min,r.max,l);r.min=p[0],r.max=p[1]}if(r.min>r.max){let p=r.min;r.min=r.max,r.max=p}if(Ve>1&&r.min!=null&&r.max!=null&&r.max-r.min<1e-16)return;l==P&&c.distr==2&&Ve>0&&(r.min=Mt(r.min,e[0]),r.max=Mt(r.max,e[0]),r.min==r.max&&r.max++),H[l]=r,ps=!0,Ri()}}i.setScale=$s;let ks,As,zi,Hi,zl,Hl,Ii,Oi,Il,Ol,ve,$e,Jt=!1,je=L.drag,He=je.x,Ie=je.y;Ge&&(L.x&&(ks=yt(Xa,E)),L.y&&(As=yt(ec,E)),$.ori==0?(zi=ks,Hi=As):(zi=As,Hi=ks),ve=L.left,$e=L.top);let ye=i.select=Te({show:!0,over:!0,left:0,width:0,top:0,height:0},t.select),Ni=ye.show?yt(Qa,ye.over?E:A):null;function In(l,r){if(ye.show){for(let c in l)ye[c]=l[c],c in Ms&&we(Ni,c,l[c]);r!==!1&&Oe("setSelect")}}i.setSelect=In;function fa(l){if(x[l].show)Pe&&il(ke[l],_i);else if(Pe&&pt(ke[l],_i),Ge){let c=Ti?gt[0]:gt[l];c!=null&&Nt(c,-10,-10,K,M)}}function Zt(l,r,c){$s(l,{min:r,max:c})}function Rt(l,r,c,p){r.focus!=null&&va(l),r.show!=null&&x.forEach((h,g)=>{g>0&&(l==g||l==null)&&(h.show=r.show,fa(g),s==2?(Zt(h.facets[0].scale,null,null),Zt(h.facets[1].scale,null,null)):Zt(h.scale,null,null),Ri())}),c!==!1&&Oe("setSeries",l,r),p&&fn("setSeries",i,l,r)}i.setSeries=Rt;function ha(l,r){Te(J[l],r)}function ma(l,r){l.fill=ie(l.fill||null),l.dir=oe(l.dir,-1),r=r??J.length,J.splice(r,0,l)}function ga(l){l==null?J.length=0:J.splice(l,1)}i.addBand=ma,i.setBand=ha,i.delBand=ga;function ba(l,r){x[l].alpha=r,Ge&&gt[l]!=null&&(gt[l].style.opacity=r),Pe&&ke[l]&&(ke[l].style.opacity=r)}let Vt,Qt,ui,Ui={focus:!0};function va(l){if(l!=ui){let r=l==null,c=Dt.alpha!=1;x.forEach((p,h)=>{if(s==1||h>0){let g=r||h==0||h==l;p._focus=r?null:g,c&&ba(h,g?1:Dt.alpha)}}),ui=l,c&&Ri()}}Pe&&Mi&&Ke(Ar,pe,l=>{L._lock||(ci(l),ui!=null&&Rt(null,Ui,!0,Me.setSeries))});function zt(l,r,c){let p=S[r];c&&(l=l/ce-(p.ori==1?Fe:be));let h=K;p.ori==1&&(h=M,l=h-l),p.dir==-1&&(l=h-l);let g=p._min,y=p._max,_=l/h,w=g+(y-g)*_,k=p.distr;return k==3?Ji(10,w):k==4?bc(w,p.asinh):k==100?p.bwd(w):w}function ya(l,r){let c=zt(l,P,r);return Mt(c,e[0],Re,ze)}i.valToIdx=l=>Mt(l,e[0]),i.posToIdx=ya,i.posToVal=zt,i.valToPos=(l,r,c)=>S[r].ori==0?o(l,S[r],c?tt:K,c?lt:0):a(l,S[r],c?xt:M,c?ht:0),i.setCursor=(l,r,c)=>{ve=l.left,$e=l.top,di(null,r,c)};function Nl(l,r){we(Ni,Gi,ye.left=l),we(Ni,$n,ye.width=r)}function Ul(l,r){we(Ni,"top",ye.top=l),we(Ni,kn,ye.height=r)}let pn=$.ori==0?Nl:Ul,un=$.ori==1?Nl:Ul;function _a(){if(Pe&&Q.live)for(let l=s==2?1:0;l<x.length;l++){if(l==0&&ft)continue;let r=Q.values[l],c=0;for(let p in r)Ft[l][c++].firstChild.nodeValue=r[p]}}function Cs(l,r){if(l!=null&&(l.idxs?l.idxs.forEach((c,p)=>{fe[p]=c}):wc(l.idx)||fe.fill(l.idx),Q.idx=fe[0]),Pe&&Q.live){for(let c=0;c<x.length;c++)(c>0||s==1&&!ft)&&wa(c,fe[c]);_a()}mt=!1,r!==!1&&Oe("setLegend")}i.setLegend=Cs;function wa(l,r){let c=x[l],p=l==0&&Y==2?St:e[l],h;ft?h=c.values(i,l,r)??Kt:(h=c.value(i,r==null?null:p[r],l,r),h=h==null?Kt:{_:h}),Q.values[l]=h}function di(l,r,c){Il=ve,Ol=$e,[ve,$e]=L.move(i,ve,$e),L.left=ve,L.top=$e,Ge&&(zi&&Nt(zi,Le(ve),0,K,M),Hi&&Nt(Hi,0,Le($e),K,M));let p,h=Re>ze;Vt=me,Qt=null;let g=$.ori==0?K:M,y=$.ori==1?K:M;if(ve<0||Ve==0||h){p=L.idx=null;for(let _=0;_<x.length;_++){let w=gt[_];w!=null&&Nt(w,-10,-10,K,M)}Mi&&Rt(null,Ui,!0,l==null&&Me.setSeries),Q.live&&(fe.fill(p),mt=!0)}else{let _,w,k;s==1&&(_=$.ori==0?ve:$e,w=zt(_,P),p=L.idx=Mt(w,e[0],Re,ze),k=F(e[0][p],$,g,0));let C=-10,T=-10,B=0,ae=0,re=!0,X="",q="";for(let D=s==2?1:0;D<x.length;D++){let _e=x[D],Ae=fe[D],Ne=Ae==null?null:s==1?e[D][Ae]:e[D][1][Ae],he=L.dataIdx(i,D,p,w),Ce=he==null?null:s==1?e[D][he]:e[D][1][he];if(mt=mt||Ce!=Ne||he!=Ae,fe[D]=he,D>0&&_e.show){let rt=he==null?-10:he==p?k:F(s==1?e[0][he]:e[D][0][he],$,g,0),Ye=Ce==null?-10:j(Ce,s==1?S[_e.scale]:S[_e.facets[1].scale],y,0);if(Mi&&Ce!=null){let bt=$.ori==1?ve:$e,$t=De(Dt.dist(i,D,he,Ye,bt));if($t<Vt){let Ht=Dt.bias;if(Ht!=0){let ot=zt(bt,_e.scale),vt=Ce>=0?1:-1,kt=ot>=0?1:-1;kt==vt&&(kt==1?Ht==1?Ce>=ot:Ce<=ot:Ht==1?Ce<=ot:Ce>=ot)&&(Vt=$t,Qt=D)}else Vt=$t,Qt=D}}if(mt||Ti){let bt,$t;$.ori==0?(bt=rt,$t=Ye):(bt=Ye,$t=rt);let Ht,ot,vt,kt,It,Je,at=!0,fi=Be.bbox;if(fi!=null){at=!1;let Ze=fi(i,D);vt=Ze.left,kt=Ze.top,Ht=Ze.width,ot=Ze.height}else vt=bt,kt=$t,Ht=ot=Be.size(i,D);if(Je=Be.fill(i,D),It=Be.stroke(i,D),Ti)D==Qt&&Vt<=Dt.prox&&(C=vt,T=kt,B=Ht,ae=ot,re=at,X=Je,q=It);else{let Ze=gt[D];Ze!=null&&(Pi[D]=vt,Fi[D]=kt,Lr(Ze,Ht,ot,at),Pr(Ze,Je,It),Nt(Ze,_t(vt),_t(kt),K,M))}}}}if(Ti){let D=Dt.prox,_e=ui==null?Vt<=D:Vt>D||Qt!=ui;if(mt||_e){let Ae=gt[0];Ae!=null&&(Pi[0]=C,Fi[0]=T,Lr(Ae,B,ae,re),Pr(Ae,X,q),Nt(Ae,_t(C),_t(T),K,M))}}}if(ye.show&&Jt)if(l!=null){let[_,w]=Me.scales,[k,C]=Me.match,[T,B]=l.cursor.sync.scales,ae=l.cursor.drag;if(He=ae._x,Ie=ae._y,He||Ie){let{left:re,top:X,width:q,height:D}=l.select,_e=l.scales[T].ori,Ae=l.posToVal,Ne,he,Ce,rt,Ye,bt=_!=null&&k(_,T),$t=w!=null&&C(w,B);bt&&He?(_e==0?(Ne=re,he=q):(Ne=X,he=D),Ce=S[_],rt=F(Ae(Ne,T),Ce,g,0),Ye=F(Ae(Ne+he,T),Ce,g,0),pn(Tt(rt,Ye),De(Ye-rt))):pn(0,g),$t&&Ie?(_e==1?(Ne=re,he=q):(Ne=X,he=D),Ce=S[w],rt=j(Ae(Ne,B),Ce,y,0),Ye=j(Ae(Ne+he,B),Ce,y,0),un(Tt(rt,Ye),De(Ye-rt))):un(0,y)}else Ts()}else{let _=De(Il-zl),w=De(Ol-Hl);if($.ori==1){let B=_;_=w,w=B}He=je.x&&_>=je.dist,Ie=je.y&&w>=je.dist;let k=je.uni;k!=null?He&&Ie&&(He=_>=k,Ie=w>=k,!He&&!Ie&&(w>_?Ie=!0:He=!0)):je.x&&je.y&&(He||Ie)&&(He=Ie=!0);let C,T;He&&($.ori==0?(C=Ii,T=ve):(C=Oi,T=$e),pn(Tt(C,T),De(T-C)),Ie||un(0,y)),Ie&&($.ori==1?(C=Ii,T=ve):(C=Oi,T=$e),un(Tt(C,T),De(T-C)),He||pn(0,g)),!He&&!Ie&&(pn(0,0),un(0,0))}if(je._x=He,je._y=Ie,l==null){if(c){if(Ql!=null){let[_,w]=Me.scales;Me.values[0]=_!=null?zt($.ori==0?ve:$e,_):null,Me.values[1]=w!=null?zt($.ori==1?ve:$e,w):null}fn(Ks,i,ve,$e,K,M,p)}if(Mi){let _=c&&Me.setSeries,w=Dt.prox;ui==null?Vt<=w&&Rt(Qt,Ui,!0,_):Vt>w?Rt(null,Ui,!0,_):Qt!=ui&&Rt(Qt,Ui,!0,_)}}mt&&(Q.idx=p,Cs()),r!==!1&&Oe("setCursor")}let Xt=null;Object.defineProperty(i,"rect",{get(){return Xt==null&&dn(!1),Xt}});function dn(l=!1){l?Xt=null:(Xt=E.getBoundingClientRect(),Oe("syncRect",Xt))}function ql(l,r,c,p,h,g,y){L._lock||Jt&&l!=null&&l.movementX==0&&l.movementY==0||(Es(l,r,c,p,h,g,y,!1,l!=null),l!=null?di(null,!0,!0):di(r,!0,!1))}function Es(l,r,c,p,h,g,y,_,w){if(Xt==null&&dn(!1),ci(l),l!=null)c=l.clientX-Xt.left,p=l.clientY-Xt.top;else{if(c<0||p<0){ve=-10,$e=-10;return}let[k,C]=Me.scales,T=r.cursor.sync,[B,ae]=T.values,[re,X]=T.scales,[q,D]=Me.match,_e=r.axes[0].side%2==1,Ae=$.ori==0?K:M,Ne=$.ori==1?K:M,he=_e?g:h,Ce=_e?h:g,rt=_e?p:c,Ye=_e?c:p;if(re!=null?c=q(k,re)?d(B,S[k],Ae,0):-10:c=Ae*(rt/he),X!=null?p=D(C,X)?d(ae,S[C],Ne,0):-10:p=Ne*(Ye/Ce),$.ori==1){let bt=c;c=p,p=bt}}w&&(r==null||r.cursor.event.type==Ks)&&((c<=1||c>=K-1)&&(c=vi(c,K)),(p<=1||p>=M-1)&&(p=vi(p,M))),_?(zl=c,Hl=p,[Ii,Oi]=L.move(i,c,p)):(ve=c,$e=p)}let Ms={width:0,height:0,left:0,top:0};function Ts(){In(Ms,!1)}let Vl,jl,Bl,Wl;function Gl(l,r,c,p,h,g,y){Jt=!0,He=Ie=je._x=je._y=!1,Es(l,r,c,p,h,g,y,!0,!1),l!=null&&(Ke(Ys,el,Kl,!1),fn($r,i,Ii,Oi,K,M,null));let{left:_,top:w,width:k,height:C}=ye;Vl=_,jl=w,Bl=k,Wl=C}function Kl(l,r,c,p,h,g,y){Jt=je._x=je._y=!1,Es(l,r,c,p,h,g,y,!1,!0);let{left:_,top:w,width:k,height:C}=ye,T=k>0||C>0,B=Vl!=_||jl!=w||Bl!=k||Wl!=C;if(T&&B&&In(ye),je.setScale&&T&&B){let ae=_,re=k,X=w,q=C;if($.ori==1&&(ae=w,re=C,X=_,q=k),He&&Zt(P,zt(ae,P),zt(ae+re,P)),Ie)for(let D in S){let _e=S[D];D!=P&&_e.from==null&&_e.min!=me&&Zt(D,zt(X+q,D),zt(X,D))}Ts()}else L.lock&&(L._lock=!L._lock,di(r,!0,l!=null));l!=null&&(Ai(Ys,el),fn(Ys,i,ve,$e,K,M,null))}function xa(l,r,c,p,h,g,y){if(L._lock)return;ci(l);let _=Jt;if(Jt){let w=!0,k=!0,C=10,T,B;$.ori==0?(T=He,B=Ie):(T=Ie,B=He),T&&B&&(w=ve<=C||ve>=K-C,k=$e<=C||$e>=M-C),T&&w&&(ve=ve<Ii?0:K),B&&k&&($e=$e<Oi?0:M),di(null,!0,!0),Jt=!1}ve=-10,$e=-10,fe.fill(null),di(null,!0,!0),_&&(Jt=_)}function Yl(l,r,c,p,h,g,y){L._lock||(ci(l),ds(),Ts(),l!=null&&fn(Cr,i,ve,$e,K,M,null))}function Jl(){O.forEach(Hp),us(i.width,i.height,!0)}wi(Xn,Yi,Jl);let qi={};qi.mousedown=Gl,qi.mousemove=ql,qi.mouseup=Kl,qi.dblclick=Yl,qi.setSeries=(l,r,c,p)=>{let h=Me.match[2];c=h(i,r,c),c!=-1&&Rt(c,p,!0,!1)},Ge&&(Ke($r,E,Gl),Ke(Ks,E,ql),Ke(kr,E,l=>{ci(l),dn(!1)}),Ke(Ar,E,xa),Ke(Cr,E,Yl),al.add(i),i.syncRect=dn);let On=i.hooks=t.hooks||{};function Oe(l,r,c){Ss?cn.push([l,r,c]):l in On&&On[l].forEach(p=>{p.call(null,i,r,c)})}(t.plugins||[]).forEach(l=>{for(let r in l.hooks)On[r]=(On[r]||[]).concat(l.hooks[r])});let Zl=(l,r,c)=>c,Me=Te({key:null,setSeries:!1,filters:{pub:Ir,sub:Ir},scales:[P,x[1]?x[1].scale:null],match:[Or,Or,Zl],values:[null,null]},L.sync);Me.match.length==2&&Me.match.push(Zl),L.sync=Me;let Ql=Me.key,Ps=zo(Ql);function fn(l,r,c,p,h,g,y){Me.filters.pub(l,r,c,p,h,g,y)&&Ps.pub(l,r,c,p,h,g,y)}Ps.sub(i);function Sa(l,r,c,p,h,g,y){Me.filters.sub(l,r,c,p,h,g,y)&&qi[l](null,r,c,p,h,g,y)}i.pub=Sa;function $a(){Ps.unsub(i),al.delete(i),si.clear(),nl(Xn,Yi,Jl),f.remove(),pe?.remove(),Oe("destroy")}i.destroy=$a;function Fs(){Oe("init",t,e),El(e||t.data,!1),H[P]?$s(P,H[P]):ds(),Fn=ye.show&&(ye.width>0||ye.height>0),ai=mt=!0,us(t.width,t.height)}return x.forEach(Al),O.forEach(ia),n?n instanceof HTMLElement?(n.appendChild(f),Fs()):n(i,Fs):Fs(),i}Ue.assign=Te;Ue.fmtNum=ml;Ue.rangeNum=es;Ue.rangeLog=ns;Ue.rangeAsinh=fl;Ue.orient=Si;Ue.pxRatio=ce;Ue.join=Ec;Ue.fmtDate=bl,Ue.tzDate=Oc;Ue.sync=zo;{Ue.addGap=wp,Ue.clipGaps=rs;let t=Ue.paths={points:qo};t.linear=jo,t.stepped=$p,t.bars=kp,t.spline=Cp}var Ko='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';var Pt=class extends We{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.lastSignature="";this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(){let n=JSON.stringify([this.curves,this.heading,this.syncKey,this.percent,this.range]);this.lastSamples===this.samples&&this.lastSignature===n||(this.lastSamples=this.samples,this.lastSignature=n,this.draw())}toggleSeries(n){let i=this.curves[n].label,s=this.hiddenCurves.has(i);this.plot&&this.plot.setSeries(n+1,{show:s}),s?this.hiddenCurves.delete(i):this.hiddenCurves.add(i),this.requestUpdate()}draw(){if(!this.isConnected)return;let n=this.renderRoot.querySelector(".plot");if(!n)return;let i=this.plot;if(i&&i.series.forEach((d,u)=>{u&&typeof d.label=="string"&&(d.show===!1?this.hiddenCurves.add(d.label):this.hiddenCurves.delete(d.label))}),this.dispose(),!this.samples.length||!this.samples.some(d=>this.curves.some(u=>Wi(d,u.path)!==null)))return;let s=getComputedStyle(this),o=s.getPropertyValue("--primary-text-color").trim()||"#555",a=[this.samples.map(d=>d.time),...this.curves.map(d=>this.samples.map(u=>Wi(u,d.path)))];this.applying=!0,this.plot=new Ue({width:Math.max(240,n.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(d,u,f)=>[Math.min(0,u??0),Math.max(100,f??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},axes:[{stroke:o,space:100,grid:{show:!1},values:(d,u)=>u.map(f=>new Date(f*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(f*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:o,values:(d,u)=>u.map(f=>f.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(d,u)=>u==null?"\u2014":new Date(u*1e3).toLocaleString()},...this.curves.map(d=>({label:d.label,stroke:d.color,width:2,spanGaps:!1,show:!this.hiddenCurves.has(d.label),paths:d.step?Ue.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(u,f)=>f==null?"Indisponible":`${f.toLocaleString(void 0,{maximumFractionDigits:d.unit.includes("min")?6:3})} ${d.unit}`}))],hooks:{setSeries:[d=>{d.status!==1||d!==this.plot||(d.series.forEach((u,f)=>{f&&typeof u.label=="string"&&(u.show===!1?this.hiddenCurves.add(u.label):this.hiddenCurves.delete(u.label))}),this.requestUpdate())}],setScale:[(d,u)=>{u==="x"&&d.status===1&&d===this.plot&&!this.applying&&d.scales.x.min!=null&&d.scales.x.max!=null&&(Math.abs(d.scales.x.min-this.range[0])>.01||Math.abs(d.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[d.scales.x.min,d.scales.x.max],bubbles:!0,composed:!0}))}]}},a,n),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,n.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,n.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(n)}render(){let n=this.samples.filter(i=>this.curves.some(s=>Wi(i,s.path)!==null)).length;return R`<h3>${this.heading}</h3>
      <div class="series-controls" role="group" aria-label="Séries affichées">
        ${this.curves.map((i,s)=>R`<button
              aria-pressed=${!this.hiddenCurves.has(i.label)}
              @click=${()=>this.toggleSeries(s)}
            >
              <span style=${"background:"+i.color} aria-hidden="true"></span
              >${i.label}
            </button>`)}
      </div>
      <div class="plot" aria-label=${this.heading}></div>
      ${n?R`<details>
            <summary>
              Table de données accessible · ${n} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(i=>R`<th>${i.label} (${i.unit})</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(i=>R`<tr>
                        <td>${new Date(i.time*1e3).toLocaleString()}</td>
                        ${this.curves.map(s=>R`<td>
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
          </details>`:R`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};Pt.styles=[qn(Ko),At`
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
    `],ee([Ee({attribute:!1})],Pt.prototype,"samples",2),ee([Ee({attribute:!1})],Pt.prototype,"curves",2),ee([Ee({attribute:!1})],Pt.prototype,"range",2),ee([Ee()],Pt.prototype,"heading",2),ee([Ee()],Pt.prototype,"syncKey",2),ee([Ee({type:Boolean})],Pt.prototype,"percent",2),Pt=ee([Ot("smartpi-time-chart")],Pt);var Op={setpoint:[["Trajectoire active","setpoint.trajectory_active"],["Boost actif","setpoint.boost_active"]],temperature:[["Temp\xE9rature ext\xE9rieure","temperature.outdoor"," \xB0C"],["Pente int\xE9rieure publi\xE9e","analysis.control.temperature_slope_h"," \xB0C/h",3]],pi:[["Erreur de la voie P","analysis.control.error_p"," \xB0C",4],["Erreur brute de la voie I","temperature.error"," \xB0C",4],["\xC9tat de l\u2019int\xE9grale","temperature.integral_error","",6],["Gain proportionnel Kp","control.kp","",6],["Gain int\xE9gral Ki","control.ki","",6],["Temps int\xE9gral Ti","control.ti_min"," min"],["Source de Kp","analysis.governance.kp_source"],["D\xE9cision sur les gains","analysis.governance.last_decision_gains"]],ff:[["FF1 \xB7 anticipation thermique","analysis.feedforward.u_ff1"," (ratio)",6],["FF2 \xB7 correction apprise","analysis.feedforward.u_ff2"," (ratio)",6],["FF3 \xB7 correction pr\xE9dictive","analysis.feedforward.u_ff3"," (ratio)",6],["Candidat avec FF3","analysis.feedforward.u_ff_effective"," (ratio)",6],["Bande morte active","control.in_deadband"],["Anticipation avant FF3","analysis.feedforward.u_ff_final"," (ratio)",6],["Motif de gel de FF2","analysis.feedforward.ff2_freeze_reason"],["Observateur stationnaire","feedforward.fftrim.stationary.state"],["Dernier rejet stationnaire","feedforward.fftrim.stationary.last_reject_reason"],["Observateur p\xE9riodique","feedforward.fftrim.periodic.state"],["Dernier rejet p\xE9riodique","feedforward.fftrim.periodic.last_reject_reason"],["Transfert de correction","feedforward.fftrim.transfer.state"],["Motif du transfert","feedforward.fftrim.transfer.reason"]],command:[["Sortie PI publi\xE9e","power.pi_percent"," %"],["Anticipation retenue","power.ff_percent"," %"]],direct:[["\xC9tat de l\u2019hyst\xE9r\xE9sis","control.hysteresis_state"],["Phase de calibration","calibration.state"],["Autocalibration","autocalib.state"]],limits:[["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"],["Saturation d\xE9clar\xE9e","control.saturation_state"],["Timing impos\xE9","analysis.control.forced_by_timing"],["Correction anti-windup \u0394u","analysis.control.aw_du"," (ratio)",6],["Source de protection de l\u2019int\xE9grale","temperature.integral_guard_source"]],applied:[["Cycle engag\xE9","power.current_cycle_percent"," %"],["Cycle suivant","power.next_cycle_percent"," %"],["Lin\xE9arisation de vanne","power.valve_linearization_enabled"],["Cycle engag\xE9 \xB7 espace lin\xE9aire","power.linear_current_cycle_percent"," %"],["Cycle suivant \xB7 espace lin\xE9aire","power.linear_next_cycle_percent"," %"],["Statut du retour de commande","feedforward.fftrim.command_ownership.status"]],model:[["Pertes B","model.b"," min\u207B\xB9",6],["Constante thermique \u03C4","model.tau_min"," min",2,"model.tau_reliable"],["Temps mort en chauffe","model.deadtime_heat_s"," s",0,"model.deadtime_heat_reliable"],["Temps mort en refroidissement","model.deadtime_cool_s"," s",0,"model.deadtime_cool_reliable"],["\xC9tape d\u2019apprentissage","learning.stage"],["Dernier motif d\u2019apprentissage","learning.last_reason"],["Gouvernance thermique","governance.thermal_update_decision"],["Motif de gouvernance","governance.thermal_update_reason"],["\xC9tat du jumeau thermique","feedforward.twin_status"],["Temp\xE9rature pr\xE9dite","analysis.twin.twin_T_pred"," \xB0C"],["\xC9quilibre pr\xE9dit","analysis.twin.twin_T_steady"," \xB0C",2,"analysis.twin.twin_T_steady_reliable"]]},Np={pi:6,ff:5,limits:5},sn=class{constructor(e){this.diagnostic=e}get live(){return this.diagnostic.available?this.diagnostic.live:{}}get bypass(){return this.diagnostic.available?Bi(this.diagnostic)||["CoolDown","HeatUp","CoolDownFinal"].includes(String(N(this.live,"calibration.state")))||N(this.live,"control.phase")==="Calibration":!1}get route(){return this.bypass?"direct":N(this.live,"control.mode")==="smartpi"?"pi":"unavailable"}detail(e,n){let i=e.id==="command"&&this.bypass?"direct":e.id,s=Op[i]??[];return(n?s:s.slice(0,Np[i]??4)).map(([o,a,d,u,f])=>{let b=Ct(this.live,a,f);return{label:o,path:a,reliability:f,value:se(d===void 0?b:nt(b),d,u)}})}blocks(){let e=this.live,n=this.bypass,i=this.route==="pi"?"Voie SmartPI":"Chemin non v\xE9rifi\xE9",s=(o,a,d,u,f,b,m)=>({id:o,title:a,path:d,value:se(N(e,d),u,d==="model.a"?6:2),explanation:f,reason:se(N(e,b)),reasonPath:b,status:m==="Contourn\xE9"?m:N(e,d)==null?"Indisponible":m??"Publi\xE9"});return[s("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),s("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),s("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",n?"Contourn\xE9":i),s("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",n?"Contourn\xE9":i),s("command",n?"Hyst\xE9r\xE9sis / calibration":"Commande demand\xE9e",n?"power.applied_percent":"power.command_percent"," %",n?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.",n?"control.phase":"control.saturation_state",n?"Voir sortie appliqu\xE9e":"Publi\xE9"),s("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",n?"Contourn\xE9":i),s("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),s("model","Pi\xE8ce et mod\xE8le A/B","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let e=this.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([n,i,s])=>{let o=nt(N(e,i));return{label:n,path:i,value:o===null?null:o*(s?100:1)}})}};var ni=class extends We{constructor(){super(...arguments);this.expert=!1;this.selected="pi"}render(){if(!this.diagnostic)return R``;let n=new sn(this.diagnostic),i=n.blocks(),s=i.find(f=>f.id===this.selected)??i[0],o=this.diagnostic.lastUpdated,a=o?new Date(o):null,d=this.diagnostic.available&&a&&Number.isFinite(a.valueOf())?R`Dernière mise à jour du capteur : <time datetime=${a.toISOString()}>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"short",timeStyle:"medium"}).format(a)}</time>`:"Horodatage des donn\xE9es actuelles indisponible",u=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return R`<div class="intro">
        <div>
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge"
          >${n.bypass?"Chemin direct \xB7 PI/FF contourn\xE9s":n.route==="pi"?"Voie PI + feedforward":"Chemin de commande non v\xE9rifi\xE9"}</span
        >
      </div>
      <p class="muted">
        ${d}. Les flèches pleines montrent le chemin logique déclaré.
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
          ${i.map((f,b)=>xn`<g role="button" tabindex="0" aria-pressed=${f.id===s.id} aria-label=${`${f.title} : ${f.value}. ${f.status}`} class=${"block "+(f.id===s.id?"selected":"")+(f.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${u[b][0]},${u[b][1]})`} @click=${()=>this.selected=f.id} @keydown=${m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),this.selected=f.id)}}>
          <title>${f.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${f.title}</text><text x="13" y="50" class="value">${f.value}</text><text x="13" y="73" class="status">${f.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${i.map(f=>R`<button
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
            ${this.expert?R`<code>attributes.live.${s.path}</code>`:null}</div>
          <div><dt>Motif ou contexte publié</dt><dd>${s.reason}</dd>
            ${this.expert?R`<code>attributes.live.${s.reasonPath}</code>`:null}</div>
          ${n.detail(s,this.expert).map(f=>R`<div>
            <dt>${f.label}</dt><dd>${f.value}</dd>
            ${this.expert?R`<code>attributes.live.${f.path}</code>${f.reliability?R`<code>Fiabilité : ${f.reliability}</code>`:null}`:null}
          </div>`)}
        </dl>
        ${s.status==="Contourn\xE9"?R`<p class="muted">Ce bloc est hors du chemin actif. Ses valeurs publiées ne décrivent pas la commande directe.</p>`:null}
      </aside>`}};ni.styles=At`
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
  `,ee([Ee({attribute:!1})],ni.prototype,"diagnostic",2),ee([Ee({type:Boolean})],ni.prototype,"expert",2),ee([Qe()],ni.prototype,"selected",2),ni=ee([Ot("smartpi-control-diagram")],ni);var ln=class extends We{render(){if(!this.diagnostic)return R``;let e=new sn(this.diagnostic),n=e.chain(),i=Math.max(100,...n.map(s=>Math.abs(s.value??0)));return R`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${e.bypass?"Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliqu\xE9e.":"FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu pr\xE9c\xE8dent les limites ; Hold est un \xE9tat de maintien, pas une contribution \xE0 additionner."}
      </p>
      ${n.map(s=>R`<div class="row">
            <span title=${"attributes.live."+s.path}>${s.label}</span>
            <div class="track">
              <i></i>${s.value===null?null:R`<b
                    style=${`left:${s.value<0?50+s.value/i*50:50}%;width:${Math.abs(s.value)/i*50}%`}
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
        Échelle symétrique ±${se(i," %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${se(N(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${se(N(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${se(N(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${N(this.diagnostic.live,"power.valve_linearization_enabled")===!0?R`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`:null}`}};ln.styles=At`
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
  `,ee([Ee({attribute:!1})],ln.prototype,"diagnostic",2),ln=ee([Ot("smartpi-command-chain")],ln);var Up=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],qp=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],qe=class extends We{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.followNow=!0;this.generation=0;this.recorderEntity=""}get usingRecorder(){return this.recorderEntity===this.diagnostic?.entityId&&!this.preferSession&&Ws(this.recorder)}willUpdate(n){if(this.followNow&&!this.usingRecorder&&(n.has("session")||n.has("preferSession")||n.has("recorder"))){let i=this.session.at(-1)?.time;i!==void 0&&i>this.range[1]&&(this.end=i,this.range=[i-this.hours*3600,i])}}windowData(n){return this.filteredCache?.all===n&&this.filteredCache.start===this.range[0]&&this.filteredCache.end===this.range[1]?this.filteredCache:this.filteredCache={all:n,start:this.range[0],end:this.range[1],samples:n.filter(i=>i.time>=this.range[0]&&i.time<=this.range[1]),events:yr(n).filter(i=>i.time>=this.range[0]&&i.time<=this.range[1])}}updated(n){let i=n.get("diagnostic");n.has("diagnostic")&&i?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.filteredCache=void 0,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.followNow=!0,this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(n){this.followNow=!1;let i=this.range[1]-this.range[0],s=Date.now()/1e3,o=this.end-48*3600,a=Math.min(s,Math.max(o+i,this.range[1]+n*i/2));this.range=[a-i,a]}zoom(n){this.followNow=!1;let[i,s]=this.range,o=Math.max(60,Math.min(48*3600,(s-i)*n));this.range=[s-o,s]}async load(){let n=++this.generation,i=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!i||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let s=Date.now()/1e3,o=await _r(this.hass,i.entityId,s-48*3600,s,()=>n!==this.generation);if(n!==this.generation)return;this.recorderEntity=i.entityId,this.recorder=o,Ws(o)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(s){if(n!==this.generation)return;this.error=s instanceof Error&&s.message.startsWith("Format")?s.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{n===this.generation&&(this.loading=!1)}}render(){let n=this.diagnostic;if(!n)return de;let i=this.usingRecorder,s=i?this.recorder:this.session,{samples:o,events:a}=this.windowData(s),d=(u,f,b=!1)=>R`<section class="chart">
        <smartpi-time-chart
          .heading=${u}
          .samples=${o}
          .curves=${f}
          .range=${this.range}
          .percent=${b}
          .syncKey=${n.entityId}
          @time-range=${m=>{m.detail[1]>m.detail[0]&&(this.followNow=!1,this.range=m.detail)}}
        ></smartpi-time-chart>
      </section>`;return R`<div class="workspace">
      <div class="top">
        <div>
          <span class="eyebrow">OBSERVATOIRE SMARTPI</span>
          <h2>Une commande, une réponse thermique</h2>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${u=>this.expert=u.target.checked}
          />
          Mode expert</label
        >
      </div>
      <nav aria-label="Vues de diagnostic">
        ${[["evolution","\xC9volution"],["regulation","R\xE9gulation"],["model","Sant\xE9 du mod\xE8le"]].map(([u,f])=>R`<button
              class=${this.tab===u?"active":""}
              aria-pressed=${this.tab===u}
              @click=${()=>this.tab=u}
            >
              ${f}
            </button>`)}
      </nav>
      <div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
          ${[1,3,6,12,24,48].map(u=>R`<button
                aria-pressed=${u===this.hours}
                class=${u===this.hours?"chosen":""}
                @click=${()=>{this.hours=u,this.reset()}}
              >
                ${u} h
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
            @change=${u=>this.preferSession=u.target.checked}
          />
          Session uniquement</label
        >
      </div>
      ${i?de:R`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${u=>{this.followNow=u.target.checked,this.followNow&&this.reset()}}
            />
            Suivre les nouvelles publications de session</label
          >`}
      ${this.loading?R`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:de}
      ${this.error?R`<p role="status" class="notice">${this.error}</p>`:de}
      ${o.length?de:R`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}
      ${this.tab==="evolution"?R`
            ${d("Temp\xE9rature et consigne filtr\xE9e",Up)}
            ${d("Commande du r\xE9gulateur \xB7 pas des watts",qp,!0)}
            ${d("\xC9cart consigne filtr\xE9e \u2212 temp\xE9rature int\xE9rieure",[{label:"\xC9cart filtr\xE9",path:"error",color:"#bc7254",unit:"\xB0C"}])}
            <p class="foot">
              Écart calculé uniquement avec deux valeurs du même état. Ce n’est
              pas l’erreur de l’intégrateur ni une mesure de confort. Aucune
              zone de bande morte n’est extrapolée. Les points sont des
              publications irrégulières ; une ligne ne constitue pas une mesure
              intermédiaire.
            </p>
          `:this.tab==="regulation"?R`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${n}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
              </section>
              <section class="pane">
                <smartpi-command-chain .diagnostic=${n}></smartpi-command-chain>
              </section>`:R`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${se(N(n.live,"model.confidence"))}</span
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
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([u,f,b])=>R`<div>
                        <span>${u}</span
                        ><strong
                          >${se(Ct(n.live,f,b),f==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${se(N(n.live,b))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${se(N(n.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${se(N(n.live,"analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${se(N(n.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE 30","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([u,f,b])=>R`<div>
                        <span>${u}</span
                        ><strong
                          >${se(Ct(n.live,"analysis.twin."+f),b,4)}</strong
                        >
                      </div>`)}
                </div>
                <p>
                  Équilibre :
                  ${se(Ct(n.live,"analysis.twin.twin_T_steady","analysis.twin.twin_T_steady_reliable")," \xB0C")}
                  · Consigne atteignable (prédiction) :
                  ${se(Ct(n.live,"analysis.twin.twin_setpoint_reachable","analysis.twin.twin_T_steady_reliable"))}
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
          ${a.slice(-60).reverse().map(u=>R`<li>
                  <time>${new Date(u.time*1e3).toLocaleString()}</time>
                  <div>
                    <strong>${u.label}</strong>${this.expert?R`<p>${u.provenance}</p>`:de}
                  </div>
                </li>`)}
        </ol>
        ${a.length===0?R`<p>Aucune transition observable sur cette fenêtre.</p>`:R`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>
      ${this.expert?R`<details class="provenance">
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
    </div>`}};qe.styles=At`
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
  `,ee([Ee({attribute:!1})],qe.prototype,"hass",2),ee([Ee({attribute:!1})],qe.prototype,"diagnostic",2),ee([Ee({attribute:!1})],qe.prototype,"session",2),ee([Qe()],qe.prototype,"tab",2),ee([Qe()],qe.prototype,"expert",2),ee([Qe()],qe.prototype,"hours",2),ee([Qe()],qe.prototype,"end",2),ee([Qe()],qe.prototype,"range",2),ee([Qe()],qe.prototype,"recorder",2),ee([Qe()],qe.prototype,"loading",2),ee([Qe()],qe.prototype,"error",2),ee([Qe()],qe.prototype,"preferSession",2),ee([Qe()],qe.prototype,"followNow",2),qe=ee([Ot("smartpi-visual-diagnostics")],qe);var Vp=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],Gt=class extends We{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new Gn}willUpdate(n){n.has("hass")&&this.hass&&this.sessionHistory.collect(Bs(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(n,i,s="",o=2){return R`<div class="metric"><span>${n}</span><strong>${se(i,s,o)}</strong></div>`}power(n,i,s){let o=nt(i),a=o===null?0:Math.min(100,Math.max(0,o));return R`<div class="power"><div class="power-label"><span>${n}</span><strong>${se(i," %",1)}</strong></div>
      <div class="track" aria-label=${n+" "+se(i," %",1)}>
        <div class=${"fill "+s} style=${"width:"+a+"%"}></div>
      </div></div>`}field(n,i){let s=se(Ct(i,n.path,n.reliable),n.unit??"",n.digits??2);return R`<div class="detail" title=${n.path}><span>${n.label}</span><strong>${s}</strong></div>`}showDiagnostic(n){let i=n.live,s=gr(n),o=Bi(n),a=nt(N(i,"learning.bootstrap_progress_percent"));return R`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${n.name}</h2>
            <div class="muted small">${n.climateId??n.entityId}</div></div>
          <span class="tag">${o?"Apprentissage / hyst\xE9r\xE9sis":se(N(i,"control.phase"))}</span>
        </div>
        <p class="muted small">État : ${n.state} · Dernière publication : ${n.lastUpdated??"Indisponible"}. Une publication ancienne ne prouve pas une panne.</p>
        <div class="metrics">
          ${this.metric("Temp\xE9rature int\xE9rieure",N(i,"temperature.indoor")," \xB0C")}
          ${this.metric("Consigne filtr\xE9e",N(i,"setpoint.filtered_setpoint")," \xB0C")}
          ${this.metric("Commande appliqu\xE9e",N(i,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",N(i,"temperature.outdoor")," \xB0C")}
        </div>
        ${o?R`<div class="learn">
          <div class="flex spread"><span>Progression de l’apprentissage</span><strong>${se(a," %",0)}</strong></div>
          <div class="track"><div class="fill applied" style=${"width:"+(a===null?0:Math.max(0,Math.min(100,a)))+"%"}></div></div>
          <div class="muted small">A : ${se(N(i,"learning.emea_samples_a"),"",0)} / ${se(N(i,"learning.bootstrap_target_a"),"",0)}
            · B : ${se(N(i,"learning.emea_samples_b"),"",0)} / ${se(N(i,"learning.bootstrap_target_b"),"",0)}</div>
        </div>`:de}
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${n} .session=${this.sessionHistory.get(n.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${s.map(d=>R`<li>${d}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${Vp.map(d=>R`<details class="surface">
          <summary>${d.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${d.note}</p>
          <div class="detail-grid">${d.fields.map(u=>this.field(u,i))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:n.state,live:n.live,history:n.history},null,2)}</pre>
      </details>
      </details>
    `}render(){let n=Bs(this.hass),i=n.find(s=>s.entityId===this.selectedId)??n[0];return R`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Lecture seule · 0.2</span></div>
      <main>
        <div class="flex spread intro"><div><span class="eyebrow">SYNTHÈSE</span><h2>Mes thermostats</h2></div>
          <span class="muted small">${n.length} diagnostic${n.length>1?"s":""} SmartPI v2</span></div>
        ${n.length===0?R`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:R`<div class="tiles">${n.map(s=>R`<button type="button" class=${"tile "+(i?.entityId===s.entityId?"selected":"")}
           @click=${()=>{this.selectedId=s.entityId}} aria-pressed=${i?.entityId===s.entityId}>
            <strong>${s.name}</strong><span class="muted small">${Bi(s)?"Bootstrap":se(N(s.live,"control.phase"))}</span>
            <span class="big">${se(N(s.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom"><span>Cible ${se(N(s.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
              <span>${se(N(s.live,"power.applied_percent")," %",1)}</span></span>
          </button>`)}</div>
          ${i?this.showDiagnostic(i):de}`}
        <footer>Source : capteurs SmartPI Diagnostics v2 · Lecture seule · Aucune commande Home Assistant</footer>
      </main>`}};Gt.styles=At`
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
  `,ee([Ee({attribute:!1})],Gt.prototype,"hass",2),ee([Ee({attribute:!1})],Gt.prototype,"panel",2),ee([Ee({type:Boolean})],Gt.prototype,"narrow",2),ee([Qe()],Gt.prototype,"selectedId",2),Gt=ee([Ot("smartpi-dashboard-panel")],Gt);export{Gt as SmartPIDashboardPanel};
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
