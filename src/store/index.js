import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  areas: [
    { x: 0, y: 0, w: 2, h: 1, label: 'area1', id: 0 },
    { x: 0, y: 1, w: 1, h: 1, label: 'area2', id: 1 },
    { x: 1, y: 1, w: 1, h: 1, label: 'area3', id: 2 },
  ],
  dragAreas: null,
  columns: [
    {
      size: 10,
      units: 'em',
    },
    {
      size: 10,
      units: 'em',
    },
  ],
  rows: [
    {
      size: 10,
      units: 'em',
    },
    {
      size: 10,
      units: 'em',
    },
  ],
  colGap: {
    size: 0,
    units: '',
  },
  rowGap: {
    size: 0,
    units: '',
  },
  justify: {
    value: '',
  },
  align: {
    value: '',
  },
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
