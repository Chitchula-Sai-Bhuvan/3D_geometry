const shapeSelect = document.getElementById("shape");
const inputsDiv = document.getElementById("inputs");
const calcBtn = document.getElementById("calculate");
const volumeEl = document.getElementById("volume");
const surfaceEl = document.getElementById("surface");

// Input templates
const inputTemplates = {
  cuboid: ["Length (l)", "Width (w)", "Height (h)"],
  cube: ["Side (a)"],
  cylinder: ["Radius (r)", "Height (h)"],
  cone: ["Radius (r)", "Height (h)"],
  sphere: ["Radius (r)"],
  pyramid: ["Base length (a)", "Height (h)"],
};

function renderInputs() {
  inputsDiv.innerHTML = "";
  const fields = inputTemplates[shapeSelect.value];
  fields.forEach(f => {
    const label = document.createElement("label");
    label.textContent = f;
    const input = document.createElement("input");
    input.type = "number";
    input.required = true;
    input.dataset.label = f;
    inputsDiv.appendChild(label);
    inputsDiv.appendChild(input);
  });
}
renderInputs();
shapeSelect.addEventListener("change", renderInputs);

// Calculation logic
calcBtn.addEventListener("click", () => {
  const values = Array.from(inputsDiv.querySelectorAll("input")).map(i => +i.value);
  let volume = 0, surface = 0;

  switch (shapeSelect.value) {
    case "cuboid":
      const [l, w, h] = values;
      volume = l * w * h;
      surface = 2 * (l*w + w*h + h*l);
      break;
    case "cube":
      const [a] = values;
      volume = a**3;
      surface = 6 * a**2;
      break;
    case "cylinder":
      const [r1, h1] = values;
      volume = Math.PI * r1**2 * h1;
      surface = 2 * Math.PI * r1 * (r1 + h1);
      break;
    case "cone":
      const [r2, h2] = values;
      volume = (1/3) * Math.PI * r2**2 * h2;
      surface = Math.PI * r2 * (r2 + Math.sqrt(r2**2 + h2**2));
      break;
    case "sphere":
      const [r3] = values;
      volume = (4/3) * Math.PI * r3**3;
      surface = 4 * Math.PI * r3**2;
      break;
    case "pyramid":
      const [a2, h3] = values;
      volume = (1/3) * a2**2 * h3;
      surface = a2**2 + 2*a2*Math.sqrt((a2/2)**2 + h3**2);
      break;
  }

  volumeEl.textContent = `Volume: ${volume.toFixed(2)}`;
  surfaceEl.textContent = `Surface Area: ${surface.toFixed(2)}`;
});
