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

        $("#sum").val(sum.toFixed(2));
        //$("#sum").val(sum);
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

     $('#limparFatura').on('click', function () {
        clearForm();
    });

     $('#gerarFatura').on('click', function () {

            //GET all values from inputs of form and add into fatura
            
            //My company 
            var numeroFatura = $('#numeroFatura').val();
            var nomeEmpresa = $('#nomeEmpresa').val();
            var enderecoEmpresa = $('#endereco').val();
            var cnpjEmpresa = $('#cnpjEmpresa').val();
            var emailEmpresa = $('#email').val();
            var cidadeEmpresa = $('#cidade').val();
            var estadoEmpresa = $('#estado').val();
            var cepEmpresa  = $('#cep').val();

            //Customer
            var nomeCliente  = $('#nomeCliente').val();
            var cnpjCliente  = $('#cnpjCliente').val();
            var emailCliente  = $('#emailCliente').val();
            var enderecoCliente  = $('#enderecoCliente').val();
            var cidadeCliente  = $('#cidadeCliente').val();
            var estadoCliente  = $('#estadoCliente').val();
            var cepCliente  = $('#cepCliente').val();
            var totalFatura  = $('#sum').val();
            var dataFatura  = $('#dataFatura').val();
            var observacoes = $('#observacoes').val();

             var faturaContent = ' <div class="container" id="containerFatura" style="border: 1px solid #ccc"> ' +
             '<h1 class="my-4 text-center">Fatura #' + numeroFatura + '</h1> ' +
             '<div class="row pad-top-botm "> ' +
               '<div class="col-lg-6 col-md-6 col-sm-6 text-center"> ' +
               '<img src="img/logo.jpg" /> ' +
                 '</div> ' +
               '<div class="col-lg-6 col-md-6 col-sm-6" style="padding-top: 20px"> ' +
               '<strong>'+ nomeEmpresa +'</strong> ' +
                 '<br /> ' +
                 '<i>Endereço : '+ enderecoEmpresa +' ' +
                 '<br /> ' +
                   'CEP: '+ cepEmpresa +' ' +
                   '<br /> ' +
                   ''+ cidadeEmpresa + ' - ' + estadoEmpresa + ' - Brasil. </i> ' +
                   '</div> ' +
               '</div> ' +
             '<div class="row text-center contact-info"> ' +
               '<div class="col-lg-12 col-md-12 col-sm-12"> ' +
               '<hr /> ' +
                 '<span> ' +
                 '<strong>E-mail : </strong> ' + emailEmpresa + ' ' +
                   '</span> ' +
                 '<span> ' +
                 '<strong>CNPJ : </strong> '+ cnpjEmpresa +' ' +
                   '</span> ' +
                 '<span> ' +
                 '<strong>Fatura número: </strong> #'+ numeroFatura +' ' +
                   '</span> ' +
                 '<hr /> ' +
                 '</div> ' +
               '</div> ' +
             '<div class="row pad-top-botm client-info"> ' +
               '<div class="col-lg-6 col-md-6 col-sm-6"> ' +
               '<h4> <strong>Informações do cliente</strong></h4> ' +
                 '<strong> '+ nomeCliente +'</strong> ' +
                 '<br /> ' +
                 '<b>Endereço :</b> '+ enderecoCliente +' ' +
                 ' '+ cidadeCliente +' - '+ estadoCliente + ' - Brasil. ' +
                 '<br /> ' +
                 '<b>CEP: </b> '+ cepCliente +' ' +
                 '<br /> ' +
                 '<b>CNPJ :</b> '+ cnpjCliente +' ' +
                 '<br /> ' +
                 '<b>E-mail :</b> '+ emailCliente +' ' +
                 '</div> ' +
               '<div class="col-lg-6 col-md-6 col-sm-6"> ' +
         
               '<h4> <strong>Detalhes do pagamento </strong></h4> ' +
                 '<b>Total : R$'+ totalFatura +' </b> ' +
                 '<br /> ' +
                 'Data : '+ dataFatura +' ' +
                 '<br /> ' +
                 '<b>Status pagamento : PAGO </b> ' +
                 '</div> ' +
               '</div> ' +
             '<div class="row"> ' +
               '<div class="col-lg-12 col-md-12 col-sm-12"> ' +
               '<div class="table-responsive"> ' +
                 '<table class="table table-striped table-bordered table-hover"> ' +
                   '<thead> ' +
                     '<tr> ' +
                       '<th>Descrição do serviço</th> ' +
                         '<th>Total</th> ' +
                         '</tr> ' +
                       '</thead> ' +
                     '<tbody> ' +
                     '<tr> ' +
                       '<td>Pneu pirelli</td> ' +
                         '<td>400,00</td> ' +
                         '</tr> ' +
                       '<tr> ' +
                       '<td>Roda aro 19 momo</td> ' +
                         '<td>4000,00</td> ' +
                         ' </tr> ' + 
                       '  <tr> ' +
                       '    <td>Bicos de pneu</td> ' +
                         '    <td>200,00</td> ' +
                         '   </tr> ' +
         
                       '    </tbody> ' +
                     '   </table> ' +
                   '  </div> ' +
                 '  <hr /> ' +
                 '  <div class="ttl-amts"> ' +
                 '<h4> <strong>Total: R$'+totalFatura+'</strong> </h4> ' +
                   '  </div> ' +
                 ' </div> ' +
               ' </div> ' +
             '<div class="row"> ' +
               '<div class="col-lg-12 col-md-12 col-sm-12"> ' +
               '<strong> Observações: </strong> ' +
                 '<ol> ' +
                    
                        observacoes    
                    
                   '</ol> ' +
                 '</div> ' +
               '</div> ' +
             '<div class="row pad-top-botm"> ' +
               '<div class="col-lg-12 col-md-12 col-sm-12 text-right"> ' +
               '<hr /> ' +
                 '<button type="button" onclick="callPrinter()" class="btn btn-success">Imprimir Fatura</button> ' +
                 '<button type="button" class="btn btn-success">Download PDF</button> ' +
            '   </div> ' +
            ' </div> ' +
           '</div> '

            $("#modalBody").append(faturaContent);

    });

  function clearForm() {

    var numeroFatura = $('#numeroFatura').val('');
    var nomeEmpresa = $('#nomeEmpresa').val('');
    var enderecoEmpresa = $('#endereco').val('');
    var cnpjEmpresa = $('#cnpjEmpresa').val('');
    var emailEmpresa = $('#email').val('');
    var cidadeEmpresa = $('#cidade').val('');
    var estadoEmpresa = $('#estado').val('');
    var cepEmpresa = $('#cep').val('');

  }

});

