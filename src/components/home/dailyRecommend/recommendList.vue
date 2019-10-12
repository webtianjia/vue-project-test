<template>
  <div id="sign-up-guide">
    <breadcrumb :router-list='breadcrumb'></breadcrumb>
    <div class="search-bar">
      <div class="search-left">
        <div>
          <el-input size="small" placeholder="输入推荐名称查找" v-model="form.title" clearable></el-input>
        </div>
        <div class="search-school">
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </div>
        <div>
          <el-date-picker
            v-model="form.recommend_time"
            value-format="yyyy-MM-dd"
            type="date"
            size="small"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="search-right">
        <el-button type="primary" size="small" @click="$router.push('/home/addRecommend')">上传每日推荐</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="recommendList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="推荐名称" prop="title" align="center"></el-table-column>
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.url_cover" alt="" class="school-logo" v-if="scope.row.url_cover">
            <img src="@/assets/images/default.png" alt="" class="school-logo" v-else>
          </template>
        </el-table-column>
        <el-table-column label="推荐日期" prop="recommend_time_show" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="btns">
                <div>
                  <el-button type="text"
                             @click="$router.push({name:'AddRecommend',params:{id:scope.row.id}})">
                    编辑
                  </el-button>
                </div>
                <div style="margin-left:26px">
                  <el-button type="text" @click="deleteRecommendationDaily(scope.row.id,scope.row.title)">删除
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
        breadcrumb: [
          {
            path: '/home/recommendList',
            name: '云教材每日推荐管理',
            isDefault: true
          }
        ],
        recommendList: [],
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
      deleteRecommendationDaily(id, name){
        this.$confirm(`确定要删除“${ name }”吗？`, '删除推荐', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          await this.$store.dispatch('DeleteRecommendationDaily', {id: id});
          await this.GetRecommendationDailyList();
          this.editFocusNum = false;
          this.$message({
            message: '删除成功！',
            type: "success"
          });
        }).catch(() => {

        });
      },

      /* 今日推荐列表 */
      GetRecommendationDailyList(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        };
        this.$store.dispatch('GetRecommendationDailyList', formData).then(res => {
          this.recommendList = []
          res.recommendList.forEach((item)=> {
            item.recommend_time_show = new Date(item.recommend_time).Format('yyyy-MM-dd')
            this.recommendList.push(item)
          })
          this.total = res.total
          console.log(this.recommendList,'this.recommendList')
        })
      },

      /* 通过Quey获取云教材每日推荐列表 */
      GetRecommendationDailyListByQuery(){
        let formData = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          title: '',
          date: ''
        };
        if(this.form.title)formData = Object.assign(formData,{title:this.form.title})
        if(this.form.recommend_time)formData = Object.assign(formData,{date:this.form.recommend_time})
        this.$store.dispatch('GetRecommendationDailyListByQuery', formData).then(res => {
          this.recommendList = []
          res.recommendList.forEach((item)=> {
            item.recommend_time_show = new Date(item.recommend_time).Format('yyyy-MM-dd')
            this.recommendList.push(item)
          })
          this.total = res.total
          console.log(this.recommendList,'this.recommendList')
        })
      },
      /* 根据查询参数是否为空，调用具体的查询方法*/
      getList() {
        if(this.form.title || this.form.recommend_time) {
          this.GetRecommendationDailyListByQuery()
        }else{
          this.GetRecommendationDailyList()
        }
      }

    },
    mounted(){
      this.GetRecommendationDailyList();
    },
    activated(){
      this.GetRecommendationDailyList();
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
