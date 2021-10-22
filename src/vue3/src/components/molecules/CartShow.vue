<template>
    <div class="cart__show">
        <div class="cart__class2">{{ class2 }}</div>
        <Content class="cart__class3">{{ class3 }}</Content>
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
    },
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
    &__class2{
        position: absolute;
        padding: 3px;
        top: calc((-1.6rem - 6px) / 1.2);
        // width: auto;
        // height: auto;
        background-color: $bg-focus;
    }
    &__class3{
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