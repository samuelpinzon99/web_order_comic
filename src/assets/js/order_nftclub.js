// scroll sticky 
var scrollpos = window.scrollY;
var header = document.getElementById("header");

function header_scrolled() {
  header.classList.add("ordersticky");
}

function remove_header_scrolled() {
  header.classList.remove("ordersticky");
}

window.addEventListener('scroll', function () {
  scrollpos = window.scrollY;

  if (scrollpos > 80) {
    header_scrolled();
  }
  else {
    remove_header_scrolled();
  }
});