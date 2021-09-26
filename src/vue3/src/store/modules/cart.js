const state = {
    cart_ball:{
        x: '',
        y: '',
        isActive: true,
    }
};

const getters = {
    cart_ball: state => state.cart_ball
};

const mutations = {
    cartBallPositionUpdate(state, position){
        state.cart_ball.x = position.x
        state.cart_ball.y = position.y
    },
    cartBallIsActive(state){
        state.cart_ball.isActive = !state.cart_ball.isActive
    }
};


const actions = {
    cartBallPositionUpdate({ commit }, position){
        commit("cartBallIsActive")
        commit("cartBallPositionUpdate", position)
        setTimeout(() => 
            commit("cartBallIsActive"),
        1)
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
}