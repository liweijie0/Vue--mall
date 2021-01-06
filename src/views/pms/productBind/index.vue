<template>
	<div>
	<div v-show="show">
	<div class="frame">
	<div class="frame1">
		<div>
			<div>
				<i class="el-icon-search"></i>
				<p>筛选搜索</p>
			</div>
			<div>
				<el-button type="primary" size="small" @click="queryResult">查询结果</el-button>
			</div>
		</div>
		<el-form ref="bindfrom" :model="bindfrom" label-width="114px">
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-form-item label="输入搜索:" prop="keyword">
							<el-input size="small" v-model="bindfrom.keyword" placeholder="商品名称" style="width: 200px;">
							</el-input>
						</el-form-item>
					</div>
				</el-col>
			</el-row>
		</el-form>
	</div>
	</div>
	<div class="datatab">
		<div><i class="el-icon-s-order"></i><span>数目列表</span></div>
		<div>
			<el-button size="mini" round>添加</el-button>
		</div>
	</div>
	<div class="datatab1">
	 <el-table
	    :data="BindData"
	 	 border
	     style="width: 100%">
		 <el-table-column align='center' type="selection" width="55">
		 </el-table-column>
	     <el-table-column
	 	 align="center"
	       prop="id"
	       label="编号"
	 	  width="90">
	     </el-table-column>
	     <el-table-column
	 	align="center"
	       prop="name"
	       label="品牌名称"
	       width="100">
	     </el-table-column>
	     <el-table-column
	 	align="center"
	       prop="firstLetter"
	       label="品牌首字母"
	 	  width="100">
	     </el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="sort"
	 	  label="排序"
	 	  width="100">
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="factoryStatus"
	 	  label="品牌制造商"
	 	  width="130">
		  <template v-slot="data">
				<el-switch v-model="data.row.factoryStatus" :active-value='1' :inactive-value='0'></el-switch>
		  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  label="是否显示"
	 	  width="130">
	 	  <template v-slot="data">
	 		  <el-switch v-model="data.row.showStatus" :active-value='1' :inactive-value='0'></el-switch>
	 	  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  label="相关"
		  width="200">
	 	  <template v-slot="data">
	 	  		<p><span v-model="data.row.bigPic"></span><span></span></p>
	 	  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="address"
	 	  label="操作"
		  width="200">
	 	  <template v-slot="data">
	 	  		<el-button size='mini' @click="Edtior">编辑</el-button>
	 	  		<el-button size='mini' type="danger" @click='Deletbtn(data.row.id)'>删除</el-button>
	 	  </template>
	 	</el-table-column>
		</el-table>
	  </div>
	  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="bindfrom.pageNum"
	   :page-sizes="[2, 5, 10,15]" :page-size="bindfrom.pageSize" :total= "total" layout="total, sizes, prev, pager, next, jumper"
	   style="text-align: right;margin-top: 10px;">
	  </el-pagination>
	</div>
	<div v-show="!show">
		hahh
	</div>
	</div>
</template>

<script>
	import {getBrandpagelist,Deletebrand} from '@/api/proBran.js'
	export default {
		data() {
			return {
				show:true,
				bindfrom:{
					keyword:'',
					pageSize:5,
					pageNum:1
					
				},
				BindData:[],
				total:0
			}
		},
		methods:{
			// 查询结果按钮
			queryResult() {
				getBrandpagelist(this.bindfrom).then(resp=>{
					this.BindData = resp.data.list
					console.log( resp.data.list,11111);
					this.total = resp.data.total
				})
			},
			// 删除按钮
			Deletbtn(id){
				Deletebrand(id).then(resp=>{
					if(resp.code == 200){
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.queryResult()
					}
				})
			},
			// 获取当前页的多少条
			handleSizeChange(val) {
				this.bindfrom.pageSize = val;
				this.queryResult()
			},
			// 获取当前页是第几页
			handleCurrentChange(val) {
				this.bindfrom.pageNum = val;
				this.queryResult()
			},
			// 编辑
			Edtior(){
				this.show = !this.show
			}
			
		},
		mounted() {
			this.queryResult()
		}
	}
</script>

<style lang="scss">
	.frame {
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #C0CCDA;
		margin: 0 auto;
		border-radius: 3px;
		padding: 15px;
		padding-top: 5px;
		margin-bottom: 20px;
	
		.frame1 {
			width: 96%;
			margin: 10px auto;
	
			>div:nth-child(1) {
				width: 100%;
				display: flex;
				justify-content: space-between;
	
				div:nth-child(1) {
					width: 9%;
					display: flex;
	
					i {
						margin-right: 5px;
					}
	
					p {
						vertical-align: middle;
						display: contents;
					}
				}
	
				div:nth-child(2) {
					width: 17%;
					height: 100%;
					display: flex;
	
					button:nth-child(1) {
						width: 64px;
						height: 33px;
						background: #fff;
						padding: 0;
						color: #4890da;
	
						span {
							margin: 0;
						}
					}
	
					button:nth-child(1):hover {
						background: #c6e2ff;
					}
	
				}
			}
	
		}
	}
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
