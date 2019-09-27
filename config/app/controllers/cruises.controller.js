const Cruise = require('../models/cruises.model.js');

exports.createcruise = (req,res) =>{
    const cruise = new Cruise({
        cruiseTitle:req.body.cruiseTitle,
    });

    cruise.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message :err.message
        });
    });

    if(!req.body.cruiseTitle){
        return res.status(401).send({
            message: "Note content can not be empty"
        })
    }
}

exports.getAllcruises = (req,res) => {
    Cruise.find()
    .then(cruises => {
        res.send(cruises);
    }).catch(err => {
        res.status(500).send({
            message:err.message
        })
    })
}

exports.getcruiseById = (req,res) => {
    Cruise.findById(req.params.cruiseId).then(cruise => {
        res.send(cruise);
        if(!cruise){
            return res.status(404).send({
                message: "Note not found with id " + req.params.cruiseId
            })
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.cruiseId
            });                
        }
    })
} 

exports.getcruiseByIdAndUpdate = (req,res) => {
    Cruise.findByIdAndUpdate(req.params.cruiseId,{
        cruiseTitle:req.body.cruiseTitle,
        },{new :true})
        .then(cruise => {
            if(!cruise) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.cruiseId
                });
            }
            res.send(cruise)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.cruiseId
                });                
            }
        })
}

exports.getcruiseByIdAndDelete = (req, res) => {
    Cruise.findByIdAndRemove(req.params.cruiseId)
    .then(cruise => {
        if(!cruise) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.cruiseId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.cruiseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.cruiseId
        });
    });
};
