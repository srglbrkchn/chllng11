document.querySelector(".shorten-btn").addEventListener("click", function(event) {
  let url = document.querySelector(".shorten-input");

  if (url.validity.typeMismatch || url.validity.valueMissing) {
    document.querySelector(".error-msg").innerHTML = "Please add a link";
    document.querySelector(".shorten-input").style.border = "3px solid hsl(0, 87%, 67%)";
    document.querySelector(".shorten-input").style.padding = "1.2rem 1.5rem";
  }

});

function changeColor(id) {
  document.querySelectorAll(".shorten-link button")[id].innerHTML = "Copied!";
  document.querySelectorAll(".shorten-link button")[id].style.backgroundColor =  "hsl(257, 27%, 26%)";

  setTimeout(function() {
    document.querySelectorAll(".shorten-link button")[id].innerHTML = "Copy";
    document.querySelectorAll(".shorten-link button")[id].style.backgroundColor =  "hsl(180, 66%, 49%)";
  }, 2000);
}

function soundEffect() {
  let popSound = new Audio("sounds/pop.mp3");
  popSound.play();
}

function copyFunction(id) {
  // copies the content of <p> with class .short-p
  let r = document.createRange();
  r.selectNode(document.querySelectorAll(".short-p")[id]);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  //

  changeColor(id);
  soundEffect();
}
