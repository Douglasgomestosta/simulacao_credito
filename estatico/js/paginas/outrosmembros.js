var url = "../node/outrosmembros";
var xhttp = new XMLHttpRequest();
xhttp.open("POST", url, true);
var codigo = document.getElementById('codigo');
var params = 'id=';
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

xhttp.send(params);

xhttp.onreadystatechange = function() {
if (xhttp.readyState == XMLHttpRequest.DONE) {
var dados = JSON.parse(xhttp.responseText);

dados.forEach((item) => {
  if(item.fotoperfil == "null"){var foto = "../estatico/imagens/empty-profile.webp";}else{var foto = item.fotoperfil;}
  if(item.brevedescricao == "null"){var brevedescricao = " ";}else{var brevedescricao = item.brevedescricao;}

  var html = '<div class="card" style="width: 18rem;"> <div class="card-body"><img src="' + foto +'" style="border-radius: 100%; width: 100px; height: 100px;"><h5 style="color:black;">' + item.usuario +'</h5><p style="color:black;">' + brevedescricao +'</p><button type="button" class="btn btn-primary" onclick="abrir(`../estatico/html/perfil.html`, `../estatico/js/paginas/perfil.js`, `perfil?' + item.id +'`)">Saiba mais!</button></div></div>';
  $("#membros").append(html);

});

}
}