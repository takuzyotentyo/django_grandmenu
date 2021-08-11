<template>
  <div class="main" v-bind:class="{ active: sideNav }">
    <router-view v-slot="{ Component }">
      <LeftFade>
        <component :is="Component" />
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
  top: 50px;
  height: calc(100vh - 50px);
  background-color: $bg-secondary;
  display: flex;
  flex-flow: wrap;
  align-items:center;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100vw;
  transition: all $animation-time;
  overflow: hidden;
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
