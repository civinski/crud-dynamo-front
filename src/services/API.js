import Axios from 'axios';

const api = Axios.create({ baseURL: 'http://localhost:3050' });

export default api;
