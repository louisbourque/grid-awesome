// actions are functions that causes side effects and can involve
// asynchronous operations.

export const action = ({ commit, state }, payload) => {
  if (state.val) {
    commit('mutation', payload)
  }
}

export const addItem = ({ commit, state }) => {
  commit('addItem')
}

export const addRow = ({ commit, state }) => {
  commit('addRow')
}

export const removeRow = ({ commit, state }, payload) => {
  commit('removeRow', payload)
}

export const addColumn = ({ commit, state }) => {
  commit('addColumn')
}

export const removeColumn = ({ commit, state }, payload) => {
  commit('removeColumn', payload)
}
