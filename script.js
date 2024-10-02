const myLibrary = [];

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const submit = document.getElementById('submit');
const list = document.getElementById('book-list');


function bookInfo(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return [this.title, this.author, this.pages, this.read];
}
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


submit.addEventListener('click', () => {

    let book = new bookInfo(title.value, author.value, pages.value, read.value);
    addBookToLibrary(book);
    console.log(myLibrary);
    displayBooks();
});

function displayBooks() {
    myLibrary.forEach(book => {
        let books = book.info(); // Assuming this is an array
        list.innerHTML += `<tr>${books.map(item => `<td>${item}</td>`).join('')}</tr>`;
    });
}
