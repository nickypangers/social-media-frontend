<template>
  <div class="rounded-xl border p-3">
    <p>{{ post._id }}</p>
    <p>{{ post.username }}</p>
    <p class="text-lg">{{ post.title }}</p>
    <p>{{ post.description }}</p>
    <p>{{ post.createdAt }}</p>
    <button @click="toggleCommentBox()">
      <p>comments: {{ post.comments.length }}</p>
    </button>
    <form>
      <input type="text" v-model="comment" placeholder="enter comment here" />
      <button @click="addComment()">send</button>
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
    addComment: function () {},
  },
}
</script>
