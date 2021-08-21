<template>
    <div>
        <form @submit.prevent="setMenuCreateAction">
            <h3>セットメニューの追加</h3>
            <input type="text" class="textbox" name="subsubcategory" placeholder="セットメニュー名" v-model="newSetMenus['class4']" required>
            <ListUpdate>
                <li class="flex_box" v-for="(class5Menu , index) in newSetMenus['class5s']" :key="class5Menu['id']">
                    <input type="text" class="textbox--class5" name="subsubcategory" placeholder="セットメニューの内容" v-model="newSetMenus['class5s'][index]['name']" required>
                    <div v-if="index == 0" class="icon_button icon--add" @click="createClass5"></div>
                    <div v-else class="icon_button icon--delete" @click="deleteClass5(index)"></div>
                    <select class="selectbox--class5" v-model="newSetMenus['class5s'][index]['price_type']" @change="noAdditionalPrice(index)" required>
                        <option value='' disabled selected style='display:none;'>選択してください</option>
                        <option value="no_additional_price">追加料金なし</option>
                        <option value="additional_price">追加料金</option>
                        <option value="disaddisitional_price">値引き</option>
                    </select>
                    <input type="text" class="textbox--class5_price"
                        :disabled="newSetMenus['class5s'][index]['price_type'] == 'no_additional_price'? true : false "
                        name="additional_price" placeholder="料金" v-model="newSetMenus['class5s'][index]['price']" required>
                </li>
            </ListUpdate>
            <button class='submit_button'>セットメニュー登録</button>
            <button class="submit_button--clear" @click="newSetMenuReset">入力内容をクリア</button>
        </form>

        <h3>登録済みのセットメニュー</h3>
        <div class="radio_button__unit">
            <input type="radio" id="class4_draggable" class="radio_button" name="action_type" value="updatable" v-model="ActionTyoe" required>
            <label for="class4_draggable" class="radio_button__label">修正</label>
            <input type="radio" id="class4_Updatable" class="radio_button" name="action_type" value="draggable" v-model="ActionTyoe"  required>
            <label for="class4_Updatable" class="radio_button__label">並べ替え</label>
        </div>




        <ul v-for="(class4, class4_index) in setMenusListsOrder" :key="class4_index" @dragover.prevent @dragenter.prevent @drop="class4Drop($event, {height:60})">
            <li :class="ActionTyoe=='edittable_class4_' + class4_index ? 'class4Menu--transparent' : 'class4Menu'" :draggable="class4['isDraggable']? true : false" @dragstart="class4Drag($event, class4_index)">
                <input type='textbox' v-if="ActionTyoe=='edittable_class4_' + class4_index" class="textbox--class5" :value=class4.name>
                <span v-else class="class4Menu__content" @click="class5Show(class4_index)">{{ class4.name }}</span>
                <span class="class4Menu__icon icon--handle" v-if="ActionTyoe=='draggable'" @mousedown="class4Draggable()" @touchstart="class4Draggable()"></span>
                <span class="class4Menu__icon icon--check" v-else-if="ActionTyoe=='edittable_class4_' + class4_index" @click="class4_edit_finish(class4_index, )"></span>
                <span class="class4Menu__icon icon--create" v-else @click="class4_edit_start(class4_index)"></span>
                <span class="class4Menu__icon--danger icon--delete" v-if="ActionTyoe=='edittable_class4_' + class4_index" @click="class4_edit_finish(class4_index)"></span>
            </li>


            <LeftFade>
            <ul class="class5Menu__wrapper" v-if="class4['isShow'] == true" @dragover.prevent @dragenter.prevent @drop="class5Drop($event, {class4_menu: class4['name'], height:60})">
                <li class="class5Menu" v-for="(class5, class5_index) in class4.class5s" :key="class5_index" :draggable="class5['isDraggable']? true : false" @dragstart="class5Drag($event, class5_index)">
                    <span class="class5Menu__content">{{ class5.name }}</span>
                    <span class="class5Menu__price">＋{{ class5.price }}円</span>




                    <span class="class5Menu__icon icon--handle" v-if="ActionTyoe=='draggable'" @mousedown="class5Draggable()" @touchstart="class5Draggable()"></span>
                    <span class="class5Menu__icon icon--check" v-else-if="ActionTyoe=='edittable_class4_' + class4_index + '_class5_' + class5_index" @click="class5_edit_finish(class4_index, class5_index)"></span>
                    <span class="class5Menu__icon icon--create" v-else @click="class5_edit_start(class4_index, class4_index, class5_index)"></span>
                    <span class="class5Menu__icon--danger icon--delete" v-if="ActionTyoe=='edittable_class4_' + class4_index + '_class5_' + class5_index" @click="class5_edit_finish(class4_index, class5_index)"></span>



                    <!-- <span class="class5Menu__icon icon--create" v-if="ActionTyoe=='updatable'"></span> -->
                    <!-- <span class="class5Menu__icon icon--handle" v-if="ActionTyoe=='draggable'" @mousedown="class5Draggable(newClass4Menu['name'])" @touchstart="class5Draggable(newClass4Menu['name'])"></span> -->
                </li>
            </ul>
            </LeftFade>
        </ul>

        <UpFade>
            <button v-if="ActionTyoe=='draggable'" class='submit_button' @click="setMenuOrderUpdateAction()">並べ替え確定</button>
        </UpFade>
        <UpFade>
            <button v-if="ActionTyoe=='draggable'" class='submit_button--clear' @click="setMenuOrderCreateAction()">並び順を元に戻す</button>
        </UpFade>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
