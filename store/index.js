import Vuex from 'vuex'

const createStore = () => {
    const state = {
        placeID: null,
        pageData: null,
        pageQuote: null,
        pageDesc: null,
        pageError: false,
        loading: false,
        initiated: false
    }

    const getters = {}

    const mutations = {}

    const actions = {}

    return new Vuex.Store ({
        state, getters, mutations, actions
    })
}

export default createStore