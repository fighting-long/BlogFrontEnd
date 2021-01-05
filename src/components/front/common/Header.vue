<template>

    <el-row style="height: 60px">
      <el-col :span="16" :push="3">
        <el-menu :default-active="isActive" class="el-menu-demo" mode="horizontal" router background-color="#B3C0D1">
          <el-menu-item index="/"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-menu-item index="/type"><i class="el-icon-s-opportunity"></i>分类</el-menu-item>
          <el-menu-item index="/tag"><i class="el-icon-price-tag"></i>标签</el-menu-item>
          <el-menu-item index="/archive"><i class="el-icon-files"></i>归档</el-menu-item>
          <el-menu-item index="/aboutme"><i class="el-icon-user"></i>关于我</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="5" style="line-height: 60px">
        <el-input placeholder="请输入内容.." clearable v-model="keywd" @keyup.enter.native="search" prefix-icon="el-icon-search">
        </el-input>
      </el-col>
    </el-row>

</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
              isActive : '/',
              routers:['/','/type','/tag','/archive','/aboutme'],
              keywd : ''
            }
        },
        methods:{
            search(){
              if(this.keywd===''){
                this.$message.error('输入查询字段');
              }else {
                this.$router.push({path:'/search',query: {keywd:this.keywd}})
              }
              //组件传值
              //this.$EventBus.$emit('sendMsg',this.keyword)
            }
        },
        created() {
          this.isActive=this.$route.path
        },
        watch : {   // 监听路由跳转，在同一个页面进行跳转回丢失高亮
            $route : {
              handler :function (val,oldVal) {
                if(val.path.substring(0,12)==='/blogDetail/' || val.path==='/search'){
                  this.isActive=''
                  return
                }
                if(val.path===this.routers[0]){
                  this.isActive=this.routers[0]
                }else if(val.path===this.routers[1] || val.path==='/type/'){
                  this.isActive=this.routers[1]
                }else if(val.path===this.routers[2] || val.path==='/tag/'){
                  this.isActive=this.routers[2]
                }else if(val.path===this.routers[3]){
                  this.isActive=this.routers[3]
                }else if(val.path===this.routers[4]){
                  this.isActive=this.routers[4]
                }
              },
              deep : true
            }
          }
    }
</script>

<style scoped>

</style>
