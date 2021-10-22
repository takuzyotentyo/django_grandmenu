<template>
    <div class="class3__wrapper">
      <template v-for="(class1, class1_index) in menuLists" :key="class1_index">
        <template v-for="(class2, class2_index) in class1.class2s" :key="class2_index">
            <template v-for="(class3, class3_index) in class2.class3s" :key="class3_index">
                <template v-if="selectClass.class1==class1.name && selectClass.class2==class2.name">
                    <Class3Show
                    class="class3__item"
                    :class3="class3.name"
                    :price="class3.price"
                    :class4s="class3.class4s"
                    @add_cart="add_cart"
                />
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
        animationTime: getComputedStyle(document.documentElement).getPropertyValue('--animation-time')
        }
    },
    watch: {
        lightBox:{
            handler(){
                if (this.lightBox == 'Class3s'){
                    setTimeout(() => 
                        this.imgMountCheck(),
                    this.animationTime)
                }
            }
        },
        selectClass:{
            handler(){
                setTimeout(() => 
                    this.imgMountCheck(),
                this.animationTime)
            },
            deep: true,
            immediate: true,
        },
        sideNav:{
            handler(){
                setTimeout(() => 
                    this.imgMountCheck(),
                this.animationTime)
            },
            deep: true,
            immediate: true,
        },
        menuLists:{
            handler(){
                setTimeout(() => 
                    this.imgMountCheck(),
                this.animationTime)
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
    
            }, delay);
        }, false);
    },
    computed: {
        ...mapGetters([ 'menuLists' ,'selectClass', 'sideNav', 'lightBox']),
    },
    methods: {
        ...mapActions([ 'addCart', 'cartBallPositionUpdate' ]),
        add_cart(event, menu){
            const add_cart_menu = {
                class1: this.selectClass.class1,
                class2: this.selectClass.class2,
                class3: menu.class3,
                setmenu_values: [],
                quantity: menu.quantity,
                price: menu.price,
            }
            const position_and_menu = {position: {x: event.pageX - event.offsetX, y: event.pageY - event.offsetY}, menu: add_cart_menu}
            this.cartBallPositionUpdate(position_and_menu)
        },
        imgMountCheck(){
            const images = document.querySelectorAll('img');
            let loadCnt = 0;
            if (images.length > 0) {
                for (const img of images) {
                    let image = new Image();
                    image.src = img.src;
                    image.addEventListener('load', () => {
                        loadCnt++;
                        if (loadCnt == images.length) {  // 画像が全部読み込まれたか判定しています
                            this.makePageCardGridLayout();  // この後、このメソッドの中身を書きます
                        }
                    })
                }
            }else{
                this.makePageCardGridLayout()
            }
        },
        makePageCardGridLayout() {
            console.log('makePageCardGridLayout')
            let evenPosX = 0;
            let evenPosY = 0;
            let oddPosY = 0;
            const PosX = 0;
            let PosY = 0;
            let sh
            const marginBottom = 10
            const class3__items = document.getElementsByClassName('class3__item');
            if(class3__items.length > 0) {
                let gridWindow;
                for (let i = 0; i < class3__items.length; i++) {
                    i == 0 ? gridWindow = class3__items[0].closest('.class3__wrapper') : i; // Gridの親要素を取得します
                    if (window.matchMedia('(max-width: 959px)').matches) {
                        console.log('under 959px')
                        class3__items[i].setAttribute("style", "transform: translateX(" + PosX + "px) translateY(" + PosY + "px)");  // スタイルに配置したい位置を記述します
                        PosY = PosY + class3__items[i].clientHeight + marginBottom;  // 今のY軸の位置に要素の高さを加算
                        console.log(PosY)
                        sh = PosY + 150
                        gridWindow.style.height = sh+'px'; // 計算した高さを親要素に指定します
                    } else {
                        const oddPosX = class3__items[0].clientWidth * 495 / 485;
                        if (i % 2 == 0) { // Gridに配置される偶数番目の要素に対する処理
                            class3__items[i].setAttribute("style", "transform: translateX("+ evenPosX +"px) translateY(" + evenPosY + "px)");  // スタイルに配置したい位置を記述します
                            evenPosY = evenPosY + class3__items[i].clientHeight + marginBottom;  // 今のY軸の位置に要素の高さを加算
                        } else if (i % 2 != 0) {  // Gridに配置される奇数番目の要素に対する処理
                            class3__items[i].setAttribute("style", "transform: translateX(" + oddPosX + "px) translateY(" + oddPosY + "px)");  // スタイルに配置したい位置を記述します
                            oddPosY = oddPosY + class3__items[i].clientHeight + marginBottom;  // 今のY軸の位置に要素の高さを加算
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
.class3{
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
        position: absolute;
        margin-bottom: 10px;
        padding: 0 5px;
        @include mq('tb'){
            width: calc(98% - 10px);
        }
    }
}
</style>