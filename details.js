const apiKey = "f2b20f92";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const imdbID = params.get("imdbID");
  fetchMovieDetails(imdbID);
});

function fetchMovieDetails(imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      displayMovieDetails(data);
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}

function displayMovieDetails(movie) {
  const movieDetails = document.getElementById("movieDetails");
  movieDetails.innerHTML = `
      <div class="card mb-4">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="card-img" alt="${movie.Title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text"><strong>Year:</strong> ${movie.Year}</p>
              <p class="card-text"><strong>Rated:</strong> ${movie.Rated}</p>
              <p class="card-text"><strong>Released:</strong> ${movie.Released}</p>
              <p class="card-text"><strong>Runtime:</strong> ${movie.Runtime}</p>
              <p class="card-text"><strong>Genre:</strong> ${movie.Genre}</p>
              <p class="card-text"><strong>Director:</strong> ${movie.Director}</p>
              <p class="card-text"><strong>Writer:</strong> ${movie.Writer}</p>
              <p class="card-text"><strong>Actors:</strong> ${movie.Actors}</p>
              <p class="card-text"><strong>Plot:</strong> ${movie.Plot}</p>
              <p class="card-text"><strong>Language:</strong> ${movie.Language}</p>
              <p class="card-text"><strong>Country:</strong> ${movie.Country}</p>
              <p class="card-text"><strong>Awards:</strong> ${movie.Awards}</p>
              <p class="card-text"><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
            </div>
          </div>
        </div>
      </div>
    `;
}
