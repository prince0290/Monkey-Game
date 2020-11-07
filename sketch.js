//declaring sprites and their Image
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var background1,backgroundImg;
var invisibleGround;

//creating GameStates
var gameState="play";
var play=1;
var end=0;
var score=0;


function preload(){
  //loading Images 
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundImg = loadImage("monkey_road.jpg")
}



function setup() {
  createCanvas(600,400);
  
  //creating different sprites
  background1=createSprite(0,200);
  background1.addImage("background",backgroundImg);
  background1.velocityX=-5;
  
  monkey=createSprite(150,320);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
 
  invisibleGround=createSprite(0,345,100000000,10)
  invisibleGround.visible=false; 
  
  //creating New Groups
  obstacleGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
background(0);   
  
  if (gameState==="play"){
    
    //score
    textSize(15);
    text("Score: "+ score, 300,50); 
    
    //making the monkey jump when space key is pressed
    if(keyDown("space") && monkey.y>295){
    monkey.velocityY=-12;    
    }
  
    //giving gravity to monkey
    monkey.velocityY=monkey.velocityY+0.8; 
    
    //spawning obstacles and banana on the ground
    spawnObstacles();
    spawnBanana();
    
    //destroying monkey and stopping background , obstacles and banana
    if(monkey.collide(obstacleGroup)){ 
    obstacle.velocityX = 0;
    monkey.destroy();
    background1.velocityX=0;
    bananaGroup.destroyEach();
    gameState=end;  
    }
  }
  
  if(gameState==="end"){
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  
  //resetting the ground
  if (background1.x < 188 ){
    background1.x=background1.width/2;
  }
  
  //making monkey collide with ground
  monkey.collide(invisibleGround);
  
  monkey.setCollider("rectangle",0,0,350,350);
  monkey.debug=false;
  
  drawSprites();
  
  //score
  stroke("white");
  fill(0);
  score = score + Math.round(getFrameRate()/60.5);
  text("Survival Time :" + score , 250,70)
  
  console.log("Monkey Go Happy"); 
  
}

function spawnObstacles(){
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600,500)
    obstacle.y = 340 ;
    obstacle.y=Math.round(random(340,335))
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
    obstacle.lifetime=150;
    
  }
}

function spawnBanana(){
  if (frameCount % 80 ===0){
    banana = createSprite(500,300);
    banana.addImage("banana",bananaImage);
    banana.y =Math.round(random(240,300));
    banana.scale=0.1 ;
    banana.velocityX=-5;
    bananaGroup.add(banana);
    banana.lifetime=65;
  }
}
