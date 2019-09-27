module.exports = (app) =>{
    const cruises = require('../controllers/cruises.controller');

    app.post('/cruises',cruises.createcruise);

    app.get('/cruises',cruises.getAllcruises);

    app.get('/cruises/:cruiseId',cruises.getcruiseById);

    app.put('/cruises/:cruiseId',cruises.getcruiseByIdAndUpdate);

    app.delete('/cruises/:cruiseId',cruises.getcruiseByIdAndDelete);
}
