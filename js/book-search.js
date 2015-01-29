$(function () {

  //spinner
  var opts = {
  lines: 13, // The number of lines to draw
  length: 21, // The length of each line
  width: 15, // The line thickness
  radius: 29, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 35, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1.5, // Rounds per second
  trail: 58, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};
var target = document.getElementById('spin');
var spinner = new Spinner(opts).spin(target); 
$('#spin').hide();
 

  function bookSearch () {
  	   var searchTerm = $('#search-term').val();

  	$('#search-term').val('');
  	$('#results').empty();
  	$('#spin').show();

    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes?q=' +searchTerm,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        
        console.log(data);
        $('#spin').hide();
        $.each(data.items, function (i, book) {

             var book = '<div class="book"><a href="'+book.volumeInfo.previewLink+'">'+
             '<img src="'+book.volumeInfo.imageLinks.thumbnail+'" alt="'+book.volumeInfo.title+'">'+
             '</a></div>';
             $('#results').append(book);
        });
    
      },
      error: function (jqXHR, textStatus, ErrorThrown) {
      	console.log(jqXHR);
      	console.log(textStatus);
      	console.log(ErrorThrown);
      }
    });
  }

 $(document).keypress(function (event) {
 	if (event.which === 13) {
 		bookSearch();
 	}
 });
 $('#search-button').click(bookSearch);

});


