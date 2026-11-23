# 🎢 The Amazing Pendulum!

> **A swinging bob, a string, and a little help from gravity**

Have you ever watched a playground swing move back and forth? That motion is a lot like a **pendulum**. Pendulums are simple, but they help us understand motion, energy, and even how clocks keep time.

---

## 🧭 What is a pendulum?

A simple pendulum has two main parts:

- **A support** at the top
- **A bob** (a small weight) hanging from a string

Pull the bob to one side and let go. It swings back and forth around its resting position.

```text
             support
                ●
               /|\
              / | \
             o  o  o   ← bob at different points in its swing
                |
             resting
             position
```

One trip from one side to the other side and back again is **one complete swing**, also called one **oscillation**.

## ⚙️ How does it work?

### 1. Lift and let go

When you pull the bob up to one side, you give it **gravitational potential energy**—stored energy because it is higher than its lowest point.

### 2. Gravity pulls it down

When you let go, gravity pulls the bob toward the lowest point. The string guides the bob along a curved path.

### 3. It swings past the middle

At the bottom, the bob is moving fastest. It has lots of **kinetic energy**, the energy of motion. It swings past the middle because it has momentum.

### 4. It climbs the other side

The bob rises and slows down. Its motion energy changes back into stored gravitational energy. At the far end, it pauses for an instant before swinging back.

### 5. The pattern repeats

Energy keeps changing between stored energy and motion energy. In a real pendulum, air resistance and friction slowly take a little energy away, so the swings get smaller and eventually stop.

> **Energy swap:** high point = more stored energy; lowest point = more motion energy.

## 📏 What changes the swing?

For small swings, a pendulum's time for one complete swing is mostly controlled by its **length**.

- **Longer string → slower swing**
- **Shorter string → quicker swing**
- **A heavier bob → about the same timing**
- **A bigger starting pull → about the same timing**, as long as the swing is not too wide

The approximate period (time for one complete swing) is:

**T ≈ 2π × √(L ÷ g)**

Here, **T** is the time in seconds, **L** is the pendulum length in metres, and **g** is Earth's gravity (about **9.8 m/s²**). You don't need to memorize the equation—the big idea is that a longer pendulum takes more time to swing.

For example, a pendulum about **1 metre** long takes about **2 seconds** to swing out and back.

## 🕰️ Pendulums and clocks

Because a pendulum can swing at a steady rhythm, it was once used to help clocks keep time. A clock counts the swings and uses them to move its hands. Modern clocks often use other timekeeping parts, but pendulums are still useful in science demonstrations and some clocks.

## 🔬 Try it yourself: a safe pendulum experiment

### You will need

- A piece of string
- A small, safe object to use as a bob (for example, a large washer)
- A ruler
- A place to hang it securely, with an adult's help
- A timer and a notebook

### Steps

1. Ask an adult to help you hang the string from a secure support.
2. Measure the length from the hanging point to the middle of the bob.
3. Pull the bob gently to one side. Keep the starting angle small.
4. Let go without giving it a push.
5. Time **10 complete swings**, then divide the time by 10 to estimate one swing's period.
6. Repeat and compare your results.
7. Change only the string length and try again. Does the longer pendulum take more time?

| String length | Time for 10 swings | Average time for 1 swing |
|---|---:|---:|
|  |  |  |
|  |  |  |
|  |  |  |

> **Be safe:** Keep the swing gentle, use a lightweight bob, keep faces and breakable things away, and never climb or hang anything without an adult.

## 🖥️ Make a pendulum simulation

This little browser simulation lets you change the string length and starting angle. The bob follows a realistic small-angle pendulum model, and a trail shows where it has been.

### How to run it

The simulation lives in its own files, right next to this guide:

- [pendulum-simulation.html](./pendulum-simulation.html) — the page you open
- [pendulum-simulation.js](./pendulum-simulation.js) — the script that makes the bob swing

1. Double-click **`pendulum-simulation.html`** to open it in a web browser.
2. Change the sliders. Watch what happens to the bob and its timing!

Prefer a single file? Expand the box below, copy the code, and save it as `pendulum-simulation.html`.

<details>
<summary>Show the all-in-one code</summary>

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Pendulum Lab</title>
  <style>
    body {
      max-width: 720px;
      margin: 24px auto;
      padding: 0 16px;
      color: #183153;
      background: #f2f8ff;
      font: 16px/1.5 system-ui, sans-serif;
    }
    main {
      padding: 20px;
      background: white;
      border: 2px solid #cfe5ff;
      border-radius: 18px;
      box-shadow: 0 8px 24px #18315318;
    }
    h1 { margin-top: 0; color: #1769aa; }
    .controls { display: flex; flex-wrap: wrap; gap: 20px; }
    label { display: grid; gap: 4px; min-width: 210px; }
    canvas {
      display: block;
      width: 100%;
      height: auto;
      margin-top: 16px;
      border-radius: 12px;
      background: linear-gradient(#e9f6ff, #ffffff);
    }
    output { font-weight: 700; color: #1769aa; }
    .note { color: #40546b; }
  </style>
</head>
<body>
  <main>
    <h1>🎢 My Pendulum Lab</h1>
    <p>Change a setting and see how your pendulum swings!</p>
    <div class="controls">
      <label>
        String length: <output id="lengthValue"></output>
        <input id="length" type="range" min="0.5" max="2" step="0.1" value="1">
      </label>
      <label>
        Starting angle: <output id="angleValue"></output>
        <input id="angle" type="range" min="10" max="60" step="1" value="30">
      </label>
    </div>
    <p id="period" aria-live="polite"></p>
    <canvas id="scene" width="640" height="360"
      aria-label="An animated pendulum swinging from a support"></canvas>
    <p class="note">Try making the string longer. Does one complete swing take more time?</p>
  </main>
  <script>
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
  </script>
</body>
</html>
```

</details>

### 🧠 What is the simulation doing?

It uses the small-angle pendulum rule to estimate the bob's position over time:

**angle = starting angle × cos(2π × time ÷ period)**

The program calculates the period from the string length and gravity, then redraws the bob many times each second. This is a simplified model: it ignores air resistance, string stretch, and other small real-world effects.

## 🎯 Mini challenges

1. **Slow swing:** Can you make the pendulum swing more slowly?
2. **Fast swing:** What setting makes it swing faster?
3. **Big starting angle:** Does changing the angle change the displayed period in this simple model?
4. **Real life vs. simulation:** What might make a real pendulum gradually stop?
5. **Fair test:** If you compare two pendulums, what should you change—and what should you keep the same?

## ✅ Quick quiz

1. What pulls the bob toward the bottom of its path?
2. When is the bob moving fastest?
3. What usually makes a pendulum swing more slowly: a longer string or a heavier bob?
4. What happens to a real pendulum's swing after a long time?

**Answers:** 1. Gravity. 2. At the lowest point. 3. A longer string. 4. Friction and air resistance take energy away, so it slows and stops.

---

### 🌟 Remember

A pendulum swings because gravity pulls it toward the bottom, while its motion carries it past the middle. Its energy changes back and forth—and the length of the string helps set the rhythm!
