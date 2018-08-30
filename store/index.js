import Vuex from 'vuex'

const createStore = () => {
    
    const state = {
        GA_CODE: "YOUR_GA_CODE",
        WEB_ADDRESS:  "YOUR_WEB_ADDRESS",
        pageData: {},
        loading: false,
    }

    const getters = {}

    const mutations = {
        SET_INIT(state, payload) {
            state.initiated = payload;
        },
        SET_LOADING(state, payload) {
            state.loading = payload;
        },
        SET_PAGE_DATA(state, payload) {
            state.pageData = payload;
        },
        SET_NEXT_LINK(state, payload) {
            state.nextLink = payload;
        }
    }

    const actions = {
        setInit({commit}, payload) {
            commit("SET_INIT", payload);
        },
        setLoading({commit}, payload) {
            commit("SET_LOADING", payload);
        },
        setPageData({commit}, payload) {
            commit("SET_PAGE_DATA", payload);
        },
        setNextLink({commit}, payload) {
            commit("SET_NEXT_LINK", payload);
        }
    }

    return new Vuex.Store ({
        state, getters, mutations, actions
    })
}

export default createStore