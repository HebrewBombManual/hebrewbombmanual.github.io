$(function() {
    $.post('introduction.html', response => {
        $('#page').html(response);
    });
    
    // Nav-bar
    $('body').on('click', 'a[data-target]', e => {
        e.preventDefault();
        let target = e.currentTarget.dataset.target;
        $.get(target, response => {
            $('#page').html(response);
            $('.nav-item').removeClass('active');
            $(e.currentTarget).parent('.nav-item').addClass('active');
        });
    });
    
    // Tooltips
    $('body').tooltip({selector: '[data-toggle="tooltip"]'});
});