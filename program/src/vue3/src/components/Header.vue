<template>
  <header>
    <div class="header__menu" v-bind:class="{ active: sideNav }" @click="sideNavShow()">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <router-link class="header__title" to='/'>{{ storeName }}</router-link>
    <router-view name="cart" v-slot="{ Component }">
      <LeftFade>
        <component :is="Component"/>
      </LeftFade>
    </router-view>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LeftFade from "./transition/LeftFade.vue"

export default {
  components: {
    LeftFade,
  },
  computed: {
        ...mapGetters([ 'storeName', 'storeName', 'sideNav' ])
    },
    methods: {
        ...mapActions([ 'storeNameChange', 'sideNavShow' ])
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
header{
  width: 100vw;
  height: 50px;
  background-color: $bg-primary;
  line-height: 50px;
  text-align: center;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.header__title{
    font-size: 2.4rem;
    color: $text-primary;
  }

.header__menu{
  position: absolute;
  left: calc(3vw - 15px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 20px;
  padding: 15px;
  & > span {
      width: 100%;
      height: 2px;
      border-radius: 10px;
      background-color: $bg-secondary;
      transform: rotate(0deg);
      transition: .4s ease-in-out;
  }
  &.active > span:nth-child(1) {
      transform: translateY(9px) rotate(135deg);
  }
  &.active > span:nth-child(2) {
      opacity: 0;
      transform: translateX(-20px);
  }
  &.active > span:nth-child(3) {
      transform: translateY(-9px) rotate(-135deg);
  }
}

</style>
