import Http from '@/utils/axios';

//login
export const login = (params) => new Http().require({api: '/login',param:params}); //登录
export const getUploadToken = (params) => new Http().require({api: '/getUploadToken',param:params}); //获取七牛token

export const getAdminList = (params) => new Http().require({api: '/getAdminList',param:params}); //管理员列表
export const addAdmin = (params) => new Http().require({api: '/addAdmin',param:params}); //添加管理员
export const forbideAdmin = (params) => new Http().require({api: '/forbideAdmin',param:params}); //禁用/启用管理员
export const updateAdmin = (params) => new Http().require({api: '/updateAdmin',param:params}); //编辑管理员

//
export const getCollegeList = (params) => new Http().require({api: '/getCollegeList',param:params}); //查询院校列表
export const addOneCollege = (params) => new Http().require({api: '/addOneCollege',param:params}); //增加一个院校
export const publishOneCollege = (params) => new Http().require({api: '/publishOneCollege',param:params}); //发布一个院校
export const publishSomeColleges = (params) => new Http().require({api: '/publishSomeColleges',param:params}); //批量发布院校
export const setAttentionNumForCollege = (params) => new Http().require({api: '/setAttentionNumForCollege',param:params}); //设置一个院校不同省份的关注量
export const deleteOneCollege = (params) => new Http().require({api: '/deleteOneCollege',param:params}); //删除一个院校
export const getOneCollege = (params) => new Http().require({api: '/getOneCollege',param:params}); //查询一个院校
export const updateOneCollege = (params) => new Http().require({api: '/updateOneCollege',param:params}); //编辑一个院校


export const getBookletListForCollege = (params) => new Http().require({api: '/getBookletListForCollege',param:params}); //查询一个院校的“招生简章”列表
export const addBookletForCollege = (params) => new Http().require({api: '/addBookletForCollege',param:params}); //添加一篇“招生简章”的文章

export const getTopicListForCollege = (params) => new Http().require({api: '/getTopicListForCollege',param:params}); //查询一个院校的“历史考题”列表
export const addTopicForCollege = (params) => new Http().require({api: '/addTopicForCollege',param:params}); //添加一篇“历史考题”的文章

export const addHighScoreForCollege = (params) => new Http().require({api: '/addHighScoreForCollege',param:params}); //添加一篇“高分卷”的文章
export const getHighScoreListForCollege = (params) => new Http().require({api: '/getHighScoreListForCollege',param:params}); //查询一个院校的“高分卷”列表


export const delOneBooklet = (params) => new Http().require({api: '/delOneBooklet',param:params}); //删除一篇“招生简章”
export const delOneTopic = (params) => new Http().require({api: '/delOneTopic',param:params}); //删除一篇“历史考题”
export const delOneHighScore = (params) => new Http().require({api: '/delOneHighScore',param:params}); //删除一篇“高分卷”

export const getOneArticleContentOfCollegeInfo = (params) => new Http().require({api: '/getArticleContentOfCollegeInfo',param:params}); //查询一篇文章详情


export const getAllGuideContentForCollege = (params) => new Http().require({api: '/getAllGuideContentForCollege',param:params}); //查询学校报考指南信息

export const getPlaceListForCollege = (params) => new Http().require({api: '/getPlaceListForCollege',param:params}); //查询一个院校所有考试地点
export const addPlaceForCollege = (params) => new Http().require({api: '/addPlaceForCollege',param:params}); //添加考试地点


export const setRangeForOneCollege = (params) => new Http().require({api: '/setRangeForOneCollege',param:params}); //设置一个院校的招生范围
export const setProfessionSubjectForOneCollege = (params) => new Http().require({api: '/setProfessionSubjectForOneCollege',param:params}); //设置一个院校的招生专业考试科目
export const setProvinceScheduleForOneCollege = (params) => new Http().require({api: '/setProvinceScheduleForOneCollege',param:params}); //设置一个院校不同省份的招生计划
export const setPrincipleForOneCollege = (params) => new Http().require({api: '/setPrincipleForOneCollege',param:params}); //设置一个院校的录取原则
export const setSmallScoreLimitForOneCollege = (params) => new Http().require({api: '/setSmallScoreLimitForOneCollege',param:params}); //设置一个院校的录取原则


