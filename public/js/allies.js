$(document).ready(() => {
  // when loading the key 'allies' from the localStorage (which makes the list of fav or cart) is brought
  const allies = JSON.parse(localStorage.getItem("allies"));

  renderAllies(allies);
});

//the list of allies is created
function renderAllies(allies) {
  const alliesContainer = document.getElementById("allies-container");

  //if there are no allies show a message about that
  if (!allies || allies.length <= 0) {
    const noAlliesContainer = document.createElement("div");
    noAlliesContainer.className = "container-no-allies";

    const msgNoAllies = document.createElement("p");
    msgNoAllies.className = "msg-no-allies";
    msgNoAllies.textContent =
      "You haven't joined any superheroes yet. Choose your favorites and recruit them. Hurry, the dark side lurks!";

    alliesContainer.appendChild(noAlliesContainer);
    noAlliesContainer.appendChild(msgNoAllies);
  } else {
    //if there are allies, item is created from the list of allies
    for (let i = 0; i < allies.length; i++) {
      //the article that encloses the ally is created
      const article = document.createElement("article");
      article.className = "ally-container";

      //the image container and the image are created
      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container";
      const imageAlly = document.createElement("img");
      imageAlly.className = "hero-image";
      imageAlly.setAttribute("src", allies[i].img);

      //the name container and the ally name is created
      const nameContainer = document.createElement("div");
      nameContainer.className = "name-container";
      const nameAlly = document.createElement("h3");
      nameAlly.className = "name-hero";
      nameAlly.textContent = allies[i].name;

      //the container of the button, the button and the icon is created
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "dismiss-button-container";
      const buttonDismiss = document.createElement("button");
      buttonDismiss.className = "button allies-button";
      const textButton = document.createElement("p");
      textButton.className = "text-button";
      textButton.textContent = "Dismiss";
      const iconButton = document.createElement("i");
      iconButton.className = "far fa-times-circle icon-button-ally";

      alliesContainer.appendChild(article);

      article.appendChild(imageContainer);
      article.appendChild(nameContainer);
      article.appendChild(buttonContainer);

      imageContainer.appendChild(imageAlly);
      nameContainer.appendChild(nameAlly);
      buttonContainer.appendChild(buttonDismiss);

      buttonDismiss.appendChild(iconButton);
      buttonDismiss.appendChild(textButton);

      buttonDismiss.addEventListener("click", () => dismissAlly(allies, i));
    }
  }
}

//delete the ally from the list and refresh the page
function dismissAlly(allies, i) {
  allies.splice(i, 1);
  localStorage.setItem("allies", JSON.stringify(allies));
  location.reload();
}
