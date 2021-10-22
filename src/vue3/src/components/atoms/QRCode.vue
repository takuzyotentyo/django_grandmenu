<template>
    <vue-qrcode v-if="targetText" :value="targetText" :options="option" tag="img"></vue-qrcode>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
    components: {
        VueQrcode
    },
    data:() => {
        return {
            targetText: "",
            option: {
                errorCorrectionLevel: "M",
                maskPattern: 9,
                margin: 4,
                width: 280,
                color: {
                    dark: "#000000FF",
                    light: "#FFFFFFFF"
                }
            },
        }
    },
    props: [
        'value'
    ],
    mounted () {
        this.targetText = this.value
    },
    methods: {
        generate: function() {
            this.targetText = this.inputText;
        }
    },
}
</script>


<style lang="scss" scoped>
</style>