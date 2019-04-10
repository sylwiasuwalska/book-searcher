"use strict";


var table = document.getElementById("tableResult");

document.getElementById('search').addEventListener('click', searchBooks);
//document.addEventListener("DOMContentLoaded", searchBooks)

function searchBooks() {
	var bookName = document.getElementById('book-name').value;
	var url = 	`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&printType=books&maxResults=4` //filtering by title and type
	fetch(url)
		.then(function(resp) {
			return resp.json();
		})	
		.then(showBooksList);
}

function showBooksList(resp) {
	table.innerHTML = '';
	Object.keys(resp.items).forEach(function (ind) {
		// getting cover of book
		var image = new Image();
		if ((resp.items[ind].volumeInfo.imageLinks)===undefined) {
			image.src = "https://www.freeiconspng.com/uploads/no-image-icon-15.png";
		} else {
			var src = resp.items[ind].volumeInfo.imageLinks.thumbnail;
			image.src = src;
			if (src===undefined) {
				image.alt = `No image available.`;
			}
		}
		//getting title of book
		var title = `${resp.items[ind].volumeInfo.title}`;
		//getting authors of book
		var author = `${resp.items[ind].volumeInfo.authors}`;
		//getting description of book
		var description = resp.items[ind].volumeInfo.description;

		// setting the default value in case of lack of description
		if (description===undefined) {
			description = `No description available.`
		}
		//cutting description to 200 characters
		if  (description.length > 200) {
		    description = description.substring(0,199)+"...";
		}

		//setting all information for table
		var summ = `<h4> ${title} </h4> <h5> ${author} </h5> <p> ${description} </p>`
		var image = `<img src=${image.src}>`

		//creating table
	    var row = table.insertRow();
	    var img = row.insertCell(0);
	    var desc = row.insertCell(1);

	    img.insertAdjacentHTML('beforeend', image);
	    desc.insertAdjacentHTML('beforeend', summ);

	});
}
