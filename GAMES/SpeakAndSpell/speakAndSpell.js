let inp;
let word;

// value is the text the user entered in the input
async function onSubmit(value) {
  if (value == word) {
    let phrases = [
      "that_is_correct_now_spell",
      "that_is_right_now_try",
      "you_are_correct_next_spell",
      "you_are_correct_next_spell",
    ];
    let rand = Math.random() * phrases.length;
    rand = Math.floor(rand);
    await play(speechSounds[phrases[rand]]);
    nextWord();
  } else {
    await play(speechSounds.that_is_incorrect_the_correct_spelling_of);
    await play(wordSounds[word]);
    await play(speechSounds.is);
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      await play(letterSounds[letter]);
    }
    await play(speechSounds.now_spell);
    nextWord();
  }
}

// called everytime the user enters text in the input
function onChange(value) {
  let letter = value[value.length - 1];
  letterSounds[letter].play();
}

async function nextWord() {
  await erase(); // erase the screen
  let rand = Math.random() * words.length;
  rand = Math.floor(rand);
  word = words[rand];

  wordSounds[word].play();

  // create the input for letters
  inp = input("", 0, 0, onSubmit, onChange);
}

async function startGame() {
  await alert("Press enter to start");
  await play(speechSounds.spell);
  nextWord();
}

startGame();
