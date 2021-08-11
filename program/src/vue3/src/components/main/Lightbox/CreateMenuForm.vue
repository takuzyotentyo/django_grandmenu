<template>
    <form name="create_menu" @submit.prevent="submit" key="create_menu">

        <h3>大分類</h3>
        <div class="radio_button__unit">
            <input type="radio" id="food_create" class="radio_button" name="create_category" value="food" v-model="NewMenu['class1']"  required>
            <label for="food_create" class="radio_button__label">food</label>
            <input type="radio" id="drink_create" class="radio_button" name="create_category" value="drink" v-model="NewMenu['class1']" required>
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
                <input v-if="CreateOrExist == 'create'" type="text" class="textbox" name="subcategory" placeholder="分類名" v-model="NewMenu['class2']" key="createClass2" required>
                <select v-else-if="NewMenu.class1 == 'food' && CreateOrExist == 'exist'" class="selectbox" v-model="NewMenu['class2']" required key="existFoodClass2">
                    <option value="" disabled selected style='display:none;'>選択してください</option>
                    <option v-for="(class2Menu, index) in class2Menus.food" :key="index" :value="class2Menu">{{ class2Menu }}</option>
                </select>
                <select v-else-if="NewMenu.class1 == 'drink' && CreateOrExist == 'exist'" class="selectbox" v-model="NewMenu['class2']" required key="existDrinkClass2">
                    <option value="" disabled selected style='display:none;'>選択してください</option>
                    <option v-for="(class2Menu, index) in class2Menus.drink" :key="index" :value="class2Menu">{{ class2Menu }}</option>
                </select>
            </keep-alive>
        </LeftFade>

        <h3>料理名</h3>
        <input type="text" class="textbox" name="subsubcategory" placeholder="料理名" v-model="NewMenu['class3']" required>

        <h3>金額</h3>
        <input type="tel" class="textbox" name="price" placeholder="価格" v-model="NewMenu['price']" required>

        <h3>セットメニュー</h3>
        <div class="radio_button__unit">
            <input type="radio" id="has_class4--false" class="radio_button" name="has_class4" value='False' v-model="HasClass4['has']" required>
            <label for="has_class4--false" class="radio_button__label">なし</label>
            <input type="radio" id="has_class4--true" class="radio_button" name="has_class4" value='True' v-model="HasClass4['has']" required>
            <label for="has_class4--true" class="radio_button__label">あり</label>
        </div>

        <LeftFade>
            <div v-if="HasClass4.has == 'True'">
                <transition-group name="ListUpdate"  tag="p">
                    <li v-for="(class4_index, index) in HasClass4.class4_indexs" :key="class4_index" class="flex_box">
                        <select class="selectbox--class4" required v-model='HasClass4.class4[index]'>
                            <option value="" disabled selected style='display:none;'>選択してください</option>
                            <option v-for="(class4Menu, name, index) in class4Menus" :key="index" :value="name">{{ name }}</option>
                        </select>
                        <div v-if="class4_index == 0" class="add_button icon--add" @click="createClass4"></div>
                        <div v-else class="delete_button icon--delete" @click="deleteClass4(index)"></div>
                    </li>
                </transition-group>
            </div>
        </LeftFade>
        <h3>テイクアウト対応</h3>
        <div class="radio_button__unit">
            <input type="radio" id="takeout_false" class="radio_button" name="takeout" value="False" v-model="NewMenu['takeout']" required>
            <label for="takeout_false" class="radio_button__label">非対応</label>
            <input type="radio" id="takeout_true" class="radio_button" name="takeout" value="True" v-model="NewMenu['takeout']" required>
            <label for="takeout_true" class="radio_button__label">対応</label>
        </div>
        <button type="submit" class="submit_button">登録</button>
        <button class="submit_button--clear" @click="formReset">入力内容をクリア</button>
    </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import LeftFade from "../../transition/LeftFade"
// import ListUpdate from "../../transition/ListUpdate"

export default {
    data: () => {
        return {
            CreateOrExist: "exist",
            NewMenu: {
                class1: "food",
                class2: "",
                class3: "",
                class4: [],
                price: "",
                takeout: "False"
            },
            HasClass4: {
                has: 'False',
                class4_indexs: [0],
                class4: [""],
            },
        }
    },
    components: {
        LeftFade,
        // ListUpdate,
    },
    computed: {
        ...mapGetters([ 'class1Menus', 'class2Menus', 'class3Menus', 'class4Menus' ]),
        
    },
    methods: {
        ...mapActions([ 'createMenu' ]),
        submit(){
            let addNewMenu
            if (this.HasClass4.has == true) {
                this.NewMenu['class4'] = this.HasClass4.class4
                console.log('class4')
                console.log(this.NewMenu['class4'])
            }else{
                this.NewMenu['class4'] = []
            }
            addNewMenu = JSON.parse(JSON.stringify(this.NewMenu))
            this.createMenu(addNewMenu);
            this.formReset();
        },
        createClass4(){
            const next_index = Math.max(...this.HasClass4.class4_indexs) + 1
            this.HasClass4.class4_indexs.push(next_index)
            this.HasClass4.class4.push('')
        },
        deleteClass4(index){
            this.HasClass4.class4.splice(index, 1)
            this.HasClass4.class4_indexs.splice(index, 1)
        },
        formReset(){
            this.['CreateOrExist'] = "exist"
            this.NewMenu['class1'] = "food"
            this.NewMenu['class2'] = ""
            this.NewMenu['class3'] = ""
            this.NewMenu['class4'] = []
            this.NewMenu['price'] = ""
            this.NewMenu['takeout'] = "false"
            this.HasClass4['has'] ='false'
            this.HasClass4['class4_indexs'] = [0]
            this.HasClass4['class4'] = [""]
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

.add_button{
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    margin: 10px auto 15px auto;
    border-radius: 5px;
    border: solid 10px $bg-primary;
    background-color: $bg-primary;
}

.delete_button{
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    margin: 10px auto 15px auto;
    border-radius: 5px;
    border: solid 10px $bg-primary;
    background-color: $bg-primary;
}

.flex_box{
    display: flex;
    // display: inline-block;
    position: relative;
    align-items: center;
    justify-content: space-between;
    flex-flow: wrap;
    // width: 100%;
    width: 280px;
}
.ListUpdate-enter-active{
  transition: all $animation-time ease;
}

.ListUpdate-leave-active {
  transition: all $animation-time ease;
  position:absolute;
}
.ListUpdate-enter-from,
.ListUpdate-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.ListUpdate-move {
  transition: transform $animation-time ease;
}


</style>