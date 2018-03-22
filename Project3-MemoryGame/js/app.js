/*
 * Create a list that holds all of your cards
 */
var listOfCards, shuffledListOfCards, mappedListOfCards, listOfOpenCards, moveCounter, matchCounter, card, userRating;

//list of 16 elements, representing the 16 cards, the numbers 1-8 represent the 8 different figures (2 of each)
listOfCards= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
listOfOpenCards = [];
star1 = document.getElementById("firststar");
star2 = document.getElementById("secondstar");
star3 = document.getElementById("thirdstar");

moves = document.getElementById("moves");
 //shuffle function
 var shuffle = function() {
 shuffledListOfCards = shuffleCards(listOfCards);
 return shuffledListOfCards;
 }
//function intializing when the page starts
shuffle(); 
moveCounter = 0;
matchCounter = 0;
userRating = "Regular";

//defining variables containing the font awesome classes for the 8 different card types
const figures = 
["fa-leaf", "fa-bicycle",
 "fa-diamond", "fa-bomb",
 "fa-bolt", "fa-anchor", 
 "fa-paper-plane-o", "fa-cube"];

//the array of the randomly shuffled figures
mappedListOfCards = shuffledListOfCards.map(x => figures[x-1]);

// Loops through each card's ID and assign them the corresponding figure class to it's HTML.
function assignCardPictures() {
    for(i=1; i <= shuffledListOfCards.length; i++) {
        let currentCard = document.getElementById('card' + i);
        currentCard.classList.add("fa", mappedListOfCards[i-1]);
    }
};


assignCardPictures();
 
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
//var d = document.getElementById("div1");
//d.className += " otherclass";

var cards = document.querySelectorAll('.card');


function movesCounter(){
    moveCounter++;
    moves.textContent = moveCounter;
    if(moveCounter >= 48) {
        star3.className = "fa fa-star-o";
        userRating ="Card Matching Hero"
    }
    if(moveCounter >= 48) {
        star2.className = "fa fa-star-o";
        userRating ="Expert"
    }
    if(moveCounter >= 48) {
        star1.className = "fa fa-star-o";
        userRating = "Apprentice"
    }
    return userRating
};

function setMatchClass(){
    const openCards = document.querySelectorAll(".open");
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");
    
};

function winningCheck(){
    matchCounter++;
    if(matchCounter === 2) {
        swal("Won the game!", {
            buttons: {
                cancel: "Enough!",
                OK: true,
            },
            })
            .then((value) => {
            switch (value) {
                case "OK":
                swal("New Game Starting Right Now");
                break;
            
                default:
                swal("Thank you for playing!");
            }
            });
        }
}

function removeUnmatchedPairs() {
    const openCards = document.querySelectorAll(".open");
    openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");
};

function openCard(evt) {
    tempEventTarget = evt.target; 
    evt.target.classList.add("open", "show");
    listOfOpenCards.push(evt.target.firstElementChild.className);
}
   
var tempEventTarget = 0;
deck.addEventListener('click', function(evt) {
    if(evt.target.nodeName === 'LI' && tempEventTarget !== evt.target){
        
        setTimeout(openCard, 500, evt);
        movesCounter();
        
        if(listOfOpenCards.length === 2) {
    
            if(listOfOpenCards[0] === listOfOpenCards[1]) {

                setMatchClass();
                winningCheck();
                    
                } else {
                    
                setTimeout(removeUnmatchedPairs, 500);
            
            }

            listOfOpenCards =[];

        }

    }
    return tempEventTarget;
})
/*
 * set up the event listener for a card. If a card is clicked:
*/

 /*  OK display the card's symbol (put this functionality in another function that you call from this one)
 * 
 *   OK add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * 
 *   OK if the list already has another card, check to see if the two cards match
 * 
 *    OK if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * 
 *    OK if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * 
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * 
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


var minutes = 0;
var seconds = 0;
function countTimer() {
    startTime = setInterval(() => {
        time.innerText = minutes + ' : ' + seconds;
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

countTimer();