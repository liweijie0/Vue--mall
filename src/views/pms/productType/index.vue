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
	    :data="TypeData"
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
	       label="类型名称"
	       width="210">
	     </el-table-column>
	     <el-table-column
	 	align="center"
	       prop="attributeCount"
	       label="属性数量"
	 	  width="200">
	     </el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="paramCount"
	 	  label="参数数量"
	 	  width="200">
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="address"
	 	  label="设置"
		  width="217">
	 	  <template v-slot="data">
	 	  		<el-button size='mini' @click="attrlist(data.row.id)">属性列表</el-button>
	 			<el-button size='mini' @click="parmalist(data.row.id)">参数列表</el-button>
	 	  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="address"
	 	  label="操作"
		  width="210">
	 	  <template v-slot="data">
	 	  		<el-button size='mini'>编辑</el-button>
	 	  		<el-button size='mini' type="danger">删除</el-button>
	 	  </template>
	 	</el-table-column>
		</el-table>
	  </div>
	  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Typeform.pageNum"
	   :page-sizes="[2, 5, 10,15]" :page-size="Typeform.pageSize" :total= "total" layout="total, sizes, prev, pager, next, jumper"
	   style="text-align: right;margin-top: 10px;">
	  </el-pagination>
	</div>
</template>

<script>
	import {getAttrTypeList} from '@/api/proType.js'
	export default{
		data(){
			return{
				TypeData:[],
				Typeform:{
					pageNum:1,
					pageSize:5
				},
				total:0
				
			}
		},
		methods:{
			queryResult(){
				getAttrTypeList(`{pageNum=${this.Typeform.pageNum},pageSize=${this.Typeform.pageSize}}`).then(resp=>{
					this.TypeData = resp.data.list
					this.total = resp.data.total
				})
				},
			// 获取当前页的多少条
			handleSizeChange(val) {
				this.Typeform.pageSize = val;
				this.queryResult()
			},
			// 获取当前页是第几页
			handleCurrentChange(val) {
				this.Typeform.pageNum = val;
				this.queryResult()
			},
			// 属性列表按钮
			attrlist(){
				this.$router.push('/AttributeList;/AttributeList')
			},
			// 参数列表按钮
			parmalist(){
				this.$router.push('/parameterList;/parameterList')
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