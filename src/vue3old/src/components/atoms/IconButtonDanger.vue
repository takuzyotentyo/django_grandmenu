
<template>
    <span class='button_icon--danger'></span>
</template>

<style lang="scss" scoped>
    .button_icon--danger{
        @include icon_button($background-color: $bg-danger, $border: solid 10px $bg-danger);
    }
</style>