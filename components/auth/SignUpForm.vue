<template>
  <div>
    <b-row>
      <b-col md="6 mb-2">
        <google-sign-in></google-sign-in>
      </b-col>
      <b-col md="6 mb-2">
        <facebook-sign-in></facebook-sign-in>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <form @submit.prevent="signUp" :class="{ 'control': true }">
          <b-form-group id="inputGroupEmail"
                        label="Email address"
                        label-for="email"
                        :class="{'text-danger': errors.has('email') }">
            <b-form-input id="email"
                          name="email"
                          type="email"
                          v-model="email"
                          placeholder="Enter email"
                          v-validate="'required'"
                          data-vv-delay="500"
                          :class="{'input': true, 'is-invalid': errors.has('email') }"
                          :disabled="loading">
            </b-form-input>
            <b-form-invalid-feedback v-if="errors.has('email')">
              {{ errors.first('email') }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="inputGroupPassword"
                        label="Password"
                        label-for="password"
                        :class="{'text-danger': errors.has('password') }">
            <b-form-input id="password"
                          name="password"
                          type="password"
                          v-model="password"
                          placeholder="Enter password"
                          v-validate="'required|confirmed:confirmPassword'"
                          data-vv-delay="500"
                          :class="{'input': true, 'is-invalid': errors.has('password') }"
                          :disabled="loading">
            </b-form-input>
            <b-form-invalid-feedback v-if="errors.has('password')">
              {{ errors.first('password') }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="inputGroupPasswordConfirmation"
                        label="Confirm Password"
                        label-for="confirmPassword"
                        :class="{'text-danger': errors.has('password') }">
            <b-form-input id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          v-model="passwordConfirmation"
                          placeholder="Enter password confirmation"
                          v-validate="'required'"
                          data-vv-delay="500"
                          :class="{'input': true, 'is-invalid': errors.has('password') }"
                          :disabled="loading">
            </b-form-input>
          </b-form-group>
          <b-button :class="{ 'btn-loading': loading }"
                    :disabled="loading"
                    type="submit">
            <i class="fa fa-unlock-alt"></i> Sign Up
          </b-button>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import firebaseApp from '~/firebase/app'
  import FacebookSignIn from './Facebook'
  import GoogleSignIn from './Google'

  export default {
    data () {
      return {
        loading: false,
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    },
    computed: {
      ...mapGetters('modules/user', [ 'uid' ])
    },
    mounted () {
    },
    methods: {
      ...mapActions('modules/alert', [ 'showAlert' ]),
      signUp () {
        this.$validator.validateAll().then(valid => {
          if (!valid) {
            return false
          }
          this.register()
        })
      },
      async register () {
        this.loading = true
        try {
          const firebaseUser = await firebaseApp.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
          await this.setProfile(firebaseUser.uid, firebaseUser.email)
          this.$router.push('/app')
          this.showAlert({
            type: 'success',
            text: 'Success, you\'ve signed up'
          })
        } catch (error) {
          console.log(error.message)
          this.showAlert({
            type: 'danger',
            text: error.message
          })
        }
        this.loading = false
      },
      async setProfile (userId, email) {
        return firebaseApp.database().ref(`users/${userId}`).set({
          email: email
        })
      }
    },
    watch: {
      'uid': function (val) {
        if (val) {
          this.$router.push('/app')
          this.showAlert({
            type: 'success',
            text: 'You\'re logged in'
          })
        }
      }
    },
    components: {
      FacebookSignIn,
      GoogleSignIn
    }
  }
</script>