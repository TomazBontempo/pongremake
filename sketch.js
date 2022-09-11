//Ball variables:
let xBall = 300;
let yBall = 200;
let dBall = 25;
let rBall = dBall / 2 ;
//speed
let xBallspeed = 10;
let yBallspeed = 10;


//Bar Variables:
let xBar = 5;
let yBar = 150;
let wBar = 10;
let hBar = 90;
//Speed
let yBarspeed = 10;

let hit = false;


//CPU Bar Variables:
let xCPUBar = 580;
let yCPUBar = 150;
//Speed
let yCPUBarspeed = 10;
let errorChance = 0;


//Score Variables:
let P1 = 0;
let CPU = 0;

//Sound Variables:
let bhit;
let p1scores;
let cpuscores;
let music;


function preload() {
  music = loadSound("DanceMagic.mp3");
  p1scores = loadSound("Coin.mp3");
  cpuscores = loadSound("Crunch.mp3");
  bhit = loadSound("pop.mp3")
}


//Game:
function setup() {
  createCanvas(600, 400);
  music.loop()
}

function draw() {
  background(0);
  showBall();
  moveBall();
  Ballcollision();
  showBar(xBar, yBar);
  moveBar();
  //Barcollision();
  BCGH(xBar,yBar);
  showBar(xCPUBar,yCPUBar);
  moveCPUBar();
  BCGH(xCPUBar, yCPUBar);
  showScore();
  Point();
}


//Ball Functions:

function showBall(){
  circle(xBall, yBall, dBall);
}

function moveBall(){
  xBall += xBallspeed;
  yBall += yBallspeed;
}

function Ballcollision(){
  if (xBall + rBall > width || xBall - rBall < 0 ){
    xBallspeed *= -1;
  }
  if (yBall + rBall > height || yBall - rBall < 0 ){
    yBallspeed *= -1;
  }
}

//Bar Functions:
function showBar(x,y){
  rect(x, y, wBar, hBar);
}

function moveBar(){
  if (keyIsDown(UP_ARROW)) {
    yBar -= yBarspeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yBar += yBarspeed;
  }
}

function Barcollision(){
   if (xBall - rBall < xBar + wBar && yBall - rBall < yBar + hBar && yBall + rBall > yBar) {
        xBallspeed *= -1;
    }
}

function BCGH(x,y){
  hit =
  collideRectCircle(x, y, wBar, hBar, xBall, yBall, rBall);
  if (hit){
    xBallspeed *= -1;
    bhit.play();
  }
}


//CPU Bar Functions:
function moveCPUBar(){
  errorCalculator()
 yCPUBarspeed = yBall - yCPUBar - hBar / 2 - errorChance;
  yCPUBar += yCPUBarspeed
}

function errorCalculator(){
  if (P1 > CPU){
    errorChance -= 0.5
  }

  if (P1 < CPU){
    errorChance += 0.5
  }
     if (errorChance <= -70){
    errorChance = 0
  }
   if (errorChance >= 70){
    errorChance = 70
  }
}

function CPUBarcollision(){
   if (xBall - rBall < xCPUBar + wBar && yBall - rBall < yCPUBar + hBar && yBall + rBall > yCPUBar) {
        xBallspeed *= -1;
     bhit.play();
    }
}


//Score Functions:
function showScore(){
 stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(75,0,130));
    rect(150, 10, 40, 20);
    fill(255);
    text(P1, 170, 26);
    fill(color(75,0,130));
    rect(450, 10, 40, 20);
    fill(255);
    text(CPU, 470, 26);
}


function Point(){
  if (xBall - rBall < 2){
    CPU += 1;
    cpuscores.play();
  }
  if (xBall + rBall > 599){
    P1 += 1;
    p1scores.play();
  }
}