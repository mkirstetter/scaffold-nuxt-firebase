export default function ({ store, redirect }) {
  console.log('[AUTHENTICATED] - middleware')

  if (!store.getters['modules/user/isAuthenticated']) {
    console.log('User is not authenticated redirecting to signin')
    store.dispatch('modules/alert/showAlert', {
      type: 'danger',
      text: 'Oops, you need to log in to access this page'
    })
    return redirect('/auth/signin')
  }
}
