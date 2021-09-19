<template>
    <button class='submit_button'>
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    .submit_button{
        @include submit_button;
    }
</style>