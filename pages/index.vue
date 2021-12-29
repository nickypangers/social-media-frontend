<template>
  <div>
    <p>user: {{ user }}</p>
    <p>isLoggedIn: {{ $store.state.user.isLoggedIn }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
}
</script>
