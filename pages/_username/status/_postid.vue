<template>
  <div>
    <p>{{ post.content }}</p>
    <p>Comments: {{ comments.length }}</p>
    <div v-for="comment in comments" :key="comment._id">
      <p>
        <nuxt-link :to="`/${comment.username}/`">{{
          comment.username
        }}</nuxt-link>
        - {{ comment.comment }} @
        {{ stringToDate(comment.created_at) }}
      </p>
    </div>
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
  async asyncData({ params, store }) {
    const postid = params.postid
    await store.dispatch('posts/getCurrentPost', postid)
  },
  data() {
    return {
      comment: '',
    }
  },
  computed: {
    post: function () {
      return this.$store.state.posts.currentPost
    },
    comments: function () {
      let comments = [...this.post.comments]
      return comments.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
      // return []
    },
    isLoggedIn: function () {
      return this.$store.state.user.isLoggedIn
    },
  },
  methods: {
    stringToDate: function (str) {
      return new Date(str)
    },
    getPostDetail: async function (postid) {
      const response = await this.$axios.get(`/posts/${postid}`)
      const data = response.data
      if (!data.success) {
        console.debug('getPostDetail', data.message)
        return
      }
      return data.post
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
      this.$store.dispatch('posts/getCurrentPost', this.post._id)
      this.comment = ''
    },
  },
}
</script>
