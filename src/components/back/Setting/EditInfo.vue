<template>

  <el-card class="box-card" style="margin: 50px auto;width: 800px">
    <div slot="header">
      <span>资料设置</span>
    </div>
    <el-row>
      <el-col :span="11">
        昵称：
        <el-input v-model="info.nickname">
        </el-input>
      </el-col>
      <el-col :span="11" :push="2">
        邮箱：
        <el-input v-model="info.email">
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        <el-col :span="11">
          头像：
          <el-input  v-model="info.avatar">
          </el-input>
        </el-col>
        <el-col :span="11" :push="2">
          主页图片：
          <el-input  v-model="info.infoPicture">
          </el-input>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="11">
        <el-image :src="info.avatar" height="760">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading"></i>
          </div>
        </el-image>
      </el-col>
      <el-col :span="11" :push="2">
        <el-image :src="info.infoPicture" height="760">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading"></i>
          </div>
        </el-image>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        主页介绍：
        <el-input type="textarea" v-model="info.infoDescription"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        个人标签:
        <el-tag
          type="info"
          :key="tag"
          v-for="tag in info.userTag"
          closable
          :disable-transitions="false"
          @close="handleCloseU(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisibleU"
          v-model="inputValueU"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirmU"
          @blur="handleInputConfirmU">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInputU">+ New Tag</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;line-height: 40px">
      <el-col>
        技术标签:
        <el-tag
          :key="tag"
          v-for="tag in info.techTag"
          closable
          :disable-transitions="false"
          @close="handleCloseT(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisibleT"
          v-model="inputValueT"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirmT"
          @blur="handleInputConfirmT">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInputT">+ New Tag</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;text-align: center">
      <el-col>
        <el-button size="small" type="primary" @click="update">更新</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    name: "EditInfo",
    data() {
      return {
        info:{nickname:'',email:'',avatar:'',infoPicture:'',infoDescription:'',userTag:[],techTag:[]},
        inputVisibleU: false,
        inputValueU: '',
        inputVisibleT: false,
        inputValueT: ''
      };
    },
    methods: {
      getInfo(){
        this.$http.get(this.myAddress+'/getInfo').then(resp=>{
            this.info=resp.data.data
        })
      },
      handleCloseU(tag) {
        this.info.userTag.splice(this.info.userTag.indexOf(tag), 1);
      },
      handleCloseT(tag) {
        this.info.tecTag.splice(this.info.tecTag.indexOf(tag), 1);
      },
      showInputU() {
        this.inputVisibleU = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirmU() {
        let inputValue = this.inputValueU;
        if (inputValue) {
          this.info.userTag.push(inputValue);
        }
        this.inputVisibleU = false;
        this.inputValueU = '';
      },
      showInputT() {
        this.inputVisibleT = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirmT() {
        let inputValue = this.inputValueT;
        if (inputValue) {
          this.info.tecTag.push(inputValue);
        }
        this.inputVisibleT = false;
        this.inputValueT = '';
      },
      update(){
        this.$http.put(this.myAddressBack+'/updateInfo',this.info,{
          headers: {token: localStorage.getItem('token')}
        }).then(resp=>{
          this.$message({type:'success',message:'更新成功'})
          this.getInfo()
        }).catch(resp=>{
          console.log(resp)
        })
      }
    },
    created() {
      this.getInfo()
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .image-slot{
    text-align: center;
    line-height: 760px;
    margin:auto;
  }
</style>
