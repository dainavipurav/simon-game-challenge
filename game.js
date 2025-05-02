// alert("Hello");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var currentLevel = 0;
var highScore = 0;

$(document).on("keydown", function () {
  if (started === false) {
    started = true;
    nextSequence();
  }
});

// Add click on exit text to exit from game
$(".exit").click(function () {
  $("#level-title").text("Press A Key to Start");
  if (level > highScore) {
    highScore = level - 1;
    $("#high-score").text(`High Score : ${highScore}`);
  }
  startOver();
});

// Add button click handlers to all the buttons
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  // Play sound
  playSound(userChosenColour);

  // Add animation
  animatePress(userChosenColour);

  // Add color in user clicked pattern (color sequence)
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  // To generate random number between 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Pick random color using random number
  var randomChosenColour = buttonColours[randomNumber];

  // Set animation to random chosen colored button
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  // playSound
  playSound(randomChosenColour);

  // Set sequence of game pattern
  gamePattern.push(randomChosenColour);

  console.log(gamePattern);

  // increment level
  level++;

  // update level in title
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).toggleClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).toggleClass("pressed");
  }, 100);
}

function gameOverAnimation() {
  $("body").toggleClass("game-over");
  setTimeout(function () {
    $("body").toggleClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  currentLevel = 0;
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("currentLevel" + currentLevel);
    if (level > highScore) {
      highScore = level - 1;
      $("#high-score").text(`High Score : ${highScore}`);
    }
    startOver();
    gameOverAnimation();
  }
}
