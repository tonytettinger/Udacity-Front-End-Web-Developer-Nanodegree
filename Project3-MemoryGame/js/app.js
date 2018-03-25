//defining variables
let listOfCards, shuffledListOfCards, mappedListOfCards, listOfOpenCards, moveCounter,
    matchCounter, card, userRating, restartButton, minutes, seconds, cardStatus, cardFigure,
    star1, star2, star3, moves, time, clickFunctionsFinished, tempEventTarget, deck;

//defining variables containing the font awesome CSS classes for the 8 different card types
const figures = ["fa-leaf", "fa-bicycle",
    "fa-diamond", "fa-bomb",
    "fa-bolt", "fa-anchor",
    "fa-paper-plane-o", "fa-cube"
];

/*
*the cardStatus element contains the CSS defining if the card is open, closed or matched, 
*the cardFigure the symbol displayed
*/
cardStatus = document.querySelectorAll('.card');
cardFigure = document.querySelectorAll('.card i');

//selects the three displayed stars that decrease with the number of clicks (highest rating is 3 stars)
star1 = document.getElementById("firststar");
star2 = document.getElementById("secondstar");
star3 = document.getElementById("thirdstar");

restartButton = document.getElementById("restart");
moves = document.getElementById("moves");
time = document.getElementById("time");
deck = document.querySelector(".deck");

minutes = 0;
seconds = 0;

clickFunctionsFinished = 'yes';
tempEventTarget = 0;

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffleCards(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

/*
*Shuffles the array with the numbers representing the cards 1-8 (2 of each total 16) and 
*creates an array containing the randomly ordered classnames for the cards
*/
let shuffle = function () {
    //shuffle array of numbers
    shuffledListOfCards = shuffleCards(listOfCards);
    //create array of the randomly shuffled figures based on the array of random numbers
    mappedListOfCards = shuffledListOfCards.map(x => figures[x - 1]);
    return shuffledListOfCards;
};

// Loops through each card's ID and assign them the corresponding figure class to it's HTML.
let assignCardPictures = function () {
    for (i = 1; i <= shuffledListOfCards.length; i++) {
        let currentCard = document.getElementById('card' + i);
        currentCard.classList.add("fa", mappedListOfCards[i - 1]);
    }
};

//Timer functionality
let countTimer = function () {
    timer = setInterval(() => {
        time.innerText = minutes + ' : ' + seconds;
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

//Setting starting conditions for the game
let startGame = function () {
    //list of 16 elements, representing the 16 cards, the numbers 1-8 represent the 8 different figures (2 of each)    
    listOfCards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    listOfOpenCards = [];
    cardStatus.forEach(function (item) {
        item.className = "card";
    });
    cardFigure.forEach(function (item) {
        item.className = "";
    });
    shuffle();
    assignCardPictures();
    moveCounter = 0;
    moves.textContent = moveCounter;
    matchCounter = 0;
    userRating = "Jedi Master (3 Stars)";
    star2.className = "fa fa-star";
    star3.className = "fa fa-star";
    assignCardPictures();
    minutes = 0;
    seconds = 1;
    time.innerText =  '0 : 0';
};

//initialize starting conditions on page lage
startGame();

//Functions for the click event handler attached to the cards

/*
*movesCounter function:
*Counting and displaying the moves; reducing the number of stars after certain number of moves;
*Sets user rating value based on number of stars:
*Ranks for finding all the matching elements:
*Under 38 steps: Jedi Master 3 stars - set in start function as default value
*Between 38-44 steps: Expert 2 stars
*Between 44+ steps: Apprentice 1 star
*/

function movesCounter() {
    moveCounter++;
    moves.textContent = moveCounter;
    if (moveCounter === 1) {
        countTimer();
    }
    if (moveCounter >= 38) {
        star3.className = "fa fa-star-o";
        userRating = "Expert (2 Stars)";
    }
    if (moveCounter >= 44) {
        star2.className = "fa fa-star-o";
        userRating = "Apprentice (1 Stars)"
    }

    return userRating
};

//In case of matching cards, sets the correct CSS classes.
function setMatchClass() {
    const openCards = document.querySelectorAll(".open");
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");
    clickFunctionsFinished = "yes";
};

//Shaking and turning cards red in case of cards not matching
function addNotMatchAnimation() {
    const openCards = document.querySelectorAll(".open");
    openCards[0].classList.add("nomatch");
    openCards[1].classList.add("nomatch");
};

/*
*In case of not matching cards, 
*removes the previously added no-match animation class and re-sets cards to default
*Also sets the clickFunctionFinished value to 'yes' which is a condition to start a new
*click event function
*/

function removeUnmatchedPairs() {
    const openCards = document.querySelectorAll(".open");
    openCards[0].classList.remove("open", "show", "nomatch");
    openCards[1].classList.remove("open", "show", "nomatch");
    clickFunctionsFinished = 'yes';
};

//Adds classes to show the card and pushes the newly open cards in the related array.

function openCard(evt) {
    tempEventTarget = evt.target;
    evt.target.classList.add("open", "show");
    listOfOpenCards.push(evt.target.firstElementChild.className);
}


/*
*Check if winning condition is reached, in case its true and all pairs are found display message
*detailing how many steps it took to complete the game, the time and offers options to restart or to 
*finish the game
*/

function winningCheck() {
    matchCounter++;
    if (matchCounter === 8) {
        clearInterval(timer);
        swal("Congratulations! You Won the game! Your Rank is: " + userRating +
                ". The number of moves took to finish: " + moveCounter + ", and the total time to complete the game is " +
                (minutes * 60 + seconds) + " seconds. Well done!", {
                    buttons: {
                        cancel: "Enough is ENOUGH!",
                        OK: "I want to play again!",
                    },
                })
            .then((value) => {
                switch (value) {
                    case "OK":
                        swal("New Game Starting Right Now");
                        startGame();
                        break;

                    default:
                        swal("Thank you for playing!");
                }
            });
    };
}

//Add Event Listeners to the restart button and on clicking the cards:

restartButton.addEventListener('click', startGame);
deck.addEventListener('click', function (evt) {
    /*
    *checking if click is on the right element, 
    * the clicked element is not the one clicked previously and if 
    * the click happens when no click function is running
    */
    if (evt.target.nodeName === 'LI' && tempEventTarget !== evt.target && clickFunctionsFinished === 'yes') {

        openCard(evt);
        movesCounter();
        //if there are two cards in the opened cards array starts checking for matching
        if (listOfOpenCards.length === 2) {
            /*
            *sets clickFunctionFinished to something other than yes, 
            *so can't start another matching click event while this one is running
            */
            clickFunctionsFinished = 'you wish';
            if (listOfOpenCards[0] === listOfOpenCards[1]) {
                setMatchClass();
                winningCheck();
            } else {

                const openCards = document.querySelectorAll(".open");
                setTimeout(addNotMatchAnimation, 300);
                setTimeout(removeUnmatchedPairs, 1200);

            }
            //resets list of open cards array to zero
            listOfOpenCards = [];
        };
    };
    //this is necessary to check if the card clicked is not itself
    return tempEventTarget;
});