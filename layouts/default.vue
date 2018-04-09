<template>
  <div>
    <b-navbar toggleable="md" type="faded" variant="light" class="navbar-light mb-4">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand nuxt to="/">MyMVP</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item nuxt to="/">Home (public)</b-nav-item>
            <b-nav-item nuxt to="/app">Dashboard (protected)</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav v-if="!uid">
              <b-nav-item nuxt to="/auth/signin">Sign In</b-nav-item>
              <b-nav-item nuxt to="/auth/signup">Sign Up</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-else>
              <b-nav-item-dropdown right>
                <template slot="button-content">
                  <em>My Account</em>
                </template>
                <b-dropdown-item nuxt to="/settings/profile">Profile</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="signout">Sign out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <content>
      <nuxt />
    </content>

    <footer></footer>

    <app-alert></app-alert>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AppAlert from '~/components/Alert'

  export default {
    computed: {
      ...mapGetters('modules/user', [ 'uid', 'profile' ])
    },
    methods: {
      ...mapActions('modules/user', [ 'logout' ]),
      ...mapActions('modules/alert', [ 'resetAlert', 'showAlert' ]),
      signout () {
        this.logout().then(() => {
          this.showAlert({
            type: 'success',
            text: 'Success, you\'re logged out'
          })
        }).catch((error) => {
          console.log(error.message)
        })
      }
    },
    components: {
      AppAlert
    }
  }
</script>