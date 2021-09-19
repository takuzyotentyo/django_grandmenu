<template>
    <form name="create_menu" @submit.prevent="submit" key="create_menu">

        <h3>大分類</h3>
        <RadioButton v-model="NewMenu['class1']" :radioButtonOptions="radioButtonClass1"></RadioButton>

        <h3>中分類</h3>
        <RadioButton v-model="CreateOrExist" :radioButtonOptions="radioButtonClass2" @change="NewMenu.class2=''"></RadioButton>
        <LeftFade>
            <keep-alive>
                <Selectbox v-if="CreateOrExist == 'exist' && NewMenu.class1 == 0" v-model="NewMenu['class2']" :selectBoxOptions="selectBoxFoodClass2" required/>
                <Selectbox v-else-if="CreateOrExist == 'exist' && NewMenu.class1 == 1" v-model="NewMenu['class2']" :selectBoxOptions="selectBoxDrinkClass2" required/>
                <Textbox v-else v-model="NewMenu['class2']" placeholder="分類名" required/>
            </keep-alive>
        </LeftFade>

        <h3>料理名</h3>
        <Textbox v-model="NewMenu['class3']" placeholder="料理名" required/>

        <h3>金額</h3>
        <TextboxNumber placeholder="価格" v-model="NewMenu['price']" required/>

        <h3>セットメニュー</h3>
        <RadioButton v-model="Class4Detail['isClass4']" :radioButtonOptions="radioButtonClass4"/>

        <LeftFade>
            <div v-if="Class4Detail.isClass4 == 'true'">
                <ListUpdate>
                    <li v-for="(class4_index, index) in Class4Detail.class4_indexs" :key="class4_index" class="flex_box">
                        <SelectboxMedium v-model="Class4Detail.class4Menus[index]" :selectBoxOptions="selectBoxClass4" required />
                        <IconButton v-if="class4_index == 0" class="icon--add" @click="createClass4" />
                        <IconButton v-else class="icon--delete" @click="deleteClass4(index)" />
                    </li>
                </ListUpdate>
            </div>
        </LeftFade>
        <h3>テイクアウト対応</h3>
        <RadioButton v-model="NewMenu['takeout']" :radioButtonOptions="radioButtonTakeout"/>
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
import SelectboxMedium from "../atoms/SelectboxMedium"
import TextboxNumber from "../atoms/TextboxNumber"
import IconButton from "../atoms/IconButton"
import SubmitButton from "../atoms/SubmitButton"
import SubmitButtonMidium from "../atoms/SubmitButtonMidium"


export default {
    data: () => {
        return {
            CreateOrExist: "exist",
            NewMenu: {
                class1: 0,
                class2: "",
                class3: "",
                class4Menus: [],
                price: "",
                takeout: "false",
            },
            Class4Detail: {
                isClass4: "false",
                class4_indexs: [0],
                class4Menus: [""],
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
        SelectboxMedium,
        TextboxNumber,
        IconButton,
        SubmitButton,
        SubmitButtonMidium,
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
            if (this.Class4Detail.isClass4 == "true") {
                this.NewMenu['class4Menus'] = this.Class4Detail.class4Menus
            }else{
                this.NewMenu['class4Menus'] = []
            }
            Newmenu = JSON.parse(JSON.stringify(this.NewMenu))
            this.menuListCreate(Newmenu);
            console.log(Newmenu)
            this.formReset();
        },
        createClass4(){
            const next_index = Math.max(...this.Class4Detail.class4_indexs) + 1
            this.Class4Detail.class4_indexs.push(next_index)
            this.Class4Detail.class4Menus.push('')
        },
        deleteClass4(index){
            this.Class4Detail.class4_indexs.splice(index, 1)
            this.Class4Detail.class4Menus.splice(index, 1)
        },
        formReset(){
            this.['CreateOrExist'] = "exist"
            this.NewMenu['class1'] = 0
            this.NewMenu['class2'] = ""
            this.NewMenu['class3'] = ""
            this.NewMenu['class4Menus'] = []
            this.NewMenu['price'] = ""
            this.NewMenu['takeout'] = "false"
            this.Class4Detail['isClass4'] = "false"
            this.Class4Detail['class4_indexs'] = [0]
            this.Class4Detail['class4Menus'] = [""]
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

