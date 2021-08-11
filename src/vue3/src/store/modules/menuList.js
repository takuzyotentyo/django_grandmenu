const state = {
    selectClass: {
        class1: 'food',
        class2: '',
    },
    class1Menus: ['food','drink'],
    class2Menus:{
        food: ['ハンバーガー','サイドメニュー'],
        drink: ['ソフトドリンク']
    },
    class3Menus: {
        food: {
            ハンバーガー: {
                ハンバーガー: {price: 100, class4Menus: []},
                チーズバーガー: {price: 120, class4Menus: []},
                ビッグマック: {price: 200,class4Menus:[]},
            },
            サイドメニュー:{
                ポテトS: {price: 100, class4Menus:[]},
                ポテトM: {price: 150, class4Menus:[]},
                ポテトL: {price: 200, class4Menus:[]},
            },
        },
        drink:{
            ソフトドリンク: {
                コーラ: {price: 100, class4Menus:['ドリンクセット','ポテトセット']},
                スプライト: {price: 120, class4Menus:[]},
            },
        },
    },
    class4Menus: {
        ドリンクセット:[
            {name: 'コーラ', price: 0},
            {name: 'スプライト', price: 0},
            {name: '黒烏龍茶', price: 100},
        ],
        ポテトセット: [
            {name: 'ポテトS', price: 0},
            {name: 'ポテトM', price: 50},
            {name: 'ポテトL', price: 100}
        ]
    },
};

const getters = {
    selectClass: state => state.selectClass,
    class1Menus: state => state.class1Menus,
    class2Menus: state => state.class2Menus,
    class3Menus: state => state.class3Menus,
    class4Menus: state => state.class4Menus,
};

const mutations = {
    selectClass1Update(state, newClass1){
        state.selectClass["class1"] = newClass1;
    },
    selectClass2Update(state, newClass2){
        state.selectClass["class2"] = newClass2;
    },
    createClass2Menu(state, newMenu){
        const newClass1 = newMenu['class1'],
            newClass2 = newMenu['class2']
        state.class2Menus[newClass1].push(newClass2)
        state.class3Menus[newClass1][newClass2]={}
    },
    createClass3Menu(state, newMenu){
        const newClass1 = newMenu['class1'],
            newClass2 = newMenu['class2'],
            newClass3 = newMenu['class3'],
            newClass3Infomation = {price: newMenu['price'], setmenu:[]}
        state.class3Menus[newClass1][newClass2][newClass3] = newClass3Infomation
    },
};

const actions = {
    selectClass1Update({ commit }, newClass1){
        commit("selectClass1Update", newClass1)
    },
    selectClass2Update({ commit }, newClass2){
        commit("selectClass2Update", newClass2)
    },
    async createMenu({ state, commit, dispatch }, newMenu){
        const newClass1 = newMenu['class1'],
            newClass2 = newMenu['class2']
        if (state.class2Menus[newClass1].includes(newClass2)==false) {
            await commit("createClass2Menu", newMenu)
        }
        commit("createClass3Menu", newMenu)
        dispatch('lightBoxShow', '', { root: true })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}