const Book = require('../models/book.model.js');

exports.create = (req,res) =>{
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        imgUrl:req.body.imgUrl
    });

    book.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message :err.message
        });
    });

    if(!req.body.imgUrl){
        return res.status(401).send({
            message: "Note content can not be empty"
        })
    }
}

exports.getAllBooks = (req,res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message:err.message
        })
    })
}

exports.getBooksById = (req,res) => {
    Book.findById(req.params.bookId).then(book => {
        res.send(book);
        if(!book){
            return res.status(404).send({
                message: "Note not found with id " + req.params.bookId
            })
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
    })
} 

exports.updateBook = (req,res) => {
    Book.findByIdAndUpdate(req.params.bookId,{
            title : req.body.title,
            author : req.body.author,
            imgUrl: req.body.imgUrl
        },{new :true})
        .then(book => {
            if(!book) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.bookId
                });
            }
            res.send(book)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.bookId
                });                
            }
        })
}

exports.deleteBook = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.bookId
        });
    });
};