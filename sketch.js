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
var rope, rope2, rope3;
var fruit;
var fruitImg, backgroundImg, rabbitImg;
var rabbitBlink, rabbitEat, rabbitSad;
var link, link2, link3;
var rabbit;
var scissor,scissor2,scissor3, mute, balloon;
var airMp3, eatingMp3, ropeCutMp3, sadMp3, sound1Mp3;
var canW, canH;

function preload(){
  backgroundImg = loadImage("assets/background.png");
  fruitImg = loadImage("assets/melon.png");
  rabbitImg = loadImage("assets/Rabbit-01.png");
  rabbitBlink = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png");
  rabbitEat = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
  rabbitSad = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png");
  rabbitBlink.playing = true;
  rabbitBlink.looping = true;
  rabbitEat.playing = true;
  rabbitEat.looping = false;
  rabbitSad.playing = true;
  rabbitSad.looping = false;
  airMp3 = loadSound("assets/air.wav");
  eatingMp3 = loadSound("assets/eating_sound.mp3");
  ropeCutMp3 = loadSound("assets/rope_cut.mp3");
  sadMp3 = loadSound("assets/sad.wav");
  sound1Mp3 = loadSound("assets/sound1.mp3");
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW,canH);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH);
  }
  //createCanvas(500,700);
  sound1Mp3.play ();
  sound1Mp3.setVolume(0.5);

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(200,canH-30,600,20);
  
  rope = new Rope(3,{x:250,y:10});
  rope2 = new Rope(6,{x:100,y:80});
  rope3 = new Rope(6,{x:350,y:5});


  var fruit_options = {
    density: 0.001
  }

  fruit = Bodies.circle(300,300,15,fruit_options);
  Matter.Composite.add(rope.body,fruit);

  link = new Link(rope, fruit);
  link2 = new Link(rope2, fruit);
  link3 = new Link(rope3, fruit);

  rabbitBlink.frameDelay = 25;
  rabbitEat.frameDelay = 25;
  rabbitSad.frameDelay = 25;
  rabbit = createSprite (250,canH-130,50,50);
  rabbit.addAnimation ("cisco",rabbitBlink);
  rabbit.addAnimation ("magali",rabbitEat);
  rabbit.addAnimation ("triste",rabbitSad);
  rabbit.changeAnimation ("cisco");
  rabbit.scale = 0.3;

  scissor = createImg ("assets/cut_btn.png");
  scissor.position (200,0.2);
  scissor.size (100,100);
  scissor.mouseClicked (cut);

  scissor2 = createImg ("assets/cut_btn.png");
  scissor2.position (80,50);
  scissor2.size (100,100);
  scissor2.mouseClicked (cut2);

  scissor3 = createImg ("assets/cut_btn.png");
  scissor3.position (300,0.02);
  scissor3.size (100,100);
  scissor3.mouseClicked (cut3);


  mute = createImg ("assets/mute.png");
  mute.position (400,10);
  mute.size (90,90);
  mute.mouseClicked (muteButton);

  balloon = createImg ("assets/balloon.png");
  balloon.position (90,100);
  balloon.size (90,90);
  balloon.mouseClicked (airBalloon);

  rectMode(CENTER);
  imageMode(CENTER);
  textSize(50);
  
}

function draw() 
{
  background(51);
  

  push();
  imageMode (CORNER);
  image(backgroundImg,0,0,canW,canH);
  pop();
  
  //ground.show();
  
  Engine.update(engine);
  
  rope.show();
  rope2.show();
  rope3.show();

  if (fruit != null) {
    image(fruitImg,fruit.position.x,fruit.position.y,120,120);
  }

  if (collision (fruit, rabbit) === true) {
    rabbit.changeAnimation ("magali");
    eatingMp3.play();
  }
  if (collision (fruit, ground.body) === true) {
    rabbit.changeAnimation ("triste");
    sadMp3.play();
  }

  drawSprites ();


 
   
}

function cut(){
  rope.break ();
  link.remove ();
  link = null;
  ropeCutMp3.play();
}

function cut2(){
  rope2.break ();
  link2.remove ();
  link2 = null;
  ropeCutMp3.play();
}

function cut3(){
  rope3.break ();
  link3.remove ();
  link3 = null;
  ropeCutMp3.play();
}

function collision (bodie,sprite){
  if (bodie != null) {
    var distance = dist (bodie.position.x, bodie.position.y, sprite.position.x, sprite.position.y);
    if (distance <= 80) {
      World.remove (world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function muteButton(){
  if (sound1Mp3.isPlaying()) {
    sound1Mp3.stop();

  }
  else {
    sound1Mp3.play();
  }
}

function airBalloon(){
  Body.applyForce(fruit, {x:0,y:0},{x:0.03, y:0})
  airMp3.play();
}