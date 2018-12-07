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
        const { bpi } = res.data;
        const data = []
        for (let date in bpi) {
          data.push([date, bpi[date]]);
        }
        data.sort((a, b) => {
          for (let i = 0; i < 3; i++) {
            const aNum = parseInt(a[0][i]);
            const bNum = parseInt(b[0][i]);
            if (aNum - bNum) {
              return aNum - bNum;
            }
          }
          return 0;
        });
        this.setState({ data }, this.makeChart);
      })
      .catch(err => console.log(err));
  }

  updateDate(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { start, end } = this.state;
      if (start.length && end.length) {
        console.log(this.state);
        this.getData();
      }
    });
  }

  makeChart() {
    const { data } = this.state;
    console.log(data);
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

