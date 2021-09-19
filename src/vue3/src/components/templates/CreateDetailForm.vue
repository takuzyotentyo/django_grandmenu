<template>
    <div>
        <SetMenuCreate></SetMenuCreate>
        <SetMenuEdit></SetMenuEdit>
    </div>
</template>

<script>
import SetMenuCreate from "../organisms/SetMenuCreate"
import SetMenuEdit from "../organisms/SetMenuEdit copy"
// import SetMenuEdit from "../organisms/SetMenuEdit"

export default {
    components: {
        SetMenuCreate,
        SetMenuEdit,
    },
}
</script>