import api from './index';

const path = {
  // 注册
  addUser: '/addUser',
  // 注销
  login: '/login',
  // 注销
  logout: '/user/logout',
};

const addUser = form => api.post(path.addUser, form, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    const newRet = ret.slice(0, ret.length - 1);
    return newRet;
  }]
});

const login = form => api.post(path.login, form, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    const newRet = ret.slice(0, ret.length - 1);
    return newRet;
  }]
});


const logout = () => api.get(path.logout);

export default {
  addUser,
  login,
  logout,
};
