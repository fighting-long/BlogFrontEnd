<template>
  <el-row>
    <el-col :span="16" :push="4">
      <el-table
        :data="blogs.filter(data => !search
        || data.title.toLowerCase().includes(search.toLowerCase())
        || data.type.name.toLowerCase().includes(search.toLowerCase()))"
        border
        height="350"
        size="medium"
        style="width: 100%;margin: 50px auto;font-size: 16px">
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          label="标题"
          width="300"
          align="center">
          <template slot-scope="scope">
            <div slot="reference">
              <el-link :underline="false" :href="'#/blogDetail/'+scope.row.id">{{ scope.row.title }}</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="100"
          align="center">
          <template slot-scope="scope">
          <div slot="reference">
            <el-link :underline="false" :href="'#/type?id='+scope.row.type.id">{{ scope.row.type.name }}</el-link>
          </div>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          width="200"
          align="center">
          <template slot-scope="scope">
            <div slot="reference">
              {{new Date(scope.row.updateTime).format('yyyy-MM-dd hh:mm:ss')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="80"
          align="center">
          <template slot-scope="scope">
            {{scope.row.published?'已发布':'草稿'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="261">
          <template slot="header" slot-scope="scope">
            <el-row>
              <el-col :span="16" :push="1">
                <el-input
                  size="small"
                  v-model="search"
                  placeholder="根据标题或类名查找。。"/>
              </el-col>
              <el-col :span="3" :push="2">
                <el-button
                  size="small"
                  type="primary"
                  plain
                  @click="writeBlog">新增</el-button>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              plain
              @click="updateBlog(scope.row.id)">修改</el-button>
            <el-button
              size="small"
              type="danger"
              plain
              @click="delBlog(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "EditBlog",
        data(){
            return{
              blogs:[],
              search:''
            }
        },
        methods:{
          writeBlog(){
            this.$router.push('/admin/writeBlog')
          },
          getBlogsBack(){
            this.$http.get(this.myAddressBack+'/getBlogs',{
              headers: {token: localStorage.getItem('token')}
            }).then(resp=>{
              this.blogs=resp.data.data
            })
          },
          delBlog(id){
            this.$confirm('确定要删除此博客？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.delete(this.myAddressBack+'/delBlog/'+id,{
                headers:{
                  token: localStorage.getItem('token')
                }
              }).then(resp=>{
                if(resp.data.code===200){
                  this.$message({type: 'success', message: '删除成功!'});
                }else {
                  this.$message({type: 'error', message: '删除失败!'});
                }
                this.getBlogsBack()
              })
            }).catch(() => {});
          },
          updateBlog(id){
            this.$router.push('/admin/updateBlog/'+id)
          }
        },
        created() {
          this.getBlogsBack()
        }
    }
</script>

<style scoped>

</style>
