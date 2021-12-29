export const state = () => ({
  user: null,
  isLoggedIn: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setIsLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
}

export const actions = {
  async login({ commit }, user) {
    const response = await this.$axios.$post('/users/login', user)
    if (!response.success) {
      return response
    }
    commit('setUser', user)
    commit('setIsLoggedIn', true)
    return { success: true }
  },
  logout({ commit }) {
    commit('setUser', null)
    commit('setIsLoggedIn', false)
  },
}
