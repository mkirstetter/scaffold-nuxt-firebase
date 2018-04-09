import firebaseApp from '~/firebase/app'

export const state = () => ({
  uid: null,
  profile: null
})

export const getters = {

  uid (state) {
    return state.uid
  },

  profile (state) {
    return state.profile
  },

  isAuthenticated (state) {
    return !!state.uid
  }
}

export const actions = {

  async logout ({dispatch}) {
    await firebaseApp.auth().signOut()

    await dispatch('saveUID', null)
    await dispatch('saveProfile', null)

    await dispatch('modules/alert/showAlert', {
      type: 'success',
      text: 'Success, you\'re logged out'
    }, { root: true })

    this.$router.push('/')
  },

  async saveUID ({commit}, uid) {
    await commit('saveUID', uid)
  },

  async saveProfile ({commit}, uid) {
    if (!uid) {
      commit('saveProfile', null)
    } else {
      await firebaseApp.database().ref('users')
        .child(uid)
        .once('value')
        .then((snapshot) => {
          const profile = snapshot.val()
          commit('saveProfile', profile)
        })
    }
  }

}

export const mutations = {
  saveUID (state, uid) {
    state.uid = uid
  },
  saveProfile (state, profile) {
    state.profile = profile
  }
}
