function generateWinningNumber(){
  return Math.random() ? Math.ceil(Math.random()*100) : 1;
}

function shuffle(array){ 
  let c = array.length, r, t;
  while(c > 0) {
    r = Math.floor(Math.random() * c--);
    t = array[c];
    array[c] = array[r];
    array[r] = t;
  }
  return array;
}

var Game = function() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
}
Game.prototype.isLower = function(){
  return this.playersGuess < this.winningNumber ? true : false;
}
Game.prototype.playersGuessSubmission = function(num) {
  if (num < 1 || num > 100 || isNaN(num)) throw 'That is an invalid guess.'
  this.playersGuess = num;
  return this.checkGuess();
}
Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    return 'You Win!';
  } else if (this.pastGuesses.includes(this.playersGuess)) {
    return 'You have already guessed that number.';
  } else if (this.pastGuesses.length >= 4) {
    return 'You Lose.'
  } else {
    this.pastGuesses.push(this.playersGuess);
    if (this.difference() < 10) {
      return 'You\'re burning up!'
    } else if (this.difference() < 25) {
      return 'You\'re lukewarm.';
    } else if (this.difference() < 50) {
      return 'You\'re a bit chilly.'
    } else if (this.difference() < 100) {
      return 'You\'re ice cold!'
    }
  }
}

Game.prototype.provideHint = function() {
  let hintArr = [this.winningNumber];
  hintArr.push(generateWinningNumber(), generateWinningNumber())
  return shuffle(hintArr);
}

var newGame = function() {
  return new Game();
}

