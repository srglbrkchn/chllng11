document.querySelector(".shorten-btn").addEventListener("click", function(event) {
  let url = document.querySelector(".shorten-input");

  if (url.validity.typeMismatch || url.validity.valueMissing) {
    document.querySelector(".error-msg").innerHTML = "Please add a link";
    document.querySelector(".shorten-input").style.border = "3px solid hsl(0, 87%, 67%)";
    // Change color of input placeholder when error occurs
    document.querySelector(".shorten-input").classList.add("red-inside");
    event.preventDefault(); // Prevents browser default error message
  }

});

function changeColor(id) {
  document.querySelectorAll(".shorten-link button")[id].innerHTML = "Copied!";
  document.querySelectorAll(".shorten-link button")[id].style.backgroundColor = "hsl(257, 27%, 26%)";

  setTimeout(function() {
    document.querySelectorAll(".shorten-link button")[id].innerHTML = "Copy";
    document.querySelectorAll(".shorten-link button")[id].style.backgroundColor = "hsl(180, 66%, 49%)";
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

// Hamburger menue appear/disappear functionality

let status = "hidden";
let open = 0;


function buttonActive() {
  document.querySelector(".head-part1").style.visibility = "visible";
  status = "appear";
  open = 1;
}

function buttonInactive() {
  document.querySelector(".head-part1").style.visibility = "hidden";
  status = "hidden";
  open = 0;
}


document.querySelector(".hamburger").addEventListener("click", function() {
  if (status === "hidden") {
    buttonActive();
  } else {
    buttonInactive();
  }
});

// Checks screen size, if on Tablet or desktop mode, makes content  of hamburger menue visible at all times.
function buttonAppear() {
  let windowWidth = window.innerWidth;
  if (windowWidth > 850) {
    document.querySelector(".head-part1").style.visibility = "visible";
  } else {
    if (open === 1) {
      buttonActive();
    } else {
      buttonInactive();
    }
  }
}

// Resizing svg picture based on window size
function svgSizeArrange() {
  let windowWidth = window.innerWidth;
  if (windowWidth < 1200) {
    let mySVG = document.querySelector(".main-section svg");
    mySVG.setAttribute("viewBox", "0 0 450 530");
  }
}

svgSizeArrange();
