<template>
  <div id="sign-up-guide">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/home/coursewareList' }">云教材课件管理</el-breadcrumb-item>
    <el-breadcrumb-item >评论管理</el-breadcrumb-item>
    <el-breadcrumb-item >{{$route.params.title}}</el-breadcrumb-item>
  </el-breadcrumb>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="commentList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="评论内容" prop="content_comment" align="center"></el-table-column>
        <el-table-column label="评论人" prop="nickname" align="center"></el-table-column>
        <el-table-column label="评论时间" prop="time_updated_show" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
              <el-button type="text">
                回复
              </el-button>
              <el-button type="text" style="margin-left:10px">删除
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
        formInline: {
          user: '',
          region: ''
        },
        commentList: [],
        form: {
          content_comment: '',
          nickname: '',
          time_updated: '',
          content_reply: ''
        },
        currentPage: 1,
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
        this.GetAllBook();
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
          await this.GetAllBook();
          this.editFocusNum = false;
          this.$message({
            message: '删除成功！',
            type: "success"
          });
        }).catch(() => {

        });
      },

      /* 课件评论列表 */
      GetAllCommentKejian(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          bookId: this.$route.params.id
        };
        this.$store.dispatch('GetAllCommentKejian', formData).then(res => {
          this.commentList = []
          res.commentList.forEach((item)=> {
              item.time_updated_show = new Date(item.time_updated).Format('yyyy-MM-dd hh:ss')
              this.commentList.push(item)
          })
          // this.commentList = res.commentList;
          this.total = res.total
        })
      },

    },
    mounted(){
      this.GetAllCommentKejian();
    },
    activated() {
      this.GetAllCommentKejian();
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
