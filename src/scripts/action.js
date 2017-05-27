$(document).ready(function () {
   //initialize swiper when document ready
  //  var mySwiper = new Swiper ('.swiper-container', {
  //    loop: true,
  //    direction: 'horizontal',
  //    pagination: '.swiper-pagination',
  //    paginationClickable: true
  //  })
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
  });
  swiper.slideTo(1, 10, false);
 });
