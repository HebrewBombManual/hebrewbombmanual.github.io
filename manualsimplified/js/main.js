$(document).ready(function () {    
    $("#toTop").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 500 && $(window).width() > 1023) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
});