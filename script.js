const prompt = document.getElementById("prompt");
const btnGerar = document.getElementById("btnGerar");
const btnAbrir = document.getElementById("btnAbrir");
const btnCopiar = document.getElementById("btnCopiar");
const btnBaixar = document.getElementById("btnBaixar");
const codigo = document.getElementById("codigo");
const preview = document.getElementById("preview");
const status = document.getElementById("status");

let htmlGerado = "";

btnGerar.addEventListener("click", gerarSite);
btnAbrir.addEventListener("click", abrirPreview);
btnCopiar.addEventListener("click", copiarCodigo);
btnBaixar.addEventListener("click", baixarHTML);

btnGerar.disabled = false;
btnAbrir.disabled = true;
btnCopiar.disabled = true;
btnBaixar.disabled = true;

function gerarSite() {
    const descricao = prompt.value.trim();

    if (descricao === "") {
        setStatus("Digite uma descrição do seu negócio.", "erro");
        prompt.focus();
        return;
    }

    setStatus("⚡ Gerando a página...", "processando");
    toggleBotoes(true);

    setTimeout(() => {
        htmlGerado = criarHTML(descricao);
        codigo.textContent = htmlGerado;
        preview.srcdoc = htmlGerado;
        setStatus("✅ Página gerada com sucesso!", "sucesso");
        toggleBotoes(false);
    }, 700);
}

function abrirPreview() {
    if (!htmlGerado) {
        setStatus("Gere a página antes de abrir o preview.", "erro");
        return;
    }

    const novaJanela = window.open();
    if (!novaJanela) {
        setStatus("Não foi possível abrir o preview. Verifique o bloqueador de pop-ups.", "erro");
        return;
    }

    novaJanela.document.write(htmlGerado);
    novaJanela.document.close();
}

function copiarCodigo() {
    if (!htmlGerado) {
        setStatus("Nenhum código foi gerado.", "erro");
        return;
    }

    navigator.clipboard.writeText(htmlGerado)
        .then(() => setStatus("Código copiado para a área de transferência!", "sucesso"))
        .catch(() => setStatus("Não foi possível copiar o código.", "erro"));
}

