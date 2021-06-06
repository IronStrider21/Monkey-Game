var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var invisibleGround;

var survivalTime;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided=loadAnimation("sprite_7.png","sprite_1.png");
 
}



function setup() {
  createCanvas(600,355);

  
  bananaGroup= createGroup();
  obstacleGroup= createGroup();
  
  monkey=createSprite(80,315,20,20)
   monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  //ground.velocityX=-4;
  //ground.x=ground.width/2;
  //console.log(ground.x)
  
  invisibleGround=createSprite(400,350,900,10);
  invisibleGround.visible=false;

survivalTime=0;
  
}

function draw() {
  background("white")
   
  stroke("white");
     textSize(20);
    fill("white");
    
    
     stroke("black");
    textSize(20);
  text("Survival Time: "+survivalTime,100,50);
  
  if (gameState==1){
    
    
    food();
obstacles();
    

  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -20;
     
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
  
   if (monkey.isTouching(bananaGroup)){
    bananaGroup[0].destroy();
      }
    
   
   
  survivalTime=Math.ceil(frameCount/frameRate());
  
    
     }
  
  if (monkey.isTouching(obstacleGroup)){
    gameState=0;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.visible=false;
    bananaGroup.visible=false;
     obstacleGroup.visible=false;
  }
  
  drawSprites();
}


function food(){
  if (World.frameCount%80===0){
  banana=createSprite(400,200,20,20);
     
    banana.y=Math.round(random(120,200));
    
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    banana.velocityX=-(8);
    banana.setLifetime=100;
    bananaGroup.add(banana);

  }
}

function obstacles(){
  if (World.frameCount%300===0){
  obstacle=createSprite(600,325,10,10);
    obstacle.scale=0.1;
    
     
    obstacle.addImage(obstacleImage);
    
    obstacle.velocityX=-(8);
    obstacle.setLifetime=100;
    obstacleGroup.add(obstacle);

  }
}

