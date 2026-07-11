const prompt = document.getElementById("prompt");
const btnGerar = document.getElementById("btnGerar");
const btnCopiar = document.getElementById("btnCopiar");
const btnBaixar = document.getElementById("btnBaixar");
const codigo = document.getElementById("codigo");
const preview = document.getElementById("preview");
const status = document.getElementById("status");

let htmlGerado = "";

btnGerar.addEventListener("click", gerarSite);
btnCopiar.addEventListener("click", copiarCodigo);
btnBaixar.addEventListener("click", baixarHTML);

function gerarSite() {

    const descricao = prompt.value.trim();

    if (descricao === "") {
        alert("Digite uma descrição do seu negócio.");
        prompt.focus();
        return;
    }

    status.textContent = "⚡ Gerando página...";

    btnGerar.disabled = true;

    setTimeout(() => {

        htmlGerado = criarHTML(descricao);

        codigo.textContent = htmlGerado;

        preview.srcdoc = htmlGerado;

        status.textContent = "✅ Página gerada com sucesso!";

        btnGerar.disabled = false;

    }, 700);

}

function copiarCodigo() {

    if (htmlGerado === "") {
        alert("Nenhum código foi gerado.");
        return;
    }

    navigator.clipboard.writeText(htmlGerado);

    alert("Código copiado!");

}

function baixarHTML() {

    if (htmlGerado === "") {
        alert("Nenhum código foi gerado.");
        return;
    }

    const blob = new Blob([htmlGerado], {
        type: "text/html"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "site.html";

    link.click();

    URL.revokeObjectURL(link.href);

}

function criarHTML(descricao) {

return `<!DOCTYPE html>
<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${descricao}</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{

background:#f4f4f4;

display:flex;

justify-content:center;

align-items:center;

min-height:100vh;

padding:40px;

}

.card{

background:white;

padding:50px;

max-width:700px;

border-radius:20px;

box-shadow:0 20px 40px rgba(0,0,0,.15);

text-align:center;

}

h1{

color:#7c3aed;

margin-bottom:20px;

font-size:42px;

}

p{

font-size:18px;

line-height:1.6;

color:#555;

margin-bottom:30px;

}

button{

background:#7c3aed;

color:white;

padding:15px 35px;

border:none;

border-radius:10px;

cursor:pointer;

font-size:16px;

}

button:hover{

background:#6d28d9;

}

</style>

</head>

<body>

<div class="card">

<h1>${descricao}</h1>

<p>

Este é um exemplo de página criada automaticamente.

Em breve esta área será gerada por Inteligência Artificial.

</p>

<button>

Entrar em Contato

</button>

</div>

</body>

</html>`;

}