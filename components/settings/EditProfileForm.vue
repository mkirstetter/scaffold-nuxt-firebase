<template>
  <div>
    <b-row>
      <b-col>
        <form @submit.prevent="updateProfile" :class="{ 'control': true }">
          <b-form-group id="inputFirstName"
                        label="First Name"
                        label-for="firstName">
            <b-form-input id="firstName"
                          name="firstName"
                          type="text"
                          v-model="firstName"
                          placeholder="Enter First Name"
                          :disabled="loading">
            </b-form-input>
          </b-form-group>
          <b-form-group id="inputGroupLastName"
                        label="Last Name"
                        label-for="lastName">
            <b-form-input id="lastName"
                          name="lastName"
                          type="text"
                          v-model="lastName"
                          placeholder="Enter Last Name"
                          :disabled="loading">
            </b-form-input>
          </b-form-group>
          <b-form-group id="inputGroupCompany"
                        label="Company"
                        label-for="company">
            <b-form-input id="company"
                          name="company"
                          type="text"
                          v-model="company"
                          placeholder="Enter company"
                          :disabled="loading">
            </b-form-input>
          </b-form-group>
          <b-button :class="{ 'btn-loading': loading }"
                    :disabled="loading"
                    type="submit">
            <i class="fa fa-unlock-alt"></i> Update Profile
          </b-button>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import firebaseApp from '~/firebase/app'

  export default {
    data () {
      return {
        loading: false,
        firstName: '',
        lastName: '',
        company: ''
      }
    },
    computed: {
      ...mapGetters('modules/user', [ 'uid', 'profile' ])
    },
    mounted () {
      this.$nextTick(() => {
        this.firstName = this.profile.firstName ? this.profile.firstName : ''
        this.lastName = this.profile.lastName ? this.profile.lastName : ''
        this.company = this.profile.company ? this.profile.company : ''
      })
    },
    methods: {
      ...mapActions('modules/alert', [ 'showAlert' ]),
      ...mapActions('modules/user', [ 'saveProfile' ]),
      async updateProfile () {
        this.$validator.validateAll().then(valid => {
          if (!valid) {
            return false
          }
          this.loading = true
          this.setProfile()
          this.showAlert({
            type: 'success',
            text: 'Success, profile updated'
          })
        })
      },
      async setProfile () {
        await firebaseApp.database().ref(`users/${this.uid}`).set({
          firstName: this.firstName,
          lastName: this.lastName,
          company: this.company
        }).then((snapshot) => {
          this.saveProfile(this.uid)
          this.showAlert({
            type: 'success',
            text: 'Success, profile updated'
          })
        }).catch(error => {
          console.log(error.message)
          this.showAlert({
            type: 'danger',
            text: error.message
          })
        })
        this.loading = false
      }
    }
  }
</script>