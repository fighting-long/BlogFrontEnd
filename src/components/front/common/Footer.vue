<template>
    <div style="text-align: center">
      <el-row>
        <el-col :span="4" :offset="3">
          <el-row>
            <el-col style="margin-bottom: 10px">
              最新博客
            </el-col>
            <el-col v-for="blog in newBlogs" :key="blog.id">
              <el-link :underline="false" :href="'#/blogDetail/'+blog.id">{{blog.title}}</el-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" >
          <el-row>
            <el-col style="margin-bottom: 10px">
              联系我
            </el-col>
            <el-col>
              <el-link :underline="false" href="mailto:lxh.ac@outlook.com">Email：lxh.ac@outlook.com</el-link>
            </el-col>
            <el-col>
              <el-link :underline="false">QQ: 343932572</el-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10" >
          <el-row>
            <el-col style="margin-bottom: 10px">
              介绍
            </el-col>
            <el-col>
              这是我的个人博客，我会将我的学习日记，思考内容发布到这里，请给我一些建议，让我们共同成长...
            </el-col>
          </el-row>

        </el-col>
      </el-row>
      <el-divider></el-divider>
      Copyright 2020 - 2020 LXH · <el-link style="margin-bottom: 5px" href="https://beian.miit.gov.cn" target="_blank">赣ICP备2020012496号</el-link>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data(){
            return {
              newBlogs:''
            }
        },
        created() {
          this.$http.get(this.myAddress+'/getNewB').then(resp=>{
            this.newBlogs=resp.data.data
          }).catch(resp=>{
            console.log(resp)
          })
        }
    }
</script>

<style scoped>

</style>
