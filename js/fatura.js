/*!
 * jQuery JavaScript File for RENTCAR - Faturas 2019
 */

$( document ).ready(function() {
    
    $( ".cleanInputValue" ).change(function() {
        var inputValue = $(this).val();
        $(this).attr('value', inputValue);  
        inputValue = '';
      });


});

