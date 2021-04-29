class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBooktolist(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td> <td>${book.author}</td> <td>${book.isbn}</td> 
                   <td><a href="#" class="delete">X</a></td>`
        console.log(row)
        list.appendChild(row);
    }

    clearFields() {

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showMessageBox(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //timeout  3sec
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className = 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}
//localStorage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }
    
        return books;
      }
      static displayBooks() {
        const books = Store.getBooks();
    
        books.forEach(function(book){
          const ui  = new UI;
          ui.addBooktolist(book);
        })
      }
    static addBook(book) {
        const books = Store.getBooks();
        
        books.push(book);
    
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach(function(book, index){
         if(book.isbn === isbn) {
          books.splice(index, 1);
         }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }
}







 // Event Listener for delete
 document.getElementById('book-list').addEventListener('click', function(e){
  
    const ui = new UI();
  
    ui.deleteBook(e.target);
  
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    ui.showMessageBox('Book Removed!', 'success');
  
    e.preventDefault();
  });


//Event listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit',
    function (e) {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        const book = new Book(title, author, isbn);
        console.log(book);

        const ui = new UI();
        //form Validation
        if (title === '' || author === '' || isbn === '') {
            ui.showMessageBox('Check Your Input', 'error');
        }
        else {
            ui.addBooktolist(book);
            ui.clearFields();
  
            Store.addBook(book);
        
            ui.showMessageBox('Book Added', 'success');
        }

      
        e.preventDefault();
    })