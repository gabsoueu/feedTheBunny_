const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruitImg, backgroundImg, rabbitImg;
var link;
var rabbit;
var scissor;

function preload(){
  backgroundImg = loadImage("assets/background.png");
  fruitImg = loadImage("assets/melon.png");
  rabbitImg = loadImage("assets/Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(200,680,600,20);
  
  rope = new Rope(6,{x:250,y:10});


  var fruit_options = {
    density: 0.001
  }

  fruit = Bodies.circle(300,300,15,fruit_options);
  Matter.Composite.add(rope.body,fruit);

  link = new Link(rope, fruit);

  rabbit = createSprite (250,600,50,50)
  rabbit.addImage (rabbitImg);
  rabbit.scale = 0.3;

  scissor = createImg ("assets/cut_btn.png");
  scissor.position (250,10);
  scissor.size (100,100);
  scissor.mouseClicked (cut);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);

  image(backgroundImg,0,0,500,700);
  
  //ground.show();
  
  Engine.update(engine);
  
  rope.show();

  ellipse(fruit.position.x,fruit.position.y,15);

  drawSprites ();


 
   
}

function cut(){
  
}
