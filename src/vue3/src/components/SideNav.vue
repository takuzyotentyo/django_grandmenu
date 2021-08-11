<template>
  <nav class="side_nav" v-bind:class="{ active: sideNav }">
    <li class="side_nav_1" @click="toggleMenu1" :class="{'active': sideNav1Menu1}">
        <div class="side_nav_1__content">オーダーシステム</div>
        <div class="side_nav_1__to_class2" :class="{'active': sideNav1Menu1}">
            <span></span>
            <span></span>
        </div>
    </li>
    <transition name="slideDown">
      <ul class="side_nav_2" v-if="sideNav1Menu1" mode="out-in">
        <router-link class="side_nav_2__content" to='/menulist'>メニュー表</router-link>
        <router-link class="side_nav_2__content" to='/ordermanagement'>注文管理</router-link>
        <router-link class="side_nav_2__content" to='/viewcontrol'>見た目を変える</router-link>
      </ul>
    </transition>
    <li class="side_nav_1" @click="toggleMenu2" :class="{'active': sideNav1Menu2}">
        <div class="side_nav_1__content">管理メニュー</div>
        <div class="side_nav_1__to_class2" :class="{'active': sideNav1Menu2}">
            <span></span>
            <span></span>
        </div>
    </li>
    <transition name="slideDown">
      <ul class="side_nav_2" v-if="sideNav1Menu2" mode="out-in">
        <router-link class="side_nav_2__content" to='/storeinformation'>店舗情報</router-link>
        <router-link class="side_nav_2__content" to='/staffinformation'>従業員情報</router-link>
        <router-link class="side_nav_2__content" to='/storeanalytics'>売り上げ管理</router-link>
      </ul>
    </transition>
    <a class="side_nav__logout">ログアウト</a>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
    data: () => {
        return {
            sideNav1Menu1: false,
            sideNav1Menu2: false,
            }
    },
    computed: {
        ...mapGetters(['sideNav']),
    },
    methods: {
        ...mapActions([ 'sideNavShow' ]),
        toggleMenu1(){
            this.sideNav1Menu1 = !this.sideNav1Menu1
        },
        toggleMenu2(){
            this.sideNav1Menu2 = !this.sideNav1Menu2
        },
        mobileSideNavShow(){
            const windowsize = window.innerWidth;
            if(windowsize < 767){
                this.sideNavShow();
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.side_nav{
    position: absolute;
    width: 25vw;
    height: calc(100vh - 50px);
    left: -100%;
    background-color: $bg-primary;
    line-height: 50px;
    transition: all $animation-time;
    font-size: 1.6rem;
    color: $text-primary;
    filter: $drop-shadow;
    z-index: 999;
    @include mq('tb'){
        width: 50vw;
    }
    @include mq('sp'){
        width: 100vw;
    }
    &.active{
        left: 0;
    }
}

.side_nav_1{
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 3vw;
    transition: all $animation-time;
    &.active{
        background-color: $bg-focus;
    }
    &__content{
        width: calc(100% - 20px)
    }
    &__to_class2{
        position: relative;
        width: 20px;
        height: 20px;
    }
    &__to_class2 > span {
        position: absolute;
        top: calc(50% + 1px);
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background-color: $text-primary;
        transition: all $animation-time;
    }
    &__to_class2 > span:nth-child(1) {
        transform: translateY(-100%);
    }

    &__to_class2 > span:nth-child(2) {
        transform: translateY(-100%) rotate(90deg);
    }

    &__to_class2.active > span:nth-child(2){
        opacity: 0;
        transform: rotate(-90deg);
    }
}

.side_nav_2{
  width: 100%;
  overflow: hidden;
  height: 150px;
  &__content{
    width: calc(100% - 6vw);
    display: block;
    padding: 0 3vw;
  }
}

.slideDown-enter-to, .slideDown-leave-from {
  transition: all $animation-time;
}
.slideDown-enter-from, .slideDown-leave-to {
  transition: all $animation-time;
  height: 0;
}

.side_nav__logout{
    padding: 0 3vw;
}
</style>
