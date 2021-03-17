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

$(() => {
    $('input[name*="password-3rd"]').on('keyup', (e) => {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            var elm = $(e.currentTarget).attr('name');
            var sel = parseInt(elm.substr(-1)) + 1;
            $('input[name="password-3rd-' + sel + '"]').focus().select()
         }
    })

    $('input[name*="password-5th"]').on('keyup', (e) => {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            var elm = $(e.currentTarget).attr('name');
            var sel = parseInt(elm.substr(-1)) + 1;
            $('input[name="password-5th-' + sel + '"]').focus().select()
         }
    })
})