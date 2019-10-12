<template>
  <div id="sign-up-guide">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>云教材课件模板管理</el-breadcrumb-item>
  </el-breadcrumb>
    <div class="content">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="目录">
                <el-select placeholder="选择" size="small" v-model="form.id_dir" clearable>
                    <el-option :label="item.title" :value="item.id" v-for="item in kejianTemplateDir_list" :key="item.id"></el-option>
                    <!-- <el-option label="校考必备" value="1"></el-option>
                    <el-option label="入门基础" value="2"></el-option>
                    <el-option label="免费基础" value="3"></el-option> -->
                </el-select>
                <!-- <el-input v-model="formInline.user" placeholder="审批人"></el-input> -->
            </el-form-item>
            <el-form-item label="类别">
                <el-select placeholder="选择" size="small" v-model="form.id_type" clearable>
                    <el-option :label="item.title" :value="item.id" v-for="item in kejianTemplateType_list" :key="item.id"></el-option>
                    <!-- <el-option label="素描" value="0"></el-option>
                    <el-option label="色彩" value="1"></el-option>
                    <el-option label="速写" value="2"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input size="small" placeholder="输入模板标题查找" v-model="form.title" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="getList">查询</el-button>
                <el-button type="primary" size="small" @click="$router.push('/home/addTemplate')">上传模板</el-button>
            </el-form-item>
        </el-form>
      <el-table
        ref="multipleTable"
        :data="keJianTemplate_list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="模板标题" prop="title" align="center"></el-table-column>
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.url_cover" alt="" class="school-logo" v-if="scope.row.url_cover.length>=10">
            <img src="@/assets/images/default.png" alt="" class="school-logo" v-else>
          </template>
        </el-table-column>
        <el-table-column label="目录" prop="name" align="center"></el-table-column>
        <el-table-column label="类别" prop="typeName" align="center"></el-table-column>
        <el-table-column label="阅读量" align="center">
          <template slot-scope="scope">
             <div>{{scope.row.numof_read}}</div>
             <div>                  
                  <el-button type="text" @click="showDialog(scope.row.id,scope.row.numof_read)">修改阅读量
                  </el-button>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
                <div>
                  <el-button type="text"
                             @click="$router.push({name:'addTemplate',params:{id:scope.row.id}})">
                    编辑
                  </el-button>
                  <el-button type="text" @click="DelKejianTemplate(scope.row.id,scope.row.title)">删除
                  </el-button>
                </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer" v-if="total>=1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="修改阅读量" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="dialogForm" :inline="true">
        <el-form-item label="阅读量：">
          <el-input v-model="numof_read" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="现有：" style="margin-left:30px">
          <div>{{dialogForm.numof_read}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateMaterialsKejianReadNum" size="small">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script type="text/javascript">
  import Breadcrumb  from '@/components/breadcrumb/breadcrumb'
  import {province}  from '@/utils/province'
  import {setSessionStorage, getSessionStorage} from '@/utils/mixin'
  let newArr = [
    {
      "id": 0,
      "provinceID": 0,
      "province": "全国"
    }
  ];
  let newArr2 = newArr.concat(province);
  export default{
    components: {
      Breadcrumb
    },
    data(){
      return {
        kejianTemplateType_list:[],
        kejianTemplateDir_list:[],
        numof_read:'',
        dialogForm:{
          numof_read:'',
          id: ''
        },
        dialogFormVisible:false,
        formInline: {
          user: '',
          region: ''
        },
        breadcrumb: [
          {
            path: '/home/recommendList',
            name: '云教材每日推荐管理',
            isDefault: true
          }
        ],
        keJianTemplate_list: [],
        form: {
          id_dir:'',
          id_type:''
        },
        currentPage: 1,
        id_province: 0,//省份的ID，传0代表全国
        keyword_college: '',//院校名称的关键词
        pageSize: 10,
        pageNo: 1,
        total: ''
      }
    },
    methods: {
      /* 根据查询参数是否为空，调用具体的查询方法*/
      getList() {
        // if(this.form.title && !this.form.id_subject && !this.form.type) {
        //   this.GetNameSeachBook()
        // }else 
        // if(this.form.title || this.form.id_subject || this.form.type) {
        //   this.GetSearchbyBookCategory()
        // }else{
          this.GetKejianTemplateList()
        // }
      },
      showDialog(id,numof_read) {
        this.dialogFormVisible = true
        this.dialogForm.numof_read = numof_read
        this.dialogForm.id = id
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(e){
        this.pageNo = e;
        this.GetKejianTemplateList();
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*
       * 删除
       * */
      DelKejianTemplate(id, name){
        this.$confirm(`确定要删除“${ name }”吗？`, '删除课件模板', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          await this.$store.dispatch('DelKejianTemplate', {id: id});
          await this.GetKejianTemplateList();
          this.editFocusNum = false;
          this.$message({
            message: '删除成功！',
            type: "success"
          });
        }).catch(() => {

        });
      },

      /* 课件模板列表 */
      GetKejianTemplateList(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          id_type: 0,
          id_dir: 0
        };
        if(this.form.id_dir){
          formData = Object.assign(formData,{
            id_dir: this.form.id_dir
          })
        }
        if(this.form.id_type){
          formData = Object.assign(formData,{
            id_type: this.form.id_type
          })
        }
        this.$store.dispatch('GetKejianTemplateList', formData).then(res => {
          this.keJianTemplate_list = []
          res.keJianTemplate_list.forEach((item)=> {
              this.keJianTemplate_list.push(item)
          })
          this.total = res.total
        })
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

      /* 通过Quey获取云教材每日推荐列表 */
      GetSearchbyBookCategory(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          title: '',
          id_subject: '',
          type: ''
        };
        if(this.form.title)formData = Object.assign(formData,{title:this.form.title})
        if(this.form.id_subject)formData = Object.assign(formData,{id_subject:this.form.id_subject})
        if(this.form.type)formData = Object.assign(formData,{type:this.form.type})
        this.$store.dispatch('GetSearchbyBookCategory', formData).then(res => {
          this.keJianTemplate_list = []
          res.BooksList.forEach((item)=> {
              item.priceName = item.price+'元/年'
               switch(item.type){
                case 0:
                  item.typeName = '全部'
                  break;
                case 1:
                  item.typeName = '校考必备'
                break;
                case 2:
                  item.typeName = '入门基础'
                break;
              }
              this.keJianTemplate_list.push(item)
          })
          this.total = res.total

        })
      },
      /* 修改书籍阅读量 */
      async UpdateMaterialsKejianReadNum() {
        if(this.numof_read){
          let formData = {
            id: this.dialogForm.id,
            numof_read: this.numof_read
          };
          await this.$store.dispatch('UpdateMaterialsKejianReadNum',formData);
          await this.GetKejianTemplateList();
          this.dialogFormVisible = false;
            this.$message({
              message: '修改阅读量成功！',
              type: "success"
            })
          }
        }
    },
    mounted(){
      this.GetKejianTemplateList();
      this.GetKejianTemplateType();
      this.GetkeJianTemplateDir()
    },
    activated() {
      this.GetKejianTemplateList()
    },
    watch: {
      dialogFormVisible: function (val) {
        if(val){
          this.numof_read = ''
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  #sign-up-guide {
    .search-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
      padding: 0 30px 15px 30px;
      font-size: 14px;
      border-bottom: 1px solid #ebeef5;
      .search-left {
        display: flex;
        .search-school {
          margin: 0 60px;
        }
      }
    }
    .content {
      margin-top:36px;
      .school-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .btns {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 12px;
        color: #3F51B5;
        .el-button--text {
          padding: 0;
        }
      }
    }
    .footer {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
