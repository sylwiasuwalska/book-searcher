"use strict";

const noPreview = "https://www.freeiconspng.com/uploads/no-image-icon-15.png";
var table = document.getElementById("tableResult");
var input = document.getElementById("book-name");
var scrollCounter = 0;


document.getElementById('search').addEventListener('click', function(){
		clearResults();
    	searchBooks(scrollCounter);
	}   
);

input.addEventListener('keyup',function(e){
	clearResults();
    if (e.keyCode === 13) {
    searchBooks(scrollCounter);
  }  
});


function searchBooks(counter) {
	var bookName = input.value;
	var url = 	`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&printType=books&maxResults=5&startIndex=${counter}` //filtering by title and type
	fetch(url)
		.then(function(resp) {
			return resp.json();
		})	
		.then(showBooksList);
}

function showBooksList(resp) {

	if (resp.totalItems === 0) {
		table.innerHTML= `Sorry, we couldn't find what you're looking for!`;
	} else {
		
		Object.keys(resp.items).forEach(function (ind) {
			// getting cover of book
			var cover = new Image();
			if (!resp.items[ind].volumeInfo.imageLinks) {
				cover.src = noPreview;
			} else {
				var src = resp.items[ind].volumeInfo.imageLinks.thumbnail;
				cover.src = src;
				if (!src) {
					cover.src = noPreview;
					cover.alt = `No image available.`;
				}
			}
			//getting title of book
			var title = `${resp.items[ind].volumeInfo.title}`;
			//getting authors of book
			var author = `${resp.items[ind].volumeInfo.authors}`;
			//getting description of book
			var description = resp.items[ind].volumeInfo.description;

			// setting the default value in case of lack of description
			if (!description) {
				description = `No description available.`
			}
			//cutting description to 200 characters
			if  (description.length > 200) {
			    description = description.substring(0,199)+"...";
			}

			//setting all information for table
			const bookInformationHTML = `<h4> ${title} </h4> <h5> ${author} </h5> <p> ${description} </p>`
			var bookCover = `<img src=${cover.src}>`

			//creating table
		    var row = table.insertRow();
		    var img = row.insertCell(0);
		    var desc = row.insertCell(1);

		    img.insertAdjacentHTML('beforeend', bookCover);
		    desc.insertAdjacentHTML('beforeend', bookInformationHTML);

		});
	};
}

//adding elements after scrolling all page

window.onscroll = function() {

    var scrollHeight, totalHeight;
    scrollHeight = document.body.scrollHeight;
    totalHeight = window.scrollY + window.innerHeight;
    if(totalHeight >= scrollHeight)
    {
        scrollCounter= scrollCounter+5;
        searchBooks(scrollCounter);
    }
}

function clearResults() {
	table.innerHTML = '';
	scrollCounter = 0;
}