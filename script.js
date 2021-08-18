myLibrary = [];

function Book(title, author, numberOfPages, read=false) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

// HTML Elements
const newBookButton = document.getElementById("new-book");
const bookForm = document.getElementById("book-form");
const submitBookButton = document.getElementById("submit-book");
const bookTable = document.getElementById("book-table-body");


// Functions and Handlers
function toggleFormHidden() {
  bookForm.hidden = !bookForm.hidden;
}

function addBook(event) {
  event.preventDefault();
  event.target.checkValidity();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const numberOfPages = document.getElementById('numberOfPages').value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, numberOfPages, read);

  myLibrary.push(newBook);

  bookForm.reset();
  toggleFormHidden();
  updateTable();
}

function removeBook({ target }) {
  const { index } = target.dataset;
  myLibrary.splice(index, 1);
  updateTable();
}

function toggleBook({ target }) {
  const { index } = target.dataset;
  myLibrary[index].read = !myLibrary[index].read;
  updateTable();
}

function resetForm() {
  bookForm.reset();
}

function resetTable() {
  bookTable.innerHTML = "";
}

const updateTable = () => {
  resetTable();

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.innerHTML = book.title;
    titleCell.setAttribute("scope", "row");

    const authorCell = document.createElement("td");
    authorCell.innerHTML =book.author;

    const pagesCell = document.createElement("td");
    pagesCell.innerHTML = book.numberOfPages;

    const readCell = document.createElement("td");
    readCell.innerHTML = book.read ? "<i class=\"bi bi-check2\"></i>" : "<i class=\"bi bi-x-lg\"></i>";

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.onclick = removeBook;
    removeButton.setAttribute("data-index", index);
    removeButton.classList.add("btn", "btn-danger");
    removeCell.appendChild(removeButton);

    const toggleCell = document.createElement("td");
    const toggleButton = document.createElement("button");
    toggleButton.innerText = "Toggle";
    toggleButton.onclick = toggleBook;
    toggleButton.setAttribute("data-index", index);
    toggleButton.classList.add("btn");
    toggleCell.appendChild(toggleButton);

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(readCell);
    row.appendChild(removeCell);
    row.appendChild(toggleCell);
    bookTable.appendChild(row);
  });
}

window.onload = () => {
  bookForm.onsubmit = addBook;
  newBookButton.onclick = toggleFormHidden;
}