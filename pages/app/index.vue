<template>
  <b-container>
    <b-jumbotron header="Your App" lead="MyMVP Scaffold App" >
      <p>Only authenticated users can see this</p>
      <p>Your User ID: {{ uid }}</p>
      <p>Your app will live here...</p>
    </b-jumbotron>
  </b-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    middleware: 'authenticated',
    computed: {
      ...mapGetters('modules/user', [
        'uid'
      ])
    }
    // mounted () {
    //   this.$nextTick(() => {
    //   })
    // }
  }
</script>