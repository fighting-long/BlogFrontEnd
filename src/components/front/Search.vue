<template>
  <el-container style="margin-top: 50px">
    <el-header style="padding: 0; width: 900px;margin: auto;line-height: normal" height="">
      <el-card class="box-card" shadow="never">
        <span style="font-size:20px"><b>搜索</b></span>
        <span style="float: right; padding: 3px 0">共<b style="color: orange;font-size: 18px">{{total}}</b>篇</span>
      </el-card>
    </el-header>
    <el-main style="margin: auto;width: 900px;">
      <div v-for="blog in blogView" :key="blog.id">
        <el-row style="height: 150px">
          <el-col :span="18" style="height: 150px">
            <el-row style="height: 150px" id="father">
              <el-col>
                <b>
                  <el-link :underline="false" style="font-size: 18px;" :href="'#/blogDetail/'+blog.id">{{blog.title}}
                  </el-link>
                </b>
              </el-col>
              <el-col>
                <p style="text-indent: 2em;font-size:15px">{{blog.description}}</p>
              </el-col>
              <el-col>
                <el-row style="margin-top: 26px;width: 645px" id="children">
                  <el-col :span="4">
                    <div style="height: 28px;line-height: 28px">
                      <el-avatar size="small" :src="blog.user.avatar" fit="fit"></el-avatar>
                      <el-link href="#/aboutme" target="_blank" type="info" :underline="false" style="margin-bottom:18px">
                        {{blog.user.nickname}}
                      </el-link>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div style="height: 28px;line-height: 28px">
                      <i class="el-icon-date"></i>
                      <span>{{new Date(blog.updateTime).format('yyyy-MM-dd')}}</span>
                    </div>
                  </el-col>
                  <el-col :span="9">
                    <div style="height: 28px;line-height: 28px">
                      <i class="el-icon-view"></i>
                      {{blog.views}}
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div style="height: 28px;line-height: 28px">
                      <el-link :underline="false" style="float: right" :href="'#/type/?id='+blog.type.id">
                        <el-button size="mini" plain style="padding: 5px">
                          {{blog.type.name}}
                        </el-button>
                      </el-link>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5" style="height: 150px">
            <el-link :underline="false" target="_blank" :href="'#/blogDetail/'+blog.id">
              <el-image :src="blog.firstPicture" alt="" style="height: 150px;width: 200px;margin-left: 15px" fit="fit">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-loading"></i>
                </div>
              </el-image>
            </el-link>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>

      <el-row style="height: 30px">
        <el-col :span="24">
          <el-button plain type="primary" size="small" @click="searchBlog(--startPage,size)" :disabled="startPage===1">上一页</el-button>
          <el-button plain type="primary" size="small" @click="searchBlog(++startPage,size)" :disabled="size*startPage>=total" style="float: right">下一页</el-button>
        </el-col>
      </el-row>
    </el-main>
    <div style="height: 130px"></div>
  </el-container>
</template>

<script>


  export default {
    name: "Search",
    data() {
      return {
        blogView:[],
        startPage:0,
        size:0,
        total:0,
        keywd:''
      }
    },
    methods: {
      searchBlog(startPage,size){
        if(this.keywd===''){
          this.$message.error('输入查询字段');
          return
        }
        this.$http.get(this.myAddress+'/searchAllView/'+startPage+'/'+size,{
          params:{
            keyword:this.keywd
          }
        }).then(resp=>{
          this.blogView=resp.data.data.records
          this.startPage=resp.data.data.current
          this.size=resp.data.data.size
          this.total=resp.data.data.total
        }).catch(resp=>{
          console.log(resp)
        })
      }
    },
    created() {
      this.keywd=this.$route.query.keywd
      this.searchBlog(1,5)
    },
    watch: {   // 监听路由跳转,跳转只是由这个路由开始跳转才执行的，
      $route: {
        handler: function (val, oldVal) {
          this.keywd=val.query.keywd
          //请求数据
          this.searchBlog(1,4)
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  #father {
    position: relative;
  }

  #children {
    position: absolute;
    bottom: 0;
  }
  .image-slot{
    text-align: center;
    line-height: 150px;
  }

</style>
