document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os cards da página
    const cards = document.querySelectorAll(".cardRecurso");

  // Define as imagens correspondentes a cada card, na ordem em que aparecem
    const imagens = [
    { normal: "img/sign in icon.png", hover: "img/sign in icon branco.png" },
    { normal: "img/password icon.png", hover: "img/password icon branco.png" },
    { normal: "img/recycle icon.png", hover: "img/recycle icon branco.png" },
    { normal: "img/joao icon.png", hover: "img/joao icon branco.png" },
    { normal: "img/carla icon.png", hover: "img/carla icon branco.png" },
    { normal: "img/bruno icon.png", hover: "img/bruno icon branco.png" }
    ];

    cards.forEach((card, index) => {
    const img = card.querySelector(".iconeCard img");
    if (!img || !imagens[index]) return;

    const normalSrc = imagens[index].normal;
    const hoverSrc = imagens[index].hover;

    // Efeito hover
    card.addEventListener("mouseenter", () => {
        img.src = hoverSrc;
        card.style.color = "#6d8140";
        img.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        img.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
        img.src = normalSrc;
        card.style.backgroundColor = "";
        card.style.color = "";
        img.style.transform = "scale(1)";
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Recycle JS - Inicializando funcionalidades...');
    
    inicializarTema();
    inicializarBotaoTopo();
    inicializarTypewriter();
    inicializarScrollSuave();
    inicializarHeaderDinamico();
    inicializarAnimacoesScroll();
    
    inicializarBotoes();
});


function inicializarTema() {
    const botaoTema = document.getElementById('botaoTema');
    const temaSalvo = localStorage.getItem('temaRecycle');
    
    if (temaSalvo === 'escuro' || (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        ativarModoEscuro();
    }
    
    botaoTema.addEventListener('click', alternarTema);
}

function alternarTema() {
    const botaoTema = document.getElementById('botaoTema');
    
    if (document.body.classList.contains('tema-escuro')) {
        desativarModoEscuro();
    } else {
        ativarModoEscuro();
    }
}

function ativarModoEscuro() {
    document.body.classList.add('tema-escuro');
    localStorage.setItem('temaRecycle', 'escuro');
    document.getElementById('botaoTema').textContent = '☀️';
}

function desativarModoEscuro() {
    document.body.classList.remove('tema-escuro');
    localStorage.setItem('temaRecycle', 'claro');
    document.getElementById('botaoTema').textContent = '🌓';
}

function inicializarBotaoTopo() {
    const botaoTopo = document.getElementById('botaoTopo');
    
    // Ocultar botão inicialmente
    botaoTopo.style.opacity = '0';
    botaoTopo.style.visibility = 'hidden';
    
    // Mostrar/ocultar botão no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            botaoTopo.style.opacity = '1';
            botaoTopo.style.visibility = 'visible';
        } else {
            botaoTopo.style.opacity = '0';
            botaoTopo.style.visibility = 'hidden';
        }
    });
    
    botaoTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


function inicializarTypewriter() {
    const textosParaDigitar = [
        {
            elemento: document.querySelector('.tituloPrincipal'),
            textos: [
                'Conheça a Recycle',
                'Transforme seu lixo em benefícios',
                'Junte-se à revolução sustentável'
            ],
            velocidade: 100,
            apagarVelocidade: 50,
            tempoEntreTextos: 2000
        },
        {
            elemento: document.querySelector('.textoDescricao'),
            textos: [
                'A máquina inteligente que transforma o descarte de PETs e latas de alumínio em uma experiência moderna, gratificante e sustentável.',
                'Simples, bonita e eficaz para um futuro mais verde.',
                'Reciclagem com recompensas - faça a diferença!'
            ],
            velocidade: 40,
            apagarVelocidade: 30,
            tempoEntreTextos: 3000
        }
    ];
    
    textosParaDigitar.forEach(config => {
        if (config.elemento) {
            iniciarTypewriter(config);
        }
    });
}

function iniciarTypewriter(config) {
    let textoIndex = 0;
    let charIndex = 0;
    let isApagando = false;
    const elemento = config.elemento;
    const textoOriginal = elemento.textContent;
    
    elemento.setAttribute('data-texto-original', textoOriginal);
    elemento.textContent = '';
    elemento.classList.add('digitando');
    
    function digitar() {
        const textoAtual = config.textos[textoIndex];
        
        if (!isApagando && charIndex <= textoAtual.length) {
            elemento.textContent = textoAtual.substring(0, charIndex);
            charIndex++;
            setTimeout(digitar, config.velocidade);
        } else if (isApagando && charIndex >= 0) {
            elemento.textContent = textoAtual.substring(0, charIndex);
            charIndex--;
            setTimeout(digitar, config.apagarVelocidade);
        } else {
            isApagando = !isApagando;
            if (!isApagando) {
                textoIndex = (textoIndex + 1) % config.textos.length;
            }
            setTimeout(digitar, config.tempoEntreTextos);
        }
    }
    
    
    setTimeout(digitar, 1000);
}


function inicializarScrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const alvo = document.querySelector(href);
                
                if (alvo) {
                    alvo.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}


function inicializarHeaderDinamico() {
    const header = document.querySelector('.cabecalhoContainer');
    let ultimoScroll = 0;
    
    window.addEventListener('scroll', function() {
        const scrollAtual = window.pageYOffset;
        
        
        if (scrollAtual > 50) {
            header.style.background = 'var(--header-scroll-bg, rgba(255, 255, 255, 0.95))';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
            header.style.boxShadow = '';
        }
        
        if (scrollAtual > ultimoScroll && scrollAtual > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        ultimoScroll = scrollAtual;
    });
}


function inicializarAnimacoesScroll() {
    const elementos = document.querySelectorAll('.cardRecurso, .secaoTecnologia, .secaoSustentavel');
    
    elementos.forEach(el => {
        el.classList.add('escondido');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revelado');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elementos.forEach(el => {
        observer.observe(el);
    });
}



function inicializarBotoes() {
    
    const botaoSaibaMais = document.querySelector('.botaoPrimario');
    if (botaoSaibaMais) {
        botaoSaibaMais.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector('.secaoTecnologia').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    
   
    const cards = document.querySelectorAll('.cardRecurso');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function estaNaTela(elemento) {
    const rect = elemento.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

console.log('✅ Todas as funcionalidades JavaScript foram carregadas!');

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 't') {
    const b = document.body;
    const escuro = b.classList.toggle('tema-escuro');
    localStorage.setItem('temaRecycle', escuro ? 'escuro' : 'claro');
    console.log('Tema:', escuro ? 'escuro' : 'claro');
  }
});

const p = document.getElementById('btnPontos');
if (p) p.addEventListener('keydown', (e) => { if (e.key === 'Enter') p.click(); });

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