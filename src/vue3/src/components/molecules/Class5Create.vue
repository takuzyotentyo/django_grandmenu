<template>
    <li class="class5--create">
        <Textbox
            class="item1"
            placeholder="セットメニューの内容" 
            :model-value="class5_name"
            @update:model-value="$emit('update:class5_name', $event)"
            required
        />
        <IconButtonDanger
            class="icon--delete item2"
            @click="$emit('deleteClass5', class5_index)"
        />
        <Selectbox
            class="item3"        
            :model-value="class5_price_type"
            @update:model-value="$emit('update:class5_price_type', $event)"
            @change="$emit('noAdditionalPrice', class5_index)"
            :selectBoxOptions="selectBoxOptions"
            required
        />
        <TextboxNumber 
            class="item4"
            :model-value="class5_price"
            @update:model-value="$emit('update:class5_price', $event)"
            :disabled="class5_price_type == 'no_additional_price'? true : false "
            placeholder="料金"
            required
        />
    </li>
</template>
<script>
import Textbox from "../atoms/Textbox"
import TextboxNumber from "../atoms/TextboxNumber"
import Selectbox from "../atoms/Selectbox"
import IconButtonDanger from "../atoms/IconButtonDanger"

export default {
    props: [
        'class5_index',
        'class5_name',
        'class5_price',
        'class5_price_type',
        'selectBoxOptions',
    ],
    emits: [
        'update:class5_name',
        'update:class5_price',
        'update:class5_price_type',
        'deleteClass5',
        'noAdditionalPrice'
    ],
    components: {
        Textbox,
        TextboxNumber,
        Selectbox,
        IconButtonDanger,
    },
}
</script>

<style lang="scss" scoped>
.class5--create{
    width: 100%;
    display: grid;
    grid-template-rows: 42px 42px;
    grid-template-columns: 49% 1% 1% 32% 1fr 42px;
    grid-row-gap: 5px;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    border-radius: 5px;
}
.item1{
    grid-column: 1 / 5;
}
.item2{
    grid-column: 6;
}
.item3{
    grid-column: 1;
}
.item4{
    grid-column: 4 / 7;
}
</style>