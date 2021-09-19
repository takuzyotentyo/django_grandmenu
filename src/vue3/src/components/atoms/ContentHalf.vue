<template>
    <span class='content--half'>
            <slot/>
    </span>
</template>

<script>

export default {
}
</script>


<style lang="scss" scoped>
    .content--half{
        width: calc(50% - 10px);
        line-height: 42px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;   
        padding: 0 5px; 
    }
</style>