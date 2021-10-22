<template>
    <div class="postal_code">
    <TextboxNumber
        :model-value="postal_code"
        @update:model-value="$emit('update:postal_code', $event)"
        :string="true"
        placeholder="郵便番号"
        pattern="\d{3}-?\d{4}"
        required
    />
    <IconButton
        class="icon--search"
        @click="$emit('yubinbango',postal_code)"
    />
    </div>
</template>

<script>
import TextboxNumber from "../atoms/TextboxNumber"
import IconButton from "../atoms/IconButton"

export default {
    props: [
        'postal_code',
    ],
    emits: [
        'update:postal_code',
        'yubinbango',
    ],
    components: {
        TextboxNumber,
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
    // grid-row-gap: 5px;
    grid-column-gap: calc(100% - 83% - 42px);
}
</style>