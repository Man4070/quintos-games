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

let btn;
let times = [];


async function showStats() {
	let speeds = [];
	for (let i = 0; i < times.length - 1; i++) {
		speeds.push(times[i + 1] - times[i]);
	}
	console.log(times);
	console.log(speeds);
	let sum = 0;
	for (let i = 0; i < speeds.length; i++) {
		sum = speeds[i] + sum;
	}
	let avg = sum / speeds.length;

	let slowest = speeds[0];
	let fastest = speeds[0];
	for (let i = 1; i < speeds.length; i++) {
		if (speeds[i] > slowest) {
			slowest = speeds[i];
		}
		if (speeds[i] < fastest) {
			fastest = speeds[i];
		}
	}

	await pc.alert("Your average speed was " + avg + "ms\n" +
		"your slowest speed was " + slowest + "ms\n" +
		"your fastest speed was " + fastest + "ms");
}

function btnClick() {
	console.log("You clicked the button!");
	times.push(Date.now());
	if (btn) btn.erase();

	if (times.length == 20) {
		showStats();
	} else {
		let x = Math.random() * 71;
		x = Math.ceil(x);
		let y = Math.random() * 23;
		y = Math.ceil(y);
		btn = pc.button(target, x, y, btnClick);
	}
}

async function startGame() {
	await pc.alert("Click on the button, as fast as you can");
	btnClick();
}

startGame();

/* PART A: Use recursion to make a new button after clicking a button */
