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
		var title = document.createElement('h4');
		var img = document.createElement('img');
		var desc = document.createElement('p');

		var src = resp.items[ind].volumeInfo.imageLinks.thumbnail;
		img.src = src;
		if (src===undefined) {
			src = `No image available.`
		}

		title.innerText = `${resp.items[ind].volumeInfo.title}`

		var description = resp.items[ind].volumeInfo.description;

		// setting the default value in case of lack of description
		if (description===undefined) {
			description = `No description available.`
		}
		//cutting description to 150 characters
		if  (description.length > 150) {
		    description = description.substring(0,149)+"...";
		}

		desc.innerText = description;
		
	    bookList.appendChild(title);
	    bookList.appendChild(img);
	    bookList.appendChild(desc);
	});
}
