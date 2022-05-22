<template>
    <div class="postal_code">
    <TextboxPostalCode
        :value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
    />
    <IconButton
        class="icon--search"
        @click="$emit('yubinbango',postal_code)"
    />
    </div>
</template>

<script>
import TextboxPostalCode from "../atoms/TextboxPostalCode"
import IconButton from "../atoms/IconButton"

export default {
    props: ['modelValue'],
    emits:[
        'update:modelValue',
        'yubinbango',
    ],
    components: {
        TextboxPostalCode,
        IconButton,
  },
}
</script>

<style lang="scss" scoped>
.postal_code{
    width: 100%;
    display: grid;
    grid-template-rows: 42px;
    grid-template-columns: 83% 42px;
    grid-column-gap: calc(100% - 83% - 42px);
}
</style>