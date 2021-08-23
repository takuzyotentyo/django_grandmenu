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
                        name="additional_price" placeholder="料金" :value="newSetMenus.class5s[index].price" @change="newSetMenusHalfSizeNumberFormat($event, index)" required>
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
                <input type='textbox' v-if="ActionTyoe=='edittable_class4_' + class4_index" class="textbox--class5" v-model=setMenusListsOrder[class4_index].name>
                <span v-else class="class4Menu__content" @click="class5Show(class4_index)">{{ class4.name }}</span>
                <span class="class4Menu__icon icon--handle" v-if="ActionTyoe=='draggable'" @mousedown="class4Draggable()" @touchstart="class4Draggable()"></span>
                <span class="class4Menu__icon icon--check" v-else-if="ActionTyoe=='edittable_class4_' + class4_index" @click="class4_update({index:class4_index, name:class4.name})"></span>
                <span class="class4Menu__icon icon--create" v-else @click="class4_edit_start(class4_index)"></span>
                <span class="class4Menu__icon--danger icon--delete" v-if="ActionTyoe=='edittable_class4_' + class4_index" @click="class4_delete({index:class4_index, name:class4.name})"></span>
            </li>

            <LeftFade>
            <ul class="class5Menu__wrapper" v-if="class4['isShow'] == true" @dragover.prevent @dragenter.prevent @drop="class5Drop($event, {height:60})">
                <li class="class5Menu" v-for="(class5, class5_index) in class4.class5s" :key="class5_index" :draggable="class5['isDraggable']? true : false" @dragstart="class5Drag($event, {class4: class4_index, class5: class5_index})">
                    <input type='textbox' v-if="ActionTyoe=='edittable_class4_' + class4_index + '_class5_' + class5_index" class="textbox--class5" v-model=setMenusListsOrder[class4_index].class5s[class5_index].name>
                    <span v-else class="class5Menu__content">{{ class5.name }}</span>
                    <input type='textbox' v-if="ActionTyoe=='edittable_class4_' + class4_index + '_class5_' + class5_index" class="textbox--class5_price" v-model=setMenusListsOrder[class4_index].class5s[class5_index].price>
                    <span v-if="ActionTyoe=='updatable' || ActionTyoe=='draggable' && class5.price>=0" class="class5Menu__price">＋{{ class5.price }}円</span>
                    <span v-else-if="ActionTyoe=='updatable' || ActionTyoe=='draggable' && class5.price<0" class="class5Menu__price"> {{ class5.price }}円</span>

                    <span class="class5Menu__icon icon--handle" v-if="ActionTyoe=='draggable'" @mousedown="class5Draggable(class4_index)" @touchstart="class5Draggable(class4_index)"></span>
                    <span class="class5Menu__icon icon--check" v-else-if="ActionTyoe=='edittable_class4_' + class4_index + '_class5_' + class5_index" @click="class5_update({class4_index: class4_index, class5_index: class5_index, name:class5.name})"></span>
                    <span class="class5Menu__icon icon--create" v-else @click="class5_edit_start(class4_index, class5_index)"></span>
                    <span class="class5Menu__icon--danger icon--delete" v-if="ActionTyoe=='edittable_class4_' + class4_index + '_class5_' + class5_index" @click="class5_delete({class4_index: class4_index, class5_index: class5_index, name:class5.name})"></span>
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
        ...mapGetters([ 'setMenuLists' ]),
        
    },
    mounted() {
        this.$store.subscribe((mutation) => {
            if (mutation.type === 'setMenuCreate') {
                this.setMenuOrderCreateAction()
            }else if(mutation.type === 'setMenuOrderUpdate'){
                this.setMenuOrderCreateAction()
            }else if(mutation.type === 'setMenuclass4UpdateCreate'){
                this.setMenuOrderCreateAction()
            }else if(mutation.type === 'class4Update'){
                this.setMenuOrderCreateAction()
            }else if(mutation.type === 'class4Delete'){
                this.setMenuOrderCreateAction()
            }
            
        })
    },
    components: {
        LeftFade,
        UpFade,
        ListUpdate,
    },
    methods: {
        ...mapActions([ 'setMenuCreate', 'setMenuOrderUpdate', 'class4Update', 'class4Delete', 'class5Update', 'class5Delete' ]),
        class5Show(index){
            this.setMenusListsOrder[index]['isShow'] =! this.setMenusListsOrder[index]['isShow']
        },
        class4Draggable(){
            if(this.ActionTyoe == 'draggable'){
                this.setMenusListsOrder.forEach( (value) => {
                    value['isShow'] = false
                    value['isEdit'] = false
                    value['isDraggable'] = true
                })
            }
        },
        class4Drag(event, index){
            if(this.ActionTyoe == 'draggable'){
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.setData('drag_list','class4')
                event.dataTransfer.setData('class4_index',index)
                event.dataTransfer.setData('page_y_start',event.clientY)
            }
        },
        class4Drop(event, object_data){
            if(event.dataTransfer.getData('drag_list') == 'class4' && this.ActionTyoe == 'draggable'){
                const class4_index = event.dataTransfer.getData('class4_index')
                const page_y_diff = event.dataTransfer.getData('page_y_start') - event.clientY
                const object_height = Number(object_data.height)
                const adjustment_index = Math.round(page_y_diff / object_height)
                const insert_position = class4_index - adjustment_index
                const deleteList = this.setMenusListsOrder.splice(class4_index, 1);
                this.setMenusListsOrder.splice(insert_position, 0, deleteList[0])
                this.setMenusListsOrder.forEach( (value) => {
                    value['isShow'] = false
                    value['isEdit'] = false
                    value['isDraggable'] = false
                });
                event.dataTransfer.clearData('drag_list')
                event.dataTransfer.clearData('class4_index')
                event.dataTransfer.clearData('page_y_start')
            }
        },
        class5Draggable(class4_index){
            if(this.ActionTyoe == 'draggable'){
                this.setMenusListsOrder[class4_index].class5s.forEach( (value) => {
                    value['isEdit'] = false
                    value['isDraggable'] = true
                })
            }
        },
        class5Drag(event, index){
            if(this.ActionTyoe=='draggable'){
                const class4_index = index.class4
                const class5_index = index.class5
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.setData('drag_list','class5')
                event.dataTransfer.setData('class4_index',class4_index)
                event.dataTransfer.setData('class5_index',class5_index)
                event.dataTransfer.setData('page_y_start',event.clientY)
            }
        },
        class5Drop(event, object_data){
            if(event.dataTransfer.getData('drag_list') == 'class5'){
                const class4_index = event.dataTransfer.getData('class4_index')
                const class5_index = event.dataTransfer.getData('class5_index')
                const page_y_diff = event.dataTransfer.getData('page_y_start') - event.clientY
                const object_height = Number(object_data.height)
                const adjustment_index = Math.round(page_y_diff / object_height)
                const insert_position = class5_index - adjustment_index
                const deleteList = this.setMenusListsOrder[class4_index].class5s.splice(class5_index, 1);
                this.setMenusListsOrder[class4_index].class5s.splice(insert_position, 0, deleteList[0])
                this.setMenusListsOrder[class4_index].class5s.forEach( (value) => {
                    value['isShow'] = false
                    value['isEdit'] = false
                    value['isDraggable'] = false
                });
                event.dataTransfer.clearData('drag_list')
                event.dataTransfer.clearData('class4_index')
                event.dataTransfer.clearData('class5_index')
                event.dataTransfer.clearData('page_y_start')
            }
        }, 
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
        setMenuOrderUpdateAction(){
            this.setMenusListsOrder.forEach((class4, class4_index) => {
                console.log(class4)
                delete class4.isShow
                delete class4.isEdit
                delete class4.isDraggable
                class4.id = class4_index + 1
                class4.class5s.forEach((class5, class5_index) => {
                    delete class5.isEdit
                    delete class5.isDraggable
                    class5.id = class5_index + 1
                });
            });
            this.setMenuOrderUpdate(this.setMenusListsOrder)
        },
        setMenuOrderCreateAction(){
            console.log('setMenuOrderCreateAction')
            this.setMenusListsOrder = []
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
            this.ActionTyoe = 'edittable_class4_' + class4_index
            // this.ActionTyoe = 'edittable_class4_'
        },
        class4_update(class4){
            console.log(class4)
            this.class4Update(class4)
            this.ActionTyoe = 'updatable'
        },
        class4_delete(class4){
            console.log('class4_delete')
            const class4_name = class4.name
            const class4_index = class4.index
            const result = window.confirm('セットメニュー「'+ class4_name +'」を削除しますか？')
            if (result){
                this.class4Delete(class4_index)
                this.ActionTyoe = 'updatable'
            }
        },
        class5_edit_start(class4_index, class5_index){
            this.ActionTyoe = 'edittable_class4_' + class4_index + '_class5_' + class5_index
            // this.ActionTyoe = 'edittable_class4_'
        },
        class5_update(class5){
            this.class5Update(class5)
            this.ActionTyoe = 'updatable'
        },
        class5_delete(class5){
            const class4_index = class5.class4_index
            const class5_index = class5.class5_index
            const class5_name = class5.name
            console.log(class4_index)
            console.log(class5_index)
            console.log(class5_name)
            this.class5Delete(class5)
            this.ActionTyoe = 'updatable'
        },
        newSetMenusHalfSizeNumberFormat(event, index){
            this.newSetMenus.class5s[index].price = this.halfSizeNumberFormat(event.target.value)
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
    flex-flow: wrap;
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