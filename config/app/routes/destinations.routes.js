module.exports = (app) =>{
    const destinations = require('../controllers/destinations.controllers.js');

    app.post('/destinations',destinations.createDestination);

    app.get('/destinations',destinations.getAllDestinations);

    app.get('/destinations/:destinationId',destinations.getdestinationById);

    app.put('/destinations/:destinationId',destinations.getdestinationByIdAndUpdate);

    app.delete('/destinations/:destinationId',destinations.getdestinationByIdAndDelete);
}
