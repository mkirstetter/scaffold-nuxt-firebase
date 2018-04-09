<template>
  <b-button variant="primary"
            @click="signIn"
            :class="{ 'btn-loading': loading }"
            :disabled="loading"
            block>
    <i class="fa fa-facebook"></i> Facebook
  </b-button>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import firebase from 'firebase'
  import firebaseApp from '~/firebase/app'

  export default {
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapGetters('modules/user', [ 'uid' ])
    },
    methods: {
      ...mapActions('modules/alert', [ 'showAlert' ]),
      async signIn () {
        this.loading = true
        const provider = new firebase.auth.FacebookAuthProvider()
        await this.signInWithPopup(provider)
        this.loading = false
      },
      async signInWithPopup (provider) {
        let self = this
        await firebaseApp.auth().signInWithPopup(provider).then(function (result) {
          self.setProfile(result.user.uid, result.user.email)
        }).catch(function (error) {
          console.log(error)
          self.showAlert({
            type: 'danger',
            text: error.message
          })
        })
      },
      async setProfile (userId, email) {
        return firebaseApp.database().ref(`users/${userId}`).set({
          email: email
        })
      }
    }
  }
</script>