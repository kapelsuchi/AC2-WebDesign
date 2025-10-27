document.addEventListener("DOMContentLoaded", function () {

    const icones = [
        { selector: ".bloco_um .icone_img", normal: "img/maquina icon.png", hover: "img/maquina icon branco.png" },
        { selector: ".bloco_dois .icone_img", normal: "img/cantina icon.png", hover: "img/cantina icon branco.png" },
        { selector: ".bloco_tres .icone_img", normal: "img/material icon.png", hover: "img/material icon branco.png" },
        { selector: ".bloco_quatro .icone_img", normal: "img/faq icon.png", hover: "img/faq icon branco.png" },

        { selector: ".bloco_social_um .icone_img", normal: "img/instagram icon.png", hover: "img/instagram icon branco.png" },
        { selector: ".bloco_social_dois .icone_img", normal: "img/facebook icon.png", hover: "img/facebook icon branco.png" },
        { selector: ".bloco_social_tres .icone_img", normal: "img/twitter icon.png", hover: "img/twitter icon branco.png" },
        { selector: ".bloco_social_quatro .icone_img", normal: "img/youtube icon.png", hover: "img/youtube icon branco.png" }
    ];

    icones.forEach(item => {
        const img = document.querySelector(item.selector);
        if (!img) return;

        const card = img.closest("a, .bloco_um, .bloco_dois, .bloco_tres, .bloco_quatro");

        card.addEventListener("mouseenter", () => {
                img.src = item.hover;
        });

        card.addEventListener("mouseleave", () => {
            img.style.opacity = "0";
            setTimeout(() => {
                img.src = item.normal;
                img.style.opacity = "1";
            }, 150);
        });
    });
});


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

    console.log('Script carregado'); // Debug
    console.log('Hamburguer:', hamburguer); // Debug
    console.log('MenuNav:', menuNav); // Debug
    console.log('MenuLogin:', menuLogin); // Debug

    if (hamburguer && menuNav && menuLogin) {
        hamburguer.addEventListener('click', function() {
            console.log('Hamburguer clicado'); // Debug
            this.classList.toggle('active');
            menuNav.classList.toggle('active');
            menuLogin.classList.toggle('active');
        });
    } else {
        console.error('Elementos do menu não encontrados');
    }

    // Fechar menu ao clicar em um link (mobile)
    const menuLinks = document.querySelectorAll('#menuNav a, #menuLogin a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 600) {
                hamburguer.classList.remove('active');
                menuNav.classList.remove('active');
                menuLogin.classList.remove('active');
            }
        });
    });

    // Fechar menu ao redimensionar a tela para maior que 600px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            if (hamburguer) hamburguer.classList.remove('active');
            if (menuNav) menuNav.classList.remove('active');
            if (menuLogin) menuLogin.classList.remove('active');
        }
    });
});

