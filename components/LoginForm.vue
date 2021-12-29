<template>
  <form @submit.prevent="login">
    <p>{{ error }}</p>
    <label for="username">Username</label>
    <input type="text" name="username" id="username" v-model="username" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="password" />
    <button type="submit" value="Submit">Submit</button>
  </form>
</template>
<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    clearInput: function () {
      this.username = ''
      this.password = ''
    },
    login: async function () {
      this.error = ''
      const response = await this.$store.dispatch('user/login', {
        username: this.username,
        password: this.password,
      })
      if (!response.success) {
        this.error = response.message
        return
      }
      this.clearInput()
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
label,
input {
  @apply block;
}

input {
  @apply border p-2 mb-3 mt-1;
}
</style>
