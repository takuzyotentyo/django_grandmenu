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
            ハンバーガー: [
                {name: 'ハンバーガー', price: 100, takeout: true, class4Menus: []},
                {name: 'チーズバーガー', price: 120, takeout: true, class4Menus: []},
                {name: 'ビッグマック', price: 200,takeout: true, class4Menus:[]},
            ],
            サイドメニュー:[
                {name: 'ポテトS', price: 100, takeout: false, class4Menus:[]},
                {name: 'ポテトM', price: 150, takeout: false, class4Menus:[]},
                {name: 'ポテトL', price: 200, takeout: false, class4Menus:[]},
            ],
        },
        drink: {
            ソフトドリンク: [
                {name: 'コーラ', price: 100, takeout: true, class4Menus:['ドリンクセット','ポテトセット']},
                {name: 'スプライト', price: 120, takeout: true, class4Menus:[]},
            ],
        },
    },
    class4Menus: ['ドリンクセット','ポテトセット','サラダセット'],
    class5Menus: {
        ドリンクセット: [
            {name: 'コーラ', price: 0},
            {name: 'スプライト', price: 0},
            {name: '黒烏龍茶', price: 100},
        ],
        ポテトセット: [
            {name: 'ポテトS', price: 0},
            {name: 'ポテトM', price: 50},
            {name: 'ポテトL', price: 100},
        ],
        サラダセット: [
            {name: 'サラダS', price: 0},
            {name: 'サラダM', price: 50},
            {name: 'サラダL', price: 100},
        ],
    },

    // menuLists : [
    //     {class1: 'food',
    //     class2s: [
    //         {class2: 'ハンバーガー',
    //         class3s: [
    //             {class3: 'ハンバーガー', price: 100, takeout: true, class4Menus: []},
    //             {class3: 'チーズバーガー', price: 120, takeout: true, class4Menus: []},
    //             {class3: 'ビッグマック', price: 200,takeout: true, class4Menus:[]},
    //         ]},
    //         {class2: 'サイドメニュー',
    //         class3s: [
    //             {class3: 'ポテトS', price: 100, takeout: false, class4Menus:[]},
    //             {class3: 'ポテトM', price: 150, takeout: false, class4Menus:[]},
    //             {class3: 'ポテトL', price: 200, takeout: false, class4Menus:[]},
    //         ]},
    //     ]},
    //     {class1: 'drink',
    //     class2s: [
    //         {class2: 'ソフトドリンク',
    //         class3s: [
    //             {class3: 'コーラ', price: 100, takeout: true, class4Menus:['ドリンクセット','ポテトセット']},
    //             {class3: 'スプライト', price: 120, takeout: true, class4Menus:[]},
    //         ]},
    //     ]}
    // // ],

    // setMenuLists : [
    //     {class4:'ドリンクセット',
    //     class5s: [
    //         {class5: 'コーラ', price: 0},
    //         {class5: 'スプライト', price: 0},
    //         {class5: '黒烏龍茶', price: 100},
    //     ]},
    //     {class4:'ポテトセット',
    //     class5s: [
    //         {class5: 'ポテトS', price: 0},
    //         {class5: 'ポテトM', price: 50},
    //         {class5: 'ポテトL', price: 100}
    //     ]}
    // ]
};

const getters = {
    selectClass: state => state.selectClass,
    class1Menus: state => state.class1Menus,
    class2Menus: state => state.class2Menus,
    class3Menus: state => state.class3Menus,
    class4Menus: state => state.class4Menus,
    class5Menus: state => state.class5Menus,
    // menuLists: state => state.menuLists,
    // setMenuLists: state => state.setMenuLists,

};

const mutations = {
    selectClass1Update(state, newClass1){
        state.selectClass["class1"] = newClass1;
    },
    selectClass2Update(state, newClass2){
        state.selectClass["class2"] = newClass2;
    },
    menuListCreate(state, newMenu){
        const newClass1 = newMenu.['class1']
        const newClass2 = newMenu.['class2']
        const newClass3 = {
            name: newMenu.['class3'],
            price: newMenu.['price'],
            takeout: newMenu.['takeout'],
            class4Menus : newMenu.['class4Menus']
        }
        //class2の登録
        if (state.class2Menus[newClass1].includes(newClass2)==false) {
            state.class2Menus[newClass1].push(newClass2)
        }
        //class3の登録
        state.class3Menus[newClass1][newClass2].push(newClass3)
    },
    setMenuCreate(state, newSetMenu){
        console.log(newSetMenu)
        const newClass4 = newSetMenu['class4Menu']
        const newClass5Menus = newSetMenu['class5Menus']
        if (state.class4Menus.includes(newClass4)==false) {
            state.class4Menus.push(newClass4)
            state.class5Menus[newClass4] = newClass5Menus
        }else{
            newClass5Menus.forEach( (newclass5Menu) => {
                state.class5Menus[newClass4].push(newclass5Menu)
            })
        }
        console.log(state.class4Menus)
        console.log(state.class5Menus)
    },
    setMenuOrderUpdate(state, newSetMenu){
        state.class4Menus = newSetMenu['class4Order']
        state.class5Menus = newSetMenu['class5Order']
    }
};

const actions = {
    selectClass1Update({ commit }, newClass1){
        commit("selectClass1Update", newClass1)
    },
    selectClass2Update({ commit }, newClass2){
        commit("selectClass2Update", newClass2)
    },
    async menuListCreate({ commit, dispatch }, newMenu){
        newMenu['action'] = "create";
        // ｗebsocketで送信する
        // const wsNewMenu =JSON.stringify(newMenu)
        // this.$menu_list.send( wsNewMenu );
        commit("menuListCreate", newMenu)
        dispatch('lightBoxShow', '', { root: true })
    },
    async setMenuCreate({ commit }, newSetMenu){
        commit("setMenuCreate", newSetMenu)
    },
    async setMenuOrderUpdate({ commit }, newSetMenu){
        commit("setMenuOrderUpdate", newSetMenu)
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}