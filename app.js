const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorCentro = "brown";
const colorPétalos = "yellow";
const colorPuntos = "black";
const colorTallo = "green";
const colorHojas = "green";
const backgroundColor = "black";

let stars = [];
let petalsStars = [];
let flowers = [];

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
    star.alpha -= 0.01;
    if (star.alpha <= 0) {
      petalsStars.splice(i, 1);
    } else {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(0, 0, 0, ${star.alpha})`;
      ctx.fill();
    }
  }
}

function drawFlower(centerX, centerY, rotationAngle, scaleFactor) {
  // Tallo
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + 50 * scaleFactor);
  ctx.lineTo(centerX, centerY + 200 * scaleFactor);
  ctx.strokeStyle = colorTallo;
  ctx.lineWidth = 10 * scaleFactor;
  ctx.stroke();

  // Hojas
  ctx.beginPath();
  ctx.moveTo(centerX, centerY + 75 * scaleFactor);
  ctx.quadraticCurveTo(centerX - 50 * scaleFactor, centerY + 25 * scaleFactor, centerX - 100 * scaleFactor, centerY + 75 * scaleFactor);
  ctx.quadraticCurveTo(centerX - 50 * scaleFactor, centerY + 125 * scaleFactor, centerX, centerY + 75 * scaleFactor);
  ctx.fillStyle = colorHojas;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(centerX, centerY + 75 * scaleFactor);
  ctx.quadraticCurveTo(centerX + 50 * scaleFactor, centerY + 25 * scaleFactor, centerX + 100 * scaleFactor, centerY + 75 * scaleFactor);
  ctx.quadraticCurveTo(centerX + 50 * scaleFactor, centerY + 125 * scaleFactor, centerX, centerY + 75 * scaleFactor);
  ctx.fillStyle = colorHojas;
  ctx.fill();

  const phi = (1 + Math.sqrt(5)) / 2;

  // Pétalos y estrellas negras
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

    if (Math.random() < 0.02) {
      generatePetalStars(x, y);
    }
  }

  // Centro de la flor
  ctx.beginPath();
  ctx.fillStyle = colorCentro;
  ctx.arc(centerX, centerY, 50 * scaleFactor, 0, 2 * Math.PI);
  ctx.fill();

  // Agregar texto dinámico debajo de la flor
  const message = " ";
  const message_ = 'Para mi mejor amiga Yhesi 😊';
  
  const messageFont = `bold ${12* scaleFactor}px Arial`;
  const messageColor = "white";
  const messageOutlineColor = "black";
  const messageOutlineWidth = 2;

  ctx.font = messageFont;
  const messageWidth = ctx.measureText(message+message_).width;
  const messageX = centerX - messageWidth / 2;
  const messageY = centerY + 200* scaleFactor;

  ctx.strokeStyle = messageOutlineColor;
  ctx.lineWidth = messageOutlineWidth;
  ctx.strokeText(message+message_, messageX, messageY);

  ctx.fillStyle = messageColor;
  ctx.fillText(message+message_, messageX, messageY);
}

function drawAllFlowers() {
  // Fondo negro del canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStars();
  drawPetalStars();

  // Dibuja todas las flores
  flowers.forEach(flower => {
    drawFlower(flower.x, flower.y, flower.rotationAngle, flower.scaleFactor);
    flower.rotationAngle += 0.01; // Animar rotación de pétalos
  });

  requestAnimationFrame(drawAllFlowers);
}

function createFlowers(numFlowers) {
  flowers = [];
  for (let i = 0; i < numFlowers; i++) {
    flowers.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.7 + 50, // Ajustado para que las flores no estén muy arriba
      rotationAngle: Math.random() * Math.PI * 2,
      scaleFactor: 0.5 + Math.random() * 0.5,
    });
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
  createStars(100);
  createFlowers(3 + Math.floor(Math.random() * 2));
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawAllFlowers();
