const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorCentro = "brown";
const colorPétalos = "yellow";
const colorPuntos = "black"; // Estrellas negras que "votan" de los pétalos
const colorTallo = "green";
const colorHojas = "green";
const backgroundColor = "black"; // Fondo negro

let rotationAngle = 0;
let stars = [];
let petalsStars = []; // Array para las estrellas que votan los pétalos
let centerX;
let centerY;

function createStars(numStars) {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.5,
    });
  }
}

function generatePetalStars(x, y) {
  for (let i = 0; i < 5; i++) {
    petalsStars.push({
      x: x,
      y: y,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.8 + 0.2,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
    });
  }
}

function drawStars() {
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }
}

function drawPetalStars() {
  for (let i = petalsStars.length - 1; i >= 0; i--) {
    const star = petalsStars[i];
    star.x += star.speedX;
    star.y += star.speedY;
    star.alpha -= 0.01; // Las estrellas se desvanecen lentamente
    if (star.alpha <= 0) {
      petalsStars.splice(i, 1); // Eliminar la estrella si se desvanece completamente
    } else {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(0, 0, 0, ${star.alpha})`;
      ctx.fill();
    }
  }
}

function drawFlower() {
  // Fondo negro del canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibuja las estrellas de fondo
  drawStars();

  // Dibuja las estrellas que votan de los pétalos
  drawPetalStars();

  // Coordenadas centrales de la flor
  const scaleFactor = Math.min(canvas.width, canvas.height) / 600;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 3;

  // Dibuja el tallo
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + 50);
  ctx.lineTo(centerX, centerY + 200);
  ctx.strokeStyle = colorTallo;
  ctx.lineWidth = 10 * scaleFactor;
  ctx.stroke();

  // Dibuja las hojas
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + 75);
  ctx.quadraticCurveTo(centerX - 50, centerY + 25, centerX - 100, centerY + 75);
  ctx.quadraticCurveTo(centerX - 50, centerY + 125, centerX, centerY + 75);
  ctx.fillStyle = colorHojas;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(centerX, centerY + 75);
  ctx.quadraticCurveTo(centerX + 50, centerY + 25, centerX + 100, centerY + 75);
  ctx.quadraticCurveTo(centerX + 50, centerY + 125, centerX, centerY + 75);
  ctx.fillStyle = colorHojas;
  ctx.fill();

  const phi = (1 + Math.sqrt(5)) / 2;

  // Dibuja los pétalos y vota estrellas negras
  for (let i = 0; i < 200; i++) {
    const r = 4 * Math.sqrt(i) * scaleFactor;
    const theta = i * phi + rotationAngle;
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x + 70 * Math.cos(theta + 20), y + 70 * Math.sin(theta + 20));
    ctx.lineTo(x + 70 * Math.cos(theta - 40), y + 70 * Math.sin(theta - 40));
    ctx.lineTo(x + 70 * Math.cos(theta - 140), y + 70 * Math.sin(theta - 140));
    ctx.lineTo(x + 70 * Math.cos(theta - 40), y + 70 * Math.sin(theta - 40));
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = colorPétalos;
    ctx.fill();

    // Votar estrellas negras desde el pétalo
    if (Math.random() < 0.02) {
      generatePetalStars(x, y); // Generar estrellas desde el pétalo
    }
  }

  // Dibuja los puntos
  for (let i = 0; i < 200; i++) {
    const theta = i * phi + rotationAngle;
    const x = centerX + 4 * Math.sqrt(i) * scaleFactor * Math.cos(theta);
    const y = centerY + 4 * Math.sqrt(i) * scaleFactor * Math.sin(theta);

    ctx.beginPath();
    ctx.fillStyle = colorPuntos;
    ctx.arc(x, y, 2 * scaleFactor, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Dibuja el centro de la flor
  ctx.beginPath();
  ctx.fillStyle = colorCentro;
  ctx.arc(centerX, centerY, 50 * scaleFactor, 0, 2 * Math.PI);
  ctx.fill();

  // Dibuja el mensaje
  const message = "Esta flor amarilla es para mi mejor amiga Yhesi😊!";
  const messageFont = `bold ${24 * scaleFactor}px Arial`;
  const messageColor = "white";
  const messageOutlineColor = "black";
  const messageOutlineWidth = 2 * scaleFactor;

  ctx.font = messageFont;
  const messageWidth = ctx.measureText(message).width;
  const messageX = centerX - messageWidth / 2;
  const messageY = centerY + 150 * scaleFactor;

  ctx.strokeStyle = messageOutlineColor;
  ctx.lineWidth = messageOutlineWidth;
  ctx.strokeText(message, messageX, messageY);

  ctx.fillStyle = messageColor;
  ctx.fillText(message, messageX, messageY);

  rotationAngle += 0.01;
  requestAnimationFrame(drawFlower);
}

// Redimensionar canvas y recalcular posiciones
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
  centerX = canvas.width / 2;
  centerY = canvas.height / 3;
  createStars(100); // Recrear estrellas con el nuevo tamaño
}

// Escuchar cambios en el tamaño de la ventana
window.addEventListener("resize", resizeCanvas);

// Inicialización
resizeCanvas();
drawFlower();
