"use strict";


var table = document.getElementById("tableResult");

document.getElementById('search').addEventListener('click', searchBooks);

function searchBooks() {
	var bookName = document.getElementById('book-name').value;
	var url = 	`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&printType=books&maxResults=40` //filtering by title and type
	fetch(url)
		.then(function(resp) {
			return resp.json();
		})	
		.then(showBooksList);
}

function showBooksList(resp) {
	table.innerHTML = '';
	Object.keys(resp.items).forEach(function (ind) {
		var image = new Image();

		if ((resp.items[ind].volumeInfo.imageLinks)===undefined) {
			image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwH8uCYyecy62M0QGsV83eOkaeMLeBoApCVrKyBPNSK03dlSc";
		} else {
			var src = resp.items[ind].volumeInfo.imageLinks.thumbnail;
			image.src = src;
			if (src===undefined) {
				image.alt = `No image available.`;
			}
		}
		console.log(image)
		console.log(image.src)

		var title = `${resp.items[ind].volumeInfo.title}`;
		var author = `${resp.items[ind].volumeInfo.authors}`;

		var description = resp.items[ind].volumeInfo.description;

		// setting the default value in case of lack of description
		if (description===undefined) {
			description = `No description available.`
		}
		//cutting description to 150 characters
		if  (description.length > 150) {
		    description = description.substring(0,149)+"...";
		}

		var summ = `<h4> ${title} </h4> <h5> ${author} </h5> <p> ${description} </p>`
		var image = `<img src=${image.src}>`

	    var row = table.insertRow();
	    var img = row.insertCell(0);
	    var desc = row.insertCell(1);

	    img.insertAdjacentHTML('beforeend', image);
	    desc.insertAdjacentHTML('beforeend', summ);

	});
}
