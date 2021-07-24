const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon, cannonBall;
var balls = []
var boats = []



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  

  Engine.update(engine);
  ground.display();
  
for(var i = 0; i < balls.length; i++) {
  showcannonball(balls[i],i);
}
  
   
showboat();
    cannon.display();
  tower.display();
  
 
}

function keyPressed(){
  if (keyCode === DOWN_ARROW){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall)
  }
}
function showcannonball(ball,index){
  ball.display()
  if(ball.body.position.x>=width||ball.body.position.y>=height){
Matter.World.remove(world,ball.body)
balls.splice(index, 1);
}
  }


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cannonBall.shoot()
  }
}

function showboat(){
  if(boats.length>0){
    if(boats.length<4&&boats[boats.length-1].body.position.x<width-300){
  var positions=[-130,-100,120,80]
  var position= random(positions)
  Boat1 = new Boat(1000,450,200,200,position)
boats.push(Boat1)
    }
for(var i=0;i<boats.length;i++){
  Matter.Body.setVelocity(boats[i].body,{x:-0.3,y:0});
  boats[i].display();
}
 // Boat.display();
  }
  else{
    var Boat1 = new Boat(width, height - 100, 200, 200, -100);
    boats.push(Boat1);
  }
console.log("showboat")

}
