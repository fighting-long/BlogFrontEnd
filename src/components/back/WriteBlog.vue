<template>
<el-row style="width: 70%;margin: 50px auto">
  <el-row>
    <el-col :span="2">
      <el-select v-model="blog.flag" default-first-option placeholder="类型">
        <el-option
          v-for="item in flags"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="22">
      <el-input type="text" v-model="blog.title" placeholder="标题">
      </el-input>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px">
    <el-col>
      <mavon-editor v-model="blog.content" style="height: 600px"/>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px">
    <el-col :span="12">
      分类
      <el-select
        v-model="blog.type.name"
        filterable
        allow-create
        default-first-option
        placeholder="分类"
        style="width: 90%">
        <el-option
          v-for="type in types"
          :key="type.id"
          :label="type.name"
          :value="type.name">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12" >
      标签
      <el-select v-model="blog.tagsName"
                 multiple
                 filterable
                 allow-create
                 default-first-option
                 placeholder="标签"
                 style="width: 93%">
        <el-option
          v-for="tag in tags"
          :key="tag.id"
          :label="tag.name"
          :value="tag.name">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px">
    <el-col>
      <el-input type="text" v-model="blog.firstPicture" placeholder="首图引用地址">
        <template slot="prepend">首图</template>
      </el-input>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px">
    <el-col>
      <el-input type="textarea" :rows="3" v-model="blog.description" placeholder="博客描述。。" resize="none" :maxlength="150" show-word-limit>
      </el-input>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px">
    <el-col>
      <el-checkbox v-model="blog.recommend" label="推荐" ></el-checkbox>
      <el-checkbox v-model="blog.shareStatement" label="转载声明" ></el-checkbox>
      <el-checkbox v-model="blog.appreciation"  label="赞赏" ></el-checkbox>
      <el-checkbox v-model="blog.commentable" label="留言" ></el-checkbox>
    </el-col>
  </el-row>
  <el-row style="margin-top: 10px;float: right">
    <el-col>
      <el-button type="warning" plain >取消</el-button>
      <el-button type="primary" @click="saveBlog(false)" plain>保存草稿</el-button>
      <el-button type="success" @click="saveBlog(true)" plain>发布</el-button>
    </el-col>
  </el-row>
</el-row>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "WriteBlog",
    components: {
      mavonEditor
    },
    data(){
      return{
        flags: [{
          value: '原创',
          label: '原创'
        }, {
          value: '转载',
          label: '转载'
        },{
          value: '收藏',
          label: '收藏'
        },],
        types:[],
        tags:[],
        blog:{
          title:'',
          content:'',
          flag:'',
          type:{name:''},
          tagsName:[],
          firstPicture:'',
          description:'',
          recommend:false,
          shareStatement:false,
          appreciation:false,
          commentable:false,
          published:false
        },
      }
    },
    methods:{
      findTypes(){
        this.$http.get(this.myAddress+'/getTypeAll').then(resp=>{
          this.types=resp.data.data
        })
      },
      findTags(){
        this.$http.get(this.myAddress+'/getTagAll').then(resp=>{
          this.tags=resp.data.data
        })
      },
      saveBlog(published){
        this.blog.published=published
        this.$http.post(this.myAddressBack+'/saveBlog', this.blog
          ,{headers:{token: localStorage.getItem('token')}}).then(resp=>{
          if(resp.data.code===200) {
            this.$message.success("发布成功")
            this.$router.push('/admin/editBlog')
          }else {
            this.$message.error("发布失败")
          }
        })
      },

    },
    created() {
      this.findTypes()
      this.findTags()

    }
  }
</script>

<style scoped>

</style>
