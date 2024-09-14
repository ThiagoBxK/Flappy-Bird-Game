(()=>{"use strict";var t={370:(t,s,e)=>{Object.defineProperty(s,"__esModule",{value:!0});const a=e(496);s.default=class{constructor(t){this.canvas=t,this.context=t.getContext("2d"),this.groundSize=128,this.state={groundSpeed:1,posX:[0,t.width],posY:[t.height-.8*this.groundSize,t.height-.8*this.groundSize]},this.sprite=(0,a.createImage)("./images/ground.png")}draw(){this.state.posX.forEach(((t,s)=>{this.context.drawImage(this.sprite,t,this.state.posY[s],this.canvas.width,this.groundSize)}))}updateFrame(){this.state.posX[0]-=this.state.groundSpeed,this.state.posX[1]-=this.state.groundSpeed,Math.abs(this.state.posX[0])>=this.canvas.width?this.state.posX[0]=this.canvas.width:Math.abs(this.state.posX[1])>=this.canvas.width&&(this.state.posX[1]=this.canvas.width),this.draw()}render(){this.sprite.onload=()=>this.draw()}}},475:(t,s,e)=>{Object.defineProperty(s,"__esModule",{value:!0});const a=e(496);s.default=class{constructor(t){this.canvas=t,this.context=t.getContext("2d"),this.state={scenarioName:"default-day",scenarioSpeed:1,posX:[0,t.width]},this.sprite=(0,a.createImage)(`./images/scenarios/${this.state.scenarioName}.png`)}draw(){this.state.posX.forEach(((t,s)=>{this.context.drawImage(this.sprite,t,0,this.canvas.width,this.canvas.height)}))}updateFrame(){this.state.posX[0]-=this.state.scenarioSpeed,this.state.posX[1]-=this.state.scenarioSpeed,Math.abs(this.state.posX[0])>=this.canvas.width?this.state.posX[0]=this.canvas.width:Math.abs(this.state.posX[1])>=this.canvas.width&&(this.state.posX[1]=this.canvas.width),this.draw()}render(){this.sprite.onload=()=>this.draw()}}},496:(t,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.createImage=function(t){const s=new Image;return s.src=t,s}},748:function(t,s,e){var a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(s,"__esModule",{value:!0});const i=a(e(370)),h=a(e(475)),r=document.getElementById("game"),o=new i.default(r),n=new h.default(r);setInterval((()=>{n.updateFrame(),o.updateFrame()}),1e3/60)}},s={};!function e(a){var i=s[a];if(void 0!==i)return i.exports;var h=s[a]={exports:{}};return t[a].call(h.exports,h,h.exports,e),h.exports}(748)})();