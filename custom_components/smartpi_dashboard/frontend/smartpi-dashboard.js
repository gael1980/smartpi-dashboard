var Ca=Object.defineProperty;var Ea=Object.getOwnPropertyDescriptor;var ee=(t,e,n,i)=>{for(var l=i>1?void 0:i?Ea(e,n):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(l=(i?a(e,n,l):a(l))||l);return i&&l&&Ca(e,n,l),l};var Nn=globalThis,qn=Nn.ShadowRoot&&(Nn.ShadyCSS===void 0||Nn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Dl=Symbol(),tr=new WeakMap,fn=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Dl)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o,n=this.t;if(qn&&e===void 0){let i=n!==void 0&&n.length===1;i&&(e=tr.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&tr.set(n,e))}return e}toString(){return this.cssText}},Un=t=>new fn(typeof t=="string"?t:t+"",void 0,Dl),At=(t,...e)=>{let n=t.length===1?t[0]:e.reduce((i,l,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(l)+t[o+1],t[0]);return new fn(n,t,Dl)},ir=(t,e)=>{if(qn)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let i=document.createElement("style"),l=Nn.litNonce;l!==void 0&&i.setAttribute("nonce",l),i.textContent=n.cssText,t.appendChild(i)}},Rl=qn?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(let i of e.cssRules)n+=i.cssText;return Un(n)})(t):t;var{is:Ma,defineProperty:Ta,getOwnPropertyDescriptor:Pa,getOwnPropertyNames:Fa,getOwnPropertySymbols:La,getPrototypeOf:Da}=Object,Vn=globalThis,nr=Vn.trustedTypes,Ra=nr?nr.emptyScript:"",za=Vn.reactiveElementPolyfillSupport,hn=(t,e)=>t,mn={toAttribute(t,e){switch(e){case Boolean:t=t?Ra:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},jn=(t,e)=>!Ma(t,e),lr={attribute:!0,type:String,converter:mn,reflect:!1,useDefault:!1,hasChanged:jn};Symbol.metadata??=Symbol("metadata"),Vn.litPropertyMetadata??=new WeakMap;var jt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=lr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){let i=Symbol(),l=this.getPropertyDescriptor(e,i,n);l!==void 0&&Ta(this.prototype,e,l)}}static getPropertyDescriptor(e,n,i){let{get:l,set:o}=Pa(this.prototype,e)??{get(){return this[n]},set(a){this[n]=a}};return{get:l,set(a){let p=l?.call(this);o?.call(this,a),this.requestUpdate(e,p,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??lr}static _$Ei(){if(this.hasOwnProperty(hn("elementProperties")))return;let e=Da(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(hn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(hn("properties"))){let n=this.properties,i=[...Fa(n),...La(n)];for(let l of i)this.createProperty(l,n[l])}let e=this[Symbol.metadata];if(e!==null){let n=litPropertyMetadata.get(e);if(n!==void 0)for(let[i,l]of n)this.elementProperties.set(i,l)}this._$Eh=new Map;for(let[n,i]of this.elementProperties){let l=this._$Eu(n,i);l!==void 0&&this._$Eh.set(l,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let n=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let l of i)n.unshift(Rl(l))}else e!==void 0&&n.push(Rl(e));return n}static _$Eu(e,n){let i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,n=this.constructor.elementProperties;for(let i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ir(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){let i=this.constructor.elementProperties.get(e),l=this.constructor._$Eu(e,i);if(l!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:mn).toAttribute(n,i.type);this._$Em=e,o==null?this.removeAttribute(l):this.setAttribute(l,o),this._$Em=null}}_$AK(e,n){let i=this.constructor,l=i._$Eh.get(e);if(l!==void 0&&this._$Em!==l){let o=i.getPropertyOptions(l),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:mn;this._$Em=l;let p=a.fromAttribute(n,o.type);this[l]=p??this._$Ej?.get(l)??p,this._$Em=null}}requestUpdate(e,n,i,l=!1,o){if(e!==void 0){let a=this.constructor;if(l===!1&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??jn)(o,n)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:l,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??n??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),l===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[l,o]of this._$Ep)this[l]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[l,o]of i){let{wrapped:a}=o,p=this[l];a!==!0||this._$AL.has(l)||p===void 0||this.C(l,void 0,o,p)}}let e=!1,n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(n)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(n)}willUpdate(e){}_$AE(e){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(e){}firstUpdated(e){}};jt.elementStyles=[],jt.shadowRootOptions={mode:"open"},jt[hn("elementProperties")]=new Map,jt[hn("finalized")]=new Map,za?.({ReactiveElement:jt}),(Vn.reactiveElementVersions??=[]).push("2.1.2");var Ul=globalThis,sr=t=>t,Bn=Ul.trustedTypes,rr=Bn?Bn.createPolicy("lit-html",{createHTML:t=>t}):void 0,dr="$lit$",ei=`lit$${Math.random().toFixed(9).slice(2)}$`,fr="?"+ei,Ha=`<${fr}>`,gi=document,bn=()=>gi.createComment(""),vn=t=>t===null||typeof t!="object"&&typeof t!="function",Vl=Array.isArray,Ia=t=>Vl(t)||typeof t?.[Symbol.iterator]=="function",zl=`[ 	
\f\r]`,gn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,or=/-->/g,ar=/>/g,hi=RegExp(`>|${zl}(?:([^\\s"'>=/]+)(${zl}*=${zl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),cr=/'/g,ur=/"/g,hr=/^(?:script|style|textarea|title)$/i,jl=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),F=jl(1),_n=jl(2),Xu=jl(3),bi=Symbol.for("lit-noChange"),ce=Symbol.for("lit-nothing"),pr=new WeakMap,mi=gi.createTreeWalker(gi,129);function mr(t,e){if(!Vl(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return rr!==void 0?rr.createHTML(e):e}var Oa=(t,e)=>{let n=t.length-1,i=[],l,o=e===2?"<svg>":e===3?"<math>":"",a=gn;for(let p=0;p<n;p++){let d=t[p],f,b,m=-1,v=0;for(;v<d.length&&(a.lastIndex=v,b=a.exec(d),b!==null);)v=a.lastIndex,a===gn?b[1]==="!--"?a=or:b[1]!==void 0?a=ar:b[2]!==void 0?(hr.test(b[2])&&(l=RegExp("</"+b[2],"g")),a=hi):b[3]!==void 0&&(a=hi):a===hi?b[0]===">"?(a=l??gn,m=-1):b[1]===void 0?m=-2:(m=a.lastIndex-b[2].length,f=b[1],a=b[3]===void 0?hi:b[3]==='"'?ur:cr):a===ur||a===cr?a=hi:a===or||a===ar?a=gn:(a=hi,l=void 0);let k=a===hi&&t[p+1].startsWith("/>")?" ":"";o+=a===gn?d+Ha:m>=0?(i.push(f),d.slice(0,m)+dr+d.slice(m)+ei+k):d+ei+(m===-2?p:k)}return[mr(t,o+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},yn=class t{constructor({strings:e,_$litType$:n},i){let l;this.parts=[];let o=0,a=0,p=e.length-1,d=this.parts,[f,b]=Oa(e,n);if(this.el=t.createElement(f,i),mi.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(l=mi.nextNode())!==null&&d.length<p;){if(l.nodeType===1){if(l.hasAttributes())for(let m of l.getAttributeNames())if(m.endsWith(dr)){let v=b[a++],k=l.getAttribute(m).split(ei),E=/([.?@])?(.*)/.exec(v);d.push({type:1,index:o,name:E[2],strings:k,ctor:E[1]==="."?Il:E[1]==="?"?Ol:E[1]==="@"?Nl:Bi}),l.removeAttribute(m)}else m.startsWith(ei)&&(d.push({type:6,index:o}),l.removeAttribute(m));if(hr.test(l.tagName)){let m=l.textContent.split(ei),v=m.length-1;if(v>0){l.textContent=Bn?Bn.emptyScript:"";for(let k=0;k<v;k++)l.append(m[k],bn()),mi.nextNode(),d.push({type:2,index:++o});l.append(m[v],bn())}}}else if(l.nodeType===8)if(l.data===fr)d.push({type:2,index:o});else{let m=-1;for(;(m=l.data.indexOf(ei,m+1))!==-1;)d.push({type:7,index:o}),m+=ei.length-1}o++}}static createElement(e,n){let i=gi.createElement("template");return i.innerHTML=e,i}};function ji(t,e,n=t,i){if(e===bi)return e;let l=i!==void 0?n._$Co?.[i]:n._$Cl,o=vn(e)?void 0:e._$litDirective$;return l?.constructor!==o&&(l?._$AO?.(!1),o===void 0?l=void 0:(l=new o(t),l._$AT(t,n,i)),i!==void 0?(n._$Co??=[])[i]=l:n._$Cl=l),l!==void 0&&(e=ji(t,l._$AS(t,e.values),l,i)),e}var Hl=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:i}=this._$AD,l=(e?.creationScope??gi).importNode(n,!0);mi.currentNode=l;let o=mi.nextNode(),a=0,p=0,d=i[0];for(;d!==void 0;){if(a===d.index){let f;d.type===2?f=new xn(o,o.nextSibling,this,e):d.type===1?f=new d.ctor(o,d.name,d.strings,this,e):d.type===6&&(f=new ql(o,this,e)),this._$AV.push(f),d=i[++p]}a!==d?.index&&(o=mi.nextNode(),a++)}return mi.currentNode=gi,l}p(e){let n=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}},xn=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,i,l){this.type=2,this._$AH=ce,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=ji(this,e,n),vn(e)?e===ce||e==null||e===""?(this._$AH!==ce&&this._$AR(),this._$AH=ce):e!==this._$AH&&e!==bi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ia(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ce&&vn(this._$AH)?this._$AA.nextSibling.data=e:this.T(gi.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:i}=e,l=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=yn.createElement(mr(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===l)this._$AH.p(n);else{let o=new Hl(l,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(e){let n=pr.get(e.strings);return n===void 0&&pr.set(e.strings,n=new yn(e)),n}k(e){Vl(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,i,l=0;for(let o of e)l===n.length?n.push(i=new t(this.O(bn()),this.O(bn()),this,this.options)):i=n[l],i._$AI(o),l++;l<n.length&&(this._$AR(i&&i._$AB.nextSibling,l),n.length=l)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let i=sr(e).nextSibling;sr(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Bi=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,l,o){this.type=1,this._$AH=ce,this._$AN=void 0,this.element=e,this.name=n,this._$AM=l,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ce}_$AI(e,n=this,i,l){let o=this.strings,a=!1;if(o===void 0)e=ji(this,e,n,0),a=!vn(e)||e!==this._$AH&&e!==bi,a&&(this._$AH=e);else{let p=e,d,f;for(e=o[0],d=0;d<o.length-1;d++)f=ji(this,p[i+d],n,d),f===bi&&(f=this._$AH[d]),a||=!vn(f)||f!==this._$AH[d],f===ce?e=ce:e!==ce&&(e+=(f??"")+o[d+1]),this._$AH[d]=f}a&&!l&&this.j(e)}j(e){e===ce?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Il=class extends Bi{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ce?void 0:e}},Ol=class extends Bi{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ce)}},Nl=class extends Bi{constructor(e,n,i,l,o){super(e,n,i,l,o),this.type=5}_$AI(e,n=this){if((e=ji(this,e,n,0)??ce)===bi)return;let i=this._$AH,l=e===ce&&i!==ce||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==ce&&(i===ce||l);l&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ql=class{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ji(this,e)}};var Na=Ul.litHtmlPolyfillSupport;Na?.(yn,xn),(Ul.litHtmlVersions??=[]).push("3.3.3");var gr=(t,e,n)=>{let i=n?.renderBefore??e,l=i._$litPart$;if(l===void 0){let o=n?.renderBefore??null;i._$litPart$=l=new xn(e.insertBefore(bn(),o),o,void 0,n??{})}return l._$AI(t),l};var Bl=globalThis,We=class extends jt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=gr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return bi}};We._$litElement$=!0,We.finalized=!0,Bl.litElementHydrateSupport?.({LitElement:We});var qa=Bl.litElementPolyfillSupport;qa?.({LitElement:We});(Bl.litElementVersions??=[]).push("4.2.2");var Ot=t=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Ua={attribute:!0,type:String,converter:mn,reflect:!1,hasChanged:jn},Va=(t=Ua,e,n)=>{let{kind:i,metadata:l}=n,o=globalThis.litPropertyMetadata.get(l);if(o===void 0&&globalThis.litPropertyMetadata.set(l,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(n.name,t),i==="accessor"){let{name:a}=n;return{set(p){let d=e.get.call(this);e.set.call(this,p),this.requestUpdate(a,d,t,!0,p)},init(p){return p!==void 0&&this.C(a,void 0,t,p),p}}}if(i==="setter"){let{name:a}=n;return function(p){let d=this[a];e.call(this,p),this.requestUpdate(a,d,t,!0,p)}}throw Error("Unsupported decorator location: "+i)};function Ee(t){return(e,n)=>typeof n=="object"?Va(t,e,n):((i,l,o)=>{let a=l.hasOwnProperty(o);return l.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(l,o):void 0})(t,e,n)}function Qe(t){return Ee({...t,state:!0,attribute:!1})}function ct(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function N(t,e){return e.split(".").reduce((n,i)=>ct(n)?n[i]:void 0,t)}function Xe(t){return typeof t=="number"&&Number.isFinite(t)?t:null}function le(t,e="",n=2){let i=Xe(t);return i!==null?i.toLocaleString("fr-FR",{maximumFractionDigits:n})+e:typeof t=="boolean"?t?"Oui":"Non":typeof t=="string"&&t.trim()!==""?t:"Indisponible"}function wn(t){return N(t.live,"control.mode")==="hysteresis"||N(t.live,"learning.stage")==="bootstrap"}function Ct(t,e,n){if(!(n&&N(t,n)!==!0)&&!(e.startsWith("analysis.twin.")&&!e.endsWith("reliable")&&(N(t,"analysis.twin.twin_model_reliable")!==!0||N(t,"analysis.twin.twin_warming_up")!==!1)))return N(t,e)}function ja(t,e){return Object.values(t.states).find(i=>i.entity_id.startsWith("climate.")&&N(i.attributes,"specific_states.regulation_diagnostics")===e)??null}function Wl(t){if(!t||!ct(t.states))return[];let e=[];for(let n of Object.values(t.states)){if(!n?.entity_id?.startsWith("sensor.")||!ct(n.attributes))continue;let i=n.attributes;if(i.schema_version!==2||!ct(i.live)||!ct(i.history))continue;let l=ja(t,n.entity_id),a=(typeof i.friendly_name=="string"?i.friendly_name:n.entity_id).replace(/ SmartPI Diagnostics$/i,"");e.push({entityId:n.entity_id,climateId:l?.entity_id??null,name:typeof l?.attributes.friendly_name=="string"?l.attributes.friendly_name:a,state:n.state,lastUpdated:n.last_updated??null,available:n.state!=="unknown"&&n.state!=="unavailable",live:n.state==="unknown"||n.state==="unavailable"?{}:i.live,history:i.history})}return e.sort((n,i)=>n.name.localeCompare(i.name,"fr"))}function br(t){let e=[];if(!t.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];e.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),wn(t)&&e.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),N(t.live,"control.in_deadtime_window")===!0&&e.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),N(t.live,"model.tau_reliable")===!1&&e.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),N(t.live,"analysis.twin.twin_T_steady_reliable")===!1&&e.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let n=N(t.live,"feedforward.ff3_status");return typeof n=="string"&&n.startsWith("disabled:")&&e.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+n+"."),e}var Ba=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function Kn(t){if(typeof t=="number")return Number.isFinite(t)&&t>0?t:null;if(typeof t!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(t))return null;let e=Date.parse(t);return Number.isFinite(e)?e/1e3:null}function yr(t){if(!Array.isArray(t))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let e=[];for(let n of t){if(!ct(n))continue;let i=Kn(n.lu??n.last_updated);if(i===null)continue;let l=ct(n.a)?n.a:ct(n.attributes)?n.attributes:{},o=typeof n.s=="string"?n.s:typeof n.state=="string"?n.state:"unknown",a=l.schema_version===2&&o!=="unavailable"&&o!=="unknown";e.push({time:i,state:o,history:a&&ct(l.history)?l.history:{},live:a&&ct(l.live)?l.live:{}})}return Yn(e)}function Yn(t){return[...new Map(t.map(e=>[e.time,e])).values()].sort((e,n)=>e.time-n.time)}function vi(t,e){if(e==="error"){let n=Xe(N(t.history,"temperature.indoor")),i=Xe(N(t.history,"setpoint.filtered_setpoint"));return n===null||i===null?null:Xe(i-n)}return e.startsWith("live.")?Xe(Ct(t.live,e.slice(5))):Xe(N(t.history,e))}function vr(t){if(t.length<2)return null;t.sort((n,i)=>n-i);let e=Math.floor(t.length/2);return t.length%2?t[e]:t[e-1]/2+t[e]/2}function xr(t){let e=[],n=null,i=null;for(let o of t){let a=vi(o,"error");a!==null&&(e.push(a),n!==null&&(i=Math.max(i??0,o.time-n)),n=o.time)}let l=e.map(Math.abs);return{pairs:e.length,signedMedian:vr(e),absoluteMedian:vr(l),largestInterval:i}}function Gl(t){return t.some(e=>Ba.some(n=>vi(e,n)!==null))}function _r(t){let e=[];for(let n=1;n<t.length;n++){let i=t[n-1],l=t[n],o=Xe(N(i.history,"setpoint.filtered_setpoint")),a=Xe(N(l.history,"setpoint.filtered_setpoint"));o!==null&&a!==null&&o!==a&&e.push({time:l.time,label:`Consigne filtr\xE9e ${o} \u2192 ${a} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),i.state!==l.state&&e.push({time:l.time,label:`Phase / \xE9tat : ${i.state} \u2192 ${l.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[p,d]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let f=N(i.live,p),b=N(l.live,p);f!=null&&b!==void 0&&b!==null&&f!==b&&e.push({time:l.time,label:`${d} : ${String(b)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${p}.`})}}return e}var Gn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(e,n,i=Date.now()/1e3){let l=new Set(e.map(o=>o.entityId));for(let o of this.buffers.keys())l.has(o)||(this.buffers.delete(o),this.revisions.delete(o));for(let o of e){let a=n[o.entityId]?.last_updated,p=Kn(a);if(!a||p===null||this.revisions.get(o.entityId)===a)continue;this.revisions.set(o.entityId,a);let d=this.buffers.get(o.entityId)??[];if(d.length&&p<=d[d.length-1].time)continue;let b={time:d.length===0?i:p,state:o.state,history:o.available?o.history:{},live:o.live};this.buffers.set(o.entityId,Yn([...d,b]).filter(m=>m.time>=i-48*3600).slice(-12e3))}}get(e){return this.buffers.get(e)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};async function wr(t,e,n,i,l=()=>!1){if(!e.startsWith("sensor.")||!Number.isFinite(n)||!Number.isFinite(i)||i<=n||i-n>48*3600)throw new Error("Fen\xEAtre historique invalide.");let o=[];for(let a=n;a<i;a+=12*3600){if(l())throw new Error("Lecture annul\xE9e.");let p=Math.min(i,a+12*3600),d=await t.callWS({type:"history/history_during_period",start_time:new Date(a*1e3).toISOString(),end_time:new Date(p*1e3).toISOString(),entity_ids:[e],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!ct(d))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let f=yr(d[e]??[]);if(o.push(...f.filter(b=>b.time>=a&&b.time<=p)),o.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return Yn(o)}var Wa="uplot",Ga="u-hz",Ka="u-vt",Ya="u-title",Ja="u-wrap",Za="u-under",Qa="u-over",Xa="u-axis",_i="u-off",ec="u-select",tc="u-cursor-x",ic="u-cursor-y",nc="u-cursor-pt",lc="u-legend",sc="u-live",rc="u-inline",oc="u-series",ac="u-marker",Sr="u-label",cc="u-value",$n="width",kn="height";var $r="bottom",Wi="left",Kl="right",ps="#000",kr=ps+"0",Yl="mousemove",Ar="mousedown",Jl="mouseup",Cr="mouseenter",Er="mouseleave",Mr="dblclick",uc="resize",pc="scroll",Tr="change",el="dppxchange",ds="--",Xi=typeof window<"u",ts=Xi?document:null,Ki=Xi?window:null,dc=Xi?navigator:null,ue,Jn;function is(){let t=devicePixelRatio;ue!=t&&(ue=t,Jn&&ls(Tr,Jn,is),Jn=matchMedia(`(min-resolution: ${ue-.001}dppx) and (max-resolution: ${ue+.001}dppx)`),wi(Tr,Jn,is),Ki.dispatchEvent(new CustomEvent(el)))}function ut(t,e){if(e!=null){let n=t.classList;!n.contains(e)&&n.add(e)}}function ns(t,e){let n=t.classList;n.contains(e)&&n.remove(e)}function _e(t,e,n){t.style[e]=n+"px"}function Et(t,e,n,i){let l=ts.createElement(t);return e!=null&&ut(l,e),n?.insertBefore(l,i),l}function yt(t,e){return Et("div",t,e)}var Pr=new WeakMap;function Nt(t,e,n,i,l){let o="translate("+e+"px,"+n+"px)",a=Pr.get(t);o!=a&&(t.style.transform=o,Pr.set(t,o),e<0||n<0||e>i||n>l?ut(t,_i):ns(t,_i))}var Fr=new WeakMap;function Lr(t,e,n){let i=e+n,l=Fr.get(t);i!=l&&(Fr.set(t,i),t.style.background=e,t.style.borderColor=n)}var Dr=new WeakMap;function Rr(t,e,n,i){let l=e+""+n,o=Dr.get(t);l!=o&&(Dr.set(t,l),t.style.height=n+"px",t.style.width=e+"px",t.style.marginLeft=i?-e/2+"px":0,t.style.marginTop=i?-n/2+"px":0)}var fs={passive:!0},fc={...fs,capture:!0};function wi(t,e,n,i){e.addEventListener(t,n,i?fc:fs)}function ls(t,e,n,i){e.removeEventListener(t,n,fs)}Xi&&is();function Mt(t,e,n,i){let l;n=n||0,i=i||e.length-1;let o=i<=2147483647;for(;i-n>1;)l=o?n+i>>1:pt((n+i)/2),e[l]<t?n=l:i=l;return t-e[n]<=e[i]-t?n:i}function co(t){return(n,i,l)=>{let o=-1,a=-1;for(let p=i;p<=l;p++)if(t(n[p])){o=p;break}for(let p=l;p>=i;p--)if(t(n[p])){a=p;break}return[o,a]}}var uo=t=>t!=null,po=t=>t!=null&&t>0,nl=co(uo),hc=co(po);function mc(t,e,n,i=0,l=!1){let o=l?hc:nl,a=l?po:uo;[e,n]=o(t,e,n);let p=t[e],d=t[e];if(e>-1)if(i==1)p=t[e],d=t[n];else if(i==-1)p=t[n],d=t[e];else for(let f=e;f<=n;f++){let b=t[f];a(b)&&(b<p?p=b:b>d&&(d=b))}return[p??me,d??-me]}function ll(t,e,n,i){let l=Ir(t),o=Ir(e);t==e&&(l==-1?(t*=n,e/=n):(t/=n,e*=n));let a=n==10?Bt:fo,p=l==1?pt:xt,d=o==1?xt:pt,f=p(a(De(t))),b=d(a(De(e))),m=Yi(n,f),v=Yi(n,b);return n==10&&(f<0&&(m=ge(m,-f)),b<0&&(v=ge(v,-b))),i||n==2?(t=m*l,e=v*o):(t=bo(t,m),e=sl(e,v)),[t,e]}function hs(t,e,n,i){let l=ll(t,e,n,i);return t==0&&(l[0]=0),e==0&&(l[1]=0),l}var ms=.1,zr={mode:3,pad:ms},Cn={pad:0,soft:null,mode:0},gc={min:Cn,max:Cn};function tl(t,e,n,i){return rl(n)?Hr(t,e,n):(Cn.pad=n,Cn.soft=i?0:null,Cn.mode=i?3:0,Hr(t,e,gc))}function oe(t,e){return t??e}function bc(t,e,n){for(e=oe(e,0),n=oe(n,t.length-1);e<=n;){if(t[e]!=null)return!0;e++}return!1}function Hr(t,e,n){let i=n.min,l=n.max,o=oe(i.pad,0),a=oe(l.pad,0),p=oe(i.hard,-me),d=oe(l.hard,me),f=oe(i.soft,me),b=oe(l.soft,-me),m=oe(i.mode,0),v=oe(l.mode,0),k=e-t,E=Bt(k),I=et(De(t),De(e)),q=Bt(I),V=De(q-E);(k<1e-24||V>10)&&(k=0,(t==0||e==0)&&(k=1e-24,m==2&&f!=me&&(o=0),v==2&&b!=-me&&(a=0)));let w=k||I||1e3,O=Bt(w),S=Yi(10,pt(O)),J=w*(k==0?t==0?.1:1:o),P=ge(bo(t-J,S/10),24),Z=t>=f&&(m==1||m==3&&P<=f||m==2&&P>=f)?f:me,G=et(p,P<Z&&t>=Z?Z:Tt(Z,P)),te=w*(k==0?e==0?.1:1:a),W=ge(sl(e+te,S/10),24),$=e<=b&&(v==1||v==3&&W>=b||v==2&&W<=b)?b:-me,Y=Tt(d,W>$&&e<=$?$:et($,W));return G==Y&&G==0&&(Y=100),[G,Y]}var vc=new Intl.NumberFormat(Xi?dc.language:"en-US"),gs=t=>vc.format(t),dt=Math,Xn=dt.PI,De=dt.abs,pt=dt.floor,Le=dt.round,xt=dt.ceil,Tt=dt.min,et=dt.max,Yi=dt.pow,Ir=dt.sign,Bt=dt.log10,fo=dt.log2,yc=(t,e=1)=>dt.sinh(t)*e,Zl=(t,e=1)=>dt.asinh(t/e),me=1/0;function Or(t){return(Bt((t^t>>31)-(t>>31))|0)+1}function ss(t,e,n){return Tt(et(t,e),n)}function ho(t){return typeof t=="function"}function ie(t){return ho(t)?t:()=>t}var xc=()=>{},mo=t=>t,go=(t,e)=>e,_c=t=>null,Nr=t=>!0,qr=(t,e)=>t==e,wc=/\.\d*?(?=9{6,}|0{6,})/gm,Si=t=>{if(yo(t)||ii.has(t))return t;let e=`${t}`,n=e.match(wc);if(n==null)return t;let i=n[0].length-1;if(e.indexOf("e-")!=-1){let[l,o]=e.split("e");return+`${Si(l)}e${o}`}return ge(t,i)};function yi(t,e){return Si(ge(Si(t/e))*e)}function sl(t,e){return Si(xt(Si(t/e))*e)}function bo(t,e){return Si(pt(Si(t/e))*e)}function ge(t,e=0){if(yo(t))return t;let n=10**e,i=t*n*(1+Number.EPSILON);return Le(i)/n}var ii=new Map;function vo(t){return((""+t).split(".")[1]||"").length}function Mn(t,e,n,i){let l=[],o=i.map(vo);for(let a=e;a<n;a++){let p=De(a),d=ge(Yi(t,a),p);for(let f=0;f<i.length;f++){let b=t==10?+`${i[f]}e${a}`:i[f]*d,m=(a>=0?0:p)+(a>=o[f]?0:o[f]),v=t==10?b:ge(b,m);l.push(v),ii.set(v,m)}}return l}var En={},bs=[],Ji=[null,null],ti=Array.isArray,yo=Number.isInteger,Sc=t=>t===void 0;function Ur(t){return typeof t=="string"}function rl(t){let e=!1;if(t!=null){let n=t.constructor;e=n==null||n==Object}return e}function $c(t){return t!=null&&typeof t=="object"}var kc=Object.getPrototypeOf(Uint8Array),xo="__proto__";function Zi(t,e=rl){let n;if(ti(t)){let i=t.find(l=>l!=null);if(ti(i)||e(i)){n=Array(t.length);for(let l=0;l<t.length;l++)n[l]=Zi(t[l],e)}else n=t.slice()}else if(t instanceof kc)n=t.slice();else if(e(t)){n={};for(let i in t)i!=xo&&(n[i]=Zi(t[i],e))}else n=t;return n}function Te(t){let e=arguments;for(let n=1;n<e.length;n++){let i=e[n];for(let l in i)l!=xo&&(rl(t[l])?Te(t[l],Zi(i[l])):t[l]=Zi(i[l]))}return t}var Ac=0,Cc=1,Ec=2;function Mc(t,e,n){for(let i=0,l,o=-1;i<e.length;i++){let a=e[i];if(a>o){for(l=a-1;l>=0&&t[l]==null;)t[l--]=null;for(l=a+1;l<n&&t[l]==null;)t[o=l++]=null}}}function Tc(t,e){if(Lc(t)){let a=t[0].slice();for(let p=1;p<t.length;p++)a.push(...t[p].slice(1));return Dc(a[0])||(a=Fc(a)),a}let n=new Set;for(let a=0;a<t.length;a++){let d=t[a][0],f=d.length;for(let b=0;b<f;b++)n.add(d[b])}let i=[Array.from(n).sort((a,p)=>a-p)],l=i[0].length,o=new Map;for(let a=0;a<l;a++)o.set(i[0][a],a);for(let a=0;a<t.length;a++){let p=t[a],d=p[0];for(let f=1;f<p.length;f++){let b=p[f],m=Array(l).fill(void 0),v=e?e[a][f]:Cc,k=[];for(let E=0;E<b.length;E++){let I=b[E],q=o.get(d[E]);I===null?v!=Ac&&(m[q]=I,v==Ec&&k.push(q)):m[q]=I}Mc(m,k,l),i.push(m)}}return i}var Pc=typeof queueMicrotask>"u"?t=>Promise.resolve().then(t):queueMicrotask;function Fc(t){let e=t[0],n=e.length,i=Array(n);for(let o=0;o<i.length;o++)i[o]=o;i.sort((o,a)=>e[o]-e[a]);let l=[];for(let o=0;o<t.length;o++){let a=t[o],p=Array(n);for(let d=0;d<n;d++)p[d]=a[i[d]];l.push(p)}return l}function Lc(t){let e=t[0][0],n=e.length;for(let i=1;i<t.length;i++){let l=t[i][0];if(l.length!=n)return!1;if(l!=e){for(let o=0;o<n;o++)if(l[o]!=e[o])return!1}}return!0}function Dc(t,e=100){let n=t.length;if(n<=1)return!0;let i=0,l=n-1;for(;i<=l&&t[i]==null;)i++;for(;l>=i&&t[l]==null;)l--;if(l<=i)return!0;let o=et(1,pt((l-i+1)/e));for(let a=t[i],p=i+o;p<=l;p+=o){let d=t[p];if(d!=null){if(d<=a)return!1;a=d}}return!0}var _o=["January","February","March","April","May","June","July","August","September","October","November","December"],wo=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function So(t){return t.slice(0,3)}var Rc=wo.map(So),zc=_o.map(So),Hc={MMMM:_o,MMM:zc,WWWW:wo,WWW:Rc};function Sn(t){return(t<10?"0":"")+t}function Ic(t){return(t<10?"00":t<100?"0":"")+t}var Oc={YYYY:t=>t.getFullYear(),YY:t=>(t.getFullYear()+"").slice(2),MMMM:(t,e)=>e.MMMM[t.getMonth()],MMM:(t,e)=>e.MMM[t.getMonth()],MM:t=>Sn(t.getMonth()+1),M:t=>t.getMonth()+1,DD:t=>Sn(t.getDate()),D:t=>t.getDate(),WWWW:(t,e)=>e.WWWW[t.getDay()],WWW:(t,e)=>e.WWW[t.getDay()],HH:t=>Sn(t.getHours()),H:t=>t.getHours(),h:t=>{let e=t.getHours();return e==0?12:e>12?e-12:e},AA:t=>t.getHours()>=12?"PM":"AM",aa:t=>t.getHours()>=12?"pm":"am",a:t=>t.getHours()>=12?"p":"a",mm:t=>Sn(t.getMinutes()),m:t=>t.getMinutes(),ss:t=>Sn(t.getSeconds()),s:t=>t.getSeconds(),fff:t=>Ic(t.getMilliseconds())};function vs(t,e){e=e||Hc;let n=[],i=/\{([a-z]+)\}|[^{]+/gi,l;for(;l=i.exec(t);)n.push(l[0][0]=="{"?Oc[l[1]]:l[0]);return o=>{let a="";for(let p=0;p<n.length;p++)a+=typeof n[p]=="string"?n[p]:n[p](o,e);return a}}var Nc=new Intl.DateTimeFormat().resolvedOptions().timeZone;function qc(t,e){let n;return e=="UTC"||e=="Etc/UTC"?n=new Date(+t+t.getTimezoneOffset()*6e4):e==Nc?n=t:(n=new Date(t.toLocaleString("en-US",{timeZone:e})),n.setMilliseconds(t.getMilliseconds())),n}var $o=t=>t%1==0,il=[1,2,2.5,5],Uc=Mn(10,-32,0,il),ko=Mn(10,0,32,il),Vc=ko.filter($o),xi=Uc.concat(ko),ys=`
`,Ao="{YYYY}",Vr=ys+Ao,Co="{M}/{D}",An=ys+Co,Zn=An+"/{YY}",Eo="{aa}",jc="{h}:{mm}",Gi=jc+Eo,jr=ys+Gi,Br=":{ss}",de=null;function Mo(t){let e=t*1e3,n=e*60,i=n*60,l=i*24,o=l*30,a=l*365,d=(t==1?Mn(10,0,3,il).filter($o):Mn(10,-3,0,il)).concat([e,e*5,e*10,e*15,e*30,n,n*5,n*10,n*15,n*30,i,i*2,i*3,i*4,i*6,i*8,i*12,l,l*2,l*3,l*4,l*5,l*6,l*7,l*8,l*9,l*10,l*15,o,o*2,o*3,o*4,o*6,a,a*2,a*5,a*10,a*25,a*50,a*100]),f=[[a,Ao,de,de,de,de,de,de,1],[l*28,"{MMM}",Vr,de,de,de,de,de,1],[l,Co,Vr,de,de,de,de,de,1],[i,"{h}"+Eo,Zn,de,An,de,de,de,1],[n,Gi,Zn,de,An,de,de,de,1],[e,Br,Zn+" "+Gi,de,An+" "+Gi,de,jr,de,1],[t,Br+".{fff}",Zn+" "+Gi,de,An+" "+Gi,de,jr,de,1]];function b(m){return(v,k,E,I,q,V)=>{let w=[],O=q>=a,S=q>=o&&q<a,J=m(E),P=ge(J*t,3),Z=Ql(J.getFullYear(),O?0:J.getMonth(),S||O?1:J.getDate()),G=ge(Z*t,3);if(S||O){let te=S?q/o:0,W=O?q/a:0,$=P==G?P:ge(Ql(Z.getFullYear()+W,Z.getMonth()+te,1)*t,3),Y=new Date(Le($/t)),L=Y.getFullYear(),j=Y.getMonth();for(let H=0;$<=I;H++){let ne=Ql(L+W*H,j+te*H,1),z=ne-m(ge(ne*t,3));$=ge((+ne+z)*t,3),$<=I&&w.push($)}}else{let te=q>=l?l:q,W=pt(E)-pt(P),$=G+W+sl(P-G,te);w.push($);let Y=m($),L=Y.getHours()+Y.getMinutes()/n+Y.getSeconds()/i,j=q/i,H=v.axes[k]._space,ne=V/H;for(;$=ge($+q,t==1?0:3),!($>I);)if(j>1){let z=pt(ge(L+j,6))%24,se=m($).getHours()-z;se>1&&(se=-1),$-=se*i,L=(L+j)%24;let fe=w[w.length-1];ge(($-fe)/q,3)*ne>=.7&&w.push($)}else w.push($)}return w}}return[d,f,b]}var[Bc,Wc,Gc]=Mo(1),[Kc,Yc,Jc]=Mo(.001);Mn(2,-53,53,[1]);function Wr(t,e){return t.map(n=>n.map((i,l)=>l==0||l==8||i==null?i:e(l==1||n[8]==0?i:n[1]+i)))}function Gr(t,e){return(n,i,l,o,a)=>{let p=e.find(E=>a>=E[0])||e[e.length-1],d,f,b,m,v,k;return i.map(E=>{let I=t(E),q=I.getFullYear(),V=I.getMonth(),w=I.getDate(),O=I.getHours(),S=I.getMinutes(),J=I.getSeconds(),P=q!=d&&p[2]||V!=f&&p[3]||w!=b&&p[4]||O!=m&&p[5]||S!=v&&p[6]||J!=k&&p[7]||p[1];return d=q,f=V,b=w,m=O,v=S,k=J,P(I)})}}function Zc(t,e){let n=vs(e);return(i,l,o,a,p)=>l.map(d=>n(t(d)))}function Ql(t,e,n){return new Date(t,e,n)}function Kr(t,e){return e(t)}var Qc="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function Yr(t,e){return(n,i,l,o)=>o==null?ds:e(t(i))}function Xc(t,e){let n=t.series[e];return n.width?n.stroke(t,e):n.points.width?n.points.stroke(t,e):null}function eu(t,e){return t.series[e].fill(t,e)}var tu={show:!0,live:!0,isolate:!1,mount:xc,markers:{show:!0,width:2,stroke:Xc,fill:eu,dash:"solid"},idx:null,idxs:null,values:[]};function iu(t,e){let n=t.cursor.points,i=yt(),l=n.size(t,e);_e(i,$n,l),_e(i,kn,l);let o=l/-2;_e(i,"marginLeft",o),_e(i,"marginTop",o);let a=n.width(t,e,l);return a&&_e(i,"borderWidth",a),i}function nu(t,e){let n=t.series[e].points;return n._fill||n._stroke}function lu(t,e){let n=t.series[e].points;return n._stroke||n._fill}function su(t,e){return t.series[e].points.size}var Xl=[0,0];function ru(t,e,n){return Xl[0]=e,Xl[1]=n,Xl}function Qn(t,e,n,i=!0){return l=>{l.button==0&&(!i||l.target==e)&&n(l)}}function es(t,e,n,i=!0){return l=>{(!i||l.target==e)&&n(l)}}var ou={show:!0,x:!0,y:!0,lock:!1,move:ru,points:{one:!1,show:iu,size:su,width:0,stroke:lu,fill:nu},bind:{mousedown:Qn,mouseup:Qn,click:Qn,dblclick:Qn,mousemove:es,mouseleave:es,mouseenter:es},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(t,e)=>{e.stopPropagation(),e.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(t,e,n,i,l)=>i-l,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},To={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},xs=Te({},To,{filter:go}),Po=Te({},xs,{size:10}),Fo=Te({},To,{show:!1}),_s='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Lo="bold "+_s,Do=1.5,Jr={show:!0,scale:"x",stroke:ps,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Lo,side:2,grid:xs,ticks:Po,border:Fo,font:_s,lineGap:Do,rotate:0},au="Value",cu="Time",Zr={show:!0,scale:"x",auto:!1,sorted:1,min:me,max:-me,idxs:[]};function uu(t,e,n,i,l){return e.map(o=>o==null?"":gs(o))}function pu(t,e,n,i,l,o,a){let p=[],d=ii.get(l)||0;n=a?n:ge(sl(n,l),d);for(let f=n;f<=i;f=ge(f+l,d))p.push(Object.is(f,-0)?0:f);return p}function rs(t,e,n,i,l,o,a){let p=[],d=t.scales[t.axes[e].scale].log,f=d==10?Bt:fo,b=pt(f(n));l=Yi(d,b),d==10&&(l=xi[Mt(l,xi)]);let m=n,v=l*d;d==10&&(v=xi[Mt(v,xi)]);do p.push(m),m=m+l,d==10&&!ii.has(m)&&(m=ge(m,ii.get(l))),m>=v&&(l=m,v=l*d,d==10&&(v=xi[Mt(v,xi)]));while(m<=i);return p}function du(t,e,n,i,l,o,a){let d=t.scales[t.axes[e].scale].asinh,f=i>d?rs(t,e,et(d,n),i,l):[d],b=i>=0&&n<=0?[0]:[];return(n<-d?rs(t,e,et(d,-i),-n,l):[d]).reverse().map(v=>-v).concat(b,f)}var Ro=/./,fu=/[12357]/,hu=/[125]/,Qr=/1/,os=(t,e,n,i)=>t.map((l,o)=>e==4&&l==0||o%i==0&&n.test(l.toExponential()[l<0?1:0])?l:null);function mu(t,e,n,i,l){let o=t.axes[n],a=o.scale,p=t.scales[a],d=t.valToPos,f=o._space,b=d(10,a),m=d(9,a)-b>=f?Ro:d(7,a)-b>=f?fu:d(5,a)-b>=f?hu:Qr;if(m==Qr){let v=De(d(1,a)-b);if(v<f)return os(e.slice().reverse(),p.distr,m,xt(f/v)).reverse()}return os(e,p.distr,m,1)}function gu(t,e,n,i,l){let o=t.axes[n],a=o.scale,p=o._space,d=t.valToPos,f=De(d(1,a)-d(2,a));return f<p?os(e.slice().reverse(),3,Ro,xt(p/f)).reverse():e}function bu(t,e,n,i){return i==null?ds:e==null?"":gs(e)}var Xr={show:!0,scale:"y",stroke:ps,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Lo,side:3,grid:xs,ticks:Po,border:Fo,font:_s,lineGap:Do,rotate:0};function vu(t,e){let n=3+(t||1)*2;return ge(n*e,3)}function yu(t,e){let{scale:n,idxs:i}=t.series[0],l=t._data[0],o=t.valToPos(l[i[0]],n,!0),a=t.valToPos(l[i[1]],n,!0),p=De(a-o),d=t.series[e],f=p/(d.points.space*ue);return i[1]-i[0]<=f}var eo={scale:null,auto:!0,sorted:0,min:me,max:-me},zo=(t,e,n,i,l)=>l,to={show:!0,auto:!0,sorted:0,gaps:zo,alpha:1,facets:[Te({},eo,{scale:"x"}),Te({},eo,{scale:"y"})]},io={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:zo,alpha:1,points:{show:yu,filter:null},values:null,min:me,max:-me,idxs:[],path:null,clip:null};function xu(t,e,n,i,l){return n/10}var Ho={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},_u=Te({},Ho,{time:!1,ori:1}),no={};function Io(t,e){let n=no[t];return n||(n={key:t,plots:[],sub(i){n.plots.push(i)},unsub(i){n.plots=n.plots.filter(l=>l!=i)},pub(i,l,o,a,p,d,f){for(let b=0;b<n.plots.length;b++)n.plots[b]!=l&&n.plots[b].pub(i,l,o,a,p,d,f)}},t!=null&&(no[t]=n)),n}var Qi=1,as=2;function $i(t,e,n){let i=t.mode,l=t.series[e],o=i==2?t._data[e]:t._data,a=t.scales,p=t.bbox,d=o[0],f=i==2?o[1]:o[e],b=i==2?a[l.facets[0].scale]:a[t.series[0].scale],m=i==2?a[l.facets[1].scale]:a[l.scale],v=p.left,k=p.top,E=p.width,I=p.height,q=t.valToPosH,V=t.valToPosV;return b.ori==0?n(l,d,f,b,m,q,V,v,k,E,I,al,en,ul,No,Uo):n(l,d,f,b,m,V,q,k,v,I,E,cl,tn,$s,qo,Vo)}function ws(t,e){let n=0,i=0,l=oe(t.bands,bs);for(let o=0;o<l.length;o++){let a=l[o];a.series[0]==e?n=a.dir:a.series[1]==e&&(a.dir==1?i|=1:i|=2)}return[n,i==1?-1:i==2?1:i==3?2:0]}function wu(t,e,n,i,l){let o=t.mode,a=t.series[e],p=o==2?a.facets[1].scale:a.scale,d=t.scales[p];return l==-1?d.min:l==1?d.max:d.distr==3?d.dir==1?d.min:d.max:0}function Wt(t,e,n,i,l,o){return $i(t,e,(a,p,d,f,b,m,v,k,E,I,q)=>{let V=a.pxRound,w=f.dir*(f.ori==0?1:-1),O=f.ori==0?en:tn,S,J;w==1?(S=n,J=i):(S=i,J=n);let P=V(m(p[S],f,I,k)),Z=V(v(d[S],b,q,E)),G=V(m(p[J],f,I,k)),te=V(v(o==1?b.max:b.min,b,q,E)),W=new Path2D(l);return O(W,G,te),O(W,P,te),O(W,P,Z),W})}function ol(t,e,n,i,l,o){let a=null;if(t.length>0){a=new Path2D;let p=e==0?ul:$s,d=n;for(let m=0;m<t.length;m++){let v=t[m];if(v[1]>v[0]){let k=v[0]-d;k>0&&p(a,d,i,k,i+o),d=v[1]}}let f=n+l-d,b=10;f>0&&p(a,d,i-b/2,f,i+o+b)}return a}function Su(t,e,n){let i=t[t.length-1];i&&i[0]==e?i[1]=n:t.push([e,n])}function Ss(t,e,n,i,l,o,a){let p=[],d=t.length;for(let f=l==1?n:i;f>=n&&f<=i;f+=l)if(e[f]===null){let m=f,v=f;if(l==1)for(;++f<=i&&e[f]===null;)v=f;else for(;--f>=n&&e[f]===null;)v=f;let k=o(t[m]),E=v==m?k:o(t[v]),I=m-l;k=a<=0&&I>=0&&I<d?o(t[I]):k;let V=v+l;E=a>=0&&V>=0&&V<d?o(t[V]):E,E>=k&&p.push([k,E])}return p}function lo(t){return t==0?mo:t==1?Le:e=>yi(e,t)}function Oo(t){let e=t==0?al:cl,n=t==0?(l,o,a,p,d,f)=>{l.arcTo(o,a,p,d,f)}:(l,o,a,p,d,f)=>{l.arcTo(a,o,d,p,f)},i=t==0?(l,o,a,p,d)=>{l.rect(o,a,p,d)}:(l,o,a,p,d)=>{l.rect(a,o,d,p)};return(l,o,a,p,d,f=0,b=0)=>{f==0&&b==0?i(l,o,a,p,d):(f=Tt(f,p/2,d/2),b=Tt(b,p/2,d/2),e(l,o+f,a),n(l,o+p,a,o+p,a+d,f),n(l,o+p,a+d,o,a+d,b),n(l,o,a+d,o,a,b),n(l,o,a,o+p,a,f),l.closePath())}}var al=(t,e,n)=>{t.moveTo(e,n)},cl=(t,e,n)=>{t.moveTo(n,e)},en=(t,e,n)=>{t.lineTo(e,n)},tn=(t,e,n)=>{t.lineTo(n,e)},ul=Oo(0),$s=Oo(1),No=(t,e,n,i,l,o)=>{t.arc(e,n,i,l,o)},qo=(t,e,n,i,l,o)=>{t.arc(n,e,i,l,o)},Uo=(t,e,n,i,l,o,a)=>{t.bezierCurveTo(e,n,i,l,o,a)},Vo=(t,e,n,i,l,o,a)=>{t.bezierCurveTo(n,e,l,i,a,o)};function jo(t){return(e,n,i,l,o)=>$i(e,n,(a,p,d,f,b,m,v,k,E,I,q)=>{let{pxRound:V,points:w}=a,O,S;f.ori==0?(O=al,S=No):(O=cl,S=qo);let J=ge(w.width*ue,3),P=(w.size-w.width)/2*ue,Z=ge(P*2,3),G=new Path2D,te=new Path2D,{left:W,top:$,width:Y,height:L}=e.bbox;ul(te,W-Z,$-Z,Y+Z*2,L+Z*2);let j=H=>{if(d[H]!=null){let ne=V(m(p[H],f,I,k)),z=V(v(d[H],b,q,E));O(G,ne+P,z),S(G,ne,z,P,0,Xn*2)}};if(o)o.forEach(j);else for(let H=i;H<=l;H++)j(H);return{stroke:J>0?G:null,fill:G,clip:te,flags:Qi|as}})}function Bo(t){return(e,n,i,l,o,a)=>{i!=l&&(o!=i&&a!=i&&t(e,n,i),o!=l&&a!=l&&t(e,n,l),t(e,n,a))}}var $u=Bo(en),ku=Bo(tn);function Wo(t){let e=oe(t?.alignGaps,0);return(n,i,l,o)=>$i(n,i,(a,p,d,f,b,m,v,k,E,I,q)=>{[l,o]=nl(d,l,o);let V=a.pxRound,w=L=>V(m(L,f,I,k)),O=L=>V(v(L,b,q,E)),S,J;f.ori==0?(S=en,J=$u):(S=tn,J=ku);let P=f.dir*(f.ori==0?1:-1),Z={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Qi},G=Z.stroke,te=!1;if(o-l>=I*4){let L=D=>n.posToVal(D,f.key,!0),j=null,H=null,ne,z,tt,we=w(p[P==1?l:o]),se=w(p[l]),fe=w(p[o]),Q=L(P==1?se+1:fe-1);for(let D=P==1?l:o;D>=l&&D<=o;D+=P){let Pe=p[D],Se=(P==1?Pe<Q:Pe>Q)?we:w(Pe),pe=d[D];Se==we?pe!=null?(z=pe,j==null?(S(G,Se,O(z)),ne=j=H=z):z<j?j=z:z>H&&(H=z)):pe===null&&(te=!0):(j!=null&&J(G,we,O(j),O(H),O(ne),O(z)),pe!=null?(z=pe,S(G,Se,O(z)),j=H=ne=z):(j=H=null,pe===null&&(te=!0)),we=Se,Q=L(we+P))}j!=null&&j!=H&&tt!=we&&J(G,we,O(j),O(H),O(ne),O(z))}else for(let L=P==1?l:o;L>=l&&L<=o;L+=P){let j=d[L];j===null?te=!0:j!=null&&S(G,w(p[L]),O(j))}let[$,Y]=ws(n,i);if(a.fill!=null||$!=0){let L=Z.fill=new Path2D(G),j=a.fillTo(n,i,a.min,a.max,$),H=O(j),ne=w(p[l]),z=w(p[o]);P==-1&&([z,ne]=[ne,z]),S(L,z,H),S(L,ne,H)}if(!a.spanGaps){let L=[];te&&L.push(...Ss(p,d,l,o,P,w,e)),Z.gaps=L=a.gaps(n,i,l,o,L),Z.clip=ol(L,f.ori,k,E,I,q)}return Y!=0&&(Z.band=Y==2?[Wt(n,i,l,o,G,-1),Wt(n,i,l,o,G,1)]:Wt(n,i,l,o,G,Y)),Z})}function Au(t){let e=oe(t.align,1),n=oe(t.ascDesc,!1),i=oe(t.alignGaps,0),l=oe(t.extend,!1);return(o,a,p,d)=>$i(o,a,(f,b,m,v,k,E,I,q,V,w,O)=>{[p,d]=nl(m,p,d);let S=f.pxRound,{left:J,width:P}=o.bbox,Z=se=>S(E(se,v,w,q)),G=se=>S(I(se,k,O,V)),te=v.ori==0?en:tn,W={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:Qi},$=W.stroke,Y=v.dir*(v.ori==0?1:-1),L=G(m[Y==1?p:d]),j=Z(b[Y==1?p:d]),H=j,ne=j;l&&e==-1&&(ne=J,te($,ne,L)),te($,j,L);for(let se=Y==1?p:d;se>=p&&se<=d;se+=Y){let fe=m[se];if(fe==null)continue;let Q=Z(b[se]),D=G(fe);e==1?te($,Q,L):te($,H,D),te($,Q,D),L=D,H=Q}let z=H;l&&e==1&&(z=J+P,te($,z,L));let[tt,we]=ws(o,a);if(f.fill!=null||tt!=0){let se=W.fill=new Path2D($),fe=f.fillTo(o,a,f.min,f.max,tt),Q=G(fe);te(se,z,Q),te(se,ne,Q)}if(!f.spanGaps){let se=[];se.push(...Ss(b,m,p,d,Y,Z,i));let fe=f.width*ue/2,Q=n||e==1?fe:-fe,D=n||e==-1?-fe:fe;se.forEach(Pe=>{Pe[0]+=Q,Pe[1]+=D}),W.gaps=se=f.gaps(o,a,p,d,se),W.clip=ol(se,v.ori,q,V,w,O)}return we!=0&&(W.band=we==2?[Wt(o,a,p,d,$,-1),Wt(o,a,p,d,$,1)]:Wt(o,a,p,d,$,we)),W})}function so(t,e,n,i,l,o,a=me){if(t.length>1){let p=null;for(let d=0,f=1/0;d<t.length;d++)if(e[d]!==void 0){if(p!=null){let b=De(t[d]-t[p]);b<f&&(f=b,a=De(n(t[d],i,l,o)-n(t[p],i,l,o)))}p=d}}return a}function Cu(t){t=t||En;let e=oe(t.size,[.6,me,1]),n=t.align||0,i=t.gap||0,l=t.radius;l=l==null?[0,0]:typeof l=="number"?[l,0]:l;let o=ie(l),a=1-e[0],p=oe(e[1],me),d=oe(e[2],1),f=oe(t.disp,En),b=oe(t.each,k=>{}),{fill:m,stroke:v}=f;return(k,E,I,q)=>$i(k,E,(V,w,O,S,J,P,Z,G,te,W,$)=>{let Y=V.pxRound,L=n,j=i*ue,H=p*ue,ne=d*ue,z,tt;S.ori==0?[z,tt]=o(k,E):[tt,z]=o(k,E);let we=S.dir*(S.ori==0?1:-1),se=S.ori==0?ul:$s,fe=S.ori==0?b:(M,be,Fe,Ei,ri,Lt,oi)=>{b(M,be,Fe,ri,Ei,oi,Lt)},Q=oe(k.bands,bs).find(M=>M.series[0]==E),D=Q!=null?Q.dir:0,Pe=V.fillTo(k,E,V.min,V.max,D),Ge=Y(Z(Pe,J,$,te)),Se,pe,_t,lt=W,ke=Y(V.width*ue),Ft=!1,qt=null,ft=null,Kt=null,ki=null;m!=null&&(ke==0||v!=null)&&(Ft=!0,qt=m.values(k,E,I,q),ft=new Map,new Set(qt).forEach(M=>{M!=null&&ft.set(M,new Path2D)}),ke>0&&(Kt=v.values(k,E,I,q),ki=new Map,new Set(Kt).forEach(M=>{M!=null&&ki.set(M,new Path2D)})));let{x0:Ai,size:sn}=f;if(Ai!=null&&sn!=null){L=1,w=Ai.values(k,E,I,q),Ai.unit==2&&(w=w.map(Fe=>k.posToVal(G+Fe*W,S.key,!0)));let M=sn.values(k,E,I,q);sn.unit==2?pe=M[0]*W:pe=P(M[0],S,W,G)-P(0,S,W,G),lt=so(w,O,P,S,W,G,lt),_t=lt-pe+j}else lt=so(w,O,P,S,W,G,lt),_t=lt*a+j,pe=lt-_t;_t<1&&(_t=0),ke>=pe/2&&(ke=0),_t<5&&(Y=mo);let Tn=_t>0,li=lt-_t-(Tn?ke:0);pe=Y(ss(li,ne,H)),Se=(L==0?pe/2:L==we?0:pe)-L*we*((L==0?j/2:0)+(Tn?ke/2:0));let Ke={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Ci=Ft?null:new Path2D,Ut=null;if(Q!=null)Ut=k.data[Q.series[1]];else{let{y0:M,y1:be}=f;M!=null&&be!=null&&(O=be.values(k,E,I,q),Ut=M.values(k,E,I,q))}let si=z*pe,K=tt*pe;for(let M=we==1?I:q;M>=I&&M<=q;M+=we){let be=O[M];if(be==null)continue;if(Ut!=null){let it=Ut[M]??0;if(be-it==0)continue;Ge=Z(it,J,$,te)}let Fe=S.distr!=2||f!=null?w[M]:M,Ei=P(Fe,S,W,G),ri=Z(oe(be,Pe),J,$,te),Lt=Y(Ei-Se),oi=Y(et(ri,Ge)),st=Y(Tt(ri,Ge)),ht=oi-st;if(be!=null){let it=be<0?K:si,wt=be<0?si:K;Ft?(ke>0&&Kt[M]!=null&&se(ki.get(Kt[M]),Lt,st+pt(ke/2),pe,et(0,ht-ke),it,wt),qt[M]!=null&&se(ft.get(qt[M]),Lt,st+pt(ke/2),pe,et(0,ht-ke),it,wt)):se(Ci,Lt,st+pt(ke/2),pe,et(0,ht-ke),it,wt),fe(k,E,M,Lt-ke/2,st,pe+ke,ht)}}return ke>0?Ke.stroke=Ft?ki:Ci:Ft||(Ke._fill=V.width==0?V._fill:V._stroke??V._fill,Ke.width=0),Ke.fill=Ft?ft:Ci,Ke})}function Eu(t,e){let n=oe(e?.alignGaps,0);return(i,l,o,a)=>$i(i,l,(p,d,f,b,m,v,k,E,I,q,V)=>{[o,a]=nl(f,o,a);let w=p.pxRound,O=z=>w(v(z,b,q,E)),S=z=>w(k(z,m,V,I)),J,P,Z;b.ori==0?(J=al,Z=en,P=Uo):(J=cl,Z=tn,P=Vo);let G=b.dir*(b.ori==0?1:-1),te=O(d[G==1?o:a]),W=te,$=[],Y=[];for(let z=G==1?o:a;z>=o&&z<=a;z+=G)if(f[z]!=null){let we=d[z],se=O(we);$.push(W=se),Y.push(S(f[z]))}let L={stroke:t($,Y,J,Z,P,w),fill:null,clip:null,band:null,gaps:null,flags:Qi},j=L.stroke,[H,ne]=ws(i,l);if(p.fill!=null||H!=0){let z=L.fill=new Path2D(j),tt=p.fillTo(i,l,p.min,p.max,H),we=S(tt);Z(z,W,we),Z(z,te,we)}if(!p.spanGaps){let z=[];z.push(...Ss(d,f,o,a,G,O,n)),L.gaps=z=p.gaps(i,l,o,a,z),L.clip=ol(z,b.ori,E,I,q,V)}return ne!=0&&(L.band=ne==2?[Wt(i,l,o,a,j,-1),Wt(i,l,o,a,j,1)]:Wt(i,l,o,a,j,ne)),L})}function Mu(t){return Eu(Tu,t)}function Tu(t,e,n,i,l,o){let a=t.length;if(a<2)return null;let p=new Path2D;if(n(p,t[0],e[0]),a==2)i(p,t[1],e[1]);else{let d=Array(a),f=Array(a-1),b=Array(a-1),m=Array(a-1);for(let v=0;v<a-1;v++)b[v]=e[v+1]-e[v],m[v]=t[v+1]-t[v],f[v]=b[v]/m[v];d[0]=f[0];for(let v=1;v<a-1;v++)f[v]===0||f[v-1]===0||f[v-1]>0!=f[v]>0?d[v]=0:(d[v]=3*(m[v-1]+m[v])/((2*m[v]+m[v-1])/f[v-1]+(m[v]+2*m[v-1])/f[v]),isFinite(d[v])||(d[v]=0));d[a-1]=f[a-2];for(let v=0;v<a-1;v++)l(p,t[v]+m[v]/3,e[v]+d[v]*m[v]/3,t[v+1]-m[v]/3,e[v+1]-d[v+1]*m[v]/3,t[v+1],e[v+1])}return p}var cs=new Set;function ro(){for(let t of cs)t.syncRect(!0)}Xi&&(wi(uc,Ki,ro),wi(pc,Ki,ro,!0),wi(el,Ki,()=>{qe.pxRatio=ue}));var Pu=Wo(),Fu=jo();function oo(t,e,n,i){return(i?[t[0],t[1]].concat(t.slice(2)):[t[0]].concat(t.slice(1))).map((o,a)=>us(o,a,e,n))}function Lu(t,e){return t.map((n,i)=>i==0?{}:Te({},e,n))}function us(t,e,n,i){return Te({},e==0?n:i,t)}function Go(t,e,n){return e==null?Ji:[e,n]}var Du=Go;function Ru(t,e,n){return e==null?Ji:tl(e,n,ms,!0)}function Ko(t,e,n,i){return e==null?Ji:ll(e,n,t.scales[i].log,!1)}var zu=Ko;function Yo(t,e,n,i){return e==null?Ji:hs(e,n,t.scales[i].log,!1)}var Hu=Yo;function Iu(t,e,n,i,l){let o=et(Or(t),Or(e)),a=e-t,p=Mt(l/i*a,n);do{let d=n[p],f=i*d/a;if(f>=l&&o+(d<5?ii.get(d):0)<=17)return[d,f]}while(++p<n.length);return[0,0]}function ao(t){let e,n;return t=t.replace(/(\d+)px/,(i,l)=>(e=Le((n=+l)*ue))+"px"),[t,e,n]}function Ou(t){t.show&&[t.font,t.labelFont].forEach(e=>{let n=ge(e[2]*ue,1);e[0]=e[0].replace(/[0-9.]+px/,n+"px"),e[1]=n})}function qe(t,e,n){let i={mode:oe(t.mode,1)},l=i.mode;function o(s,r,c,u){let h=r.valToPct(s);return u+c*(r.dir==-1?1-h:h)}function a(s,r,c,u){let h=r.valToPct(s);return u+c*(r.dir==-1?h:1-h)}function p(s,r,c,u){return r.ori==0?o(s,r,c,u):a(s,r,c,u)}i.valToPosH=o,i.valToPosV=a;let d=!1;i.status=0;let f=i.root=yt(Wa);if(t.id!=null&&(f.id=t.id),ut(f,t.class),t.title){let s=yt(Ya,f);s.textContent=t.title}let b=Et("canvas"),m=i.ctx=b.getContext("2d"),v=yt(Ja,f);wi("click",v,s=>{s.target===E&&(ve!=Oi||$e!=Ni)&&je.click(i,s)},!0);let k=i.under=yt(Za,v);v.appendChild(b);let E=i.over=yt(Qa,v);t=Zi(t);let I=+oe(t.pxAlign,1),q=lo(I);(t.plugins||[]).forEach(s=>{s.opts&&(t=s.opts(i,t)||t)});let V=t.ms||.001,w=i.series=l==1?oo(t.series||[],Zr,io,!1):Lu(t.series||[null],to),O=i.axes=oo(t.axes||[],Jr,Xr,!0),S=i.scales={},J=i.bands=t.bands||[];J.forEach(s=>{s.fill=ie(s.fill||null),s.dir=oe(s.dir,-1)});let P=l==2?w[1].facets[0].scale:w[0].scale,Z={axes:da,series:oa},G=(t.drawOrder||["axes","series"]).map(s=>Z[s]);function te(s){let r=s.distr==3?c=>Bt(c>0?c:s.clamp(i,c,s.min,s.max,s.key)):s.distr==4?c=>Zl(c,s.asinh):s.distr==100?c=>s.fwd(c):c=>c;return c=>{let u=r(c),{_min:h,_max:g}=s,y=g-h;return(u-h)/y}}function W(s){let r=S[s];if(r==null){let c=(t.scales||En)[s]||En;if(c.from!=null){W(c.from);let u=Te({},S[c.from],c,{key:s});u.valToPct=te(u),S[s]=u}else{r=S[s]=Te({},s==P?Ho:_u,c),r.key=s;let u=r.time,h=r.range,g=ti(h);if((s!=P||l==2&&!u)&&(g&&(h[0]==null||h[1]==null)&&(h={min:h[0]==null?zr:{mode:1,hard:h[0],soft:h[0]},max:h[1]==null?zr:{mode:1,hard:h[1],soft:h[1]}},g=!1),!g&&rl(h))){let y=h;h=(x,_,A)=>_==null?Ji:tl(_,A,y)}r.range=ie(h||(u?Du:s==P?r.distr==3?zu:r.distr==4?Hu:Go:r.distr==3?Ko:r.distr==4?Yo:Ru)),r.auto=ie(g?!1:r.auto),r.clamp=ie(r.clamp||xu),r._min=r._max=null,r.valToPct=te(r)}}}W("x"),W("y"),l==1&&w.forEach(s=>{W(s.scale)}),O.forEach(s=>{W(s.scale)});for(let s in t.scales)W(s);let $=S[P],Y=$.distr,L,j;$.ori==0?(ut(f,Ga),L=o,j=a):(ut(f,Ka),L=a,j=o);let H={};for(let s in S){let r=S[s];(r.min!=null||r.max!=null)&&(H[s]={min:r.min,max:r.max},r.min=r.max=null)}let ne=t.tzDate||(s=>new Date(Le(s/V))),z=t.fmtDate||vs,tt=V==1?Gc(ne):Jc(ne),we=Gr(ne,Wr(V==1?Wc:Yc,z)),se=Yr(ne,Kr(Qc,z)),fe=[],Q=i.legend=Te({},tu,t.legend),D=i.cursor=Te({},ou,{drag:{y:l==2}},t.cursor),Pe=Q.show,Ge=D.show,Se=Q.markers;Q.idxs=fe,Se.width=ie(Se.width),Se.dash=ie(Se.dash),Se.stroke=ie(Se.stroke),Se.fill=ie(Se.fill);let pe,_t,lt,ke=[],Ft=[],qt,ft=!1,Kt={};if(Q.live){let s=w[1]?w[1].values:null;ft=s!=null,qt=ft?s(i,1,0):{_:0};for(let r in qt)Kt[r]=ds}if(Pe)if(pe=Et("table",lc,f),lt=Et("tbody",null,pe),Q.mount(i,pe),ft){_t=Et("thead",null,pe,lt);let s=Et("tr",null,_t);Et("th",null,s);for(var ki in qt)Et("th",Sr,s).textContent=ki}else ut(pe,rc),Q.live&&ut(pe,sc);let Ai={show:!0},sn={show:!1};function Tn(s,r){if(r==0&&(ft||!Q.live||l==2))return Ji;let c=[],u=Et("tr",oc,lt,lt.childNodes[r]);ut(u,s.class),s.show||ut(u,_i);let h=Et("th",null,u);if(Se.show){let x=yt(ac,h);if(r>0){let _=Se.width(i,r);_&&(x.style.border=_+"px "+Se.dash(i,r)+" "+Se.stroke(i,r)),x.style.background=Se.fill(i,r)}}let g=yt(Sr,h);s.label instanceof HTMLElement?g.appendChild(s.label):g.textContent=s.label,r>0&&(Se.show||(g.style.color=s.width>0?Se.stroke(i,r):Se.fill(i,r)),Ke("click",h,x=>{if(D._lock)return;ci(x);let _=w.indexOf(s);if((x.ctrlKey||x.metaKey)!=Q.isolate){let A=w.some((C,T)=>T>0&&T!=_&&C.show);w.forEach((C,T)=>{T>0&&Rt(T,A?T==_?Ai:sn:Ai,!0,Me.setSeries)})}else Rt(_,{show:!s.show},!0,Me.setSeries)},!1),Ti&&Ke(Cr,h,x=>{D._lock||(ci(x),Rt(w.indexOf(s),Ui,!0,Me.setSeries))},!1));for(var y in qt){let x=Et("td",cc,u);x.textContent="--",c.push(x)}return[u,c]}let li=new Map;function Ke(s,r,c,u=!0){let h=li.get(r)||{},g=D.bind[s](i,r,c,u);g&&(wi(s,r,h[s]=g),li.set(r,h))}function Ci(s,r,c){let u=li.get(r)||{};for(let h in u)(s==null||h==s)&&(ls(h,r,u[h]),delete u[h]);s==null&&li.delete(r)}let Ut=0,si=0,K=0,M=0,be=0,Fe=0,Ei=be,ri=Fe,Lt=K,oi=M,st=0,ht=0,it=0,wt=0;i.bbox={};let pl=!1,Pn=!1,Mi=!1,ai=!1,Fn=!1,mt=!1;function dl(s,r,c){(c||s!=i.width||r!=i.height)&&ks(s,r),Ri(!1),Mi=!0,Pn=!0,zi()}function ks(s,r){i.width=Ut=K=s,i.height=si=M=r,be=Fe=0,ea(),ta();let c=i.bbox;st=c.left=yi(be*ue,.5),ht=c.top=yi(Fe*ue,.5),it=c.width=yi(K*ue,.5),wt=c.height=yi(M*ue,.5)}let Zo=3;function Qo(){let s=!1,r=0;for(;!s;){r++;let c=ua(r),u=pa(r);s=r==Zo||c&&u,s||(ks(i.width,i.height),Pn=!0)}}function Xo({width:s,height:r}){dl(s,r)}i.setSize=Xo;function ea(){let s=!1,r=!1,c=!1,u=!1;O.forEach((h,g)=>{if(h.show&&h._show){let{side:y,_size:x}=h,_=y%2,A=h.label!=null?h.labelSize:0,C=x+A;C>0&&(_?(K-=C,y==3?(be+=C,u=!0):c=!0):(M-=C,y==0?(Fe+=C,s=!0):r=!0))}}),ui[0]=s,ui[1]=c,ui[2]=r,ui[3]=u,K-=Yt[1]+Yt[3],be+=Yt[3],M-=Yt[2]+Yt[0],Fe+=Yt[0]}function ta(){let s=be+K,r=Fe+M,c=be,u=Fe;function h(g,y){switch(g){case 1:return s+=y,s-y;case 2:return r+=y,r-y;case 3:return c-=y,c+y;case 0:return u-=y,u+y}}O.forEach((g,y)=>{if(g.show&&g._show){let x=g.side;g._pos=h(x,g._size),g.label!=null&&(g._lpos=h(x,g.labelSize))}})}if(D.dataIdx==null){let s=D.hover,r=s.skip=new Set(s.skip??[]);r.add(void 0);let c=s.prox=ie(s.prox),u=s.bias??=0;D.dataIdx=(h,g,y,x)=>{if(g==0)return y;let _=y,A=c(h,g,y,x)??me,C=A>=0&&A<me,T=$.ori==0?K:M,B=D.left,ae=e[0],re=e[g];if(r.has(re[y])){_=null;let X=null,U=null,R;if(u==0||u==-1)for(R=y;X==null&&R-- >0;)r.has(re[R])||(X=R);if(u==0||u==1)for(R=y;U==null&&R++<re.length;)r.has(re[R])||(U=R);if(X!=null||U!=null)if(C){let xe=X==null?-1/0:L(ae[X],$,T,0),Ae=U==null?1/0:L(ae[U],$,T,0),Ne=B-xe,he=Ae-B;Ne<=he?Ne<=A&&(_=X):he<=A&&(_=U)}else _=U==null?X:X==null?U:y-X<=U-y?X:U}else C&&De(B-L(ae[y],$,T,0))>A&&(_=null);return _}}let ci=s=>{D.event=s};D.idxs=fe,D._lock=!1;let Be=D.points;Be.show=ie(Be.show),Be.size=ie(Be.size),Be.stroke=ie(Be.stroke),Be.width=ie(Be.width),Be.fill=ie(Be.fill);let Dt=i.focus=Te({},t.focus||{alpha:.3},D.focus),Ti=Dt.prox>=0,Pi=Ti&&Be.one,gt=[],Fi=[],Li=[];function As(s,r){let c=Be.show(i,r);if(c instanceof HTMLElement)return ut(c,nc),ut(c,s.class),Nt(c,-10,-10,K,M),E.insertBefore(c,gt[r]),c}function Cs(s,r){if(l==1||r>0){let c=l==1&&S[s.scale].time,u=s.value;s.value=c?Ur(u)?Yr(ne,Kr(u,z)):u||se:u||bu,s.label=s.label||(c?cu:au)}if(Pi||r>0){s.width=s.width==null?1:s.width,s.paths=s.paths||Pu||_c,s.fillTo=ie(s.fillTo||wu),s.pxAlign=+oe(s.pxAlign,I),s.pxRound=lo(s.pxAlign),s.stroke=ie(s.stroke||null),s.fill=ie(s.fill||null),s._stroke=s._fill=s._paths=s._focus=null;let c=vu(et(1,s.width),1),u=s.points=Te({},{size:c,width:et(1,c*.2),stroke:s.stroke,space:c*2,paths:Fu,_stroke:null,_fill:null},s.points);u.show=ie(u.show),u.filter=ie(u.filter),u.fill=ie(u.fill),u.stroke=ie(u.stroke),u.paths=ie(u.paths),u.pxAlign=s.pxAlign}if(Pe){let c=Tn(s,r);ke.splice(r,0,c[0]),Ft.splice(r,0,c[1]),Q.values.push(null)}if(Ge){fe.splice(r,0,null);let c=null;Pi?r==0&&(c=As(s,r)):r>0&&(c=As(s,r)),gt.splice(r,0,c),Fi.splice(r,0,0),Li.splice(r,0,0)}Oe("addSeries",r)}function ia(s,r){r=r??w.length,s=l==1?us(s,r,Zr,io):us(s,r,{},to),w.splice(r,0,s),Cs(w[r],r)}i.addSeries=ia;function na(s){if(w.splice(s,1),Pe){Q.values.splice(s,1),Ft.splice(s,1);let r=ke.splice(s,1)[0];Ci(null,r.firstChild),r.remove()}Ge&&(fe.splice(s,1),gt.splice(s,1)[0].remove(),Fi.splice(s,1),Li.splice(s,1)),Oe("delSeries",s)}i.delSeries=na;let ui=[!1,!1,!1,!1];function la(s,r){if(s._show=s.show,s.show){let c=s.side%2,u=S[s.scale];u==null&&(s.scale=c?w[1].scale:P,u=S[s.scale]);let h=u.time;s.size=ie(s.size),s.space=ie(s.space),s.rotate=ie(s.rotate),ti(s.incrs)&&s.incrs.forEach(y=>{!ii.has(y)&&ii.set(y,vo(y))}),s.incrs=ie(s.incrs||(u.distr==2?Vc:h?V==1?Bc:Kc:xi)),s.splits=ie(s.splits||(h&&u.distr==1?tt:u.distr==3?rs:u.distr==4?du:pu)),s.stroke=ie(s.stroke),s.grid.stroke=ie(s.grid.stroke),s.ticks.stroke=ie(s.ticks.stroke),s.border.stroke=ie(s.border.stroke);let g=s.values;s.values=ti(g)&&!ti(g[0])?ie(g):h?ti(g)?Gr(ne,Wr(g,z)):Ur(g)?Zc(ne,g):g||we:g||uu,s.filter=ie(s.filter||(u.distr>=3&&u.log==10?mu:u.distr==3&&u.log==2?gu:go)),s.font=ao(s.font),s.labelFont=ao(s.labelFont),s._size=s.size(i,null,r,0),s._space=s._rotate=s._incrs=s._found=s._splits=s._values=null,s._size>0&&(ui[r]=!0,s._el=yt(Xa,v))}}function rn(s,r,c,u){let[h,g,y,x]=c,_=r%2,A=0;return _==0&&(x||g)&&(A=r==0&&!h||r==2&&!y?Le(Jr.size/3):0),_==1&&(h||y)&&(A=r==1&&!g||r==3&&!x?Le(Xr.size/2):0),A}let Es=i.padding=(t.padding||[rn,rn,rn,rn]).map(s=>ie(oe(s,rn))),Yt=i._padding=Es.map((s,r)=>s(i,r,ui,0)),Ve,Re=null,ze=null,Ln=l==1?w[0].idxs:null,St=null,on=!1;function Ms(s,r){if(e=s??[],i.data=i._data=e,l==2){Ve=0;for(let c=1;c<w.length;c++)Ve+=e[c][0].length}else{e.length==0&&(i.data=i._data=e=[[]]),St=e[0],Ve=St.length;let c=e;if(Y==2){c=e.slice();let u=c[0]=Array(Ve);for(let h=0;h<Ve;h++)u[h]=h}i._data=e=c}if(Ri(!0),Oe("setData"),Y==2&&(Mi=!0),r!==!1){let c=$;c.auto(i,on)?fl():Zt(P,c.min,c.max),ai=ai||D.left>=0,mt=!0,zi()}}i.setData=Ms;function fl(){on=!0;let s,r;l==1&&(Ve>0?(Re=Ln[0]=0,ze=Ln[1]=Ve-1,s=e[0][Re],r=e[0][ze],Y==2?(s=Re,r=ze):s==r&&(Y==3?[s,r]=ll(s,s,$.log,!1):Y==4?[s,r]=hs(s,s,$.log,!1):$.time?r=s+Le(86400/V):[s,r]=tl(s,r,ms,!0))):(Re=Ln[0]=s=null,ze=Ln[1]=r=null)),Zt(P,s,r)}let Dn,Di,hl,ml,gl,bl,vl,yl,xl,nt;function Ts(s,r,c,u,h,g){s??=kr,c??=bs,u??="butt",h??=kr,g??="round",s!=Dn&&(m.strokeStyle=Dn=s),h!=Di&&(m.fillStyle=Di=h),r!=hl&&(m.lineWidth=hl=r),g!=gl&&(m.lineJoin=gl=g),u!=bl&&(m.lineCap=bl=u),c!=ml&&m.setLineDash(ml=c)}function Ps(s,r,c,u){r!=Di&&(m.fillStyle=Di=r),s!=vl&&(m.font=vl=s),c!=yl&&(m.textAlign=yl=c),u!=xl&&(m.textBaseline=xl=u)}function _l(s,r,c,u,h=0){if(u.length>0&&s.auto(i,on)&&(r==null||r.min==null)){let g=oe(Re,0),y=oe(ze,u.length-1),x=c.min==null?mc(u,g,y,h,s.distr==3):[c.min,c.max];s.min=Tt(s.min,c.min=x[0]),s.max=et(s.max,c.max=x[1])}}let Fs={min:null,max:null};function sa(){for(let u in S){let h=S[u];H[u]==null&&(h.min==null||H[P]!=null&&h.auto(i,on))&&(H[u]=Fs)}for(let u in S){let h=S[u];H[u]==null&&h.from!=null&&H[h.from]!=null&&(H[u]=Fs)}H[P]!=null&&Ri(!0);let s={};for(let u in H){let h=H[u];if(h!=null){let g=s[u]=Zi(S[u],$c);if(h.min!=null)Te(g,h);else if(u!=P||l==2)if(Ve==0&&g.from==null){let y=g.range(i,null,null,u);g.min=y[0],g.max=y[1]}else g.min=me,g.max=-me}}if(Ve>0){w.forEach((u,h)=>{if(l==1){let g=u.scale,y=H[g];if(y==null)return;let x=s[g];if(h==0){let _=x.range(i,x.min,x.max,g);x.min=_[0],x.max=_[1],Re=Mt(x.min,e[0]),ze=Mt(x.max,e[0]),ze-Re>1&&(e[0][Re]<x.min&&Re++,e[0][ze]>x.max&&ze--),u.min=St[Re],u.max=St[ze]}else u.show&&u.auto&&_l(x,y,u,e[h],u.sorted);u.idxs[0]=Re,u.idxs[1]=ze}else if(h>0&&u.show&&u.auto){let[g,y]=u.facets,x=g.scale,_=y.scale,[A,C]=e[h],T=s[x],B=s[_];T!=null&&_l(T,H[x],g,A,g.sorted),B!=null&&_l(B,H[_],y,C,y.sorted),u.min=y.min,u.max=y.max}});for(let u in s){let h=s[u],g=H[u];if(h.from==null&&(g==null||g.min==null)){let y=h.range(i,h.min==me?null:h.min,h.max==-me?null:h.max,u);h.min=y[0],h.max=y[1]}}}for(let u in s){let h=s[u];if(h.from!=null){let g=s[h.from];if(g.min==null)h.min=h.max=null;else{let y=h.range(i,g.min,g.max,u);h.min=y[0],h.max=y[1]}}}let r={},c=!1;for(let u in s){let h=s[u],g=S[u];if(g.min!=h.min||g.max!=h.max){g.min=h.min,g.max=h.max;let y=g.distr;g._min=y==3?Bt(g.min):y==4?Zl(g.min,g.asinh):y==100?g.fwd(g.min):g.min,g._max=y==3?Bt(g.max):y==4?Zl(g.max,g.asinh):y==100?g.fwd(g.max):g.max,r[u]=c=!0}}if(c){w.forEach((u,h)=>{l==2?h>0&&r.y&&(u._paths=null):r[u.scale]&&(u._paths=null)});for(let u in r)Mi=!0,Oe("setScale",u);Ge&&D.left>=0&&(ai=mt=!0)}for(let u in H)H[u]=null}function ra(s){let r=ss(Re-1,0,Ve-1),c=ss(ze+1,0,Ve-1);for(;s[r]==null&&r>0;)r--;for(;s[c]==null&&c<Ve-1;)c++;return[r,c]}function oa(){if(Ve>0){let s=w.some(r=>r._focus)&&nt!=Dt.alpha;s&&(m.globalAlpha=nt=Dt.alpha),w.forEach((r,c)=>{if(c>0&&r.show&&(Ls(c,!1),Ls(c,!0),r._paths==null)){let u=nt;nt!=r.alpha&&(m.globalAlpha=nt=r.alpha);let h=l==2?[0,e[c][0].length-1]:ra(e[c]);r._paths=r.paths(i,c,h[0],h[1]),nt!=u&&(m.globalAlpha=nt=u)}}),w.forEach((r,c)=>{if(c>0&&r.show){let u=nt;nt!=r.alpha&&(m.globalAlpha=nt=r.alpha),r._paths!=null&&Ds(c,!1);{let h=r._paths!=null?r._paths.gaps:null,g=r.points.show(i,c,Re,ze,h),y=r.points.filter(i,c,g,h);(g||y)&&(r.points._paths=r.points.paths(i,c,Re,ze,y),Ds(c,!0))}nt!=u&&(m.globalAlpha=nt=u),Oe("drawSeries",c)}}),s&&(m.globalAlpha=nt=1)}}function Ls(s,r){let c=r?w[s].points:w[s];c._stroke=c.stroke(i,s),c._fill=c.fill(i,s)}function Ds(s,r){let c=r?w[s].points:w[s],{stroke:u,fill:h,clip:g,flags:y,_stroke:x=c._stroke,_fill:_=c._fill,_width:A=c.width}=c._paths;A=ge(A*ue,3);let C=null,T=A%2/2;r&&_==null&&(_=A>0?"#fff":x);let B=c.pxAlign==1&&T>0;if(B&&m.translate(T,T),!r){let ae=st-A/2,re=ht-A/2,X=it+A,U=wt+A;C=new Path2D,C.rect(ae,re,X,U)}r?wl(x,A,c.dash,c.cap,_,u,h,y,g):aa(s,x,A,c.dash,c.cap,_,u,h,y,C,g),B&&m.translate(-T,-T)}function aa(s,r,c,u,h,g,y,x,_,A,C){let T=!1;_!=0&&J.forEach((B,ae)=>{if(B.series[0]==s){let re=w[B.series[1]],X=e[B.series[1]],U=(re._paths||En).band;ti(U)&&(U=B.dir==1?U[0]:U[1]);let R,xe=null;re.show&&U&&bc(X,Re,ze)?(xe=B.fill(i,ae)||g,R=re._paths.clip):U=null,wl(r,c,u,h,xe,y,x,_,A,C,R,U),T=!0}}),T||wl(r,c,u,h,g,y,x,_,A,C)}let Rs=Qi|as;function wl(s,r,c,u,h,g,y,x,_,A,C,T){Ts(s,r,c,u,h),(_||A||T)&&(m.save(),_&&m.clip(_),A&&m.clip(A)),T?(x&Rs)==Rs?(m.clip(T),C&&m.clip(C),zn(h,y),Rn(s,g,r)):x&as?(zn(h,y),m.clip(T),Rn(s,g,r)):x&Qi&&(m.save(),m.clip(T),C&&m.clip(C),zn(h,y),m.restore(),Rn(s,g,r)):(zn(h,y),Rn(s,g,r)),(_||A||T)&&m.restore()}function Rn(s,r,c){c>0&&(r instanceof Map?r.forEach((u,h)=>{m.strokeStyle=Dn=h,m.stroke(u)}):r!=null&&s&&m.stroke(r))}function zn(s,r){r instanceof Map?r.forEach((c,u)=>{m.fillStyle=Di=u,m.fill(c)}):r!=null&&s&&m.fill(r)}function ca(s,r,c,u){let h=O[s],g;if(u<=0)g=[0,0];else{let y=h._space=h.space(i,s,r,c,u),x=h._incrs=h.incrs(i,s,r,c,u,y);g=Iu(r,c,x,u,y)}return h._found=g}function Sl(s,r,c,u,h,g,y,x,_,A){let C=y%2/2;I==1&&m.translate(C,C),Ts(x,y,_,A,x),m.beginPath();let T,B,ae,re,X=h+(u==0||u==3?-g:g);c==0?(B=h,re=X):(T=h,ae=X);for(let U=0;U<s.length;U++)r[U]!=null&&(c==0?T=ae=s[U]:B=re=s[U],m.moveTo(T,B),m.lineTo(ae,re));m.stroke(),I==1&&m.translate(-C,-C)}function ua(s){let r=!0;return O.forEach((c,u)=>{if(!c.show)return;let h=S[c.scale];if(h.min==null){c._show&&(r=!1,c._show=!1,Ri(!1));return}else c._show||(r=!1,c._show=!0,Ri(!1));let g=c.side,y=g%2,{min:x,max:_}=h,[A,C]=ca(u,x,_,y==0?K:M);if(C==0)return;let T=h.distr==2,B=c._splits=c.splits(i,u,x,_,A,C,T),ae=h.distr==2?B.map(R=>St[R]):B,re=h.distr==2?St[B[1]]-St[B[0]]:A,X=c._values=c.values(i,c.filter(i,ae,u,C,re),u,C,re);c._rotate=g==2?c.rotate(i,X,u,C):0;let U=c._size;c._size=xt(c.size(i,X,u,s)),U!=null&&c._size!=U&&(r=!1)}),r}function pa(s){let r=!0;return Es.forEach((c,u)=>{let h=c(i,u,ui,s);h!=Yt[u]&&(r=!1),Yt[u]=h}),r}function da(){for(let s=0;s<O.length;s++){let r=O[s];if(!r.show||!r._show)continue;let c=r.side,u=c%2,h,g,y=r.stroke(i,s),x=c==0||c==3?-1:1,[_,A]=r._found;if(r.label!=null){let Je=r.labelGap*x,at=Le((r._lpos+Je)*ue);Ps(r.labelFont[0],y,"center",c==2?"top":$r),m.save(),u==1?(h=g=0,m.translate(at,Le(ht+wt/2)),m.rotate((c==3?-Xn:Xn)/2)):(h=Le(st+it/2),g=at);let fi=ho(r.label)?r.label(i,s,_,A):r.label;m.fillText(fi,h,g),m.restore()}if(A==0)continue;let C=S[r.scale],T=u==0?it:wt,B=u==0?st:ht,ae=r._splits,re=C.distr==2?ae.map(Je=>St[Je]):ae,X=C.distr==2?St[ae[1]]-St[ae[0]]:_,U=r.ticks,R=r.border,xe=U.show?U.size:0,Ae=Le(xe*ue),Ne=Le((r.alignTo==2?r._size-xe-r.gap:r.gap)*ue),he=r._rotate*-Xn/180,Ce=q(r._pos*ue),rt=(Ae+Ne)*x,Ye=Ce+rt;g=u==0?Ye:0,h=u==1?Ye:0;let bt=r.font[0],$t=r.align==1?Wi:r.align==2?Kl:he>0?Wi:he<0?Kl:u==0?"center":c==3?Kl:Wi,Ht=he||u==1?"middle":c==2?"top":$r;Ps(bt,y,$t,Ht);let ot=r.font[1]*r.lineGap,vt=ae.map(Je=>q(p(Je,C,T,B))),kt=r._values;for(let Je=0;Je<kt.length;Je++){let at=kt[Je];if(at!=null){u==0?h=vt[Je]:g=vt[Je],at=""+at;let fi=at.indexOf(`
`)==-1?[at]:at.split(/\n/gm);for(let Ze=0;Ze<fi.length;Ze++){let er=fi[Ze];he?(m.save(),m.translate(h,g+Ze*ot),m.rotate(he),m.fillText(er,0,0),m.restore()):m.fillText(er,h,g+Ze*ot)}}}U.show&&Sl(vt,U.filter(i,re,s,A,X),u,c,Ce,Ae,ge(U.width*ue,3),U.stroke(i,s),U.dash,U.cap);let It=r.grid;It.show&&Sl(vt,It.filter(i,re,s,A,X),u,u==0?2:1,u==0?ht:st,u==0?wt:it,ge(It.width*ue,3),It.stroke(i,s),It.dash,It.cap),R.show&&Sl([Ce],[1],u==0?1:0,u==0?1:2,u==1?ht:st,u==1?wt:it,ge(R.width*ue,3),R.stroke(i,s),R.dash,R.cap)}Oe("drawAxes")}function Ri(s){w.forEach((r,c)=>{c>0&&(r._paths=null,s&&(l==1?(r.min=null,r.max=null):r.facets.forEach(u=>{u.min=null,u.max=null})))})}let Hn=!1,$l=!1,an=[];function fa(){$l=!1;for(let s=0;s<an.length;s++)Oe(...an[s]);an.length=0}function zi(){Hn||(Pc(zs),Hn=!0)}function ha(s,r=!1){Hn=!0,$l=r,s(i),zs(),r&&an.length>0&&queueMicrotask(fa)}i.batch=ha;function zs(){if(pl&&(sa(),pl=!1),Mi&&(Qo(),Mi=!1),Pn){if(_e(k,Wi,be),_e(k,"top",Fe),_e(k,$n,K),_e(k,kn,M),_e(E,Wi,be),_e(E,"top",Fe),_e(E,$n,K),_e(E,kn,M),_e(v,$n,Ut),_e(v,kn,si),b.width=Le(Ut*ue),b.height=Le(si*ue),O.forEach(({_el:s,_show:r,_size:c,_pos:u,side:h})=>{if(s!=null)if(r){let g=h===3||h===0?c:0,y=h%2==1;_e(s,y?"left":"top",u-g),_e(s,y?"width":"height",c),_e(s,y?"top":"left",y?Fe:be),_e(s,y?"height":"width",y?M:K),ns(s,_i)}else ut(s,_i)}),Dn=Di=hl=gl=bl=vl=yl=xl=ml=null,nt=1,pn(!0),be!=Ei||Fe!=ri||K!=Lt||M!=oi){Ri(!1);let s=K/Lt,r=M/oi;if(Ge&&!ai&&D.left>=0){D.left*=s,D.top*=r,Hi&&Nt(Hi,Le(D.left),0,K,M),Ii&&Nt(Ii,0,Le(D.top),K,M);for(let c=0;c<gt.length;c++){let u=gt[c];u!=null&&(Fi[c]*=s,Li[c]*=r,Nt(u,xt(Fi[c]),xt(Li[c]),K,M))}}if(ye.show&&!Fn&&ye.left>=0&&ye.width>0){ye.left*=s,ye.width*=s,ye.top*=r,ye.height*=r;for(let c in Tl)_e(qi,c,ye[c])}Ei=be,ri=Fe,Lt=K,oi=M}Oe("setSize"),Pn=!1}Ut>0&&si>0&&(m.clearRect(0,0,b.width,b.height),Oe("drawClear"),G.forEach(s=>s()),Oe("draw")),ye.show&&Fn&&(In(ye),Fn=!1),Ge&&ai&&(di(null,!0,!1),ai=!1),Q.show&&Q.live&&mt&&(El(),mt=!1),d||(d=!0,i.status=1,Oe("ready")),on=!1,Hn=!1}i.redraw=(s,r)=>{Mi=r||!1,s!==!1?Zt(P,$.min,$.max):zi()};function kl(s,r){let c=S[s];if(c.from==null){if(Ve==0){let u=c.range(i,r.min,r.max,s);r.min=u[0],r.max=u[1]}if(r.min>r.max){let u=r.min;r.min=r.max,r.max=u}if(Ve>1&&r.min!=null&&r.max!=null&&r.max-r.min<1e-16)return;s==P&&c.distr==2&&Ve>0&&(r.min=Mt(r.min,e[0]),r.max=Mt(r.max,e[0]),r.min==r.max&&r.max++),H[s]=r,pl=!0,zi()}}i.setScale=kl;let Al,Cl,Hi,Ii,Hs,Is,Oi,Ni,Os,Ns,ve,$e,Jt=!1,je=D.drag,He=je.x,Ie=je.y;Ge&&(D.x&&(Al=yt(tc,E)),D.y&&(Cl=yt(ic,E)),$.ori==0?(Hi=Al,Ii=Cl):(Hi=Cl,Ii=Al),ve=D.left,$e=D.top);let ye=i.select=Te({show:!0,over:!0,left:0,width:0,top:0,height:0},t.select),qi=ye.show?yt(ec,ye.over?E:k):null;function In(s,r){if(ye.show){for(let c in s)ye[c]=s[c],c in Tl&&_e(qi,c,s[c]);r!==!1&&Oe("setSelect")}}i.setSelect=In;function ma(s){if(w[s].show)Pe&&ns(ke[s],_i);else if(Pe&&ut(ke[s],_i),Ge){let c=Pi?gt[0]:gt[s];c!=null&&Nt(c,-10,-10,K,M)}}function Zt(s,r,c){kl(s,{min:r,max:c})}function Rt(s,r,c,u){r.focus!=null&&xa(s),r.show!=null&&w.forEach((h,g)=>{g>0&&(s==g||s==null)&&(h.show=r.show,ma(g),l==2?(Zt(h.facets[0].scale,null,null),Zt(h.facets[1].scale,null,null)):Zt(h.scale,null,null),zi())}),c!==!1&&Oe("setSeries",s,r),u&&dn("setSeries",i,s,r)}i.setSeries=Rt;function ga(s,r){Te(J[s],r)}function ba(s,r){s.fill=ie(s.fill||null),s.dir=oe(s.dir,-1),r=r??J.length,J.splice(r,0,s)}function va(s){s==null?J.length=0:J.splice(s,1)}i.addBand=ba,i.setBand=ga,i.delBand=va;function ya(s,r){w[s].alpha=r,Ge&&gt[s]!=null&&(gt[s].style.opacity=r),Pe&&ke[s]&&(ke[s].style.opacity=r)}let Vt,Qt,pi,Ui={focus:!0};function xa(s){if(s!=pi){let r=s==null,c=Dt.alpha!=1;w.forEach((u,h)=>{if(l==1||h>0){let g=r||h==0||h==s;u._focus=r?null:g,c&&ya(h,g?1:Dt.alpha)}}),pi=s,c&&zi()}}Pe&&Ti&&Ke(Er,pe,s=>{D._lock||(ci(s),pi!=null&&Rt(null,Ui,!0,Me.setSeries))});function zt(s,r,c){let u=S[r];c&&(s=s/ue-(u.ori==1?Fe:be));let h=K;u.ori==1&&(h=M,s=h-s),u.dir==-1&&(s=h-s);let g=u._min,y=u._max,x=s/h,_=g+(y-g)*x,A=u.distr;return A==3?Yi(10,_):A==4?yc(_,u.asinh):A==100?u.bwd(_):_}function _a(s,r){let c=zt(s,P,r);return Mt(c,e[0],Re,ze)}i.valToIdx=s=>Mt(s,e[0]),i.posToIdx=_a,i.posToVal=zt,i.valToPos=(s,r,c)=>S[r].ori==0?o(s,S[r],c?it:K,c?st:0):a(s,S[r],c?wt:M,c?ht:0),i.setCursor=(s,r,c)=>{ve=s.left,$e=s.top,di(null,r,c)};function qs(s,r){_e(qi,Wi,ye.left=s),_e(qi,$n,ye.width=r)}function Us(s,r){_e(qi,"top",ye.top=s),_e(qi,kn,ye.height=r)}let cn=$.ori==0?qs:Us,un=$.ori==1?qs:Us;function wa(){if(Pe&&Q.live)for(let s=l==2?1:0;s<w.length;s++){if(s==0&&ft)continue;let r=Q.values[s],c=0;for(let u in r)Ft[s][c++].firstChild.nodeValue=r[u]}}function El(s,r){if(s!=null&&(s.idxs?s.idxs.forEach((c,u)=>{fe[u]=c}):Sc(s.idx)||fe.fill(s.idx),Q.idx=fe[0]),Pe&&Q.live){for(let c=0;c<w.length;c++)(c>0||l==1&&!ft)&&Sa(c,fe[c]);wa()}mt=!1,r!==!1&&Oe("setLegend")}i.setLegend=El;function Sa(s,r){let c=w[s],u=s==0&&Y==2?St:e[s],h;ft?h=c.values(i,s,r)??Kt:(h=c.value(i,r==null?null:u[r],s,r),h=h==null?Kt:{_:h}),Q.values[s]=h}function di(s,r,c){Os=ve,Ns=$e,[ve,$e]=D.move(i,ve,$e),D.left=ve,D.top=$e,Ge&&(Hi&&Nt(Hi,Le(ve),0,K,M),Ii&&Nt(Ii,0,Le($e),K,M));let u,h=Re>ze;Vt=me,Qt=null;let g=$.ori==0?K:M,y=$.ori==1?K:M;if(ve<0||Ve==0||h){u=D.idx=null;for(let x=0;x<w.length;x++){let _=gt[x];_!=null&&Nt(_,-10,-10,K,M)}Ti&&Rt(null,Ui,!0,s==null&&Me.setSeries),Q.live&&(fe.fill(u),mt=!0)}else{let x,_,A;l==1&&(x=$.ori==0?ve:$e,_=zt(x,P),u=D.idx=Mt(_,e[0],Re,ze),A=L(e[0][u],$,g,0));let C=-10,T=-10,B=0,ae=0,re=!0,X="",U="";for(let R=l==2?1:0;R<w.length;R++){let xe=w[R],Ae=fe[R],Ne=Ae==null?null:l==1?e[R][Ae]:e[R][1][Ae],he=D.dataIdx(i,R,u,_),Ce=he==null?null:l==1?e[R][he]:e[R][1][he];if(mt=mt||Ce!=Ne||he!=Ae,fe[R]=he,R>0&&xe.show){let rt=he==null?-10:he==u?A:L(l==1?e[0][he]:e[R][0][he],$,g,0),Ye=Ce==null?-10:j(Ce,l==1?S[xe.scale]:S[xe.facets[1].scale],y,0);if(Ti&&Ce!=null){let bt=$.ori==1?ve:$e,$t=De(Dt.dist(i,R,he,Ye,bt));if($t<Vt){let Ht=Dt.bias;if(Ht!=0){let ot=zt(bt,xe.scale),vt=Ce>=0?1:-1,kt=ot>=0?1:-1;kt==vt&&(kt==1?Ht==1?Ce>=ot:Ce<=ot:Ht==1?Ce<=ot:Ce>=ot)&&(Vt=$t,Qt=R)}else Vt=$t,Qt=R}}if(mt||Pi){let bt,$t;$.ori==0?(bt=rt,$t=Ye):(bt=Ye,$t=rt);let Ht,ot,vt,kt,It,Je,at=!0,fi=Be.bbox;if(fi!=null){at=!1;let Ze=fi(i,R);vt=Ze.left,kt=Ze.top,Ht=Ze.width,ot=Ze.height}else vt=bt,kt=$t,Ht=ot=Be.size(i,R);if(Je=Be.fill(i,R),It=Be.stroke(i,R),Pi)R==Qt&&Vt<=Dt.prox&&(C=vt,T=kt,B=Ht,ae=ot,re=at,X=Je,U=It);else{let Ze=gt[R];Ze!=null&&(Fi[R]=vt,Li[R]=kt,Rr(Ze,Ht,ot,at),Lr(Ze,Je,It),Nt(Ze,xt(vt),xt(kt),K,M))}}}}if(Pi){let R=Dt.prox,xe=pi==null?Vt<=R:Vt>R||Qt!=pi;if(mt||xe){let Ae=gt[0];Ae!=null&&(Fi[0]=C,Li[0]=T,Rr(Ae,B,ae,re),Lr(Ae,X,U),Nt(Ae,xt(C),xt(T),K,M))}}}if(ye.show&&Jt)if(s!=null){let[x,_]=Me.scales,[A,C]=Me.match,[T,B]=s.cursor.sync.scales,ae=s.cursor.drag;if(He=ae._x,Ie=ae._y,He||Ie){let{left:re,top:X,width:U,height:R}=s.select,xe=s.scales[T].ori,Ae=s.posToVal,Ne,he,Ce,rt,Ye,bt=x!=null&&A(x,T),$t=_!=null&&C(_,B);bt&&He?(xe==0?(Ne=re,he=U):(Ne=X,he=R),Ce=S[x],rt=L(Ae(Ne,T),Ce,g,0),Ye=L(Ae(Ne+he,T),Ce,g,0),cn(Tt(rt,Ye),De(Ye-rt))):cn(0,g),$t&&Ie?(xe==1?(Ne=re,he=U):(Ne=X,he=R),Ce=S[_],rt=j(Ae(Ne,B),Ce,y,0),Ye=j(Ae(Ne+he,B),Ce,y,0),un(Tt(rt,Ye),De(Ye-rt))):un(0,y)}else Pl()}else{let x=De(Os-Hs),_=De(Ns-Is);if($.ori==1){let B=x;x=_,_=B}He=je.x&&x>=je.dist,Ie=je.y&&_>=je.dist;let A=je.uni;A!=null?He&&Ie&&(He=x>=A,Ie=_>=A,!He&&!Ie&&(_>x?Ie=!0:He=!0)):je.x&&je.y&&(He||Ie)&&(He=Ie=!0);let C,T;He&&($.ori==0?(C=Oi,T=ve):(C=Ni,T=$e),cn(Tt(C,T),De(T-C)),Ie||un(0,y)),Ie&&($.ori==1?(C=Oi,T=ve):(C=Ni,T=$e),un(Tt(C,T),De(T-C)),He||cn(0,g)),!He&&!Ie&&(cn(0,0),un(0,0))}if(je._x=He,je._y=Ie,s==null){if(c){if(Xs!=null){let[x,_]=Me.scales;Me.values[0]=x!=null?zt($.ori==0?ve:$e,x):null,Me.values[1]=_!=null?zt($.ori==1?ve:$e,_):null}dn(Yl,i,ve,$e,K,M,u)}if(Ti){let x=c&&Me.setSeries,_=Dt.prox;pi==null?Vt<=_&&Rt(Qt,Ui,!0,x):Vt>_?Rt(null,Ui,!0,x):Qt!=pi&&Rt(Qt,Ui,!0,x)}}mt&&(Q.idx=u,El()),r!==!1&&Oe("setCursor")}let Xt=null;Object.defineProperty(i,"rect",{get(){return Xt==null&&pn(!1),Xt}});function pn(s=!1){s?Xt=null:(Xt=E.getBoundingClientRect(),Oe("syncRect",Xt))}function Vs(s,r,c,u,h,g,y){D._lock||Jt&&s!=null&&s.movementX==0&&s.movementY==0||(Ml(s,r,c,u,h,g,y,!1,s!=null),s!=null?di(null,!0,!0):di(r,!0,!1))}function Ml(s,r,c,u,h,g,y,x,_){if(Xt==null&&pn(!1),ci(s),s!=null)c=s.clientX-Xt.left,u=s.clientY-Xt.top;else{if(c<0||u<0){ve=-10,$e=-10;return}let[A,C]=Me.scales,T=r.cursor.sync,[B,ae]=T.values,[re,X]=T.scales,[U,R]=Me.match,xe=r.axes[0].side%2==1,Ae=$.ori==0?K:M,Ne=$.ori==1?K:M,he=xe?g:h,Ce=xe?h:g,rt=xe?u:c,Ye=xe?c:u;if(re!=null?c=U(A,re)?p(B,S[A],Ae,0):-10:c=Ae*(rt/he),X!=null?u=R(C,X)?p(ae,S[C],Ne,0):-10:u=Ne*(Ye/Ce),$.ori==1){let bt=c;c=u,u=bt}}_&&(r==null||r.cursor.event.type==Yl)&&((c<=1||c>=K-1)&&(c=yi(c,K)),(u<=1||u>=M-1)&&(u=yi(u,M))),x?(Hs=c,Is=u,[Oi,Ni]=D.move(i,c,u)):(ve=c,$e=u)}let Tl={width:0,height:0,left:0,top:0};function Pl(){In(Tl,!1)}let js,Bs,Ws,Gs;function Ks(s,r,c,u,h,g,y){Jt=!0,He=Ie=je._x=je._y=!1,Ml(s,r,c,u,h,g,y,!0,!1),s!=null&&(Ke(Jl,ts,Ys,!1),dn(Ar,i,Oi,Ni,K,M,null));let{left:x,top:_,width:A,height:C}=ye;js=x,Bs=_,Ws=A,Gs=C}function Ys(s,r,c,u,h,g,y){Jt=je._x=je._y=!1,Ml(s,r,c,u,h,g,y,!1,!0);let{left:x,top:_,width:A,height:C}=ye,T=A>0||C>0,B=js!=x||Bs!=_||Ws!=A||Gs!=C;if(T&&B&&In(ye),je.setScale&&T&&B){let ae=x,re=A,X=_,U=C;if($.ori==1&&(ae=_,re=C,X=x,U=A),He&&Zt(P,zt(ae,P),zt(ae+re,P)),Ie)for(let R in S){let xe=S[R];R!=P&&xe.from==null&&xe.min!=me&&Zt(R,zt(X+U,R),zt(X,R))}Pl()}else D.lock&&(D._lock=!D._lock,di(r,!0,s!=null));s!=null&&(Ci(Jl,ts),dn(Jl,i,ve,$e,K,M,null))}function $a(s,r,c,u,h,g,y){if(D._lock)return;ci(s);let x=Jt;if(Jt){let _=!0,A=!0,C=10,T,B;$.ori==0?(T=He,B=Ie):(T=Ie,B=He),T&&B&&(_=ve<=C||ve>=K-C,A=$e<=C||$e>=M-C),T&&_&&(ve=ve<Oi?0:K),B&&A&&($e=$e<Ni?0:M),di(null,!0,!0),Jt=!1}ve=-10,$e=-10,fe.fill(null),di(null,!0,!0),x&&(Jt=x)}function Js(s,r,c,u,h,g,y){D._lock||(ci(s),fl(),Pl(),s!=null&&dn(Mr,i,ve,$e,K,M,null))}function Zs(){O.forEach(Ou),dl(i.width,i.height,!0)}wi(el,Ki,Zs);let Vi={};Vi.mousedown=Ks,Vi.mousemove=Vs,Vi.mouseup=Ys,Vi.dblclick=Js,Vi.setSeries=(s,r,c,u)=>{let h=Me.match[2];c=h(i,r,c),c!=-1&&Rt(c,u,!0,!1)},Ge&&(Ke(Ar,E,Ks),Ke(Yl,E,Vs),Ke(Cr,E,s=>{ci(s),pn(!1)}),Ke(Er,E,$a),Ke(Mr,E,Js),cs.add(i),i.syncRect=pn);let On=i.hooks=t.hooks||{};function Oe(s,r,c){$l?an.push([s,r,c]):s in On&&On[s].forEach(u=>{u.call(null,i,r,c)})}(t.plugins||[]).forEach(s=>{for(let r in s.hooks)On[r]=(On[r]||[]).concat(s.hooks[r])});let Qs=(s,r,c)=>c,Me=Te({key:null,setSeries:!1,filters:{pub:Nr,sub:Nr},scales:[P,w[1]?w[1].scale:null],match:[qr,qr,Qs],values:[null,null]},D.sync);Me.match.length==2&&Me.match.push(Qs),D.sync=Me;let Xs=Me.key,Fl=Io(Xs);function dn(s,r,c,u,h,g,y){Me.filters.pub(s,r,c,u,h,g,y)&&Fl.pub(s,r,c,u,h,g,y)}Fl.sub(i);function ka(s,r,c,u,h,g,y){Me.filters.sub(s,r,c,u,h,g,y)&&Vi[s](null,r,c,u,h,g,y)}i.pub=ka;function Aa(){Fl.unsub(i),cs.delete(i),li.clear(),ls(el,Ki,Zs),f.remove(),pe?.remove(),Oe("destroy")}i.destroy=Aa;function Ll(){Oe("init",t,e),Ms(e||t.data,!1),H[P]?kl(P,H[P]):fl(),Fn=ye.show&&(ye.width>0||ye.height>0),ai=mt=!0,dl(t.width,t.height)}return w.forEach(Cs),O.forEach(la),n?n instanceof HTMLElement?(n.appendChild(f),Ll()):n(i,Ll):Ll(),i}qe.assign=Te;qe.fmtNum=gs;qe.rangeNum=tl;qe.rangeLog=ll;qe.rangeAsinh=hs;qe.orient=$i;qe.pxRatio=ue;qe.join=Tc;qe.fmtDate=vs,qe.tzDate=qc;qe.sync=Io;{qe.addGap=Su,qe.clipGaps=ol;let t=qe.paths={points:jo};t.linear=Wo,t.stepped=Au,t.bars=Cu,t.spline=Mu}var Jo='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';var Pt=class extends We{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.lastSignature="";this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(){let n=JSON.stringify([this.curves,this.heading,this.syncKey,this.percent,this.range]);this.lastSamples===this.samples&&this.lastSignature===n||(this.lastSamples=this.samples,this.lastSignature=n,this.draw())}toggleSeries(n){let i=this.curves[n].label,l=this.hiddenCurves.has(i);this.plot&&this.plot.setSeries(n+1,{show:l}),l?this.hiddenCurves.delete(i):this.hiddenCurves.add(i),this.requestUpdate()}draw(){if(!this.isConnected)return;let n=this.renderRoot.querySelector(".plot");if(!n)return;let i=this.plot;if(i&&i.series.forEach((p,d)=>{d&&typeof p.label=="string"&&(p.show===!1?this.hiddenCurves.add(p.label):this.hiddenCurves.delete(p.label))}),this.dispose(),!this.samples.length||!this.samples.some(p=>this.curves.some(d=>vi(p,d.path)!==null)))return;let l=getComputedStyle(this),o=l.getPropertyValue("--primary-text-color").trim()||"#555",a=[this.samples.map(p=>p.time),...this.curves.map(p=>this.samples.map(d=>vi(d,p.path)))];this.applying=!0,this.plot=new qe({width:Math.max(240,n.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(p,d,f)=>[Math.min(0,d??0),Math.max(100,f??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},axes:[{stroke:o,space:100,grid:{show:!1},values:(p,d)=>d.map(f=>new Date(f*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(f*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:o,values:(p,d)=>d.map(f=>f.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(p,d)=>d==null?"\u2014":new Date(d*1e3).toLocaleString()},...this.curves.map(p=>({label:p.label,stroke:p.color,width:2,spanGaps:!1,show:!this.hiddenCurves.has(p.label),paths:p.step?qe.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(d,f)=>f==null?"Indisponible":`${f.toLocaleString(void 0,{maximumFractionDigits:p.unit.includes("min")?6:3})} ${p.unit}`}))],hooks:{setSeries:[p=>{p.status!==1||p!==this.plot||(p.series.forEach((d,f)=>{f&&typeof d.label=="string"&&(d.show===!1?this.hiddenCurves.add(d.label):this.hiddenCurves.delete(d.label))}),this.requestUpdate())}],setScale:[(p,d)=>{d==="x"&&p.status===1&&p===this.plot&&!this.applying&&p.scales.x.min!=null&&p.scales.x.max!=null&&(Math.abs(p.scales.x.min-this.range[0])>.01||Math.abs(p.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[p.scales.x.min,p.scales.x.max],bubbles:!0,composed:!0}))}]}},a,n),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,n.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,n.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(n)}render(){let n=this.samples.filter(i=>this.curves.some(l=>vi(i,l.path)!==null)).length;return F`<h3>${this.heading}</h3>
      <div class="series-controls" role="group" aria-label="Séries affichées">
        ${this.curves.map((i,l)=>F`<button
              aria-pressed=${!this.hiddenCurves.has(i.label)}
              @click=${()=>this.toggleSeries(l)}
            >
              <span style=${"background:"+i.color} aria-hidden="true"></span
              >${i.label}
            </button>`)}
      </div>
      <div class="plot" aria-label=${this.heading}></div>
      ${n?F`<details>
            <summary>
              Table de données accessible · ${n} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(i=>F`<th>${i.label} (${i.unit})</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(i=>F`<tr>
                        <td>${new Date(i.time*1e3).toLocaleString()}</td>
                        ${this.curves.map(l=>F`<td>
                              ${vi(i,l.path)??"Indisponible"}
                            </td>`)}
                      </tr>`)}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
            </p>
          </details>`:F`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};Pt.styles=[Un(Jo),At`
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
    `],ee([Ee({attribute:!1})],Pt.prototype,"samples",2),ee([Ee({attribute:!1})],Pt.prototype,"curves",2),ee([Ee({attribute:!1})],Pt.prototype,"range",2),ee([Ee()],Pt.prototype,"heading",2),ee([Ee()],Pt.prototype,"syncKey",2),ee([Ee({type:Boolean})],Pt.prototype,"percent",2),Pt=ee([Ot("smartpi-time-chart")],Pt);var qu={setpoint:[["Trajectoire active","setpoint.trajectory_active"],["Boost actif","setpoint.boost_active"]],temperature:[["Temp\xE9rature ext\xE9rieure","temperature.outdoor"," \xB0C"],["Pente int\xE9rieure publi\xE9e","analysis.control.temperature_slope_h"," \xB0C/h",3]],pi:[["Erreur de la voie P","analysis.control.error_p"," \xB0C",4],["Erreur brute de la voie I","temperature.error"," \xB0C",4],["\xC9tat de l\u2019int\xE9grale","temperature.integral_error","",6],["Gain proportionnel Kp","control.kp","",6],["Gain int\xE9gral Ki","control.ki","",6],["Temps int\xE9gral Ti","control.ti_min"," min"],["Source de Kp","analysis.governance.kp_source"],["D\xE9cision sur les gains","analysis.governance.last_decision_gains"]],ff:[["FF1 \xB7 anticipation thermique","analysis.feedforward.u_ff1"," (ratio)",6],["FF2 \xB7 correction apprise","analysis.feedforward.u_ff2"," (ratio)",6],["FF3 \xB7 correction pr\xE9dictive","analysis.feedforward.u_ff3"," (ratio)",6],["Candidat avec FF3","analysis.feedforward.u_ff_effective"," (ratio)",6],["Bande morte active","control.in_deadband"],["Anticipation avant FF3","analysis.feedforward.u_ff_final"," (ratio)",6],["Motif de gel de FF2","analysis.feedforward.ff2_freeze_reason"],["Observateur stationnaire","feedforward.fftrim.stationary.state"],["Dernier rejet stationnaire","feedforward.fftrim.stationary.last_reject_reason"],["Observateur p\xE9riodique","feedforward.fftrim.periodic.state"],["Dernier rejet p\xE9riodique","feedforward.fftrim.periodic.last_reject_reason"],["Transfert de correction","feedforward.fftrim.transfer.state"],["Motif du transfert","feedforward.fftrim.transfer.reason"]],command:[["Sortie PI publi\xE9e","power.pi_percent"," %"],["Anticipation retenue","power.ff_percent"," %"]],direct:[["\xC9tat de l\u2019hyst\xE9r\xE9sis","control.hysteresis_state"],["Phase de calibration","calibration.state"],["Autocalibration","autocalib.state"]],limits:[["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"],["Saturation d\xE9clar\xE9e","control.saturation_state"],["Timing impos\xE9","analysis.control.forced_by_timing"],["Correction anti-windup \u0394u","analysis.control.aw_du"," (ratio)",6],["Source de protection de l\u2019int\xE9grale","temperature.integral_guard_source"]],applied:[["Cycle engag\xE9","power.current_cycle_percent"," %"],["Cycle suivant","power.next_cycle_percent"," %"],["Lin\xE9arisation de vanne","power.valve_linearization_enabled"],["Cycle engag\xE9 \xB7 espace lin\xE9aire","power.linear_current_cycle_percent"," %"],["Cycle suivant \xB7 espace lin\xE9aire","power.linear_next_cycle_percent"," %"],["Statut du retour de commande","feedforward.fftrim.command_ownership.status"]],model:[["Pertes B","model.b"," min\u207B\xB9",6],["Constante thermique \u03C4","model.tau_min"," min",2,"model.tau_reliable"],["Temps mort en chauffe","model.deadtime_heat_s"," s",0,"model.deadtime_heat_reliable"],["Temps mort en refroidissement","model.deadtime_cool_s"," s",0,"model.deadtime_cool_reliable"],["\xC9tape d\u2019apprentissage","learning.stage"],["Dernier motif d\u2019apprentissage","learning.last_reason"],["Gouvernance thermique","governance.thermal_update_decision"],["Motif de gouvernance","governance.thermal_update_reason"],["\xC9tat du jumeau thermique","feedforward.twin_status"],["Temp\xE9rature pr\xE9dite","analysis.twin.twin_T_pred"," \xB0C"],["\xC9quilibre pr\xE9dit","analysis.twin.twin_T_steady"," \xB0C",2,"analysis.twin.twin_T_steady_reliable"]]},Uu={pi:6,ff:5,limits:5},nn=class{constructor(e){this.diagnostic=e}get live(){return this.diagnostic.available?this.diagnostic.live:{}}get bypass(){return this.diagnostic.available?wn(this.diagnostic)||["CoolDown","HeatUp","CoolDownFinal"].includes(String(N(this.live,"calibration.state")))||N(this.live,"control.phase")==="Calibration":!1}get route(){return this.bypass?"direct":N(this.live,"control.mode")==="smartpi"?"pi":"unavailable"}detail(e,n){let i=e.id==="command"&&this.bypass?"direct":e.id,l=qu[i]??[];return(n?l:l.slice(0,Uu[i]??4)).map(([o,a,p,d,f])=>{let b=Ct(this.live,a,f);return{label:o,path:a,reliability:f,value:le(p===void 0?b:Xe(b),p,d)}})}blocks(){let e=this.live,n=this.bypass,i=this.route==="pi"?"Voie SmartPI":"Chemin non v\xE9rifi\xE9",l=(o,a,p,d,f,b,m)=>({id:o,title:a,path:p,value:le(N(e,p),d,p==="model.a"?6:2),explanation:f,reason:le(N(e,b)),reasonPath:b,status:m==="Contourn\xE9"?m:N(e,p)==null?"Indisponible":m??"Publi\xE9"});return[l("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),l("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),l("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",n?"Contourn\xE9":i),l("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",n?"Contourn\xE9":i),l("command",n?"Hyst\xE9r\xE9sis / calibration":"Commande demand\xE9e",n?"power.applied_percent":"power.command_percent"," %",n?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.",n?"control.phase":"control.saturation_state",n?"Voir sortie appliqu\xE9e":"Publi\xE9"),l("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",n?"Contourn\xE9":i),l("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),l("model","Pi\xE8ce et mod\xE8le A/B","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let e=this.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([n,i,l])=>{let o=Xe(N(e,i));return{label:n,path:i,value:o===null?null:o*(l?100:1)}})}};var ni=class extends We{constructor(){super(...arguments);this.expert=!1;this.selected="pi"}render(){if(!this.diagnostic)return F``;let n=new nn(this.diagnostic),i=n.blocks(),l=i.find(f=>f.id===this.selected)??i[0],o=this.diagnostic.lastUpdated,a=o?new Date(o):null,p=this.diagnostic.available&&a&&Number.isFinite(a.valueOf())?F`Dernière mise à jour du capteur : <time datetime=${a.toISOString()}>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"short",timeStyle:"medium"}).format(a)}</time>`:"Horodatage des donn\xE9es actuelles indisponible",d=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return F`<div class="intro">
        <div>
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge"
          >${n.bypass?"Chemin direct \xB7 PI/FF contourn\xE9s":n.route==="pi"?"Voie PI + feedforward":"Chemin de commande non v\xE9rifi\xE9"}</span
        >
      </div>
      <p class="muted">
        ${p}. Les flèches pleines montrent le chemin logique déclaré.
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
          ${n.route==="pi"?_n`<path class="flow" d="M205 65 H235"/><path class="flow" d="M205 195 H220 V95 H235"/><path class="flow" d="M420 65 H435 V115 H450"/><path class="flow" d="M420 195 H435 V145 H450"/>`:n.bypass?_n`<path class="flow bypass" d="M205 65 H220 V10 H440 V100 H450"/><path class="flow bypass" d="M205 195 H220 V132 H450"/><path class="flow bypass" d="M635 125 H647 V310 H660"/>`:null}
          ${n.route==="pi"?_n`<path class="flow" d="M635 125 H660"/><path class="flow" d="M752 170 V265"/>`:null}
          <path class="flow feedback" d="M660 315 H420" />
          <path class="flow feedback" d="M235 345 H110 V245" />
          ${i.map((f,b)=>_n`<g role="button" tabindex="0" aria-pressed=${f.id===l.id} aria-label=${`${f.title} : ${f.value}. ${f.status}`} class=${"block "+(f.id===l.id?"selected":"")+(f.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${d[b][0]},${d[b][1]})`} @click=${()=>this.selected=f.id} @keydown=${m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),this.selected=f.id)}}>
          <title>${f.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${f.title}</text><text x="13" y="50" class="value">${f.value}</text><text x="13" y="73" class="status">${f.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${i.map(f=>F`<button
              aria-pressed=${f.id===l.id}
              @click=${()=>this.selected=f.id}
            >
              ${f.title}<strong>${f.value}</strong><small>${f.status}</small>
            </button>`)}
      </div>
      <aside aria-live="polite">
        <h4>${l.title} <span class="badge">${l.status}</span></h4>
        <p><b>Principe.</b> ${l.explanation}</p>
        <dl>
          <div><dt>Valeur du bloc</dt><dd>${l.value}</dd>
            ${this.expert?F`<code>attributes.live.${l.path}</code>`:null}</div>
          <div><dt>Motif ou contexte publié</dt><dd>${l.reason}</dd>
            ${this.expert?F`<code>attributes.live.${l.reasonPath}</code>`:null}</div>
          ${n.detail(l,this.expert).map(f=>F`<div>
            <dt>${f.label}</dt><dd>${f.value}</dd>
            ${this.expert?F`<code>attributes.live.${f.path}</code>${f.reliability?F`<code>Fiabilité : ${f.reliability}</code>`:null}`:null}
          </div>`)}
        </dl>
        ${l.status==="Contourn\xE9"?F`<p class="muted">Ce bloc est hors du chemin actif. Ses valeurs publiées ne décrivent pas la commande directe.</p>`:null}
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
  `,ee([Ee({attribute:!1})],ni.prototype,"diagnostic",2),ee([Ee({type:Boolean})],ni.prototype,"expert",2),ee([Qe()],ni.prototype,"selected",2),ni=ee([Ot("smartpi-control-diagram")],ni);var ln=class extends We{render(){if(!this.diagnostic)return F``;let e=new nn(this.diagnostic),n=e.chain(),i=Math.max(100,...n.map(l=>Math.abs(l.value??0)));return F`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${e.bypass?"Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliqu\xE9e.":"FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu pr\xE9c\xE8dent les limites ; Hold est un \xE9tat de maintien, pas une contribution \xE0 additionner."}
      </p>
      ${n.map(l=>F`<div class="row">
            <span title=${"attributes.live."+l.path}>${l.label}</span>
            <div class="track">
              <i></i>${l.value===null?null:F`<b
                    style=${`left:${l.value<0?50+l.value/i*50:50}%;width:${Math.abs(l.value)/i*50}%`}
                    class=${l.value<0?"negative":""}
                  ></b>`}
            </div>
            <strong>${le(l.value," %",2)}</strong>
          </div>`)}
      <p>
        Ces diagnostics peuvent décrire un candidat et un cycle déjà engagé.
        Leurs différences ne sont pas une preuve de perte ni de limitation.
      </p>
      <p>
        Échelle symétrique ±${le(i," %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${le(N(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${le(N(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${le(N(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${N(this.diagnostic.live,"power.valve_linearization_enabled")===!0?F`<p>
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
  `,ee([Ee({attribute:!1})],ln.prototype,"diagnostic",2),ln=ee([Ot("smartpi-command-chain")],ln);var Vu=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],ju=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],Bu=new Intl.NumberFormat("fr-FR",{maximumFractionDigits:2,signDisplay:"exceptZero"}),Ue=class extends We{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.followNow=!0;this.generation=0;this.recorderEntity=""}get usingRecorder(){return this.recorderEntity===this.diagnostic?.entityId&&!this.preferSession&&Gl(this.recorder)}willUpdate(n){if(this.followNow&&!this.usingRecorder&&(n.has("session")||n.has("preferSession")||n.has("recorder"))){let i=this.session.at(-1)?.time;i!==void 0&&i>this.range[1]&&(this.end=i,this.range=[i-this.hours*3600,i])}}windowData(n){if(this.filteredCache?.all===n&&this.filteredCache.start===this.range[0]&&this.filteredCache.end===this.range[1])return this.filteredCache;let i=n.filter(l=>l.time>=this.range[0]&&l.time<=this.range[1]);return this.filteredCache={all:n,start:this.range[0],end:this.range[1],samples:i,tracking:xr(i),events:_r(n).filter(l=>l.time>=this.range[0]&&l.time<=this.range[1])}}updated(n){let i=n.get("diagnostic");n.has("diagnostic")&&i?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.filteredCache=void 0,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.followNow=!0,this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(n){this.followNow=!1;let i=this.range[1]-this.range[0],l=Date.now()/1e3,o=this.end-48*3600,a=Math.min(l,Math.max(o+i,this.range[1]+n*i/2));this.range=[a-i,a]}zoom(n){this.followNow=!1;let[i,l]=this.range,o=Math.max(60,Math.min(48*3600,(l-i)*n));this.range=[l-o,l]}async load(){let n=++this.generation,i=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!i||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let l=Date.now()/1e3,o=await wr(this.hass,i.entityId,l-48*3600,l,()=>n!==this.generation);if(n!==this.generation)return;this.recorderEntity=i.entityId,this.recorder=o,Gl(o)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(l){if(n!==this.generation)return;this.error=l instanceof Error&&l.message.startsWith("Format")?l.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{n===this.generation&&(this.loading=!1)}}trackingPanel(n,i){let{pairs:l,signedMedian:o,absoluteMedian:a,largestInterval:p}=n;return F`<section class="pane tracking" aria-labelledby="tracking-heading">
      <div class="tracking-title">
        <h3 id="tracking-heading">Écart à la consigne filtrée</h3>
        <span>Consigne filtrée − température intérieure</span>
      </div>
      <dl class="metrics">
        <div><dt>Couples valides</dt><dd>${l} / ${i}</dd></div>
        <div><dt>Médiane signée</dt><dd>${o===null?"Indisponible":`${Bu.format(o)} \xB0C`}</dd></div>
        <div><dt>Médiane absolue</dt><dd>${le(a," \xB0C")}</dd></div>
        <div><dt>Plus long intervalle entre couples</dt><dd>${le(p===null?null:p/60," min",1)}</dd></div>
      </dl>
      <p>${l<2?"Deux couples valides dans la fen\xEAtre sont n\xE9cessaires pour r\xE9sumer l\u2019\xE9cart.":"Un \xE9cart positif indique une temp\xE9rature sous la consigne filtr\xE9e. La m\xE9diane absolue indique la taille typique de l\u2019\xE9cart observ\xE9."}</p>
      <details>
        <summary>Méthode et limites</summary>
        <p>Chaque couple provient d’une même publication et compte une fois, indépendamment de l’intervalle entre les points. Les publications incomplètes sont exclues des médianes. Le plus long intervalle décrit l’espacement des couples valides.</p>
        <p>Ces valeurs décrivent les publications de la source et de la fenêtre affichées. L’évaluation d’une durée de confort ou d’une réponse à un changement de consigne demande des données et un protocole adaptés.</p>
      </details>
    </section>`}render(){let n=this.diagnostic;if(!n)return ce;let i=this.usingRecorder,l=i?this.recorder:this.session,{samples:o,events:a,tracking:p}=this.windowData(l),d=this.tab==="regulation",f=(b,m,v=!1)=>F`<section class="chart">
        <smartpi-time-chart
          .heading=${b}
          .samples=${o}
          .curves=${m}
          .range=${this.range}
          .percent=${v}
          .syncKey=${n.entityId}
          @time-range=${k=>{k.detail[1]>k.detail[0]&&(this.followNow=!1,this.range=k.detail)}}
        ></smartpi-time-chart>
      </section>`;return F`<div class="workspace">
      <div class="top">
        <div>
          <h2>Observatoire de la régulation</h2>
          <span class="subtitle">${n.name}</span>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${b=>this.expert=b.target.checked}
          />
          Mode expert</label
        >
      </div>
      <nav aria-label="Vues de diagnostic">
        ${[["evolution","\xC9volution"],["regulation","R\xE9gulation en direct"],["model","Sant\xE9 du mod\xE8le"]].map(([b,m])=>F`<button
              class=${this.tab===b?"active":""}
              aria-pressed=${this.tab===b}
              @click=${()=>this.tab=b}
            >
              ${m}
            </button>`)}
      </nav>
      ${d?ce:F`<div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
          ${[1,3,6,12,24,48].map(b=>F`<button
                aria-pressed=${b===this.hours}
                class=${b===this.hours?"chosen":""}
                @click=${()=>{this.hours=b,this.reset()}}
              >
                ${b} h
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
            @change=${b=>this.preferSession=b.target.checked}
          />
          Session uniquement</label
        >
      </div>
      ${i?ce:F`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${b=>{this.followNow=b.target.checked,this.followNow&&this.reset()}}
            />
            Suivre les nouvelles publications de session</label
          >`}
      ${this.loading?F`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:ce}
      ${this.error?F`<p role="status" class="notice">${this.error}</p>`:ce}
      ${o.length?ce:F`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}`}
      ${this.tab==="evolution"?F`
            ${f("Temp\xE9rature et consigne filtr\xE9e",Vu)}
            ${this.trackingPanel(p,o.length)}
            ${f("Commande du r\xE9gulateur \xB7 pas des watts",ju,!0)}
            ${f("\xC9cart consigne filtr\xE9e \u2212 temp\xE9rature int\xE9rieure",[{label:"\xC9cart filtr\xE9",path:"error",color:"#bc7254",unit:"\xB0C"}])}
            <p class="foot">
              Écart calculé uniquement avec deux valeurs du même état. Ce n’est
              pas l’erreur de l’intégrateur ni une mesure de confort. Aucune
              zone de bande morte n’est extrapolée. Les points sont des
              publications irrégulières ; une ligne ne constitue pas une mesure
              intermédiaire.
            </p>
          `:this.tab==="regulation"?F`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${n}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
              </section>
              <section class="pane">
                <smartpi-command-chain .diagnostic=${n}></smartpi-command-chain>
              </section>`:F`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${le(N(n.live,"model.confidence"))}</span
                >
              </div>
              ${f("A \xB7 gain de chauffe estim\xE9",[{label:"A appris",path:"model.a",color:"#2689ca",unit:"\xB0C/min/u",step:!0}])}
              ${f("B \xB7 pertes thermiques estim\xE9es",[{label:"B appris",path:"model.b",color:"#39a38a",unit:"min\u207B\xB9",step:!0}])}
              <p class="foot">
                La confiance actuelle ne valide pas rétroactivement ces séries.
                Le contrat history ne contient pas de confiance historique ni de
                mesures de référence A/B.
              </p>
              <section class="pane">
                <h3>Temps morts · instantané</h3>
                <div class="metrics">
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([b,m,v])=>F`<div>
                        <span>${b}</span
                        ><strong
                          >${le(Ct(n.live,m,v),m==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${le(N(n.live,v))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${le(N(n.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${le(N(n.live,"analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${le(N(n.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE 30","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([b,m,v])=>F`<div>
                        <span>${b}</span
                        ><strong
                          >${le(Ct(n.live,"analysis.twin."+m),v,4)}</strong
                        >
                      </div>`)}
                </div>
                <p>
                  Équilibre :
                  ${le(Ct(n.live,"analysis.twin.twin_T_steady","analysis.twin.twin_T_steady_reliable")," \xB0C")}
                  · Consigne atteignable (prédiction) :
                  ${le(Ct(n.live,"analysis.twin.twin_setpoint_reachable","analysis.twin.twin_T_steady_reliable"))}
                </p>
                <p class="foot">
                  Aucune courbe Twin : ces valeurs ne font pas partie des huit
                  séries Recorder standard. Fiabilité déclarée ≠ exactitude
                  physique démontrée.
                </p>
              </section>
            `}
      ${d?ce:F`<section class="timeline">
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
          ${a.slice(-60).reverse().map(b=>F`<li>
                  <time>${new Date(b.time*1e3).toLocaleString()}</time>
                  <div>
                    <strong>${b.label}</strong>${this.expert?F`<p>${b.provenance}</p>`:ce}
                  </div>
                </li>`)}
        </ol>
        ${a.length===0?F`<p>Aucune transition observable sur cette fenêtre.</p>`:F`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>`}
      ${this.expert?F`<details class="provenance">
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
          </details>`:ce}
    </div>`}};Ue.styles=At`
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
  `,ee([Ee({attribute:!1})],Ue.prototype,"hass",2),ee([Ee({attribute:!1})],Ue.prototype,"diagnostic",2),ee([Ee({attribute:!1})],Ue.prototype,"session",2),ee([Qe()],Ue.prototype,"tab",2),ee([Qe()],Ue.prototype,"expert",2),ee([Qe()],Ue.prototype,"hours",2),ee([Qe()],Ue.prototype,"end",2),ee([Qe()],Ue.prototype,"range",2),ee([Qe()],Ue.prototype,"recorder",2),ee([Qe()],Ue.prototype,"loading",2),ee([Qe()],Ue.prototype,"error",2),ee([Qe()],Ue.prototype,"preferSession",2),ee([Qe()],Ue.prototype,"followNow",2),Ue=ee([Ot("smartpi-visual-diagnostics")],Ue);var Wu=new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium",timeStyle:"short"}),Gu=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],Gt=class extends We{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new Gn}willUpdate(n){n.has("hass")&&this.hass&&this.sessionHistory.collect(Wl(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(n,i,l="",o=2){return F`<div class="metric"><span>${n}</span><strong>${le(i,l,o)}</strong></div>`}power(n,i,l){let o=Xe(i),a=o===null?0:Math.min(100,Math.max(0,o));return F`<div class="power"><div class="power-label"><span>${n}</span><strong>${le(i," %",1)}</strong></div>
      <div class="track" aria-label=${n+" "+le(i," %",1)}>
        <div class=${"fill "+l} style=${"width:"+a+"%"}></div>
      </div></div>`}field(n,i){let l=le(Ct(i,n.path,n.reliable),n.unit??"",n.digits??2);return F`<div class="detail" title=${n.path}><span>${n.label}</span><strong>${l}</strong></div>`}showDiagnostic(n){let i=n.live,l=br(n),o=wn(n),a=Xe(N(i,"learning.bootstrap_progress_percent")),p=Kn(n.lastUpdated);return F`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${n.name}</h2>
            <div class="muted small">${n.climateId??n.entityId}</div></div>
          <span class="tag">${o?"Apprentissage / hyst\xE9r\xE9sis":le(N(i,"control.phase"))}</span>
        </div>
        <p class="muted small">Dernière publication ${p===null?"indisponible":F`<time datetime=${n.lastUpdated??""}>${Wu.format(p*1e3)}</time>`}</p>
        <div class="metrics">
          ${this.metric("Temp\xE9rature int\xE9rieure",N(i,"temperature.indoor")," \xB0C")}
          ${this.metric("Consigne filtr\xE9e",N(i,"setpoint.filtered_setpoint")," \xB0C")}
          ${this.metric("Commande appliqu\xE9e",N(i,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",N(i,"temperature.outdoor")," \xB0C")}
        </div>
        ${o?F`<div class="learn">
          <div class="flex spread"><span>Progression de l’apprentissage</span><strong>${le(a," %",0)}</strong></div>
          <div class="track"><div class="fill applied" style=${"width:"+(a===null?0:Math.max(0,Math.min(100,a)))+"%"}></div></div>
          <div class="muted small">A : ${le(N(i,"learning.emea_samples_a"),"",0)} / ${le(N(i,"learning.bootstrap_target_a"),"",0)}
            · B : ${le(N(i,"learning.emea_samples_b"),"",0)} / ${le(N(i,"learning.bootstrap_target_b"),"",0)}</div>
        </div>`:ce}
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${n} .session=${this.sessionHistory.get(n.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${l.map(d=>F`<li>${d}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${Gu.map(d=>F`<details class="surface">
          <summary>${d.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${d.note}</p>
          <div class="detail-grid">${d.fields.map(f=>this.field(f,i))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:n.state,live:n.live,history:n.history},null,2)}</pre>
      </details>
      </details>
    `}render(){let n=Wl(this.hass),i=n.find(l=>l.entityId===this.selectedId)??n[0];return F`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Lecture seule</span></div>
      <main>
        <div class="flex spread intro"><h2>Mes thermostats</h2>
          <span class="muted small">${n.length} diagnostic${n.length>1?"s":""} SmartPI v2</span></div>
        ${n.length===0?F`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:F`<div class="tiles">${n.map(l=>F`<button type="button" class=${"tile "+(i?.entityId===l.entityId?"selected":"")}
           @click=${()=>{this.selectedId=l.entityId}} aria-pressed=${i?.entityId===l.entityId}>
            <strong>${l.name}</strong>
            <span class="big">${le(N(l.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom">Consigne filtrée ${le(N(l.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
          </button>`)}</div>
          ${i?this.showDiagnostic(i):ce}`}
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
