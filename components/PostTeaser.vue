<template>
  <div class="rounded-xl border p-3 cursor-pointer" @click.stop="goToPost">
    <div class="flex justify-between items-center">
      <p>{{ post._id }}</p>
      <button v-if="isPostOwner" @click.stop="removePost">x</button>
    </div>
    <p>{{ post.username }}</p>
    <p class="text-lg">{{ post.content }}</p>
    <p>{{ post.created_at }}</p>
    <button @click="toggleCommentBox()">
      <p>comments: {{ post.comments.length }}</p>
    </button>
  </div>
</template>
<script>
export default {
  name: 'PostTeaser',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCommentBoxOpen: false,
      comment: '',
    }
  },
  computed: {
    user: function () {
      return this.$store.state.user.user
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
    isPostOwner: function () {
      return this.user && this.user.username === this.post.username
    },
  },
  methods: {
    goToPost: function () {
      this.$router.push(`/${this.post.username}/status/${this.post._id}`)
    },
    toggleCommentBox: function () {
      this.isCommentBoxOpen = !this.isCommentBoxOpen
    },
    removePost: async function () {
      if (!this.isLoggedIn) {
        console.log('not logged in')
        return
      }
      const response = await this.$axios.delete(`/posts/${this.post._id}`, {
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
