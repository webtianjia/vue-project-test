<template>
  <div id="sign-up-guide">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>云教材体系管理</el-breadcrumb-item>
  </el-breadcrumb>
    <div class="content">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="分类">
                <el-select placeholder="选择" size="small" v-model="form.type_sort" clearable>
                    <el-option label="权威出版社" value="0"></el-option>
                    <el-option label="名家出品" value="1"></el-option>
                    <!-- <el-option label="入门基础" value="2"></el-option>
                    <el-option label="免费基础" value="3"></el-option> -->
                </el-select>
                <!-- <el-input v-model="formInline.user" placeholder="审批人"></el-input> -->
            </el-form-item>
            <el-form-item label="出版社">
                <el-select placeholder="选择" size="small" v-model="form.id_publisher" clearable>
                    <el-option :label="item.title" :value="item.id" v-for="item in publisherList" :key="item.id"></el-option>
                    <!-- <el-option label="色彩" value="1"></el-option>
                    <el-option label="速写" value="2"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input size="small" placeholder="输入教材体系名称查询" v-model="form.title" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="getList">查询</el-button>
                <el-button type="primary" size="small" @click="$router.push('/home/addSystem')">上传教材体系</el-button>
            </el-form-item>
        </el-form>
      <el-table
        ref="multipleTable"
        :data="cloud_materials_system_list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="教材体系名称" prop="title" align="center"></el-table-column>
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.url_cover" alt="" class="school-logo" v-if="scope.row.url_cover.length>=10">
            <img src="@/assets/images/default.png" alt="" class="school-logo" v-else>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="type_sort_name" align="center"></el-table-column>
        <el-table-column label="阅读量" align="center">
          <template slot-scope="scope">
             <div>{{scope.row.numof_reader}}</div>
             <div>                  
                  <el-button type="text" @click="showDialog(scope.row.materialsSystemID,scope.row.numof_reader)">修改阅读量
                  </el-button>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price" align="center"></el-table-column>
        <el-table-column label="销量" prop="saleNum" align="center"></el-table-column>
        <el-table-column label="出版社" prop="publisher_title" align="center"></el-table-column>
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">
            <div>
                <div>
                  <el-button type="text" @click="$router.push({name:'addBook',params:{id:scope.row.id}})">
                    查看体系内书籍
                  </el-button>
                </div>
                <div>
                  <el-button type="text" @click="$router.push({name:'bookCommentList',params:{id:scope.row.id,title:scope.row.title}})">
                    查看体系内课件
                  </el-button>
                </div>
                <div>
                  <el-button type="text" @click="$router.push({name:'bookCommentList',params:{id:scope.row.id,title:scope.row.title}})">
                    查看体系内图片
                  </el-button>
                </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
                <div>
                  <el-button type="text"
                             @click="$router.push({name:'addSystem',params:{materialsSystemID:scope.row.materialsSystemID}})">
                    编辑
                  </el-button>
                  <el-button type="text" @click="Delbook(scope.row.id,scope.row.title)">删除
                  </el-button>
                </div>
                <div>
                  <el-button type="text" @click="$router.push({name:'systemCommentList',params:{materialsSystemID:scope.row.materialsSystemID,title:scope.row.title}})">评论管理
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
          <el-input v-model="numof_reader" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="现有：" style="margin-left:30px">
          <div>{{dialogForm.numof_reader}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateMaterialsSystemReadedNumber" size="small">保存</el-button>
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
        publisherList:[],
        numof_reader:'',
        dialogForm:{
          numof_reader:'',
          materialsSystemID: ''
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
        cloud_materials_system_list: [],
        form: {
          id_publisher:'',
          type_sort: '',
          title: ''
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
        if(this.form.title || this.form.id_publisher || this.form.type_sort) {
          this.GetCloudMaterialsSystemListByKey()
        }else{
          this.GetCloudMaterialsSystemList()
        }
      },
      showDialog(materialsSystemID,numof_reader) {
        this.dialogFormVisible = true
        this.dialogForm.numof_reader = numof_reader
        this.dialogForm.materialsSystemID = materialsSystemID
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(e){
        this.pageNo = e;
        this.GetCloudMaterialsSystemList();
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
      Delbook(id, name){
        this.$confirm(`确定要删除“${ name }”吗？`, '删除书籍', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          await this.$store.dispatch('Delbook', {id: id});
          await this.GetCloudMaterialsSystemList();
          this.editFocusNum = false;
          this.$message({
            message: '删除成功！',
            type: "success"
          });
        }).catch(() => {

        });
      },

      /* 教材体系列表 */
      GetCloudMaterialsSystemList(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        };
        this.$store.dispatch('GetCloudMaterialsSystemList', formData).then(res => {
          this.cloud_materials_system_list = []
          res.cloud_materials_system_list.forEach((item)=> {
               item.priceName = item.price+'元/年'
               if(!item.price)item.price = 500
               switch(item.type_sort){
                case 0:
                  item.type_sort_name = '权威出版社'
                  break;
                case 1:
                  item.type_sort_name = '名家出品'
                break;
              }
              this.cloud_materials_system_list.push(item)
          })
          // this.cloud_materials_system_list = res.cloud_materials_system_list;
          this.total = res.total
        })
      },
      /* 通过Quey获取云教材每日推荐列表 */
      GetCloudMaterialsSystemListByKey(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          title: this.form.title,
          id_publisher: this.form.id_publisher,
          type_sort: this.form.type_sort
        };
        this.$store.dispatch('GetCloudMaterialsSystemListByKey', formData).then(res => {
          this.cloud_materials_system_list = []
          res.cloud_materials_system_list.forEach((item)=> {
               item.priceName = item.price+'元/年'
               if(!item.price)item.price = 500
               switch(item.type_sort){
                case 0:
                  item.type_sort_name = '权威出版社'
                  break;
                case 1:
                  item.type_sort_name = '名家出品'
                break;
              }
              this.cloud_materials_system_list.push(item)
          })
          this.total = res.total

        })
      },
      /* 出版社列表 */
      GetAllPublisher(){
        this.$store.dispatch('GetAllPublisher', {}).then(res => {
          this.publisherList = []
          res.forEach((item)=> {
            item.recommend_time_show = new Date(item.recommend_time).Format('yyyy-MM-dd')
            this.publisherList.push(item)
          })
          this.total = res.total
          console.log(this.publisherList,'this.publisherList')
        })
      },
      /* 修改书籍阅读量 */
      async UpdateMaterialsSystemReadedNumber() {
        if(this.numof_reader){
          let formData = {
            materialsSystemID: this.dialogForm.materialsSystemID,
            numof_reader: this.numof_reader
          };
          await this.$store.dispatch('UpdateMaterialsSystemReadedNumber',formData);
          await this.GetCloudMaterialsSystemList();
          this.dialogFormVisible = false;
            this.$message({
              message: '修改阅读量成功！',
              type: "success"
            })
          }
        }
    },
    mounted(){
      this.GetCloudMaterialsSystemList();
      this.GetAllPublisher();
    },
    activated(){
      this.GetCloudMaterialsSystemList();
    },
    watch: {
      dialogFormVisible: function (val) {
        if(val){
          this.numof_reader = ''
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
