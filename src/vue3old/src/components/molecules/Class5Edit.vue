<template>
    <li class="class5--edit">
        <Textbox 
            :model-value="class5_name"
            @update:model-value="$emit('update:class5_name', $event)"
            
        />
        <IconButton
            class="icon--check"
            @click="$emit('class5_update', {class4_index: class4_index, class5_index: class5_index, name:class5_name, price:class5_price})"/>
        <TextboxNumber
            :model-value="class5_price"
            @update:model-value="$emit('update:class5_price', $event)"
        />
        <IconButtonDanger
            class="icon--delete"
            @click="class5_delete({class4_index: class4_index, class5_index: class5_index, name:class5_name})"
        />
    </li>
</template>
<script>
import Textbox from "../atoms/Textbox"
import TextboxNumber from "../atoms/TextboxNumber"
import IconButton from "../atoms/IconButton"
import IconButtonDanger from "../atoms/IconButtonDanger"

export default {
    props: [
        'class4_index',
        'class5_index',
        'class5_name',
        'class5_price',
    ],
    emits:[
        'update:class5_name',
        'update:class5_price',
        'class5_update',
        'class5_delete',
    ],
    components: {
        Textbox,
        TextboxNumber,
        IconButton,
        IconButtonDanger,
    },
}
</script>

<style lang="scss" scoped>
.class5--edit{
    width: 100%;
    display: grid;
    grid-template-rows: 42px 42px;
    grid-template-columns: 83% 42px;
    grid-row-gap: 5px;
    grid-column-gap: calc(100% - 83% - 42px);
}
</style>