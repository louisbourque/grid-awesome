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
    { x: 0, y: 0, w: 2, h: 1, label: 'header', id: 0 },
    { x: 0, y: 1, w: 1, h: 1, label: 'area2', id: 1 },
    { x: 1, y: 2, w: 1, h: 1, label: 'area3', id: 2 },
    { x: 2, y: 0, w: 1, h: 3, label: 'sidebar', id: 3 },
  ],
  dragAreas: null,
  columns: [
    {
      size: 3,
      units: 'fr',
    },
    {
      size: 4,
      units: 'fr',
    },
    {
      size: 2,
      units: 'fr',
    },
  ],
  rows: [
    {
      size: 10,
      units: 'rem',
    },
    {
      size: 15,
      units: 'rem',
    },
    {
      size: 20,
      units: 'rem',
    },
  ],
  colGap: {
    size: 0.5,
    units: 'rem',
  },
  rowGap: {
    size: 0.5,
    units: 'rem',
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
