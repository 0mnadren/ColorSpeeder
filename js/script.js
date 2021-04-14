const COLORS = ["WHITE", "BLACK", "RED", "PINK", "BLUE", "GREEN", "YELLOW", "ORANGE", "GREY", "BROWN", "PURPLE"];

let timer = 60;
let timerInterval = null;
let headerInterval = null;
let containerInterval = null;
var totalScored = 0;
let score = 0;
let errors = 0;
const audio_score = new Audio('../audio/score_sound.wav');
const audio_error = new Audio('../audio/error_sound.wav');

var userName = null;
var userScore = null;
var userNameArray = [
    {
        userName: '_',
        userScore: '_'
    }
];
const myStorage = window.localStorage;


// ONLOAD loads data from localStorage into userNameArray
window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('username') != null) {
        userNameArray = JSON.parse(localStorage.getItem('username'));
        console.log(userNameArray);
    }      
});


// This func pick random color from the list COLORS
function wordRandomChoicer(COLORS) {
    let randomNumber = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomNumber];
}


function putRandomColor() {
    
    // Put the random color word
    let color_word = wordRandomChoicer(COLORS);
    document.getElementById('colorPlaceholder').innerHTML = color_word;
    
    // Change color to the word
    let color_color = wordRandomChoicer(COLORS);
    document.getElementById('colorPlaceholder').style.color = color_color;

    return color_color.toLowerCase();
}


// Picks player's input
function playerChoice() {
    let playerColor = (document.getElementById('playersColor').value).toLowerCase();

    document.getElementById('playersColor').value = "";

    return playerColor;
}


const input = document.getElementById('playersColor');
// Test for Enter and change color
let randomColor = putRandomColor();
let playerColor = null;
input.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        playerColor = playerChoice();
    }
});

// Check if the random color is the same as player's input
input.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        console.log(playerColor, randomColor);
        if (randomColor === playerColor) {
            scorePoint();
            randomColor = putRandomColor();
        } else {
            errorPoints();
            randomColor = putRandomColor();
        }
    }
});




// Takes 1 from timer and do conditions with the time
function tick() {
    timer --;
    document.getElementById('timer').innerHTML = timer;
    // Stop the game if timer == 0
    if (timer == 0) {
        disableEverything();

        totalScored = score;
        stopGame();
        setTimeout(alert('You scored: ' + totalScored + ' points!'), 1000);

        storeDataGame();
    }

    if (timer == 45) {
        clearInterval(headerInterval);
        headerInterval = setInterval(changeHeader, 1000);
    } else if (timer == 30 && containerInterval == null) {
        containerInterval = setInterval(changeContainer, 2500);
    } else if (timer == 20) {
        clearInterval(containerInterval);
        containerInterval = setInterval(changeContainer, 2000);
    } else if (timer == 13) {
        clearInterval(containerInterval);
        containerInterval = setInterval(changeContainer, 1300);
    }
}


// Starts the timer with tick every second
function time() {
    if (timerInterval == null && headerInterval == null) {
        input.focus();
        timerInterval = setInterval(tick, 1000);
        headerInterval = setInterval(changeHeader, 2000);
    } else {
        console.log('Vec je pokrenut')
    }   
}

// Add 1 point
function scorePoint() {
    audio_score.play();
    score ++;
    document.getElementById('score').innerHTML = score;

}

// Add 1 error and if errors == 3 stops the game
function errorPoints() {
    audio_error.play();
    errors ++;
    document.getElementById('errors').innerHTML = errors;
    if (errors == 3) {
        disableEverything();

        totalScored = score;
        stopGame();
        setTimeout(alert('You scored: ' + totalScored + ' points!'), 1000);

        storeDataGame();
    }
}


function disableEverything() {
    document.getElementById('playersColor').value = "";
    document.getElementById('colorPlaceholder').disabled = true;
    document.getElementById('playersColor').disabled = true;
}


function enableEverything() {
    document.getElementById('playersColor').value = "";
    document.getElementById('colorPlaceholder').disabled = false;
    document.getElementById('playersColor').disabled = false;
}


function hideStartButton() {
    document.getElementById('start').style.visibility = 'hidden';
}


// Stops the game and restarts everything
function stopGame() {
    clearInterval(timerInterval);
    timerInterval = null;
    clearInterval(headerInterval);
    headerInterval = null;
    clearInterval(containerInterval);
    containerInterval = null;

    document.getElementById('headerColor').style.color = 'black';
    document.getElementById('container').style.backgroundImage = 'linear-gradient(to right, #fff , rgb(185, 180, 180))';
    
    timer = 60;
    errors = 0;
    score = 0;

    document.getElementById('score').innerHTML = score;
    document.getElementById('timer').innerHTML = timer;
    document.getElementById('errors').innerHTML = errors;
}


// Generates random Color
function makeRandomColor() {
    
    let letters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

// Changes color of Header
function changeHeader() {
    let headerColor = makeRandomColor();
    document.getElementById('headerColor').style.color = headerColor;
}

// Changes background-color of Container
function changeContainer() {
    let containerColor = makeRandomColor();
    document.getElementById('container').style.backgroundImage = 'none';
    document.getElementById('container').style.backgroundColor = containerColor;
}



// Save Data to localStorage
function storeDataGame() {

    let userNameName = prompt('To save your score type your name: ');
    if (userNameName == '' || userNameName == null) {
        return;
    } else {
        userNameArray.push(
            {
                userName: userNameName,
                userScore: totalScored
            }
        );

        myStorage.setItem('username', JSON.stringify(userNameArray));
        console.log(myStorage.getItem('username'));

        // Send user to score_board page
        location.href = 'score_board.html';
    }
 }







