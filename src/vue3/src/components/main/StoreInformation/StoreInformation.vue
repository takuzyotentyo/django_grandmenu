
<template>
<form @submit.prevent="submit" class='storeInformation__wraooer h-adr'>
  <h4>お店の名前</h4>
  <input type="text" class="textbox" name="store_name" placeholder="店舗名" required :value="storeName">
  <h4>席数</h4>
  <input type="text" inputmode="numeric" class="textbox" name="seating_capacity" placeholder="テーブル数" required :value="seatingCapacity">
  <h4>テイクアウト対応</h4>
  <div class="radio_button__unit">
      <input type="radio" id="takeout_support--false" class="radio_button" name="takeout_support" value="False" :checked="takeoutSupport ? false : true">
      <label for="takeout_support--false" class="radio_button__label">非対応</label>
      <input type="radio" id="takeout_support--true" class="radio_button" name="takeout_support" value="True" :checked="takeoutSupport ? true : true">
      <label for="takeout_support--true" class="radio_button__label">対応</label>
  </div>

  <h4>郵便番号</h4>
  <!-- <span class="p-country-name" style="display:none;">Japan</span> -->
  <input type="text" inputmode="numeric" class="textbox--store_postal_code" placeholder="0000000" pattern="\d{3}-?\d{4}" v-model="store_postal_code"/>
  <div class="icon_button icon--search" @click="yubinbango()"></div>
  <h4>都道府県</h4>
  <input type="text" class="textbox" v-model="store_address1" disabled required>
  <h4>市区町村</h4>
  <input type="text" class="textbox" v-model="store_address2" disabled required>
  <h4>番地</h4>
  <input type="text" class="textbox" v-model="store_address3" required placeholder="◯丁目◯番地">
  <h4>建物・部屋番号</h4>
  <input type="text" class="textbox" v-model="store_address4" placeholder="◯◯ビル◯◯階◯◯◯号室">

  <button type="submit" class="submit_button">登録</button>
</form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { Core as YubinBangoCore } from 'yubinbango-core'

export default {
  data: () => {
    return {
      store_postal_code: null,
      store_address1: null,
      store_address2: null,
      store_address3: null,
      store_address4: null,
    }
  },
  computed: {
    ...mapGetters([ 'storeName', 'storeID', 'seatingCapacity', 'takeoutSupport'])
  },
  methods: {
    ...mapActions([ 'storeInformation_update' ]),
    submit(submitEvent){
      const store_id = this.storeID
      const store_name = submitEvent.target.elements.store_name.value;
      const seating_capacity= submitEvent.target.elements.seating_capacity.value;
      const takeout_support = submitEvent.target.elements.takeout_support.value;
      const storeInformation = {
        'store_id' :store_id,
        'store_name' :store_name,
        'seating_capacity' :seating_capacity,
        'takeout_support' :takeout_support,
      }
      this.storeInformation_update(storeInformation)
    },
    yubinbango() {
      this.store_postal_code = this.halfSizeNumberFormat(this.store_postal_code)
      console.log('yubinbango')
      new YubinBangoCore(this.store_postal_code, (addr)=> {
        this.store_address1 = addr.region // 都道府県
        this.store_address2 = addr.locality + addr.street// 市区町村
        // this.store_address3 = addr.street // 町域
      })
    },
    halfSizeNumberFormat(number) {
      return number.replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,'');
    },
  }
}
</script>

<style lang="scss" scoped>
.storeInformation__wraooer{
  display: flex;
  width: 280px;
  flex-flow: wrap;
  margin: 50px auto 50px;
}

.textbox{
    @include textbox;
    &--store_postal_code{
        @include textbox($width: calc(100% - 50px));
    }
}

.radio_button{
    @include radio_button;
    &__unit{
        @include radio_button__unit;
    }
    &__label{
        @include radio_button__label;
    }
    &:checked + label{
        @include radio_button__checked;
    }
}

.icon_button{
  @include icon_button;
}

.submit_button{
    @include submit_button;
}
</style>
