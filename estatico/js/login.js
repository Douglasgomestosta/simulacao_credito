const inputElee = document.getElementById('senha');
inputElee.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    loginsenha();
  }
});
document.getElementById('erromensagemsenha').style.display = 'none';
email = localStorage.getItem('temporario_email');
localStorage.removeItem('temporario_email');
function loginsenha(){
document.getElementById('erromensagemsenha').style.display = 'none';
      //mudar botão "Entrar" para carregando...
      document.getElementById("botaologinsenha").innerHTML='<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Carregando...';
  $('#botaologinsenha').prop('disabled', true);

  var url = "node/loginsenha"; //url para enviar a requisição
  var campo = document.getElementById('senha');
  var xhttp = new XMLHttpRequest();
xhttp.open("POST", url, true);
var params = 'email=' + email + '&senha=' + campo.value;
xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

xhttp.send(params);

xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
        //alert(xhttp.responseText);
        console.log(xhttp.responseText);
        document.getElementById("botaologinsenha").innerHTML='Entrar';
  $('#botaologinsenha').prop('disabled', false);
  var dados = JSON.parse(xhttp.responseText);
  if(dados.sucesso == "1") //se a resposta é 1 significa que o login foi bem sucedido
  {
    localStorage.setItem("session",dados.session);  
    window.location.href = "/";
  }else{
    document.getElementById("botaologinsenha").innerHTML='Entrar';
    $('#botaologinsenha').prop('disabled', false);
    $("#erromensagemsenha").fadeIn();
  }

    }
}

}     


