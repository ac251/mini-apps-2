import axios from 'axios';

export default {
  getEntries(searchTerm, page) {
    return axios.get('/events', {
      params: {
        q: searchTerm,
        _page: page,
      },
    })
      .then((res) => {
        const { data } = res;
        const numResults = res.headers['x-total-count'];
        return { numResults, data };
      })
      .catch(err => console.log(err));
  },
};
