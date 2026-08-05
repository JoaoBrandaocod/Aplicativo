function mostrar(id){

const secoes=document.querySelectorAll(".card");

secoes.forEach(secao=>{

secao.style.display="none";

});

document.getElementById(id).style.display="block";

}

function calcularPorcentagem(){

let valor=
Number(document.getElementById("valor").value);

let porcentagem=
Number(document.getElementById("porcentagemValor").value);

if(valor<=0 || porcentagem<=0){

document.getElementById("resultado").innerHTML=

"Preencha corretamente os campos.";

return;

}

let resultado=

valor*porcentagem/100;

document.getElementById("resultado").innerHTML=

`Resultado: R$ ${resultado.toFixed(2)}`;

}

function limpar(){

document.getElementById("valor").value="";

document.getElementById("porcentagemValor").value="";

document.getElementById("resultado").innerHTML=

"Resultado aparecerá aqui.";

}

mostrar("porcentagem");
