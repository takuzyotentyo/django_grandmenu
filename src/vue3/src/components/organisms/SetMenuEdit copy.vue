<template>
    <article>
        <h3>登録済みのセットメニュー</h3>
        <RadioButton v-model="actionType" :radioButtonOptions="radioButtonOptions"/>

        <draggable v-model="setMenusListsOrder" :key="id" tag="ul" handle=".icon--handle" :group="{ name: 'class4' }">
            <template #item="class4">
                <div>
                    <li v-if="actionType=='edittable_class4_' + (class4.index)" class="class4Menu--transparent">
                        <TextboxMidium v-model="setMenusListsOrder[class4.index].name"/>
                        <IconButton class="icon--check" @click="class4_update({index: class4.index, name: class4.element.name})"/>
                        <IconButtonDanger class="icon--delete" @click="class4_delete({index: class4.index, name: class4.element.name})"/>
                    </li>
                    <li v-else class="class4Menu">
                        <ContentMidium @click="class5Show(class4.index)">{{ class4.element.name }}</ContentMidium>
                        <IconButton class="icon--handle" v-if="actionType=='draggable'" @mousedown="class5Hidden()" @touchstart="class5Hidden()"/>
                        <IconButton class="icon--create" v-else @click="class4_edit_start(class4.index)"></IconButton>
                    </li>
                    <LeftFade>
                        <template v-if="class4.element['isShow'] == true">
                        <draggable v-model="class4.element.class5s" :key="id" tag="ul" handle=".icon--handle" :group="{ name: 'class5' }">
                            <template #item="class5">
                            <li v-if="actionType=='edittable_class4_' + class4.index + '_class5_' + class5.index" class="class5Menu--transparent">
                                <TextboxMidium v-model="setMenusListsOrder[class4.index].class5s[class5.index].name"/>
                                <IconButton class="icon--check" @click="class5_update({class4_index: class4.index, class5_index: class5.index, name:class5.element.name})"/>
                                <TextboxMidiumNumber v-model="setMenusListsOrder[class4.index].class5s[class5.index].price"/>
                                <IconButtonDanger class="icon--delete" v-if="actionType=='edittable_class4_' + class4.index + '_class5_' + class5.index" @click="class5_delete({class4_index: class4.index, class5_index: class5.index, name:class5.element.name})"/>
                            </li>
                            <li v-else class="class5Menu">
                                <ContentMidium>{{ class5.element.name }}</ContentMidium>
                                <IconButtonFocus v-if="actionType=='draggable'" class="icon--handle" ></IconButtonFocus>
                                <IconButtonFocus v-else @click="class5_edit_start(class4.index, class5.index)" class="icon--create" />
                                <ContentMidium v-if="class5.element.price>=0">＋{{ class5.element.price }}円</ContentMidium>
                                <ContentMidium v-else> {{ class5.element.price }}円</ContentMidium>
                            </li>
                            </template>
                        </draggable>
                        </template>
                    </LeftFade>
                </div>
            </template>
        </draggable>
        <UpFade>
            <SubmitButton v-if="actionType=='draggable'" @click="setMenuOrderUpdateAction()">並べ替え確定</SubmitButton>
        </UpFade>
        <UpFade>
            <SubmitButtonMidium v-if="actionType=='draggable'" @click="setMenuOrderCreateAction()">並び順を元に戻す</SubmitButtonMidium>
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
import draggable from "vuedraggable"

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
        draggable,
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
        class5Hidden(){
            console.log("class5Hidden")
            this.setMenusListsOrder.forEach( (class4) => {
                console.log(class4)
                class4['isShow'] = false
            })
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
                    id: class4.id,
                    name: class4.name,
                    isShow: false,
                    isEdit: false,
                    isDraggable: false,
                    class5s:[]
                }
                class4.class5s.forEach((class5) => {
                    this.setMenusListsOrder[class4_index].class5s.push({
                        id: class5.id,
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
            this.actionType = 'edittable_class4_' + class4_index
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
        @include content--wrapper($background-color: $bg-transparent, $margin-bottom: 0px, $border-radius: 0);
    }
}
</style>