<template>
  <el-row>
    <el-col :span="22" :push="1">
      <el-table
        :data="comments.filter(data => !search
        || data.nickname.toLowerCase().includes(search.toLowerCase())
        || data.blog.title.toLowerCase().includes(search.toLowerCase())
        || data.content.toLowerCase().includes(search.toLowerCase()))"
        border
        height="350"
        size="medium"
        style="width: 1321px;margin: 50px auto;font-size: 16px">
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="博客"
          width="200"
          align="center">
          <template slot-scope="scope">
              <div slot="reference">
                <el-link :underline="false" :href="'#/blogDetail/'+scope.row.blog.id">{{ scope.row.blog.title }}</el-link>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="时间"
          width="200"
          align="center">
          <template slot-scope="scope">
            <div slot="reference">
              {{new Date(scope.row.createTime).format('yyyy-MM-dd hh:mm:ss')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="60"
          align="center">
          <template slot-scope="scope">
            {{scope.row.checked?'已读':'未读'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="300">
          <template slot="header" slot-scope="scope">
            <el-row>
              <el-col :span="14" :push="1">
                <el-input
                  size="small"
                  v-model="search"
                  placeholder="输入标题或昵称、内容。。"/>
              </el-col>
              <el-col :span="5" :push="2">
                <el-button
                  size="small"
                  type="primary"
                  plain
                  @click="readComments">全部已读</el-button>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="scope">
            <el-button
              size="small"
              type="info"
              plain
              @click="readComment(scope.row.id)">阅</el-button>
            <el-button
              size="small"
              type="primary"
              plain
              @click="reply(scope.row.id,scope.row.blog.id)">回复</el-button>
            <el-button
              size="small"
              type="danger"
              plain
              @click="deleteOne(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "ReadComment",
      data(){
          return{
            comments:[],
            search:''
          }
      },
      methods:{
        getComments(){
          this.$http.get(this.myAddressBack+'/listComments',{
            headers:{token: localStorage.getItem('token')}
          }).then(resp=>{
            this.comments=resp.data.data
          })
        },
        readComment(id){
          this.$http.get(this.myAddressBack+'/checkedComment/'+id,{
            headers:{token: localStorage.getItem('token')}
          }).then(resp=>{
            if(resp.data.code===200){
              //this.EventBus.$emit('flush',true)
              this.$message({type: 'success', message: '已读成功!'});
            }else {
              this.$message({type: 'error', message: resp.data.message});
            }
            this.getComments()
          }).catch(resp=>{
            this.$router.push('/login')
          })
        },
        readComments(){
          this.$http.get(this.myAddressBack+'/checkedComments',{
            headers:{token: localStorage.getItem('token')}
          }).then(resp=>{
            if(resp.data.code===200){
              //this.EventBus.$emit('flush',true)
              this.$message({type: 'success', message: '已读全部!'});
            }else {
              this.$message({type: 'error', message: resp.data.message});
            }
            this.getComments()
          }).catch(resp=>{
            this.$router.push('/login')
          })
        },
        deleteOne(id){
          this.$confirm('确定要删除评论？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({type: 'warning', message: '会删除此评论下的所有评论哦'});
            this.$http.delete(this.myAddressBack+'/deleteComment/'+id,{
              headers:{
                token: localStorage.getItem('token')
              }
            }).then(resp=>{
              if(resp.data.code===200){
                this.$message({type: 'success', message: '删除成功!'});
              }else {
                this.$message({type: 'error', message: '删除失败!'});
              }
              this.getComments()
            }).catch(resp=>{
              console.log(resp)
            })
          }).catch(() => {});

        },
        reply(id,blogId){
          this.$prompt('回复：', '回复评论', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$http({
              url:this.myAddressBack+'/replyByAdmin',
              method:'POST',
              headers:{token: localStorage.getItem('token')},
              data:{content:value,parentCommentId:id,blogId:blogId}
            }).then(resp=>{
              if(resp.data.code===200){
                this.$message({type: 'success', message: '回复成功!'});
              }else {
                this.$message({type: 'error', message: '回复失败!'});
              }
              this.getComments()
            })
          }).catch(() => {});
        }
      },
      created() {
        this.getComments()
      }
    }
</script>

<style scoped>

</style>
