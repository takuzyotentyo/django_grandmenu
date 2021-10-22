<template>
    <div class="class3__show">
        <img v-if="class4s.length!=0" class="class3__img" src="static/img/sample.svg">
        <Content class="class3__name">{{ class3 }}</Content>
        <Content class="class3__price">¥ {{ price }}</Content>
        <Content class="class3__quantity_label">数量</Content>
        <QuantitySelect :model-value="quantity" @update:modelValue="quantityChange" class="class3__quantity"></QuantitySelect>
        <IconButtonFocus class="icon--cart class3__cart" @click="add_cart($event, {class3: class3, price: price, quantity: quantity})"></IconButtonFocus>
        <Content v-if="class4s.length!=0" class="class3__class4">{{ class4s }}</Content>
    </div>

</template>
<script>
import Content from "../atoms/Content"
import IconButtonFocus from "../atoms/IconButtonFocus"
import QuantitySelect from "../molecules/QuantitySelect"

export default {
    data: () =>{
        return{
            quantity: 0,
        }
    },
    props: [
        'class3',
        'price',
        'class4s',
    ],
    emits: [
        'addCart',
    ],
    components: {
        Content,
        IconButtonFocus,
        QuantitySelect,
    },
    methods: {
        add_cart(event, menu){
        this.$emit('add_cart', event , menu)
        this.quantity = 0
        },
        quantityChange(event){
        if(this.quantity + event >= 0)
            this.quantity = this.quantity + event
        }
    },
    // mounted: function(){
    // }
}
</script>

<style lang="scss" scoped>
.class3{
    &__show{
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr 40px 102px 30px;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: $text-primary;
    background-color: $bg-primary;
    border-radius: 5px;
    transition: all $animation-time;
    }
    &__img{
        grid-column: 1 / 5;
        padding-top: 5px;
        width: calc(100%);
    }
    &__name{
        grid-column: 1 / 5;
    }
    &__price{
    }
    &__quantity_label{
    }
    &__quantity{
    }
    &__cart{
    }
    &__class4{
        grid-column: 1 / 5;
    }
}
</style>