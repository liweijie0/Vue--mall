<template>
	<div class="addbro">
		<el-form label-width="130px" class="demo-ruleForm">
			<!-- <el-form-item label="分类名称:" prop="name">
				<el-input v-model="proCatInfoform.name" size="small"></el-input>
			</el-form-item> -->
			<el-form-item label="上下级分类:" style="width:80%;" required>
				<!-- <el-select v-model="product.brandId" placeholder="请选择" size="small" @change="handleChangeBrand">
					<el-option v-for="item in brandlist" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select> -->
			</el-form-item>
			<!-- <el-form-item label="数量单位:" prop="productUnit">
				<el-input v-model="proCatInfoform.productUnit" size="small"></el-input>
			</el-form-item>
			<el-form-item label="排序:" prop="sort">
				<el-input v-model="proCatInfoform.sort" size="small"></el-input>
			</el-form-item>
			<el-form-item label="是否显示:">
				<el-radio v-model="proCatInfoform.showStatus" :label="1">是</el-radio>
				<el-radio v-model="proCatInfoform.showStatus" :label="0">否</el-radio>
			</el-form-item>
			<el-form-item label="是否显示在导航栏:">
				<el-radio v-model="proCatInfoform.navStatus" :label="1">是</el-radio>
				<el-radio v-model="proCatInfoform.navStatus" :label="0">否</el-radio>
			</el-form-item>
			<el-form-item label="分类图标:">
				<el-button type="primary" size="small">点击上传</el-button>
				<P style='font-size: 10px;color: #606266;'>只能上传jpg/png文件，且不超过10MB</P>
			</el-form-item>
			<el-form-item label="筛选属性:">
				<el-cascader size="small" placeholder="请选择" 
				v-model="proCatInfoform.productAttributeIdList" 
				:options="productAttributeIdList" 
				:props="{label:'name',value:'id'}"
				@change="handleChange">
				</el-cascader>
			</el-form-item> -->
		</el-form>
	</div>
</template>

<script>
	import {
		getCatList
	} from '@/api/proCat.js'
	export default {
		data() {
			return {
				proCatInfoform: {
					 "description": "",
					  "icon": "",
					  "keywords": "",
					  "name": "",
					  "navStatus": "",
					  "parentId": 0,
					  "productAttributeIdList": [],
					  "productUnit": "",
					  "showStatus": "",
					  "sort": 0
				},
				productAttributeIdList:[]
			}
		},
		mounted() {
			this.proCatInfoform = this.$router.history.current.params;
			// 获取分类列表
			getCatList().then(resp => {
				this.productAttributeIdList = resp.data;
				console.log(this.productAttributeIdList,111);
			})
		},
		methods:{
			handleChange(val){
				// this.proCatInfoform.productAttributeIdList = val[1];
			}
		}
	}
</script>

<style lang="scss">
	.addbro {
		width: 60%;
		border: 1px solid #BFCBD9;
		padding: 50px;
		margin: 0 auto;

	}
</style>
