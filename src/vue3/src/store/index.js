import { createStore, createLogger } from 'vuex'
import storeInformation from './modules/storeInformation'
import tableInformation from './modules/tableInformation'
import sideNavControl from './modules/sideNavControl'
import lightBox from './modules/lightBox'
import menuList from './modules/menuList'
import cart from './modules/cart'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    storeInformation,
    sideNavControl,
    lightBox,
    menuList,
    cart,
    tableInformation,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})