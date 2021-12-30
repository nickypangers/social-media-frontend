<template>
  <div>
    <p>{{ this.user }}</p>
  </div>
</template>
<script>
export default {
  async asyncData({ params }) {
    const user = params.user
    return {
      user,
    }
  },
  methods: {},
}
</script>
