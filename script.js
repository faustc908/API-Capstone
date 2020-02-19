'use strict'

/* Call for recipe API & response */

function getRecipe(query, displayCallback) {
   fetch(`https://forkify-api.herokuapp.com/api/search/?q=${query}`)
  .then(response => response.json())
  .then(responseJson => {
    console.log(responseJson)
    return responseJson
  }) 
  
/* Catch any errors that occur on the recipe call */

  .then(responseJson => displayResults(responseJson))
  .catch(error => showNotification('Invalid entry, chose different ingredient please'));
}

/* Displays a notification if ingredient can't be found */

function showNotification(msg) {
  let notification = $('<section id="notification">')
  notification.html(`<p>${msg}</p>`)
  $('body').append(notification)
  setTimeout(function () {
    let notification = $('#notification')
    notification.hide(500, () => {
      notification.remove()
    })
  }, 3e3)
}

/* Show results on DOM */

function displayResults(responseJson) {
  $('.results').empty().append
  (`<ul class='results-list'> ${responseJson.recipes.map(recipe => 
  `<img class='result-img' src=${recipe.image_url}>
  <h4 class='recipe-title'>${recipe.title}</h4>
  <a class='directions-link' href='${recipe.source_url}'>Instructions</a>
  <a class='ingredients'
   href="https://forkify-api.herokuapp.com/api/get?rId=${recipe.recipe_id}">Ingredients</a>
  <p class='results-author'>Published by: ${recipe.publisher}</p>
   `)} </ul>`)
  $('.results').removeClass('hidden');
}

function displayRecipe(data) {
  const results = data.message.map((item, index) => displayResults(item));
  $('.results').html(results);
  $('.results').removeClass('hidden');
}

/* Event listener for search button */

function listenToInput() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget= $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    getRecipe(query, displayRecipe);
  });
}

/* Listen for input */

$(function() {
  console.log('Event listener active');
  listenToInput();
}); 
