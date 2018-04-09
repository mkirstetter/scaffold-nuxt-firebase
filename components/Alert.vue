<template>
  <transition name="fade" mode="out-in">
    <div v-show="alert.show" id="floating_alert" class="alert alert-dismissible" :class="alertType">
      <button type="button" class="close" @click="resetAlert">
        <span aria-hidden="true">&times;</span>
      </button>
      <span class="fa fa-4x pull-left" :class="alertTypeIcon"></span>
      <p>{{ alert.text }}</p>
    </div>
  </transition>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('modules/alert', [ 'alert' ]),
      alertType: function () {
        return {
          'alert-success': this.alert.type === 'success',
          'alert-info': this.alert.type === 'info',
          'alert-warning': this.alert.type === 'warning',
          'alert-danger': this.alert.type === 'danger'
        }
      },
      alertTypeIcon: function () {
        return {
          'fa-check-circle-o': this.alert.type === 'success',
          'fa-info-circle': this.alert.type === 'info',
          'fa-exclamation-triangle': this.alert.type === 'warning',
          'fa-exclamation-circle': this.alert.type === 'danger'
        }
      }
    },
    methods: {
      ...mapActions('modules/alert', [ 'resetAlert' ])
    },
    watch: {
      'alert.show': function (val) {
        if (val === true) {
          setTimeout(() => {
            this.resetAlert()
          }, 3000)
        }
      }
    }
  }
</script>

<style lang="scss">
  #floating_alert {
    position: fixed;
    bottom: 20px;
    right: 40px;
    width: 400px;
    z-index: 5000;
  }
</style>
