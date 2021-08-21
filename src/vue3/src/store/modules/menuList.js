const state = {
    selectClass: {
        class1: '0',
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

    menuLists : [
        {
            id: 1,
            name: 'food',
            class2s: [
                {
                    id: 1,
                    name: 'ハンバーガー',
                    class3s: [
                        {
                            id: 1,
                            name: 'ハンバーガー',
                            price: 100,
                            takeout: true,
                            class4s: ['1','2']
                        },
                        {
                            id: 2,
                            name: 'チーズバーガー',
                            price: 120,
                            takeout: true,
                            class4s: ['1','2']
                        },
                        {
                            id: 3,
                            name: 'ビッグマック',
                            price: 200,
                            takeout: true,
                            class4s:['1','2']
                        },
                    ]
                },
                {
                    id: 2,
                    name: 'サイドメニュー',
                    class3s: [
                        {
                            id: 1,
                            name: 'ポテトS',
                            price: 100,
                            takeout: false,
                            class4s:[]
                        },
                        {
                            id:2,
                            name: 'ポテトM', price: 150,
                            takeout: false,
                            class4s:[]
                        },
                        {
                            id:3,
                            name: 'ポテトL', price: 200,
                            takeout: false,
                            class4s:[]
                        },
                    ]
                },
            ]
        },
        {
            id:2,
            name: 'drink',
            class2s: [
                {
                    id: 1,
                    name: 'ソフトドリンク',
                    class3s: [
                        {
                            id: 1,
                            name: 'コーラ',
                            price: 100,
                            takeout: true,
                            class4s:[]
                        },
                        {
                            id: 2,
                            name: 'スプライト',
                            price: 120,
                            takeout: true,
                            class4s:[]
                        },
                    ]
                },
            ]
        }
    ],
    setMenuLists : [
        {
            id: 1,
            name:'ドリンクセット',
            class5s: [
                {   id: 1,
                    name: 'コーラ',
                    price: 0
                },
                {
                    id: 2,
                    name: 'スプライト',
                    price: 0
                },
                {
                    id: 3,
                    name: '黒烏龍茶',
                    price: 100
                },
            ]
        },
        {
            id: 2,
            name:'ポテトセット',
            class5s: [
                {
                    id:1,
                    name: 'ポテトS',
                    price: 0},
                {
                    id:2,
                    name: 'ポテトM',
                    price: 50},
                {
                    id:3,
                    name: 'ポテトL',
                    price: 100}
        ]}
    ]
};

const getters = {
    selectClass: state => state.selectClass,
    class1Menus: state => state.class1Menus,
    class2Menus: state => state.class2Menus,
    class3Menus: state => state.class3Menus,
    class4Menus: state => state.class4Menus,
    class5Menus: state => state.class5Menus,
    menuLists: state => state.menuLists,
    setMenuLists: state => state.setMenuLists,

};

const mutations = {
    selectClass1Update(state, newClass1){
        state.selectClass["class1"] = newClass1;
    },
    selectClass2Update(state, newClass2){
        state.selectClass["class2"] = newClass2;
    },
    menuListCreate(state, newMenu){
        const newClass1Index = newMenu.['class1']
        const newClass2Name = newMenu.['class2']
        const newClass3Name = newMenu.['class3']
        const newClass3Price = newMenu.['price']
        const newClass3Takeout = newMenu.['takeout']
        const newClass3Class4s = newMenu.['class4Menus']
        const class2s = state.menuLists[newClass1Index].class2s
        let class2Names = class2s.map(element => element.name)
        let class2Ids = class2s.map(element => element.id)
         //class2の存在確認を行い、無ければ登録
         if (class2Names.includes(newClass2Name)==false) {
            const class2Id = class2Ids.reduce((a, b) => 
                Math.max(a, b) + 1 , 0)
            const newClass2 = {
                id: class2Id,
                name: newClass2Name,
                class3s: []
            }
            state.menuLists[newClass1Index].class2s.push(newClass2)
        }
        class2Names = state.menuLists[newClass1Index].class2s.map(element => element.name)
        const newclass2Index = class2Names.indexOf(newClass2Name)
        const class3s = state.menuLists[newClass1Index].class2s[newclass2Index].class3s
        const class3Names = class3s.map(element => element.name)
        const class3Ids = class3s.map(element => element.id)
        // class3の存在確認を行い、無ければ登録
        if (class3Names.includes(newClass3Name)==false) {
            const class3Id = class3Ids.reduce((a, b) => 
                Math.max(a, b) + 1 , 0)
            const newClass3 = {
                id: class3Id,
                name: newClass3Name,
                price: newClass3Price,
                takeout: newClass3Takeout,
                class4s: newClass3Class4s,
            }
            state.menuLists[newClass1Index].class2s[newclass2Index].class3s.push(newClass3)
        }else{
            const newclass3Index = class3Names.indexOf(newClass3Name)
            state.menuLists[newClass1Index].class2s[newclass2Index].class3s[newclass3Index].price = newClass3Price
            state.menuLists[newClass1Index].class2s[newclass2Index].class3s[newclass3Index].takeout = newClass3Takeout
            state.menuLists[newClass1Index].class2s[newclass2Index].class3s[newclass3Index].class4s = newClass3Class4s
        }
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