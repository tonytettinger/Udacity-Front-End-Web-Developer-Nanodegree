export const getList = (venue) => fetch(`https://api.foursquare.com/v2/venues/search?client_id=
OQWJSW3T0ABOB55QGWHTJYDLCD4SKY4Y2C1SRCVTYAUUQCDQ&client_secret=OWDRRZJQKZCFB0O2WGDYHGIJBZXC14HQ0SJA5XHJVXEQIVMN&v=20180323&limit=5&ll=37.774929,-122.419416&radius=400&query=${venue}`)
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(function(error) {
        console.log(error)
    })