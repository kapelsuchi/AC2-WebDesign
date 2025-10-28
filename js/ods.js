// ----- Unified JS for: icons hover, dark mode, hamburger, animations ----- //
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- ICON HOVER (ODS blocks) ---------- */
  const icones = [
    { selector: '.bloco_um .icone_ods', normal: 'img/industria icon.png', hover: 'img/industria icon branco.png' },
    { selector: '.bloco_dois .icone_ods', normal: 'img/cidade icon.png', hover: 'img/cidade icon branco.png' },
    { selector: '.bloco_tres .icone_ods', normal: 'img/recycle icon.png', hover: 'img/recycle icon branco.png' },
    { selector: '.bloco_quatro .icone_ods', normal: 'img/clima icon.png', hover: 'img/clima icon branco.png' },
    { selector: '.bloco_cinco .icone_ods', normal: 'img/agua icon.png', hover: 'img/agua icon branco.png' },
    { selector: '.bloco_seis .icone_ods', normal: 'img/arvore icon.png', hover: 'img/arvore icon branco.png' }
  ];

  icones.forEach(item => {
    const img = document.querySelector(item.selector);
    if (!img) return;
    const card = img.closest('.bloco_um, .bloco_dois, .bloco_tres, .bloco_quatro, .bloco_cinco, .bloco_seis') || img.parentElement;
    if (!card) return;

    card.addEventListener('mouseenter', () => {
      img.src = item.hover;
      img.style.transition = 'filter 0.25s ease, opacity 0.25s ease';
      img.style.filter = 'brightness(100%)';
    });

    card.addEventListener('mouseleave', () => {
      // fade-switch so the change feels smooth
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = item.normal;
        img.style.opacity = '1';
      }, 150);
    });
  });

  /* ---------- DARK MODE (toggle + saved pref) ---------- */
  const botaoTema = document.getElementById('botaoTema');
  const temaSalvo = localStorage.getItem('temaRecycle');
  if (temaSalvo === 'escuro' || (!temaSalvo && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('tema-escuro');
    if (botaoTema) botaoTema.textContent = '☀️';
  }

  function toggleTema() {
    const isDark = document.body.classList.toggle('tema-escuro');
    localStorage.setItem('temaRecycle', isDark ? 'escuro' : 'claro');
    if (botaoTema) botaoTema.textContent = isDark ? '☀️' : '🌓';
  }

  if (botaoTema) {
    botaoTema.addEventListener('click', toggleTema);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key && e.key.toLowerCase() === 't') toggleTema();
  });

  const hamburguer = document.querySelector('.hamburguer');
    const menuNav = document.getElementById('menuNav');
    const menuLogin = document.getElementById('menuLogin');

    if (!hamburguer) {
        console.error('Hamburger menu not found!');
    } else {
        function closeMenu() {
            hamburguer.classList.remove('active');
            if (menuNav) menuNav.classList.remove('active');
            if (menuLogin) menuLogin.classList.remove('active');
        }
        
        function openMenu() {
            hamburguer.classList.add('active');
            if (menuNav) menuNav.classList.add('active');
            if (menuLogin) menuLogin.classList.add('active');
        }

        hamburguer.addEventListener('click', function (e) {
            e.stopPropagation();
            if (this.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close when clicking menu links
        document.querySelectorAll('#menuNav a, #menuLogin a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 600) closeMenu();
            });
        });

        // Close when resizing larger than mobile
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) closeMenu();
        });

        // Close when clicking outside
        document.addEventListener('click', (evt) => {
            if (window.innerWidth <= 600 && hamburguer.classList.contains('active')) {
                const target = evt.target;
                const clickInside = (menuNav && menuNav.contains(target)) || 
                                  (menuLogin && menuLogin.contains(target)) || 
                                  hamburguer.contains(target);
                if (!clickInside) closeMenu();
            }
        });
    }