document.addEventListener("DOMContentLoaded", function () {

    const icones = [
        { selector: ".bloco_um .icone_ods", normal: "img/industria icon.png", hover: "img/industria icon branco.png" },
        { selector: ".bloco_dois .icone_ods", normal: "img/cidade icon.png", hover: "img/cidade icon branco.png" },
        { selector: ".bloco_tres .icone_ods", normal: "img/recycle icon.png", hover: "img/recycle icon branco.png" },
        { selector: ".bloco_quatro .icone_ods", normal: "img/clima icon.png", hover: "img/clima icon branco.png" },
        { selector: ".bloco_cinco .icone_ods", normal: "img/agua icon.png", hover: "img/agua icon branco.png" },
        { selector: ".bloco_seis .icone_ods", normal: "img/arvore icon.png", hover: "img/arvore icon branco.png" }
    ];

    icones.forEach(item => {
        const img = document.querySelector(item.selector);
        if (!img) return;

        // Incluímos todos os blocos até o seis
        const card = img.closest("a, .bloco_um, .bloco_dois, .bloco_tres, .bloco_quatro, .bloco_cinco, .bloco_seis");
        if (!card) return;

        card.addEventListener("mouseenter", () => {
            img.src = item.hover;
            img.style.transition = "filter 0.3s ease, opacity 0.3s ease";
            img.style.filter = "brightness(100%)";
        });

        card.addEventListener("mouseleave", () => {
            img.style.opacity = "0";
            setTimeout(() => {
                img.src = item.normal;
                img.style.opacity = "1";
            }, 150);
        });
    });
})


document.addEventListener("DOMContentLoaded", function() {
    const botaoTema = document.getElementById('botaoTema');
    
    
    const temaSalvo = localStorage.getItem('temaRecycle');
    if (temaSalvo === 'escuro' || (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('tema-escuro');
        if (botaoTema) botaoTema.textContent = '☀️';
    }
    
    
    if (botaoTema) {
        botaoTema.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('tema-escuro');
            localStorage.setItem('temaRecycle', isDark ? 'escuro' : 'claro');
            botaoTema.textContent = isDark ? '☀️' : '🌓';
        });
    }
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 't') {
            const isDark = document.body.classList.toggle('tema-escuro');
            localStorage.setItem('temaRecycle', isDark ? 'escuro' : 'claro');
            if (botaoTema) {
                botaoTema.textContent = isDark ? '☀️' : '🌓';
            }
        }
    });
});

// Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburguer = document.querySelector('.hamburguer');
    const menuNav = document.getElementById('menuNav');
    const menuLogin = document.getElementById('menuLogin');

    function closeMenu() {
        if (hamburguer) {
            hamburguer.classList.remove('active');
        }
        if (menuNav) {
            menuNav.classList.remove('active');
        }
        if (menuLogin) {
            menuLogin.classList.remove('active');
        }
    }

    function openMenu() {
        if (hamburguer) {
            hamburguer.classList.add('active');
        }
        if (menuNav) {
            menuNav.classList.add('active');
        }
        if (menuLogin) {
            menuLogin.classList.add('active');
        }
    }

    if (hamburguer) {
        hamburguer.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Fechar menu ao clicar em um link (mobile)
    const menuLinks = document.querySelectorAll('#menuNav a, #menuLogin a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 600) {
                closeMenu();
            }
        });
    });

    // Fechar menu ao redimensionar a tela para maior que 600px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            closeMenu();
        }
    });

    // Fechar menu ao clicar fora (opcional)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 600) {
            const isClickInsideMenu = menuNav.contains(event.target) || 
                                    menuLogin.contains(event.target) || 
                                    hamburguer.contains(event.target);
            
            if (!isClickInsideMenu && hamburguer.classList.contains('active')) {
                closeMenu();
            }
        }
    });
});