const log = console.log;

// the category is "Fun and Games"
let phrases =
  "Tourist-Friendly Destination|Skateboarding & Snowboarding|Underground Entertainment|Competitive Shuffleboard|Cookie-Decorating Contest|Grand-Opening Celebration|Multicultural Activities|Neighborhood Get-Together|Photography & Scrapbooking|Skateboards & Rollerblades|Snowball-Throwing Contest|Snowshoeing & Snowboarding|International Carnivals|Performing-Arts Festival|Skateboard & Rollerblades|Spur-Of-The-Moment Getaway|Unforgettable Carnivals|Wholesome Entertainment|Afterschool Activities|Arts-And-Crafts Festival|Disappearing-Coin Trick|Ice-Carving Competition|Mixologist Competition|Snowbiking & Airboarding|Big-Ticket Attractions|City-Center Horseraces|Halloween Festivities|Hamletscenen Festival|Helium-Filled Balloons|Lion-Dance Competition|Mountaineering & Skiing|Snowboarding & Sledding|Spontaneous Nightlife|Traditional Macaroons|Battleship Destroyer|Building Sandcastles|Carnival Attractions|Festive Celebrations|Fingerprint Drawings|Fingerprints Drawing|Gingerbread-House Kit|Going Paddleboarding|Handball & Racquetball|Helium-Filled Baloons|Curling Championship|In-The-Kitchen Puzzles|Jack-O'-Lantern Carving|Model-Airplane Racing|Renaissance Festival|Alpine Snowboarding|Charades & Pictionary|Contestant Searches|Cross-Country Skiing|Festive Celebration|Five-Gallon Stockpot|Freestyle Wrestling|Frisbee Competition|Interactive Puzzles|Marshmallow Animals|Mini-Golf Tournament|Murder-Mystery Party|Playing Racquetball|Rhythmic Gymnastics|Roller-Coaster Rides|Sled-Pulling Contest|Sleight-Of-Hand Magic|Yuletide Activities|Back-Road Bicycling|Balance-Beam Tricks|Complicated Puzzle|Computer Solitaire|Fast-Pitch Softball|Festive Activities|Freshwater Fishing|Gymnastics Routine|Outdoor Recreation|Playful Activities|Playing Backgammon|Playing Horseshoes|Playing Pictionary|Ski Mountaineering|Slight-Of-Hand Magic|Table Shuffleboard|Water-Balloon Fight|Water-Balloon Throw|Weeklong Festivals|Baseball & Softball|Chess Competition|Collectible Dolls|Crossword Puzzles|Cultural Festival|Equestrian Sports|Filmmaking Genius|Football & Baseball|Football Practice|Going Parasailing|Goldfish Scooping|Halloween Hayride|Hot-Air Ballooning|Indoor Volleyball|Jovial Sing-Alongs|Juggling Beanbags|Late-Night Hayride|Medieval Festival|Miniature Golfing|Playing Asteroids|Playing Badminton|Playing Hopscotch|Playing Paintball|Playing Solitaire|Playing Tic-Tac-Toe|Pothole Exploring|Riverside Camping|Softball & Baseball|Tag-Team Wrestling|Two-Story Carousel|Water-Balloon Toss|Wheelbarrow Races|Writing Limericks|Adventure Racing|Alphabet Magnets|Ballroom Dancing|Barbeque Bonanza|Beach Volleyball|Biggie Boardings|Childhood Heroes|Chinese Checkers|Christmas Crafts|Crossword Puzzle|Demolition Derby|Disappearing Ink|Doing Handstands|Double-Coin Trick|Dungeons & Dragons|Fantasy Football|Fraternity Prank|Freestyle Skiing|Fun Brainteasers|Going Spelunking|Gorgeous Fishing|Gorgeous Golfing|Habanos Festival|Headband Antlers|Hula Competition|Hula-Hoop Contest|Indoor Go-Carting|Indoor Go-Karting|Inflatable Slide|Interactive Toys|Japanese Archery|Juggling Oranges|Knock-Knock Jokes|Masquerade Balls|Narrated Cruises|Paper Snowflakes|Ping-Pong Paddles|Playing Checkers|Playing Dominoes|Playing Jeopardy|Playing Jeopardy!|Playing Kickball|Playing Lacrosse|Playing Monopoly|Playing Peekaboo|Playing Ping-Pong|Playing Scrabble|Popcorn Garlands|Potato-Sack Races|Renaissance Fair|Riding Piggyback|Shooting Marbles|Spitting Contest|Sprint-Car Racing|Street Carnivals|Swim-Up Blackjack|Twenty Questions|Ultimate Frisbee|Urban Spelunking|Volleyball Match|Wheelbarrow Race|Winter Carnivals|Amazing History|Amusement Rides|Anderlecht Fair|Balloon Animals|Big-Wave Surfing|Board-Game Night|Boggle & Scrabble|Boogie Boarding|Burping Contest|Classic Yahtzee|Community Chest|Confetti Cannon|Country Dancing|Cricket & Croquet|Croquet Mallets|Deep-Sea Fishing|Downhill Skiing|Downhill Slalom|Dragon-Boat Race|Exciting Rounds|Family Cookouts|Finger Painting|Gaelic Football";

