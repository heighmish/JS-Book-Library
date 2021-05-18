let myLibrary = [];
const library = document.getElementById("library");
const addBookModal = document.getElementById("addBookModal")
const closeModal = document.getElementById("closeModal");
const addToLibraryButton = document.getElementById("addBookToLibrary");


function book(title, author, pageCount, read)  {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}

const addBookToLibrary = (title, author, pageCount, read) => {
    const newBook = new book(title, author, pageCount, read);
    myLibrary.push(newBook);
}



addBookToLibrary("The Return of the King","J.R.R. Tolkien", "416", "true");
addBookToLibrary("To Kill a MockingBird","Harper Lee", "281", "true");
addBookToLibrary("Calculus, One and Several Varaibles","Sallas, Hille, Etgen", "1200", "false");
addBookToLibrary("Javascript for Dummies"," Emily A. Vander Veer", "368", "true");


const displayLibrary = () => {
    library.innerHTML = "";
    myLibrary.forEach(book => {
        let bookDisplay = document.createElement("DIV");
        bookDisplay.className = "bookDisplay";
        
        let titleDiv = document.createElement("DIV");
        titleDiv.style.fontSize = "40px";
        let authorDiv = document.createElement("DIV");
        authorDiv.style.fontSize = "30px";
        authorDiv.style.fontStyle = "italic";
        let pagesDiv = document.createElement("DIV");
        let buttonsDiv = document.createElement("DIV");

        buttonsDiv.className = "bookDisplayButtonDiv";

        let bookTitle = document.createTextNode(book.title);
        let bookAuthor = document.createTextNode(book.author);
        let bookPages = document.createTextNode(book.pageCount);

        let readButton = document.createElement("BUTTON");
        let deleteButton = document.createElement("BUTTON");
        if (book.read === "true") {
            readButton.innerHTML = "&Tau;";
        } else {
            readButton.innerHTML = "&#8869";
        }

        readButton.addEventListener("click", () => {
            if (book.read === "true") {
                book.read = "false";
            } else {
                book.read = "true";
            }
            displayLibrary();
        })
        deleteButton.innerHTML = "&#8855;";

        deleteButton.addEventListener("click", event => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            displayLibrary();
        })

        titleDiv.appendChild(bookTitle);
        authorDiv.appendChild(bookAuthor);
        pagesDiv.appendChild(bookPages);

        buttonsDiv.appendChild(readButton);
        buttonsDiv.appendChild(deleteButton);

        bookDisplay.appendChild(titleDiv);
        bookDisplay.appendChild(authorDiv);
        bookDisplay.appendChild(pagesDiv);
        bookDisplay.appendChild(buttonsDiv);

        //composite key that should be unique
        bookDisplay.id = book.title + book.author;
        

        library.appendChild(bookDisplay);
    })
    library.appendChild(addButton());

}


const addButton = () => {
    //design 
    let addContainer = document.createElement("DIV");
    addContainer.className = "addContainerStyle";
    let addButton = document.createElement("button");
    addButton.className = "addButtonStyle";
    addButton.innerText = "+";
    addContainer.appendChild(addButton);

    //event listener and functionality
    addContainer.addEventListener("click", () => {
        addBookModal.style.display = "flex";
    })

    return addContainer;
}


closeModal.addEventListener("click", () => {
    addBookModal.style.display = "none";
})
displayLibrary();


addToLibraryButton.addEventListener("click", () => {
    let data = document.forms.bookForm;
    let title = data.title.value;
    let author = data.author.value;
    let pages = data.page.value;
    let read = data.read.checked;
    addBookToLibrary(title, author, pages, read);
    addBookModal.style.display = "none";
    document.forms.bookForm.reset();
    displayLibrary();
})