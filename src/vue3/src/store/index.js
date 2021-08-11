import { createStore, createLogger } from 'vuex'
import storeInformation from './modules/storeInformation'
import sideNavControl from './modules/sideNavControl'
import lightBox from './modules/lightBox'
import menuList from './modules/menuList'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    storeInformation, sideNavControl, lightBox, menuList,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})