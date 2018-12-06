import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import EventDisplay from './EventDisplay';
import requests from './requests';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      data: [],
      page: 1,
      numResults: 0,
    };
  }

  search(e) {
    if (e) { e.preventDefault(); }
    this.setState({ page: 1 }, this.updateResults);
  }

  handleInputChange(e) {
    this.setState({
      searchInput: e.target.value,
    });
  }

  changePages({ selected }) {
    this.setState({ page: selected }, this.updateResults());
  }

  updateResults() {
    const { searchInput, page } = this.state;
    requests.getEntries(searchInput, page)
      .then(({ numResults, data }) => {
        this.setState({
          numResults,
          data,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { searchInput, data, numResults } = this.state;
    const events = data.map(item => <EventDisplay event={item} />);
    return (
      <div>
        <Search
          value={searchInput}
          submit={e => this.search(e)}
          onChange={e => this.handleInputChange(e)}
        />
        <div>
          {events}
        </div>
        <ReactPaginate
          pageCount={Math.ceil(numResults / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={page => this.changePages(page)}
        />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
