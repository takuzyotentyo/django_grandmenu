<template>
  <transition name="LeftFade" mode="out-in">
    <slot/>
  </transition>
</template>

<style lang="scss" scoped>
.LeftFade-enter-from, .LeftFade-leave-to{
  transform: translateX(25vw);
  opacity: 0;
}
.LeftFade-enter-active, .LeftFade-leave-active {
  transition: all $animation-time;
}
</style>
