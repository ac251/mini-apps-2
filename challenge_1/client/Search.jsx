import React from 'react';

const Search = ({ value, submit, onChange }) => (
  <form>
    <input type="text" value={value} onChange={onChange}/>
    <button onClick={submit}>search</button>
  </form>
);