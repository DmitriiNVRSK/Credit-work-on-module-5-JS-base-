let books = JSON.parse(localStorage.getItem('books')) || [];

document.getElementById('book-form').addEventListener('submit', addBook);
document.getElementById('clear-books').addEventListener('click', clearBooks);
document.getElementById('refresh-page').addEventListener('click', () => location.reload());
displayBooks();

function addBook(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const status = document.getElementById('status').value;

    const book = { title, author, year, genre, status };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
    document.getElementById('book-form').reset();
}

function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} (${book.year}, ${book.genre}) - ${book.status}
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        `;
        bookList.appendChild(li);
    });

    document.getElementById('book-count').innerText = `Number of books: ${books.length}`;
}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

function clearBooks() {
    books = [];
    localStorage.removeItem('books');
    displayBooks();
}

function editBook(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('genre').value = book.genre;
    document.getElementById('status').value = book.status;
    deleteBook(index);
}


