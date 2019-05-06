import axios from 'axios'
import Vue from "vue"
import router from './router'
import store from './store'
let axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ?
    //'https://easy-mock.com/mock/5b519939138c4168e1f9fb44/api/v1/web/' :
    '/api/v1/web/' :

    'http://bc.shequ1024.club/api/v1/web/',
  /* other custom settings */
  withCredentials: true, // default
  headers: { 'content-type': 'application/json' },
});
let loadingInstance
let loadingRequestMap = {}
axiosInstance.interceptors.request.use(function (config) {
  console.log(config);
  if(config.loading){
    let timstamp = +new Date()
    config.timestamp = timstamp
    loadingInstance  = Vue.prototype.$loading({
      lock: true,
      text: '',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    loadingRequestMap[timstamp] = true
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
axiosInstance.interceptors.response.use(function (response) {
  if(response.config.loading){
    delete loadingRequestMap[response.config.timestamp];
    if(Object.keys(loadingRequestMap).length === 0){
      loadingInstance.close()
    }
  }
  if(response.data.status === 2009 || response.data.status === 2010){
    router.push('/login');
    return Promise.reject(response.data.message)
  }else if(response.data.status === 1000){
    return response
  }else {
    store.commit('showModal',{
      title:'请求失败',
      text: response.data.message
    })
    return Promise.reject(response.data.message)
  }

}, function (error) {
  // Do something with response error
  console.log(error.response);
  loadingRequestMap = {};
  if(loadingInstance.close){loadingInstance.close()}
  store.commit('showModal',{
    title:'请求失败',
    text: error.response.statusText
  })
  return Promise.reject(error);
});
function setCookie(name,value,hours){
  hours = hours || 30*24
  var exp = new Date();
  exp.setTime(exp.getTime() + hours*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
Vue.prototype.$axios = axiosInstance;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$setCookie = setCookie;
export {axiosInstance as axios}
