function setup() {
  createCanvas(400, 400);
  background(220);
  noStroke();
  fill(0);
  
  let margin = 40;
  for(let y = margin; y < height - margin; y+=20){
  for(let x = margin; x < width - margin; x+=20){
    // let x = 50 + i * 20
    circle(x,y,sin(x*y*0.001)*20);
  }
}
}
function draw() {
  

}