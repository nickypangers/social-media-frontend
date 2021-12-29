<template>
  <div class="grid grid-cols-1 gap-3">
    <post-teaser v-for="post in posts" :key="post._id" :post="post" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      posts: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    fetchPosts: async function () {
      const response = await this.$axios.get('/posts')
      const data = response.data
      if (!data.success) {
        console.debug('fetchPost', data.message)
        return
      }
      this.posts = data.posts
    },
  },
}
</script>
