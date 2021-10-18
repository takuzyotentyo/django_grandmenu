<template>
    <div class="quantity_select">
        <IconButtonFocus class="icon--increase" @click="quantityChange(1)"></IconButtonFocus>
        <Textbox :value="modelValue" class='text_align' disabled></Textbox>
        <IconButtonFocus class="icon--decrease" @click="quantityChange(-1)"></IconButtonFocus>
    </div>

</template>
<script>
import IconButtonFocus from "../atoms/IconButtonFocus"
import Textbox from "../atoms/Textbox"

export default {
    props: [
        'modelValue'
        ],
    emits:[
        'update:modelValue'
        ],
    components: {
        IconButtonFocus,
        Textbox,
    },
    methods:{
        quantityChange(quantity){
            this.$emit('update:modelValue', quantity)
        },
    }
}
</script>

<style lang="scss" scoped>
.quantity_select{
    width: 100%;
    display: grid;
    grid-template-rows: 42px;
    grid-template-columns: 30px 42px 30px;
    align-items: center;
    font-size: 1.4rem;
    >.text_align{
        padding: 0px;
        text-align: center;
    }
}
</style>