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
  login({ commit }, user) {
    commit('setUser', user)
    commit('setIsLoggedIn', true)
  },
  logout({ commit }) {
    commit('setUser', null)
    commit('setIsLoggedIn', false)
  },
}
