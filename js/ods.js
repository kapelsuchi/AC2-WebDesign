
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

    if (hamburguer) {
        hamburguer.addEventListener('click', function() {
            this.classList.toggle('active');
            menuNav.classList.toggle('active');
            menuLogin.classList.toggle('active');
        });
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
            hamburguer.classList.remove('active');
            menuNav.classList.remove('active');
            menuLogin.classList.remove('active');
        }
    });
});