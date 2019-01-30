<template>
   
    <div class="account" v-if="account">
   
        <EditAccountForm />
      
   <button type="button" class="btn btn-danger" v-on:click="signOut">Sign Out</button> 
    </div>

</template>

<script>
import { mapState } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'

export default {
  // middleware: 'authenticated', // checking if auth'd with firebase kinda sucks as the middleware is triggered before firebase is ready
  components: {
    EditAccountForm
  },
    middleware: 'anonymous',

  computed: {
    ...mapState([
      'user',
      'account'
    ]),
    imageAlt () {
      return `Profile image for ${this.account.displayName}`
    }
  },
  data () {
    return {
      editing: true
    }
  },
  methods: {
    toggleEditForm () {
      this.editing = !this.editing
    },
    signOut () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
};
</script>

<style lang="sass" scoped>
.account
  width: 95%
  margin: 0 auto
  display: block

 
 
</style>
