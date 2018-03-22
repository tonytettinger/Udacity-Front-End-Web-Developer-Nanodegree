/*
 * Create a list that holds all of your cards
 */
<<<<<<< HEAD
var listOfCards, shuffledListOfCards, mappedListOfCards, listOfOpenCards, moveCounter, card;
console.log(listOfOpenCards)
=======
var listOfCards, shuffledListOfCards, mappedListOfCards, listOfOpenCards;

>>>>>>> parent of 3a00cf0... Event Listener on click show card function
//list of 16 elements, representing the 16 cards, the numbers 1-8 represent the 8 different figures (2 of each)
listOfCards= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
listOfOpenCards = [];
console.log(listOfOpenCards)
 //shuffle function
 var shuffle = function() {
 shuffledListOfCards = shuffleCards(listOfCards);
 return shuffledListOfCards;
 }
//function intializing when the page starts
<<<<<<< HEAD
shuffle(); 
moveCounter = 0;
=======
 shuffle();
>>>>>>> parent of 3a00cf0... Event Listener on click show card function

//defining variables containing the font awesome classes for the 8 different card types
const figures = 
["fa-leaf", "fa-bicycle",
 "fa-diamond", "fa-bomb",
 "fa-bolt", "fa-anchor", 
 "fa-paper-plane-o", "fa-cube"]

//the array of the randomly shuffled figures
mappedListOfCards = shuffledListOfCards.map(x => figures[x-1]);
console.log('mappedListOfCards: ', mappedListOfCards);
console.log(shuffledListOfCards);

// Loops through each card's ID and assign them the corresponding images/figures

var assignCardPictures = function() {
    for(i=1; i <= shuffledListOfCards.length; i++) {
        let currentCard = document.getElementById('card' + i);
        console.log(currentCard);
        currentCard.classList.add("fa", mappedListOfCards[i]);
    }
}

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
<<<<<<< HEAD
//var d = document.getElementById("div1");
//d.className += " otherclass";

var cards = document.querySelectorAll('.card');
console.log(cards);
deck.addEventListener('click', function(evt) {
    if(evt.target.nodeName === 'LI'){
        const cardClass = evt.target.firstElementChild.className;
        const cardStatus = evt.target.classList;
        cardStatus.add("open", "show");
        listOfOpenCards.push(cardClass);
        if(listOfOpenCards.length == 2) {
    /*        if(listOfOpenCards[0] === listOfOpenCards[1]) {
                cardStatus.add("match");
                cardStatus.remove("open", "show");
            } else {
                cardStatus.remove("open", "show");
            } */
            console.log(listOfOpenCards);
            const openCards = document.getElementsByClassName("open");
            console.log(openCards.item(0));
            
            setTimeout(function() {
            openCards.item(0).classList.remove("open", "show");
            openCards.item(0).classList.remove("open", "show");
            },700);

            
        }
    }
})
=======
var d = document.getElementById("div1");
d.className += " otherclass";



>>>>>>> parent of 3a00cf0... Event Listener on click show card function
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
