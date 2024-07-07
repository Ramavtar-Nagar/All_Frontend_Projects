let score = 0;
let timer = 60;
let interval;
let questionData = {};

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const startRulesDiv = document.getElementById("start-rules");
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const endScreen = document.getElementById('endScreen');
const finalScoreElement = document.getElementById('finalScore');
const endMessage = document.getElementById('endMessage');

document.getElementById('startQuiz').addEventListener('click', function () {
    startRulesDiv.style.display = "none";
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    getQuestion();
    startTimer();
    updateScore();
});

document.getElementById('playAgain').addEventListener('click', function () {
    score = 0;
    timer = 60;
    quizScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');
    getQuestion();
    startTimer();
    updateScore();
});

async function getQuestion() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1');
        const data = await response.json();
        questionData = data.results[0];
        displayQuestion(questionData);
    } catch (error) {
        questionElement.textContent = "Failed to load question. Please try again.";
        answerButtons.forEach(button => button.textContent = "");
    }
}

function displayQuestion(data) {
    questionElement.innerHTML = data.question;
    const answers = [...data.incorrect_answers];
    const correctIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(correctIndex, 0, data.correct_answer);
    
    answerButtons.forEach((button, index) => {
        button.textContent = answers[index];
        button.onclick = function () {
            if (button.textContent === data.correct_answer) {
                correctAnswer();
            } else {
                wrongAnswer();
            }
            getQuestion();
        };
    });
}

function correctAnswer() {
    score += 10;
    updateScore();
}

function wrongAnswer() {
    // Optionally handle wrong answer
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function startTimer() {
    timerDisplay.textContent = `Time left: ${timer} seconds`;
    interval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `Time left: ${timer} seconds`;
        if (timer === 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreElement.textContent = `Your score: ${score}`;
    endMessage.textContent = `You scored ${score} points!`;
}
