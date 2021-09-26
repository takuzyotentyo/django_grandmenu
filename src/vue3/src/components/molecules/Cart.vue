<template>
        <div class="cart icon--cart" @click='lightBoxShow("Cart")'>
            <span class="cart__ball" :class="{'active': cart_ball.isActive}" :style="cart_ball_style"></span>
            <div class="cart__quantity">10</div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    data: () =>{
        return{
            cartBallIsActive: '',
        }
    },
    computed: {
        ...mapGetters([ 'lightBox', 'cart_ball' ]),
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
    methods: {
        ...mapActions([ 'lightBoxShow' ]),
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
        line-height: 20px;
        font-size: 1.0rem;
        background-color: $bg-danger;
        color: $text-primary;
    }
    &__ball{
        position: fixed;
        // display: none;
        background-color: $bg-focus;
        width: 30px;
        height: 30px;
        left: var(--cart_ball_positionX);
        top: var(--cart_ball_positionY);
        transition: all 0s;
        &.active{
            // display: inline;
            background-color: $bg-danger;
            left: calc(97vw - 20px);
            top: 5px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            transition: all .5s ease-out;
        }
    }
}
</style>