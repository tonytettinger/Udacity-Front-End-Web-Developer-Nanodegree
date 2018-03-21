/*
 * Create a list that holds all of your cards
 */
var listOfCards, shuffledListOfCards, listOfOpenCards;

listOfCards= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
listOfOpenCards = [];


 //shuffle function
 var shuffle = function() {
 shuffledListOfCards = shuffleCards(listOfCards);
 return shuffledListOfCards;
 }

//defining variables containing the font awesome classes for the 8 different card types

const figure1 = "fa-leaf";
const figure2 = "fa-bicycle";
const figure3 = "fa-diamond";
const figure4 = "fa-bomb";
const figure5 = "fa-bolt";
const figure6 = "fa-anchor";
const figure7 = "fa-paper-plane-o";
const figure8 = "fa-cube";

//list of card id's stored in variables


// loop function: loops through each card's ID and assign them the corresponding images to the randomly shuffled numbers (each number represents one shape)

var assignCardPictures = function() {
    for(i=1; i <= shuffledListOfCards.length; i++) {
        let currentCard = document.getElementById('card' + i);
        figureString = 'figure' + shuffledListOfCards[i];
        figureAsVariable = "\"" + eval(figureString) + "\"";
        console.log(figureAsVariable);
        currentCard.classList.add(figureAsVariable);
    }
}
shuffle();
var figureString = 'figure' + shuffledListOfCards[0];

console.log(eval(figureString));

assignCardPictures();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 /*
After shuffling give each list element an id and loop over those list elements with the use of the id's giving each of them a font awesome class based on the shuffled order, each number should be related to one font awesome class. Before the looping starts there should be an HTML structure in place with ordered id's, preferably 1 to 16, then in the end of the looping based on the shuffled affignment each card should have a random class assigned to it.
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleCards(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//select ul list - class = 'deck'
var deck;
deck = document.querySelector(".deck");

//add classes to elements
var d = document.getElementById("div1");
d.className += " otherclass";



/*
 * set up the event listener for a card. If a card is clicked:
 * 
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 * 
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * 
 *  - if the list already has another card, check to see if the two cards match
 * 
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * 
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * 
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * 
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
