const API_KEY = "8e62d4e4cc0b648a3cedbc40674602df";
const FEATURED_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

const getMovie = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
  } catch (error) {
    console.log(error);
  }
};

getMovie(FEATURED_URL);

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        
            <img
                src="${IMG_PATH + poster_path}"
                alt="movie_img"
            />
             <div class="info">
                <h3>${title}</h3>
                <span class="${getClassByVote(
                  vote_average
                )}"> ${vote_average}</span>
            </div>
            <div class="desc">
          
         
            ${overview}
            </div>
      
        
        
        `;
    main.appendChild(movieEl);
  });
}

function getClassByVote(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else if (vote < 6) {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovie(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
