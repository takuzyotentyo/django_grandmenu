const state = {
    cart_ball:{
        x: '',
        y: '',
        isActive: true,
    },
    cart_orders:[
        {
            class1: 'food',
            class2: 'ハンバーガー',
            class3: 'ハンバーガー',
            setmenu_values:[
            ],
            quantity: 3,
            price: 100,
        },
        {
            class1: 'food',
            class2: 'ハンバーガー',
            class3: 'チーズバーガー',
            setmenu_values:[
            ],
            quantity: 3,
            price: 100,
        }
    ]
};

const getters = {
    cart_ball: state => state.cart_ball,
    cart_orders: state => state.cart_orders
};

const mutations = {
    cartBallPositionUpdate(state, position){
        state.cart_ball.x = position.x
        state.cart_ball.y = position.y
    },
    cartBallIsActive(state){
        state.cart_ball.isActive = !state.cart_ball.isActive
    },
    addCart(state, addCartMenu){
        console.log('action')
        console.log(addCartMenu)
        state.cart_orders.push(addCartMenu)
    }
};


const actions = {
    cartBallPositionUpdate({ commit, dispatch }, position_and_menu){
        console.log('cartBallPositionUpdate')
        const position = position_and_menu.position
        const addCartMenu = position_and_menu.menu
        if(addCartMenu.quantity != 0){
            console.log(position)
            console.log(addCartMenu)
            commit("cartBallIsActive")
            commit("cartBallPositionUpdate", position)
            setTimeout(() => 
                commit("cartBallIsActive"),
            1)
            setTimeout(() => 
                dispatch("addCart", addCartMenu),
            599)
        }
    },
    addCart({ commit }, addCartMenu){
        if(addCartMenu.quantity != 0){
            commit("addCart", addCartMenu)
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}