const numb = 20;

const getNumbLoop = async () => {
  for (let i = 1; i <= numb; i++) {
    await getAnime(i);
  }
};

const getAnime = async (id) => {
  const url = `https://kitsu.io/api/edge/anime/${id}`;
  const response = await fetch(url);
  const animes = await response.json();
  console.log(animes);
};

getNumbLoop();
