<template>
    <div>
        <UpFade>
            <div class="lightbox__spacer" v-show="lightBox !=''" @click="lightBoxShow('')"/>
        </UpFade>
        <UpFade>
            <div class="lightbox" :class="{ active: sideNav }" v-show="lightBox != ''">
                <keep-alive>
                    <component :is="lightBox"></component>
                </keep-alive>
            </div>
        </UpFade>
        <UpFade>
            <div class="lightbox__back icon--cancel" @click="lightBoxShow('')" v-show="lightBox != ''"></div>
        </UpFade>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Class3s from '../organisms/Class3s.vue'
import CartMenus from '../organisms/CartMenus.vue'
import CreateMenu from '../templates/CreateMenu.vue'
import TableInvitation from '../templates/TableInvitation.vue'
import UpFade from '../transition/UpFade.vue'

export default {
    components: {
        Class3s,
        CartMenus,
        CreateMenu,
        UpFade,
        TableInvitation,
    },
    computed: {
        ...mapGetters([ 'lightBox', 'sideNav'])
    },
    methods: {
        ...mapActions([ 'lightBoxShow' ]),
    },
}
</script>

<style lang='scss' scoped>
.lightbox{
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100% - 60px);
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 42px 1% 0px 1%;
    border-radius: 10px 10px 0 0;
    background-color: $bg-focus-opacity;
    overflow-y:scroll;
    padding-bottom: 100px;
    &__spacer{
        position: absolute;
        width:100%;
        height: 100%;
        right: 0;
        bottom: 0;
    }
    &__back{
        // box-sizing: border-box;
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: $bg-danger;
        right: 2.5vw;
        top: 45px;
        filter: $drop-shadow;
    }
}
</style>
