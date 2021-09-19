<template>
    <ContentWrapper class="bg_primary">
        <Content>aaaaa</Content>
        <ContentHalf>aaaa</ContentHalf>
        <ContentHalf>aaaa</ContentHalf>
    </ContentWrapper>
</template>

<script>

import ContentWrapper from "../atoms/ContentWrapper"
import Content from "../atoms/Content"
import ContentHalf from "../atoms/ContentHalf"

export default({
    components: {
      ContentWrapper,
      Content,
      ContentHalf,
    },
    // props: ['class3'],
})
</script>


<style lang="scss" scoped>
.bg_primary{
    background-color: $bg-primary;
}
</style>