export const state = () => ({
  alert: {
    type: '', // success, warning, danger, info
    text: '',
    show: false
  }
})

export const getters = {
  alert (state) {
    return state.alert
  }
}

export const actions = {
  showAlert ({commit}, alert) {
    commit('showAlert', alert)
    if (alert.show) {
      setTimeout(() => {
        commit('resetAlert')
      }, 3000)
    }
  },
  resetAlert ({commit}) {
    commit('resetAlert')
  }
}

export const mutations = {
  showAlert (state, alert) {
    alert.show = true
    state.alert = alert
  },
  resetAlert (state) {
    state.alert = {
      type: '',
      text: '',
      show: false
    }
  }
}
