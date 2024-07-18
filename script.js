const apiKey = "f2b20f92";

document.getElementById("searchButton").addEventListener("click", function () {
  const searchText = document.getElementById("searchInput").value;
  localStorage.setItem("searchQuery", searchText);
  fetchMovies(searchText);
});

document.addEventListener("DOMContentLoaded", () => {
  const savedSearchQuery = localStorage.getItem("searchQuery");

  if (savedSearchQuery) {
    document.getElementById("searchInput").value = savedSearchQuery;
    fetchMovies(savedSearchQuery);
  } else {
    // Clear search results container when no saved search query
    document.getElementById("searchResults").innerHTML = "";
  }
});

// Fetching movies from API based on search query
function fetchMovies(query) {
  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        alert("No movies found!");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Display movie card
function displayMovies(movies) {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  if (movies) {
    movies.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.classList.add(
        "col-md-4",
        "col-sm-6",
        "mb-4",

        "movie-item"
      );
      movieItem.setAttribute("data-imdbid", movie.imdbID);
      movieItem.innerHTML = `
            <div class="card h-100  ">
              <img src="${movie.Poster}" class="card-img-top" alt="Poster" style="height: 400px; object-fit: cover; border-top-left-radius:16px;border-top-right-radius:16px;">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <button class="btn btn-primary mt-2 favorite-button">Add to Favorites</button>
              </div>
            </div>
          `;
      searchResults.appendChild(movieItem);

      // Add event listener to each movie item for navigation to details page
      movieItem.addEventListener("click", function () {
        const movieId = this.getAttribute("data-imdbid");
        window.location.href = `details.html?imdbID=${movieId}`;
      });

      // Add event listener to favorite button in each movie item
      const favoriteButton = movieItem.querySelector(".favorite-button");
      favoriteButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents event from bubbling up

        const movieId = movieItem.getAttribute("data-imdbid");
        toggleFavorites(event.target, movieId);
      });
    });
  } else {
    searchResults.innerHTML = '<p class="text-center">No movies found.</p>';
  }
}

// Fetch queries based on previously stored values
const previousSearchResults = JSON.parse(localStorage.getItem("searchResults"));
if (previousSearchResults && previousSearchResults.length > 0) {
  displayMovies(previousSearchResults);
}
function toggleFavorites(button, movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(movieId)) {
    // Add movie to favorites
    favorites.push(movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    button.textContent = "Remove from Favorites";
    button.classList.remove("btn-outline-danger");
    button.classList.add("btn-danger");
    alert("Added to favorites!");
  } else {
    // Remove movie from favorites
    favorites = favorites.filter((id) => id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    button.textContent = "Add to Favorites";
    button.classList.remove("btn-danger");
    button.classList.add("btn-outline-danger");
    alert("Removed from favorites!");
  }
}
