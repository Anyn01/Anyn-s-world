// stats.js
class Stats {
  constructor() {
    this.values = {};
  }

  set(key, value) {
    this.values[key] = value;
  }

  get(key) {
    return this.values[key] || 0;
  }

  increment(key, amount = 1) {
    if (!this.values[key]) {
      this.values[key] = 0;
    }
    this.values[key] += amount;
  }
}