<template>
  <div class="searchDetail">
    <Header></Header>
    <Content></Content>
  </div>
</template>
<script>
import Header from "../components/bannerTop.vue";
import Content from "../components/searchDetail/content.vue";
export default {
  name: "searchDetail",
  components: { Header, Content },
};
</script>
<style lang="scss" scoped>
.searchDetail {
  width: 1280px;
  height: 615px;
  background: #f8f8f8;
}
</style>