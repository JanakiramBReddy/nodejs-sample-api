const Destination = require('../models/destinations.model.js');

exports.createDestination = (req,res) =>{
    const destination = new Destination({
        destinationTitle:req.body.destinationTitle,
    });

    destination.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message :err.message
        });
    });

    if(!req.body.destinationTitle){
        return res.status(401).send({
            message: "Note content can not be empty"
        })
    }
}

exports.getAllDestinations = (req,res) => {
    Destination.find()
    .then(destinations => {
        res.send(destinations);
    }).catch(err => {
        res.status(500).send({
            message:err.message
        })
    })
}

exports.getdestinationById = (req,res) => {
    Destination.findById(req.params.destinationId).then(destination => {
        res.send(destination);
        if(!destination){
            return res.status(404).send({
                message: "Note not found with id " + req.params.destinationId
            })
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.destinationId
            });                
        }
    })
} 

exports.getdestinationByIdAndUpdate = (req,res) => {
    Destination.findByIdAndUpdate(req.params.destinationId,{
        destinationTitle:req.body.destinationTitle,
        },{new :true})
        .then(destination => {
            if(!destination) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.destinationId
                });
            }
            res.send(destination)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.destinationId
                });                
            }
        })
}

exports.getdestinationByIdAndDelete = (req, res) => {
    Destination.findByIdAndRemove(req.params.destinationId)
    .then(destination => {
        if(!destination) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.destinationId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.destinationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.destinationId
        });
    });
};
