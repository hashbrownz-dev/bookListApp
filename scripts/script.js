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
            const storedBooks = [
                {
                    title:'hookers',
                    author:'Scooty',
                    isbn:666999
                },
                {
                    title:'lookers',
                    author:'Scooty',
                    isbn:999666
                }
            ];
            const books = storedBooks;
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
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector('.container');
            const form = document.querySelector('#book-form');
            container.insertBefore(div, form);
            //Vanish in 3 Seconds
            setTimeout(
                ()=>{
                    document.querySelector('.alert').remove();
                }, 3000)
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
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please Fill in Each Field','danger');
    } else {
        const book = new Book(title, author, isbn);
        ui.addBookToList(book);
        ui.clearFields();
    }
})
//  Remove Book
document.querySelector('#book-list').addEventListener('click', event => {
    //console.log(event.target);
    ui.deleteBook(event.target);
})