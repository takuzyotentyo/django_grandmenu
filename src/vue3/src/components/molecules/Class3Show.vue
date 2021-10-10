<template>
    <div class="class3--show">
        <img v-if="class3_class4s.length!=0" class="class3--img" src="static/img/sample.svg">
        <Content class="class3--name">{{ class3_name }}</Content>
        <Content class="class3--price">¥ {{ class3_price }}</Content>
        <Content class="class3--quantity_label">数量</Content>
        <QuantitySelect v-model="quantity" class="class3--quantity"></QuantitySelect>
        <IconButtonFocus class="icon--cart class3--cart" @click="add_cart($event, {class3: class3_name, price: class3_price, quantity: quantity})"></IconButtonFocus>
        <Content v-if="class3_class4s.length!=0" class="class3--class4">{{ class3_class4s }}</Content>
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
        'class3_name',
        'class3_price',
        'class3_class4s',
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
        console.log('class3Show')
        console.log(event)
        this.$emit('add_cart', event , menu)
        this.quantity = 0
        }
    },
    // mounted: function(){
    // }
}
</script>

<style lang="scss" scoped>
.class3{
    &--show{
    width: 100%;
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 3px 1fr 40px 102px 30px 3px;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: $text-primary;
    background-color: $bg-primary;
    border-radius: 5px;
    transition: all $animation-time;
    }
    &--img{
        grid-column: 2 / 6;
        padding-top: 10px;
        width: calc(100%);
    }
    &--name{
        grid-column: 2 / 6;
    }
    &--price{
        grid-column: 2;
    }
    &--quantity_label{
        grid-column: 3;
    }
    &--quantity{
        grid-column: 4;
    }
    &--cart{
        grid-column: 5;
    }
    &--class4{
        grid-column: 2 / 6;
    }
}
</style>