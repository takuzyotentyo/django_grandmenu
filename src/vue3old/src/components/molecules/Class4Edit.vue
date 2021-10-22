<template>
    <li class="class4--edit">
        <Textbox
            :model-value="class4_name"
            @update:model-value="$emit('update:class4_name', $event)"
        />
        <IconButton class="icon--check" @click="$emit('class4_update', {index: class4_index, name: class4_name})"/>
        <IconButtonDanger class="icon--delete bottom_center" @click="$emit('class4_delete', {index: class4_index, name: class4_name})"/>
    </li>
</template>
<script>
import Textbox from "../atoms/Textbox"
import IconButton from "../atoms/IconButton"
import IconButtonDanger from "../atoms/IconButtonDanger"

export default {
    props: [
        'class4_index',
        'class4_name',
    ],
    emits:[
        'update:class5_name',
        'update:class5_price',
        'class4_update',
        'class4_delete',
    ],
    components: {
        Textbox,
        IconButton,
        IconButtonDanger,
    },
}
</script>

<style lang="scss" scoped>
.class4--edit{
    width: 100%;
    display: grid;
    grid-template-rows: 42px 42px;
    grid-template-columns: calc((100% - 42px) / 2 ) 42px 1fr 2% 42px;
    grid-row-gap: 5px;
    &>:nth-child(odd){
        grid-column: 1 / 4;
    }
    &>:nth-child(even){
        grid-column: 5;
    }
    &>.icon--delete{
        grid-column: 2;
    }
}
.bottom_center{
    grid-row: 2;
    grid-column: 1 / 3;
}
</style>