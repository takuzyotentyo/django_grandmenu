<template>
        <input 
        type="text"
        class="textbox"
        :value="modelValue"
        @input="$emit('update:modelValue', halfSizeFormatNumber($event.target.value))"
        inputmode="numeric"
        >
</template>

<script>
export default {
    props: [
        'modelValue',
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
    },
}
</script>

<style lang="scss" scoped>
        .textbox{
        @include textbox;
    }
</style>