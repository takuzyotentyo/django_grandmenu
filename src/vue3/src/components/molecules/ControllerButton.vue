<template>
    <div class="bottom_menu_button" :class="{ 'active': isShow }" @click="isActive = !isActive">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default({
    props: ['isShow'],
})
</script>



<style lang="scss" scoped>
    .bottom_menu_button{
        box-sizing: border-box;
        margin: 0 0 0 auto;
        right: 0px;
        width: 70px;
        height: 40px;
        padding-top:10px;
        padding-left:20px;
        padding-bottom:10px;
        border-radius: 20px 0 0 20px;
        background-color: $bg-primary;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        filter: $drop-shadow;
        & > span {
            width: 20px;
            height: 2px;
            border-radius: 1px;
            background-color: $text-primary;
            transform: rotate(0deg);
            transition: .4s ease-in-out;
        }
        &.active > span{
            &:nth-child(1){
                transform: translateY(9px) rotate(135deg);
            }
            &:nth-child(2){
                opacity: 0;
                transform: translateX(20px);
            }
            &:nth-child(3){
                transform: translateY(-9px) rotate(-135deg);
            }
        }
    }
</style>