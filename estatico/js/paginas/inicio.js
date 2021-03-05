if(window.innerWidth < 580)
{
  //resolução pequena, quebra linhas e corrige o visual
  document.getElementById("pubsdiv").className = "";
  document.getElementById('widgets').style.display = 'none';
  document.getElementById("positionnotification").className = "";
}

//mostrar hora
var data = new Date();
var hora = data.getHours();
var tipoatual;
var paginaatual = 0;
if(hora >= 0 && hora < 6)
{
  document.getElementById("bomdia").innerHTML="Boa madrugada, " + user.usuario;
}
if(hora >= 6 && hora < 12)
{
  document.getElementById("bomdia").innerHTML="Bom Dia, " + user.usuario;
}
if(hora >= 12 && hora < 18)
{
  document.getElementById("bomdia").innerHTML="Boa tarde, " + user.usuario;
}
if(hora >= 18 && hora <= 23)
{
  document.getElementById("bomdia").innerHTML="Boa noite, " + user.usuario;
}
//fim hora
atualizarpost('1','0');
function atualizarpost(tipo){
  if(tipo == undefined){
    tipo = tipoatual;
    paginaatual = paginaatual + 1;
  }else{
    tipoatual = tipo;
    document.getElementById('conteudos').innerHTML= ' ';
    paginaatual = 0;
  }

  document.getElementById('carregamento').style.display = 'block';
  document.getElementById('botaomaispub').style.display = 'none';

  document.getElementById('erropostagem').style.display = 'none';  //esconde mensagem de erro nas postagens
  document.getElementById('semnenhumapostagem').style.display = 'none';  //esconde mensagem de erro nas postagens
  document.getElementById('carregamento').style.display = 'block';  //exibe o icone de carregamento
  var url = "node/postagens"; //url para enviar a requisição
var xhttp = new XMLHttpRequest();
xhttp.open("POST", url, true);
var params = 'tipo=' + tipo + "&pagina=" + paginaatual + "&id=" + user.id;

xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhttp.send(params);

xhttp.onreadystatechange = function() {
if (xhttp.readyState == XMLHttpRequest.DONE) {
//se o codigo é 200 significa que o servidor retornou sem nenhum erro
if(xhttp.status == 200)
{
  document.getElementById('carregamento').style.display = 'none';
  document.getElementById('botaomaispub').style.display = 'block';
//se ele responder 0 é porque houve um erro(user não logado ou algo do tipo) se retornar -1 é porque não tem nenhum post a exibir
//caso não seja nenhum dos dois o caso, ele retornou um json corretamente
  var semoutrosposts = true;
  console.log(xhttp.responseText);
var postagens = JSON.parse(xhttp.responseText);
postagens.forEach((item) => {
var conteudo = item.conteudo;
var data = item.data;
var usuario = item.nome;
var idpost = item.id;
var ameis = item.ameis;
var grr = item.grr;
var dedos = item.dedos;
var risos = item.risos;
var iduser = item.iduser;
if(iduser !== "3"){ if(iduser !== user.id) {semoutrosposts = false; }}
try{
if(conteudo.length > 200)
    {var tamanho = "h6";}else{ var tamanho = "h5";}
}catch{var tamanho = "h5";}
var abrir = "onclick='abrir(`../estatico/html/perfil.html`,`../estatico/js/paginas/perfil.js`, `perfil?" + iduser +"`)'";
if(item.foto == "null") { var foto  = "/estatico/imagens/empty-profile.webp"} else{var foto = item.foto}
var menuoptions = '<div class="d-flex flex-row-reverse bd-highlight"><div style="background-color: rgb(52, 58, 64); position: absolute; border-radius: 10px; height: 150px; width: 200px; display:none;" id="menuoptions-' + idpost +'" class="modal-body"> <div class="d-grid gap-2">';
if(iduser == user.id)
{
menuoptions = menuoptions + '<button type="button" class="btn btn-outline-primary btn-sm" onclick="copiar(`' + dominio + '/post?' + idpost + '`);">Copiar url do post</button>';
menuoptions = menuoptions + '<button type="button" class="btn btn-outline-danger btn-sm" onclick="deletarpost(' + idpost +')" id="buttondeletar-' + idpost +'">Deletar</button>';
}else{
  menuoptions = menuoptions + '<button type="button" class="btn btn-outline-primary btn-sm" onclick="copiar(`' + dominio + '/post?' + idpost + '`);">Copiar url do post</button>';
  menuoptions = menuoptions + '<button type="button" class="btn btn-outline-danger btn-sm">Denúnciar</button>';

}
menuoptions = menuoptions + '</div> </div></div>';

var conteudo = '<div style="border-radius:10px; border:solid 0.1px; background-color:#2b2f3a;" id="pub-' + idpost +'">    <div class="row g-3 justify-content-between">  <div class="col-auto">   <a '+abrir+' class="pointer"><h5><img src="' + foto + '" style="border-radius: 100%; width: 50px; height: 50px;"> '+usuario+' </h5> </a>  </div> <div class="col-auto">  <div style="width:30px;"> </div>  <button type="button" class="btn btn-outline-secondary" onclick="menuoptions(' + idpost +')">...</button>' + menuoptions +'   </div></div>    <p>'+ data +'</p> <' + tamanho +'>' + conteudo +'</' + tamanho +'>'
+ '<div><button type="button" class="btn btn-link" id="ameibotao-' + idpost +'" onclick="reacao(' + idpost +', 1)">' + ameis +' Amei(s)😍</button><button type="button" class="btn btn-link" id="odieibotao-' + idpost +'" onclick="reacao(' + idpost +', 2)">'+grr+' GRR😡</button> <button type="button" class="btn btn-link" id="dedobotao-' + idpost +'" onclick="reacao(' + idpost +', 3)">'+ dedos +' Dedo(s)🖕🏼</button>  <button type="button" class="btn btn-link" id="risosbotao-' + idpost +'" onclick="reacao(' + idpost +', 4)">'+ risos +' Risos😂</button> </div>'
+    '<p>Comentarios:</p><div id="comentarios-' + idpost + '"></div>'
+'<div class="row g-3">  <div class="col-auto" style="width: 60%;"><input type="text" class="form-control" id="comentario-'+ idpost + '" placeholder="Comentário"> </div> <div class="col-auto">  <button class="btn btn-primary mb-3" onclick="comentar(' + idpost +')">Comentar</button> </div> </div>'
+'</div><br>';
if(item.sempostagem == "1") {
  document.getElementById('semnenhumapostagem').style.display = 'block';  //exibe mensagem de erro nas postagens
document.getElementById('somentesocialfan').style.display = 'block';
}else{
$("#conteudos").append(conteudo);
}
//se o usuario deu amei, ele muda a cor do botão
    if(item.comamei == "1"){
document.getElementById('ameibotao-'+idpost).style.backgroundColor = '#E6E6E6';
}
//o mesmo com grr
if(item.comgrr == "1"){
document.getElementById('odieibotao-'+idpost).style.backgroundColor = '#E6E6E6';
}
//o mesmo com o dedo
if(item.comdedo == "1"){
document.getElementById('dedobotao-'+idpost).style.backgroundColor = '#E6E6E6';
}
//o mesmo com o sorriso
if(item.comriso == "1"){
document.getElementById('risosbotao-'+idpost).style.backgroundColor = '#E6E6E6';
}
//ver se não retornou nenhum comentario
if(item.nenhumcomentario == "1"){
document.getElementById("comentarios-"+idpost).innerHTML='<div id="semcomentarios-' + idpost + '" style="color:white;">Nenhum comentario...</div>';
}
//ver se existe mais do que 3 comentarios
if(item.quantiacomentarios > 0){
document.getElementById("comentarios-"+idpost).innerHTML='<a onclick="maiscomentarios(' + idpost +')" id="maiscomentarios-' + idpost + '" style="color:white;">Exibir mais 3 comentários(' + item.quantiacomentarios + ' restantes)</a>';
}
//exibe o comentario 1 se houver
if (item.comentario1 != "undefined") {
  if(item.fotocomentario1 == "null"){var foto = "estatico/imagens/empty-profile.webp";}else{var foto = item.fotocomentario1}
$("#comentarios-"+idpost).append('<div style="border-radius:10px; border:solid 0.1px;"><h6> <a href="../perfil?id=' + item.idcomentario1 +'"> <img src="' + foto + '" style="border-radius: 100%; width: 30px; height: 30px;"> '+ item.nomecomentario1 + "</a>: "+item.comentario1+"</h6> </div>");
}
//exibe o comentario 2 se houver
if (item.comentario2 != "undefined") {
  if(item.fotocomentario2 == "null"){var foto = "estatico/imagens/empty-profile.webp";}else{var foto = item.fotocomentario2}
$("#comentarios-"+idpost).append('<div style="border-radius:10px; border:solid 0.1px;"><h6> <a href="../perfil?id=' + item.idcomentario2 +'"> <img src="' + foto +'" style="border-radius: 100%; width: 30px; height: 30px;"> '+ item.nomecomentario2 + "</a>: "+item.comentario2+"</h6> </div>");
}
//exibe o comentario 3 se houver
if (item.comentario3 != "undefined") {
  if(item.fotocomentario3== "null"){var foto = "estatico/imagens/empty-profile.webp";}else{var foto = item.fotocomentario3}
$("#comentarios-"+idpost).append('<div style="border-radius:10px; border:solid 0.1px;"><h6> <a href="../perfil?id=' + item.idcomentario3 +'"> <img src="' + foto +'" style="border-radius: 100%; width: 30px; height: 30px;"> '+ item.nomecomentario3 + "</a>: "+item.comentario3+"</h6> </div>");
}

});
if(semoutrosposts == true){document.getElementById('somentesocialfan').style.display = 'block'; }

}else{
document.getElementById("errocodigo").innerHTML=xhttp.status;
document.getElementById('erropostagem').style.display = 'block';  //exibe mensagem de erro nas postagens
}
}
}         
  
}

