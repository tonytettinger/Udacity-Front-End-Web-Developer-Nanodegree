let catPhoto = document.getElementById('cat');
let catName = document.getElementById('catname');
let counterElement = document.getElementById('counter');
let listOfCats = [{
    name: "Miau",
    website: "https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&h=350"
}, {
    name: "Bobby",
    website: "https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&h=350"
}, {
    name: "Choppy",
    website: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350"
}, {
    name: "Mokky",
    website: "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg"
}, {
    name: "Floki",
    website: "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426"
}]

let currentCatArrayIndex = 4;
let catClickCountArray = [0,0,0,0,0];
let clickCounter = function () {
    catClickCountArray[currentCatArrayIndex] += 1;
    counterElement.innerText = catClickCountArray[currentCatArrayIndex];
}

console.log(listOfCats[0].name);
let eventAdder = function () {
    for (let i = 0; i < listOfCats.length; i++) {
        let currentListElement = 'list' + i;
        let currentCat = document.getElementById(currentListElement);
        let currentCatName = listOfCats[i].name;
        let currentCatPicture = listOfCats[i].website;
        let currentCatCounterTemp = catClickCountArray[i];
        currentCat.addEventListener('click', function (catNameCopy, catCounterTempCopy, iCopy) {
            return function () {
                catName.innerText = catNameCopy;
                catPhoto.src = currentCatPicture;
                currentCatArrayIndex = iCopy;
                counterElement.innerText = catClickCountArray[currentCatArrayIndex];
            };
        }(currentCatName, currentCatCounterTemp, i));
    };
};
eventAdder();
catPhoto.addEventListener('click', clickCounter);