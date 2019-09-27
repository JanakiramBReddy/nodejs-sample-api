const SailingDate = require('../models/sailingDates.model');

exports.createsailingDates = (req,res) =>{
    const sailingDate = new SailingDate({
        sailingDate:req.body.sailingDate,
    });

    sailingDate.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message :err.message
        });
    });

    if(!req.body.sailingDate){
        return res.status(401).send({
            message: "Note content can not be empty"
        })
    }
}

exports.getAllsailingDates = (req,res) => {
    SailingDate.find()
    .then(sailingDates => {
        res.send(sailingDates);
    }).catch(err => {
        res.status(500).send({
            message:err.message
        })
    })
}

exports.getsailingDatesById = (req,res) => {
    SailingDate.findById(req.params.sailingDateId).then(sailingDate => {
        res.send(sailingDate);
        if(!sailingDate){
            return res.status(404).send({
                message: "Note not found with id " + req.params.sailingDateId
            })
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.sailingDateId
            });                
        }
    })
} 

exports.getsailingDatesByIdAndUpdate = (req,res) => {
    SailingDate.findByIdAndUpdate(req.params.sailingDateId,{
        sailingDate:req.body.sailingDate,
        },{new :true})
        .then(sailingDate => {
            if(!sailingDate) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.sailingDateId
                });
            }
            res.send(sailingDate)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.sailingDateId
                });                
            }
        })
}

exports.getsailingDatesByIdAndDelete = (req, res) => {
    SailingDate.findByIdAndRemove(req.params.sailingDateId)
    .then(sailingDate => {
        if(!sailingDate) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.sailingDateId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.sailingDateId
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.sailingDateId
        });
    });
};
