//Created by wangshuyi on 27/02/2018.

'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    token: null,
    loading: false,
    cookieName: 'basf_order_back',
    menuStyle: 'topLeft', //topLeft | indexMenu
    windowSize: null,
    adminFlag: false,

    socket: {
      roomName: '',
    },
  },
  mutations: mutations,
  actions: actions,

  modules: {},
})
