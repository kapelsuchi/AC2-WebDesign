document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const btnCadastro = document.getElementById("btnCadastro");
    const loginSection = document.getElementById("loginSection");
    const cadastroSection = document.getElementById("cadastroSection");

    // Exibe login por padrão
    loginSection.style.display = "block";
    cadastroSection.style.display = "none";

    btnLogin.addEventListener("click", () => {
        loginSection.style.display = "block";
        cadastroSection.style.display = "none";
        btnLogin.classList.add("ativo");
        btnCadastro.classList.remove("ativo");
    });

    btnCadastro.addEventListener("click", () => {
        loginSection.style.display = "none";
        cadastroSection.style.display = "block";
        btnCadastro.classList.add("ativo");
        btnLogin.classList.remove("ativo");
    });
});

// === Tema + Tecla "T" + Voltar ao topo (login) ===
(function () {
  const btnTema = document.getElementById('botaoTema');
  const temaSalvo = localStorage.getItem('temaRecycle');

  // aplica tema salvo ou preferência do sistema
  if (temaSalvo === 'escuro' || (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('tema-escuro');
    if (btnTema) btnTema.textContent = '☀️';
  }

  function alternarTema() {
    const escuro = document.body.classList.toggle('tema-escuro');
    localStorage.setItem('temaRecycle', escuro ? 'escuro' : 'claro');
    if (btnTema) btnTema.textContent = escuro ? '☀️' : '🌓';
  }

  if (btnTema) btnTema.addEventListener('click', alternarTema);

  // atalho de teclado "t"
  document.addEventListener('keydown', (e) => {
    if (e.key && e.key.toLowerCase() === 't') alternarTema();
  });

  // botão voltar ao topo (mesma UX do index)
  const btnTopo = document.getElementById('botaoTopo');
  if (btnTopo) {
    const atualizaVisibilidade = () => {
      const show = window.pageYOffset > 300;
      btnTopo.style.opacity = show ? '1' : '0';
      btnTopo.style.visibility = show ? 'visible' : 'hidden';
    };
    atualizaVisibilidade();
    window.addEventListener('scroll', atualizaVisibilidade);
    btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();

// Add success messages on form submit
document.querySelector('.formularioLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    showMessage('Login feito!', this);
});

document.querySelector('.formularioCadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    showMessage('Cadastro feito!', this);
});

function showMessage(text, form) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        grid-column: 1 / -1;
        text-align: center;
        color: #697159;
        background: #f0f7f0;
        border: 1px solid #697159;
        border-radius: 8px;
        padding: 12px;
        margin-top: 15px;
    `;
    
    form.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

