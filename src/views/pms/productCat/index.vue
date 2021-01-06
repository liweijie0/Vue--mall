<template>
	<div>
	<div class="datatab">
		<div><i class="el-icon-s-order"></i><span>数目列表</span></div>
		<div>
			<el-button size="mini" round>添加</el-button>
		</div>
	</div>
	<div class="datatab1">
	 <el-table
	    :data="CatData"
	 	border
	     style="width: 100%">
	     <el-table-column
	 	 align="center"
	       prop="id"
	       label="编号"
	 	  width="90">
	     </el-table-column>
	     <el-table-column
	 	align="center"
	       prop="name"
	       label="分类名称"
	       width="100">
	     </el-table-column>
	     <el-table-column
	 	align="center"
	       prop="level"
	       label="级别"
	 	  width="100">
	     </el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="productCount"
	 	  label="商品数量"
	 	  width="100">
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="productUnit"
	 	  label="数量单位"
	 	  width="100">
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  label="导航栏"
	 	  width="100">
	 	  <template v-slot="data">
	 		  <el-switch v-model="data.row.navStatus" :active-value='1' :inactive-value='0'></el-switch>
	 	  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  label="是否显示"
	 	  width="100">
	 	  <template v-slot="data">
	 			<el-switch v-model="data.row.showStatus" :active-value='1' :inactive-value='0'></el-switch>
	 	  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="sort"
	 	  label="排序"
	 	  width="100">
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="address"
	 	  label="设置"
		  width="200">
	 	  <template v-slot="data">
	 	  		<el-button size='mini' :disabled="disabled" @click='nextLevel(data.row.id)'>查看下级</el-button>
	 			<el-button size='mini'>转移商品</el-button>
	 	  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="address"
	 	  label="操作"
		  width="200">
	 	  <template v-slot="data">
	 	  		<el-button size='mini' @click='Editor(data.row.id,data.row.name)'>编辑</el-button>
	 	  		<el-button size='mini' type="danger">删除</el-button>
	 	  </template>
	 	</el-table-column>
		</el-table>
	  </div>
	  <el-pagination
	    background
	    layout="total, sizes, prev, pager, next, jumper"
		@size-change="handleSizeChange" @current-change="handleCurrentChange"
		:page-sizes="[2, 5, 10,15]"
		:page-size="catform.pageSize"
		:current-page="catform.pageNum"
	    :total="total"
		style="text-align: right;margin-top: 10px;">
	  </el-pagination>
	</div>
</template>

<script>
	import {getCatData,getCatproSingle} from '@/api/proCat.js'
	export default{
		data(){
			return{
				CatData:[],
				total:0,
				catform:{
					pageSize:5,
					pageNum:0
				},
				disabled:false
			}
		},
		methods:{
			// 查看下一级
			nextLevel(id){
				if(id!=0){
				getCatData(id,{pageNum:1,pageSize:5}).then(resp=>{
					this.CatData = resp.data.list,
					this.total = resp.data.total,
					this.disabled = true
				})
			}
			},
			// 获取当前页的多少条
			handleSizeChange(val) {
				this.catform.pageSize = val;
				this.queryResult()
			},
			// 获取当前页是第几页
			handleCurrentChange(val) {
				this.catform.pageNum = val;
				this.queryResult()
			},
			// 编辑
			Editor(pid){
				getCatproSingle(pid).then(resp=>{
					console.log(resp.data,999);
					if(resp.code == 200){
						// 路由带参
						this.$router.push({
						path:'/reProductCat/reProductCat',
						name:'商品修改',
						params:resp.data,
						// 把id拼接上去
						query:{id:pid}
						});
					}
				})
			},
			queryResult(){
				getCatData(this.catform.pageNum,`{pageNum=${++this.catform.pageNum},pageSize=${this.catform.pageSize}}`).then(resp=>{
					this.CatData = resp.data.list,
					this.total = resp.data.total
				})
			}
				
			
		},
		mounted() {
			this.queryResult()
			
		}
		
		
	}
</script>

<style lang="scss">
	.datatab {
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #C0CCDA;
		border-radius: 3px;
		padding: 20px 10px;
		margin-bottom: 20px;
		overflow: hidden;
		text-align: center;
		div:first-child {
			float: left;
	
			i {
				padding-right: 5px;
				font-size: 18px;
				color: #C9C9C9;
			}
		}
		div:last-child {
			float: right;
			.el-button {
				border-radius: 5px;
			}
		}
	
	}
	
</style>
