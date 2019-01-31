/*!
 * jQuery JavaScript File for RENTCAR - Faturas 2019
 */

$(document).ready(function () {

    $(".cleanInputValue").change(function () {
        var inputValue = $(this).val();
        $(this).attr('value', inputValue);
        inputValue = '';
    });

    //Load with today date  
    document.querySelector("#dataFatura").valueAsDate = new Date();

    /** Masks for fields */
    $('.money2').mask("#.##0,00", {reverse: true});
    $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('.cep').mask('00000-000');
    //$('#sum').mask("#.##0,00", {reverse: true});


    /** ####### */
    /** Dynamically add inputs */

    //define template
    var template = $('#sections .section:first').clone();
    var sectionsCount = 1;
    $('body').on('click', '.addsection', function () {

        sectionsCount++;
        var section = template.clone().find(':input').each(function () {

            //set id to store the updated section number
            var newId = this.id + sectionsCount;

            //update for label
            $(this).prev().attr('for', newId);

            //update id
            this.id = newId;

        }).end()

            //inject new section
            .appendTo('#sections');
            cost();
        return false;
    });

    //remove section
    $('#sections').on('click', '.remove', function () {
        //fade out section
        $(this).parent().fadeOut(300, function () {
            //remove parent element (main section)
            $(this).parent().parent().remove();
            calculateSum();
            return false;
        });
        return false;
    });

    /** Calculate SUM currency fields */
    $(".cost").each(
        function () {
            $(this).keyup(
                function () {
                    cost();
                });
        });

    function cost() {
        $(".cost").each(
            function () {
                $(this).keyup(
                    function () {
                        calculateSum()
                    });
            });

    }

    function calculateSum() {
         var sum = 0;
        $(".cost").each(
             function () {
                 var vl = this.value.replace(',', '');
                 if (!isNaN(vl) && vl.length != 0) {
                     sum += parseFloat(vl);
                 }
             });

        //$("#sum").val(sum.toFixed(2));
        $("#sum").val(sum);
     }


     $('input.cost').keyup(function (event) {
        // skip for arrow keys
         if (event.which >= 37 && event.which <= 40) {
             event.preventDefault();
         }
         var $this = $(this);
         var num = $this.val().replace(/,/gi, "").split("").reverse().join("");

         var num2 = RemoveRougeChar(num.replace(/(.{3})/g, "$1,").split("").reverse().join(""));

         console.log(num2);

         // the following line has been simplified. Revision history contains original.
         $this.val(num2);
     });

     function RemoveRougeChar(convertString) {
         if (convertString.substring(0, 1) == ",") {
             return convertString.substring(1, convertString.length)
         }
         return convertString;

     }

});

