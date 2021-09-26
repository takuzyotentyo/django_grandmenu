<template>
    <div class="quantity_select">
        <IconButtonFocus class="icon--increase" @click="increment()"></IconButtonFocus>
        <Textbox v-model="quantity" class='text_align' disabled></Textbox>
        <IconButtonFocus class="icon--decrease" @click="decrement()"></IconButtonFocus>
    </div>

</template>
<script>
import IconButtonFocus from "../atoms/IconButtonFocus"
import Textbox from "../atoms/Textbox"

export default {
    props: [
    ],
    emits: [
    ],
    components: {
        IconButtonFocus,
        Textbox,
    },
    data: () => {
        return {
            quantity: 0,
        }
    },
    methods:{
        increment(){
            console.log('increment')
            this.quantity++
        },
        decrement(){
            console.log('decrement')
            if(this.quantity < 1){
                this.quantity=0
            }else{
                this.quantity--
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.quantity_select{
    width: 100%;
    display: grid;
    grid-template-rows: 42px;
    grid-template-columns: 30px 42px 30px;
    align-items: center;
    font-size: 1.4rem;
    >.text_align{
        padding: 0px;
        text-align: center;
    }
}
</style>