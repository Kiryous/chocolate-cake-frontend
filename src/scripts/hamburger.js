var $hamburger = $(".hamburger");
$hamburger.on("click", function(e) {
  $hamburger.toggleClass("is-active").click(function(){
    $(this).toggleClass('open');
    // jQuery(this).toggleClass('is-active');
    // jQuery('.hamburger-inner ul').toggleClass('is-active');
  });
});
