import React from 'react';
import ReactDOM from 'react-dom';
import BowlingGame from './gameLogic';
import Frame from './Frame'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = new BowlingGame();
    this.state = {
      score: 0,
      currentFrame: 0,
      frames: [],
      gameOver: false,
      pinsSelected: '',
    }
  }
  
  bowl() {
    const { pinsSelected } = this.state;
    if (pinsSelected === '') {
      return;
    }
    const gameStatus = this.game.bowl(parseInt(pinsSelected, 10));
    console.log(gameStatus);
    this.setState(gameStatus);
  }

  handleSelectChange(e) {
    this.setState({pinsSelected: e.target.value});
  }

  render() {
    const { frames, pinsSelected } = this.state;
    const options = [];
    for (let i = 0; i < 11; i += 1) {
      options.push(
        <option>
          {i}  
        </option>
      )
    }
    const framesDisplay = frames.map(frame => <Frame frame={frame} />);
    return (
      <div>
        <select value={pinsSelected} onChange={(e) => this.handleSelectChange(e)}>
          <option value=''>
            select number of pins
          </option>
          {options}
        </select>
        <button onClick={() => this.bowl()}>
          bowl
        </button>
        <div>
          {framesDisplay}
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));

