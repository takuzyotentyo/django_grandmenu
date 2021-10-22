<template>
    <p v-if="cartOrders == ''" class="cart__msg">カートに何も入っていません</p>
    <ListUpdate v-else class="cart__wrapper">
        <template v-for="(cartOrder, cartOrder_index) in cartOrders" :key="cartOrder_index">
            <CartShow
                class="cart__item"
                :class1="cartOrder.class1"
                :class2="cartOrder.class2"
                :class3="cartOrder.class3"
                :setmenu_values="cartOrder.setmenu_values"
                :quantity="cartOrder.quantity"
                :price="cartOrder.price"
                @quantityChange="quantityChange"
            />
        </template>
    </ListUpdate>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import CartShow from "../molecules/CartShow"
import ListUpdate from "../transition/ListUpdate"

export default {
    components: {
        CartShow,
        ListUpdate,
    },
    data(){
        return {
            animationTime: getComputedStyle(document.documentElement).getPropertyValue('--animation-time')
        }
    },
    watch: {
        lightBox:{
            handler(){
                if(this.lightBox == 'CartMenus'){
                    setTimeout(() => 
                        this.makePageCardGridLayout(),
                    this.animationTime)
                }
            },
        },
        cartOrders:{
            handler(){
                setTimeout(() => 
                    this.makePageCardGridLayout(),
                1)
            },
            deep: true,
            immediate: true,
        },
    },
    mounted: function () {
        window.addEventListener("resize", ()=>{
            let timeoutID = 0;
            let delay = 500;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(()=>{
                this.makePageCardGridLayout()
                console.log("delay");
    
            }, delay);
        }, false);
    },
    computed: {
        ...mapGetters([ 'cartOrders' ,'selectClass', 'lightBox']),
    },
    methods: {
        ...mapActions([ 'addCart', 'cartBallPositionUpdate' ]),
        quantityChange(event){
            console.log(event)
            this.addCart(event)
        },
        makePageCardGridLayout() {
            console.log('makePageCardGridLayout')
            let evenPosX = 0;
            let evenPosY = 0;
            let oddPosY = 0;
            const PosX = 0;
            let PosY = 0;
            let sh
            const marginBottom = 25
            const cart__items = document.getElementsByClassName('cart__item');
            if(cart__items.length > 0) {
                let gridWindow;
                for (let i = 0; i < cart__items.length; i++) {
                    i == 0 ? gridWindow = cart__items[0].closest('.cart__wrapper') : i; // Gridの親要素を取得します
                    if (window.matchMedia('(max-width: 959px)').matches) {
                        console.log('under 959px')
                        cart__items[i].setAttribute("style", "transform: translateX(" + PosX + "px) translateY(" + PosY + "px)");  // スタイルに配置したい位置を記述します
                        PosY = PosY + cart__items[i].clientHeight + marginBottom;  // 今のY軸の位置に要素の高さを加算
                        console.log(PosY)
                        sh = PosY + 150
                        gridWindow.style.height = sh+'px'; // 計算した高さを親要素に指定します
                    } else {
                        const oddPosX = cart__items[0].clientWidth * 495 / 485;
                        if (i % 2 == 0) { // Gridに配置される偶数番目の要素に対する処理
                            cart__items[i].setAttribute("style", "transform: translateX("+ evenPosX +"px) translateY(" + evenPosY + "px)");  // スタイルに配置したい位置を記述します
                            evenPosY = evenPosY + cart__items[i].clientHeight + marginBottom;  // 今のY軸の位置に要素の高さを加算
                        } else if (i % 2 != 0) {  // Gridに配置される奇数番目の要素に対する処理
                            cart__items[i].setAttribute("style", "transform: translateX(" + oddPosX + "px) translateY(" + oddPosY + "px)");  // スタイルに配置したい位置を記述します
                            oddPosY = oddPosY + cart__items[i].clientHeight + marginBottom;  // 今のY軸の位置に要素の高さを加算
                        }
                        evenPosY > oddPosY ? sh = evenPosY + 150 : sh = oddPosY + 150; // 全部の要素が配置し終わったら、親要素の高さを設定するために計算します
                        gridWindow.style.height = sh+'px'; // 計算した高さを親要素に指定します
                    }
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.cart{
    &__wrapper{
        width: 100%;
        height: calc(100% - 65px);
        @include mq('tb'){
        }
        &::after{
            @include after;
        }
    }
    &__item{
        width: calc(48.5% - 10px);
        padding: 0 5px;
        position: absolute;
        @include mq('tb'){
            width: calc(98% - 10px);
        }
    }
    &__msg{
        font-size: 1.4rem;
        color: $text-primary;
        font-weight: bold;
    }
}

.ListUpdate-leave-active {
  transition: all $animation-time ease;
  position:absolute;
}
.ListUpdate-move {
  transition: transform $animation-time ease;
}
</style>