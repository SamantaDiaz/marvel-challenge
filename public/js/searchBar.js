const inputSearch = document.getElementById("superhero-search");
const textError = document.getElementById("error-search");
const iconSearch = document.getElementById("icon-search");

let search;

//function to validate that user cannot search if he has not written anything in the input
const validate = () => {
  // if you did not write anything, an error message is displayed
  if (inputSearch.value.length < 1) {
    textError.classList.add("show-error");
  } else {
    //if he wrote something, it is removed (just in case the error class), what he wrote is saved and it is written in the url to be able to make the request to the service
    textError.classList.remove("show-error");
    search = inputSearch.value;
    window.location.href = "?query=" + search;
  }
};

const searching = (e) => {
  if (e.keyCode === 13 || e.type === "click") {
    validate();
    return;
  }
};

inputSearch.addEventListener("keypress", (e) => searching(e));
iconSearch.addEventListener("click", (e) => searching(e));
