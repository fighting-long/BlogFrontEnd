<template>
    <el-row>
      <el-col :span="14" :push="5">
        <el-table
          :data="tags.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          border
          height="300"
          size="medium"
          style="width: 801px;margin: 50px auto;font-size: 16px">
          <el-table-column
            label="序号"
            type="index"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="300"
            align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>有<span style="font-size: 15px;color: #fd971f">{{scope.row.blogCount}}</span>篇博客属于这个类</p>
                <!-- scope.row表示当前行的对象 -->
                <div slot="reference" class="name-wrapper">
                  <el-link :underline="false" :href="'#/tag?id='+scope.row.id">{{ scope.row.name }}</el-link>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="300">
            <template slot="header" slot-scope="scope">
              <el-row>
                <el-col :span="18">
                  <el-input
                    size="small"
                    v-model="search"
                    placeholder="输入关键字搜索"/>
                </el-col>
                <el-col :span="4" :push="1">
                  <el-button
                    size="small"
                    type="info"
                    @click="saveTag">新增</el-button>
                </el-col>
              </el-row>
            </template>
            <template slot-scope="scope">
              <el-button
                size="small"
                type="warning"
                plain
                @click="editTagName(scope.row.id,scope.row.name,scope.row.blogCount)">修改</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="delTag(scope.row.id,scope.row.blogCount)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
</template>

<script>
  export default {
    name: "EditTag",
    data() {
      return {
        tags:[],
        search:''
      }
    },
    methods:{
      formatDate(date){
        return date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate()
      },
      getTag(){
        this.$http.get(this.myAddress+'/getTagAll').then(resp=>{
          this.tags=resp.data.data
        })
      },
      delTag(id,count){
        this.$confirm('确定要删除此标签？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(count>0){
            this.$message({type: 'warning', message: '无法删除,存在博客属于此标签！'});
            return
          }
          this.$http.delete(this.myAddressBack+'/deleteTagById/'+id,{
            headers:{
              token: localStorage.getItem('token')
            }
          }).then(resp=>{
            if(resp.data.code===200){
              this.$message({type: 'success', message: '删除成功!'});
            }else {
              this.$message({type: 'error', message: '删除失败!'});
            }
            this.getTag()
          })
        }).catch(() => {});
      },
      editTagName(id,name,count){
        if(count>0){
          this.$message({
            type: 'warning',
            message: '确定要修改这个标签名称吗？存在博客属于这个标签。'
          });
        }
        this.$prompt('确定将<'+name+'>修改为：', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$http({
            url:this.myAddressBack+'/editTagName',
            method:'PUT',
            headers:{token: localStorage.getItem('token')},
            data:{id:id,name:value}
          }).then(resp=>{
            if(resp.data.code===200){
              this.$message({type: 'success', message: '修改成功!'});
            }else {
              this.$message({type: 'error', message: '修改失败!'});
            }
            this.getType()
          })
        }).catch(() => {});
      },
      saveTag(){
        this.$prompt('请输入要新增的标签', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/./,
          inputErrorMessage:'标签名不能为空'
        }).then(({ value }) => {
          this.$http({
            url:this.myAddressBack+'/saveTag',
            method:'POST',
            headers:{token: localStorage.getItem('token')},
            data:{name:value}
          }).then(resp=>{
            if(resp.data.code===200){
              this.$message({type: 'success', message: '新增成功!'});
            }else {
              this.$message({type: 'error', message: '新增失败!'});
            }
            this.getTag()
          })
        }).catch(() => {});
      }
    },
    created() {
      this.getTag()
    }
  }
</script>

<style scoped>

</style>
