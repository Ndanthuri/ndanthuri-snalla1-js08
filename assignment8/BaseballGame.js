class BaseballGame {
  constructor() {
      this.key = "";
      this.guess = "";
  }

  generateKey() {
      const digits = [];
      while (digits.length < 3) {
          const digit = Math.floor(Math.random() * 10).toString();
          if (!digits.includes(digit)) {
              digits.push(digit);
          }
      }
      this.key = digits.join("");
  }

  getKey() {
      return this.key;
  }

  enterDigit(digit) {
      if (this.guess.length < 3) {
          this.guess += digit;
      }
  }

  getGuess() {
      return this.guess;
  }

  isGuessComplete() {
      return this.guess.length === 3;
  }

  calculateResult() {
      let balls = 0;
      let strikes = 0;
      for (let i = 0; i < 3; i++) {
          if (this.guess[i] === this.key[i]) {
              strikes++;
          } else if (this.key.includes(this.guess[i])) {
              balls++;
          }
      }
      this.guess = ""; // Reset guess for the next round
      return { guess: this.key, balls, strikes };
  }
}