
<template>
  <form @submit.prevent="submit" class='storeInformation h-adr'>
    <h4>お店の名前</h4>
    <Textbox v-model="store_name" placeholder="店舗名" required/>
    
    <h4>席数</h4>
    <TextboxNumber v-model="seating_capacity" placeholder="テーブル数" required/>
    
    <h4>テイクアウト対応</h4>
    <RadioButton v-model="takeout_support" :radioButtonOptions="radioButtonTakeoutSupport"/>

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

    <SubmitButton type="submit" v-on:click="postStoreInfoAPI">登録</SubmitButton>
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
      pk: 0,
      store_name: "",
      seating_capacity: "",
      takeout_support: "false",
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
  mounted: function() {
    this.getStoreInfoAPI()
  },
  // watch: {
  //           menuLists:{
  //               handler(){
  //                   this.selectBoxOptionCreate()
  //               },
  //               deep: true,
  //               immediate: true,
  //           }
  //       },
  watch: {
    storeName:{
      handler(){
        this.store_name = this.storeName
        console.log(this.store_name)
      },
      immediate: true,
    },
    seatingCapacity:{
      handler(){
        this.seating_capacity = this.seatingCapacity
        console.log(this.seating_capacity)
      },
      immediate: true,
    },
    takeoutSupport:{
      handler(){
        this.takeout_support = String(this.takeoutSupport)
        console.log(this.takeout_support)
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
      'storeID',
      'storeName',
      'seatingCapacity',
      'takeoutSupport',
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
    // readStoreInformation(){
    //   console.log('readStoreInformation')
    //   this.store_name = this.storeName
    //   this.seating_capacity = this.seatingCapacity
    //   this.takeout_support = this.takeoutSupport
    //   this.store_postal_code = this.storePostalCode
    //   this.store_address1 = this.storeAddress1
    //   this.store_address2 = this.storeAddress2
    //   this.store_address3 = this.storeAddress3
    //   this.store_address4 = this.storeAddress4
    //   this.store_address5 = this.storeAddress5
    // },
    submit(){
      const storeInformation = {
        'store_name': this.store_name,
        'seating_capacity': this.seating_capacity,
        'takeout_support': this.takeout_support,
        'store_postalCode': this.store_postal_code,
        'store_address1': this.store_address1,
        'store_address2': this.storeｆ_address2,
        'store_address3': this.store_address3,
        'store_address4': this.store_address4,
        'store_address5': this.store_address5,
      }
      this.storeInformation_update(storeInformation)
    },
    yubinbango() {
      console.log('郵便番号')
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
    getStoreInfoAPI () {
      this.axios.get('http://localhost:8000/api/store_information/')
      .then(response => {
        // let header = response.header
        let result = response.data[0]
        this.pk = result.pk
        this.store_name = result.store_name
        this.seating_capacity = result.seating_capacity
        this.takeout_support = String(result.takeout_support)
        this.store_postal_code = result.store_postal_code
        this.store_address1 = result.store_address1
        this.store_address2 = result.store_address2
        this.store_address3 = result.store_address3
        this.store_address4 = result.store_address4
        this.store_address5 = result.store_address5
        console.log(response)
      })
    },
    postStoreInfoAPI () {
      this.axios.defaults.xsrfCookieName = 'csrftoken'
      this.axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
      this.axios.patch("http://localhost:8000/api/store_information/" + this.pk + '/', {
        store_name : this.store_name,
        seating_capacity : this.seating_capacity,
        takeout_support : this.takeout_support,
        store_postal_code : this.store_postal_code,
        // 電話番号は ？？
        store_address1 : this.store_address1,
        store_address2 : this.store_address2,
        store_address3 : this.store_address3,
        store_address4 : this.store_address4,
        store_address5 : this.store_address5,
      })
      .then(response => {
        console.log("API post OK!")
        console.log(response)
        // ここで登録(編集)が完了しました的な表示出力が欲しい
      })
    }
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
