// Render list of heroes
function renderHeroesList(characters) {
  const heroesList = document.getElementById("heros-list");

  //maps the heroes it receives from the request to the service
  characters.map((hero) => {
    const containerHero = document.createElement("li");
    containerHero.setAttribute("class", "hero-container");

    const anchor = document.createElement("a");
    anchor.className = "anchorHero";
    anchor.setAttribute("href", `/character/${hero.id}`);

    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "hero-image-container");

    const heroName = document.createElement("h3");
    heroName.setAttribute("class", "hero-name");
    heroName.textContent = hero.name;

    const heroImage = document.createElement("img");
    heroImage.setAttribute("class", "hero-image");
    heroImage.setAttribute(
      "src",
      `${hero.thumbnail.path}.${hero.thumbnail.extension}`
    );

    heroesList.appendChild(containerHero);
    containerHero.appendChild(anchor);
    anchor.appendChild(imageContainer);
    anchor.appendChild(heroName);
    imageContainer.appendChild(heroImage);
  });
}

// Charge paginator
function loadPaginator(totalResults, pageNumber) {
  $("#pagination").pagination({
    dataSource: function (done) {
      // make an array pushing for each turn of the for (the array uses it to make each page)
      var result = [];
      for (var i = 1; i < totalResults; i++) {
        result.push(i);
      }
      done(result);
    },
    autoHidePrevious: true,
    autoHideNext: true,
    pageSize: 8,
    pageNumber,

    beforePageOnClick: (event, value) => {
      window.location.href = "?page=" + value;
    },
  });
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

// if data doesnt result
function withoutResults() {
  const msgError = document.createElement("h3");
  msgError.className = "error without-results";
  msgError.textContent = "0 results";

  const heroesList = document.getElementById("heros-list");
  heroesList.appendChild(msgError);
}

// First render
$(document).ready(() => {
  //when loading the page the spinner is shown
  const spinner = document.getElementById("spinner");
  let visibleSpinner = true;
  showSpinner(visibleSpinner, spinner);

  //the url is saved and the query and the page are concatenated
  const url_string = window.location.href;
  const url = new URL(url_string);
  const page = url.searchParams.get("page");
  const query = url.searchParams.get("query");
  let baseUrl = "/api/search";

  if (query) {
    baseUrl += "?query=" + query;
  }
  if (page) {
    baseUrl += "?page=" + page;
  }

  $.getJSON(baseUrl, () => {})
    .done((success) => {
      //the spinner is set to false so it stops showing
      visibleSpinner = false;
      showSpinner(visibleSpinner, spinner);

      const data = success.data;
      let characters = data.results;

      //if there are no search results, a message is displayed
      if (data.total === 0) {
        withoutResults();
      }
      //if there are results, redefine the hero list and load the pager
      renderHeroesList(characters);
      loadPaginator(data.total, page);
    })
    .fail((error) => {
      console.log(error);
    });
});
