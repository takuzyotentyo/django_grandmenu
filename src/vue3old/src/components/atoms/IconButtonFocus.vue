
<template>
    <button class='button_icon--focus'></button>
</template>

<style lang="scss" scoped>
    .button_icon--focus{
        @include icon_button($background-color: $bg-focus, $border: solid 10px $bg-focus);
    }
</style>