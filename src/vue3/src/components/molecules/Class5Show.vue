<template>
    <li class="class5Menu--show">
        <Content>{{ class5_name }}</Content>
        <IconButtonFocus @click="$emit('class5_edit_start', class4_index, class5_index)" class="icon--create right_center" />
        <Content v-if="class5_price>=0">＋{{ class5_price }}円</Content>
        <Content v-else> {{ class5_price }}円</Content>
    </li>
</template>
<script>
import Content from "../atoms/Content"
import IconButtonFocus from "../atoms/IconButtonFocus"

export default {
    props: [
        'class4_index',
        'class5_index',
        'class5_name',
        'class5_price',
    ],
    emits:[
        'class5_edit_start',
    ],
    components: {
        Content,
        IconButtonFocus,
    },
}
</script>

<style lang="scss" scoped>
.class5Menu--show{
    width: 100%;
    display: grid;
    grid-template-rows: 42px 42px;
    grid-template-columns: 83% 42px;
    grid-row-gap: 5px;
    grid-column-gap: calc(100% - 83% - 42px);
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: $text-primary;
    background-color: $bg-focus;
}
.right_center{
    grid-row: 1 / 3;
    grid-column: 2;
}
</style>