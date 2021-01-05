<template>
    <el-container>

      <el-header>
        <Header></Header>
      </el-header>

      <router-view/>

      <el-footer style="margin-top: 50px;height: 250px;padding: 35px 0">
        <Footer></Footer>
      </el-footer>

    </el-container>
</template>

<script>
    import Header from "./common/Header";
    import Footer from "./common/Footer";
    export default {
        name: "IndexPage",
        data() {
          return {

          };
        },
        components:{
          Header,Footer
        }
    }
</script>

<style>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .el-footer{
    background-color: #B3C0D1;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }

  .el-main {
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
