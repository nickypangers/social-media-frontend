<template>
  <div>
    <div>
      <create-post-area v-if="isLoggedIn" />
    </div>
    <div class="grid grid-cols-1 gap-3">
      <post-teaser
        v-for="post in posts"
        :key="post._id"
        :post="post"
        @removePost="removePost"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    posts() {
      return this.$store.getters['posts/getPosts']
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn
    },
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    fetchPosts: function () {
      this.$store.dispatch('posts/fetchPosts')
    },
    printPost: function (post) {
      console.log(post)
    },
    removePost: async function (post) {
      console.log('remove post')
      if (!this.isLoggedIn) {
        console.log('not logged in')
        return
      }
      const response = await this.$axios.delete(`/posts/${post._id}`, {
        username: this.user.username,
      })
      const data = response.data
      if (!data.success) {
        console.debug('removePost', data.message)
        return
      }
      this.$store.dispatch('posts/fetchPosts')
    },
  },
}
</script>
