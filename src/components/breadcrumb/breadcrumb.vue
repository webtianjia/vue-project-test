<template>
	<div id="breadcrumb" separator="/home">
		<el-breadcrumb>
		  <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="item.path" v-for="(item,index) in routerList" v-if="!item.isDefault" :key="index">{{item.name}}</el-breadcrumb-item>
		  <el-breadcrumb-item v-for="(item,index) in routerList" v-if="item.isDefault" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script type="text/javascript">
/*//面包屑路径，Home默认存在,isDefault接受一个布尔类型,表示是否决定分隔符
	默认接受一个 父组件传递过来的 数组对象。
*/
	export default{
		props: {
		    routerList: {
		        type: Array
		    }
		}
	}
</script>
<style lang="scss" scoped>

</style>
