import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/main/Home'

import MenuList from './components/main/MenuList/MenuList'
import Cart from './components/main/MenuList/Cart'
import OrderManagement from './components/main/OrderManagement/OrderManagement'
import ViewControl from './components/main/ViewControl/ViewControl'

import StoreInformation from './components/main/StoreInformation/StoreInformation'
import StaffInformation from './components/main/StaffInformation/StaffInformation'
import StoreAnalytics from './components/main/StoreAnalytics/StoreAnalytics'


export const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},

        {path: '/menulist', components:{
            default: MenuList,
            cart: Cart,
        } },
        {path: '/ordermanagement', component: OrderManagement},
        {path: '/viewcontrol', component: ViewControl},

        {path: '/storeinformation', component: StoreInformation},
        {path: '/staffinformation', component: StaffInformation},
        {path: '/storeanalytics', component: StoreAnalytics},
    ]
})