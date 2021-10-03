<template>
    <div>
        <form @submit.prevent="setMenuCreateAction" class="set_menu_create">
            <h3>セットメニューの追加</h3>
            <Textbox placeholder="セットメニュー名" v-model="newSetMenus['class4']" required></Textbox>
            <h3>セットメニューの詳細</h3>
            <ListUpdate class="set_menu_class5">
                <Class5Create
                    v-for="(class5, index) in newSetMenus['class5s']" :key="class5['id']"
                    :class5_index = index
                    v-model:class5_name="class5.name"
                    v-model:class5_price="class5.price"
                    v-model:class5_price_type="class5.price_type"
                    @deleteClass5="deleteClass5"
                    @noAdditionalPrice="noAdditionalPrice"
                    :selectBoxOptions="selectBoxOptions"
                >
                </Class5Create>
            </ListUpdate>
            <IconButton class="icon--increase" @click="createClass5"></IconButton>
            <SubmitButton>セットメニュー登録</SubmitButton>
            <SubmitButtonMidium @click="newSetMenuReset">入力内容をクリア</SubmitButtonMidium>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import ListUpdate from "../transition/ListUpdate"
import Textbox from "../atoms/Textbox"
import SubmitButton from "../atoms/SubmitButton"
import SubmitButtonMidium from "../atoms/SubmitButtonMidium"
import Class5Create from "../molecules/Class5Create"
import IconButton from '../atoms/IconButton.vue'

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
        SubmitButton,
        SubmitButtonMidium,
        Class5Create,
        IconButton,
    },
    methods: {
        ...mapActions([ 'setMenuCreate' ]),
        noAdditionalPrice(index){
            let price
            console.log('noAdditionalPrice')
            console.log(index)
            if(this.newSetMenus['class5s'][index]['price_type']=='no_additional_price'){
                price = 0
            }else{
                price = ''
            }
            this.newSetMenus['class5s'][index]['price'] = price
        },
        createClass5(){
            console.log('createClass5')
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
            console.log('deleteClass5')
            console.log(index)
            console.log(this.newSetMenus['class5s'].length)
            if(this.newSetMenus['class5s'].length > 1){
                console.log(true)
                this.newSetMenus['class5s'].splice(index, 1)
            }
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
                return Number(String(number).replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,''));
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.set_menu_create {
    display: grid;
    grid-template-columns:  1fr 42px 1fr;
    &>:nth-child(n){
        grid-column: 1 / 4;
        margin-bottom: 5px
    }
    &>button{
        margin-top: 15px
    }
    &>.icon--increase{
        grid-column: 2;
    }
}
.set_menu_class5 {
    position: relative;
    &>:nth-child(n){
        margin-bottom: 5px
    }
}

.width{
    width: 42px;
}
.ListUpdate-leave-active {
  transition: all $animation-time ease;
  position:absolute;
}
.ListUpdate-move {
  transition: transform $animation-time ease;
}
</style>