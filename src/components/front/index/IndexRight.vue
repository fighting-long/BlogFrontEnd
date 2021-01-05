<template>
  <el-container>
    <el-main style="margin-right: 200px;width: 200px;padding: 0">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-s-opportunity">分类</i></span>
          <el-link :underline="false" style="float: right; padding: 3px 0" href="#/type">MORE<i
            class="el-icon-d-arrow-right"></i></el-link>
        </div>
        <el-link :underline="false" v-for="type in types" :key="type.id" :href="'#/type/?id='+type.id">
          <div style="height:40px;width:265px;line-height:40px;padding: 0 10px">
            {{type.name}}
            <div style="float: right;line-height: 36px">
              <el-tag effect="plain">{{type.blogCount}}</el-tag>
            </div>
          </div>
        </el-link>

      </el-card>
      <el-divider></el-divider>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-price-tag">标签</i></span>
          <el-link :underline="false" style="float: right; padding: 3px 0" href="#/tag">MORE<i
            class="el-icon-d-arrow-right"></i></el-link>
        </div>
        <el-tag effect="plain" style="margin: 2px"
                v-for="tag in tags"
                :key="tag.id"
                type="info">
          <el-link :underline="false" :href="'#/tag/?id='+tag.id">{{ tag.name }} &nbsp;&nbsp;&nbsp;&nbsp; {{
            tag.blogCount }}
          </el-link>
        </el-tag>
      </el-card>
      <el-divider></el-divider>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-document">最热文章</i></span>
        </div>
        <el-link :underline="false" v-for="blog in blogs" :key="blog.id" :href="'#/blogDetail/'+blog.id">
          <div style="height:40px;width:265px;line-height:40px;padding: 0 10px">
            {{blog.title}}
          </div>
        </el-link>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "IndexRight",
    data() {
      return {
        types: [],
        tags: [],
        blogs: []
      }
    },
    methods: {
      getTypes() {
        this.$http.get(this.myAddress + '/getTypeNum').then(resp => {
          this.types = resp.data.data
        }).catch()
      },
      getTags() {
        this.$http.get(this.myAddress + '/getTagNum').then(resp => {
          this.tags = resp.data.data
        }).catch()
      },
      getBlogs() {
        this.$http.get(this.myAddress + '/getHotB').then(resp => {
          this.blogs = resp.data.data
        }).catch()
      }
    },
    created() {
      this.getTypes()
      this.getTags()
      this.getBlogs()
    }
  }
</script>

<style scoped>

</style>
