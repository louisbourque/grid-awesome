// actions are functions that causes side effects and can involve
// asynchronous operations.

export const action = ({ commit, state }, payload) => {
  if (state.val) {
    commit('mutation', payload)
  }
}
