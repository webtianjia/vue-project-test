import {
  login,
  getAdminList,
  addAdmin,
  forbideAdmin,
  updateAdmin,
  getCollegeList,
  getUploadToken,
  addOneCollege,
  publishOneCollege,
  publishSomeColleges,
  setAttentionNumForCollege,
  deleteOneCollege,
  getOneCollege,
  getBookletListForCollege,
  addBookletForCollege,
  getTopicListForCollege,
  addTopicForCollege,
  addHighScoreForCollege,
  getHighScoreListForCollege,
  delOneBooklet,
  delOneTopic,
  delOneHighScore,
  updateOneCollege,
  getOneArticleContentOfCollegeInfo,
  getAllGuideContentForCollege,
  getPlaceListForCollege,
  addPlaceForCollege,
  setRangeForOneCollege,
  setProfessionSubjectForOneCollege,
  setProvinceScheduleForOneCollege,
  setPrincipleForOneCollege,
  getProfessionTimeListForCollege,
  updateTimeForCollegeProfession,
  setSmallScoreLimitForOneCollege,
  delPlaceForCollege,
  getAttentionNumForCollege,
  GetRecommendationDailyList,
  AddRecommendationDaily,
  UpdateRecommendationDaily,
  DeleteRecommendationDaily,
  GetRecommendationDailyListByQuery,
  SelectRecommendationDailyById,
  GetAllBook,
  Addbook,
  Delbook,
  Updatebook,
  GetAllCommentBook,
  UpdateBookInfoForReadNum,
  GetSearchbyBookCategory,
  GetAllcloudlabel,
  GetNameSeachBook,
  GetKejianList,
  GetKejianListByQuery,
  AddKejian,
  UpdateKejian,
  UpdateMaterialsKejianReadNum,
  GetAllCommentKejian,
  GetAllPublisher,
  AddPublisherList,
  DeletePublisher,
  UpdatecontentReplyKejian,
  DelContentComment,
  GetKejian,
  Getbook,
  GetKejianTemplateList,
  GetkeJianTemplateDir,
  GetKejianTemplateType,
  GetKejianTemplate,
  UploadKejianTemplate,
  ModifyKejianTemplate,
  DelKejianTemplate,
  GetCloudMaterialsSystemList,
  GetCloudMaterialsSystemListByKey,
  UpdateMaterialsSystemReadedNumber,
  GetEvaluationsFromMaterialsSystem,
  AddCloudMaterialsSystem,
  GetCloudMaterialsSystemBasic
} from '@/service/getData';
import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
} from '@/utils/mixin';
const user = {
  state: {
    token: null,
    uid: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.userInfo = token
    },
    SET_UID(state, uid){
      state.uid = uid
    }
  },
  actions: {
    //登录
    Login({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        login(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取管理员列表
     * */
    GetAdminList({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getAdminList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 增加管理员
     *
     * */
    AddAdmin({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        addAdmin(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 禁用/启用管理员
     * */
    ForbideAdmin({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        forbideAdmin(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 编辑管理员
     * */
    UpdateAdmin({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        updateAdmin(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询院校列表
     * */
    GetCollegeList({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getCollegeList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取七牛token
     * */
    GetUploadToken({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getUploadToken(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 增加一个院校
     * */
    AddOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        addOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 发布一个院校
     * */
    PublishOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        publishOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 披量发布院校
     * */
    PublishSomeColleges({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        publishSomeColleges(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的关注量
     * */
    SetAttentionNumForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        setAttentionNumForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一个院校
     * */
    DeleteOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        deleteOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校
     * */
    GetOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校的“招生简章”列表
     * */
    GetBookletListForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getBookletListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 添加一篇“招生简章”的文章
     * */
    AddBookletForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        addBookletForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校的“历史考题”列表
     * */
    GetTopicListForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getTopicListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 添加一篇“历史考题”的文章
     * */
    AddTopicForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        addTopicForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 添加一篇“高分卷”的文章
     * */
    AddHighScoreForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        addHighScoreForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校的“高分卷”列表
     * */
    GetHighScoreListForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getHighScoreListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一篇“招生简章”
     * */
    DelOneBooklet({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        delOneBooklet(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一篇“历史考题
     * */
    DelOneTopic({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        delOneTopic(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一篇“高分卷”
     * */
    DelOneHighScore({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        delOneHighScore(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 编辑一个院校
     * */
    UpdateOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        updateOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 编辑一个院校
     * */
    GetOneArticleContentOfCollegeInfo({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getOneArticleContentOfCollegeInfo(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询学校报考指南信息
     * */
    getAllGuideContentForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getAllGuideContentForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询学校考试地点
     * */
    GetPlaceListForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getPlaceListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询学校考试地点
     * */
    AddPlaceForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        addPlaceForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校的招生范围
     * */
    SetRangeForOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        setRangeForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校的招生范围
     * */
    SetProfessionSubjectForOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        setProfessionSubjectForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的招生计划
     * */
    SetProvinceScheduleForOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        setProvinceScheduleForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的招生计划
     * */
    SetPrincipleForOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        setPrincipleForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的招生计划
     * */
    SetSmallScoreLimitForOneCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        setSmallScoreLimitForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校每个专业的报名时间、确认时间和考试时间
     * */
    GetProfessionTimeListForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getProfessionTimeListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校每个专业的报名时间、确认时间和考试时间
     * */
    UpdateTimeForCollegeProfession({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        updateTimeForCollegeProfession(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除考试地点
     * */
    DelPlaceForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        delPlaceForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取关注量
     * */
    GetAttentionNumForCollege({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        getAttentionNumForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
        /*
     * 查询每日推荐列表
     * */
    GetRecommendationDailyList({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetRecommendationDailyList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },

      /*
     * 通过Quey获取云教材每日推荐列表
     * */
    GetRecommendationDailyListByQuery({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetRecommendationDailyListByQuery(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除单个推荐
     * */
    DeleteRecommendationDaily({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        DeleteRecommendationDaily(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 上传每日推荐
     * */
    AddRecommendationDaily({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        AddRecommendationDaily(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
      /*
     * 编辑每日推荐
     * */
    UpdateRecommendationDaily({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        UpdateRecommendationDaily(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
          /*
     * 编辑每日推荐
     * */
    SelectRecommendationDailyById({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        SelectRecommendationDailyById(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    // GetAllBook,
    // Addbook,
    // Delbook,
    // Updatebook,
    // GetAllCommentBook,
    // UpdateBookInfoForReadNum,
    // GetSearchbyBookCategory
    
    /*
     * 查看所有书籍
     * */
    GetAllBook({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetAllBook(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
      /*
     * 上传书籍
     * */
    Addbook({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        Addbook(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },

    /*
     * 删除书籍
     * */
    Delbook({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        Delbook(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },

    /*
     * 编辑书籍
     * */
    Updatebook({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        Updatebook(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },

    /*
     * 查看所有书籍评论
     * */
    GetAllCommentBook({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetAllCommentBook(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },

    /*
     * 修改书籍阅读量
     * */
    UpdateBookInfoForReadNum({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        UpdateBookInfoForReadNum(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },

    /*
     * 按分类与学科书名搜索书籍列表
     * */
    GetSearchbyBookCategory({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetSearchbyBookCategory(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
  /*
  * 标签列表
  * */
  GetAllcloudlabel({commit, state}, parameterData) {
    return new Promise((resolve, reject) => {
      GetAllcloudlabel(parameterData).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
    /*
  * 按名称搜索书籍
  * */
  GetNameSeachBook({commit, state}, parameterData) {
    return new Promise((resolve, reject) => {
      GetNameSeachBook(parameterData).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
  /*
  * 课件列表
  * */
 GetKejianList({commit, state}, parameterData) {
    return new Promise((resolve, reject) => {
      GetKejianList(parameterData).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
  /*
    * 通过条件查询课件列表
    * */
   GetKejianListByQuery({commit, state}, parameterData) {
    return new Promise((resolve, reject) => {
      GetKejianListByQuery(parameterData).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
  /*
  * 上传课件
  * */
  AddKejian({commit, state}, parameterData) {
    return new Promise((resolve, reject) => {
      AddKejian(parameterData).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
  /*
  * 编辑课件
  * */
  UpdateKejian({commit, state}, parameterData) {
    return new Promise((resolve, reject) => {
      UpdateKejian(parameterData).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
    /*
  * 修改课件阅读量
  * */
    UpdateMaterialsKejianReadNum({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        UpdateMaterialsKejianReadNum(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
    * 查看课件所有评论
    * */
    GetAllCommentKejian({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetAllCommentKejian(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
    * 查询所有出版社
    * */
    GetAllPublisher({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetAllPublisher(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
    * 新增出版社
    * */
    AddPublisherList({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        AddPublisherList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
    * 删除出版社
    * */
    DeletePublisher({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        DeletePublisher(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
    * 回复评论
    * */
    UpdatecontentReplyKejian({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        UpdatecontentReplyKejian(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
    * 删除评论
    * */
    DelContentComment({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        DelContentComment(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
    * 通过id查询单个课件
    * */
    GetKejian({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetKejian(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
      * 通过id查询单个书籍
      * */
     Getbook({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        Getbook(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
      * 课件模板列表
      * */
     GetKejianTemplateList({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetKejianTemplateList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
      * 查询课件模板目录名称列表
      * */
     GetkeJianTemplateDir({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetkeJianTemplateDir(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
      * 查询课件模板类别名称列表
      * */
     GetKejianTemplateType({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetKejianTemplateType(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
     /*
      * 进入编辑课件模板时查询
      * */
     GetKejianTemplate({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetKejianTemplate(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * 上传课件模板
      * */
     UploadKejianTemplate({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        UploadKejianTemplate(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * 编辑课件模板
      * */
     ModifyKejianTemplate({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        ModifyKejianTemplate(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * 删除课件模板
      * */
     DelKejianTemplate({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        DelKejianTemplate(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
     /*
      * 查看教材体系
      * */
     GetCloudMaterialsSystemList({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetCloudMaterialsSystemList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * 根据条件查看教材体系
      * */
     GetCloudMaterialsSystemListByKey({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetCloudMaterialsSystemListByKey(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * （教材体系管理）修改教材的阅读量
      * */
     UpdateMaterialsSystemReadedNumber({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        UpdateMaterialsSystemReadedNumber(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * （教材体系管理）查看一个教材的评价列表
      * */
     GetEvaluationsFromMaterialsSystem({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetEvaluationsFromMaterialsSystem(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * 上传教材体系
      * */
     AddCloudMaterialsSystem({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        AddCloudMaterialsSystem(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
      /*
      * 查看一个教材体系的基本信息
      * */
     GetCloudMaterialsSystemBasic({commit, state}, parameterData) {
      return new Promise((resolve, reject) => {
        GetCloudMaterialsSystemBasic(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
     },
 },

}

export default user
