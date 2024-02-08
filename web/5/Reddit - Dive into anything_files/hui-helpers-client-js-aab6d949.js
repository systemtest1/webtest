import{p as t,x as e,el as i,a4 as n,c as s,_ as r,n as o,t as a,s as h,e as c}from"./shell-7035335f.js";import{B as l,b as p}from"./badge-0fb66052.js";import{F as d,l as u,s as m}from"./faceplate-hovercard-f1242100.js";import"./faceplate-tooltip-00aa71ab.js";let b=class extends(t(h)){constructor(){super(...arguments),this.appearance=l.ALERT,this.outline=!1,this.initialCount=0,this.badgeAttributes={},this.incrementEvent="",this.decrementEvent="",this.resetToZeroEvent="",this.count=0,this.incrementData=new Set,this.decrementData=new Set,this._hasBeenReset=!1,this.increment=t=>{const e=t||performance.now();this.incrementData.has(e)||(this.incrementData.add(e),this.updateCount())},this.decrement=t=>{const e=t||performance.now();this.decrementData.has(e)||(this.decrementData.add(e),this.updateCount())},this.resetCount=()=>{this._hasBeenReset=!0,this.count=0,this.incrementData=new Set,this.decrementData=new Set},this.getCount=()=>this.count,this.updateCount=()=>{this.count=Math.max(0,(this._hasBeenReset?0:this.initialCount)-this.decrementData.size+this.incrementData.size)}}connectedCallback(){super.connectedCallback(),this.count=this.initialCount,this.incrementEvent&&this.subscribe(this.incrementEvent,this.increment),this.decrementEvent&&this.subscribe(this.decrementEvent,this.decrement),this.resetToZeroEvent&&this.subscribe(this.resetToZeroEvent,this.resetCount)}disconnectedCallback(){super.disconnectedCallback(),this.incrementEvent&&this.unsubscribe(this.incrementEvent,this.increment),this.decrementEvent&&this.unsubscribe(this.decrementEvent,this.decrement),this.resetToZeroEvent&&this.unsubscribe(this.resetToZeroEvent,this.resetCount)}render(){return this.count?e`${p({appearance:this.appearance,outline:this.outline,content:i(this.count).toString(),attributes:this.badgeAttributes})}`:n}};b.styles=[s],r([o({type:String})],b.prototype,"appearance",void 0),r([o({type:Boolean})],b.prototype,"outline",void 0),r([o({type:Number,attribute:"initial-count"})],b.prototype,"initialCount",void 0),r([o({type:Object,attribute:"badge-attributes"})],b.prototype,"badgeAttributes",void 0),r([o({type:String,attribute:"increment-event"})],b.prototype,"incrementEvent",void 0),r([o({type:String,attribute:"decrement-event"})],b.prototype,"decrementEvent",void 0),r([o({type:String,attribute:"reset-to-zero-event"})],b.prototype,"resetToZeroEvent",void 0),r([a()],b.prototype,"count",void 0),b=r([c("dynamic-badge")],b);let v=class extends d{constructor(){super(...arguments),this.triggerEvent="click",this.addListenersWhileOpened2=()=>{document.addEventListener("click",this.handleDocumentClick2),document.addEventListener("keydown",this.handleEscape)},this.cleanupListenersWhileOpened2=()=>{document.removeEventListener("click",this.handleDocumentClick2),document.removeEventListener("keydown",this.handleEscape)},this.handleDocumentClick2=t=>{if(!(t.target instanceof HTMLElement)||this.hidden)return;if(this.isEventIgnorable(t))return;this._eventUsedMap.has(t)||this.close()},this.isEventIgnorable=t=>this.contains(t.target),this.handleFaceplateTrack2=()=>{this.closeOnTrack&&this.close()},this.render=()=>{const t=this._popperController.actualPosition||this.position;return e`\n <slot \n aria-describedby="faceplate-tooltip" \n faceplate-popper-trigger\n @click="${this.handleClick}" \n></slot>\n <article \n id="faceplate-tooltip" \n role="dialog" \n position="${t}" \n faceplate-popper-content\n>\n <slot name="content" @faceplate-track="${this.handleFaceplateTrack2}"></slot>\n </article>\n `}}async show(){this.emitter.dispatch("open"),this.updateCustomProperties2(),this._popperController.open().then((()=>{this.hidden||(this.addListenersWhileOpened2(),this.emitter.dispatch("opened"))})),u(this).then(m(this._popperController.reposition)).then(m((t=>{t&&(this.focusManager?.refresh(),this.focusManager?.focus())}))),await this._popperController.currentState.animationFinished,this.focusManager?.focus(),this.cleanupTimeouts()}close(){return this.cleanupListenersWhileOpened2(),super.close()}updateCustomProperties2(){if("faceplate-tooltip"!==this.tagName.toLocaleLowerCase())return;const{clientHeight:t=null,clientWidth:e=null}=this.referenceElement,{clientHeight:i=null,clientWidth:n=null}=this._tooltip;t&&e&&i&&n&&(this.style.setProperty("--target-width",`${Math.round(e)}px`),this.style.setProperty("--target-height",`${Math.round(t)}px`),this.style.setProperty("--tooltip-width",`${Math.round(n)}px`),this.style.setProperty("--tooltip-height",`${Math.round(i)}px`))}};v=r([c("click-card")],v);
//# sourceMappingURL=hui-helpers-client-js-aab6d949.js.map