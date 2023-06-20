// Main
let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}



// Assigning Variables
const overlay = document.querySelector('.overlay')
const btn = document.getElementById('btn');
const cancelBtn = document.querySelector('.cancel-btn');
const form = document.querySelector('#form');
const modal = document.querySelector('.modal');
const removeBtns = document.querySelectorAll('.remove');
const submit = document.querySelector('.submit');

// Events
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");

  let newBook = new Book(title.value, author.value, pages.value);
  console.log(newBook)
  modal.classList.add('inactive');
  document.querySelector('.overlay').classList.remove('active');
  myLibrary.push(newBook);

  const div = document.createElement('div');
  div.classList.add('card');

  const titleSpan = document.createElement('span');
  createElementAndAppend(div, titleSpan, title, true)
  

  const authorSpan = document.createElement('span');
  createElementAndAppend(div, authorSpan, author, true)

  const pagesSpan = document.createElement('span');
  createElementAndAppend(div, pagesSpan, pages, true)

  const readButton = document.createElement('button');
  checkReadStatus(readButton);
  readButton.addEventListener('click', (e) => {
    toggleRead(readButton);
  })
  createElementAndAppend(div, readButton, undefined, true)
  

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.textContent = 'Remove';
  div.appendChild(removeButton);
  addRemoveCardEventListener(removeButton);

  document.querySelector('.card-container').appendChild(div);
  
});


btn.addEventListener('click', () => {
  form.reset();
  modal.classList.remove('inactive')
  document.querySelector('.overlay').classList.add('active');
});

cancelBtn.addEventListener('click', (button) => {
  modal.classList.add('inactive')
  document.querySelector('.overlay').classList.remove('active');
});

overlay.addEventListener('click', () => {
  modal.classList.add('inactive');
  document.querySelector('.overlay').classList.remove('active');
})

removeBtns.forEach(button => {
  button.addEventListener('click', () => {
    button.parentElement.addEventListener('transitionend', () => button.parentElement.remove())
    button.parentElement.style.transform = 'scale(0)';
  })
})

// Functions
function addToLibrary(...books) {
  myLibrary.push(...books)
}

function addRemoveCardEventListener(button) {
  button.addEventListener('click', () => {
    button.parentElement.addEventListener('transitionend', () => button.parentElement.remove())
    button.parentElement.style.transform = 'scale(0)';
  })
}

function checkReadStatus(button) {
  if (document.querySelector('#accept').checked === true) {
    button.classList.add('read');
    button.textContent = document.querySelector('#accept').value;
  }
  else {
    button.classList.add('unread');
    button.textContent = 'Not Read';
  }
}

function toggleRead(button) {
  if (button.classList.contains('read')) {
    button.classList.replace('read', 'unread');
    button.textContent = 'Not read';
  }
  else {
    button.classList.replace('unread', 'read');
    button.textContent = 'Read';
  }
}

function createElementAndAppend(appendTo, toBeAppend, eleID, lineSpace) {
  if (eleID) toBeAppend.textContent = eleID.value;
  appendTo.appendChild(toBeAppend);
  if (lineSpace) appendTo.appendChild(document.createElement('br'))
}




