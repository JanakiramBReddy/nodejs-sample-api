module.exports = (app) =>{
    const sailingDates = require('../controllers/sailingDates.controllers.js');

    app.post('/sailingDates',sailingDates.createsailingDates);

    app.get('/sailingDates',sailingDates.getAllsailingDates);

    app.get('/sailingDates/:sailingDatesId',sailingDates.getsailingDatesById);

    app.put('/sailingDates/:sailingDatesId',sailingDates.getsailingDatesByIdAndUpdate);

    app.delete('/sailingDates/:sailingDatesId',sailingDates.getsailingDatesByIdAndDelete);
}
