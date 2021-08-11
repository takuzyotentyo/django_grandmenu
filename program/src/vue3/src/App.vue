<template>
  <Header/>
  <SideNav/>
  <Main/>
</template>

<script>
import Header from './components/Header.vue'
import SideNav from './components/SideNav.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Header, SideNav, Main
  },
  mounted: function() {
    const store_information = this.$store_information
    const store = this.$store

    store_information.onopen = async function(){
      console.log('onopen')
      const store_id = 1
      const message = JSON.stringify({
        'action': 'read',
        'store_id': store_id
      })
      await store_information.send(message)
    };

    store_information.onmessage = function(e) {
      console.log('onmessage')
      const store_information = JSON.parse(e.data);
      store.dispatch('storeInformation_read', store_information)
    };
  },
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

  --bg-primary: rgb(240, 165, 0);
  --bg-secondary: rgb(248, 249, 250);
  --bg-focus: rgb(52, 58, 64);
  --bg-success: rgb(122, 179, 0);
  --bg-danger: rgb(220, 53, 69);
  --bg-warning: rgb(255, 193, 7);
  --bg-info: rgb(23, 162, 184);
  --bg-transparent: transparent;
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
  &--add{
      background: url('/static/img/add.svg');
      background-size: cover;
  }
}

// textbox type=numberでスピンボタンを非表示にする
input[type="number"]::-webkit-outer-spin-button, 
input[type="number"]::-webkit-inner-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
} 
input[type="number"] { 
  -moz-appearance:textfield; 
} 

</style>
