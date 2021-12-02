let inp;
let word;

// value is the text the user entered in the input
function onSubmit(value) {
  if (value == word) {
    speechSounds.that_is_correct_now_spell.play();
    speechSounds.that_is_correct_now_spell.onended(() => {
      nextWord();
    });
  } else {
    speechSounds.that_is_incorrect_the_correct_spelling_of.play();
    speechSounds.that_is_incorrect_the_correct_spelling_of.onended(() => {
      wordSounds[word].play();
      wordSounds[word].onended(() => {
        speechSounds.is.play();
        speechSounds.is.onended(() => {
          correction(0);
        });
      });
    });
  }
}

function correction(idx) {
  if (idx == word.length) {
    speechSounds.now_spell.play();
    speechSounds.now_spell.onended(() => {
      nextWord();
    });
    return;
  }
  let letter = word[idx];
  letterSounds[letter].play();
  letterSounds[letter].onended(() => {
    idx++;
    correction(idx);
  });
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
  speechSounds.spell.play();
  speechSounds.spell.onended(() => {
    nextWord();
  });
}

startGame();
