import api from './index';

const path = {
  // index
  home: '/home',
};

const home = () => api.get(path.home);

export default {
  home,
};
