<template>
    <li class="class4--drug">
        <Content @click="$emit('class5Show', class4_index)">{{ class4_name }}</Content>
        <IconButton class="icon--handle" @mousedown="$emit('class5Hidden')" @touchstart="$emit('class5Hidden')"/>
    </li>

</template>
<script>
import Content from "../atoms/Content"
import IconButton from "../atoms/IconButton"

export default {
    props: [
        'class4_index',
        'class4_name',
    ],
    emits: [
        'class4_edit_start',
        'class5Show',
    ],
    components: {
        Content,
        IconButton,
    },
}
</script>

<style lang="scss" scoped>
.class4--drug{
    width: 100%;
    display: grid;
    grid-template-rows: 42px;
    grid-template-columns: 83% 42px;
    grid-column-gap: calc(100% - 83% - 42px);
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: $text-primary;
    background-color: $bg-primary;
    border-radius: 5px;
}
</style>