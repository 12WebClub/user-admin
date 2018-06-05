/**
 * config
 * create by lqy 2018/1/31
 */

let apiHopst = `${location.protocol}//${location.host}/api/`;

if (process.env.NODE_ENV === 'development') {
  console.log('开发');

} else {
  console.log('生产');
  apiHopst = 'http://localhost:4000';
  console.log(apiHopst);
}

export default {
  apiHopst,
};
