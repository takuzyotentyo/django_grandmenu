import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/pages/Home'

import MenuList from './components/pages/MenuList'
import Cart from './components/molecules/Cart'
import OrderManagement from './components/pages/OrderManagement'
import ViewControl from './components/pages/ViewControl'

import StoreInformation from './components/pages/StoreInformation'
import StaffInformation from './components/pages/StaffInformation'
import StoreAnalytics from './components/pages/StoreAnalytics'


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