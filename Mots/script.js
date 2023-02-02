const options = {
    orange: "Elle est à la fois nom du couleur et du fruit",
    efootball: "Le nom du jeux de playstation chez Orange ",
    orangekalanso: "C'est une école gratuit chez Orange",
    agile: "Dans une entreprise, cette méthode est indispensable",
    bamako: "La capitale malienne ? ",
    inverse: "La différence entre le drapeau la Guinnée et du Mali",
    accra: "La capitale du Ghana est...",
    left: "guache en anglais",
    gracias: "Dit merci en Espagnol ",
    delete: "supprimer en anglais",
    machine: "On dit mon ordinateur ou ?",
};

//Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const scoreText = document.getElementById("score");
const scoreFinale = document.getElementById("scoreFinal");
const words = Object.keys(options);
let randomWord = "",
    randomHint = "";
let winCount = 0,
    lossCount = 0;
let count = 0;
let score = "";
//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
//Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};
//Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();

});
//Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};
//Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
    <span>Indice: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
    });
    //Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Restant: ${lossCount}</div>`;
    // userInpSection.innerHTML += `<div id='chanceCount1'>Score: ${score}</div>`;

    console.log(score);
};
//Initial Function
const init = () => {
    winCount = 0;
    count = 0;
    score = "";
    scoreFinale.innerHTML = "";
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //Character button onclick
        button.addEventListener("click", () => {
            message.innerText = `Bonne lettre`;
            message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");
            //If array contains clicked value replace the matched Dash with Letter
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //If character in array is same as clicked button
                    if (char === button.innerText) {
                        button.classList.add("correct");
                        //Replace dash with letter
                        inputSpace[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        score = count += 5;
                        scoreText.innerHTML = `Score: ${score}`;
                        //If winCount equals word length
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<img src="./assets/icone/gagner.png" alt=""  width="90px" height="90px">`;
                            console.log(score);
                            startBtn.innerText = "Commencer";
                            //block all buttons
                            blocker();
                            scoreFinale.innerHTML = `ScoreFinal : ${score}`;
                        }
                    }
                });
            } else {
                //lose count
                button.classList.add("incorrect");
                lossCount -= 1;
                score = count -= 2;
                scoreText.innerHTML = `Score: ${score}`;
                document.getElementById(
                    "chanceCount"
                ).innerText = `Restant: ${lossCount}`;
                message.innerText = `Mauvaise lettre`;
                message.style.color = "#ff0000";
                if (lossCount == 0) {
                    word.innerHTML = `<b style="color:white">Le mots est :</b> <span style="color:#b22c33">${randomWord}</span>`;
                    resultText.innerHTML = `<img src="./assets/icone/01.png" id="photo" alt=""  width="70px" height="70px">`;
                    blocker();
                    scoreFinale.innerHTML = `ScoreFinal : ${score}`;
                }


            }
            //Disable clicked buttons
            button.disabled = true;
        });
        //Append generated buttons to the letters container
        letterContainer.appendChild(button);
    }
};
window.onload = () => {
    init();
};