document.addEventListener("DOMContentLoaded", () => {
  // Retrieve favorite movies from localStorage or initialize an empty array if none exists
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Get the element where favorite movies will be displayed
  const favoriteMoviesElem = document.getElementById("favoriteMovies");

  // Check if there are any favorite movies
  if (favorites.length === 0) {
    favoriteMoviesElem.innerHTML =
      '<p class="text-center">No favorite movies added yet.</p>';
  } else {
    // Iterate through each favorite movie ID and fetch its details
    favorites.forEach((movieId) => {
      fetchMovieDetails(movieId)
        .then((movie) => displayFavoriteMovie(movie, favoriteMoviesElem))
        .catch((error) =>
          console.error("Error fetching movie details:", error)
        );
    });
  }
});

function fetchMovieDetails(movieId) {
  const apiKey = "f2b20f92";
  return fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching movie details:", error));
}

function displayFavoriteMovie(movie, parentElem) {
  const movieItem = document.createElement("div");
  movieItem.classList.add("col-md-4", "col-sm-6", "mb-4", "movie-item");
  // Populate the inner HTML of the movieItem div with movie details
  movieItem.innerHTML = `
      <div class="card h-100">
        <img src="${movie.Poster}" class="card-img-top" alt="Poster" style="height: 400px; object-fit: cover; border-top-left-radius:16px;border-top-right-radius:16px;">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <button class="btn btn-outline-danger btn-sm remove-from-favorites" data-imdbid="${movie.imdbID}">Remove from Favorites</button>
        </div>
      </div>
    `;
  parentElem.appendChild(movieItem);

  // Add event listener for removing from favorites
  const removeFromFavoritesBtn = movieItem.querySelector(
    ".remove-from-favorites"
  );
  removeFromFavoritesBtn.addEventListener("click", removeFromFavorites);
}

// Removing favorites from list
function removeFromFavorites(event) {
  const movieId = event.target.getAttribute("data-imdbid");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(movieId)) {
    favorites = favorites.filter((id) => id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    event.target.closest(".movie-item").remove();
    alert("Removed from favorites!");
  } else {
    alert("This movie is not in favorites.");
  }
}
