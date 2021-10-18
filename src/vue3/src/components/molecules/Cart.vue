<template>
        <div class="cart icon--cart" @click='lightBoxShow("CartMenus")'>
            <span class="cart__ball" :class="{'active': cartBall.isActive}" :style="cart_ball_style"></span>
            <div class="cart__quantity">{{ total_quantity }}</div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    data: () =>{
        return{
            total_quantity:"",
        }
    },
    computed: {
        ...mapGetters([ 'lightBox', 'cartBall', 'cartOrders' ]),
        cart_ball_style() {
            return {
                '--cart_ball_positionX' : this.cartBall.x + "px",
                '--cart_ball_positionY' : this.cartBall.y + "px",
            }
        },
    },
    watch: {
            cartOrders:{
                handler(){
                    this.total_quantity_count()
                },
                deep: true,
                immediate: true,
            }
        },
    methods: {
        ...mapActions([ 'lightBoxShow' ]),
        total_quantity_count(){
            const total_quantity = this.cartOrders.reduce((total ,element) => total + element.quantity, 0)
            this.total_quantity = total_quantity
        },
        keyAction(e) {
            if (e.keyCode == 67 && e.altKey == true) {
                this.lightBoxShow('CartMenus')
            }
        },
    },
    created() {
        //キーコードによる動作の登録
        window.addEventListener("keydown", this.keyAction);
    },
    beforeUnmount() {
        //キーコードによる動作の削除
        window.removeEventListener("keydown", this.keyAction);
    },
}
</script>

<style lang="scss" scoped>
.cart{
    position: absolute;
    width: 50px;
    height: 50px;
    right: 3vw;
    top: 0px;
    &__quantity{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        right: 0px;
        top: 5px;
        line-height: 21px;
        font-size: 1.2rem;
        background-color: $bg-danger;
        color: $text-primary;
    }
    &__ball{
        position: fixed;
        left: calc(97vw - 20px);
        top: 5px;
        background-color: $bg-danger;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        transition: all .6s ease-in-out;
        &.active{
            position: fixed;
            background-color: $bg-focus;
            width: 30px;
            height: 30px;
            border-radius:5px;
            left: var(--cart_ball_positionX);
            top: var(--cart_ball_positionY);
            // left: calc(97vw - 20px);
            // top: 5px;
            transition: all 0s;
        }
    }
}
</style>