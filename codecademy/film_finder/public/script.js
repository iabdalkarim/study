/**
 * If you’re looking for additional ways to challenge yourself, consider the following:
 * Checkout the displayMovie() function in helpers.js to use the DOM to rearrange the layout of information on the page. Try displaying different types of information like cast, or release date.
 * Create a way to store a user’s liked and disliked movies and display this list on the page.
 * Our API call inside of getMovies() returns many pages of results, but currently our program only randomizes results from the first page. To randomize our results even more, update getMovies() so that movies contains results from a random page instead of the first page.
 */

const tmdbKey = "";
const tmdbBaseUrl = "https://api.themoviedb.org/3/";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
    const genreRequestEndpoint = "genre/movie/list";
    const requestParams = "?api_key=" + tmdbKey;
    const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
    try {
        const res = await fetch(urlToFetch);
        if (res.ok) {
            const jsonResponse = await res.json();
            return jsonResponse.genres;
        }
    } catch (error) {
        console.log(error.message);
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "discover/movie";
    const requestParams = "?api_key=" + tmdbKey + "&with_genres=" + selectedGenre;
    const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
    try {
        const res = await fetch(urlToFetch);
        if (res.ok) {
            const jsonResponse = await res.json();
            return jsonResponse.results;
        }
    } catch (error) {
        console.log(error.message);
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = "movie/" + movieId;
    const requestParams = "?api_key=" + tmdbKey;
    const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
    try {
        const res = await fetch(urlToFetch);
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.log(error.message);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