function publicar(){
  document.getElementById('errocriarpostagem').style.display = 'none';  //esconde o texto de erro
  document.getElementById("botaopublicar").innerHTML='  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  </div>Carregando...';
  $('#botaopublicar').prop('disabled', true);
  var url = "node/postar"; //url para enviar a requisição
  var campo = document.getElementById('textonovopost');
  var adulto = document.querySelector('#conteudoadulto').checked;
  var xhttp = new XMLHttpRequest();
var email = "teste";
xhttp.open("POST", url, true);
var params = 'postagem=' + campo.value + '&tipo=1' + '&adulto=' + adulto;

xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhttp.send(params);

xhttp.onreadystatechange = function() {
if (xhttp.readyState == XMLHttpRequest.DONE) {
if(xhttp.status == 200)
{
var dados = JSON.parse(xhttp.responseText);
if(dados.sucesso == "1")
{
//pub postada
//exibir nova publicação do user
campo.value = " ";
//var conteudo = '<div style="border-radius:10px; border:solid 0.1px;" id=""><h5><img src="imagens/empty-profile.webp" style="border-radius: 100%; width: 50px; height: 50px;"> Douglas Gomes Tosta </h5> <p>Agora a pouco</p> <h5>' + campo.value +'</h5> </div>';
    var idpost = dados.id;
    if(dados.conteudo.length > 200)
    {var tamanho = "h6";}else{ var tamanho = "h5";}
    var menuoptions = '<div class="d-flex flex-row-reverse bd-highlight"><div style="background-color: rgb(52, 58, 64); position: absolute; border-radius: 10px; height: 150px; width: 200px; display:none;" id="menuoptions-' + idpost +'" class="modal-body"> <div class="d-grid gap-2">';
    menuoptions = menuoptions + '<button type="button" class="btn btn-outline-primary btn-sm" onclick="copiar(`' + dominio + '/post?' + idpost + '`);">Copiar url do post</button>';
    menuoptions = menuoptions + '<button type="button" class="btn btn-outline-danger btn-sm" onclick="deletarpost(' + idpost +')" id="buttondeletar-' + idpost +'">Deletar</button>';
    menuoptions = menuoptions + '</div> </div></div>';

    
var conteudo = '<div style="border-radius:10px; border:solid 0.1px; background-color:#2b2f3a; display: none;" id="pub-' + idpost +'">    <div class="row g-3 justify-content-between">  <div class="col-auto">   <a '+abrir+' class="pointer"><h5><img src="' + user.fotoperfil + '" style="border-radius: 100%; width: 50px; height: 50px;"> '+user.usuario+' </h5> </a>  </div> <div class="col-auto">  <div style="width:30px;"> </div>  <button type="button" class="btn btn-outline-secondary" onclick="menuoptions(' + idpost +')">...</button>' + menuoptions +'   </div></div>  <p>Agora a pouco</p> <' + tamanho +'>' + dados.conteudo +'</' + tamanho +'>'
+ '<div><button type="button" class="btn btn-link" id="ameibotao-' + idpost +'" onclick="reacao(' + idpost +', 1)">0 Amei(s)😍</button><button type="button" class="btn btn-link" id="odieibotao-' + idpost +'" onclick="reacao(' + idpost +', 2)">0 GRR😡</button> <button type="button" class="btn btn-link" id="dedobotao-' + idpost +'" onclick="reacao(' + idpost +', 3)">0 Dedo(s)🖕🏼</button>  <button type="button" class="btn btn-link" id="risosbotao-' + idpost +'" onclick="reacao(' + idpost +', 4)">0 Risos😂</button> </div>'
+    '<p>Comentarios:</p><div id="comentarios-' + idpost + '"></div>'
+'<div class="row g-3">  <div class="col-auto" style="width: 60%;"><input type="text" class="form-control" id="comentario-'+ idpost + '" placeholder="Comentário"> </div> <div class="col-auto"> <button class="btn btn-primary mb-3" onclick="comentar(' + idpost +')">Comentar</button> </div> </div>'
+'</div><br>';

$("#conteudos").prepend(conteudo);
document.getElementById('semnenhumapostagem').style.display = 'none';
document.getElementById("botaopublicar").innerHTML='Publicar.';
  $('#botaopublicar').prop('disabled', false);
  $("#pub-" + idpost).fadeIn();
//fim exibir nova pub do user

}else{
//pub não foi postada
document.getElementById('errocriarpostagem').style.display = 'block';  //exibe mensagem de erro postagem
document.getElementById("errocriarpostagem").innerHTML='Não conseguimos fazer a sua nova publicação...';
if(dados.erro == "1"){document.getElementById("errocriarpostagem").innerHTML="Parece que você já fez uma postagem semelhante a essa recentemente...";}
if(dados.erro == "2"){document.getElementById("errocriarpostagem").innerHTML="Você já fez 5 postagens nas ultimas horas... por favor acalme seus dedos e tente novamente mais tarde.";}
if(dados.erro == "3"){document.getElementById("errocriarpostagem").innerHTML="Experimente adicionar mais conteudo a sua postagem...";}

document.getElementById("botaopublicar").innerHTML='Publicar.';
  $('#botaopublicar').prop('disabled', false);
}
}else{
document.getElementById('errocriarpostagem').style.display = 'block';  //exibe mensagem de erro postagem
document.getElementById("errocriarpostagem").innerHTML='Ocorreu um erro ao se comunicar com o serviço, erro: '+ xhttp.status;
document.getElementById("botaopublicar").innerHTML='Publicar.';
$('#botaopublicar').prop('disabled', false);
}
}
}
}
//fim publicar







