<template>
  <div class="rounded-xl border p-3">
    <nuxt-link :to="`/${post.username}/status/${post._id}`">
      <p>{{ post._id }}</p>
      <p>{{ post.username }}</p>
      <p class="text-lg">{{ post.content }}</p>
      <p>{{ post.createdAt }}</p>
      <button @click="toggleCommentBox()">
        <p>comments: {{ post.comments.length }}</p>
      </button>
    </nuxt-link>
    <form @submit.prevent="addComment()" class="flex items-center">
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
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
  },
  methods: {
    toggleCommentBox: function () {
      this.isCommentBoxOpen = !this.isCommentBoxOpen
    },
    addComment: async function () {
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
  },
}
</script>
