<template>
    <input type="text" class="textbox--number_half"
        :value="modelValue" 
        @change="$emit('update:modelValue', halfSizeNumberFormat($event.target.value))"
        inputmode="numeric">
</template>

<script>
export default {
    props: ['modelValue'],
    emits:['update:modelValue'],
    methods: {
        halfSizeNumberFormat(number) {
            console.log(number)
            if( number == 0 ){
                console.log(true)
                return number
            }else{
                return number.replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,'');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .textbox--number_half{
        @include selectbox($width: 49%);
        &[disabled]{
            background-image: linear-gradient(to right, $bg-disabled 50%, $bg-disabled 50%);
        }
    }
</style>