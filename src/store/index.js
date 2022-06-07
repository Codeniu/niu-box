import { createStore } from 'vuex'
import { login } from '@/apis/user'
import { message } from 'ant-design-vue'

export default createStore({
  state: {
    name: '',
    apptoken: '',
  },

  mutations: {
    changeName(state, name) {
      state.name = name
    },

    changeToken(state, data) {
      state.apptoken = data
    },
  },

  actions: {
    changeName() {
      this.commit('changeName', 11)
    },

    login(store, formState) {
      return new Promise((resolve, reject) => {
        login(formState).then(res => {
          if (res.code === '000001') {
            localStorage.setItem('token', res.data)
            localStorage.setItem('token_exp', new Date().getTime())
            this.commit('changeToken', res.data)
            this.commit('changeName', formState.name)
            resolve(res.data)
          } else {
            message.error(res.msg)
            reject()
          }
        })
      })
    },
  },

  modules: {},
})
