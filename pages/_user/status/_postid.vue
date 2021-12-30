<template>
  <div>
    <p>
      {{ this.post }}
    </p>
  </div>
</template>
<script>
export default {
  async asyncData({ params }) {
    const postid = params.postid
    return {
      postid,
    }
  },
  data() {
    return {
      post: {},
    }
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
