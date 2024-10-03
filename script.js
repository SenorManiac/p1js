const myLibrary = [];

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const submit = document.getElementById('submit');
const list = document.getElementById('book-list');
const form = document.getElementById('add-book');
const header = document.getElementById('table-header');
const addBook = document.getElementById('add-book-btn');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
let x = 0;


function bookInfo(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.read = read ? 'Yes' : 'Not Read'; 
    this.info = function() {
        return [this.title, this.author, this.pages, this.read];
    }
}

addBook.addEventListener('click', () => {    
    modal.style.display = 'block';
})

close.addEventListener('click', () => {
    modal.style.display = 'none';
})

function addBookToLibrary(book) {
    myLibrary.push(book);
}


submit.addEventListener('click', () => {
    if (title.value === '' || author.value === '' || pages.value === '' || read.value === '') {
        alert('Please fill in all fields');
        return;
    } else if (myLibrary.some(book => book.title === title.value && book.author === author.value)) {
        alert('This book already exists in the library');
        return;
    } else {
        let book = new bookInfo(title.value, author.value, pages.value, read.checked);
        addBookToLibrary(book);
        console.log(myLibrary);
        displayBooks();
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();

   
});


function displayBooks() {
    let rowid = `row${myLibrary.length - 1}`;
    let buttonid = `button${myLibrary.length - 1}`;
    let lastBook = myLibrary[myLibrary.length - 1];
    let books = lastBook.info();
    list.innerHTML += `<tr id="${rowid}">${books.map(item => `<td>${item}</td>`).join('')}<td><button class ="remove" id="${buttonid}">x</button><td><button class="finished-reading">Yes</button></tr>`;
    if (x == 0){
        header.appendChild(document.createElement("th")).textContent = 'Remove';
        header.appendChild(document.createElement("th")).textContent = 'Finished Reading'; 
        x = 1} 
    
   
}


list.addEventListener('click', (e) => { 
    if (e.target.classList.contains('remove')) {    
        if (confirm('Are you sure you want to delete this book?')) {
            let row = e.target.parentElement.parentElement;
            let index = row.rowIndex;
            row.remove(); // Remove the row from the DOM
            myLibrary.splice(index - 1, 1); // Adjust index if there's a header row
        }
    }
});

list.addEventListener('click', (e) => { 
    if (e.target.classList.contains('finished-reading')) {    
        if (confirm('Did you read this book?')) {
            let row = e.target.parentElement.parentElement;
            let index = row.rowIndex;
            myLibrary[index - 1].read = 'Yes';
            row.cells[3].textContent = 'Yes';}
    }
});