
var hsLink = document.querySelector(".hs-link");
var playAgain = document.querySelector(".play-again");
var timerDisp = document.querySelector(".timer");

var startScreen = document.querySelector(".open-screen");
var startButton = startScreen.querySelector("h1");

var testScreen = document.querySelector(".test-screen");
var testQuestion = testScreen.querySelector("h2");
var testAnswerList = testScreen.querySelector("ul");

var scoreScreen = document.querySelector(".score-screen");
var scoreDisplay = scoreScreen.querySelector(".score-display");
var scoreInitials = scoreScreen.querySelector(".score-initials");
var scoreSubmitButton = scoreScreen.querySelector(".score-submit");

var hsScreen = document.querySelector(".hs-screen");
var hsListEl = document.querySelector(".hs-list");

const QUESTIONLIST = [
    ["Where do you put the JavaScript in an HTML file?",[["Top of Head", "Top of Body", "Bottom of Head", "Bottom of Body"], "Bottom of Body"]],
    ["What can an array not hold?",[["numbers", "strings", "booleans", "Arrays can hold anything!"], "Arrays can hold anything!"]],
    ["What is the global scope for an HTML implementation of JS?",[["browser", "window", "slide", "this"], "window"]],
    ["What color is brian's hair?",[["red", "green", "brown", "blonde"], "brown"]],
    ["How do we open the chrome dev console?",[["shift+alt+j", "alt+F4", "ctrl+i", "ctrl+shift+i"], "ctrl+shift+i"]],
    ["How many questions are necessary before I consider this done?",[["4", "6", "3", "9"], "6"]]
];
var questionsServed = [];
var questionActive;
var endMe = false


const TIMEALOTTED = 10;
var timeLeft;

var hsList = [["NAM", 15], ["XMP", 20]];

try {
    hsList = JSON.parse(localStorage.getItem("hsList"));
    if (hsList === null){
        hsList = [["NAM", 15], ["XMP", 20]];
    }
} catch (error) {}
/**  ---------------E-V-E-N-T---L-I-S-T-E-N-E-R-S---------------  */

/** HIGHSCORE PAGE LINK */
hsLink.addEventListener("click", function(){
    renderHS();
    switchScreen(hsScreen);
    
});
//Click Me Button
startButton.addEventListener("click", function(){
    switchScreen(testScreen);
    runGame();
})
//Play Button
playAgain.addEventListener("click", function(){
    switchScreen(testScreen);
    runGame();
})
//Game Buttons
for(var i = 0; i < 4; i++){

    testAnswerList.querySelectorAll("button")[i].addEventListener("click", function(e){
        if (e.target.textContent === QUESTIONLIST[questionActive][1][1]) {
            newQuestion();
        }else{
            timeLeft -= 3;
            timerDisp.innerHTML = timeLeft;
        }
    })
}

scoreSubmitButton.addEventListener("click", function(event){
    event.preventDefault();
    hsListS = hsList.concat([[scoreInitials.value.toUpperCase(), timeLeft]])
    hsList = hsListS;
    localStorage.setItem("hsList", JSON.stringify(hsList));
    renderHS();
    switchScreen(hsScreen);
})

/**  ---------------------F-U-N-C-T-I-O-N-S---------------------  */

function renderHS(){

    hsListEl.innerHTML = "";

    for (var i = 0; i < hsList.length; i++) {
        var activeLi = document.createElement("li");
        var activeUl = document.createElement("ul");
        activeUl.setAttribute("class", "horiz");

        for (var j = 0; j < hsList[i].length; j++) {
            var scoreData = document.createElement("li");
            scoreData.setAttribute("class", "horiz")
            scoreData.textContent = hsList[i][j];
            activeUl.appendChild(scoreData);
        }
        activeLi.appendChild(activeUl);
        hsListEl.appendChild(activeLi);
    }
    playAgain.setAttribute("style", "display: inline;")
}

function renderScore(){
    scoreDisplay.innerHTML = "YOU SCORED " + timeLeft;
}

function newQuestion(){
    if (questionsServed.length === QUESTIONLIST.length) {
        // clearInterval(timerInterval);
        endMe = true;
        renderScore();
        timerDisp.setAttribute("style", "display: none;")
        switchScreen(scoreScreen);
    }else{
        var qnum = Math.floor(Math.random() * QUESTIONLIST.length);
        while(questionsServed.includes(qnum)){
            qnum = Math.floor(Math.random() * QUESTIONLIST.length);
        }
        questionActive = qnum;
        questionsServed = questionsServed.concat([qnum]);

        testQuestion.innerHTML = QUESTIONLIST[questionActive][0];
        for (var i = 0; i < 4; i++) {
            testAnswerList.querySelectorAll("button")[i].textContent = QUESTIONLIST[questionActive][1][0][i];
            
        }
    }
}


function switchScreen(screen){
    startScreen.setAttribute("style", "display: none;")
    testScreen.setAttribute("style", "display: none;")
    scoreScreen.setAttribute("style", "display: none;")
    hsScreen.setAttribute("style", "display: none;")
    screen.setAttribute("style", "display: block;")
}


function submitHighScore() {
    var newHS = [[initialsBox.value, parseInt(displayScore.innerHTML)]];
    highScoreList = highScoreList.concat(newHS);
}

/**  -----------------------------------------------------------  */


function runGame() {

    questionsServed = []
    playAgain.setAttribute("style", "display: none;")
    timeLeft = TIMEALOTTED;
    timerDisp.innerHTML = timeLeft;
    timerDisp.setAttribute("style", "")
    endMe = false;
    

    var timerInterval = setInterval(function(){

        if (endMe) {
            clearInterval(timerInterval);
        }else if (timeLeft > 0) {
            timeLeft--;
            timerDisp.innerHTML = timeLeft;
        }else{
            clearInterval(timerInterval);
            alert("OUT OF TIME");
            timerDisp.setAttribute("style", "display: none;")
        }


    }, 1000)

    newQuestion()

}