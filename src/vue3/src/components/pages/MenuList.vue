<template>
  <div class="menu_list">
    <RadioButton :modelValue="selectClass.class1" @change="selectClass1Update($event.target.value)" :radioButtonOptions="radioButtonClass1" :class="{'blur': lightBox !=''}"/>
    <UpFade>
      <template v-for="(class1, class1_index) in menuLists" :key="class1_index">
        <div v-if="selectClass.class1==0" class="class2__wrapper">
            <ContentWrapper v-for="(class2, class2_index) in menuLists[0].class2s" :key="class2_index" @click="selectClass2(class2_index)" :class="{'blur': lightBox !=''}">
                <Content>{{ class2.name }}</Content>
            </ContentWrapper>
        </div>
        <div v-else-if="selectClass.class1==1" class="class2__wrapper">
            <ContentWrapper v-for="(class2, class2_index) in menuLists[1].class2s" :key="class2_index" @click="selectClass2(class2_index)" :class="{'blur': lightBox !=''}">
                <Content>{{ class2.name }}</Content>
            </ContentWrapper>
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
import ContentWrapper from "../atoms/ContentWrapper"

export default {
    components: {
      Lightbox,
      MenuController,
      UpFade,
      RadioButton,
      Content,
      ContentWrapper
    },
    data: () => {
    return {
            radioButtonClass1: [
                {id: 'foodMenu', value: 0, name: 'food_or_drink', label: 'food'},
                {id: 'drinkMenu', value: 1, name: 'food_or_drink', label: 'drink'}
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
    flex-direction: column;
}
.class2__wrapper{
    width: 100%;
    height: calc(100% - 65px);
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-content: flex-start;
}
.blur{
    filter: blur(2px);
}
</style>