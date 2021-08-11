<template>
    <div class="menu_controller__wrapper">
        <LeftFade>
            <div class="menu_controller" v-show="MenuController == true">
                <div class="menu_controller__content" @click="lightBoxShow('CreateMenu'); MenuControllerShow()">
                    <span class='menu_controller__icon icon--create'></span>
                    <span class='menu_controller__name'>メニュー作成</span>
                </div>
                <div class="menu_controller__content" @click="lightBoxShow('')">
                    <span class='menu_controller__icon icon--delete'></span>
                    <span class='menu_controller__name'>メニュー削除</span>
                </div>
                <div class="menu_controller__content" @click="lightBoxShow('')">
                    <span class='menu_controller__icon icon--sort'></span>
                    <span class='menu_controller__name'>メニュー並べ替え</span>
                </div>
                <div class="menu_controller__content" @click="lightBoxShow('OrderHistory')">
                    <span class='menu_controller__icon icon--history'></span>
                    <span class='menu_controller__name'>注文履歴</span>
                </div>
                <div class="menu_controller__content" @click="lightBoxShow('TableInvitation')">
                    <span class='menu_controller__icon icon--invitation'></span>
                    <span class='menu_controller__name'>招待</span>
                </div>
            </div>
        </LeftFade>
        <div class="menu_controller__button" v-bind:class="{ active: MenuController }" @click="MenuControllerShow()">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import LeftFade from "../../transition/LeftFade.vue"
export default {
    data: () => {
        return {
            MenuController: false,
        }
    },
    components: {
        LeftFade,
    },
    computed: {
        ...mapGetters([ 'lightBox' ])
    },
    methods: {
        ...mapActions([ 'lightBoxShow' ]),
        MenuControllerShow(){
                this.MenuController = !this.MenuController
        },
    },
}
</script>

<style lang="scss" scoped>
.menu_controller{
    border-radius: 10px 0 0 10px;
    margin-bottom: 10px;
    background-color: $bg-primary;
    filter: $drop-shadow;
    &__wrapper{
        position: absolute;
        bottom: 50px;
        right: 0;
    }
    &__button{
        box-sizing: border-box;
        margin: 0 0 0 auto;
        right: 0px;
        bottom: 50px;
        width: 70px;
        height: 40px;
        padding-top:10px;
        padding-left:20px;
        padding-bottom:10px;
        border-radius: 20px 0 0 20px;
        background-color: $bg-primary;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        filter: $drop-shadow;
        & > span {
            width: 20px;
            height: 2px;
            border-radius: 1px;
            background-color: $text-primary;
            transform: rotate(0deg);
            transition: .4s ease-in-out;
        }
        &.active > span{
            &:nth-child(1){
                transform: translateY(9px) rotate(135deg);
            }
            &:nth-child(2){
                opacity: 0;
                transform: translateX(20px);
            }
            &:nth-child(3){
                transform: translateY(-9px) rotate(-135deg);
            }
        }
    }
    &__content{
        color: $text-primary;
        height: 50px;
        font-size: 16px;
        display: flex;
    }
    &__icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: auto 10px auto 12px;
    }
    &__name{
        width: 150px;
        line-height: 50px;
    }
}
</style>