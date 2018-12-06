import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import EventDisplay from './EventDisplay';
import EditForm from './EditForm'
import requests from './requests';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      data: [],
      page: 1,
      numResults: 0,
      editing: null,
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
    this.setState({ page: selected + 1 }, this.updateResults);
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

  submitEdit(id, update) {
    const { data, editing } = this.state;
    const oldItem = data[editing];
    const itemToSubmit = Object.assign({}, oldItem, update);
    requests.updateEntry(id, itemToSubmit)
      .then(() => {
        this.updateResults();
        this.setState({ editing: null });
      })
      .catch(err => console.log(err));
  }

  edit(idx) {
    this.setState({ editing: idx });
  }

  render() {
    const {
      searchInput,
      data,
      numResults,
      editing,
    } = this.state;
    const events = data.map((item, idx) => (
      <EventDisplay
        event={item}
        edit={() => this.edit(idx)}
      />
    ));
    let editForm;
    if (editing === null) {
      editForm = null;
    } else {
      const itemToEdit = data[editing];
      editForm = (
        <EditForm
          description={itemToEdit.description}
          date={itemToEdit.date}
          id={itemToEdit.id}
          edit={(id, update) => this.submitEdit(id, update)}
        />
      );
    }
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
        {numResults > 10
          ? (
            <ReactPaginate
              containerClassName="paginate"
              pageCount={Math.ceil(numResults / 10)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={page => this.changePages(page)}
              activeClassName="page-chosen"
            />
          )
          : null
        }
        {editForm}
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
