<template>
    <form name="create_menu" @submit.prevent="submit" key="create_menu">

        <h3>大分類</h3>
        <div class="radio_button__unit">
            <input type="radio" id="food_create" class="radio_button" name="create_category" value=0 v-model="NewMenu['class1']"  required>
            <label for="food_create" class="radio_button__label">food</label>
            <input type="radio" id="drink_create" class="radio_button" name="create_category" value=1 v-model="NewMenu['class1']" required>
            <label for="drink_create" class="radio_button__label">drink</label>
        </div>

        <h3>中分類</h3>
        <div class="radio_button__unit">
            <input type="radio" id="class2_diversion" class="radio_button" name="CreateOrExist" value="exist" v-model="CreateOrExist" required>
            <label for="class2_diversion" class="radio_button__label">流用</label>
            <input type="radio" id="class2_create" class="radio_button" name="CreateOrExist" value="create" v-model="CreateOrExist" @change="NewMenu['class2'] = ''" required>
            <label for="class2_create" class="radio_button__label">新規作成</label>
        </div>
        <LeftFade>
            <keep-alive>
                <input v-if="CreateOrExist == 'create'" type="text" class="textbox" placeholder="分類名" v-model="NewMenu['class2']" required>
                <select v-else-if="CreateOrExist == 'exist' && NewMenu.class1 == 0" class="selectbox" v-model="NewMenu['class2']" required>
                    <option value="" disabled selected style='display:none;'>選択してください</option>
                    <option v-for="(class2, class2_index) in menuLists[0].class2s" :key="class2_index" :value="class2.name">{{ class2.name }}</option>
                </select>
                <select v-else-if="CreateOrExist == 'exist' && NewMenu.class1 == 1" class="selectbox" v-model="NewMenu['class2']" required>
                    <option value="" disabled selected style='display:none;'>選択してください</option>
                    <option v-for="(class2, class2_index) in menuLists[1].class2s" :key="class2_index" :value="class2.name">{{ class2.name }}</option>
                </select>
            </keep-alive>
        </LeftFade>

        <h3>料理名</h3>
        <input type="text" class="textbox" name="subsubcategory" placeholder="料理名" v-model="NewMenu['class3']" required>

        <h3>金額</h3>
        <input type="tel" class="textbox" name="price" placeholder="価格" v-model="NewMenu['price']" required>

        <h3>セットメニュー</h3>
        <div class="radio_button__unit">
            <input type="radio" id="class4_detail--false" class="radio_button" name="class4_detail" v-bind:value="false" v-model="Class4Detail['isClass4']" required>
            <label for="class4_detail--false" class="radio_button__label">なし</label>
            <input type="radio" id="class4_detail--true" class="radio_button" name="class4_detail" v-bind:value="true" v-model="Class4Detail['isClass4']" required>
            <label for="class4_detail--true" class="radio_button__label">あり</label>
        </div>

        <LeftFade>
            <div v-if="Class4Detail.isClass4 == true">
                <ListUpdate>
                    <li v-for="(class4_index, index) in Class4Detail.class4_indexs" :key="class4_index" class="flex_box">
                        <select class="selectbox--class4" required v-model='Class4Detail.class4Menus[index]'>
                            <option value="" disabled selected style='display:none;'>選択してください</option>
                            <option v-for="(class4, class4_index) in setMenuLists" :key="class4_index" :value="class4_index">{{ class4.name }}</option>
                        </select>
                        <div v-if="class4_index == 0" class="icon_button icon--add" @click="createClass4"></div>
                        <div v-else class="icon_button icon--delete" @click="deleteClass4(index)"></div>
                    </li>
                </ListUpdate>
            </div>
        </LeftFade>
        <h3>テイクアウト対応</h3>
        <div class="radio_button__unit">
            <input type="radio" id="takeout_false" class="radio_button" name="takeout" v-bind:value="false" v-model="NewMenu['takeout']" required>
            <label for="takeout_false" class="radio_button__label">非対応</label>
            <input type="radio" id="takeout_true" class="radio_button" name="takeout" v-bind:value="true" v-model="NewMenu['takeout']" required>
            <label for="takeout_true" class="radio_button__label">対応</label>
        </div>
        <button type="submit" class="submit_button">登録</button>
        <button class="submit_button--clear" @click="formReset">入力内容をクリア</button>
    </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import LeftFade from "../../transition/LeftFade"
import ListUpdate from "../../transition/ListUpdate"

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
                takeout: false,
            },
            Class4Detail: {
                isClass4: false,
                class4_indexs: [0],
                class4Menus: [""],
            },
        }
    },
    components: {
        LeftFade,
        ListUpdate,
    },
    computed: {
        ...mapGetters([ 'class1Menus', 'class2Menus', 'class3Menus', 'class4Menus', 'menuLists','setMenuLists' ]),
        
    },
    methods: {
        ...mapActions([ 'menuListCreate' ]),
        submit(){
            let Newmenu
            if (this.Class4Detail.isClass4 == true) {
                this.NewMenu['class4Menus'] = this.Class4Detail.class4Menus
                console.log('class4Menus')
                console.log(this.NewMenu['class4Menus'])
            }else{
                this.NewMenu['class4Menus'] = []
            }
            Newmenu = JSON.parse(JSON.stringify(this.NewMenu))
            this.menuListCreate(Newmenu);
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
            this.NewMenu['takeout'] = false
            this.Class4Detail['isClass4'] = false
            this.Class4Detail['class4_indexs'] = [0]
            this.Class4Detail['class4Menus'] = [""]
        },
    },
}
</script>

<style lang="scss" scoped>
form{
    width: 280px;
    margin: 20px auto 50px auto;
}
.submit_button{
    @include submit_button;
    &--clear{
        @include submit_button($width: 80%);
    }
}
.textbox{
    @include textbox;
    &--choice{
        @include textbox($width: 40%);
    }
    &--class4{
        @include textbox($width: calc(100% - 50px))
    }
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
.selectbox{
    @include selectbox;
    &--class4{
        @include selectbox($width: calc(100% - 50px));
    }
}

.icon_button{
    @include icon_button;
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

