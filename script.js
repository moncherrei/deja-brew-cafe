(function(){
const T=THREE,stage=document.getElementById('stage');
const R=new T.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=T.sRGBEncoding;stage.appendChild(R.domElement);
const S=new T.Scene(),cam=new T.PerspectiveCamera(55,1,.1,150);
const PINK='#fcc1de',TAN='#dbc1b3',CREAM='#e8e7e5',ROSE='#c19c8c',BR='#644535',DK='#4b3226';
const GR=['#7f9d6a','#6a8a5a','#91ab77','#566f4a'];
function cv(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.needsUpdate=true;return t}
S.background=cv(2,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#d9a6c2');gr.addColorStop(.5,PINK);gr.addColorStop(1,'#efe4e2');g.fillStyle=gr;g.fillRect(0,0,w,h)});
S.fog=new T.Fog(0xf3d5e3,35,110);
const gm=new T.DataTexture(new Uint8Array([120,195,255]),3,1,T.LuminanceFormat);gm.minFilter=gm.magFilter=T.NearestFilter;gm.needsUpdate=true;
const mats={};const M=(c,o)=>c&&c.isMaterial?c:o?new T.MeshToonMaterial(Object.assign({color:c,gradientMap:gm},o)):(mats[c]=mats[c]||new T.MeshToonMaterial({color:c,gradientMap:gm}));
const add=(m,x,y,z,p)=>{m.position.set(x,y,z);(p||S).add(m);return m};
const bx=(w,h,d,c,x,y,z,p)=>add(new T.Mesh(new T.BoxGeometry(w,h,d),M(c)),x,y,z,p);
const cyl=(a,b,h,c,x,y,z,p,s)=>add(new T.Mesh(new T.CylinderGeometry(a,b,h,s||18),M(c)),x,y,z,p);
const SG=new T.SphereGeometry(1,12,9);
const sph=(r,c,x,y,z,p,sx,sy,sz)=>{const m=add(new T.Mesh(SG,M(c)),x,y,z,p);m.scale.set(r*(sx||1),r*(sy||1),r*(sz||1));return m};
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
const FL=[PINK,CREAM,TAN,'#f58fbf'];
const rep=(t,x,y)=>{t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(x,y);return t};
function grain(b,d,l){return cv(128,128,(g,W,H)=>{g.fillStyle=b;g.fillRect(0,0,W,H);for(let i=0;i<46;i++){g.strokeStyle=i%3?d:l;g.globalAlpha=.28;g.lineWidth=1+Math.random()*2;g.beginPath();const y=Math.random()*H;g.moveTo(0,y);g.bezierCurveTo(40,y+Math.random()*10-5,90,y+Math.random()*10-5,W,y+Math.random()*6-3);g.stroke()}g.globalAlpha=1})}
function weave(b,d){return cv(64,64,(g,W,H)=>{g.fillStyle=b;g.fillRect(0,0,W,H);g.fillStyle=d;g.globalAlpha=.2;for(let i=0;i<W;i+=4){g.fillRect(i,0,2,H);g.fillRect(0,i,W,2)}g.globalAlpha=1})}
function ging(b,d){return cv(64,64,(g,W,H)=>{g.fillStyle=b;g.fillRect(0,0,W,H);g.fillStyle=d;g.globalAlpha=.5;g.fillRect(16,0,16,H);g.fillRect(0,16,W,16);g.globalAlpha=1})}
function plaster(b){return cv(128,128,(g,W,H)=>{g.fillStyle=b;g.fillRect(0,0,W,H);for(let i=0;i<500;i++){g.fillStyle=Math.random()>.5?'rgba(100,69,53,.12)':'rgba(255,230,220,.12)';g.fillRect(Math.random()*W,Math.random()*H,2,2)}})}
const TX=t=>M('#ffffff',{map:t});
function siding(b){return cv(128,128,(g,W,H)=>{g.fillStyle=b;g.fillRect(0,0,W,H);for(let i=0;i<8;i++){g.fillStyle='rgba(50,25,20,.38)';g.fillRect(0,i*16+13,W,3)}for(let i=0;i<300;i++){g.fillStyle='rgba(50,25,20,.08)';g.fillRect(Math.random()*W,Math.random()*H,3,1)}})}
const WOOD=TX(grain('#a67d5f','#5a3b2b','#d0a98a')),WOOD2=TX(grain('#7a5644','#3f291e','#9a7260')),WALL=TX(rep(plaster('#dd9fba'),2,1.5)),
FAB_P=TX(rep(weave('#f2b2cf','#8a4b6b'),3,3)),FAB_R=TX(rep(weave('#c19c8c','#644535'),3,3)),FAB_T=TX(rep(weave('#dbc1b3','#8a6a58'),3,3)),
CLOTH=TX(rep(ging('#f7d4e4','#ea9fc2'),3,3)),RUG=TX(rep(weave('#e8b2c8','#8a4b6b'),6,6)),RUG2=TX(rep(ging('#f08fb8','#fcc1de'),4,4)),
PINKW=TX(grain('#dc8fb2','#a8567e','#f0b4cf')),FAB_P2=TX(rep(weave('#ee86b2','#7a3354'),3,3));

// lights (kept soft so the café feels dim and cozy)
S.add(new T.AmbientLight(0xffd8e4,.68));S.add(new T.HemisphereLight(0xffd9ea,0xb98c78,.35));
const sun=new T.DirectionalLight(0xffe6cf,.28);sun.position.set(2,8,14);S.add(sun);

// ground, path, floor
add(new T.Mesh(new T.PlaneGeometry(160,160),M('#72905f')),0,-.2,0).rotation.x=-Math.PI/2;
for(let i=0;i<9;i++)cyl(.55,.55,.08,CREAM,Math.sin(i*1.3)*.35,-.14,7.4+i*1.15,S,14);
const plank=cv(256,256,(g,w,h)=>{for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle=(i+j)%2?'#e4b9c9':'#c88aa5';g.fillRect(i*64,j*64,64,64)}});
plank.wrapS=plank.wrapT=T.RepeatWrapping;plank.repeat.set(3,3);
add(new T.Mesh(new T.PlaneGeometry(12,11),M('#ffffff',{map:plank})),0,0,.5).rotation.x=-Math.PI/2;

// room shell
bx(3.5,5,.3,WALL,-4.25,2.5,-5);bx(3.5,5,.3,WALL,4.25,2.5,-5);bx(5,1.2,.3,PINKW,0,.6,-5);bx(5,1,.3,WALL,0,4.5,-5);
bx(3.5,1.2,.1,PINKW,-4.25,.6,-4.82);bx(3.5,1.2,.1,PINKW,4.25,.6,-4.82);
bx(.3,5,11,WALL,-6,2.5,.5);bx(.3,5,11,WALL,6,2.5,.5);bx(.1,1.3,11,PINKW,-5.8,.65,.5);bx(.1,1.3,11,PINKW,5.8,.65,.5);
bx(12.6,.3,11.4,'#e3b5c5',0,5.1,.5);[-4,-1,2,5].forEach(z=>bx(12,.28,.32,'#b0708a',0,4.88,z));
bx(5.2,.14,.2,BR,0,4,-4.88);bx(.14,2.9,.2,BR,-2.5,2.6,-4.88);bx(.14,2.9,.2,BR,2.5,2.6,-4.88);bx(.1,2.8,.14,BR,0,2.6,-4.9);bx(5,.1,.14,BR,0,2.6,-4.9);bx(5.6,.14,.55,BR,0,1.22,-4.78);
bx(.9,2.9,.12,FAB_P2,-2.1,2.6,-4.75);bx(.9,2.9,.12,FAB_P2,2.1,2.6,-4.75);bx(5.6,.3,.16,FAB_P,0,4.05,-4.72);
for(let i=0;i<14;i++){const f=add(new T.Mesh(new T.ConeGeometry(.16,.3,3),M(i%2?PINK:'#f58fbf')),-5.5+i*.85,4.55-Math.sin(i/13*Math.PI)*.3,-1.2);f.rotation.x=Math.PI}

// FACADE (outside of the café)
const FW=TX(rep(siding('#a8776e'),3,2));
bx(5,5,.4,FW,-3.5,2.5,6.1);bx(5,5,.4,FW,3.5,2.5,6.1);bx(2,1.6,.4,FW,0,4.2,6.1);
bx(.18,3.4,.5,BR,-1.05,1.7,6.15);bx(.18,3.4,.5,BR,1.05,1.7,6.15);bx(2.3,.2,.5,BR,0,3.45,6.15);
bx(.08,3.2,.9,BR,-1.1,1.6,6.75);bx(.08,3.2,.9,BR,1.1,1.6,6.75);bx(1.5,.03,.9,PINK,0,.02,6.9);
bx(12.6,.3,.5,BR,0,.1,6.2);
bx(.05,5,11.4,FW,-6.18,2.5,.5);bx(.05,5,11.4,FW,6.18,2.5,.5);bx(3.5,5,.05,FW,-4.25,2.5,-5.18);bx(3.5,5,.05,FW,4.25,2.5,-5.18);bx(5,1.2,.05,FW,0,.6,-5.18);bx(5,1,.05,FW,0,4.5,-5.18);
[-3.5,3.5].forEach(x=>{add(new T.Mesh(new T.PlaneGeometry(2.4,1.7),new T.MeshBasicMaterial({color:'#f0c79a'})),x,2.5,6.32);
 bx(2.6,.12,.14,BR,x,3.38,6.36);bx(2.6,.12,.14,BR,x,1.62,6.36);bx(.12,1.8,.14,BR,x-1.25,2.5,6.36);bx(.12,1.8,.14,BR,x+1.25,2.5,6.36);bx(.08,1.7,.12,BR,x,2.5,6.36);bx(2.4,.08,.12,BR,x,2.5,6.36);
 bx(2.7,.5,.55,BR,x,1.25,6.6);for(let i=0;i<7;i++){sph(rnd(.18,.26),pick(GR),x-1.1+i*.37,1.65,6.62);sph(.08,pick(FL),x-1.1+i*.37+rnd(-.1,.1),1.82,6.7)}});
// roof
const roofF=bx(13.2,.3,7.1,BR,0,5.95,3.1);roofF.rotation.x=.27;const roofB=bx(13.2,.3,6.2,BR,0,5.95,-2.7);roofB.rotation.x=-.3;
// awning
const stripe=cv(128,16,(g)=>{for(let i=0;i<8;i++){g.fillStyle=i%2?CREAM:PINK;g.fillRect(i*16,0,16,16)}});
const aw=add(new T.Mesh(new T.BoxGeometry(3.4,.1,1.5),M('#ffffff',{map:stripe})),0,3.85,6.95);aw.rotation.x=.4;
for(let i=0;i<8;i++)sph(.2,i%2?CREAM:PINK,-1.5+i*.43,3.44,7.6,S,1,.8,.5);
// signs
const signTex=cv(512,160,()=>{});
const outSign=add(new T.Mesh(new T.PlaneGeometry(3.4,1.06),new T.MeshBasicMaterial({map:signTex})),0,4.75,6.35);
const lbTex=cv(512,560,()=>{});const inSign=add(new T.Mesh(new T.PlaneGeometry(1.7,1.86),new T.MeshBasicMaterial({map:lbTex})),-4.2,3.05,-4.8);
bx(.12,1.8,.12,WOOD2,3.0,.9,9.6);bx(.12,1.8,.12,WOOD2,4.5,.9,9.6);bx(1.74,1.9,.06,BR,3.75,1.55,9.6);add(new T.Mesh(new T.PlaneGeometry(1.62,1.78),new T.MeshBasicMaterial({map:lbTex})),3.75,1.55,9.64);
// door lanterns
[-1.7,1.7].forEach(x=>{add(new T.Mesh(SG,new T.MeshBasicMaterial({color:'#ffd9a0'})),x,3.2,6.45).scale.set(.15,.2,.15)});
// ivy + vines
for(let i=0;i<80;i++){const s=i%2?1:-1,x=s*(5.8-Math.pow(Math.random(),1.8)*4.4),y=4.9-Math.pow(Math.random(),.8)*4.5;if(Math.abs(Math.abs(x)-3.5)<1.4&&y>1.4&&y<3.6)continue;sph(rnd(.15,.3),pick(GR),x,y,6.38)}
for(let i=0;i<14;i++){const x=-6+i*.92,l=rnd(.8,2.2);cyl(.015,.015,l,GR[1],x,5-l/2+.05,6.55,S,4);sph(.12,pick(GR),x,5.05-l,6.55);sph(.1,pick(GR),x+.05,5.05-l*.5,6.55)}
// bushes + flowers + hedge
for(let side=-1;side<=1;side+=2)for(let i=0;i<10;i++){const x=side*(2.6+i*.95),r=rnd(.45,.8);sph(r,pick(GR),x,r*.8,rnd(7.2,7.7),S,1,.85,1);
 for(let k=0;k<2;k++)sph(.09,pick(FL),x+rnd(-.5,.5),r*.9+rnd(.1,.4),rnd(7.5,8.1))}
// trees
function tree(x,z,s){cyl(.22*s,.34*s,3.2*s,BR,x,1.6*s,z,S,8);for(let i=0;i<6;i++)sph(rnd(1,1.5)*s,GR[i%4],x+rnd(-1,1)*s,(3.6+rnd(-.2,1.5))*s,z+rnd(-.8,.8)*s,S,1,.85,1)}
tree(-8.5,8,1.1);tree(9.5,7,1.2);tree(-12,0,1.4);tree(12.5,-1,1.3);tree(-14,10,1.5);tree(15,10,1.4);tree(-4,-11,1.5);tree(5,-14,1.9);tree(-18,-8,1.8);
for(let i=0;i<40;i++)sph(rnd(.3,.6),pick(GR),rnd(-20,20),.3,rnd(9,22),S,1,.8,1);
for(let i=0;i<50;i++){const x=rnd(-16,16),z=rnd(8,18);if(Math.abs(x)<2)continue;sph(.07,pick(FL),x,.05,z)}
// hills + clouds
[[-14,-4,-24,10],[8,-5,-26,13],[24,-3,-30,9],[-30,-3,-20,10]].forEach((h,i)=>sph(h[3],GR[i%4],h[0],h[1],h[2],S,1.8,.8,1));
const cloudTex=cv(256,128,(g)=>{g.fillStyle='#fff6fa';[[70,78,40],[120,60,50],[175,76,42],[100,84,36],[150,86,34]].forEach(c=>{g.beginPath();g.arc(c[0],c[1],c[2],0,7);g.fill()})});
const clouds=[];for(let i=0;i<8;i++){const s=new T.Sprite(new T.SpriteMaterial({map:cloudTex,transparent:true,opacity:.95,fog:false}));const k=7+Math.random()*5;s.scale.set(k,k/2,1);s.position.set(-34+i*9,rnd(9,18),-30-Math.random()*8);S.add(s);clouds.push(s)}

// COUNTER, kiosk, sign texts
bx(5.8,1.1,1.1,PINKW,-1.25,.55,-3.4);bx(6.1,.12,1.4,WOOD,-1.25,1.16,-3.4);for(let i=0;i<4;i++)bx(1.2,.8,.04,CLOTH,-3.4+i*1.4,.55,-2.84);
bx(2.4,.55,.9,WOOD2,-3.4,.275,-4.4);bx(.7,.5,.5,'#9a7260',-2.3,1.47,-3.45);bx(.74,.08,.54,BR,-2.3,1.75,-3.45);sph(.08,ROSE,-2.45,1.4,-3.18);sph(.08,ROSE,-2.15,1.4,-3.18);
cyl(.28,.34,1.1,PINKW,2.6,.55,-2.6);bx(1.3,.95,.22,PINKW,2.6,1.6,-2.6);bx(1.4,.06,.26,PINK,2.6,2.1,-2.6);
const kTex=cv(512,360,()=>{});const kScreen=add(new T.Mesh(new T.PlaneGeometry(1.14,.78),new T.MeshBasicMaterial({map:kTex})),2.6,1.6,-2.48);
const boardTex=cv(320,240,()=>{});add(new T.Mesh(new T.PlaneGeometry(1.7,1.28),new T.MeshBasicMaterial({map:boardTex})),4.25,3,-4.82);bx(1.86,1.44,.06,BR,4.25,3,-4.86);
const LOGO='logo.png',logoImg=new Image();let logoOK=false;logoImg.onload=()=>{logoOK=true;stamp()};logoImg.src=LOGO;
function fit(g,x,y,w,h){const r=Math.min(w/logoImg.width,h/logoImg.height),iw=logoImg.width*r,ih=logoImg.height*r;g.drawImage(logoImg,x+(w-iw)/2,y+(h-ih)/2,iw,ih)}
function stamp(){let g=kTex.image.getContext('2d');g.fillStyle='#f4e6e8';g.fillRect(0,0,512,360);if(logoOK)fit(g,96,4,320,262);g.fillStyle='#8f5a4b';g.textAlign='center';g.font='700 30px "Zen Maru Gothic",sans-serif';g.fillText('tap to order',256,315);kTex.needsUpdate=true;
 g=signTex.image.getContext('2d');g.fillStyle='#f4e6e8';g.fillRect(0,0,512,160);g.strokeStyle='#a97c6e';g.lineWidth=8;g.strokeRect(8,8,496,144);g.fillStyle='#a97c6e';g.textAlign='center';g.font='800 78px "Shippori Mincho B1",serif';g.fillText('déjà brew',256,98);try{g.letterSpacing='5px'}catch(e){}g.font='500 19px "Zen Maru Gothic",sans-serif';g.fillText('A FEELING WORTH REPEATING',256,138);signTex.needsUpdate=true;
 g=lbTex.image.getContext('2d');g.fillStyle='#f4e6e8';g.fillRect(0,0,512,560);g.strokeStyle='#a97c6e';g.lineWidth=8;g.strokeRect(10,10,492,540);if(logoOK)fit(g,30,26,452,508);lbTex.needsUpdate=true;
 g=boardTex.image.getContext('2d');g.fillStyle='#3b2a22';g.fillRect(0,0,320,240);g.fillStyle=PINK;g.textAlign='center';g.font='700 34px "Shippori Mincho B1",serif';g.fillText('today’s brews',160,56);g.fillStyle=CREAM;g.font='500 24px "Zen Maru Gothic",sans-serif';['slow drip','brown sugar latte','ceremonial matcha','cinnamon snail'].forEach((t,i)=>g.fillText(t,160,105+i*38));boardTex.needsUpdate=true}
stamp();if(document.fonts){document.fonts.load('800 40px "Shippori Mincho B1"').then(stamp);document.fonts.ready.then(stamp)}
cyl(.02,.02,1.2,DK,-4.85,4.6,-4.8);cyl(.02,.02,1.2,DK,-3.55,4.6,-4.8);

// mugs + steam
const steamTex=cv(64,64,(g)=>{const r=g.createRadialGradient(32,32,2,32,32,30);r.addColorStop(0,'rgba(255,255,255,.9)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64)});
const steams=[];[[-3,PINK],[-1.6,TAN],[-.2,'#f4f2f0']].forEach(m=>{cyl(.11,.09,.15,m[1],m[0],1.3,-3.3);add(new T.Mesh(new T.TorusGeometry(.055,.015,6,12),M(m[1])),m[0]+.12,1.3,-3.3);
 for(let i=0;i<5;i++){const s=new T.Sprite(new T.SpriteMaterial({map:steamTex,transparent:true,depthWrite:false}));s.userData={x:m[0],o:i/5};S.add(s);steams.push(s)}});
cyl(.2,.26,.32,ROSE,1,1.38,-3.5);sph(.14,ROSE,1,1.6,-3.5);

// plants
function plant(x,y,z,s,pot){const g=new T.Group();g.position.set(x,y,z);g.scale.setScalar(s);S.add(g);cyl(.2,.15,.3,pot||ROSE,0,.15,0,g);
 for(let i=0;i<7;i++){const a=i*2.4,l=sph(.2,GR[i%4],Math.cos(a)*.18,.5+(i%3)*.15,Math.sin(a)*.18,g,1,1.5,.5);l.rotation.set(Math.sin(a)*.5,a,Math.cos(a)*.5)}return g}
plant(-2,1.28,-4.7,1);plant(0,1.28,-4.7,1.1,PINK);plant(2.1,1.28,-4.7,.9);
plant(-5.3,0,4.8,2.2,TAN);plant(5.2,0,-3.8,2.4,PINK);plant(-5.3,0,-4.2,1.9);plant(1.6,0,5.2,1.6,PINK);
const hangs=[];[[-4.8,4.3,-3],[3.8,4.3,-4],[5,4.3,3.5]].forEach(h=>{cyl(.012,.012,.7,DK,h[0],4.65,h[2],S,4);hangs.push(plant(h[0],h[1]-.6,h[2],1));for(let i=0;i<4;i++)sph(.09,GR[i%4],h[0]+(i-1.5)*.1,h[1]-.95-i*.12,h[2],S,1,2,1)});

// SEATING & INTERIOR
function stool(x,z){cyl(.04,.04,.7,DK,x,.38,z,S,6);cyl(.2,.2,.03,DK,x,.03,z);cyl(.26,.26,.12,FAB_P,x,.78,z)}
function armchair(x,z,ry,col){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=ry;S.add(g);
 bx(.9,.3,.9,col,0,.3,0,g);bx(.7,.14,.7,FAB_T,0,.5,.05,g);bx(.9,.75,.2,col,0,.8,-.4,g);bx(.16,.35,.8,col,-.45,.55,0,g);bx(.16,.35,.8,col,.45,.55,0,g);
 [[-.35,-.35],[.35,-.35],[-.35,.35],[.35,.35]].forEach(p=>cyl(.04,.03,.2,DK,p[0],.1,p[1],g,6))}
function chair(x,z,ry){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=ry;S.add(g);
 bx(.6,.07,.6,WOOD,0,.5,0,g);bx(.5,.07,.5,FAB_P,0,.56,0,g);bx(.6,.55,.06,WOOD,0,.82,-.27,g);bx(.4,.3,.04,FAB_P2,0,.84,-.23,g);[[-.25,-.25],[.25,-.25],[-.25,.25],[.25,.25]].forEach(p=>bx(.05,.5,.05,WOOD2,p[0],.25,p[1],g))}
function vase(x,y,z){cyl(.06,.05,.16,ROSE,x,y+.08,z,S,8);[[0,.2,0],[.06,.25,.03],[-.05,.23,-.02]].forEach((p,i)=>sph(.06,FL[i],x+p[0],y+p[1],z+p[2]))}
function table(x,z,r){cyl(r,r,.08,WOOD,x,.8,z,S,24);cyl(r*.97,r*.97,.02,CLOTH,x,.845,z,S,24);cyl(.08,.13,.78,WOOD2,x,.4,z);cyl(.4,.42,.04,WOOD2,x,.02,z);vase(x,.85,z);cyl(.09,.07,.1,PINK,x+r*.5,.9,z+.1)}
// counter stools
[-3.6,-2.2,-.8].forEach(x=>stool(x,-2.35));
// left lounge
cyl(1.9,1.9,.02,RUG,-3.4,.02,1.4,S,32);cyl(1.5,1.5,.025,RUG2,-3.4,.03,1.4,S,32);
table(-3.4,1.4,.7);armchair(-4.75,1.4,Math.PI/2,FAB_P);armchair(-2.05,1.4,-Math.PI/2,FAB_P2);
// bookshelf
bx(.5,2.7,2.8,PINKW,-5.65,1.35,-1.2);for(let r=0;r<4;r++){bx(.5,.06,2.8,DK,-5.6,.2+r*.7,-1.2);for(let k=0;k<9;k++)bx(.3,rnd(.35,.55),.12,pick([PINK,CREAM,TAN,ROSE,GR[0],GR[1]]),-5.55,.5+r*.7-.1,-2.4+k*.28)}
// centre-right dining
table(1.2,2.7,.75);chair(.15,2.7,Math.PI/2);chair(2.25,2.7,-Math.PI/2);cyl(1.4,1.4,.02,RUG,1.2,.02,2.7,S,32);
// booth on right wall
bx(.9,.45,4.4,FAB_P,5.4,.28,1.4);bx(.2,1.1,4.4,FAB_P2,5.78,.95,1.4);for(let i=0;i<3;i++)bx(.1,.4,.5,CLOTH,5.2,.62,.1+i*1.3).rotation.z=.15;
bx(1,.08,3.2,WOOD,4.3,.82,1.4);bx(.5,.012,3,CLOTH,4.3,.865,1.4);bx(.1,.8,.1,WOOD2,4.3,.4,.1);bx(.1,.8,.1,WOOD2,4.3,.4,2.7);vase(4.3,.87,1.4);cyl(.09,.07,.1,TAN,4.2,.91,.6);
// frames on right wall
[[3,-.2],[3.2,.9]].forEach((f,i)=>{bx(.06,.9,.7,BR,5.82,f[0],f[1]-.2+i*1.2);bx(.07,.75,.55,[PINK,GR[2]][i],5.8,f[0],f[1]-.2+i*1.2)});
// pendant lanterns
const lant=[];[[-3.4,3.6,1.4],[1.2,3.6,2.7],[4.3,3.6,1.4],[-1.5,3.5,-1]].forEach((l,i)=>{cyl(.01,.01,1.4,DK,l[0],4.3,l[2],S,4);
 const b=add(new T.Mesh(SG,new T.MeshBasicMaterial({color:'#ffc6dc'})),l[0],l[1],l[2]);b.scale.set(.24,.29,.24);lant.push(b);
 if(i<3){const p=new T.PointLight(0xffbfd5,.85,9);p.position.set(...l);S.add(p);b.userData.light=p}});
[[6.5,11.5],[-6.5,12.5]].forEach(p=>{table(p[0],p[1],.7);chair(p[0]-1.1,p[1],Math.PI/2);chair(p[0]+1.1,p[1],-Math.PI/2);plant(p[0]+1.7,0,p[1]-1,1.2,PINK)});
for(let i=0;i<3;i++){const m=add(new T.Mesh(new T.PlaneGeometry(.9,6.5),new T.MeshBasicMaterial({color:0xffe3c9,transparent:true,opacity:.08,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide})),-1.6+i*1.6,2.4,-2.4);m.rotation.set(.45,0,.28)}

// cat + soot sprites
const cat=new T.Group();cat.position.set(-1.6,1.4,-4.75);S.add(cat);
sph(.26,'#d9a679',0,.14,0,cat,1.25,.75,.9);sph(.15,'#d9a679',-.28,.16,.05,cat);[-.34,-.22].forEach(x=>add(new T.Mesh(new T.ConeGeometry(.045,.1,4),M('#d9a679')),x,.3,.05,cat));const tail=sph(.06,'#d9a679',.3,.08,.12,cat,3,1,1);
const soots=[];for(let i=0;i<3;i++){const g=new T.Group(),sz=.14,bm=new T.MeshBasicMaterial({color:'#1b1b22'});g.add(new T.Mesh(new T.IcosahedronGeometry(sz,1),bm));
 for(let k=0;k<10;k++){const sp=new T.Mesh(new T.ConeGeometry(.02,.07,3),bm),a=k*.63;sp.position.set(Math.cos(a)*sz,Math.sin(a*1.7)*sz,Math.sin(a)*sz*.8);sp.lookAt(sp.position.clone().multiplyScalar(2));sp.rotateX(Math.PI/2);g.add(sp)}
 [-.045,.045].forEach(x=>{const e=new T.Mesh(new T.SphereGeometry(.035,8,6),new T.MeshBasicMaterial({color:'#fff'}));e.position.set(x,.02,sz*.9);g.add(e)});
 g.userData={x:-3.6+i*1.5,t:Math.random()*6,v:.4+Math.random()*.4,ph:i};S.add(g);soots.push(g)}

// dust motes
const N=120,pos=new Float32Array(N*3);for(let i=0;i<N;i++){pos[i*3]=rnd(-5.5,5.5);pos[i*3+1]=rnd(0,4.5);pos[i*3+2]=rnd(-4.5,5.5)}
const mg=new T.BufferGeometry();mg.setAttribute('position',new T.BufferAttribute(pos,3));S.add(new T.Points(mg,new T.PointsMaterial({color:0xfff0d8,size:.07,transparent:true,opacity:.7,depthWrite:false})));

// 2D CHIBI CHARACTERS: oversized heads, huge glossy eyes, tiny bodies and soft storybook details
function svgOf(o){
 const skin='#f2cbb5', outline='#4b302c', shoe=o.shoe||'#f2e6dc';
 const mir=x=>'<g transform="translate(300 0) scale(-1 1)">'+x+'</g>';
 const eye=(cx)=>`<ellipse cx="${cx}" cy="177" rx="31" ry="36" fill="#fffdfb" stroke="${outline}" stroke-width="3"/><ellipse cx="${cx+2}" cy="181" rx="23" ry="29" fill="#171014"/><ellipse cx="${cx-7}" cy="166" rx="9" ry="11" fill="#fff"/><circle cx="${cx+10}" cy="193" r="4.5" fill="#fff"/><path d="M${cx-31} 171 Q${cx} 137 ${cx+31} 171" fill="none" stroke="#25191a" stroke-width="7" stroke-linecap="round"/>`;
 const hair=`<path d="M150 25 C82 17 27 62 22 139 C15 194 4 237 13 287 C18 322 43 340 62 315 C77 297 70 265 62 237 C49 193 58 131 93 101 C116 81 137 79 150 80 C172 78 200 88 222 110 C250 140 251 193 238 236 C226 274 222 302 244 319 C270 339 291 309 289 270 C288 222 279 181 278 137 C275 60 219 18 150 25Z" fill="url(#hg)"/>`;
 const bangs=`<path d="M42 142 C37 74 82 35 145 36 C211 31 264 75 258 148 C236 123 215 107 193 98 C171 118 145 126 117 120 C91 115 69 125 42 142Z" fill="url(#hg)"/><path d="M53 127 C78 85 113 73 150 80 C128 101 106 115 80 133Z" fill="${o.hl}" opacity=".24"/>`;
 const legs=`<rect x="119" y="350" width="23" height="39" rx="11" fill="${skin}"/><rect x="158" y="350" width="23" height="39" rx="11" fill="${skin}"/><ellipse cx="128" cy="390" rx="20" ry="10" fill="${shoe}"/><ellipse cx="171" cy="390" rx="20" ry="10" fill="${shoe}"/>`;
 let body='';
 if(o.outfit==='red'){
  body=`<path d="M112 275 Q150 260 188 275 L201 346 Q150 366 99 346Z" fill="#d83e4d" stroke="#9f2937" stroke-width="2"/><path d="M99 335 Q150 352 201 335 L211 355 Q150 381 89 355Z" fill="#ec6470"/>`;
  for(let i=0;i<7;i++) body+=`<path d="M${93+i*17.5} 350 q8 -12 17 0 q-8 16 -17 0" fill="#f27b83"/>`;
  body+=`<path d="M119 270 Q150 258 181 270 L185 300 L115 300Z" fill="${skin}"/><path d="M113 289 Q150 301 187 289 L184 307 Q150 318 116 307Z" fill="#c83243"/><path d="M105 285 Q91 282 87 300 L93 332 L108 329 L115 300Z M195 285 Q209 282 213 300 L207 332 L192 329 L185 300Z" fill="${skin}"/>`;
  for(let i=0;i<6;i++) body+=`<circle cx="${106+i*17.5}" cy="300" r="9" fill="#ef7180"/>`;
 } else {
  body=`<path d="M113 276 Q150 264 187 276 L194 333 L106 333Z" fill="${o.top||'#eee8df'}" stroke="#c9bcb2" stroke-width="2"/><path d="M106 329 L194 329 L204 357 Q150 370 96 357Z" fill="${o.skirt||'#ded4c8'}" stroke="#c9bcb2" stroke-width="2"/>`;
  body+=`<path d="M116 275 L137 275 L132 357 L108 357Z" fill="#f6eee6" stroke="#d8c9bd" stroke-width="2"/><path d="M184 275 L163 275 L168 357 L192 357Z" fill="#f6eee6" stroke="#d8c9bd" stroke-width="2"/>`;
  body+=`<path d="M108 285 Q92 281 87 299 L93 335 L108 332 L116 300Z M192 285 Q208 281 213 299 L207 335 L192 332 L184 300Z" fill="#f3eae2" stroke="#d8c9bd" stroke-width="2"/>`;
  body+=`<path d="M139 280 L161 280 L157 329 L143 329Z" fill="${o.top||'#d9cfc2'}" opacity=".8"/>`;
 }
 const glasses=o.glasses?`<g fill="${o.glasses.lens||'#f7dce5'}" fill-opacity=".23" stroke="${o.glasses.c||'#80504b'}" stroke-width="${o.glasses.w||5}"><circle cx="108" cy="177" r="36"/><circle cx="192" cy="177" r="36"/><path d="M144 175 Q150 169 156 175" fill="none"/></g><path d="M72 169 L53 164 M228 169 L247 164" stroke="${o.glasses.c||'#80504b'}" stroke-width="${o.glasses.w||5}" stroke-linecap="round"/>`:'';
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420"><defs>
 <linearGradient id="hg" x1="0" y1="0" x2=".2" y2="1"><stop offset="0" stop-color="${o.h1}"/><stop offset=".55" stop-color="${o.h1m}"/><stop offset="1" stop-color="${o.h2}"/></linearGradient>
 <radialGradient id="face" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#ffdfce"/><stop offset="1" stop-color="${skin}"/></radialGradient>
 <radialGradient id="blush"><stop offset="0" stop-color="#ef8b9d" stop-opacity=".65"/><stop offset="1" stop-color="#ef8b9d" stop-opacity="0"/></radialGradient>
 </defs>
 ${hair}
 <ellipse cx="150" cy="166" rx="105" ry="116" fill="url(#face)" stroke="#d99f8e" stroke-width="2"/>
 <ellipse cx="47" cy="184" rx="13" ry="19" fill="${skin}"/><ellipse cx="253" cy="184" rx="13" ry="19" fill="${skin}"/>
 <ellipse cx="78" cy="218" rx="32" ry="19" fill="url(#blush)"/><ellipse cx="222" cy="218" rx="32" ry="19" fill="url(#blush)"/>
 ${eye(108)}${eye(192)}
 <ellipse cx="150" cy="220" rx="4" ry="3" fill="#d58f83"/><path d="M143 238 Q150 244 157 238" fill="none" stroke="#b86b70" stroke-width="2.5" stroke-linecap="round"/>
 ${bangs}
 <path d="M42 210 Q28 258 42 300 M57 230 Q48 280 60 316 M258 210 Q272 258 258 300 M243 230 Q252 280 240 316" fill="none" stroke="${o.hl}" stroke-width="5" opacity=".32" stroke-linecap="round"/>
 ${legs}${body}
 ${glasses}
 <path d="M145 42 Q150 35 155 42" stroke="${o.hl}" stroke-width="4" opacity=".35" fill="none" stroke-linecap="round"/>
 </svg>`;
}
function loadTex(svg,w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=4;const im=new Image();im.onload=()=>{c.getContext('2d').drawImage(im,0,0,w,h);t.needsUpdate=true};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);return t}
function sprite(o,H,x,y,z){const W=H*300/420,g=new T.Group(),geo=new T.PlaneGeometry(W,H);geo.translate(0,H/2,0);
 const sp=new T.Mesh(geo,new T.MeshBasicMaterial({map:loadTex(svgOf(o),600,840),transparent:true,alphaTest:.04,side:T.DoubleSide}));g.add(sp);
 const sh=new T.Mesh(new T.CircleGeometry(W*.3,20),new T.MeshBasicMaterial({color:'#2a1015',transparent:true,opacity:.22}));sh.rotation.x=-Math.PI/2;sh.position.y=.02;g.add(sh);
 g.position.set(x,y,z);S.add(g);return{g,sp,W,H}}
// Cherish (cashier): long wavy dark-brown hair, red off-shoulder ruffle dress
const cd=sprite({h1:'#3b2219',h1m:'#4f2f23',h2:'#6a4333',hl:'#8b5a46',outfit:'red'},2.45,4.1,0,-2.2);
// Rei (guide): ombré hair, rose glasses, cream cardigan over leopard print
const gd=sprite({h1:'#34201a',h1m:'#6a3a22',h2:'#c9692c',hl:'#e59a5a',outfit:'cardi',top:'url(#leo)',skirt:'url(#leo)',shoe:'#e8d9c8',noArm:1,glasses:{c:'#e9a99e',w:3,lens:'#ff9fb8'}},2.45,0,0,7.3);
// Tyli (barista): blonde waves, burgundy glasses, cream cardigan over a dark lace top
const bd=sprite({h1:'#d8b258',h1m:'#e5c874',h2:'#ecd89a',hl:'#fff3c4',outfit:'cardi',top:'url(#lace)',skirt:'#2d2527',shoe:'#3a2f31',glasses:{c:'#6a2431',w:5,lens:'#ffffff'}},2.55,-3.5,.55,-4.3);
// Rei's waving arm (separate so she can wave at the door)
const armW=new T.Group(),armGeo=new T.PlaneGeometry(.3,.72);armGeo.translate(0,-.36,0);
armW.add(new T.Mesh(armGeo,new T.MeshBasicMaterial({map:loadTex('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 120"><rect x="8" y="2" width="34" height="86" rx="17" fill="#f3eee7" stroke="#d9cfc2" stroke-width="2"/><circle cx="25" cy="100" r="15" fill="#f0c6ad"/></svg>',100,240),transparent:true,alphaTest:.04,side:T.DoubleSide})));
armW.position.set((92-150)/300*gd.W,gd.H*(1-282/420),.03);gd.g.add(armW);
const guide=gd.g,barista=bd.g,cashier=cd.g,CH=[gd,bd,cd];
const PEOPLE={guide:{n:'Rei',g:guide,h:2.7},barista:{n:'Tyli',g:barista,h:2.8,i:0,l:['Hi! I’m Tyli. I’m the one behind the espresso machine, making your drinks slow and pretty.','Tip: ask for the brown sugar latte. Warm, sweet, and a little dreamy.','Take your time. The best sips are the ones you don’t rush.']},cashier:{n:'Cherish',g:cashier,h:2.7,i:0,l:['Hi hi! I’m Cherish! Order at the kiosk and I’ll make sure it’s ready when we call your name!','Everything’s in pesos and nothing’s secret. Pay at the counter when you’re done!','Psst… the cinnamon snail sells out by noon. Just saying!']}};
let spk=PEOPLE.guide;

// free-roam camera
const V=(x,y,z)=>new T.Vector3(x,y,z);
const P={x:0,z:17,y:1.7,yaw:0,pitch:.06},kv={p:V(2.6,1.62,.35),l:V(2.6,1.6,-2.6)};
const GIN=V(-.6,0,1),GOUT=V(0,0,7.4),GK=V(1.2,0,-1.2);
let stageName='intro',greeted=false;const look=V(0,1.7,16);cam.position.set(P.x,P.y,P.z);
const $=id=>document.getElementById(id),peso=n=>'₱'+n.toLocaleString('en-PH');
const kioskEl=$('kiosk'),bub=$('bubble'),jEl=$('joy'),knob=jEl.firstElementChild;
const rect=(x,z,a,b,c,d)=>x>a&&x<b&&z>c&&z<d;
const TREES=[[-8.5,8],[9.5,7],[-12,0],[12.5,-1],[-14,10],[15,10],[-4,-11],[5,-14],[-18,-8]],PATIO=[[6.5,11.5],[-6.5,12.5]];
function blk(x,z){
 if(x<-30||x>30||z<-18||z>26)return true;
 for(const t of TREES)if(Math.hypot(x-t[0],z-t[1])<.9)return true;
 for(const t of PATIO)if(Math.hypot(x-t[0],z-t[1])<.95)return true;
 if(rect(x,z,2.9,4.6,9.3,10))return true;
 const inner=rect(x,z,-5.6,5.6,-4.6,5.7),door=rect(x,z,-.95,.95,5.5,6.6);
 if(rect(x,z,-6.4,6.4,-5.4,6.6)&&!inner&&!door)return true;
 if(rect(x,z,2.3,12,6.9,8.1)||rect(x,z,-12,-2.3,6.9,8.1))return true;
 if(inner){
  if(rect(x,z,-4.5,1.7,-3.95,-2.7)||rect(x,z,2.1,3.4,-3,-2.2)||Math.hypot(x-4.1,z+2.2)<.6||Math.hypot(x+3.5,z+4.3)<.7)return true;
  if(rect(x,z,4.75,6,-1,3.7)||rect(x,z,3.75,4.9,-.4,3.2)||rect(x,z,-6,-5.2,-2.7,.3))return true;
  if(Math.hypot(x+3.4,z-1.4)<.95||Math.hypot(x-1.2,z-2.7)<.95||rect(x,z,-5.3,-4.2,.9,1.9)||rect(x,z,-2.6,-1.5,.9,1.9)||rect(x,z,-.25,.6,2.3,3.1)||rect(x,z,1.8,2.7,2.3,3.1))return true}
 return false}
const inside=()=>P.x>-5.6&&P.x<5.6&&P.z>-4.6&&P.z<5.7;
function go(s){stageName=s;document.body.dataset.stage=s;if(s==='kiosk'){hide();setTimeout(()=>{if(stageName==='kiosk')kioskEl.classList.add('on')},1100)}else kioskEl.classList.remove('on')}
const wake=()=>{if(stageName==='intro')go('explore')};
const keys={};
addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=true;if('wasdqe'.includes(k)&&k.length===1||k.startsWith('arrow'))wake();if(e.key==='Escape'&&stageName==='kiosk')go('explore');if(e.key.startsWith('Arrow'))e.preventDefault()});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false});
document.querySelectorAll('#pad button,#turn button').forEach(b=>{const k=b.dataset.k;b.addEventListener('pointerdown',e=>{e.preventDefault();keys[k]=true;wake()});['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>{keys[k]=false}))});
const joy={x:0,y:0};let joyId=null,joyC=null,drag=null;
const cvs=R.domElement;cvs.style.touchAction='none';cvs.tabIndex=0;
cvs.addEventListener('pointerdown',e=>{try{window.focus();cvs.focus({preventScroll:true})}catch(_){}cvs.setPointerCapture(e.pointerId);
 if(e.pointerType==='touch'&&e.clientX<innerWidth*.4&&e.clientY>innerHeight*.45&&stageName!=='kiosk'){wake();joyId=e.pointerId;joyC={x:e.clientX,y:e.clientY};jEl.style.display='block';jEl.style.left=(e.clientX-45)+'px';jEl.style.top=(e.clientY-45)+'px'}
 else drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:0}});
cvs.addEventListener('pointermove',e=>{
 if(e.pointerId===joyId){const dx=e.clientX-joyC.x,dy=e.clientY-joyC.y,l=Math.hypot(dx,dy)||1,k=Math.min(l,45)/45;joy.x=dx/l*k;joy.y=dy/l*k;knob.style.transform='translate('+(joy.x*30)+'px,'+(joy.y*30)+'px)'}
 else if(drag&&e.pointerId===drag.id){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.moved+=Math.abs(dx)+Math.abs(dy);drag.x=e.clientX;drag.y=e.clientY;if(stageName!=='kiosk'){if(drag.moved>8)wake();P.yaw+=dx*.005;P.pitch=Math.max(-.6,Math.min(.6,P.pitch-dy*.004))}}});
cvs.addEventListener('pointerup',e=>{if(e.pointerId===joyId){joyId=null;joy.x=joy.y=0;jEl.style.display='none'}else if(drag&&e.pointerId===drag.id){if(drag.moved<8)tap(e);drag=null}});
function stepMove(d){const dx=Math.sin(P.yaw)*d,dz=-Math.cos(P.yaw)*d;if(!blk(P.x+dx,P.z))P.x+=dx;if(!blk(P.x,P.z+dz))P.z+=dz}
cvs.addEventListener('wheel',e=>{e.preventDefault();if(stageName==='kiosk')return;wake();stepMove(-Math.sign(e.deltaY)*.7)},{passive:false});
$('enter').onclick=()=>go('explore');$('toKiosk').onclick=()=>go('kiosk');$('back').onclick=()=>go('explore');
const SPOTS=[['Outside',0,16,0,6],['Entrance',0,5.2,0,-3],['Lounge',-2,4,-3.4,1.4],['Counter',-1.5,-1.4,-1.5,-4],['Booth',2.6,.8,5.2,1.4],['Behind the counter',-.5,-4.2,-.5,1],['Patio',3,13,6.5,11.5],['Garden',-7,14,-8.5,8]];
SPOTS.forEach(sp=>{const b=document.createElement('button');b.className='chip';b.textContent=sp[0];b.onclick=()=>{go('explore');P.x=sp[1];P.z=sp[2];P.yaw=Math.atan2(sp[3]-sp[1],-(sp[4]-sp[2]));P.pitch=0};$('travel').appendChild(b)});
const ray=new T.Raycaster(),pt=new T.Vector2();
function tap(e){if(stageName==='kiosk')return;pt.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);ray.setFromCamera(pt,cam);
 if(ray.intersectObject(kScreen).length){go('kiosk');return}
 for(const k of ['barista','cashier','guide']){if(ray.intersectObject(PEOPLE[k].g,true).length){if(k==='guide')say(spk===PEOPLE.guide&&bub.classList.contains('on')?'pick':'greet');else say(k);break}}}
function move(dt){if(stageName==='kiosk')return;let f=0,r=0;
 if(keys.w||keys.arrowup)f+=1;if(keys.s||keys.arrowdown)f-=1;if(keys.d)r+=1;if(keys.a)r-=1;
 if(keys.arrowleft||keys.q)P.yaw-=1.8*dt;if(keys.arrowright||keys.e)P.yaw+=1.8*dt;
 f-=joy.y;r+=joy.x;const sp=(keys.shift?6:3.2)*dt;
 const dx=(Math.sin(P.yaw)*f+Math.cos(P.yaw)*r)*sp,dz=(-Math.cos(P.yaw)*f+Math.sin(P.yaw)*r)*sp;
 if(!blk(P.x+dx,P.z))P.x+=dx;if(!blk(P.x,P.z+dz))P.z+=dz}

// guide dialogue
const MENU=[
 {c:'Coffee',i:'☕',n:'Slow Drip',d:'Hand-poured, soft and round.',p:95},{c:'Coffee',i:'🥛',n:'Oat Milk Latte',d:'Silky oat milk, double shot.',p:135},
 {c:'Coffee',i:'🤎',n:'Brown Sugar Latte',d:'Muscovado syrup and a pinch of cinnamon.',p:150},{c:'Coffee',i:'🫖',n:'Cortado',d:'Equal parts espresso and warm milk.',p:120},
 {c:'Tea & more',i:'🍵',n:'Ceremonial Matcha',d:'Whisked to order, lightly sweet.',p:160},{c:'Tea & more',i:'🌰',n:'Hojicha Latte',d:'Roasted green tea, toasty and mellow.',p:145},
 {c:'Tea & more',i:'🍫',n:'Hot Cocoa',d:'Dark chocolate with a marshmallow cloud.',p:130},{c:'Tea & more',i:'🍋',n:'Iced Calamansi Tea',d:'Bright, cold, and a little sweet.',p:110},
 {c:'Bites',i:'🥐',n:'Butter Croissant',d:'Baked every morning.',p:110},{c:'Bites',i:'🌀',n:'Cinnamon Snail',d:'Warm roll with cream cheese glaze.',p:125},
 {c:'Bites',i:'🍓',n:'Strawberry Shortcake',d:'Soft sponge, fresh cream, one slice.',p:175},{c:'Bites',i:'🥪',n:'Egg Sando',d:'Fluffy egg salad on milk bread.',p:150}];
const cart={};let last=-1;
function say(k){let t,c;
 if(k==='barista'||k==='cashier'){const p=PEOPLE[k];spk=p;$('nm').textContent=p.n;t=p.l[p.i++%p.l.length];c=[['Tell me more',k],['Take me to the kiosk','kiosk']]}
 else if(k==='greet'){spk=PEOPLE.guide;$('nm').textContent='Rei';t='Hello, lovely! Welcome to Déjà Brew! I’m Rei. Wander wherever you like, outside or in.';c=[['What’s good today?','pick'],['Tell me about this place','about'],['Take me to the kiosk','kiosk']]}
 else if(k==='about'){t='We’re a small café for slow mornings and second helpings. Everything is made to order, so settle into a pink armchair or the booth and take your time.';c=[['What’s good today?','pick'],['Take me to the kiosk','kiosk']]}
 else{let i;do{i=Math.floor(Math.random()*MENU.length)}while(i===last);last=i;const m=MENU[i];t='Try the '+m.n+' ('+peso(m.p)+'). '+m.d+' Shall I add it to your tray?';c=[['Add it and open the kiosk','add'],['Another idea','pick'],['Take me to the kiosk','kiosk']]}
 $('say').textContent=t;const ch=$('chips');ch.innerHTML='';c.forEach(([l,a])=>{const b=document.createElement('button');b.className='chip';b.textContent=l;b.onclick=e=>{e.stopPropagation();if(a==='kiosk'){go('kiosk')}else if(a==='add'){cart[last]=(cart[last]||0)+1;lines();go('kiosk')}else say(a)};ch.appendChild(b)});bub.classList.add('on')}
function hide(){bub.classList.remove('on')}

function resize(){const w=innerWidth,h=innerHeight;R.setSize(w,h);cam.aspect=w/h;cam.fov=w/h<.8?70:60;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();

let prev=performance.now()/1000;const tgt=new T.Vector3(),ahead=new T.Vector3(),hv=new T.Vector3();
function tick(){requestAnimationFrame(tick);const t=performance.now()/1000,dt=Math.min(t-prev,.05);prev=t;
 const moving=stageName!=='kiosk'&&(keys.w||keys.s||keys.a||keys.d||keys.arrowup||keys.arrowdown||Math.hypot(joy.x,joy.y)>.1);
 move(dt);if(stageName==='intro'){P.yaw=Math.sin(t*.25)*.07;P.pitch=.06}
 if(stageName==='kiosk'){cam.position.lerp(kv.p,.05);look.lerp(kv.l,.06);cam.lookAt(look)}
 else{tgt.set(P.x,P.y+(moving?Math.sin(t*9)*.025:Math.sin(t*.8)*.01),P.z);cam.position.lerp(tgt,.3);
  ahead.set(Math.sin(P.yaw)*Math.cos(P.pitch),Math.sin(P.pitch),-Math.cos(P.yaw)*Math.cos(P.pitch)).add(cam.position);look.lerp(ahead,.35);cam.lookAt(look)}
 const ins=inside(),gt=stageName==='kiosk'?GK:(ins?GIN:GOUT);
 const d=guide.position.distanceTo(gt);guide.position.lerp(gt,.03);
 [guide,barista,cashier].forEach(c=>{let a=Math.atan2(cam.position.x-c.position.x,cam.position.z-c.position.z)-c.rotation.y;a=Math.atan2(Math.sin(a),Math.cos(a));c.rotation.y+=a*.06});
 guide.position.y=d>.15?Math.abs(Math.sin(t*9))*.06:Math.sin(t*2)*.01;
 const near=guide.position.distanceTo(cam.position);
 const waving=stageName==='intro'||(!ins&&near<14&&stageName==='explore')||(stageName==='explore'&&bub.classList.contains('on')&&spk===PEOPLE.guide&&Math.sin(t*.5)>.6);
 armW.rotation.z=waving?-2.6+Math.sin(t*8)*.3:-.08+Math.sin(t*1.5)*.04;
 CH.forEach((c,i)=>{c.sp.rotation.z=Math.sin(t*1.3+i*2)*.025;c.sp.scale.y=1+Math.sin(t*2+i)*.01});
 barista.position.y=.55+Math.abs(Math.sin(t*1.8))*.012;cashier.position.y=Math.abs(Math.sin(t*1.8+1))*.012;
 if(!greeted&&stageName==='explore'&&ins&&near<9){greeted=true;say('greet')}
 if(bub.classList.contains('on')){if(stageName==='kiosk'||spk.g.position.distanceTo(cam.position)>13)hide();else{hv.set(0,spk.h||2.7,0);spk.g.localToWorld(hv);hv.project(cam);
  bub.style.visibility=hv.z>1?'hidden':'visible';
  const x=Math.min(Math.max((hv.x*.5+.5)*innerWidth,bub.offsetWidth/2+8),innerWidth-bub.offsetWidth/2-8),y=Math.max((-hv.y*.5+.5)*innerHeight,bub.offsetHeight+60);
  bub.style.transform='translate('+(x-bub.offsetWidth/2)+'px,'+(y-bub.offsetHeight)+'px)'}}
 clouds.forEach(c=>{c.position.x+=.004;if(c.position.x>45)c.position.x=-45});
 steams.forEach(s=>{const u=(t*.25+s.userData.o)%1;s.position.set(s.userData.x+Math.sin(u*6+s.userData.o*9)*.05,1.42+u*.7,-3.3);const k=.12+u*.35;s.scale.set(k,k,1);s.material.opacity=(1-u)*.55});
 lant.forEach((l,i)=>{const f=.95+Math.sin(t*2+i*2)*.05;l.scale.set(.24*f,.29*f,.24*f);if(l.userData.light)l.userData.light.intensity=.85*f});
 hangs.forEach((h,i)=>{h.rotation.z=Math.sin(t*.7+i)*.03});
 cat.scale.y=1+Math.sin(t*1.6)*.03;tail.rotation.z=Math.sin(t*1.2)*.4;
 soots.forEach(s=>{const u=s.userData;u.t+=.016*u.v;s.position.set(u.x+Math.sin(u.t*.8)*1.1,1.28+.12+Math.abs(Math.sin(t*2.2*u.v+u.ph*1.7))*.22,-3.4);s.rotation.y=Math.sin(u.t)*.6});
 const pp=mg.attributes.position;for(let i=0;i<N;i++){pp.array[i*3+1]+=.0018;pp.array[i*3]+=Math.sin(t+i)*.0008;if(pp.array[i*3+1]>4.6)pp.array[i*3+1]=0}pp.needsUpdate=true;
 R.render(S,cam)}
tick();

// kiosk menu
const cats=[...new Set(MENU.map(m=>m.c))];let cat0=cats[0];
function tabs(){const el=$('tabs');el.innerHTML='';cats.forEach(c=>{const b=document.createElement('button');b.className='tab';b.role='tab';b.textContent=c;b.setAttribute('aria-selected',c===cat0);b.onclick=()=>{cat0=c;tabs();menu()};el.appendChild(b)})}
function menu(){const el=$('menu');el.innerHTML='';MENU.map((m,i)=>[m,i]).filter(x=>x[0].c===cat0).forEach(([m,i])=>{const b=document.createElement('button');b.className='item';b.innerHTML='<div class="ic">'+m.i+'</div><b>'+m.n+'</b><small>'+m.d+'</small><span class="pr">'+peso(m.p)+'</span>';b.onclick=()=>{cart[i]=(cart[i]||0)+1;lines()};el.appendChild(b)})}
function lines(){const ul=$('lines');ul.innerHTML='';let tot=0,cnt=0;const ks=Object.keys(cart);
 if(!ks.length)ul.innerHTML='<li class="empty" style="display:block">Your tray is empty. Tap something on the menu to add it.</li>';
 ks.forEach(k=>{const m=MENU[k],q=cart[k];tot+=m.p*q;cnt+=q;const li=document.createElement('li');li.innerHTML='<span class="n">'+m.n+'</span>';
  const mk=(s,f)=>{const b=document.createElement('button');b.className='q';b.textContent=s;b.setAttribute('aria-label',(s==='+'?'Add one ':'Remove one ')+m.n);b.onclick=f;return b};
  li.appendChild(mk('−',()=>{cart[k]--;if(!cart[k])delete cart[k];lines()}));const qs=document.createElement('b');qs.textContent=q;li.appendChild(qs);li.appendChild(mk('+',()=>{cart[k]++;lines()}));ul.appendChild(li)});
 $('total').textContent=peso(tot);$('place').disabled=!cnt}
$('place').onclick=()=>{const n=$('name').value.trim();$('num').textContent='#'+(100+Math.floor(Math.random()*900));
 $('doneMsg').textContent=(n?'Thanks, '+n+'. ':'Thank you. ')+'We’ll call your name when it’s ready. You can pay at the counter.';
 $('screen').classList.add('ordered');$('done').classList.add('on')};
$('again').onclick=()=>{for(const k in cart)delete cart[k];$('name').value='';$('screen').classList.remove('ordered');$('done').classList.remove('on');lines()};
addEventListener('keydown',e=>{if(e.key==='Escape'&&stageName==='kiosk')go('inside')});
tabs();menu();lines();
})();
