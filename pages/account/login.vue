<template>
  <div>

          <LoginForm />
     
  </div>
</template>

<script>
import LoginForm from '~/components/account/LoginForm.vue'
import { mapState } from 'vuex'

export default {
  layout: 'login',
  components: {
    LoginForm
  },
  watch: {
    // firebase is sometimes slow so we need to account for
    // the user getting authenticated late in the game...
    user (to, from) {
      this.$router.push('/account/dashboard')
    }
  },
  computed: mapState([
    'user'
  ])
}
</script>
<style>


</style>
