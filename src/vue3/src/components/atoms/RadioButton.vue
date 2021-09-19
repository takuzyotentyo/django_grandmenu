<template>
    <div class="radio_button__unit">
        <template v-for="(radioButtonOption, index) in radioButtonOptions" :key="index">
            <input type="radio" class="radio_button" 
                :id="radioButtonOption.id"  
                :name="radioButtonOption.name" 
                :value="radioButtonOption.value" 
                @change="$emit('update:modelValue', $event.target.value)"
                :checked="modelValue == radioButtonOption.value? true: false"
                required>
            <label :for="radioButtonOption.id" class="radio_button__label">{{ radioButtonOption.label }}</label>
        </template>
    </div>
</template>

<script>
export default {
    props: ['modelValue', 'radioButtonOptions'],
    emits:['update:modelValue'],
}
</script>

<style lang="scss" scoped>
    .radio_button{
    @include radio_button;
    &__unit{
        @include radio_button__unit;
    }
    &__label{
        @include radio_button__label;
    }
    &:checked + label{
        @include radio_button__checked;
    }
}
</style>