<template>
        <div class="cart icon--cart" @click='lightBoxShow("Cart")'>
            <div class="cart__quantity">10</div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"


export default {
    computed: {
        ...mapGetters([ 'lightBox' ])
    },
    methods: {
        ...mapActions([ 'lightBoxShow' ]),
    }
}
</script>

<style lang="scss" scoped>
.cart{
    position: absolute;
    width: 30px;
    height: 30px;
    right: 3vw;
    top: 10px;
    &__quantity{
        position: absolute;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        right: -0.5vw;
        top: -5px;
        line-height: 25px;
        font-size: 1.2rem;
        background-color: $bg-danger;
        color: $text-primary;
    }
}
</style>