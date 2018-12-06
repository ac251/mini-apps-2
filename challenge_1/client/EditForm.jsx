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

  render() {
    const { description, date, id } = this.state;
    const { submit } = this.props;
    return (
      <form id="edit">
        <label htmlFor="date">
          date
          <input type="text" name="date" value={date} />
        </label>
        <label htmlFor="description" form="edit">
          description
          <textarea name="description" value={description} />
        </label>
        <button type="submit" onClick={id => submit(id)}>
          submit edits
        </button>
      </form>
    );
  }
}

export default EditForm;
