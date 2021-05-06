//Select events
const inputValue = document.getElementById("input");
const cardSection = document.querySelector(".card-section");

//addeventlisteners
inputValue.addEventListener("keypress", setQuery);

function setQuery(e) {
  //Enter'a basıldıysa
  if (e.keyCode == 13) {
    e.preventDefault();
    getResults(e.target.value);
  }
}

const numb = 20;
//Ekrana yazdıracağım id ye göre ilk 20 apiyi dönüyorum
const getNumbLoop = async () => {
  for (let i = 1; i <= numb; i++) {
    await getAnime(i);
  }
};
//Api çektim
const getAnime = async (id) => {
  const url = `https://kitsu.io/api/edge/anime/${id}`;
  const response = await fetch(url);
  const animes = await response.json();
  if (animes.data) {
    createCard(animes.data);
  }
};

const getResults = async (value) => {
  cardSection.innerHTML = "";
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${value}`;
  const response = await fetch(url);
  const search = await response.json();
  if (search.data) {
    search.data.forEach((item) => {
      createCard(item);
    });
  }
  inputValue.value = "";
};

function createCard(animes) {
  const {
    canonicalTitle,
    posterImage,
    averageRating,
    type,
  } = animes.attributes;
  let html = `
  <div class="col-lg-4 col-sm-6 mb-3">
  <div class="card">

    <img src=${posterImage.original} class="card-img-top img" alt=${animes.type} />
    <div class="card-body">
      <div class="card-info">
        <h5 class="card-title">${canonicalTitle}</h5>
        <h4><span class="badge bg-secondary">${averageRating}</span></h4>
      </div>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
  </div>
</div>
  `;
  cardSection.innerHTML += html;
}

getNumbLoop();
