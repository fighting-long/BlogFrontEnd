<template>

  <el-card class="box-card" style="margin: 50px auto;width: 800px">
    <div slot="header">
      <span>修改密码</span>
    </div>
    <el-row>
      <el-col>
        用户名
        <el-input v-model="username">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        旧密码
        <el-input v-model="oldPwd" show-password placeholder="输入旧密码。。">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        新密码
        <el-input v-model="newPwd" show-password placeholder="输入新密码。。">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        重复新密码
        <el-input v-model="repeatPwd" show-password placeholder="重复新密码。。">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="text-align: center">
        <el-button size="small" type="primary" @click="update">更新</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    name: "EditPwd",
    data() {
      return {
        username: '',
        oldPwd: '',
        newPwd: '',
        repeatPwd: ''
      };
    },
    methods: {
      getUsername() {
        this.$http.get(this.myAddressBack + '/getUsername',{headers: {token: localStorage.getItem('token')}}).then(resp => {
          this.username = resp.data.data.username
        })
      },
      update() {
        if (this.newPwd.length===0) {
          this.$message.error("密码不能为空！")
          return
        }else if(this.newPwd !== this.repeatPwd){
          this.$message.error("两次输入的密码不一致！")
          return
        }
        this.$http.put(this.myAddressBack + '/updatePwd', {
          username: this.username,
          oldPwd: this.oldPwd,
          newPwd:this.newPwd
        }, {headers: {token: localStorage.getItem('token')}}).then(resp => {
            if(resp.data.code===250){
              this.$message.error(resp.data.message)
            }else if(resp.data.code===200){
              localStorage.removeItem('token')
              this.$message.success('更新成功，请重新登陆！')
              this.$router.push('/login')
            }else {
              this.$message.error(resp.data.message)
            }
        })

      }
    },
    created() {
      this.getUsername()
    }
  }
</script>

<style scoped>
  .el-row {
    margin-top: 10px
  }
</style>
