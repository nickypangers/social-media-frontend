<template>
  <div>
    <input
      type="text"
      placeholder="what are you thinking..."
      class="w-full p-2"
      v-model="content"
    />
    <div class="flex justify-end">
      <button @click="addPost">Send</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CreatePostArea',
  data() {
    return {
      content: '',
    }
  },
  methods: {
    addPost: async function () {
      if (!this.$store.state.user.isLoggedIn) {
        console.log('not logged in')
        return
      }
      const response = await this.$axios.post('/posts/create', {
        username: this.$store.state.user.user.username,
        content: this.content,
      })
      const data = response.data
      if (!data.success) {
        console.debug('addPost', data.message)
        return
      }
      this.$store.dispatch('posts/fetchPosts')
      this.content = ''
    },
  },
}
</script>
