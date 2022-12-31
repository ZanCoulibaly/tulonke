const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const pos = document.getElementById('passif');
const nega = document.getElementById('negatif');
const jeux = [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;


function bc(b = mostRecentScore) {
    if (b <= 50) {
        nega.innerHTML = `<img src="/image/01.png" alt="" width="70px" height="50px"/>`;
    } else {
        pos.innerHTML = `<img src="/image/gagner.png" alt="" width="70px" height="50px"/>`;
        nega.remove('negatif');
    }
}
bc();
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const dfa = {
        score: mostRecentScore,
        name: username.value,
        id: id
    };
    db.collection('jeux').doc(id).set(dfa).then(() => {
        // console.log('Todo added successfully!');
        $('.new-todo').val('');
        jeux.push(dfa);
        highScores.push(dfa);
        highScores.sort((a, b) => b.dfa - a.dfa);
        highScores.splice(5);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.assign('/highscores.html');
    }).catch(error => {
        console.log('Erreur de registre base', error);
    })

}









document.querySelector('body').addEventListener('contextmenu', disableRightClick);
// document.querySelector('img').addEventListener('contextmenu', disableRightClick);
document.addEventListener('contextmenu', disableRightClick);

function disableRightClick(e) {
    e.preventDefault();
}