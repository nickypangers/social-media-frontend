export const state = () => ({
  posts: [],
})

export const getters = {
  getPosts: (state) => {
    const posts = [...state.posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    return posts
  },
}

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setPost(state, post) {
    const index = state.posts.findIndex((p) => p._id === post._id)
    if (index == -1) {
      return
    }

    for (const [key, value] of Object.entries(post)) {
      state.posts[index][key] = value
    }
  },
}

export const actions = {
  async fetchPosts({ commit }) {
    const response = await this.$axios.get('/posts')
    const data = response.data
    if (!data.success) {
      console.debug('fetchPost', data.message)
      return
    }
    commit('setPosts', data.posts)
  },
  async getPost({ commit }, id) {
    const response = await this.$axios.get(`/posts/${id}`)
    const data = response.data
    if (!data.success) {
      console.debug('getPost', data.message)
      return
    }
    commit('setPost', data.post)
  },
}
