<template>
    <div>
        <form @submit.prevent="setMenuCreateAction">
            <h3>セットメニューの追加</h3>
            <Textbox placeholder="セットメニュー名" v-model="newSetMenus['class4']" required></Textbox>
            <ListUpdate>
                <li class="flex_box" v-for="(class5Menu , index) in newSetMenus['class5s']" :key="class5Menu['id']">
                    <TextboxMidium placeholder="セットメニューの内容" v-model="newSetMenus['class5s'][index]['name']" required></TextboxMidium>
                    <IconButton v-if="index == 0" class="icon--add" @click="createClass5"/>
                    <IconButton v-else class="icon--delete" @click="deleteClass5(index)"/>
                    <SelectboxHalf v-model="newSetMenus['class5s'][index]['price_type']" @change="noAdditionalPrice(index)" :selectBoxOptions="selectBoxOptions"></SelectboxHalf>
                    <TextboxHalfNumber v-model="newSetMenus['class5s'][index]['price']" :disabled="newSetMenus['class5s'][index]['price_type'] == 'no_additional_price'? true : false " placeholder="料金" required></TextboxHalfNumber>
                </li>
            </ListUpdate>
            <SubmitButton>セットメニュー登録</SubmitButton>
            <SubmitButtonMidium @click="newSetMenuReset">入力内容をクリア</SubmitButtonMidium>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import ListUpdate from "../transition/ListUpdate"
import Textbox from "../atoms/Textbox"
import TextboxMidium from "../atoms/TextboxMidium"
import IconButton from "../atoms/IconButton"
import SelectboxHalf from "../atoms/SelectboxHalf"
import TextboxHalfNumber from "../atoms/TextboxHalfNumber"
import SubmitButton from "../atoms/SubmitButton"
import SubmitButtonMidium from "../atoms/SubmitButtonMidium"

export default {
    data: () => {
        return {
            ActionType: 'updatable',
            newSetMenus: {
                class4:'',
                class5s:[
                    {
                        id: 1,
                        name: '',
                        price_type:'no_additional_price',
                        price: 0,
                    }
                ],
            },
            selectBoxOptions:[
                {
                    value: 'no_additional_price',
                    label: '追加料金なし'
                },
                {
                    value: 'additional_price',
                    label: '追加料金'
                },
                {
                    value: 'disaddisitional_price',
                    label: '値引き'
                }
            ],
        }
    },
    components: {
        ListUpdate,
        Textbox,
        TextboxMidium,
        IconButton,
        SelectboxHalf,
        TextboxHalfNumber,
        SubmitButton,
        SubmitButtonMidium,
    },
    methods: {
        ...mapActions([ 'setMenuCreate' ]),
        noAdditionalPrice(index){
            let price
            if(this.newSetMenus['class5s'][index]['price_type']=='no_additional_price'){
                price = 0
            }else{
                price = ''
            }
            this.newSetMenus['class5s'][index]['price'] = price
        },
        createClass5(){
            const ids = this.newSetMenus['class5s'].map((element) => element['id']);
            const max_id = Math.max(...ids) + 1
            this.newSetMenus['class5s'].push({
                id: max_id,
                name: '',
                price_type:'no_additional_price',
                price: 0,
            })
        },
        deleteClass5(index){
            this.newSetMenus['class5s'].splice(index, 1)
        },
        setMenuCreateAction(){
            let newClass5Menus, name , price
            const newClass4Menu = this.newSetMenus['class4']
            newClass5Menus = new Array()
            this.newSetMenus.class5s.forEach( (class5Menu, class5Index) => {
                name = class5Menu.name
                price = this.halfSizeNumberFormat(class5Menu.price)
                if(class5Menu['price_type']=='disaddisitional_price'){
                    price = Math.abs(price) * -1
                }
                newClass5Menus[class5Index] = {
                    name: name,
                    price: price
                }
            })
            const newSetMenu = {
                name: newClass4Menu,
                class5s: newClass5Menus
            }
            this.setMenuCreate(newSetMenu)
            this.newSetMenuReset()
        },
        newSetMenuReset(){
            this.newSetMenus = {
                class4:'',
                class5s:[{
                    id: 1,
                    name: '',
                    price_type:'no_additional_price',
                    price: 0,
                }]
            }
        },
        halfSizeNumberFormat(number) {
            if(number == 0 ){
                return number
            }else{
                return number.replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,'');
            }
        },
    },
}
</script>

<style lang="scss" scoped>
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

.flex_box{
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    flex-flow: wrap;
    width: 280px;
}
.ListUpdate-leave-active {
  transition: all $animation-time ease;
  position:absolute;
}
.ListUpdate-move {
  transition: transform $animation-time ease;
}
</style>