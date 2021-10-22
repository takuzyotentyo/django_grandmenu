<template>
    <div class="cart__show">
        <Content class="cart__name">{{ class3 }}</Content>
        <Content class="cart__price">¥ {{ price }}</Content>
        <Content class="cart__quantity_label">数量</Content>
        <QuantitySelect
            :model-value="quantity"
            @update:modelValue="$emit('quantityChange', {
                class1: class1,
                class2: class2,
                class3: class3,
                setmenu_values: setmenu_values,
                quantity: $event,
                price: price
            })"
            class="cart__quantity"
        />
    </div>

</template>
<script>
import Content from "../atoms/Content"
import QuantitySelect from "../molecules/QuantitySelect"

export default {
    data: () =>{
        return{
        }
    },
    props: [
        'class1',
        'class2',
        'class3',
        'setmenu_values',
        'quantity',
        'price',
    ],
    emits: [
        'quantityChange',
    ],
    components: {
        Content,
        QuantitySelect,
    },
    methods: {
        // quantityChange(event, menu){
        // console.log('class3Show')
        // console.log(event)
        // console.log(menu)
        // this.$emit('quantityChange', event , menu)
        // }
    },
    // mounted: function(){
    // }
}
</script>

<style lang="scss" scoped>
.cart{
    &__show{
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr 40px 102px;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: $text-primary;
    background-color: $bg-primary;
    border-radius: 5px;
    transition: all $animation-time;
    padding: 0 3px;
    }
    &__name{
        grid-column: 1 / 5;
        padding: auto 0;
    }
    &__price{
        grid-column: 1;
    }
    &__quantity_label{
        grid-column: 2;
    }
    &__quantity{
        grid-column: 3;
    }
    &__class4{
        grid-column: 1 / 5;
    }
}
</style>