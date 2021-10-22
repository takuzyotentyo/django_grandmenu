<template>
    <transition-group name="ListUpdate" tag="p">
            <slot></slot>
    </transition-group>
</template>

<style lang="scss">
.ListUpdate-enter-active{
  transition: all $animation-time ease;
}

.ListUpdate-enter-from,
.ListUpdate-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// --この2要素を親のコンポーネントに記載する--
// .ListUpdate-leave-active {
//   transition: all $animation-time ease;
//   position:absolute;
// }
// .ListUpdate-move {
//   transition: transform $animation-time ease;
// }


</style>