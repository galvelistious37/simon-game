
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let randomNumber;
let randomChosenColor;
let level = 1;

function getRandomNumber(){
    return Math.floor(Math.random() * 4);
}

function nextSequence(){
    setHeader();
    randomNumber = getRandomNumber();
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(buttonColors[randomNumber]);
    let i = 0;
    playBack(i);
    level++;
}

playBack = function(i){
    if(i < gamePattern.length){
        buttonAnimation(gamePattern[i]);
        playSound(gamePattern[i]);
        setTimeout(function() {playBack(i + 1)}, 500);
    }
}

function buttonAnimation(color){
    $('#'+color).addClass("pressed");
    setTimeout(
        function(){
            $('#'+color).removeClass("pressed");
        }, 100);
}

function playSound(color){
    
    switch (color){
        case "red" :
            let redSound = new Audio("./sounds/red.mp3");
            redSound.play();
            break;
        case "blue" :
            let blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
            break;
        case "green" :
            let greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();
            break;
        case "yellow" :
            let yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();
            break;
        default :
            let wrongSound = new Audio("./sounds/wrong.mp3");
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
    if(level == 1){
        nextSequence();
    }
}

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
        level = 1;
        gamePattern.splice(0, gamePattern.length);
        userClickedPattern.splice(0, userChosenColor.length);
    }
})

$("#start").click(function(){
    initiate();
})




