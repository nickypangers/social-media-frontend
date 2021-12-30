<template>
  <div>
    <div>
      <create-post-area />
    </div>
    <div class="grid grid-cols-1 gap-3">
      <post-teaser v-for="post in posts" :key="post._id" :post="post" />
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
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    fetchPosts: function () {
      this.$store.dispatch('posts/fetchPosts')
    },
  },
}
</script>
