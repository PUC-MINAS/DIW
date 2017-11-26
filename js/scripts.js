const url_WS = 'http://www.smartsoft.com.br/webservice/restifydb/empresa/cliente';

function op (x) {
    switch(x) {
        case 0:
            execRetrieve();
            break;
        case 1:
            execCreate();
            break;
        case 2:
            execDelete();
            break;
    }
}

// Função para executar o Retrieve do CRUD
function execRetrieve() {

    $.ajax({
        url: url_WS,
        method: "GET",
        success: function (dados) {
            var tabelaHTML = '';

            // Montagem da tabela HTML

            tabelaHTML = '<table class="table"><thead><tr><th>#</th><th>Nome</th><th>Email</th><th>Cidade</th><th>Estado</th><th>Data de Nascimento</th></tr></thead><tbody>';

            for (i = 0; i < dados.restify.rows.length; i++) {
                var id = dados.restify.rows[i].values.codigo.value;
                var nome = dados.restify.rows[i].values.nome.value;
                var email = dados.restify.rows[i].values.email.value;
                var cidade = dados.restify.rows[i].values.cidade.value;
                var estado = dados.restify.rows[i].values.estado.value;
                var data_nascimento = dados.restify.rows[i].values.data_nascimento.value;

                tabelaHTML += '<tr>';
                tabelaHTML += '<td id="'+ id +'id">'+ id +'</td>';
                tabelaHTML += '<td id="'+ id +'nome">'+ nome +'</td>';
                tabelaHTML += '<td id="'+ id +'email">'+ email +'</td>';
                tabelaHTML += '<td id="'+ id +'cidade">'+ cidade +'</td>';
                tabelaHTML += '<td id="'+ id +'estado">'+ estado +'</td>';
                tabelaHTML += '<td id="'+ id +'data">'+ data_nascimento +'</td>';
                tabelaHTML += '<td><button onclick="execUpdate('+ id +');">Alterar</button></td>';
                tabelaHTML += '<td><button onclick="execDelete('+ id +');">Excluir</button></td>';
                tabelaHTML += '</tr>';
            }
            tabelaHTML += '</tbody></table>';

            // Inserção do código HTML na DIV
            $('#div_listagem').html(tabelaHTML);
        }
    });

}

// Função para executar o Delete do CRUD
function execDelete(id) {
    // Confirma exclusão
    if (confirm('Deseja realmente excluir o registro ' + id + '?')) {
        $.ajax({
            url: url_WS + '/' + id,
            method: "DELETE",
            success: function () {
                alert('Registro exlcuído.');

                // Recarrega listagem
                execRetrieve();
            }
        });
    }
}

// Função para executar o Create do CRUD
function execCreate() {
    var nome = $('#nome').val();
    var email = $('#email').val();
    var cidade = $('#cidade').val();
    var estado = $('#estado').val();
    var data_nascimento = $('#data_nascimento').val();
    
    $.ajax({
        url: url_WS,
        method: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: '_data={"nome": "' + nome + '", ' +
            '"email": "' + email + '", ' +
            '"cidade": "' + cidade + '", ' +
            '"estado": "' + estado + '", ' +
            '"data_nascimento": "' + data_nascimento + '"}',
        success: function (dados) {
            alert('Registro incluído com sucesso.');

            // Recarrega listagem
            execRetrieve();
            document.getElementById('cadastro').reset();
        }

    });
}

function execUpdate(id){
    var nome= $('#'+ id +'nome')[0].innerHTML;
    var email = $('#'+ id +'email')[0].innerHTML;
    var cidade = $('#'+ id +'cidade')[0].innerHTML;
    var estado = $('#'+ id +'estado')[0].innerHTML;
    var data_nascimento = $('#'+ id +'data')[0].innerHTML;
    var data = formatarData(data_nascimento);
    $('#id').val(id);
    $('#nome').val(nome);
    $('#email').val(email);
    $('#cidade').val(cidade);
    $('#estado').val(estado);
    $('#data_nascimento').val(data);

    $('input#listagem').css("visibility","hidden");
    $('input#inserir').css("visibility","hidden");
    $('input#confirmar').css("visibility","visible");

}

function confirmUpdate(){
    var id = $('#id').val();
    $.ajax({
        url: url_WS + '/' + id,
        method: "DELETE",
        success: function () {

            // Recarrega listagem
            execRetrieve();
            
        }
    });
    //execCreate();
    var nome = $('#nome').val();
    var email = $('#email').val();
    var cidade = $('#cidade').val();
    var estado = $('#estado').val();
    var data_nascimento = $('#data_nascimento').val();
    $.ajax({
        url: url_WS,
        method: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: '_data={"nome": "' + nome + '", ' +
            '"email": "' + email + '", ' +
            '"cidade": "' + cidade + '", ' +
            '"estado": "' + estado + '", ' +
            '"data_nascimento": "' + data_nascimento + '"}',
        success: function (dados) {
            alert('Registro Atualizado.');

            // Recarrega listagem
            execRetrieve();
            document.getElementById('cadastro').reset();
        }

    });



    $('input#listagem').css("visibility","visible");
    $('input#inserir').css("visibility","visible");
    $('input#confirmar').css("visibility","hidden");
    
}

function formatarData(data) {
    var d = new Date(data),
        mes = '' + (d.getMonth() + 1),
        dia = '' + d.getDate(),
        ano = d.getFullYear();

    if (mes.length < 2) mes = '0' + mes;
    if (dia.length < 2) dia = '0' + dia;

    return [ano, mes, dia].join('-');
}