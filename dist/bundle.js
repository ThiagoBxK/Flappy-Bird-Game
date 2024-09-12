(()=>{"use strict";var t={213:(t,e)=>{var s;Object.defineProperty(e,"__esModule",{value:!0}),e.AudioEffects=e.AudioStatus=void 0,function(t){t.Play="play",t.Pause="pause"}(s||(e.AudioStatus=s={})),e.AudioEffects=class{constructor(t){this.path=t,this.audio=new Audio(t)}setStatus(t){this.audio.currentTime=0,t===s.Play?this.audio.play():this.audio.pause()}}},586:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0});const i=s(213),a=s(496);e.default=class{constructor(t){this.canvas=t,this.context=t.getContext("2d"),this.interval=null,this.scale=1.25,this.hitbox=!1,this.state={frames:0,gravity:.3,gravitySpeed:-2,posY:100,posX:20,spriteIndex:0,fps:60,size:{width:34*this.scale,heigth:24*this.scale}},this.sprites=[(0,a.createImage)("./images/upflap.png"),(0,a.createImage)("./images/midflap.png"),(0,a.createImage)("./images/downflap.png")],this.audios={wing:new i.AudioEffects("./audios/wing.wav")},this.canvas.addEventListener("click",(t=>this.handleClick(t)))}showHitBox(t){t.strokeStyle="red",t.strokeRect(this.state.posX,this.state.posY,this.state.size.width,this.state.size.heigth)}draw(t,e){this.hitbox&&this.showHitBox(t),t.drawImage(e,this.state.posX,this.state.posY,this.state.size.width,this.state.size.heigth)}clearRect(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}updateSpriteIndex(t){this.state.frames%t==0&&(this.state.spriteIndex=(this.state.spriteIndex+1)%this.sprites.length)}checkGroundCollision(){return!(this.state.posY<=this.canvas.height-this.state.size.heigth)}simulateGravity(){this.state.gravitySpeed+=this.state.gravity,this.state.posY+=this.state.gravitySpeed}gameOver(){this.state.posY=this.canvas.height-this.state.size.heigth,clearInterval(this.interval),this.updateFrame()}updateFrame(){this.state.frames++,this.updateSpriteIndex(8),this.clearRect(),this.checkGroundCollision()?this.gameOver():this.simulateGravity()}handleClick(t){this.state.posY<=0-this.state.size.heigth||(this.audios.wing.setStatus(i.AudioStatus.Play),this.state.gravitySpeed=-7)}loop(){this.interval=setInterval((()=>this.updateFrame()),1e3/this.state.fps)}render(){}start(){this.loop()}}},475:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0});const i=s(496);e.default=class{constructor(t){this.canvas=t,this.context=t.getContext("2d"),this.state={scenarioName:"default-day"},this.scenario=void 0}draw(t,e){t.drawImage(e,0,0,this.canvas.width,this.canvas.height)}setScenario(t){this.state.scenarioName=t,this.scenario=(0,i.createImage)(`./images/scenarios/${this.state.scenarioName}.png`),this.scenario.onload=()=>this.render()}render(){if(this.scenario)return this.draw(this.context,this.scenario);this.setScenario(this.state.scenarioName)}}},496:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createImage=function(t){const e=new Image;return e.src=t,e}},748:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=i(s(586)),r=i(s(475));var h;!function(t){t.Playing="playing",t.GameOver="gameover"}(h||(h={}));const n=document.getElementById("game"),o=new class{constructor(t){this.canvas=t,this.status=void 0,this.bird=new a.default(t),this.scenario=new r.default(t)}start(){}render(){this.scenario.render()}}(n);document.addEventListener("DOMContentLoaded",(()=>{o.render()}))}},e={};!function s(i){var a=e[i];if(void 0!==a)return a.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,s),r.exports}(748)})();