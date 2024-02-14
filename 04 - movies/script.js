const API_KEY = 'fb1e7729-efa6-496a-b307-54b3d9bb7466';
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

const API_URL_MOVIE_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
// fb1e7729-efa6-496a-b307-54b3d9bb7466

getMovies(API_URL_POPULAR)

async function getMovies(url){
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote){

    if(vote >= 7){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}

function showMovies(data){
    const moviesEl = document.querySelector(".movies");

    document.querySelector('.movies').innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}"> 
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie-info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)} </div>
                    <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
                </div>
        `;
        movieEl.addEventListener("click", () => openModal(movie.filmId))
        moviesEl.appendChild(movieEl);
    })
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if(search.value){
        getMovies(apiSearchUrl);
    }

    search.value = ""
})

// Modal

const modalEl = document.querySelector(".modal");

async function openModal(id) {

    const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();

    modalEl.classList.add("modal--show")
    document.body.classList.add("stop-scrolling")

modalEl.innerHTML = `
<div class="modal__card">
<img src="${respData.posterUrl}" alt="" class="modal__movie-backdrop">
<h2>
    <span class="modal__movie_title">${respData.nameRu}</span>
</h2>
<ul class="modal__movie-info">
    <li class="modal__movie-genre">Gen: ${respData.genres.map((el) => `<span> ${el.genre}</span>`)}</li>
    <li class="modal__movie-release-year">An: ${respData.year}</li>
    ${respData.filmLength ? `<li class="modal__movie-runtime">Durata: ${respData.filmLength}</li>` : ''}
    <li>Site: <a href="${respData.webUrl}" class="modal__movie-site">${respData.webUrl}</a></li>
    <li class="modal__movie_overview">Descriere: ${respData.description}</li>
</ul>
<button type="button" class="modal__button-close">Exit</button>
</div>
`
const btnClose = document.querySelector('.modal__button-close')
btnClose.addEventListener("click", () => closeModal())
}

function closeModal() {
    modalEl.classList.remove("modal--show")
    document.body.classList.remove("stop-scrolling")
}

window.addEventListener("click", (ev) => {
    if(ev.target == modalEl){
    closeModal()
}})

window.addEventListener("keydown", (ev) => {
    if(ev.keyCode === 27){//daca apasa Esc
        closeModal()
    }
    
})

