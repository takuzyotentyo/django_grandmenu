<template>
    <li class="class4--select">
        <Selectbox 
            :model-value="class4_name"
            @update:model-value="$emit('update:class4_name', $event)"
            :selectBoxOptions="selectBoxOptions" required/>
        <IconButtonDanger class="icon--delete" @click="$emit('deleteClass4',class4_index)"/>
    </li>

</template>
<script>
import Selectbox from "../atoms/Selectbox"
import IconButtonDanger from "../atoms/IconButtonDanger"

export default {
    props: [
        'class4_index',
        'class4_name',
        'selectBoxOptions',
    ],
    emits: [
        'update:class4_name',
        'deleteClass4',
    ],
    components: {
        Selectbox,
        IconButtonDanger,
    },
}
</script>

<style lang="scss" scoped>
.class4--select{
    width: 100%;
    position:relative;
    display: grid;
    grid-template-rows: 42px;
    grid-template-columns: 83% 42px;
    grid-gap: 0 calc(100% - 83% - 42px);
}
</style>