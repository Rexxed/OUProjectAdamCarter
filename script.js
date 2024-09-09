// Execute in strict mode to prevent some common mistakes
"use strict";

// Declare a controller object for use by the HTML view
var controller = new imageObject;

function imageObject() {
	// The base URL to get the images from
	var url = "http://localhost:3000/images";
	// Array to be filled with images
	var images = [];


	// Getting the images from the database using the REST API
	function getImage() {
		function onSuccess(obj) {
			console.log("Getting image");
			images = obj;
			updateImage();

		}
		$.ajax(url, {
			type: "GET",
			data: {},
			success: onSuccess,
		})

	}


	// Update the images when a new image is added
	function updateImage() {
		var imageBoxes = document.getElementById("imageBoxesId");
		for (let index = 0; index < images.length; index++) {
			imageBoxes.innerHTML += '<div class="image"> <a href="' + images[index].src + '"> <img id="image1" src="' + 
			images[index].src + '"alt="Screenshot of the videogame League of Legends"></a></div>'
		}
	}



	// Require user confrimation before uploading an image and check an image has been selected
	function confirmImage() {
		if ($("#uploadSelector")[0].files[0] == null) {
			window.alert("Please select an image!");
			return;
		}
		if (window.confirm("Are you sure you want to upload this image to Imgur.com?")) {
			addImage();
		}
	}

	// Uploading an image to imgur to be accessed by the web application
	function addImage() {
		var formData = new FormData();
		formData.append("image", $("#uploadSelector")[0].files[0]);
		function onError(obj){
			window.alert("Image upload failed");
			console.log("File:", obj);
		}
		// Code edited from https://codepen.io/lnfra/pen/NrZPQZ to access the Imgur API using personal authorisation ID
		$.ajax({
			url: "https://api.imgur.com/3/image",
			type: "POST",
			datatype: "json",
			headers: {
				"Authorization": "Client-ID 0f5708fb01cfaa3"
			},
			data: formData,
			success: uploadServer,
			error: onError,
			cache: false,
			contentType: false,
			processData: false
		});


	}

	// Uploading a link to the image to the server to be accessed by the application
	function uploadServer(obj) {
		console.log(obj);
		var photo = obj.data.link;
		var photo_hash = obj.data.deletehash;
		function onSuccess() {
			console.log("Image successfully uploaded");
			location.reload();
		}
		$.ajax(url, {
			type: "POST",
			data: { src: photo },
			success: onSuccess,
		})
	}



	// Functions for HTML view
	this.confirmImage = function () {
		confirmImage();
	}

	this.getImage = function () {
		getImage();
	}

}