<template>
  <div id="wall">
    <el-container style="background-color: #f7f8f9">
      <el-header style="height: 80px; padding: 0">
        <Banner></Banner>
      </el-header>
      <el-container style="width: 95%; margin: 15px auto 0; background: #fff">
        <el-aside width="250px">
          <Aside></Aside>
        </el-aside>
        <el-main style="padding: 0"><Content></Content></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Banner from "../components/bannerTop";
import Aside from "../components/discuss/asideSearch";
import Content from "../components/wall/content.vue";
export default {
  name: "discussWall",
  components: {
    Banner,
    Aside,
    Content,
  },
};
</script>

<style lang="scss" scoped>
</style>>

