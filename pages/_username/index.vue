<template>
  <div>
    <div>
      <p>
        {{ user?.username || 'User not found' }}
      </p>
      <p v-if="success">Posts: {{ user?.posts?.length }}</p>
    </div>
    <div class="grid grid-cols-1 gap-3">
      <post-teaser v-for="post in userPosts" :key="post._id" :post="post" />
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    const { username } = params
    console.log(username)
    const response = await $axios.$get(`/users/${username}`)
    console.log(response)
    const { success, user, message } = response
    return { user, success, message }
  },
  computed: {
    userPosts() {
      return this.user?.posts || []
    },
  },
}
</script>
