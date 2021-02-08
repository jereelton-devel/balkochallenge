
var proto = "http";
var domain = "127.0.0.1";
var port = ":5000";
var endpointApi = proto+"://"+domain+port+"/get_max_apple";
var typeRequester = "json";
var typeReceiver = "json";
var modeRequester = "Ajax";
var methodRequester = "POST";
var dataRequester = "";
var qty_items = 0;
var test_controll = 0;

//Toastr (Tooltip style)
toastr.options = {
    "closeButton": false, // true/false
    "debug": false, // true/false
    "newestOnTop": false, // true/false
    "progressBar": false, // true/false
    "positionClass": "toast-bottom-center",//toast-bottom-center / toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left0
    "preventDuplicates": true, //true/false,
    "onclick": null,
    "showDuration": "300", // in milliseconds
    "hideDuration": "1000", // in milliseconds
    "timeOut": "5000", // in milliseconds
    "extendedTimeOut": "1000", // in milliseconds
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function execAutomaticTest() {

    var timer = 300;

    resetApplication();

    setTimeout(function() {
        qty_items = Math.round(Math.random() * (100 - 1) / 4) * 2 + 1;
    }, timer);

    setTimeout(function() {
        $("#input-qty-elements").val(qty_items);
    }, timer * 2);

    setTimeout(function() {
        generateElementsInputs(qty_items);
        $("#div-qty-each-item").show('fade');
    }, timer * 3);

    setTimeout(function() {
        $("#div-input-k").show('fade');
        $("#div-input-l").show('fade');
    }, timer * 4);

    setTimeout(function() {

        var num_1 = Math.round(qty_items / 3);
        var count = 0;

        while(true) {

            if(num_1 <= qty_items && num_1 > 0 || count >= 1000) {
                break;
            }

            num_1 = Math.round(qty_items / 3);
            count++;

        }

        $("#input-qty-k").val(num_1);
    }, timer * 5);

    setTimeout(function() {

        var num_2 = Math.round(qty_items / 2);
        var count = 0;

        while(true) {

            if(num_2 <= qty_items && num_2 > 0 || count >= 1000) {
                break;
            }

            num_2 = Math.round(qty_items / 2);
            count++;

        }
        $("#input-qty-l").val(num_2);
    }, timer * 6);

    setTimeout(function() {
        fillItems(0);
    }, timer * 8);

}

function automaticDetailsChange() {

    toastr.info("Aguarde...");

    setTimeout(function() {
        $("#bt-tec-data").click();
    }, 4000);

    setTimeout(function() {
        $("#bt-result-data").click();
        toastr.success("Fim...");
        buttonDisabled(false);

        //Controle de teste infinito, ou até que o botao de parar seja clicado
        if(test_controll == 0) {
            console.log("Controle de execução [Rodando]", test_controll);
            toastr.info("Vamos fazer mais um teste...");
            setTimeout(function(){
                execAutomaticTest();
            }, 3000);
        }

    }, 8000);

}

function fillItems(timer) {

    if(timer == 0) {

        var tmp = setInterval(function (){

            var rand_number = Math.round(Math.random() * (100 - 1) / 4) * 2 + 1;

            $("#item-" + timer).val(rand_number);
            timer++;

            if(timer == qty_items) {

                setTimeout(function(){
                    $("#bt-exec-request").click();
                    buttonDisabled(true);
                    automaticDetailsChange();
                }, 2000);

                clearInterval(tmp);

            }

        }, 100);

    } else {

        for (var j = 0; j < qty_items; j++) {

            var rand_number = Math.round(Math.random() * (100 - 1) / 4) * 2 + 1;

            $("#item-" + j).val(rand_number);

        }

    }
}

function checkRequest() {

    var qe = $("#input-qty-elements").val();
    var qk = $("#input-qty-k").val();
    var ql = $("#input-qty-l").val();

    if(!qe || !qk || !ql) {
        toastr.error("ERRO: Informe todos os parametros: A, K, L");
        return false;
    }

    if(qe != qty_items) {
        toastr.error("ERRO: Parece que você alterou o valor de A e não corrigiu a lista");
        return false;
    }

    if(qe <= 0 || qk <= 0 || ql <= 0) {
        toastr.error("ERRO: Informe valores validos para: A, K, L");
        return false;
    }

    for(var x = 0; x < qty_items; x++) {
        if($("#item-"+x).val() == "" || !$("#item-"+x).val()) {
            toastr.error("ERRO: Existem posições sem preenchimento");
            return false;
        }
        if(isNaN($("#item-"+x).val())) {
            toastr.error("ERRO: Existem posições com valores não numéricos");
            return false;
        }
        if($("#item-"+x).val() <= 0) {
            toastr.error("ERRO: Existem posições com valores invalidos (0)");
            return false;
        }
    }

    return true;
}

function prepareRequest() {

    var list = '';

    for(var idx = 0; idx < qty_items; idx++) {
        var qty = $("#item-"+idx).val();

        if(idx + 1 == qty_items) {
            list = list + '[' + idx + ',' + qty + ']';
        } else {
            list = list + '[' + idx + ',' + qty + '],';
        }
    }

    var qtyk = $("#input-qty-k").val();
    var qtyl = $("#input-qty-l").val();

    var request = '{"A": ['+list+'], "K": '+qtyk+', "L": '+qtyl+'}';

    return request;
}

function resetApplication() {

    $("#input-qty-elements").val('');
    $("#input-qty-k").val('');
    $("#input-qty-l").val('');

    $("#div-input-k").hide('fast');
    $("#div-input-l").hide('fast');

    $("#div-qty-each-item").hide('fast');
    $("#div-request-results").html('');

    $("#div-body-request").fadeIn('slow');
    $("#div-requester-results").fadeOut('slow');

    $("#div-tec-details").hide();
    $("#div-request-results").show();

    qty_items = 0;
}

function buttonDisabled(flag) {
    $("#bt-automatic-data").prop("disabled", flag);
    $("#bt-fill-data").prop("disabled", flag);
    $("#bt-cancel-request").prop("disabled", flag);
    $("#bt-exec-request").prop("disabled", flag);
    $("#bt-tec-data").prop("disabled", flag);
    $("#bt-restart-data").prop("disabled", flag);
    $("#bt-result-data").prop("disabled", flag);
    $("#bt-restart-data-tec").prop("disabled", flag);
}

function showInputArgs() {

    $("#div-input-k").hide('fast');
    $("#div-input-l").hide('fast');
    $("#div-qty-each-item").hide('fast');

    setTimeout(function(){
        $("#div-input-k").show('fade');
        $("#div-input-l").show('fade');
        $("#div-qty-each-item").show('fade');
    }, 300)
}

function generateResultResponse(target, req_A, ref_K, ref_L, json) {

    var p1_ref = "K";
    var p2_ref = "L";
    var p1_ini = json[3][1];
    var p1_end = json[4][1];
    var p2_ini = json[5][1];
    var p2_end = json[6][1];
    var range = "";

    if (ref_K < ref_L) {
        p1_ref = "L";
        p2_ref = "K";
    }
    for (var x = p1_ini; x <= p1_end; x++) {
        range += x.toString() + ",";
    }

    $(target).append("" +
        "<div class='div-results-K'></div>" +
            "<div class='div-results-info'>" +
                p1_ref + " deve usar as árvores: " + range.replace(/\,$/gi, '') +
            "</div>" +
        "<div class='clearfix'></div>"
    );

    range = "";

    for (var x = p2_ini; x <= p2_end; x++) {
        range += x.toString() + ",";
    }

    $(target).append("" +
        "<div class='div-results-L'></div>" +
        "<div class='div-results-info'>" +
            p2_ref + " deve usar as árvores: " + range.replace(/\,$/gi, '') +
        "</div>" +
        "<div class='clearfix'></div>"
    );

    $(target).append("<hr /><h3>Representação Gráfica</h3><hr />");

    var set_style = "";

    for (var x = 0; x < req_A.length; x++) {

        set_style = "";
        if (x >= p1_ini && x <= p1_end) {
            set_style = 'div-K';
        }
        if (x >= p2_ini && x <= p2_end) {
            set_style = 'div-L'
        }

        $(target).append("" +
            "<div class='div-container-generic-block'>" +
                "<div class='div-generic-block " + set_style + "'>" +
                    "" + req_A[x][1] +
                "</div>" +
                "" + x +
            "</div>");

    }

    $(target).append("" +
        "<div class='clearfix'></div>" +
        "<hr />" +
        "<h3>Total: " + json[0] + " maçãs</h3>" +
        "<hr />");

    $(target).append("" +
        "<button " +
        "class='btn btn-default generic-btn' " +
        "type='button' " +
        "id='bt-restart-data' " +
        "value='Reiniciar'>" +
        "Reiniciar" +
        "</button>");

    $(target).append("" +
        "<button " +
        "class='btn btn-primary generic-btn' " +
        "type='button' " +
        "id='bt-tec-data' " +
        "value='Detalhes'>" +
        "Detalhes" +
        "</button>");

}

function generateDetailsResponse(target, r) {

    $(target).html("" +
        "<button " +
        "class='btn btn-default generic-btn' " +
        "type='button' " +
        "id='bt-restart-data-tec' " +
        "value='Reiniciar'>" +
        "Reiniciar" +
        "</button>");

    $(target).append("" +
        "<button " +
        "class='btn btn-primary generic-btn' " +
        "type='button' " +
        "id='bt-result-data' " +
        "value='Resultado'>" +
        "Resultado" +
        "</button><br /><br />");

    $(target).append("<pre>" + JSON.stringify(r, null, "\t") + "</pre>");

}

function generateErrorResponse(target, m, i, r) {

    $(target).html(
        "<pre>" +
            "<strong style='color: red'>" + m + r + "</strong>" +
        "</pre>" + i);

    $(target).append("" +
        "<button " +
            "class='btn btn-default generic-btn' " +
            "type='button' " +
            "id='bt-restart-data' " +
            "value='Reiniciar'>" +
            "Reiniciar" +
        "</button>");

}

function generateElementsInputs(p) {

    $("#div-qty-each-item").html("<p>Informe a quantidade de maças para cada árvore<br /></p>");

    for (var i = 0; i < p; i++) {

        $("#div-qty-each-item").append('' +
            '<div class="div-input-qty-item">' +
            '<input type="text" name="" id="item-' + i + '" class="input-qty-item" value="" />' +
            '<span>' + i + '</span>' +
            '</div>');

    }

    qty_items = p;

}

function activeEventDefault() {

    $("#bt-cancel-request, #bt-restart-data-tec, #bt-restart-data").unbind();
    $("#bt-cancel-request, #bt-restart-data-tec, #bt-restart-data").on('click', function(){
        resetApplication();
    });

    $("#bt-tec-data").unbind()
    $("#bt-tec-data").on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#div-tec-details").show('fade');
        $("#div-request-results").hide('fast');
    });

    $("#bt-result-data").unbind();
    $("#bt-result-data").on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#div-tec-details").hide('fade');
        $("#div-request-results").show('fast');
    });

    $("#input-qty-elements").change(function() {
        if(isNaN($(this).val()) || !$(this).val() || $(this).val() <= 0) {
            toastr.error("Informe um valor valido !")
        } else {
            generateElementsInputs($(this).val());
            showInputArgs();
        }
    });

    $("#bt-fill-data").unbind();
    $("#bt-fill-data").on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        if(qty_items <= 0) {
            toastr.info("Primeiro informe uma quantidade de árvores !");
        } else {
            fillItems(1);
        }
    });

    $("#bt-automatic-data, #a-restart-test").unbind();
    $("#bt-automatic-data, #a-restart-test").on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        toastr.success("Aguarde...");
        test_controll = 0;

        buttonDisabled(true);
        execAutomaticTest();

        $("#bt-test-stop").show('slow');
        $("#bt-test-stop").unbind();
        $("#bt-test-stop").on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            test_controll = 1;
            console.log("Controle de execução [Encerrado]", test_controll);
            $(this).hide('fast');
            toastr.info("O teste foi encerrado !");
        });

    });
}

