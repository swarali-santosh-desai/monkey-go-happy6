var monkey , monkeyrunning
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkeyrunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(500,500);
  
  PLAY = 1;
  gameState = "PLAY";
  END = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkeyrunning);
  monkey.scale = 0.1;
  
  ground = createSprite(250,350,600,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
 
  
  
}

function draw() {
  background("green");
  
  if(ground.x < 0){
    ground.x = ground.width /2;   
     }
  

  
  if(keyDown("space")){
    monkey.velocityY = -20; 
     }
  
  survivalTime = Math.ceil(frameCount/frameRate());
  ground.velocityX = -(5 + 2 * score/100);
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 1;
  }
  
  Food();
  Obstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = "END";
  }

  
  if(gameState === "END"){
    ground.velocityX = 0;

    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    monkey.velocityX = 0;
    
  }
  
  
  monkey.velocityY = monkey.velocityY + 0.9;
  
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("red");
  text("score:"+ score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("survival Time:"+ survivalTime,100,50);
  drawSprites();

}

function Food(){
  if(frameCount % 80 ===0){
    var banana = createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -(5+2 * score /100)
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    foodGroup.add(banana);
    banana.lifetime = 100;
  }
  
}

function Obstacle(){
  if(frameCount % 300 ===0){
    obstacle = createSprite(600,320,10,40);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -(5+2 * score /100)
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 100;
  }
  
  
}






