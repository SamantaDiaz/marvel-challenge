$(document).ready(() => {
  const spinner = document.getElementById("spinner");
  let visibleSpinner = true;
  showSpinner(visibleSpinner, spinner);

  const url_string = window.location.href;
  const url = new URL(url_string);
  const baseUrl = `/api/${url.pathname}`;

  $.getJSON(baseUrl, () => {})
    .done((success) => {
      visibleSpinner = false;
      showSpinner(visibleSpinner, spinner);

      const hero = success.data.results[0];
      document.title = hero.name;
      renderHero(hero);
    })
    .fail((error) => {
      console.log(error);
    });
});

//the hero is rendered and created with the info
function renderHero(hero) {
  const heroContainer = document.getElementById("hero-container");

  const infoContainer = document.createElement("div");
  infoContainer.className = "info-container";

  const heroName = document.createElement("h2");
  heroName.className = "hero-name";
  heroName.textContent = hero.name;

  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  const heroImage = document.createElement("img");
  heroImage.className = "hero-image";
  heroImage.setAttribute(
    "src",
    `${hero.thumbnail.path}.${hero.thumbnail.extension}`
  );
  heroImage.setAttribute("alt", `Imagen de ${hero.name}`);

  heroContainer.appendChild(infoContainer);
  heroContainer.appendChild(imageContainer);
  imageContainer.appendChild(heroImage);
  infoContainer.appendChild(heroName);

  if (hero.description != "") {
    const heroDescription = document.createElement("p");
    heroDescription.className = "hero-description";
    heroDescription.textContent = hero.description;
    infoContainer.appendChild(heroDescription);
  }

  createButton(hero, infoContainer);
}

// show or hidden spinner
function showSpinner(visibleSpinner, spinner) {
  if (visibleSpinner) {
    spinner.classList.remove("hidden-spinner");
    spinner.classList.add("show-spinner");
  } else {
    spinner.classList.remove("show-spinner");
    spinner.classList.add("hidden-spinner");
  }
}

//The dismiss or recruit button is created when rendering the hero's info
function createButton(hero, infoContainer) {
  const allies = JSON.parse(localStorage.getItem("allies"));

  const buttonAlly = document.createElement("button");
  buttonAlly.className = "button allies-button";
  infoContainer.appendChild(buttonAlly);

  // if there are no allies, the button text is recruit
  if (!allies || allies.length <= 0) {
    buttonAlly.textContent = "Recruit";
  } else {
    for (let i = 0; i < allies.length; i++) {
      // if there are allies, two paths can be followed
      if (allies[i].id == hero.id) {
        // that the ally is already in the list, then the button must say dismiss
        buttonAlly.textContent = "Dismiss";
        buttonAlly.classList.add("dismiss-ally");

        buttonAlly.addEventListener("click", () =>
          recruitOrDismiss(allies, hero)
        );
        return;
      }
    }
    // if not, he should be able to recruit
    buttonAlly.textContent = "Recruit";
  }

  buttonAlly.addEventListener("click", () => recruitOrDismiss(allies, hero));
}

function recruitOrDismiss(allies, hero) {
  //if dont exist allies, the key is created
  if (!allies || allies.length === 0) {
    const alliesArray = [
      {
        id: hero.id,
        name: hero.name,
        img: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
      },
    ];
    localStorage.setItem("allies", JSON.stringify(alliesArray));
    location.reload();
  } else {
    for (let i = 0; i < allies.length; i++) {
      // if the hero exists we remove him
      if (allies[i].id == hero.id) {
        allies.splice(i, 1);
        localStorage.setItem("allies", JSON.stringify(allies));
        location.reload();
        return;
      }
    }

    // If we can't find it, add it to the registry
    const ally = {
      id: hero.id,
      name: hero.name,
      img: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
    };
    allies.push(ally);
    localStorage.setItem("allies", JSON.stringify(allies));
    location.reload();
  }
}