function activeEventForRequest() {

    $("#bt-exec-request").unbind();
    $("#bt-exec-request").on('click', function(){

        if(checkRequest()) {

            dataRequester = prepareRequest();

            sendRequest(typeRequester, typeReceiver, modeRequester, methodRequester, endpointApi, dataRequester);

            $("#div-body-request").fadeOut('slow');
            $("#div-requester-results").fadeIn('slow');

        }

    });
}

function sendRequest(typeRequester, typeReceiver, modeRequester, methodRequester, endpointRequester, dataRequester) {

    var contentTypeSend = typeRequester;
    var dataToSend = dataRequester;
    var dataTypeReceiver = typeReceiver;

    $("#div-request-results").html("");

    $.ajax({

        type: methodRequester,
        url: endpointRequester,
        data: dataToSend,
        dataType: dataTypeReceiver,
        contentType: 'application/'+contentTypeSend+'; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            $("#div-request-results").append("<hr /><h3>Legenda</h3><hr />");

            var resp = JSON.stringify(rsp);
            var json = JSON.parse(resp);

            if(json.response != '-1' && json.response != "Error") {

                var req_A  = json.request.A;
                var req_K  = json.request.K;
                var req_L  = json.request.L;

                generateResultResponse(
                    '#div-request-results',
                    req_A,
                    req_K,
                    req_L,
                    json.response);

                generateDetailsResponse('#div-tec-details', rsp);

            } else if(json.response == "Error") {

                generateErrorResponse(
                    "#div-request-results",
                    "Houve uma falha no processamento do pedido:",
                    "",
                    json.response);

            } else {

                generateErrorResponse(
                    "#div-request-results",
                    json.response,
                    "<p>(Não existe condição que atenda o pedido)</p>",
                    "");

            }

            activeEventDefault();

        },

        complete: function(data) {
            console.log("Ajax-complete...");
        },

        error: function (err, status, xhr) {

            if (err.responseText = "" || xhr == "" || status == "") {
                toastr.error("Não foi possível obter a resposta do Endpoint Requisitado");
            } else {
                generateErrorResponse(
                    "#div-request-results",
                    status,
                    "<p>Esse bug esta sendo analisado para correção, porém você pode <a id='a-restart-test'>continuar</a> os testes</p>",
                    xhr + " (bug)");

                activeEventDefault();

            }

            //Caso esteja sendo executado o teste automatico, gera um sinal para encerrar o processo
            if(test_controll == 0) {
                test_controll = 1;
                $("#bt-test-stop").hide('fast');
            }

        }

    });

}

$(document).ready(function(){

    activeEventForRequest();
    activeEventDefault();

    $("#div-input-k").hide('fast');
    $("#div-input-l").hide('fast');
    $("#div-qty-each-item").hide('fast');
    $("#bt-test-stop").hide('fast');

});