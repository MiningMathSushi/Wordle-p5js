var words;

var word;
var wordArr = [];

var width = 100;
var height = 100;
var size = 80;

var selRow = 0; 
var selCol = 0;
var selWord = [];

var validChars = 'abcdefghijklmnopqrstuvwxyz'; // Simplified for checking

// Global variables
var words;
var word;
var wordArr = [];
var selRow = 0; 
var selCol = 0;
var selWord = [];
var validChars = 'abcdefghijklmnopqrstuvwxyz';

function setup() {
  loadStrings('dict.txt', function(data) {
    words = data;
    initializeGame();
  });
}

function initializeGame() {
  createCanvas(500, 600);
  word = random(words).trim(); // Ensure word is trimmed of whitespace
  console.log(word);
  for (var i = 0; i < word.length; i++) {
    wordArr[i] = word.charAt(i);
  }
  drawBoard();
}

function drawBoard() {
  background(220);
  stroke(0);
  strokeWeight(4);
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 5; j++) {
      fill(255);
      rect(100 * j + 5, 100 * i + 5, 90, 90);
    }
  }
}

function draw() {
  // Drawing handled in keyPressed and setupCanvas
}

function keyPressed(){
  if(keyCode === BACKSPACE && selCol > 0){
    selCol--;
    selWord.pop(); // Use pop to remove the last element
    fill(255)
    redrawSquare(selCol, selRow, ' ');
  }
  else if(keyCode === ENTER){
    if(selCol === 5 && words.includes(selWord.join("").toLowerCase())){
      processGuess();
    }
  }
  else if(validChars.includes(key.toLowerCase())){ // Check against lowercase
    if(selCol < 5){
      selWord[selCol] = key.toUpperCase();
      fill(255)
      redrawSquare(selCol, selRow, key.toUpperCase());
      selCol++;
    }
  }
}

function redrawSquare(col, row, letter) {
  rect(100*col+5, 100*row+5, 90, 90);
  fill(0);
  textSize(size);
  text(letter, 100*col+22.5, 100*row+size);
}

function processGuess() {
  let checkArr = [...wordArr];
  let colored = [...wordArr];
  let guess = selWord.join("").toLowerCase();

  // First pass: Check for correct positions (green)
  for(let i = 0; i < 5; i++){
    if(guess[i] === wordArr[i]){
      fill(0, 255, 0); // Green
      redrawSquare(i, selRow, selWord[i]);
      checkArr[i] = null; // Mark as checked
      colored[i]=null;
      selWord[i] = null;
    }
  }

  // Second pass: Check for correct letters in wrong positions (yellow)
  for(let i = 0; i < 5; i++){
    if(selWord[i] !== null && checkArr.includes(guess[i])){
      fill(255, 255, 0); // Yellow
      redrawSquare(i, selRow, selWord[i]);
      let index = checkArr.indexOf(guess[i]);
      checkArr[index] = null; // Mark as checked
      colored[i]=null;
    }
  }
  
  for(let i = 0; i < 5; i++){
    if(colored[i] != null){
      fill(200, 200, 200); // Grey
      redrawSquare(i, selRow, selWord[i]);
    }
  }

  if(guess === word){
    console.log("You Win");
  }

  selWord = [];
  selRow++;
  selCol = 0;
}
