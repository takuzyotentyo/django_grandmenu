<template>
    <article class="set_menu_edit">
        <h3>登録済みのセットメニュー</h3>
        <RadioButton v-model="actionType" :radioButtonOptions="radioButtonOptions"/>

        <draggable v-model="setMenusListsOrder" :key="id" tag="ul" handle=".icon--handle" :group="{ name: 'class4' }" class="class4_draggable">
            <template #item="class4">
                <div>
                    <Class4Edit
                        v-if="actionType=='edittable_class4_' + class4.index"
                        :class4_index="class4.index"
                        v-model:class4_name="class4.element.name"
                        @class4_update="class4_update"
                        @class4_delete="class4_delete"
                    />
                    <Class4Drug
                        v-else-if="actionType=='draggable'"
                        :class4_index="class4.index"
                        :class4_name="class4.element.name"
                        @class5Show="class5Show"
                        @class5Hidden="class5Hidden"
                    />
                    <Class4Show
                        v-else
                        :actionType="actionType"
                        :class4_index="class4.index"
                        :class4_name="class4.element.name" 
                        @class5Show="class5Show"
                        @class4_edit_start="class4_edit_start"
                    />
                    <LeftFade>
                        <template v-if="class4.element['isShow'] == true">
                            <draggable v-model="class4.element.class5s" :key="id" tag="ul" handle=".icon--handle" :group="{ name: 'class5' }" class="class5_draggable">
                                <template #item="class5">
                                    <Class5Edit 
                                        v-if="actionType=='edittable_class4_' + class4.index + '_class5_' + class5.index"
                                        v-model:class5_name="class5.element.name" 
                                        v-model:class5_price="class5.element.price" 
                                        :class4_index="class4.index"
                                        :class5_index="class5.index"
                                        @class5_update="class5_update"
                                        @class5_delete="class5_delete"
                                    />
                                    <Class5Drug
                                        v-else-if="actionType=='draggable'"
                                        :class5_name="class5.element.name" 
                                        :class5_price="class5.element.price"
                                    />
                                    <Class5Show
                                        v-else
                                        :actionType="actionType"
                                        :class4_index="class4.index"
                                        :class5_index="class5.index"
                                        :class5_name="class5.element.name" 
                                        :class5_price="class5.element.price"
                                        @class5_edit_start="class5_edit_start"
                                    />
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
import SubmitButton from "../atoms/SubmitButton"
import SubmitButtonMidium from "../atoms/SubmitButtonMidium"
import draggable from "vuedraggable"
import Class4Show from "../molecules/Class4Show"
import Class4Drug from "../molecules/Class4Drug"
import Class4Edit from "../molecules/Class4Edit"
import Class5Edit from "../molecules/Class5Edit"
import Class5Drug from "../molecules/Class5Drug"
import Class5Show from "../molecules/Class5Show"


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
        RadioButton,
        SubmitButton,
        SubmitButtonMidium,
        draggable,
        Class4Show,
        Class4Drug,
        Class4Edit,
        Class5Edit,
        Class5Drug,
        Class5Show,
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
            console.log('class5_edit_start')
            this.actionType = 'edittable_class4_' + class4_index + '_class5_' + class5_index
        },
        class5_update(class5){
            console.log(class5)
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
.set_menu_edit{
    & > :nth-child(n){
        margin-bottom: 5px;
    }
    & > button{
        margin-top:15px;
    }
}
.class4_draggable > :nth-child(n){
    margin-bottom: 5px;
}
.class5_draggable {
    & > :nth-child(n){
        margin-bottom: 5px;
    }
    & > :nth-child(1){
        margin-top:5px;
    }
}
</style>