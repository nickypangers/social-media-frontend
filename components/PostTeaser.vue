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
    <form
      @submit.prevent="addComment()"
      class="flex items-center"
      v-if="isLoggedIn"
    >
      <input
        type="text"
        v-model="comment"
        placeholder="enter comment here"
        class="w-full mr-3"
      />
      <button type="submit" value="Submit">send</button>
    </form>
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
    addComment: async function () {
      if (!this.isLoggedIn) {
        console.log('not logged in')
        return
      }
      const response = await this.$axios.post(
        `/posts/${this.post._id}/comments/add`,
        {
          username: this.$store.state.user.user.username,
          comment: this.comment,
        }
      )
      const data = response.data
      if (!data.success) {
        console.debug('addComment', data.message)
        return
      }
      // this.post.comments.push(data.comment)
      this.$store.dispatch('posts/getPost', this.post._id)
      this.comment = ''
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
