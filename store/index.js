export const store = () => ({
  count: 0,
})

export const mutations = {
  increment: (state) => {
    state.count++
  },
}
