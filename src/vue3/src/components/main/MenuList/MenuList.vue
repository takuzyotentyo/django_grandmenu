<template>
  <div class="menu_list">
    <div class="radio_button__unit" :class="{'blur': lightBox !=''}">
      <template v-for="(class1, class1_index) in menuLists" :key=class1_index>
        <input type="radio" :id="class1.name+'_menu'" name="food_or_drink" class="radio_button" @change="selectClass1Update(class1_index)" :checked="selectClass.class1==class1_index ? true : false">
        <label :for="class1.name+'_menu'" class="radio_button__label" >{{ class1.name }}</label>
      </template>
    </div>
    
    <UpFade>
      <template v-for="(class1, class1_index) in menuLists" :key="class1_index">
        <div v-if="selectClass.class1==0" class="class2__wrapper" :class="{'blur': lightBox !=''}">
            <li v-for="(class2, class2_index) in menuLists[0].class2s" :key="class2_index" class="class2" @click="selectClass2(class2_index)">
                {{ class2.name }}
            </li>
        </div>
        <div v-else-if="selectClass.class1==1" class="class2__wrapper" :class="{'blur': lightBox !=''}">
            <li v-for="(class2, class2_index) in menuLists[1].class2s" :key="class2_index" class="class2" @click="selectClass2(class2_index)">
                {{ class2.name }}
            </li>
        </div>
      </template>
    </UpFade>

    <Lightbox></Lightbox>
    <MenuController></MenuController>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import Lightbox from '../Lightbox/Lightbox.vue'
import MenuController from './MenuController.vue'
import UpFade from '../../transition/UpFade.vue'

export default {
    components: {
      Lightbox,
      MenuController,
      UpFade
      },
    computed: {
        ...mapGetters([ 'menuLists' ,'setMenuLists','selectClass', 'lightBox']),
    },
    methods: {
        ...mapActions([ 'selectClass1Update', 'selectClass2Update', 'lightBoxShow' ]),
        selectClass2(){
            const newClass2 = event.target.getAttribute('value')
            this.selectClass2Update(newClass2)
            this.lightBoxShow('Class3')
        },
    },
    created() {
    },
}
</script>

<style lang="scss" scoped>
.menu_list{
    width: 98%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.radio_button{
    @include radio_button;
    &__unit{
        @include radio_button__unit;
    }
    &__label{
        @include radio_button__label;
    }
    &:checked + label{
        @include radio_button__checked;
    }
}
.class2{
    @include list_object($width:49.5%);
    @include mq('tb'){
        min-width: calc(98vw - 100%);
    }
    @include mq('sp'){
        width: 100%;
    }
    &__wrapper{
      width: 100%;
      height: calc(100% - 65px);
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      align-content: flex-start;
    }
}
.blur{
    filter: blur(2px);
}
</style>