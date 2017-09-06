// actions are functions that causes side effects and can involve
// asynchronous operations.

export const action = ({ commit, state }, payload) => {
  if (state.val) {
    commit('mutation', payload)
  }
}

export const setAreas = ({ commit, state }, payload) => {
  commit('setAreas', payload)
}

export const setDragAreas = ({ commit, state }, payload) => {
  commit('setDragAreas', payload)
}

export const addDragArea = ({ commit, state }, payload) => {
  commit('addDragArea', payload)
}

export const addArea = ({ commit, state }, payload) => {
  commit('addArea', payload)
}

export const removeArea = ({ commit, state }, payload) => {
  commit('removeArea', payload)
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
