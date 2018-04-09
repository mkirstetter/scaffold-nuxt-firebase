<template>
  <b-container>
    <b-row>
      <b-col md="4" offset-md="4">
        <b-card header="Sign In" header-tag="header">
          <sign-in-form></sign-in-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import SignInForm from '~/components/auth/SignInForm'

  export default {
    computed: {
      ...mapGetters('modules/user', [ 'uid' ])
    },
    methods: {
      ...mapActions('modules/alert', [ 'showAlert' ])
    },
    watch: {
      'uid': function (val) {
        if (val) {
          this.$router.push('/app')
          this.showAlert({
            type: 'success',
            text: 'You\'re now logged in'
          })
        }
      }
    },
    components: {
      SignInForm
    }
  }
</script>