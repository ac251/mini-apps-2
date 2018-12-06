import React from 'react';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const { description, date } = this.props;
    this.state = {
      description,
      date,
    };
  }

  changeInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submit(e) {
    const { edit, id } = this.props;
    const { description, date } = this.state;
    e.preventDefault();
    edit(id, { description, date });
  }

  render() {
    const { description, date } = this.state;
    return (
      <form id="edit">
        <label htmlFor="date">
          date
          <input type="text" name="date" value={date} onChange={e => this.changeInput(e)} />
        </label>
        <label htmlFor="description" form="edit">
          description
          <textarea
            rows="5"
            cols="40"
            name="description"
            value={description}
            onChange={e => this.changeInput(e)}
          />
        </label>
        <button type="submit" onClick={e => this.submit(e)}>
          submit edits
        </button>
      </form>
    );
  }
}

export default EditForm;
