function mostrar(id){

const secoes=document.querySelectorAll(".card");

secoes.forEach(secao=>{

secao.style.display="none";

});

document.getElementById(id).style.display="block";

}

function mostrarResultado(idResultado, html){

const el=document.getElementById(idResultado);

el.classList.remove("erro");

el.innerHTML=html;

}

function mostrarErro(idResultado, mensagem){

const el=document.getElementById(idResultado);

el.classList.add("erro");

el.innerHTML=mensagem;

}

// ---------- PORCENTAGEM ----------

function calcularPorcentagem(){

let valor=Number(document.getElementById("valor").value);

let porcentagem=Number(document.getElementById("porcentagemValor").value);

if(!valor || !porcentagem || valor<=0 || porcentagem<=0){

mostrarErro("resultado-porcentagem","Preencha corretamente os campos.");

return;

}

let resultado=valor*porcentagem/100;

mostrarResultado("resultado-porcentagem",

`Resultado: R$ ${resultado.toFixed(2)}`);

}

// ---------- LUCRO ----------

function calcularLucro(){

let receita=Number(document.getElementById("lucroReceita").value);

let custo=Number(document.getElementById("lucroCusto").value);

if(!receita || receita<=0 || custo<0){

mostrarErro("resultado-lucro","Preencha corretamente os campos.");

return;

}

let lucro=receita-custo;

let margemLucro=(lucro/receita)*100;

mostrarResultado("resultado-lucro",

`Lucro: R$ ${lucro.toFixed(2)}` +

`<span class="detalhe">Margem de lucro: ${margemLucro.toFixed(2)}% da receita</span>`);

}

// ---------- MARGEM (preço de venda a partir de custo + margem desejada) ----------

function calcularMargem(){

let custo=Number(document.getElementById("margemCusto").value);

let margem=Number(document.getElementById("margemDesejada").value);

if(!custo || custo<=0 || !margem || margem<=0 || margem>=100){

mostrarErro("resultado-margem","Preencha corretamente os campos (margem entre 1 e 99%).");

return;

}

let precoVenda=custo/(1-margem/100);

let lucroUnitario=precoVenda-custo;

let markup=(lucroUnitario/custo)*100;

mostrarResultado("resultado-margem",

`Preço de venda: R$ ${precoVenda.toFixed(2)}` +

`<span class="detalhe">Lucro por unidade: R$ ${lucroUnitario.toFixed(2)} · Markup: ${markup.toFixed(2)}%</span>`);

}

// ---------- ESTOQUE ----------

function calcularEstoque(){

let estoqueAtual=Number(document.getElementById("estoqueAtual").value);

let vendaDiaria=Number(document.getElementById("estoqueVendaDiaria").value);

let diasCobertura=Number(document.getElementById("estoqueDiasCobertura").value);

if(estoqueAtual<0 || !vendaDiaria || vendaDiaria<=0 || !diasCobertura || diasCobertura<=0){

mostrarErro("resultado-estoque","Preencha corretamente os campos.");

return;

}

let estoqueNecessario=vendaDiaria*diasCobertura;

let diferenca=estoqueNecessario-estoqueAtual;

let duracaoAtual=estoqueAtual/vendaDiaria;

let mensagemCompra=diferenca>0

? `Comprar mais ${Math.ceil(diferenca)} unidades`

: `Estoque suficiente (sobra de ${Math.abs(Math.round(diferenca))} unidades)`;

mostrarResultado("resultado-estoque",

`Estoque necessário: ${Math.ceil(estoqueNecessario)} unidades` +

`<span class="detalhe">${mensagemCompra} · Estoque atual dura ${duracaoAtual.toFixed(1)} dias</span>`);

}

// ---------- VENDAS ----------

function calcularVendas(){

let quantidade=Number(document.getElementById("vendasQuantidade").value);

let preco=Number(document.getElementById("vendasPreco").value);

let custo=Number(document.getElementById("vendasCusto").value);

if(!quantidade || quantidade<=0 || !preco || preco<=0 || custo<0){

mostrarErro("resultado-vendas","Preencha corretamente os campos.");

return;

}

let receitaTotal=quantidade*preco;

let custoTotal=quantidade*custo;

let lucroTotal=receitaTotal-custoTotal;

let margemLucro=(lucroTotal/receitaTotal)*100;

mostrarResultado("resultado-vendas",

`Receita total: R$ ${receitaTotal.toFixed(2)}` +

`<span class="detalhe">Custo total: R$ ${custoTotal.toFixed(2)} · Lucro total: R$ ${lucroTotal.toFixed(2)} (${margemLucro.toFixed(2)}%)</span>`);

}

// ---------- LIMPAR ----------

function limpar(secao){

const campos={

porcentagem: ["valor","porcentagemValor"],

lucro: ["lucroReceita","lucroCusto"],

margem: ["margemCusto","margemDesejada"],

estoque: ["estoqueAtual","estoqueVendaDiaria","estoqueDiasCobertura"],

vendas: ["vendasQuantidade","vendasPreco","vendasCusto"]

};

campos[secao].forEach(id=>{

document.getElementById(id).value="";

});

const resultado=document.getElementById("resultado-"+secao);

resultado.classList.remove("erro");

resultado.innerHTML="Resultado aparecerá aqui.";

}

mostrar("porcentagem");
