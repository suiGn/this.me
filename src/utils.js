//CLASSES
class Menu {
  constructor(rl) {
    this.rl = rl;
  }
  prompt(question) {
    return new Promise((resolve) => this.rl.question(question, resolve));
  }
  async display() {
    throw new Error('Method display() must be implemented by subclass');
  }
  async handleInput(input) {
    throw new Error('Method handleInput() must be implemented by subclass');
  }
}

module.exports = Menu;