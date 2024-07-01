document.addEventListener('DOMContentLoaded', function() {
    const bookList = document.getElementById('book-list');
    const fetchBooksButton = document.getElementById('fetch-books');
    const addBookForm = document.getElementById('add-book-form');
    const updateDeleteBookForm = document.getElementById('update-delete-book-form');
    const updateBookButton = document.getElementById('update-book');
    const deleteBookButton = document.getElementById('delete-book');

    // Fetch and display books
    function fetchBooks() {
        axios.get('/books')
            .then(response => {
                const books = response.data;
                bookList.innerHTML = '';
                if (Array.isArray(books) && books.length > 0) {
                    books.forEach(book => {
                        const bookItem = document.createElement('div');
                        bookItem.textContent = `ID: ${book.id}, Author: ${book.author}, Language: ${book.language}, Title: ${book.title}`;
                        bookList.appendChild(bookItem);
                    });
                } else {
                    bookList.textContent = 'No books found!';
                }
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    // Fetch books when button is clicked
    fetchBooksButton.addEventListener('click', function() {
        fetchBooks();
    });

    // Add a new book
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(addBookForm);
        axios.post('/books', formData)
            .then(response => {
                console.log(response.data);
                fetchBooks();
            })
            .catch(error => console.error('Error adding book:', error));
    });

    // Update a book
    updateBookButton.addEventListener('click', function() {
        const id = document.getElementById('book-id').value;
        const author = document.getElementById('update-author').value;
        const language = document.getElementById('update-language').value;
        const title = document.getElementById('update-title').value;

        const formData = new FormData();
        formData.append('author', author);
        formData.append('language', language);
        formData.append('title', title);

        axios.put(`/book/${id}`, formData)
            .then(response => {
                console.log(response.data);
                fetchBooks();
            })
            .catch(error => console.error('Error updating book:', error));
    });

    // Delete a book
    deleteBookButton.addEventListener('click', function() {
        const id = document.getElementById('book-id').value;

        axios.delete(`/book/${id}`)
            .then(response => {
                console.log(response.data);
                fetchBooks();
            })
            .catch(error => console.error('Error deleting book:', error));
    });
});
