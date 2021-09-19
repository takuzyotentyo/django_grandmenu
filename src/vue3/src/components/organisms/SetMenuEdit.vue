<template>
    <article>
        <h3>登録済みのセットメニュー</h3>
        <RadioButton v-model="actionType" :radioButtonOptions="radioButtonOptions"/>

        <ul v-for="(class4, class4_index) in setMenusListsOrder" :key="class4_index" @dragover.prevent @dragenter.prevent @drop="class4Drop($event, {height:60})">
            <li :class="actionType=='edittable_class4_' + class4_index ? 'class4Menu--transparent' : 'class4Menu'" :draggable="class4['isDraggable']? true : false" @dragstart="class4Drag($event, class4_index)">
                <template v-if="actionType=='edittable_class4_' + class4_index">
                    <TextboxMidium v-model="setMenusListsOrder[class4_index].name"/>
                    <IconButton class="icon--check" @click="class4_update({index:class4_index, name:class4.name})"/>
                    <IconButtonDanger class="icon--delete" @click="class4_delete({index:class4_index, name:class4.name})"/>
                </template>
                <template v-else>
                    <ContentMidium @click="class5Show(class4_index)">{{ class4.name }}</ContentMidium>
                    <IconButton class="icon--handle" v-if="actionType=='draggable'" @mousedown="class4Draggable()" @touchstart="class4Draggable()"/>
                    <IconButton class="icon--create" v-else @click="class4_edit_start(class4_index)"></IconButton>
                </template>
            </li>

            
            <ul class="class5Menu__wrapper" v-if="class4['isShow'] == true" @dragover.prevent @dragenter.prevent @drop="class5Drop($event, {height:115})">
                <li v-for="(class5, class5_index) in class4.class5s" :key="class5_index" :draggable="class5['isDraggable']? true : false" :class="actionType=='edittable_class4_' + class4_index + '_class5_' + class5_index ? 'class5Menu--transparent' : 'class5Menu'" @dragstart="class5Drag($event, {class4: class4_index, class5: class5_index})">
                    <template v-if="actionType=='edittable_class4_' + class4_index + '_class5_' + class5_index">
                        <TextboxMidium v-model="setMenusListsOrder[class4_index].class5s[class5_index].name"/>
                        <IconButton class="icon--check" @click="class5_update({class4_index: class4_index, class5_index: class5_index, name:class5.name})"/>
                        <TextboxMidiumNumber v-model="setMenusListsOrder[class4_index].class5s[class5_index].price"/>
                        <IconButtonDanger class="icon--delete" v-if="actionType=='edittable_class4_' + class4_index + '_class5_' + class5_index" @click="class5_delete({class4_index: class4_index, class5_index: class5_index, name:class5.name})"/>
                    </template>
                    <template v-else>
                        <ContentMidium>{{ class5.name }}</ContentMidium>
                        <IconButtonFocus v-if="actionType=='draggable'" @mousedown="class5Draggable(class4_index)" @touchstart="class5Draggable(class4_index)" class="icon_button--focus icon--handle" ></IconButtonFocus>
                        <IconButtonFocus v-else @click="class5_edit_start(class4_index, class5_index)" class="icon_button--focus icon--create" />
                        <ContentMidium v-if="class5.price>=0">＋{{ class5.price }}円</ContentMidium>
                        <ContentMidium v-else> {{ class5.price }}円</ContentMidium>
                    </template>
                </li>
            </ul>
            </LeftFade>
        </ul>

        <UpFade>
            <template>
                <SubmitButton v-if="actionType=='draggable'" @click="setMenuOrderUpdateAction()">並べ替え確定</SubmitButton>
                <SubmitButtonMidium v-if="actionType=='draggable'" @click="setMenuOrderCreateAction()">並び順を元に戻す</SubmitButtonMidium>
            </template>
        </UpFade>
    </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import LeftFade from "../transition/LeftFade"
import UpFade from "../transition/UpFade"
import RadioButton from "../atoms/RadioButton"
import TextboxMidium from "../atoms/TextboxMidium"
import TextboxMidiumNumber from "../atoms/TextboxMidiumNumber"
import IconButton from "../atoms/IconButton"
import IconButtonDanger from "../atoms/IconButtonDanger"
import IconButtonFocus from "../atoms/IconButtonFocus"
import SubmitButton from "../atoms/SubmitButton"
import SubmitButtonMidium from "../atoms/SubmitButtonMidium"
import ContentMidium from "../atoms/ContentMidium"

