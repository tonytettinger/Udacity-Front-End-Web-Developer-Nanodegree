export const getList = () => fetch('https://api.foursquare.com/v2/venues/explore?client_id=UZTXSUODUPY5TNBH2D5UJ30Z0OGWQIXHQPXPM30UUUEFHJLK&client_secret=V0HVGVTXZCTEKF40B1H4CSCQABTIOLIDZIO0PYOZN0AOK1DM&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee')
    .then(function (res) {
        // Code for handling API response
        console.log(res)
    })
    .catch(function () {
        // Code for handling errors
    });