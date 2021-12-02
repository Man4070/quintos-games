// screen width is 640, height is 400
const log = console.log;

// sprites are scaled x2 by default
let imgBall = spriteArt(`
..wwww..
.wwwwww.
ww.ww.ww
w..ww..w
w.wwww.w
wwwwwwww
.w....w.
..wwww..`);

let imgPaddleL = spriteArt(
  ".wwwwww.\nwwwwwwww\n" +
    "wbb..bbw\nwt.tt.tw\n".repeat(21) +
    "wwwwwwww\n.wwwwww."
);

let imgPaddleR = spriteArt(
  ".wwwwww.\nwwwwwwww\n" +
    "wrr..rrw\nwc.cc.cw\n".repeat(21) +
    "wwwwwwww\n.wwwwww."
);

let imgWall =
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbttttttttttttttttttttttttttt".repeat(3) +
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrccccccccccccccccccccccccccc".repeat(3) +
  "\n";

imgWall = imgWall.repeat(10);

imgWall = spriteArt(imgWall);

let scoreRed = 0;
let scoreBlue = 0;
function displayScore() {
  pc.text(scoreBlue, 18, 5);
  pc.text(scoreRed, 22, 5);
}
displayScore();
/* PART A: Make image for the wall */

/* PART A0: create a ball and two paddles on each end of the screen */
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 16;
    this.h = 16;
    this.r = 8;
    this.velocity = {
      x: -3,
      y: 3,
    };
  }
  draw() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    image(imgBall, this.x, this.y);
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 16;
    this.h = 92;
  }
  draw() {
    this.y = mouseY - this.h / 2;
    if (this.x < 320) {
      image(imgPaddleL, this.x, this.y);
    } else {
      image(imgPaddleR, this.x, this.y);
    }
  }
}
let ball = new Ball(320, 200);
let paddleL = new Paddle(3, 200);
let paddleR = new Paddle(624, 200);

let bounceFrame = 0;

function draw() {
  background(0);
  /* PART A1: draw the ball and paddles inside the p5 main draw function */
  if (ball.y > 364 || ball.y < 20) {
    ball.velocity.y *= -1;
  }
  if (
    ball.x < paddleL.x + paddleL.w &&
    ball.y > paddleL.y &&
    ball.y < paddleL.y + paddleL.h &&
    bounceFrame < frameCount - 60
  ) {
    ball.velocity.x *= -1;
    bounceFrame = frameCount;
  }
  if (
    ball.x + ball.w > paddleR.x &&
    ball.y > paddleR.y &&
    ball.y < paddleR.y + paddleR.h &&
    bounceFrame < frameCount - 60
  ) {
    ball.velocity.x *= -1;
    bounceFrame = frameCount;
  }
  if (ball.x > 654) {
    scoreBlue++;
    displayScore();
  } else if (ball.x < -16) {
    scoreRed++;
    displayScore();
  }
  if (ball.x > 654 || ball.x < -16) {
    ball.x = 320;
    ball.y = 200;
  }

  ball.draw();
  paddleL.draw();
  paddleR.draw();
  image(imgWall, 0, 0);
  image(imgWall, 0, 380);
}
