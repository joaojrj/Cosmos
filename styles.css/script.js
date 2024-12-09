// Seleciona o elemento canvas e define o contexto 2D
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas para o tamanho da janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

// Classe que define as propriedades de cada partícula
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  // Atualiza a posição das partículas
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Recoloca a partícula ao lado oposto se sair da tela
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  // Desenha as partículas no canvas
  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// Função para criar partículas
function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

// Função para animar as partículas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

  // Atualiza e desenha todas as partículas
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animate); // Repetição contínua da animação
}

// Inicializa as partículas e começa a animação
init();
animate();

// Ajusta o tamanho do canvas ao redimensionar a janela
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray.length = 0; // Limpa as partículas
  init(); // Recria as partículas
});
