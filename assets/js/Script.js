
const timeAlotted = 60;
const timeAlottedms = timeAlotted * 1000;
const oneSecond = 1000;


/**
 * Tracks which questions have been answered already
 */
var qTracker = [];

var shouldEnd = false;
var timeRemaining = timeAlotted;


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
 * ["QUESTION",[["ANSWER1", "ANSWER2", "ANSWER3", "ANSWER4"], CORRECTNUM]] | ["",[["", "", "", ""], ]]
 */
var gameQuestions = [
    ["Where do you put the JavaScript in an HTML file?",[["Top of Head", "Top of Body", "Bottom of Head", "Bottom of Body"], 4]],
    ["What can an array not hold?",[["numbers", "strings", "booleans", "Arrays can hold anything!"], 4]],
    ["What is the global scope for an HTML implementation of JS?",[["browser", "window", "slide", "this"], 2]],
    ["What color is brian's hair?",[["red", "green", "brown", "blonde"], 3]],
    ["How do we open the chrome dev console?",[["shift+alt+j", "alt+F4", "ctrl+i", "ctrl+shift+i"], 4]]
]

var highScoreList = [["EXA", 20], ["MPL", 15]]






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

var answerEl = document.createElement("ul");
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

var displayScore = document.createElement("h1");
displayScore.setAttribute("id", "score-display")

var initialsBox = document.createElement("textarea");
initialsBox.setAttribute("id", "initials-area");
initialsBox.setAttribute("placeholder", "Initials Here");
initialsBox.setAttribute("maxlength", "3");

var submitButton = document.createElement("button");
submitButton.setAttribute("id", "submit-button");
submitButton.innerHTML = "SUBMIT SCORE";

postGameEl.appendChild(displayScore);
postGameEl.appendChild(initialsBox);
postGameEl.appendChild(submitButton);
/** END OF POST GAME SCREEN CREATION */

/** Create Score List Screen */
var scoreListEl = document.createElement("div");
scoreListEl.setAttribute("id", "score-list");






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
/**function submitHighScore(hs) {
    highScoreList.concat(hs);
}*/
function submitHighScore() {
    var newHS = [[initialsBox.value, parseInt(displayScore.innerHTML)]];
    highScoreList = highScoreList.concat(newHS);
    displayScoreList();

}

/** 
 * @param {HTMLElement} element Element to toggle on or off.
 */
function toggleHide(element, bool) {

    //console.log(element.getAttribute("style"));

    if(bool){

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
    console.log(qTracker);

}

/**
 * 
 * @param {number} score Score to be passed through to submittal screen
 */
function endGame(score){


    displayScore.innerHTML = score;
    gameEl.replaceWith(postGameEl);

}

function displayScoreList() {

    var superListEl = document.createElement("ul");
    superListEl.setAttribute("id", "super-score-list");
    scoreListEl.appendChild(superListEl);

    for(var i = 0; i<highScoreList.length; i++){
        var scoreset =  document.createElement("li");
        var scoresetList =  document.createElement("ul");
        scoreset.appendChild(scoresetList);
        scoreListEl.appendChild(scoreset);
        for(var j = 0; j<2;j++){
            var scoreData =  document.createElement("li");
            scoreData.innerHTML = highScoreList[i][j]
            scoresetList.appendChild(scoreData);
        }
    }


    var playButton = document.createElement("button");
    playButton.setAttribute("id", "play-button");
    playButton.innerHTML = "play again?"
    playButton.addEventListener("click", function(){
        contentSpace.innerHTML = "";
        scoreListEl.innerHTML = "";
        shouldEnd = false;
        game();
    })
    scoreListEl.appendChild(playButton);

    postGameEl.replaceWith(scoreListEl);
}

/**
 * 
 * @param {number} limit 
 */
function randomInt(limit) {
    return Math.floor(Math.random() * limit);
}




function checkAnswer1(){
    if(gameQuestions[qTracker[qTracker.length - 1]][1][1] === 1){
        var loop = true;
        console.log("correct answer");
        if(qTracker.length === gameQuestions.length){shouldEnd = true;}else{
        while(loop){
            var x = randomInt(gameQuestions.length);
            if(!qTracker.includes(x)){
                setGameQuestion(x);
                loop = false;
            }
        }}
    }else{
        timeRemaining -= 5;
        setTimerElement(timeRemaining);
    }
}
function checkAnswer2(){
    if(gameQuestions[qTracker[qTracker.length - 1]][1][1] === 2){
        var loop = true;
        console.log("correct answer");
        if(qTracker.length === gameQuestions.length){shouldEnd = true;}else{
        while(loop){
            var x = randomInt(gameQuestions.length);
            if(!qTracker.includes(x)){
                setGameQuestion(x);
                loop = false;
            }
        }}
    }else{
        timeRemaining -= 5;
        setTimerElement(timeRemaining);
    }
}
function checkAnswer3(){
    if(gameQuestions[qTracker[qTracker.length - 1]][1][1] === 3){
        var loop = true;
        console.log("correct answer");
        if(qTracker.length === gameQuestions.length){shouldEnd = true;}else{
        while(loop){
            var x = randomInt(gameQuestions.length);
            if(!qTracker.includes(x)){
                setGameQuestion(x);
                loop = false;
            }
        }}
    }else{
        timeRemaining -= 5;
        setTimerElement(timeRemaining);
    }
}
function checkAnswer4(){
    if(gameQuestions[qTracker[qTracker.length - 1]][1][1] === 4){
        var loop = true;
        console.log("correct answer");
        if(qTracker.length === gameQuestions.length){shouldEnd = true;}else{
        while(loop){
            var x = randomInt(gameQuestions.length);
            if(!qTracker.includes(x)){
                setGameQuestion(x);
                loop = false;
            }
        }}
    }else{
        timeRemaining -= 5;
        setTimerElement(timeRemaining);
    }
}


answer1.addEventListener("click", checkAnswer1);
answer2.addEventListener("click", checkAnswer2);
answer3.addEventListener("click", checkAnswer3);
answer4.addEventListener("click", checkAnswer4);

submitButton.addEventListener("click", submitHighScore);



function game() {

    // reset the game state
    timeRemaining = timeAlotted;
    qTracker = [];

    contentSpace.appendChild(gameEl)

    setTimerElement(timeRemaining);
    toggleHide(timerElement, true);

    setGameQuestion(randomInt(gameQuestions.length));

    var gameInterval = setInterval(function(){

        if (timeRemaining > 0) {

            timeRemaining--;
            setTimerElement(timeRemaining);

        }else{

            clearInterval(gameInterval);
            alert("Time's Up!");
            toggleHide(timerElement, false);
            endGame(0);

        }

    }, oneSecond);

    var gamePlayInterval = setInterval(function(){
        if(qTracker.length === gameQuestions.length && shouldEnd){
            alert("All Done!");
            clearInterval(gamePlayInterval);
            clearInterval(gameInterval);
            toggleHide(timerElement, false);
            endGame(timeRemaining);

        }        
    }, 20);






}






game();