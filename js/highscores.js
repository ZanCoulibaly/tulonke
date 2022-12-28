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

document.querySelector('.share_twitter').addEventListener('click', function(e) {
    e.preventDefault();
    var url = this.getAttribute('data-url');
    var shareUrl = "https://twitter.com/intent/tweet/?text=" + "Participez au jeux de Orange Mali via" + "&url=" + encodeURIComponent(url);
    window.open(shareUrl, "Partagez");
});
document.querySelector('.share_facebook').addEventListener('click', function(e) {
    e.preventDefault();
    var url = this.getAttribute('data-url');
    var shareUrl = "https://facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    window.open(shareUrl, "Partagez");
});

document.querySelector('body').addEventListener('contextmenu', disableRightClick);
// document.querySelector('img').addEventListener('contextmenu', disableRightClick);
document.addEventListener('contextmenu', disableRightClick);

function disableRightClick(e) {
    e.preventDefault();
}