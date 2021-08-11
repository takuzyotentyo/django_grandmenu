const state = {
    sideNav: true
};

const getters = {
    sideNav: state => state.sideNav
};

const mutations = {
    sideNavShow(state){
        console.log(state.sideNav)
        state.sideNav = !state.sideNav
    }
};

const actions ={
    sideNavShow({ commit }){
        console.log('OK')
        commit("sideNavShow")
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}