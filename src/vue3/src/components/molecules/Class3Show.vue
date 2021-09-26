<template>
    <div class="class3--show">
        <Content>{{ class3_name }}</Content>
        <Content>¥ {{ class3_price }}</Content>
        <Content>数量</Content>
        <QuantitySelect></QuantitySelect>
        <IconButtonFocus class="icon--cart" @click="addCart($event)"></IconButtonFocus>
    </div>

</template>
<script>
import { mapActions } from "vuex"
import Content from "../atoms/Content"
import IconButtonFocus from "../atoms/IconButtonFocus"
import QuantitySelect from "../molecules/QuantitySelect"

export default {
    props: [
        'class3_name',
        'class3_price',
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
        ...mapActions([ 'cartBallPositionUpdate' ]),
        addCart(event){
        console.log(event.pageX)
        console.log(event.pageY)
        console.log(event.offsetX)
        console.log(event.offsetY)
        this.cartBallPositionUpdate({x: event.pageX - event.offsetX, y: event.pageY - event.offsetY})
        }
    }
}
</script>

<style lang="scss" scoped>
.class3--show{
    width: 100%;
    display: grid;
    grid-template-rows: 42px 42px;
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
}
</style>