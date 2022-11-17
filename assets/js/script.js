
//created variables
//variable for the quote and the author
//element for the section that will contain the quote with bulma card
//seleteced category we needed for the API to access as a parameter

var category = 'movies'
var quoteEl = document.getElementById("quotetitle");
var authorEl = document.getElementById("author");
var quoteBox = document.getElementById("cardcontent");
$.ajax({
    method: 'GET',
    //Getting the API from API Ninjas for random movie quotes and authors
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': 'U1yN1E4bPzeehm6tc5Qh/Q==Z2vnbdd4lv8gLJZh'},
    contentType: 'application/json',
    success: function(result) {
   //On page load, the results from the array with the quote and author will be displayed on the inner HTML// 
        quoteEl.innerHTML = "<q>" + result[0].quote;
        author.innerHTML = "<em> ~By: " + result[0].author;
        console.log(result);
        //the results of the array will be console.log
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
//

var APIKey = "62501089";
var baseURL = "http://www.omdbapi.com/?apikey=";
var movieInput = document.querySelector('#movie-input').value;
var movieBoxEl = document.querySelector('.movie-box');

var getMovieInfo = function () {
    if(movieInput != 0){
    var apiUrl = baseURL + APIKey + '&s=' + movieInput;
    console.log(apiUrl); 
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          movieResults(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
    } };

  $(".is-responsive").click(function(){
    movieInput = document.querySelector('#movie-input').value;

    console.log(movieInput);

    getMovieInfo();
}
);

$('#movie-input').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		movieInput = document.querySelector('#movie-input').value;

    console.log(movieInput);

    getMovieInfo();
	}
});

var movieResults = function (data){
    console.log(data);
    $(".movie-box").empty();
    document.querySelector(".movie-box").style.display = "block";
    for(var i = 0; i < data.Search.length; i++){
    var repoInfo = "Title: " + data.Search[i].Title + ' (' + data.Search[i].Type + ')' + "<br>Release Date: " + data.Search[i].Year + '<br><a href="https://www.imdb.com/title/' + data.Search[i].imdbID + '/" target="_blank"><img src="' + data.Search[i].Poster + '" alt="Poster image of ' + data.Search[i].Title + '"> ';
    var repoEl = document.createElement('div');
    repoEl.classList = 'movie-results';
    repoEl.innerHTML = repoInfo;
    movieBoxEl.appendChild(repoEl);
};
};