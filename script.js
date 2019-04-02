"use strict";


var bookList = document.getElementById('books');

document.getElementById('search').addEventListener('click', searchBooks);

function searchBooks() {
	var bookName = document.getElementById('book-name').value;
	var url = 	`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&printType=books`
	fetch(url)
		.then(function(resp) {
			return resp.json();
		})	
		.then(showBooksList);
}

function showBooksList(resp) {
	console.log(resp);
	bookList.innerHTML = '';
	Object.keys(resp.items).forEach(function (ind) {
		var liElem = document.createElement('li');
		

	    liElem.innerText = `Title ${resp.items[ind].volumeInfo.title}, Description: ${resp.items[ind].volumeInfo.description} `;
	    bookList.appendChild(liElem);
	});
}
