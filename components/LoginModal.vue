<template>
  <div class="modal-overlay fixed inset-0 flex justify-center items-center">
    <div
      class="flex flex-col bg-white w-full md:w-7/12 h-full md:h-4/6 md:rounded-xl p-6 overflow-scroll"
    >
      <div class="flex justify-end">
        <button @click="closeModal">x</button>
      </div>
      <form @submit.prevent="login">
        <div>
          {{ error }}
        </div>
        <div>
          <label for="username">Username</label>
          <input type="text" name="username" id="username" v-model="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <button
          type="submit"
          value="submit"
          class="bg-blue-300 p-2 rounded-xl w-full text-white"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginModal',
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
      this.error = ''
    },
    closeModal: function () {
      this.clearInput()
      this.$store.dispatch('modal/closeLoginModal')
    },
    login: async function () {
      this.error = ''
      const user = {
        username: this.username,
        password: this.password,
      }
      const response = await this.$store.dispatch('user/login', user)
      if (!response.success) {
        this.error = response.message
        return
      }
      this.closeModal()
    },
  },
}
</script>
<style scoped>
.modal-overlay {
  background-color: #000000da;
}

label,
input {
  @apply block;
}

input {
  @apply border rounded-lg w-full p-2 mb-3 mt-1;
}
</style>
