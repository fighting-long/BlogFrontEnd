<template>
    <el-row>
      <el-col :span="14" :push="5">
        <el-table
          :data="types.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                  <el-link :underline="false" :href="'#/type?id='+scope.row.id">{{ scope.row.name }}</el-link>
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
                    @click="saveType">新增</el-button>
                </el-col>
              </el-row>
            </template>
            <template slot-scope="scope">
              <el-button
                size="small"
                type="warning"
                plain
                @click="editTypeName(scope.row.id,scope.row.name,scope.row.blogCount)">修改</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="delType(scope.row.id,scope.row.blogCount)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
</template>

<script>
  export default {
    name: "EditType",
    data() {
      return {
        types:[],
        search:''
      }
    },
    methods:{
      getType(){
        this.$http.get(this.myAddress+'/getTypeAll').then(resp=>{
          this.types=resp.data.data
        })
      },
      delType(id,count){
        this.$confirm('确定要删除此分类？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(count>0){
            this.$message({type: 'warning', message: '无法删除,存在博客属于此分类！'});
            return
          }
          this.$http.delete(this.myAddressBack+'/deleteTypeById/'+id,{
            headers:{
              token: localStorage.getItem('token')
            }
          }).then(resp=>{
              if(resp.data.code===200){
                this.$message({type: 'success', message: '删除成功!'});
              }else {
                this.$message({type: 'error', message: '删除失败!'});
              }
              this.getType()
          }).catch(resp=>{
            console.log(resp)
          })
        }).catch(() => {});
      },
      editTypeName(id,name,count){
        if(count>0){
          this.$message({
            type: 'warning',
            message: '确定要修改这个分类名称吗？存在博客属于这个分类。'
          });
        }
        this.$prompt('确定将<'+name+'>修改为：', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$http({
            url:this.myAddressBack+'/editTypeName',
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
      saveType(){
        this.$prompt('请输入要新增的分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/./,
          inputErrorMessage:'类名不能为空'
        }).then(({ value }) => {
          this.$http({
            url:this.myAddressBack+'/saveType',
            method:'POST',
            headers:{token: localStorage.getItem('token')},
            data:{name:value}
          }).then(resp=>{
            if(resp.data.code===200){
              this.$message({type: 'success', message: '新增成功!'});
            }else {
              this.$message({type: 'error', message: '新增失败!'});
            }
            this.getType()
          })
        }).catch(() => {});
      }
    },
    created() {
      this.getType()
    }
  }
</script>

<style scoped>

</style>
