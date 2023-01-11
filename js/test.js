const question = document.getElementById('question');
question.style.fontSize = '18px';
const image = document.getElementById('image');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
let test = [];
fetch(
        '/animation/questions_1.json'
    )
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        // test = loadedQuestions.results.filter((data) => {
        //     let b = data.mode;
        //     if (b === 'difficile') {
        //         console.log(b, 'okkk');
        //     }
        //     if (b === 'normale') {
        //         console.log(b, 'o');
        //     }

        // });
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
                image: loadedQuestion.image,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 20;
// const INCORRECT_POINTS = -5;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/product.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;
    // image.innerHTML = `<img src="${currentQuestion.image}" alt="" width="100%" height="100px">`;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        const t = choice;
        choice.innerHTML = currentQuestion['choice' + number];
        choice.innerHTML = `<img src="${currentQuestion['choice' + number]}" alt="" width="100%" height="100px" >`;

        console.log(t);

    });
    // console.log(image.innerHTML);
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        console.log(selectedAnswer);

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        // incrementScore(INCORRECT_POINTS);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

// document.querySelector('body').addEventListener('contextmenu', disableRightClick);
// document.addEventListener('contextmenu', disableRightClick);

// function disableRightClick(e) {
//     e.preventDefault();
// }