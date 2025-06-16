// scene.js
class SceneEngine {
  constructor(fileName, textEl, formEl) {
    this.fileName = fileName;
    this.textEl = textEl;
    this.formEl = formEl;
    this.lines = [];
    this.index = 0;
  }

  async load() {
    try {
      const response = await fetch(this.fileName + ".txt");
      const text = await response.text();
      this.lines = text.split("\n").map(line => line.trim()).filter(Boolean);
      this.index = 0;
      this.displayNextLine();
    } catch (error) {
      this.textEl.innerText = `❌ Failed to load ${this.fileName}`;
    }
  }

  displayNextLine() {
    if (this.index >= this.lines.length) {
      this.textEl.innerHTML += "<br><br>✅ The End.";
      return;
    }

    const line = this.lines[this.index];

    // Handle *choice block (simplified)
    if (line.startsWith("*choice")) {
      this.formEl.innerHTML = "";
      this.index++;
      while (this.lines[this.index]?.startsWith("#")) {
        const choiceLine = this.lines[this.index].substring(1).trim();
        const resultLine = this.lines[this.index + 1]?.trim();
        const btn = document.createElement("button");
        btn.textContent = choiceLine;
        btn.onclick = () => {
          this.textEl.innerHTML += `<br><b>👉 ${choiceLine}</b><br>${resultLine}`;
          this.index += 2;
          this.formEl.innerHTML = "";

          const nextBtn = document.createElement("button");
          nextBtn.textContent = "Continue";
          nextBtn.onclick = () => this.displayNextLine();
          this.formEl.appendChild(nextBtn);
        };
        this.formEl.appendChild(btn);
        this.index += 2;
      }
      return;
    }

    // Normal paragraph
    this.textEl.innerHTML += `<p>${line}</p>`;
    this.index++;

    this.formEl.innerHTML = "";
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => this.displayNextLine();
    this.formEl.appendChild(nextBtn);

    // 🔄 跳转章节判断：检测是否是 *finish chapter2 或其他
    if (line.startsWith("*finish")) {
      const parts = line.split(" ");
      const nextChapter = parts[1];
      if (nextChapter) {
        setTimeout(() => {
          const newEngine = new SceneEngine(nextChapter, this.textEl, this.formEl);
          newEngine.load();
        }, 500); // 等待视觉反馈
      }
    }
  }
}