//botão reação
function reacao(id, tipo){
document.getElementById('ameibotao-'+id).style.backgroundColor = '';
document.getElementById('odieibotao-'+id).style.backgroundColor = '';
document.getElementById('dedobotao-'+id).style.backgroundColor = '';
document.getElementById('risosbotao-'+id).style.backgroundColor = '';
var url = "node/reagir"; //url para enviar a requisição
var xhttp = new XMLHttpRequest();
var params = 'idpostagem=' + id+"&tipo="+tipo;
xhttp.open("POST", url, true);
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhttp.send(params);
xhttp.onreadystatechange = function() {
if (xhttp.readyState == XMLHttpRequest.DONE) {
//se o codigo é 200 significa que o servidor retornou sem nenhum erro
if(xhttp.status == 200)
{

var dados = JSON.parse(xhttp.responseText);
document.getElementById("ameibotao-" + id).innerHTML=dados.ameis+' Amei(s)😍';
document.getElementById("odieibotao-" + id).innerHTML=dados.grr+' GRR😡';
document.getElementById("dedobotao-" + id).innerHTML=dados.dedos+' Dedo(s)🖕🏼';
document.getElementById("risosbotao-" + id).innerHTML=dados.risos+' Risos😂';
if(dados.comamei == "1"){
document.getElementById('ameibotao-'+id).style.backgroundColor = '#E6E6E6';
}
if(dados.comgrr == "1"){
document.getElementById('odieibotao-'+id).style.backgroundColor = '#E6E6E6';
}
if(dados.comdedo == "1"){
document.getElementById('dedobotao-'+id).style.backgroundColor = '#E6E6E6';
}
if(dados.comrisos == "1"){
document.getElementById('risosbotao-'+id).style.backgroundColor = '#E6E6E6';
}

}else{
alert("ocorreu um erro ao enviar sua reação, erro:"+ xhttp.status);
}
}
}
}
//fim reação

