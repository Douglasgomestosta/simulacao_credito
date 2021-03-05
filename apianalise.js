async function apianalise(req, res){
    var credito = 0;
    var principaismotivos = ' ';
    //analise score
    var score = parseInt(req.body.score);
    if(score < 200){credito = credito - 700; principaismotivos = 'Score muito baixo, ';}
if(score < 400){credito = credito - 600;  principaismotivos = 'Score muito baixo, ';}
if(score > 399 && score < 600){credito = credito - 400;  principaismotivos = 'Score muito baixo, ';}
if(score > 599 && score < 700){credito = credito + 150;}
if(score > 699 && score < 800){credito = credito + 450;}
if(score > 799){  credito = credito + 800;}

    //fim analise score

    //analisa dividas
    var dividas = parseInt(req.body.dividas);
    if(dividas > 0)
    {
        credito = credito - dividas * 3;
        principaismotivos = principaismotivos + 'Existem dividas em seu nome, ';
    }
    //fim analisa dividas
    
    //analisar tempo de casa
    var tempodecasa = parseInt(req.body.tempodecasa);

    if(tempodecasa < 3)
    {
        credito = credito - 500
        principaismotivos = principaismotivos + 'Você ainda é muito novo em nosso banco, ';
    }
    if(tempodecasa > 2 && tempodecasa < 6)
    {
        credito = credito + 50
    }
    if(tempodecasa > 5 && tempodecasa < 12)
    {
        credito = credito + 100;
    }
    if(tempodecasa > 11)
    {
        credito = credito + 200;
    }
    //fim analisar tempo de casa

    //analisar cartão de débito
    var debito = parseInt(req.body.debito);
    if(debito > 50)
    {
        debito = debito * 0.2;
        credito = credito + debito;
    }
    //fim analisar cartão de débito

    //analisar cartão de crédito
    var cc = parseInt(req.body.cc);
    if(cc > 50)
    {
        cc = cc * 0.4;
        credito = credito + cc;
    }
    //fim analisar cartão de crédito

    //analisar outros cartões de crédito
    var outroscc = parseInt(req.body.outroscc);
    if(outroscc > 2)
    {
        outroscc = outroscc - 2;
        outroscc = outroscc * 600;
        credito = credito - outroscc;
        principaismotivos = principaismotivos + 'Você tem muitos cartões de crédito, ';
    }
    //fim analisar outros cartões de crédito

    //ver contas atrasadas de todos os cartões do cliente
    var ccatrasados = parseInt(req.body.ccatrasados);
    if(ccatrasados > 0)
    {
    ccatrasados = ccatrasados * 3;
    credito = credito - ccatrasados;
    principaismotivos = principaismotivos + 'Existem faturas atrasadas de cartão de crédito, ';    
}
    //fim contas atrasadas de todos os cartões do cliente

    //portabilidade de salario
    var portabilidade = parseInt(req.body.portabilidade);
    portabilidade = portabilidade * 0.5;
    credito = credito + portabilidade;
    //fim portabilidade de salario

    //faturas pagas em dia de outros cartões nos ultimos 3 meses
var faturasoutrocc = parseInt(req.body.faturasoutrocc);
if(faturasoutrocc > 500)
{
    faturasoutrocc = faturasoutrocc * 0.5;
    credito = credito + faturasoutrocc;
}
    //fim faturas pagas em dia de outros cartões nos ultimos 3 meses


    //ver emprestimos ativos do cliente

    //fim ver emprestimos ativos do cliente
    console.log(credito);
    if(req.body.exigencia == "0")
    {
    if(credito < 50){credito = 0;}
    }
    if(req.body.exigencia == "1")
    {
    if(credito < 50){credito = 0;}
    }
    if(req.body.exigencia == "2")
    {
        credito = credito * 0.8
    if(credito < 200){credito = 0;}
    }

    if(req.body.exigencia == "3")
    {
        credito = credito * 0.6
    if(credito < 400){credito = 0;}
    }

    return '{"aumento":"' + credito + '", "motivosqueabaixam":"' + principaismotivos +'"}';
}
module.exports = apianalise;