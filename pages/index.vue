<template>
  <div>
    <p>{{ user }}</p>
    <button @click="login">Login</button>
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
  methods: {
    login() {
      this.$store.dispatch('user/login', 'hi')
    },
  },
}
</script>
