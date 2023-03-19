let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const newBook = document.querySelector('.addBook');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const bookForm = document.querySelector('.bookForm');
bookForm.addEventListener('submit', createBook);
newBook.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const libraryGrid = document.querySelector('.library--grid');
  libraryGrid.innerHTML = '';
  myLibrary.forEach((book, i) => {
    const item = `<div class="book-item">
        <p>"${book.title}"</p>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <div class="button-itens">
          <button class="read-button" onclick="toggleRead(${i})">${
      book.read ? 'Read' : 'Not Read'
    }</button> 
          <button class="remove-button" onclick="removeBook(${i})">Remove</button>
        </div>
      </div>`;
    libraryGrid.insertAdjacentHTML('beforeend', item);
  });
}

function openModal() {
  bookForm.reset();
  overlay.classList.add('active');
  modal.classList.add('active');
}
function closeModal() {
  overlay.classList.remove('active');
  modal.classList.remove('active');
}

function createBook(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);
  displayBooks();
  closeModal();
}

function removeBook(i) {
  myLibrary.splice(i, 1);
  displayBooks();
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}
