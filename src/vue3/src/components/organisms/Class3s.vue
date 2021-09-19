<template>
    <div class="class3__wrapper">
          <Class3></Class3>
      <template v-for="(class1, class1_index) in menuLists" :key="class1_index">
        <template v-for="(class2, class2_index) in class1.class2s" :key="class2_index">
            <template v-for="(class3, class3_index) in class2.class3s" :key="class3_index">
                <ContentWrapper v-if="selectClass.class1==class1_index && selectClass.class2==class2_index">
                    <Content>{{ class3.name }}</Content>
                    <ContentHalf>¥ {{ class3.price }}</ContentHalf>
                    <ContentHalf>¥ {{ class3 }}</ContentHalf>
                </ContentWrapper>
            </template>
        </template>
      </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import ContentWrapper from "../atoms/ContentWrapper"
import Content from "../atoms/Content"
import ContentHalf from "../atoms/ContentHalf"
import Class3 from "../molecules/Class3"

export default {
    components: {
      ContentWrapper,
      Content,
      ContentHalf,
      Class3,
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
    },
}
</script>

<style lang="scss" scoped>
.class3__wrapper{
    width: 100%;
    height: calc(100% - 65px);
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-content: flex-start;
}
</style>