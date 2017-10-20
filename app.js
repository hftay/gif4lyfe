
var createDOM = function(){
	// create HTML Dom elements in JS
	// and set attributes using .prop (not.attr)
	var $navbar = $('<div>').prop({
		class: "navbar"
	})
	var $form = $('<form>').prop({
		action: "/",
		method: "get"
	})
	var $input = $('<input>').prop({
		placeholder: "search all the gifs!"
	})
	var $button = $('<button>').prop({
		class: "search-btn",
		type: "submit",
		textContent: "search",
	});
	// append form contents
	$form.append($input);
	$form.append($button);
	$navbar.append($form)
	$('body').append($navbar);	

	var $gifContainer = $('<div>').prop({
		class: "gif-container"
	})
	$('body').append($gifContainer);		
}
createDOM();

var $gifInput = $('input');
var $gifContainer = $('.gif-container')

var ajaxLimit = 10;
var ajaxCounter = 0;


var ajaxCall = function(ajaxCounter){
	var options = {
		url: "http://api.giphy.com/v1/gifs/search",
		method: "get",
		data: { 
			api_key: 'h8zQNEi5XPcKvGzjwqr3KYPkamYWsVD9', 
			q: $gifInput.val(),
			limit: ajaxLimit,
			offset: ajaxCounter
			}
	}
	var appendSearchResults = function(response){
		// console.log(response);
		response.data.forEach(function(gif){
			$gifDiv = $('<img>').prop({
				'src': gif.images.original.url,
				'class': "giphy"
			})
			$gifContainer.append($gifDiv);
		});
	}
	$.ajax(options).done(appendSearchResults);
	// $('input').addClass("input-hide");
}


// -------------------EventListeners ---------------------//

$('.search-btn').on("click", function(event){
	event.preventDefault();
	$gifContainer.children().remove()
	ajaxCall(ajaxCounter);
	ajaxCounter += ajaxLimit;
})

$(window).scroll(function () {
   if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
   	ajaxCall(ajaxCounter);
		ajaxCounter += ajaxLimit;
   }
});


$('input').on("click",function(event){
	// $(event.target).removeClass("input-hide");
	$(event.target).val("");
});
