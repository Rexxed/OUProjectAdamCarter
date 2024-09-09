// Execute in strict mode to prevent some common mistakes
"use strict";

// Declare a controller object for use by the HTML view

var controller = new imageObject;

function imageObject(){

	var url = "http://localhost:3000/images";
	var images = [];



	var loadFile = function(event) {
		var image = document.getElementById('output');
		image.src = url.createObjectURL(event.target.files[0]);
	};
	function test(){
		function onSuccess(obj) {
			console.log("Test");
		}


		$.ajax(url, {
            type: "GET",
            data:  {},
            success: onSuccess, 
        })
	}

	function getImage(){
		function onSuccess(obj) {
			console.log("Getting image");
			images = obj;
			updateImage();

		}
		$.ajax(url, {
            type: "GET",
            data:  {},
            success: onSuccess, 
        })

	}



	function updateImage(){
		var imageBoxes = document.getElementById("imageBoxesId");
		for (let index = 0; index < images.length; index++) {
			imageBoxes.innerHTML += '<div class="image"> <a href="'+images[index].src+'"> <img id="image1" src="'+images[index].src+'"alt="Screenshot of the videogame League of Legends"></a></div>'
		}
	}


	function uploadImage(){
		var input = document.getElementById("uploadSelector");
		input.addEventListener('change', () => {
			var imgBlob = window.URL.createObjectURL(input.files[0])
			var imgBlobSrc = imgBlob.src
		});
	}


	function uploadImageImgur(){
		var formData = new FormData();
		formData.append("image", $("#uploadSelector")[0].files[0]);
		function onSuccess(response){
			console.log(response);
			var photo = response.data.link;
			var photo_hash = response.data.deletehash;
			function onSuccess(){
				console.log("Image successfully uploaded");
			}
			$.ajax(url, {
				type: "POST",
				data:  {src:photo},
				success: onSuccess, 
			})

		}
			$.ajax({
			url: "https://api.imgur.com/3/image",
			type: "POST",
			datatype: "json",
			headers: {
			"Authorization": "Client-ID 0f5708fb01cfaa3"
			},
			data: formData,
			success: onSuccess, 
			cache: false,
			contentType: false,
			processData: false
			});
		  
		// function onSuccess(){
		// 	console.log("Image successfull uploaded");
		// }
		// var currentLength = (images.length)+1;
		// var src = document.getElementById("imageUrl");
		// $.ajax(url, {
        //     type: "POST",
        //     data:  {id: currentLength, src:src},
        //     success: onSuccess, 
        // })

	}

	function addImage(){
		uploadImageImgur();
		var currentLength = (images.length)+1;
		// function onSuccess(){
		// 	console.log("Image successfully uploaded");
		// }
		// $.ajax(url, {
        //     type: "POST",
        //     data:  {src:photo},
        //     success: onSuccess, 
        // })
	}



	this.uploadImage = function(){
		uploadImage();
	}
	this.addImage = function(){
		addImage();
	}

	this.test = function () {
		test();
	}

	this.getImage = function(){
		getImage();
	}

}