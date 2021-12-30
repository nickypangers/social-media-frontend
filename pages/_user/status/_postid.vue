<template>
  <div>
    <p>{{ post.content }}</p>
    <p>Comments: {{ comments.length }}</p>
    <div v-for="comment in comments" :key="comment._id">
      <p>{{ comment.username }} - {{ comment.comment }}</p>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    const postid = params.postid
    const response = await $axios.get(`/posts/${postid}`)
    const data = response.data
    if (!data.success) {
      console.debug('getPostDetail', data.message)
      return
    }
    const post = data.post
    return {
      postid,
      post,
    }
  },
  data() {
    return {}
  },
  computed: {
    comments: function () {
      return this.post.comments.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    },
  },
  async mounted() {
    this.post = await this.getPostDetail(this.postid)
  },
  methods: {
    getPostDetail: async function (postid) {
      const response = await this.$axios.get(`/posts/${postid}`)
      const data = response.data
      if (!data.success) {
        console.debug('getPostDetail', data.message)
        return
      }
      return data.post
    },
  },
}
</script>
