const divID = ["home", "about", "volunteer", "events", "support"];

// on scroll
document.addEventListener("scroll", function () {
  const divPos = [];
  for (const id of divID) {
    const div = document.getElementById(id);
    divPos.push(div.offsetTop - screen.height / 2);
  }
  divPos.push(document.body.scrollHeight);
  const scrollPos = window.scrollY;
  const navLinks = document.querySelectorAll(".cs-nav .cs-li-link");
  for (let i = 0; i < divPos.length; i++) {
    if (scrollPos >= divPos[i] && scrollPos < divPos[i + 1]) {
      navLinks[i].classList.add("cs-active");
    } else {
      navLinks[i].classList.remove("cs-active");
    }
  }
});