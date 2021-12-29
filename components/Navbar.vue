<template>
  <div class="flex justify-between">
    <nuxt-link to="/">Home</nuxt-link>
    <div v-if="!isLoggedIn" class="flex">
      <!-- <nuxt-link to="/login">Login</nuxt-link> -->
      <!-- <nuxt-link to="/register">Register</nuxt-link> -->
      <button @click="openLoginModal">Login</button>
      <button @click="openRegisterModal">Register</button>
    </div>
    <div v-if="isLoggedIn" class="flex">
      <p>{{ user.username }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  computed: {
    user: function () {
      return this.$store.state.user.user
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
  },
  methods: {
    openLoginModal: function () {
      this.$store.dispatch('modal/openLoginModal')
    },
    openRegisterModal: function () {
      this.$store.dispatch('modal/openRegisterModal')
    },
    logout: function () {
      this.$store.dispatch('user/logout')
    },
  },
}
</script>
