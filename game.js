var buttonColours = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern = [];
started = false;
level = 0;

$("body").keypress(function(){
  if (!started) {
    $("#level-title").text("Press a Kry to Start");
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var musicPlay = new Audio("sounds/"+name+".mp3");
  musicPlay.play();
  animatePress(name);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
      $("#"+currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Start Over");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
