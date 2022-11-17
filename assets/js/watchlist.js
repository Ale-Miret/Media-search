var watchInput = document.querySelector("#watch-input");
var watchForm = document.querySelector("#watch-form");
var watchList = document.querySelector("#watch-list");

var watchlistSelections= [];

function renderWatchlistSelections() {
    watchList.innerHTML = ""

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

function init() {
    var storedWatchlistSelections = JSON.parse(localStorage.getItem("watchlistSelections"));
    console.log("Hello" , storedWatchlistSelections);
    if (storedWatchlistSelections !==null) {
        watchlistSelections = storedWatchlistSelections;
    }

    renderWatchlistSelections();
}

function storedWatchlistSelections() {
    localStorage.setItem("watchlistSelections", JSON.stringify(watchlistSelections));
  }

  watchForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var watchText = watchInput.value.trim();
  
    if (watchText === "") {
      return;
    }
    
    watchlistSelections.push(watchText);
    watchInput.value = "";

    storedWatchlistSelections();
    renderWatchlistSelections();
});

watchList.addEventListener("click" , function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        // Get its data-index value and remove the todo element from the list
        var index = element.parentElement.getAttribute("data-index");
        watchlistSelections.splice(index, 1);
    
        // Store updated todos in localStorage, re-render the list
        storedWatchlistSelections();
        renderWatchlistSelections();
      }
    });
    
    init()
    
