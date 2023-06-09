const API_KEY = "api_key=ae38fa09274bf55f518587023a99b4df";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?${API_KEY}`;
const hom = document.getElementById("home");

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    getMovies(data.results);
    console.log(data.results);
  })
  .catch((error) => console.log(error));

function getMovies(data) {
  card.innerHTML = " ";
  card2.innerHTML=" ";
  const moviesContainer = document.getElementById("card");
  data.forEach((movie) => {
    const movieEl = showMovie(movie);
    moviesContainer.appendChild(movieEl);
  });
}

function showMovie(movie) {
  const { title, vote_average, poster_path, overview, id } = movie;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");
  movieElement.innerHTML = `
    <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'}" width="200">
    <div class="info" id=${id}>
      <h3 class="title" id="title">${title}</h3>
      <span class="rating"><p>IMDb: ${vote_average}/10</p></span>  
    </div>
    <div class="overview">
      <h3>Overview</h3>
      <p class="overview">${overview}</p>
    </div>
  `;

  movieElement.addEventListener('click', () => {
    console.log(id);
    openpage(movie);
  })

  return movieElement;
}

function openpage(movie){

  card.innerHTML=' ';
  const {title, vote_average, id, overview, poster_path} = movie;
  const moviecard=document.createElement("div")
  moviecard.classList.add("mcard")
  moviecard.innerHTML=`
  <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'}" width = "400" height = "550">
    <div class="info2" id=${id}>
      <h3 class="title2" id="title2">${title}</h3>
      <span class="rating2"><p>IMDb: ${vote_average}/10</p></span>
      <h3 class="otitle">Overview</h3>
      <p class="overview2">${overview}</p>
    </div>`

    card2.appendChild(moviecard);


  return moviecard;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = search.value;
    if(input) {
        fetch(searchURL+'&query='+input)
            .then((response) => response.json())
            .then((data) => {
                getMovies(data.results);
                console.log(data.results);
            })
            .catch((error) => console.log(error));
    }
    else{
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                getMovies(data.results);
                console.log(data.results);
            })
            .catch((error) => console.log(error));
    }

})

hom.addEventListener('click', () =>{
  fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    getMovies(data.results);
    console.log(data.results);
  })
  .catch((error) => console.log(error));
})