export default {
    data: () => {
        return {
            actionType: 'updatable',
            setMenusListsOrder: [],
            radioButtonOptions: [
                {
                    id: 'setmenu_updatable',
                    value: 'updatable',
                    name: 'action_type',
                    label: '修正',
                },
                {
                    id: 'setmenu_draggable',
                    value: 'draggable',
                    name: 'action_type',
                    label: '並べ替え',
                }
            ],
        }
    },
    components: {
        LeftFade,
        UpFade,
        IconButton,
        IconButtonDanger,
        IconButtonFocus,
        RadioButton,
        TextboxMidium,
        TextboxMidiumNumber,
        SubmitButton,
        SubmitButtonMidium,
        ContentMidium,
    },
    computed: {
        ...mapGetters([ 'setMenuLists' ]),
    },
    watch: {
            setMenuLists:{
                handler(){
                    this.setMenuOrderCreateAction()
                },
                deep: true,
                immediate: true,
            }
        },
    methods: {
        ...mapActions([ 'setMenuOrderUpdate', 'class4Update', 'class4Delete', 'class5Update', 'class5Delete' ]),
        class5Show(index){
            this.setMenusListsOrder[index]['isShow'] =! this.setMenusListsOrder[index]['isShow']
        },
        class4Draggable(){
            console.log('class4Draggable')
            if(this.actionType == 'draggable'){
                this.setMenusListsOrder.forEach( (value) => {
                    value['isShow'] = false
                    value['isEdit'] = false
                    value['isDraggable'] = true
                })
            }
        },
        class4Drag(event, index){
            console.log('class4Drag')
            if(this.actionType == 'draggable'){
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.setData('drag_list','class4')
                event.dataTransfer.setData('class4_index',index)
                event.dataTransfer.setData('page_y_start',event.clientY)
            }
        },
        class4Drop(event, object_data){
            console.log('class4Drop')
            if(event.dataTransfer.getData('drag_list') == 'class4' && this.actionType == 'draggable'){
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
            console.log('class5Draggable')
            if(this.actionType == 'draggable'){
                this.setMenusListsOrder[class4_index].class5s.forEach( (value) => {
                    value['isEdit'] = false
                    value['isDraggable'] = true
                })
            }
        },
        class5Drag(event, index){
            if(this.actionType=='draggable'){
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
            console.log('class5Drop')
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
            this.actionType = 'edittable_class4_' + class4_index
            // this.actionType = 'edittable_class4_'
        },
        class4_update(class4){
            console.log(class4)
            this.class4Update(class4)
            this.actionType = 'updatable'
        },
        class4_delete(class4){
            console.log('class4_delete')
            const class4_name = class4.name
            const class4_index = class4.index
            const result = window.confirm('セットメニュー「'+ class4_name +'」を削除しますか？')
            if (result){
                this.class4Delete(class4_index)
                this.actionType = 'updatable'
            }
        },
        class5_edit_start(class4_index, class5_index){
            this.actionType = 'edittable_class4_' + class4_index + '_class5_' + class5_index
            // this.actionType = 'edittable_class4_'
        },
        class5_update(class5){
            this.class5Update(class5)
            this.actionType = 'updatable'
        },
        class5_delete(class5){
            const class4_index = class5.class4_index
            const class5_index = class5.class5_index
            const class5_name = class5.name
            console.log(class4_index)
            console.log(class5_index)
            console.log(class5_name)
            this.class5Delete(class5)
            this.actionType = 'updatable'
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
.class4Menu{
    @include content--wrapper;
    &--transparent{
        @include content--wrapper($background-color: $bg-transparent);
    }
}
.class5Menu{
    @include content--wrapper($background-color: $bg-focus, $margin-bottom: 5px, $border-radius: 0);
    &--transparent{
        @include content--wrapper($background-color: $bg-transparent, $margin-bottom: 5px, $border-radius: 0);
    }
    &__wrapper{
        margin-bottom: 10px;
    }
}
</style>