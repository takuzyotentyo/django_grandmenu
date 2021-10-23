const state = {
    storeID: '',
    storeName: '',
    seatingCapacity: '',
    takeoutSupport: '',
    storePostalCode: null,
    storeAddress1: null,
    storeAddress2: null,
    storeAddress3: null,
    storeAddress4: null,
    storeAddress5: null,
};

const getters = {
    storeID: state => state.storeID,
    storeName: state => state.storeName,
    seatingCapacity: state => state.seatingCapacity,
    takeoutSupport: state => state.takeoutSupport,
    storePostalCode: state => state.storePostalCode,
    storeAddress1: state => state.storeAddress1,
    storeAddress2: state => state.storeAddress2,
    storeAddress3: state => state.storeAddress3,
    storeAddress4: state => state.storeAddress4,
    storeAddress5: state => state.storeAddress5,
};

const mutations = {
    storeInformation_update(state, newStoreInformation){
        state.storeID = newStoreInformation.store_id
        state.storeName = newStoreInformation.store_name
        state.seatingCapacity = newStoreInformation.seating_capacity
        state.takeoutSupport = newStoreInformation.takeout_support
    },
};

const actions ={
    storeInformation_read({commit}, storeInformation){
        commit('storeInformation_update', storeInformation)
    },
    storeInformation_update({ commit }, storeInformation){
        console.log('storeInformation')
        console.log(storeInformation)
        const new_store_information = JSON.stringify({
            'action':'update',
            'store_information': storeInformation
        });
        this.$store_information.send( new_store_information );
        commit("storeInformation_update", storeInformation)
    },
    // seatingCapacityChange({ commit }, newSeatingCapacity){
    //     commit("seatingCapacityChange", newSeatingCapacity)
    // },
    // takeoutSupportChange({ commit }, newTakeoutSupport){
    //     commit("takeoutSupportChange", newTakeoutSupport)
    // }
};



export default {
    state,
    getters,
    mutations,
    actions,
}