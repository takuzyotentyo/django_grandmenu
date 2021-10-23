<template>
    <input type="text" class="textbox" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script>
export default {
    props: ['modelValue'],
    emits:['update:modelValue']
}
</script>

<style lang="scss" scoped>
    .textbox{
        @include textbox;
    }
</style>