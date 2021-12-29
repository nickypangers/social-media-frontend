<template>
  <form @submit.prevent="register">
    <label for="username">Username</label>
    <input type="text" name="username" id="username" v-model="username" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="password" />
    <label for="email">Email</label>
    <input type="text" name="email" id="email" v-model="email" />
    <button type="submit" value="Submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      email: '',
    }
  },
  methods: {
    clearInput: function () {
      this.username = ''
      this.password = ''
      this.email = ''
    },
    register: async function () {
      const user = {
        username: this.username,
        password: this.password,
        email: this.email,
      }
      const response = await this.$axios.post('/users/register', user)
      const data = response.data
      if (!data.success) {
        console.log('failed to register')
        return
      }
      this.clearInput()
      const success = await this.$store.dispatch('user/login', user)
      if (!success) {
        console.log('failed to login')
        return
      }
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
