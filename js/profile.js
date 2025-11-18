// profile.js - versão integrada: gráficos, tabs (esconde footer), upload local e edição de nome
(function () {
  // Helper para logar com prefixo
  const L = (msg, ...rest) => console.log('[profile.js]', msg, ...rest);
  const E = (msg, ...rest) => console.error('[profile.js]', msg, ...rest);

  try {
    // checar se Chart está disponível
    if (!window.Chart) {
      E('Chart.js não encontrado. Verifique se <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> está antes deste arquivo.');
      return;
    }
    L('Iniciando script de perfil...');

    document.addEventListener('DOMContentLoaded', () => {
      L('DOM pronto.');

      // ===================== GRÁFICOS (Chart.js) =====================
      (function initPizza() {
        try {
          const el = document.getElementById('graficoPizza');
          if (!el) { L('graficoPizza não encontrado — pulando pizza.'); return; }
          const ctx = el.getContext('2d');
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Plástico', 'Alumínio', 'Outros'],
              datasets: [{
                data: [55, 35, 10],
                backgroundColor: ['#8ae46fff', '#ee82a6ff', '#89a0e0ff'],
                borderWidth: 0,
                hoverOffset: 10
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: '60%',
              layout: { padding: 15 },
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: '#333', font: { size: 14 } }
                },
                tooltip: {
                  backgroundColor: '#e49eb3ff',
                  titleColor: '#ffffffff',
                  bodyColor: '#ffffffff',
                  borderColor: '#c78397ff',
                  borderWidth: 2
                }
              }
            }
          });
          L('Gráfico pizza inicializado.');
        } catch (err) { E('Erro initPizza:', err); }
      })();

      (function initBarra() {
        try {
          const el = document.getElementById('graficoBarra');
          if (!el) { L('graficoBarra não encontrado — pulando barra.'); return; }
          const ctx = el.getContext('2d');
          const canvasHeight = el.clientHeight || el.height || 400;
          const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
          grad.addColorStop(0, '#8ae46fff');
          grad.addColorStop(1, '#ee82a6ff');

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
              datasets: [{
                label: 'Atividade',
                data: [65, 80, 45, 90, 70, 55, 40],
                backgroundColor: grad,
                borderRadius: 8
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              layout: { padding: 15 },
              scales: {
                y: { beginAtZero: true, ticks: { color: '#333', font: { size: 13 } }, grid: { color: '#eee' } },
                x: { ticks: { color: '#333', font: { size: 13 } }, grid: { display: false } }
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#e49eb3ff',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  borderColor: '#c78397ff',
                  borderWidth: 2
                }
              }
            }
          });
          L('Gráfico barra inicializado.');
        } catch (err) { E('Erro initBarra:', err); }
      })();

      // ===================== ANIMAÇÃO DO PERFIL =====================
      (function animPerfil() {
        try {
          const foto = document.querySelector(".perfil-foto");
          const detalhes = document.querySelector(".perfil-detalhes");
          if (!foto || !detalhes) { L('Elementos de animação não encontrados — pulando animação.'); return; }

          foto.style.opacity = "0";
          detalhes.style.opacity = "0";
          foto.style.transform = "translateY(20px)";
          detalhes.style.transform = "translateY(20px)";

          setTimeout(() => {
            foto.style.transition = "all 0.6s ease";
            detalhes.style.transition = "all 0.6s ease";
            foto.style.opacity = "1";
            detalhes.style.opacity = "1";
            foto.style.transform = "translateY(0)";
            detalhes.style.transform = "translateY(0)";
          }, 200);
          L('Animação iniciada.');
        } catch (err) { E('Erro animPerfil:', err); }
      })();

      // ===================== DADOS & TABELAS =====================
      try {
        // dados (mantive os seus)
        const dados7dias = [
          {data: '05/11/2025', tipo: 'Plástico', kg: 1.2},
          {data: '06/11/2025', tipo: 'Papel',    kg: 0.8},
          {data: '07/11/2025', tipo: 'Vidro',    kg: 2.0},
          {data: '08/11/2025', tipo: 'Metal',    kg: 1.5},
          {data: '09/11/2025', tipo: 'Plástico', kg: 1.0},
          {data: '10/11/2025', tipo: 'Papel',    kg: 0.9},
          {data: '11/11/2025', tipo: 'Vidro',    kg: 1.7}
        ];

        const rankingCompleto = [
          { pos: 1,   nome: 'Laura M.',    kg: 18.9 },
          { pos: 2,   nome: 'Pedro S.',    kg: 16.4 },
          { pos: 3,   nome: 'Ana P.',      kg: 14.7 },
          { pos: 4,   nome: 'Marcos L.',   kg: 13.1 },
          { pos: 5,   nome: 'Bianca R.',   kg: 12.3 },
          { pos: 340, nome: 'Murilo',      kg: 4.0  }
        ];

        const meuNome = 'Murilo';

        function popular7dias() {
          const tbody = document.querySelector('#tabela7dias tbody');
          if (!tbody) { L('#tabela7dias tbody não encontrado.'); return; }
          tbody.innerHTML = '';
          dados7dias.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${item.data}</td><td>${item.tipo}</td><td>${item.kg.toFixed(1)}</td>`;
            tbody.appendChild(tr);
          });
          L('Tabela 7 dias populada.');
        }

        function popularRankingCompleto() {
          const tbody = document.querySelector('#tabelaRanking tbody');
          if (!tbody) { L('#tabelaRanking tbody não encontrado.'); return; }

          const ordenado = rankingCompleto.slice().sort((a, b) => a.pos - b.pos);
          tbody.innerHTML = '';
          let usuarioEncontrado = null;

          ordenado.forEach(item => {
            const tr = document.createElement('tr');
            if (item.nome.toLowerCase().includes(meuNome.toLowerCase())) {
              tr.classList.add('user-me');
              usuarioEncontrado = item;
            }
            tr.innerHTML = `<td>${item.pos}</td><td>${item.nome}</td><td>${item.kg.toFixed(1)}</td>`;
            tbody.appendChild(tr);
          });

          const destaque = document.getElementById('destaqueUsuario');
          if (destaque) {
            if (usuarioEncontrado) {
              destaque.textContent = `Você está na posição ${usuarioEncontrado.pos} — ${usuarioEncontrado.kg.toFixed(1)} kg reciclados nesta semana.`;
            } else {
              destaque.textContent = `Você não aparece no ranking desta semana. Continue reciclando!`;
            }
          }
          L('Ranking populado.');
        }

        popular7dias();
        popularRankingCompleto();
      } catch (err) {
        E('Erro populando tabelas:', err);
      }

      // ===================== TABS (Visão Geral / Configurações) =====================
      (function tabs() {
        try {
          const links = document.querySelectorAll('.perfil-menu a[data-tab]');
          const visao = document.getElementById('visao');
          const config = document.getElementById('configuracoes');
          const footerEl = document.querySelector('footer');
          const body = document.body;

          if (!links.length) { L('Links das tabs não encontrados.'); return; }

          function showTab(name) {
            if (name === 'config') {
              if (visao) visao.hidden = true;
              if (config) config.hidden = false;
              // esconde o footer
              body.classList.add('config-ativo');
              if (footerEl) footerEl.setAttribute('aria-hidden', 'true');
            } else {
              if (visao) visao.hidden = false;
              if (config) config.hidden = true;
              // mostra o footer
              body.classList.remove('config-ativo');
              if (footerEl) footerEl.removeAttribute('aria-hidden');
            }
            links.forEach(a => a.classList.toggle('ativo', a.dataset.tab === name));
          }

          links.forEach(a => {
            a.addEventListener('click', (e) => {
              e.preventDefault();
              showTab(a.dataset.tab);
            });
          });

          const inicial = document.querySelector('.perfil-menu a.ativo')?.dataset.tab || 'visao';
          showTab(inicial);
          L('Tabs configuradas (com hide-footer integrado).');
        } catch (err) {
          E('Erro nas tabs:', err);
        }
      })();

      // ===================== NOME LOCAL (localStorage) =====================
      (function cp_nameModule() {
        const KEY = 'recycle_profile_name';

        const input = document.getElementById('cp-nameInput');
        const btnSave = document.getElementById('cp-nameSave');
        const btnReset = document.getElementById('cp-nameReset');

        // elementos que exibem o nome no header
        const headerName = document.querySelector('.perfil-detalhes h2');
        const headerMeta = document.querySelector('.perfil-detalhes p'); // "murlo • membro desde ..."

        if (!input || !btnSave || !btnReset) {
          L('cp_name: elementos não encontrados — pulando módulo de nome.');
          return;
        }

        const defaultName = headerName ? headerName.textContent.trim() : '';

        function aplicarNome(nome) {
          if (headerName) headerName.textContent = nome;
          if (headerMeta) {
            const partes = headerMeta.textContent.split('•').map(s => s.trim());
            if (partes.length > 1) {
              headerMeta.textContent = `${nome} • ${partes.slice(1).join(' • ')}`;
            } else {
              headerMeta.textContent = nome;
            }
          }
        }

        (function carregar() {
          try {
            const saved = localStorage.getItem(KEY);
            if (saved) {
              input.value = saved;
              aplicarNome(saved);
              L('cp_name: nome carregado do localStorage.');
            } else {
              input.value = defaultName || '';
            }
          } catch (err) {
            console.warn('Erro ao acessar localStorage (nome):', err);
            input.value = defaultName || '';
          }
        })();

        btnSave.addEventListener('click', () => {
          const val = (input.value || '').trim();
          if (!val) { alert('O nome não pode ficar em branco.'); return; }
          if (val.length > 30) { alert('Nome muito longo (máx 30 caracteres).'); return; }
          try {
            localStorage.setItem(KEY, val);
            aplicarNome(val);
            const prevText = btnSave.textContent;
            btnSave.textContent = 'Salvo!';
            setTimeout(() => btnSave.textContent = prevText, 900);
            L('cp_name: nome salvo no localStorage.');
          } catch (err) {
            E('Erro ao salvar nome no localStorage:', err);
            alert('Não foi possível salvar o nome localmente.');
          }
        });

        btnReset.addEventListener('click', () => {
          const confirmReset = confirm('Remover nome salvo e voltar ao padrão?');
          if (!confirmReset) return;
          try {
            localStorage.removeItem(KEY);
            input.value = defaultName || '';
            aplicarNome(defaultName || '');
            L('cp_name: nome resetado para padrão.');
          } catch (err) {
            E('Erro ao resetar nome:', err);
            alert('Não foi possível resetar o nome.');
          }
        });
      })();

      // ===================== UPLOAD LOCAL (localStorage) =====================
      (function uploadAvatarLocalOnly() {
        try {
          const fileInput = document.getElementById('cp-fileInput');
          const avatarImg = document.getElementById('cp-avatarImg');
          const principalImg = document.getElementById('perfilFotoPrincipal');
          const uploadBtn = document.getElementById('cp-uploadBtn');
          const progressBar = document.getElementById('cp-progress')?.querySelector('i');
          const msg = document.getElementById('cp-msg');

          const STORAGE_KEY = 'recycle_profile_avatar';
          const MAX_BYTES = 4 * 1024 * 1024; // 4MB
          let selectedFile = null;

          if (!fileInput || !avatarImg || !uploadBtn || !msg) {
            L('Elementos de upload não encontrados — pulando upload local.');
            return;
          }

          // load saved
          (function loadSaved() {
            try {
              const saved = localStorage.getItem(STORAGE_KEY);
              if (saved) {
                avatarImg.src = saved;
                if (principalImg) principalImg.src = saved;
                msg.textContent = 'Avatar carregado do armazenamento local.';
                L('Carregado avatar do localStorage.');
              }
            } catch (e) {
              console.warn('Erro ao acessar localStorage:', e);
            }
          })();

          fileInput.addEventListener('change', () => {
            const f = fileInput.files?.[0];
            if (!f) {
              selectedFile = null;
              uploadBtn.disabled = true;
              msg.textContent = '';
              return;
            }
            if (!f.type.startsWith('image/')) {
              msg.textContent = 'Selecione um arquivo de imagem.';
              selectedFile = null;
              uploadBtn.disabled = true;
              return;
            }
            if (f.size > MAX_BYTES) {
              msg.textContent = 'Imagem muito grande (máx 4 MB).';
              selectedFile = null;
              uploadBtn.disabled = true;
              return;
            }
            selectedFile = f;
            const reader = new FileReader();
            reader.onload = (e) => {
              avatarImg.src = e.target.result;
              if (principalImg) principalImg.src = e.target.result;
            };
            reader.readAsDataURL(f);
            uploadBtn.disabled = false;
            msg.textContent = `Pronto para salvar: ${f.name} (${Math.round(f.size/1024)} KB)`;
          });

          uploadBtn.addEventListener('click', () => {
            if (!selectedFile) return;
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataUrl = e.target.result;
              try {
                localStorage.setItem(STORAGE_KEY, dataUrl);
                msg.textContent = 'Foto salva localmente (persistirá neste navegador).';
                uploadBtn.disabled = true;
                if (progressBar) {
                  progressBar.style.width = '100%';
                  setTimeout(() => { progressBar.style.width = '0%'; }, 600);
                }
                L('Avatar salvo no localStorage.');
              } catch (err) {
                E('Erro ao salvar no localStorage:', err);
                msg.textContent = 'Falha ao salvar (localStorage).';
              }
            };
            reader.onerror = () => {
              msg.textContent = 'Erro ao ler arquivo.';
            };
            reader.readAsDataURL(selectedFile);
          });

          // remove button
          (function ensureRemoveButton() {
            try {
              const controls = document.querySelector('.cp-controls') || document.getElementById('configuracoes');
              if (!controls) return;
              if (document.getElementById('cp-removeBtn')) return;
              const btn = document.createElement('button');
              btn.id = 'cp-removeBtn';
              btn.className = 'cp-btn';
              btn.type = 'button';
              btn.style.marginLeft = '8px';
              btn.textContent = 'Remover foto';
              btn.addEventListener('click', () => {
                try {
                  localStorage.removeItem(STORAGE_KEY);
                  const defaultSrc = 'img/perfil.jpg';
                  avatarImg.src = defaultSrc;
                  if (principalImg) principalImg.src = defaultSrc;
                  msg.textContent = 'Avatar removido (usando imagem padrão).';
                } catch (err) {
                  E('Erro ao remover avatar', err);
                  msg.textContent = 'Erro ao remover avatar.'; 
                }
              });
              const target = controls.querySelector('div') || controls;
              target.appendChild(btn);
              L('Botão remover criado.');
            } catch (err) { E('Erro ensureRemoveButton:', err); }
          })();

        } catch (err) { E('Erro uploadAvatarLocalOnly:', err); }
      })();

    }); // DOMContentLoaded end

  } catch (e) {
    E('Erro top-level:', e);
  }
})();



(function () {
  const STORAGE_KEY = 'nomeUsuario';

  function log(...args) { console.log('[nomeUsuario]', ...args); }
  function err(...args) { console.error('[nomeUsuario]', ...args); }

  // atualiza onde for necessário: .nome-usuario, header h2 e header meta (antes do "•")
  function aplicarNomeNaUI(nome) {
    if (!nome) return;
    // todos os elementos com a classe
    document.querySelectorAll('.nome-usuario').forEach(el => { el.textContent = nome; });
    // header h2 (se existir)
    const headerH2 = document.querySelector('.perfil-detalhes h2');
    if (headerH2) headerH2.textContent = nome;
    // header meta (mantém a parte após • se existir)
    const headerMeta = document.querySelector('.perfil-detalhes p');
    if (headerMeta) {
      const partes = headerMeta.textContent.split('•').map(s => s.trim());
      if (partes.length > 1) headerMeta.textContent = `${nome} • ${partes.slice(1).join(' • ')}`;
      else headerMeta.textContent = nome;
    }
  }

  // carrega do localStorage e aplica
  function carregarNome() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        log('Carregado do localStorage:', saved);
        aplicarNomeNaUI(saved);
        // se houver input de edição, preenche
        const input = document.getElementById('inputNome') || document.getElementById('cp-nameInput');
        if (input) input.value = saved;
      } else {
        log('Nenhum nome salvo localmente.');
      }
    } catch (e) {
      err('Erro lendo localStorage:', e);
    }
  }

  // salvar novo nome (validação mínima)
  function salvarNome(nome) {
    const v = (nome || '').trim();
    if (!v) {
      alert('Digite um nome válido.');
      return false;
    }
    if (v.length > 60) {
      alert('Nome muito longo.');
      return false;
    }
    try {
      localStorage.setItem(STORAGE_KEY, v);
      aplicarNomeNaUI(v);
      log('Nome salvo:', v);
      const status = document.getElementById('statusNome') || document.getElementById('cp-nameMsg');
      if (status) { status.textContent = 'Nome atualizado localmente.'; status.style.color = 'green'; }
      return true;
    } catch (e) {
      err('Erro ao salvar localStorage:', e);
      alert('Não foi possível salvar localmente.');
      return false;
    }
  }

  // função que liga eventos — segura contra execução precoce
  function init() {
    // preencher UI com valor salvo
    carregarNome();

    // ligar evento do botão(s)
    const btn1 = document.getElementById('btnSalvarNome');
    const btn2 = document.getElementById('cp-nameSave'); // caso tenha o outro botão
    const input = document.getElementById('inputNome') || document.getElementById('cp-nameInput');

    if (btn1) btn1.addEventListener('click', () => salvarNome(input ? input.value : ''));
    if (btn2) btn2.addEventListener('click', () => salvarNome(input ? input.value : ''));

    // também atualiza em tempo real enquanto digita (opcional, remove se não quiser)
    if (input) {
      input.addEventListener('input', () => {
        const previewEls = document.querySelectorAll('.nome-usuario-preview');
        previewEls.forEach(el => el.textContent = input.value);
      });
    }

    log('Módulo nome inicializado.');
  }

  // garante execução após DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();




(function rrModalFix() {
  const openBtn = document.querySelector('.btn-acao'); // "VER DETALHES"
  const overlay = document.getElementById('rr-modalOverlay');
  const modal = document.getElementById('rr-modal');
  const closeBtn = document.getElementById('rr-closeBtn'); // botão footer
  const TRANS_FALLBACK = 520; // ms - fallback caso transitionend não seja disparado

  if (!overlay || !modal) {
    console.warn('[rrModalFix] overlay ou modal não encontrados — abortando módulo de modal.');
    return;
  }

  // garante tabindex para foco
  if (!modal.hasAttribute('tabindex')) modal.setAttribute('tabindex','-1');

  function safePopulate() {
    try { if (typeof populateModal === 'function') populateModal(); } catch (e) { console.warn('[rrModalFix] populateModal erro:', e); }
  }

  function openModal(e) {
    if (e) e.preventDefault();
    safePopulate();

    // limpar classes de saída caso estejam
    modal.classList.remove('rr-exit');
    modal.classList.remove('rr-enter');

    // mostrar imediatamente (mantém seu comportamento antigo)
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden','false');

    // forçar reflow/espera e então adicionar classe visível para animar
    requestAnimationFrame(() => {
      overlay.classList.add('rr-visible'); // (CSS controla opacity/visibilidade)
      // ativa estado visual do modal (fade/slide)
      // usamos pequena espera para garantir que o browser aplicou display:flex antes de animar
      requestAnimationFrame(() => modal.classList.add('rr-enter'));
    });

    // bloquear scroll de fundo
    document.body.style.overflow = 'hidden';

    // foco acessível após pequena espera para não interromper animação
    setTimeout(() => modal.focus(), 160);
  }

  function finishHide() {
    // esconde e limpa classes
    overlay.style.display = 'none';
    overlay.classList.remove('rr-visible');
    modal.classList.remove('rr-enter', 'rr-exit');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  function closeModal(e) {
    if (e) e.preventDefault();

    // se já estiver fechando, ignore
    if (!overlay.classList.contains('rr-visible')) return;

    // inicia animação de saída
    modal.classList.remove('rr-enter');
    // força quebra de rendering para garantir transição
    void modal.offsetWidth;
    modal.classList.add('rr-exit');

    // tira a visibilidade do overlay (ele tem transition de opacity)
    overlay.classList.remove('rr-visible');

    // espera o modal terminar a transição (mais confiável que setTimeout)
    let called = false;
    function onTransitionEnd(ev) {
      // só responder às transições do modal (transform/opacity)
      if (ev.target !== modal) return;
      if (called) return;
      called = true;
      modal.removeEventListener('transitionend', onTransitionEnd);
      finishHide();
    }
    modal.addEventListener('transitionend', onTransitionEnd);

    // fallback caso transitionend não ocorra
    setTimeout(() => {
      if (!called) {
        called = true;
        modal.removeEventListener('transitionend', onTransitionEnd);
        finishHide();
      }
    }, TRANS_FALLBACK);
  }

  // binds seguros (checam existência)
  if (openBtn) openBtn.addEventListener('click', openModal);
  // também permitir abrir por event delegated se preferir:
  // document.addEventListener('click', (e)=>{ if (e.target.matches('.btn-acao')) openModal(e); });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // fechar clicando fora do modal
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  // Esc fecha
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  console.log('[rrModalFix] inicializado — transição de saída confiável pronta.');
})();