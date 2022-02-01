var path,boy,deadMan ,deadManImg, cash,diamonds,jwellery,sword, zzz;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,end, endImg, zzzImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;


//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyAni = loadAnimation("Runner-1.png","Runner-2.png");
  deadManImg=loadImage("deadMan.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
 endImg = loadImage("gameOver.png");
 zzzImg = loadImage("zzz.png");
}

function setup(){
  
createCanvas(400,600);
// Movendo plano de fundo
path=createSprite(200,200);
path.addImage(pathImg);



//criar menino correndo 
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning", boyAni);
boy.addImage("deadManImg", deadManImg);
boy.scale=0.08;
  
end=createSprite(200, 300, 10, 10);
end.addImage(endImg);
end.scale=0.90;
end.visible=false;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
//GAME STATE PLAY
if(gameState===PLAY){
background(0);
boy.x = World.mouseX;

//Bordas e sua colisão
edges= createEdgeSprites();
boy.collide(edges);
  
//código para redefinir plano de fundo
path.velocityY = 4;
if(path.y > 400 ){
path.y = height/2;
}

//Condição para ganhar pontos
if (cashG.isTouching(boy)) {
cashG.destroyEach();
treasureCollection=treasureCollection+50;
}
else if (diamondsG.isTouching(boy)) {
diamondsG.destroyEach();
treasureCollection=treasureCollection+100;
   
}
else if(jwelleryG.isTouching(boy)) {
jwelleryG.destroyEach();
treasureCollection=treasureCollection+150;

}
else{
if(swordGroup.isTouching(boy)) {
gameState=END;
swordGroup.destroyEach();
jwelleryG.destroyEach();
diamondsG.destroyEach();
cashG.destroyEach();
end.visible=true;
}
}
createCash();
createDiamonds();
createJwellery();
createSword();

}
//GAME STATE END
if (gameState===END){
jwelleryG.velocityY=0;
diamondsG.velocityY=0;
cashG.velocityY=0;
path.velocityY=0;

var manX=boy.x+10
zzz=createSprite(manX, 560, 10, 10);
zzz.addImage('zzzImage', zzzImg);
zzz.scale=0.05

boy.changeImage("deadManImg", deadManImg);
}

drawSprites();
stroke('red');
textSize(20);
fill(255);
text("Tesouro: "+ treasureCollection,250,30);
}
//Funções de criação de objetos
function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.10;
  cash.velocityY = 4;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 6;
  sword.lifetime = 150;
  swordGroup.add(sword);
  sword.setCollider("circle",0,0,60)
  sword.debug=true
  }

}
