<template>
  <el-container style="margin-top: 40px">
    <index-left></index-left>
    <index-right></index-right>
  </el-container>
</template>

<script>
    import IndexLeft from "./IndexLeft";
    import IndexRight from "./IndexRight";
    export default {
        name: "IndexContainer",
        components:{
          IndexLeft,IndexRight
        }
    }
</script>

<style scoped>

</style>
