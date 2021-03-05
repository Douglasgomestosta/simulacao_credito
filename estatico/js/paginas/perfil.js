//correção da resolução para dispositivos moveis
if(window.innerWidth < 580)
{
  document.getElementById("col2").className = "col-10 order-first";
}
//fim
var meuperfil = true;
var tipoatual;
var paginaatual = 0;
 var get = document.URL.split("?");var idget = get[1];
 if(idget !== undefined){
    if(idget !== user.id){meuperfil = false;}
  }else{idget = user.id;}
if(meuperfil == true)
{
    document.getElementById("fotonomeperfil").innerHTML= '<img src="' + user.fotoperfil +'" style="border-radius: 100%; width: 150px; height: 150px;"> ' + user.usuario;
    if(user.capaperfil !== "null")
    {
    document.getElementById("capaperfill").style.backgroundImage = "url('" + user.capaperfil +"')";
    }
    atualizarpost('2');
    dadosextras(idget);
    document.getElementById("botaoconfig").style.display = 'block';
}else{
  var url = "node/perfil"; //url para enviar a requisição
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  var params = 'id=' + idget;
  xhttp.send(params);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
      var dados = JSON.parse(xhttp.responseText);
      if(dados.sucesso == "1"){
        document.getElementById("fotonomeperfil").innerHTML= '<img src="' + dados.foto +'" style="border-radius: 100%; width: 150px; height: 150px;"> ' + dados.usuario;
        atualizarpost('2');
        dadosextras(idget);
if(dados.seguindo == "1")
{
  document.getElementById("botaoseguir").innerHTML= 'Parar de seguir';
  document.getElementById("botaoseguir").style.display = 'block';
  document.getElementById("botaoseguir").className = "btn btn-danger";
}else{
  document.getElementById("botaoseguir").innerHTML= 'Seguir posts';
  document.getElementById("botaoseguir").style.display = 'block';
  document.getElementById("botaoseguir").className = "btn btn-success";
}

      }
    }
  }
}

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
var params = 'tipo=' + tipo + "&pagina=" + paginaatual + "&id=" + idget;

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

var abrir = " ";
if(item.foto == "null") { var foto  = "/estatico/imagens/empty-profile.webp"} else{var foto = item.foto}
var conteudo = '<div style="border-radius:10px; border:solid 0.1px; background-color:#2b2f3a;" id="pub-' + idpost +'"> <a '+abrir+'><h5><img src="' + foto + '" style="border-radius: 100%; width: 50px; height: 50px;"> '+usuario+' </h5> </a> <p>'+ data +'</p> <h5>' + conteudo +'</h5>'
+ '<div><button type="button" class="btn btn-link" id="ameibotao-' + idpost +'" onclick="reacao(' + idpost +', 1)">' + ameis +' Amei(s)😍</button><button type="button" class="btn btn-link" id="odieibotao-' + idpost +'" onclick="reacao(' + idpost +', 2)">'+grr+' GRR😡</button> <button type="button" class="btn btn-link" id="dedobotao-' + idpost +'" onclick="reacao(' + idpost +', 3)">'+ dedos +' Dedo(s)🖕🏼</button>  <button type="button" class="btn btn-link" id="risosbotao-' + idpost +'" onclick="reacao(' + idpost +', 4)">'+ risos +' Risos😂</button> </div>'
+    '<p>Comentarios:</p><div id="comentarios-' + idpost + '"></div>'
+'<div class="row g-3">  <div class="col-auto" style="width: 60%;"><input type="text" class="form-control" id="comentario-'+ idpost + '" placeholder="Comentário"> </div> <div class="col-auto">  <button class="btn btn-primary mb-3" onclick="comentar(' + idpost +')">Comentar</button> </div> </div>'
+'</div><br>';
if(item.sempostagem == "1") {
  document.getElementById('semnenhumapostagem').style.display = 'block';  //exibe mensagem de erro nas postagens
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


}else{
document.getElementById("errocodigo").innerHTML=xhttp.status;
document.getElementById('erropostagem').style.display = 'block';  //exibe mensagem de erro nas postagens
}
}
}         
  
}

  function seguir(){
    var url = "node/seguir"; //url para enviar a requisição
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
  
  var params = 'id=' + idget;
    
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);
    
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
    if(xhttp.responseText == "1")
    {
      document.getElementById("botaoseguir").innerHTML= 'Seguir posts';
  document.getElementById("botaoseguir").style.display = 'block';
  document.getElementById("botaoseguir").className = "btn btn-success";
    }
    if(xhttp.responseText == "2"){
      document.getElementById("botaoseguir").innerHTML= 'Parar de seguir';
  document.getElementById("botaoseguir").style.display = 'block';
  document.getElementById("botaoseguir").className = "btn btn-danger";
    }
    }
    }
  }

  function dadosextras(id){
    var url = "node/dadosextras"; //url para enviar a requisição
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
  
  var params = 'id=' + id;
    
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(params);
    
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
var dadosextras = JSON.parse(xhttp.responseText);
document.getElementById("seguidores").innerHTML= dadosextras.seguidores + " Seguidor(es)";
document.getElementById("seguindo").innerHTML= dadosextras.seguindo + " Seguindo";
if(dadosextras.facebook != "null"){
  document.getElementById("facebookbotao").style.display = 'block';
  document.getElementById("outrasredesociais").style.display = 'block';
  document.getElementById("facebookbotao").href = dadosextras.facebook;
}
if(dadosextras.email != "null"){
  document.getElementById("emailbotao").style.display = 'block';
  document.getElementById("outrasredesociais").style.display = 'block';
  document.getElementById("emailbotao").href = 'mailto:'+dadosextras.email;
}

  }
}
  }

  function emblemas(){
    
  }