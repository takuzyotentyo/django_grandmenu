<template>
    <div class="menu_list">
        <div class="radio_button__unit" :class="{'blur': lightBox !=''}">
            <input type="radio" id="food_menu" name="food_or_drink" class="radio_button" @change="selectClass1Update('food')" :checked="selectClass['class1']=='food' ? true : false">
            <label for="food_menu" class="radio_button__label" >Food</label>
            <input type="radio" id="drink_menu" name="food_or_drink" class="radio_button" @change="selectClass1Update('drink')" :checked="selectClass['class1']=='drink' ? true : false">
            <label for="drink_menu" class="radio_button__label" >Drink</label>
        </div>
        <UpFade>
            <div class="class1" :class="{'blur': lightBox !=''}" v-if="selectClass['class1'] == 'food'" key="food">
                <li v-for="(class2Menu, index) in class2Menus.food" :key="index" :value="'food/' + class2Menu" class="class2" @click="selectClass2">
                    {{ class2Menu }}
                </li>
            </div>
            <div class="class1" :class="{'blur': lightBox !=''}" v-else-if="selectClass['class1'] == 'drink'" key="drink">
                <li v-for="(class2Menu, index) in class2Menus.drink" :key="index" :value="'drink/' + class2Menu" class="class2" @click="selectClass2">
                    {{ class2Menu }}
                </li>
            </div>
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
    components: { Lightbox, MenuController, UpFade },
    computed: {
        ...mapGetters([ 'selectClass' ,'class1Menus', 'class2Menus', 'class3Menus', 'lightBox']),
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
.class1{
    width: 100%;
    height: calc(100% - 65px);
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-content: flex-start;
}
.class2{
    height: 50px;
    line-height: 50px;
    width: 49.5%;
    background-color: $bg-primary;
    border-radius: 5px;
    margin-bottom: 10px;
    color: $text-primary;
    font-size: 1.6rem;
    text-align: center;
    @include mq('tb'){// タブレットで、sidenavを表示したときのために必要
        min-width: calc(98vw - 100%);
    }
    @include mq('sp'){
        width: 100%;
    }
}
.blur{
    filter: blur(2px);
}
</style>