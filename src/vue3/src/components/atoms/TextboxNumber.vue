<template>
    <input 
        v-if="string==true"
        type="text"
        class="textbox--number"
        :value="modelValue"
        @input="$emit('update:modelValue', halfSizeFormatNumber_String($event.target.value))"
        inputmode="numeric"
        >

    <input 
        v-else
        type="text"
        class="textbox--number"
        :value="modelValue"
        @input="$emit('update:modelValue', halfSizeFormatNumber($event.target.value))"
        inputmode="numeric"
        >
</template>

<script>
export default {
    props: [
        'modelValue',
        'string',
    ],
    emits:[
        'update:modelValue',
    ],
    methods: {
        halfSizeFormatNumber(number) {
            console.log('halfSizeFormatNumber')
            if( number == 0 ){
                return number
            }else{
                return Number(String(number).replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,''));
            }
        },
        halfSizeFormatNumber_String(number) {
            console.log('halfSizeFormatNumber_String')
            if( number == 0 ){
                return number
            }else{
                return String(number).replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,'')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .textbox--number{
        @include textbox;
        &[disabled]{
            background-image: linear-gradient(to right, $bg-disabled 50%, $bg-disabled 50%);
        }
    }
</style>