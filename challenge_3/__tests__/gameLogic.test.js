import BowlingGame from '../client/gameLogic';


test('it adds bowled amounts to the score', () => {
  const game = new BowlingGame();
  game.bowl(5);
  game.bowl(4);
  expect(game.score).toBe(9);
});

test('it moves to the next frame after the appropriate number of rolls', () => {
  const game = new BowlingGame();
  game.bowl(0);
  expect(game.currentFrame).toBe(0);
  game.bowl(0);
  expect(game.currentFrame).toBe(1);
  game.bowl(8);
  game.bowl(2);
  expect(game.currentFrame).toBe(2);
  game.bowl(10);
  expect(game.currentFrame).toBe(3);
});

test('it adds the next roll after a spare to the frame', () => {
  const game = new BowlingGame();
  game.bowl(6);
  game.bowl(4);
  game.bowl(4);
  expect(game.score).toBe(18);
  game.bowl(4);
  expect(game.score).toBe(22);
});

test('it adds the next two rolls after a strike to the frame', () => {
  const game = new BowlingGame();
  game.bowl(10);
  game.bowl(10);
  expect(game.score).toBe(30);
  game.bowl(10);
  expect(game.score).toBe(60);
  const anotherGame = new BowlingGame();
  anotherGame.bowl(10);
  anotherGame.bowl(3);
  anotherGame.bowl(3);
  expect(anotherGame.score).toBe(22);
  anotherGame.bowl(3);
  expect(anotherGame.score).toBe(25);
});

test('it bowls a perfect game', () => {
  const game = new BowlingGame();
  for (let i = 0; i < 12; i +=1) {
    game.bowl(10);
  }
  expect(game.score).toBe(300);
  expect(game.currentFrame).toBe(9);
  expect(game.gameOver).toBe(true);
})