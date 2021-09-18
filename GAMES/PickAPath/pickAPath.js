let choice = -1; // initialize choice to -1, user has not made any choice yet

let thor = `
/|  .-----,  |\\
\\ \\/       \\/ /
 \\|_________|/
 |-0-0-0-0-0-|
()))__, ,__((()
)))'o'   'o'(((
((    , ,    ))
 |    \`-'    |
 :  //;;;\\\\  ;
  \\ ;'\`-'';,/
   \\';;;;;'/
   |       |
	 huh?`
let buff = `
	      ,;;.
    ,'  '''-,-. __
     \\,, > / _ '  \\
      \`./-'    \`. '
        (_._  ,(--)
         \`| '  /\` }
         \`----' ( |
         |    )  ||
         |\`.  | '_I
         |_|__| '
          c'c'
          |)|)
          |'|'
       ,_'_'_\\
			 Whoa, I'm buff!`
let scream = `
  .----------.
 /  .-.  .-.  \\
/   | |  | |   \\
\\   \`-'  \`-'  _/
/\\     .--.  / |
\\ |   /  /  / /
/ |  \`--'  /\\ \\
/\`-------'  \\ \\
*screams in shock*`

function btnClick() {
	choice = 1;
	nextPage();
}

async function nextPage() {
	await pc.erase(1, 1, 78, 28);
	let msg = ''; // initialize message to empty string
	let opt = []; // initialize options to empty array
	if (choice == -1) {
		/* PART A: Start your story! */
		msg = "「(°ヘ°) \n\t" +
			"You wake up one day like any other, go to the bathroom to wash yourself and suddenly you see your reflection, a bearded buff man standing right in front of you, how do you react?";
		opt = [1, 2, 3];
		pc.button(thor, 7, 10, btnClick); // choice 1
		pc.button(buff, 25, 10, btnClick); // choice 3
		pc.button(scream, 53, 10, btnClick); // choice 2
	} else if (choice == 1 || choice == 2 || choice == 3) {
		/* PART A: continue the story */
		msg = ":-O \n\t" +
			"You pinch yourself, it's all real, you are now a Viking looking buff guy in 2021, it's not like people will judge you anyway, you're still in the pandemic so they won't see you, suddenly it hits you, there was a class on Norse mythology a week ago and you happen to look exactly like Thor, what do you do now?.\n\t" +
			"4: I'm gonna go outside, and summon thunder. \n\t" +
			"5: Go back to sleep";
		opt = [4, 5];
	} else if (choice == 4) {
		msg =
			"z        z\n\t" +
			"ヽ(•‿•)ノ \n\t" +
			"You run outside, still in your ripped pyjamas, your neighbours look at you in suspicion, you then proceed to thrust your hands into the sky... nothing happens, you try again and again, the neighbors are already calling the police, then you finally manage to do it, a single bolt of thunder hitting your palm, you react with joy like a little girl that got a barbie doll for christmas, what do you do with this new found power? \n\t" +
			"6: Imma try to get mjolnir! \n\t" +
			"7: Imma shock that kid next to my house that has been shouting all night \n\t" +
			"8: I will quit school to pursue my life long dream of conquering the world!"
		opt = [6, 7, 8];

	} else if (choice == 5) {
		msg = "(_ _) \n\t" +
			"You go back to sleep, you are suddenly woken up by your alarm clock, you forgot to turn it off, you go to the bathroom again and you see your normal self, it was a dream after all.";
	} else if (choice == 6) {
		msg = "You think to yourself, ah but thor is mostly known for his hammer! So you try to call it, many failed attempts later your empty head remembers that this is all in mythology and you need to forge the hammer yourself, you remember from your history lessons that Mjolnir is forged in the heart of a dying star, with a dwarf, you need uru metal, and you also need a rocket or to be able to fly, you ask yourself, would it be better to actually try and get all of those things or should you just have fun with your powers? \n\t";

	}

	if (choice == -1) {
		pc.text(msg, 1, 1);
	} else if (opt.length > 0) {
		// prompt the player to make choices
		let input = await prompt(msg);

		/* PART B: check if the player made a valid choice */
		if (opt.includes(Number(input))) {
			choice = input;
		} else {
			await alert("Invalid choice");
		}
		nextPage();
	} else {
		/* PART B: end the game if there are no more choices to make */
		await alert(msg);
		exit();
	}
}

nextPage();
