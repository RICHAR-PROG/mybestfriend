const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorCentro = "brown";
const colorPétalos = "yellow";
const colorPuntos = "black";
const colorPunto = "black";
const colorTallo = "green";
const colorHojas = "green";

let rotationAngle = 0;

function drawFlower() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = 300;
  const centerY = 200;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY + 50);
  ctx.lineTo(centerX, centerY + 200);
  ctx.strokeStyle = colorTallo;
  ctx.lineWidth = 10;
  ctx.stroke();

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
  for (let i = 0; i < 200; i++) {
    const r = 4 * Math.sqrt(i);
    const theta = i * phi + rotationAngle;
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x + 70 * Math.cos(theta + 20), y + 70 * Math.sin(theta + 20));
    ctx.lineTo(x + 70 * Math.cos(theta - 40), y + 70 * Math.sin(theta - 40));
    ctx.lineTo(
      x + 70 * Math.cos(theta - 140),
      y + 70 * Math.sin(theta - 140)
    );
    ctx.lineTo(x + 70 * Math.cos(theta - 40), y + 70 * Math.sin(theta - 40));
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = colorPétalos;
    ctx.fill();
  }

  for (let i = 0; i < 200; i++) {
    const theta = i * phi + rotationAngle;
    const x = centerX + 4 * Math.sqrt(i) * Math.cos(theta);
    const y = centerY + 4 * Math.sqrt(i) * Math.sin(theta);

    ctx.beginPath();
    ctx.fillStyle = colorPuntos;
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.fillStyle = colorCentro;
  ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
  ctx.fill();

  // Dibujamos el mensaje encima de la flor
  const message = "Esta flor amarilla es para mi mejor amiga Yhesi😊!";
  const messageFont = "bold 24px Arial";
  const messageColor = "white";
  const messageOutlineColor = "black";
  const messageOutlineWidth = 2;

  ctx.font = messageFont;

  const messageWidth = ctx.measureText(message).width;
  const messageHeight = parseInt(messageFont, 10); // Altura de la fuente (24px)

  const messageX = centerX - messageWidth / 2;
  const messageY = centerY +150;

  
  ctx.strokeStyle = messageOutlineColor;
  ctx.lineWidth = messageOutlineWidth;
  ctx.strokeText(message, messageX, messageY);


  ctx.fillStyle = messageColor;
  ctx.fillText(message, messageX, messageY);

  rotationAngle += 0.01;

  requestAnimationFrame(drawFlower);
}

drawFlower();
