<template>
  <TheHeader/>
  <TheSideNav/>
  <TheMain/>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheSideNav from './components/TheSideNav.vue'
import TheMain from './components/TheMain.vue'
import { mapActions } from "vuex"

export default {
  name: 'App',
  components: {
    TheHeader, TheSideNav, TheMain
  },
  mounted: function() {
    console.log('app.vue mounted')
    this.storeInformation_read()
    console.log('storeInformation_read')

    // websocketの残骸
    // const store_information = this.$store_information
    // const store = this.$store

    // store_information.onopen = async function(){
    //   console.log('onopen')
    //   const store_id = 1
    //   const message = JSON.stringify({
    //     'action': 'read',
    //     'store_id': store_id
    //   })
      // await store_information.send(message)

    // };

    // store_information.onmessage = function(e) {
    //   console.log('onmessage')
    //   const store_information = JSON.parse(e.data);
      // store.dispatch('storeInformation_read', store_information)
    // };

    // 画面サイズが変更された際の補正
    let height = window.innerHeight;
    document.documentElement.style.setProperty( '--main-height', height + 'px');
    window.onresize = () => { 
      height = window.innerHeight;
      document.documentElement.style.setProperty( '--main-height', height + 'px');
     };
    // スマホのダブルタップで画面が大きくなるのを制限
    document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });
  },
  methods: {
    ...mapActions([ 'storeInformation_read' ]),
  }
}
</script>

<style lang="scss">
#app{
  width: 100vw;
  height: calc(100vh - 50px);
  padding-top: 50px;
  flex-wrap: wrap;
  display: flex;
}
:root {
  --text-primary: rgb(248, 249, 250);
  --text-secondary: rgb(0,0,0);
  --text-disabled: rgb(117, 117, 117);;

  --bg-primary: rgb(240, 165, 0);
  --bg-secondary: rgb(248, 249, 250);
  --bg-focus: rgb(52, 58, 64);
  --bg-success: rgb(122, 179, 0);
  --bg-danger: rgb(220, 53, 69);
  --bg-warning: rgb(255, 193, 7);
  --bg-info: rgb(23, 162, 184);
  --bg-disabled: rgb(225, 225, 225);
  --bg-transparent: transparent;

  --bg-primary-opacity: rgba(240, 165, 0, .6);
  --bg-secondary-opacity: rgba(248, 249, 250, .6);
  --bg-focus-opacity: rgba(52, 58, 64, .6);
  --bg-success-opacity: rgba(122, 179, 0, .6);
  --bg-danger-opacity: rgba(220, 53, 69, .6);
  --bg-warning-opacity: rgba(255, 193, 7, .6);
  --bg-disabled-opacity: rgba(225, 225, 225, .6);
  --bg-info-opacity: rgba(23, 162, 184, .6);

  --animation-time: .2s;
  --drop-shadow: drop-shadow(0 0 2px var(--bg-focus));
  --main-height: 100vh;
}
.icon{
  &--cart{
      background: url('/static/img/cart.svg');
      background-size: cover;
  }
  &--cancel{
      background: url('/static/img/cancel.svg');
      background-size: cover;
  }
  &--create{
      background: url('/static/img/create.svg');
      background-size: cover;
  }
  &--delete{
      background: url('/static/img/delete.svg');
      background-size: cover;
  }
  &--sort{
      background: url('/static/img/sort.svg');
      background-size: cover;
  }
  &--history{
      background: url('/static/img/history.svg');
      background-size: cover;
  }
  &--invitation{
      background: url('/static/img/invitation.svg');
      background-size: cover;
  }
  &--increase{
      background: url('/static/img/increase.svg');
      background-size: cover;
  }
  &--decrease{
      background: url('/static/img/decrease.svg');
      background-size: cover;
  }
  &--search{
    background: url('/static/img/search.svg');
    background-size: cover;
  }
  &--handle{
    background: url('/static/img/handle.svg');
    background-size: cover;
  }
  &--check{
    background: url('/static/img/check.svg');
    background-size: cover;
  }
  &--sumple{
    background: url('/static/img/sumple.svg');
    background-size: cover;
  }
}

</style>
