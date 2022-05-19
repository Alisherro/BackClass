const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(data) {
    let counter=0;
    const moviesEl = document.querySelector(".movies");
    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
        `;

        moviesEl.appendChild(movieEl);
        let a=movie;
        document.getElementsByClassName("movie")[counter].addEventListener("click",function(){film_pager(a)});
        counter++;
    });
}

function film_pager(data){
    const moviesEl = document.querySelector(".mainSection");
    document.querySelector(".movies").innerHTML = "";
    document.querySelector(".mainSection").innerHTML = "";
    const movieEl = document.createElement("div");
    movieEl.innerHTML =`<img class="mainFilmImg" src="${data.posterUrlPreview}" alt="">

        <p><strong>Ratings: </strong>Imdb: <strong>${data.ratingImdb}</strong></p>
        <p><strong>Slogan: </strong>${data.slogan} </p>
        <p><strong>Release date:</strong>${data.year}</p>
        <p><strong>Country: </strong>${data.countries.map(
        (country) => ` ${country.country}`)} </p>
        <p><strong>Genre: </strong>${data.genres.map(
        (genre) => ` ${genre.genre}`)} </p>
        <h1>Description: </h1>
        <p>${data.description}</p>`;
    moviesEl.appendChild(movieEl);



}




const form = document.querySelector("form");
const search = document.querySelector(".form-control");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }
});