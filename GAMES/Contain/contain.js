// screen width is 320, height is 200

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

let imgPaddleR =
  ".wwwwww.\nwwwwwwww\n" +
  "wrr..rrw\nwc.cc.cw\n".repeat(21) +
  "wwwwwwww\n.wwwwww.";

imgPaddleR = spriteArt(imgPaddleR);

// prettier-ignore
let imgPaddleTop =
	"." + "w".repeat(44) + ".\n" +
	"ww" + "rc".repeat(21) + "ww\n"+ 
	"ww" + "r.".repeat(21) + "ww\n" +
	"ww" + ".c".repeat(21) + "ww\n" +
	"ww" + ".c".repeat(21) + "ww\n" +
	"ww" + "r.".repeat(21) + "ww\n" +
	"ww" + "rc".repeat(21) + "ww\n" +
	"." + "w".repeat(44) + ".";
imgPaddleTop = spriteArt(imgPaddleTop);

let imgPaddleBot =
  "." +
  "w".repeat(44) +
  ".\n" +
  "ww" +
  "tb".repeat(21) +
  "ww\n" +
  "ww" +
  "b.".repeat(21) +
  "ww\n" +
  "ww" +
  ".t".repeat(21) +
  "ww\n" +
  "ww" +
  ".t".repeat(21) +
  "ww\n" +
  "ww" +
  "b.".repeat(21) +
  "ww\n" +
  "ww" +
  "tb".repeat(21) +
  "ww\n" +
  "." +
  "w".repeat(44) +
  ".";
imgPaddleBot = spriteArt(imgPaddleBot);

let score = 0;
function displayScore() {
  text("Score: " + score, 0, 25);
}
displayScore();
/* PART A: Make image for the wall */

/* PART A0: create a ball and two paddles on each end of the screen */
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 8;
    this.h = 8;
    this.r = 4;
    this.speed = 0.5;
    this.active = false;
    this.reset();
  }
  reset() {
    this.x = 160;
    this.y = 100;
    let theta = (Math.random() * 0.25 + 0.05) * Math.PI;
    let quads = [0, 0.65, 1, 1.65];
    let quad = quads[Math.floor(Math.random() * 4)];
    theta += quad * Math.PI;

    this.velocity = {
      x: this.speed * Math.cos(theta),
      y: this.speed * Math.sin(theta),
    };
  }
  draw() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.x *= 1.00001;
    this.velocity.y *= 1.00001;
    image(imgBall, Math.round(this.x), Math.round(this.y));
  }
}

class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    if (this.w > this.h) {
      this.x = mouseX - this.w / 2;
      if (this.y < 100) {
        image(imgPaddleTop, Math.round(this.x), this.y);
      } else {
        image(imgPaddleBot, Math.round(this.x), this.y);
      }
    } else {
      this.y = mouseY - this.h / 2;
      if (this.x < 160) {
        image(imgPaddleL, this.x, Math.round(this.y));
      } else {
        image(imgPaddleR, this.x, Math.round(this.y));
      }
    }
  }
}

let balls = [];
for (let i = 0; i < 4; i++) {
  balls.push(new Ball(160, 100));
}

let paddleL = new Paddle(3, 100, 8, 46);
let paddleR = new Paddle(316, 100, 8, 46);

let paddleTop = new Paddle(160, 20, 46, 8);
let paddleBot = new Paddle(160, 190, 46, 8);

let bounceFrame = 0;

function intersect(a, b) {
  if (
    a.x > b.x + b.w || // right side
    a.x + a.w < b.x || // left side
    a.y + a.h < b.y || // top
    a.y > b.y + b.h // bottom
  ) {
    return false;
  }
  // log(a, b);
  return bounceFrame < frameCount - 5;
}

let ballsServed = 0;
let ballsActive = 0;

async function spawn() {
  for (let i = 0; i < balls.length; i++) {
    if (i == 0) {
      text("3", 12, 20);
      await delay(1000);
      text("2", 12, 20);
      await delay(1000);
      text("1", 12, 20);
      await delay(1000);
      text(" ", 12, 20);
    } else {
      await delay(3000);
    }
    balls[i].active = true;
    ballsServed++;
    ballsActive++;
  }
}

spawn();

async function gameOver() {
  await alert("Game Over");
  for (let i = 0; i < 4; i++) {
    balls[i].reset();
    balls[i].active = false;
  }
  ballsActive = 0;
  spawn();
}

function draw() {
  background(0);

  paddleL.draw();
  paddleR.draw();
  paddleTop.draw();
  paddleBot.draw();

  if (ballsServed > 1 && ballsActive <= 1) {
    return;
  }

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (!ball.active) continue;
    /* PART A1: draw the ball and paddles inside the p5 main draw function */
    if (intersect(ball, paddleL) || intersect(ball, paddleR)) {
      ball.velocity.x *= -1;
      bounceFrame = frameCount;
      score++;
      displayScore();
    }

    if (intersect(ball, paddleTop) || intersect(ball, paddleBot)) {
      ball.velocity.y *= -1;
      bounceFrame = frameCount;
      score++;
      displayScore();
    }

    if (ball.x > 328 || ball.x < -8 || ball.y > 208 || ball.y < -8) {
      ball.reset();
      ball.active = false;
      ballsActive--;
      log(ballsActive);
      if (ballsActive <= 1) {
        gameOver();
        return;
      }
    }

    ball.draw();
  }
}
