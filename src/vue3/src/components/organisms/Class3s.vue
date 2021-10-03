<template>
    <div class="class3__wrapper">
      <template v-for="(class1, class1_index) in menuLists" :key="class1_index">
        <template v-for="(class2, class2_index) in class1.class2s" :key="class2_index">
            <template v-for="(class3, class3_index) in class2.class3s" :key="class3_index">
                <template v-if="selectClass.class1==class1.name && selectClass.class2==class2.name">
                    <!-- <Class3Show :class3_name="class3.name" :class3_price="class3.price" :class3_class4s="class3.class4s" @add_cart="add_cart"/> -->
                    <Class3Show :class3_name="class3.name" :class3_price="class3.price" @add_cart="add_cart"/>
                </template>
            </template>
        </template>
      </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Class3Show from "../molecules/Class3Show"

export default {
    components: {
        Class3Show,
    },
    data: () => {
    return {
        }
    },
    computed: {
        ...mapGetters([ 'menuLists' ,'selectClass']),
    },
    methods: {
        ...mapActions([ 'addCart', 'cartBallPositionUpdate' ]),
        add_cart(event, menu){
            const add_cart_menu = {
                class1: this.selectClass.class1,
                class2: this.selectClass.class2,
                class3: menu.class3,
                setmenu_values: [
                ],
                quantity: menu.quantity,
                price: menu.price,
            }
            console.log('add_cart_menu')
            console.log(add_cart_menu)
            const position_and_menu = {position: {x: event.pageX - event.offsetX, y: event.pageY - event.offsetY}, menu: add_cart_menu}
            this.cartBallPositionUpdate(position_and_menu)
        },
    },
}
</script>

<style lang="scss" scoped>
.class3__wrapper{
    width: 100%;
    height: calc(100% - 65px);
    display: grid;
    grid-template-columns: 49.5% 49.5%;
    grid-gap:5px 1%;
    @include mq('tb'){
        grid-template-columns: 100%;
    }
    &::after{
        @include after;
    }
}
</style>