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

// Reset Objects
let reset = (obj) => {
  Object.keys(obj).map(key => {
    if (obj[key] instanceof Array) obj[key] = []
    else obj[key] = null
  })
}

// --- Wires
var wires_keys = {
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
    sixth: null
}

var wires = {
    keys: wires_keys
}

// --- The Button
var button = {
    color: null,
    word: null
}



$(function () {

    /* ---------- Main ---------- */

    // First load -> introduction.html
    $.post('introduction.html', response => {
        $('#page').html(response);
    })

    // Changing pages
    $('body').on('click', 'a[data-target]', e => {
        e.preventDefault();
        let target = e.currentTarget.dataset.target;

        $.ajax({
            url: target,
            method: 'get',
            cache: false,
            success: (res) => {
                $('#page').html(res);

                // Nav-bar
                $('.nav-item').removeClass('active');
                $(e.currentTarget).parent('.nav-item').addClass('active');
            }
        }).done(() => {
            if (target == 'introduction.html') {
                if (bomb.final_digit)
                    $('input[data-id="final_serial_digit"]').val(bomb.final_digit);
                if (bomb.battery_count)
                    $('input[data-id="batteries"]').val(bomb.battery_count);
                if (bomb.vowel != null) {
                    if (bomb.vowel)
                        $('input[data-id="vowel-opt2"]').parent().addClass('active');
                    else
                        $('input[data-id="vowel-opt1"]').parent().addClass('active');
                }
                if (bomb.indicator_car != null) {
                    if (bomb.indicator_car)
                        $('input[data-id="indicator-car-opt2"]').parent().addClass('active');
                    else
                        $('input[data-id="indicator-car-opt1"]').parent().addClass('active');
                }
                if (bomb.indicator_car != null) {
                    if (bomb.indicator_car)
                        $('input[data-id="indicator-frk-opt2"]').parent().addClass('active');
                    else
                        $('input[data-id="indicator-frk-opt1"]').parent().addClass('active');
                }
                if (bomb.parallel_port != null) {
                    if (bomb.parallel_port)
                        $('input[data-id="parallel-opt2"]').parent().addClass('active');
                    else
                        $('input[data-id="parallel-opt1"]').parent().addClass('active');
                }
            }
            
            /* ---------- Objects resets ---------- */
            
            reset(wires.keys);
            
        });

        return;
    });

    // Tooltips
    $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
    });

    /* ---------- Bomb initializion ---------- */

    // final_digit & final_digit_odd
    $('body').on('keyup', 'input[data-id="final_serial_digit"]', function () {
        if ($(this).val() != "") {

            console.log('Value', $(this).val(), 'entered');

            bomb.final_digit = $(this).val();
            if (bomb.final_digit % 2 == 0)
                bomb.final_digit_odd = false;
            else
                bomb.final_digit_odd = true;

            $('#spontaneousFinalDigitCheckModal').modal('hide');

            // Only after value entered - > calculate
            wires_triggered(bomb.final_digit_odd);
        }
    });

    // battery_count
    $('body').on('keyup', 'input[data-id="batteries"]', function () {
        if ($(this).val() != "") {
            bomb.battery_count = $(this).val();
            $('#spontaneousButtonDataCheckModal').modal('hide');
        }
    });

    // Input:  radio-button selector
    // Output: value of the selected radio-button
    radioCheckedOptionValue = (selector) => {
        $.each($(selector), (i, v) => {
            if ($(v).prop('checked')) {
                console.log($(v).val());
                return $(v).val();
            }
        });
    }

    // vowel
    $('body').on('click', 'input[name="vowel-options"]', function () {
        if ($(this).val() == 'yes')
            bomb.vowel = true;
        else
            bomb.vowel = false;
    });

    // indicator_car
    $('body').on('click', 'input[name="car-options"]', function () {
        if ($(this).val() == 'yes')
            bomb.vowel = true;
        else
            bomb.vowel = false;
    });

    // indicator_frk
    $('body').on('click', 'input[name="frk-options"]', function () {
        if ($(this).val() == 'yes')
            bomb.vowel = true;
        else
            bomb.vowel = false;
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
        else if (wires.keys.fourth == "yellow" && getOccurrences(getWiresColors(), "red") == 0)
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

    // One of the wire's radio-buttons is triggered
    $('body').on('click', 'input[name="options"]', function () {
        wires_triggered(bomb.final_digit_odd);
        // there are at least 3 wires -> solve & show result
        if (objectCountNotNull(wires.keys) > 2)
            wires_show_result();
    });

    // 1. Saves the chosen color into wires.keys
    // 2. Removes "disabled" class for the next wire
    wires_triggered = (final_digit_odd) => {
        var elements = $('input[name="options"]');

        $.each(elements, (i, v) => {
            // if radio-button parent is selected ("active")
            if ($(v).parent().hasClass('active')) {
                let wire = $(v).data('wire');
                var color = $(v).data('color');

                // Save the wire color into wires.keys.{first/second...}
                wires.keys[$(v).data('save')] = color;

                // Remove disabled class from the next wire
                switch (wire) {
                    case 1:
                        $('label[data-wire="2"]').removeClass("disabled");
                        break;
                    case 2:

                        $('label[data-wire="3"]').removeClass("disabled");
                        break;
                    case 3:
                        $('label[data-wire="4"]').removeClass("disabled");
                        break;
                    case 4:
                        // Must to know final_digit_odd to solve correct
                        if (final_digit_odd == null)
                            // the result will occur only after input has been entered -> modal 'keyup' event
                            // can be found under "Bomb initializion"
                            $('#spontaneousFinalDigitCheckModal').modal('show');

                        // final_digit_odd exists
                        else
                            $('label[data-wire="5"]').removeClass("disabled");
                        break;
                    case 5:
                        $('label[data-wire="6"]').removeClass("disabled");
                        break;
                }
            }
        });
    }

    // Wires reset button
    $('body').on('click', 'button[name="btn-reset-all-wires"]', function () {
        $('label[name="wires-radio-label"]').removeClass("active");
        $('label[data-wire!="1"]').addClass("disabled");
        wires_hide_result();
        reset(wires.keys);
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