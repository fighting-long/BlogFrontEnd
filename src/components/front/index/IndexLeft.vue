<template>
  <el-container style="width: 850px">
    <el-header style="padding: 0; width: 750px;line-height:60px;margin-left: 200px">
      <div style="float: left;margin-left: 20px">
        <span style="font-size:20px"><b>博客</b></span>
      </div>
      <div style="float: right;margin-right: 20px">
        <span>共<b style="color: orange;font-size: 18px">{{total}}</b>篇</span>
      </div>
    </el-header>
    <el-main style="margin-left: 200px;width: 750px;border: 1px #DCDFE6 solid;">
      <div v-for="blog in blogView" :key="blog.id">
        <el-row style="height: 150px">
          <el-col :span="16" style="height: 150px">
            <el-row style="height: 150px" id="father">
              <el-col>
                <b>
                  <el-link target="_blank" :underline="false" style="font-size: 18px;" :href="'#/blogDetail/'+blog.id">
                    {{blog.title}}
                  </el-link>
                </b>
              </el-col>
              <el-col>
                <p style="text-indent: 2em;font-size:15px">{{blog.description}}</p>
              </el-col>
              <el-col>
                <el-row style="margin-top: 26px;width: 473px" id="children">
                  <el-col :span="5">
                    <div style="height: 28px;line-height: 28px">
                      <el-avatar size="small" :src="blog.user.avatar" fit="fit"></el-avatar>
                      <el-link href="#/aboutme" target="_blank" type="info" :underline="false"
                               style="margin-bottom:20px">{{blog.user.nickname}}
                      </el-link>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div style="height: 28px;line-height: 28px">
                      <i class="el-icon-date"></i>
                      <span>{{new Date(blog.updateTime).format('yyyy-MM-dd')}}</span>
                    </div>
                  </el-col>
                  <el-col :span="7">
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
          <el-col :span="7" :push="1" style="height: 150px">
            <el-link :underline="false" target="_blank" :href="'#/blogDetail/'+blog.id">
              <el-image :src="blog.firstPicture" alt="" style="height: 150px;width: 207px" fit="fit">
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
          <el-button plain type="primary" size="small" @click="getBlogView(--startPage,size)"
                     :disabled="startPage===1">
            上一页
          </el-button>
          <el-button plain type="primary" size="small" @click="getBlogView(++startPage,size)"
                     :disabled="size*startPage>total" style="float: right">下一页
          </el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "IndexLeft",
    data() {
      return {
        blogView: [],
        startPage: 0,
        size: 0,
        total: 0
      }
    },
    methods: {
      getBlogView(startPage, size) {
        this.$http.get(this.myAddress + '/getAllView/' + startPage + '/' + size).then(resp => {
          this.blogView = resp.data.data.records
          this.startPage = resp.data.data.current
          this.size = resp.data.data.size
          this.total = resp.data.data.total
        }).catch(resp => {
          console.log(resp)
        })
      }
    },
    mounted() {
      // //从header组件传参到这个组件
      // this.$EventBus.$on('sendMsg',(keywd)=>{
      //   if(keywd.length===0){
      //     //搜索
      //     console.log("空的");
      //   }else{
      //     console.log(keywd)
      //   }
      // })
    },
    created() {
      this.getBlogView(1, 4)
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

  .image-slot {
    text-align: center;
    line-height: 150px;
  }
</style>
