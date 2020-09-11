const buttonIntro = document.getElementById("button-intro");
const introSection = document.getElementById("intro");

// bring the visit-marvel key from the localStorage
const visitMarvel = JSON.parse(localStorage.getItem("visit-marvel"));

// if the key returns null or false, the intro is displayed
if (!visitMarvel) {
  setTimeout(() => {
    buttonIntro.classList.remove("hidden-button");
    buttonIntro.classList.add("show-button");
  }, 12000);

  document
    .getElementById("button-intro")
    .addEventListener("click", (e) => continueToHome(e));
} else if (visitMarvel) {
  //if the key returns true the intro is not shown (it prevents that when reloading when reloading the home, the intro is shown all those times)
  introSection.classList.add("hidden-section");
}

//if it was shown, when clicking on the button, the key is set so as not to see the intro again
const continueToHome = (e) => {
  e.preventDefault();
  introSection.classList.add("hidden-section");
  localStorage.setItem("visit-marvel", JSON.stringify(true));
};
