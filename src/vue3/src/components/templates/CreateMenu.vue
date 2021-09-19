<template>
    <div class='create_menu'>
        <RadioButton v-model="MenuOrDetail" :radioButtonOptions="radioButtonOptions" :checked="MenuOrDetail"></RadioButton>
        <UpFade>
            <keep-alive>
                    <component :is="MenuOrDetail"></component>
            </keep-alive>
        </UpFade>
    </div>
</template>

<script>
import UpFade from "../transition/UpFade"
import CreateMenuForm from "./CreateMenuForm"
import CreateDetailForm from "./CreateDetailForm"
import RadioButton from "../atoms/RadioButton"


export default {
    data: () => {
        return {
            MenuOrDetail: 'CreateDetailForm',
            radioButtonOptions: [
                {
                    id: 'create_menu',
                    value: 'CreateMenuForm',
                    name: 'MenuOrDetail',
                    label: 'メニュー作成',
                },
                {
                    id: 'create_setmenu',
                    value: 'CreateDetailForm',
                    name: 'MenuOrDetail',
                    label: '詳細設定',
                }
            ],
        }
    },
    components: {
        UpFade,
        CreateMenuForm,
        CreateDetailForm,
        RadioButton,
    },
}
</script>

<style lang='scss' scoped>
.create_menu{
    width: 280px;
    &::after{
        display: block;
        width: 100%;
        height: 75px;
        content: '';
    }
}
.radio_button{
    @include radio_button;
    &__unit{
        @include radio_button__unit;
    }
    &__label{
        @include radio_button__label;
            font-size: 14px;
        }
    &:checked + label{
        @include radio_button__checked;
    }
}
</style>