//botão comentar
function comentar(id){

var comentario = document.getElementById('comentario-'+id);
var url = "/node/comentar"; //url para enviar a requisição
var xhttp = new XMLHttpRequest();
var params = 'comentario=' + comentario.value + "&id=" + id + '&chave=' + localStorage.getItem("chave");
xhttp.open("POST", url, true);
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhttp.send(params);
xhttp.onreadystatechange = function() {
if (xhttp.readyState == XMLHttpRequest.DONE) {
//se o codigo é 200 significa que o servidor retornou sem nenhum erro
if(xhttp.status == 200)
{

if(xhttp.responseText == "0")
{
//se o sistema retorna 0 significa que deu algum erro interno
alert("Houve um erro ao enviar seu comentario, recusado pelo sistema verifique se você está logado no sistema.");
}else{
//não houve erro interno
var dados = JSON.parse(xhttp.responseText);

$("#comentarios-"+id).append('<div style="border-radius:10px; border:solid 0.1px;"><h6> <a href="perfil.php?id=' + user.id +'"> <img src="' + user.fotoperfil +'" style="border-radius: 100%; width: 30px; height: 30px;"> '+ user.usuario + "</a>: "+comentario.value+"</h6> </div>");
comentario.value = " ";
document.getElementById('semcomentarios-'+id).style.display = 'none';  //esconde o texto de erro
}
}else{
alert("Houve um erro ao enviar seu comentario: " + xhttp.status);
}
}
}



}
//fim comentar

