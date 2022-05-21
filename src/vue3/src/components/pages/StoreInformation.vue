
<template>
  <form @submit.prevent="submit" class='storeInformation h-adr'>
    <!-- vueの制約上、テンプレートタグの直下にコメントを核とエラーになるため、個々に記載。formタグの"h-adr"クラスは"yubinbango-core"を使うために必要なクラス -->
    <h4>お店の名前</h4>
    <Textbox v-model="store_name" placeholder="店舗名" required/>
    
    <h4>席数</h4>
    <TextboxNumber v-model="seating_capacity" placeholder="テーブル数" required/>
    
    <h4>テイクアウト対応</h4>
    <RadioButton v-model="takeout_support" :radioButtonOptions="radioButtonTakeoutSupport"/>

    <h4>電話番号</h4>
    <TextboxNumber v-model="store_telnum" placeholder="電話番号" required/>

    <h4>郵便番号</h4>
    <PostalCode 
      v-model:postal_code="store_postal_code"
      @yubinbango='yubinbango'
    />
    <h4>都道府県</h4>
    <Textbox type="text" v-model="store_address1" placeholder="都道府県名" disabled required/>
    <h4>市区町村</h4>
    <Textbox type="text" v-model="store_address2" placeholder="市区町村名" disabled required/>
    <h4>町域</h4>
    <Textbox type="text" v-model="store_address3" placeholder="町域名" disabled required/>
    <h4>番地</h4>
    <Textbox type="text" v-model="store_address4" placeholder="◯丁目◯番地" required/>
    <h4>建物・部屋番号</h4>
    <Textbox type="text" v-model="store_address5" placeholder="◯◯ビル◯◯階◯◯◯号室"/>

    <SubmitButton type="submit">登録</SubmitButton>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { Core as YubinBangoCore } from 'yubinbango-core'
import Textbox from "../atoms/Textbox"
import TextboxNumber from "../atoms/TextboxNumber"
import RadioButton from "../atoms/RadioButton"
import SubmitButton from "../atoms/SubmitButton"
import PostalCode from "../molecules/PostalCode"

export default {
  data: () => {
    return {
      pk: null,
      store_name: null,
      seating_capacity: 1,
      takeout_support: "false",
      store_telnum: null,
      store_postal_code: null,
      store_address1: null,
      store_address2: null,
      store_address3: null,
      store_address4: null,
      store_address5: null,
      radioButtonTakeoutSupport: [
        {id: 'takeout_support--false', value: 'false', name: 'takeout_support', label: '非対応'},
        {id: 'takeout_support--true', value: 'true', name: 'takeout_support', label: '対応'}
      ],
    }
  },
  components: {
        Textbox,
        TextboxNumber,
        RadioButton,
        SubmitButton,
        PostalCode,
  },
  watch: {
    PK:{
      handler(){
        this.pk = this.PK
      },
      immediate: true,
    },
    storeName:{
      handler(){
        this.store_name = this.storeName
      },
      immediate: true,
    },
    seatingCapacity:{
      handler(){
        this.seating_capacity = this.seatingCapacity
      },
      immediate: true,
    },
    takeoutSupport:{
      handler(){
        this.takeout_support = String(this.takeoutSupport)
      },
      immediate: true,
    },
    storeTelNum:{
      handler(){
        this.store_telnum = this.storeTelNum
      },
      immediate: true,
    },
    storePostalCode:{
      handler(){
        this.store_postal_code = this.storePostalCode
      },
      immediate: true,
    },
    storeAddress1:{
      handler(){
        this.store_address1 = this.storeAddress1
      },
      immediate: true,
    },
    storeAddress2:{
      handler(){
        this.store_address2 = this.storeAddress2
      },
      immediate: true,
    },
    storeAddress3:{
      handler(){
        this.store_address3 = this.storeAddress3
      },
      immediate: true,
    },
    storeAddress4:{
      handler(){
        this.store_address4 = this.storeAddress4
      },
      immediate: true,
    },
    storeAddress5:{
      handler(){
        this.store_address5 = this.storeAddress5
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters([
      'PK',
      'storeName',
      'seatingCapacity',
      'takeoutSupport',
      'storeTelNum',
      'storePostalCode',
      'storeAddress1',
      'storeAddress2',
      'storeAddress3',
      'storeAddress4',
      'storeAddress5',
    ])
  },
  methods: {
    ...mapActions([ 'storeInformation_update' ]),
    submit(){
      const storeInformation = {
        'pk':this.pk,
        'store_name': this.store_name,
        'seating_capacity': this.seating_capacity,
        'takeout_support': this.takeout_support,
        'store_telnum': this.store_telnum,
        'store_postal_code': this.store_postal_code,
        'store_address1': this.store_address1,
        'store_address2': this.store_address2,
        'store_address3': this.store_address3,
        'store_address4': this.store_address4,
        'store_address5': this.store_address5,
      }
      this.storeInformation_update(storeInformation)
    },
    yubinbango() {
      console.log('郵便番号変換')
      console.log(this.store_postal_code)
      this.store_postal_code = this.halfSizeNumberFormat(this.store_postal_code)
      new YubinBangoCore(this.store_postal_code, (addr)=> {
        this.store_address1 = addr.region // 都道府県
        this.store_address2 = addr.locality// 市区町村
        this.store_address3 = addr.street // 町域
      })
    },
    halfSizeNumberFormat(number) {
      return String(number).replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,'')
    },
  }
}
</script>

<style lang="scss" scoped>
.storeInformation{
  width: 280px;
  margin-top: 50px;
  &>:nth-child(n){
    margin-bottom: 5px;
  }
  &::after{
    @include after;
  }
  &>button{
    margin-top:15px;
  }
}
</style>
