<template>
  <div class="rounded-xl border">
    <div class="p-3 cursor-pointer" @click="goToPost">
      <div class="flex justify-between items-center">
        <p>{{ post._id }}</p>
        <button v-if="isPostOwner" @click.stop="removePost" class="p-3 border">
          x
        </button>
      </div>
      <p>{{ post.username }}</p>
      <p class="text-lg">{{ post.content }}</p>
      <p>{{ post.created_at }}</p>
    </div>
    <div class="p-3 pt-0 grid grid-cols-3">
      <button>
        <font-awesome-icon :icon="['far', 'comment']" size="2x" />
      </button>
      <div class="text-center">
        <button v-if="!isUserLiked" @click="isUserLiked = true">
          <font-awesome-icon :icon="['far', 'heart']" size="2x" />
        </button>
        <button v-if="isUserLiked" @click="isUserLiked = false">
          <font-awesome-icon :icon="['fas', 'heart']" size="2x" />
        </button>
      </div>
      <button>
        <font-awesome-icon :icon="['fas', 'share']" size="2x" />
      </button>
    </div>
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
  emits: ['removePost'],
  data() {
    return {
      isCommentBoxOpen: false,
      comment: '',
      isUserLiked: false,
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
    // isUserLiked: function () {
    //   if (!this.user) {
    //     return false
    //   }
    //   const index = this.user.liked.indexOf(this.post._id)
    //   return index === -1 ? false : true
    // },
  },
  methods: {
    goToPost: function () {
      this.$router.push(`/${this.post.username}/status/${this.post._id}`)
    },
    toggleCommentBox: function () {
      this.isCommentBoxOpen = !this.isCommentBoxOpen
    },
    removePost: function () {
      this.$emit('removePost', this.post)
    },
  },
}
</script>
