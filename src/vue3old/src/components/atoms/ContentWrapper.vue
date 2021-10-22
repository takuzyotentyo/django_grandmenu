<template>
    <span class='content--wrapper'>
            <slot></slot>
        </span>
</template>

<script>

export default {
}
</script>


<style lang="scss" scoped>
    .content--wrapper{
        @include content--wrapper($width:49.5%);
        @include mq('tb'){
            min-width: calc(98vw - 100%);
        }
        @include mq('sp'){
            width: 100%;
        }
    }
</style>