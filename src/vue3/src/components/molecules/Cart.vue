<template>
        <div class="cart icon--cart" @click='lightBoxShow("Cart")'>
            <span class="cart__ball" :class="{'active': cart_ball.isActive}" :style="cart_ball_style"></span>
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
        ...mapGetters([ 'lightBox', 'cart_ball', 'cart_orders' ]),
        cart_ball_style() {
            if (this.cart_ball.x=="" && this.cart_ball.y==""){
                return {
                    '--cart_ball_positionX' : "calc(97vw - 20px)",
                    '--cart_ball_positionY' : "5px",
                }
            }else{
                return {
                    '--cart_ball_positionX' : this.cart_ball.x + "px",
                    '--cart_ball_positionY' : this.cart_ball.y + "px",
                }
            }
        },
    },
    watch: {
            cart_orders:{
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
            console.log(this.cart_orders)
            const total_quantity = this.cart_orders.reduce((total ,element) => total + element.quantity, 0)
            console.log(total_quantity)
            this.total_quantity = total_quantity
        }
    }
}
</script>

<style lang="scss" scoped>
.cart{
    position: absolute;
    width: 50px;
    height: 50px;
    right: 3vw;
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
        border-radius:5px;
        background-color: $bg-focus;
        width: 30px;
        height: 30px;
        left: var(--cart_ball_positionX);
        top: var(--cart_ball_positionY);
        transition: all 0s;
        &.active{
            background-color: $bg-danger;
            left: calc(97vw - 20px);
            top: 5px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            transition: all .6s ease-in-out;
        }
    }
}
</style>