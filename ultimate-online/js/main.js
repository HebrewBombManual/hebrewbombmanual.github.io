// Initialize bomb settings
var bomb = {};
bomb.final_digit = null;
bomb.final_digit_odd = null;
bomb.battery_count = null;

/// Complicated Wires settings
bomb.parallel_port = null;

/// The Button settings
bomb.indicator_car = null;
bomb.indicator_frk = null;

/// Simon Says settings
bomb.vowel = null;
bomb.strikes = 0;

/// Memory settings
bomb.memory_round = 1;
bomb.memory_positions = {};
bomb.memory_labels = {};

// --- Wires
var wires = {};
wires.count = 0;
/// --- Array [first_time, color]
wires.first = [true, null];
wires.second = [true, null];
wires.third = [true, null];
wires.forth = [true, null];
wires.fifth = [true, null];
wires.sixth = [true, null];

$(function () {

    /* ---------- Main ---------- */

    $.post('introduction.html', response => {
        $('#page').html(response);
    }).done(() => {
        
        // Resets
        
        /// Wires:
        var wires = {};
        wires.count = 0;
        wires.first = [true, null];
        wires.second = [true, null];
        wires.third = [true, null];
        wires.forth = [true, null];
        wires.fifth = [true, null];
        wires.sixth = [true, null];
        
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


    /* ---------- Bomb initializion ---------- */
    
    // final_digit_odd
    $('body').on('keyup', 'input[name="final_serial_digit"]', function () {
        bomb.final_digit = $('input[name="final_serial_digit"]').val();
        if(bomb.final_digit %2 == 0)
            bomb.final_digit_odd = false;
        else
            bomb.final_digit_odd = true;
    });


    /* ---------- Bomb functions ---------- */
    
    function spontaneous_final_digit_check() {
        // popup
        // if input %2 == 0 => false, else => true
    }
    
    
    /* ---------- Wires ---------- */

    function getOccurrences(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }
    
    function getWiresColors() {
        var all_wires = [wires.first, wires.second, wires.third,
                         wires.forth, wires.fifth, wires.sixth];
        var wires_colors = [];
        all_wires.forEach(function (entry) {
            wires_colors.push(entry[1]);
        });
        
        return wires_colors;
    }

    function three_wires() {
        if (getOccurrences(getWiresColors(), "red") == 0)
            return "החוט השני";
        else if (wires.third[1] == "white")
            return "החוט האחרון (חוט שלישי)";
        else if (getOccurrences(getWiresColors(), "blue") > 1)
            return "חוט כחול אחרון";
        return "החוט האחרון (חוט שלישי)";
    }

    function four_wires() {
        if (bomb.final_digit_odd = null)
            spontaneous_final_digit_check();
        if (getOccurrences(getWiresColors(), "red") > 1 && bomb.final_digit_odd == true)
            return "חוט אדום אחרון";
        else if (wires.forth[1] == "yellow" && getOccurrences(getWiresColors(), "red") == 0)
            return "החוט הראשון";
        else if (getOccurrences(getWiresColors(), "blue") == 1)
            return "החוט הראשון";
        else if (getOccurrences(getWiresColors(), "yellow") > 1)
            return "החוט האחרון (חוט רביעי)";
        return "החוט השני";
    }

    function five_wires() {
        if (bomb.final_digit_odd = null)
            spontaneous_final_digit_check();
        if (wires.fifth[1] == "black" && bomb.final_digit_odd == true)
            return "החוט הרביעי";
        else if (getOccurrences(getWiresColors(), "red") == 1 && getOccurrences(getWiresColors(), "yellow") > 1)
            return "החוט הראשון";
        else if (getOccurrences(getWiresColors(), "black") == 0)
            return "החוט השני";
        return "החוט הראשון";
    }

    function six_wires() {
        if (bomb.final_digit_odd = null)
            spontaneous_final_digit_check();
        if (getOccurrences(getWiresColors(), "yellow") == 0 && bomb.final_digit_odd == true)
            return "החוט השלישי";
        else if (getOccurrences(getWiresColors(), "yellow") == 1 && getOccurrences(getWiresColors(), "white") > 1)
            return "החוט הרביעי";
        else if (getOccurrences(getWiresColors(), "red") == 0)
            return "החוט האחרון (חוט שישי)";
        return "החוט הרביעי";
    }

    function solve_wires() {

        switch (wires.count) {
            case 3:
                return three_wires();
                break;
            case 4:
                return four_wires();
                break;
            case 5:
                return five_wires();
                break;
            case 6:
                return six_wires();
                break;
        }
    }
    
    function wires_show_result() {
        $(".fa-refresh").addClass("d-none");
        $(".wires-result").removeClass("d-none").addClass("d-block");
        $(".wires-result").text(solve_wires());
    }
    
    function wires_hide_result() {
        $(".fa-refresh").removeClass("d-none");
        $(".wires-result").removeClass("d-block").addClass("d-none");
    }
    
    /*let wiresKeys = Object.entries(wires);
    
    for(i=1; i<=wiresKeys.length; i++) {
        var currentKey = wiresKeys[i][0];
        
        $('body').on('click', 'input[data-id*="wire'+i+'-opt"]', function() {
            if (wires.currentKey[0] == true) {
                wires.count++;
                wires.currentKey[0] = false;
            }
            wires.first[1] = $(this).data('color');

            if (wires.count > 2)
                wires_show_result();
            else
                wires_hide_result();
        });
    }*/
    
    // Wire #1
    $('body').on('click', 'input[data-id*="wire1-opt"]', function() {
        if (wires.first[0] == true) {
            wires.count++;
            wires.first[0] = false;
        }
        wires.first[1] = $(this).data('color');

        if (wires.count > 2)
                wires_show_result();
            else
                wires_hide_result();
    });    
    
    // Wire #2
    $('body').on('click', 'input[data-id*="wire2-opt"]', function() {
        if (wires.second[0] == true) {
            wires.count++;
            wires.second[0] = false;
        }
        wires.second[1] = $(this).data('color');

        if (wires.count > 2)
                wires_show_result();
            else
                wires_hide_result();
    });
    
    // Wire #3
    $('body').on('click', 'input[data-id*="wire3-opt"]', function() {
        if (wires.third[0] == true) {
            wires.count++;
            wires.third[0] = false;
        }
        wires.third[1] = $(this).data('color');
        
        if (wires.count > 2)
                wires_show_result();
            else
                wires_hide_result();
    });
    
    // Wire #4
    $('body').on('click', 'input[data-id*="wire4-opt"]', function() {
        if (wires.forth[0] == true) {
            wires.count++;
            wires.forth[0] = false;
        }
        wires.forth[1] = $(this).data('color');
        
        if (wires.count > 2)
                wires_show_result();
            else
                wires_hide_result();
    });
    
    // Wire #5
    $('body').on('click', 'input[data-id*="wire5-opt"]', function() {
        if (wires.fifth[0] == true) {
            wires.count++;
            wires.fifth[0] = false;
        }
        wires.fifth[1] = $(this).data('color');
        
        if (wires.count > 2)
                wires_show_result();
            else
                wires_hide_result();
    });
    
    // Wire #6
    $('body').on('click', 'input[data-id*="wire6-opt"]', function() {
        if (wires.sixth[0] == true) {
            wires.count++;
            wires.sixth[0] = false;
        }
        wires.sixth[1] = $(this).data('color');
        
        if (wires.count > 2)
                wires_show_result();
            else
                wires_hide_result();
    });
    
    // Wires reset button
    $('body').on('click', '.btn-wires-reset', function () {
        $('label[name="wires-radio-label"]').removeClass("active");
        wires_hide_result();
    });
});