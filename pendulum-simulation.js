const canvas = document.querySelector("#scene");
const context = canvas.getContext("2d");
const lengthInput = document.querySelector("#length");
const angleInput = document.querySelector("#angle");
const lengthValue = document.querySelector("#lengthValue");
const angleValue = document.querySelector("#angleValue");
const periodText = document.querySelector("#period");

let startTime = performance.now();
let lastLength = Number(lengthInput.value);
let lastAngle = Number(angleInput.value);
const gravity = 9.81;
const trail = [];

function updateLabels() {
  const length = Number(lengthInput.value);
  const angle = Number(angleInput.value);
  lengthValue.textContent = `${length.toFixed(1)} m`;
  angleValue.textContent = `${angle}°`;
  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  periodText.textContent = `One complete swing takes about ${period.toFixed(2)} seconds.`;

  // Restart the swing whenever a setting changes
  if (length !== lastLength || angle !== lastAngle) {
    startTime = performance.now();
    lastLength = length;
    lastAngle = angle;
    trail.length = 0;
  }
}

function draw(now) {
  updateLabels();
  const length = Number(lengthInput.value);
  const maxAngle = Number(angleInput.value) * Math.PI / 180;
  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  const elapsed = (now - startTime) / 1000;
  const angle = maxAngle * Math.cos(2 * Math.PI * elapsed / period);

  context.clearRect(0, 0, canvas.width, canvas.height);
  const pivotX = canvas.width / 2;
  const pivotY = 48;
  const armLength = 100 + length * 75;
  const bobX = pivotX + armLength * Math.sin(angle);
  const bobY = pivotY + armLength * Math.cos(angle);

  trail.push({ x: bobX, y: bobY });
  if (trail.length > 35) trail.shift();

  context.strokeStyle = "#8ab6dc";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(24, pivotY);
  context.lineTo(canvas.width - 24, pivotY);
  context.stroke();

  context.fillStyle = "#1769aa";
  context.beginPath();
  context.arc(pivotX, pivotY, 7, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "#f4a261";
  context.lineWidth = 2;
  context.beginPath();
  trail.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  context.stroke();

  context.strokeStyle = "#40546b";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(pivotX, pivotY);
  context.lineTo(bobX, bobY);
  context.stroke();

  context.fillStyle = "#ffca3a";
  context.strokeStyle = "#d99b00";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(bobX, bobY, 18, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  requestAnimationFrame(draw);
}

lengthInput.addEventListener("input", updateLabels);
angleInput.addEventListener("input", updateLabels);
updateLabels();
requestAnimationFrame(draw);
