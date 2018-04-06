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
  if (num < 1 || num > 100 || isNaN(num)) {
    $('#title').css('background-color', 'red').text('That is an invalid guess.')
    return 'That is an invalid guess.'
  } else {
    this.playersGuess = num;
    return this.checkGuess();
  } 
}
Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    $('#hint, #submit').prop('disabled',true)
    $('#subtitle').text('Press the Reset button to play again!')
    return 'You Win!';
  } else if (this.pastGuesses.includes(this.playersGuess)) {
    return 'You have already guessed that number.';
  } else if (this.pastGuesses.length >= 5) {
    $('#hint, #submit').prop('disabled',true)
    $('#subtitle').text('Press the Reset button to play again!')
    $('#title').css('background-color', 'red')
    return 'You Lose.'
  } else {
      this.pastGuesses.push(this.playersGuess);

      $('#guess-lst li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);


      if (this.difference() < 10) {
        $('#title').css('background-color', 'green')
        return 'You\'re burning up!'
      } else if (this.difference() < 25) {
        $('#title').css('background-color', 'yellow')
          return 'You\'re lukewarm.';
      } else if (this.difference() < 50) {
          $('#title').css('background-color', 'grey')
          return 'You\'re a bit chilly.'
      } else if (this.difference() < 100) {
          $('#title').css('background-color', 'blue')
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

var keyPress; 

function getTheInput(instanceOfGame) {
  var guess = $('#player-input').val()
  $('#player-input').val('')

  var output = instanceOfGame.playersGuessSubmission(parseInt(guess,10));
  
  $('#title').text(output);
  if (instanceOfGame.isLower()) {
    $('#subtitle').text("Guess Higher!")
  } else {
    $('#subtitle').text("Guess Lower!")
  }
}

$(document).ready(function () { 
  var game = newGame(); // initialize the game; attach handlers to forms;

  $('#submit').click(function(){ 
    getTheInput(game);
  })

  keyPress = $('#player-input').keypress(function(key){
    if (key.which == 13) {
      getTheInput(game);
    }
  })

  $('#hint').click(function(){
    var hint = game.provideHint();
    $('#hint-area').text('One of them is a winning ' + hint)
    $('#hint').prop('disabled',true)
  })
}); 

$('#reset').click(function(){
  location.reload();
})


