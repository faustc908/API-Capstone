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
  .catch(error => alert('Chose another ingredient'));
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

/* Event listener for ingredients button */

/*function getIngredients(){
$('.ingredients').on('click', 'a.ingredients', event => {
  event.preventDefault();
  const url = event.currentTarget.href
  fetch(url)
  .then (response => response.json())
  .then (responseJson =>{
    console.log(responseJson);
    
  })  
  .then(responseJson => displayIngredient(responseJson))
})}

function displayIngredient(responseJson) {
  $('.results').append
  (`<ul class='results-list'> ${responseJson.recipes.map(recipe => 
  `<a class='ingredients'
   href="https://forkify-api.herokuapp.com/api/get?rId=${recipe.recipe_id}">Ingredients</a>
   `)} </ul>`)
  $('.results').removeClass('hidden');
}*/



/* Listen for input */

$(function() {
  console.log('Event listener active');
  listenToInput();
}); 

