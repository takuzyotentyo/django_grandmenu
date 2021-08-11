<template>
    <div>
        <UpFade>
            <div class="lightbox__spacer" v-show="lightBox !=''" @click="lightBoxShow('')"/>
        </UpFade>
        <UpFade>
            <div class="lightbox" v-show="lightBox != ''">
                <keep-alive>
                    <component :is="lightBox"></component>
                </keep-alive>
                <div class="lightbox__back icon--cancel" @click="lightBoxShow('')"></div>
            </div>
        </UpFade>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
// import Class3 from './Class3.vue'
import CreateMenu from './CreateMenu.vue'
import UpFade from '../../transition/UpFade.vue'

export default {
    components: {
        // Class3,
        CreateMenu,
        UpFade,
    },
    computed: {
        ...mapGetters([ 'lightBox', 'subCategory'])
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
    padding: 50px 1% 0px 1%;
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
        box-sizing: border-box;
        position: fixed;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: $bg-danger;
        border: solid 7.5px $bg-danger;
        right: 2.5vw;
        top: 100px;
        filter: $drop-shadow;
        overflow: visible;
    }
}
</style>
