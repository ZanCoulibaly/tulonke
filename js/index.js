document.querySelector('body').addEventListener('contextmenu', disableRightClick);
document.querySelector('img').addEventListener('contextmenu', disableRightClick);
document.addEventListener('contextmenu', disableRightClick);

function disableRightClick(e) {
    e.preventDefault();
}