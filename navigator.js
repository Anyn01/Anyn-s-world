// navigator.js

class Navigator {
  constructor(sceneList, stats, textId, formId) {
    this.sceneList = sceneList;
    this.stats = stats;
    this.textEl = document.getElementById(textId);
    this.formEl = document.getElementById(formId);
    this.currentScene = 0;
  }

  start() {
    this.render();
  }

  render() {
    this.textEl.innerHTML = "🧠 Welcome to Anyn's World!";
    this.formEl.innerHTML = "";

    const button = document.createElement("button");
    button.textContent = "Start Game";
    button.onclick = () => this.nextScene();
    this.formEl.appendChild(button);
  }

  nextScene() {
    this.textEl.innerHTML = `✅ Scene ${this.currentScene + 1} loaded!`;
    this.formEl.innerHTML = "";

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => {
      this.currentScene++;
      this.textEl.innerHTML = `✅ Scene ${this.currentScene + 1} loaded!`;
    };
    this.formEl.appendChild(nextBtn);
  }
}
