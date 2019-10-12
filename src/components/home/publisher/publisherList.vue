<template>
  <div id="sign-up-guide">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>出版社管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-bar">
      <div class="search-left">
        <div>
          <el-input size="small" placeholder="输入出版社名称查询" v-model="form.title" clearable></el-input>
        </div>
        <div class="search-school">
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </div>
      </div>
      <div class="search-right">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">新增出版社</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="publisherList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="推荐名称" prop="title" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
                <el-button type="text" @click="DeletePublisher(scope.row.id,scope.row.title)">删除
                </el-button>
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

    <el-dialog title="新增出版社" :visible.sync="dialogFormVisible" width="30%">
      <el-form :inline="true">
        <el-form-item label="出版社名称：">
          <el-input v-model="publisherName" size="small" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddPublisherList" size="small">添加</el-button>
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
  export default{
    components: {
      Breadcrumb
    },
    data(){
      return {
        publisherName:'',
        dialogFormVisible:false,
        publisherList: [],
        form: {
          title: '',
          recommend_time: '',

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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(e){
        this.pageNo = e;
        this.GetRecommendationDailyList();
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
      DeletePublisher(id, name){
        this.$confirm(`确定要删除“${ name }”吗？`, '删除出版社', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          await this.$store.dispatch('DeletePublisher', {publisherID: id});
          await this.GetAllPublisher();
          this.editFocusNum = false;
          this.$message({
            message: '删除成功！',
            type: "success"
          });
        }).catch(() => {

        });
      },

      /* 出版社列表 */
      GetAllPublisher(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        };
        this.$store.dispatch('GetAllPublisher', formData).then(res => {
          this.publisherList = []
          res.forEach((item)=> {
            item.recommend_time_show = new Date(item.recommend_time).Format('yyyy-MM-dd')
            this.publisherList.push(item)
          })
          this.total = res.total
          console.log(this.publisherList,'this.publisherList')
        })
      },
        /* 新增出版社 */
      async AddPublisherList() {
          let formData = {
            publisherName: this.publisherName
          };
          await this.$store.dispatch('AddPublisherList',formData);
          await this.GetAllPublisher();
          this.dialogFormVisible = false;
            this.$message({
              message: '添加成功！',
              type: "success"
            })
       },
      /* 根据查询参数是否为空，调用具体的查询方法*/
      getList() {
        if(this.form.title || this.form.recommend_time) {
        //   this.GetRecommendationDailyListByQuery()
        }else{
          this.GetAllPublisher()
        }
      }

    },
    mounted(){
      this.GetAllPublisher();
    },
    activated(){
      this.GetAllPublisher();
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
      margin-top: 36px;
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
      .school-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .btns {
        display: flex;
        justify-content: center;
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
