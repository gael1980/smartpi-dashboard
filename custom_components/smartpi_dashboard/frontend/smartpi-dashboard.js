var Aa=Object.defineProperty;var ka=Object.getOwnPropertyDescriptor;var ie=(t,e,n,i)=>{for(var l=i>1?void 0:i?ka(e,n):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(l=(i?a(e,n,l):a(l))||l);return i&&l&&Aa(e,n,l),l};var Nn=globalThis,Un=Nn.ShadowRoot&&(Nn.ShadyCSS===void 0||Nn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ll=Symbol(),er=new WeakMap,hn=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Ll)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o,n=this.t;if(Un&&e===void 0){let i=n!==void 0&&n.length===1;i&&(e=er.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&er.set(n,e))}return e}toString(){return this.cssText}},Vn=t=>new hn(typeof t=="string"?t:t+"",void 0,Ll),kt=(t,...e)=>{let n=t.length===1?t[0]:e.reduce((i,l,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(l)+t[o+1],t[0]);return new hn(n,t,Ll)},tr=(t,e)=>{if(Un)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let i=document.createElement("style"),l=Nn.litNonce;l!==void 0&&i.setAttribute("nonce",l),i.textContent=n.cssText,t.appendChild(i)}},Dl=Un?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(let i of e.cssRules)n+=i.cssText;return Vn(n)})(t):t;var{is:Ea,defineProperty:Ca,getOwnPropertyDescriptor:Ma,getOwnPropertyNames:Pa,getOwnPropertySymbols:Ta,getPrototypeOf:Fa}=Object,qn=globalThis,ir=qn.trustedTypes,La=ir?ir.emptyScript:"",Da=qn.reactiveElementPolyfillSupport,mn=(t,e)=>t,gn={toAttribute(t,e){switch(e){case Boolean:t=t?La:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},Bn=(t,e)=>!Ea(t,e),nr={attribute:!0,type:String,converter:gn,reflect:!1,useDefault:!1,hasChanged:Bn};Symbol.metadata??=Symbol("metadata"),qn.litPropertyMetadata??=new WeakMap;var qt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=nr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){let i=Symbol(),l=this.getPropertyDescriptor(e,i,n);l!==void 0&&Ca(this.prototype,e,l)}}static getPropertyDescriptor(e,n,i){let{get:l,set:o}=Ma(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:l,set(a){let d=l?.call(this);o?.call(this,a),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??nr}static _$Ei(){if(this.hasOwnProperty(mn("elementProperties")))return;let e=Fa(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(mn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(mn("properties"))){let n=this.properties,i=[...Pa(n),...Ta(n)];for(let l of i)this.createProperty(l,n[l])}let e=this[Symbol.metadata];if(e!==null){let n=litPropertyMetadata.get(e);if(n!==void 0)for(let[i,l]of n)this.elementProperties.set(i,l)}this._$Eh=new Map;for(let[n,i]of this.elementProperties){let l=this._$Eu(n,i);l!==void 0&&this._$Eh.set(l,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let n=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let l of i)n.unshift(Dl(l))}else e!==void 0&&n.push(Dl(e));return n}static _$Eu(e,n){let i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,n=this.constructor.elementProperties;for(let i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return tr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){let i=this.constructor.elementProperties.get(e),l=this.constructor._$Eu(e,i);if(l!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:gn).toAttribute(n,i.type);this._$Em=e,o==null?this.removeAttribute(l):this.setAttribute(l,o),this._$Em=null}}_$AK(e,n){let i=this.constructor,l=i._$Eh.get(e);if(l!==void 0&&this._$Em!==l){let o=i.getPropertyOptions(l),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:gn;this._$Em=l;let d=a.fromAttribute(n,o.type);this[l]=d??this._$Ej?.get(l)??d,this._$Em=null}}requestUpdate(e,n,i,l=!1,o){if(e!==void 0){let a=this.constructor;if(l===!1&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??Bn)(o,n)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:l,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),l===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[l,o]of this._$Ep)this[l]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[l,o]of i){let{wrapped:a}=o,d=this[l];a!==!0||this._$AL.has(l)||d===void 0||this.C(l,void 0,o,d)}}let e=!1,n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};qt.elementStyles=[],qt.shadowRootOptions={mode:"open"},qt[mn("elementProperties")]=new Map,qt[mn("finalized")]=new Map,Da?.({ReactiveElement:qt}),(qn.reactiveElementVersions??=[]).push("2.1.2");var Ul=globalThis,lr=t=>t,jn=Ul.trustedTypes,sr=jn?jn.createPolicy("lit-html",{createHTML:t=>t}):void 0,pr="$lit$",ei=`lit$${Math.random().toFixed(9).slice(2)}$`,dr="?"+ei,Ra=`<${dr}>`,gi=document,vn=()=>gi.createComment(""),yn=t=>t===null||typeof t!="object"&&typeof t!="function",Vl=Array.isArray,za=t=>Vl(t)||typeof t?.[Symbol.iterator]=="function",Rl=`[ 	
\f\r]`,bn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rr=/-->/g,or=/>/g,hi=RegExp(`>|${Rl}(?:([^\\s"'>=/]+)(${Rl}*=${Rl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ar=/'/g,cr=/"/g,fr=/^(?:script|style|textarea|title)$/i,ql=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),V=ql(1),wn=ql(2),Gu=ql(3),bi=Symbol.for("lit-noChange"),he=Symbol.for("lit-nothing"),ur=new WeakMap,mi=gi.createTreeWalker(gi,129);function hr(t,e){if(!Vl(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return sr!==void 0?sr.createHTML(e):e}var Ha=(t,e)=>{let n=t.length-1,i=[],l,o=e===2?"<svg>":e===3?"<math>":"",a=bn;for(let d=0;d<n;d++){let p=t[d],h,b,m=-1,v=0;for(;v<p.length&&(a.lastIndex=v,b=a.exec(p),b!==null);)v=a.lastIndex,a===bn?b[1]==="!--"?a=rr:b[1]!==void 0?a=or:b[2]!==void 0?(fr.test(b[2])&&(l=RegExp("</"+b[2],"g")),a=hi):b[3]!==void 0&&(a=hi):a===hi?b[0]===">"?(a=l??bn,m=-1):b[1]===void 0?m=-2:(m=a.lastIndex-b[2].length,h=b[1],a=b[3]===void 0?hi:b[3]==='"'?cr:ar):a===cr||a===ar?a=hi:a===rr||a===or?a=bn:(a=hi,l=void 0);let k=a===hi&&t[d+1].startsWith("/>")?" ":"";o+=a===bn?p+Ra:m>=0?(i.push(h),p.slice(0,m)+pr+p.slice(m)+ei+k):p+ei+(m===-2?d:k)}return[hr(t,o+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},xn=class t{constructor({strings:e,_$litType$:n},i){let l;this.parts=[];let o=0,a=0,d=e.length-1,p=this.parts,[h,b]=Ha(e,n);if(this.el=t.createElement(h,i),mi.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(l=mi.nextNode())!==null&&p.length<d;){if(l.nodeType===1){if(l.hasAttributes())for(let m of l.getAttributeNames())if(m.endsWith(pr)){let v=b[a++],k=l.getAttribute(m).split(ei),C=/([.?@])?(.*)/.exec(v);p.push({type:1,index:o,name:C[2],strings:k,ctor:C[1]==="."?Hl:C[1]==="?"?Il:C[1]==="@"?Ol:Bi}),l.removeAttribute(m)}else m.startsWith(ei)&&(p.push({type:6,index:o}),l.removeAttribute(m));if(fr.test(l.tagName)){let m=l.textContent.split(ei),v=m.length-1;if(v>0){l.textContent=jn?jn.emptyScript:"";for(let k=0;k<v;k++)l.append(m[k],vn()),mi.nextNode(),p.push({type:2,index:++o});l.append(m[v],vn())}}}else if(l.nodeType===8)if(l.data===dr)p.push({type:2,index:o});else{let m=-1;for(;(m=l.data.indexOf(ei,m+1))!==-1;)p.push({type:7,index:o}),m+=ei.length-1}o++}}static createElement(e,n){let i=gi.createElement("template");return i.innerHTML=e,i}};function qi(t,e,n=t,i){if(e===bi)return e;let l=i!==void 0?n._$Co?.[i]:n._$Cl,o=yn(e)?void 0:e._$litDirective$;return l?.constructor!==o&&(l?._$AO?.(!1),o===void 0?l=void 0:(l=new o(t),l._$AT(t,n,i)),i!==void 0?(n._$Co??=[])[i]=l:n._$Cl=l),l!==void 0&&(e=qi(t,l._$AS(t,e.values),l,i)),e}var zl=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:i}=this._$AD,l=(e?.creationScope??gi).importNode(n,!0);mi.currentNode=l;let o=mi.nextNode(),a=0,d=0,p=i[0];for(;p!==void 0;){if(a===p.index){let h;p.type===2?h=new _n(o,o.nextSibling,this,e):p.type===1?h=new p.ctor(o,p.name,p.strings,this,e):p.type===6&&(h=new Nl(o,this,e)),this._$AV.push(h),p=i[++d]}a!==p?.index&&(o=mi.nextNode(),a++)}return mi.currentNode=gi,l}p(e){let n=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}},_n=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,i,l){this.type=2,this._$AH=he,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=qi(this,e,n),yn(e)?e===he||e==null||e===""?(this._$AH!==he&&this._$AR(),this._$AH=he):e!==this._$AH&&e!==bi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):za(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==he&&yn(this._$AH)?this._$AA.nextSibling.data=e:this.T(gi.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:i}=e,l=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=xn.createElement(hr(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===l)this._$AH.p(n);else{let o=new zl(l,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(e){let n=ur.get(e.strings);return n===void 0&&ur.set(e.strings,n=new xn(e)),n}k(e){Vl(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,i,l=0;for(let o of e)l===n.length?n.push(i=new t(this.O(vn()),this.O(vn()),this,this.options)):i=n[l],i._$AI(o),l++;l<n.length&&(this._$AR(i&&i._$AB.nextSibling,l),n.length=l)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let i=lr(e).nextSibling;lr(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Bi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,l,o){this.type=1,this._$AH=he,this._$AN=void 0,this.element=e,this.name=n,this._$AM=l,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=he}_$AI(e,n=this,i,l){let o=this.strings,a=!1;if(o===void 0)e=qi(this,e,n,0),a=!yn(e)||e!==this._$AH&&e!==bi,a&&(this._$AH=e);else{let d=e,p,h;for(e=o[0],p=0;p<o.length-1;p++)h=qi(this,d[i+p],n,p),h===bi&&(h=this._$AH[p]),a||=!yn(h)||h!==this._$AH[p],h===he?e=he:e!==he&&(e+=(h??"")+o[p+1]),this._$AH[p]=h}a&&!l&&this.j(e)}j(e){e===he?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Hl=class extends Bi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===he?void 0:e}},Il=class extends Bi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==he)}},Ol=class extends Bi{constructor(e,n,i,l,o){super(e,n,i,l,o),this.type=5}_$AI(e,n=this){if((e=qi(this,e,n,0)??he)===bi)return;let i=this._$AH,l=e===he&&i!==he||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==he&&(i===he||l);l&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nl=class{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){qi(this,e)}};var Ia=Ul.litHtmlPolyfillSupport;Ia?.(xn,_n),(Ul.litHtmlVersions??=[]).push("3.3.3");var mr=(t,e,n)=>{let i=n?.renderBefore??e,l=i._$litPart$;if(l===void 0){let o=n?.renderBefore??null;i._$litPart$=l=new _n(e.insertBefore(vn(),o),o,void 0,n??{})}return l._$AI(t),l};var Bl=globalThis,We=class extends qt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=mr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return bi}};We._$litElement$=!0,We.finalized=!0,Bl.litElementHydrateSupport?.({LitElement:We});var Oa=Bl.litElementPolyfillSupport;Oa?.({LitElement:We});(Bl.litElementVersions??=[]).push("4.2.2");var It=t=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Na={attribute:!0,type:String,converter:gn,reflect:!1,hasChanged:Bn},Ua=(t=Na,e,n)=>{let{kind:i,metadata:l}=n,o=globalThis.litPropertyMetadata.get(l);if(o===void 0&&globalThis.litPropertyMetadata.set(l,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),i==="accessor"){let{name:a}=n;return{set(d){let p=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,p,t,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,t,d),d}}}if(i==="setter"){let{name:a}=n;return function(d){let p=this[a];e.call(this,d),this.requestUpdate(a,p,t,!0,d)}}throw Error("Unsupported decorator location: "+i)};function Ce(t){return(e,n)=>typeof n=="object"?Ua(t,e,n):((i,l,o)=>{let a=l.hasOwnProperty(o);return l.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(l,o):void 0})(t,e,n)}function it(t){return Ce({...t,state:!0,attribute:!1})}function at(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function R(t,e){return e.split(".").reduce((n,i)=>at(n)?n[i]:void 0,t)}function ct(t){return typeof t=="number"&&Number.isFinite(t)?t:null}function X(t,e="",n=2){let i=ct(t);return i!==null?i.toLocaleString("fr-FR",{maximumFractionDigits:n})+e:typeof t=="boolean"?t?"Oui":"Non":typeof t=="string"&&t.trim()!==""?t:"Indisponible"}function ji(t){return R(t.live,"control.mode")==="hysteresis"||R(t.live,"learning.stage")==="bootstrap"}function Bt(t,e,n){if(!(n&&R(t,n)!==!0)&&!(e.startsWith("analysis.twin.")&&!e.endsWith("reliable")&&(R(t,"analysis.twin.twin_model_reliable")!==!0||R(t,"analysis.twin.twin_warming_up")!==!1)))return R(t,e)}function Va(t,e){return Object.values(t.states).find(i=>i.entity_id.startsWith("climate.")&&R(i.attributes,"specific_states.regulation_diagnostics")===e)??null}function jl(t){if(!t||!at(t.states))return[];let e=[];for(let n of Object.values(t.states)){if(!n?.entity_id?.startsWith("sensor.")||!at(n.attributes))continue;let i=n.attributes;if(i.schema_version!==2||!at(i.live)||!at(i.history))continue;let l=Va(t,n.entity_id),a=(typeof i.friendly_name=="string"?i.friendly_name:n.entity_id).replace(/ SmartPI Diagnostics$/i,"");e.push({entityId:n.entity_id,climateId:l?.entity_id??null,name:typeof l?.attributes.friendly_name=="string"?l.attributes.friendly_name:a,state:n.state,lastUpdated:n.last_updated??null,available:n.state!=="unknown"&&n.state!=="unavailable",live:n.state==="unknown"||n.state==="unavailable"?{}:i.live,history:i.history})}return e.sort((n,i)=>n.name.localeCompare(i.name,"fr"))}function gr(t){let e=[];if(!t.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];e.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),ji(t)&&e.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),R(t.live,"control.in_deadtime_window")===!0&&e.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),R(t.live,"model.tau_reliable")===!1&&e.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),R(t.live,"analysis.twin.twin_T_steady_reliable")===!1&&e.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let n=R(t.live,"feedforward.ff3_status");return typeof n=="string"&&n.startsWith("disabled:")&&e.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+n+"."),e}var qa=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function br(t){if(typeof t=="number")return Number.isFinite(t)&&t>0?t:null;if(typeof t!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(t))return null;let e=Date.parse(t);return Number.isFinite(e)?e/1e3:null}function vr(t){if(!Array.isArray(t))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let e=[];for(let n of t){if(!at(n))continue;let i=br(n.lu??n.last_updated);if(i===null)continue;let l=at(n.a)?n.a:at(n.attributes)?n.attributes:{},o=typeof n.s=="string"?n.s:typeof n.state=="string"?n.state:"unknown",a=l.schema_version===2&&o!=="unavailable"&&o!=="unknown";e.push({time:i,state:o,history:a&&at(l.history)?l.history:{},live:a&&at(l.live)?l.live:{}})}return Yn(e)}function Yn(t){return[...new Map(t.map(e=>[e.time,e])).values()].sort((e,n)=>e.time-n.time)}function Wi(t,e){if(e==="error"){let n=ct(R(t.history,"temperature.indoor")),i=ct(R(t.history,"setpoint.filtered_setpoint"));return n===null||i===null?null:i-n}return e.startsWith("live.")?ct(Bt(t.live,e.slice(5))):ct(R(t.history,e))}function Wl(t){return t.some(e=>qa.some(n=>Wi(e,n)!==null))}function yr(t){let e=[];for(let n=1;n<t.length;n++){let i=t[n-1],l=t[n],o=ct(R(i.history,"setpoint.filtered_setpoint")),a=ct(R(l.history,"setpoint.filtered_setpoint"));o!==null&&a!==null&&o!==a&&e.push({time:l.time,label:`Consigne filtr\xE9e ${o} \u2192 ${a} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),i.state!==l.state&&e.push({time:l.time,label:`Phase / \xE9tat : ${i.state} \u2192 ${l.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[d,p]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let h=R(i.live,d),b=R(l.live,d);h!=null&&b!==void 0&&b!==null&&h!==b&&e.push({time:l.time,label:`${p} : ${String(b)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${d}.`})}}return e}var Gn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(e,n,i=Date.now()/1e3){let l=new Set(e.map(o=>o.entityId));for(let o of this.buffers.keys())l.has(o)||(this.buffers.delete(o),this.revisions.delete(o));for(let o of e){let a=n[o.entityId]?.last_updated,d=br(a);if(!a||d===null||this.revisions.get(o.entityId)===a)continue;this.revisions.set(o.entityId,a);let p=this.buffers.get(o.entityId)??[];if(p.length&&d<=p[p.length-1].time)continue;let b={time:p.length===0?i:d,state:o.state,history:o.available?o.history:{},live:o.live};this.buffers.set(o.entityId,Yn([...p,b]).filter(m=>m.time>=i-48*3600).slice(-12e3))}}get(e){return this.buffers.get(e)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};async function xr(t,e,n,i,l=()=>!1){if(!e.startsWith("sensor.")||!Number.isFinite(n)||!Number.isFinite(i)||i<=n||i-n>48*3600)throw new Error("Fen\xEAtre historique invalide.");let o=[];for(let a=n;a<i;a+=12*3600){if(l())throw new Error("Lecture annul\xE9e.");let d=Math.min(i,a+12*3600),p=await t.callWS({type:"history/history_during_period",start_time:new Date(a*1e3).toISOString(),end_time:new Date(d*1e3).toISOString(),entity_ids:[e],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!at(p))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let h=vr(p[e]??[]);if(o.push(...h.filter(b=>b.time>=a&&b.time<=d)),o.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return Yn(o)}var Ba="uplot",ja="u-hz",Wa="u-vt",Ga="u-title",Ya="u-wrap",Ka="u-under",Ja="u-over",Za="u-axis",xi="u-off",Qa="u-select",Xa="u-cursor-x",ec="u-cursor-y",tc="u-cursor-pt",ic="u-legend",nc="u-live",lc="u-inline",sc="u-series",rc="u-marker",_r="u-label",oc="u-value",$n="width",An="height";var wr="bottom",Gi="left",Gl="right",us="#000",Sr=us+"0",Yl="mousemove",$r="mousedown",Kl="mouseup",Ar="mouseenter",kr="mouseleave",Er="dblclick",ac="resize",cc="scroll",Cr="change",Xn="dppxchange",ps="--",en=typeof window<"u",es=en?document:null,Ki=en?window:null,uc=en?navigator:null,ce,Kn;function ts(){let t=devicePixelRatio;ce!=t&&(ce=t,Kn&&ns(Cr,Kn,ts),Kn=matchMedia(`(min-resolution: ${ce-.001}dppx) and (max-resolution: ${ce+.001}dppx)`),_i(Cr,Kn,ts),Ki.dispatchEvent(new CustomEvent(Xn)))}function ut(t,e){if(e!=null){let n=t.classList;!n.contains(e)&&n.add(e)}}function is(t,e){let n=t.classList;n.contains(e)&&n.remove(e)}function _e(t,e,n){t.style[e]=n+"px"}function Et(t,e,n,i){let l=es.createElement(t);return e!=null&&ut(l,e),n?.insertBefore(l,i),l}function yt(t,e){return Et("div",t,e)}var Mr=new WeakMap;function Ot(t,e,n,i,l){let o="translate("+e+"px,"+n+"px)",a=Mr.get(t);o!=a&&(t.style.transform=o,Mr.set(t,o),e<0||n<0||e>i||n>l?ut(t,xi):is(t,xi))}var Pr=new WeakMap;function Tr(t,e,n){let i=e+n,l=Pr.get(t);i!=l&&(Pr.set(t,i),t.style.background=e,t.style.borderColor=n)}var Fr=new WeakMap;function Lr(t,e,n,i){let l=e+""+n,o=Fr.get(t);l!=o&&(Fr.set(t,l),t.style.height=n+"px",t.style.width=e+"px",t.style.marginLeft=i?-e/2+"px":0,t.style.marginTop=i?-n/2+"px":0)}var ds={passive:!0},pc={...ds,capture:!0};function _i(t,e,n,i){e.addEventListener(t,n,i?pc:ds)}function ns(t,e,n,i){e.removeEventListener(t,n,ds)}en&&ts();function Ct(t,e,n,i){let l;n=n||0,i=i||e.length-1;let o=i<=2147483647;for(;i-n>1;)l=o?n+i>>1:pt((n+i)/2),e[l]<t?n=l:i=l;return t-e[n]<=e[i]-t?n:i}function oo(t){return(n,i,l)=>{let o=-1,a=-1;for(let d=i;d<=l;d++)if(t(n[d])){o=d;break}for(let d=l;d>=i;d--)if(t(n[d])){a=d;break}return[o,a]}}var ao=t=>t!=null,co=t=>t!=null&&t>0,il=oo(ao),dc=oo(co);function fc(t,e,n,i=0,l=!1){let o=l?dc:il,a=l?co:ao;[e,n]=o(t,e,n);let d=t[e],p=t[e];if(e>-1)if(i==1)d=t[e],p=t[n];else if(i==-1)d=t[n],p=t[e];else for(let h=e;h<=n;h++){let b=t[h];a(b)&&(b<d?d=b:b>p&&(p=b))}return[d??me,p??-me]}function nl(t,e,n,i){let l=zr(t),o=zr(e);t==e&&(l==-1?(t*=n,e/=n):(t/=n,e*=n));let a=n==10?jt:uo,d=l==1?pt:xt,p=o==1?xt:pt,h=d(a(De(t))),b=p(a(De(e))),m=Ji(n,h),v=Ji(n,b);return n==10&&(h<0&&(m=ge(m,-h)),b<0&&(v=ge(v,-b))),i||n==2?(t=m*l,e=v*o):(t=mo(t,m),e=ll(e,v)),[t,e]}function fs(t,e,n,i){let l=nl(t,e,n,i);return t==0&&(l[0]=0),e==0&&(l[1]=0),l}var hs=.1,Dr={mode:3,pad:hs},En={pad:0,soft:null,mode:0},hc={min:En,max:En};function el(t,e,n,i){return sl(n)?Rr(t,e,n):(En.pad=n,En.soft=i?0:null,En.mode=i?3:0,Rr(t,e,hc))}function oe(t,e){return t??e}function mc(t,e,n){for(e=oe(e,0),n=oe(n,t.length-1);e<=n;){if(t[e]!=null)return!0;e++}return!1}function Rr(t,e,n){let i=n.min,l=n.max,o=oe(i.pad,0),a=oe(l.pad,0),d=oe(i.hard,-me),p=oe(l.hard,me),h=oe(i.soft,me),b=oe(l.soft,-me),m=oe(i.mode,0),v=oe(l.mode,0),k=e-t,C=jt(k),I=Qe(De(t),De(e)),N=jt(I),q=De(N-C);(k<1e-24||q>10)&&(k=0,(t==0||e==0)&&(k=1e-24,m==2&&h!=me&&(o=0),v==2&&b!=-me&&(a=0)));let w=k||I||1e3,O=jt(w),S=Ji(10,pt(O)),J=w*(k==0?t==0?.1:1:o),T=ge(mo(t-J,S/10),24),Z=t>=h&&(m==1||m==3&&T<=h||m==2&&T>=h)?h:me,G=Qe(d,T<Z&&t>=Z?Z:Mt(Z,T)),te=w*(k==0?e==0?.1:1:a),W=ge(ll(e+te,S/10),24),$=e<=b&&(v==1||v==3&&W>=b||v==2&&W<=b)?b:-me,K=Mt(p,W>$&&e<=$?$:Qe($,W));return G==K&&G==0&&(K=100),[G,K]}var gc=new Intl.NumberFormat(en?uc.language:"en-US"),ms=t=>gc.format(t),dt=Math,Qn=dt.PI,De=dt.abs,pt=dt.floor,Le=dt.round,xt=dt.ceil,Mt=dt.min,Qe=dt.max,Ji=dt.pow,zr=dt.sign,jt=dt.log10,uo=dt.log2,bc=(t,e=1)=>dt.sinh(t)*e,Jl=(t,e=1)=>dt.asinh(t/e),me=1/0;function Hr(t){return(jt((t^t>>31)-(t>>31))|0)+1}function ls(t,e,n){return Mt(Qe(t,e),n)}function po(t){return typeof t=="function"}function ne(t){return po(t)?t:()=>t}var vc=()=>{},fo=t=>t,ho=(t,e)=>e,yc=t=>null,Ir=t=>!0,Or=(t,e)=>t==e,xc=/\.\d*?(?=9{6,}|0{6,})/gm,wi=t=>{if(bo(t)||ii.has(t))return t;let e=`${t}`,n=e.match(xc);if(n==null)return t;let i=n[0].length-1;if(e.indexOf("e-")!=-1){let[l,o]=e.split("e");return+`${wi(l)}e${o}`}return ge(t,i)};function vi(t,e){return wi(ge(wi(t/e))*e)}function ll(t,e){return wi(xt(wi(t/e))*e)}function mo(t,e){return wi(pt(wi(t/e))*e)}function ge(t,e=0){if(bo(t))return t;let n=10**e,i=t*n*(1+Number.EPSILON);return Le(i)/n}var ii=new Map;function go(t){return((""+t).split(".")[1]||"").length}function Mn(t,e,n,i){let l=[],o=i.map(go);for(let a=e;a<n;a++){let d=De(a),p=ge(Ji(t,a),d);for(let h=0;h<i.length;h++){let b=t==10?+`${i[h]}e${a}`:i[h]*p,m=(a>=0?0:d)+(a>=o[h]?0:o[h]),v=t==10?b:ge(b,m);l.push(v),ii.set(v,m)}}return l}var Cn={},gs=[],Zi=[null,null],ti=Array.isArray,bo=Number.isInteger,_c=t=>t===void 0;function Nr(t){return typeof t=="string"}function sl(t){let e=!1;if(t!=null){let n=t.constructor;e=n==null||n==Object}return e}function wc(t){return t!=null&&typeof t=="object"}var Sc=Object.getPrototypeOf(Uint8Array),vo="__proto__";function Qi(t,e=sl){let n;if(ti(t)){let i=t.find(l=>l!=null);if(ti(i)||e(i)){n=Array(t.length);for(let l=0;l<t.length;l++)n[l]=Qi(t[l],e)}else n=t.slice()}else if(t instanceof Sc)n=t.slice();else if(e(t)){n={};for(let i in t)i!=vo&&(n[i]=Qi(t[i],e))}else n=t;return n}function Pe(t){let e=arguments;for(let n=1;n<e.length;n++){let i=e[n];for(let l in i)l!=vo&&(sl(t[l])?Pe(t[l],Qi(i[l])):t[l]=Qi(i[l]))}return t}var $c=0,Ac=1,kc=2;function Ec(t,e,n){for(let i=0,l,o=-1;i<e.length;i++){let a=e[i];if(a>o){for(l=a-1;l>=0&&t[l]==null;)t[l--]=null;for(l=a+1;l<n&&t[l]==null;)t[o=l++]=null}}}function Cc(t,e){if(Tc(t)){let a=t[0].slice();for(let d=1;d<t.length;d++)a.push(...t[d].slice(1));return Fc(a[0])||(a=Pc(a)),a}let n=new Set;for(let a=0;a<t.length;a++){let p=t[a][0],h=p.length;for(let b=0;b<h;b++)n.add(p[b])}let i=[Array.from(n).sort((a,d)=>a-d)],l=i[0].length,o=new Map;for(let a=0;a<l;a++)o.set(i[0][a],a);for(let a=0;a<t.length;a++){let d=t[a],p=d[0];for(let h=1;h<d.length;h++){let b=d[h],m=Array(l).fill(void 0),v=e?e[a][h]:Ac,k=[];for(let C=0;C<b.length;C++){let I=b[C],N=o.get(p[C]);I===null?v!=$c&&(m[N]=I,v==kc&&k.push(N)):m[N]=I}Ec(m,k,l),i.push(m)}}return i}var Mc=typeof queueMicrotask>"u"?t=>Promise.resolve().then(t):queueMicrotask;function Pc(t){let e=t[0],n=e.length,i=Array(n);for(let o=0;o<i.length;o++)i[o]=o;i.sort((o,a)=>e[o]-e[a]);let l=[];for(let o=0;o<t.length;o++){let a=t[o],d=Array(n);for(let p=0;p<n;p++)d[p]=a[i[p]];l.push(d)}return l}function Tc(t){let e=t[0][0],n=e.length;for(let i=1;i<t.length;i++){let l=t[i][0];if(l.length!=n)return!1;if(l!=e){for(let o=0;o<n;o++)if(l[o]!=e[o])return!1}}return!0}function Fc(t,e=100){let n=t.length;if(n<=1)return!0;let i=0,l=n-1;for(;i<=l&&t[i]==null;)i++;for(;l>=i&&t[l]==null;)l--;if(l<=i)return!0;let o=Qe(1,pt((l-i+1)/e));for(let a=t[i],d=i+o;d<=l;d+=o){let p=t[d];if(p!=null){if(p<=a)return!1;a=p}}return!0}var yo=["January","February","March","April","May","June","July","August","September","October","November","December"],xo=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function _o(t){return t.slice(0,3)}var Lc=xo.map(_o),Dc=yo.map(_o),Rc={MMMM:yo,MMM:Dc,WWWW:xo,WWW:Lc};function Sn(t){return(t<10?"0":"")+t}function zc(t){return(t<10?"00":t<100?"0":"")+t}var Hc={YYYY:t=>t.getFullYear(),YY:t=>(t.getFullYear()+"").slice(2),MMMM:(t,e)=>e.MMMM[t.getMonth()],MMM:(t,e)=>e.MMM[t.getMonth()],MM:t=>Sn(t.getMonth()+1),M:t=>t.getMonth()+1,DD:t=>Sn(t.getDate()),D:t=>t.getDate(),WWWW:(t,e)=>e.WWWW[t.getDay()],WWW:(t,e)=>e.WWW[t.getDay()],HH:t=>Sn(t.getHours()),H:t=>t.getHours(),h:t=>{let e=t.getHours();return e==0?12:e>12?e-12:e},AA:t=>t.getHours()>=12?"PM":"AM",aa:t=>t.getHours()>=12?"pm":"am",a:t=>t.getHours()>=12?"p":"a",mm:t=>Sn(t.getMinutes()),m:t=>t.getMinutes(),ss:t=>Sn(t.getSeconds()),s:t=>t.getSeconds(),fff:t=>zc(t.getMilliseconds())};function bs(t,e){e=e||Rc;let n=[],i=/\{([a-z]+)\}|[^{]+/gi,l;for(;l=i.exec(t);)n.push(l[0][0]=="{"?Hc[l[1]]:l[0]);return o=>{let a="";for(let d=0;d<n.length;d++)a+=typeof n[d]=="string"?n[d]:n[d](o,e);return a}}var Ic=new Intl.DateTimeFormat().resolvedOptions().timeZone;function Oc(t,e){let n;return e=="UTC"||e=="Etc/UTC"?n=new Date(+t+t.getTimezoneOffset()*6e4):e==Ic?n=t:(n=new Date(t.toLocaleString("en-US",{timeZone:e})),n.setMilliseconds(t.getMilliseconds())),n}var wo=t=>t%1==0,tl=[1,2,2.5,5],Nc=Mn(10,-32,0,tl),So=Mn(10,0,32,tl),Uc=So.filter(wo),yi=Nc.concat(So),vs=`
`,$o="{YYYY}",Ur=vs+$o,Ao="{M}/{D}",kn=vs+Ao,Jn=kn+"/{YY}",ko="{aa}",Vc="{h}:{mm}",Yi=Vc+ko,Vr=vs+Yi,qr=":{ss}",pe=null;function Eo(t){let e=t*1e3,n=e*60,i=n*60,l=i*24,o=l*30,a=l*365,p=(t==1?Mn(10,0,3,tl).filter(wo):Mn(10,-3,0,tl)).concat([e,e*5,e*10,e*15,e*30,n,n*5,n*10,n*15,n*30,i,i*2,i*3,i*4,i*6,i*8,i*12,l,l*2,l*3,l*4,l*5,l*6,l*7,l*8,l*9,l*10,l*15,o,o*2,o*3,o*4,o*6,a,a*2,a*5,a*10,a*25,a*50,a*100]),h=[[a,$o,pe,pe,pe,pe,pe,pe,1],[l*28,"{MMM}",Ur,pe,pe,pe,pe,pe,1],[l,Ao,Ur,pe,pe,pe,pe,pe,1],[i,"{h}"+ko,Jn,pe,kn,pe,pe,pe,1],[n,Yi,Jn,pe,kn,pe,pe,pe,1],[e,qr,Jn+" "+Yi,pe,kn+" "+Yi,pe,Vr,pe,1],[t,qr+".{fff}",Jn+" "+Yi,pe,kn+" "+Yi,pe,Vr,pe,1]];function b(m){return(v,k,C,I,N,q)=>{let w=[],O=N>=a,S=N>=o&&N<a,J=m(C),T=ge(J*t,3),Z=Zl(J.getFullYear(),O?0:J.getMonth(),S||O?1:J.getDate()),G=ge(Z*t,3);if(S||O){let te=S?N/o:0,W=O?N/a:0,$=T==G?T:ge(Zl(Z.getFullYear()+W,Z.getMonth()+te,1)*t,3),K=new Date(Le($/t)),F=K.getFullYear(),B=K.getMonth();for(let H=0;$<=I;H++){let le=Zl(F+W*H,B+te*H,1),z=le-m(ge(le*t,3));$=ge((+le+z)*t,3),$<=I&&w.push($)}}else{let te=N>=l?l:N,W=pt(C)-pt(T),$=G+W+ll(T-G,te);w.push($);let K=m($),F=K.getHours()+K.getMinutes()/n+K.getSeconds()/i,B=N/i,H=v.axes[k]._space,le=q/H;for(;$=ge($+N,t==1?0:3),!($>I);)if(B>1){let z=pt(ge(F+B,6))%24,se=m($).getHours()-z;se>1&&(se=-1),$-=se*i,F=(F+B)%24;let de=w[w.length-1];ge(($-de)/N,3)*le>=.7&&w.push($)}else w.push($)}return w}}return[p,h,b]}var[qc,Bc,jc]=Eo(1),[Wc,Gc,Yc]=Eo(.001);Mn(2,-53,53,[1]);function Br(t,e){return t.map(n=>n.map((i,l)=>l==0||l==8||i==null?i:e(l==1||n[8]==0?i:n[1]+i)))}function jr(t,e){return(n,i,l,o,a)=>{let d=e.find(C=>a>=C[0])||e[e.length-1],p,h,b,m,v,k;return i.map(C=>{let I=t(C),N=I.getFullYear(),q=I.getMonth(),w=I.getDate(),O=I.getHours(),S=I.getMinutes(),J=I.getSeconds(),T=N!=p&&d[2]||q!=h&&d[3]||w!=b&&d[4]||O!=m&&d[5]||S!=v&&d[6]||J!=k&&d[7]||d[1];return p=N,h=q,b=w,m=O,v=S,k=J,T(I)})}}function Kc(t,e){let n=bs(e);return(i,l,o,a,d)=>l.map(p=>n(t(p)))}function Zl(t,e,n){return new Date(t,e,n)}function Wr(t,e){return e(t)}var Jc="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Gr(t,e){return(n,i,l,o)=>o==null?ps:e(t(i))}function Zc(t,e){let n=t.series[e];return n.width?n.stroke(t,e):n.points.width?n.points.stroke(t,e):null}function Qc(t,e){return t.series[e].fill(t,e)}var Xc={show:!0,live:!0,isolate:!1,mount:vc,markers:{show:!0,width:2,stroke:Zc,fill:Qc,dash:"solid"},idx:null,idxs:null,values:[]};function eu(t,e){let n=t.cursor.points,i=yt(),l=n.size(t,e);_e(i,$n,l),_e(i,An,l);let o=l/-2;_e(i,"marginLeft",o),_e(i,"marginTop",o);let a=n.width(t,e,l);return a&&_e(i,"borderWidth",a),i}function tu(t,e){let n=t.series[e].points;return n._fill||n._stroke}function iu(t,e){let n=t.series[e].points;return n._stroke||n._fill}function nu(t,e){return t.series[e].points.size}var Ql=[0,0];function lu(t,e,n){return Ql[0]=e,Ql[1]=n,Ql}function Zn(t,e,n,i=!0){return l=>{l.button==0&&(!i||l.target==e)&&n(l)}}function Xl(t,e,n,i=!0){return l=>{(!i||l.target==e)&&n(l)}}var su={show:!0,x:!0,y:!0,lock:!1,move:lu,points:{one:!1,show:eu,size:nu,width:0,stroke:iu,fill:tu},bind:{mousedown:Zn,mouseup:Zn,click:Zn,dblclick:Zn,mousemove:Xl,mouseleave:Xl,mouseenter:Xl},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(t,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(t,e,n,i,l)=>i-l,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Co={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},ys=Pe({},Co,{filter:ho}),Mo=Pe({},ys,{size:10}),Po=Pe({},Co,{show:!1}),xs='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',To="bold "+xs,Fo=1.5,Yr={show:!0,scale:"x",stroke:us,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:To,side:2,grid:ys,ticks:Mo,border:Po,font:xs,lineGap:Fo,rotate:0},ru="Value",ou="Time",Kr={show:!0,scale:"x",auto:!1,sorted:1,min:me,max:-me,idxs:[]};function au(t,e,n,i,l){return e.map(o=>o==null?"":ms(o))}function cu(t,e,n,i,l,o,a){let d=[],p=ii.get(l)||0;n=a?n:ge(ll(n,l),p);for(let h=n;h<=i;h=ge(h+l,p))d.push(Object.is(h,-0)?0:h);return d}function ss(t,e,n,i,l,o,a){let d=[],p=t.scales[t.axes[e].scale].log,h=p==10?jt:uo,b=pt(h(n));l=Ji(p,b),p==10&&(l=yi[Ct(l,yi)]);let m=n,v=l*p;p==10&&(v=yi[Ct(v,yi)]);do d.push(m),m=m+l,p==10&&!ii.has(m)&&(m=ge(m,ii.get(l))),m>=v&&(l=m,v=l*p,p==10&&(v=yi[Ct(v,yi)]));while(m<=i);return d}function uu(t,e,n,i,l,o,a){let p=t.scales[t.axes[e].scale].asinh,h=i>p?ss(t,e,Qe(p,n),i,l):[p],b=i>=0&&n<=0?[0]:[];return(n<-p?ss(t,e,Qe(p,-i),-n,l):[p]).reverse().map(v=>-v).concat(b,h)}var Lo=/./,pu=/[12357]/,du=/[125]/,Jr=/1/,rs=(t,e,n,i)=>t.map((l,o)=>e==4&&l==0||o%i==0&&n.test(l.toExponential()[l<0?1:0])?l:null);function fu(t,e,n,i,l){let o=t.axes[n],a=o.scale,d=t.scales[a],p=t.valToPos,h=o._space,b=p(10,a),m=p(9,a)-b>=h?Lo:p(7,a)-b>=h?pu:p(5,a)-b>=h?du:Jr;if(m==Jr){let v=De(p(1,a)-b);if(v<h)return rs(e.slice().reverse(),d.distr,m,xt(h/v)).reverse()}return rs(e,d.distr,m,1)}function hu(t,e,n,i,l){let o=t.axes[n],a=o.scale,d=o._space,p=t.valToPos,h=De(p(1,a)-p(2,a));return h<d?rs(e.slice().reverse(),3,Lo,xt(d/h)).reverse():e}function mu(t,e,n,i){return i==null?ps:e==null?"":ms(e)}var Zr={show:!0,scale:"y",stroke:us,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:To,side:3,grid:ys,ticks:Mo,border:Po,font:xs,lineGap:Fo,rotate:0};function gu(t,e){let n=3+(t||1)*2;return ge(n*e,3)}function bu(t,e){let{scale:n,idxs:i}=t.series[0],l=t._data[0],o=t.valToPos(l[i[0]],n,!0),a=t.valToPos(l[i[1]],n,!0),d=De(a-o),p=t.series[e],h=d/(p.points.space*ce);return i[1]-i[0]<=h}var Qr={scale:null,auto:!0,sorted:0,min:me,max:-me},Do=(t,e,n,i,l)=>l,Xr={show:!0,auto:!0,sorted:0,gaps:Do,alpha:1,facets:[Pe({},Qr,{scale:"x"}),Pe({},Qr,{scale:"y"})]},eo={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:Do,alpha:1,points:{show:bu,filter:null},values:null,min:me,max:-me,idxs:[],path:null,clip:null};function vu(t,e,n,i,l){return n/10}var Ro={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},yu=Pe({},Ro,{time:!1,ori:1}),to={};function zo(t,e){let n=to[t];return n||(n={key:t,plots:[],sub(i){n.plots.push(i)},unsub(i){n.plots=n.plots.filter(l=>l!=i)},pub(i,l,o,a,d,p,h){for(let b=0;b<n.plots.length;b++)n.plots[b]!=l&&n.plots[b].pub(i,l,o,a,d,p,h)}},t!=null&&(to[t]=n)),n}var Xi=1,os=2;function Si(t,e,n){let i=t.mode,l=t.series[e],o=i==2?t._data[e]:t._data,a=t.scales,d=t.bbox,p=o[0],h=i==2?o[1]:o[e],b=i==2?a[l.facets[0].scale]:a[t.series[0].scale],m=i==2?a[l.facets[1].scale]:a[l.scale],v=d.left,k=d.top,C=d.width,I=d.height,N=t.valToPosH,q=t.valToPosV;return b.ori==0?n(l,p,h,b,m,N,q,v,k,C,I,ol,tn,cl,Io,No):n(l,p,h,b,m,q,N,k,v,I,C,al,nn,Ss,Oo,Uo)}function _s(t,e){let n=0,i=0,l=oe(t.bands,gs);for(let o=0;o<l.length;o++){let a=l[o];a.series[0]==e?n=a.dir:a.series[1]==e&&(a.dir==1?i|=1:i|=2)}return[n,i==1?-1:i==2?1:i==3?2:0]}function xu(t,e,n,i,l){let o=t.mode,a=t.series[e],d=o==2?a.facets[1].scale:a.scale,p=t.scales[d];return l==-1?p.min:l==1?p.max:p.distr==3?p.dir==1?p.min:p.max:0}function Wt(t,e,n,i,l,o){return Si(t,e,(a,d,p,h,b,m,v,k,C,I,N)=>{let q=a.pxRound,w=h.dir*(h.ori==0?1:-1),O=h.ori==0?tn:nn,S,J;w==1?(S=n,J=i):(S=i,J=n);let T=q(m(d[S],h,I,k)),Z=q(v(p[S],b,N,C)),G=q(m(d[J],h,I,k)),te=q(v(o==1?b.max:b.min,b,N,C)),W=new Path2D(l);return O(W,G,te),O(W,T,te),O(W,T,Z),W})}function rl(t,e,n,i,l,o){let a=null;if(t.length>0){a=new Path2D;let d=e==0?cl:Ss,p=n;for(let m=0;m<t.length;m++){let v=t[m];if(v[1]>v[0]){let k=v[0]-p;k>0&&d(a,p,i,k,i+o),p=v[1]}}let h=n+l-p,b=10;h>0&&d(a,p,i-b/2,h,i+o+b)}return a}function _u(t,e,n){let i=t[t.length-1];i&&i[0]==e?i[1]=n:t.push([e,n])}function ws(t,e,n,i,l,o,a){let d=[],p=t.length;for(let h=l==1?n:i;h>=n&&h<=i;h+=l)if(e[h]===null){let m=h,v=h;if(l==1)for(;++h<=i&&e[h]===null;)v=h;else for(;--h>=n&&e[h]===null;)v=h;let k=o(t[m]),C=v==m?k:o(t[v]),I=m-l;k=a<=0&&I>=0&&I<p?o(t[I]):k;let q=v+l;C=a>=0&&q>=0&&q<p?o(t[q]):C,C>=k&&d.push([k,C])}return d}function io(t){return t==0?fo:t==1?Le:e=>vi(e,t)}function Ho(t){let e=t==0?ol:al,n=t==0?(l,o,a,d,p,h)=>{l.arcTo(o,a,d,p,h)}:(l,o,a,d,p,h)=>{l.arcTo(a,o,p,d,h)},i=t==0?(l,o,a,d,p)=>{l.rect(o,a,d,p)}:(l,o,a,d,p)=>{l.rect(a,o,p,d)};return(l,o,a,d,p,h=0,b=0)=>{h==0&&b==0?i(l,o,a,d,p):(h=Mt(h,d/2,p/2),b=Mt(b,d/2,p/2),e(l,o+h,a),n(l,o+d,a,o+d,a+p,h),n(l,o+d,a+p,o,a+p,b),n(l,o,a+p,o,a,b),n(l,o,a,o+d,a,h),l.closePath())}}var ol=(t,e,n)=>{t.moveTo(e,n)},al=(t,e,n)=>{t.moveTo(n,e)},tn=(t,e,n)=>{t.lineTo(e,n)},nn=(t,e,n)=>{t.lineTo(n,e)},cl=Ho(0),Ss=Ho(1),Io=(t,e,n,i,l,o)=>{t.arc(e,n,i,l,o)},Oo=(t,e,n,i,l,o)=>{t.arc(n,e,i,l,o)},No=(t,e,n,i,l,o,a)=>{t.bezierCurveTo(e,n,i,l,o,a)},Uo=(t,e,n,i,l,o,a)=>{t.bezierCurveTo(n,e,l,i,a,o)};function Vo(t){return(e,n,i,l,o)=>Si(e,n,(a,d,p,h,b,m,v,k,C,I,N)=>{let{pxRound:q,points:w}=a,O,S;h.ori==0?(O=ol,S=Io):(O=al,S=Oo);let J=ge(w.width*ce,3),T=(w.size-w.width)/2*ce,Z=ge(T*2,3),G=new Path2D,te=new Path2D,{left:W,top:$,width:K,height:F}=e.bbox;cl(te,W-Z,$-Z,K+Z*2,F+Z*2);let B=H=>{if(p[H]!=null){let le=q(m(d[H],h,I,k)),z=q(v(p[H],b,N,C));O(G,le+T,z),S(G,le,z,T,0,Qn*2)}};if(o)o.forEach(B);else for(let H=i;H<=l;H++)B(H);return{stroke:J>0?G:null,fill:G,clip:te,flags:Xi|os}})}function qo(t){return(e,n,i,l,o,a)=>{i!=l&&(o!=i&&a!=i&&t(e,n,i),o!=l&&a!=l&&t(e,n,l),t(e,n,a))}}var wu=qo(tn),Su=qo(nn);function Bo(t){let e=oe(t?.alignGaps,0);return(n,i,l,o)=>Si(n,i,(a,d,p,h,b,m,v,k,C,I,N)=>{[l,o]=il(p,l,o);let q=a.pxRound,w=F=>q(m(F,h,I,k)),O=F=>q(v(F,b,N,C)),S,J;h.ori==0?(S=tn,J=wu):(S=nn,J=Su);let T=h.dir*(h.ori==0?1:-1),Z={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},G=Z.stroke,te=!1;if(o-l>=I*4){let F=L=>n.posToVal(L,h.key,!0),B=null,H=null,le,z,Xe,we=w(d[T==1?l:o]),se=w(d[l]),de=w(d[o]),Q=F(T==1?se+1:de-1);for(let L=T==1?l:o;L>=l&&L<=o;L+=T){let Te=d[L],Se=(T==1?Te<Q:Te>Q)?we:w(Te),ue=p[L];Se==we?ue!=null?(z=ue,B==null?(S(G,Se,O(z)),le=B=H=z):z<B?B=z:z>H&&(H=z)):ue===null&&(te=!0):(B!=null&&J(G,we,O(B),O(H),O(le),O(z)),ue!=null?(z=ue,S(G,Se,O(z)),B=H=le=z):(B=H=null,ue===null&&(te=!0)),we=Se,Q=F(we+T))}B!=null&&B!=H&&Xe!=we&&J(G,we,O(B),O(H),O(le),O(z))}else for(let F=T==1?l:o;F>=l&&F<=o;F+=T){let B=p[F];B===null?te=!0:B!=null&&S(G,w(d[F]),O(B))}let[$,K]=_s(n,i);if(a.fill!=null||$!=0){let F=Z.fill=new Path2D(G),B=a.fillTo(n,i,a.min,a.max,$),H=O(B),le=w(d[l]),z=w(d[o]);T==-1&&([z,le]=[le,z]),S(F,z,H),S(F,le,H)}if(!a.spanGaps){let F=[];te&&F.push(...ws(d,p,l,o,T,w,e)),Z.gaps=F=a.gaps(n,i,l,o,F),Z.clip=rl(F,h.ori,k,C,I,N)}return K!=0&&(Z.band=K==2?[Wt(n,i,l,o,G,-1),Wt(n,i,l,o,G,1)]:Wt(n,i,l,o,G,K)),Z})}function $u(t){let e=oe(t.align,1),n=oe(t.ascDesc,!1),i=oe(t.alignGaps,0),l=oe(t.extend,!1);return(o,a,d,p)=>Si(o,a,(h,b,m,v,k,C,I,N,q,w,O)=>{[d,p]=il(m,d,p);let S=h.pxRound,{left:J,width:T}=o.bbox,Z=se=>S(C(se,v,w,N)),G=se=>S(I(se,k,O,q)),te=v.ori==0?tn:nn,W={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Xi},$=W.stroke,K=v.dir*(v.ori==0?1:-1),F=G(m[K==1?d:p]),B=Z(b[K==1?d:p]),H=B,le=B;l&&e==-1&&(le=J,te($,le,F)),te($,B,F);for(let se=K==1?d:p;se>=d&&se<=p;se+=K){let de=m[se];if(de==null)continue;let Q=Z(b[se]),L=G(de);e==1?te($,Q,F):te($,H,L),te($,Q,L),F=L,H=Q}let z=H;l&&e==1&&(z=J+T,te($,z,F));let[Xe,we]=_s(o,a);if(h.fill!=null||Xe!=0){let se=W.fill=new Path2D($),de=h.fillTo(o,a,h.min,h.max,Xe),Q=G(de);te(se,z,Q),te(se,le,Q)}if(!h.spanGaps){let se=[];se.push(...ws(b,m,d,p,K,Z,i));let de=h.width*ce/2,Q=n||e==1?de:-de,L=n||e==-1?-de:de;se.forEach(Te=>{Te[0]+=Q,Te[1]+=L}),W.gaps=se=h.gaps(o,a,d,p,se),W.clip=rl(se,v.ori,N,q,w,O)}return we!=0&&(W.band=we==2?[Wt(o,a,d,p,$,-1),Wt(o,a,d,p,$,1)]:Wt(o,a,d,p,$,we)),W})}function no(t,e,n,i,l,o,a=me){if(t.length>1){let d=null;for(let p=0,h=1/0;p<t.length;p++)if(e[p]!==void 0){if(d!=null){let b=De(t[p]-t[d]);b<h&&(h=b,a=De(n(t[p],i,l,o)-n(t[d],i,l,o)))}d=p}}return a}function Au(t){t=t||Cn;let e=oe(t.size,[.6,me,1]),n=t.align||0,i=t.gap||0,l=t.radius;l=l==null?[0,0]:typeof l=="number"?[l,0]:l;let o=ne(l),a=1-e[0],d=oe(e[1],me),p=oe(e[2],1),h=oe(t.disp,Cn),b=oe(t.each,k=>{}),{fill:m,stroke:v}=h;return(k,C,I,N)=>Si(k,C,(q,w,O,S,J,T,Z,G,te,W,$)=>{let K=q.pxRound,F=n,B=i*ce,H=d*ce,le=p*ce,z,Xe;S.ori==0?[z,Xe]=o(k,C):[Xe,z]=o(k,C);let we=S.dir*(S.ori==0?1:-1),se=S.ori==0?cl:Ss,de=S.ori==0?b:(M,be,Fe,Ei,ri,Ft,oi)=>{b(M,be,Fe,ri,Ei,oi,Ft)},Q=oe(k.bands,gs).find(M=>M.series[0]==C),L=Q!=null?Q.dir:0,Te=q.fillTo(k,C,q.min,q.max,L),Ge=K(Z(Te,J,$,te)),Se,ue,_t,nt=W,Ae=K(q.width*ce),Tt=!1,Nt=null,ft=null,Yt=null,$i=null;m!=null&&(Ae==0||v!=null)&&(Tt=!0,Nt=m.values(k,C,I,N),ft=new Map,new Set(Nt).forEach(M=>{M!=null&&ft.set(M,new Path2D)}),Ae>0&&(Yt=v.values(k,C,I,N),$i=new Map,new Set(Yt).forEach(M=>{M!=null&&$i.set(M,new Path2D)})));let{x0:Ai,size:rn}=h;if(Ai!=null&&rn!=null){F=1,w=Ai.values(k,C,I,N),Ai.unit==2&&(w=w.map(Fe=>k.posToVal(G+Fe*W,S.key,!0)));let M=rn.values(k,C,I,N);rn.unit==2?ue=M[0]*W:ue=T(M[0],S,W,G)-T(0,S,W,G),nt=no(w,O,T,S,W,G,nt),_t=nt-ue+B}else nt=no(w,O,T,S,W,G,nt),_t=nt*a+B,ue=nt-_t;_t<1&&(_t=0),Ae>=ue/2&&(Ae=0),_t<5&&(K=fo);let Pn=_t>0,li=nt-_t-(Pn?Ae:0);ue=K(ls(li,le,H)),Se=(F==0?ue/2:F==we?0:ue)-F*we*((F==0?B/2:0)+(Pn?Ae/2:0));let Ye={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},ki=Tt?null:new Path2D,Ut=null;if(Q!=null)Ut=k.data[Q.series[1]];else{let{y0:M,y1:be}=h;M!=null&&be!=null&&(O=be.values(k,C,I,N),Ut=M.values(k,C,I,N))}let si=z*ue,Y=Xe*ue;for(let M=we==1?I:N;M>=I&&M<=N;M+=we){let be=O[M];if(be==null)continue;if(Ut!=null){let et=Ut[M]??0;if(be-et==0)continue;Ge=Z(et,J,$,te)}let Fe=S.distr!=2||h!=null?w[M]:M,Ei=T(Fe,S,W,G),ri=Z(oe(be,Te),J,$,te),Ft=K(Ei-Se),oi=K(Qe(ri,Ge)),lt=K(Mt(ri,Ge)),ht=oi-lt;if(be!=null){let et=be<0?Y:si,wt=be<0?si:Y;Tt?(Ae>0&&Yt[M]!=null&&se($i.get(Yt[M]),Ft,lt+pt(Ae/2),ue,Qe(0,ht-Ae),et,wt),Nt[M]!=null&&se(ft.get(Nt[M]),Ft,lt+pt(Ae/2),ue,Qe(0,ht-Ae),et,wt)):se(ki,Ft,lt+pt(Ae/2),ue,Qe(0,ht-Ae),et,wt),de(k,C,M,Ft-Ae/2,lt,ue+Ae,ht)}}return Ae>0?Ye.stroke=Tt?$i:ki:Tt||(Ye._fill=q.width==0?q._fill:q._stroke??q._fill,Ye.width=0),Ye.fill=Tt?ft:ki,Ye})}function ku(t,e){let n=oe(e?.alignGaps,0);return(i,l,o,a)=>Si(i,l,(d,p,h,b,m,v,k,C,I,N,q)=>{[o,a]=il(h,o,a);let w=d.pxRound,O=z=>w(v(z,b,N,C)),S=z=>w(k(z,m,q,I)),J,T,Z;b.ori==0?(J=ol,Z=tn,T=No):(J=al,Z=nn,T=Uo);let G=b.dir*(b.ori==0?1:-1),te=O(p[G==1?o:a]),W=te,$=[],K=[];for(let z=G==1?o:a;z>=o&&z<=a;z+=G)if(h[z]!=null){let we=p[z],se=O(we);$.push(W=se),K.push(S(h[z]))}let F={stroke:t($,K,J,Z,T,w),fill:null,clip:null,band:null,gaps:null,flags:Xi},B=F.stroke,[H,le]=_s(i,l);if(d.fill!=null||H!=0){let z=F.fill=new Path2D(B),Xe=d.fillTo(i,l,d.min,d.max,H),we=S(Xe);Z(z,W,we),Z(z,te,we)}if(!d.spanGaps){let z=[];z.push(...ws(p,h,o,a,G,O,n)),F.gaps=z=d.gaps(i,l,o,a,z),F.clip=rl(z,b.ori,C,I,N,q)}return le!=0&&(F.band=le==2?[Wt(i,l,o,a,B,-1),Wt(i,l,o,a,B,1)]:Wt(i,l,o,a,B,le)),F})}function Eu(t){return ku(Cu,t)}function Cu(t,e,n,i,l,o){let a=t.length;if(a<2)return null;let d=new Path2D;if(n(d,t[0],e[0]),a==2)i(d,t[1],e[1]);else{let p=Array(a),h=Array(a-1),b=Array(a-1),m=Array(a-1);for(let v=0;v<a-1;v++)b[v]=e[v+1]-e[v],m[v]=t[v+1]-t[v],h[v]=b[v]/m[v];p[0]=h[0];for(let v=1;v<a-1;v++)h[v]===0||h[v-1]===0||h[v-1]>0!=h[v]>0?p[v]=0:(p[v]=3*(m[v-1]+m[v])/((2*m[v]+m[v-1])/h[v-1]+(m[v]+2*m[v-1])/h[v]),isFinite(p[v])||(p[v]=0));p[a-1]=h[a-2];for(let v=0;v<a-1;v++)l(d,t[v]+m[v]/3,e[v]+p[v]*m[v]/3,t[v+1]-m[v]/3,e[v+1]-p[v+1]*m[v]/3,t[v+1],e[v+1])}return d}var as=new Set;function lo(){for(let t of as)t.syncRect(!0)}en&&(_i(ac,Ki,lo),_i(cc,Ki,lo,!0),_i(Xn,Ki,()=>{Ue.pxRatio=ce}));var Mu=Bo(),Pu=Vo();function so(t,e,n,i){return(i?[t[0],t[1]].concat(t.slice(2)):[t[0]].concat(t.slice(1))).map((o,a)=>cs(o,a,e,n))}function Tu(t,e){return t.map((n,i)=>i==0?{}:Pe({},e,n))}function cs(t,e,n,i){return Pe({},e==0?n:i,t)}function jo(t,e,n){return e==null?Zi:[e,n]}var Fu=jo;function Lu(t,e,n){return e==null?Zi:el(e,n,hs,!0)}function Wo(t,e,n,i){return e==null?Zi:nl(e,n,t.scales[i].log,!1)}var Du=Wo;function Go(t,e,n,i){return e==null?Zi:fs(e,n,t.scales[i].log,!1)}var Ru=Go;function zu(t,e,n,i,l){let o=Qe(Hr(t),Hr(e)),a=e-t,d=Ct(l/i*a,n);do{let p=n[d],h=i*p/a;if(h>=l&&o+(p<5?ii.get(p):0)<=17)return[p,h]}while(++d<n.length);return[0,0]}function ro(t){let e,n;return t=t.replace(/(\d+)px/,(i,l)=>(e=Le((n=+l)*ce))+"px"),[t,e,n]}function Hu(t){t.show&&[t.font,t.labelFont].forEach(e=>{let n=ge(e[2]*ce,1);e[0]=e[0].replace(/[0-9.]+px/,n+"px"),e[1]=n})}function Ue(t,e,n){let i={mode:oe(t.mode,1)},l=i.mode;function o(s,r,c,u){let f=r.valToPct(s);return u+c*(r.dir==-1?1-f:f)}function a(s,r,c,u){let f=r.valToPct(s);return u+c*(r.dir==-1?f:1-f)}function d(s,r,c,u){return r.ori==0?o(s,r,c,u):a(s,r,c,u)}i.valToPosH=o,i.valToPosV=a;let p=!1;i.status=0;let h=i.root=yt(Ba);if(t.id!=null&&(h.id=t.id),ut(h,t.class),t.title){let s=yt(Ga,h);s.textContent=t.title}let b=Et("canvas"),m=i.ctx=b.getContext("2d"),v=yt(Ya,h);_i("click",v,s=>{s.target===C&&(ve!=Ii||$e!=Oi)&&qe.click(i,s)},!0);let k=i.under=yt(Ka,v);v.appendChild(b);let C=i.over=yt(Ja,v);t=Qi(t);let I=+oe(t.pxAlign,1),N=io(I);(t.plugins||[]).forEach(s=>{s.opts&&(t=s.opts(i,t)||t)});let q=t.ms||.001,w=i.series=l==1?so(t.series||[],Kr,eo,!1):Tu(t.series||[null],Xr),O=i.axes=so(t.axes||[],Yr,Zr,!0),S=i.scales={},J=i.bands=t.bands||[];J.forEach(s=>{s.fill=ne(s.fill||null),s.dir=oe(s.dir,-1)});let T=l==2?w[1].facets[0].scale:w[0].scale,Z={axes:ua,series:sa},G=(t.drawOrder||["axes","series"]).map(s=>Z[s]);function te(s){let r=s.distr==3?c=>jt(c>0?c:s.clamp(i,c,s.min,s.max,s.key)):s.distr==4?c=>Jl(c,s.asinh):s.distr==100?c=>s.fwd(c):c=>c;return c=>{let u=r(c),{_min:f,_max:g}=s,y=g-f;return(u-f)/y}}function W(s){let r=S[s];if(r==null){let c=(t.scales||Cn)[s]||Cn;if(c.from!=null){W(c.from);let u=Pe({},S[c.from],c,{key:s});u.valToPct=te(u),S[s]=u}else{r=S[s]=Pe({},s==T?Ro:yu,c),r.key=s;let u=r.time,f=r.range,g=ti(f);if((s!=T||l==2&&!u)&&(g&&(f[0]==null||f[1]==null)&&(f={min:f[0]==null?Dr:{mode:1,hard:f[0],soft:f[0]},max:f[1]==null?Dr:{mode:1,hard:f[1],soft:f[1]}},g=!1),!g&&sl(f))){let y=f;f=(x,_,A)=>_==null?Zi:el(_,A,y)}r.range=ne(f||(u?Fu:s==T?r.distr==3?Du:r.distr==4?Ru:jo:r.distr==3?Wo:r.distr==4?Go:Lu)),r.auto=ne(g?!1:r.auto),r.clamp=ne(r.clamp||vu),r._min=r._max=null,r.valToPct=te(r)}}}W("x"),W("y"),l==1&&w.forEach(s=>{W(s.scale)}),O.forEach(s=>{W(s.scale)});for(let s in t.scales)W(s);let $=S[T],K=$.distr,F,B;$.ori==0?(ut(h,ja),F=o,B=a):(ut(h,Wa),F=a,B=o);let H={};for(let s in S){let r=S[s];(r.min!=null||r.max!=null)&&(H[s]={min:r.min,max:r.max},r.min=r.max=null)}let le=t.tzDate||(s=>new Date(Le(s/q))),z=t.fmtDate||bs,Xe=q==1?jc(le):Yc(le),we=jr(le,Br(q==1?Bc:Gc,z)),se=Gr(le,Wr(Jc,z)),de=[],Q=i.legend=Pe({},Xc,t.legend),L=i.cursor=Pe({},su,{drag:{y:l==2}},t.cursor),Te=Q.show,Ge=L.show,Se=Q.markers;Q.idxs=de,Se.width=ne(Se.width),Se.dash=ne(Se.dash),Se.stroke=ne(Se.stroke),Se.fill=ne(Se.fill);let ue,_t,nt,Ae=[],Tt=[],Nt,ft=!1,Yt={};if(Q.live){let s=w[1]?w[1].values:null;ft=s!=null,Nt=ft?s(i,1,0):{_:0};for(let r in Nt)Yt[r]=ps}if(Te)if(ue=Et("table",ic,h),nt=Et("tbody",null,ue),Q.mount(i,ue),ft){_t=Et("thead",null,ue,nt);let s=Et("tr",null,_t);Et("th",null,s);for(var $i in Nt)Et("th",_r,s).textContent=$i}else ut(ue,lc),Q.live&&ut(ue,nc);let Ai={show:!0},rn={show:!1};function Pn(s,r){if(r==0&&(ft||!Q.live||l==2))return Zi;let c=[],u=Et("tr",sc,nt,nt.childNodes[r]);ut(u,s.class),s.show||ut(u,xi);let f=Et("th",null,u);if(Se.show){let x=yt(rc,f);if(r>0){let _=Se.width(i,r);_&&(x.style.border=_+"px "+Se.dash(i,r)+" "+Se.stroke(i,r)),x.style.background=Se.fill(i,r)}}let g=yt(_r,f);s.label instanceof HTMLElement?g.appendChild(s.label):g.textContent=s.label,r>0&&(Se.show||(g.style.color=s.width>0?Se.stroke(i,r):Se.fill(i,r)),Ye("click",f,x=>{if(L._lock)return;ci(x);let _=w.indexOf(s);if((x.ctrlKey||x.metaKey)!=Q.isolate){let A=w.some((E,P)=>P>0&&P!=_&&E.show);w.forEach((E,P)=>{P>0&&Dt(P,A?P==_?Ai:rn:Ai,!0,Me.setSeries)})}else Dt(_,{show:!s.show},!0,Me.setSeries)},!1),Mi&&Ye(Ar,f,x=>{L._lock||(ci(x),Dt(w.indexOf(s),Ui,!0,Me.setSeries))},!1));for(var y in Nt){let x=Et("td",oc,u);x.textContent="--",c.push(x)}return[u,c]}let li=new Map;function Ye(s,r,c,u=!0){let f=li.get(r)||{},g=L.bind[s](i,r,c,u);g&&(_i(s,r,f[s]=g),li.set(r,f))}function ki(s,r,c){let u=li.get(r)||{};for(let f in u)(s==null||f==s)&&(ns(f,r,u[f]),delete u[f]);s==null&&li.delete(r)}let Ut=0,si=0,Y=0,M=0,be=0,Fe=0,Ei=be,ri=Fe,Ft=Y,oi=M,lt=0,ht=0,et=0,wt=0;i.bbox={};let ul=!1,Tn=!1,Ci=!1,ai=!1,Fn=!1,mt=!1;function pl(s,r,c){(c||s!=i.width||r!=i.height)&&$s(s,r),Di(!1),Ci=!0,Tn=!0,Ri()}function $s(s,r){i.width=Ut=Y=s,i.height=si=M=r,be=Fe=0,Qo(),Xo();let c=i.bbox;lt=c.left=vi(be*ce,.5),ht=c.top=vi(Fe*ce,.5),et=c.width=vi(Y*ce,.5),wt=c.height=vi(M*ce,.5)}let Ko=3;function Jo(){let s=!1,r=0;for(;!s;){r++;let c=aa(r),u=ca(r);s=r==Ko||c&&u,s||($s(i.width,i.height),Tn=!0)}}function Zo({width:s,height:r}){pl(s,r)}i.setSize=Zo;function Qo(){let s=!1,r=!1,c=!1,u=!1;O.forEach((f,g)=>{if(f.show&&f._show){let{side:y,_size:x}=f,_=y%2,A=f.label!=null?f.labelSize:0,E=x+A;E>0&&(_?(Y-=E,y==3?(be+=E,u=!0):c=!0):(M-=E,y==0?(Fe+=E,s=!0):r=!0))}}),ui[0]=s,ui[1]=c,ui[2]=r,ui[3]=u,Y-=Kt[1]+Kt[3],be+=Kt[3],M-=Kt[2]+Kt[0],Fe+=Kt[0]}function Xo(){let s=be+Y,r=Fe+M,c=be,u=Fe;function f(g,y){switch(g){case 1:return s+=y,s-y;case 2:return r+=y,r-y;case 3:return c-=y,c+y;case 0:return u-=y,u+y}}O.forEach((g,y)=>{if(g.show&&g._show){let x=g.side;g._pos=f(x,g._size),g.label!=null&&(g._lpos=f(x,g.labelSize))}})}if(L.dataIdx==null){let s=L.hover,r=s.skip=new Set(s.skip??[]);r.add(void 0);let c=s.prox=ne(s.prox),u=s.bias??=0;L.dataIdx=(f,g,y,x)=>{if(g==0)return y;let _=y,A=c(f,g,y,x)??me,E=A>=0&&A<me,P=$.ori==0?Y:M,j=L.left,ae=e[0],re=e[g];if(r.has(re[y])){_=null;let ee=null,U=null,D;if(u==0||u==-1)for(D=y;ee==null&&D-- >0;)r.has(re[D])||(ee=D);if(u==0||u==1)for(D=y;U==null&&D++<re.length;)r.has(re[D])||(U=D);if(ee!=null||U!=null)if(E){let xe=ee==null?-1/0:F(ae[ee],$,P,0),ke=U==null?1/0:F(ae[U],$,P,0),Ne=j-xe,fe=ke-j;Ne<=fe?Ne<=A&&(_=ee):fe<=A&&(_=U)}else _=U==null?ee:ee==null?U:y-ee<=U-y?ee:U}else E&&De(j-F(ae[y],$,P,0))>A&&(_=null);return _}}let ci=s=>{L.event=s};L.idxs=de,L._lock=!1;let je=L.points;je.show=ne(je.show),je.size=ne(je.size),je.stroke=ne(je.stroke),je.width=ne(je.width),je.fill=ne(je.fill);let Lt=i.focus=Pe({},t.focus||{alpha:.3},L.focus),Mi=Lt.prox>=0,Pi=Mi&&je.one,gt=[],Ti=[],Fi=[];function As(s,r){let c=je.show(i,r);if(c instanceof HTMLElement)return ut(c,tc),ut(c,s.class),Ot(c,-10,-10,Y,M),C.insertBefore(c,gt[r]),c}function ks(s,r){if(l==1||r>0){let c=l==1&&S[s.scale].time,u=s.value;s.value=c?Nr(u)?Gr(le,Wr(u,z)):u||se:u||mu,s.label=s.label||(c?ou:ru)}if(Pi||r>0){s.width=s.width==null?1:s.width,s.paths=s.paths||Mu||yc,s.fillTo=ne(s.fillTo||xu),s.pxAlign=+oe(s.pxAlign,I),s.pxRound=io(s.pxAlign),s.stroke=ne(s.stroke||null),s.fill=ne(s.fill||null),s._stroke=s._fill=s._paths=s._focus=null;let c=gu(Qe(1,s.width),1),u=s.points=Pe({},{size:c,width:Qe(1,c*.2),stroke:s.stroke,space:c*2,paths:Pu,_stroke:null,_fill:null},s.points);u.show=ne(u.show),u.filter=ne(u.filter),u.fill=ne(u.fill),u.stroke=ne(u.stroke),u.paths=ne(u.paths),u.pxAlign=s.pxAlign}if(Te){let c=Pn(s,r);Ae.splice(r,0,c[0]),Tt.splice(r,0,c[1]),Q.values.push(null)}if(Ge){de.splice(r,0,null);let c=null;Pi?r==0&&(c=As(s,r)):r>0&&(c=As(s,r)),gt.splice(r,0,c),Ti.splice(r,0,0),Fi.splice(r,0,0)}Oe("addSeries",r)}function ea(s,r){r=r??w.length,s=l==1?cs(s,r,Kr,eo):cs(s,r,{},Xr),w.splice(r,0,s),ks(w[r],r)}i.addSeries=ea;function ta(s){if(w.splice(s,1),Te){Q.values.splice(s,1),Tt.splice(s,1);let r=Ae.splice(s,1)[0];ki(null,r.firstChild),r.remove()}Ge&&(de.splice(s,1),gt.splice(s,1)[0].remove(),Ti.splice(s,1),Fi.splice(s,1)),Oe("delSeries",s)}i.delSeries=ta;let ui=[!1,!1,!1,!1];function ia(s,r){if(s._show=s.show,s.show){let c=s.side%2,u=S[s.scale];u==null&&(s.scale=c?w[1].scale:T,u=S[s.scale]);let f=u.time;s.size=ne(s.size),s.space=ne(s.space),s.rotate=ne(s.rotate),ti(s.incrs)&&s.incrs.forEach(y=>{!ii.has(y)&&ii.set(y,go(y))}),s.incrs=ne(s.incrs||(u.distr==2?Uc:f?q==1?qc:Wc:yi)),s.splits=ne(s.splits||(f&&u.distr==1?Xe:u.distr==3?ss:u.distr==4?uu:cu)),s.stroke=ne(s.stroke),s.grid.stroke=ne(s.grid.stroke),s.ticks.stroke=ne(s.ticks.stroke),s.border.stroke=ne(s.border.stroke);let g=s.values;s.values=ti(g)&&!ti(g[0])?ne(g):f?ti(g)?jr(le,Br(g,z)):Nr(g)?Kc(le,g):g||we:g||au,s.filter=ne(s.filter||(u.distr>=3&&u.log==10?fu:u.distr==3&&u.log==2?hu:ho)),s.font=ro(s.font),s.labelFont=ro(s.labelFont),s._size=s.size(i,null,r,0),s._space=s._rotate=s._incrs=s._found=s._splits=s._values=null,s._size>0&&(ui[r]=!0,s._el=yt(Za,v))}}function on(s,r,c,u){let[f,g,y,x]=c,_=r%2,A=0;return _==0&&(x||g)&&(A=r==0&&!f||r==2&&!y?Le(Yr.size/3):0),_==1&&(f||y)&&(A=r==1&&!g||r==3&&!x?Le(Zr.size/2):0),A}let Es=i.padding=(t.padding||[on,on,on,on]).map(s=>ne(oe(s,on))),Kt=i._padding=Es.map((s,r)=>s(i,r,ui,0)),Ve,Re=null,ze=null,Ln=l==1?w[0].idxs:null,St=null,an=!1;function Cs(s,r){if(e=s??[],i.data=i._data=e,l==2){Ve=0;for(let c=1;c<w.length;c++)Ve+=e[c][0].length}else{e.length==0&&(i.data=i._data=e=[[]]),St=e[0],Ve=St.length;let c=e;if(K==2){c=e.slice();let u=c[0]=Array(Ve);for(let f=0;f<Ve;f++)u[f]=f}i._data=e=c}if(Di(!0),Oe("setData"),K==2&&(Ci=!0),r!==!1){let c=$;c.auto(i,an)?dl():Zt(T,c.min,c.max),ai=ai||L.left>=0,mt=!0,Ri()}}i.setData=Cs;function dl(){an=!0;let s,r;l==1&&(Ve>0?(Re=Ln[0]=0,ze=Ln[1]=Ve-1,s=e[0][Re],r=e[0][ze],K==2?(s=Re,r=ze):s==r&&(K==3?[s,r]=nl(s,s,$.log,!1):K==4?[s,r]=fs(s,s,$.log,!1):$.time?r=s+Le(86400/q):[s,r]=el(s,r,hs,!0))):(Re=Ln[0]=s=null,ze=Ln[1]=r=null)),Zt(T,s,r)}let Dn,Li,fl,hl,ml,gl,bl,vl,yl,tt;function Ms(s,r,c,u,f,g){s??=Sr,c??=gs,u??="butt",f??=Sr,g??="round",s!=Dn&&(m.strokeStyle=Dn=s),f!=Li&&(m.fillStyle=Li=f),r!=fl&&(m.lineWidth=fl=r),g!=ml&&(m.lineJoin=ml=g),u!=gl&&(m.lineCap=gl=u),c!=hl&&m.setLineDash(hl=c)}function Ps(s,r,c,u){r!=Li&&(m.fillStyle=Li=r),s!=bl&&(m.font=bl=s),c!=vl&&(m.textAlign=vl=c),u!=yl&&(m.textBaseline=yl=u)}function xl(s,r,c,u,f=0){if(u.length>0&&s.auto(i,an)&&(r==null||r.min==null)){let g=oe(Re,0),y=oe(ze,u.length-1),x=c.min==null?fc(u,g,y,f,s.distr==3):[c.min,c.max];s.min=Mt(s.min,c.min=x[0]),s.max=Qe(s.max,c.max=x[1])}}let Ts={min:null,max:null};function na(){for(let u in S){let f=S[u];H[u]==null&&(f.min==null||H[T]!=null&&f.auto(i,an))&&(H[u]=Ts)}for(let u in S){let f=S[u];H[u]==null&&f.from!=null&&H[f.from]!=null&&(H[u]=Ts)}H[T]!=null&&Di(!0);let s={};for(let u in H){let f=H[u];if(f!=null){let g=s[u]=Qi(S[u],wc);if(f.min!=null)Pe(g,f);else if(u!=T||l==2)if(Ve==0&&g.from==null){let y=g.range(i,null,null,u);g.min=y[0],g.max=y[1]}else g.min=me,g.max=-me}}if(Ve>0){w.forEach((u,f)=>{if(l==1){let g=u.scale,y=H[g];if(y==null)return;let x=s[g];if(f==0){let _=x.range(i,x.min,x.max,g);x.min=_[0],x.max=_[1],Re=Ct(x.min,e[0]),ze=Ct(x.max,e[0]),ze-Re>1&&(e[0][Re]<x.min&&Re++,e[0][ze]>x.max&&ze--),u.min=St[Re],u.max=St[ze]}else u.show&&u.auto&&xl(x,y,u,e[f],u.sorted);u.idxs[0]=Re,u.idxs[1]=ze}else if(f>0&&u.show&&u.auto){let[g,y]=u.facets,x=g.scale,_=y.scale,[A,E]=e[f],P=s[x],j=s[_];P!=null&&xl(P,H[x],g,A,g.sorted),j!=null&&xl(j,H[_],y,E,y.sorted),u.min=y.min,u.max=y.max}});for(let u in s){let f=s[u],g=H[u];if(f.from==null&&(g==null||g.min==null)){let y=f.range(i,f.min==me?null:f.min,f.max==-me?null:f.max,u);f.min=y[0],f.max=y[1]}}}for(let u in s){let f=s[u];if(f.from!=null){let g=s[f.from];if(g.min==null)f.min=f.max=null;else{let y=f.range(i,g.min,g.max,u);f.min=y[0],f.max=y[1]}}}let r={},c=!1;for(let u in s){let f=s[u],g=S[u];if(g.min!=f.min||g.max!=f.max){g.min=f.min,g.max=f.max;let y=g.distr;g._min=y==3?jt(g.min):y==4?Jl(g.min,g.asinh):y==100?g.fwd(g.min):g.min,g._max=y==3?jt(g.max):y==4?Jl(g.max,g.asinh):y==100?g.fwd(g.max):g.max,r[u]=c=!0}}if(c){w.forEach((u,f)=>{l==2?f>0&&r.y&&(u._paths=null):r[u.scale]&&(u._paths=null)});for(let u in r)Ci=!0,Oe("setScale",u);Ge&&L.left>=0&&(ai=mt=!0)}for(let u in H)H[u]=null}function la(s){let r=ls(Re-1,0,Ve-1),c=ls(ze+1,0,Ve-1);for(;s[r]==null&&r>0;)r--;for(;s[c]==null&&c<Ve-1;)c++;return[r,c]}function sa(){if(Ve>0){let s=w.some(r=>r._focus)&&tt!=Lt.alpha;s&&(m.globalAlpha=tt=Lt.alpha),w.forEach((r,c)=>{if(c>0&&r.show&&(Fs(c,!1),Fs(c,!0),r._paths==null)){let u=tt;tt!=r.alpha&&(m.globalAlpha=tt=r.alpha);let f=l==2?[0,e[c][0].length-1]:la(e[c]);r._paths=r.paths(i,c,f[0],f[1]),tt!=u&&(m.globalAlpha=tt=u)}}),w.forEach((r,c)=>{if(c>0&&r.show){let u=tt;tt!=r.alpha&&(m.globalAlpha=tt=r.alpha),r._paths!=null&&Ls(c,!1);{let f=r._paths!=null?r._paths.gaps:null,g=r.points.show(i,c,Re,ze,f),y=r.points.filter(i,c,g,f);(g||y)&&(r.points._paths=r.points.paths(i,c,Re,ze,y),Ls(c,!0))}tt!=u&&(m.globalAlpha=tt=u),Oe("drawSeries",c)}}),s&&(m.globalAlpha=tt=1)}}function Fs(s,r){let c=r?w[s].points:w[s];c._stroke=c.stroke(i,s),c._fill=c.fill(i,s)}function Ls(s,r){let c=r?w[s].points:w[s],{stroke:u,fill:f,clip:g,flags:y,_stroke:x=c._stroke,_fill:_=c._fill,_width:A=c.width}=c._paths;A=ge(A*ce,3);let E=null,P=A%2/2;r&&_==null&&(_=A>0?"#fff":x);let j=c.pxAlign==1&&P>0;if(j&&m.translate(P,P),!r){let ae=lt-A/2,re=ht-A/2,ee=et+A,U=wt+A;E=new Path2D,E.rect(ae,re,ee,U)}r?_l(x,A,c.dash,c.cap,_,u,f,y,g):ra(s,x,A,c.dash,c.cap,_,u,f,y,E,g),j&&m.translate(-P,-P)}function ra(s,r,c,u,f,g,y,x,_,A,E){let P=!1;_!=0&&J.forEach((j,ae)=>{if(j.series[0]==s){let re=w[j.series[1]],ee=e[j.series[1]],U=(re._paths||Cn).band;ti(U)&&(U=j.dir==1?U[0]:U[1]);let D,xe=null;re.show&&U&&mc(ee,Re,ze)?(xe=j.fill(i,ae)||g,D=re._paths.clip):U=null,_l(r,c,u,f,xe,y,x,_,A,E,D,U),P=!0}}),P||_l(r,c,u,f,g,y,x,_,A,E)}let Ds=Xi|os;function _l(s,r,c,u,f,g,y,x,_,A,E,P){Ms(s,r,c,u,f),(_||A||P)&&(m.save(),_&&m.clip(_),A&&m.clip(A)),P?(x&Ds)==Ds?(m.clip(P),E&&m.clip(E),zn(f,y),Rn(s,g,r)):x&os?(zn(f,y),m.clip(P),Rn(s,g,r)):x&Xi&&(m.save(),m.clip(P),E&&m.clip(E),zn(f,y),m.restore(),Rn(s,g,r)):(zn(f,y),Rn(s,g,r)),(_||A||P)&&m.restore()}function Rn(s,r,c){c>0&&(r instanceof Map?r.forEach((u,f)=>{m.strokeStyle=Dn=f,m.stroke(u)}):r!=null&&s&&m.stroke(r))}function zn(s,r){r instanceof Map?r.forEach((c,u)=>{m.fillStyle=Li=u,m.fill(c)}):r!=null&&s&&m.fill(r)}function oa(s,r,c,u){let f=O[s],g;if(u<=0)g=[0,0];else{let y=f._space=f.space(i,s,r,c,u),x=f._incrs=f.incrs(i,s,r,c,u,y);g=zu(r,c,x,u,y)}return f._found=g}function wl(s,r,c,u,f,g,y,x,_,A){let E=y%2/2;I==1&&m.translate(E,E),Ms(x,y,_,A,x),m.beginPath();let P,j,ae,re,ee=f+(u==0||u==3?-g:g);c==0?(j=f,re=ee):(P=f,ae=ee);for(let U=0;U<s.length;U++)r[U]!=null&&(c==0?P=ae=s[U]:j=re=s[U],m.moveTo(P,j),m.lineTo(ae,re));m.stroke(),I==1&&m.translate(-E,-E)}function aa(s){let r=!0;return O.forEach((c,u)=>{if(!c.show)return;let f=S[c.scale];if(f.min==null){c._show&&(r=!1,c._show=!1,Di(!1));return}else c._show||(r=!1,c._show=!0,Di(!1));let g=c.side,y=g%2,{min:x,max:_}=f,[A,E]=oa(u,x,_,y==0?Y:M);if(E==0)return;let P=f.distr==2,j=c._splits=c.splits(i,u,x,_,A,E,P),ae=f.distr==2?j.map(D=>St[D]):j,re=f.distr==2?St[j[1]]-St[j[0]]:A,ee=c._values=c.values(i,c.filter(i,ae,u,E,re),u,E,re);c._rotate=g==2?c.rotate(i,ee,u,E):0;let U=c._size;c._size=xt(c.size(i,ee,u,s)),U!=null&&c._size!=U&&(r=!1)}),r}function ca(s){let r=!0;return Es.forEach((c,u)=>{let f=c(i,u,ui,s);f!=Kt[u]&&(r=!1),Kt[u]=f}),r}function ua(){for(let s=0;s<O.length;s++){let r=O[s];if(!r.show||!r._show)continue;let c=r.side,u=c%2,f,g,y=r.stroke(i,s),x=c==0||c==3?-1:1,[_,A]=r._found;if(r.label!=null){let Je=r.labelGap*x,ot=Le((r._lpos+Je)*ce);Ps(r.labelFont[0],y,"center",c==2?"top":wr),m.save(),u==1?(f=g=0,m.translate(ot,Le(ht+wt/2)),m.rotate((c==3?-Qn:Qn)/2)):(f=Le(lt+et/2),g=ot);let fi=po(r.label)?r.label(i,s,_,A):r.label;m.fillText(fi,f,g),m.restore()}if(A==0)continue;let E=S[r.scale],P=u==0?et:wt,j=u==0?lt:ht,ae=r._splits,re=E.distr==2?ae.map(Je=>St[Je]):ae,ee=E.distr==2?St[ae[1]]-St[ae[0]]:_,U=r.ticks,D=r.border,xe=U.show?U.size:0,ke=Le(xe*ce),Ne=Le((r.alignTo==2?r._size-xe-r.gap:r.gap)*ce),fe=r._rotate*-Qn/180,Ee=N(r._pos*ce),st=(ke+Ne)*x,Ke=Ee+st;g=u==0?Ke:0,f=u==1?Ke:0;let bt=r.font[0],$t=r.align==1?Gi:r.align==2?Gl:fe>0?Gi:fe<0?Gl:u==0?"center":c==3?Gl:Gi,zt=fe||u==1?"middle":c==2?"top":wr;Ps(bt,y,$t,zt);let rt=r.font[1]*r.lineGap,vt=ae.map(Je=>N(d(Je,E,P,j))),At=r._values;for(let Je=0;Je<At.length;Je++){let ot=At[Je];if(ot!=null){u==0?f=vt[Je]:g=vt[Je],ot=""+ot;let fi=ot.indexOf(`
`)==-1?[ot]:ot.split(/\n/gm);for(let Ze=0;Ze<fi.length;Ze++){let Xs=fi[Ze];fe?(m.save(),m.translate(f,g+Ze*rt),m.rotate(fe),m.fillText(Xs,0,0),m.restore()):m.fillText(Xs,f,g+Ze*rt)}}}U.show&&wl(vt,U.filter(i,re,s,A,ee),u,c,Ee,ke,ge(U.width*ce,3),U.stroke(i,s),U.dash,U.cap);let Ht=r.grid;Ht.show&&wl(vt,Ht.filter(i,re,s,A,ee),u,u==0?2:1,u==0?ht:lt,u==0?wt:et,ge(Ht.width*ce,3),Ht.stroke(i,s),Ht.dash,Ht.cap),D.show&&wl([Ee],[1],u==0?1:0,u==0?1:2,u==1?ht:lt,u==1?wt:et,ge(D.width*ce,3),D.stroke(i,s),D.dash,D.cap)}Oe("drawAxes")}function Di(s){w.forEach((r,c)=>{c>0&&(r._paths=null,s&&(l==1?(r.min=null,r.max=null):r.facets.forEach(u=>{u.min=null,u.max=null})))})}let Hn=!1,Sl=!1,cn=[];function pa(){Sl=!1;for(let s=0;s<cn.length;s++)Oe(...cn[s]);cn.length=0}function Ri(){Hn||(Mc(Rs),Hn=!0)}function da(s,r=!1){Hn=!0,Sl=r,s(i),Rs(),r&&cn.length>0&&queueMicrotask(pa)}i.batch=da;function Rs(){if(ul&&(na(),ul=!1),Ci&&(Jo(),Ci=!1),Tn){if(_e(k,Gi,be),_e(k,"top",Fe),_e(k,$n,Y),_e(k,An,M),_e(C,Gi,be),_e(C,"top",Fe),_e(C,$n,Y),_e(C,An,M),_e(v,$n,Ut),_e(v,An,si),b.width=Le(Ut*ce),b.height=Le(si*ce),O.forEach(({_el:s,_show:r,_size:c,_pos:u,side:f})=>{if(s!=null)if(r){let g=f===3||f===0?c:0,y=f%2==1;_e(s,y?"left":"top",u-g),_e(s,y?"width":"height",c),_e(s,y?"top":"left",y?Fe:be),_e(s,y?"height":"width",y?M:Y),is(s,xi)}else ut(s,xi)}),Dn=Li=fl=ml=gl=bl=vl=yl=hl=null,tt=1,dn(!0),be!=Ei||Fe!=ri||Y!=Ft||M!=oi){Di(!1);let s=Y/Ft,r=M/oi;if(Ge&&!ai&&L.left>=0){L.left*=s,L.top*=r,zi&&Ot(zi,Le(L.left),0,Y,M),Hi&&Ot(Hi,0,Le(L.top),Y,M);for(let c=0;c<gt.length;c++){let u=gt[c];u!=null&&(Ti[c]*=s,Fi[c]*=r,Ot(u,xt(Ti[c]),xt(Fi[c]),Y,M))}}if(ye.show&&!Fn&&ye.left>=0&&ye.width>0){ye.left*=s,ye.width*=s,ye.top*=r,ye.height*=r;for(let c in Ml)_e(Ni,c,ye[c])}Ei=be,ri=Fe,Ft=Y,oi=M}Oe("setSize"),Tn=!1}Ut>0&&si>0&&(m.clearRect(0,0,b.width,b.height),Oe("drawClear"),G.forEach(s=>s()),Oe("draw")),ye.show&&Fn&&(In(ye),Fn=!1),Ge&&ai&&(di(null,!0,!1),ai=!1),Q.show&&Q.live&&mt&&(El(),mt=!1),p||(p=!0,i.status=1,Oe("ready")),an=!1,Hn=!1}i.redraw=(s,r)=>{Ci=r||!1,s!==!1?Zt(T,$.min,$.max):Ri()};function $l(s,r){let c=S[s];if(c.from==null){if(Ve==0){let u=c.range(i,r.min,r.max,s);r.min=u[0],r.max=u[1]}if(r.min>r.max){let u=r.min;r.min=r.max,r.max=u}if(Ve>1&&r.min!=null&&r.max!=null&&r.max-r.min<1e-16)return;s==T&&c.distr==2&&Ve>0&&(r.min=Ct(r.min,e[0]),r.max=Ct(r.max,e[0]),r.min==r.max&&r.max++),H[s]=r,ul=!0,Ri()}}i.setScale=$l;let Al,kl,zi,Hi,zs,Hs,Ii,Oi,Is,Os,ve,$e,Jt=!1,qe=L.drag,He=qe.x,Ie=qe.y;Ge&&(L.x&&(Al=yt(Xa,C)),L.y&&(kl=yt(ec,C)),$.ori==0?(zi=Al,Hi=kl):(zi=kl,Hi=Al),ve=L.left,$e=L.top);let ye=i.select=Pe({show:!0,over:!0,left:0,width:0,top:0,height:0},t.select),Ni=ye.show?yt(Qa,ye.over?C:k):null;function In(s,r){if(ye.show){for(let c in s)ye[c]=s[c],c in Ml&&_e(Ni,c,s[c]);r!==!1&&Oe("setSelect")}}i.setSelect=In;function fa(s){if(w[s].show)Te&&is(Ae[s],xi);else if(Te&&ut(Ae[s],xi),Ge){let c=Pi?gt[0]:gt[s];c!=null&&Ot(c,-10,-10,Y,M)}}function Zt(s,r,c){$l(s,{min:r,max:c})}function Dt(s,r,c,u){r.focus!=null&&va(s),r.show!=null&&w.forEach((f,g)=>{g>0&&(s==g||s==null)&&(f.show=r.show,fa(g),l==2?(Zt(f.facets[0].scale,null,null),Zt(f.facets[1].scale,null,null)):Zt(f.scale,null,null),Ri())}),c!==!1&&Oe("setSeries",s,r),u&&fn("setSeries",i,s,r)}i.setSeries=Dt;function ha(s,r){Pe(J[s],r)}function ma(s,r){s.fill=ne(s.fill||null),s.dir=oe(s.dir,-1),r=r??J.length,J.splice(r,0,s)}function ga(s){s==null?J.length=0:J.splice(s,1)}i.addBand=ma,i.setBand=ha,i.delBand=ga;function ba(s,r){w[s].alpha=r,Ge&&gt[s]!=null&&(gt[s].style.opacity=r),Te&&Ae[s]&&(Ae[s].style.opacity=r)}let Vt,Qt,pi,Ui={focus:!0};function va(s){if(s!=pi){let r=s==null,c=Lt.alpha!=1;w.forEach((u,f)=>{if(l==1||f>0){let g=r||f==0||f==s;u._focus=r?null:g,c&&ba(f,g?1:Lt.alpha)}}),pi=s,c&&Ri()}}Te&&Mi&&Ye(kr,ue,s=>{L._lock||(ci(s),pi!=null&&Dt(null,Ui,!0,Me.setSeries))});function Rt(s,r,c){let u=S[r];c&&(s=s/ce-(u.ori==1?Fe:be));let f=Y;u.ori==1&&(f=M,s=f-s),u.dir==-1&&(s=f-s);let g=u._min,y=u._max,x=s/f,_=g+(y-g)*x,A=u.distr;return A==3?Ji(10,_):A==4?bc(_,u.asinh):A==100?u.bwd(_):_}function ya(s,r){let c=Rt(s,T,r);return Ct(c,e[0],Re,ze)}i.valToIdx=s=>Ct(s,e[0]),i.posToIdx=ya,i.posToVal=Rt,i.valToPos=(s,r,c)=>S[r].ori==0?o(s,S[r],c?et:Y,c?lt:0):a(s,S[r],c?wt:M,c?ht:0),i.setCursor=(s,r,c)=>{ve=s.left,$e=s.top,di(null,r,c)};function Ns(s,r){_e(Ni,Gi,ye.left=s),_e(Ni,$n,ye.width=r)}function Us(s,r){_e(Ni,"top",ye.top=s),_e(Ni,An,ye.height=r)}let un=$.ori==0?Ns:Us,pn=$.ori==1?Ns:Us;function xa(){if(Te&&Q.live)for(let s=l==2?1:0;s<w.length;s++){if(s==0&&ft)continue;let r=Q.values[s],c=0;for(let u in r)Tt[s][c++].firstChild.nodeValue=r[u]}}function El(s,r){if(s!=null&&(s.idxs?s.idxs.forEach((c,u)=>{de[u]=c}):_c(s.idx)||de.fill(s.idx),Q.idx=de[0]),Te&&Q.live){for(let c=0;c<w.length;c++)(c>0||l==1&&!ft)&&_a(c,de[c]);xa()}mt=!1,r!==!1&&Oe("setLegend")}i.setLegend=El;function _a(s,r){let c=w[s],u=s==0&&K==2?St:e[s],f;ft?f=c.values(i,s,r)??Yt:(f=c.value(i,r==null?null:u[r],s,r),f=f==null?Yt:{_:f}),Q.values[s]=f}function di(s,r,c){Is=ve,Os=$e,[ve,$e]=L.move(i,ve,$e),L.left=ve,L.top=$e,Ge&&(zi&&Ot(zi,Le(ve),0,Y,M),Hi&&Ot(Hi,0,Le($e),Y,M));let u,f=Re>ze;Vt=me,Qt=null;let g=$.ori==0?Y:M,y=$.ori==1?Y:M;if(ve<0||Ve==0||f){u=L.idx=null;for(let x=0;x<w.length;x++){let _=gt[x];_!=null&&Ot(_,-10,-10,Y,M)}Mi&&Dt(null,Ui,!0,s==null&&Me.setSeries),Q.live&&(de.fill(u),mt=!0)}else{let x,_,A;l==1&&(x=$.ori==0?ve:$e,_=Rt(x,T),u=L.idx=Ct(_,e[0],Re,ze),A=F(e[0][u],$,g,0));let E=-10,P=-10,j=0,ae=0,re=!0,ee="",U="";for(let D=l==2?1:0;D<w.length;D++){let xe=w[D],ke=de[D],Ne=ke==null?null:l==1?e[D][ke]:e[D][1][ke],fe=L.dataIdx(i,D,u,_),Ee=fe==null?null:l==1?e[D][fe]:e[D][1][fe];if(mt=mt||Ee!=Ne||fe!=ke,de[D]=fe,D>0&&xe.show){let st=fe==null?-10:fe==u?A:F(l==1?e[0][fe]:e[D][0][fe],$,g,0),Ke=Ee==null?-10:B(Ee,l==1?S[xe.scale]:S[xe.facets[1].scale],y,0);if(Mi&&Ee!=null){let bt=$.ori==1?ve:$e,$t=De(Lt.dist(i,D,fe,Ke,bt));if($t<Vt){let zt=Lt.bias;if(zt!=0){let rt=Rt(bt,xe.scale),vt=Ee>=0?1:-1,At=rt>=0?1:-1;At==vt&&(At==1?zt==1?Ee>=rt:Ee<=rt:zt==1?Ee<=rt:Ee>=rt)&&(Vt=$t,Qt=D)}else Vt=$t,Qt=D}}if(mt||Pi){let bt,$t;$.ori==0?(bt=st,$t=Ke):(bt=Ke,$t=st);let zt,rt,vt,At,Ht,Je,ot=!0,fi=je.bbox;if(fi!=null){ot=!1;let Ze=fi(i,D);vt=Ze.left,At=Ze.top,zt=Ze.width,rt=Ze.height}else vt=bt,At=$t,zt=rt=je.size(i,D);if(Je=je.fill(i,D),Ht=je.stroke(i,D),Pi)D==Qt&&Vt<=Lt.prox&&(E=vt,P=At,j=zt,ae=rt,re=ot,ee=Je,U=Ht);else{let Ze=gt[D];Ze!=null&&(Ti[D]=vt,Fi[D]=At,Lr(Ze,zt,rt,ot),Tr(Ze,Je,Ht),Ot(Ze,xt(vt),xt(At),Y,M))}}}}if(Pi){let D=Lt.prox,xe=pi==null?Vt<=D:Vt>D||Qt!=pi;if(mt||xe){let ke=gt[0];ke!=null&&(Ti[0]=E,Fi[0]=P,Lr(ke,j,ae,re),Tr(ke,ee,U),Ot(ke,xt(E),xt(P),Y,M))}}}if(ye.show&&Jt)if(s!=null){let[x,_]=Me.scales,[A,E]=Me.match,[P,j]=s.cursor.sync.scales,ae=s.cursor.drag;if(He=ae._x,Ie=ae._y,He||Ie){let{left:re,top:ee,width:U,height:D}=s.select,xe=s.scales[P].ori,ke=s.posToVal,Ne,fe,Ee,st,Ke,bt=x!=null&&A(x,P),$t=_!=null&&E(_,j);bt&&He?(xe==0?(Ne=re,fe=U):(Ne=ee,fe=D),Ee=S[x],st=F(ke(Ne,P),Ee,g,0),Ke=F(ke(Ne+fe,P),Ee,g,0),un(Mt(st,Ke),De(Ke-st))):un(0,g),$t&&Ie?(xe==1?(Ne=re,fe=U):(Ne=ee,fe=D),Ee=S[_],st=B(ke(Ne,j),Ee,y,0),Ke=B(ke(Ne+fe,j),Ee,y,0),pn(Mt(st,Ke),De(Ke-st))):pn(0,y)}else Pl()}else{let x=De(Is-zs),_=De(Os-Hs);if($.ori==1){let j=x;x=_,_=j}He=qe.x&&x>=qe.dist,Ie=qe.y&&_>=qe.dist;let A=qe.uni;A!=null?He&&Ie&&(He=x>=A,Ie=_>=A,!He&&!Ie&&(_>x?Ie=!0:He=!0)):qe.x&&qe.y&&(He||Ie)&&(He=Ie=!0);let E,P;He&&($.ori==0?(E=Ii,P=ve):(E=Oi,P=$e),un(Mt(E,P),De(P-E)),Ie||pn(0,y)),Ie&&($.ori==1?(E=Ii,P=ve):(E=Oi,P=$e),pn(Mt(E,P),De(P-E)),He||un(0,g)),!He&&!Ie&&(un(0,0),pn(0,0))}if(qe._x=He,qe._y=Ie,s==null){if(c){if(Qs!=null){let[x,_]=Me.scales;Me.values[0]=x!=null?Rt($.ori==0?ve:$e,x):null,Me.values[1]=_!=null?Rt($.ori==1?ve:$e,_):null}fn(Yl,i,ve,$e,Y,M,u)}if(Mi){let x=c&&Me.setSeries,_=Lt.prox;pi==null?Vt<=_&&Dt(Qt,Ui,!0,x):Vt>_?Dt(null,Ui,!0,x):Qt!=pi&&Dt(Qt,Ui,!0,x)}}mt&&(Q.idx=u,El()),r!==!1&&Oe("setCursor")}let Xt=null;Object.defineProperty(i,"rect",{get(){return Xt==null&&dn(!1),Xt}});function dn(s=!1){s?Xt=null:(Xt=C.getBoundingClientRect(),Oe("syncRect",Xt))}function Vs(s,r,c,u,f,g,y){L._lock||Jt&&s!=null&&s.movementX==0&&s.movementY==0||(Cl(s,r,c,u,f,g,y,!1,s!=null),s!=null?di(null,!0,!0):di(r,!0,!1))}function Cl(s,r,c,u,f,g,y,x,_){if(Xt==null&&dn(!1),ci(s),s!=null)c=s.clientX-Xt.left,u=s.clientY-Xt.top;else{if(c<0||u<0){ve=-10,$e=-10;return}let[A,E]=Me.scales,P=r.cursor.sync,[j,ae]=P.values,[re,ee]=P.scales,[U,D]=Me.match,xe=r.axes[0].side%2==1,ke=$.ori==0?Y:M,Ne=$.ori==1?Y:M,fe=xe?g:f,Ee=xe?f:g,st=xe?u:c,Ke=xe?c:u;if(re!=null?c=U(A,re)?d(j,S[A],ke,0):-10:c=ke*(st/fe),ee!=null?u=D(E,ee)?d(ae,S[E],Ne,0):-10:u=Ne*(Ke/Ee),$.ori==1){let bt=c;c=u,u=bt}}_&&(r==null||r.cursor.event.type==Yl)&&((c<=1||c>=Y-1)&&(c=vi(c,Y)),(u<=1||u>=M-1)&&(u=vi(u,M))),x?(zs=c,Hs=u,[Ii,Oi]=L.move(i,c,u)):(ve=c,$e=u)}let Ml={width:0,height:0,left:0,top:0};function Pl(){In(Ml,!1)}let qs,Bs,js,Ws;function Gs(s,r,c,u,f,g,y){Jt=!0,He=Ie=qe._x=qe._y=!1,Cl(s,r,c,u,f,g,y,!0,!1),s!=null&&(Ye(Kl,es,Ys,!1),fn($r,i,Ii,Oi,Y,M,null));let{left:x,top:_,width:A,height:E}=ye;qs=x,Bs=_,js=A,Ws=E}function Ys(s,r,c,u,f,g,y){Jt=qe._x=qe._y=!1,Cl(s,r,c,u,f,g,y,!1,!0);let{left:x,top:_,width:A,height:E}=ye,P=A>0||E>0,j=qs!=x||Bs!=_||js!=A||Ws!=E;if(P&&j&&In(ye),qe.setScale&&P&&j){let ae=x,re=A,ee=_,U=E;if($.ori==1&&(ae=_,re=E,ee=x,U=A),He&&Zt(T,Rt(ae,T),Rt(ae+re,T)),Ie)for(let D in S){let xe=S[D];D!=T&&xe.from==null&&xe.min!=me&&Zt(D,Rt(ee+U,D),Rt(ee,D))}Pl()}else L.lock&&(L._lock=!L._lock,di(r,!0,s!=null));s!=null&&(ki(Kl,es),fn(Kl,i,ve,$e,Y,M,null))}function wa(s,r,c,u,f,g,y){if(L._lock)return;ci(s);let x=Jt;if(Jt){let _=!0,A=!0,E=10,P,j;$.ori==0?(P=He,j=Ie):(P=Ie,j=He),P&&j&&(_=ve<=E||ve>=Y-E,A=$e<=E||$e>=M-E),P&&_&&(ve=ve<Ii?0:Y),j&&A&&($e=$e<Oi?0:M),di(null,!0,!0),Jt=!1}ve=-10,$e=-10,de.fill(null),di(null,!0,!0),x&&(Jt=x)}function Ks(s,r,c,u,f,g,y){L._lock||(ci(s),dl(),Pl(),s!=null&&fn(Er,i,ve,$e,Y,M,null))}function Js(){O.forEach(Hu),pl(i.width,i.height,!0)}_i(Xn,Ki,Js);let Vi={};Vi.mousedown=Gs,Vi.mousemove=Vs,Vi.mouseup=Ys,Vi.dblclick=Ks,Vi.setSeries=(s,r,c,u)=>{let f=Me.match[2];c=f(i,r,c),c!=-1&&Dt(c,u,!0,!1)},Ge&&(Ye($r,C,Gs),Ye(Yl,C,Vs),Ye(Ar,C,s=>{ci(s),dn(!1)}),Ye(kr,C,wa),Ye(Er,C,Ks),as.add(i),i.syncRect=dn);let On=i.hooks=t.hooks||{};function Oe(s,r,c){Sl?cn.push([s,r,c]):s in On&&On[s].forEach(u=>{u.call(null,i,r,c)})}(t.plugins||[]).forEach(s=>{for(let r in s.hooks)On[r]=(On[r]||[]).concat(s.hooks[r])});let Zs=(s,r,c)=>c,Me=Pe({key:null,setSeries:!1,filters:{pub:Ir,sub:Ir},scales:[T,w[1]?w[1].scale:null],match:[Or,Or,Zs],values:[null,null]},L.sync);Me.match.length==2&&Me.match.push(Zs),L.sync=Me;let Qs=Me.key,Tl=zo(Qs);function fn(s,r,c,u,f,g,y){Me.filters.pub(s,r,c,u,f,g,y)&&Tl.pub(s,r,c,u,f,g,y)}Tl.sub(i);function Sa(s,r,c,u,f,g,y){Me.filters.sub(s,r,c,u,f,g,y)&&Vi[s](null,r,c,u,f,g,y)}i.pub=Sa;function $a(){Tl.unsub(i),as.delete(i),li.clear(),ns(Xn,Ki,Js),h.remove(),ue?.remove(),Oe("destroy")}i.destroy=$a;function Fl(){Oe("init",t,e),Cs(e||t.data,!1),H[T]?$l(T,H[T]):dl(),Fn=ye.show&&(ye.width>0||ye.height>0),ai=mt=!0,pl(t.width,t.height)}return w.forEach(ks),O.forEach(ia),n?n instanceof HTMLElement?(n.appendChild(h),Fl()):n(i,Fl):Fl(),i}Ue.assign=Pe;Ue.fmtNum=ms;Ue.rangeNum=el;Ue.rangeLog=nl;Ue.rangeAsinh=fs;Ue.orient=Si;Ue.pxRatio=ce;Ue.join=Cc;Ue.fmtDate=bs,Ue.tzDate=Oc;Ue.sync=zo;{Ue.addGap=_u,Ue.clipGaps=rl;let t=Ue.paths={points:Vo};t.linear=Bo,t.stepped=$u,t.bars=Au,t.spline=Eu}var Yo='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';var Pt=class extends We{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(){this.draw()}draw(){if(!this.isConnected)return;let n=this.renderRoot.querySelector(".plot");if(!n)return;let i=this.plot;if(i&&i.series.forEach((d,p)=>{p&&typeof d.label=="string"&&(d.show===!1?this.hiddenCurves.add(d.label):this.hiddenCurves.delete(d.label))}),this.dispose(),!this.samples.length||!this.samples.some(d=>this.curves.some(p=>Wi(d,p.path)!==null)))return;let l=getComputedStyle(this),o=l.getPropertyValue("--primary-text-color").trim()||"#555",a=[this.samples.map(d=>d.time),...this.curves.map(d=>this.samples.map(p=>Wi(p,d.path)))];this.applying=!0,this.plot=new Ue({width:Math.max(240,n.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(d,p,h)=>[Math.min(0,p??0),Math.max(100,h??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},axes:[{stroke:o,space:100,grid:{show:!1},values:(d,p)=>p.map(h=>new Date(h*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(h*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:o,values:(d,p)=>p.map(h=>h.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(d,p)=>p==null?"\u2014":new Date(p*1e3).toLocaleString()},...this.curves.map(d=>({label:d.label,stroke:d.color,width:2,spanGaps:!1,show:!this.hiddenCurves.has(d.label),paths:d.step?Ue.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(p,h)=>h==null?"Indisponible":`${h.toLocaleString(void 0,{maximumFractionDigits:d.unit.includes("min")?6:3})} ${d.unit}`}))],hooks:{setScale:[(d,p)=>{p==="x"&&!this.applying&&d.scales.x.min!=null&&d.scales.x.max!=null&&(Math.abs(d.scales.x.min-this.range[0])>.01||Math.abs(d.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[d.scales.x.min,d.scales.x.max],bubbles:!0,composed:!0}))}]}},a,n),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,n.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,n.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(n)}render(){let n=this.samples.filter(i=>this.curves.some(l=>Wi(i,l.path)!==null)).length;return V`<h3>${this.heading}</h3>
      <div class="plot" aria-label=${this.heading}></div>
      ${n?V`<details>
            <summary>
              Table de données accessible · ${n} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(i=>V`<th>${i.label} (${i.unit})</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(i=>V`<tr>
                        <td>${new Date(i.time*1e3).toLocaleString()}</td>
                        ${this.curves.map(l=>V`<td>
                              ${Wi(i,l.path)??"Indisponible"}
                            </td>`)}
                      </tr>`)}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
            </p>
          </details>`:V`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};Pt.styles=[Vn(Yo),kt`
      :host {
        display: block;
        min-width: 0;
      }
      h3 {
        font-size: 15px;
        margin: 0 0 12px;
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
    `],ie([Ce({attribute:!1})],Pt.prototype,"samples",2),ie([Ce({attribute:!1})],Pt.prototype,"curves",2),ie([Ce({attribute:!1})],Pt.prototype,"range",2),ie([Ce()],Pt.prototype,"heading",2),ie([Ce()],Pt.prototype,"syncKey",2),ie([Ce({type:Boolean})],Pt.prototype,"percent",2),Pt=ie([It("smartpi-time-chart")],Pt);var ln=class{constructor(e){this.diagnostic=e}get bypass(){return ji(this.diagnostic)||["CoolDown","HeatUp","CoolDownFinal"].includes(String(R(this.diagnostic.live,"calibration.state")))||R(this.diagnostic.live,"control.phase")==="Calibration"}get route(){return this.bypass?"direct":R(this.diagnostic.live,"control.mode")==="smartpi"?"pi":"unavailable"}blocks(){let e=this.diagnostic,n=e.live,i=this.bypass,l=(o,a,d,p,h,b,m)=>({id:o,title:a,path:d,value:X(R(n,d),p,d==="model.a"?6:2),explanation:h,reason:X(R(n,b)),status:!e.available||R(n,d)==null?"Indisponible":m??"Publi\xE9"});return[l("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),l("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),l("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",i?"Contourn\xE9":"Voie SmartPI"),l("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",i?"Contourn\xE9":"Voie SmartPI"),l("command",i?"Hyst\xE9r\xE9sis / calibration":"Commande demand\xE9e",i?"power.applied_percent":"power.command_percent"," %",i?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.","control.saturation_state",i?"Voir sortie appliqu\xE9e":"Publi\xE9"),l("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",i?"Contourn\xE9 (voie directe)":"Publi\xE9"),l("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),l("model","Syst\xE8me thermique / mod\xE8le","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let e=this.diagnostic.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([n,i,l])=>{let o=ct(R(e,i));return{label:n,path:i,value:o===null?null:o*(l?100:1)}})}};var ni=class extends We{constructor(){super(...arguments);this.expert=!1;this.selected="pi"}render(){if(!this.diagnostic)return V``;let n=new ln(this.diagnostic),i=n.blocks(),l=i.find(a=>a.id===this.selected)??i[0],o=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return V`<div class="intro">
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
          ${n.route==="pi"?wn`<path class="flow" d="M205 65 H235 M205 195 H220 V95 H235 M420 65 H435 V115 H450 M420 195 H435 V145 H450"/>`:n.bypass?wn`<path class="flow bypass" d="M205 65 H440 V100 H450 M635 125 H647 V310 H660"/>`:null}
          ${n.route==="pi"?wn`<path class="flow" d="M635 125 H660 M752 180 V265"/>`:null}
          <path class="flow" d="M660 315 H420 M235 345 H110 V245" />
          ${i.map((a,d)=>wn`<g role="button" tabindex="0" aria-label=${`${a.title} : ${a.value}. ${a.status}`} class=${"block "+(a.id===l.id?"selected":"")+(a.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${o[d][0]},${o[d][1]})`} @click=${()=>this.selected=a.id} @keydown=${p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),this.selected=a.id)}}>
          <title>${a.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${a.title}</text><text x="13" y="50" class="value">${a.value}</text><text x="13" y="73" class="status">${a.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${i.map(a=>V`<button
              aria-pressed=${a.id===l.id}
              @click=${()=>this.selected=a.id}
            >
              ${a.title}<strong>${a.value}</strong><small>${a.status}</small>
            </button>`)}
      </div>
      <aside aria-live="polite">
        <h4>${l.title} <span class="badge">${l.status}</span></h4>
        <p>${l.explanation}</p>
        <p>Raison / contexte publié : <strong>${l.reason}</strong></p>
        ${this.expert?V`<code>attributes.live.${l.path}</code>
              <p>
                Source : SmartPI Diagnostics v2. Les informations absentes ne
                sont pas reconstituées.
              </p>
              <p>
                Bande morte :
                ${X(R(this.diagnostic.live,"control.in_deadband"))} ·
                Temps mort :
                ${X(R(this.diagnostic.live,"control.in_deadtime_window"))}
                · Gouvernance :
                ${X(R(this.diagnostic.live,"governance.thermal_update_reason"))}
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
  `,ie([Ce({attribute:!1})],ni.prototype,"diagnostic",2),ie([Ce({type:Boolean})],ni.prototype,"expert",2),ie([it()],ni.prototype,"selected",2),ni=ie([It("smartpi-control-diagram")],ni);var sn=class extends We{render(){if(!this.diagnostic)return V``;let e=new ln(this.diagnostic),n=e.chain(),i=Math.max(100,...n.map(l=>Math.abs(l.value??0)));return V`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${e.bypass?"Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliqu\xE9e.":"FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu pr\xE9c\xE8dent les limites ; Hold est un \xE9tat de maintien, pas une contribution \xE0 additionner."}
      </p>
      ${n.map(l=>V`<div class="row">
            <span title=${"attributes.live."+l.path}>${l.label}</span>
            <div class="track">
              <i></i>${l.value===null?null:V`<b
                    style=${`left:${l.value<0?50+l.value/i*50:50}%;width:${Math.abs(l.value)/i*50}%`}
                    class=${l.value<0?"negative":""}
                  ></b>`}
            </div>
            <strong>${X(l.value," %",2)}</strong>
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
        ${X(R(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${X(R(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${X(R(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${R(this.diagnostic.live,"power.valve_linearization_enabled")===!0?V`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`:null}`}};sn.styles=kt`
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
  `,ie([Ce({attribute:!1})],sn.prototype,"diagnostic",2),sn=ie([It("smartpi-command-chain")],sn);var Ou=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],Nu=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],Be=class extends We{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.generation=0;this.recorderEntity=""}updated(n){let i=n.get("diagnostic");n.has("diagnostic")&&i?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(n){let i=this.range[1]-this.range[0],l=Date.now()/1e3,o=this.end-48*3600,a=Math.min(l,Math.max(o+i,this.range[1]+n*i/2));this.range=[a-i,a]}zoom(n){let[i,l]=this.range,o=Math.max(60,Math.min(48*3600,(l-i)*n));this.range=[l-o,l]}async load(){let n=++this.generation,i=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!i||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let l=Date.now()/1e3,o=await xr(this.hass,i.entityId,l-48*3600,l,()=>n!==this.generation);if(n!==this.generation)return;this.recorderEntity=i.entityId,this.recorder=o,Wl(o)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(l){if(n!==this.generation)return;this.error=l instanceof Error&&l.message.startsWith("Format")?l.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{n===this.generation&&(this.loading=!1)}}render(){let n=this.diagnostic;if(!n)return he;let i=this.recorderEntity===n.entityId&&!this.preferSession&&Wl(this.recorder),l=i?this.recorder:this.session,o=l.filter(p=>p.time>=this.range[0]&&p.time<=this.range[1]),a=yr(l).filter(p=>p.time>=this.range[0]&&p.time<=this.range[1]),d=(p,h,b=!1)=>V`<section class="chart">
        <smartpi-time-chart
          .heading=${p}
          .samples=${o}
          .curves=${h}
          .range=${this.range}
          .percent=${b}
          .syncKey=${n.entityId}
          @time-range=${m=>{m.detail[1]>m.detail[0]&&(this.range=m.detail)}}
        ></smartpi-time-chart>
      </section>`;return V`<div class="workspace">
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
        ${[["evolution","\xC9volution"],["regulation","R\xE9gulation"],["model","Sant\xE9 du mod\xE8le"]].map(([p,h])=>V`<button
              class=${this.tab===p?"active":""}
              aria-pressed=${this.tab===p}
              @click=${()=>this.tab=p}
            >
              ${h}
            </button>`)}
      </nav>
      <div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
          ${[1,3,6,12,24,48].map(p=>V`<button
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
      ${this.loading?V`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:he}
      ${this.error?V`<p role="status" class="notice">${this.error}</p>`:he}
      ${o.length?he:V`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}
      ${this.tab==="evolution"?V`
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
          `:this.tab==="regulation"?V`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${n}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
              </section>
              <section class="pane">
                <smartpi-command-chain .diagnostic=${n}></smartpi-command-chain>
              </section>`:V`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${X(R(n.live,"model.confidence"))}</span
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
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([p,h,b])=>V`<div>
                        <span>${p}</span
                        ><strong
                          >${X(Bt(n.live,h,b),h==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${X(R(n.live,b))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${X(R(n.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${X(R(n.live,"analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${X(R(n.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE 30","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([p,h,b])=>V`<div>
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
          ${a.slice(-60).reverse().map(p=>V`<li>
                  <time>${new Date(p.time*1e3).toLocaleString()}</time>
                  <div>
                    <strong>${p.label}</strong>${this.expert?V`<p>${p.provenance}</p>`:he}
                  </div>
                </li>`)}
        </ol>
        ${a.length===0?V`<p>Aucune transition observable sur cette fenêtre.</p>`:V`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>
      ${this.expert?V`<details class="provenance">
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
          </details>`:he}
    </div>`}};Be.styles=kt`
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
  `,ie([Ce({attribute:!1})],Be.prototype,"hass",2),ie([Ce({attribute:!1})],Be.prototype,"diagnostic",2),ie([Ce({attribute:!1})],Be.prototype,"session",2),ie([it()],Be.prototype,"tab",2),ie([it()],Be.prototype,"expert",2),ie([it()],Be.prototype,"hours",2),ie([it()],Be.prototype,"end",2),ie([it()],Be.prototype,"range",2),ie([it()],Be.prototype,"recorder",2),ie([it()],Be.prototype,"loading",2),ie([it()],Be.prototype,"error",2),ie([it()],Be.prototype,"preferSession",2),Be=ie([It("smartpi-visual-diagnostics")],Be);var Uu=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],Gt=class extends We{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new Gn}willUpdate(n){n.has("hass")&&this.hass&&this.sessionHistory.collect(jl(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(n,i,l="",o=2){return V`<div class="metric"><span>${n}</span><strong>${X(i,l,o)}</strong></div>`}power(n,i,l){let o=ct(i),a=o===null?0:Math.min(100,Math.max(0,o));return V`<div class="power"><div class="power-label"><span>${n}</span><strong>${X(i," %",1)}</strong></div>
      <div class="track" aria-label=${n+" "+X(i," %",1)}>
        <div class=${"fill "+l} style=${"width:"+a+"%"}></div>
      </div></div>`}field(n,i){let l=X(Bt(i,n.path,n.reliable),n.unit??"",n.digits??2);return V`<div class="detail" title=${n.path}><span>${n.label}</span><strong>${l}</strong></div>`}showDiagnostic(n){let i=n.live,l=gr(n),o=ji(n),a=ct(R(i,"learning.bootstrap_progress_percent"));return V`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${n.name}</h2>
            <div class="muted small">${n.climateId??n.entityId}</div></div>
          <span class="tag">${o?"Apprentissage / hyst\xE9r\xE9sis":X(R(i,"control.phase"))}</span>
        </div>
        <p class="muted small">État : ${n.state} · Dernière publication : ${n.lastUpdated??"Indisponible"}. Une publication ancienne ne prouve pas une panne.</p>
        <div class="metrics">
          ${this.metric("Temp\xE9rature int\xE9rieure",R(i,"temperature.indoor")," \xB0C")}
          ${this.metric("Consigne filtr\xE9e",R(i,"setpoint.filtered_setpoint")," \xB0C")}
          ${this.metric("Commande appliqu\xE9e",R(i,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",R(i,"temperature.outdoor")," \xB0C")}
        </div>
        ${o?V`<div class="learn">
          <div class="flex spread"><span>Progression de l’apprentissage</span><strong>${X(a," %",0)}</strong></div>
          <div class="track"><div class="fill applied" style=${"width:"+(a===null?0:Math.max(0,Math.min(100,a)))+"%"}></div></div>
          <div class="muted small">A : ${X(R(i,"learning.emea_samples_a"),"",0)} / ${X(R(i,"learning.bootstrap_target_a"),"",0)}
            · B : ${X(R(i,"learning.emea_samples_b"),"",0)} / ${X(R(i,"learning.bootstrap_target_b"),"",0)}</div>
        </div>`:he}
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${n} .session=${this.sessionHistory.get(n.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${l.map(d=>V`<li>${d}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${Uu.map(d=>V`<details class="surface">
          <summary>${d.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${d.note}</p>
          <div class="detail-grid">${d.fields.map(p=>this.field(p,i))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:n.state,live:n.live,history:n.history},null,2)}</pre>
      </details>
      </details>
    `}render(){let n=jl(this.hass),i=n.find(l=>l.entityId===this.selectedId)??n[0];return V`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Lecture seule · 0.2</span></div>
      <main>
        <div class="flex spread intro"><div><span class="eyebrow">SYNTHÈSE</span><h2>Mes thermostats</h2></div>
          <span class="muted small">${n.length} diagnostic${n.length>1?"s":""} SmartPI v2</span></div>
        ${n.length===0?V`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:V`<div class="tiles">${n.map(l=>V`<button type="button" class=${"tile "+(i?.entityId===l.entityId?"selected":"")}
           @click=${()=>{this.selectedId=l.entityId}} aria-pressed=${i?.entityId===l.entityId}>
            <strong>${l.name}</strong><span class="muted small">${ji(l)?"Bootstrap":X(R(l.live,"control.phase"))}</span>
            <span class="big">${X(R(l.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom"><span>Cible ${X(R(l.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
              <span>${X(R(l.live,"power.applied_percent")," %",1)}</span></span>
          </button>`)}</div>
          ${i?this.showDiagnostic(i):he}`}
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
  `,ie([Ce({attribute:!1})],Gt.prototype,"hass",2),ie([Ce({attribute:!1})],Gt.prototype,"panel",2),ie([Ce({type:Boolean})],Gt.prototype,"narrow",2),ie([it()],Gt.prototype,"selectedId",2),Gt=ie([It("smartpi-dashboard-panel")],Gt);export{Gt as SmartPIDashboardPanel};
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
