var $hamburger = $(".hamburger");
$hamburger.on("click", function(e) {
  $hamburger.toggleClass("is-active").click(function(){
    $(this).toggleClass('open');
  });
});
