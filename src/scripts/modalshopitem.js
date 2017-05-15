// $(document).ready(function() {
//   var x = document.getElementById("modalWindow");
//
            // var modal = $('#showModal');

  // document.getElementById('showModal').onclick = function() {
  //   x.show();
  // };
  //
  // openModal.click(function() {
    // overlay.fadeIn(400, function(){

  // Modal.click(function() {
  //   $('.modal').click(function() {
  //     $(#showModal).css('display', 'block');
  //   });
  // });

            // Modal.click(function() {
            //   // $('.modal').click(function() {
            //     $('.modal').css('display', 'block');
            //   // });
            // });

    // });
  // });

  // document.getElementById('closeModal').onclick = function() {
  //   x.close();
  // };

  // close.click(function(){


    //
    // $('.modal').click(function() {
    //   $(#closeModal).css('display', 'none');
    //   // overlay.fadeOut(400);
    // });



  // });
// });


$(document).ready(function() {
	$('a#openModal').click( function(event){
		event.preventDefault();
		$('#overlay').fadeIn(400,
		 	function(){
				$('#modalWindow')
					.css('display', 'block')
					.animate({opacity: 1, top: '50%'}, 200);
		});
	});

	$('#closeModal, #overlay').click( function(){
		$('#modalWindow')
			.animate({opacity: 0, top: '45%'}, 200,
				function(){
					$(this).css('display', 'none');
					$('#overlay').fadeOut(400);
				}
			);
	});
});
