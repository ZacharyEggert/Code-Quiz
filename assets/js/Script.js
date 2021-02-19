
const timeAlotted = 10;
const timeAlottedms = timeAlotted * 1000;
const oneSecond = 1000;


/**
 * Tracks which questions have been answered already
 */
var qTracker = [];


//class definitions
class highScore {
    /** 
    * @param {string} pName Player's initials.
    * @param {number} pScore Player's score.
    * */
    constructor(pName, pScore) {

        this.playerName = pName;
        this.score = pScore;

    }
}



//arrays for game questions
/**
 * ["QUESTION",[["ANSWER1", "ANSWER2", "ANSWER3", "ANSWER4"], CORRECTNUM]]
 */
var gameQuestions = [
    ["Where do you put the JavaScript in an HTML file?",[["Top of Head", "Top of Body", "Bottom of Head", "Bottom of Body"], 4]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
    ["",[["", "", "", ""], ]],
]

var highScoreList = [new highScore("EXA", 20), new highScore("MPL", 15)]






var contentSpace = document.getElementById("content");
var highScoreElement = document.getElementById("highscores");
var timerElement = document.getElementById("timer");



/**
 * Create Game Screen
 */
var gameEl = document.createElement("div");
gameEl.setAttribute("id", "game");

var questionEl = document.createElement("h3");
questionEl.setAttribute("id", "question");

var answerEl = document.createElement("ol");
answerEl.setAttribute("id", "answers");

var answer1 = document.createElement("li");
var answer2 = document.createElement("li");
var answer3 = document.createElement("li");
var answer4 = document.createElement("li");

answerEl.appendChild(answer1);
answerEl.appendChild(answer2);
answerEl.appendChild(answer3);
answerEl.appendChild(answer4);

gameEl.appendChild(questionEl);
gameEl.appendChild(answerEl);
/** END OF GAME SCREEN CREATION */

/** Create Post Game Screen */
var postGameEl = document.createElement("div");
postGameEl.setAttribute("id", "post-game");





/** END OF POST GAME SCREEN CREATION */







/**
 * @param {number} time Time remaining.
 */
function setTimerElement(time) {
    if(time>1){
        timerElement.innerHTML = `Time: ${time} seconds`
    }else{
        timerElement.innerHTML = `Time: ${time} second`
    }
}

/**
 *  @param {highScore} hs Highscore to add to list.
 */
function submitHighScore(hs) {
    highScoreList.concat(hs);
}

/** 
 * @param {HTMLElement} element Element to toggle on or off.
 */
function toggleHide(element) {

    //console.log(element.getAttribute("style"));

    if(element.getAttribute("style") == "display: none;"){

        element.setAttribute("style", "display:inline-block;");
        //console.log(`element ${element.tagName} unhidden`);
        
    }else{

        element.setAttribute("style", "display:none;");
       // console.log(`element ${element.tagName} hidden`);

    }
}


/**
 * 
 * @param {number} qNum Number of the question to be implanted into page.
 */
function setGameQuestion(qNum) {

    questionEl.innerHTML = gameQuestions[qNum][0];
    answer1.innerHTML = gameQuestions[qNum][1][0][0];
    answer2.innerHTML = gameQuestions[qNum][1][0][1];
    answer3.innerHTML = gameQuestions[qNum][1][0][2];
    answer4.innerHTML = gameQuestions[qNum][1][0][3];
    qTracker += qNum;

}

/**
 * 
 * @param {number} score Score to be passed through to submittal screen
 */
function endGame(score){


    console.log("score: "+ score);
    console.log("this will switch the screen to something else")
    console.log("Game Ended")
}








function game() {

    // reset the game state
    var timeRemaining = timeAlotted;
    var score = 0;
    qTracker = [];

    contentSpace.appendChild(gameEl)

    setTimerElement(timeRemaining);
    toggleHide(timerElement);

    setGameQuestion(0);
    console.log(qTracker);

    var gameInterval = setInterval(function(){

        if (timeRemaining > 0) {

            timeRemaining--;
            setTimerElement(timeRemaining);

        }else{

            clearInterval(gameInterval);
            alert("Time's Up!");
            toggleHide(timerElement);
            endGame(score);

        }

        if(qTracker.length === gameQuestions.length){
            clearInterval(gameInterval);
            alert("All Done!");
            toggleHide(timerElement);
            endGame(score+10);
        }
    }, oneSecond);

    






}






game();