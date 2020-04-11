// Initialize bomb settings
var bomb = {
    final_digit: null,
    final_digit_odd: null,
    battery_count: null,

    /// Complicated Wires settings
    parallel_port: null,

    /// The Button settings
    indicator_car: null,
    indicator_frk: null,

    /// Simon Says settings
    vowel: null,
    strikes: 0,

    /// Memory settings
    memory_round: 1,
    memory_positions: {},
    memory_labels: {}
}

var wires_keys = {
    first: null,
    second: null,
    third: null,
    forth: null,
    fifth: null,
    sixth: null
}

// --- Wires
var wires = {
    keys: wires_keys,

    // save initial values
    init: function () {
        var origValues = {};
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && prop != "origValues") {
                origValues[prop] = this[prop];
            }
        }
        this.origValues = origValues;
    },
    // restore initial values
    reset: function () {
        for (var prop in this.origValues) {
            this[prop] = this.origValues[prop];
        }
    }
}

// --- The Button
var button = {
    color: null,
    word: null
}



$(function () {

    /* ---------- Objects initialization ---------- */
    wires.init();

    /* ---------- Main ---------- */

    // First load -> introduction.html
    $.post('introduction.html', response => {
        $('#page').html(response);
    })

    // Changing pages
    $('body').on('click', 'a[data-target]', e => {
        e.preventDefault();
        let target = e.currentTarget.dataset.target;
        $.get(target, response => {
            $('#page').html(response);

            // Nav-bar
            $('.nav-item').removeClass('active');
            $(e.currentTarget).parent('.nav-item').addClass('active');
        }).done(() => {
            
            /* ---------- Check target and load variables ---------- */
            /*if (target == 'the-button.html') {
                //$('input element id').val(wires.last_digit_odd);
            } else if () {
                //load        
            }*/

            /* ---------- Objects resets ---------- */

            wires.reset();

        });
    });

    // Tooltips
    $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
    });

    /* ---------- Bomb initializion ---------- */

    // final_digit & final_digit_odd
    $('body').on('keyup', 'input[name="final_serial_digit"]', function () {
        if ($(this).val() != "") {
            bomb.final_digit = $(this).val();
            if (bomb.final_digit % 2 == 0)
                bomb.final_digit_odd = false;
            else
                bomb.final_digit_odd = true;

            $('#spontaneousFinalDigitCheckModal').modal('hide');
            $('label[data-wire="5"]').removeClass("disabled");
            if (objectCountNotNull(wires.keys) > 2)
                wires_show_result();
        }
    });

    // battery_count
    $('body').on('keyup', 'input[name="batteries"]', function () {
        if ($(this).val() != "") {
            bomb.battery_count = $(this).val();
            $('#spontaneousButtonDataCheckModal').modal('hide');
        }
    });


    /* ---------- Bomb functions ---------- */


    /* ---------- Wires ---------- */

    function getOccurrences(myArray, value) {
        var count = 0;
        myArray.forEach((v) => (v === value && count++));
        return count;
    }

    function getWiresColors() {
        var wires_colors = [];
        Object.entries(wires.keys).forEach((key, val) => {
            wires_colors.push(key[1]);
        });
        return wires_colors;
    }

    function objectCountNotNull(myObject) {
        var counter = 0;
        for (var key in myObject) {
            if (myObject[key] != null)
                counter++;
        }
        return counter;
    }

    function wires_three() {
        if (getOccurrences(getWiresColors(), "red") == 0)
            return "חוט שני";
        else if (wires.keys.third == "white")
            return "חוט אחרון (חוט שלישי)";
        else if (getOccurrences(getWiresColors(), "blue") > 1)
            return "חוט כחול אחרון";
        return "חוט אחרון (חוט שלישי)";
    }

    function wires_four() {
        if (getOccurrences(getWiresColors(), "red") > 1 && bomb.final_digit_odd == true)
            return "חוט אדום אחרון";
        else if (wires.keys.forth == "yellow" && getOccurrences(getWiresColors(), "red") == 0)
            return "חוט ראשון";
        else if (getOccurrences(getWiresColors(), "blue") == 1)
            return "חוט ראשון";
        else if (getOccurrences(getWiresColors(), "yellow") > 1)
            return "חוט אחרון (חוט רביעי)";
        return "חוט שני";
    }

    function wires_five() {
        if (wires.keys.fifth == "black" && bomb.final_digit_odd == true)
            return "חוט רביעי";
        else if (getOccurrences(getWiresColors(), "red") == 1 && getOccurrences(getWiresColors(), "yellow") > 1)
            return "חוט ראשון";
        else if (getOccurrences(getWiresColors(), "black") == 0)
            return "חוט שני";
        return "חוט ראשון";
    }

    function wires_six() {
        if (getOccurrences(getWiresColors(), "yellow") == 0 && bomb.final_digit_odd == true)
            return "חוט שלישי";
        else if (getOccurrences(getWiresColors(), "yellow") == 1 && getOccurrences(getWiresColors(), "white") > 1)
            return "חוט רביעי";
        else if (getOccurrences(getWiresColors(), "red") == 0)
            return "חוט אחרון (חוט שישי)";
        return "חוט רביעי";
    }

    function solve_wires() {

        switch (objectCountNotNull(wires.keys)) {
            case 3:
                return wires_three();
                break;
            case 4:
                return wires_four();
                break;
            case 5:
                return wires_five();
                break;
            case 6:
                return wires_six();
                break;
        }
    }

    function wires_show_result() {
        $(".fa-refresh").addClass("d-none"); // Removes loading animation
        $(".wires-result").removeClass("d-none").addClass("d-block"); // Shows result
        $(".wires-result").text(solve_wires()); // Adds result text
    }

    function wires_hide_result() {
        $(".fa-refresh").removeClass("d-none"); // Removes result
        $(".wires-result").removeClass("d-block").addClass("d-none"); // Shows loading animation
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
    $('body').on('click', 'input[data-id*="wire1-opt"]', function () {
        wires.keys.first = $(this).data('color');
        $('label[data-wire="2"]').removeClass("disabled");
        if (objectCountNotNull(wires.keys) > 2)
            wires_show_result();
    });

    // Wire #2
    $('body').on('click', 'input[data-id*="wire2-opt"]', function () {
        wires.keys.second = $(this).data('color');
        $('label[data-wire="3"]').removeClass("disabled");
        if (objectCountNotNull(wires.keys) > 2)
            wires_show_result();
    });

    // Wire #3
    $('body').on('click', 'input[data-id*="wire3-opt"]', function () {
        wires.keys.third = $(this).data('color');
        $('label[data-wire="4"]').removeClass("disabled");
        if (objectCountNotNull(wires.keys) > 2)
            wires_show_result();
    });

    // Wire #4
    $('body').on('click', 'input[data-id*="wire4-opt"]', function () {
        wires.keys.forth = $(this).data('color');
        // Must to know final_digit_odd to solve correct
        if (bomb.final_digit_odd == null)
            $('#spontaneousFinalDigitCheckModal').modal('show');
        // Therefore: the result will occur only after input has been entered -> modal 'keyup' event

        // final_digit_odd exists
        else {
            $('label[data-wire="5"]').removeClass("disabled");
            if (objectCountNotNull(wires.keys) > 2)
                wires_show_result();
        }
    });

    // Wire #5
    $('body').on('click', 'input[data-id*="wire5-opt"]', function () {
        wires.keys.fifth = $(this).data('color');
        $('label[data-wire="6"]').removeClass("disabled");
        if (objectCountNotNull(wires.keys) > 2)
            wires_show_result();
    });

    // Wire #6
    $('body').on('click', 'input[data-id*="wire6-opt"]', function () {
        wires.keys.sixth = $(this).data('color');
        if (objectCountNotNull(wires.keys) > 2)
            wires_show_result();
    });

    // Wires reset button
    $('body').on('click', 'button[name="btn-reset-all-wires"]', function () {
        $('label[name="wires-radio-label"]').removeClass("active");
        $('label[data-wire!="1"]').addClass("disabled");
        wires_hide_result();
        wires.reset();
    });



    /* ---------- The Button ---------- */

    function buttonReturnResult(option) {
        if (option == "release")
            return 'ללחוץ ולשחרר מיד';
        else
            return 'החזק והתייחס אל "שחרור כפתור מוחזק"'
    }

    function solve_button() {
        if (button.color == "blue" && button.word == "abort")
            return returnButtonResult('hold');
        else if (bomb.battery_count > 1 && button.word == "detonate")
            return returnButtonResult('release');
        else if (button.color == "white" && bomb.indicator_car == true)
            return returnButtonResult('hold');
        else if (bomb.battery_count > 2 && bomb.indicator_frk == true)
            return returnButtonResult('release');
        else if (button.color == "yellow")
            return returnButtonResult('hold');
        else if (button.color == "red" && button.word == "hold")
            return returnButtonResult('release');
        else
            return returnButtonResult('hold');
    }

    function validateButtonInfo() {
        if (button.color != null && button.word != null) {
            // Additional info
            if (bomb.battery_count == null)
                // abc;
                if (bomb.indicator_car == null)
                    // abc;
                    if (bomb.indicator_frk == null)
                        // abc;
                        return true;
        }
    }

    // Button color
    $('body').on('click', 'input[data-id*="btn-color-opt"]', function () {

    });



    /* ---------- Keypads ---------- */

    $('body').on('click', 'div[class="keypad-image"]', function () {
        alert("success");
    });
});