import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    }
  }

  search() {
    // call API for results
  }

  handleInputChange(e) {
    this.setState({
      searchInput: e.target.value,
    })
  }

  render() {
    const { searchInput } = this.state;
    return (
      <div>
        <Search
          value={searchInput}
          submit={() =>this.search()}
          onChange={(e) => this.handleInputChange(e)}
        />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));



