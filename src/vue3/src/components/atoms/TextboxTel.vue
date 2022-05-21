<template>
    <input 
        type="tel"
        class="textbox"
        :value="modelValue"
        @input="$emit('update:modelValue', halfSizeFormatNumber_tel($event.target.value))"
        inputmode="numeric"
        minlength="9"
        maxlength="18"
        pattern="\d{2,4}-?\d{2,4}-?\d{3,4}"
        autocomplete="tel"
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
    .textbox{
        @include textbox;
    }
</style>