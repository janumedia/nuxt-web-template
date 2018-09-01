import Vuex from 'vuex'

const createStore = () => {
    
    const state = {
        GA_CODE     : "YOUR_GA_CODE",
        GOOGLE_KEY  : "AIzaSyAF7_hvatl9Wrn2mRD_xi1wzHTfktUp5Jg", // REPLACE_WITH_YOUR_GOOGLE_KEY
        WEB_ADDRESS : "YOUR_WEB_ADDRESS",
        company     : {
            name    : "Nusa Penida Tourism Board",
            address : "Klungkung Regency",
            address2: "Nusa Penida, Bali - Indonesia",
            email   : "mail@company.com",
            phone   : "+62 8888888"
        },
        pageData    : {},
        loading     : true,
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