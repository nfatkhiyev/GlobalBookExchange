function showElem(id) {
    document.getElementById(id).style.display = "initial";
}

function hideElem(id) {
    document.getElementById(id).style.display = "none";
}

function findBookAdd (isbn) {
    fetch('/books/find-by-isbn?isbn=' + isbn, {
        method: 'GET',
    })
        .then(resp => resp.json())
        .then(data => {
            document.getElementById("book-details-title").innerHTML = data.title;
            document.getElementById("book-details-author").innerHTML = data.author;
            document.getElementById("book-details-publisher").innerHTML = data.publisher;
            document.getElementById("book-details-publishedDate").innerHTML = data.publishedDate;
            document.getElementById("book-details-description").innerHTML = data.description;
            hideElem("add-by-isbn-form");
            showElem("confirm-book-div");
        });
}