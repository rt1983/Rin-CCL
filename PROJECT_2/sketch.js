let paddleWidth = 50;
let bricks = [];
let bounceball = [];
let a = 200;
let b = 200;
let speedX = 2.5;
let speedY = 3;
let nextLevel = false
let score = 0;

function setup() {
  let cnv = createCanvas(400,400);
  cnv.parent("canvasContainer")
  prompt('You are under lockdown in Shanghai. Your goal is to get out of lockdown, Hao ma?')
  time = millis();
  restart();
}
function restart(){
  push();
  brickWidth = 40;
  for(rb = 0; rb <= 50; rb++){
    bricks.push(new Bricks(20 + 45* round(random(0,7)), 20+10* round(random(0,15)),brickWidth));
  pop();
  }
  a = 200;
  b = 200;
}
function draw() {
  background(0);
  drawField();
  
  if (millis() - time < 1000){
    textSize(20);
    text('Lockdown begins in 3',100, height/2);
  }else if (millis() - time < 2000){
    textSize(20);
    text('Lockdown begins in 2', 100, height/2);
  }else if (millis() - time < 3000){
    textSize(20);
    text('Lockdown begins in 1', 100, height/2);
  }
  if(millis() - time > 3000){
  Paddle();
  BounceBall();
  var numbricks = 0;
    
  for(var i = 0; i < bricks.length;i++){
    bricks[i].update();
    bricks[i].display();
    if(bricks[i].continue)
    numbricks++;
  }
  if(numbricks == 0){
    //noLoop();
    if(nextLevel == false){
      time2 = millis();
      nextLevel = true;
    }
    if(nextLevel == true && millis() - time2 > 3000){
      for(rb = 0; rb <= 50; rb++){
    bricks.push(new Bricks(20 + 45* round(random(0,7)), 20+10* round(random(0,15)),brickWidth));
      a = 200;
      b = 200;
      nextLevel = false;
    }
    speedX = 3;
    speedY = 4;
  }
    fill(0);
    textSize(20);
    // text('Please go down to take PCR TEST', 50, 210);
    a = 200;
    b = 200;
    if (millis() - time2 < 1000){
    textSize(20);
    text('Someone from your compound tested POSITIVE 3',0, height/2);
  }else if (millis() - time2 < 2000){
    textSize(20);
    text('Another 14 days of quarantine in 2', 50, height/2);
  }else if (millis() - time2 < 3000){
    textSize(20);
    text('Another 14 days of quarantine in 1', 50, height/2);
  }if(millis() + time2 < 3000){
    restart();
    noLoop();
  }

  // for(var j = 0;j < bounceball.length ;j++){
  //   bouceball[j].disply();
  //   bounceball.push(new BounceBall(width/2,height/2));
  // }
}
}
}
function drawField(){
  strokeWeight(5);
  stroke(255);
  line(10,10,10,height-10);
  line(10,10,width-10,10);
  line(10,height-10,width-10,height-10);
  line(width-10,10,width-10,height-10);
}
function Paddle(){
    if(mouseX < 15){
      x = 15;
    } else if(mouseX >= width-10-width/10){
      x = width-10 - width/10
    } else{
      x = mouseX
    }
    rect(x,height-30,paddleWidth,5);
   if(score >= 15 && score <= 39){
     textSize(20);
     text('Waimai Dao Le',120,250);
     paddleWidth = 60;
   }else if (score >= 40 && score <= 48){
     textSize(20);
     text('Submit Your Antigen Test Result',60,250);
     paddleWidth = 50;
   }else if (score >= 49 && score >= 59){
     textSize(20)
     text('',90,250);
   }else if (score >= 60 && score <= 79){
     textSize(20);
     text('Few More Days',90,250);
   } else if (score >= 80){
     textSize(20);
     text('Waimai Dao Le',150,250);
     paddleWidth = 60;
   }
}
function BounceBall() {
  stroke(255);
  strokeWeight(5);
  noFill();
  ellipse(a, b, 20, 20);
  if (a >= width - 20 || a <= 20) {
    speedX *= -1;
  }
  if (b >= height - 10 || b <= 20) {
    speedY *= -1;
  }
  a += speedX;
  b += speedY;
  if (a >= x - 5 && a <= x + paddleWidth + 5 && b >= 360 && b <= 370) {
    speedY = -speedY;
  }
  //if (prompt == 'Shanghai'){
  if (b >= height - 10) {
    noLoop();
    fill(0);
    textSize(20);
    text("You tested POSITIVE", 100, 250);
  }
}
  
// class BounceBall{
//   constructor(circlex,circley){
//   this.x = circlex;
//   this.y = circley;
//   stroke(255);
//   strokeWeight(5);
//   noFill();
//   ellipse(this.x,this.y,20,20);
//   }  
//  update(){
//   if(this.x >= width - 20 || this.x <= 20){
//     speedX *=-1
//   }
//   if(this.y >= height - 10 || this.y <= 20){
//     speedY *=-1
//   }
//   this.x += speedX
//   this.y += speedY
//   if(this.x >= x - 5 && this.x <= x + paddleWidth + 5 && this.y >= 360 && this.y <= 370){
//     speedY = -speedY
//   }
//   //if (prompt == 'Shanghai'){
//   if(this.y >= height -10){
//     noLoop();
//     fill(0);
//     textSize(20);
//     text('You tested POSITIVE',100,250);
//   }
// }
//  display(){
//   ellipse(this.x,this.y,20,20);

//  }
// }
class Bricks{
  constructor(brickx,bricky,brickw,brickType){
    this.x = brickx;
    this.y = bricky;
    this.width = brickw;
    this.continue = true
    if(brickType==0){
      this.brickType = "waimai"
    }else if(brickType==1){
      this.brickType = "antigen"
    }else if(brickType==2){
      this.brickType = "can go outside"
    }
  }
  update(){
     if(this.continue == true){
  if(a >= this.x && a <= this.x + this.width && b - 10 <= 5 + this.y && b + 10 >= this.y){
      speedY = -speedY * 1.0001;   
      this.continue = false;
      score ++;
 } else if (dist(this.x + this.width, this.y + 5, a,b) <= 10 || dist(this.x,this.y,a,b) <= 10){
    speedX = -speedX;
    speedY = -speedY * 1.0001;
    score ++;
    this.continue = false
 } else{
   rect(this.x,this.y,this.width,5);
   fill('red');
   text(this.brickType, this.x,this.y);
  }
  }
 } 
 display(){
   if(this.continue == true){
     rect(this.x,this.y,this.width,5);
     fill('red');
     text(this.brickType, this.x,this.y)
     text(score,370,20);
}
 }
}