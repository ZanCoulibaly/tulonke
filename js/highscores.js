const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score} points</li>`;
    })
    .join("");

deleteScore = () => {
    localStorage.removeItem('highScores');
    localStorage.clear();
    window.location.reload();
}

document.querySelector('body').addEventListener('contextmenu', disableRightClick);
// document.querySelector('img').addEventListener('contextmenu', disableRightClick);
document.addEventListener('contextmenu', disableRightClick);

function disableRightClick(e) {
    e.preventDefault();
}