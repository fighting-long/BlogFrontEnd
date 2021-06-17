<template>
  <el-card style="width:400px;margin: 100px auto">
    <div slot="header" style="text-align: center;font-size: 25px;color: #409EFF">
      <el-button style="border: none" plain @click="change()"><span style="font-size: 20px">使用{{mode}}登录</span></el-button>
    </div>
    <el-row>
      <el-col>
        <el-input :placeholder="mode==='密码'?'用户名':mode" v-model="user" :prefix-icon="mode==='密码'?'el-icon-user-solid':'el-icon-message'"></el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px" v-show="mode==='密码'">
      <el-col>
        <el-input :placeholder="mode" v-model="secret" prefix-icon="el-icon-lock" show-password @keyup.enter.native="login"></el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px" v-show="mode!=='密码'">
      <el-col :span="15">
        <el-input placeholder="验证码" v-model="secret" prefix-icon="el-icon-lock" @keyup.enter.native="login"></el-input>
      </el-col>
      <el-col :span="3" :push="1">
        <el-button plain style="margin-left: 8px;width: 111.6px" @click="sendCode" :disabled=" typeof buttonMessage === 'number' ">{{buttonMessage}}</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-col>
        <el-button style="width: 100%" type="primary" plain @click="login">登陆</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        user: '',
        secret: '',
        mode : '密码',
        buttonMessage:'发送验证码',
        iterVal:null
      }
    },
    methods: {
      login() {
        if (this.mode==='密码' && (this.user==='' || this.secret==='')){
          this.$message({
            message: '用户名或密码不能为空',
            type: 'warning'
          });
          return
        }else if(this.mode!=='密码' && ( !new RegExp('^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$', 'gm').test(this.user) || this.secret==='' )) {
          this.$message({
            message: '信息格式不正确！',
            type: 'warning'
          });
          return
        }
        this.$http.post(this.myAddress + '/login', {
          user: this.user,
          secret: this.secret,
          mode:this.mode
        }).then(resp => {
          if(resp.data.code===250){
            this.$message.error(resp.data.message);
          }else {
            //保存token=>localstorage，跳转路由
            localStorage.setItem("token",resp.data.data)
            this.$router.push('/admin')
          }
        }).catch(resp => {
            console.log(resp)
        })
      },
      change(){
        this.user=''
        this.secret=''
        if(this.mode==='密码'){
          this.mode='邮箱'
        }else{
          this.mode='密码'
        }
      },
      sendCode(){
        if(!new RegExp('^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$', 'gm').test(this.user)){
          this.$message({
            message: '邮箱格式不正确！',
            type: 'warning'
          });
          return
        }
        this.$http.get(this.myAddress+'/sendCode',{
          params:{
            user:this.user
          }
        }).then(resp=>{
          this.$message.success("发送成功！")
          this.buttonMessage=60
          this.iterVal=window.setInterval(this.decrement, 1000);
        }).catch(resp=>{
          this.$message.error("发送失败！")
          console.log(resp)
        })
      },
      decrement(){
        this.buttonMessage--;
        if(this.buttonMessage===1){
          window.clearInterval(this.iterVal)
          this.buttonMessage='发送验证码'
        }
      }
    }
  }
</script>

<style scoped>

</style>
