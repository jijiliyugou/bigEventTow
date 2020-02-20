<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
    <bm-view class="map" center="北京"> </bm-view>
    <bm-transit
      start="百度大厦"
      end="北京邮电大学西门"
      :auto-viewport="true"
      location="北京"
    ></bm-transit>
  </baidu-map>
</template>
<script>
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap);
      console.log(map);

      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  }
};
</script>
<style scoped lang="less">
.map {
  width: 100%;
  height: 400px;
}
</style>
