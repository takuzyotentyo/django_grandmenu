<template>
    <div class="create_detail">
        <SetMenuCreate></SetMenuCreate>
        <SetMenuEdit></SetMenuEdit>
    </div>
</template>

<script>
import SetMenuCreate from "../organisms/SetMenuCreate"
import SetMenuEdit from "../organisms/SetMenuEdit"

export default {
    components: {
        SetMenuCreate,
        SetMenuEdit,
    },
}
</script>

<style lang="scss" scoped>
</style>