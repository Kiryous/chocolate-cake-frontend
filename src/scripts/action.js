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
      spaceBetween: 5,
      centeredSlides: true,
      loop: true,
      breakpoints: {
    // when window width is <= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is <= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        // when window width is <= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
  });
  swiper.slideTo(1, 10, false);
 });
