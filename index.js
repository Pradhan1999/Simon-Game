var buttonColours = ["red", "blue", "green", "yellow"],
gamePattern = [],
userClickedPattern = [],
started = false,
level = 0;


//______user on keypress______
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence(); //call nextSequence function()
    started = true;
  }
});

//_______user on click________
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//______change pattern and checks user pattern is correct/wrong_______
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  makeSound(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }

//_________sound____________
function makeSound(name) {
  var audio1 = new Audio("sounds/" + name + ".mp3");
  audio1.play();
}

//______animate button_______
function animatePress(currentColour) {
  var btn = "#" + currentColour;
  $(btn).addClass("pressed");
  setTimeout(() => {
    $(btn).removeClass("pressed");
  }, 100);
}

  
