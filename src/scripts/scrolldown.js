$(document).ready(function(){
  $(#concertpage-button).click(function(){
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    if ($.browser.safari) {
        $('body').animate({ scrollTop: destination }, 1100); //1100 - скорость прокрутки
    } else {
        $('html').animate({ scrollTop: destination }, 1100);
    }
    return false;
  });
});
