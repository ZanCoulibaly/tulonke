var timeleft = 40;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Terminé!!";
  } else {
    document.getElementById("countdown").innerHTML ="Temps: " +timeleft + " s";
  }
  timeleft -= 1;
}, 1000);