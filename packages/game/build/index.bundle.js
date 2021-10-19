!function(){"use strict";var e={830:function(e,t,n){var s=n(609),i=n.n(s)()((function(e){return e[1]}));i.push([e.id,".statistic {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 200px;\r\n  text-align: left;\r\n  padding: 2px 4px;\r\n}\r\n\r\n.progress {\r\n  position: relative;\r\n  width: 100%;\r\n  height: 20px;\r\n  margin: 6px 0;\r\n  overflow: hidden;\r\n}\r\n.progress-bar {\r\n  will-change: transform;\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\n.health {\r\n  background: #7b0000;\r\n  border: 1px solid #7b0000;\r\n}\r\n.health-bar {\r\n  background: red;\r\n}\r\n\r\n.bonuses {\r\n  margin-top: 4px;\r\n}\r\n.bonus-container {\r\n  color: white;\r\n}\r\n.bonus {\r\n  margin-top: 0;\r\n  height: 10px;\r\n  background: #625d2a;\r\n  border: 1px solid #e7dc6d;\r\n}\r\n.bonus-name {\r\n  margin-top: 2px;\r\n}\r\n.bonus-bar {\r\n  background: #ffcd00;\r\n}\r\n",""]),t.Z=i},754:function(e,t,n){var s=n(609),i=n.n(s)()((function(e){return e[1]}));i.push([e.id,"* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 100vh;\r\n  margin: 0;\r\n  background: #181818;\r\n  font-size: 14px;\r\n  color: white;\r\n}\r\n\r\ncanvas {\r\n  -webkit-user-select: none;\r\n          user-select: none;\r\n}\r\n",""]),t.Z=i},323:function(e,t,n){var s=n(609),i=n.n(s)()((function(e){return e[1]}));i.push([e.id,".fps {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  background: black;\r\n  color: white;\r\n  font-size: 14px;\r\n  padding: 2px 4px;\r\n}\r\n",""]),t.Z=i},609:function(e){e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,s){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(s)for(var a=0;a<this.length;a++){var o=this[a][0];null!=o&&(i[o]=!0)}for(var r=0;r<e.length;r++){var d=[].concat(e[r]);s&&i[d[0]]||(n&&(d[2]?d[2]="".concat(n," and ").concat(d[2]):d[2]=n),t.push(d))}},t}},62:function(e){var t=[];function n(e){for(var n=-1,s=0;s<t.length;s++)if(t[s].identifier===e){n=s;break}return n}function s(e,s){for(var a={},o=[],r=0;r<e.length;r++){var d=e[r],c=s.base?d[0]+s.base:d[0],h=a[c]||0,u="".concat(c," ").concat(h);a[c]=h+1;var p=n(u),m={css:d[1],media:d[2],sourceMap:d[3]};-1!==p?(t[p].references++,t[p].updater(m)):t.push({identifier:u,updater:i(m,s),references:1}),o.push(u)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var a=s(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<a.length;o++){var r=n(a[o]);t[r].references--}for(var d=s(e,i),c=0;c<a.length;c++){var h=n(a[c]);0===t[h].references&&(t[h].updater(),t.splice(h,1))}a=d}}},793:function(e){var t={};e.exports=function(e,n){var s=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},173:function(e){e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t),t}},892:function(e,t,n){e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},36:function(e){e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var s=n.css,i=n.media,a=n.sourceMap;i?e.setAttribute("media",i):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(s,e)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},464:function(e){e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var a=t[s]={id:s,exports:{}};return e[s](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){const e={canvas:null,context:null,constructor(e){this.canvas=e,this.context=e.getContext("2d")}},t=(t,n,s)=>{e.context.beginPath(),e.context.arc(t.x,t.y,n,0,2*Math.PI,!1),e.context.fillStyle=s,e.context.fill()},s=(t,n,s,i)=>{e.context.beginPath(),e.context.arc(t.x,t.y,n,0,2*Math.PI,!1),e.context.arc(t.x,t.y,s,0,2*Math.PI,!0),e.context.fillStyle=i,e.context.fill()},i=(t,n,s,i)=>{e.context.beginPath(),e.context.moveTo(t.x,t.y),e.context.lineTo(n.x,n.y),e.context.lineWidth=s,e.context.strokeStyle=i,e.context.stroke()},a=(t,n,s,i)=>{e.context.beginPath(),e.context.moveTo(t.x,t.y),e.context.lineTo(n.x,n.y),e.context.lineTo(s.x,s.y),e.context.lineTo(t.x,t.y),e.context.fillStyle=i,e.context.fill()},o=(t,n,s,i)=>{e.context.font=`${s}px Arial`,e.context.textAlign="center",e.context.fillStyle=i,e.context.fillText(t,n.x,n.y+s/4)},r={},d="#000",c={screen:void 0,changeScreen(e){this.screen&&this.screen.destructor(),r[e]?(this.screen=r[e],this.screen.constructor()):console.error(`Register screen '${e}' before use`)},registerScreen(e){r[e.name]=e},clearScreen(){e.context.fillStyle="#000",e.context.fillRect(0,0,e.canvas.width,e.canvas.height)}},h="WELCOME_SCREEN",u="GAME_SCREEN",p="DEAD_SCREEN",m="WIN_SCREEN",l="MouseLeft",x={0:l,1:"MouseMiddle",2:"MouseRight"},y={pressedKeys:new Set,mousePosition:{x:0,y:0},mouseRotation:{sin:0,cos:1}},f=e=>{x[e.button]&&y.pressedKeys.add(x[e.button])},g=e=>{x[e.button]&&y.pressedKeys.delete(x[e.button])},v=e=>{y.pressedKeys.add(e.key)},b=e=>{y.pressedKeys.delete(e.key)},T=()=>{document.addEventListener("keydown",v),document.addEventListener("keyup",b),document.addEventListener("mousedown",f),document.addEventListener("mouseup",g)},E=()=>{document.removeEventListener("keydown",v),document.removeEventListener("keyup",b),document.removeEventListener("mousedown",f),document.removeEventListener("mouseup",g)},S={name:h,render(){e.context.font="30px Arial",e.context.textAlign="center",e.context.fillStyle="#fff",e.context.fillText("Press Enter to start the game",e.canvas.width/2,e.canvas.height/2),y.pressedKeys.has("Enter")&&c.changeScreen(u)},constructor(){T()},destructor(){E()}},w="SPAWNER_WORKER_TYPE",O="ENEMY_WORKER_TYPE",L="BULLET_WORKER_TYPE",M="BONUS_WORKER_TYPE",j=e=>t=>{e.isDead&&(e.deadTime+=t)},P=()=>({type:"EMPTY_WORKER_TYPE",deadAnimationTime:0,isDead:!1,deadTime:0,position:{x:0,y:0,radius:0},params:{},render(e){j(this)(e)},removeCondition(){return this.isDead&&this.deadTime>=this.deadAnimationTime}}),A={workers:[],reset(){this.workers=[]},add(e){this.workers.push(e)},render(e){this.workers.forEach((t=>{t.render(e)})),this.workers=this.workers.filter((e=>!e.removeCondition()))}},D=(e,t)=>{Object.keys(e).forEach(t)},B="SPEED_BONUS",_="EXP_SPEED_BONUS",k="FREEZE_BONUS",R="UNTOUCHABLE_BONUS",N="TELEKINESIS_BONUS";var C=n(62),U=n.n(C),I=n(36),K=n.n(I),Z=n(793),G=n.n(Z),Y=n(892),H=n.n(Y),V=n(173),W=n.n(V),F=n(464),$=n.n(F),q=n(830),z={};z.styleTagTransform=$(),z.setAttributes=H(),z.insert=G().bind(null,"head"),z.domAPI=K(),z.insertStyleElement=W(),U()(q.Z,z),q.Z&&q.Z.locals&&q.Z.locals;const X={[B]:"Speed x2",[_]:"Experience x2",[k]:"Freeze",[R]:"No damage",[N]:"Telekinesis"},J={score:1/0,health:1/0,ammunition:1/0,bonuses:{}};let Q,ee,te,ne,se,ie,ae={};const oe={constructor(e){const t=document.createElement("div");Q=document.createElement("div"),ne=document.createElement("div"),ee=document.createElement("div"),te=document.createElement("div"),se=document.createElement("div"),Q.classList.add("statistic"),t.classList.add("health"),t.classList.add("progress"),ne.classList.add("health-bar"),ne.classList.add("progress-bar"),ee.classList.add("score"),te.classList.add("ammunition"),se.classList.add("bonuses"),t.appendChild(ne),Q.appendChild(t),Q.appendChild(ee),Q.appendChild(te),Q.appendChild(se),document.body.appendChild(Q),ie=J,ae={},this.update(e)},update(e){ie.health!==e.health&&(ne.style.transform=`translateX(-${100-e.health}%)`),ie.score!==e.score&&(ee.innerHTML=`Score: ${e.score}`),ie.ammunition!==e.ammunition&&(te.innerHTML=`Ammunition: ${e.ammunition}`),D(e.bonuses,(t=>{ae[t]?((e,t)=>{const n=ae[e],s=t.bonuses[e],i=ie.bonuses[e],a=100*s.actionTime/s.timeLimit;a!==100*i.actionTime/i.timeLimit&&(n.bonusBar.style.transform=`translateX(-${a}%)`)})(t,e):ae[t]=(e=>{const t=document.createElement("div"),n=document.createElement("div"),s=document.createElement("div"),i=document.createElement("div");return t.classList.add("progress-bar"),t.classList.add("bonus-bar"),s.classList.add("progress"),s.classList.add("bonus"),s.appendChild(t),n.classList.add("bonus-name"),n.innerText=X[e],i.classList.add("bonus-container"),i.appendChild(n),i.appendChild(s),se.appendChild(i),{bonusBar:t,bonusWrapper:i}})(t)})),D(ie.bonuses,(t=>{e.bonuses[t]||(e=>{se.removeChild(ae[e].bonusWrapper),delete ae[e]})(t)})),(e=>{ie=JSON.parse(JSON.stringify(e))})(e)},destructor(){document.body.removeChild(Q)}},re={score:0,health:100,ammunition:100,bonuses:{},__updateHTML(){oe.update(this)},getPlayerSpeed(){return 2.5*(this.getBonusValue(B)||1)},getBonusValue(e){var t;return null===(t=this.bonuses[e])||void 0===t?void 0:t.value},addBonus(e,t=1,n=1e4){this.bonuses[e]={actionTime:0,timeLimit:n,value:t}},updateScore(e){this.score+=(this.getBonusValue(_)||1)*e},updateAmmo(e){this.ammunition+=e},updateHealth(e){e<0&&this.getBonusValue(R)||(this.health+=e,this.health=Math.min(this.health,100))},render(e){D(this.bonuses,(t=>{this.bonuses[t].actionTime+=e,this.bonuses[t].actionTime>=this.bonuses[t].timeLimit&&delete this.bonuses[t]})),this.__updateHTML()}},de=1200,ce=de,he=800,ue={x:600,y:400},pe={x:ue.x,y:ue.y,reset(){this.x=ue.x,this.y=ue.y},moveRight(){this.x+=re.getPlayerSpeed(),this.x=Math.min(de-e.canvas.width/2,this.x)},moveLeft(){this.x-=re.getPlayerSpeed(),this.x=Math.max(e.canvas.width/2,this.x)},moveUp(){this.y-=re.getPlayerSpeed(),this.y=Math.max(e.canvas.height/2,this.y)},moveDown(){this.y+=re.getPlayerSpeed(),this.y=Math.min(800-e.canvas.height/2,this.y)}},me=t=>({x:t.x-(pe.x-e.canvas.width/2),y:t.y-(pe.y-e.canvas.height/2)}),le=12,xe="#91e1ff",ye=({x:n,y:i})=>Object.assign(Object.assign({},P()),{type:"PLAYER_WORKER_TYPE",deadAnimationTime:100,position:{x:n,y:i,radius:le},render(e){if(j(this)(e),this.isDead)return n=me(this.position),void s(n,le,8,xe);var n;(({position:{x:e,y:n},gunRotation:{sin:s,cos:i}})=>{re.getBonusValue(R)&&(t({x:e,y:n},14,"#ffbc00"),t({x:e,y:n},13,d)),t({x:e,y:n},le,xe),t({x:e+i*le,y:n+s*le},5,"#ff8484")})({position:me(this.position),gunRotation:y.mouseRotation})},moveRight(){this.position.x>=e.canvas.width/2&&pe.moveRight(),this.position.x+=re.getPlayerSpeed(),this.position.x=Math.min(1188,this.position.x)},moveLeft(){this.position.x<=de-e.canvas.width/2&&pe.moveLeft(),this.position.x-=re.getPlayerSpeed(),this.position.x=Math.max(le,this.position.x)},moveUp(){this.position.y<=800-e.canvas.width/2&&pe.moveUp(),this.position.y-=re.getPlayerSpeed(),this.position.y=Math.max(le,this.position.y)},moveDown(){this.position.y>=e.canvas.width/2&&pe.moveDown(),this.position.y+=re.getPlayerSpeed(),this.position.y=Math.min(788,this.position.y)}});let fe=ye(ue);const ge=()=>fe,ve=(e,t)=>({x:e.x-t.x,y:e.y-t.y}),be=(e,t)=>{return n=ve(e,t),Math.sqrt(n.x*n.x+n.y*n.y);var n},Te=(e,t)=>be(e,t)<e.radius+t.radius,Ee=e=>({cos:Math.cos(e),sin:Math.sin(e)}),Se=()=>({x:Math.random()*ce,y:Math.random()*he}),we=e=>e[Math.floor(Math.random()*e.length)],Oe=()=>{const e=Se();return we([{x:0,y:e.y},{x:ce,y:e.y},{x:e.x,y:0},{x:e.x,y:he}])},Le=(e,t)=>e+Math.random()*(t-e),Me=e=>{const t=e.y-ge().position.y,n=e.x-ge().position.x;if(0===n)return{sin:1,cos:0};const s=t/n*(t/n),i=Math.sqrt(1/(s+1))*Math.sign(n);return{sin:Math.sqrt(s/(s+1))*Math.sign(t),cos:i}},je=(e,t=!1)=>{const n=t&&Math.random()>.5?{cos:2*(Math.random()-.5),sin:2*(Math.random()-.5)}:Me(e);return{x:-n.cos,y:-n.sin}},Pe=({x:e,y:n},i,a,o,r,d,c,h,u)=>Object.assign(Object.assign({},P()),{type:O,deadAnimationTime:100,position:{x:e,y:n,radius:i},params:Object.assign({health:r,reward:d,attack:c,attackDelay:h,timeFromLastAttack:h},u),render(e){if(j(this)(e),this.params.timeFromLastAttack+=e,this.isDead&&s(me(this.position),i,i-3,a),!re.getBonusValue(k)){const t=this.__getNextPosition(this.position,e);this.position.x=t.x,this.position.y=t.y}re.getBonusValue(k)&&t(me(this.position),i+1,"#5791d3"),t(me(this.position),i,a)},__getNextPosition(e,t){const n=je(e,!0);return{x:e.x+n.x*t*o,y:e.y+n.y*t*o}},onDead:()=>{},getDamage(){return this.params.timeFromLastAttack>=this.params.attackDelay?(this.params.timeFromLastAttack=0,this.params.attack):0}}),Ae=e=>Pe(e,7,"#dd3d3d",.02,10,100,10,800),De=.05,Be="DELAY_STATE",_e="MOVE_STATE",ke=15,Re=e=>Pe(e,5,"#db8de8",.02,5,100,15,800),Ne=e=>Pe(e,5,"#c83ddd",.03,10,100,3,150),Ce=[Ae,e=>Object.assign(Object.assign({},Pe(e,5,"#383838",De,30,200,8,500,{state:_e,expiredTime:0})),{__getNextPosition(e,t){const n=2*(Math.random()-.5)*300;this.params.expiredTime+=t,this.params.state===_e&&this.params.expiredTime>1e3+n?(this.params.expiredTime=0,this.params.state=Be):this.params.state===Be&&this.params.expiredTime>3500+n&&(this.params.expiredTime=0,this.params.state=_e);const s=ge().position,i=be(e,s)<=50;if(this.params.state===Be&&!i)return e;const a=je(e,!i);return{x:e.x+a.x*t*De,y:e.y+a.y*t*De}}}),e=>Pe(e,10,"#9b1111",.01,100,300,25,1200),(Ue=Ae,e=>Object.assign(Object.assign({},Pe(e,ke,"#bd37da",0,150,500,0,0,{expiredTime:0})),{__getNextPosition(e,t){return this.params.expiredTime+=t,this.params.expiredTime>=5e3&&(this.params.expiredTime=0,A.add(Ue(this.position))),e},onDead(){A.add(Re(this.position)),A.add(Re({x:this.position.x-ke,y:this.position.y-ke})),A.add(Re({x:this.position.x-ke,y:this.position.y+ke})),A.add(Re({x:this.position.x+ke,y:this.position.y-ke})),A.add(Re({x:this.position.x+ke,y:this.position.y+ke}))}})),e=>Object.assign(Object.assign({},Pe(e,7,"#c83ddd",.02,30,200,10,800)),{onDead(){A.add(Ne({x:this.position.x-3.5,y:this.position.y-3.5})),A.add(Ne({x:this.position.x+3.5,y:this.position.y+3.5}))}}),e=>Pe(e,7,"#ffe8e8",.05,8,300,15,300)];var Ue;const Ie=({x:e,y:t},n)=>Object.assign(Object.assign({},P()),{type:w,position:{x:e,y:t,radius:0},params:{expiredTime:4800,enemyCapacity:10},render(e){re.getBonusValue(k)||(this.params.expiredTime+=e),this.params.enemyCapacity<=0&&(this.isDead=!0),!this.isDead&&this.params.expiredTime>=5e3&&(this.params.expiredTime=0,this.params.enemyCapacity-=1,A.add(n(this.position)))}}),Ke=(e,t=we(Ce))=>{A.add(Ie(e,t))},Ze="GUN_PISTOL",Ge="GUN_MINIGUN",Ye="GUN_SHOOTGUN",He=({sin:e,cos:t},n)=>{const s=ge().position;return{x:s.x+t*s.radius,y:s.y+e*s.radius,radius:n}},Ve=({sin:e,cos:t},n,s,a,o,r,d)=>Object.assign(Object.assign({},P()),{type:L,position:He({sin:e,cos:t},n),params:{attack:s,isLine:d,sin:e,cos:t},render(e){j(this)(e),this.position.x+=this.params.cos*e*a,this.position.y+=this.params.sin*e*a,i(me(this.position),me(this.getSecondPosition()),o,r)},removeCondition(){return this.isDead&&this.deadTime>=this.deadAnimationTime||(e=this.position).x<0||e.x>ce||e.y<0||e.y>he;var e},getSecondPosition(){return{x:this.position.x+this.params.cos*this.position.radius,y:this.position.y+this.params.sin*this.position.radius}},getDamage(){return this.params.attack}}),We={spawnSpeed:300,spawnOnRender:!1,spawn(){var e;A.add((e=y.mouseRotation,Ve(e,2,10,.5,1,"#fff",!1)))}},Fe={spawnSpeed:50,spawnOnRender:!0,spawn(){var e;A.add((e=y.mouseRotation,Ve(e,13,7,.8,1,"#fff",!0)))}},$e=Math.PI/6,qe=e=>{const t=1900*(e+20)/e;return{a:t,b:100-t/20,x0:20}},ze=(e,t)=>Object.assign(Object.assign({},Ve(e,t,100,.1,1,"#b9b9b9",!0)),{deadAnimationTime:300,isDead:!0,params:Object.assign(Object.assign({attack:100,isLine:!0},e),qe(t)),getDamage(e){const t=be(e.position,this.position);return this.params.a/(t+this.params.x0)+this.params.b}}),Xe={[Ze]:We,[Ge]:Fe,[Ye]:{spawnSpeed:800,spawnOnRender:!1,spawn(){const e=(e=>{const t=Math.acos(e.cos);return e.sin<=0?2*Math.PI-t:t})(y.mouseRotation);for(let t=0;t<8;t++){const t=Le(e-$e,e+$e),n=Ee(t),s=Le(95,105);A.add(ze(n,s))}}}},Je={lastShotTime:1/0,bulletBuilder:We,gunName:Ze,setGun(e){this.bulletBuilder=Xe[e],this.gunName=e},render(e){this.lastShotTime+=e,this.bulletBuilder.spawnOnRender&&y.pressedKeys.has(l)&&this.shot()},shot(){re.ammunition>0&&this.lastShotTime>this.bulletBuilder.spawnSpeed&&(this.bulletBuilder.spawn(),re.updateAmmo(-1),this.lastShotTime=0)}},Qe="#5086da",et={[Ze]:100,[Ge]:500,[Ye]:50},tt=({x:e,y:t},n,s=15e3)=>Object.assign(Object.assign({},P()),{type:M,position:{x:e,y:t,radius:9},params:{lifeTime:0,expiredTime:s},render(e){var t;j(this)(e),(t=this,e=>{t.params.lifeTime+=e,!t.isDead&&t.params.lifeTime>=t.params.expiredTime&&(t.isDead=!0)})(e),n(me(this.position))},onBonus:()=>{}}),nt=e=>{t(e,9,Qe),i({x:e.x,y:e.y-3.5},{x:e.x,y:e.y+3.5},1,"#000f2c")},st="#ecd857",it=Math.sqrt(2),at=e=>{const n=3/it;t(e,9,Qe),t({x:e.x,y:e.y+3},2,st),t({x:e.x+n,y:e.y-n},2,st),t({x:e.x-n,y:e.y-n},2,st)},ot=({x:e,y:n})=>Object.assign(Object.assign({},P()),{type:L,deadAnimationTime:100,isDead:!0,position:{x:e,y:n,radius:100},params:{attack:1e3,isLine:!1},render(e){var n;j(this)(e),n=me(this.position),t(n,100,"#625d2a")},getSecondPosition(){return this.position},getDamage(){return this.params.attack}}),rt="#f87676",dt=e=>{t(e,9,Qe),t({x:e.x-3,y:e.y},3,rt),t({x:e.x+3,y:e.y},3,rt),a({x:e.x,y:e.y+6},{x:e.x-6,y:e.y},{x:e.x+6,y:e.y},rt)},ct=e=>{t(e,9,Qe),o("Sp",e,10,"#def6f2")},ht=e=>{t(e,9,Qe),o("x2",e,10,"#def6f2")},ut=e=>{t(e,9,Qe),o("U",e,10,"#a8cb96")},pt="#113d6c",mt=e=>{t(e,9,Qe),a({x:e.x,y:e.y-4},{x:e.x-4,y:e.y+4},{x:e.x+4,y:e.y+4},pt),a({x:e.x,y:e.y+4},{x:e.x-4,y:e.y-4},{x:e.x+4,y:e.y-4},pt)},lt="#b70000",xt=e=>{t(e,9,Qe),i({x:e.x,y:e.y-3.5},{x:e.x,y:e.y+3.5},1,lt),i({x:e.x-3,y:e.y-3.5},{x:e.x-3,y:e.y+3.5},1,lt),i({x:e.x+3,y:e.y-3.5},{x:e.x+3,y:e.y+3.5},1,lt)},yt=e=>{t(e,9,Qe),o("=",e,10,"#ffffff")},ft="#ffcc00",gt=e=>{t(e,9,Qe),i({x:e.x,y:e.y-3.5},{x:e.x,y:e.y+3.5},2,ft),a({x:e.x,y:e.y-3.5},{x:e.x-4,y:e.y-7/4},{x:e.x+4,y:e.y-7/4},ft)},vt=[e=>Object.assign(Object.assign({},tt(e,nt)),{onBonus(){re.updateAmmo(et[Je.gunName])}}),e=>Object.assign(Object.assign({},tt(e,at)),{onBonus(){A.add(ot(this.position))}}),e=>Object.assign(Object.assign({},tt(e,dt)),{onBonus(){re.updateHealth(50)}}),e=>Object.assign(Object.assign({},tt(e,ct)),{onBonus(){re.addBonus(B,1.5)}}),e=>Object.assign(Object.assign({},tt(e,ht)),{onBonus(){re.addBonus(_,2)}}),e=>Object.assign(Object.assign({},tt(e,ut)),{onBonus(){re.addBonus(R)}}),e=>Object.assign(Object.assign({},tt(e,mt)),{onBonus(){re.addBonus(k)}}),e=>Object.assign(Object.assign({},tt(e,xt)),{onBonus(){re.updateAmmo(et.GUN_MINIGUN),Je.setGun(Ge)}}),e=>Object.assign(Object.assign({},tt(e,yt)),{onBonus(){re.updateAmmo(et.GUN_SHOOTGUN),Je.setGun(Ye)}}),e=>Object.assign(Object.assign({},tt(e,gt)),{onBonus(){re.addBonus(N,1,3e4)}})],bt=()=>Object.assign(Object.assign({},P()),{params:{spawnDelay:1e3,elapsedTime:0},render(e){this.params.elapsedTime+=e,!this.isDead&&this.params.elapsedTime>=this.params.spawnDelay&&(this.params.elapsedTime=0,A.add(we(vt)(Se())))}}),Tt=(e,t,n,s)=>{t.forEach((t=>{n.forEach((e=>{if(!t.isDead&&((e,t)=>e.params.isLine?((e,t,n)=>{var s,i;if(s=ve(t,n),i=ve(e,n),Math.sign(s.x*i.x+s.y*i.y)>0){const s=be(e,n),i=be(t,n);return s<n.radius||i<n.radius}const a=((e,t,n)=>{const s=(t.y-e.y)/(t.x-e.x),i=(n.x+s*(n.y-e.y)+s*s*e.x)/(s*s+1);return{x:i,y:s*(i-e.x)+e.y}})(e,t,n);return be(a,n)<n.radius})(e.position,e.getSecondPosition(),t.position):Te(e.position,t.position))(e,t)){const n=re.getBonusValue(k)?2:1;t.params.health-=e.getDamage(t)*n,e.isDead=!0,e.deadTime=1/0,t.params.health<=0&&(re.updateScore(t.params.reward),t.isDead=!0,t.onDead())}})),re.getBonusValue(k)||t.isDead||!Te(e.position,t.position)||(re.updateHealth(-t.getDamage()),re.health<=0&&(e.isDead=!0))})),s.forEach((t=>{!t.isDead&&(Te(e.position,t.position)||re.getBonusValue(N)&&Te(Object.assign(Object.assign({},y.mousePosition),{radius:1}),t.position))&&(t.isDead=!0,t.onBonus())}))},Et=t=>{var n;y.mousePosition={x:(n={x:t.offsetX,y:t.offsetY}).x+(pe.x-e.canvas.width/2),y:n.y+(pe.y-e.canvas.height/2)},y.mouseRotation=Me(y.mousePosition)},St=e=>{x[e.button]===l&&Je.shot()},wt={name:u,render(e){const t=ge();y.pressedKeys.has("ArrowRight")?t.moveRight():y.pressedKeys.has("ArrowLeft")&&t.moveLeft(),y.pressedKeys.has("ArrowUp")?t.moveUp():y.pressedKeys.has("ArrowDown")&&t.moveDown(),Je.render(e);const n=A.workers.filter((e=>e.type===O)),s=A.workers.filter((e=>e.type===L)),i=A.workers.filter((e=>e.type===M)),a=A.workers.filter((e=>e.type===w));Tt(t,n,s,i),t.removeCondition()&&c.changeScreen(p),0===n.length&&0===a.length&&c.changeScreen(m),re.render(e),A.render(e)},constructor(){e.canvas.addEventListener("mousemove",Et),e.canvas.addEventListener("mousedown",St),T(),pe.reset(),A.reset(),Je.setGun(Ze),fe=ye(ue),A.add(fe),A.add(bt());for(let e=0;e<100;e++)Ke(Oe());re.score=0,re.health=100,re.ammunition=100,re.bonuses={},oe.constructor(re)},destructor(){e.canvas.removeEventListener("mousemove",Et),e.canvas.removeEventListener("mousedown",St),E(),oe.destructor()}},Ot={name:p,render(){e.context.font="30px Arial",e.context.textAlign="center",e.context.fillStyle="#fff",e.context.fillText("Game is over",e.canvas.width/2,e.canvas.height/2-45),e.context.fillText(`Your score is ${re.score}`,e.canvas.width/2,e.canvas.height/2),e.context.fillText("Press Enter to start the game",e.canvas.width/2,e.canvas.height/2+45),y.pressedKeys.has("Enter")&&c.changeScreen(u)},constructor(){T()},destructor(){E()}},Lt={name:m,render(){e.context.font="30px Arial",e.context.textAlign="center",e.context.fillStyle="#fff",e.context.fillText("You win the game",e.canvas.width/2,e.canvas.height/2-45),e.context.fillText(`Your score is ${re.score}`,e.canvas.width/2,e.canvas.height/2),e.context.fillText("Press Enter to start the game",e.canvas.width/2,e.canvas.height/2+45),y.pressedKeys.has("Enter")&&c.changeScreen(u)},constructor(){T()},destructor(){E()}};var Mt=n(323),jt={};jt.styleTagTransform=$(),jt.setAttributes=H(),jt.insert=G().bind(null,"head"),jt.domAPI=K(),jt.insertStyleElement=W(),U()(Mt.Z,jt),Mt.Z&&Mt.Z.locals&&Mt.Z.locals;let Pt,At=0,Dt=0;const Bt={init(){Pt=document.createElement("div"),Pt.classList.add("fps"),document.body.appendChild(Pt)},render(e){At++,e-Dt>=1e3&&(Pt.innerHTML=`FPS: ${At}`,At=0,Dt=e)}};var _t=n(754),kt={};kt.styleTagTransform=$(),kt.setAttributes=H(),kt.insert=G().bind(null,"head"),kt.domAPI=K(),kt.insertStyleElement=W(),U()(_t.Z,kt),_t.Z&&_t.Z.locals&&_t.Z.locals;let Rt=0;const Nt=e=>{var t;Bt.render(e),c.clearScreen(),null===(t=c.screen)||void 0===t||t.render(e-Rt),Rt=e,window.requestAnimationFrame(Nt)};window.onload=()=>{Bt.init(),e.constructor(document.querySelector("canvas")),c.registerScreen(S),c.registerScreen(wt),c.registerScreen(Ot),c.registerScreen(Lt),c.changeScreen(h),window.requestAnimationFrame(Nt)}}()}();