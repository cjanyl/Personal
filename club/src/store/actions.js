//Created by wangshuyi on 27/02/2018.

'use strict';

import axios from 'axios'
import VueCookies from 'vue-cookies';

export default {
  asyncIncrement({commit, state, getters}){
    commit('increment')
  },

  login({commit, state, getters}, user){
    return new Promise((resolve, reject) => {
      switch (user.type){
        case 'phone':
          axios.post(this._vm.$Dolphin.path.apiPath + '/login/loginByPhone', user).then(({data}) => {
            if(data.success){
              commit('saveUserInfo', data.data);
              if(user.autoLoginFlag){
                commit('saveToken', data.data['_id']);
              }
              resolve(data);
            }else{
              reject(data.message);
            }
          });
          break;
        default:
          axios.post(this._vm.$Dolphin.path.apiPath + '/login', user).then(({data}) => {
            if(data.success){
              commit('saveUserInfo', data.data);
              commit('saveToken', data.data['_id']);
              resolve(data);
            }else{
              reject(data.message);
            }
          });
      }
    });
  },

  refresh({commit, state, getters}){
    return new Promise((resolve, reject) => {
      axios.post(this._vm.$Dolphin.path.apiPath + '/system/auth/user/refresh', {}, {
        headers: {token: state.userInfo._id}
      }).then(({data}) => {
        if(data.success){
          commit('saveUserInfo', data.data);
          commit('saveToken', data.data['_id']);
          resolve(data);
        }else{
          reject(data.message);
        }
      });
    });
  },
  autoLoginByCookie({commit, state, getters}){
    return new Promise((resolve, reject) => {
      let cookieToken = VueCookies.get(state.cookieName);
      if(cookieToken){
        //自动登录
        axios({url:this._vm.$Dolphin.path.apiPath + `/login/autoLogin/${cookieToken}`}).then(reData => {
          if(reData.data && reData.data.data){
            commit('saveUserInfo', reData.data.data);
            commit('saveToken', reData.data.data._id);
            resolve();
          }else{
            reject();
          }
        });
      }else{
        reject();
      }
    });
  },
  logout({commit, state}){
    return new Promise((resolve, reject) => {
      commit('clearUserInfoAndToken');
      resolve();
    })
  },
  register({commit, state, getters}, data){
    return new Promise((resolve, reject) => {
      switch (data.type){
        case 'phone':
          axios.post(this._vm.$Dolphin.path.apiPath + '/login/registerByPhone', data).then(({data}) => {
            if(data.success){
              commit('saveUserInfo', data.data);
              commit('saveToken', data.data['_id']);
              resolve(data);
            }else{
              reject(data.message);
            }
          });
          break;
        default:
          axios.post(this._vm.$Dolphin.path.apiPath + '/login/register', data).then(({data}) => {
            if(data.success){
              commit('saveUserInfo', data.data);
              commit('saveToken', data.data['_id']);
              resolve(data);
            }else{
              reject(data.message);
            }
          }).catch(e => {
            reject(e);
          });
      }
    });
  },
}



