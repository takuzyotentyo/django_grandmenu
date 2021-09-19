<template>
  <div class="main" :class="{ active: sideNav }">
    <router-view v-slot="{ Component }">
      <LeftFade>
        <keep-alive>
        <component :is="Component" />
        </keep-alive>
      </LeftFade>
    </router-view>
  </div>
</template>

<script>

import { mapGetters } from "vuex"
import LeftFade from "./transition/LeftFade.vue"

export default {
  components: {
    LeftFade,
  },
  computed: {
      ...mapGetters(['sideNav']),
  },
}
</script>

<style lang="scss" scoped>
.main{
  position: fixed;
  height: 100vh;
  height: -webkit-fill-available;
  background-color: $bg-secondary;
  display: flex;
  flex-flow: wrap;
  align-items:center;
  justify-content: center;
  left: 0;
  width: 100vw;
  transition: all $animation-time;
  overflow: hidden;
  overflow-y: scroll;
  &.active{
    left: 25vw;
    width: 75vw;
    @include mq('tb'){
    left: 50vw;
    width: 50vw;
    }
    @include mq('sp'){
    left: 100vw;
    width: 0vw;
    }
  }
}

</style>
