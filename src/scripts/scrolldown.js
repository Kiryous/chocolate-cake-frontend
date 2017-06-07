$(function () {
    $("shoppage__items").slice(0, 1).show();
    $("shoppage-button").on('click', function (e) {
        e.preventDefault();
        $("shoppage__items:hidden").slice(0, 1).slideDown();
        if ($("shoppage__items:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
});
