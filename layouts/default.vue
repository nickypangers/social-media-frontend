<template>
  <div>
    <div class="container">
      <navbar />
      <nuxt />
    </div>
    <register-modal v-show="showRegisterModal" />
    <login-modal v-show="showLoginModal" />
  </div>
</template>
<script>
export default {
  computed: {
    showRegisterModal: function () {
      return this.$store.state.modal.showRegisterModal
    },
    showLoginModal: function () {
      return this.$store.state.modal.showLoginModal
    },
  },
}
</script>
