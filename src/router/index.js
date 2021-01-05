import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from "../components/front/Dashboard";
import IndexContainer from "../components/front/index/IndexContainer"
import Types from "../components/front/Types";
import Archive from "../components/front/Archive";
import Tags from "../components/front/Tags";
import AboutMe from "../components/front/AboutMe";
import BlogDetail from "../components/front/BlogDetail";
import Search from "../components/front/Search";
import Login from "../components/back/Login";
import EditBlog from "../components/back/EditBlog";
import BackIndex from "../components/back/BackIndex";
import BackDashBoard from "../components/back/BackDashBoard";
import EditType from "../components/back/type/EditType";
import EditTag from "../components/back/type/EditTag";
import ReadComment from "../components/back/ReadComment";
import EditInfo from "../components/back/Setting/EditInfo";
import EditPwd from "../components/back/Setting/EditPwd";
import WriteBlog from "../components/back/WriteBlog";
import UpdateBlog from "../components/back/UpdateBlog";


//解决路由跳转重复路径报错问题
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      children:[
        {path : '' ,component:IndexContainer},
        {path : 'type' , component: Types},
        {path : 'tag' , component: Tags},
        {path : 'archive' , component: Archive},
        {path : 'aboutme' , component: AboutMe},
        {path : 'blogDetail/:id' , component: BlogDetail},
        {path : 'search' , component: Search}
      ]
    },
    { path: '/login' , component: Login},

    { path: '/admin' , component: BackDashBoard,
      children: [
        {path: '',component: BackIndex},
        {path: 'editBlog',component: EditBlog},
        {path: 'writeBlog',component: WriteBlog},
        {path: 'updateBlog/:id',component: UpdateBlog},
        {path: 'editType',component: EditType},
        {path: 'editTag',component: EditTag},
        {path: 'editInfo',component: EditInfo},
        {path: 'editPwd',component: EditPwd},
        {path: 'comments',component: ReadComment}
      ]
    },




  ]
})
