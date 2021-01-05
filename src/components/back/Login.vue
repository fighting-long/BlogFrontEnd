<template>
  <el-card style="width:400px;margin: 100px auto">
    <div slot="header" style="text-align: center;font-size: 25px;color: #409EFF">
      <span><b>后台登陆</b></span>
    </div>
    <el-row>
      <el-col>
        <el-input placeholder="用户名" v-model="username" prefix-icon="el-icon-user-solid"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        <el-input placeholder="密码" v-model="password" prefix-icon="el-icon-lock" show-password @keyup.enter.native="login"></el-input>
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
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        if (this.username==='' || this.password===''){
          this.$message({
            message: '用户名或密码不能为空',
            type: 'warning'
          });
          return
        }
        this.$http.post(this.myAddress + '/login', {
          username: this.username,
          password: this.password
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
      }
    }
  }
</script>

<style scoped>

</style>
