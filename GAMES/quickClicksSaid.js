const target =
	" .d88b. \n" +
	".8P  Y8.\n" +
	"88    88\n" +
	"88    88\n" +
	"'8b  d8'\n" +
	" 'Y88P' ";

/* PART A: change the values of x and y to be random */
// screen size is 80w x 30h
// target is 8w x 6h
// drawing starts from top left corner
// we want to draw the target within the bounds of the frame
// 80 screen width - 8 target width - 1 frame line = 71
// 30 screen height - 6 target height - 1 frame line = 23

let btn = 0;
let clickCounter = 0;
let times = [];

function calcAvg() {
	let differences = [];
	for (let i = 0; i < times.length - 1; i++) {
		differences.push(times[i + 1] - times[i]);
	}

}\

function btnClick() {
	if (btn != 0) btn.erase();

	times.push(Date.now());
	console.log(times);

	clickCounter = clickCounter + 1;
	console.log(clickCounter + ' clicks');
	if (clickCounter >= 20) {
		calcAvg();
		return;
	}

	let x = Math.random() * 71;
	x = Math.ceil(x);
	let y = Math.random() * 23;
	y = Math.ceil(y);
	btn = pc.button(target, x, y, btnClick);
}

async function startGame() {
	await pc.alert("You have to click on the circles to see how fast you can click them! Press Enter to start.");
	btnClick();
}

startGame();

/* PART A: Use recursion to make a new button after clicking a button */
