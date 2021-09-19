<template>
    <input type="text" class="textbox_wihth_icon" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" required>
</template>

<script>
export default {
    props: ['modelValue'],
    emits:['update:modelValue']
}
</script>

<style lang="scss" scoped>
    .textbox_wihth_icon{
        @include textbox($width: 82%);
    }
</style> 