document.querySelector(".shorten-btn").addEventListener("click", function(event) {
  let url = document.querySelector(".shorten-input");

  if (url.validity.typeMismatch || url.validity.valueMissing) {
    document.querySelector(".error-msg").innerHTML = "Please add a link";
    document.querySelector(".shorten-input").style.border = "3px solid hsl(0, 87%, 67%)";
    document.querySelector(".shorten-input").style.padding = "1.2rem 1.5rem";
  }

});

function copyFunction() {
  // copies the content of <p> with class .short-p
  let r = document.createRange();
  r.selectNode(document.querySelector(".short-p"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  //

  document.querySelector(".shorten-link button").innerHTML = "Copied!";
  document.querySelector(".shorten-link button").style.backgroundColor =  "hsl(257, 27%, 26%)";
}
