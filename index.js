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

// Event Handlers
newBookButton.onclick = (event) => {
  event.preventDefault();

  bookForm.hidden = false;
}

submitBookButton.onclick = (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const numberOfPages = document.getElementById('numberOfPages').value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, numberOfPages, read);

  myLibrary.push(newBook);

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

function resetTable() {
  bookTable.innerHTML = "";
}

const updateTable = () => {
  resetTable();

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.innerHTML = book.title;

    const authorCell = document.createElement("td");
    authorCell.innerHTML =book.author;

    const pagesCell = document.createElement("td");
    pagesCell.innerHTML = book.numberOfPages;

    const readCell = document.createElement("td");
    readCell.innerHTML = book.read;

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.onclick = removeBook;
    removeButton.setAttribute("data-index", index);
    removeCell.appendChild(removeButton);

    const toggleCell = document.createElement("td");
    const toggleButton = document.createElement("button");
    toggleButton.innerText = "Toggle";
    toggleButton.onclick = toggleBook;
    toggleButton.setAttribute("data-index", index);
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

}