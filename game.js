
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let redSound;
let blueSound;
let greenSound;
let yellowSound;
let wrongSound;
let randomNumber;
let randomChosenColor;
let level = 0;

function setSounds(){
    redSound = new Audio("./sounds/red.mp3");
    blueSound = new Audio("./sounds/blue.mp3");
    greenSound = new Audio("./sounds/green.mp3");
    yellowSound = new Audio("./sounds/yellow.mp3");
    wrongSound = new Audio("./sounds/wrong.mp3");
}

function getRandomNumber(){
    return Math.floor(Math.random() * 4);
}

function nextSequence(){
    setHeader();
    randomNumber = getRandomNumber();
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(buttonColors[randomNumber]);
    buttonAnimation(randomChosenColor);
    playSound(randomChosenColor);
    level++;
}

function buttonAnimation(color){
    // $('#'+color).fadeOut().fadeIn();
    $('#'+color).addClass("pressed");
    setTimeout(
        function(){
            $('#'+color).removeClass("pressed");
        }, 100);
}

function playSound(color){
    switch (color){
        case "red" :
            redSound.play();
            break;
        case "blue" :
            blueSound.play();
            break;
        case "green" :
            greenSound.play();
            break;
        case "yellow" :
            yellowSound.play();
            break;
        default :
            wrongSound.play();
    }
}

function setHeader(){
    $("h1").text("Level " + level);
}

function isCorrect(){
    let index = userClickedPattern.length - 1;
    return userClickedPattern[index] == gamePattern[index];
}

function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(
        function(){
            $("body").removeClass("game-over");
        }, 200);
}

function initiate(){
    if(level == 0){
        nextSequence();
    }
}

setSounds();

$(document).keypress(function(){
    initiate();
})

$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    if(isCorrect()){
        buttonAnimation(userChosenColor);
        playSound(userChosenColor);
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern.splice(0, userClickedPattern.length);
            setTimeout(function(){
                nextSequence();
            }, 1000);
        } 
    } else {
        gameOver();
        level = 0;
        gamePattern.splice(0, gamePattern.length);
        userClickedPattern.splice(0, userChosenColor.length);
    }
})

$("#start").click(function(){
    initiate();
})




