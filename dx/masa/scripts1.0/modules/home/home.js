require(['masa'], function () {
    $('#navMenu').on('click', '.nav-parent', function (event) {
        if ($(this).hasClass('current')) {
            $(this).removeClass('current').next('ul').slideUp()
            $(this).parent('li').siblings('li').children('.nav-parent').removeClass('current');
        } else {
            $(this).addClass('current').next('ul').slideDown()
            $(this).parent('li').siblings('li').children('.nav-parent').removeClass('current').next('ul').slideUp();
        };
    });
    $('#navMenu').on('click', '.nav-children', function (event) {
        if ($(this).hasClass('current')) {
            $(this).removeClass('current').next('ul').slideUp()
            $(this).parent('li').siblings('li').children('.nav-children').removeClass('current');
        } else {
            $(this).addClass('current').next('ul').slideDown()
            $(this).parent('li').siblings('li').children('.nav-children').removeClass('current').next('ul').slideUp();
        };
    });
});