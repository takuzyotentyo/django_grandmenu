const state = {
    storeID: '',
    storeName: '',
    seatingCapacity: '',
    takeoutSupport: '',
};

const getters = {
    storeID: state => state.storeID,
    storeName: state => state.storeName,
    seatingCapacity: state => state.seatingCapacity,
    takeoutSupport: state => state.takeoutSupport,
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
        const new_store_information = JSON.stringify({
            'action':'update',
            'store_id': storeInformation.store_id,
            'store_name': storeInformation.store_name,
            'seating_capacity': storeInformation.seating_capacity,
            'takeout_support': storeInformation.takeout_support,
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