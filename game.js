// alert("Hello");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function () {
  if (started === false) {
    started = true;
    nextSequence();
  }
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
  }, 100);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
}
