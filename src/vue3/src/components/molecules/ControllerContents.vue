<template>
    <!-- <li class="ControllerContents" @click="lightBoxShow(url)"> -->
    <li class="ControllerContents">
        <ContentIcon :class="img"/>
        <ContentMidium>{{ content }}</ContentMidium>
    </li>
</template>

<script>
import ContentIcon from "../atoms/ContentIcon.vue"
import ContentMidium from "../atoms/ContentMidium.vue"


export default {
    components: {
        ContentIcon,
        ContentMidium,
    },
    props: ['content','img'],
}
</script>

<style lang="scss" scoped>
    .ControllerContents{
        color: $text-primary;
        height: 42px;
        font-size: 16px;
        display: flex;
}
</style>