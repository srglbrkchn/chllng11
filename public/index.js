document.querySelector(".shorten-btn").addEventListener('click', function(event) {
  let url = document.querySelector(".shorten-link");

  if (url.validity.typeMismatch || url.validity.valueMissing) {
    document.querySelector(".error-msg").innerHTML = "Please add a link";
    document.querySelector(".shorten-link").style.border = "3px solid hsl(0, 87%, 67%)";
    // document.querySelector(".shorten-link").placeholder.style.color = "hsl(0, 87%, 67%)";
    // document.querySelectorAll("::placeholder").classList.add("perror");
  }

  // alert("hi");
});

function copyFunction() {
  const copyText = document.querySelector(".short-p").textContent;
  // copyText.select();
  // copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText);
  alert("Copied the text: " + copyText);
}
