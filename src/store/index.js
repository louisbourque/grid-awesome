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
    { x: 0, y: 0, w: 2, h: 2, label: 'area1' },
    { x: 2, y: 0, w: 2, h: 4, label: 'area2' },
    { x: 4, y: 0, w: 2, h: 5, label: 'area3' },
  ],
  columns: [
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
