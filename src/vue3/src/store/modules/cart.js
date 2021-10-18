const state = {
    cartBall:{
        x: '',
        y: '',
        isActive: false,
    },
    cartOrders:[
        {
            class1: 'food',
            class2: 'ハンバーガー',
            class3: 'ハンバーガー',
            setmenu_values:[],
            quantity: 3,
            price: 100,
        },
        {
            class1: 'food',
            class2: 'ハンバーガー',
            class3: 'チーズバーガー',
            setmenu_values:[],
            quantity: 3,
            price: 100,
        }
    ]
};

const getters = {
    cartBall: state => state.cartBall,
    cartOrders: state => state.cartOrders
};

const mutations = {
    cartBallPositionUpdate(state, position){
        state.cartBall.x = position.x
        state.cartBall.y = position.y
    },
    cartBallIsActive(state){
        state.cartBall.isActive = !state.cartBall.isActive
    },
    addCart(state, addCartMenu){
        let exist_class1, exist_class2, exist_class3, exist_setmenu_values, exist_price, exist_quantity, isExist
        const new_class1 = addCartMenu.class1
        const new_class2 = addCartMenu.class2
        const new_class3 = addCartMenu.class3
        // 既存のset_menu_valuesが、proxyオブジェクトとして取得されるため、新規set_menu_valuesもJSON化して後で比較。
        const new_setmenu_values = JSON.stringify(addCartMenu.setmenu_values)
        const new_price = addCartMenu.price
        const new_quantity = addCartMenu.quantity
        isExist = false
        state.cartOrders.forEach((cartOrder,index) => {
            exist_class1 = cartOrder.class1
            exist_class2 = cartOrder.class2
            exist_class3 = cartOrder.class3
            // 既存のset_menu_valuesが、proxyオブジェクトとして取得されるため、JSON化して取得。
            exist_setmenu_values = JSON.stringify(cartOrder.setmenu_values)
            exist_price = cartOrder.price
            exist_quantity = cartOrder.quantity
            if(
                exist_class1 == new_class1 &&
                exist_class2 == new_class2 &&
                exist_class3 == new_class3 &&
                exist_setmenu_values == new_setmenu_values &&
                exist_price == new_price
            ){
                isExist = true
                if(exist_quantity + new_quantity > 0){
                    state.cartOrders[index].quantity = exist_quantity + new_quantity
                    console.log(state.cartOrders[index].quantity)
                }else{
                    const cart_menu_delete = window.confirm(exist_class3 +'をカートから削除しますか？');
                    if(cart_menu_delete){
                    state.cartOrders.splice(index, 1)
                    }
                }
            }
        })
        console.log(isExist)
        if(isExist == false && new_quantity > 0){
            state.cartOrders.push(addCartMenu)
        }
    },
};


const actions = {
    cartBallPositionUpdate({ commit, dispatch }, position_and_menu){
        const position = position_and_menu.position
        const addCartMenu = position_and_menu.menu
        if(addCartMenu.quantity != 0){
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
        console.log('action addCart')
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