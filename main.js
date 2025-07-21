
document.addEventListener("DOMContentLoaded", () => {
  const qrInput = document.getElementById("qrInput");
  const logOutput = document.getElementById("logOutput");
  const expectedUnitsDisplay = document.getElementById("expectedUnitsDisplay");

  let startTime = null;
  let intervalSec = 45; // Placeholder
  const shiftDurationMin = 8 * 60 + 30;
  const breakMin = 30;
  const workDurationSec = (shiftDurationMin - breakMin) * 60;

  qrInput.addEventListener("focus", () => qrInput.select());

  qrInput.addEventListener("change", () => {
    const val = qrInput.value.trim();
    if (val) {
      const logLine = document.createElement("div");
      logLine.textContent = `[${new Date().toLocaleString()}] QR: ${val}`;
      const img = document.createElement("img");
      img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(val)}&size=80x80`;
      logLine.appendChild(img);
      logOutput.appendChild(logLine);
      qrInput.value = "";
    }
  });

  setInterval(() => {
    if (startTime) {
      const elapsed = (Date.now() - startTime) / 1000;
      const expected = Math.floor(elapsed / intervalSec);
      expectedUnitsDisplay.textContent = `Expected Units Done: ${expected}`;
    }
  }, 5000);

  startTime = Date.now(); // Simulate pressing "start"
});
