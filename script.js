let myLibrary = [];

const container = document.querySelector('.book-list')

for (let i = 1; i <= 12; i++) {
    myLibrary.push(new Book(`book${i}`, `author${i}`, i+10, i%2 ? true : false))
}
displayBooks()

function Book(title, author, numPages, read=false) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
}

Book.prototype.info = function() {
    const readOrNot = this.read ? 'read' : 'not read yet'
    console.log(`${this.title} by ${this.author}, ${this.numPages} pages, ${readOrNot}.`)
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read
    return this.read
}

function addBookToLibrary() {
    const title = prompt('Enter book title')
    if (title === null) return

    const author = prompt('Enter book author')
    if (author === null) return

    let isRead, numPages

    while (!parseInt(numPages)) {
        numPages = prompt('Enter number of pages')
        if (numPages === null) return
    }
    
    while (isRead != 'y' && isRead != 'n') {
        isRead = prompt('Have you read this book? (y/n)')
        if (isRead === null) return
        isRead = isRead.toLowerCase()
    }

    const read = isRead === 'y' ? true : false

    const newBook = new Book(title, author, numPages, read)
    myLibrary.push(newBook)

    addCard(newBook, myLibrary.indexOf(newBook))
}

function displayBooks() {
    myLibrary.forEach((book, index) => {
        addCard(book, index)
    })
}

function addCard(book, index) {
    const card = document.createElement('div')
    card.classList.add('book-card')
    card.id = index

    const bookInfo = document.createElement('div')
    bookInfo.classList.add('book-info')

    const title = document.createElement('div')
    title.textContent = `Title: ${book.title}`

    const author = document.createElement('div')
    author.textContent = `Author: ${book.author}`

    const numPages = document.createElement('div')
    numPages.textContent = `Pages: ${book.numPages}`

    const read = document.createElement('div')
    read.classList.add('read')
    read.textContent = 'Status: ' + (book.read ? 'Read' : 'Not read yet')

    bookInfo.append(title, author, numPages, read)
    card.append(bookInfo)

    const bookDeleteButton = document.createElement('button')
    bookDeleteButton.textContent = 'Remove'
    bookDeleteButton.addEventListener('click', bookDeleteHandler)

    const readStatusToggleButton = document.createElement('button')
    readStatusToggleButton.textContent = book.read ? 'Not read' : 'Done reading'
    readStatusToggleButton.addEventListener('click', readStatusToggleHandler)

    const buttonsContainer = document.createElement('div')
    buttonsContainer.classList.add('card-buttons')

    buttonsContainer.append(bookDeleteButton, readStatusToggleButton)
    card.append(buttonsContainer)
    container.append(card)
}

const bookAddButtons = document.querySelectorAll('.add-book-button')

bookAddButtons.forEach(button => {
    button.addEventListener('click', addBookToLibrary)
})

function bookDeleteHandler(e) {
    // Get target book card element and delete it from DOM and myLibrary
    const target = e.target.parentNode.parentNode //the card
    const index = target.id
    target.remove()
    myLibrary.splice(index, 1)

    // Reassign card IDs
    const cards = document.querySelectorAll('.book-card')
    cards.forEach((card, index) => card.id = index)
}

function readStatusToggleHandler(e) {
    const target = e.target.parentNode.parentNode // the card
    const index = target.id
    const targetBook = myLibrary[index]

    const readDiv = target.querySelector('.book-info .read')
    readDiv.textContent = 'Status: ' + (targetBook.toggleReadStatus() ? 'Read' : 'Not read yet')
    
    // Change button textContent
    e.target.textContent = targetBook.read ? 'Not read' : 'Done reading'
}