const init = () => {
  const inputForm = document.querySelector("form");
  const inputField = document.querySelector("input#searchByID");
  const movieDetails = document.querySelector("section#movieDetails");

  // Create "Clear" and "Show All Movies" buttons (only if they don’t exist)
  let clearButton = document.querySelector("#clearButton");
  let allMoviesButton = document.querySelector("#allMoviesButton");

  if (!clearButton) {
    clearButton = document.createElement("button");
    clearButton.id = "clearButton";
    clearButton.innerText = "Clear";
    movieDetails.appendChild(clearButton);
  }

  if (!allMoviesButton) {
    allMoviesButton = document.createElement("button");
    allMoviesButton.id = "allMoviesButton";
    allMoviesButton.innerText = "Show All Movies";
    movieDetails.appendChild(allMoviesButton);
  }

  // Prevent form from refreshing the page
  inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchMovieById(inputField.value);
  });

  // Clear the movie details
  clearButton.addEventListener("click", () => {
    movieDetails.innerHTML = `<h4>Title</h4><p>Summary</p>`;
  });

  // Show all movies
  allMoviesButton.addEventListener("click", fetchAllMovies);
};

// Fetch movie by ID
const fetchMovieById = (id) => {
  fetch(`http://localhost:3000/movies/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Movie not found");
      return response.json();
    })
    .then((data) => {
      updateMovieDetails(data.title, data.summary);
    })
    .catch(() => {
      updateMovieDetails("Error", "Movie not found. Please enter a valid ID.");
    });
};

// Fetch all movies and display them
const fetchAllMovies = () => {
  fetch("http://localhost:3000/movies")
    .then((response) => response.json())
    .then((movies) => {
      const movieList = movies
        .map((movie) => `<h4>${movie.title}</h4><p>${movie.summary}</p>`)
        .join("");
      document.querySelector("section#movieDetails").innerHTML = movieList;
    });
};

// Update movie details in the DOM
const updateMovieDetails = (title, summary) => {
  document.querySelector("section#movieDetails").innerHTML = `
    <h4>${title}</h4>
    <p>${summary}</p>
  `;
};

// Run init when page loads
document.addEventListener("DOMContentLoaded", init);
