var watchInput = document.querySelector("#watch-input");
var watchForm = document.querySelector("#watch-form");
var watchList = document.querySelector("#watch-list");

// empty array for watchlist items
var watchlistSelections= [];

// adds the watchlist selections as a list element (html)
function renderWatchlistSelections() {
    watchList.innerHTML = ""

// creates a new row for each watch selection
    for (var i = 0; i < watchlistSelections.length; i++)
{
    var watchlistSelection = watchlistSelections[i];

    var li = document.createElement("li");
    li.textContent = watchlistSelection;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Seen 👁‍🗨";

    li.appendChild(button);
    watchList.appendChild(li);
}
}

// calling function that will contain localStorage
function init() {
    var storedWatchlistSelections = JSON.parse(localStorage.getItem("watchlistSelections"));
    console.log("Hello" , storedWatchlistSelections);
    if (storedWatchlistSelections !==null) {
        watchlistSelections = storedWatchlistSelections;
    }

    renderWatchlistSelections();
}

// stringifies and sets local storage in watchlistSelections array
function storedWatchlistSelections() {
    localStorage.setItem("watchlistSelections", JSON.stringify(watchlistSelections));
  }

  // adds submit event to form
  watchForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var watchText = watchInput.value.trim();
  
  // If text is empty, return from function
    if (watchText === "") {
      return;
    }
    
    // add new watch items to our empty array
    watchlistSelections.push(watchText);
    watchInput.value = "";

    // Store watch items in local storage
    storedWatchlistSelections();
    renderWatchlistSelections();
});

// Adds click event
watchList.addEventListener("click" , function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        // Get its data-index value and removes item from the list
        var index = element.parentElement.getAttribute("data-index");
        watchlistSelections.splice(index, 1);
    
        // Store updated watch items in localStorage, re-render the list
        storedWatchlistSelections();
        renderWatchlistSelections();
      }
    });
    
  // calls init to retrieve stored data and display it on the page when you refresh/load 
    init()
    
