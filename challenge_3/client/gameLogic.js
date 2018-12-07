class Frame {
  constructor(game) {
    this.game = game;
    this.rollsLeftToCount = 2;
    this.pinsLeft = 10
    this.rolls = 0;
    this.status = 'open';
  }

  roll(pins) {
    if (pins === 10 && this.rolls === 0) {
      this.status = 'strike';
      this.rollsLeftToCount += 1;
    } else if (pins === this.pinsLeft && this.rolls === 1) {
      this.status = 'spare';
      this.rollsLeftToCount += 1;
    }
    if (this.rollsLeftToCount > 0) {
      this.game.addToScore(pins);
    }
    this.pinsLeft -= pins;
    this.rolls += 1;
    this.rollsLeftToCount -= 1;
  }
}

class BowlingGame {
  constructor() {
    this.currentFrame = 0;
    this.frames = [];
    this.score = 0;
    this.rollAgain = true;
    this.currentFrame = 0;
    this.gameOver = false;

  }

  addToScore(pins) {
    this.score += pins;
  }

  bowl(pins) {
    if (this.gameOver) {
      return;
    }
    if (!this.frames[this.currentFrame]) {
      this.frames[this.currentFrame] = new Frame(this);
    }
    this.frames[this.currentFrame].roll(pins);
    if(this.frames[this.currentFrame - 1]) {
      this.frames[this.currentFrame - 1].roll(pins);
    }
    if(this.frames[this.currentFrame - 2]) {
      this.frames[this.currentFrame - 2].roll(pins);
    }
    if(this.currentFrame < 9) {
      if (this.frames[this.currentFrame].status === 'strike'
        || this.frames[this.currentFrame].status === 'spare'
        || this.frames[this.currentFrame].rollsLeftToCount === 0)
      {
        this.currentFrame += 1
      }
    } else {
      if (this.frames[this.currentFrame].rollsLeftToCount === 0) {
        this.gameOver = true;
      }
    }
  
  }
}

export default BowlingGame;