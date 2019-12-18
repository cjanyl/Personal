//Created by wangshuyi on 27/02/2018.

'use strict';
import VueCookies from 'vue-cookies';

export default {
  increment(state) {
    state.count++;
    sessionStorage.setItem(state.cookieName, JSON.stringify(state));
  },
  init(state) {
    if (sessionStorage.getItem(state.cookieName)) {
      let session = JSON.parse(sessionStorage.getItem(state.cookieName)), key;
      for (key in session) {
        if(key !== 'loading'){
          state[key] = session[key];
        }
      }
    }
  },
  session(state) {
    sessionStorage.setItem(state.cookieName, JSON.stringify(state));
  },

  clearUserInfoAndToken(state) {
    state.userInfo = null;
    state.token = null;
    VueCookies.remove(state.cookieName, '/');
    this.commit('session');
  },
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    if(userInfo.role && userInfo.role.find(r => r._id === 'admin')){
      state.adminFlag = true;
    }else{
      state.adminFlag = false;
    }
    this.commit('session');
  },
  saveToken(state, token) {
    state.token = token;
    VueCookies.set(state.cookieName, token, 60 * 60 * 24 * 7, '/');
    this.commit('session');
  },
  setLoading(state, flag) {
    state.loading = flag;
    this.commit('session');
  },
  initWindowSize(state, size) {
    state.windowWidth = size.width;
    state.windowHeight = size.height;
    this.commit('session');
  },
}
