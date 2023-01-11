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