function atualizartipo(id){
  document.getElementById('padraobutton').className = 'btn btn-outline-primary';
  document.getElementById('membrosbutton').className = 'btn btn-outline-primary';
  document.getElementById('minhasbutton').className = 'btn btn-outline-primary';

  document.getElementById(id).className = 'btn btn-outline-primary active';
}
widgets();
function widgets(){


var url = "/node/widgets"; //url para enviar a requisição
var xhttp = new XMLHttpRequest();
var params = '';
xhttp.open("POST", url, true);
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhttp.send(params);
xhttp.onreadystatechange = function() {
if (xhttp.readyState == XMLHttpRequest.DONE) {
  //alert(xhttp.responseText);
  document.getElementById('carregamentowidgets').style.display = 'none';

}
}

}


function menuoptions(id){
  if(document.getElementById("menuoptions-" + id).style.display == "none")
  {
    $("#menuoptions-" + id).fadeIn();
  }else{
    $("#menuoptions-" + id).fadeOut();
  }
}

function deletarpost(id){
  document.getElementById("buttondeletar-" + id).innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  socket.emit('deletarpost', id);

}

socket.on('deletarpost', data => {
  var dados = JSON.parse(data);
  if(dados.sucesso == "1")
  {
    $("#pub-" + dados.idpost).fadeOut();
  }else{

  }
});

function copiar(texto){

  $("#body").prepend('<textarea id="copiartexto">' + texto +'</textarea>');

  const input = document.getElementById('copiartexto');
  input.select();
  document.execCommand('copy');
  document.getElementById("copiartexto").remove();
}