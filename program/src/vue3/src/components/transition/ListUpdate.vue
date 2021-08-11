<template>
    <transition-group name="ListUpdate"  tag="p">
            <slot/>
    </transition-group>
</template>

<style lang="scss">
.ListUpdate-enter-active{
  transition: all $animation-time ease;
}

.ListUpdate-leave-active {
  transition: all $animation-time ease;
  position:absolute;
}
.ListUpdate-enter-from,
.ListUpdate-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.ListUpdate-move {
  transition: transform $animation-time ease;
}


</style>