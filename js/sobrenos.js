
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.classList.add('active');
}

const cards = document.querySelectorAll('.card');

function animateOnScroll() {
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 100) {
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('hovered');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('hovered');
  });
});



const icones = [
  {selector: '.icone_img_1', normal: 'img/Nossa missão.png', hover: 'img/Nossa missão hover.png'},
  {selector: '.icone_img_2', normal: 'img/Nossa equipe.png', hover: 'img/Nossa equipe hover.png'},
  {selector: '.icone_img_3', normal: 'img/Nossos valores.png', hover: 'img/Nossos valores hover.png'},
  {selector: '.icone_img_4', normal: 'img/Nossa visão.png', hover: 'img/Nossa visão hover.png'}
];

icones.forEach(item => {
  const img = document.querySelector(item.selector);
  const card = img.closest('.card');

  card.addEventListener('mouseenter', () => {
    img.src = item.hover;   // aqui trocamos a imagem ao passar o mouse
  });

  card.addEventListener('mouseleave', () => {
    img.src = item.normal;  // aqui voltamos à original
  });
});

// Dark mode functionality
document.addEventListener("DOMContentLoaded", function() {
    const botaoTema = document.getElementById('botaoTema');
    
    // Check saved theme or system preference
    const temaSalvo = localStorage.getItem('temaRecycle');
    if (temaSalvo === 'escuro' || (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('tema-escuro');
        if (botaoTema) botaoTema.textContent = '☀️';
    }
    
    // Toggle theme on button click
    if (botaoTema) {
        botaoTema.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('tema-escuro');
            localStorage.setItem('temaRecycle', isDark ? 'escuro' : 'claro');
            botaoTema.textContent = isDark ? '☀️' : '🌓';
        });
    }
    
    // Keyboard shortcut 't'
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
