
<template>
<form @submit.prevent="submit" class='storeInformation__wraooer'>
  <h4>お店の名前</h4>
  <input type="text" class="textbox" name="store_name" placeholder="店舗名" required :value="storeName">
  <h4>席数</h4>
  <input type="tel" class="textbox" name="seating_capacity" placeholder="テーブル数" required :value="seatingCapacity">
  <h4>テイクアウト対応</h4>
  <div class="radio_button__unit">
      <input type="radio" id="takeout_support--false" class="radio_button" name="takeout_support" value="False" :checked="takeoutSupport ? false : true">
      <label for="takeout_support--false" class="radio_button__label">非対応</label>
      <input type="radio" id="takeout_support--true" class="radio_button" name="takeout_support" value="True" :checked="takeoutSupport ? true : true">
      <label for="takeout_support--true" class="radio_button__label">対応</label>
  </div>
  <button type="submit" class="submit_button">登録</button>
</form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
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
  },
}
</script>

<style lang="scss" scoped>
.storeInformation__wraooer{
  display: block;
  width: 280px;
}

.textbox{
    @include textbox;
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

.submit_button{
    @include submit_button;
}
</style>
