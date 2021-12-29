export const state = () => ({
  showRegisterModal: false,
  showLoginModal: false,
})

export const mutations = {
  setShowRegisterModal(state, showRegisterModal) {
    state.showRegisterModal = showRegisterModal
  },
  setShowLoginModal(state, showLoginModal) {
    state.showLoginModal = showLoginModal
  },
}

export const actions = {
  openRegisterModal({ commit }) {
    commit('setShowRegisterModal', true)
  },
  closeRegisterModal({ commit }) {
    commit('setShowRegisterModal', false)
  },
  openLoginModal({ commit }) {
    commit('setShowLoginModal', true)
  },
  closeLoginModal({ commit }) {
    commit('setShowLoginModal', false)
  },
}
