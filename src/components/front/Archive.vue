<template>
  <el-container style="margin-top: 50px">
    <el-header style="padding: 0; width: 900px;margin: auto;line-height: normal" height="" >
      <el-card class="box-card" shadow="never">
          <span style="font-size:20px"><b>归档</b></span>
          <span style="float: right; padding: 3px 0">共<b style="color: orange;font-size: 18px">{{archive.message}}</b>篇</span>
      </el-card>
    </el-header>
    <el-main style="margin: auto;width: 900px;overflow: hidden;">
      <div class="block">
        <el-timeline style="padding-left: 0">
            <div v-for="(item,index) in archive.data" :key="index">
              <h1>{{item.year}}</h1>
              <el-timeline-item v-for="blog in item.blogs" :key="blog.id" :timestamp="formatDate(new Date(blog.createTime))" placement="top">
                <el-card>
                  <el-row>
                    <el-col :span="12">
                      <p><el-link :underline="false" :href="'#/blogDetail/'+blog.id">{{blog.title}}</el-link></p>
                    </el-col>
                    <el-col :span="12" style="margin-top: 7px">
                      <el-tag style="float: right" :type="blog.flag==='转载'?'warning':''">{{blog.flag}}</el-tag>
                    </el-col>
                  </el-row>
                </el-card>
              </el-timeline-item>
              <el-divider></el-divider>
            </div>
        </el-timeline>
      </div>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "archive",
        data(){
          return{
            archive:{}
          }
        },
        methods:{
          formatDate(date){
            return date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate()
          },
          getBlogArchive(){
            this.$http.get(this.myAddress+'/getArchive').then(resp=>{
                this.archive=resp.data
            })
          }
        },
        created() {
          this.getBlogArchive()
        }
    }
</script>

<style scoped>

</style>