function baixarHTML() {
    if (!htmlGerado) {
        setStatus("Nenhum código foi gerado.", "erro");
        return;
    }

    const blob = new Blob([htmlGerado], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "site.html";
    link.click();
    URL.revokeObjectURL(link.href);
    setStatus("Download do site iniciado.", "sucesso");
}

function toggleBotoes(disabled) {
    btnGerar.disabled = disabled;
    btnAbrir.disabled = disabled || htmlGerado === "";
    btnCopiar.disabled = disabled || htmlGerado === "";
    btnBaixar.disabled = disabled || htmlGerado === "";
}

function setStatus(mensagem, tipo = "") {
    status.textContent = mensagem;
    status.className = tipo;
}

function escolherTema(descricao) {
    const temaRegex = descricao.toLowerCase();

    const temas = [
        {
            name: "moderno",
            keywords: ["moderno", "tech", "tecnologia", "startup", "digital", "criativo"],
            primary: "#7c3aed",
            secondary: "#4f46e5",
            surface: "#0f172a",
            bg: "#020617",
            text: "#f8fafc",
            muted: "#c7d2fe"
        },
        {
            name: "claro",
            keywords: ["branco", "minimalista", "clean", "saudável", "claro", "natural"],
            primary: "#2563eb",
            secondary: "#93c5fd",
            surface: "#ffffff",
            bg: "#f8fafc",
            text: "#111827",
            muted: "#93a5c1"
        },
        {
            name: "quente",
            keywords: ["café", "marrom", "bege", "gastronomia", "restaurante", "bar"],
            primary: "#92400e",
            secondary: "#c2410c",
            surface: "#fbf4e9",
            bg: "#fff7ed",
            text: "#45321f",
            muted: "#9a3412"
        },
        {
            name: "natureza",
            keywords: ["verde", "ecológico", "natureza", "orgânico", "jardim", "sustentável"],
            primary: "#15803d",
            secondary: "#4d7c0f",
            surface: "#f0fdf4",
            bg: "#ecfdf5",
            text: "#14532d",
            muted: "#65a30d"
        }
    ];

    return temas.find((tema) => tema.keywords.some((keyword) => temaRegex.includes(keyword))) || temas[0];
}

function criarHTML(descricao) {
    const tema = escolherTema(descricao);
    const lower = descricao.toLowerCase();
    const pageTitle = descricao.replace(/\s+\|\s+.*$/, "");
    const hasWhatsApp = /whatsapp|zap|zapzap|telefone|contato/.test(lower);
    const hasGallery = /galeria|fotos|imagens|portfolio/.test(lower);
    const ctaLabel = hasWhatsApp ? "Fale pelo WhatsApp" : "Solicite um orçamento";
    const ctaLink = hasWhatsApp ? "https://wa.me/5511999999999?text=Olá%2C%20tenho%20interesse%20no%20seu%20serviço" : "mailto:contato@seudominio.com";
    const features = [
        "Design responsivo para qualquer dispositivo",
        "Conteúdo pensado no seu público",
        hasWhatsApp ? "Contato rápido por WhatsApp" : "Chamada clara para ação"
    ];

    return `<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${descricao}">
  <style>
    :root {
      --bg: ${tema.bg};
      --surface: ${tema.surface};
      --text: ${tema.text};
      --muted: ${tema.muted};
      --primary: ${tema.primary};
      --secondary: ${tema.secondary};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      min-height: 100vh;
      font-family: Inter, system-ui, sans-serif;
      background: radial-gradient(circle at top, rgba(255,255,255,0.16), transparent 25%), linear-gradient(180deg, var(--bg) 0%, #000000 100%);
      color: var(--text);
    }

    .page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px 56px;
    }

    .hero {
      display: grid;
      gap: 22px;
      padding: 44px;
      border-radius: 32px;
      background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
    }

    .hero span {
      display: inline-flex;
      padding: 10px 18px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      color: var(--muted);
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.02em;
      max-width: fit-content;
    }

    h1 {
      font-size: clamp(2.4rem, 3vw, 4.2rem);
      line-height: 1.05;
      max-width: 10ch;
    }

    p.lead {
      font-size: 1.05rem;
      line-height: 1.8;
      max-width: 70ch;
      color: rgba(255,255,255,0.82);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      padding: 0 26px;
      gap: 10px;
      border-radius: 999px;
      border: 1px solid transparent;
      font-size: 1rem;
      font-weight: 700;
      text-decoration: none;
      transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
      cursor: pointer;
    }

    .button-primary {
      background: var(--primary);
      color: #ffffff;
    }

    .button-secondary {
      background: transparent;
      border-color: rgba(255,255,255,0.16);
      color: var(--text);
    }

    .button:hover {
      transform: translateY(-2px);
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
      margin-top: 38px;
    }

    .card {
      padding: 26px;
      border-radius: 24px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      min-height: 180px;
    }

    .card h2 {
      font-size: 1.1rem;
      margin-bottom: 14px;
      color: var(--primary);
    }

    .card p {
      color: rgba(255,255,255,0.8);
      line-height: 1.75;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-top: 32px;
    }

    .gallery .tile {
      aspect-ratio: 4 / 3;
      border-radius: 22px;
      background: linear-gradient(180deg, var(--secondary), var(--primary));
      box-shadow: 0 24px 80px rgba(0,0,0,0.18);
    }

    .contact {
      margin-top: 52px;
      padding: 32px;
      border-radius: 28px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      display: grid;
      gap: 18px;
    }

    .contact h2 {
      font-size: 1.5rem;
      color: #ffffff;
    }

    .contact p {
      color: rgba(255,255,255,0.78);
    }

    .contact-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }

    footer {
      margin-top: 44px;
      display: flex;
      justify-content: center;
      color: rgba(255,255,255,0.6);
      font-size: 0.95rem;
    }

    @media (max-width: 900px) {
      .cards,
      .gallery {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .hero {
        padding: 28px;
      }

      .hero-actions,
      .contact-actions {
        flex-direction: column;
      }
    }
  </style>
</head>

<body>
  <div class="page">
    <section class="hero">
      <span>Site gerado automaticamente</span>
      <h1>${pageTitle}</h1>
      <p class="lead">${descricao}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="${ctaLink}" target="_blank" rel="noopener noreferrer">${ctaLabel}</a>
        <a class="button button-secondary" href="#sobre">Saiba mais</a>
      </div>
      <div class="cards">
        ${features.map((feature) => `<div class="card"><h2>${feature}</h2><p>Conteúdo pensado para destacar o valor do seu serviço e aumentar a conversão de visitantes em clientes.</p></div>`).join("")}
      </div>
      ${hasGallery ? `<div class="gallery">${Array.from({ length: 3 }).map(() => `<div class="tile"></div>`).join("")}</div>` : ""}
    </section>
    <section class="contact" id="sobre">
      <h2>Seu projeto pronto para decolar</h2>
      <p>Transforme sua ideia em uma página moderna que conecta clientes ao seu negócio com confiança e estilo.</p>
      <div class="contact-actions">
        <a class="button button-primary" href="${ctaLink}" target="_blank" rel="noopener noreferrer">${ctaLabel}</a>
        <a class="button button-secondary" href="mailto:contato@seudominio.com">Enviar um e-mail</a>
      </div>
    </section>
    <footer>Feito com inteligência para quem quer resultados rápidos.</footer>
  </div>
</body>

</html>`;
}
