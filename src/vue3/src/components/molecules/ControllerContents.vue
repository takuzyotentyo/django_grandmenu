<template>
    <!-- <li class="ControllerContents" @click="lightBoxShow(url)"> -->
    <li class="ControllerContents">
        <ContentIcon :class="img"/>
        <span>{{ content }}</span>
    </li>
</template>

<script>
import ContentIcon from "../atoms/ContentIcon.vue"


export default {
    components: {
        ContentIcon,
    },
    props: ['content','img'],
}
</script>

<style lang="scss" scoped>
    .ControllerContents{
        color: $text-primary;
        font-size: 1.6rem;
        display: grid;
        grid-template-rows: 42px;
        padding-left: 5px;
        grid-template-columns: 42px 1fr;
        grid-gap: 0 5px;
        justify-content: center;
        align-items: center;
}  
</style>