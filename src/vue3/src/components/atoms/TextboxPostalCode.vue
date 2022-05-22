<template>
    <input 
        type="text"
        class="textbox--number"
        :value="modelValue"
        @input="$emit('update:modelValue', halfSizeFormatNumber_tel($event.target.value))"
        inputmode="numeric"
        minlength="7"
        maxlength="8"
        pattern="\d{3}-?\d{4}"
        autocomplete="shipping postal-code"
        placeholder="郵便番号"
        required
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
        halfSizeFormatNumber_tel(number) {
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
    }
</style>