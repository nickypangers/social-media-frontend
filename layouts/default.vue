<template>
  <div>
    <div class="container">
      <navbar />
      <nuxt />
    </div>
    <register-modal v-show="showRegisterModal" />
  </div>
</template>
<script>
export default {
  computed: {
    showRegisterModal: function () {
      return this.$store.state.modal.showRegisterModal
    },
  },
}
</script>
