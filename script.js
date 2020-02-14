'use strict'

/*Call for recipe API & response*/

function getRecipe(query, displayCallback) {
   fetch(`https://forkify-api.herokuapp.com/api/search/?q=${query}`)
  .then(response => response.json())
  .then(responseJson => {
    console.log(responseJson)
    return responseJson
  }) 
  
/*Catch any errors that occur on the call*/

  .then(responseJson => displayResults(responseJson))
  .catch(error => alert('Invalid Entry'));
}

/* Show results on DOM */

function displayResults(responseJson) {
  $('.results').empty().append
  (`<ul class='results-list'> ${responseJson.recipes.map(recipe => 
  `<img class='result-img' src=${recipe.image_url}>
  <h4 class='recipe-title'>${recipe.title}</h4>
  <a class='results-link' href='https://forkify-api.herokuapp.com/api/get?rId=${recipe.recipe_id}'>Get the recipe!</a>
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

/*Google maps with geolocator*/

let map, infoWindow;
 function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
 center: {lat: -34.397, lng: 150.644},
 zoom: 6
 });
 infoWindow = new google.maps.InfoWindow;

 /* Try geolocation.*/
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  let pos = {
  lat: position.coords.latitude,
  lng: position.coords.longitude
  };

  infoWindow.setPosition(pos);
  infoWindow.setContent('Location found.');
  infoWindow.open(map);
  map.setCenter(pos);
  }, function() {
  handleLocationError(true, infoWindow, map.getCenter());
  });
  } else {
  /* Browser doesn't support Geolocation*/
   handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
  }
