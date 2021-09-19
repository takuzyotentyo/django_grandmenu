<template>
    <span class='content--small'>
            <slot/>
        </span>
</template>

<script>

export default {
}
</script>


<style lang="scss" scoped>
    .content--small{
        width: calc(32% - 10px);
        line-height: 42px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 5px;
    }
</style>