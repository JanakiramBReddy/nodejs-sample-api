module.exports = (app) =>{
    const books = require('../controllers/books.controllers.js');

    app.post('/books',books.create);

    app.get('/books',books.getAllBooks);

    app.get('/books/:bookId',books.getBooksById);

    app.put('/books/:bookId',books.updateBook);
    
    app.delete('/books/:bookId',books.deleteBook);

}