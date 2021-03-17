$(document).ready(function () {
    // Fill in page footers:
    /*var pageCount = $(".page").size();
    pageCount -= $(".no-page-count").size();
    var currentPage = 0;
	var currentBG = 1;
    $(".page").each(function (index) {
        if ($(this).hasClass("no-page-count") == false) {
            currentPage++;
            $(".page-footer", $(this)).each(function (index) {
                if ($(this).hasClass("no-auto-footer") == false) {
                    $(this).html("עמוד " + currentPage + " מתוך " + pageCount);
                }
            });
			
			// pages without page count are the main body
			$(this).addClass('page-bg-0' + currentBG);
			currentBG++
			if(currentBG > 7)
			{
				currentBG = 1;
			}
        }
    });*/
    
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
    $('input[name*="password-1st"]').on('keyup', (e) => {
        var elm = $(e.currentTarget).attr('name');
        var sel = parseInt(elm.substr(-1)) + 1;
        $('input[name="password-1st-' + sel + '"]').focus().select()
    })

    $('input[name*="password-2nd"]').on('keyup', (e) => {
        var elm = $(e.currentTarget).attr('name');
        var sel = parseInt(elm.substr(-1)) + 1;
        $('input[name="password-2nd-' + sel + '"]').focus().select()
    })
})