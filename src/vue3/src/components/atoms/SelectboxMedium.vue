<template>
    <select class="selectbox--medium" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" required>
        <option value='' disabled selected style='display:none;'>選択してください</option>
        <option v-for="(option, index) in selectBoxOptions" :value="option.value" :key="index">{{ option.label }}</option>
    </select>
</template>

<script>
export default {
    props: ['modelValue', 'selectBoxOptions'],
    emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
    .selectbox--medium{
        @include selectbox($width: calc(82%));
    }
</style>