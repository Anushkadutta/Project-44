var ball,bubbleImg,trapImg
var start ,startImg , ground
//game states
var SERVE = 2;
var PLAY = 1;
var END  = 0;
var gamestate = SERVE;
var score = 0  

function preload(){
startImg = loadImage("restart.jpg")
birdImg = loadImage("bird.png")
cloudImg = loadImage("Angrycld.png")
meimg = loadImage("me.png")
grM = loadImage("bgg.jpg")
}

function setup(){

    createCanvas(700,700);
    ground = createSprite(200,380,700,700);
    ground.scale =4
    ground.addImage(grM);
    ground.x = ground.width /2;


    ball = createSprite(50,500,10,10);
    ball.debug=true;
    ball.setCollider("circle",0,0,100);

    ball.shapeColor = "black";
    ball.addImage(meimg)
   
    ball.velocityY = 1

    invisible = createSprite(450,690,900 ,10)
    invisible.visible = false
    invisible2 = createSprite(460,10,900 ,10)
    invisible2.visible = false
    invisible3 = createSprite(460,15,900 ,10)
    invisible3.visible = false

    start = createSprite(350,350,100,100);
    start.shapeColor = "blue";
    start.addImage(startImg)

    bir = new Group();
    clt = new Group();
    plu = new Group();

    
   
}

function draw(){
  background("white");

  console.log(gamestate)

  if (gamestate === SERVE){

    stroke("black")
    textSize(30)
    fill("black")
    text ("How to Play !! ",200,60) 

    stroke("black")
    textSize(30)
    fill("black")
    text ("Try to pass the cloud by not touching the" , 40,120)
    text ("birds and clouds. ",40,160)

    text ("Press the letter [a] to control the  ",40,210)
    text(" cloud.",40,250)

    text("If the game Ends then click on the restart lable.  ",40,300)
    text("which appears on the screen.",40,340) 

    fill("red")
    text("___________________________________________________",40,400)
    fill("black")
    text( "Try to score 2000 points",200,450 )
    fill("red")
    text("___________________________________________________",40,500)
    fill("black")
    text ("Click space to continue",200,550)
     
    start.visible = false; 
    ball.visible = false; 
    ground.visible = false; 

    if (keyDown("space")){
        gamestate = PLAY}

  }

  else if (gamestate === PLAY){
    bird();
    clo();

     //move the ground
    ground.velocityX = -6 ;
    //plus();
    ground.visible = true; 
   
    start.visible = false; 
    ball.visible = true

    if (keyDown("a"))
    {ball.velocityY = ball.velocityY - 0.5;}
    
    ball.velocityY = ball.velocityY + 0.08;

    ball.scale = 0.15 

    ball.collide(invisible3)
    clt.collide(bir)

    score += 0.5

    if (ground.x < 200){
        ground.x = ground.width/2;}
      

    if(ball.isTouching(invisible)){
        gamestate = END }
    
    if(ball.isTouching(bir)){
        gamestate = END  }
    
    if(ball.isTouching(clt)){
       gamestate = END  }
    

 
} else if (gamestate === END){
    bir.destroyEach(0);
    clt.destroyEach(0);
    plu.destroyEach(0);
    start.visible = true
    ground.velocityX=0
    ground.velocityY=0
    ground.visible = false; 
 
    if (mousePressedOver(start))
    {starte();}
}


  drawSprites();

  fill("black")
  textSize(34)
  text("you have scored "+score ,200,650)
  
}

function bird(){
    if(World.frameCount % 100 === 0 ){
        var br  = createSprite (500,343,20,20,20);
        br.velocityX = -7;
       br.velocityY = random(1,-2,-1,-2)
        br.addImage(birdImg)
       // cl.scale = 0.15;  
        br.y= random(0,700);
       br.x= 900
       br.setLifetime= 100;
       bir.add(br);}
}


function clo(){
    if(World.frameCount % 100 === 0 ){
      var cl  = createSprite (500,343,20,20,20);
      cl.velocityX = -7;
      cl.velocityY = random(1,-2,-1,-2)
      cl.addImage(cloudImg)
     // cl.scale = 0.15;  
      cl.y= random(0,700);
      cl.x= 900
      cl.setLifetime= 100;
      clt.add(cl);}}


function plus(){
    if (frameCount % 500 === 0){
        pl= createSprite(200,00,50,50)
        pl.shapeColor = "green"
        pl.velocityY = -2
        pl.velocityX = random(1,2,-1,-2)
        pl.y= 0//random(0,700);
        plu.add(pl)
    }
}

function starte()
 {
    gamestate=PLAY;
    plu.destroyEach();
    bir.destroyEach();
    clt.destroyEach();
    start.visible = false;
    score=0;
    ball.x = 50
    ball.y = 50
    ball.scale = 1
 }
  
