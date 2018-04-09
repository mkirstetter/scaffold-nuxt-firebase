import firebaseApp from '~/firebase/app.js'

export default function ({store}) {
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('modules/user/saveProfile', user.uid)
      store.commit('modules/user/saveUID', user.uid)
    }
  })
}