// copy some code from hangman to start from
// make an array of phrases and pick a random phrase

phrases = phrases.split("|");

let buzzerClicked = false;
let avail = [];
let points = 0;
let phrase;
let letters;

async function startNewGame() {
  await pc.eraseRect(1, 1, 53, 16);

  let rand = Math.floor(Math.random() * phrases.length);

  phrase = phrases[rand];
  phrase = phrase.split(" ");
  log(phrase);

  // Make phrase array with the words of the phrase
  // Example phrase: ['Community', 'Chest']
  // letters -> [
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ']
  // ]
  letters = [];
  for (let i = 0; i < phrase.length; i++) {
    letters.push([]);
    for (let j = 0; j < phrase[i].length; j++) {
      if (phrase[i][j] != "-" && phrase[i][j] != "&") {
        letters[i].push(" ");
      } else {
        letters[i].push(phrase[i][j]);
        pc.text(phrase[i][j], j * 3 + 3, i * 3 + 3);
      }
    }
  }
  log(letters);
  displayBoxes();
  displayScore();

  addLetter();
}

startNewGame();

/* PART C: display the boxes */
function displayBoxes() {
  for (let i = 0; i < phrase.length; i++) {
    for (let j = 0; j < phrase[i].length; j++) {
      pc.rect(j * 3 + 2, i * 3 + 2, 3, 3);
    }
  }
}

function displayScore() {
  pc.text("Score: " + points, 20, 20);
}

async function buzz() {
  buzzerClicked = true;
  let guess = await pc.prompt("Guess the phrase", 2, 12);
  buzzerClicked = false;
  if (guess && guess.toLowerCase() == phrase.join(" ").toLowerCase()) {
    //  guess was right
    points += avail.length;
    displayScore();
    startNewGame();
  } else {
    // guess was wrong
    addLetter();
  }
}
let bigBuzzer = `
 _
| |__  _   _ ___________ _ __
| '_ \\| | | |_  /_  / _ \\ '__|
| |_) | |_| |/ / / /  __/ |
|_.__/ \\__,_/___/___\\___|_|
                              `;
pc.button(bigBuzzer, 10, 20, buzz);

/* PART C: add a letter to a random empty box */
async function addLetter() {
  await delay(700);
  avail = [];
  for (let i = 0; i < phrase.length; i++) {
    for (let j = 0; j < phrase[i].length; j++) {
      if (letters[i][j] == " ") {
        avail.push([i, j]);
      }
    }
  }
  log(avail);
  if (avail.length == 0) {
    await pc.alert("The phrase was " + phrase.join(" "), 2, 12);
    startNewGame();
    return;
  }
  if (buzzerClicked) {
    return;
  }
  let idx = Math.floor(Math.random() * avail.length);
  let coord = avail[idx];
  let i = coord[0];
  let j = coord[1];
  pc.text(phrase[i][j], j * 3 + 3, i * 3 + 3);
  letters[i][j] = phrase[i][j];

  addLetter();
}
