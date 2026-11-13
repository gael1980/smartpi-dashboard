var nc=Object.defineProperty;var rc=Object.getOwnPropertyDescriptor;var I=(s,i,e,t)=>{for(var n=t>1?void 0:t?rc(i,e):i,r=s.length-1,l;r>=0;r--)(l=s[r])&&(n=(t?l(i,e,n):l(n))||n);return t&&n&&nc(i,e,n),n};var Qs=globalThis,Xs=Qs.ShadowRoot&&(Qs.ShadyCSS===void 0||Qs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Xn=Symbol(),xa=new WeakMap,Cs=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Xn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(Xs&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=xa.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&xa.set(e,i))}return i}toString(){return this.cssText}},en=s=>new Cs(typeof s=="string"?s:s+"",void 0,Xn),Ze=(s,...i)=>{let e=s.length===1?s[0]:i.reduce((t,n,r)=>t+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new Cs(e,s,Xn)},ya=(s,i)=>{if(Xs)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),n=Qs.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,s.appendChild(t)}},er=Xs?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return en(e)})(s):s;var{is:ac,defineProperty:oc,getOwnPropertyDescriptor:lc,getOwnPropertyNames:cc,getOwnPropertySymbols:pc,getPrototypeOf:dc}=Object,tn=globalThis,_a=tn.trustedTypes,uc=_a?_a.emptyScript:"",mc=tn.reactiveElementPolyfillSupport,Ts=(s,i)=>s,Ps={toAttribute(s,i){switch(i){case Boolean:s=s?uc:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},sn=(s,i)=>!ac(s,i),wa={attribute:!0,type:String,converter:Ps,reflect:!1,useDefault:!1,hasChanged:sn};Symbol.metadata??=Symbol("metadata"),tn.litPropertyMetadata??=new WeakMap;var Qt=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=wa){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(i,t,e);n!==void 0&&oc(this.prototype,i,n)}}static getPropertyDescriptor(i,e,t){let{get:n,set:r}=lc(this.prototype,i)??{get(){return this[e]},set(l){this[e]=l}};return{get:n,set(l){let o=n?.call(this);r?.call(this,l),this.requestUpdate(i,o,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??wa}static _$Ei(){if(this.hasOwnProperty(Ts("elementProperties")))return;let i=dc(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(Ts("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ts("properties"))){let e=this.properties,t=[...cc(e),...pc(e)];for(let n of t)this.createProperty(n,e[n])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let n of t)e.unshift(er(n))}else i!==void 0&&e.push(er(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ya(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),n=this.constructor._$Eu(i,t);if(n!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:Ps).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,n=t._$Eh.get(i);if(n!==void 0&&this._$Em!==n){let r=t.getPropertyOptions(n),l=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ps;this._$Em=n;let o=l.fromAttribute(e,r.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(i,e,t,n=!1,r){if(i!==void 0){let l=this.constructor;if(n===!1&&(r=this[i]),t??=l.getPropertyOptions(i),!((t.hasChanged??sn)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(l._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:n,wrapped:r},l){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,l??e??this[i]),r!==!0||l!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),n===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,r]of t){let{wrapped:l}=r,o=this[n];l!==!0||this._$AL.has(n)||o===void 0||this.C(n,void 0,r,o)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};Qt.elementStyles=[],Qt.shadowRootOptions={mode:"open"},Qt[Ts("elementProperties")]=new Map,Qt[Ts("finalized")]=new Map,mc?.({ReactiveElement:Qt}),(tn.reactiveElementVersions??=[]).push("2.1.2");var ir=globalThis,$a=s=>s,nn=ir.trustedTypes,ka=nn?nn.createPolicy("lit-html",{createHTML:s=>s}):void 0,sr="$lit$",Xt=`lit$${Math.random().toFixed(9).slice(2)}$`,nr="?"+Xt,fc=`<${nr}>`,Ai=document,Es=()=>Ai.createComment(""),Ls=s=>s===null||typeof s!="object"&&typeof s!="function",rr=Array.isArray,Ma=s=>rr(s)||typeof s?.[Symbol.iterator]=="function",tr=`[ 	
\f\r]`,Ms=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Sa=/-->/g,Aa=/>/g,ki=RegExp(`>|${tr}(?:([^\\s"'>=/]+)(${tr}*=${tr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ca=/'/g,Ta=/"/g,Ea=/^(?:script|style|textarea|title)$/i,ar=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),v=ar(1),Ie=ar(2),Td=ar(3),Ct=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),Pa=new WeakMap,Si=Ai.createTreeWalker(Ai,129);function La(s,i){if(!rr(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ka!==void 0?ka.createHTML(i):i}var Ra=(s,i)=>{let e=s.length-1,t=[],n,r=i===2?"<svg>":i===3?"<math>":"",l=Ms;for(let o=0;o<e;o++){let p=s[o],u,g,d=-1,h=0;for(;h<p.length&&(l.lastIndex=h,g=l.exec(p),g!==null);)h=l.lastIndex,l===Ms?g[1]==="!--"?l=Sa:g[1]!==void 0?l=Aa:g[2]!==void 0?(Ea.test(g[2])&&(n=RegExp("</"+g[2],"g")),l=ki):g[3]!==void 0&&(l=ki):l===ki?g[0]===">"?(l=n??Ms,d=-1):g[1]===void 0?d=-2:(d=l.lastIndex-g[2].length,u=g[1],l=g[3]===void 0?ki:g[3]==='"'?Ta:Ca):l===Ta||l===Ca?l=ki:l===Sa||l===Aa?l=Ms:(l=ki,n=void 0);let _=l===ki&&s[o+1].startsWith("/>")?" ":"";r+=l===Ms?p+fc:d>=0?(t.push(u),p.slice(0,d)+sr+p.slice(d)+Xt+_):p+Xt+(d===-2?o:_)}return[La(s,r+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},Rs=class s{constructor({strings:i,_$litType$:e},t){let n;this.parts=[];let r=0,l=0,o=i.length-1,p=this.parts,[u,g]=Ra(i,e);if(this.el=s.createElement(u,t),Si.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(n=Si.nextNode())!==null&&p.length<o;){if(n.nodeType===1){if(n.hasAttributes())for(let d of n.getAttributeNames())if(d.endsWith(sr)){let h=g[l++],_=n.getAttribute(d).split(Xt),w=/([.?@])?(.*)/.exec(h);p.push({type:1,index:r,name:w[2],strings:_,ctor:w[1]==="."?an:w[1]==="?"?on:w[1]==="@"?ln:Ti}),n.removeAttribute(d)}else d.startsWith(Xt)&&(p.push({type:6,index:r}),n.removeAttribute(d));if(Ea.test(n.tagName)){let d=n.textContent.split(Xt),h=d.length-1;if(h>0){n.textContent=nn?nn.emptyScript:"";for(let _=0;_<h;_++)n.append(d[_],Es()),Si.nextNode(),p.push({type:2,index:++r});n.append(d[h],Es())}}}else if(n.nodeType===8)if(n.data===nr)p.push({type:2,index:r});else{let d=-1;for(;(d=n.data.indexOf(Xt,d+1))!==-1;)p.push({type:7,index:r}),d+=Xt.length-1}r++}}static createElement(i,e){let t=Ai.createElement("template");return t.innerHTML=i,t}};function Ci(s,i,e=s,t){if(i===Ct)return i;let n=t!==void 0?e._$Co?.[t]:e._$Cl,r=Ls(i)?void 0:i._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(s),n._$AT(s,e,t)),t!==void 0?(e._$Co??=[])[t]=n:e._$Cl=n),n!==void 0&&(i=Ci(s,n._$AS(s,i.values),n,t)),i}var rn=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,n=(i?.creationScope??Ai).importNode(e,!0);Si.currentNode=n;let r=Si.nextNode(),l=0,o=0,p=t[0];for(;p!==void 0;){if(l===p.index){let u;p.type===2?u=new ss(r,r.nextSibling,this,i):p.type===1?u=new p.ctor(r,p.name,p.strings,this,i):p.type===6&&(u=new cn(r,this,i)),this._$AV.push(u),p=t[++o]}l!==p?.index&&(r=Si.nextNode(),l++)}return Si.currentNode=Ai,n}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},ss=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,n){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=Ci(this,i,e),Ls(i)?i===E||i==null||i===""?(this._$AH!==E&&this._$AR(),this._$AH=E):i!==this._$AH&&i!==Ct&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Ma(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==E&&Ls(this._$AH)?this._$AA.nextSibling.data=i:this.T(Ai.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,n=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=Rs.createElement(La(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new rn(n,this),l=r.u(this.options);r.p(e),this.T(l),this._$AH=r}}_$AC(i){let e=Pa.get(i.strings);return e===void 0&&Pa.set(i.strings,e=new Rs(i)),e}k(i){rr(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let r of i)n===e.length?e.push(t=new s(this.O(Es()),this.O(Es()),this,this.options)):t=e[n],t._$AI(r),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=$a(i).nextSibling;$a(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},Ti=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,n,r){this.type=1,this._$AH=E,this._$AN=void 0,this.element=i,this.name=e,this._$AM=n,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=E}_$AI(i,e=this,t,n){let r=this.strings,l=!1;if(r===void 0)i=Ci(this,i,e,0),l=!Ls(i)||i!==this._$AH&&i!==Ct,l&&(this._$AH=i);else{let o=i,p,u;for(i=r[0],p=0;p<r.length-1;p++)u=Ci(this,o[t+p],e,p),u===Ct&&(u=this._$AH[p]),l||=!Ls(u)||u!==this._$AH[p],u===E?i=E:i!==E&&(i+=(u??"")+r[p+1]),this._$AH[p]=u}l&&!n&&this.j(i)}j(i){i===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},an=class extends Ti{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===E?void 0:i}},on=class extends Ti{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==E)}},ln=class extends Ti{constructor(i,e,t,n,r){super(i,e,t,n,r),this.type=5}_$AI(i,e=this){if((i=Ci(this,i,e,0)??E)===Ct)return;let t=this._$AH,n=i===E&&t!==E||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==E&&(t===E||n);n&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},cn=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){Ci(this,i)}},za={M:sr,P:Xt,A:nr,C:1,L:Ra,R:rn,D:Ma,V:Ci,I:ss,H:Ti,N:on,U:ln,B:an,F:cn},hc=ir.litHtmlPolyfillSupport;hc?.(Rs,ss),(ir.litHtmlVersions??=[]).push("3.3.3");var Ia=(s,i,e)=>{let t=e?.renderBefore??i,n=t._$litPart$;if(n===void 0){let r=e?.renderBefore??null;t._$litPart$=n=new ss(i.insertBefore(Es(),r),r,void 0,e??{})}return n._$AI(s),n};var or=globalThis,Ee=class extends Qt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Ia(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ct}};Ee._$litElement$=!0,Ee.finalized=!0,or.litElementHydrateSupport?.({LitElement:Ee});var gc=or.litElementPolyfillSupport;gc?.({LitElement:Ee});(or.litElementVersions??=[]).push("4.2.2");var Xe=s=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,i)}):customElements.define(s,i)};var bc={attribute:!0,type:String,converter:Ps,reflect:!1,hasChanged:sn},vc=(s=bc,i,e)=>{let{kind:t,metadata:n}=e,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),t==="accessor"){let{name:l}=e;return{set(o){let p=i.get.call(this);i.set.call(this,o),this.requestUpdate(l,p,s,!0,o)},init(o){return o!==void 0&&this.C(l,void 0,s,o),o}}}if(t==="setter"){let{name:l}=e;return function(o){let p=this[l];i.call(this,o),this.requestUpdate(l,p,s,!0,o)}}throw Error("Unsupported decorator location: "+t)};function se(s){return(i,e)=>typeof e=="object"?vc(s,i,e):((t,n,r)=>{let l=n.hasOwnProperty(r);return n.constructor.createProperty(r,t),l?Object.getOwnPropertyDescriptor(n,r):void 0})(s,i,e)}function re(s){return se({...s,state:!0,attribute:!1})}function Le(s){return s!==null&&typeof s=="object"&&!Array.isArray(s)}function S(s,i){return i.split(".").reduce((e,t)=>Le(e)?e[t]:void 0,s)}function X(s){return typeof s=="number"&&Number.isFinite(s)?s:null}function P(s,i="",e=2){let t=X(s);return t!==null?t.toLocaleString("fr-FR",{maximumFractionDigits:e})+i:typeof s=="boolean"?s?"Oui":"Non":typeof s=="string"&&s.trim()!==""?s:"Indisponible"}function zs(s){return S(s.live,"control.mode")==="hysteresis"||S(s.live,"learning.stage")==="bootstrap"}function at(s,i,e){if(!(e&&S(s,e)!==!0)&&!(i.startsWith("analysis.twin.")&&!i.endsWith("reliable")&&(S(s,"analysis.twin.twin_model_reliable")!==!0||S(s,"analysis.twin.twin_warming_up")!==!1)))return S(s,i)}function xc(s,i){return Object.values(s.states).find(t=>t.entity_id.startsWith("climate.")&&S(t.attributes,"specific_states.regulation_diagnostics")===i)??null}function ns(s){if(!s||!Le(s.states))return[];let i=[];for(let e of Object.values(s.states)){if(!e?.entity_id?.startsWith("sensor.")||!Le(e.attributes))continue;let t=e.attributes;if(t.schema_version!==2||!Le(t.live)||!Le(t.history))continue;let n=xc(s,e.entity_id),l=(typeof t.friendly_name=="string"?t.friendly_name:e.entity_id).replace(/ SmartPI Diagnostics$/i,"");i.push({entityId:e.entity_id,climateId:n?.entity_id??null,name:typeof n?.attributes.friendly_name=="string"?n.attributes.friendly_name:l,state:e.state,lastUpdated:e.last_updated??null,available:e.state!=="unknown"&&e.state!=="unavailable",live:e.state==="unknown"||e.state==="unavailable"?{}:t.live,history:t.history})}return i.sort((e,t)=>e.name.localeCompare(t.name,"fr"))}function Fa(s){let i=[];if(!s.available)return["Capteur indisponible : ses anciens attributs ne repr\xE9sentent pas des valeurs actuelles."];i.push("Le mod\xE8le A/B reste une estimation apprise ; consulter son \xE9tat de confiance avant toute interpr\xE9tation physique."),zs(s)&&i.push("Apprentissage initial par hyst\xE9r\xE9sis : la commande appliqu\xE9e ne provient pas n\xE9cessairement de la somme PI + FF. Ce d\xE9calage ne prouve pas une anomalie."),S(s.live,"control.in_deadtime_window")===!0&&i.push("Fen\xEAtre de temps mort en cours. Des observations d\u2019apprentissage peuvent \xEAtre rejet\xE9es pendant cette fen\xEAtre."),S(s.live,"model.tau_reliable")===!1&&i.push("Constante de temps \u03C4 d\xE9clar\xE9e non fiable : ne pas interpr\xE9ter sa valeur brute comme une dur\xE9e physique valid\xE9e."),S(s.live,"analysis.twin.twin_T_steady_reliable")===!1&&i.push("Temp\xE9rature d\u2019\xE9quilibre pr\xE9dite non fiable : elle n\u2019est pas utilis\xE9e comme indication de confort ou d\u2019atteignabilit\xE9.");let e=S(s.live,"feedforward.ff3_status");return typeof e=="string"&&e.startsWith("disabled:")&&i.push("FF3 non actif ; motif publi\xE9 par SmartPI : "+e+"."),i}var yc=["temperature.indoor","setpoint.filtered_setpoint","power.applied_percent","power.command_percent","power.pi_percent","power.ff_percent","model.a","model.b"];function rs(s){if(typeof s=="number")return Number.isFinite(s)&&s>0?s:null;if(typeof s!="string"||!/(Z|[+-]\d\d:\d\d)$/.test(s))return null;let i=Date.parse(s);return Number.isFinite(i)?i/1e3:null}function Ha(s){if(!Array.isArray(s))throw new Error("R\xE9ponse Recorder invalide (liste attendue).");let i=[];for(let e of s){if(!Le(e))continue;let t=rs(e.lu??e.last_updated);if(t===null)continue;let n=Le(e.a)?e.a:Le(e.attributes)?e.attributes:{},r=typeof e.s=="string"?e.s:typeof e.state=="string"?e.state:"unknown",l=n.schema_version===2&&r!=="unavailable"&&r!=="unknown";i.push({time:t,state:r,history:l&&Le(n.history)?n.history:{},live:l&&Le(n.live)?n.live:{}})}return as(i)}function as(s){return[...new Map(s.map(i=>[i.time,i])).values()].sort((i,e)=>i.time-e.time)}function Je(s,i){if(i==="error"){let e=X(S(s.history,"temperature.indoor")),t=X(S(s.history,"setpoint.filtered_setpoint"));return e===null||t===null?null:X(t-e)}return i.startsWith("live.")?X(at(s.live,i.slice(5))):X(S(s.history,i))}function Da(s){if(s.length<2)return null;s.sort((e,t)=>e-t);let i=Math.floor(s.length/2);return s.length%2?s[i]:s[i-1]/2+s[i]/2}function qa(s){let i=[],e=null,t=null;for(let r of s){let l=Je(r,"error");l!==null&&(i.push(l),e!==null&&(t=Math.max(t??0,r.time-e)),e=r.time)}let n=i.map(Math.abs);return{pairs:i.length,signedMedian:Da(i),absoluteMedian:Da(n),largestInterval:t}}function lr(s){return s.some(i=>yc.some(e=>Je(i,e)!==null))}function Oa(s){let i=[];for(let e=1;e<s.length;e++){let t=s[e-1],n=s[e],r=X(S(t.history,"setpoint.filtered_setpoint")),l=X(S(n.history,"setpoint.filtered_setpoint"));r!==null&&l!==null&&r!==l&&i.push({time:n.time,label:`Consigne filtr\xE9e ${r} \u2192 ${l} \xB0C`,provenance:"Variation observ\xE9e entre publications ; ce n\u2019est pas n\xE9cessairement une modification utilisateur."}),t.state!==n.state&&i.push({time:n.time,label:`Phase / \xE9tat : ${t.state} \u2192 ${n.state}`,provenance:"Transition observ\xE9e entre deux \xE9tats du capteur ; instant exact interne non disponible."});for(let[o,p]of[["control.saturation_state","Saturation"],["feedforward.ff3_status","FF3"],["control.in_deadtime_window","Temps mort"],["learning.last_reason","Apprentissage"],["governance.thermal_update_reason","Gouvernance"],["autocalib.state","Autocalibration"]]){let u=S(t.live,o),g=S(n.live,o);u!=null&&g!==void 0&&g!==null&&u!==g&&i.push({time:n.time,label:`${p} : ${String(g)}`,provenance:`Comparaison des publications live enregistr\xE9es ou de session : ${o}.`})}}return i}var dn=class{constructor(){this.buffers=new Map;this.revisions=new Map}collect(i,e,t=Date.now()/1e3){let n=new Set(i.map(r=>r.entityId));for(let r of this.buffers.keys())n.has(r)||(this.buffers.delete(r),this.revisions.delete(r));for(let r of i){let l=e[r.entityId]?.last_updated,o=rs(l);if(!l||o===null||this.revisions.get(r.entityId)===l)continue;this.revisions.set(r.entityId,l);let p=this.buffers.get(r.entityId)??[];if(p.length&&o<=p[p.length-1].time)continue;let g={time:p.length===0?t:o,observedAt:p.length===0,state:r.state,history:r.available?r.history:{},live:r.live};this.buffers.set(r.entityId,as([...p,g]).filter(d=>d.time>=t-48*3600).slice(-12e3))}}get(i){return this.buffers.get(i)??[]}clear(){this.buffers.clear(),this.revisions.clear()}};function Na(s){let i=[],e=(t,n)=>{let r=X(S(t.live,`learning.accepted_updates_${n}`));return r!==null&&Number.isSafeInteger(r)&&r>=0?r:null};for(let t=1;t<s.length;t++){let[n,r]=[s[t-1],s[t]];if([n,r].some(o=>["unknown","unavailable","inactive"].includes(o.state)))continue;let l={time:r.time,observedAt:r.observedAt,temperature:Je(r,"temperature.indoor")};for(let o of["A","B"]){let p=o.toLowerCase(),u=e(n,p),g=e(r,p),d=Je(r,`model.${p}`),_=d===null?"valeur indisponible":`${d} ${o==="A"?"\xB0C/min/u":"min\u207B\xB9"}`;u!==null&&g!==null&&g>u&&i.push({...l,kind:o,label:`${o} \xB7 +${g-u} accept\xE9(s) entre ${new Date(n.time*1e3).toLocaleString()} et cette publication \xB7 ${_}`});let w=X(S(n.live,`learning.emea_samples_${p}`)),x=X(S(r.live,`learning.emea_samples_${p}`));!(u!==null&&g!==null&&g>u)&&w!==null&&x!==null&&w>=0&&x>w&&i.push({...l,kind:o,label:`${o} \xB7 +${x-w} mesure(s) collect\xE9e(s) entre ${new Date(n.time*1e3).toLocaleString()} et cette publication \xB7 ${_}`})}for(let[o,p]of[["heat","Chauffe"],["cool","Refroidissement"]]){let u=w=>X(at(w.live,`model.deadtime_${o}_s`,`model.deadtime_${o}_reliable`)),g=u(r),d=`analysis.deadtime.${o}_last_outcome`,h=S(n.live,d),_=typeof h=="string"&&h!=="detected"&&S(r.live,d)==="detected";if(_||g!==null&&g>=0&&g!==u(n)){let w=g!==null&&g>=0?`m\xE9diane ${g} s`:"m\xE9diane indisponible";i.push({...l,kind:p,label:`${p} \xB7 ${_?"d\xE9tection observ\xE9e \xB7 ":""}${w}`})}}}return i}async function ja(s,i,e,t,n=()=>!1){if(!i.startsWith("sensor.")||!Number.isFinite(e)||!Number.isFinite(t)||t<=e||t-e>48*3600)throw new Error("Fen\xEAtre historique invalide.");let r=[];for(let l=e;l<t;l+=12*3600){if(n())throw new Error("Lecture annul\xE9e.");let o=Math.min(t,l+12*3600),p=await s.callWS({type:"history/history_during_period",start_time:new Date(l*1e3).toISOString(),end_time:new Date(o*1e3).toISOString(),entity_ids:[i],include_start_time_state:!1,significant_changes_only:!1,minimal_response:!1,no_attributes:!1});if(!Le(p))throw new Error("Format de r\xE9ponse Recorder non reconnu.");let u=Ha(p[i]??[]);if(r.push(...u.filter(g=>g.time>=l&&g.time<=o)),r.length>1e5)throw new Error("Volume historique trop important ; utiliser l\u2019historique de session.")}return as(r)}var _c={setpoint:[["Trajectoire active","setpoint.trajectory_active"],["Boost actif","setpoint.boost_active"]],temperature:[["Temp\xE9rature ext\xE9rieure","temperature.outdoor"," \xB0C"],["Pente int\xE9rieure publi\xE9e","analysis.control.temperature_slope_h"," \xB0C/h",3]],pi:[["Erreur de la voie P","analysis.control.error_p"," \xB0C",4],["Erreur brute de la voie I","temperature.error"," \xB0C",4],["\xC9tat de l\u2019int\xE9grale","temperature.integral_error","",6],["Gain proportionnel Kp","control.kp","",6],["Gain int\xE9gral Ki","control.ki","",6],["Temps int\xE9gral Ti","control.ti_min"," min"],["Source de Kp","analysis.governance.kp_source"],["D\xE9cision sur les gains","analysis.governance.last_decision_gains"]],ff:[["FF1 \xB7 anticipation thermique","analysis.feedforward.u_ff1"," (ratio)",6],["FF2 \xB7 correction apprise","analysis.feedforward.u_ff2"," (ratio)",6],["FF3 \xB7 correction pr\xE9dictive","analysis.feedforward.u_ff3"," (ratio)",6],["Candidat avec FF3","analysis.feedforward.u_ff_effective"," (ratio)",6],["Bande morte active","control.in_deadband"],["Anticipation avant FF3","analysis.feedforward.u_ff_final"," (ratio)",6],["Motif de gel de FF2","analysis.feedforward.ff2_freeze_reason"],["Observateur stationnaire","feedforward.fftrim.stationary.state"],["Dernier rejet stationnaire","feedforward.fftrim.stationary.last_reject_reason"],["Observateur p\xE9riodique","feedforward.fftrim.periodic.state"],["Dernier rejet p\xE9riodique","feedforward.fftrim.periodic.last_reject_reason"],["Transfert de correction","feedforward.fftrim.transfer.state"],["Motif du transfert","feedforward.fftrim.transfer.reason"]],command:[["Sortie PI publi\xE9e","power.pi_percent"," %"],["Anticipation retenue","power.ff_percent"," %"]],direct:[["\xC9tat de l\u2019hyst\xE9r\xE9sis","control.hysteresis_state"],["Phase de calibration","calibration.state"],["Autocalibration","autocalib.state"]],limits:[["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"],["Saturation d\xE9clar\xE9e","control.saturation_state"],["Temporisation impos\xE9e","analysis.control.forced_by_timing"],["Correction anti-windup \u0394u","analysis.control.aw_du"," (ratio)",6],["Source de protection de l\u2019int\xE9grale","temperature.integral_guard_source"]],applied:[["Cycle engag\xE9","power.current_cycle_percent"," %"],["Candidat au cycle suivant","power.next_cycle_percent"," %"],["Lin\xE9arisation de vanne","power.valve_linearization_enabled"],["Cycle engag\xE9 \xB7 espace lin\xE9aire","power.linear_current_cycle_percent"," %"],["Candidat au cycle suivant \xB7 espace lin\xE9aire","power.linear_next_cycle_percent"," %"],["Statut du retour de commande","feedforward.fftrim.command_ownership.status"]],model:[["Pertes B","model.b"," min\u207B\xB9",6],["Constante thermique \u03C4","model.tau_min"," min",2,"model.tau_reliable"],["Temps mort en chauffe","model.deadtime_heat_s"," s",0,"model.deadtime_heat_reliable"],["Temps mort en refroidissement","model.deadtime_cool_s"," s",0,"model.deadtime_cool_reliable"],["\xC9tape d\u2019apprentissage","learning.stage"],["Dernier motif d\u2019apprentissage","learning.last_reason"],["Gouvernance thermique","governance.thermal_update_decision"],["Motif de gouvernance","governance.thermal_update_reason"],["\xC9tat du jumeau thermique","feedforward.twin_status"],["Temp\xE9rature pr\xE9dite","analysis.twin.twin_T_pred"," \xB0C"],["\xC9quilibre pr\xE9dit","analysis.twin.twin_T_steady"," \xB0C",2,"analysis.twin.twin_T_steady_reliable"]]},wc={pi:6,ff:5,limits:5},pi=class{constructor(i){this.diagnostic=i}get live(){return this.diagnostic.available?this.diagnostic.live:{}}get directMode(){return this.diagnostic.available?["CoolDown","HeatUp","CoolDownFinal"].includes(String(S(this.live,"calibration.state")))||S(this.live,"control.phase")==="Calibration"?"Calibration":zs(this.diagnostic)||S(this.live,"control.phase")==="Hysteresis"?"Hyst\xE9r\xE9sis":null:null}get bypass(){return this.directMode!==null}get route(){return this.bypass?"direct":S(this.live,"control.mode")==="smartpi"?"pi":"unavailable"}get timingForced(){let i=S(this.live,"analysis.control.forced_by_timing");return typeof i=="boolean"?i:null}get saturation(){let i=S(this.live,"control.saturation_state");return i==="SAT_HI"?"Saturation haute d\xE9clar\xE9e":i==="SAT_LO"?"Saturation basse d\xE9clar\xE9e":null}detail(i,e){let t=i.id==="command"&&this.bypass?"direct":i.id,n=_c[t]??[];return(e?n:n.slice(0,wc[t]??4)).map(([r,l,o,p,u])=>{let g=at(this.live,l,u);return{label:r,path:l,reliability:u,value:P(o===void 0?g:X(g),o,p)}})}blocks(){let i=this.live,e=this.bypass,t=this.route==="pi"?"Voie SmartPI":"Chemin non v\xE9rifi\xE9",n=(r,l,o,p,u,g,d)=>({id:r,title:l,path:o,value:P(X(S(i,o)),p,o==="model.a"?6:2),explanation:u,reason:P(S(i,g)),reasonPath:g,status:d==="Contourn\xE9"?d:X(S(i,o))===null?"Indisponible":d??"Publi\xE9"});return[n("setpoint","Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C","Le fa\xE7onnage agit sur la voie proportionnelle en r\xE9gime Stable. La voie int\xE9grale utilise la consigne brute, absente du contrat historique.","setpoint.trajectory_source"),n("temperature","Temp\xE9rature int\xE9rieure","temperature.indoor"," \xB0C","Mesure publi\xE9e par SmartPI, pas une pr\xE9diction du mod\xE8le.","control.phase"),n("pi","R\xE9gulateur PI","power.pi_percent"," %","P utilise une erreur de consigne filtr\xE9e ; I utilise une erreur brute sign\xE9e par le mode HVAC. Le graphique d\u2019\xE9cart filtr\xE9 ne reconstruit pas cette int\xE9grale.","temperature.integral_mode",e?"Contourn\xE9":t),n("ff","Feedforward","power.ff_percent"," %","Entr\xE9es du feedforward : consigne brute, ext\xE9rieur et mod\xE8le A/B ; corrections apprises et pr\xE9dictives selon disponibilit\xE9. FF1 et FF2 sont combin\xE9s puis born\xE9s ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n\u2019est pas une somme libre de toutes les contributions.","feedforward.ff3_status",e?"Contourn\xE9":t),n("command",this.directMode??"Commande demand\xE9e",e?"power.applied_percent":"power.command_percent"," %",e?"L\u2019hyst\xE9r\xE9sis ou la calibration utilise un chemin direct. PI + FF ne doit pas \xEAtre reli\xE9 \xE0 la commande appliqu\xE9e dans ce r\xE9gime.":"En voie PI : clamp(PI + FF retenu, 0, 1) en espace lin\xE9aire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publi\xE9es, sans recalcul.",e?"control.phase":"control.saturation_state",e?"Voir sortie appliqu\xE9e":"Publi\xE9"),n("limits","Limitations et timing","power.limited_percent"," %","La pente et le maximum pr\xE9c\xE8dent les contraintes de timing ; une courbe de vanne peut ensuite changer l\u2019espace de commande. Aucun motif n\u2019est d\xE9duit d\u2019un simple \xE9cart.","analysis.control.integral_guard_mode",e?"Contourn\xE9":t),n("applied","Commande appliqu\xE9e","power.applied_percent"," %","Sortie publi\xE9e apr\xE8s les contraintes de sortie. Elle ne mesure ni \xE9nergie ni chaleur livr\xE9e ; le cycle en cours est publi\xE9 s\xE9par\xE9ment.","feedforward.fftrim.command_ownership.reason"),n("model","Pi\xE8ce et mod\xE8le A/B","model.a"," \xB0C/min/u","La pi\xE8ce est un syst\xE8me physique. A/B ne sont que son mod\xE8le appris ; la confiance publi\xE9e ne constitue pas une validation physique ind\xE9pendante.","model.confidence")]}chain(){let i=this.live;return[["PI","power.pi_percent",!1],["FF1","analysis.feedforward.u_ff1",!0],["FF2","analysis.feedforward.u_ff2",!0],["FF final","analysis.feedforward.u_ff_final",!0],["FF3","analysis.feedforward.u_ff3",!0],["FF effectif","analysis.feedforward.u_ff_effective",!0],["Hold","power.hold_percent",!1],["Demand\xE9e","power.command_percent",!1],["Limit\xE9e","power.limited_percent",!1],["Appliqu\xE9e","power.applied_percent",!1]].map(([e,t,n])=>{let r=X(S(i,t));return{label:e,path:t,value:r===null?null:r*(n?100:1)}})}};var $c="uplot",kc="u-hz",Sc="u-vt",Ac="u-title",Cc="u-wrap",Tc="u-under",Pc="u-over",Mc="u-axis",Ei="u-off",Ec="u-select",Lc="u-cursor-x",Rc="u-cursor-y",zc="u-cursor-pt",Ic="u-legend",Fc="u-live",Dc="u-inline",Hc="u-series",qc="u-marker",Ua="u-label",Oc="u-value",Fs="width",Ds="height";var Ba="bottom",os="left",cr="right",Ar="#000",Va=Ar+"0",pr="mousemove",Wa="mousedown",dr="mouseup",Ga="mouseenter",Ka="mouseleave",Ya="dblclick",Nc="resize",jc="scroll",Za="change",gn="dppxchange",Cr="--",fs=typeof window<"u",gr=fs?document:null,cs=fs?window:null,Uc=fs?navigator:null,me,un;function br(){let s=devicePixelRatio;me!=s&&(me=s,un&&xr(Za,un,br),un=matchMedia(`(min-resolution: ${me-.001}dppx) and (max-resolution: ${me+.001}dppx)`),Li(Za,un,br),cs.dispatchEvent(new CustomEvent(gn)))}function bt(s,i){if(i!=null){let e=s.classList;!e.contains(i)&&e.add(i)}}function vr(s,i){let e=s.classList;e.contains(i)&&e.remove(i)}function ke(s,i,e){s.style[i]=e+"px"}function Dt(s,i,e,t){let n=gr.createElement(s);return i!=null&&bt(n,i),e?.insertBefore(n,t),n}function Tt(s,i){return Dt("div",s,i)}var Ja=new WeakMap;function Kt(s,i,e,t,n){let r="translate("+i+"px,"+e+"px)",l=Ja.get(s);r!=l&&(s.style.transform=r,Ja.set(s,r),i<0||e<0||i>t||e>n?bt(s,Ei):vr(s,Ei))}var Qa=new WeakMap;function Xa(s,i,e){let t=i+e,n=Qa.get(s);t!=n&&(Qa.set(s,t),s.style.background=i,s.style.borderColor=e)}var eo=new WeakMap;function to(s,i,e,t){let n=i+""+e,r=eo.get(s);n!=r&&(eo.set(s,n),s.style.height=e+"px",s.style.width=i+"px",s.style.marginLeft=t?-i/2+"px":0,s.style.marginTop=t?-e/2+"px":0)}var Tr={passive:!0},Bc={...Tr,capture:!0};function Li(s,i,e,t){i.addEventListener(s,e,t?Bc:Tr)}function xr(s,i,e,t){i.removeEventListener(s,e,Tr)}fs&&br();function Ht(s,i,e,t){let n;e=e||0,t=t||i.length-1;let r=t<=2147483647;for(;t-e>1;)n=r?e+t>>1:vt((e+t)/2),i[n]<s?e=n:t=n;return s-i[e]<=i[t]-s?e:t}function Mo(s){return(e,t,n)=>{let r=-1,l=-1;for(let o=t;o<=n;o++)if(s(e[o])){r=o;break}for(let o=n;o>=t;o--)if(s(e[o])){l=o;break}return[r,l]}}var Eo=s=>s!=null,Lo=s=>s!=null&&s>0,xn=Mo(Eo),Vc=Mo(Lo);function Wc(s,i,e,t=0,n=!1){let r=n?Vc:xn,l=n?Lo:Eo;[i,e]=r(s,i,e);let o=s[i],p=s[i];if(i>-1)if(t==1)o=s[i],p=s[e];else if(t==-1)o=s[e],p=s[i];else for(let u=i;u<=e;u++){let g=s[u];l(g)&&(g<o?o=g:g>p&&(p=g))}return[o??ve,p??-ve]}function yn(s,i,e,t){let n=no(s),r=no(i);s==i&&(n==-1?(s*=e,i/=e):(s/=e,i*=e));let l=e==10?ei:Ro,o=n==1?vt:Pt,p=r==1?Pt:vt,u=o(l(Oe(s))),g=p(l(Oe(i))),d=ps(e,u),h=ps(e,g);return e==10&&(u<0&&(d=xe(d,-u)),g<0&&(h=xe(h,-g))),t||e==2?(s=d*n,i=h*r):(s=Do(s,d),i=_n(i,h)),[s,i]}function Pr(s,i,e,t){let n=yn(s,i,e,t);return s==0&&(n[0]=0),i==0&&(n[1]=0),n}var Mr=.1,io={mode:3,pad:Mr},qs={pad:0,soft:null,mode:0},Gc={min:qs,max:qs};function bn(s,i,e,t){return wn(e)?so(s,i,e):(qs.pad=e,qs.soft=t?0:null,qs.mode=t?3:0,so(s,i,Gc))}function de(s,i){return s??i}function Kc(s,i,e){for(i=de(i,0),e=de(e,s.length-1);i<=e;){if(s[i]!=null)return!0;i++}return!1}function so(s,i,e){let t=e.min,n=e.max,r=de(t.pad,0),l=de(n.pad,0),o=de(t.hard,-ve),p=de(n.hard,ve),u=de(t.soft,ve),g=de(n.soft,-ve),d=de(t.mode,0),h=de(n.mode,0),_=i-s,w=ei(_),x=ot(Oe(s),Oe(i)),k=ei(x),C=Oe(k-w);(_<1e-24||C>10)&&(_=0,(s==0||i==0)&&(_=1e-24,d==2&&u!=ve&&(r=0),h==2&&g!=-ve&&(l=0)));let A=_||x||1e3,D=ei(A),R=ps(10,vt(D)),F=A*(_==0?s==0?.1:1:r),O=xe(Do(s-F,R/10),24),te=s>=u&&(d==1||d==3&&O<=u||d==2&&O>=u)?u:ve,J=ot(o,O<te&&s>=te?te:qt(te,O)),ie=A*(_==0?i==0?.1:1:l),Y=xe(_n(i+ie,R/10),24),z=i<=g&&(h==1||h==3&&Y>=g||h==2&&Y<=g)?g:-ve,Q=qt(p,Y>z&&i<=z?z:ot(z,Y));return J==Q&&J==0&&(Q=100),[J,Q]}var Yc=new Intl.NumberFormat(fs?Uc.language:"en-US"),Er=s=>Yc.format(s),xt=Math,hn=xt.PI,Oe=xt.abs,vt=xt.floor,qe=xt.round,Pt=xt.ceil,qt=xt.min,ot=xt.max,ps=xt.pow,no=xt.sign,ei=xt.log10,Ro=xt.log2,Zc=(s,i=1)=>xt.sinh(s)*i,ur=(s,i=1)=>xt.asinh(s/i),ve=1/0;function ro(s){return(ei((s^s>>31)-(s>>31))|0)+1}function yr(s,i,e){return qt(ot(s,i),e)}function zo(s){return typeof s=="function"}function le(s){return zo(s)?s:()=>s}var Jc=()=>{},Io=s=>s,Fo=(s,i)=>i,Qc=s=>null,ao=s=>!0,oo=(s,i)=>s==i,Xc=/\.\d*?(?=9{6,}|0{6,})/gm,Ri=s=>{if(qo(s)||ui.has(s))return s;let i=`${s}`,e=i.match(Xc);if(e==null)return s;let t=e[0].length-1;if(i.indexOf("e-")!=-1){let[n,r]=i.split("e");return+`${Ri(n)}e${r}`}return xe(s,t)};function Pi(s,i){return Ri(xe(Ri(s/i))*i)}function _n(s,i){return Ri(Pt(Ri(s/i))*i)}function Do(s,i){return Ri(vt(Ri(s/i))*i)}function xe(s,i=0){if(qo(s))return s;let e=10**i,t=s*e*(1+Number.EPSILON);return qe(t)/e}var ui=new Map;function Ho(s){return((""+s).split(".")[1]||"").length}function Ns(s,i,e,t){let n=[],r=t.map(Ho);for(let l=i;l<e;l++){let o=Oe(l),p=xe(ps(s,l),o);for(let u=0;u<t.length;u++){let g=s==10?+`${t[u]}e${l}`:t[u]*p,d=(l>=0?0:o)+(l>=r[u]?0:r[u]),h=s==10?g:xe(g,d);n.push(h),ui.set(h,d)}}return n}var Os={},Lr=[],ds=[null,null],di=Array.isArray,qo=Number.isInteger,ep=s=>s===void 0;function lo(s){return typeof s=="string"}function wn(s){let i=!1;if(s!=null){let e=s.constructor;i=e==null||e==Object}return i}function tp(s){return s!=null&&typeof s=="object"}var ip=Object.getPrototypeOf(Uint8Array),Oo="__proto__";function us(s,i=wn){let e;if(di(s)){let t=s.find(n=>n!=null);if(di(t)||i(t)){e=Array(s.length);for(let n=0;n<s.length;n++)e[n]=us(s[n],i)}else e=s.slice()}else if(s instanceof ip)e=s.slice();else if(i(s)){e={};for(let t in s)t!=Oo&&(e[t]=us(s[t],i))}else e=s;return e}function Fe(s){let i=arguments;for(let e=1;e<i.length;e++){let t=i[e];for(let n in t)n!=Oo&&(wn(s[n])?Fe(s[n],us(t[n])):s[n]=us(t[n]))}return s}var sp=0,np=1,rp=2;function ap(s,i,e){for(let t=0,n,r=-1;t<i.length;t++){let l=i[t];if(l>r){for(n=l-1;n>=0&&s[n]==null;)s[n--]=null;for(n=l+1;n<e&&s[n]==null;)s[r=n++]=null}}}function op(s,i){if(pp(s)){let l=s[0].slice();for(let o=1;o<s.length;o++)l.push(...s[o].slice(1));return dp(l[0])||(l=cp(l)),l}let e=new Set;for(let l=0;l<s.length;l++){let p=s[l][0],u=p.length;for(let g=0;g<u;g++)e.add(p[g])}let t=[Array.from(e).sort((l,o)=>l-o)],n=t[0].length,r=new Map;for(let l=0;l<n;l++)r.set(t[0][l],l);for(let l=0;l<s.length;l++){let o=s[l],p=o[0];for(let u=1;u<o.length;u++){let g=o[u],d=Array(n).fill(void 0),h=i?i[l][u]:np,_=[];for(let w=0;w<g.length;w++){let x=g[w],k=r.get(p[w]);x===null?h!=sp&&(d[k]=x,h==rp&&_.push(k)):d[k]=x}ap(d,_,n),t.push(d)}}return t}var lp=typeof queueMicrotask>"u"?s=>Promise.resolve().then(s):queueMicrotask;function cp(s){let i=s[0],e=i.length,t=Array(e);for(let r=0;r<t.length;r++)t[r]=r;t.sort((r,l)=>i[r]-i[l]);let n=[];for(let r=0;r<s.length;r++){let l=s[r],o=Array(e);for(let p=0;p<e;p++)o[p]=l[t[p]];n.push(o)}return n}function pp(s){let i=s[0][0],e=i.length;for(let t=1;t<s.length;t++){let n=s[t][0];if(n.length!=e)return!1;if(n!=i){for(let r=0;r<e;r++)if(n[r]!=i[r])return!1}}return!0}function dp(s,i=100){let e=s.length;if(e<=1)return!0;let t=0,n=e-1;for(;t<=n&&s[t]==null;)t++;for(;n>=t&&s[n]==null;)n--;if(n<=t)return!0;let r=ot(1,vt((n-t+1)/i));for(let l=s[t],o=t+r;o<=n;o+=r){let p=s[o];if(p!=null){if(p<=l)return!1;l=p}}return!0}var No=["January","February","March","April","May","June","July","August","September","October","November","December"],jo=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Uo(s){return s.slice(0,3)}var up=jo.map(Uo),mp=No.map(Uo),fp={MMMM:No,MMM:mp,WWWW:jo,WWW:up};function Is(s){return(s<10?"0":"")+s}function hp(s){return(s<10?"00":s<100?"0":"")+s}var gp={YYYY:s=>s.getFullYear(),YY:s=>(s.getFullYear()+"").slice(2),MMMM:(s,i)=>i.MMMM[s.getMonth()],MMM:(s,i)=>i.MMM[s.getMonth()],MM:s=>Is(s.getMonth()+1),M:s=>s.getMonth()+1,DD:s=>Is(s.getDate()),D:s=>s.getDate(),WWWW:(s,i)=>i.WWWW[s.getDay()],WWW:(s,i)=>i.WWW[s.getDay()],HH:s=>Is(s.getHours()),H:s=>s.getHours(),h:s=>{let i=s.getHours();return i==0?12:i>12?i-12:i},AA:s=>s.getHours()>=12?"PM":"AM",aa:s=>s.getHours()>=12?"pm":"am",a:s=>s.getHours()>=12?"p":"a",mm:s=>Is(s.getMinutes()),m:s=>s.getMinutes(),ss:s=>Is(s.getSeconds()),s:s=>s.getSeconds(),fff:s=>hp(s.getMilliseconds())};function Rr(s,i){i=i||fp;let e=[],t=/\{([a-z]+)\}|[^{]+/gi,n;for(;n=t.exec(s);)e.push(n[0][0]=="{"?gp[n[1]]:n[0]);return r=>{let l="";for(let o=0;o<e.length;o++)l+=typeof e[o]=="string"?e[o]:e[o](r,i);return l}}var bp=new Intl.DateTimeFormat().resolvedOptions().timeZone;function vp(s,i){let e;return i=="UTC"||i=="Etc/UTC"?e=new Date(+s+s.getTimezoneOffset()*6e4):i==bp?e=s:(e=new Date(s.toLocaleString("en-US",{timeZone:i})),e.setMilliseconds(s.getMilliseconds())),e}var Bo=s=>s%1==0,vn=[1,2,2.5,5],xp=Ns(10,-32,0,vn),Vo=Ns(10,0,32,vn),yp=Vo.filter(Bo),Mi=xp.concat(Vo),zr=`
`,Wo="{YYYY}",co=zr+Wo,Go="{M}/{D}",Hs=zr+Go,mn=Hs+"/{YY}",Ko="{aa}",_p="{h}:{mm}",ls=_p+Ko,po=zr+ls,uo=":{ss}",he=null;function Yo(s){let i=s*1e3,e=i*60,t=e*60,n=t*24,r=n*30,l=n*365,p=(s==1?Ns(10,0,3,vn).filter(Bo):Ns(10,-3,0,vn)).concat([i,i*5,i*10,i*15,i*30,e,e*5,e*10,e*15,e*30,t,t*2,t*3,t*4,t*6,t*8,t*12,n,n*2,n*3,n*4,n*5,n*6,n*7,n*8,n*9,n*10,n*15,r,r*2,r*3,r*4,r*6,l,l*2,l*5,l*10,l*25,l*50,l*100]),u=[[l,Wo,he,he,he,he,he,he,1],[n*28,"{MMM}",co,he,he,he,he,he,1],[n,Go,co,he,he,he,he,he,1],[t,"{h}"+Ko,mn,he,Hs,he,he,he,1],[e,ls,mn,he,Hs,he,he,he,1],[i,uo,mn+" "+ls,he,Hs+" "+ls,he,po,he,1],[s,uo+".{fff}",mn+" "+ls,he,Hs+" "+ls,he,po,he,1]];function g(d){return(h,_,w,x,k,C)=>{let A=[],D=k>=l,R=k>=r&&k<l,F=d(w),O=xe(F*s,3),te=mr(F.getFullYear(),D?0:F.getMonth(),R||D?1:F.getDate()),J=xe(te*s,3);if(R||D){let ie=R?k/r:0,Y=D?k/l:0,z=O==J?O:xe(mr(te.getFullYear()+Y,te.getMonth()+ie,1)*s,3),Q=new Date(qe(z/s)),M=Q.getFullYear(),G=Q.getMonth();for(let U=0;z<=x;U++){let ae=mr(M+Y*U,G+ie*U,1),B=ae-d(xe(ae*s,3));z=xe((+ae+B)*s,3),z<=x&&A.push(z)}}else{let ie=k>=n?n:k,Y=vt(w)-vt(O),z=J+Y+_n(O-J,ie);A.push(z);let Q=d(z),M=Q.getHours()+Q.getMinutes()/e+Q.getSeconds()/t,G=k/t,U=h.axes[_]._space,ae=C/U;for(;z=xe(z+k,s==1?0:3),!(z>x);)if(G>1){let B=vt(xe(M+G,6))%24,ce=d(z).getHours()-B;ce>1&&(ce=-1),z-=ce*t,M=(M+G)%24;let ge=A[A.length-1];xe((z-ge)/k,3)*ae>=.7&&A.push(z)}else A.push(z)}return A}}return[p,u,g]}var[wp,$p,kp]=Yo(1),[Sp,Ap,Cp]=Yo(.001);Ns(2,-53,53,[1]);function mo(s,i){return s.map(e=>e.map((t,n)=>n==0||n==8||t==null?t:i(n==1||e[8]==0?t:e[1]+t)))}function fo(s,i){return(e,t,n,r,l)=>{let o=i.find(w=>l>=w[0])||i[i.length-1],p,u,g,d,h,_;return t.map(w=>{let x=s(w),k=x.getFullYear(),C=x.getMonth(),A=x.getDate(),D=x.getHours(),R=x.getMinutes(),F=x.getSeconds(),O=k!=p&&o[2]||C!=u&&o[3]||A!=g&&o[4]||D!=d&&o[5]||R!=h&&o[6]||F!=_&&o[7]||o[1];return p=k,u=C,g=A,d=D,h=R,_=F,O(x)})}}function Tp(s,i){let e=Rr(i);return(t,n,r,l,o)=>n.map(p=>e(s(p)))}function mr(s,i,e){return new Date(s,i,e)}function ho(s,i){return i(s)}var Pp="{YYYY}-{MM}-{DD} {h}:{mm}{aa}";function go(s,i){return(e,t,n,r)=>r==null?Cr:i(s(t))}function Mp(s,i){let e=s.series[i];return e.width?e.stroke(s,i):e.points.width?e.points.stroke(s,i):null}function Ep(s,i){return s.series[i].fill(s,i)}var Lp={show:!0,live:!0,isolate:!1,mount:Jc,markers:{show:!0,width:2,stroke:Mp,fill:Ep,dash:"solid"},idx:null,idxs:null,values:[]};function Rp(s,i){let e=s.cursor.points,t=Tt(),n=e.size(s,i);ke(t,Fs,n),ke(t,Ds,n);let r=n/-2;ke(t,"marginLeft",r),ke(t,"marginTop",r);let l=e.width(s,i,n);return l&&ke(t,"borderWidth",l),t}function zp(s,i){let e=s.series[i].points;return e._fill||e._stroke}function Ip(s,i){let e=s.series[i].points;return e._stroke||e._fill}function Fp(s,i){return s.series[i].points.size}var fr=[0,0];function Dp(s,i,e){return fr[0]=i,fr[1]=e,fr}function fn(s,i,e,t=!0){return n=>{n.button==0&&(!t||n.target==i)&&e(n)}}function hr(s,i,e,t=!0){return n=>{(!t||n.target==i)&&e(n)}}var Hp={show:!0,x:!0,y:!0,lock:!1,move:Dp,points:{one:!1,show:Rp,size:Fp,width:0,stroke:Ip,fill:zp},bind:{mousedown:fn,mouseup:fn,click:fn,dblclick:fn,mousemove:hr,mouseleave:hr,mouseenter:hr},drag:{setScale:!0,x:!0,y:!1,dist:0,uni:null,click:(s,i)=>{i.stopPropagation(),i.stopImmediatePropagation()},_x:!1,_y:!1},focus:{dist:(s,i,e,t,n)=>t-n,prox:-1,bias:0},hover:{skip:[void 0],prox:null,bias:0},left:-10,top:-10,idx:null,dataIdx:null,idxs:null,event:null},Zo={show:!0,stroke:"rgba(0,0,0,0.07)",width:2},Ir=Fe({},Zo,{filter:Fo}),Jo=Fe({},Ir,{size:10}),Qo=Fe({},Zo,{show:!1}),Fr='12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',Xo="bold "+Fr,el=1.5,bo={show:!0,scale:"x",stroke:Ar,space:50,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Xo,side:2,grid:Ir,ticks:Jo,border:Qo,font:Fr,lineGap:el,rotate:0},qp="Value",Op="Time",vo={show:!0,scale:"x",auto:!1,sorted:1,min:ve,max:-ve,idxs:[]};function Np(s,i,e,t,n){return i.map(r=>r==null?"":Er(r))}function jp(s,i,e,t,n,r,l){let o=[],p=ui.get(n)||0;e=l?e:xe(_n(e,n),p);for(let u=e;u<=t;u=xe(u+n,p))o.push(Object.is(u,-0)?0:u);return o}function _r(s,i,e,t,n,r,l){let o=[],p=s.scales[s.axes[i].scale].log,u=p==10?ei:Ro,g=vt(u(e));n=ps(p,g),p==10&&(n=Mi[Ht(n,Mi)]);let d=e,h=n*p;p==10&&(h=Mi[Ht(h,Mi)]);do o.push(d),d=d+n,p==10&&!ui.has(d)&&(d=xe(d,ui.get(n))),d>=h&&(n=d,h=n*p,p==10&&(h=Mi[Ht(h,Mi)]));while(d<=t);return o}function Up(s,i,e,t,n,r,l){let p=s.scales[s.axes[i].scale].asinh,u=t>p?_r(s,i,ot(p,e),t,n):[p],g=t>=0&&e<=0?[0]:[];return(e<-p?_r(s,i,ot(p,-t),-e,n):[p]).reverse().map(h=>-h).concat(g,u)}var tl=/./,Bp=/[12357]/,Vp=/[125]/,xo=/1/,wr=(s,i,e,t)=>s.map((n,r)=>i==4&&n==0||r%t==0&&e.test(n.toExponential()[n<0?1:0])?n:null);function Wp(s,i,e,t,n){let r=s.axes[e],l=r.scale,o=s.scales[l],p=s.valToPos,u=r._space,g=p(10,l),d=p(9,l)-g>=u?tl:p(7,l)-g>=u?Bp:p(5,l)-g>=u?Vp:xo;if(d==xo){let h=Oe(p(1,l)-g);if(h<u)return wr(i.slice().reverse(),o.distr,d,Pt(u/h)).reverse()}return wr(i,o.distr,d,1)}function Gp(s,i,e,t,n){let r=s.axes[e],l=r.scale,o=r._space,p=s.valToPos,u=Oe(p(1,l)-p(2,l));return u<o?wr(i.slice().reverse(),3,tl,Pt(o/u)).reverse():i}function Kp(s,i,e,t){return t==null?Cr:i==null?"":Er(i)}var yo={show:!0,scale:"y",stroke:Ar,space:30,gap:5,alignTo:1,size:50,labelGap:0,labelSize:30,labelFont:Xo,side:3,grid:Ir,ticks:Jo,border:Qo,font:Fr,lineGap:el,rotate:0};function Yp(s,i){let e=3+(s||1)*2;return xe(e*i,3)}function Zp(s,i){let{scale:e,idxs:t}=s.series[0],n=s._data[0],r=s.valToPos(n[t[0]],e,!0),l=s.valToPos(n[t[1]],e,!0),o=Oe(l-r),p=s.series[i],u=o/(p.points.space*me);return t[1]-t[0]<=u}var _o={scale:null,auto:!0,sorted:0,min:ve,max:-ve},il=(s,i,e,t,n)=>n,wo={show:!0,auto:!0,sorted:0,gaps:il,alpha:1,facets:[Fe({},_o,{scale:"x"}),Fe({},_o,{scale:"y"})]},$o={scale:"y",auto:!0,sorted:0,show:!0,spanGaps:!1,gaps:il,alpha:1,points:{show:Zp,filter:null},values:null,min:ve,max:-ve,idxs:[],path:null,clip:null};function Jp(s,i,e,t,n){return e/10}var sl={time:!0,auto:!0,distr:1,log:10,asinh:1,min:null,max:null,dir:1,ori:0},Qp=Fe({},sl,{time:!1,ori:1}),ko={};function nl(s,i){let e=ko[s];return e||(e={key:s,plots:[],sub(t){e.plots.push(t)},unsub(t){e.plots=e.plots.filter(n=>n!=t)},pub(t,n,r,l,o,p,u){for(let g=0;g<e.plots.length;g++)e.plots[g]!=n&&e.plots[g].pub(t,n,r,l,o,p,u)}},s!=null&&(ko[s]=e)),e}var ms=1,$r=2;function zi(s,i,e){let t=s.mode,n=s.series[i],r=t==2?s._data[i]:s._data,l=s.scales,o=s.bbox,p=r[0],u=t==2?r[1]:r[i],g=t==2?l[n.facets[0].scale]:l[s.series[0].scale],d=t==2?l[n.facets[1].scale]:l[n.scale],h=o.left,_=o.top,w=o.width,x=o.height,k=s.valToPosH,C=s.valToPosV;return g.ori==0?e(n,p,u,g,d,k,C,h,_,w,x,kn,hs,An,al,ll):e(n,p,u,g,d,C,k,_,h,x,w,Sn,gs,qr,ol,cl)}function Dr(s,i){let e=0,t=0,n=de(s.bands,Lr);for(let r=0;r<n.length;r++){let l=n[r];l.series[0]==i?e=l.dir:l.series[1]==i&&(l.dir==1?t|=1:t|=2)}return[e,t==1?-1:t==2?1:t==3?2:0]}function Xp(s,i,e,t,n){let r=s.mode,l=s.series[i],o=r==2?l.facets[1].scale:l.scale,p=s.scales[o];return n==-1?p.min:n==1?p.max:p.distr==3?p.dir==1?p.min:p.max:0}function ti(s,i,e,t,n,r){return zi(s,i,(l,o,p,u,g,d,h,_,w,x,k)=>{let C=l.pxRound,A=u.dir*(u.ori==0?1:-1),D=u.ori==0?hs:gs,R,F;A==1?(R=e,F=t):(R=t,F=e);let O=C(d(o[R],u,x,_)),te=C(h(p[R],g,k,w)),J=C(d(o[F],u,x,_)),ie=C(h(r==1?g.max:g.min,g,k,w)),Y=new Path2D(n);return D(Y,J,ie),D(Y,O,ie),D(Y,O,te),Y})}function $n(s,i,e,t,n,r){let l=null;if(s.length>0){l=new Path2D;let o=i==0?An:qr,p=e;for(let d=0;d<s.length;d++){let h=s[d];if(h[1]>h[0]){let _=h[0]-p;_>0&&o(l,p,t,_,t+r),p=h[1]}}let u=e+n-p,g=10;u>0&&o(l,p,t-g/2,u,t+r+g)}return l}function ed(s,i,e){let t=s[s.length-1];t&&t[0]==i?t[1]=e:s.push([i,e])}function Hr(s,i,e,t,n,r,l){let o=[],p=s.length;for(let u=n==1?e:t;u>=e&&u<=t;u+=n)if(i[u]===null){let d=u,h=u;if(n==1)for(;++u<=t&&i[u]===null;)h=u;else for(;--u>=e&&i[u]===null;)h=u;let _=r(s[d]),w=h==d?_:r(s[h]),x=d-n;_=l<=0&&x>=0&&x<p?r(s[x]):_;let C=h+n;w=l>=0&&C>=0&&C<p?r(s[C]):w,w>=_&&o.push([_,w])}return o}function So(s){return s==0?Io:s==1?qe:i=>Pi(i,s)}function rl(s){let i=s==0?kn:Sn,e=s==0?(n,r,l,o,p,u)=>{n.arcTo(r,l,o,p,u)}:(n,r,l,o,p,u)=>{n.arcTo(l,r,p,o,u)},t=s==0?(n,r,l,o,p)=>{n.rect(r,l,o,p)}:(n,r,l,o,p)=>{n.rect(l,r,p,o)};return(n,r,l,o,p,u=0,g=0)=>{u==0&&g==0?t(n,r,l,o,p):(u=qt(u,o/2,p/2),g=qt(g,o/2,p/2),i(n,r+u,l),e(n,r+o,l,r+o,l+p,u),e(n,r+o,l+p,r,l+p,g),e(n,r,l+p,r,l,g),e(n,r,l,r+o,l,u),n.closePath())}}var kn=(s,i,e)=>{s.moveTo(i,e)},Sn=(s,i,e)=>{s.moveTo(e,i)},hs=(s,i,e)=>{s.lineTo(i,e)},gs=(s,i,e)=>{s.lineTo(e,i)},An=rl(0),qr=rl(1),al=(s,i,e,t,n,r)=>{s.arc(i,e,t,n,r)},ol=(s,i,e,t,n,r)=>{s.arc(e,i,t,n,r)},ll=(s,i,e,t,n,r,l)=>{s.bezierCurveTo(i,e,t,n,r,l)},cl=(s,i,e,t,n,r,l)=>{s.bezierCurveTo(e,i,n,t,l,r)};function pl(s){return(i,e,t,n,r)=>zi(i,e,(l,o,p,u,g,d,h,_,w,x,k)=>{let{pxRound:C,points:A}=l,D,R;u.ori==0?(D=kn,R=al):(D=Sn,R=ol);let F=xe(A.width*me,3),O=(A.size-A.width)/2*me,te=xe(O*2,3),J=new Path2D,ie=new Path2D,{left:Y,top:z,width:Q,height:M}=i.bbox;An(ie,Y-te,z-te,Q+te*2,M+te*2);let G=U=>{if(p[U]!=null){let ae=C(d(o[U],u,x,_)),B=C(h(p[U],g,k,w));D(J,ae+O,B),R(J,ae,B,O,0,hn*2)}};if(r)r.forEach(G);else for(let U=t;U<=n;U++)G(U);return{stroke:F>0?J:null,fill:J,clip:ie,flags:ms|$r}})}function dl(s){return(i,e,t,n,r,l)=>{t!=n&&(r!=t&&l!=t&&s(i,e,t),r!=n&&l!=n&&s(i,e,n),s(i,e,l))}}var td=dl(hs),id=dl(gs);function ul(s){let i=de(s?.alignGaps,0);return(e,t,n,r)=>zi(e,t,(l,o,p,u,g,d,h,_,w,x,k)=>{[n,r]=xn(p,n,r);let C=l.pxRound,A=M=>C(d(M,u,x,_)),D=M=>C(h(M,g,k,w)),R,F;u.ori==0?(R=hs,F=td):(R=gs,F=id);let O=u.dir*(u.ori==0?1:-1),te={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:ms},J=te.stroke,ie=!1;if(r-n>=x*4){let M=V=>e.posToVal(V,u.key,!0),G=null,U=null,ae,B,ct,Se=A(o[O==1?n:r]),ce=A(o[n]),ge=A(o[r]),ne=M(O==1?ce+1:ge-1);for(let V=O==1?n:r;V>=n&&V<=r;V+=O){let De=o[V],Ae=(O==1?De<ne:De>ne)?Se:A(De),fe=p[V];Ae==Se?fe!=null?(B=fe,G==null?(R(J,Ae,D(B)),ae=G=U=B):B<G?G=B:B>U&&(U=B)):fe===null&&(ie=!0):(G!=null&&F(J,Se,D(G),D(U),D(ae),D(B)),fe!=null?(B=fe,R(J,Ae,D(B)),G=U=ae=B):(G=U=null,fe===null&&(ie=!0)),Se=Ae,ne=M(Se+O))}G!=null&&G!=U&&ct!=Se&&F(J,Se,D(G),D(U),D(ae),D(B))}else for(let M=O==1?n:r;M>=n&&M<=r;M+=O){let G=p[M];G===null?ie=!0:G!=null&&R(J,A(o[M]),D(G))}let[z,Q]=Dr(e,t);if(l.fill!=null||z!=0){let M=te.fill=new Path2D(J),G=l.fillTo(e,t,l.min,l.max,z),U=D(G),ae=A(o[n]),B=A(o[r]);O==-1&&([B,ae]=[ae,B]),R(M,B,U),R(M,ae,U)}if(!l.spanGaps){let M=[];ie&&M.push(...Hr(o,p,n,r,O,A,i)),te.gaps=M=l.gaps(e,t,n,r,M),te.clip=$n(M,u.ori,_,w,x,k)}return Q!=0&&(te.band=Q==2?[ti(e,t,n,r,J,-1),ti(e,t,n,r,J,1)]:ti(e,t,n,r,J,Q)),te})}function sd(s){let i=de(s.align,1),e=de(s.ascDesc,!1),t=de(s.alignGaps,0),n=de(s.extend,!1);return(r,l,o,p)=>zi(r,l,(u,g,d,h,_,w,x,k,C,A,D)=>{[o,p]=xn(d,o,p);let R=u.pxRound,{left:F,width:O}=r.bbox,te=ce=>R(w(ce,h,A,k)),J=ce=>R(x(ce,_,D,C)),ie=h.ori==0?hs:gs,Y={stroke:new Path2D,fill:null,clip:null,band:null,gaps:null,flags:ms},z=Y.stroke,Q=h.dir*(h.ori==0?1:-1),M=J(d[Q==1?o:p]),G=te(g[Q==1?o:p]),U=G,ae=G;n&&i==-1&&(ae=F,ie(z,ae,M)),ie(z,G,M);for(let ce=Q==1?o:p;ce>=o&&ce<=p;ce+=Q){let ge=d[ce];if(ge==null)continue;let ne=te(g[ce]),V=J(ge);i==1?ie(z,ne,M):ie(z,U,V),ie(z,ne,V),M=V,U=ne}let B=U;n&&i==1&&(B=F+O,ie(z,B,M));let[ct,Se]=Dr(r,l);if(u.fill!=null||ct!=0){let ce=Y.fill=new Path2D(z),ge=u.fillTo(r,l,u.min,u.max,ct),ne=J(ge);ie(ce,B,ne),ie(ce,ae,ne)}if(!u.spanGaps){let ce=[];ce.push(...Hr(g,d,o,p,Q,te,t));let ge=u.width*me/2,ne=e||i==1?ge:-ge,V=e||i==-1?-ge:ge;ce.forEach(De=>{De[0]+=ne,De[1]+=V}),Y.gaps=ce=u.gaps(r,l,o,p,ce),Y.clip=$n(ce,h.ori,k,C,A,D)}return Se!=0&&(Y.band=Se==2?[ti(r,l,o,p,z,-1),ti(r,l,o,p,z,1)]:ti(r,l,o,p,z,Se)),Y})}function Ao(s,i,e,t,n,r,l=ve){if(s.length>1){let o=null;for(let p=0,u=1/0;p<s.length;p++)if(i[p]!==void 0){if(o!=null){let g=Oe(s[p]-s[o]);g<u&&(u=g,l=Oe(e(s[p],t,n,r)-e(s[o],t,n,r)))}o=p}}return l}function nd(s){s=s||Os;let i=de(s.size,[.6,ve,1]),e=s.align||0,t=s.gap||0,n=s.radius;n=n==null?[0,0]:typeof n=="number"?[n,0]:n;let r=le(n),l=1-i[0],o=de(i[1],ve),p=de(i[2],1),u=de(s.disp,Os),g=de(s.each,_=>{}),{fill:d,stroke:h}=u;return(_,w,x,k)=>zi(_,w,(C,A,D,R,F,O,te,J,ie,Y,z)=>{let Q=C.pxRound,M=e,G=t*me,U=o*me,ae=p*me,B,ct;R.ori==0?[B,ct]=r(_,w):[ct,B]=r(_,w);let Se=R.dir*(R.ori==0?1:-1),ce=R.ori==0?An:qr,ge=R.ori==0?g:(N,ye,He,Ni,gi,jt,bi)=>{g(N,ye,He,gi,Ni,bi,jt)},ne=de(_.bands,Lr).find(N=>N.series[0]==w),V=ne!=null?ne.dir:0,De=C.fillTo(_,w,C.min,C.max,V),tt=Q(te(De,F,z,ie)),Ae,fe,Lt,ut=Y,Te=Q(C.width*me),Nt=!1,Yt=null,_t=null,ni=null,Hi=null;d!=null&&(Te==0||h!=null)&&(Nt=!0,Yt=d.values(_,w,x,k),_t=new Map,new Set(Yt).forEach(N=>{N!=null&&_t.set(N,new Path2D)}),Te>0&&(ni=h.values(_,w,x,k),Hi=new Map,new Set(ni).forEach(N=>{N!=null&&Hi.set(N,new Path2D)})));let{x0:qi,size:xs}=u;if(qi!=null&&xs!=null){M=1,A=qi.values(_,w,x,k),qi.unit==2&&(A=A.map(He=>_.posToVal(J+He*Y,R.key,!0)));let N=xs.values(_,w,x,k);xs.unit==2?fe=N[0]*Y:fe=O(N[0],R,Y,J)-O(0,R,Y,J),ut=Ao(A,D,O,R,Y,J,ut),Lt=ut-fe+G}else ut=Ao(A,D,O,R,Y,J,ut),Lt=ut*l+G,fe=ut-Lt;Lt<1&&(Lt=0),Te>=fe/2&&(Te=0),Lt<5&&(Q=Io);let js=Lt>0,fi=ut-Lt-(js?Te:0);fe=Q(yr(fi,ae,U)),Ae=(M==0?fe/2:M==Se?0:fe)-M*Se*((M==0?G/2:0)+(js?Te/2:0));let it={stroke:null,fill:null,clip:null,band:null,gaps:null,flags:0},Oi=Nt?null:new Path2D,Zt=null;if(ne!=null)Zt=_.data[ne.series[1]];else{let{y0:N,y1:ye}=u;N!=null&&ye!=null&&(D=ye.values(_,w,x,k),Zt=N.values(_,w,x,k))}let hi=B*fe,ee=ct*fe;for(let N=Se==1?x:k;N>=x&&N<=k;N+=Se){let ye=D[N];if(ye==null)continue;if(Zt!=null){let pt=Zt[N]??0;if(ye-pt==0)continue;tt=te(pt,F,z,ie)}let He=R.distr!=2||u!=null?A[N]:N,Ni=O(He,R,Y,J),gi=te(de(ye,De),F,z,ie),jt=Q(Ni-Ae),bi=Q(ot(gi,tt)),mt=Q(qt(gi,tt)),wt=bi-mt;if(ye!=null){let pt=ye<0?ee:hi,Rt=ye<0?hi:ee;Nt?(Te>0&&ni[N]!=null&&ce(Hi.get(ni[N]),jt,mt+vt(Te/2),fe,ot(0,wt-Te),pt,Rt),Yt[N]!=null&&ce(_t.get(Yt[N]),jt,mt+vt(Te/2),fe,ot(0,wt-Te),pt,Rt)):ce(Oi,jt,mt+vt(Te/2),fe,ot(0,wt-Te),pt,Rt),ge(_,w,N,jt-Te/2,mt,fe+Te,wt)}}return Te>0?it.stroke=Nt?Hi:Oi:Nt||(it._fill=C.width==0?C._fill:C._stroke??C._fill,it.width=0),it.fill=Nt?_t:Oi,it})}function rd(s,i){let e=de(i?.alignGaps,0);return(t,n,r,l)=>zi(t,n,(o,p,u,g,d,h,_,w,x,k,C)=>{[r,l]=xn(u,r,l);let A=o.pxRound,D=B=>A(h(B,g,k,w)),R=B=>A(_(B,d,C,x)),F,O,te;g.ori==0?(F=kn,te=hs,O=ll):(F=Sn,te=gs,O=cl);let J=g.dir*(g.ori==0?1:-1),ie=D(p[J==1?r:l]),Y=ie,z=[],Q=[];for(let B=J==1?r:l;B>=r&&B<=l;B+=J)if(u[B]!=null){let Se=p[B],ce=D(Se);z.push(Y=ce),Q.push(R(u[B]))}let M={stroke:s(z,Q,F,te,O,A),fill:null,clip:null,band:null,gaps:null,flags:ms},G=M.stroke,[U,ae]=Dr(t,n);if(o.fill!=null||U!=0){let B=M.fill=new Path2D(G),ct=o.fillTo(t,n,o.min,o.max,U),Se=R(ct);te(B,Y,Se),te(B,ie,Se)}if(!o.spanGaps){let B=[];B.push(...Hr(p,u,r,l,J,D,e)),M.gaps=B=o.gaps(t,n,r,l,B),M.clip=$n(B,g.ori,w,x,k,C)}return ae!=0&&(M.band=ae==2?[ti(t,n,r,l,G,-1),ti(t,n,r,l,G,1)]:ti(t,n,r,l,G,ae)),M})}function ad(s){return rd(od,s)}function od(s,i,e,t,n,r){let l=s.length;if(l<2)return null;let o=new Path2D;if(e(o,s[0],i[0]),l==2)t(o,s[1],i[1]);else{let p=Array(l),u=Array(l-1),g=Array(l-1),d=Array(l-1);for(let h=0;h<l-1;h++)g[h]=i[h+1]-i[h],d[h]=s[h+1]-s[h],u[h]=g[h]/d[h];p[0]=u[0];for(let h=1;h<l-1;h++)u[h]===0||u[h-1]===0||u[h-1]>0!=u[h]>0?p[h]=0:(p[h]=3*(d[h-1]+d[h])/((2*d[h]+d[h-1])/u[h-1]+(d[h]+2*d[h-1])/u[h]),isFinite(p[h])||(p[h]=0));p[l-1]=u[l-2];for(let h=0;h<l-1;h++)n(o,s[h]+d[h]/3,i[h]+p[h]*d[h]/3,s[h+1]-d[h]/3,i[h+1]-p[h+1]*d[h]/3,s[h+1],i[h+1])}return o}var kr=new Set;function Co(){for(let s of kr)s.syncRect(!0)}fs&&(Li(Nc,cs,Co),Li(jc,cs,Co,!0),Li(gn,cs,()=>{Ge.pxRatio=me}));var ld=ul(),cd=pl();function To(s,i,e,t){return(t?[s[0],s[1]].concat(s.slice(2)):[s[0]].concat(s.slice(1))).map((r,l)=>Sr(r,l,i,e))}function pd(s,i){return s.map((e,t)=>t==0?{}:Fe({},i,e))}function Sr(s,i,e,t){return Fe({},i==0?e:t,s)}function ml(s,i,e){return i==null?ds:[i,e]}var dd=ml;function ud(s,i,e){return i==null?ds:bn(i,e,Mr,!0)}function fl(s,i,e,t){return i==null?ds:yn(i,e,s.scales[t].log,!1)}var md=fl;function hl(s,i,e,t){return i==null?ds:Pr(i,e,s.scales[t].log,!1)}var fd=hl;function hd(s,i,e,t,n){let r=ot(ro(s),ro(i)),l=i-s,o=Ht(n/t*l,e);do{let p=e[o],u=t*p/l;if(u>=n&&r+(p<5?ui.get(p):0)<=17)return[p,u]}while(++o<e.length);return[0,0]}function Po(s){let i,e;return s=s.replace(/(\d+)px/,(t,n)=>(i=qe((e=+n)*me))+"px"),[s,i,e]}function gd(s){s.show&&[s.font,s.labelFont].forEach(i=>{let e=xe(i[2]*me,1);i[0]=i[0].replace(/[0-9.]+px/,e+"px"),i[1]=e})}function Ge(s,i,e){let t={mode:de(s.mode,1)},n=t.mode;function r(a,c,m,f){let b=c.valToPct(a);return f+m*(c.dir==-1?1-b:b)}function l(a,c,m,f){let b=c.valToPct(a);return f+m*(c.dir==-1?b:1-b)}function o(a,c,m,f){return c.ori==0?r(a,c,m,f):l(a,c,m,f)}t.valToPosH=r,t.valToPosV=l;let p=!1;t.status=0;let u=t.root=Tt($c);if(s.id!=null&&(u.id=s.id),bt(u,s.class),s.title){let a=Tt(Ac,u);a.textContent=s.title}let g=Dt("canvas"),d=t.ctx=g.getContext("2d"),h=Tt(Cc,u);Li("click",h,a=>{a.target===w&&(_e!=Qi||Ce!=Xi)&&Ye.click(t,a)},!0);let _=t.under=Tt(Tc,h);h.appendChild(g);let w=t.over=Tt(Pc,h);s=us(s);let x=+de(s.pxAlign,1),k=So(x);(s.plugins||[]).forEach(a=>{a.opts&&(s=a.opts(t,s)||s)});let C=s.ms||.001,A=t.series=n==1?To(s.series||[],vo,$o,!1):pd(s.series||[null],wo),D=t.axes=To(s.axes||[],bo,yo,!0),R=t.scales={},F=t.bands=s.bands||[];F.forEach(a=>{a.fill=le(a.fill||null),a.dir=de(a.dir,-1)});let O=n==2?A[1].facets[0].scale:A[0].scale,te={axes:Ul,series:Hl},J=(s.drawOrder||["axes","series"]).map(a=>te[a]);function ie(a){let c=a.distr==3?m=>ei(m>0?m:a.clamp(t,m,a.min,a.max,a.key)):a.distr==4?m=>ur(m,a.asinh):a.distr==100?m=>a.fwd(m):m=>m;return m=>{let f=c(m),{_min:b,_max:y}=a,$=y-b;return(f-b)/$}}function Y(a){let c=R[a];if(c==null){let m=(s.scales||Os)[a]||Os;if(m.from!=null){Y(m.from);let f=Fe({},R[m.from],m,{key:a});f.valToPct=ie(f),R[a]=f}else{c=R[a]=Fe({},a==O?sl:Qp,m),c.key=a;let f=c.time,b=c.range,y=di(b);if((a!=O||n==2&&!f)&&(y&&(b[0]==null||b[1]==null)&&(b={min:b[0]==null?io:{mode:1,hard:b[0],soft:b[0]},max:b[1]==null?io:{mode:1,hard:b[1],soft:b[1]}},y=!1),!y&&wn(b))){let $=b;b=(T,L,H)=>L==null?ds:bn(L,H,$)}c.range=le(b||(f?dd:a==O?c.distr==3?md:c.distr==4?fd:ml:c.distr==3?fl:c.distr==4?hl:ud)),c.auto=le(y?!1:c.auto),c.clamp=le(c.clamp||Jp),c._min=c._max=null,c.valToPct=ie(c)}}}Y("x"),Y("y"),n==1&&A.forEach(a=>{Y(a.scale)}),D.forEach(a=>{Y(a.scale)});for(let a in s.scales)Y(a);let z=R[O],Q=z.distr,M,G;z.ori==0?(bt(u,kc),M=r,G=l):(bt(u,Sc),M=l,G=r);let U={};for(let a in R){let c=R[a];(c.min!=null||c.max!=null)&&(U[a]={min:c.min,max:c.max},c.min=c.max=null)}let ae=s.tzDate||(a=>new Date(qe(a/C))),B=s.fmtDate||Rr,ct=C==1?kp(ae):Cp(ae),Se=fo(ae,mo(C==1?$p:Ap,B)),ce=go(ae,ho(Pp,B)),ge=[],ne=t.legend=Fe({},Lp,s.legend),V=t.cursor=Fe({},Hp,{drag:{y:n==2}},s.cursor),De=ne.show,tt=V.show,Ae=ne.markers;ne.idxs=ge,Ae.width=le(Ae.width),Ae.dash=le(Ae.dash),Ae.stroke=le(Ae.stroke),Ae.fill=le(Ae.fill);let fe,Lt,ut,Te=[],Nt=[],Yt,_t=!1,ni={};if(ne.live){let a=A[1]?A[1].values:null;_t=a!=null,Yt=_t?a(t,1,0):{_:0};for(let c in Yt)ni[c]=Cr}if(De)if(fe=Dt("table",Ic,u),ut=Dt("tbody",null,fe),ne.mount(t,fe),_t){Lt=Dt("thead",null,fe,ut);let a=Dt("tr",null,Lt);Dt("th",null,a);for(var Hi in Yt)Dt("th",Ua,a).textContent=Hi}else bt(fe,Dc),ne.live&&bt(fe,Fc);let qi={show:!0},xs={show:!1};function js(a,c){if(c==0&&(_t||!ne.live||n==2))return ds;let m=[],f=Dt("tr",Hc,ut,ut.childNodes[c]);bt(f,a.class),a.show||bt(f,Ei);let b=Dt("th",null,f);if(Ae.show){let T=Tt(qc,b);if(c>0){let L=Ae.width(t,c);L&&(T.style.border=L+"px "+Ae.dash(t,c)+" "+Ae.stroke(t,c)),T.style.background=Ae.fill(t,c)}}let y=Tt(Ua,b);a.label instanceof HTMLElement?y.appendChild(a.label):y.textContent=a.label,c>0&&(Ae.show||(y.style.color=a.width>0?Ae.stroke(t,c):Ae.fill(t,c)),it("click",b,T=>{if(V._lock)return;xi(T);let L=A.indexOf(a);if((T.ctrlKey||T.metaKey)!=ne.isolate){let H=A.some((q,j)=>j>0&&j!=L&&q.show);A.forEach((q,j)=>{j>0&&Bt(j,H?j==L?qi:xs:qi,!0,ze.setSeries)})}else Bt(L,{show:!a.show},!0,ze.setSeries)},!1),Ui&&it(Ga,b,T=>{V._lock||(xi(T),Bt(A.indexOf(a),ts,!0,ze.setSeries))},!1));for(var $ in Yt){let T=Dt("td",Oc,f);T.textContent="--",m.push(T)}return[f,m]}let fi=new Map;function it(a,c,m,f=!0){let b=fi.get(c)||{},y=V.bind[a](t,c,m,f);y&&(Li(a,c,b[a]=y),fi.set(c,b))}function Oi(a,c,m){let f=fi.get(c)||{};for(let b in f)(a==null||b==a)&&(xr(b,c,f[b]),delete f[b]);a==null&&fi.delete(c)}let Zt=0,hi=0,ee=0,N=0,ye=0,He=0,Ni=ye,gi=He,jt=ee,bi=N,mt=0,wt=0,pt=0,Rt=0;t.bbox={};let Mn=!1,Us=!1,ji=!1,vi=!1,Bs=!1,$t=!1;function En(a,c,m){(m||a!=t.width||c!=t.height)&&Ur(a,c),Ki(!1),ji=!0,Us=!0,Yi()}function Ur(a,c){t.width=Zt=ee=a,t.height=hi=N=c,ye=He=0,El(),Ll();let m=t.bbox;mt=m.left=Pi(ye*me,.5),wt=m.top=Pi(He*me,.5),pt=m.width=Pi(ee*me,.5),Rt=m.height=Pi(N*me,.5)}let Tl=3;function Pl(){let a=!1,c=0;for(;!a;){c++;let m=Nl(c),f=jl(c);a=c==Tl||m&&f,a||(Ur(t.width,t.height),Us=!0)}}function Ml({width:a,height:c}){En(a,c)}t.setSize=Ml;function El(){let a=!1,c=!1,m=!1,f=!1;D.forEach((b,y)=>{if(b.show&&b._show){let{side:$,_size:T}=b,L=$%2,H=b.label!=null?b.labelSize:0,q=T+H;q>0&&(L?(ee-=q,$==3?(ye+=q,f=!0):m=!0):(N-=q,$==0?(He+=q,a=!0):c=!0))}}),yi[0]=a,yi[1]=m,yi[2]=c,yi[3]=f,ee-=ri[1]+ri[3],ye+=ri[3],N-=ri[2]+ri[0],He+=ri[0]}function Ll(){let a=ye+ee,c=He+N,m=ye,f=He;function b(y,$){switch(y){case 1:return a+=$,a-$;case 2:return c+=$,c-$;case 3:return m-=$,m+$;case 0:return f-=$,f+$}}D.forEach((y,$)=>{if(y.show&&y._show){let T=y.side;y._pos=b(T,y._size),y.label!=null&&(y._lpos=b(T,y.labelSize))}})}if(V.dataIdx==null){let a=V.hover,c=a.skip=new Set(a.skip??[]);c.add(void 0);let m=a.prox=le(a.prox),f=a.bias??=0;V.dataIdx=(b,y,$,T)=>{if(y==0)return $;let L=$,H=m(b,y,$,T)??ve,q=H>=0&&H<ve,j=z.ori==0?ee:N,Z=V.left,ue=i[0],pe=i[y];if(c.has(pe[$])){L=null;let oe=null,K=null,W;if(f==0||f==-1)for(W=$;oe==null&&W-- >0;)c.has(pe[W])||(oe=W);if(f==0||f==1)for(W=$;K==null&&W++<pe.length;)c.has(pe[W])||(K=W);if(oe!=null||K!=null)if(q){let $e=oe==null?-1/0:M(ue[oe],z,j,0),Pe=K==null?1/0:M(ue[K],z,j,0),We=Z-$e,be=Pe-Z;We<=be?We<=H&&(L=oe):be<=H&&(L=K)}else L=K==null?oe:oe==null?K:$-oe<=K-$?oe:K}else q&&Oe(Z-M(ue[$],z,j,0))>H&&(L=null);return L}}let xi=a=>{V.event=a};V.idxs=ge,V._lock=!1;let Qe=V.points;Qe.show=le(Qe.show),Qe.size=le(Qe.size),Qe.stroke=le(Qe.stroke),Qe.width=le(Qe.width),Qe.fill=le(Qe.fill);let Ut=t.focus=Fe({},s.focus||{alpha:.3},V.focus),Ui=Ut.prox>=0,Bi=Ui&&Qe.one,kt=[],Vi=[],Wi=[];function Br(a,c){let m=Qe.show(t,c);if(m instanceof HTMLElement)return bt(m,zc),bt(m,a.class),Kt(m,-10,-10,ee,N),w.insertBefore(m,kt[c]),m}function Vr(a,c){if(n==1||c>0){let m=n==1&&R[a.scale].time,f=a.value;a.value=m?lo(f)?go(ae,ho(f,B)):f||ce:f||Kp,a.label=a.label||(m?Op:qp)}if(Bi||c>0){a.width=a.width==null?1:a.width,a.paths=a.paths||ld||Qc,a.fillTo=le(a.fillTo||Xp),a.pxAlign=+de(a.pxAlign,x),a.pxRound=So(a.pxAlign),a.stroke=le(a.stroke||null),a.fill=le(a.fill||null),a._stroke=a._fill=a._paths=a._focus=null;let m=Yp(ot(1,a.width),1),f=a.points=Fe({},{size:m,width:ot(1,m*.2),stroke:a.stroke,space:m*2,paths:cd,_stroke:null,_fill:null},a.points);f.show=le(f.show),f.filter=le(f.filter),f.fill=le(f.fill),f.stroke=le(f.stroke),f.paths=le(f.paths),f.pxAlign=a.pxAlign}if(De){let m=js(a,c);Te.splice(c,0,m[0]),Nt.splice(c,0,m[1]),ne.values.push(null)}if(tt){ge.splice(c,0,null);let m=null;Bi?c==0&&(m=Br(a,c)):c>0&&(m=Br(a,c)),kt.splice(c,0,m),Vi.splice(c,0,0),Wi.splice(c,0,0)}Ve("addSeries",c)}function Rl(a,c){c=c??A.length,a=n==1?Sr(a,c,vo,$o):Sr(a,c,{},wo),A.splice(c,0,a),Vr(A[c],c)}t.addSeries=Rl;function zl(a){if(A.splice(a,1),De){ne.values.splice(a,1),Nt.splice(a,1);let c=Te.splice(a,1)[0];Oi(null,c.firstChild),c.remove()}tt&&(ge.splice(a,1),kt.splice(a,1)[0].remove(),Vi.splice(a,1),Wi.splice(a,1)),Ve("delSeries",a)}t.delSeries=zl;let yi=[!1,!1,!1,!1];function Il(a,c){if(a._show=a.show,a.show){let m=a.side%2,f=R[a.scale];f==null&&(a.scale=m?A[1].scale:O,f=R[a.scale]);let b=f.time;a.size=le(a.size),a.space=le(a.space),a.rotate=le(a.rotate),di(a.incrs)&&a.incrs.forEach($=>{!ui.has($)&&ui.set($,Ho($))}),a.incrs=le(a.incrs||(f.distr==2?yp:b?C==1?wp:Sp:Mi)),a.splits=le(a.splits||(b&&f.distr==1?ct:f.distr==3?_r:f.distr==4?Up:jp)),a.stroke=le(a.stroke),a.grid.stroke=le(a.grid.stroke),a.ticks.stroke=le(a.ticks.stroke),a.border.stroke=le(a.border.stroke);let y=a.values;a.values=di(y)&&!di(y[0])?le(y):b?di(y)?fo(ae,mo(y,B)):lo(y)?Tp(ae,y):y||Se:y||Np,a.filter=le(a.filter||(f.distr>=3&&f.log==10?Wp:f.distr==3&&f.log==2?Gp:Fo)),a.font=Po(a.font),a.labelFont=Po(a.labelFont),a._size=a.size(t,null,c,0),a._space=a._rotate=a._incrs=a._found=a._splits=a._values=null,a._size>0&&(yi[c]=!0,a._el=Tt(Mc,h))}}function ys(a,c,m,f){let[b,y,$,T]=m,L=c%2,H=0;return L==0&&(T||y)&&(H=c==0&&!b||c==2&&!$?qe(bo.size/3):0),L==1&&(b||$)&&(H=c==1&&!y||c==3&&!T?qe(yo.size/2):0),H}let Wr=t.padding=(s.padding||[ys,ys,ys,ys]).map(a=>le(de(a,ys))),ri=t._padding=Wr.map((a,c)=>a(t,c,yi,0)),Ke,Ne=null,je=null,Vs=n==1?A[0].idxs:null,zt=null,_s=!1;function Gr(a,c){if(i=a??[],t.data=t._data=i,n==2){Ke=0;for(let m=1;m<A.length;m++)Ke+=i[m][0].length}else{i.length==0&&(t.data=t._data=i=[[]]),zt=i[0],Ke=zt.length;let m=i;if(Q==2){m=i.slice();let f=m[0]=Array(Ke);for(let b=0;b<Ke;b++)f[b]=b}t._data=i=m}if(Ki(!0),Ve("setData"),Q==2&&(ji=!0),c!==!1){let m=z;m.auto(t,_s)?Ln():oi(O,m.min,m.max),vi=vi||V.left>=0,$t=!0,Yi()}}t.setData=Gr;function Ln(){_s=!0;let a,c;n==1&&(Ke>0?(Ne=Vs[0]=0,je=Vs[1]=Ke-1,a=i[0][Ne],c=i[0][je],Q==2?(a=Ne,c=je):a==c&&(Q==3?[a,c]=yn(a,a,z.log,!1):Q==4?[a,c]=Pr(a,a,z.log,!1):z.time?c=a+qe(86400/C):[a,c]=bn(a,c,Mr,!0))):(Ne=Vs[0]=a=null,je=Vs[1]=c=null)),oi(O,a,c)}let Ws,Gi,Rn,zn,In,Fn,Dn,Hn,qn,dt;function Kr(a,c,m,f,b,y){a??=Va,m??=Lr,f??="butt",b??=Va,y??="round",a!=Ws&&(d.strokeStyle=Ws=a),b!=Gi&&(d.fillStyle=Gi=b),c!=Rn&&(d.lineWidth=Rn=c),y!=In&&(d.lineJoin=In=y),f!=Fn&&(d.lineCap=Fn=f),m!=zn&&d.setLineDash(zn=m)}function Yr(a,c,m,f){c!=Gi&&(d.fillStyle=Gi=c),a!=Dn&&(d.font=Dn=a),m!=Hn&&(d.textAlign=Hn=m),f!=qn&&(d.textBaseline=qn=f)}function On(a,c,m,f,b=0){if(f.length>0&&a.auto(t,_s)&&(c==null||c.min==null)){let y=de(Ne,0),$=de(je,f.length-1),T=m.min==null?Wc(f,y,$,b,a.distr==3):[m.min,m.max];a.min=qt(a.min,m.min=T[0]),a.max=ot(a.max,m.max=T[1])}}let Zr={min:null,max:null};function Fl(){for(let f in R){let b=R[f];U[f]==null&&(b.min==null||U[O]!=null&&b.auto(t,_s))&&(U[f]=Zr)}for(let f in R){let b=R[f];U[f]==null&&b.from!=null&&U[b.from]!=null&&(U[f]=Zr)}U[O]!=null&&Ki(!0);let a={};for(let f in U){let b=U[f];if(b!=null){let y=a[f]=us(R[f],tp);if(b.min!=null)Fe(y,b);else if(f!=O||n==2)if(Ke==0&&y.from==null){let $=y.range(t,null,null,f);y.min=$[0],y.max=$[1]}else y.min=ve,y.max=-ve}}if(Ke>0){A.forEach((f,b)=>{if(n==1){let y=f.scale,$=U[y];if($==null)return;let T=a[y];if(b==0){let L=T.range(t,T.min,T.max,y);T.min=L[0],T.max=L[1],Ne=Ht(T.min,i[0]),je=Ht(T.max,i[0]),je-Ne>1&&(i[0][Ne]<T.min&&Ne++,i[0][je]>T.max&&je--),f.min=zt[Ne],f.max=zt[je]}else f.show&&f.auto&&On(T,$,f,i[b],f.sorted);f.idxs[0]=Ne,f.idxs[1]=je}else if(b>0&&f.show&&f.auto){let[y,$]=f.facets,T=y.scale,L=$.scale,[H,q]=i[b],j=a[T],Z=a[L];j!=null&&On(j,U[T],y,H,y.sorted),Z!=null&&On(Z,U[L],$,q,$.sorted),f.min=$.min,f.max=$.max}});for(let f in a){let b=a[f],y=U[f];if(b.from==null&&(y==null||y.min==null)){let $=b.range(t,b.min==ve?null:b.min,b.max==-ve?null:b.max,f);b.min=$[0],b.max=$[1]}}}for(let f in a){let b=a[f];if(b.from!=null){let y=a[b.from];if(y.min==null)b.min=b.max=null;else{let $=b.range(t,y.min,y.max,f);b.min=$[0],b.max=$[1]}}}let c={},m=!1;for(let f in a){let b=a[f],y=R[f];if(y.min!=b.min||y.max!=b.max){y.min=b.min,y.max=b.max;let $=y.distr;y._min=$==3?ei(y.min):$==4?ur(y.min,y.asinh):$==100?y.fwd(y.min):y.min,y._max=$==3?ei(y.max):$==4?ur(y.max,y.asinh):$==100?y.fwd(y.max):y.max,c[f]=m=!0}}if(m){A.forEach((f,b)=>{n==2?b>0&&c.y&&(f._paths=null):c[f.scale]&&(f._paths=null)});for(let f in c)ji=!0,Ve("setScale",f);tt&&V.left>=0&&(vi=$t=!0)}for(let f in U)U[f]=null}function Dl(a){let c=yr(Ne-1,0,Ke-1),m=yr(je+1,0,Ke-1);for(;a[c]==null&&c>0;)c--;for(;a[m]==null&&m<Ke-1;)m++;return[c,m]}function Hl(){if(Ke>0){let a=A.some(c=>c._focus)&&dt!=Ut.alpha;a&&(d.globalAlpha=dt=Ut.alpha),A.forEach((c,m)=>{if(m>0&&c.show&&(Jr(m,!1),Jr(m,!0),c._paths==null)){let f=dt;dt!=c.alpha&&(d.globalAlpha=dt=c.alpha);let b=n==2?[0,i[m][0].length-1]:Dl(i[m]);c._paths=c.paths(t,m,b[0],b[1]),dt!=f&&(d.globalAlpha=dt=f)}}),A.forEach((c,m)=>{if(m>0&&c.show){let f=dt;dt!=c.alpha&&(d.globalAlpha=dt=c.alpha),c._paths!=null&&Qr(m,!1);{let b=c._paths!=null?c._paths.gaps:null,y=c.points.show(t,m,Ne,je,b),$=c.points.filter(t,m,y,b);(y||$)&&(c.points._paths=c.points.paths(t,m,Ne,je,$),Qr(m,!0))}dt!=f&&(d.globalAlpha=dt=f),Ve("drawSeries",m)}}),a&&(d.globalAlpha=dt=1)}}function Jr(a,c){let m=c?A[a].points:A[a];m._stroke=m.stroke(t,a),m._fill=m.fill(t,a)}function Qr(a,c){let m=c?A[a].points:A[a],{stroke:f,fill:b,clip:y,flags:$,_stroke:T=m._stroke,_fill:L=m._fill,_width:H=m.width}=m._paths;H=xe(H*me,3);let q=null,j=H%2/2;c&&L==null&&(L=H>0?"#fff":T);let Z=m.pxAlign==1&&j>0;if(Z&&d.translate(j,j),!c){let ue=mt-H/2,pe=wt-H/2,oe=pt+H,K=Rt+H;q=new Path2D,q.rect(ue,pe,oe,K)}c?Nn(T,H,m.dash,m.cap,L,f,b,$,y):ql(a,T,H,m.dash,m.cap,L,f,b,$,q,y),Z&&d.translate(-j,-j)}function ql(a,c,m,f,b,y,$,T,L,H,q){let j=!1;L!=0&&F.forEach((Z,ue)=>{if(Z.series[0]==a){let pe=A[Z.series[1]],oe=i[Z.series[1]],K=(pe._paths||Os).band;di(K)&&(K=Z.dir==1?K[0]:K[1]);let W,$e=null;pe.show&&K&&Kc(oe,Ne,je)?($e=Z.fill(t,ue)||y,W=pe._paths.clip):K=null,Nn(c,m,f,b,$e,$,T,L,H,q,W,K),j=!0}}),j||Nn(c,m,f,b,y,$,T,L,H,q)}let Xr=ms|$r;function Nn(a,c,m,f,b,y,$,T,L,H,q,j){Kr(a,c,m,f,b),(L||H||j)&&(d.save(),L&&d.clip(L),H&&d.clip(H)),j?(T&Xr)==Xr?(d.clip(j),q&&d.clip(q),Ks(b,$),Gs(a,y,c)):T&$r?(Ks(b,$),d.clip(j),Gs(a,y,c)):T&ms&&(d.save(),d.clip(j),q&&d.clip(q),Ks(b,$),d.restore(),Gs(a,y,c)):(Ks(b,$),Gs(a,y,c)),(L||H||j)&&d.restore()}function Gs(a,c,m){m>0&&(c instanceof Map?c.forEach((f,b)=>{d.strokeStyle=Ws=b,d.stroke(f)}):c!=null&&a&&d.stroke(c))}function Ks(a,c){c instanceof Map?c.forEach((m,f)=>{d.fillStyle=Gi=f,d.fill(m)}):c!=null&&a&&d.fill(c)}function Ol(a,c,m,f){let b=D[a],y;if(f<=0)y=[0,0];else{let $=b._space=b.space(t,a,c,m,f),T=b._incrs=b.incrs(t,a,c,m,f,$);y=hd(c,m,T,f,$)}return b._found=y}function jn(a,c,m,f,b,y,$,T,L,H){let q=$%2/2;x==1&&d.translate(q,q),Kr(T,$,L,H,T),d.beginPath();let j,Z,ue,pe,oe=b+(f==0||f==3?-y:y);m==0?(Z=b,pe=oe):(j=b,ue=oe);for(let K=0;K<a.length;K++)c[K]!=null&&(m==0?j=ue=a[K]:Z=pe=a[K],d.moveTo(j,Z),d.lineTo(ue,pe));d.stroke(),x==1&&d.translate(-q,-q)}function Nl(a){let c=!0;return D.forEach((m,f)=>{if(!m.show)return;let b=R[m.scale];if(b.min==null){m._show&&(c=!1,m._show=!1,Ki(!1));return}else m._show||(c=!1,m._show=!0,Ki(!1));let y=m.side,$=y%2,{min:T,max:L}=b,[H,q]=Ol(f,T,L,$==0?ee:N);if(q==0)return;let j=b.distr==2,Z=m._splits=m.splits(t,f,T,L,H,q,j),ue=b.distr==2?Z.map(W=>zt[W]):Z,pe=b.distr==2?zt[Z[1]]-zt[Z[0]]:H,oe=m._values=m.values(t,m.filter(t,ue,f,q,pe),f,q,pe);m._rotate=y==2?m.rotate(t,oe,f,q):0;let K=m._size;m._size=Pt(m.size(t,oe,f,a)),K!=null&&m._size!=K&&(c=!1)}),c}function jl(a){let c=!0;return Wr.forEach((m,f)=>{let b=m(t,f,yi,a);b!=ri[f]&&(c=!1),ri[f]=b}),c}function Ul(){for(let a=0;a<D.length;a++){let c=D[a];if(!c.show||!c._show)continue;let m=c.side,f=m%2,b,y,$=c.stroke(t,a),T=m==0||m==3?-1:1,[L,H]=c._found;if(c.label!=null){let nt=c.labelGap*T,gt=qe((c._lpos+nt)*me);Yr(c.labelFont[0],$,"center",m==2?"top":Ba),d.save(),f==1?(b=y=0,d.translate(gt,qe(wt+Rt/2)),d.rotate((m==3?-hn:hn)/2)):(b=qe(mt+pt/2),y=gt);let $i=zo(c.label)?c.label(t,a,L,H):c.label;d.fillText($i,b,y),d.restore()}if(H==0)continue;let q=R[c.scale],j=f==0?pt:Rt,Z=f==0?mt:wt,ue=c._splits,pe=q.distr==2?ue.map(nt=>zt[nt]):ue,oe=q.distr==2?zt[ue[1]]-zt[ue[0]]:L,K=c.ticks,W=c.border,$e=K.show?K.size:0,Pe=qe($e*me),We=qe((c.alignTo==2?c._size-$e-c.gap:c.gap)*me),be=c._rotate*-hn/180,Me=k(c._pos*me),ft=(Pe+We)*T,st=Me+ft;y=f==0?st:0,b=f==1?st:0;let St=c.font[0],It=c.align==1?os:c.align==2?cr:be>0?os:be<0?cr:f==0?"center":m==3?cr:os,Wt=be||f==1?"middle":m==2?"top":Ba;Yr(St,$,It,Wt);let ht=c.font[1]*c.lineGap,At=ue.map(nt=>k(o(nt,q,j,Z))),Ft=c._values;for(let nt=0;nt<Ft.length;nt++){let gt=Ft[nt];if(gt!=null){f==0?b=At[nt]:y=At[nt],gt=""+gt;let $i=gt.indexOf(`
`)==-1?[gt]:gt.split(/\n/gm);for(let rt=0;rt<$i.length;rt++){let va=$i[rt];be?(d.save(),d.translate(b,y+rt*ht),d.rotate(be),d.fillText(va,0,0),d.restore()):d.fillText(va,b,y+rt*ht)}}}K.show&&jn(At,K.filter(t,pe,a,H,oe),f,m,Me,Pe,xe(K.width*me,3),K.stroke(t,a),K.dash,K.cap);let Gt=c.grid;Gt.show&&jn(At,Gt.filter(t,pe,a,H,oe),f,f==0?2:1,f==0?wt:mt,f==0?Rt:pt,xe(Gt.width*me,3),Gt.stroke(t,a),Gt.dash,Gt.cap),W.show&&jn([Me],[1],f==0?1:0,f==0?1:2,f==1?wt:mt,f==1?Rt:pt,xe(W.width*me,3),W.stroke(t,a),W.dash,W.cap)}Ve("drawAxes")}function Ki(a){A.forEach((c,m)=>{m>0&&(c._paths=null,a&&(n==1?(c.min=null,c.max=null):c.facets.forEach(f=>{f.min=null,f.max=null})))})}let Ys=!1,Un=!1,ws=[];function Bl(){Un=!1;for(let a=0;a<ws.length;a++)Ve(...ws[a]);ws.length=0}function Yi(){Ys||(lp(ea),Ys=!0)}function Vl(a,c=!1){Ys=!0,Un=c,a(t),ea(),c&&ws.length>0&&queueMicrotask(Bl)}t.batch=Vl;function ea(){if(Mn&&(Fl(),Mn=!1),ji&&(Pl(),ji=!1),Us){if(ke(_,os,ye),ke(_,"top",He),ke(_,Fs,ee),ke(_,Ds,N),ke(w,os,ye),ke(w,"top",He),ke(w,Fs,ee),ke(w,Ds,N),ke(h,Fs,Zt),ke(h,Ds,hi),g.width=qe(Zt*me),g.height=qe(hi*me),D.forEach(({_el:a,_show:c,_size:m,_pos:f,side:b})=>{if(a!=null)if(c){let y=b===3||b===0?m:0,$=b%2==1;ke(a,$?"left":"top",f-y),ke(a,$?"width":"height",m),ke(a,$?"top":"left",$?He:ye),ke(a,$?"height":"width",$?N:ee),vr(a,Ei)}else bt(a,Ei)}),Ws=Gi=Rn=In=Fn=Dn=Hn=qn=zn=null,dt=1,Ss(!0),ye!=Ni||He!=gi||ee!=jt||N!=bi){Ki(!1);let a=ee/jt,c=N/bi;if(tt&&!vi&&V.left>=0){V.left*=a,V.top*=c,Zi&&Kt(Zi,qe(V.left),0,ee,N),Ji&&Kt(Ji,0,qe(V.top),ee,N);for(let m=0;m<kt.length;m++){let f=kt[m];f!=null&&(Vi[m]*=a,Wi[m]*=c,Kt(f,Pt(Vi[m]),Pt(Wi[m]),ee,N))}}if(we.show&&!Bs&&we.left>=0&&we.width>0){we.left*=a,we.width*=a,we.top*=c,we.height*=c;for(let m in Yn)ke(es,m,we[m])}Ni=ye,gi=He,jt=ee,bi=N}Ve("setSize"),Us=!1}Zt>0&&hi>0&&(d.clearRect(0,0,g.width,g.height),Ve("drawClear"),J.forEach(a=>a()),Ve("draw")),we.show&&Bs&&(Zs(we),Bs=!1),tt&&vi&&(wi(null,!0,!1),vi=!1),ne.show&&ne.live&&$t&&(Gn(),$t=!1),p||(p=!0,t.status=1,Ve("ready")),_s=!1,Ys=!1}t.redraw=(a,c)=>{ji=c||!1,a!==!1?oi(O,z.min,z.max):Yi()};function Bn(a,c){let m=R[a];if(m.from==null){if(Ke==0){let f=m.range(t,c.min,c.max,a);c.min=f[0],c.max=f[1]}if(c.min>c.max){let f=c.min;c.min=c.max,c.max=f}if(Ke>1&&c.min!=null&&c.max!=null&&c.max-c.min<1e-16)return;a==O&&m.distr==2&&Ke>0&&(c.min=Ht(c.min,i[0]),c.max=Ht(c.max,i[0]),c.min==c.max&&c.max++),U[a]=c,Mn=!0,Yi()}}t.setScale=Bn;let Vn,Wn,Zi,Ji,ta,ia,Qi,Xi,sa,na,_e,Ce,ai=!1,Ye=V.drag,Ue=Ye.x,Be=Ye.y;tt&&(V.x&&(Vn=Tt(Lc,w)),V.y&&(Wn=Tt(Rc,w)),z.ori==0?(Zi=Vn,Ji=Wn):(Zi=Wn,Ji=Vn),_e=V.left,Ce=V.top);let we=t.select=Fe({show:!0,over:!0,left:0,width:0,top:0,height:0},s.select),es=we.show?Tt(Ec,we.over?w:_):null;function Zs(a,c){if(we.show){for(let m in a)we[m]=a[m],m in Yn&&ke(es,m,a[m]);c!==!1&&Ve("setSelect")}}t.setSelect=Zs;function Wl(a){if(A[a].show)De&&vr(Te[a],Ei);else if(De&&bt(Te[a],Ei),tt){let m=Bi?kt[0]:kt[a];m!=null&&Kt(m,-10,-10,ee,N)}}function oi(a,c,m){Bn(a,{min:c,max:m})}function Bt(a,c,m,f){c.focus!=null&&Jl(a),c.show!=null&&A.forEach((b,y)=>{y>0&&(a==y||a==null)&&(b.show=c.show,Wl(y),n==2?(oi(b.facets[0].scale,null,null),oi(b.facets[1].scale,null,null)):oi(b.scale,null,null),Yi())}),m!==!1&&Ve("setSeries",a,c),f&&As("setSeries",t,a,c)}t.setSeries=Bt;function Gl(a,c){Fe(F[a],c)}function Kl(a,c){a.fill=le(a.fill||null),a.dir=de(a.dir,-1),c=c??F.length,F.splice(c,0,a)}function Yl(a){a==null?F.length=0:F.splice(a,1)}t.addBand=Kl,t.setBand=Gl,t.delBand=Yl;function Zl(a,c){A[a].alpha=c,tt&&kt[a]!=null&&(kt[a].style.opacity=c),De&&Te[a]&&(Te[a].style.opacity=c)}let Jt,li,_i,ts={focus:!0};function Jl(a){if(a!=_i){let c=a==null,m=Ut.alpha!=1;A.forEach((f,b)=>{if(n==1||b>0){let y=c||b==0||b==a;f._focus=c?null:y,m&&Zl(b,y?1:Ut.alpha)}}),_i=a,m&&Yi()}}De&&Ui&&it(Ka,fe,a=>{V._lock||(xi(a),_i!=null&&Bt(null,ts,!0,ze.setSeries))});function Vt(a,c,m){let f=R[c];m&&(a=a/me-(f.ori==1?He:ye));let b=ee;f.ori==1&&(b=N,a=b-a),f.dir==-1&&(a=b-a);let y=f._min,$=f._max,T=a/b,L=y+($-y)*T,H=f.distr;return H==3?ps(10,L):H==4?Zc(L,f.asinh):H==100?f.bwd(L):L}function Ql(a,c){let m=Vt(a,O,c);return Ht(m,i[0],Ne,je)}t.valToIdx=a=>Ht(a,i[0]),t.posToIdx=Ql,t.posToVal=Vt,t.valToPos=(a,c,m)=>R[c].ori==0?r(a,R[c],m?pt:ee,m?mt:0):l(a,R[c],m?Rt:N,m?wt:0),t.setCursor=(a,c,m)=>{_e=a.left,Ce=a.top,wi(null,c,m)};function ra(a,c){ke(es,os,we.left=a),ke(es,Fs,we.width=c)}function aa(a,c){ke(es,"top",we.top=a),ke(es,Ds,we.height=c)}let $s=z.ori==0?ra:aa,ks=z.ori==1?ra:aa;function Xl(){if(De&&ne.live)for(let a=n==2?1:0;a<A.length;a++){if(a==0&&_t)continue;let c=ne.values[a],m=0;for(let f in c)Nt[a][m++].firstChild.nodeValue=c[f]}}function Gn(a,c){if(a!=null&&(a.idxs?a.idxs.forEach((m,f)=>{ge[f]=m}):ep(a.idx)||ge.fill(a.idx),ne.idx=ge[0]),De&&ne.live){for(let m=0;m<A.length;m++)(m>0||n==1&&!_t)&&ec(m,ge[m]);Xl()}$t=!1,c!==!1&&Ve("setLegend")}t.setLegend=Gn;function ec(a,c){let m=A[a],f=a==0&&Q==2?zt:i[a],b;_t?b=m.values(t,a,c)??ni:(b=m.value(t,c==null?null:f[c],a,c),b=b==null?ni:{_:b}),ne.values[a]=b}function wi(a,c,m){sa=_e,na=Ce,[_e,Ce]=V.move(t,_e,Ce),V.left=_e,V.top=Ce,tt&&(Zi&&Kt(Zi,qe(_e),0,ee,N),Ji&&Kt(Ji,0,qe(Ce),ee,N));let f,b=Ne>je;Jt=ve,li=null;let y=z.ori==0?ee:N,$=z.ori==1?ee:N;if(_e<0||Ke==0||b){f=V.idx=null;for(let T=0;T<A.length;T++){let L=kt[T];L!=null&&Kt(L,-10,-10,ee,N)}Ui&&Bt(null,ts,!0,a==null&&ze.setSeries),ne.live&&(ge.fill(f),$t=!0)}else{let T,L,H;n==1&&(T=z.ori==0?_e:Ce,L=Vt(T,O),f=V.idx=Ht(L,i[0],Ne,je),H=M(i[0][f],z,y,0));let q=-10,j=-10,Z=0,ue=0,pe=!0,oe="",K="";for(let W=n==2?1:0;W<A.length;W++){let $e=A[W],Pe=ge[W],We=Pe==null?null:n==1?i[W][Pe]:i[W][1][Pe],be=V.dataIdx(t,W,f,L),Me=be==null?null:n==1?i[W][be]:i[W][1][be];if($t=$t||Me!=We||be!=Pe,ge[W]=be,W>0&&$e.show){let ft=be==null?-10:be==f?H:M(n==1?i[0][be]:i[W][0][be],z,y,0),st=Me==null?-10:G(Me,n==1?R[$e.scale]:R[$e.facets[1].scale],$,0);if(Ui&&Me!=null){let St=z.ori==1?_e:Ce,It=Oe(Ut.dist(t,W,be,st,St));if(It<Jt){let Wt=Ut.bias;if(Wt!=0){let ht=Vt(St,$e.scale),At=Me>=0?1:-1,Ft=ht>=0?1:-1;Ft==At&&(Ft==1?Wt==1?Me>=ht:Me<=ht:Wt==1?Me<=ht:Me>=ht)&&(Jt=It,li=W)}else Jt=It,li=W}}if($t||Bi){let St,It;z.ori==0?(St=ft,It=st):(St=st,It=ft);let Wt,ht,At,Ft,Gt,nt,gt=!0,$i=Qe.bbox;if($i!=null){gt=!1;let rt=$i(t,W);At=rt.left,Ft=rt.top,Wt=rt.width,ht=rt.height}else At=St,Ft=It,Wt=ht=Qe.size(t,W);if(nt=Qe.fill(t,W),Gt=Qe.stroke(t,W),Bi)W==li&&Jt<=Ut.prox&&(q=At,j=Ft,Z=Wt,ue=ht,pe=gt,oe=nt,K=Gt);else{let rt=kt[W];rt!=null&&(Vi[W]=At,Wi[W]=Ft,to(rt,Wt,ht,gt),Xa(rt,nt,Gt),Kt(rt,Pt(At),Pt(Ft),ee,N))}}}}if(Bi){let W=Ut.prox,$e=_i==null?Jt<=W:Jt>W||li!=_i;if($t||$e){let Pe=kt[0];Pe!=null&&(Vi[0]=q,Wi[0]=j,to(Pe,Z,ue,pe),Xa(Pe,oe,K),Kt(Pe,Pt(q),Pt(j),ee,N))}}}if(we.show&&ai)if(a!=null){let[T,L]=ze.scales,[H,q]=ze.match,[j,Z]=a.cursor.sync.scales,ue=a.cursor.drag;if(Ue=ue._x,Be=ue._y,Ue||Be){let{left:pe,top:oe,width:K,height:W}=a.select,$e=a.scales[j].ori,Pe=a.posToVal,We,be,Me,ft,st,St=T!=null&&H(T,j),It=L!=null&&q(L,Z);St&&Ue?($e==0?(We=pe,be=K):(We=oe,be=W),Me=R[T],ft=M(Pe(We,j),Me,y,0),st=M(Pe(We+be,j),Me,y,0),$s(qt(ft,st),Oe(st-ft))):$s(0,y),It&&Be?($e==1?(We=pe,be=K):(We=oe,be=W),Me=R[L],ft=G(Pe(We,Z),Me,$,0),st=G(Pe(We+be,Z),Me,$,0),ks(qt(ft,st),Oe(st-ft))):ks(0,$)}else Zn()}else{let T=Oe(sa-ta),L=Oe(na-ia);if(z.ori==1){let Z=T;T=L,L=Z}Ue=Ye.x&&T>=Ye.dist,Be=Ye.y&&L>=Ye.dist;let H=Ye.uni;H!=null?Ue&&Be&&(Ue=T>=H,Be=L>=H,!Ue&&!Be&&(L>T?Be=!0:Ue=!0)):Ye.x&&Ye.y&&(Ue||Be)&&(Ue=Be=!0);let q,j;Ue&&(z.ori==0?(q=Qi,j=_e):(q=Xi,j=Ce),$s(qt(q,j),Oe(j-q)),Be||ks(0,$)),Be&&(z.ori==1?(q=Qi,j=_e):(q=Xi,j=Ce),ks(qt(q,j),Oe(j-q)),Ue||$s(0,y)),!Ue&&!Be&&($s(0,0),ks(0,0))}if(Ye._x=Ue,Ye._y=Be,a==null){if(m){if(ba!=null){let[T,L]=ze.scales;ze.values[0]=T!=null?Vt(z.ori==0?_e:Ce,T):null,ze.values[1]=L!=null?Vt(z.ori==1?_e:Ce,L):null}As(pr,t,_e,Ce,ee,N,f)}if(Ui){let T=m&&ze.setSeries,L=Ut.prox;_i==null?Jt<=L&&Bt(li,ts,!0,T):Jt>L?Bt(null,ts,!0,T):li!=_i&&Bt(li,ts,!0,T)}}$t&&(ne.idx=f,Gn()),c!==!1&&Ve("setCursor")}let ci=null;Object.defineProperty(t,"rect",{get(){return ci==null&&Ss(!1),ci}});function Ss(a=!1){a?ci=null:(ci=w.getBoundingClientRect(),Ve("syncRect",ci))}function oa(a,c,m,f,b,y,$){V._lock||ai&&a!=null&&a.movementX==0&&a.movementY==0||(Kn(a,c,m,f,b,y,$,!1,a!=null),a!=null?wi(null,!0,!0):wi(c,!0,!1))}function Kn(a,c,m,f,b,y,$,T,L){if(ci==null&&Ss(!1),xi(a),a!=null)m=a.clientX-ci.left,f=a.clientY-ci.top;else{if(m<0||f<0){_e=-10,Ce=-10;return}let[H,q]=ze.scales,j=c.cursor.sync,[Z,ue]=j.values,[pe,oe]=j.scales,[K,W]=ze.match,$e=c.axes[0].side%2==1,Pe=z.ori==0?ee:N,We=z.ori==1?ee:N,be=$e?y:b,Me=$e?b:y,ft=$e?f:m,st=$e?m:f;if(pe!=null?m=K(H,pe)?o(Z,R[H],Pe,0):-10:m=Pe*(ft/be),oe!=null?f=W(q,oe)?o(ue,R[q],We,0):-10:f=We*(st/Me),z.ori==1){let St=m;m=f,f=St}}L&&(c==null||c.cursor.event.type==pr)&&((m<=1||m>=ee-1)&&(m=Pi(m,ee)),(f<=1||f>=N-1)&&(f=Pi(f,N))),T?(ta=m,ia=f,[Qi,Xi]=V.move(t,m,f)):(_e=m,Ce=f)}let Yn={width:0,height:0,left:0,top:0};function Zn(){Zs(Yn,!1)}let la,ca,pa,da;function ua(a,c,m,f,b,y,$){ai=!0,Ue=Be=Ye._x=Ye._y=!1,Kn(a,c,m,f,b,y,$,!0,!1),a!=null&&(it(dr,gr,ma,!1),As(Wa,t,Qi,Xi,ee,N,null));let{left:T,top:L,width:H,height:q}=we;la=T,ca=L,pa=H,da=q}function ma(a,c,m,f,b,y,$){ai=Ye._x=Ye._y=!1,Kn(a,c,m,f,b,y,$,!1,!0);let{left:T,top:L,width:H,height:q}=we,j=H>0||q>0,Z=la!=T||ca!=L||pa!=H||da!=q;if(j&&Z&&Zs(we),Ye.setScale&&j&&Z){let ue=T,pe=H,oe=L,K=q;if(z.ori==1&&(ue=L,pe=q,oe=T,K=H),Ue&&oi(O,Vt(ue,O),Vt(ue+pe,O)),Be)for(let W in R){let $e=R[W];W!=O&&$e.from==null&&$e.min!=ve&&oi(W,Vt(oe+K,W),Vt(oe,W))}Zn()}else V.lock&&(V._lock=!V._lock,wi(c,!0,a!=null));a!=null&&(Oi(dr,gr),As(dr,t,_e,Ce,ee,N,null))}function tc(a,c,m,f,b,y,$){if(V._lock)return;xi(a);let T=ai;if(ai){let L=!0,H=!0,q=10,j,Z;z.ori==0?(j=Ue,Z=Be):(j=Be,Z=Ue),j&&Z&&(L=_e<=q||_e>=ee-q,H=Ce<=q||Ce>=N-q),j&&L&&(_e=_e<Qi?0:ee),Z&&H&&(Ce=Ce<Xi?0:N),wi(null,!0,!0),ai=!1}_e=-10,Ce=-10,ge.fill(null),wi(null,!0,!0),T&&(ai=T)}function fa(a,c,m,f,b,y,$){V._lock||(xi(a),Ln(),Zn(),a!=null&&As(Ya,t,_e,Ce,ee,N,null))}function ha(){D.forEach(gd),En(t.width,t.height,!0)}Li(gn,cs,ha);let is={};is.mousedown=ua,is.mousemove=oa,is.mouseup=ma,is.dblclick=fa,is.setSeries=(a,c,m,f)=>{let b=ze.match[2];m=b(t,c,m),m!=-1&&Bt(m,f,!0,!1)},tt&&(it(Wa,w,ua),it(pr,w,oa),it(Ga,w,a=>{xi(a),Ss(!1)}),it(Ka,w,tc),it(Ya,w,fa),kr.add(t),t.syncRect=Ss);let Js=t.hooks=s.hooks||{};function Ve(a,c,m){Un?ws.push([a,c,m]):a in Js&&Js[a].forEach(f=>{f.call(null,t,c,m)})}(s.plugins||[]).forEach(a=>{for(let c in a.hooks)Js[c]=(Js[c]||[]).concat(a.hooks[c])});let ga=(a,c,m)=>m,ze=Fe({key:null,setSeries:!1,filters:{pub:ao,sub:ao},scales:[O,A[1]?A[1].scale:null],match:[oo,oo,ga],values:[null,null]},V.sync);ze.match.length==2&&ze.match.push(ga),V.sync=ze;let ba=ze.key,Jn=nl(ba);function As(a,c,m,f,b,y,$){ze.filters.pub(a,c,m,f,b,y,$)&&Jn.pub(a,c,m,f,b,y,$)}Jn.sub(t);function ic(a,c,m,f,b,y,$){ze.filters.sub(a,c,m,f,b,y,$)&&is[a](null,c,m,f,b,y,$)}t.pub=ic;function sc(){Jn.unsub(t),kr.delete(t),fi.clear(),xr(gn,cs,ha),u.remove(),fe?.remove(),Ve("destroy")}t.destroy=sc;function Qn(){Ve("init",s,i),Gr(i||s.data,!1),U[O]?Bn(O,U[O]):Ln(),Bs=we.show&&(we.width>0||we.height>0),vi=$t=!0,En(s.width,s.height)}return A.forEach(Vr),D.forEach(Il),e?e instanceof HTMLElement?(e.appendChild(u),Qn()):e(t,Qn):Qn(),t}Ge.assign=Fe;Ge.fmtNum=Er;Ge.rangeNum=bn;Ge.rangeLog=yn;Ge.rangeAsinh=Pr;Ge.orient=zi;Ge.pxRatio=me;Ge.join=op;Ge.fmtDate=Rr,Ge.tzDate=vp;Ge.sync=nl;{Ge.addGap=ed,Ge.clipGaps=$n;let s=Ge.paths={points:pl};s.linear=ul,s.stepped=sd,s.bars=nd,s.spline=ad}var gl='.uplot, .uplot *, .uplot *::before, .uplot *::after {box-sizing: border-box;}.uplot {font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";line-height: 1.5;width: min-content;}.u-title {text-align: center;font-size: 18px;font-weight: bold;}.u-wrap {position: relative;user-select: none;}.u-over, .u-under {position: absolute;}.u-under {overflow: hidden;}.uplot canvas {display: block;position: relative;width: 100%;height: 100%;}.u-axis {position: absolute;}.u-legend {font-size: 14px;margin: auto;text-align: center;}.u-inline {display: block;}.u-inline * {display: inline-block;}.u-inline tr {margin-right: 16px;}.u-legend th {font-weight: 600;}.u-legend th > * {vertical-align: middle;display: inline-block;}.u-legend .u-marker {width: 1em;height: 1em;margin-right: 4px;background-clip: padding-box !important;}.u-inline.u-live th::after {content: ":";vertical-align: middle;}.u-inline:not(.u-live) .u-value {display: none;}.u-series > * {padding: 4px;}.u-series th {cursor: pointer;}.u-legend .u-off > * {opacity: 0.3;}.u-select {background: rgba(0,0,0,0.07);position: absolute;pointer-events: none;}.u-cursor-x, .u-cursor-y {position: absolute;left: 0;top: 0;pointer-events: none;will-change: transform;}.u-hz .u-cursor-x, .u-vt .u-cursor-y {height: 100%;border-right: 1px dashed #607D8B;}.u-hz .u-cursor-y, .u-vt .u-cursor-x {width: 100%;border-bottom: 1px dashed #607D8B;}.u-cursor-pt {position: absolute;top: 0;left: 0;border-radius: 50%;border: 0 solid;pointer-events: none;will-change: transform;/*this has to be !important since we set inline "background" shorthand */background-clip: padding-box !important;}.u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {display: none;}';function bl(s){if(["unknown","unavailable"].includes(s.state))return null;let i=Je(s,"power.command_percent"),e=Je(s,"power.applied_percent");return i!==null&&e!==null&&e>=0&&e<=100?[i,e]:null}var Ii=class s{constructor(i,e){this.kind=e;let t=as(i);this.total=t.length;let n=[],r=0,l=0,o=null;for(let p of t){o!==null&&p.time-o>s.GAP_SECONDS&&++l,o=p.time;let u=Je(p,e==="scatter"?"error":"model.a"),g=Je(p,e==="scatter"?"power.applied_percent":"model.b");if(!Number.isFinite(p.time)||p.time<0||p.time>864e10||["unknown","unavailable"].includes(p.state)||u===null||g===null||e==="scatter"&&(g<0||g>100)){++l;continue}++r;let d=n.at(-1);e==="model"&&d?.segment===l&&d.x===u&&d.y===g&&d.observedAt===!!p.observedAt?(d.lastTime=p.time,++d.publications):n.push({time:p.time,lastTime:p.time,x:u,y:g,segment:l,publications:1,observedAt:!!p.observedAt})}this.valid=r,this.distinct=n.length,this.reduced=n.length>s.MAX_POINTS,this.points=this.reduced?e==="model"?n.slice(-s.MAX_POINTS):Array.from({length:s.MAX_POINTS},(p,u)=>n[Math.round(u*(n.length-1)/(s.MAX_POINTS-1))]):n}static{this.MAX_POINTS=600}static{this.GAP_SECONDS=600}};var et=class extends Ee{constructor(){super(...arguments);this.samples=[];this.curves=[];this.range=[0,1];this.heading="";this.syncKey="smartpi";this.percent=!1;this.inspectable=!1;this.selectedTime=null;this.marks=[];this.thermalPhases=!1;this.commandComparison=!1;this.lastSignature="";this.applying=!1;this.themeMedia=matchMedia("(prefers-color-scheme: dark)");this.themeChange=()=>this.draw();this.hiddenCurves=new Set}connectedCallback(){super.connectedCallback(),this.themeMedia.addEventListener("change",this.themeChange),this.hasUpdated&&this.updateComplete.then(()=>this.draw())}disconnectedCallback(){this.themeMedia.removeEventListener("change",this.themeChange),this.dispose(),super.disconnectedCallback()}dispose(){this.observer?.disconnect(),this.observer=void 0,this.plot?.destroy(),this.plot=void 0}updated(e){let t=JSON.stringify([this.curves,this.heading,this.syncKey,this.percent,this.thermalPhases,this.commandComparison,this.range]);if(this.lastSamples===this.samples&&this.lastSignature===t){(e.has("selectedTime")||e.has("marks"))&&this.plot?.redraw(!1,!1);return}this.lastSamples=this.samples,this.lastSignature=t,this.draw()}inspect(e){this.inspectable&&this.dispatchEvent(new CustomEvent("inspect-publication",{detail:e,bubbles:!0,composed:!0}))}toggleSeries(e){let t=this.curves[e].label,n=this.hiddenCurves.has(t);this.plot&&this.plot.setSeries(e+1,{show:n}),n?this.hiddenCurves.delete(t):this.hiddenCurves.add(t),this.requestUpdate()}showCurve(e){let t=this.curves.findIndex(n=>n.path===e);t>=0&&this.hiddenCurves.has(this.curves[t].label)&&this.toggleSeries(t)}drawThermalPhases(e){if(!this.thermalPhases)return;let{left:t,top:n,width:r,height:l}=e.bbox,o=e.ctx;o.save(),o.beginPath(),o.rect(t,n,r,l),o.clip(),o.globalAlpha=1;let p=0,u=0,g=0,d=()=>{if(!g)return;let h=e.valToPos(p,"x",!0),_=e.valToPos(u,"x",!0)-h;o.fillStyle=g>0?"rgba(216,137,46,.14)":"rgba(38,137,202,.14)",o.fillRect(h,n,_,l),o.fillStyle=g>0?"#d8892e":"#2689ca",o.fillRect(h,n+l-6*devicePixelRatio,_,6*devicePixelRatio)};for(let h=1;h<this.samples.length;h++){let _=this.samples[h-1],w=this.samples[h],x=Je(_,"temperature.indoor"),k=Je(w,"temperature.indoor"),C=x===null||k===null?0:Math.sign(k-x);C!==g&&(d(),p=_.time,g=C),u=w.time}d(),o.restore()}drawMarks(e,t){if(!this.marks.length)return;let{left:n,top:r,width:l,height:o}=e.bbox,p=e.ctx,u=8*devicePixelRatio;p.save(),p.font=`bold ${u}px sans-serif`,p.textAlign="center",p.textBaseline="middle";let g=new Map;for(let d of this.marks){let h=e.valToPos(d.time,"x",!0);if(h<n||h>n+l||h-(g.get(d.kind)??-1/0)<u*3)continue;g.set(d.kind,h);let _=d.kind==="A"||d.kind==="B",w=d.kind==="A"||d.kind==="Chauffe",x=_?d.temperature===null||this.hiddenCurves.has("Int\xE9rieure mesur\xE9e")?r+u*(w?1:3):Math.max(r+u*2,Math.min(r+o-u*6,e.valToPos(d.temperature,"y",!0)))+u*(w?-1.1:1.1):r+o-u*(w?3:1);p.fillStyle=w?"#17638d":"#6f448a",p.strokeStyle=t,p.beginPath(),d.kind==="B"?(p.moveTo(h,x-u),p.lineTo(h+u,x),p.lineTo(h,x+u),p.lineTo(h-u,x),p.closePath()):p.arc(h,x,u*.8,0,2*Math.PI),p.fill(),p.stroke(),p.fillStyle="#fff",p.fillText(d.kind==="Chauffe"?"\u2191":d.kind==="Refroidissement"?"\u2193":d.kind,h,x)}p.restore()}draw(){if(!this.isConnected)return;let e=this.renderRoot.querySelector(".plot");if(!e)return;let t=this.plot;if(t&&t.series.forEach((o,p)=>{p&&typeof o.label=="string"&&(o.show===!1?this.hiddenCurves.add(o.label):this.hiddenCurves.delete(o.label))}),this.dispose(),!this.samples.length||!this.samples.some(o=>this.curves.some(p=>this.seriesValue(o,p)!==null)))return;let n=getComputedStyle(this),r=n.getPropertyValue("--primary-text-color").trim()||"#555",l=[this.samples.map(o=>o.time),...this.curves.map(o=>this.samples.map(p=>this.seriesValue(p,o)))];this.applying=!0,this.plot=new Ge({width:Math.max(240,e.clientWidth),height:245,scales:{x:{time:!0,min:this.range[0],max:this.range[1]},y:this.percent?{range:(o,p,u)=>[Math.min(0,p??0),Math.max(100,u??100)]}:{}},cursor:{sync:{key:this.syncKey},drag:{x:!0,y:!1}},bands:this.commandComparison?[{series:[1,2],fill:"rgba(180,105,30,.22)"},{series:[2,1],fill:"rgba(30,120,155,.22)"}]:[],axes:[{stroke:r,space:100,grid:{show:!1},values:(o,p)=>p.map(u=>new Date(u*1e3).toLocaleDateString(void 0,{month:"2-digit",day:"2-digit"})+`
`+new Date(u*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})),size:55},{stroke:r,values:(o,p)=>p.map(u=>u.toLocaleString(void 0,{maximumFractionDigits:6})),grid:{stroke:"rgba(128,128,128,.15)"},size:65}],series:[{label:"Date",value:(o,p)=>p==null?"\u2014":new Date(p*1e3).toLocaleString()},...this.curves.map(o=>({label:o.label,stroke:o.color,width:2,dash:o.dash,spanGaps:!1,gaps:(p,u,g,d,h)=>{if(!this.commandComparison)return h;let _=[...h];for(let x=g+1;x<=d;x++)this.samples[x].time-this.samples[x-1].time>Ii.GAP_SECONDS&&_.push([Math.round(p.valToPos(this.samples[x-1].time,"x",!0)),Math.round(p.valToPos(this.samples[x].time,"x",!0))]);let w=[];for(let x of _.sort((k,C)=>k[0]-C[0])){let k=w.at(-1);k&&x[0]<=k[1]?k[1]=Math.max(k[1],x[1]):w.push([...x])}return w},show:!this.hiddenCurves.has(o.label),paths:o.step?Ge.paths.stepped({align:1}):void 0,points:{show:this.samples.length<3},value:(p,u)=>u==null?"Indisponible":`${u.toLocaleString(void 0,{maximumFractionDigits:o.unit.includes("min")?6:3})} ${o.unit}`}))],hooks:{draw:[o=>{if(this.drawThermalPhases(o),this.drawMarks(o,r),this.selectedTime===null)return;let{left:p,top:u,width:g,height:d}=o.bbox,h=o.valToPos(this.selectedTime,"x",!0);if(h<p||h>p+g)return;let _=o.ctx;_.save(),_.strokeStyle=r,_.setLineDash([5,4]),_.beginPath(),_.moveTo(h,u),_.lineTo(h,u+d),_.stroke(),_.restore()}],setSeries:[o=>{o.status!==1||o!==this.plot||(o.series.forEach((p,u)=>{u&&typeof p.label=="string"&&(p.show===!1?this.hiddenCurves.add(p.label):this.hiddenCurves.delete(p.label))}),this.requestUpdate())}],setScale:[(o,p)=>{p==="x"&&o.status===1&&o===this.plot&&!this.applying&&o.scales.x.min!=null&&o.scales.x.max!=null&&(Math.abs(o.scales.x.min-this.range[0])>.01||Math.abs(o.scales.x.max-this.range[1])>.01)&&this.dispatchEvent(new CustomEvent("time-range",{detail:[o.scales.x.min,o.scales.x.max],bubbles:!0,composed:!0}))}]}},l,e),this.applying=!1,this.observer=new ResizeObserver(()=>{this.plot&&this.plot.width!==Math.max(240,e.clientWidth)&&(this.applying=!0,this.plot.setSize({width:Math.max(240,e.clientWidth),height:245}),this.applying=!1)}),this.observer.observe(e)}seriesValue(e,t){if(!this.commandComparison)return Je(e,t.path);let n=bl(e);return n===null?null:t.path==="power.command_percent"?n[0]:t.path==="power.applied_percent"?n[1]:null}render(){let e=this.samples.filter(t=>this.curves.some(n=>this.seriesValue(t,n)!==null)).length;return v`<h3>${this.heading}</h3>
      <div class="series-controls" role="group" aria-label="Séries affichées">
        ${this.curves.map((t,n)=>v`<button
              aria-pressed=${!this.hiddenCurves.has(t.label)}
              @click=${()=>this.toggleSeries(n)}
            >
              <span style=${"background:"+t.color} aria-hidden="true"></span
              >${t.label}
            </button>`)}
      </div>
      <div class="plot" aria-label=${this.heading}
        @pointerdown=${t=>{this.pointerStart=t.button===0?t.clientX:void 0}}
        @click=${{capture:!0,handleEvent:t=>{let n=this.plot;if(!n||!t.composedPath().includes(n.over)||this.pointerStart===void 0||Math.abs(t.clientX-this.pointerStart)>4)return;let r=n.data[0][n.posToIdx(t.clientX-n.over.getBoundingClientRect().left)];r!==void 0&&this.inspect(r)}}}></div>
      ${e?v`<details>
            <summary>
              Table de données accessible · ${e} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(t=>v`<th>${t.label} (${t.unit})</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(t=>v`<tr>
                        <td>${this.inspectable?v`<button type="button" aria-pressed=${t.time===this.selectedTime}
                              @click=${()=>this.inspect(t.time)}>${new Date(t.time*1e3).toLocaleString()}</button>`:new Date(t.time*1e3).toLocaleString()}</td>
                        ${this.curves.map(n=>v`<td>
                              ${this.seriesValue(t,n)??"Indisponible"}
                            </td>`)}
                      </tr>`)}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
            </p>
          </details>`:v`<p>Aucune valeur disponible pour cette fenêtre.</p>`}`}};et.styles=[en(gl),Ze`
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
    `],I([se({attribute:!1})],et.prototype,"samples",2),I([se({attribute:!1})],et.prototype,"curves",2),I([se({attribute:!1})],et.prototype,"range",2),I([se()],et.prototype,"heading",2),I([se()],et.prototype,"syncKey",2),I([se({type:Boolean})],et.prototype,"percent",2),I([se({type:Boolean})],et.prototype,"inspectable",2),I([se({attribute:!1})],et.prototype,"selectedTime",2),I([se({attribute:!1})],et.prototype,"marks",2),I([se({type:Boolean})],et.prototype,"thermalPhases",2),I([se({type:Boolean})],et.prototype,"commandComparison",2),et=I([Xe("smartpi-time-chart")],et);var mi=class extends Ee{constructor(){super(...arguments);this.expert=!1}render(){if(!this.diagnostic)return E;let e=new pi(this.diagnostic),t=e.blocks(),[n,r,l,o,p,u,g,d]=t,h=e.route,_=e.directMode,w=e.timingForced,x=e.saturation,k=`${this.diagnostic.entityId}/${_??h}`,C=M=>{this.selected={context:k,id:M}},A=h==="direct"?p:h==="pi"&&(w===!0||x)?u:g,D=(this.selected?.context===k?t.find(M=>M.id===this.selected?.id):void 0)??A,R=_?`Voie directe \xB7 ${_}`:h==="pi"?"Voie PI + anticipation":"Chemin non v\xE9rifi\xE9",F=_?["PI/FF contourn\xE9s",`SmartPI d\xE9clare une voie directe en ${_.toLocaleLowerCase("fr-FR")}.`]:h!=="pi"?["Motif indisponible","Cette publication ne permet pas de v\xE9rifier le chemin de commande."]:w===!0?["Temporisation impos\xE9e","SmartPI signale une contrainte de dur\xE9e minimale."]:x?[x,"SmartPI publie l\u2019\xE9tat de saturation de la voie PI."]:w===!1?["Temporisation non impos\xE9e","Le drapeau de temporisation impos\xE9e est inactif."]:["Motif indisponible","Cette publication ne renseigne pas la temporisation."],O=h==="pi"&&(w===!0||x!==null),te=h==="direct"?[[p,"D\xE9cision",_,"Voie directe"],[g,"Sortie","Appliqu\xE9e",g.value]]:[[p,"Demande",h==="pi"?"PI + anticipation":"Demand\xE9e",p.value],[u,"Contraintes","Limites et timing",h==="pi"?u.value:"Chemin non v\xE9rifi\xE9"],[g,"Sortie","Appliqu\xE9e",g.value]],J=h==="pi"?[r,n,l,o,d]:[r,n,d],ie=this.diagnostic.lastUpdated,Y=ie?new Date(ie):null,z=this.diagnostic.available&&Y&&Number.isFinite(Y.valueOf())?v`Dernière mise à jour du capteur : <time datetime=${Y.toISOString()}>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"short",timeStyle:"medium"}).format(Y)}</time>`:"Horodatage des donn\xE9es actuelles indisponible",Q=[[20,20],[20,155],[235,20],[235,155],[450,80],[660,80],[660,265],[235,300]];return v`<div class="intro">
        <div>
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge route-badge">${R}</span>
      </div>
      <p class="muted stamp">${z}</p>
      <dl class="snapshot">
        <div><dt>Température intérieure</dt><dd>${r.value}</dd><small>Mesure publiée</small></div>
        <div><dt>Consigne filtrée</dt><dd>${n.value}</dd><small>${e.bypass?"Voie P contourn\xE9e":"Voie proportionnelle"}</small></div>
        <div><dt>Commande demandée</dt><dd>${e.bypass?"\u2014":p.value}</dd>
          <small>${e.bypass?"Voie PI contourn\xE9e":"Demande publi\xE9e"}</small></div>
        <div><dt>Commande appliquée</dt><dd>${g.value}</dd><small>Signal de commande</small></div>
      </dl>
      <div class="work">
      <section class="route" aria-labelledby="route-title">
        <h4 id="route-title">Chemin de commande</h4>
        <div class="note ${O?"warning":""}">
          <strong>${F[0]}</strong><p>${F[1]}</p>
        </div>
        <ol class="steps">
          ${te.map(([M,G,U,ae],B)=>v`<li>
            ${B>0&&h!=="unavailable"?v`<span class="arrow" aria-hidden="true">→</span>`:E}
            <button type="button" class="step" data-block=${M.id} aria-pressed=${M.id===D.id}
              aria-controls="signal-inspector" @click=${()=>C(M.id)}>
              <small>${G}</small><strong>${U}</strong><span>${ae}</span>
            </button></li>`)}
        </ol>
        <div class="quick-blocks" role="group" aria-label="Signaux associés">
          ${J.map(M=>v`<button type="button" aria-pressed=${M.id===D.id}
            aria-controls="signal-inspector" @click=${()=>C(M.id)}>${M.id==="ff"?"Anticipation":M.title}</button>`)}
        </div>
      </section>
      <aside id="signal-inspector" aria-labelledby="signal-title">
        <span class="eyebrow">INSPECTION DU SIGNAL</span>
        <h4 id="signal-title" aria-live="polite">${D.title} <span class="badge">${D.status}</span></h4>
        <p>${D.explanation}</p>
        <dl>
          <div><dt>Valeur du bloc</dt><dd>${D.value}</dd>
            ${this.expert?v`<code>attributes.live.${D.path}</code>`:null}</div>
          <div><dt>Motif ou contexte publié</dt><dd>${D.reason}</dd>
            ${this.expert?v`<code>attributes.live.${D.reasonPath}</code>`:null}</div>
          ${e.detail(D,this.expert).map(M=>v`<div>
            <dt>${M.label}</dt><dd>${M.value}</dd>
            ${this.expert?v`<code>attributes.live.${M.path}</code>${M.reliability?v`<code>Fiabilité · ${M.reliability}</code>`:null}`:null}
          </div>`)}
        </dl>
        ${D.status==="Contourn\xE9"?v`<p class="muted">Ces valeurs décrivent un bloc hors du chemin actif.</p>`:E}
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
          ${e.route==="pi"?Ie`<path class="flow" d="M205 65 H235"/><path class="flow" d="M205 195 H220 V95 H235"/><path class="flow" d="M420 65 H435 V115 H450"/><path class="flow" d="M420 195 H435 V145 H450"/>`:e.bypass?Ie`<path class="flow bypass" d="M635 125 H647 V310 H660"/>`:null}
          ${e.route==="pi"?Ie`<path class="flow" d="M635 125 H660"/><path class="flow" d="M752 170 V265"/>`:null}
          ${h!=="unavailable"?Ie`<path class="flow feedback" d="M660 315 H420" />
            <path class="flow feedback" d="M235 345 H110 V245" />`:E}
          ${t.map((M,G)=>Ie`<g role="button" tabindex="0" aria-pressed=${M.id===D.id} aria-label=${`${M.title} : ${M.value}. ${M.status}`} class=${"block "+(M.id===D.id?"selected":"")+(M.status==="Contourn\xE9"?" inactive":"")} transform=${`translate(${Q[G][0]},${Q[G][1]})`} @click=${()=>C(M.id)} @keydown=${U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),C(M.id))}}>
          <title>${M.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${M.title}</text><text x="13" y="50" class="value">${M.value}</text><text x="13" y="73" class="status">${M.status}</text>
        </g>`)}
        </svg>
      </div>
      <div class="mobile">
        ${t.map(M=>v`<button
              type="button"
              aria-pressed=${M.id===D.id}
              @click=${()=>C(M.id)}
            >
              ${M.title}<strong>${M.value}</strong><small>${M.status}</small>
            </button>`)}
      </div>
      </details>`}};mi.styles=Ze`
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
  `,I([se({attribute:!1})],mi.prototype,"diagnostic",2),I([se({type:Boolean})],mi.prototype,"expert",2),I([re()],mi.prototype,"selected",2),mi=I([Xe("smartpi-control-diagram")],mi);var bs=class extends Ee{render(){if(!this.diagnostic)return v``;let i=new pi(this.diagnostic),e=i.chain(),t=Math.max(100,...e.map(n=>Math.abs(n.value??0)));return v`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${i.bypass?"Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliqu\xE9e.":"FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu pr\xE9c\xE8dent les limites ; Hold est un \xE9tat de maintien, pas une contribution \xE0 additionner."}
      </p>
      ${e.map(n=>v`<div class="row">
            <span title=${"attributes.live."+n.path}>${n.label}</span>
            <div class="track">
              <i></i>${n.value===null?null:v`<b
                    style=${`left:${n.value<0?50+n.value/t*50:50}%;width:${Math.abs(n.value)/t*50}%`}
                    class=${n.value<0?"negative":""}
                  ></b>`}
            </div>
            <strong>${P(n.value," %",2)}</strong>
          </div>`)}
      <p>
        Ces diagnostics peuvent décrire un candidat et un cycle déjà engagé.
        Leurs différences ne sont pas une preuve de perte ni de limitation.
      </p>
      <p>
        Échelle symétrique ±${P(t," %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${P(S(this.diagnostic.live,"analysis.feedforward.ff2_freeze_reason"))}
        · FF3 : ${P(S(this.diagnostic.live,"feedforward.ff3_status"))} ·
        Intégrale :
        ${P(S(this.diagnostic.live,"temperature.integral_mode"))}
      </p>
      ${S(this.diagnostic.live,"power.valve_linearization_enabled")===!0?v`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`:null}`}};bs.styles=Ze`
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
  `,I([se({attribute:!1})],bs.prototype,"diagnostic",2),bs=I([Xe("smartpi-command-chain")],bs);var vs=s=>Math.abs(s)>=1e4||s!==0&&Math.abs(s)<1e-4?s.toExponential(2):s.toLocaleString("fr-FR",{maximumFractionDigits:6}),vl=(s,i)=>{let e=Math.max(3,Math.min(10,Math.ceil(Math.log10(Math.abs(s/i)||1))+1));return Math.abs(s)>=1e4||s!==0&&Math.abs(s)<.001?s.toExponential(e-1):s.toLocaleString("fr-FR",{maximumSignificantDigits:e})},Fi=s=>new Date(s*1e3).toLocaleString("fr-FR"),yt=class extends Ee{constructor(){super(...arguments);this.samples=[];this.kind="scatter";this.source="";this.contextId="";this.inspectable=!1;this.selected=-1;this.page=0;this.plotWidth=720;this.projection=new Ii([],"scatter")}connectedCallback(){super.connectedCallback(),this.observer=new ResizeObserver(e=>{let t=Math.max(240,Math.round(e[0].contentRect.width));t!==this.plotWidth&&(this.plotWidth=t)}),this.observer.observe(this)}disconnectedCallback(){this.observer?.disconnect(),this.observer=void 0,super.disconnectedCallback()}willUpdate(e){if(e.has("samples")||e.has("kind")){let t=this.projection.points[this.selected]?.time;this.projection=new Ii(this.samples,this.kind),this.selected=this.projection.points.findIndex(n=>n.time===t),this.page=Math.min(this.page,Math.max(0,Math.ceil(this.projection.points.length/25)-1))}e.has("contextId")&&(this.selected=-1,this.page=0)}select(e){let t=this.projection.points;this.selected=Math.max(0,Math.min(t.length-1,e));let n=t[this.selected];n&&this.inspectable&&this.dispatchEvent(new CustomEvent("inspect-publication",{detail:n.time,bubbles:!0,composed:!0}))}bounds(e,t=!1){let n=Math.min(...e),r=Math.max(...e);t&&(n=Math.min(0,n),r=Math.max(0,r));let l=r-n,o=l?l*.08:Math.abs(n)>0?Math.abs(n)*.05:.001;return[Number.isFinite(n-o)?n-o:n,Number.isFinite(r+o)?r+o:r]}coordinates(){let e=this.projection.points,t=this.bounds(e.map(l=>l.x),this.kind==="scatter"),n=this.kind==="scatter"?[0,100]:this.bounds(e.map(l=>l.y)),r=(l,o)=>{let p=Math.max(Math.abs(o[0]),Math.abs(o[1]),Number.MIN_VALUE),u=o[0]/p,g=o[1]/p;return g===u?.5:(l/p-u)/(g-u)};return{xr:t,yr:n,x:l=>78+r(l,t)*(this.plotWidth-102),y:l=>240-r(l,n)*202}}clickPlot(e){let t=e.currentTarget,n=t.getScreenCTM();if(!n)return;let{x:r,y:l}=new DOMPoint(e.clientX,e.clientY).matrixTransform(n.inverse()),{x:o,y:p}=this.coordinates(),u=0,g=1/0;this.projection.points.forEach((d,h)=>{let _=(o(d.x)-r)**2+(p(d.y)-l)**2;_<g&&(g=_,u=h)}),this.select(u)}render(){let e=this.kind==="model",t=this.projection,n=t.points,r=e?"Parcours des coefficients A/B":"\xC9cart filtr\xE9 et commande appliqu\xE9e",l=e?"A publi\xE9 (\xB0C/min/u)":"Consigne filtr\xE9e \u2212 mesure (\xB0C)",o=e?"B publi\xE9 (min\u207B\xB9)":"Commande appliqu\xE9e (%)",p=this.selected<0?n.length-1:Math.min(this.selected,n.length-1),u=n[p],{x:g,y:d,xr:h,yr:_}=n.length?this.coordinates():{x:k=>0,y:k=>0,xr:[0,1],yr:[0,1]},w=[];if(e){let k=-1;for(let C of n)k!==C.segment?(w.push(`M ${g(C.x)} ${d(C.y)}`),k=C.segment):w[w.length-1]+=` L ${g(C.x)} ${d(C.y)}`}let x=this.plotWidth<500?[0,.5,1]:[0,.25,.5,.75,1];return v`<section aria-labelledby="projection-title">
      <h3 id="projection-title">${r}</h3>
      <p class="source">${this.source} · ${t.valid} / ${t.total} publications couplées</p>
      ${n.length?v`
        <p class="axis-label">${o}</p>
        <svg viewBox=${`0 0 ${this.plotWidth} 292`} role="img" aria-label=${`${r}. ${n.length} points affich\xE9s. ${l} ; ${o}. La s\xE9lection est accessible avec les contr\xF4les Publication.`} @click=${this.clickPlot}>
          ${x.map(k=>{let C=240-k*202;return Ie`<line x1="78" x2=${this.plotWidth-24} y1=${C} y2=${C} class="grid"/><text x="65" y=${C+5} text-anchor="end">${vl(_[0]*(1-k)+_[1]*k,(_[1]-_[0])/(x.length-1))}</text>`})}
          <line x1="78" x2=${this.plotWidth-24} y1="240" y2="240" class="axis"/><line x1="78" x2="78" y1="38" y2="240" class="axis"/>
          ${x.map(k=>Ie`<text x=${78+k*(this.plotWidth-102)} y="267" text-anchor="middle">${vl(h[0]*(1-k)+h[1]*k,(h[1]-h[0])/(x.length-1))}</text>`)}
          ${e?E:Ie`<line x1=${g(0)} x2=${g(0)} y1="38" y2="240" class="zero"/>`}
          ${w.map(k=>Ie`<path class="trajectory" d=${k}/>`)}
          ${n.map((k,C)=>Ie`<circle cx=${g(k.x)} cy=${d(k.y)} r=${C===p?6:3} class=${C===p?"selected-point":e&&C===0?"first-point":"point"}/>`)}
          ${e?Ie`<text x=${g(n.at(-1).x)+8} y=${d(n.at(-1).y)-10}>${n.length===1?"Unique":n[0].x===n.at(-1).x&&n[0].y===n.at(-1).y?"D\xE9but / fin":"Fin"}</text>`:E}
        </svg>
        <p class="axis-label x-label">${l}</p>
        ${e?v`<p class="legend"><span>○ Premier couple affiché · ${Fi(n[0].time)}</span><span>Dernier couple · ${Fi(n.at(-1).lastTime)}</span></p>`:E}
        <div class="selection-controls"><button type="button" aria-label=${`Publication pr\xE9c\xE9dente \xB7 ${r}`} ?disabled=${p<=0} @click=${()=>this.select(p-1)}>←</button>
          <label>Publication <input type="range" min="0" max=${n.length-1} step="1" .value=${String(p)} aria-label=${`Publication \xB7 ${r}`} aria-valuetext=${u?`${Fi(u.time)} ; ${vs(u.x)}, ${vs(u.y)}`:""} @input=${k=>this.select(Number(k.currentTarget.value))}></label>
          <button type="button" aria-label=${`Publication suivante \xB7 ${r}`} ?disabled=${p>=n.length-1} @click=${()=>this.select(p+1)}>→</button></div>
        <p class="selection" role="status">${u?v`${Fi(u.time)}${u.observedAt?" (heure d\u2019observation)":""} · ${e?"A":"\xC9cart"} ${vs(u.x)} · ${e?"B":"Appliqu\xE9e"} ${vs(u.y)}${e?v` · ${u.publications} publication(s)${u.lastTime!==u.time?v` jusqu’au ${Fi(u.lastTime)}`:E}`:" %"}`:E}</p>
        <details><summary>Table des points affichés (${n.length})</summary>
          <div class="table-wrap"><table><caption>${r} · points affichés</caption><thead><tr><th>Date</th><th>${l}</th><th>${o}</th>${e?v`<th>Publications regroupées</th>`:E}</tr></thead><tbody>
            ${n.slice(this.page*25,(this.page+1)*25).map(k=>v`<tr><td><button type="button" @click=${()=>this.select(n.indexOf(k))}>${Fi(k.time)}${k.observedAt?" (observation)":""}</button>${k.lastTime!==k.time?v` → ${Fi(k.lastTime)}`:E}</td><td>${vs(k.x)}</td><td>${vs(k.y)}</td>${e?v`<td>${k.publications}</td>`:E}</tr>`)}
          </tbody></table></div>
          <div class="pages"><button type="button" ?disabled=${this.page===0} @click=${()=>--this.page}>Page précédente</button><span>${this.page+1} / ${Math.ceil(n.length/25)}</span><button type="button" ?disabled=${(this.page+1)*25>=n.length} @click=${()=>++this.page}>Page suivante</button></div>
        </details>`:v`<p class="empty">Aucun couple ${e?"A/B":"\xE9cart / commande"} exploitable dans cette source et cette fenêtre.</p>`}
      ${t.reduced?v`<p class="notice">${e?"600 derniers couples distincts affich\xE9s":"600 publications r\xE9parties dans la fen\xEAtre pour le dessin"} sur ${t.distinct}. Zoomez pour examiner une période plus courte. La sélection et la table portent sur ces points affichés.</p>`:E}
      <p class="foot">${e?"Les couples identiques successifs sont regroup\xE9s. Les traits suivent les publications, coup\xE9s aux donn\xE9es manquantes et interruptions sup\xE9rieures \xE0 10 min. Une variation ne prouve pas un apprentissage accept\xE9 ; la confiance actuelle ne valide pas le pass\xE9.":"Chaque point associe deux valeurs de la m\xEAme publication. Le nombre de points ne repr\xE9sente pas une dur\xE9e ; cet \xE9cart filtr\xE9 n\u2019est ni l\u2019erreur de l\u2019int\xE9grateur ni une mesure de confort. Aucun ajustement de courbe n\u2019est calcul\xE9."}</p>
    </section>`}};yt.styles=Ze`
    :host{display:block;color:var(--primary-text-color,#192b31);min-width:0;--plot:#176b8c;--selected:#984d14}*{box-sizing:border-box}h3{margin:0 0 8px;font-size:16px}.source,.axis-label,.foot,.legend{font-size:12px;color:var(--secondary-text-color,#526268);line-height:1.6}.axis-label{margin:10px 0 0}.x-label{text-align:center;margin:0}.legend{display:flex;flex-wrap:wrap;gap:8px 18px}svg{display:block;width:100%;height:auto;max-height:340px;cursor:crosshair;overflow:visible}svg text{font:14px sans-serif;fill:var(--secondary-text-color,#526268)}.grid,.axis{stroke:var(--divider-color,#c6d0d4);stroke-width:1}.zero{stroke:var(--secondary-text-color,#526268);stroke-dasharray:4 5;opacity:.6}.point{fill:var(--plot);opacity:.55}.first-point{fill:none;stroke:var(--plot);stroke-width:2}.trajectory{fill:none;stroke:var(--plot);stroke-width:1.5;opacity:.55}.selected-point{fill:var(--selected);stroke:var(--card-background-color,#fff);stroke-width:2}.selection-controls{display:flex;align-items:center;gap:12px;margin-top:14px}.selection-controls label{flex:1;font-size:12px}.selection-controls input{display:block;width:100%;min-height:44px;accent-color:var(--plot)}button{font:inherit;color:inherit;background:var(--card-background-color,#fff);border:1px solid var(--divider-color,#b5c0c4);border-radius:7px;min-width:44px;min-height:44px;padding:8px 12px;cursor:pointer}button:disabled{opacity:.5;cursor:default}button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color,#167883);outline-offset:3px}.selection,.notice,.empty{font-size:13px;line-height:1.6;overflow-wrap:anywhere}.selection{font-variant-numeric:tabular-nums}.pages{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;flex-wrap:wrap}.table-wrap{overflow:auto;max-width:100%}table{border-collapse:collapse;width:100%;font-size:12px}th,td{text-align:left;padding:8px;border-bottom:1px solid var(--divider-color,#d2dbdd)}caption{text-align:left;padding:10px 0}summary{min-height:44px;padding:12px 0;font-size:13px;cursor:pointer}@media(max-width:520px){svg text{font-size:11px}.selection-controls{gap:7px}}@media(prefers-color-scheme:dark){:host{--plot:#80c8e6;--selected:#efb278}}
  `,I([se({attribute:!1})],yt.prototype,"samples",2),I([se()],yt.prototype,"kind",2),I([se()],yt.prototype,"source",2),I([se()],yt.prototype,"contextId",2),I([se({type:Boolean})],yt.prototype,"inspectable",2),I([re()],yt.prototype,"selected",2),I([re()],yt.prototype,"page",2),I([re()],yt.prototype,"plotWidth",2),yt=I([Xe("smartpi-diagnostic-projection")],yt);var xl=[{label:"Int\xE9rieure mesur\xE9e",path:"temperature.indoor",color:"#2689ca",unit:"\xB0C"},{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",color:"#d6892e",unit:"\xB0C",step:!0}],Or=xl.map(s=>s.step?{...s,dash:[6,4]}:s),vd=["A","B","Chauffe","Refroidissement"],Cn=[{label:"Appliqu\xE9e",path:"power.applied_percent",color:"#2689ca",unit:"%",step:!0},{label:"Demand\xE9e",path:"power.command_percent",color:"#d6892e",unit:"%",step:!0},{label:"PI",path:"power.pi_percent",color:"#9d78bd",unit:"%",step:!0},{label:"FF",path:"power.ff_percent",color:"#39a38a",unit:"%",step:!0}],xd=new Intl.NumberFormat("fr-FR",{maximumFractionDigits:2,signDisplay:"exceptZero"}),Re=class extends Ee{constructor(){super(...arguments);this.session=[];this.tab="evolution";this.hiddenLearning=[];this.expert=!1;this.hours=24;this.end=Date.now()/1e3;this.range=[this.end-86400,this.end];this.recorder=[];this.loading=!1;this.error="";this.preferSession=!1;this.followNow=!0;this.livePublicationMissing=!1;this.generation=0;this.recorderEntity=""}async inspectBlock(e){this.block=e,e!=="model"&&this.renderRoot.querySelector(".command-chart smartpi-time-chart")?.showCurve(`power.${e}_percent`),await this.updateComplete,this.renderRoot.querySelector("#block-title")?.focus()}inspect(e){this.diagnostic&&(this.livePublicationMissing=!1,this.followNow=!1,this.inspection={entityId:this.diagnostic.entityId,recorder:this.usingRecorder,time:e})}async inspectEvent(e){this.inspect(e),await this.updateComplete,this.renderRoot.querySelector("#inspection-title")?.focus()}async openLivePublication(){let e=rs(this.diagnostic?.lastUpdated),t=this.usingRecorder?this.recorder:this.session,n=this.diagnostic?.available&&e!==null?this.windowData(t).samples.find(r=>!r.observedAt&&r.time===e):void 0;this.tab="evolution",this.inspection=void 0,this.livePublicationMissing=!n,n&&this.inspect(n.time),await this.updateComplete,this.renderRoot.querySelector("#inspection-title")?.focus()}get usingRecorder(){return this.recorderEntity===this.diagnostic?.entityId&&!this.preferSession&&lr(this.recorder)}willUpdate(e){if(this.followNow&&!this.usingRecorder&&(e.has("session")||e.has("preferSession")||e.has("recorder"))){let t=this.session.at(-1)?.time;t!==void 0&&t>this.range[1]&&(this.end=t,this.range=[t-this.hours*3600,t])}}windowData(e){if(this.filteredCache?.all===e&&this.filteredCache.start===this.range[0]&&this.filteredCache.end===this.range[1])return this.filteredCache;let t=e.filter(n=>n.time>=this.range[0]&&n.time<=this.range[1]);return this.filteredCache={all:e,start:this.range[0],end:this.range[1],samples:t,tracking:qa(t),events:Oa(e).filter(n=>n.time>=this.range[0]&&n.time<=this.range[1])}}updated(e){let t=e.get("diagnostic");e.has("diagnostic")&&t?.entityId!==this.diagnostic?.entityId&&(this.recorder=[],this.preferSession=!1,this.livePublicationMissing=!1,this.reset(),this.load())}disconnectedCallback(){++this.generation,this.filteredCache=void 0,this.recorder=[],this.session=[],this.loading=!1,super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.load()}reset(){this.followNow=!0,this.end=Date.now()/1e3,this.range=[this.end-this.hours*3600,this.end]}shift(e){this.followNow=!1;let t=this.range[1]-this.range[0],n=Date.now()/1e3,r=this.end-48*3600,l=Math.min(n,Math.max(r+t,this.range[1]+e*t/2));this.range=[l-t,l]}zoom(e){this.followNow=!1;let[t,n]=this.range,r=Math.max(60,Math.min(48*3600,(n-t)*e));this.range=[n-r,n]}async load(){this.inspection=void 0,this.livePublicationMissing=!1;let e=++this.generation,t=this.diagnostic;if(this.loading=!0,this.error="",this.recorder=[],!t||!this.hass?.callWS){this.error="Lecture Recorder non disponible dans cette connexion. Historique de session utilis\xE9.",this.loading=!1;return}try{let n=Date.now()/1e3,r=await ja(this.hass,t.entityId,n-48*3600,n,()=>e!==this.generation);if(e!==this.generation)return;this.recorderEntity=t.entityId,this.recorder=r,lr(r)||(this.error="Recorder ne fournit aucune s\xE9rie v2 exploitable. Historique de session utilis\xE9.")}catch(n){if(e!==this.generation)return;this.error=n instanceof Error&&n.message.startsWith("Format")?n.message:"Lecture Recorder refus\xE9e ou impossible. Historique de session utilis\xE9 ; v\xE9rifier les droits et Recorder."}finally{e===this.generation&&(this.loading=!1)}}trackingPanel(e,t){let{pairs:n,signedMedian:r,absoluteMedian:l,largestInterval:o}=e;return v`<section class="pane tracking" aria-labelledby="tracking-heading">
      <div class="tracking-title">
        <h3 id="tracking-heading">Écart à la consigne filtrée</h3>
        <span>Consigne filtrée − température intérieure</span>
      </div>
      <dl class="metrics">
        <div><dt>Couples valides</dt><dd>${n} / ${t}</dd></div>
        <div><dt>Médiane signée</dt><dd>${r===null?"Indisponible":`${xd.format(r)} \xB0C`}</dd></div>
        <div><dt>Médiane absolue</dt><dd>${P(l," \xB0C")}</dd></div>
        <div><dt>Plus long intervalle entre couples</dt><dd>${P(o===null?null:o/60," min",1)}</dd></div>
      </dl>
      <p>${n<2?"Deux couples valides dans la fen\xEAtre sont n\xE9cessaires pour r\xE9sumer l\u2019\xE9cart.":"Un \xE9cart positif indique une temp\xE9rature sous la consigne filtr\xE9e. La m\xE9diane absolue indique la taille typique de l\u2019\xE9cart observ\xE9."}</p>
      <details>
        <summary>Méthode et limites</summary>
        <p>Chaque couple provient d’une même publication et compte une fois, indépendamment de l’intervalle entre les points. Les publications incomplètes sont exclues des médianes. Le plus long intervalle décrit l’espacement des couples valides.</p>
        <p>Ces valeurs décrivent les publications de la source et de la fenêtre affichées. L’évaluation d’une durée de confort ou d’une réponse à un changement de consigne demande des données et un protocole adaptés.</p>
      </details>
    </section>`}inspectionPanel(e,t,n){let r=t?{...e,state:t.state,available:t.state!=="unknown"&&t.state!=="unavailable",live:t.live,history:t.history}:e,l=new pi(r).route,o=t?n?"Recorder":"Session":"Instantan\xE9 SmartPI",p=t?new Date(t.time*1e3):e.lastUpdated?new Date(e.lastUpdated):null,u=(C,A="")=>C==null&&t&&r.available?"Non archiv\xE9":P(C,A),g=[["Temp\xE9rature int\xE9rieure mesur\xE9e","temperature.indoor"," \xB0C"],["Consigne filtr\xE9e","setpoint.filtered_setpoint"," \xB0C"],["Commande demand\xE9e","power.command_percent"," %"],["Commande appliqu\xE9e","power.applied_percent"," %"]],d=this.block,h=(C,A)=>v`<button type="button" aria-pressed=${d===C} aria-controls="block-detail"
        @click=${()=>void this.inspectBlock(C)}>${A}</button>`,_=l==="direct"?["Consigne et mesure","Hyst\xE9r\xE9sis ou calibration","Commande publi\xE9e","Pi\xE8ce"]:["Consigne et mesure",v`<span>Voies P et I</span> → ${h("pi","PI")}`,v`+ ${h("ff","Anticipation")}`,"Limites et temporisation","Commande publi\xE9e","Pi\xE8ce"],w={pi:[["Contribution PI","power.pi_percent"," %"]],ff:[["Anticipation retenue","power.ff_percent"," %"]],model:[["Gain thermique estim\xE9 A","model.a"," \xB0C/min/u"],["Pertes estim\xE9es B","model.b"," min\u207B\xB9"]]},x="analysis.twin.twin_T_steady",k=S(r.live,x)==null?u(void 0):P(at(r.live,x,"analysis.twin.twin_T_steady_reliable")," \xB0C");return v`<section class="synoptic" aria-labelledby="synoptic-title">
        <h3 id="synoptic-title">Synoptique de régulation</h3>
        <ol class="signal-path" aria-label=${l==="unavailable"?"Sch\xE9ma de r\xE9f\xE9rence":"Voie d\xE9clar\xE9e"}>
          ${_.map((C,A)=>v`<li class=${l==="unavailable"?"":"active-path"}>
            ${A?v`<span aria-hidden="true">${A===2&&l!=="direct"?"":"\u2192"}</span>`:E}
            ${C}</li>`)}
        </ol>
        <p>${l==="pi"?"Voie PI active":l==="direct"?"Voie directe d\xE9clar\xE9e":"Chemin actif non v\xE9rifi\xE9"}</p>
        <p>↶ Retour de la mesure · ${h("model","Mod\xE8le thermique")}</p>
      </section>
      <aside class="publication" aria-labelledby="inspection-title">
        <h3 id="inspection-title" tabindex="-1">${t?"Publication s\xE9lectionn\xE9e":"En direct"}</h3>
        <p role="status" class="inspection-status">
          ${o} · ${t?.observedAt?"Observation de session":"Publication"} ·
          ${p&&Number.isFinite(p.valueOf())?v`<time datetime=${p.toISOString()}>${p.toLocaleString()}</time>`:"Horodatage indisponible"}
        </p>
        <dl>
          <dt>État publié</dt><dd>${r.state}</dd>
          ${g.map(([C,A,D])=>v`<dt>${C}</dt>
            <dd>${u(t?Je(t,A):S(e.live,A),D)}</dd>`)}
          ${t?v`<dt>Écart à la consigne filtrée</dt><dd>${u(Je(t,"error")," \xB0C")}</dd>`:E}
          <dt>État de l’intégrale</dt><dd>${u(S(r.live,"temperature.integral_mode"))}</dd>
          <dt>Saturation déclarée</dt><dd>${u(S(r.live,"control.saturation_state"))}</dd>
          <dt>Limitation par temporisation</dt><dd>${u(S(r.live,"analysis.control.forced_by_timing"))}</dd>
        </dl>
        <div id="block-detail">
          ${d?v`<h4 id="block-title" tabindex="-1">
              ${{pi:"D\xE9tails PI",ff:"D\xE9tails anticipation",model:"D\xE9tails du mod\xE8le"}[d]}
            </h4>
            <dl>${w[d].map(([C,A,D])=>v`<dt>${C}</dt>
              <dd>${u(t?Je(t,A):S(e.live,A),D)}</dd>`)}
              ${d==="pi"?v`<dt>Erreur de la voie P</dt>
                <dd>${u(S(r.live,"analysis.control.error_p")," \xB0C")}</dd>
                <dt>Erreur brute de la voie I</dt>
                <dd>${u(S(r.live,"temperature.error")," \xB0C")}</dd>`:E}
              ${d==="ff"?v`<dt>État FF3</dt>
                <dd>${u(S(r.live,"feedforward.ff3_status"))}</dd>`:E}
              ${d==="model"?v`<dt>Équilibre estimé par le Twin</dt><dd>${k}</dd>`:E}
            </dl>`:E}
        </div>
        <button type="button" aria-disabled=${!t} @click=${()=>{this.inspection=void 0}}>
          Revenir au direct
        </button>
        <button type="button" @click=${()=>this.renderRoot.querySelector("#journal-title")?.focus()}>
          Voir le journal
        </button>
      </aside>`}render(){let e=this.diagnostic;if(!e)return E;let t=this.usingRecorder,n=t?this.recorder:this.session,{samples:r,events:l,tracking:o}=this.windowData(n),p=this.tab==="learning",u=p?Na(n).filter(x=>x.time>=this.range[0]&&x.time<=this.range[1]&&!this.hiddenLearning.includes(x.kind)):[],g=this.tab==="regulation",d=this.tab==="evolution",h=this.inspection,_=d&&h?.entityId===e.entityId&&h.recorder===t?r.find(x=>x.time===h.time):void 0,w=(x,k,C=!1)=>v`<section class=${C?"chart command-chart":"chart"}>
        <smartpi-time-chart
          .heading=${x}
          .marks=${p&&k===Or?u:[]}
          .thermalPhases=${p&&k===Or}
          .samples=${r}
          .curves=${k}
          .range=${this.range}
          .percent=${C}
          .syncKey=${e.entityId}
          .inspectable=${d}
          .selectedTime=${_?.time??null}
          @inspect-publication=${A=>this.inspect(A.detail)}
          @time-range=${A=>{A.detail[1]>A.detail[0]&&(this.followNow=!1,this.range=A.detail)}}
        ></smartpi-time-chart>
      </section>`;return v`<div class="workspace">
      <div class="top">
        <div>
          <h2>Observatoire de la régulation</h2>
          <span class="subtitle">${e.name}</span>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${x=>this.expert=x.target.checked}
          />
          Mode expert</label
        >
      </div>
      <nav aria-label="Vues de diagnostic">
        ${[["evolution","Supervision"],["regulation","R\xE9gulation en direct"],["model","Sant\xE9 du mod\xE8le"],["learning","Apprentissage"]].map(([x,k])=>v`<button
              class=${this.tab===x?"active":""}
              aria-pressed=${this.tab===x}
              @click=${()=>{this.livePublicationMissing=!1,this.tab=x}}
            >
              ${k}
            </button>`)}
      </nav>
      ${g?v`<p class="foot">La période et la source ci-dessous concernent le graphe historique. Le schéma reste l’instantané actuel.</p>`:E}
      <div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
          ${[1,3,6,12,24,48].map(x=>v`<button
                aria-pressed=${x===this.hours}
                class=${x===this.hours?"chosen":""}
                @click=${()=>{this.hours=x,this.reset()}}
              >
                ${x} h
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
          >${t?"Recorder \xB7 historique persistant":"Historique de session \xB7 m\xE9moire temporaire"}</strong
        ><span
          >${r.length} publications ·
          ${new Date(this.range[0]*1e3).toLocaleString()} →
          ${new Date(this.range[1]*1e3).toLocaleString()}</span
        ><label
          ><input
            type="checkbox"
            .checked=${this.preferSession}
            @change=${x=>{this.inspection=void 0,this.livePublicationMissing=!1,this.preferSession=x.target.checked}}
          />
          Session uniquement</label
        >
      </div>
      ${t?E:v`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${x=>{this.followNow=x.target.checked,this.followNow&&this.reset()}}
            />
            Suivre les nouvelles publications de session</label
          >`}
      ${this.loading?v`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`:E}
      ${this.error?v`<p role="status" class="notice">${this.error}</p>`:E}
      ${r.length?E:v`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`}
      ${d&&this.livePublicationMissing?v`<p class="notice" role="status">La publication du direct est introuvable dans la source et la fenêtre affichées. L’inspecteur affiche l’instantané actuel.</p>`:E}
      ${this.tab==="evolution"?v`<div class="supervision">
            ${this.inspectionPanel(e,_,t)}
            <div class="trends">
            ${w("Temp\xE9rature et consigne filtr\xE9e",xl)}
            ${w("Commande du r\xE9gulateur \xB7 pas des watts",Cn,!0)}
            ${w("\xC9cart consigne filtr\xE9e \u2212 temp\xE9rature int\xE9rieure",[{label:"\xC9cart filtr\xE9",path:"error",color:"#bc7254",unit:"\xB0C"}])}
            <p class="foot">
              Écart calculé uniquement avec deux valeurs du même état. Ce n’est
              pas l’erreur de l’intégrateur ni une mesure de confort. Aucune
              zone de bande morte n’est extrapolée. Les points sont des
              publications irrégulières ; une ligne ne constitue pas une mesure
              intermédiaire.
            </p>
            ${this.trackingPanel(o,r.length)}
            <section class="chart"><smartpi-diagnostic-projection .samples=${r} kind="scatter"
              .source=${t?"Recorder":"Session"} .contextId=${`${e.entityId}/${t}/${this.range.join("/")}`}
              .inspectable=${!0} @inspect-publication=${x=>this.inspect(x.detail)}></smartpi-diagnostic-projection></section>
            </div></div>`:this.tab==="regulation"?v`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${e}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
                <button class="open-supervision" type="button"
                  @click=${()=>void this.openLivePublication()}>Voir dans Supervision</button>
              </section>
              <details class="pane chain-details">
                <summary>Chaîne de commande détaillée</summary>
                <smartpi-command-chain .diagnostic=${e}></smartpi-command-chain>
              </details>
              <section class="pane command-comparison">
                <p class="foot">${t?"Recorder":"Session"} · ${new Date(this.range[0]*1e3).toLocaleString()} → ${new Date(this.range[1]*1e3).toLocaleString()}</p>
                <smartpi-time-chart heading="Demande et sortie · écart de commande"
                  .samples=${r} .range=${this.range} .percent=${!0} .commandComparison=${!0} .syncKey=${e.entityId}
                  .curves=${[Cn[1],Cn[0]]}
                  @time-range=${x=>{x.detail[1]>x.detail[0]&&(this.followNow=!1,this.range=x.detail)}}></smartpi-time-chart>
                <p class="foot">La zone relie la demande publiée et la sortie appliquée de la même publication.
                  Ce n’est ni une énergie perdue ni un diagnostic de cause. Les motifs historiques
                  ne sont disponibles que si cette source les a conservés. Les données manquantes et
                  interruptions supérieures à 10 min coupent le tracé. Les courbes en escalier ne sont pas des mesures intermédiaires.</p>
              </section>`:p?v`
              <section class="pane">
                <div class="periods" role="group" aria-label="Repères d’apprentissage">
                  ${vd.map((x,k)=>v`
                    <button type="button" aria-pressed=${!this.hiddenLearning.includes(x)}
                      @click=${()=>{this.hiddenLearning=this.hiddenLearning.includes(x)?this.hiddenLearning.filter(C=>C!==x):[...this.hiddenLearning,x]}}>${["\u25CF","\u25C6","\u2191","\u2193"][k]} ${x}</button>`)}
                </div>
                <p class="foot">Les repères sont datés à la publication ou à l’observation.
                  Les lettres A et B indiquent une hausse du compteur de mises à jour
                  acceptées ou de mesures collectées entre deux publications. Le détail distingue les deux. Deux lettres à la même date peuvent
                  regrouper des apprentissages survenus à des instants différents.
                  ${r.some(x=>S(x.live,"learning")!==void 0)?"Consultez le d\xE9tail pour conna\xEEtre l\u2019intervalle observ\xE9.":"Cette source ne contient pas les compteurs historiques. Les rep\xE8res A/B sont indisponibles ici. La session conserve les diagnostics re\xE7us pendant l\u2019ouverture du panneau."}
                  Zoomez pour séparer les repères rapprochés.</p>
                <p class="foot">Fond orange · température en hausse. Fond bleu · température
                  en baisse. Fond neutre · valeur stable ou absente. Ces intervalles
                  comparent les mesures successives.</p>
                ${t&&!r.some(x=>S(x.live,"learning")!==void 0)?v`<p class="notice">Le Recorder sélectionné contient les courbes, mais pas les
                    compteurs d’apprentissage. Les événements passés ne peuvent pas être datés.
                    <button type="button" @click=${()=>{this.preferSession=!0,this.inspection=void 0}}>
                      Observer les prochains apprentissages en session</button></p>`:E}
                ${w("Temp\xE9rature et consigne filtr\xE9e",Or)}
                ${w("Activit\xE9 du r\xE9gulateur \xB7 commande appliqu\xE9e",[Cn[0]],!0)}
                <p class="foot">En mode chauffage, une commande positive correspond à une
                  chauffe commandée, zéro à un arrêt de commande. La température peut
                  encore monter après l’arrêt. La commande est exprimée en pourcentage.</p>
                ${r.some(x=>S(x.live,"learning.emea_samples_a")!==void 0||S(x.live,"learning.emea_samples_b")!==void 0)?w("Collecte du mod\xE8le \xB7 nombre de mesures conserv\xE9es",[{label:"Mesures A",path:"live.learning.emea_samples_a",color:"#17638d",unit:"mesures",step:!0},{label:"Mesures B",path:"live.learning.emea_samples_b",color:"#6f448a",unit:"mesures",step:!0}]):E}
                <p>Temps morts actuels · chauffe
                  ${P(at(e.live,"model.deadtime_heat_s","model.deadtime_heat_reliable")," s")}
                  · refroidissement
                  ${P(at(e.live,"model.deadtime_cool_s","model.deadtime_cool_reliable")," s")}</p>
                <p class="foot">↑ Chauffe et ↓ Refroidissement repèrent des publications.
                  Les durées sont des médianes. Les bornes des épisodes ne sont pas publiées.
                  ${r.some(x=>S(x.live,"analysis.deadtime")||S(x.live,"model.deadtime_heat_reliable")!==void 0||S(x.live,"model.deadtime_cool_reliable")!==void 0)?"La couverture d\xE9pend des donn\xE9es pr\xE9sentes dans chaque publication.":"Cette fen\xEAtre ne contient pas de diagnostics historiques de temps mort."}</p>
                <details>
                  <summary>Détail des repères (${u.length})</summary>
                  ${u.length?v`<ol>
                    ${u.slice(-60).reverse().map(x=>v`<li>
                      <time datetime=${new Date(x.time*1e3).toISOString()}>${new Date(x.time*1e3).toLocaleString()}</time>
                      ${x.observedAt?" (observation)":""} · ${x.label}
                    </li>`)}
                  </ol>
                  ${u.length>60?v`<p class="foot">60 derniers repères. Zoomez pour consulter une plage plus courte.</p>`:E}`:v`<p>Aucun repère observable avec les filtres et les données de cette fenêtre.</p>`}
                </details>
              </section>`:v`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${P(S(e.live,"model.confidence"))}</span
                >
              </div>
              ${w("A \xB7 gain de chauffe estim\xE9",[{label:"A appris",path:"model.a",color:"#2689ca",unit:"\xB0C/min/u",step:!0}])}
              ${w("B \xB7 pertes thermiques estim\xE9es",[{label:"B appris",path:"model.b",color:"#39a38a",unit:"min\u207B\xB9",step:!0}])}
              <p class="foot">
                La confiance actuelle ne valide pas rétroactivement ces séries.
                Le contrat history ne contient pas de confiance historique ni de
                mesures de référence A/B.
              </p>
              <section class="pane"><smartpi-diagnostic-projection .samples=${r} kind="model"
                .source=${t?"Recorder":"Session"} .contextId=${`${e.entityId}/${t}/${this.range.join("/")}`}>
              </smartpi-diagnostic-projection></section>
              <section class="pane">
                <h3>Temps morts · instantané</h3>
                <div class="metrics">
                  ${[["Chauffe","model.deadtime_heat_s","model.deadtime_heat_reliable"],["Refroidissement","model.deadtime_cool_s","model.deadtime_cool_reliable"],["Constante \u03C4","model.tau_min","model.tau_reliable"]].map(([x,k,C])=>v`<div>
                        <span>${x}</span
                        ><strong
                          >${P(at(e.live,k,C),k==="model.tau_min"?" min":" s")}</strong
                        ><small
                          >Fiable : ${P(S(e.live,C))}</small
                        >
                      </div>`)}
                </div>
                <p>
                  Détection : ${P(S(e.live,"analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${P(S(e.live,"analysis.twin.twin_model_reliable"))} ·
                  Initialisation du Twin :
                  ${P(S(e.live,"analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[["Temp\xE9rature estim\xE9e","twin_T_hat"," \xB0C"],["Temp\xE9rature pr\xE9dite","twin_T_pred"," \xB0C"],["Innovation","twin_innovation"," \xB0C"],["RMSE innovation \xB7 EMA","twin_rmse_30"," \xB0C"],["Perturbation estim\xE9e","twin_perturbation_dTdt"," \xB0C/min"]].map(([x,k,C])=>v`<div>
                        <span>${x}</span
                        ><strong
                          >${P(at(e.live,"analysis.twin."+k),C,4)}</strong
                        >
                      </div>`)}
                </div>
                <p>
                  Équilibre :
                  ${P(at(e.live,"analysis.twin.twin_T_steady","analysis.twin.twin_T_steady_reliable")," \xB0C")}
                  · Consigne atteignable (prédiction) :
                  ${P(at(e.live,"analysis.twin.twin_setpoint_reachable","analysis.twin.twin_T_steady_reliable"))}
                </p>
                <p class="foot">
                  Aucune courbe Twin : ces valeurs ne font pas partie des huit
                  séries Recorder standard. Fiabilité déclarée ≠ exactitude
                  physique démontrée.
                </p>
              </section>
            `}
      ${g||p?E:v`<section class="timeline">
        <h3 id="journal-title" tabindex="-1">
          Journal des publications
          <span>${l.length} variations observées</span>
        </h3>
        <p class="foot">
          Annotations issues d’une comparaison d’états, pas d’événements
          internes explicitement horodatés. Les motifs absents de Recorder ne
          sont pas reconstruits.
        </p>
        <ol>
          ${l.slice(-60).reverse().map(x=>v`<li>
                  <time>${new Date(x.time*1e3).toLocaleString()}</time>
                  <div>
                    ${d?v`<button type="button" aria-pressed=${_?.time===x.time}
                          @click=${()=>void this.inspectEvent(x.time)}>${x.label}</button>`:v`<strong>${x.label}</strong>`}${this.expert?v`<p>${x.provenance}</p>`:E}
                  </div>
                </li>`)}
        </ol>
        ${l.length===0?v`<p>Aucune transition observable sur cette fenêtre.</p>`:v`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>`}
      ${this.expert?v`<details class="provenance">
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
          </details>`:E}
    </div>`}};Re.styles=Ze`
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
  `,I([se({attribute:!1})],Re.prototype,"hass",2),I([se({attribute:!1})],Re.prototype,"diagnostic",2),I([se({attribute:!1})],Re.prototype,"session",2),I([re()],Re.prototype,"tab",2),I([re()],Re.prototype,"hiddenLearning",2),I([re()],Re.prototype,"expert",2),I([re()],Re.prototype,"hours",2),I([re()],Re.prototype,"end",2),I([re()],Re.prototype,"range",2),I([re()],Re.prototype,"recorder",2),I([re()],Re.prototype,"loading",2),I([re()],Re.prototype,"error",2),I([re()],Re.prototype,"preferSession",2),I([re()],Re.prototype,"followNow",2),I([re()],Re.prototype,"inspection",2),I([re()],Re.prototype,"livePublicationMissing",2),I([re()],Re.prototype,"block",2),Re=I([Xe("smartpi-visual-diagnostics")],Re);var Di={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},yl=s=>(...i)=>({_$litDirective$:s,values:i}),Tn=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:pm}=za;var _l=s=>s.strings===void 0;var yd={},wl=(s,i=yd)=>s._$AH=i;var $l=yl(class extends Tn{constructor(s){if(super(s),s.type!==Di.PROPERTY&&s.type!==Di.ATTRIBUTE&&s.type!==Di.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_l(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[i]){if(i===Ct||i===E)return i;let e=s.element,t=s.name;if(s.type===Di.PROPERTY){if(i===e[t])return Ct}else if(s.type===Di.BOOLEAN_ATTRIBUTE){if(!!i===e.hasAttribute(t))return Ct}else if(s.type===Di.ATTRIBUTE&&e.getAttribute(t)===i+"")return Ct;return wl(s),i}});var kl={none:"Manuel",frost:"Hors gel",eco:"\xC9co",comfort:"Confort",boost:"Boost",activity:"Activit\xE9"},Mt=class{constructor(i,e){this.hass=i;this.diagnostic=e;let t=e.climateId?i?.states[e.climateId]:void 0,n=Object.values(i?.states??{}).filter(r=>r.entity_id.startsWith("climate.")&&S(r.attributes,"specific_states.regulation_diagnostics")===e.entityId);this.climate=n.length===1&&t?.entity_id.startsWith("climate.")&&S(t.attributes,"specific_states.regulation_diagnostics")===e.entityId?t:void 0}get attributes(){return this.climate?.attributes??{}}get available(){return this.diagnostic.available&&!!this.climate&&!["unknown","unavailable"].includes(this.climate.state)}get unit(){let i=S(this.attributes,"configuration.temperature_unit")??this.attributes.temperature_unit??this.hass?.config?.unit_system?.temperature;return i==="\xB0C"||i==="\xB0F"?i:null}get measured(){return this.diagnostic.available?X(S(this.diagnostic.live,"temperature.indoor")):null}get target(){return this.available?X(this.attributes.temperature):null}get filtered(){return this.diagnostic.available?X(S(this.diagnostic.live,"setpoint.filtered_setpoint")):null}get minimum(){return X(this.attributes.min_temp)}get maximum(){return X(this.attributes.max_temp)}get step(){let i=X(this.attributes.target_temp_step)??X(S(this.attributes,"configuration.target_temperature_step"));return i!==null&&i>0?i:null}get locked(){return S(this.attributes,"specific_states.is_locked")===!0}get canSetTemperature(){let i=X(this.attributes.supported_features);return this.available&&!this.locked&&this.unit!==null&&this.target!==null&&this.minimum!==null&&this.maximum!==null&&this.maximum>this.minimum&&this.step!==null&&i!==null&&(i&1)!==0&&!["heat_cool","auto"].includes(this.climate.state)}get presets(){let i=this.attributes.preset_modes;if(!this.available||!Array.isArray(i))return[];let e=["off","not_home"].includes(String(S(this.attributes,"presence_manager.presence_state"))),t=this.climate?.state==="cool"?"_cool":"",n=this.climate?.state==="heat"||this.climate?.state==="cool";return[...new Set(i.filter(r=>typeof r=="string"&&r.length>0))].map(r=>({id:r,label:Object.hasOwn(kl,r)?kl[r]:r,temperature:n&&this.unit!==null&&!["none","activity"].includes(r)?X(S(this.attributes,`preset_temperatures.${r}${t}${e?"_away":""}_temp`)):null}))}get canSetPreset(){let i=X(this.attributes.supported_features);return this.available&&!this.locked&&i!==null&&(i&16)!==0&&this.presets.length>0}get context(){return JSON.stringify([this.diagnostic.entityId,this.climate?.entity_id,this.available,this.climate?.state,this.attributes.temperature,this.attributes.preset_mode,this.minimum,this.maximum,this.step,this.unit,this.locked,this.attributes.supported_features,this.presets])}choiceTemperature(i){return i?.kind==="temperature"?i.value:i?.kind==="preset"?this.presets.find(e=>e.id===i.value)?.temperature??null:this.target}validate(i){if(!i||i.kind!=="temperature"&&i.kind!=="preset")return!1;if(i.kind==="preset")return this.canSetPreset&&this.presets.some(l=>l.id===i.value);if(!this.canSetTemperature||!Number.isFinite(i.value))return!1;let{minimum:e,maximum:t,step:n}=this;if(i.value<e||i.value>t)return!1;let r=(i.value-e)/n;return Math.abs(r-Math.round(r))<1e-6}shift(i,e){let t=this.minimum,n=this.maximum,r=this.step,l=(i-t)/r,o=e>0?Math.floor(l+1e-6)+1:Math.ceil(l-1e-6)-1;return Number(Math.min(n,Math.max(t,t+o*r)).toFixed(6))}get scale(){let i=[this.measured,this.target,...this.presets.map(n=>n.temperature)].filter(n=>n!==null),e=i.length?Math.min(...i):16,t=i.length?Math.max(...i):22;return[Math.floor(e-1),Math.ceil(Math.max(t+1,e+4))]}currentPublication(i){if(!this.available)return!1;let e=Date.parse(this.diagnostic.lastUpdated??""),t=Date.parse(this.climate.last_changed??this.climate.last_updated??"");return Number.isFinite(i)&&Number.isFinite(e)&&Number.isFinite(t)&&e>=t&&i-e<=6e5&&e<=i+6e4}appliedEffort(i=Date.now()){if(!this.currentPublication(i))return null;let e=X(S(this.diagnostic.live,"power.applied_percent"));if(e===null||e<0||e>100)return null;let t=this.climate.state;return{percent:e,direction:t==="heat"?1:t==="cool"?-1:0,label:t==="heat"?"Commande de chauffe":t==="cool"?"Commande de refroidissement":"Commande appliqu\xE9e"}}setpointPosition(i=Date.now()){if(!this.currentPublication(i)||this.unit===null||this.measured===null||this.target===null||!["heat","cool"].includes(this.climate.state))return null;let e=Math.round(this.measured*10)-Math.round(this.target*10);return Number.isFinite(e)?{kind:e===0?"aligned":e>0?"above":"below",overshoot:this.climate.state==="heat"?e>0:e<0,direction:e===0?0:e>0?-1:1,gap:Math.abs(e)/10,target:this.target}:null}eta(i=!1,e=Date.now()){if(i||!this.available||this.target===null||this.measured===null||this.unit===null||!["heat","cool"].includes(this.climate.state))return null;let t=Date.parse(this.diagnostic.lastUpdated??""),n=Date.parse(this.climate.last_updated??"");if(!Number.isFinite(t)||!Number.isFinite(n)||t<n||e-t>10*6e4||t>e+6e4)return null;let r=this.diagnostic.live,l=g=>S(r,"analysis.twin."+g);if(l("twin_status")!=="ok"||l("twin_model_reliable")!==!0||l("twin_warming_up")!==!1||S(r,"model.tau_reliable")!==!0)return null;let o=X(l("eta_s")),p=l("eta_reason");if(p==="already_reached"&&o===0)return{label:"\xC0 la consigne",detail:"Selon la tol\xE9rance du Twin SmartPI.",seconds:0};if(p!=="ok"||o===null||o<=0||o>48*3600)return null;let u=Math.ceil(o/60);return{label:u<60?`\u2248 ${u} min`:`\u2248 ${Math.floor(u/60)} h ${String(u%60).padStart(2,"0")}`,detail:"Meilleur cas du Twin \xB7 conditions constantes, commande maximale en chauffe. Pas une heure d\u2019arriv\xE9e garantie.",seconds:o}}};var ii=class{constructor(i){this.hass=i}async request(i,e,t={}){if(!i.startsWith("sensor.")||typeof this.hass.callWS!="function")throw new Error("L\u2019observatoire local n\u2019est pas disponible dans cette connexion.");let n;try{return await Promise.race([this.hass.callWS({type:"smartpi_dashboard/observatory",entity_id:i,action:e,payload:t}),new Promise((r,l)=>{n=setTimeout(()=>l(new Error(e==="get"?"L\u2019observatoire ne r\xE9pond pas. R\xE9essayez.":"R\xE9sultat non confirm\xE9. Actualisez le carnet avant de r\xE9essayer.")),8e3)})])}catch(r){throw Le(r)&&typeof r.message=="string"&&!(r instanceof Error)?new Error(r.message.slice(0,300)):r}finally{clearTimeout(n)}}static room(i){let e=d=>typeof d=="string"&&d.length>0&&d.length<=100,t=d=>typeof d=="number"&&Number.isFinite(d),n=d=>d===null||t(d),r=d=>t(d)&&d>=0&&d<=864e10,l=(d,h,_)=>d[h]===void 0||_(d[h]),o=d=>d==="\xB0C"||d==="\xB0F",p=d=>e(d.id)&&r(d.started_at)&&l(d,"reason",e)&&l(d,"ended_at",r),u=d=>Le(d)&&(d.kind==="temperature"?t(d.value):d.kind==="preset"&&e(d.value)),g={bookmarks:[30,d=>e(d.id)&&e(d.label)&&r(d.created_at)&&t(d.temperature)&&t(d.target)&&o(d.unit)&&n(d.outdoor)&&(d.preset===null||e(d.preset))],receipts:[50,d=>p(d)&&["pending","observed","excluded"].includes(String(d.status))&&u(d.choice)&&(d.unit===null||o(d.unit))&&["pending","accepted","uncertain"].includes(String(d.service_result))&&(d.confirmed_at===null||r(d.confirmed_at))&&["applied_at","response_at"].every(h=>l(d,h,r))&&["applied_percent","response_temperature"].every(h=>l(d,h,t))],trials:[50,d=>p(d)&&e(d.label)&&t(d.target)&&o(d.unit)&&n(d.baseline)&&n(d.outdoor)&&["pending","finished","excluded"].includes(String(d.status))&&["unknown","good","cold","hot"].includes(String(d.feedback))&&l(d,"missing_publications",h=>Number.isSafeInteger(h)&&h>=0)&&Le(d.summary)&&Number.isSafeInteger(d.summary.publications)&&d.summary.publications>=0&&["minimum","maximum","last","max_abs_error","outdoor_min","outdoor_max"].every(h=>n(d.summary[h]))&&["first_at","last_at"].every(h=>d.summary[h]===null||r(d.summary[h]))],forecasts:[100,d=>p(d)&&t(d.target)&&t(d.temperature)&&o(d.unit)&&t(d.eta_s)&&d.eta_s>0&&d.eta_s<=172800&&["pending","reached","excluded"].includes(String(d.status))&&l(d,"outdoor",n)&&(d.status!=="reached"||r(d.observed_at)&&t(d.observed_s)&&d.observed_s>=0)]};if(!Le(i)||i.current!==null&&!Le(i.current)||!Object.entries(g).every(([d,[h,_]])=>Array.isArray(i[d])&&i[d].length<=h&&i[d].every(w=>Le(w)&&_(w))))throw new Error("R\xE9ponse de l\u2019observatoire non reconnue. Rechargez apr\xE8s la mise \xE0 jour du composant.");return i}};async function Sl(s,i,e,t,n=()=>!0){e={...e};let r=ns(s).find(g=>g.entityId===i.entityId&&g.climateId===i.climateId);if(!r||typeof s.callService!="function")throw new Error("Commande indisponible dans cette connexion.");let l=new Mt(s,r);if(l.context!==t)throw new Error("Le thermostat a chang\xE9. S\xE9lectionnez \xE0 nouveau votre choix.");if(!l.validate(e))throw new Error("Ce r\xE9glage n\u2019est plus disponible ou ne respecte pas les limites du thermostat.");let o=new ii(s),p=null,u=!1;try{let g=await o.request(r.entityId,"receipt_begin",{choice:e});Le(g)&&typeof g.id=="string"&&(p=g.id)}catch{}try{let g=ns(s).find(h=>h.entityId===i.entityId&&h.climateId===i.climateId),d=g?new Mt(s,g):void 0;if(!n()||!d||d.context!==t||!d.validate(e))throw new Error("Le thermostat a chang\xE9 avant l\u2019envoi. S\xE9lectionnez \xE0 nouveau votre choix.");u=!0,e.kind==="temperature"?await s.callService("climate","set_temperature",{entity_id:r.climateId,temperature:e.value}):await s.callService("climate","set_preset_mode",{entity_id:r.climateId,preset_mode:e.value})}catch(g){throw p&&await o.request(r.entityId,"receipt_finish",{id:p,success:!1,not_sent:!u}).catch(()=>{}),g}return p&&await o.request(r.entityId,"receipt_finish",{id:p,success:!0}).catch(()=>{}),{receipt:p}}var Al={hvac_off_manual:"Arr\xEAt manuel publi\xE9",hvac_off_auto_start_stop:"Arr\xEAt automatique publi\xE9",hvac_off_window_detection:"Fen\xEAtre ouverte : arr\xEAt publi\xE9",hvac_off_sleep_mode:"Mode sommeil publi\xE9",hvac_off_safety_detection:"S\xE9curit\xE9 : arr\xEAt publi\xE9",hvac_off_central_mode:"Mode central : arr\xEAt publi\xE9",hvac_off_inhibition:"Inhibition : arr\xEAt publi\xE9",overpowering_detected:"D\xE9lestage d\xE9tect\xE9",safety_detected:"S\xE9curit\xE9 d\xE9tect\xE9e",target_temp_window_eco:"Fen\xEAtre ouverte : consigne \xC9co retenue",target_temp_window_frost:"Fen\xEAtre ouverte : consigne hors gel retenue",target_temp_power:"Consigne de d\xE9lestage retenue",target_temp_central_mode:"Consigne du mode central retenue",target_temp_activity_detected:"Consigne li\xE9e \xE0 l\u2019activit\xE9",target_temp_activity_not_detected:"Consigne li\xE9e \xE0 l\u2019absence d\u2019activit\xE9",target_temp_absence_detected:"Consigne d\u2019absence retenue",target_temp_timed_preset:"Preset temporis\xE9 actif",not_initialized:"Initialisation incompl\xE8te",underlying_unavailable:"\xC9quipement sous-jacent indisponible"},Pn=class{constructor(i){this.model=i}get reasons(){if(!this.model.available)return[];let i=this.model.attributes,e=S(i,"specific_states.messages"),n=[["off","sleep"].includes(this.model.climate?.state??"")?S(i,"specific_states.hvac_off_reason"):null,S(i,"specific_states.hvac_mode_reason"),...Array.isArray(e)?e:[]];return S(i,"specific_states.inhibition.inhibited")===!0&&n.unshift("hvac_off_inhibition"),[...new Set(n.filter(r=>typeof r=="string"&&r.length>0))].map(r=>({code:r,label:Object.hasOwn(Al,r)?Al[r]:r}))}get requested(){let i=this.model.attributes.requested_state;return i&&typeof i=="object"&&!Array.isArray(i)?i:{}}get requestedTemperature(){return X(this.requested.target_temperature)}advice(i){if(!i||!this.model.available)return[];let e=[];this.model.locked&&e.push("Le thermostat est verrouill\xE9."),this.model.climate?.state==="off"&&e.push("Le thermostat est arr\xEAt\xE9. Changer la consigne ne le remettra pas automatiquement en marche."),this.reasons.some(l=>["hvac_off_window_detection","hvac_off_safety_detection","hvac_off_inhibition","hvac_off_central_mode","overpowering_detected","target_temp_power","target_temp_window_eco","target_temp_window_frost"].includes(l.code))&&e.push("Une priorit\xE9 publi\xE9e intervient. Ce choix ne supprime pas cette priorit\xE9.");let t=this.model.choiceTemperature(i),n=this.model.target,r=X(S(this.model.diagnostic.live,"power.applied_percent"));return this.model.climate?.state==="heat"&&t!==null&&n!==null&&t>n&&r===100&&e.push("La commande appliqu\xE9e est d\xE9j\xE0 \xE0 100 %. Monter la consigne n\u2019augmentera pas la commande actuelle."),i.kind==="temperature"&&this.model.attributes.preset_mode!=="none"&&e.push("Une temp\xE9rature manuelle remplace le preset actif. Vos plannings restent g\xE9r\xE9s \xE0 l\u2019ext\xE9rieur du panneau."),e}};var Et=class extends Ee{constructor(){super(...arguments);this.sending=!1;this.message="";this.failed=!1;this.context="";this.generation=0}willUpdate(){if(!this.diagnostic)return;let e=new Mt(this.hass,this.diagnostic).context;if(e!==this.context){let t=!this.context;this.context=e,this.choice=void 0,this.message=t?"":this.sending?"Le thermostat a chang\xE9. V\xE9rifiez les valeurs re\xE7ues.":"",this.failed=!1,this.awaitingPublication=t?void 0:this.diagnostic.lastUpdated,++this.generation}}updated(){clearTimeout(this.etaTimer);let e=Date.parse(this.diagnostic?.lastUpdated??"")+600001-Date.now();Number.isFinite(e)&&e>0&&(this.etaTimer=setTimeout(()=>this.requestUpdate(),e))}disconnectedCallback(){++this.generation,clearTimeout(this.etaTimer),super.disconnectedCallback()}choose(e){this.sending||(this.choice=e,this.message="",this.failed=!1)}cancel(){this.choice=void 0,this.message=""}async previewTemperature(e){if(!this.diagnostic||this.sending)return!1;let t={kind:"temperature",value:e};return new Mt(this.hass,this.diagnostic).validate(t)?(this.choose(t),await this.updateComplete,this.renderRoot.querySelector(".apply")?.focus(),!0):!1}async apply(){if(!this.hass||!this.diagnostic||!this.choice||this.sending)return;let e=++this.generation,t=this.choice,n=this.context,r=Symbol();this.activeRequest=r,this.sending=!0,this.message="Envoi en cours\u2026",this.failed=!1;try{let l=await Sl(this.hass,this.diagnostic,t,n,()=>this.isConnected&&e===this.generation&&!!this.diagnostic&&new Mt(this.hass,this.diagnostic).context===n);if(e!==this.generation||!this.isConnected)return;this.awaitingPublication=this.diagnostic.lastUpdated,this.choice=void 0,this.message="Demande envoy\xE9e. Les valeurs affich\xE9es restent celles re\xE7ues de Home Assistant."+(l.receipt?"":" Re\xE7u non disponible.")}catch(l){if(e!==this.generation||!this.isConnected)return;this.failed=!0,this.message=l instanceof Error?l.message:"Envoi impossible. V\xE9rifiez le thermostat avant de r\xE9essayer."}finally{this.activeRequest===r&&(this.activeRequest=void 0,this.sending=!1),this.dispatchEvent(new CustomEvent("observatory-refresh",{detail:{entityId:this.diagnostic?.entityId},bubbles:!0,composed:!0}))}}render(){if(!this.diagnostic)return E;let e=new Mt(this.hass,this.diagnostic),t=new Pn(e),n=t.advice(this.choice),r=e.unit??"",l=e.choiceTemperature(this.choice),[o,p]=e.scale,u=Math.min(o,l??o),g=Math.max(p,l??p),d=F=>60+(F-u)/(g-u)*880,h=e.measured,_=e.target,w=e.appliedEffort(),x=e.setpointPosition(),k=this.awaitingPublication!==void 0&&this.awaitingPublication===this.diagnostic.lastUpdated?null:e.eta(!!this.choice),C=typeof this.hass?.callService=="function",A=e.presets.find(F=>F.id===(this.choice?.kind==="preset"?this.choice.value:e.attributes.preset_mode)),D=this.choice?.kind==="preset"?A?.label??this.choice.value:"Temp\xE9rature manuelle",R=Array.from({length:5},(F,O)=>u+(g-u)*O/4);return v`<section aria-labelledby="journey-title">
      <div class="heading"><h3 id="journey-title">Trajet thermique</h3>
        <span class="mode">${e.available?e.climate?.state==="off"?"Thermostat arr\xEAt\xE9":e.attributes.hvac_action==="heating"?"En chauffe":e.attributes.hvac_action==="cooling"?"En refroidissement":"En direct":"Thermostat indisponible"}</span></div>
      <div class="readings">
        <div><span class="caption"><i class="dot"></i>Actuellement</span><strong class="measured" aria-label=${h===null?"Temp\xE9rature indisponible":E}>${h===null?"\u2014":P(h,"",1)}<small> ${r}</small></strong></div>
        <div class="destination"><span class="caption"><i class="diamond"></i>Consigne active</span><strong aria-label=${_===null?"Consigne indisponible":E}>${_===null?"\u2014":P(_,"",1)}<small> ${e.unit??""}</small></strong>
          <span class="preset-name">${e.presets.find(F=>F.id===e.attributes.preset_mode)?.label??""}</span></div>
      </div>
      <div class="effort-band" aria-label="Commande et écart à la consigne active">
        ${w?v`
          <div class="effort-heading"><span>${w.label}</span><strong>${w.percent>0&&w.percent<.01?"< 0,01 %":P(w.percent," %",2)}</strong></div>
          <div class=${"effort-track "+(w.direction<0?"cool":w.direction===0?"neutral":"heat")}
            role="meter" aria-label=${w.label+" appliqu\xE9e"} aria-valuemin="0" aria-valuemax="100" aria-valuenow=${w.percent} aria-valuetext=${P(w.percent," % appliqu\xE9s",4)}>
            ${w.percent>0?v`<span class=${"effort-arrow "+(w.direction<0?"reverse":w.direction===0?"neutral":"")} style=${`width:${w.percent}%`} aria-hidden="true"></span>`:E}
          </div>`:v`<p class="effort-missing">Commande appliquée · données récentes indisponibles</p>`}
        <div class=${"setpoint-position "+(x?.overshoot?"overshoot":"")}>
          ${x?.overshoot?v`<span class="return-chevron" data-direction=${x.direction<0?"left":"right"} aria-hidden="true">${x.direction<0?"\u2039":"\u203A"}</span>
            <span>${x.kind==="above"?"Au-dessus de +":"Au-dessous de \u2212"}${P(x.gap,r,1)} · retour visé vers ${P(x.target,r,1)}</span>`:x?.kind==="aligned"?v`<span class="aligned-mark" aria-hidden="true">◇</span><span>À la consigne affichée</span>`:x?v`<span>Encore ${P(x.gap,r,1)} vers la consigne active</span>`:v`<span>Écart à la consigne indisponible</span>`}
        </div>
      </div>
      ${e.unit!==null?v`<svg class="rail" viewBox="0 0 1000 210" role="img" aria-label=${`\xC9chelle de temp\xE9rature. Mesure ${P(h,r,1)}. Consigne active ${P(_,r,1)}.${this.choice?` Aper\xE7u ${P(l,r,1)}.`:""}`}>
        <line x1="60" x2="940" y1="95" y2="95" class="axis"/>
        ${e.presets.filter(F=>F.temperature!==null).map(F=>Ie`<line x1=${d(F.temperature)} x2=${d(F.temperature)} y1="84" y2="108" class="preset-tick"><title>${F.label} ${P(F.temperature,r,1)}</title></line>`)}
        ${h!==null&&_!==null?Ie`<line x1=${d(h)} x2=${d(_)} y1="95" y2="95" class="distance"/>`:E}
        ${R.map(F=>Ie`<line x1=${d(F)} x2=${d(F)} y1="135" y2="142" class="tick"/><text x=${d(F)} y="171" text-anchor="middle">${P(F,"\xB0",1)}</text>`)}
        ${h!==null?Ie`<line x1=${d(h)} x2=${d(h)} y1="44" y2="95" class="measured-line"/><circle cx=${d(h)} cy="95" r="11" class="current-point"/><text x=${d(h)} y="30" text-anchor="middle" class="current-label">${P(h,"\xB0",1)}</text>`:E}
        ${_!==null?Ie`<path d=${`M ${d(_)} 83 l 12 12 -12 12 -12 -12 Z`} class="target-point"/>`:E}
        ${this.choice&&l!==null?Ie`<line x1=${d(l)} x2=${d(l)} y1="56" y2="124" class="preview-line"/><path d=${`M ${d(l)} 83 l 12 12 -12 12 -12 -12 Z`} class="preview-point"/>`:E}
      </svg>`:E}
      ${k?v`<div class="eta"><span>ETA · consigne active</span><strong>${k.label}</strong><span class="eta-detail">${k.detail}</span></div>`:E}
      <details class="authority"><summary>Qui a la main ? <span>${t.reasons[0]?.label??"Origine du r\xE9glage non publi\xE9e"}</span></summary>
        <p class="note">Demande conservée · ${P(t.requestedTemperature,r,1)}
          · consigne retenue · ${P(_,r,1)}</p>
        ${t.reasons.length?v`<ul>${t.reasons.map(F=>v`<li>${F.label} <small>(${F.code})</small></li>`)}</ul>`:v`<p class="note">Aucun motif de priorité publié dans cet instantané.</p>`}
        <p class="note">Ces motifs décrivent les priorités du thermostat. Ils n’identifient pas la personne ou l’automatisation à l’origine du changement.</p>
      </details>
      <div class="presets" role="group" aria-label="Choisir un preset">
        ${e.presets.map(F=>v`<button type="button" class=${"preset "+(e.attributes.preset_mode===F.id?"active":"")}
          aria-pressed=${this.choice?.kind==="preset"&&this.choice.value===F.id}
          ?disabled=${!C||!e.canSetPreset||this.sending} @click=${()=>this.choose({kind:"preset",value:F.id})}>
          <span>${F.label}${e.attributes.preset_mode===F.id?v`<span class="active-label"> · actif</span>`:E}</span>
          <strong>${F.temperature===null?"\u2014":P(F.temperature,r,1)}</strong></button>`)}
      </div>
      ${e.canSetTemperature?v`<div class="temperature-control">
        <label for="temperature">Choisir une température <span>${P(l??_,r,1)}</span></label>
        <div class="adjust"><button type="button" aria-label="Diminuer la température" ?disabled=${!C||this.sending||(l??_)<=e.minimum}
          @click=${()=>this.choose({kind:"temperature",value:e.shift(l??_,-1)})}>−</button>
          <input id="temperature" type="range" min=${e.minimum} max=${e.maximum} step=${e.step}
            .value=${$l(String(l??_))} aria-valuetext=${P(l??_,r,1)} ?disabled=${!C||this.sending}
            @input=${F=>this.choose({kind:"temperature",value:Number(F.currentTarget.value)})}/>
          <button type="button" aria-label="Augmenter la température" ?disabled=${!C||this.sending||(l??_)>=e.maximum}
            @click=${()=>this.choose({kind:"temperature",value:e.shift(l??_,1)})}>+</button></div>
      </div>`:E}
      ${this.choice?v`<div class="preview" aria-label="Aperçu du réglage"><div><span class="caption">Aperçu · ${D}</span>
        <strong>${l!==null?P(l,r,1):"Temp\xE9rature d\xE9termin\xE9e par le thermostat"}</strong></div>
        <div class="actions"><button type="button" ?disabled=${this.sending} @click=${this.cancel}>Annuler</button>
          <button type="button" class="apply" ?disabled=${this.sending||!e.validate(this.choice)} @click=${this.apply}>${this.sending?"Envoi\u2026":"Appliquer"}</button></div></div>`:E}
      ${n.length?v`<ul class="advice" aria-label="Avant d’appliquer">${n.map(F=>v`<li>${F}</li>`)}</ul>`:E}
      <p class=${"status "+(this.failed?"error":"")} role="status" aria-live="polite">${this.message}</p>
      ${e.locked?v`<p class="note">Thermostat verrouillé.</p>`:E}
      ${e.climate?E:v`<p class="note">Aucun thermostat explicitement lié à ce diagnostic.</p>`}
      ${e.filtered!==null&&_!==null&&Math.abs(e.filtered-_)>.01?v`<p class="note">Consigne filtrée de la régulation : ${P(e.filtered,r,1)}</p>`:E}
      <p class="note scheduling">Les plannings restent gérés par ha-chauffage ou Scheduler.</p>
    </section>`}};Et.styles=Ze`
    :host{display:block;margin-top:22px;--measured:#167883;--target:#a75b19;--effort:#955016;--return:#245e8b;color:var(--primary-text-color,#192b31)}
    *{box-sizing:border-box}section{border-top:1px solid var(--divider-color,#ddd);padding-top:20px}
    .heading{display:flex;justify-content:space-between;align-items:center;gap:12px}h3{margin:0;font-size:16px}.mode,.caption,.note{font-size:12px;color:var(--secondary-text-color,#526268)}
    .readings{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}.readings>div{display:flex;flex-direction:column;gap:5px}.destination{text-align:right;align-items:flex-end}
    .caption{display:flex;gap:7px;align-items:center}.readings strong{font-size:36px;font-weight:500;font-variant-numeric:tabular-nums;line-height:1.2}.readings .measured{font-size:46px;color:var(--measured)}small{font-size:16px;font-weight:400}.preset-name{font-size:13px;color:var(--target);min-height:16px}
    .dot,.diamond{display:inline-block;width:8px;height:8px;flex:none}.dot{border-radius:50%;background:var(--measured)}.diamond{border:2px solid var(--target);transform:rotate(45deg)}
    .effort-band{margin:20px 0 0;min-width:0}.effort-heading{display:flex;justify-content:space-between;gap:12px;font-size:12px;line-height:1.5}.effort-heading strong{font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}.effort-track{height:16px;margin-top:5px;position:relative;color:var(--effort)}.effort-track:before{content:"";position:absolute;left:0;right:0;top:7px;height:2px;background:var(--divider-color,#c8d1d3)}.effort-track.cool{color:var(--return)}.effort-track.neutral{color:var(--secondary-text-color,#526268)}.effort-arrow{position:relative;display:block;height:16px;background:currentColor;clip-path:polygon(0 30%,calc(100% - min(10px,50%)) 30%,calc(100% - min(10px,50%)) 0,100% 50%,calc(100% - min(10px,50%)) 100%,calc(100% - min(10px,50%)) 70%,0 70%)}.effort-arrow.reverse{margin-left:auto;transform:scaleX(-1)}.effort-arrow.neutral{clip-path:none;height:6px;top:5px}.effort-missing{margin:0;min-height:42px;font-size:12px;color:var(--secondary-text-color,#526268)}.setpoint-position{display:flex;align-items:center;gap:8px;min-height:30px;font-size:12px;line-height:1.5;color:var(--secondary-text-color,#526268);overflow-wrap:anywhere}.setpoint-position.overshoot{color:var(--return)}.return-chevron{font-size:32px;line-height:24px;font-weight:600;flex:none}.aligned-mark{font-size:20px;line-height:24px;flex:none}
    .rail{display:block;width:100%;height:auto;max-height:180px;overflow:visible;margin:12px 0 0}.axis{stroke:var(--divider-color,#c8d1d3);stroke-width:5;stroke-linecap:round}.distance{stroke:var(--measured);stroke-width:6;stroke-linecap:round}.tick{stroke:var(--secondary-text-color,#526268);stroke-width:1}.preset-tick{stroke:var(--secondary-text-color,#526268);stroke-width:2}
    svg text{font-family:inherit;font-size:22px;fill:var(--secondary-text-color,#526268)}svg .current-label{fill:var(--measured);font-weight:600}.measured-line{stroke:var(--measured);stroke-width:2}.current-point{fill:var(--measured);stroke:var(--card-background-color,#fff);stroke-width:3}.target-point{fill:var(--card-background-color,#fff);stroke:var(--target);stroke-width:4}.preview-line{stroke:var(--target);stroke-width:2;stroke-dasharray:5 5}.preview-point{fill:var(--target);stroke:var(--card-background-color,#fff);stroke-width:3}
    .eta{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 12px;border-inline-start:3px solid var(--measured);padding:4px 12px;margin:0 0 18px;font-size:12px}.eta strong{font-size:22px;font-weight:500}.eta-detail{flex-basis:100%;color:var(--secondary-text-color,#526268);line-height:1.5}
    .presets{display:flex;flex-wrap:wrap;gap:8px}button{font:inherit;color:inherit;cursor:pointer;background:var(--card-background-color,#fff);border:1px solid var(--divider-color,#b5c0c4);border-radius:9px;min-height:44px;padding:9px 13px}button:focus-visible,input:focus-visible{outline:3px solid var(--primary-color,#167883);outline-offset:3px}button:disabled{opacity:.5;cursor:default}button:not(:disabled):hover{border-color:var(--measured)}
    .preset{display:flex;flex:1 1 100px;min-width:0;flex-direction:column;gap:5px;text-align:left;font-size:13px;overflow-wrap:anywhere}.preset strong{font-weight:500;font-size:17px}.preset.active{border-bottom:3px solid var(--target)}.active-label{font-size:11px;color:var(--secondary-text-color,#526268)}.preset[aria-pressed=true]{outline:2px dashed var(--target);outline-offset:2px}
    .temperature-control{margin-top:22px}label{font-size:13px;display:flex;justify-content:space-between;gap:12px}label span{font-weight:600}.adjust{display:flex;gap:14px;align-items:center;margin-top:10px}.adjust button{width:44px;flex:none;font-size:22px;padding:0}input{width:100%;min-width:0;min-height:44px;accent-color:var(--measured);cursor:pointer}
    .authority{margin:0 0 18px;font-size:13px}.authority summary{cursor:pointer;min-height:44px;padding:12px 0}.authority summary span{color:var(--secondary-text-color,#526268);margin-left:8px}.authority ul,.advice{line-height:1.6;padding-left:20px;font-size:13px;overflow-wrap:anywhere}.authority small{font-size:11px}.advice{border-inline-start:3px solid var(--target);list-style:none;padding:4px 12px}
    .preview{display:flex;gap:16px;justify-content:space-between;align-items:center;margin-top:16px;padding:14px 0;border-top:1px dashed var(--target)}.preview strong{display:block;font-size:22px;margin-top:4px}.actions{display:flex;gap:8px}.apply{background:var(--measured);color:#fff;border-color:var(--measured)}.status{font-size:13px;line-height:1.5}.status:empty{display:none}.error{color:var(--error-color,#b31e18)}.note{line-height:1.5;margin:10px 0 0}.scheduling{margin-top:16px}
    @media(max-width:520px){.readings .measured{font-size:38px}.readings strong{font-size:30px}.rail{margin-top:18px}.preview{align-items:stretch;flex-direction:column}.actions button{flex:1}.preset{flex-basis:90px}svg text{font-size:40px}}
    @media(prefers-color-scheme:dark){:host{--measured:#6dcbd2;--target:#efaf6e;--effort:#efaf6e;--return:#9fc9ef}.apply{background:#23666d;border-color:#6dcbd2}}
  `,I([se({attribute:!1})],Et.prototype,"hass",2),I([se({attribute:!1})],Et.prototype,"diagnostic",2),I([re()],Et.prototype,"choice",2),I([re()],Et.prototype,"sending",2),I([re()],Et.prototype,"message",2),I([re()],Et.prototype,"failed",2),I([re()],Et.prototype,"awaitingPublication",2),Et=I([Xe("smartpi-thermal-journey")],Et);var Ot=s=>{let i=X(s);return i===null?"Non observ\xE9":new Date(i*1e3).toLocaleString("fr-FR")},Nr=s=>{let i=X(s);return i===null?"\u2014":`${Math.round(i/60)} min`},jr={pending:"Observation en cours",observed:"\xC9volution observ\xE9e",excluded:"Interrompu",finished:"Termin\xE9",reached:"Atteinte observ\xE9e"},Cl={unknown:"Non renseign\xE9",good:"J\u2019\xE9tais bien",cold:"J\u2019avais froid",hot:"J\u2019avais chaud"},lt=class extends Ee{constructor(){super(...arguments);this.tab="receipts";this.loading=!1;this.saving=!1;this.error="";this.message="";this.eraseArmed=!1;this.comparison=[];this.entity="";this.signature="";this.generation=0}updated(){let e=this.diagnostic?.entityId??"";e!==this.entity&&(++this.generation,clearTimeout(this.timer),this.entity=e,this.room=void 0,this.comparison=[],this.eraseArmed=!1,this.error="",this.message="",this.saving=!1,this.refresh());let t=this.diagnostic?.climateId?this.hass?.states[this.diagnostic.climateId]?.last_updated:"",n=`${e}/${this.diagnostic?.lastUpdated}/${t}`;n!==this.signature&&(this.signature=n,clearTimeout(this.timer),this.timer=setTimeout(()=>{this.saving||this.refresh()},500))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.refresh()}disconnectedCallback(){++this.generation,clearTimeout(this.timer),this.saving=!1,this.loading=!1,this.message="",this.eraseArmed=!1,super.disconnectedCallback()}async refresh(){if(!this.hass||!this.entity||this.saving)return;let e=++this.generation,t=this.entity;this.loading=!this.room;try{let n=await new ii(this.hass).request(t,"get");if(e!==this.generation||!this.isConnected)return;this.room=ii.room(n),this.error=""}catch(n){e===this.generation&&(this.error=n instanceof Error?n.message:"Lecture de l\u2019observatoire refus\xE9e. V\xE9rifiez les droits administrateur et le composant.")}finally{e===this.generation&&(this.loading=!1)}}async mutate(e,t={}){if(!this.hass||!this.entity||this.saving)return;let n=this.entity,r=++this.generation;this.saving=!0,this.message="Enregistrement local\u2026",this.error="";try{let l=new ii(this.hass),o=await l.request(n,e,t);if(e==="clear"&&(o=await l.request(n,"get")),r!==this.generation||!this.isConnected)return;this.room=ii.room(o),this.message=e==="clear"?"Les donn\xE9es de cette pi\xE8ce ont \xE9t\xE9 effac\xE9es.":"Enregistr\xE9 localement dans Home Assistant.",this.eraseArmed=!1}catch(l){r===this.generation&&(this.error=l instanceof Error?l.message:"Enregistrement refus\xE9 ou impossible.",this.message="")}finally{r===this.generation&&(this.saving=!1)}}submit(e,t){e.preventDefault();let r=e.currentTarget.elements.namedItem("label");this.mutate(t,{label:r.value})}toggleComparison(e){this.comparison=this.comparison.includes(e)?this.comparison.filter(t=>t!==e):[...this.comparison.slice(-1),e]}trialMetrics(e){let t=e.summary;return v`<dl class="metrics">
      <div><dt>Consigne</dt><dd>${P(e.target,e.unit,1)}</dd></div>
      <div><dt>Mesure au départ</dt><dd>${P(e.baseline,e.unit,1)}</dd></div>
      <div><dt>Plage observée</dt><dd>${P(t.minimum,"",1)} → ${P(t.maximum,e.unit,1)}</dd></div>
      <div><dt>Dernière mesure</dt><dd>${P(t.last,e.unit,1)}</dd></div>
      <div><dt>Écart absolu maximal observé</dt><dd>${P(t.max_abs_error,e.unit,2)}</dd></div>
      <div><dt>Publications retenues / manquantes</dt><dd>${t.publications} / ${e.missing_publications??0}</dd></div>
      <div><dt>Extérieur observé</dt><dd>${P(t.outdoor_min,"",1)} → ${P(t.outdoor_max,e.unit,1)}</dd></div>
      <div><dt>Première / dernière publication</dt><dd>${Ot(t.first_at)} · ${Ot(t.last_at)}</dd></div>
    </dl>`}render(){let e=this.diagnostic;if(!e)return E;let t=new Mt(this.hass,e),n=this.room,r=this.saving||!n,l=n?.trials.filter(o=>this.comparison.includes(o.id))??[];return v`<section aria-labelledby="observatory-title" aria-busy=${this.loading||this.saving}>
      <div class="heading"><div><h2 id="observatory-title">Mon observatoire</h2><p class="muted">${e.name} · souvenirs et observations conservés dans Home Assistant</p></div>
        <button type="button" class="refresh" ?disabled=${this.loading||this.saving} @click=${this.refresh}>Actualiser</button></div>
      <nav class="tabs" aria-label="Vues de l’observatoire">${[["receipts","Re\xE7us de chauffe"],["bookmarks","Souvenirs"],["trials","Mes essais"],["forecasts","Carnet du Twin"]].map(([o,p])=>v`<button type="button" data-view=${o} aria-pressed=${this.tab===o} @click=${()=>{this.tab=o,this.message=""}}>${p}</button>`)}</nav>
      <p class="status" role="status" aria-live="polite">${this.loading?"Lecture du carnet local\u2026":this.message}</p>
      ${this.error?v`<p class="error" role="alert">${this.error}</p>`:E}
      ${n?v`
        ${this.tab==="receipts"?v`<p class="intro">De la demande au retour mesuré, chaque étape garde sa propre preuve.</p>
          ${n.receipts.length?v`<ol class="entries">${[...n.receipts].reverse().map(o=>v`<li>
            <div class="row"><strong>${o.choice.kind==="temperature"?v`Demande de ${P(o.choice.value,o.unit??"",1)}`:v`Preset demandé · ${o.choice.value}`}</strong><span class="badge">${jr[o.status]??o.status}</span></div>
            <p class="muted">${Ot(o.started_at)}</p>
            <ol class="receipt-stages">
              <li><strong>Service</strong><span>${o.service_result==="accepted"?"Retour accept\xE9":o.service_result==="uncertain"?"Retour incertain":"En attente du retour"}</span></li>
              <li><strong>Consigne HA</strong><span>${o.confirmed_at===null?"Non confirm\xE9e":Ot(o.confirmed_at)}</span></li>
              <li><strong>Commande publiée</strong><span>${o.applied_at===void 0?"Non observ\xE9e":v`${P(o.applied_percent," %",1)} · ${Ot(o.applied_at)}`}</span></li>
              <li><strong>Température</strong><span>${o.response_at===void 0?"\xC9volution non observ\xE9e":v`${P(o.response_temperature,o.unit??"",1)} · ${Ot(o.response_at)}`}</span></li>
            </ol>
            ${o.reason?v`<p class="muted">${o.reason}</p>`:E}
            <button type="button" class="quiet" ?disabled=${r} @click=${()=>this.mutate("receipt_delete",{id:o.id})}>Supprimer ce reçu</button>
          </li>`)}</ol>`:v`<p class="empty">Vos prochains changements effectués depuis ce panneau apparaîtront ici.</p>`}
          <p class="foot">Un retour de service ne prouve pas une chauffe physique. L’évolution de température est une observation ; son attribution au chauffage n’est pas démontrée.</p>`:E}
        ${this.tab==="bookmarks"?v`<p class="intro">Gardez le souvenir d’un moment où vous étiez bien, avec ses conditions.</p>
          <form @submit=${o=>this.submit(o,"bookmark_save")}><label for="bookmark-name">Nom du souvenir</label><div class="form-row"><input id="bookmark-name" name="label" maxlength="100" required placeholder="Lecture, canapé…" ?disabled=${r}><button type="submit" ?disabled=${r||!t.available}>Là, je suis bien</button></div></form>
          ${n.bookmarks.length?v`<ul class="entries">${[...n.bookmarks].reverse().map(o=>v`<li><div class="row"><strong>${o.label}</strong><span class="muted">${Ot(o.created_at)}</span></div>
            <div class="memory-values"><span>Mesure <strong>${P(o.temperature,o.unit,1)}</strong></span><span>Consigne <strong>${P(o.target,o.unit,1)}</strong></span><span>Extérieur <strong>${P(o.outdoor,o.unit,1)}</strong></span></div>
            <p class="muted">Preset ce jour-là · ${o.preset??"Non publi\xE9"} · aujourd’hui ${P(t.measured,t.unit??"",1)}, extérieur ${P(e.live.temperature&&e.live.temperature.outdoor,t.unit??"",1)}</p>
            <div class="actions"><button type="button" ?disabled=${this.saving||o.unit!==t.unit||!t.validate({kind:"temperature",value:o.target})} @click=${()=>this.dispatchEvent(new CustomEvent("prepare-temperature",{detail:{entityId:e.entityId,value:o.target},bubbles:!0,composed:!0}))}>Préparer ${P(o.target,o.unit,1)}</button>
              <button type="button" class="quiet" ?disabled=${r} @click=${()=>this.mutate("bookmark_delete",{id:o.id})}>Supprimer</button></div>
          </li>`)}</ul>`:v`<p class="empty">Aucun souvenir dans cette pièce.</p>`}<p class="foot">Préparer ouvre un aperçu à valider. Une même température ne garantit pas le même ressenti.</p>`:E}
        ${this.tab==="trials"?v`<p class="intro">Observez un réglage déjà actif, puis notez votre ressenti. Démarrer un essai ne change aucune consigne.</p>
          <form @submit=${o=>this.submit(o,"trial_start")}><label for="trial-name">Nom de l’essai</label><div class="form-row"><input id="trial-name" name="label" maxlength="100" required placeholder="Mon réglage de soirée…" ?disabled=${r}><button type="submit" ?disabled=${r||!t.available||n.trials.some(o=>o.status==="pending")}>Observer ce réglage</button></div></form>
          ${n.trials.length?v`<ul class="entries">${[...n.trials].reverse().map(o=>v`<li><div class="row"><strong>${o.label}</strong><span class="badge">${jr[o.status]??o.status}</span></div>
            <p class="muted">${Ot(o.started_at)}${o.ended_at?v` → ${Ot(o.ended_at)}`:E} · ${o.reason??"Collecte des prochaines publications"}</p>
            ${this.trialMetrics(o)}
            <div class="actions"><label class="compare"><input type="checkbox" .checked=${this.comparison.includes(o.id)} @change=${()=>this.toggleComparison(o.id)}>Comparer</label>
              <label>Ressenti <select aria-label=${`Ressenti pour ${o.label}`} .value=${o.feedback} ?disabled=${r} @change=${p=>this.mutate("trial_feedback",{id:o.id,feedback:p.currentTarget.value})}>${Object.entries(Cl).map(([p,u])=>v`<option value=${p}>${u}</option>`)}</select></label>
              ${o.status==="pending"?v`<button type="button" ?disabled=${r} @click=${()=>this.mutate("trial_stop",{id:o.id})}>Terminer l’essai</button>`:E}
              <button type="button" class="quiet" ?disabled=${r} @click=${()=>this.mutate("trial_delete",{id:o.id})}>Supprimer</button></div>
          </li>`)}</ul>`:v`<p class="empty">Aucun essai enregistré.</p>`}
          ${l.length===2?v`<section class="comparison"><h3>Deux observations côte à côte</h3>
            ${l[0].unit!==l[1].unit?v`<p>Unités différentes : comparaison numérique désactivée.</p>`:v`<div class="table-wrap"><table><thead><tr><th>Observation</th>${l.map(o=>v`<th>${o.label}</th>`)}</tr></thead><tbody>
              <tr><th>Consigne</th>${l.map(o=>v`<td>${P(o.target,o.unit,1)}</td>`)}</tr>
              <tr><th>Plage mesurée</th>${l.map(o=>v`<td>${P(o.summary.minimum,"",1)} → ${P(o.summary.maximum,o.unit,1)}</td>`)}</tr>
              <tr><th>Extérieur au départ</th>${l.map(o=>v`<td>${P(o.outdoor,o.unit,1)}</td>`)}</tr>
              <tr><th>Publications</th>${l.map(o=>v`<td>${o.summary.publications}</td>`)}</tr>
              <tr><th>Ressenti déclaré</th>${l.map(o=>v`<td>${Cl[o.feedback]??o.feedback}</td>`)}</tr>
            </tbody></table></div>`}
            <p class="foot">Conditions et durées peuvent différer. Ces observations ne prouvent pas qu’un réglage a causé un résultat ni une économie.</p></section>`:E}`:E}
        ${this.tab==="forecasts"?v`<p class="intro">Les prévisions sont conservées à leur émission, puis confrontées aux publications suivantes.</p>
          <p class="counts">${n.forecasts.filter(o=>o.status==="reached").length} atteinte(s) observée(s) · ${n.forecasts.filter(o=>o.status==="excluded").length} épisode(s) interrompu(s) · ${n.forecasts.filter(o=>o.status==="pending").length} en cours</p>
          ${n.forecasts.length?v`<ul class="entries">${[...n.forecasts].reverse().map(o=>v`<li><div class="row"><strong>${P(o.temperature,"",1)} → ${P(o.target,o.unit,1)}</strong><span class="badge">${jr[o.status]??o.status}</span></div>
            <p class="muted">Prévision publiée le ${Ot(o.started_at)}</p><div class="memory-values"><span>Meilleur cas annoncé <strong>${Nr(o.eta_s)}</strong></span>
              ${o.status==="reached"?v`<span>Atteinte observée après <strong>${Nr(o.observed_s)}</strong></span><span>Écart au meilleur cas <strong>${Nr((o.observed_s??0)-o.eta_s)}</strong></span>`:E}</div>
            <p class="muted">${o.status==="reached"?v`Première publication d’atteinte : ${Ot(o.observed_at)}`:o.reason}</p>
            <button type="button" class="quiet" ?disabled=${r} @click=${()=>this.mutate("forecast_delete",{id:o.id})}>Supprimer cette observation</button>
          </li>`)}</ul>`:v`<p class="empty">La collecte commencera avec les prochains ETA éligibles publiés par le Twin. Aucun passé n’est reconstruit.</p>`}
          <p class="foot">Le meilleur cas n’est pas la trajectoire réelle du PI. L’atteinte est datée à la première publication qui la confirme. Les épisodes interrompus ne comptent pas comme des réussites.</p>`:E}
      `:E}
      <details class="storage"><summary>Conservation et suppression</summary><p class="foot">Collecte locale même panneau fermé : 48 h de points récents, 30 jours d’épisodes, au plus 50 reçus, 50 essais et 100 prévisions par pièce. Les 30 souvenirs maximum restent jusqu’à suppression. Les interruptions ne sont pas comblées.</p>
        ${this.eraseArmed?v`<p>Effacer les souvenirs et tous les épisodes de cette pièce ?</p><div class="actions"><button type="button" ?disabled=${r} @click=${()=>this.mutate("clear")}>Confirmer l’effacement</button><button type="button" @click=${()=>this.eraseArmed=!1}>Annuler</button></div>`:v`<button type="button" ?disabled=${r} @click=${()=>this.eraseArmed=!0}>Effacer les données de cette pièce</button>`}</details>
    </section>`}};lt.styles=Ze`
    :host{display:block;margin:20px 0;color:var(--primary-text-color,#192b31)}*{box-sizing:border-box}section{min-width:0}h2{font-size:20px;margin:0}h3{font-size:16px}p{font-size:13px;line-height:1.55}.heading,.row{display:flex;justify-content:space-between;align-items:center;gap:12px}.heading{margin-bottom:12px}.heading p{margin:6px 0 0}.muted,.foot{color:var(--secondary-text-color,#526268)}.muted,.foot,.counts{font-size:12px}.tabs{display:flex;flex-wrap:wrap;gap:7px;border-bottom:1px solid var(--divider-color,#d2dbdd);padding-bottom:12px}.tabs button[aria-pressed=true]{border-color:var(--primary-color,#167883);box-shadow:inset 0 -3px var(--primary-color,#167883)}
    button,input,select{font:inherit;color:inherit;border:1px solid var(--divider-color,#b5c0c4);background:var(--card-background-color,#fff);border-radius:8px;min-height:44px;padding:9px 12px;font-size:13px}button{cursor:pointer}button:disabled{opacity:.5;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color,#167883);outline-offset:3px}.quiet{background:transparent;font-size:12px}.status:empty{display:none}.error{color:var(--error-color,#b31e18)}.entries{list-style:none;padding:0;margin:16px 0}.entries>li{padding:18px 0;border-top:1px solid var(--divider-color,#d2dbdd);overflow-wrap:anywhere}.badge{border:1px solid var(--divider-color,#d2dbdd);padding:5px 8px;border-radius:20px;font-size:11px}.receipt-stages{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;list-style:none;padding:0}.receipt-stages li{border-inline-start:2px solid var(--primary-color,#167883);padding-left:10px;display:flex;flex-direction:column;gap:7px;font-size:12px}.receipt-stages strong{font-size:12px}.receipt-stages span{color:var(--secondary-text-color,#526268)}
    form{margin:18px 0}label{font-size:13px;display:block}.form-row{display:flex;gap:8px;margin-top:7px}.form-row input{flex:1;min-width:0}.actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:12px}.compare{display:flex;align-items:center;gap:7px;min-height:44px}.compare input{min-height:24px;width:24px;height:24px;accent-color:var(--primary-color,#167883)}.memory-values{display:flex;flex-wrap:wrap;gap:14px 28px;font-size:12px}.memory-values strong{display:block;font-size:19px;margin-top:5px;font-weight:500}.metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;font-size:12px}dt{color:var(--secondary-text-color,#526268)}dd{margin:5px 0 0;font-size:14px}.table-wrap{overflow:auto;max-width:100%}table{border-collapse:collapse;min-width:100%;font-size:13px}th,td{text-align:left;padding:10px;border-bottom:1px solid var(--divider-color,#d2dbdd);overflow-wrap:anywhere}.storage{border-top:1px solid var(--divider-color,#d2dbdd);margin-top:18px;padding-top:4px}.storage summary{cursor:pointer;min-height:44px;padding:14px 0;font-size:12px}.empty{padding:20px 0;color:var(--secondary-text-color,#526268)}
    @media(max-width:600px){.receipt-stages{grid-template-columns:repeat(2,minmax(0,1fr))}.heading{align-items:flex-start}.refresh{font-size:12px}.form-row{flex-direction:column}.row{align-items:flex-start;flex-wrap:wrap}.metrics{grid-template-columns:1fr}.tabs button{flex:1 1 125px}.memory-values{gap:14px}}
  `,I([se({attribute:!1})],lt.prototype,"hass",2),I([se({attribute:!1})],lt.prototype,"diagnostic",2),I([re()],lt.prototype,"tab",2),I([re()],lt.prototype,"room",2),I([re()],lt.prototype,"loading",2),I([re()],lt.prototype,"saving",2),I([re()],lt.prototype,"error",2),I([re()],lt.prototype,"message",2),I([re()],lt.prototype,"eraseArmed",2),I([re()],lt.prototype,"comparison",2),lt=I([Xe("smartpi-observatory")],lt);var _d=new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium",timeStyle:"short"}),wd=[{title:"R\xE9gulation PI et cha\xEEne U",note:"S\xE9parer commande calcul\xE9e, limitation et commande appliqu\xE9e.",fields:[{label:"Phase",path:"control.phase"},{label:"Mode",path:"control.mode"},{label:"Kp",path:"control.kp",digits:6},{label:"Ki",path:"control.ki",digits:6},{label:"Ti",path:"control.ti_min",unit:" min"},{label:"Part PI",path:"power.pi_percent",unit:" %"},{label:"Part FF",path:"power.ff_percent",unit:" %"},{label:"Commande demand\xE9e",path:"power.command_percent",unit:" %"},{label:"Commande limit\xE9e",path:"power.limited_percent",unit:" %"},{label:"Commande appliqu\xE9e",path:"power.applied_percent",unit:" %"},{label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},{label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},{label:"\xC9tat saturation",path:"control.saturation_state"},{label:"Int\xE9grale",path:"temperature.integral_error",digits:6},{label:"Gestion int\xE9grale",path:"temperature.integral_mode"},{label:"Anti-windup \u0394u",path:"analysis.control.aw_du",digits:6},{label:"Bande morte",path:"control.in_deadband"},{label:"Proche consigne",path:"control.in_near_band"}]},{title:"Mod\xE8le thermique A / B",note:"Le mod\xE8le 1R1C est appris (A : \xB0C/min \xE0 commande unitaire ; B : min\u207B\xB9) ; sa fiabilit\xE9 est distincte de la valeur affich\xE9e.",fields:[{label:"Gain de chauffe A",path:"model.a",digits:6},{label:"Pertes B",path:"model.b",digits:6},{label:"Confiance A/B",path:"model.confidence"},{label:"Constante \u03C4",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},{label:"Fiabilit\xE9 \u03C4",path:"model.tau_reliable"},{label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},{label:"Fiabilit\xE9 chauffe",path:"model.deadtime_heat_reliable"},{label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},{label:"Fiabilit\xE9 refroidissement",path:"model.deadtime_cool_reliable"},{label:"Stabilit\xE9 A",path:"model.a_stability_ratio",digits:3},{label:"Stabilit\xE9 B",path:"model.b_stability_ratio",digits:3},{label:"D\xE9tection du temps mort",path:"analysis.deadtime.state"},{label:"Derni\xE8re issue chauffe",path:"analysis.deadtime.heat_last_outcome"},{label:"Derni\xE8re issue refroidissement",path:"analysis.deadtime.cool_last_outcome"}]},{title:"Apprentissage et gouvernance",note:"Voir les fen\xEAtres, le bootstrap, les rejets et les d\xE9cisions de gouvernance.",fields:[{label:"Apprentissage autoris\xE9",path:"learning.enabled"},{label:"\xC9tape",path:"learning.stage"},{label:"\xC9tat du bootstrap",path:"learning.bootstrap_status"},{label:"Mesures A",path:"learning.emea_samples_a",digits:0},{label:"Mesures B",path:"learning.emea_samples_b",digits:0},{label:"Mises \xE0 jour A accept\xE9es",path:"learning.accepted_updates_a",digits:0},{label:"Mises \xE0 jour B accept\xE9es",path:"learning.accepted_updates_b",digits:0},{label:"Dernier motif",path:"learning.last_reason"},{label:"D\xE9rive A",path:"learning.a_drift_state"},{label:"D\xE9rive B",path:"learning.b_drift_state"},{label:"R\xE9gime thermique",path:"governance.regime"},{label:"D\xE9cision thermique",path:"governance.thermal_update_decision"},{label:"Raison d\xE9cision",path:"governance.thermal_update_reason"},{label:"D\xE9cision gains",path:"analysis.governance.last_decision_gains"},{label:"Source Kp",path:"analysis.governance.kp_source"},{label:"D\xE9lai de r\xE9ponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},{label:"Motif d\xE9lai",path:"analysis.learning.response_lag.last_reason"}]},{title:"Feedforward FF1 / FF2 / FF3",note:"Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus \xE9ventuel d\u2019une correction.",fields:[{label:"\xC9tat FF3",path:"feedforward.ff3_status"},{label:"Raison FF",path:"analysis.feedforward.reason"},{label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},{label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},{label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},{label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},{label:"FF2 gel\xE9",path:"analysis.feedforward.ff2_frozen"},{label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},{label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},{label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},{label:"Observateur p\xE9riodique",path:"feedforward.fftrim.periodic.state"},{label:"Rejet p\xE9riodique",path:"feedforward.fftrim.periodic.last_reject_reason"},{label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},{label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"}]},{title:"Thermal Twin",note:"Une pr\xE9diction doit avoir son propre drapeau de fiabilit\xE9.",fields:[{label:"\xC9tat Twin",path:"feedforward.twin_status"},{label:"Mod\xE8le Twin fiable",path:"analysis.twin.twin_model_reliable"},{label:"Temp\xE9rature estim\xE9e",path:"analysis.twin.twin_T_hat",unit:" \xB0C"},{label:"Temp\xE9rature pr\xE9dite",path:"analysis.twin.twin_T_pred",unit:" \xB0C"},{label:"Innovation",path:"analysis.twin.twin_innovation",unit:" \xB0C",digits:4},{label:"RMSE de l\u2019innovation \xB7 EMA",path:"analysis.twin.twin_rmse_30",unit:" \xB0C",digits:4},{label:"\xC9quilibre estim\xE9",path:"analysis.twin.twin_T_steady",unit:" \xB0C",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"Fiabilit\xE9 \xE9quilibre",path:"analysis.twin.twin_T_steady_reliable"},{label:"Consigne atteignable (pr\xE9diction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},{label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},{label:"Motif ETA",path:"analysis.twin.eta_reason"}]},{title:"Consigne, trajectoire, calibration",note:"Les \xE9tats internes restent affich\xE9s sans action de pilotage.",fields:[{label:"Consigne filtr\xE9e",path:"setpoint.filtered_setpoint",unit:" \xB0C"},{label:"Trajectoire active",path:"setpoint.trajectory_active"},{label:"Source de trajectoire",path:"setpoint.trajectory_source"},{label:"Boost",path:"setpoint.boost_active"},{label:"Phase trajectoire",path:"analysis.trajectory.phase"},{label:"Freinage n\xE9cessaire",path:"analysis.trajectory.braking_needed"},{label:"Autocalibration",path:"autocalib.state"},{label:"Mod\xE8le d\xE9grad\xE9",path:"autocalib.model_degraded"},{label:"\xC9tat de calibration",path:"calibration.state"},{label:"Tentatives",path:"calibration.retry_count",digits:0}]}],si=class extends Ee{constructor(){super(...arguments);this.narrow=!1;this.selectedId="";this.sessionHistory=new dn}willUpdate(e){e.has("hass")&&this.hass&&this.sessionHistory.collect(ns(this.hass),this.hass.states)}disconnectedCallback(){this.sessionHistory.clear(),super.disconnectedCallback()}metric(e,t,n="",r=2){return v`<div class="metric"><span>${e}</span><strong>${P(t,n,r)}</strong></div>`}power(e,t,n){let r=X(t),l=r===null?0:Math.min(100,Math.max(0,r));return v`<div class="power"><div class="power-label"><span>${e}</span><strong>${P(t," %",1)}</strong></div>
      <div class="track" aria-label=${e+" "+P(t," %",1)}>
        <div class=${"fill "+n} style=${"width:"+l+"%"}></div>
      </div></div>`}field(e,t){let n=P(at(t,e.path,e.reliable),e.unit??"",e.digits??2);return v`<div class="detail" title=${e.path}><span>${e.label}</span><strong>${n}</strong></div>`}showDiagnostic(e){let t=e.live,n=Fa(e),r=zs(e),l=rs(e.lastUpdated);return v`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${e.name}</h2>
            <div class="muted small">${e.climateId??e.entityId}</div></div>
          <span class="tag">${r?"Apprentissage / hyst\xE9r\xE9sis":P(S(t,"control.phase"))}</span>
        </div>
        <p class="muted small">Dernière publication ${l===null?"indisponible":v`<time datetime=${e.lastUpdated??""}>${_d.format(l*1e3)}</time>`}</p>
        <smartpi-thermal-journey .hass=${this.hass} .diagnostic=${e}
          @observatory-refresh=${o=>{o.detail.entityId===e.entityId&&this.renderRoot.querySelector("smartpi-observatory")?.refresh()}}></smartpi-thermal-journey>
        <div class="metrics">
          ${this.metric("Commande appliqu\xE9e",S(t,"power.applied_percent")," %",1)}
          ${this.metric("Temp\xE9rature ext\xE9rieure",S(t,"temperature.outdoor")," \xB0C")}
        </div>
        <section class="learn" aria-label="Avancement de l’apprentissage">
          <div class="flex spread"><h3>Apprentissage du modèle</h3>
            <strong>${P({bootstrap:"Initialisation",learning:"Collecte du mod\xE8le",monitoring:"Surveillance",degraded:"Mod\xE8le \xE0 consolider"}[String(S(t,"learning.stage"))]??S(t,"learning.stage"))}</strong></div>
          <div class="columns">
            ${["a","b"].map(o=>{let p=X(S(t,`learning.emea_samples_${o}`)),u=X(S(t,`learning.bootstrap_target_${o}`)),g=X(S(t,"learning.history_target")),d=p!==null&&p>=0&&g!==null&&g>0,h=d?Math.min(100,100*p/g):null;return v`<div>
                <div class="flex spread"><strong>${o.toUpperCase()} · ${o==="a"?"chauffe":"pertes thermiques"}</strong>
                  <span>${P(h," %",0)}</span></div>
                <progress aria-label=${`Historique de ${o.toUpperCase()}`}
                  max=${g??1} value=${d?Math.min(p,g):E}></progress>
                <p class="muted small">${P(p,"",0)} / ${P(g,"",0)} mesures conservées
                  · premier palier ${P(u,"",0)}
                  ${p!==null&&u!==null?p>=u?"atteint":"en cours":""}</p>
                <p class="muted small">Mises à jour acceptées · ${P(S(t,`learning.accepted_updates_${o}`),"",0)}</p>
              </div>`})}
          </div>
          <p class="muted small">Les pourcentages décrivent le remplissage de l’historique.
            Confiance publiée · ${P(S(t,"model.confidence"))}
            · τ fiable · ${P(S(t,"model.tau_reliable"))}</p>
          <div class="columns">
            ${["heat","cool"].map(o=>{let p=S(t,`model.deadtime_${o}_reliable`);return v`<div><strong>Temps mort · ${o==="heat"?"chauffe":"refroidissement"}</strong>
                <p>${p===!0?P(S(t,`model.deadtime_${o}_s`)," s",0):p===!1?"En attente d\u2019une mesure fiable":"Indisponible"}</p>
                <p class="muted small">Dernière issue · ${P(S(t,`analysis.deadtime.${o}_last_outcome`))}</p></div>`})}
          </div>
          ${r?v`<p><strong>Prochaine étape</strong> ·
            ${String(S(t,"learning.bootstrap_status")).includes("waiting response lag")?"Les premi\xE8res mesures sont collect\xE9es. SmartPI attend de r\xE9soudre le d\xE9lai de r\xE9ponse.":S(t,"model.deadtime_heat_reliable")===!1||S(t,"model.deadtime_cool_reliable")===!1?"Acqu\xE9rir les temps morts encore en attente pour d\xE9bloquer les observations correspondantes.":"Collecter les premi\xE8res mesures A et B acceptables par SmartPI."}</p>`:E}
          ${r?v`<p><strong>Étape initiale</strong> · ${P(S(t,"learning.bootstrap_status"))}</p>`:E}
          ${S(t,"learning.enabled")===!1?v`<p>Apprentissage désactivé selon SmartPI.</p>`:E}
          <p>Détection en cours · ${P(S(t,"analysis.deadtime.state"))}
            · attente écoulée ${P(S(t,"analysis.deadtime.waiting_elapsed_s")," s",0)}</p>
          <p>Délai de réponse · ${P(S(t,"analysis.learning.response_lag.lag_s")," s",0)}
            · épisodes ${P(S(t,"analysis.learning.response_lag.episodes"),"",0)}</p>
          <p class="muted small">Motif d’apprentissage · ${P(S(t,"learning.last_reason"))}
            · motif du délai · ${P(S(t,"analysis.learning.response_lag.last_reason"))}</p>
          <p class="muted small">Si les compteurs restent à zéro, les états et motifs ci-dessus
            décrivent la dernière situation publiée. Une nouvelle mesure dépend d’une
            observation exploitable acceptée par SmartPI.</p>
        </section>
      </section>
      <smartpi-observatory .hass=${this.hass} .diagnostic=${e}
        @prepare-temperature=${o=>{if(o.detail.entityId!==e.entityId)return;let p=this.renderRoot.querySelector("smartpi-thermal-journey");p&&p.previewTemperature(o.detail.value).then(u=>{u&&p.scrollIntoView({block:"center"})})}}></smartpi-observatory>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${e} .session=${this.sessionHistory.get(e.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${n.map(o=>v`<li>${o}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${wd.map(o=>v`<details class="surface">
          <summary>${o.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${o.note}</p>
          <div class="detail-grid">${o.fields.map(p=>this.field(p,t))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:e.state,live:e.live,history:e.history},null,2)}</pre>
      </details>
      </details>
    `}render(){let e=ns(this.hass),t=e.find(n=>n.entityId===this.selectedId)??e[0];return v`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Température & supervision</span></div>
      <main>
        <div class="flex spread intro"><h2>Mes thermostats</h2>
          <span class="muted small">${e.length} diagnostic${e.length>1?"s":""} SmartPI v2</span></div>
        ${e.length===0?v`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:v`<div class="tiles">${e.map(n=>v`<button type="button" class=${"tile "+(t?.entityId===n.entityId?"selected":"")}
           @click=${()=>{this.selectedId=n.entityId}} aria-pressed=${t?.entityId===n.entityId}>
            <strong>${n.name}</strong>
            <span class="big">${P(S(n.live,"temperature.indoor")," \xB0C")}</span>
            <span class="tile-bottom">Consigne filtrée ${P(S(n.live,"setpoint.filtered_setpoint")," \xB0C")}</span>
          </button>`)}</div>
          ${t?this.showDiagnostic(t):E}`}
        <footer>Source : capteurs SmartPI Diagnostics v2 · Réglage de température et de preset sur sélection explicite</footer>
      </main>`}};si.styles=Ze`
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
    .metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin-top:14px}
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
  `,I([se({attribute:!1})],si.prototype,"hass",2),I([se({attribute:!1})],si.prototype,"panel",2),I([se({type:Boolean})],si.prototype,"narrow",2),I([re()],si.prototype,"selectedId",2),si=I([Xe("smartpi-dashboard-panel")],si);export{si as SmartPIDashboardPanel};
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
lit-html/directive.js:
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

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
