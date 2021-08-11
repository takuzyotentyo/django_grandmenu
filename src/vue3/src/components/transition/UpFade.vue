<template>
  <transition name="UpFade" mode="out-in">
    <slot/>
  </transition>
</template>

<style lang="scss" scoped>
.UpFade-enter-from, .UpFade-leave-to{
  transform: translateY(25vw);
  opacity: 0;
}
.UpFade-enter-active, .UpFade-leave-active {
  transition: all $animation-time;
}
</style>