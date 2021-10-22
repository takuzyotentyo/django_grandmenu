<template>
    <div class="TableInvitation__wrapper">
        <p class="TableInvitation__msg">QRコードを読み込んでテーブルに参加</p>
        <QRCode :value="tableToken"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import QRCode from "../atoms/QRCode.vue"

export default {
    components: {
        QRCode,
    },
    data: () => {
        return {
        }
    },
    watch: {
    },
    mounted: ()=> {
    },
    computed: {
        ...mapGetters([ 'tableToken' ]),
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.TableInvitation{
    &__wrapper{
            width: 280px;
            margin: auto;
            // overflow-y: scroll;
        // &::after{
            // @include after;
        // }
    }
    &__msg{
        font-size: 1.4rem;
        color: $text-primary;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
    }
}
</style>