(async () => { // start wrapper (I will explain how this works later)

	/* Your code goes here! (inside the wrapper) :D */

	/* PART A: Make a random number between 1-100 */
	let rand = Math.random() * 100;
	rand = Math.ceil(rand);
	console.log(rand);

	let guess;
	/* PART A: Write code for one turn of the game */
	for (let i = 0; guess != rand; i++) {

		// ask user to guess a number, assign their response to a variable
		guess = await prompt("Guess a number 1-100");
		if (guess > 100 || guess < 1) {
			await alert("Number out of range")
			i--;
			continue;
		}

		// tell the player if their guess was too low, too high, or correct
		if (guess > rand) {
			await alert("Too high");
		} else if (guess < rand) {
			await alert("Too low");
		} else {
			await alert("Correct!");
		}
		if (i > 7) {
			await alert("Max guesses, too bad")
			break;
		}
	}


	/* PART B: Make the game loop */

	exit(); // exits the game
})(); // end wrapper
