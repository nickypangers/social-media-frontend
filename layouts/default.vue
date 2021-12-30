<template>
  <div class="p-3 md:p-0">
    <div class="container">
      <navbar />
      <nuxt />
    </div>
    <register-modal v-if="showRegisterModal" />
    <login-modal v-if="showLoginModal" />
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
