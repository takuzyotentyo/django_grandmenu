<template>
    <span class='content'>
            <slot/>
        </span>
</template>

<script>

export default {
}
</script>


<style lang="scss" scoped>
    .content{
        width: 100%;
        line-height: 42px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; 
        text-align: center;
    }
</style>