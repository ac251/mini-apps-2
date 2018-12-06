import axios from 'axios';

export default {
  getEntries(searchTerm, page) {
    return axios.get('/events', {
      params: {
        q: searchTerm,
        _page: page,
      },
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
      .then((res) => {
        const { data } = res;
        const numResults = res.headers['x-total-count'];
        return { numResults, data };
      })
      .catch(err => console.log(err));
  },

  updateEntry(id, data) {
    return axios(`/events/${id}`, {
      method: 'PUT',
      data,
      headers: { 'Content-Type': 'application/json' },
    })
      .catch(err => console.log(err));
  },
};
