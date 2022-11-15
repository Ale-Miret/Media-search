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