export const getProfessionTimeListForCollege = (params) => new Http().require({api: '/getProfessionTimeListForCollege',param:params}); //查询一个院校每个专业的报名时间、确认时间和考试时间
export const updateTimeForCollegeProfession = (params) => new Http().require({api: '/updateTimeForCollegeProfession',param:params}); //设置院校某个专业的报名时间、确认时间和考试时间
export const delPlaceForCollege = (params) => new Http().require({api: '/delPlaceForCollege',param:params}); //删除考试地点


export const getAttentionNumForCollege = (params) => new Http().require({api: '/getAttentionNumForCollege',param:params}); //获取关注量


export const GetRecommendationDailyList = (params) => new Http().require({api: '/getRecommendationDailyList',param:params}); //每日推荐列表查询
export const AddRecommendationDaily = (params) => new Http().require({api: '/addRecommendationDaily',param:params}); //上传每日推荐
export const UpdateRecommendationDaily = (params) => new Http().require({api: '/updateRecommendationDaily',param:params}); //编辑每日推荐
export const DeleteRecommendationDaily = (params) => new Http().require({api: '/deleteRecommendationDaily',param:params}); //删除每日推荐
export const GetRecommendationDailyListByQuery = (params) => new Http().require({api: '/getRecommendationDailyListByQuery',param:params}); //通过Quey获取云教材每日推荐列表
export const SelectRecommendationDailyById = (params) => new Http().require({api: '/selectRecommendationDailyById',param:params}); //通过id查询单个云教材每日推荐

export const GetKejianList = (params) => new Http().require({api: '/getKejianList',param:params}); //查看所有课件列表
export const GetKejianListByQuery = (params) => new Http().require({api: '/getKejianListByQuery',param:params}); //通过条件获取课件列表
export const UpdateKejian = (params) => new Http().require({api: '/UpdateKejian',param:params}); //编辑课件
export const AddKejian = (params) => new Http().require({api: '/AddKejian',param:params}); //上传课件
export const DelMaterialsKejian = (params) => new Http().require({api: '/DelMaterialsKejian',param:params}); //删除课件
export const UpdateMaterialsKejianReadNum = (params) => new Http().require({api: '/UpdateMaterialsKejianReadNum',param:params}); //修改课件阅读量
export const GetAllCommentKejian = (params) => new Http().require({api: '/GetAllCommentKejian',param:params}); //查看课件所有评论
export const GetKejian = (params) => new Http().require({api: '/getKejian',param:params}); //通过id查询单个课件



export const GetAllBook = (params) => new Http().require({api: '/getAllBook',param:params}); //查看所有书籍
export const Addbook = (params) => new Http().require({api: '/Addbook',param:params}); //上传书籍
export const Delbook = (params) => new Http().require({api: '/Delbook',param:params}); //删除书籍
export const Updatebook = (params) => new Http().require({api: '/Updatebook',param:params}); //编辑书籍
export const GetAllCommentBook = (params) => new Http().require({api: '/getAllCommentBook',param:params}); //查看所有书籍评论
export const UpdateBookInfoForReadNum = (params) => new Http().require({api: '/updateBookInfoForReadNum',param:params}); //修改书籍阅读量
export const GetSearchbyBookCategory = (params) => new Http().require({api: '/GetSearchbyBookCategory',param:params}); //按分类与学科书名搜索书籍列表
export const GetAllcloudlabel = (params) => new Http().require({api: '/GetAllcloudlabel',param:params}); //查看所有标签
export const GetNameSeachBook = (params) => new Http().require({api: '/GetNameSeachBook',param:params}); //按名称搜索书籍
export const Getbook = (params) => new Http().require({api: '/getbook',param:params}); //通过id查询单个课件


export const DelKejianTemplate = (params) => new Http().require({api: '/delKejianTemplate',param:params}); //删除课件模板
export const GetKejianTemplateList = (params) => new Http().require({api: '/getKejianTemplateList',param:params}); //课件模板列表
export const GetKejianTemplateType = (params) => new Http().require({api: '/getKejianTemplateType',param:params}); //查询课件模板类别名称列表
export const GetkeJianTemplateDir = (params) => new Http().require({api: '/getkeJianTemplateDir',param:params}); //查询课件模板目录名称列表
export const GetKejianTemplate = (params) => new Http().require({api: '/getKejianTemplate',param:params}); //进入编辑课件模板时查询
export const UploadKejianTemplate = (params) => new Http().require({api: '/UploadKejianTemplate',param:params}); //上传课件模板
export const ModifyKejianTemplate = (params) => new Http().require({api: '/ModifyKejianTemplate',param:params}); //编辑课件模板

