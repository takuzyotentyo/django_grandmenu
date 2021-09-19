<template>
    <span class='content--midium'>
            <slot/>
        </span>
</template>

<script>

export default {
}
</script>


<style lang="scss" scoped>
    .content--midium{
        width: calc(82% - 10px);
        line-height: 42px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: auto 5px;
    }
</style>