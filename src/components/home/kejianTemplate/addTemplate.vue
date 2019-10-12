<template>
  <div id="school-info">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/templateList' }">云教材课件模板管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.params.id">编辑课件模板</el-breadcrumb-item>
      <el-breadcrumb-item v-else>上传课件模板</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content"></div>
      <el-form ref="createTemplateInfo" :model="createTemplateInfo" label-width="100px" size="small">
        <el-form-item label="封面:" class="add-img">
          <el-upload
            action="https://up-z2.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :data="qiniuToken"
            :on-success="upLoadSucc"
            :on-remove="removeSucc"
            :file-list="logoList"
            :limit="1"
            v-if="$route.params.id"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-upload
            action="https://up-z2.qiniup.com"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :data="qiniuToken"
            :on-success="upLoadSucc"
            :on-remove="removeSucc"
            :limit="1"
            v-else
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="课件标题：">
            <el-input style="width: 240px;" v-model="createTemplateInfo.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者：">
            <el-input style="width: 240px;" v-model="createTemplateInfo.author" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容：">
            <vue-html5-editor :content="createTemplateInfo.content" @change="detection" :height="300" ref="edit"
              id="close"></vue-html5-editor>
        </el-form-item>
        <div style="display:flex;margin-bottom:10px">
            <el-form-item label="目录：">
                <el-select placeholder="选择" size="small" v-model="createTemplateInfo.id_dir" clearable>
                    <el-option :label="item.title" :value="item.id" v-for="item in kejianTemplateDir_list" :key="item.id"></el-option>
                    <!-- <el-option label="学科一" value="1"></el-option>
                    <el-option label="学科二" value="2"></el-option> -->
                </el-select>            
            </el-form-item>
            <el-form-item label="类别：" style="margin-right:120px">
                <el-select placeholder="选择" size="small" v-model="createTemplateInfo.id_type" clearable>
                    <el-option :label="item.title" :value="item.id" v-for="item in kejianTemplateType_list" :key="item.id"></el-option>
                    <!-- <el-option label="学科一" value="1"></el-option>
                    <el-option label="学科二" value="2"></el-option> -->
                </el-select>
            </el-form-item>
        </div>
        <el-form-item label-width="0px">
          <div style="margin:20px 0 0 120px">
            <el-button type="primary" size="small" style="width: 100px" @click="UploadKejianTemplate">上传</el-button>
            <el-button size="small" style="width: 100px;margin-left:26px" @click="cancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
  import {province}  from '@/utils/province'
  import {schoolType}  from '@/utils/schoolType'
  import {profession}  from '@/utils/profession'
  import {subject}  from '@/utils/subject'
  import * as qiniu from 'qiniu-js'
  import {setSessionStorage, getSessionStorage} from '@/utils/mixin'
  export default {
    data() {
      return {
        qiniuToken: {
          token: ''
        },
        kejianTemplateType_list:[],
        kejianTemplateDir_list:[],
        domain: '',
        content: '',
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        createTemplateInfo: {
          title: '',//文章标题	
          author: '',//作者名字
          url_cover: '',//封面图片的URL
          id_dir: '',//目录
          id_type: '',//分类
          content: ''//富文本
        },
        editId: '',//编辑对象的ID
        hasEdit: false,//标识当前是否为编辑
        logoList: [
          {
            name: '1',
            url: ''
          }
        ],
      }
    },
    methods: {
      cancel(){
        history.go(-1)
      },
      detection(e){
        this.createTemplateInfo.content = e
      },
      onSubmit() {
        console.log('submit!');
      },
      removeSucc(e){
        this.createTemplateInfo.url_cover = '';
      },
      /*
       * 获得上传的token
       * */
      getUploadToken(){
        this.$store.dispatch('GetUploadToken').then(res => {
          this.qiniuToken.token = res.token;
          this.domain = res.bucketUrl;
        });
      },
      /*
       * 上传成功回调
       * */
      upLoadSucc(res){
        this.createTemplateInfo.url_cover = `${this.domain}/${res.key}`;
      },
       /*
       * 通过id查询单个云教材每日推荐
       * */
      GetKejianTemplate(id){
        let that = this
        this.$store.dispatch('GetKejianTemplate', {id:id}).then(res => {
           that.logoList[0].url = res.url_cover
           that.createTemplateInfo = Object.assign(that.createTemplateInfo,res)
           console.log(res,'createTemplateInfo')
        })
      },
      /*
       * 创建OR编辑单个推荐
       * */
      UploadKejianTemplate(){
        let newObj = JSON.parse(JSON.stringify(this.createTemplateInfo))
        let flag = false;
        let updateObj = JSON.parse(JSON.stringify(Object.assign(this.createTemplateInfo,{id:this.$route.params.id})))

        if (!this.$route.params.id) {
          this.$store.dispatch('UploadKejianTemplate', newObj).then(res => {
            this.$message({
              message: '添加课件模板成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/templateList');
            }, 2000)
          });
        } else {
          this.$store.dispatch('ModifyKejianTemplate', updateObj).then(res => {
            this.$message({
              message: '编辑课件模板成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/templateList');
            }, 2000)
          });
        }
      },
      /* 查询课件模板类别名称列表 */
      GetKejianTemplateType(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        };
        this.$store.dispatch('GetKejianTemplateType', formData).then(res => {
          this.kejianTemplateType_list = []
          res.kejianTemplateType_list.forEach((item)=> {
              this.kejianTemplateType_list.push(item)
          })
          this.total = res.total
        })
      },

      /* 查询课件模板目录名称列表 */
      GetkeJianTemplateDir(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        };
        this.$store.dispatch('GetkeJianTemplateDir', formData).then(res => {
          this.kejianTemplateDir_list = []
          res.kejianTemplateDir_list.forEach((item)=> {
              this.kejianTemplateDir_list.push(item)
          })
          this.total = res.total
        })
      },
    },
    mounted(){
      this.getUploadToken();
      this.GetKejianTemplateType();
      this.GetkeJianTemplateDir()
      /*
       * 进这个页面，如果是编辑,走拉去信息流程
       * 如果是新增，在else 还原数据
       * */
    },
    activated (){
      console.log(this.$route.params.id,'params')
      if (this.$route.params.id) {
          this.GetKejianTemplate(this.$route.params.id)
      } else {
        this.editId = '';
        this.logoList = [
          {
            name: '1',
            url: ''
          }
        ],
        this.createTemplateInfo = {
          title: '',//文章标题	
          author: '',//作者名字
          url_cover: '',//封面图片的URL
          id_dir: '',//目录
          id_type: '',//分类
          content: ''//富文本
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #school-info {
    .content {
      margin-top: 36px;

    }
    .add-img {
      img {
        width: 33px;
        vertical-align: bottom;
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      .tag {
        border: 1px solid #bbb;
        padding: 0 15px;
        font-size: 12px;
        margin-right: 10px;
        border-radius: 4px;
        cursor: pointer;
        line-height: 30px;
        margin-bottom: 5px;
        user-select: none;
      }
    }
    .active {
      background: #40b9e6;
      border: 1px solid #ffffff !important;
      color: #ffffff;
    }
    .hide-up-load {
      display: none;
    }
  }

</style>
<style>
  #school-info .el-upload-list__item-preview{
    display: none;
  }
</style>
