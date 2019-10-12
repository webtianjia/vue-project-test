<template>
  <div id="school-info">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/bookList' }">云教材书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.params.id">编辑书籍</el-breadcrumb-item>
      <el-breadcrumb-item v-else>上传书籍</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content"></div>
      <el-form ref="createBookInfo" :model="createBookInfo" label-width="100px" size="small">
          <div style="display:flex;margin-bottom:10px;justify-content:space-between">
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="https://up-z2.qiniup.com"
                :on-remove="removeBookSucc"
                :data="qiniuToken_book"
                :limit="1"
                :on-success="upLoadBookSucc"
                :file-list="bookPdfList">
                <el-button size="small">上传书籍</el-button>
              </el-upload>
          </el-form-item>
          <el-form-item label="封面:" class="add-img" style="margin-right:120px">
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
        </div>
        <div style="display:flex;margin-bottom:10px;justify-content:space-between">
          <el-form-item label="书名：">
              <el-input style="width: 240px;" v-model="createBookInfo.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类：" style="margin-right:120px">
            <el-select placeholder="选择" size="small" clearable v-model="createBookInfo.type">
                <el-option label="校考必备" value="1"></el-option>
                <el-option label="入门基础" value="2"></el-option>
                <el-option label="免费基础" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display:flex;margin-bottom:10px;justify-content:space-between">
          <el-form-item label="作者：">
              <el-input style="width: 240px;" v-model="createBookInfo.author" clearable></el-input>
          </el-form-item>
          <el-form-item label="学科" style="margin-right:120px">
              <el-select placeholder="选择" size="small" clearable v-model="createBookInfo.id_subject">
                  <el-option label="素描" value="0"></el-option>
                  <el-option label="色彩" value="1"></el-option>
                  <el-option label="速写" value="2"></el-option>
              </el-select>
          </el-form-item>
        </div>
        <div style="display:flex;margin-bottom:10px;justify-content:space-between">
          <el-form-item label="出版时间：">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="createBookInfo.publishTime"
              size="small"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
            <el-form-item label="标签：" style="margin-right:120px">
                <el-select placeholder="选择" size="small" v-model="createBookInfo.classification" clearable>
                    <el-option :label="item.classification" :value="item.classification" v-for="item in labelList" :key="item.id"></el-option>
                    <!-- <el-option label="学科二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
        </div>
        <div style="display:flex;margin-bottom:10px;justify-content:space-between">
          <el-form-item label="价格：">
              <el-input style="width: 240px;" v-model="createBookInfo.price" clearable></el-input> /年
          </el-form-item>
            <el-form-item label="出版社：" style="margin-right:120px">
                <el-select placeholder="选择" size="small" v-model="createBookInfo.publisherID" clearable>
                    <el-option label="学科一" value="1"></el-option>
                    <el-option label="学科二" value="2"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div style="display:flex;margin-bottom:10px;justify-content:space-between">
          <el-form-item label="内容：">
              <vue-html5-editor :content="createBookInfo.intro" @change="detection" :height="300" ref="edit"
                id="close"></vue-html5-editor>
          </el-form-item>
        </div>
        <el-form-item label-width="0px">
          <div style="margin:20px 0 0 120px">
            <el-button type="primary" size="small" style="width: 100px" @click="Addbook">上传</el-button>
            <el-button size="small" style="width: 100px;margin-left:56px" @click="cancel">取消</el-button>
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
        qiniuToken_book:{
          token: ''
        },
        domain: '',
        bookDomain: '',
        content: '',
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        labelList: [],
        createBookInfo: {
          url_pdf: '',//pdf存储地址	
          title: '',//标题
          url_cover: '',//封面图片的URL
          author: '',//作者
          intro: '',//简介
          price: '',//价格
          type: '',//1-校考必备，2-入门基础，3-免费基础	
          publishTime: '',//出版时间
          classification: '',//分类信息
          publisherID: '',//出版社ID
          id_subject: '',//学科ID
        },
        editId: '',//编辑对象的ID
        hasEdit: false,//标识当前是否为编辑
        logoList: [
          {
            name: '1',
            url: ''
          }
        ],
        bookPdfList:[

        ]
      }
    },
    methods: {
      cancel(){
        history.go(-1)
      },
      detection(e){
        this.createBookInfo.intro = e
      },
      onSubmit() {
        console.log('submit!');
      },
      removeSucc(e){
        this.createBookInfo.url_cover = '';
      },
      removeBookSucc(e){
        this.createBookInfo.url_pdf = '';
      },
      /*
       * 获得上传书籍的token
       * */
      getUploadBookToken(){
        this.$store.dispatch('GetUploadToken').then(res => {
          this.qiniuToken_book.token = res.token;
          this.bookDomain = res.bucketUrl;
        });
      },
      /*
       * 获得上传图片的token
       * */
      getUploadToken(){
        this.$store.dispatch('GetUploadToken').then(res => {
          this.qiniuToken.token = res.token;
          this.domain = res.bucketUrl;
        });
      },
      /*
       * 上传图片成功回调
       * */
      upLoadSucc(res){
        this.createBookInfo.url_cover = `${this.domain}/${res.key}`;
      },
      /*
       * 上传书籍成功回调
       * */
      upLoadBookSucc(res){
        this.createBookInfo.url_pdf = `${this.bookDomain}/${res.key}`;
      },
       /*
       * 通过id查询单个云教材每日推荐
       * */
      Getbook(id,type){
        let that = this
        this.$store.dispatch('Getbook', {bookId:id,type:type}).then(res => {
           res.recommend_time = new Date(res.recommend_time).Format('yyyy-MM-dd')
           that.logoList[0].url = res.url_cover
           that.bookPdfList = []
           let pdfObj = {
             name: res.url_pdf.split('com/')[1],
             url: res.url_pdf
           }
           that.bookPdfList.push(pdfObj)
           that.createBookInfo = Object.assign(that.createBookInfo,res)
           console.log(res,'createBookInfo')
        })
      },
      GetAllcloudlabel() {
        this.$store.dispatch('GetAllcloudlabel', {}).then(res => {
          this.labelList = []
          this.labelList = res;
          // this.total = res.total
        })
      },
      /*
       * 创建OR编辑单个推荐
       * */
      Addbook(){
        this.createBookInfo.type = Number(this.createBookInfo.type)
        this.createBookInfo.id_subject = Number(this.createBookInfo.id_subject)
        let newObj = JSON.parse(JSON.stringify(this.createBookInfo))
        let flag = false;
        let updateObj = JSON.parse(JSON.stringify(Object.assign(this.createBookInfo,{id:this.$route.params.id})))

        if (!this.$route.params.id) {
          this.$store.dispatch('Addbook', newObj).then(res => {
            this.$message({
              message: '添加书籍成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/bookList');
            }, 2000)
          });
        } else {
          this.$store.dispatch('Updatebook', updateObj).then(res => {
            this.$message({
              message: '编辑书籍成功！',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/home/bookList');
            }, 2000)
          });
        }
      }
    },
    mounted(){
      this.getUploadToken();
      this.getUploadBookToken();
      this.GetAllcloudlabel()
      /*
       * 进这个页面，如果是编辑,走拉去信息流程
       * 如果是新增，在else 还原数据
       * */
    },
    activated (){
      console.log(this.$route.params.id,'params')
      if (this.$route.params.id) {
          this.Getbook(this.$route.params.id,this.$route.params.type)
      } else {
        this.editId = '';
        this.logoList = [
          {
            name: '1',
            url: ''
          }
        ],
        this.bookPdfList = [
        ],
        this.createBookInfo = {
          url_pdf: '',//pdf存储地址	
          title: '',//标题
          url_cover: '',//封面图片的URL
          author: '',//作者
          intro: '',//简介
          price: '',//价格
          type: '',//1-校考必备，2-入门基础，3-免费基础	
          publishTime: '',//出版时间
          classification: '',//分类信息
          publisherID: '',//出版社ID
          id_subject: '',//学科ID
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
