<template>
  <el-row style="padding: 10px">
    <el-col>
      <el-row>
        <el-col>
          <b style='font-size: 20px'>评论区</b>
          <hr style="color: #F2F6FC"/>
          <el-row style="border: 1px #DCDFE6 solid;padding: 10px">
            <!--一级评论以及其下评论-->
            <el-row v-if="comments.length===0">
              <span style="color: #C0C4CC;font-size: 15px"><i>暂无评论。。</i></span>
            </el-row>
            <el-row style="margin: 5px 0 0 5px" v-for="comment in comments" :key="comment.id">
              <!--一级评论-->
              <el-row @mouseenter.native="change(comment.id)" @mouseleave.native="change(-1)">
                <el-col :span="1.5">
                  <el-image :src="comment.avatar" style="height: 50px;width: 50px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                    <div slot="placeholder" class="image-slot">
                      <i class="el-icon-loading"></i>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="22" style="margin-left: 5px">
                  <el-row style="line-height: 10px">
                    <el-col :span="23">
                      <el-link :underline="false" style="font-size: 15px"><b><span v-if="comment.admin"
                                                                                   style="color: #409EFF">博主</span><span
                        v-else>{{comment.nickname}}</span></b></el-link>
                    </el-col>
                    <el-col :span="0.1">
                      <transition name="el-fade-in-linear">
                        <el-link v-show="active===comment.id" type="danger" :underline="false"
                                 @click="replyC(comment.id,comment.nickname)">回复
                        </el-link>
                      </transition>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 5px;line-height: 18px">
                    <el-col>
                      <span style="font-size: 15px">{{comment.content}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!--下级评论-->
              <el-row style="margin: 5px 0" v-for="reply in comment.replyComments" :key="reply.id"
                      @mouseenter.native="change(reply.id)" @mouseleave.native="change(-1)">
                <el-col :span="1" :push="1">
                  <el-image :src="reply.avatar" style="height: 50px;width: 50px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                    <div slot="placeholder" class="image-slot">
                      <i class="el-icon-loading"></i>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="20" style="margin-left: 55px">
                  <el-row style="line-height: 10px">
                    <el-col :span="23">
                      <el-link :underline="false" style="font-size: 15px"><b><span v-if="reply.admin"
                                                                                   style="color: #409EFF">博主</span><span
                        v-else>{{reply.nickname}}</span>&nbsp;&nbsp;<span :style="'{color:'+reply.parentComment.nickname==='博主'?'#409EFF':'#1abc9c'+'}'"  style="color: #1abc9c">@{{reply.parentComment.nickname}}</span></b>
                      </el-link>
<!--                      -->
                    </el-col>
                    <el-col :span="1">
                      <transition name="el-fade-in-linear">
                        <el-link v-show="active===reply.id" type="danger" :underline="false"
                                 @click="replyC(reply.id,reply.nickname)">回复
                        </el-link>
                      </transition>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 5px;line-height: 18px">
                    <el-col>
                      <span style="font-size: 15px">{{reply.content}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-row>

          </el-row>
        </el-col>
      </el-row>
      <!--以下是表单，发送评论-->
      <el-row style="margin-top: 10px">
        <el-row>
          <el-col>
            <el-input type="textarea" :maxlength="250" show-word-limit resize="none" :rows="4" :placeholder="fatherName"
                      v-model="content"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="5">
            <el-input
              placeholder="姓名"
              prefix-icon="el-icon-user-solid"
              v-model="nickname" :maxlength="10" show-word-limit>
            </el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input
              placeholder="邮箱"
              prefix-icon="el-icon-message"
              v-model="email">
            </el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button icon="el-icon-s-promotion" type="primary" @click="saveComment">
              评论
            </el-button>
          </el-col>
          <el-col :span="3" :offset="1" style="line-height: 35px">
            <transition name="el-fade-in-linear">
              <el-button plain v-show="parentCommentId!==-1" type="success" size="mini" :underline="false"
                         @click="replyC(-1,'输入评论。。')">还是回复博主吧。。
              </el-button>
            </transition>
          </el-col>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Comment",
    data() {
      return {
        comments: [],
        active: -1,
        content: '',
        nickname: '',
        email: '',
        parentCommentId: -1,
        //输入框的placeholder
        fatherName: '输入评论。。'
      }
    },
    created() {
      this.getComment(this.$route.params.id)
    },
    methods: {
      getComment(id) {
        this.$http.get(this.myAddress + '/getComment/' + id).then(resp => {
          this.comments = resp.data.data
        })
      },
      saveComment() {
        if(!this.sendC()){
          return
        }
        this.$http.post(this.myAddress + '/saveComment', {
          nickname: this.nickname,
          email: this.email,
          content: this.content,
          parentCommentId: this.parentCommentId === -1 ? null : this.parentCommentId,
          blogId:this.$route.params.id
        }).then(resp => {
          this.getComment(this.$route.params.id)
          this.parentCommentId= -1
          this.fatherName='输入评论。。'
          this.content=''
          this.$message({
            message: '评论成功',
            type: 'success'
          });
        }).catch(resp=>{
          console.log(resp)
        })
      },
      //改变现实回复按钮的avtive
      change(id) {
        this.active = id
      },
      //改变回复的人
      replyC(id, name) {
        this.parentCommentId = id
        this.fatherName = this.parentCommentId !== -1 ? '@' + name : name;
      },
      sendC() {
        if(this.nickname==='博主'){
          this.$message({showClose: true, message: '不能取这个名字哦', type: 'warning'});
          return false
        }else if (this.content.length === 0 || this.nickname.length === 0) {
          this.$message({showClose: true, message: '信息不完整', type: 'error'});
          return false
        } else if (!new RegExp('^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$', 'gm').test(this.email)) {
          this.$message({showClose: true, message: '邮箱格式错误', type: 'error'});
          return false
        }
        return true
      }
    },
  }
</script>

<style scoped>
  .image-slot{
    text-align: center;
    line-height: 50px;
  }
</style>
