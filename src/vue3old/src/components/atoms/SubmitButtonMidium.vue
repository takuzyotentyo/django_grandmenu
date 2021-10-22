<template>
    <button class='submit_button--half'>
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    .submit_button--half{
        @include submit_button($width: 82%);
    }
</style>