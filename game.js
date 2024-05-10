var buttonsColours = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []


var started = false;
var level = 0;


$(document).keypress(function () { 
    if (!started) {
        $("#level-title").text('Level ' + level)
        nextSequence();
        started = true;
        console.log(userClickedPattern.length);
    }
});


$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern.length);
    console.log(gamePattern.length);
    console.log(userClickedPattern);
    console.log(gamePattern);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success');

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong")
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $("#level-title").text('Game Over')
        startOver();
    }

}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("#level-title").text('Press Any Key to Start')

}

function nextSequence(){
    userClickedPattern = []

    level++;
    $("#level-title").text('Level ' + level)

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonsColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}