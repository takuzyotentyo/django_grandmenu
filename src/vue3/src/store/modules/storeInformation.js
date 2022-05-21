import axios from 'axios'

const state = {
    PK: '',
    storeName: '',
    seatingCapacity: '',
    takeoutSupport: '',
    storeTelNum: null,
    storePostalCode: null,
    storeAddress1: null,
    storeAddress2: null,
    storeAddress3: null,
    storeAddress4: null,
    storeAddress5: null,
};

const getters = {
    PK: state => state.PK,
    storeName: state => state.storeName,
    seatingCapacity: state => state.seatingCapacity,
    takeoutSupport: state => state.takeoutSupport,
    storeTelNum: state => state.storeTelNum,
    storePostalCode: state => state.storePostalCode,
    storeAddress1: state => state.storeAddress1,
    storeAddress2: state => state.storeAddress2,
    storeAddress3: state => state.storeAddress3,
    storeAddress4: state => state.storeAddress4,
    storeAddress5: state => state.storeAddress5,
};

const mutations = {
    storeInformation_update(state, newStoreInformation){
        console.log("storeInformation_update")
        state.PK = newStoreInformation.pk
        state.storeName = newStoreInformation.store_name
        state.seatingCapacity = newStoreInformation.seating_capacity
        state.takeoutSupport = newStoreInformation.takeout_support
        state.storeTelNum = newStoreInformation.store_telnum
        state.storePostalCode = newStoreInformation.store_postal_code
        state.storeAddress1 = newStoreInformation.store_address1
        state.storeAddress2 = newStoreInformation.store_address2
        state.storeAddress3 = newStoreInformation.store_address3
        state.storeAddress4 = newStoreInformation.store_address4
        state.storeAddress5 = newStoreInformation.store_address5
    },
};

const actions ={
    storeInformation_read({commit}){
        axios.get('/api/store_information/')
        .then(response => {
            console.log("API get OK!")
            console.log(response)
            const storeInformation = response.data[0]
            commit('storeInformation_update', storeInformation)
        })
    },
    storeInformation_update({ commit }, storeInformation){
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        console.log("post前")
        console.log(storeInformation)
        axios.patch("/api/store_information/" + storeInformation.pk + '/', storeInformation)
        .then(response => {
            console.log("API post OK!")
            console.log(response)
            commit("storeInformation_update", storeInformation)
        })
    }
};



export default {
    state,
    getters,
    mutations,
    actions,
}