function mostrar(id){

const secoes=document.querySelectorAll(".card");

secoes.forEach(secao=>{

secao.style.display="none";

});

document.getElementById(id).style.display="block";

}

function mostrarErro(idResultado, mensagem){

const el=document.getElementById(idResultado);

el.classList.remove("com-passos");

el.classList.add("erro");

el.innerHTML=mensagem;

}

// Recebe o resultado final (texto/HTML curto) e uma lista de linhas
// mostrando fórmula -> substituição -> resultado de cada etapa do cálculo.
function mostrarPassos(idResultado, resultadoFinal, passos){

const el=document.getElementById(idResultado);

el.classList.remove("erro");

el.classList.add("com-passos");

let html=`<div class="resposta-final">${resultadoFinal}</div>`;

html+=`<div class="passos">`;

html+=`<span class="passos-titulo">Como foi calculado:</span>`;

passos.forEach((passo,i)=>{

html+=`<div class="passo">`;

html+=`<span class="passo-numero">${i+1}</span>`;

html+=`<div class="passo-texto">`;

html+=`<code class="formula">${passo.formula}</code>`;

html+=`<code class="substituicao">${passo.substituicao}</code>`;

html+=`</div></div>`;

});

html+=`</div>`;

el.innerHTML=html;

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

mostrarPassos("resultado-porcentagem",

`Resultado: R$ ${resultado.toFixed(2)}`,

[
{
formula: "Resultado = Valor × Porcentagem ÷ 100",
substituicao: `Resultado = ${valor} × ${porcentagem} ÷ 100 = ${resultado.toFixed(2)}`
}
]);

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

mostrarPassos("resultado-lucro",

`Lucro: R$ ${lucro.toFixed(2)} (margem de ${margemLucro.toFixed(2)}%)`,

[
{
formula: "Lucro = Receita − Custo",
substituicao: `Lucro = ${receita.toFixed(2)} − ${custo.toFixed(2)} = ${lucro.toFixed(2)}`
},
{
formula: "Margem de lucro (%) = (Lucro ÷ Receita) × 100",
substituicao: `Margem = (${lucro.toFixed(2)} ÷ ${receita.toFixed(2)}) × 100 = ${margemLucro.toFixed(2)}%`
}
]);

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

mostrarPassos("resultado-margem",

`Preço de venda: R$ ${precoVenda.toFixed(2)}`,

[
{
formula: "Preço de Venda = Custo ÷ (1 − Margem ÷ 100)",
substituicao: `Preço = ${custo.toFixed(2)} ÷ (1 − ${margem}/100) = ${custo.toFixed(2)} ÷ ${(1-margem/100).toFixed(2)} = ${precoVenda.toFixed(2)}`
},
{
formula: "Lucro por unidade = Preço de Venda − Custo",
substituicao: `Lucro = ${precoVenda.toFixed(2)} − ${custo.toFixed(2)} = ${lucroUnitario.toFixed(2)}`
},
{
formula: "Markup (%) = (Lucro por unidade ÷ Custo) × 100",
substituicao: `Markup = (${lucroUnitario.toFixed(2)} ÷ ${custo.toFixed(2)}) × 100 = ${markup.toFixed(2)}%`
}
]);

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

mostrarPassos("resultado-estoque",

`Estoque necessário: ${Math.ceil(estoqueNecessario)} unidades`,

[
{
formula: "Estoque Necessário = Venda Diária × Dias de Cobertura",
substituicao: `Necessário = ${vendaDiaria} × ${diasCobertura} = ${estoqueNecessario.toFixed(1)}`
},
{
formula: "Diferença = Estoque Necessário − Estoque Atual",
substituicao: `Diferença = ${estoqueNecessario.toFixed(1)} − ${estoqueAtual} = ${diferenca.toFixed(1)} → ${mensagemCompra}`
},
{
formula: "Duração do Estoque Atual = Estoque Atual ÷ Venda Diária",
substituicao: `Duração = ${estoqueAtual} ÷ ${vendaDiaria} = ${duracaoAtual.toFixed(1)} dias`
}
]);

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

mostrarPassos("resultado-vendas",

`Lucro total: R$ ${lucroTotal.toFixed(2)}`,

[
{
formula: "Receita Total = Quantidade × Preço Unitário",
substituicao: `Receita = ${quantidade} × ${preco.toFixed(2)} = ${receitaTotal.toFixed(2)}`
},
{
formula: "Custo Total = Quantidade × Custo Unitário",
substituicao: `Custo = ${quantidade} × ${custo.toFixed(2)} = ${custoTotal.toFixed(2)}`
},
{
formula: "Lucro Total = Receita Total − Custo Total",
substituicao: `Lucro = ${receitaTotal.toFixed(2)} − ${custoTotal.toFixed(2)} = ${lucroTotal.toFixed(2)}`
},
{
formula: "Margem de Lucro (%) = (Lucro Total ÷ Receita Total) × 100",
substituicao: `Margem = (${lucroTotal.toFixed(2)} ÷ ${receitaTotal.toFixed(2)}) × 100 = ${margemLucro.toFixed(2)}%`
}
]);

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

resultado.classList.remove("com-passos");

resultado.innerHTML="Resultado aparecerá aqui.";

}

mostrar("porcentagem");
