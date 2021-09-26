<template>
    <div class="class3__wrapper">
      <template v-for="(class1, class1_index) in menuLists" :key="class1_index">
        <template v-for="(class2, class2_index) in class1.class2s" :key="class2_index">
            <template v-for="(class3, class3_index) in class2.class3s" :key="class3_index">
                <template v-if="selectClass.class1==class1_index && selectClass.class2==class2_index">
                    <Class3Show
                        :class3_name="class3.name"
                        :class3_price="class3.price"
                        @addCart="addCart"
                    />
                    
                <!-- <ContentWrapper v-if="selectClass.class1==class1_index && selectClass.class2==class2_index">
                    <Content>{{ class3.name }}</Content>
                    <Content>¥ {{ class3.price }}</Content>
                    <Content>¥ {{ class3 }}</Content>
                </ContentWrapper> -->
                </template>
            </template>
        </template>
      </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import Class3Show from "../molecules/Class3Show"

export default {
    components: {
        Class3Show,
    },
    data: () => {
    return {
        }
    },
    computed: {
        ...mapGetters([ 'menuLists' ,'selectClass']),
        // ...mapGetters([ 'menuLists' ,'setMenuLists' ,'selectClass']),
    },
    methods: {
        // ...mapActions([ 'selectClass1Update', 'selectClass2Update', 'lightBoxShow' ]),
        // selectClass2(){
        //     const newClass2 = event.target.getAttribute('value')
        //     this.selectClass2Update(newClass2)
        //     this.lightBoxShow('Class3')
        // },
        addCart(menu){
            console.log(menu)
        }
    },
}
</script>

<style lang="scss" scoped>
.class3__wrapper{
    width: 100%;
    height: calc(100% - 65px);
    padding-bottom: 125px;
    display: grid;
    grid-template-columns: 49.5% 49.5%;
    grid-auto-rows: 90px;
    grid-gap:10px 1%;
    @include mq('tb'){
        grid-template-columns: 100%;
    }
    &::after{
        @include after;
    }
}
</style>