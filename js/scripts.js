const url_WS = 'http://www.smartsoft.com.br/webservice/restifydb/empresa/puc_perfil';


// Função para executar o Retrieve do CRUD
function execRetrieve() {

    $.ajax({
        url: url_WS,
        method: "GET",
        success: function (dados) {
            var tabelaHTML = '';
            var id, nome, sexo, cidade, site, data_nascimento, img_url;
            // Montagem da tabela HTML

            tabelaHTML = '<table class="table"><thead><tr><th>#</th><th>Imagem</th></th><th>Nome</th><th>Sexo</th><th>Cidade</th><th>Site</th><th>Data de Nascimento</th><th></th><th></th></th></tr></thead><tbody>';

            for (var i = 0; i < dados.restify.rows.length; i++) {
                id = dados.restify.rows[i].values.id.value;
                nome = dados.restify.rows[i].values.nome.value;
                sexo = dados.restify.rows[i].values.sexo.value;
                cidade = dados.restify.rows[i].values.cidade.value;
                site = dados.restify.rows[i].values.site_url.value;
                data_nascimento = dados.restify.rows[i].values.data_nascimento.value;
                img_url = dados.restify.rows[i].values.foto_url.value;

                tabelaHTML += '<tr>';
                tabelaHTML += '<td id="'+ id +'id">'+ id +'</td>';
                tabelaHTML += '<td id="'+ id +'img"><img class="foto_perfil" src="'+ img_url +'"></td>'
                tabelaHTML += '<td id="'+ id +'nome">'+ nome +'</td>';
                tabelaHTML += '<td id="'+ id +'sexo">'+ sexo +'</td>';
                tabelaHTML += '<td id="'+ id +'cidade">'+ cidade +'</td>';
                tabelaHTML += '<td id="'+ id +'site"><a href="'+ site +'">Site</a></td>';
                tabelaHTML += '<td id="'+ id +'data">'+ data_nascimento +'</td>';
                tabelaHTML += '<td><button class="btn btn-warning" onclick="execUpdate('+ id +');">Alterar</button></td>';
                tabelaHTML += '<td><button class="btn btn-danger" onclick="execDelete('+ id +');">Excluir</button></td>';
                tabelaHTML += '</tr>';
            }
            tabelaHTML += '</tbody></table>';

            // Inserção do código HTML na DIV
            
            
            $('#div_listagem').html(tabelaHTML);
            
            
        }
    });

}


function telaPeq () {
    var tam = $(window).width();
    if (tam < '650'){
        return true;
    }
    else {
        return false;
    }
}

function tamBotoes() {
    var tam = $(window).width();
    //alert("aplicou - tam = " + tam);
    if (tam < 360) {
        $('#listagem').addClass('btn-block');
        $('#inserir').addClass('btn-block');
        $('#confirmar').addClass('btn-block');
        $('#cancel').addClass('btn-block');

    }
    else {
        $('#listagem').removeClass('btn-block');
        $('#inserir').removeClass('btn-block');
        $('#confirmar').removeClass('btn-block');
        $('#cancel').removeClass('btn-block');
    }

    $(window).resize(function(){
        var tam = $(window).width();
        //alert("aplicou - tam = " + tam);
        if (tam < 360) {
            $('#listagem').addClass('btn-block');
            $('#inserir').addClass('btn-block');
            $('#confirmar').addClass('btn-block');
            $('#cancel').addClass('btn-block');
    
        }
        else {
            $('#listagem').removeClass('btn-block');
            $('#inserir').removeClass('btn-block');
            $('#confirmar').removeClass('btn-block');
            $('#cancel').removeClass('btn-block');
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
                limpaForm();
            }
        });
    }
}

// Função para executar o Create do CRUD
function execCreate() {
    var nome = $('#nome').val();
    var cidade = $('#cidade').val();
    var site_url = $('#site').val();
    var data_nascimento = $('#data_nascimento').val();
    var img_url = $('#foto_url').val();
    var sexo = $('input[name="sexo"]:checked').val();
    
    $.ajax({
        url: url_WS,
        method: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: '_data={"data_nascimento": "'+data_nascimento+'", ' +
            '"nome": "' + nome + '", ' +
            '"sexo": "' + sexo + '", ' +
            '"cidade": "' + cidade + '", ' +
            '"site_url": "' + site_url + '", ' +
            '"foto_url": "' + img_url + '"}',
        success: function (dados) {
            alert('Registro incluído com sucesso.');

            // Recarrega listagem
            execRetrieve();
            limpaForm();
        }

    });
}

function limpaForm(){
    document.getElementById('cadastro').reset();
    $('img#inserir-foto')[0].src = "imagens/inserir-img.png";
}

function execUpdate(id){
    var nome= $('#'+ id +'nome')[0].innerHTML;
    var sexo = $('#'+ id +'sexo')[0].innerHTML;
    var cidade = $('#'+ id +'cidade')[0].innerHTML;
    var site = $('#'+ id +'site a')[0].href;
    var data_nascimento = $('#'+ id +'data')[0].innerHTML;
    var img_url = $('#'+id+'img img')[0].src;
    var data = formatarData(data_nascimento);
    $('#id').val(id);
    $('#nome').val(nome);
    $('#cidade').val(cidade);
    $('#site').val(site);
    $('#foto_url').val(img_url);
    $('#data_nascimento').val(data);

    $('input#listagem').css("visibility","hidden");
    $('input#inserir').css("visibility","hidden");
    $('input#confirmar').css("visibility","visible");
    $('input#cancel').css("visibility","visible");

    takeImg();

}

function confirmUpdate(){
    var id = $('#id').val();
    var nome = $('#nome').val();
    var cidade = $('#cidade').val();
    var site_url = $('#site').val();
    var data_nascimento = $('#data_nascimento').val();
    var img_url = $('#foto_url').val();
    var sexo = $('input[name="sexo"]:checked').val();
    $.ajax({
        url: url_WS + '/' + id,
        method: "PUT",
        contentType: 'application/x-www-form-urlencoded',
        data: '_data={"data_nascimento": "'+data_nascimento+'", ' +
        '"nome": "' + nome + '", ' +
        '"sexo": "' + sexo + '", ' +
        '"cidade": "' + cidade + '", ' +
        '"site_url": "' + site_url + '", ' +
        '"foto_url": "' + img_url + '"}',
        success: function () {
            alert("Registro atualizado com sucesso!");
            execRetrieve();
            limpaForm();
            
        }
    });

    execRetrieve();
    document.getElementById('cadastro').reset();

    $('input#listagem').css("visibility","visible");
    $('input#inserir').css("visibility","visible");
    $('input#confirmar').css("visibility","hidden");
    $('input#cancel').css("visibility","hidden");
    
}

function cancelUpdate () {
    execRetrieve();
    document.getElementById('cadastro').reset();

    $('input#listagem').css("visibility","visible");
    $('input#inserir').css("visibility","visible");
    $('input#confirmar').css("visibility","hidden");
    $('input#cancel').css("visibility","hidden");

    limpaForm();
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

function takeImg () {
    $('img#inserir-foto')[0].src = $('#foto_url').val();
}