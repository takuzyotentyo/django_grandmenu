<template>
    <div class="class3--show">
        <Content>{{ class3_name }}</Content>
        <Content>¥ {{ class3_price }}</Content>
        <Content>数量</Content>
        <QuantitySelect v-model="quantity"></QuantitySelect>
        <IconButtonFocus class="icon--cart" @click="add_cart($event, {class3: class3_name, price: class3_price, quantity: quantity})"></IconButtonFocus>
        <!-- <Content>{{ class3_class4s }}</Content> -->
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
        // 'class3_class4s',
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
}
</script>

<style lang="scss" scoped>
.class3--show{
    width: 100%;
    display: grid;
    grid-auto-rows: 42px;
    grid-template-columns: 3px 1fr 40px 102px 30px 3px;
    grid-column-gap: 5px;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: $text-primary;
    background-color: $bg-primary;
    border-radius: 5px;
    &>:nth-child(1){
        grid-column: 2 / 6;
    }
    &>:nth-child(2){
        grid-column: 2;
    }
    &>:nth-child(3){
        grid-column: 3;
    }
    &>:nth-child(4){
        grid-column: 4;
    }
    &>:nth-child(5){
        grid-column: 5;
    }
    &>:nth-child(6){
        grid-column: 2 / 6;
    }
}
</style>