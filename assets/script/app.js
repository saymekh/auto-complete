'use strict';

import movies from './movies.js';


document.addEventListener("DOMContentLoaded", function() {
  const autocompleteInput = document.getElementById('autocomplete-input');
  const autocompleteList = document.getElementById('autocomplete-list');
  const movieInformation = document.getElementById('movie-information');

  autocompleteInput.addEventListener('input', handleInput);

  function handleInput() {
    const inputText = this.value.trim().toLowerCase();
    if (inputText === '') {
      autocompleteList.innerHTML = ''; // Clear suggestions if search bar is empty
      return;
    }
    autocompleteList.innerHTML = ''; // Clear previous suggestions
    const matchingMovies = movies.filter
    (movie => movie.title.toLowerCase().startsWith(inputText));
    matchingMovies.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.textContent = movie.title;
      listItem.addEventListener('click', function() {
        displayMovieInformation(movie);
        closeAutocompleteList(); // Close autocomplete list when a movie is clicked
      });
      autocompleteList.appendChild(listItem);
    });
  }

  function displayMovieInformation(movie) {
    const genres = movie.genre.map(genre => `<span>${genre}</span>`).join('');
    const movieDetailsHTML = `
      <div class="poster-wrapper">
        <figure>
          <img src="${movie.poster}" alt="${movie.title}">
        </figure>
      </div>
      <div class="information-container">
        <div class="information">
          <h2>${movie.title}</h2>
          <p class="release-duration">
            <span>${movie.year}</span> | <span>${movie.runningTime}</span>
          </p>
          <p class="description">${movie.description}</p>
          <p class="genres flex">
            ${genres}
          </p>
        </div>
      </div>
    `;
    movieInformation.innerHTML = movieDetailsHTML;
  }

  function closeAutocompleteList() {
    autocompleteList.innerHTML = '';
  }
});

