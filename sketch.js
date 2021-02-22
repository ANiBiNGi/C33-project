const Engine = Matter.Engine;
const World = Matter.World;
const Constraint = Matter.Constraint;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var particle;
var turn = 0;

var divisions = [];
var particles = [];
var plinkos = [];

var gameState = 1;
var score = 0;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Division(k, height-300/2, 10, 300));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }   
}

function draw() {
  background("black");
  textSize(35)
  text("Score : "+score,10,40);
  text("500",10,650);
  text("500",90,650);
  text("500",170,650);
  text("500",250,650);
  text("100",330,650);
  text("100",410,650);
  text("100",490,650);
  text("200",570,650);
  text("200",650,650);
  text("200",730,650);
  
  Engine.update(engine);

  if(gameState === 1){
    textSize(20)
    text("You only get 5 turns!!!",600,40);
  }

  if(gameState === 0){
    textSize(70)   
    text("GAME OVER",150,250);
  }
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

    if(particle!=null){

      particle.display();

        if(particle.body.position.y > 760){

          if(particle.body.position.x < 300){
            score=score+500;
            particle=null;
            turn++;
         }
      }
   }

   if(particle!=null){

    particle.display();

      if(particle.body.position.y > 760){

        if(particle.body.position.x > 301){
          
          if(particle.body.position.x < 600){
            score=score+100;
            particle=null;
            turn++;
          }
       }
    }
 }

 if(particle!=null){

      particle.display();

        if(particle.body.position.y > 760){

          if(particle.body.position.x > 601){

            if(particle.body.position.x < 900){
              score=score+200;
              particle=null;
              turn++;          
            }
         }
      }
   }

   if(turn === 5){
     gameState = 0;
     if(frameCount%60===0){
      particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    }
   }

}

function mousePressed(){
  if(gameState!=="end"){
    particle=new Particle(mouseX, 10, 10, 10)
  }
}