var randomNumber = 0;

var startNewGame = document.getElementById("startNewGame");

var levA = document.getElementById("levA");

var levB = document.getElementById("levB");

var levC = document.getElementById("levC");

var levels = [levA, levB, levC];

var levelText = "";

var typeName = document.querySelector("input[type='text']");

var typeNameValue = "";

var yourName = document.getElementById("yourName");

var guessValue = document.getElementById("guessValue");

var scoreValue = document.getElementById("scoreValue");

var submit = document.getElementById("submit");

var allNum = document.getElementById("allNum");

var lastNum = document.getElementById("lastNum")

var tip = document.getElementById("tip");

var scoreNum = 0;

var scoreMax = 0;

var wrongNum = 0

var sumOfWrongNums = 0;

var count = 0;


startNewGame.addEventListener("click", startGame);
function startGame() {
    allNum.textContent = "";
    guessValue.focus();
    document.querySelector("html").style.backgroundColor = "white";
    if (levA.checked == true) {
        levelText = "level A [1 - 100 num]";
        randomNumber = Math.round(1 - 0.5 + Math.random() * (100 - 1 + 1))
        scoreMax = 100;
        wrongNum = 10;
        
    }
    else if (levB.checked == true) {
        levelText = "level B [1 - 500 num]";
        randomNumber = Math.round(1 - 0.5 + Math.random() * (500 - 1 + 1));
        scoreMax = 500;
        wrongNum = 50;
    }
    else {
        levelText = "level C [1 - 1000 num]";
        randomNumber = Math.round(1 - 0.5 + Math.random() * (1000 - 1 + 1));
        scoreMax = 1000;
        wrongNum = 100;
    }
    guessValue.style.background = "linear-gradient(160deg, red, blue)";
    guessValue.disabled = false;
    guessValue.style.cursor = "vertical-text";
    submit.disabled = false;
    submit.style.cursor = "pointer";
    typeNameValue = typeName.value;
    localStorage.nameSet = typeNameValue;
    yourName.textContent = typeNameValue + " " + levelText;
    scoreValue.textContent = scoreNum;
    typeName.style.visibility = "hidden";
}
if (!localStorage.getItem("nameSet")) {
    localStorage.nameSet = typeNameValue;
    yourName.textContent = typeNameValue + " " + levelText;
    typeName.value = "";
    } 
else {
    var storedName = localStorage.getItem("nameSet");
    yourName.textContent = storedName + " " + levelText;
    }


submit.addEventListener("click", submitGuess);

function submitGuess() {
    var colors = ["red", "blue", "green", "brown", "orange", "yellow"];
    var randColor = Math.floor(Math.random() * colors.length);
    if (+guessValue.value === randomNumber) {
        document.querySelector("html").style.backgroundColor = "white";
        let numSpan = document.createElement("span");
        numSpan.textContent = guessValue.value + " ";
        numSpan.style.border = "0.5vw outset";
        numSpan.style.borderColor = colors[randColor];
        numSpan.style.marginLeft = "0.6vw";
        numSpan.style.borderRadius = "50%";
        numSpan.style.padding = "1vw";
        numSpan.style.fontSize = "1.5vw";
        allNum.appendChild(numSpan);
        lastNum.textContent = "Right! Congratulations, You Win!";
        lastNum.style.backgroundColor = "darkgreen";
        lastNum.style.color = "white";
        scoreMax -= sumOfWrongNums;
        scoreNum += scoreMax;
        localStorage.scoreSet = +scoreValue.textContent + scoreNum;
        scoreValue.textContent = +scoreValue.textContent + scoreNum;
        guessValue.style.background = "linear-gradient(181deg, #a81010, #ebd747)";
        guessValue.disabled = true;
        guessValue.style.cursor = "none";
        submit.disabled = true;
        submit.style.cursor = "default";
        tip.textContent = "";
        guessValue.value = "";
        count = 0;
    }
    else {
        let guessNum = +guessValue.value;
        let numSpan = document.createElement("span");
        numSpan.textContent = guessValue.value + " ";
        numSpan.style.border = "0.5vw outset";
        numSpan.style.borderColor = colors[randColor];
        numSpan.style.marginLeft = "0.6vw";
        numSpan.style.borderRadius = "50%";
        numSpan.style.padding = "1vw";
        numSpan.style.fontSize = "1.5vw";
        allNum.appendChild(numSpan);
        lastNum.textContent = "Wrong";
        lastNum.style.backgroundColor = "red";
        lastNum.style.color = "white";
        sumOfWrongNums += wrongNum;
        guessValue.value = "";
        ++count;
        guessValue.focus();
        if (+guessNum > randomNumber) {
            tip.textContent = "Last guess was too high!";
        }
        else {
            tip.textContent = "Last guess was too low!";
        }
        if (count > 7) {
            document.querySelector("html").style.backgroundColor = "gold";
        }
        if (count === 10) {
            lastNum.textContent = "Game Over...";
            guessValue.style.background = "linear-gradient(181deg, #a81010, #ebd747)";
            guessValue.disabled = true;
            guessValue.style.cursor = "none";
            submit.disabled = true;
            submit.style.cursor = "default";
            tip.textContent = "";
            guessValue.value = "";
            document.querySelector("html").style.backgroundColor = "red";
            count = 0;
        }
    }
}
if (!localStorage.getItem("scoreSet")) {
    localStorage.scoreSet = +scoreValue.textContent + scoreNum;
    scoreValue.textContent = +scoreValue.textContent + scoreNum;
}
else {
    var storedScore = localStorage.getItem("scoreSet");
     scoreValue.textContent = storedScore;
}