<template>
    <form name="create_menu" @submit.prevent="submit" key="create_menu" class="create_menu_form">

        <h3>大分類</h3>
        <RadioButton v-model="NewMenu.class1" :radioButtonOptions="radioButtonClass1"></RadioButton>

        <h3>中分類</h3>
        <RadioButton v-model="CreateOrExist" :radioButtonOptions="radioButtonClass2" @change="NewMenu.class2=''"></RadioButton>
        <LeftFade>
            <keep-alive>
                <Selectbox v-if="CreateOrExist == 'exist' && NewMenu.class1 == 0" v-model="NewMenu.class2" :selectBoxOptions="selectBoxFoodClass2" required/>
                <Selectbox v-else-if="CreateOrExist == 'exist' && NewMenu.class1 == 1" v-model="NewMenu.class2" :selectBoxOptions="selectBoxDrinkClass2" required/>
                <Textbox v-else v-model="NewMenu.class2" placeholder="分類名" required/>
            </keep-alive>
        </LeftFade>

        <h3>料理名</h3>
        <Textbox v-model="NewMenu.class3" placeholder="料理名" required/>

        <h3>金額</h3>
        <TextboxNumber placeholder="価格" v-model="NewMenu.price" required/>

        <h3>セットメニュー</h3>
        <RadioButton v-model="NewMenu.isClass4" :radioButtonOptions="radioButtonClass4"/>

        <LeftFade>
            <div v-if="NewMenu.isClass4 == 'true'">
                <ListUpdate class="class4_wrapper">
                    <Class4Select
                        v-for="(class4, index) in NewMenu.class4s" :key="class4.id"
                        v-model:class4_name="class4.name"
                        :class4_index="index"
                        :selectBoxOptions="selectBoxClass4"
                        @deleteClass4="deleteClass4"
                    />
                    <IconButton class="icon--increase" @click="createClass4"></IconButton>
                </ListUpdate>
            </div>
        </LeftFade>
        <h3>テイクアウト対応</h3>
        <RadioButton v-model="NewMenu.takeout" :radioButtonOptions="radioButtonTakeout"/>
        <SubmitButton type="submit" class="submit_button">登録</SubmitButton>
        <SubmitButtonMidium class="submit_button--clear" @click="formReset">入力内容をクリア</SubmitButtonMidium>
    </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import LeftFade from "../transition/LeftFade"
import ListUpdate from "../transition/ListUpdate"
import RadioButton from "../atoms/RadioButton"
import Textbox from "../atoms/Textbox"
import Selectbox from "../atoms/Selectbox"
import TextboxNumber from "../atoms/TextboxNumber"
import IconButton from "../atoms/IconButton"
import SubmitButton from "../atoms/SubmitButton"
import SubmitButtonMidium from "../atoms/SubmitButtonMidium"
import Class4Select from "../molecules/Class4Select"


export default {
    data: () => {
        return {
            CreateOrExist: "exist",
            NewMenu: {
                class1: 0,
                class2: "",
                class3: "",
                isClass4: "false",
                class4s: [{
                    id:1,
                    name:'',
                }],
                price: "",
                takeout: "false",
            },
            radioButtonClass1: [
                {id: 'food_create', value: 0, name: 'create_category', label: 'food'},
                {id: 'drink_create', value: 1, name: 'create_category', label: 'drink'}
            ],
            radioButtonClass2: [
                {id: 'class2_diversion', value: 'exist', name: 'CreateOrExist', label: '流用'},
                {id: 'class2_create', value: 'create', name: 'CreateOrExist', label: '新規作成'}
            ],
            radioButtonClass4:[
                {id: 'class4_false', value: "false", name: 'is_class4', label: 'なし'},
                {id: 'class4_true', value: "true", name: 'is_class4', label: 'あり'}
            ],
            radioButtonTakeout:[
                {id: 'takeout_false', value: "false", name: 'takeout', label: '非対応'},
                {id: 'takeout_true', value: "true", name: 'takeout', label: '対応'}
            ],
            selectBoxFoodClass2: [],
            selectBoxDrinkClass2: [],
            selectBoxClass4: [],
        }
    },
    components: {
        LeftFade,
        ListUpdate,
        RadioButton,
        Textbox,
        Selectbox,
        TextboxNumber,
        IconButton,
        SubmitButton,
        SubmitButtonMidium,
        Class4Select,
    },
    computed: {
        ...mapGetters([ 'menuLists','setMenuLists' ]),
    },
    watch: {
        menuLists:{
            handler(){
                this.selectBoxOptionCreate()
            },
            deep: true,
            immediate: true,
        }
    },
    methods: {
        ...mapActions([ 'menuListCreate' ]),
        submit(){
            let Newmenu
            if (this.NewMenu.isClass4 == "false") {
                this.NewMenu['class4s'] = []
            }
            Newmenu = JSON.parse(JSON.stringify(this.NewMenu))
            this.menuListCreate(Newmenu);
            console.log(Newmenu)
            this.formReset();
        },
        createClass4(){
            console.log('createClass4')
                const class4_ids = this.NewMenu.class4s.map(class4 => class4.id);
                const next_index = Math.max(...class4_ids) + 1
                const next_class4 = {
                    id: next_index,
                    name: ''
                }
                this.NewMenu.class4s.push(next_class4)
        },
        deleteClass4(index){
            if (this.NewMenu.class4s.length != 1) {
                this.NewMenu.class4s.splice(index, 1)
            }
        },
        formReset(){
            const reset_new_menu = {
                class1: 0,
                class2: "",
                class3: "",
                isClass4: "false",
                class4s: [{
                    id:1,
                    name:'',
                }],
                price: "",
                takeout: "false",
            }
            this.NewMenu = reset_new_menu
        },
        selectBoxOptionCreate(){
            let class2Nams, class4Nams
            this.$store.getters.menuLists.forEach((class1) =>{
                class2Nams = class1.class2s.map(element => element.name)
                if(class1.name == 'food'){
                    class2Nams.forEach((class2, class2_index) => {
                        this.selectBoxFoodClass2[class2_index] = {
                            value: class2,
                            label: class2
                        }
                    });
                }else{
                    class2Nams.forEach((class2, class2_index) => {
                        this.selectBoxDrinkClass2[class2_index] = {
                            value: class2,
                            label: class2
                        }
                    });
                }
            })
            class4Nams = this.$store.getters.setMenuLists.map(element => element.name)
            class4Nams.forEach((class4, class4_index) => {
                this.selectBoxClass4[class4_index] = {
                    value: class4,
                    label: class4
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.create_menu_form{ 
    &>:nth-child(n){
        margin-bottom: 5px;
    }
    &>:nth-last-child(2){
        margin-bottom:15px;
    }
    &>:nth-last-child(3){
        margin-bottom:15px;
    }
}
.class4_wrapper{
    position: relative;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 42px 1fr;
    grid-gap: 5px 0;
    & >:nth-child(n){
        grid-column: 1 / 4;
    }
    & > .icon--increase{
        grid-column: 2;
    }
}
.ListUpdate-leave-active {
  transition: all $animation-time ease;
  position:absolute;
}
.ListUpdate-move {
  transition: transform $animation-time ease;
}
</style>

