<template>
  <el-row style="height: 60px">
    <el-col :span="4">
      <el-link :underline="false" href="#/" target="_blank" style="float: right;line-height: 60px;font-size: 20px;color: #409eff;margin-right: 10px">BLOG</el-link>
    </el-col>
    <el-col :span="15" >
      <el-menu :default-active="isActive" class="el-menu-demo" mode="horizontal" router background-color="#B3C0D1">
        <el-menu-item index="/admin/editBlog"><i class="el-icon-edit-outline"></i>博客管理</el-menu-item>
        <el-menu-item index="/admin/editType"><i class="el-icon-s-opportunity"></i>分类管理</el-menu-item>
        <el-menu-item index="/admin/editTag"><i class="el-icon-price-tag"></i>标签管理</el-menu-item>
        <el-menu-item index="/admin/editInfo"><i class="el-icon-info"></i>信息管理</el-menu-item>
      </el-menu>
    </el-col>

    <el-col :span="2"  style="line-height: 45px">
      <el-dropdown @command="doSomeThing" placement="top">
        <el-button type="info" style="background-color: #B3C0D1;padding: 0 0 12px 20px">
          <el-badge :is-dot="hasUnChecked">
            {{nickname}}&nbsp;<i class="el-icon-arrow-down el-icon--right" style="margin: 12px 20px 0 0"></i>
          </el-badge>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="1">
            <el-badge :value="commentCount" :max="9" :hidden="!hasUnChecked">
              <span style="margin-right: 10px"><i class="el-icon-chat-dot-square"></i>评论</span>
            </el-badge>
          </el-dropdown-item>
          <el-dropdown-item :command="2"><i class="el-icon-lock"></i>修改密码</el-dropdown-item>
          <el-dropdown-item :command="3"><i class="el-icon-switch-button"></i>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
  import {webSocketAddress} from "@/assets/js/address";
  export default {
    name: "BackHeader",
    data() {
      return {
        isActive: '/',
        //routers: ['/', '/admin/editBlog', '/admin/editType', '/admin/editTag'],
        nickname: '',
        hasUnChecked: false,
        commentCount:0,
        websocket:null
      }
    },
    methods: {
      // 判断token
      getUserBack() {
        this.$http.get(this.myAddressBack + '/getUser', {
          headers: {token: localStorage.getItem('token')}
        }).then(resp => {
          // 未登录，或者token已过期
          if (resp.data.code === 250) {
            this.$message.error(resp.data.message)
            this.$router.push('/login')
          } else {
            this.getCommentInfo()
            this.nickname = resp.data.data.nickname
          }
        }).catch(resp => {
          this.$router.push('/login')
        })
      },
      doSomeThing(item) {
        if(item===1){
          this.isActive=''
          this.$router.push('/admin/comments')
        }else if(item===2){
          this.isActive='/admin/editInfo'
          this.$router.push('/admin/editPwd')
        }else if (item === 3) {
          localStorage.removeItem('token')
          this.$message({
            type: "success",
            message: "您已退出"
          })
          this.$router.push('/login')
        }
      },
      getCommentInfo(){
        this.$http.get(this.myAddressBack+'/listUnCheck',{
          headers: {token: localStorage.getItem('token')}
        }).then(resp=>{
            this.hasUnChecked=resp.data.data.length!==0
            this.commentCount=resp.data.data.length
        })
      },
      initWebSocket(){
        this.websocket=new WebSocket(webSocketAddress+'/comment')
        this.websocket.onopen=this.onopen
        this.websocket.onclose=this.onclose
        this.websocket.onmessage=this.onMessage
      },
      onopen() {
        console.log("webSocket连接！")
      },
      onMessage(data){
        if(data.data){
            this.getCommentInfo()
        }
      },
      onclose(){
        console.log("webSocket断开！")
      }
    },
    created() {
      this.initWebSocket()
      this.getUserBack()
      this.isActive=this.$route.path
    },
    destroyed() {
      this.onclose()
    },
    watch : {   // 监听路由跳转，在同一个页面进行跳转回丢失高亮
      $route : {
        handler :function (val,oldVal) {
          if(val.path === '/admin/writeBlog'){
            this.isActive='/admin/editBlog'
          }
        }
      }
    },
    // mounted() {
    //   //刷新是否有新的评论，展示出提示
    //   const _this=this
    //   this.EventBus.$on('flush',function (data) {
    //     if(data){
    //       _this.getCommentInfo()
    //     }
    //   })
    // }
  }
</script>

<style scoped>

</style>
