<template>
  <div class="menu_list">
    <RadioButton :modelValue="selectClass.class1" @change="selectClass1Update($event.target.value)" :radioButtonOptions="radioButtonClass1" :class="{'blur': lightBox !=''}"/>
    <UpFade>
      <template v-for="(class1, class1_index) in menuLists" :key="class1_index">
        <div v-if="selectClass.class1=='food'" class="class2__wrapper" :class="{'blur': lightBox !=''}">
            <template v-for="(class2, class2_index) in menuLists[0].class2s" :key="class2_index">
                <Content class="class2" @click="selectClass2(class2.name)">{{ class2.name }}</Content>
            </template>
        </div>
        <div v-else-if="selectClass.class1=='drink'" class="class2__wrapper" :class="{'blur': lightBox !=''}">
            <template v-for="(class2, class2_index) in menuLists[1].class2s" :key="class2_index">
                <Content class="class2" @click="selectClass2(class2.name)">{{ class2.name }}</Content>
            </template>
        </div>
      </template>
    </UpFade>

    <Lightbox></Lightbox>
    <MenuController></MenuController>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import Lightbox from '../pages/Lightbox.vue'
import MenuController from '../organisms/MenuController.vue'
import UpFade from '../transition/UpFade.vue'
import RadioButton from "../atoms/RadioButton"
import Content from "../atoms/Content"

export default {
    components: {
      Lightbox,
      MenuController,
      UpFade,
      RadioButton,
      Content,
    },
    data: () => {
    return {
            radioButtonClass1: [
                {id: 'foodMenu', value: 'food', name: 'food_or_drink', label: 'food'},
                {id: 'drinkMenu', value: 'drink', name: 'food_or_drink', label: 'drink'}
            ],
        }
    },
    computed: {
        ...mapGetters([ 'menuLists' ,'setMenuLists','selectClass', 'lightBox']),
    },
    methods: {
        ...mapActions([ 'selectClass1Update', 'selectClass2Update', 'lightBoxShow' ]),
        selectClass2(class2_index){
            console.log(class2_index) 
            this.selectClass2Update(class2_index)
            this.lightBoxShow('Class3s')
        },
    },
}
</script>

<style lang="scss" scoped>
.menu_list{
    width: 98%;
    height: 100%;
    display: flex;
    margin-top:10px;
    flex-direction: column;
    &>:nth-child(n){
        margin-bottom: 10px;
    }
    &::after{
        @include after;
    }
}
.class2{
    background-color: $bg-primary;
    color: $text-primary;
    font-size: 1.6rem;
    border-radius: 5px;
    &__wrapper{
        width: 100%;
        height: calc(100% - 65px);
        display: grid;
        grid-template-columns: 49.5% 49.5%;
        grid-auto-rows: 42px;
        padding-bottom: 125px;
        grid-gap:10px 1%;
        @include mq('tb'){
            grid-template-columns: 100%;
        }
    }
}
.blur{
    filter: blur(2px);
}
</style>