export const GetAllPublisher = (params) => new Http().require({api: '/GetAllPublisher',param:params}); //查询所有出版社
export const AddPublisherList = (params) => new Http().require({api: '/addPublisherList',param:params}); //新增出版社
export const DeletePublisher = (params) => new Http().require({api: '/deletePublisher',param:params}); //删除出版社

export const GetCloudMaterialsSystemBasic = (params) => new Http().require({api: '/getCloudMaterialsSystemBasic',param:params}); //查看一个教材体系的基本信息
export const GetCloudMaterialsSystemList = (params) => new Http().require({api: '/getCloudMaterialsSystemList',param:params}); //查看教材体系
export const AddCloudMaterialsSystem = (params) => new Http().require({api: '/addCloudMaterialsSystem',param:params}); //上传教材体系
export const DeleteMaterialsSystem = (params) => new Http().require({api: '/deleteMaterialsSystem',param:params}); //删除一个教材体系
export const ModifyCloudMaterialsSystem = (params) => new Http().require({api: '/modifyCloudMaterialsSystem',param:params}); //编辑教材体系
export const UpdateMaterialsSystemReadedNumber = (params) => new Http().require({api: '/updateMaterialsSystemReadedNumber',param:params}); //修改教材阅读量
export const GetCloudMaterialsSystemListByKey = (params) => new Http().require({api: '/getCloudMaterialsSystemListByKey',param:params}); //根据条件查看教材体系管理
export const GetKejianListInMaterialsSystemByKey = (params) => new Http().require({api: '/getKejianListInMaterialsSystemByKey',param:params}); //根据条件查看课件列表
export const AddKejianToCloudMaterials = (params) => new Http().require({api: '/addKejianToCloudMaterials',param:params}); //添加课件到云教材中心
export const AddBookToCloudMaterials = (params) => new Http().require({api: '/addBookToCloudMaterials',param:params}); //添加书籍到云教材中心
export const AddKejianInMaterialsSystem = (params) => new Http().require({api: '/addKejianInMaterialsSystem',param:params}); //教材添加新课件
export const AddBookToMaterialsSystem = (params) => new Http().require({api: '/addBookToMaterialsSystem',param:params}); //教材添加新书籍
export const ModifyPicInMaterialsSystem = (params) => new Http().require({api: '/modifyPicInMaterialsSystem',param:params}); //编辑教材图片
export const DeleteKejianFromMaterialsSystem = (params) => new Http().require({api: '/deleteKejianFromMaterialsSystem',param:params}); //从一个体系中删除一个课件
export const DeleteBookFromMaterialsSystem = (params) => new Http().require({api: '/deleteBookFromMaterialsSystem',param:params}); //从一个体系中删除一个书籍
export const DeletePicFromMaterialsSystem = (params) => new Http().require({api: '/deletePicFromMaterialsSystem',param:params}); //从一个体系中删除一个图片
export const GetKejianListInMaterialsSystem = (params) => new Http().require({api: '/getKejianListInMaterialsSystem',param:params}); //查看一个教材的课件列表
export const GetBookListInMaterialsSystem = (params) => new Http().require({api: '/getBookListInMaterialsSystem',param:params}); //查看一个教材的书籍列表
export const GetEvaluationsFromMaterialsSystem = (params) => new Http().require({api: '/getEvaluationsFromMaterialsSystem',param:params}); //查看一个教材的评价列表
export const GetBookListInMaterialsSystemByKey = (params) => new Http().require({api: '/getBookListInMaterialsSystemByKey',param:params}); //根据条件查看书籍列表

export const UpdatecontentReplyKejian = (params) => new Http().require({api: '/UpdatecontentReplyKejian',param:params}); //回复评论
export const DelContentComment = (params) => new Http().require({api: '/delContentComment',param:params}); //删除评论