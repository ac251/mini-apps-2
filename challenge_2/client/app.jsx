import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      data: [],
    };
    this.chart = React.createRef();
  }

  getData() {
    const { start, end } = this.state;
    const params = start.length && end.length ? { start, end } : null;
    axios.get('/prices', {
      params,
    })
      .then(res => {
        const { data } = res;
        this.setState({ data }, this.makeChart);
      })
      .catch(err => console.log(err));
  }

  updateDate(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { start, end } = this.state;
      if (start.length && end.length) {
        this.getData();
      }
    });
  }

  makeChart() {
    const { data } = this.state;
    const chart = new Chart(this.chart.current, {
      type: 'line',
      data: {
        labels: data.map(tuple => tuple[0]),
        datasets: [{
          label: 'bitcoin in usd',
          data: data.map(tuple => tuple[1].toString()),
        }]
      },
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { start, end } = this.state;
    return (
      <div>
        <canvas width="400" height="400" ref={this.chart} />
        <div>
          <a href="https://www.coindesk.com/price/">
            powered by CoinDesk
          </a>
        </div>
        <div>
          select a new date range
        </div>
        <label>
          start
          <input type="date" value={start} name="start" onChange={e => this.updateDate(e)} />
        </label>
        <label>
          end
          <input type="date" value={end} name="end" onChange={e => this.updateDate(e)} />
        </label>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

