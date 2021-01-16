<template>
  <el-container style="margin-top: 50px">
    <el-backtop :bottom="50">
      <div
        style="height: 100%;width: 100%;background-color: #f2f5f6;box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center;line-height: 40px;color: #1989fa;">
        UP
      </div>
    </el-backtop>
    <el-header style="padding: 0; width: 1000px;margin:auto" height="">
      <el-card class="box-card" shadow="never">
        <el-row>
          <el-col :span="3">
            <div style="height: 28px;line-height: 28px">
              <el-avatar size="small" :src="detail.user.avatar" fit="fit"></el-avatar>
              <el-link href="#/aboutme" type="info" :underline="false" style="margin-bottom:18px">
                {{detail.user.nickname}}
              </el-link>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="height: 28px;line-height: 28px">
              <i class="el-icon-date"></i>
              <span>{{new Date(detail.updateTime).format('yyyy-MM-dd')}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="height: 28px;line-height: 28px">
              <i class="el-icon-view"></i>
              {{detail.views}}
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-header>

    <el-main style="margin: auto;width: 1000px; padding: 0;border: 1px #DCDFE6 solid">
      <el-row style="padding: 10px 10px 0 10px">
        <el-col>
          <el-image :src="detail.firstPicture" style="height: 550px;width: 980px" fit="contain">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading"></i>
            </div>
          </el-image>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row style="padding: 0 15px 15px 15px">
        <el-col style="text-align: center;margin-top: 10px">
          <span style="font-size: 20px">{{detail.title}}</span>
        </el-col>
        <el-col>
          <el-tag style="float: right">{{detail.flag}}</el-tag>
        </el-col>
        <el-col>
          <div id="m-id-content"
               class="typo typo-selection js-toc-content" v-html="detail.content">
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tag v-for="tag in detail.tags" type="info" effect="plain" :key="tag.id" style="margin: 10px 0 0 10px">
            {{tag.name}}
          </el-tag>
        </el-col>
      </el-row>
      <!--赞赏区-->
      <el-row v-if="detail.appreciation">
        <el-col style="text-align: center">
          <el-popover placement="bottom"
                      width="310"
                      trigger="click">
            <el-image :src="zfb" style="width:150px;margin-left: 10px"></el-image>
            <el-image :src="wx" style="width:150px;float: left"></el-image>
            <span style="margin-left: 53px">支付宝</span>
            <span style="margin-left: 120px">微信</span>
            <el-button slot="reference" plain round type="danger">赞赏</el-button>
          </el-popover>
        </el-col>
      </el-row>
      <!--分享声明区-->
      <el-row style="margin-top: 20px; background-color: rgb(225, 243, 216)" v-if="detail.shareStatement">
        <el-col :span="12">
          <ul>
            <li>
              作者：吕小辉<el-link href="#/aboutme"  style="font-size: 16px;margin: 0 0 4px 5px"> 联系作者 </el-link>
            </li>
            <li style="margin-bottom: 4px">
              发表时间：2020-09-07
            </li>
            <li style="margin-bottom: 4px">
              版权声明：尊重原创
            </li>
            <li style="margin-bottom: 4px">
              转载说明：请在文末添加二维码
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <el-image :src="codeBar" style="width: 100px;float: right;margin:16px"></el-image>
        </el-col>
      </el-row>
      <!--评论区-->
      <comment v-if="detail.commentable"></comment>
    </el-main>
  </el-container>

</template>

<script>
  import "@/assets/css/typo.css"
  import "@/assets/css/prism.css"
  import {prism} from "../../assets/js/prism";
  import Comment from "./Comment";
  import zfb from '@/assets/img/zfb.jpg'
  import wx from '@/assets/img/weixin.jpg'
  import codeBar from '@/assets/img/codeBar.jpg'

  export default {
    name: "BlogDetail",
    components: {Comment},
    data() {
      return {
        detail: {user:{}},
        zfb,
        wx,
        codeBar
      }
    },
    created() {
      this.getBlogDetail(this.$route.params.id)
    },
    methods: {
      getBlogDetail(id){
        scrollTo(0, 0)
        this.$http.get(this.myAddress+'/getBlogDetail/'+id).then(resp=>{
          this.detail=resp.data.data
          prism()
        })
      }
    },
    watch : {   // 监听路由跳转，解决在同一个页面进行跳转,在页脚最新博客 进行跳转无效
      $route : {
        handler :function (val,oldVal) {
          this.getBlogDetail(val.params.id)
        },
        deep : true
      }
    }
  }
</script>

<style scoped>
  .image-slot{
    text-align: center;
    line-height: 550px;
  }
</style>
