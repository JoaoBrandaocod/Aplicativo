// Formata número no padrão brasileiro (vírgula decimal, ponto de milhar)
function fmt(numero, casas=2){

return numero.toLocaleString("pt-BR",{

minimumFractionDigits:casas,

maximumFractionDigits:casas

});

}

function mostrar(id, botao){

const secoes=document.querySelectorAll(".card");

secoes.forEach(secao=>{

secao.style.display="none";

});

document.getElementById(id).style.display="block";

const abas=document.querySelectorAll(".aba");

abas.forEach(aba=>aba.classList.remove("ativa"));

const abaAlvo=botao || document.querySelector(`.aba[data-target="${id}"]`);

if(abaAlvo){

abaAlvo.classList.add("ativa");

}

}

function reiniciarAnimacao(el){

el.classList.remove("com-passos");

void el.offsetWidth;

el.classList.add("com-passos");

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

reiniciarAnimacao(el);

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

`Resultado: R$ ${fmt(resultado)}`,

[
{
formula: "Resultado = Valor × Porcentagem ÷ 100",
substituicao: `Resultado = ${fmt(valor)} × ${fmt(porcentagem)} ÷ 100 = ${fmt(resultado)}`
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

`Lucro: R$ ${fmt(lucro)} (margem de ${fmt(margemLucro)}%)`,

[
{
formula: "Lucro = Receita − Custo",
substituicao: `Lucro = ${fmt(receita)} − ${fmt(custo)} = ${fmt(lucro)}`
},
{
formula: "Margem de lucro (%) = (Lucro ÷ Receita) × 100",
substituicao: `Margem = (${fmt(lucro)} ÷ ${fmt(receita)}) × 100 = ${fmt(margemLucro)}%`
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

`Preço de venda: R$ ${fmt(precoVenda)}`,

[
{
formula: "Preço de Venda = Custo ÷ (1 − Margem ÷ 100)",
substituicao: `Preço = ${fmt(custo)} ÷ (1 − ${fmt(margem,0)}/100) = ${fmt(custo)} ÷ ${fmt(1-margem/100)} = ${fmt(precoVenda)}`
},
{
formula: "Lucro por unidade = Preço de Venda − Custo",
substituicao: `Lucro = ${fmt(precoVenda)} − ${fmt(custo)} = ${fmt(lucroUnitario)}`
},
{
formula: "Markup (%) = (Lucro por unidade ÷ Custo) × 100",
substituicao: `Markup = (${fmt(lucroUnitario)} ÷ ${fmt(custo)}) × 100 = ${fmt(markup)}%`
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
substituicao: `Necessário = ${fmt(vendaDiaria,0)} × ${fmt(diasCobertura,0)} = ${fmt(estoqueNecessario,1)}`
},
{
formula: "Diferença = Estoque Necessário − Estoque Atual",
substituicao: `Diferença = ${fmt(estoqueNecessario,1)} − ${fmt(estoqueAtual,0)} = ${fmt(diferenca,1)} → ${mensagemCompra}`
},
{
formula: "Duração do Estoque Atual = Estoque Atual ÷ Venda Diária",
substituicao: `Duração = ${fmt(estoqueAtual,0)} ÷ ${fmt(vendaDiaria,0)} = ${fmt(duracaoAtual,1)} dias`
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

`Lucro total: R$ ${fmt(lucroTotal)}`,

[
{
formula: "Receita Total = Quantidade × Preço Unitário",
substituicao: `Receita = ${fmt(quantidade,0)} × ${fmt(preco)} = ${fmt(receitaTotal)}`
},
{
formula: "Custo Total = Quantidade × Custo Unitário",
substituicao: `Custo = ${fmt(quantidade,0)} × ${fmt(custo)} = ${fmt(custoTotal)}`
},
{
formula: "Lucro Total = Receita Total − Custo Total",
substituicao: `Lucro = ${fmt(receitaTotal)} − ${fmt(custoTotal)} = ${fmt(lucroTotal)}`
},
{
formula: "Margem de Lucro (%) = (Lucro Total ÷ Receita Total) × 100",
substituicao: `Margem = (${fmt(lucroTotal)} ÷ ${fmt(receitaTotal)}) × 100 = ${fmt(margemLucro)}%`
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
