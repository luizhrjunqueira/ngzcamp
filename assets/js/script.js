// ANIMAÇÃO - ESTRELAS
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.3 - 0.15
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);
  for (let star of stars) {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.delta = -star.delta;
    }

    star.x += star.speedX;
    star.y += star.speedY;

    // Reposiciona se sair da tela
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}

createStars(200);
animateStars();


// SIDE BAR MENU
function menuShow() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.icon');
  const isOpening = !menu.classList.contains('open');

  const screenWidth = window.innerWidth;
  const targetWidth = screenWidth <= 430 ? screenWidth : 250;
  const duration = 400;

  let start = null;

  const initialWidth = parseFloat(menu.style.width) || 0;
  const finalWidth = isOpening ? targetWidth : 0;

  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = ease(progress);

    const currentWidth = initialWidth + (finalWidth - initialWidth) * easedProgress;
    menu.style.width = `${currentWidth}px`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      if (isOpening) {
        menu.classList.add('open');
        menu.style.opacity = '1';
        menu.style.pointerEvents = 'auto';

        // Mostra links suavemente
        setTimeout(() => {
          menu.classList.add('show-links');
        }, 50);
      } else {
        menu.classList.remove('show-links');
        setTimeout(() => {
          menu.classList.remove('open');
          menu.style.opacity = '0';
          menu.style.pointerEvents = 'none';
        }, 300);
      }
    }
  }

  icon.style.opacity = '0';
  setTimeout(() => {
    icon.src = isOpening ? "assets/images/close.svg" : "assets/images/menu.svg";
    icon.style.opacity = '1';
  }, 150);

  if (isOpening) {
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
  } else {
    // Oculta links antes de retrair
    menu.classList.remove('show-links');
  }

  requestAnimationFrame(animate);
}