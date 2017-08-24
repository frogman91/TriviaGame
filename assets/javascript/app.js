var startScreen;
var gameHTML;
var counter = 15;
var questionCounter = 0;
var selecterAnswer;
var theClock;
var right = 0;
var wrong = 0;
var notAnswered = 0;
var questionArray = [
    "How many pokemon can Eevee currently evolve into?", "How many Pokemon types currently exist?",
    "Which Pokemon type has the SECOND least amount of Pokemon? (Note - this included Mega Pokemon and separate forms as their own individual Pokemon)?", 
    "If there was a hypothetical Pokemon that was all 18 types at once, it would only be weak to one Pokemon type. Which type would it be weak to?", 
    "How many non-legendary Pokemon cannot evolve? (Note - mega evolution's do not count)",
    "Which generation of Pokemon has the most Pokemon with mega evolution's?", 
    "Which of these abilities does not double the Pokemon's attack stat?", 
    "How many Pokemon have branch evolution's?",
    "Fire resists Grass and is super effective against Grass, Water resists Fire and is super effective against Fire, and Grass resists Water and is super effective against Water. In other words they make a 'type triangle'. Which other trio of Pokemon share the same relationship?",
    "Which Pokemon was the first Pokemon ever created?"
];

var imageArray = ["<img class='center-block img-right imgResize' src='assets/images/eeveelutions.png'>", 
"<img class='center-block img-right imgResize' src='assets/images/types.png'>", 
"<img class='center-block img-right imgResize' src='assets/images/ice.png'>",
"<img class='center-block img-right imgResize' src='assets/images/rock.png'>", 
"<img class='center-block img-right imgResize' src='assets/images/not-evolve.png'>", 
"<img class='center-block img-right imgResize' src='assets/images/megas.png'>",
"<img class='center-block img-right imgResize' src='assets/images/sheerpower.png'>",
"<img class='center-block img-right imgResize' src='assets/images/evolution.png'>",
"<img class='center-block img-right imgResize' src='assets/images/typewin.png'>",
"<img class='center-block img-right imgResize' src='assets/images/rhydon.png'>"
];

var answerArray = [
    ["8", "9", "7", "6"],
    ["17", "19", "18", "16"],
    ["Ghost", "Dragon", "Ice", "Fairy"],
    ["Rock", "Dark", "Flying", "Ice"],
    ["57", "71", "61", "65"],
    ["Generation 2", "Generation 3", "Generation 4", "Generation 1"],
    ["Huge Power", "Pure Power", "Sheer Power", "Power Power"],
    ["12", "8", "9", "10"],
    ["Dark, Psychic, Fighting", "Steel, Fairy, Fighting", "Fire, Ice, Ground", "Rock, Flying, Fighting"],
    ["Bulbasaur", "Mew", "Pikachu", "Rhydon"]
];

var correctAnswers = ["A. 8", "C. 18", "C. Ice", "A. Rock", "C. 61", "B. Generation 3", "C. Sheer Power", "D. 10", "D. Rock, Flying, Fighting", "D. Rhydon"];


$(document).ready(function() {
    // Create a function that creates the start button and initial screen

    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    $("body").on("click", ".start-button", function(event) {
        generateHTML();
        timerFunc();
    });

    $("body").on("click", ".answer", function(event) {
        //answeredQuestion = true
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            answerRight();
        } else {
            clearInterval(theClock);
            answerWrong();
        }
    }); 

    $("body").on("click", ".reset-button", function(event) {
        reset();
    });

});

function answerWrongTimeOut() {
    notAnswered++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong imgResize' src='assets/images/wrong.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000); 
}

function answerRight() {
    right++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000); 
}

function answerWrong() {
    wrong++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong imgResize' src='assets/images/wrong.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000); 
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

function wait() {
    if (questionCounter < questionArray.length-1) {
        questionCounter++;
        generateHTML();
        counter = 15;
        timerFunc();
    } else {
        endSlide();
    }
}

function timerFunc() {
    theClock = setInterval(setTime, 1000);

    function setTime() {
        if (counter === 0) {
            clearInterval(theClock);
            answerWrongTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function endSlide() {
    gameHTML = "<p class='text-center'>All done, how did you do?!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + right + "</p>" + "<p>Wrong Answers: " + wrong + "</p>" + "<p>Unanswered: " + notAnswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
}

function reset() {
    questionCounter = 0;
    right = 0;
    wrong = 0;
    notAnswered = 0;
    counter = 15;
    generateHTML();
    timerFunc();
}

