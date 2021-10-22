<template>
    <nav class="menu_controller__wrapper">
        <LeftFade>
            <ul class="menu_controller" v-show="isShow == true">
                <ControllerContents
                    v-for="(content, index) in contents"
                    @click="isShow = content.isShow , lightBoxShow(content.url)"
                    :key="index"
                    :content="content.content"
                    :img="content.img"
                    :url="content.url"/>
            </ul>
        </LeftFade>
        <ControllerButton :isShow="isShow" @click="isShow = !isShow"/>
    </nav>
</template>

<script>
import { mapActions } from "vuex"
import LeftFade from "../transition/LeftFade.vue"
import ControllerButton from '../molecules/ControllerButton.vue'
import ControllerContents from '../molecules/ControllerContents.vue'

export default {
    data: () => {
        return {
            isShow: false,
            contents:[
                {content: 'メニュー作成', img: 'icon--create', url: "CreateMenu", isShow: false},
                {content: 'メニュー削除', img: 'icon--delete', url: "", isShow: true},
                {content: 'メニュー並べ替え', img: 'icon--sort', url: "", isShow: true},
                {content: '注文履歴', img: 'icon--history', url: "OrderHistory", isShow: false},
                {content: 'テーブルに招待', img: 'icon--invitation', url: "TableInvitation", isShow: false},
            ]
        }
    },
    components: {
        LeftFade,
        ControllerButton,
        ControllerContents,
    },
    methods: {
        ...mapActions([ 'lightBoxShow' ]),
        keyAction(e) {
            if (e.keyCode == 77 && e.altKey == true) {
                this.isShow = !this.isShow
            }else if(e.keyCode==49 && e.altKey == true){
                this.lightBoxShow('CreateMenu')
            }else if(e.keyCode==50 && e.altKey == true){
                this.lightBoxShow('')
            }else if(e.keyCode==51 && e.altKey == true){
                this.lightBoxShow('')
            }else if(e.keyCode==52 && e.altKey == true){
                this.lightBoxShow('OrderHistory')
            }else if(e.keyCode==53 && e.altKey == true){
                this.lightBoxShow('TableInvitation')
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
.menu_controller{
    border-radius: 10px 0 0 10px;
    margin-bottom: 10px;
    background-color: $bg-primary;
    filter: $drop-shadow;
    &__wrapper{
        position: absolute;
        width:190px;
        bottom: 75px;
        right: 0;
    }
}
</style>