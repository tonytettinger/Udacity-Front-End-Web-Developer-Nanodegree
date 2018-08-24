export const getList = () => fetch('https://api.foursquare.com/v2/venues/search?client_id=UZTXSUODUPY5TNBH2D5UJ30Z0OGWQIXHQPXPM30UUUEFHJLK&client_secret=V0HVGVTXZCTEKF40B1H4CSCQABTIOLIDZIO0PYOZN0AOK1DM&v=20180323&limit=20&ll=37.774929,-122.419416&radius=300&query=tea')
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(console.log('error'))