// import { mapGetters } from "vuex"
import LeftFade from "../../transition/LeftFade"
import ListUpdate from "../../transition/ListUpdate"
import UpFade from "../../transition/UpFade"

export default {
    data: () => {
        return {
            ActionTyoe: 'updatable',
            newSetMenus: {
                class4:'',
                class5s:[{
                    id: 1,
                    name: '',
                    price_type:'no_additional_price',
                    price: 0,
                }]
            },
            setMenusListsOrder: [],
        }
    },
    created() {
        this.setMenuOrderCreateAction();
    },
    computed: {
        // ...mapGetters([ 'class1Menus', 'class2Menus', 'class3Menus', 'class4Menus' ]),
        ...mapGetters([ 'class4Menus', 'class5Menus' ]),
        
    },
    watch: {
      class5Menus: {
        handler: function () {
          this.setMenuOrderCreateAction();
        },
        deep: true
      }
    },
    // watch: {
    //     class5Menus(){
    //         console.log('watch')
    //         this.setMenuOrderCreateAction();
    //     },
    // },
    components: {
        LeftFade,
        UpFade,
        ListUpdate,
    },
    methods: {
        ...mapActions([ 'setMenuCreate', 'setMenuOrderUpdate' ]),
        class5Show(index){
            this.setMenusListsOrder[index]['isShow'] =! this.setMenusListsOrder[index]['isShow']
        },
        class4Draggable(){
            console.log('class4Draggable')
            if(this.ActionTyoe == 'draggable'){
                this.newClass4Menus.forEach( (value) => {
                    value['isShow'] = false
                    value['isEdit'] = false
                    value['isDraggable'] = true
                })
            }
        },
        class4Drag(event, index){
            console.log('class4Drag')
            if(this.ActionTyoe == 'draggable'){
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.setData('drag-list','class4')
                event.dataTransfer.setData('drag-index',index)
                event.dataTransfer.setData('page-y-start',event.clientY)
            }
        },
        class4Drop(event, object_data){
            console.log('class4Drop')
            if(event.dataTransfer.getData('drag-list') == 'class4' && this.ActionTyoe == 'draggable'){
                console.log('class4Drop work')
                const dragIndex = event.dataTransfer.getData('drag-index')
                const page_y_diff = event.dataTransfer.getData('page-y-start') - event.clientY
                const object_height = Number(object_data.height)
                const adjustment_index = Math.round(page_y_diff / object_height)
                const insert_position = dragIndex - adjustment_index
                const deleteList = this.newClass4Menus.splice(dragIndex, 1);
                this.newClass4Menus.splice(insert_position, 0, deleteList[0])
                this.newClass4Menus.forEach( (value) => {
                    value['isShow'] = false
                    value['isEdit'] = false
                    value['isDraggable'] = false
                });
                event.dataTransfer.clearData('drag-list')
                event.dataTransfer.clearData('drag-index')
                event.dataTransfer.clearData('page-y-start')
            }
        },
        class5Draggable(newClass4Menu){
            console.log('class5Draggable')
            if(this.ActionTyoe == 'draggable'){
                this.newClass5Menus[newClass4Menu].forEach( (value) => {
                    value['isEdit'] = false
                    value['isDraggable'] = true
                })
            }
        },
        class5Drag(event, index){
            if(this.ActionTyoe=='draggable'){
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.setData('drag-list','class5')
                event.dataTransfer.setData('drag-index',index)
                event.dataTransfer.setData('page-y-start',event.clientY)
            }
        },
        class5Drop(event, object_data){
            console.log('class5Draggable' && this.ActionTyoe == 'draggable')
            if(event.dataTransfer.getData('drag-list') == 'class5'){
                console.log('class5Drop work')
                const dragIndex = event.dataTransfer.getData('drag-index')
                const page_y_diff = event.dataTransfer.getData('page-y-start') - event.clientY
                const class4_menu = object_data.class4_menu
                console.log(class4_menu)
                const object_height = Number(object_data.height)
                const adjustment_index = Math.round(page_y_diff / object_height)
                const insert_position = dragIndex - adjustment_index
                const deleteList = this.newClass5Menus[class4_menu].splice(dragIndex, 1);
                console.log(deleteList)
                this.newClass5Menus[class4_menu].splice(insert_position, 0, deleteList[0])
                this.newClass5Menus[class4_menu].forEach( (value) => {
                    value['isShow'] = false
                    value['isEdit'] = false
                    value['isDraggable'] = false
                });
                event.dataTransfer.clearData('drag-list')
                event.dataTransfer.clearData('drag-index')
                event.dataTransfer.clearData('page-y-start')
            }
        }, 
        noAdditionalPrice(index){
            let val
            if(this.newSetMenus['class5s'][index]['price_type']=='no_additional_price'){
                val = 0
            }else{
                val = ''
            }
            this.newSetMenus['class5s'][index]['price'] = val
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
            this.newSetMenus['class5s'].splice(index, 1)
        },
        setMenuCreateAction(){
            console.log('setMenuCreateAction')
            let newclass5Menus, name , price
            const newclass4Menu = this.newSetMenus['class4']
            newclass5Menus = new Array()
            this.newSetMenus['class5s'].forEach( (class5Menu, class5Index) => {
                name = class5Menu['name']
                if(class5Menu['price_type']=='disaddisitional_price'){
                        price = class5Menu['price'] * -1
                    }else{
                        price = class5Menu['price'] 
                    }
                newclass5Menus[class5Index] = {
                    name: name,
                    price: price                    
                }
            })
            const newSetMenu = {
                class4Menu: newclass4Menu,
                class5Menus: newclass5Menus
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
        setMenuOrderUpdateAction(){
            const newClass4Order = this.newClass4Menus.map(element => (element['name']))
            let newClass5Order
            newClass5Order = {}
            console.log('newClass4Order')
            console.log(newClass4Order)
            console.log('this.newClass5Menus')
            console.log(this.newClass5Menus)
            newClass4Order.forEach( (class4) => {
                console.log(class4)
                newClass5Order[class4] =[]
                this.newClass5Menus[class4].forEach( (class5) => {
                    newClass5Order[class4].push({
                        name: class5['name'],
                        price: class5['price']
                    })
                })
            })
            const newSetMenuOrder = {
                class4Order: newClass4Order,
                class5Order: newClass5Order
            }
            this.setMenuOrderUpdate(newSetMenuOrder)
            console.log('newClass5Order')
            console.log(newClass5Order)
        },
        setMenuOrderCreateAction(){
            this.newClass4Menus = []
            this.newClass5Menus = {}
            this.$store.getters.setMenuLists.forEach( (class4, class4_index) => {
                this.setMenusListsOrder[class4_index] = {
                    name: class4.name,
                    isShow: false,
                    isEdit: false,
                    isDraggable: false,
                    class5s:[]
                }
                class4.class5s.forEach((class5) => {
                this.setMenusListsOrder[class4_index].class5s.push({
                        name: class5.name,
                        price: class5.price,
                        isEdit: false,
                        isDraggable: false,
                    })
                })
            })
        },
        class4_edit_start(class4_index){
            console.log('class4_edit_start')
            console.log(class4_index)
            this.ActionTyoe = 'edittable_class4_' + class4_index
            // this.ActionTyoe = 'edittable_class4_'
        },
        class4_edit_finish(class4_index){
            console.log('class4_edit_finish')
            console.log(class4_index)
            this.ActionTyoe = 'updatable'
        },
        class5_edit_start(class4_index, class5_index){
            console.log('class5_edit_start')
            console.log(class4_index+","+class5_index)
            this.ActionTyoe = 'edittable_class4_' + class4_index + '_class5_' + class5_index
            // this.ActionTyoe = 'edittable_class4_'
        },
        class5_edit_finish(class4_index, class5_index){
            console.log('class5_edit_finish')
            console.log(class4_index+","+class5_index)
            this.ActionTyoe = 'updatable'
        },
    },
}
</script>

<style lang="scss" scoped>
form{
    width: 280px;
    margin: 20px auto 50px auto;
}
.class4Menu{
    @include list_object;
    display: flex;
    align-items: center;
    &--transparent{
        @include list_object;
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        height:auto;
        background-color: $bg-transparent;
    }
    &__icon{
        @include icon_button;
        &--danger{
             @include icon_button($background-color: $bg-danger, $border: solid 10px $bg-danger);
        }
    }
    &__content{
        width: calc(100% - 50px);
    }
}
.class5Menu{
    @include list_object($background-color: $bg-focus);
    display: flex;
    align-items: center;
    &__wrapper{
        height:auto;
        background-color: $bg-focus;
    }
    &__icon{
        @include icon_button($background-color: $bg-focus, $border: solid 10px $bg-focus);
    }
    &__content{
        width: calc(100% - 120px);
    }
    &__price{
        width: 70px;
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
.submit_button{
    @include submit_button;
    &--clear{
        @include submit_button($width: 80%);
    }
}
.textbox{
    @include textbox;
    &--class5{
        @include textbox($width: calc(100% - 50px))
    }
    &--class5_price{
        @include selectbox($width: calc(35%), $margin: 5px 0 10px auto);
        &[disabled]{
            background-image: linear-gradient(to right, $bg-disabled 50%, $bg-disabled 50%);
        }
    }
}

.selectbox{
    @include selectbox;
    &--class5{
        @include selectbox($width: calc(63%), $margin: 5px auto 10px 0);
        margin: auto, 0
    }
}

.icon_button{
    @include icon_button;
}

.flex_box{
    display: flex;
    // display: inline-block;
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