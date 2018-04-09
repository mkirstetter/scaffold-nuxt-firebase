<template>
  <b-container>
    <b-row>
      <b-col md="6" offset-md="3" lg="4" offset-lg="4">
        <b-card header="Sign Up" header-tag="header">
          <sign-up-form></sign-up-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import SignUpForm from '~/components/auth/SignUpForm'

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
      SignUpForm
    }
  }
</script>