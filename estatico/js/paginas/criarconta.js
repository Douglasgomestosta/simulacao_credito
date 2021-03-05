//correção da resolução para dispositivos moveis
if(window.innerWidth < 580)
{
  document.getElementById("conteudo").style.width = "95%";
}
//fim
function continuar(){
  var nomecompleto = document.getElementById('nomecompleto').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  if(nomecompleto.lenght < 3 )
  var url="../node/criarconta";
  var xhttp = new XMLHttpRequest();
xhttp.open("POST", url, true);
var params = 'parte=1&nomecompleto=' + nomecompleto + '&email=' + email + '&senha=' + senha;
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

xhttp.send(params);

xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
      if(xhttp.status == 200)
      {
alert(xhttp.responseText);
      }
    }
  }


}

