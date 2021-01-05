<template>
    <el-main >
      <el-row>
        <el-col :span="16" :push="4">
          <el-alert type="success" style="margin: 30px 0;padding:20px" :closable="false">
            <div slot="title" style="font-size: 20px">
              <b>Hi!</b>
            </div>
            <div style="font-size: 20px">
              {{nickname}}，欢迎登录！
            </div>
          </el-alert>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :push="4">
        <el-image :src="url">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading"></i>
          </div>
        </el-image>
        </el-col>
      </el-row>
    </el-main>
</template>

<script>
    export default {
        name: "Backend",
        data(){
          return {
            url:'http://studywithu.cn/images/liuli.jpg',
            nickname:''
          }
        },
      methods:{
        getUserBack(){
          this.$http.get(this.myAddressBack+'/getUser',{
            headers:{
              token: localStorage.getItem('token')
            }
          }).then(resp=>{
            //header已经验证了token，这里就不用了
            if(resp.data.code===200){
              this.nickname=resp.data.data.nickname
            }
          })
        },
      },
      created() {
        this.getUserBack()
      }
    }
</script>

<style scoped>
  .image-slot{
    text-align: center;
    line-height: 600px;
  }
</style>
