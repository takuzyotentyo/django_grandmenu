<template>
    <div class="quantity_select">
        <IconButtonFocus class="icon--increase" @click="increment()"></IconButtonFocus>
        <Textbox :value="modelValue" class='text_align' disabled></Textbox>
        <IconButtonFocus class="icon--decrease" @click="decrement()"></IconButtonFocus>
    </div>

</template>
<script>
import IconButtonFocus from "../atoms/IconButtonFocus"
import Textbox from "../atoms/Textbox"

export default {
    props: [
        'modelValue'
        ],
    emits:[
        'update:modelValue'
        ],
    components: {
        IconButtonFocus,
        Textbox,
    },
    methods:{
        increment(){
            console.log('increment')
            this.$emit('update:modelValue', this.modelValue +1)
        },
        decrement(){
            console.log('decrement')
            if(this.modelValue < 1){
                this.$emit('update:modelValue', 0)
            }else{
                this.$emit('update:modelValue', this.modelValue -1)
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