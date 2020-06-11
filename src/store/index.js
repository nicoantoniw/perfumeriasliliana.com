import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

import router from '../router/index';
import errorAlertHandler from '../util/error';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alert: false,
    alertType: null,
    alertMessage: null,
    token: null,
    userId: null,
    groupId: null,
    email: null,
    loader1: false,
    role: null,
    cartItems: 0,
    clientId: null
  },
  mutations: {
    setUser(state, data) {
      state.token = data.token;
      state.userId = data.userId;
      state.groupId = data.groupId;
      state.email = data.email;
      state.clientId = data.clientId;
      state.role = data.role;
    },
    clearUser(state) {
      state.token = null;
      state.userId = null;
      state.email = null;
      state.clientId = null;
      state.role = null;
    },
    setAlert(state, payload) {
      state.alert = payload.status;
      state.alertType = payload.type;
      state.alertMessage = payload.text;
    },
    clearAlert(state) {
      state.alert = false;
      state.alertType = null;
      state.alertMessage = null;
    },
    setLoader(state) {
      state.loader1 = true;
    },
    clearLoader(state) {
      state.loader1 = false;
    },
    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    }
  },
  actions: {
    autoLogout({ dispatch }) {
      setTimeout(() => {
        dispatch('logout');
      }, 36000000);
    },
    async login({ dispatch, commit }, data) {
      try {
        commit('setLoader');
        const response = await axios.post("/auth/website-login", data);
        if (response.data.role) {
          commit('setUser', {
            token: response.data.token,
            userId: response.data.userId,
            groupId: response.data.groupId,
            email: response.data.email,
            role: response.data.role
          });
          localStorage.setItem('role', response.data.role);
        }
        else {
          commit('setUser', {
            token: response.data.token,
            userId: response.data.userId,
            groupId: response.data.groupId,
            email: response.data.email,
            clientId: response.data.clientId
          });
        }
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('groupId', response.data.groupId);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('clientId', response.data.clientId);

        dispatch('autoLogout');
        commit('clearLoader');
      } catch (err) {
        commit('clearLoader');
        errorAlertHandler(err, 'Usuario no encontrado');
      }
    },
    autoLogin({ commit }) {
      const email = localStorage.getItem('email');
      const userId = localStorage.getItem('userId');
      const groupId = localStorage.getItem('groupId');
      const token = localStorage.getItem('token');
      const clientId = localStorage.getItem('clientId');
      let role;
      if (!token) {
        return;
      }
      if (localStorage.getItem('role')) {
        role = localStorage.getItem('role');
        commit('setUser', {
          email,
          userId,
          groupId,
          token,
          role,
          clientId,
        });
      } else {
        commit('setUser', {
          email,
          userId,
          groupId,
          token,
          clientId
        });
      }

    }
    ,
    logout({ commit }) {
      commit('clearUser');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('groupId');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('clientId');
      // window.location.reload();
    },
    showAlert({ commit }, payload) {
      if (this.state.alert) {
        commit('clearAlert');
      }
      commit('setAlert', { status: payload.status, type: payload.type, text: payload.text });
      setTimeout(() => {
        commit('clearAlert');
      }, 3000);
    },
    showLongerAlert({ commit }, payload) {
      if (this.state.alert) {
        commit('clearAlert');
      }
      commit('setAlert', { status: payload.status, type: payload.type, text: payload.text });
      setTimeout(() => {
        commit('clearAlert');
      }, 5000);
    },
    cart({ commit }, cartItems) {
      commit('setCartItems', cartItems);
    }
  },
  modules: {
  }
});
