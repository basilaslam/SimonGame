var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false
$("h1").before("<input></input>")

$("input").css("background-color", "#011F3F")


$(document).keypress(()=>{
    if (!started){
    $("#level-title").text("Level "+level)
    nextSequence()
    started = true
}
})


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1)

});


function nextSequence() {
  userClickedPattern = []
    level++;

    $("#level-title").text("Level "+ level)


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(randomChosenColour);
}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

animatePress= (currentColor) => {
    $("#"+currentColor).addClass("pressed")
    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed")

    },100)
}

checkAnswer=(currentLevel)=> {
  console.log(gamePattern[currentLevel] , userClickedPattern[currentLevel])
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    

    if (gamePattern.length === userClickedPattern.length){
      console.log("success")
      setTimeout(()=>{
        nextSequence()
      },1000)
    }
}else{



  $("body").addClass("game-over")
  $("#level-title").text("Press A Key to Restart")
  setTimeout(()=>{
    $("body").removeClass("game-over")
  },200)
  startOver()
  console.log("wrong")
}

}

startOver= () => {
  level = 0;
  gamePattern = []
  started = false
}


