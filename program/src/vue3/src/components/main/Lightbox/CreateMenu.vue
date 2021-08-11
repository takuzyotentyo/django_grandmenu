<template>
    <div class='create_menu'>
        <div class="radio_button__unit">
            <input type="radio" id="create_menu" name="MenuOrDetail" class="radio_button" @change="MenuOrDetail = 'CreateMenuForm'" :checked="MenuOrDetail == 'CreateMenuForm' ? true : false">
            <label for="create_menu" class="radio_button__label" >メニュー作成</label>
            <input type="radio" id="create_setmenu" name="MenuOrDetail" class="radio_button" @change="MenuOrDetail = 'CreateDetailForm'" :checked="MenuOrDetail == 'CreateDetailForm' ? true : false">
            <label for="create_setmenu" class="radio_button__label" >詳細設定</label>
        </div>
        <UpFade>
            <keep-alive>
                    <component :is="MenuOrDetail"></component>
            </keep-alive>
        </UpFade>
    </div>
</template>

<script>
import UpFade from "../../transition/UpFade"
import CreateMenuForm from "./CreateMenuForm"
// import CreateDetailForm from "./CreateDetailForm"

export default {
    data: () => {
        return {
            MenuOrDetail: 'CreateMenuForm',
        }
    },
    components: {
        UpFade,
        CreateMenuForm,
        // CreateDetailForm
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