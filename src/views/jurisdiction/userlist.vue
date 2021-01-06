<template>
	<div>
	<div class="frame">
	<div class="frame1">
		<div>
			<div>
				<i class="el-icon-search"></i>
				<p>筛选搜索</p>
			</div>
			<div>
				<el-button type="primary" size="small" @click="resetForm">重置</el-button>
				<el-button type="primary" size="small" @click="queryResult">查询结果</el-button>
			</div>
		</div>
		<el-form ref="userfrom" :model="userfrom" label-width="114px">
			<el-row :gutter="20">
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-form-item label="输入搜索:" prop="keyword">
							<el-input size="small" v-model="userfrom.keyword" placeholder="商品名称" style="width: 200px;">
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
	    :data="UserData"
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
	       prop="nickName"
	       label="账号"
	       width="100">
	     </el-table-column>
	     <el-table-column
	 	align="center"
	       prop="username"
	       label="姓名"
	 	  width="100">
	     </el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="email"
	 	  label="邮箱"
	 	  width="150">
	 	</el-table-column>
		<el-table-column
		align="center"
		  prop="createTime"
		  label="添加时间"
		  width="200">
		</el-table-column>
		<el-table-column
		align="center"
		  prop="loginTime"
		  label="最后登录时间"
		  width="200">
		</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  label="是否启用"
	 	  width="100">
		  <template v-slot="data">
				<el-switch v-model="data.row.status" :active-value='1' :inactive-value='0'></el-switch>
		  </template>
	 	</el-table-column>
	 	<el-table-column
	 	align="center"
	 	  prop="address"
	 	  label="操作"
		  width="164">
	 	  <template v-slot="data">
			  <el-button type="text" size='mini' @click="getUserinfo(data.row.id)">分配角色</el-button>
			  <el-dialog title="分配角色" :visible.sync="dialogFormVisible" width="30%" prop="username">
				  <el-select v-model="userfrom" size='small' multiple placeholder="请选择" style="width:70%;">
				      <el-option
				        v-for="item in Userlist"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value">
				      </el-option>
				    </el-select>
			    <div slot="footer" class="dialog-footer">
			      <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			      <el-button type="primary" @click="dialogFormVisible = false" size='small'>确 定</el-button>
			    </div>
			  </el-dialog>
	 	  		<el-button size='mini' type="text" @click="Editor(data.row.id)">编辑</el-button>
				<el-dialog title="编辑用户" width="40%" :visible.sync="dialogFormVisible">
				<el-form  label-width="80px" class="text">
					  <el-form-item label="账号:">
						<el-input size='small' v-model="data.row.nickName" placeholder="请输入内容"></el-input>  
					  </el-form-item>
					  <el-form-item label="姓名:">
					  	<el-input size='small' v-model="data.row.username" placeholder="请输入内容"></el-input>		
					  </el-form-item>
					  <el-form-item label="邮箱:">
						  <el-input size='small' v-model="data.row.email" placeholder="请输入内容"></el-input>
					  </el-form-item>
					 <el-form-item label="密码:">
					 	<el-input size='small' v-model="data.row.password" type="password" placeholder="请输入内容"></el-input>
					 </el-form-item>
					  <el-form-item label="备注:">
					  	<el-input size='small' v-model="data.row.note" type="textarea" placeholder="请输入内容"></el-input>
					  </el-form-item>
					   <el-form-item label="是否启用:">
							<el-radio v-model="data.row.status" label="1">备选项</el-radio>
							<el-radio v-model="data.row.status" label="0">备选项</el-radio>
					   </el-form-item>
					</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				  </div>
				</el-dialog>
				 <el-button type="text" size='mini' @click='Deletbtn(data.row.id)'>删除</el-button>
	 	  </template>
	 	</el-table-column>
		</el-table>
	  </div>
	  <el-pagination  :current-page="userfrom.pageNum"
	   :page-sizes="[2, 5, 10,15]" :page-size="userfrom.pageSize" :total= "total" layout="total, sizes, prev, pager, next, jumper"
	   style="text-align: right;margin-top: 10px;">
	  </el-pagination>
	</div>
	</div>
</template>

<script>
	import {Userlist,UserRinfo} from '@/api/jurisdUser.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				userfrom:{
					keyword:'',
					pageSize:5,
					pageNum:1,
					name:'',
					region:'',
					username:[]
				},
				UserData:[],
				Userlist:[],
				total:0,
				dialogTableVisible: false,
				dialogFormVisible: false,
			}
		},
		 filters: {
			formatDate: function (value){
				return moment(value).format('YYYY-MM-DD')
				}	
		    },
		methods:{
			// 重置按钮
			resetForm(){
				this.$refs['userfrom'].resetFields();
				this.queryResult()
			},
			// 查询结果按钮
			queryResult() {
				Userlist(this.userfrom).then(resp=>{
					this.UserData = resp.data.list
					console.log( resp.data.list,11111);
					this.total = resp.data.total
				})
			},
			// 删除按钮
			Deletbtn(id){
				// Deletebrand(id).then(resp=>{
				// 	if(resp.code == 200){
				// 		this.$message({
				// 			message: '删除成功',
				// 			type: 'success'
				// 		});
				// 		this.queryResult()
				// 	}
				// })
				 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
			},
			// 获取指定用户的角色
			getUserinfo(id){
				this.dialogFormVisible = true;
				UserRinfo(id).then(resp=>{
					console.log(id);
				})
			},
			Editor(id){
				this.dialogFormVisible = true;
				// if(id == this.UserData.id){
					
				// }
				
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
	.datatab1{
		.text{
			margin-left: 100px;
			.el-form-item{
				.el-form-item__content{
					width: 50%;
					.el-input{
						width:100%;
					}
				}
				
			}
		}
	}
</style>
