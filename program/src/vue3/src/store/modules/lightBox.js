const state = {
    lightBox: ''
};

const getters = {
    lightBox: state => state.lightBox
};

const mutations = {
    lightBoxShow(state, newLightBox){
        state.lightBox = newLightBox;
    }
};

const actions = {
    lightBoxShow({ commit }, newLightBox){
        if(state.lightBox == ''){
            commit("lightBoxShow", newLightBox)
        }else if(state.lightBox == newLightBox){
            commit("lightBoxShow", '')
        }else{
            //0.2秒で、選択されたものに戻す
            commit("lightBoxShow", '')
            setTimeout(() => 
                commit("lightBoxShow", newLightBox),
            200)
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
}