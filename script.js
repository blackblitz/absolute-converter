document.addEventListener("DOMContentLoaded", () => {
  const detector = new google_myanmar_tools.ZawgyiDetector();
  const converter = new google_myanmar_tools.ZawgyiConverter();
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  // clear input
  input.value = "";
  // convert on input
  input.oninput = () => {
    output.innerHTML = "";
    for (let line of input.value.split("\n")) {
      // convert and normalize if Zawgyi probability is more than 0.95
      if (detector.getZawgyiProbability(line) > 0.95)
        line = converter.zawgyiToUnicode(line).normalize("NFKC");
      output.innerHTML += `${line}\n`;
    }
  };
  // copy on click
  document.getElementById("copy-button").onclick = () => {
    const area = document.createElement("textarea");
    document.body.appendChild(area);
    area.value = output.innerText;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  };
});
