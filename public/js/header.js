//to show or not the hamburguer menu for mobile
const menu = document.getElementById("icon-menu-container");
const containerLink = document.getElementById("container-link");
const icon = document.getElementById("icon");

//the menu is set to false (not open)
let openMenu = false;

const showMenu = () => {
  if (openMenu) {
    //if it is true and the button is pressed, the menu is hidden
    containerLink.classList.remove("show-menu");
    icon.className = "fas fa-bars";
    openMenu = false;
  } else {
    //if it is false and the button is pressed, it opens
    containerLink.classList.add("show-menu");
    icon.className = "far fa-times-circle";
    openMenu = true;
  }
};

menu.addEventListener("click", showMenu);
