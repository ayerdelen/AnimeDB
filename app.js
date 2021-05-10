//Select events
const inputValue = document.getElementById("input");
const cardSection = document.querySelector(".card-section");
const loadingContent = document.querySelector(".loading-content");

//addeventlisteners
inputValue.addEventListener("keypress", setQuery);
const numb = 20;
let error = false;
let loading = true;

function setQuery(e) {
  //Enter'a basıldıysa
  if (e.keyCode == 13) {
    e.preventDefault();
    loadingContent.classList.remove("hide-loading");
    getResults(e.target.value);
  }
}

//Ekrana yazdıracağım id ye göre ilk 20 apiyi dönüyorum
const getNumbLoop = async () => {
  for (let i = 1; i <= numb; i++) {
    await getAnime(i);
  }
};
//Api çektim
const getAnime = async (id) => {
  loading = false;
  const url = `https://kitsu.io/api/edge/anime/${id}`;
  const response = await fetch(url);
  const animes = await response.json();

  if (animes.data) {
    if (!loading) {
      loadingContent.classList.add("hide-loading");
      createCard(animes.data);
    }
  }
};

const getResults = async (value) => {
  cardSection.innerHTML = "";
  loading = false;
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${value}`;
  const response = await fetch(url);
  const search = await response.json();
  console.log(search);

  if (search.data && search.data.length > 0) {
    search.data.forEach((item) => {
      if (!loading) {
        loadingContent.classList.add("hide-loading");
        createCard(item);
      }
    });
    error = false;
    inputValue.classList.remove("error");
  }
  if (search.data.length === 0) {
    error = true;
  }
  if (error) {
    loadingContent.classList.add("hide-loading");
    inputValue.classList.add("error");
    let errorHTML = `
    <div class="img-container">
    <img class="error-img img" src="sad.jpg" /> 
    <h1 class="text-danger">Sorry, I couldn't find anything...</h1>
    </div>
    `;
    cardSection.innerHTML = errorHTML;
  }

  inputValue.value = "";
};

function createCard(animes) {
  const backgroundColor = "";
  const {
    canonicalTitle,
    posterImage,
    averageRating,
    type,
  } = animes.attributes;

  let html = `
  <div class="col-lg-4 col-sm-6 mb-3">
  <div class="card">

    <img src=${posterImage.original} class="card-img-top img" alt=${
    animes.type
  } />
    <div class="card-body">
      <div class="card-info">
        <h5 class="card-title">${canonicalTitle}</h5>
        <h4><span class="badge bg-secondary ${
          averageRating >= 80
            ? "green"
            : averageRating < 80 && averageRating > 65
            ? "yellow"
            : "red"
        }"
        >${averageRating ? averageRating : "0.00"}</span></h4>
      </div>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
  </div>
</div>
  `;
  cardSection.innerHTML += html;

  let badge = cardSection.querySelector(".badge");
}

getNumbLoop();
