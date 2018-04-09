<template>
  <b-container>
    <b-row>
      <b-col md="6" offset-md="3" lg="4" offset-lg="4">
        <b-card header="Profile" header-tag="header">
          <edit-profile-form></edit-profile-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import EditProfileForm from '~/components/settings/EditProfileForm'
  
  export default {
    middleware: 'authenticated',
    components: {
      EditProfileForm
    }
  }
</script>