//  BOOK CLASS: Represents a book

    class Book{
        constructor(title,author,isbn){
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }

//  UI CLASS: Handle UI tasks

    class ui{
        static displayBooks(){
            const books = Store.getBooks();
            books.forEach( book => ui.addBookToList(book));
        }
        static addBookToList(book){
            const list = document.querySelector('#book-list');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="btn btn-danger delete">x</a></td>
            `;
            list.appendChild(row);
        }
        static showAlert(message, className){
            const div = document.createElement('div');
            div.className = `alert alert-${className}`;
            //div.textContent = message;
            //div.append(message);
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector('.container');
            const form = document.querySelector('#book-form');
            container.insertBefore(div, form);
            //Vanish in 3 Seconds
            setTimeout(() => div.remove(), 3000);
        }
        static clearFields(){
            const fields = document.querySelectorAll('.form-group > input');
            for(const field of fields){
                field.value = '';
            }
        }
        static deleteBook(target){
            //target.parent.parent.remove();
            if(target.classList.contains('delete')){
                target.parentElement.parentElement.remove();
            }
        }
    }
//  STORE CLASS: Handles storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//  EVENTS:
//  Display Book
document.addEventListener('DOMContentLoaded', ui.displayBooks);
//  Add Book
document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();

    //Get Form Values
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    //Validate Form Values

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please Fill in Each Field','danger');
    } else {
        const book = new Book(title, author, isbn);
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlert('Book Added', 'success');
        ui.clearFields();
    }
})
//  Remove Book
document.querySelector('#book-list').addEventListener('click', event => {
    //console.log(event.target);
    if(event.target.classList.contains('delete')){
        ui.deleteBook(event.target);
        Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
        ui.showAlert('Book Removed', 'success');
    }
})