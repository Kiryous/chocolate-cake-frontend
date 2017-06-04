// $(document).ready(function() {
// 	$('a#openModal').click( function(event){
// 		event.preventDefault();
// 		$('#overlay').fadeIn(400,
// 		 	function(){
// 				$('#modalWindow')
// 					.css('display', 'block')
// 					.animate({opacity: 1, top: '50%'}, 200);
// 		});
// 	});
//
// 	$('#closeModal, #overlay').click( function(){
// 		$('#modalWindow')
// 			.animate({opacity: 0, top: '45%'}, 200,
// 				function(){
// 					$(this).css('display', 'none');
// 					$('#overlay').fadeOut(400);
// 				}
// 			);
// 	});
// });

function show(state){
		document.getElementById('modal-window').style.display = state;
		document.getElementById('modal-wrap').style.display = state;
}
