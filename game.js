const buttonColours = ["red", "blue", "green", "yellow"];
let level;
let gamePattern;
let userClickedPattern;
let randomNumber;
let userChosenColour;

startOver();

function startOver() {
  setTimeout(function () {
    $("body, #start").removeClass("game-over");
  }, 200);

  level = 0;
  gamePattern = [];
  userClickedPattern = [];

  $(".btn-colour").addClass("unavailable");
  $("#start").click(startGame).removeClass("unavailable").text("START");
}

function nextSequence() {
  level++;
  $("#start").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);
  $("#" + randomChosenColour).fadeOut().fadeIn();
}

function startGame(event) {
  startOver();
  $(".btn-colour").removeClass("unavailable");
  animatePress("start");
  $("#start").off("click").addClass("unavailable").text("");
  // playSound("start");

  $(".btn-colour").click(function () {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
  });

  setTimeout(nextSequence, 1000);
}

function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body, #start").addClass("game-over");
    $(".btn-colour").off("click")
    startOver();
  }
}