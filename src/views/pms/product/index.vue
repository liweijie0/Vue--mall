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
				<el-form ref="searchform" :model="searchform" label-width="114px">
					<el-row :gutter="20">
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<el-form-item label="输入搜索:" prop="keyword">
									<el-input size="small" v-model="searchform.keyword" placeholder="商品名称" style="width: 200px;">
									</el-input>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<el-form-item label="商品货号:" prop="productSn">
									<el-input size="small" v-model="searchform.productSn" placeholder="商品货号" style="width: 200px;">
									</el-input>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<el-form-item label="商品分类：" prop="productCategoryId" >
								<el-cascader v-model="searchform.productCategoryId" :options="catList" :props="{label:'name',value:'id'}"
								 size="small"></el-cascader>
								 </el-form-item>
							</div>
							
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8" >
							<div class="grid-content bg-purple">
								<el-form-item label="商品品牌:" prop="brandId">
								<el-select v-model="searchform.brandId"  clearable placeholder="请选择" size="small" style="width: 230px;">
									<el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>
						<el-col :span="8" >
							<div class="grid-content bg-purple">
								<el-form-item label="上架状态:" prop="publishStatus">
								<el-select v-model="searchform.publishStatus"  clearable placeholder="全部" size="small" style="width: 230px;">
									<el-option v-for="item in publishStatus" :key="item.status" :label="item.label" :value="item.status">
									</el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8" >
							<div class="grid-content bg-purple">
								<el-form-item label="审核状态:" prop="verifyStatus">
								<el-select v-model="searchform.verifyStatus"  clearable placeholder="全部" size="small">
									<el-option v-for="item in verifyStatus" :key="item.status" :label="item.label" :value="item.status">
									</el-option>
								</el-select>
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
		<div class="data">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%">
				<el-table-column width="10">
				</el-table-column>
				<el-table-column align='center' type="selection" width="55">
				</el-table-column>
				<el-table-column align='center' prop="id" label="编号" width="50">
				</el-table-column>
				<el-table-column align='center' label="商品图片" width="150">
					<template v-slot="data">
						<img :src="data.row.pic" alt="" style="width: 110px;">
					</template>
				</el-table-column>
				<el-table-column align='center' prop="name" label="商品名称" width="150">
				</el-table-column>
				<el-table-column align='center' label="价格/货号" width="120">
					<template v-slot="data">
						<p>价格：￥{{data.row.price}}</p>
						<p>货号：{{data.row.productSn}}</p>
					</template>
				</el-table-column>
				<el-table-column align='center' label="标签" width="120">
					<template v-slot="data">
						<p>上架：
							<el-switch v-model="data.row.publishStatus" @change="openPublishStatus(data.row.id,data.row.publishStatus)" :active-value="1"
							 :inactive-value="0">
							</el-switch>
						</p>
						<p>新品：
							<el-switch v-model="data.row.newStatus" @change="opennewStatus(data.row.id,data.row.newStatus)" :active-value="1"
							 :inactive-value="0">
							</el-switch>
						</p>
						<p>推荐：
							<el-switch v-model="data.row.recommandStatus" @change="openrecommendStatus(data.row.id,data.row.recommandStatus)" :active-value="1"
							 :inactive-value="0">
							</el-switch>
						</p>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="sort" label="排序" width="80">
				</el-table-column>
				<el-table-column align='center' label="SKU库存" width="80">
					<template v-slot="data">
						<el-button type="primary" icon="el-icon-edit" circle @click="skuproductid(data.row.id,data.row.productSn)"></el-button>
					</template>
				</el-table-column>
				<el-table-column align='center' prop="sale" label="销量" width="80">
				</el-table-column>
				<el-table-column align='center' label="审核状态" width="120">
					<template v-slot="data">
						<p>{{data.row.verifyStatus==0?'未审核':'已通过审核'}}</p>
						<p>审查详情</p>
					</template>
				</el-table-column>
				<el-table-column align='center' label="操作" width="150">
					<template v-slot="data">
						<p>
							<el-button size='mini'>查看</el-button>
							<el-button size='mini' @click="Btnedit(data.row.id)">编辑</el-button>
						</p>
						<p>
							<el-button size='mini'>日志</el-button>
							<el-button size='mini' type='danger' @click="Btndelect(data.row.id)">删除</el-button>
						</p>

					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="footer">
			<div>
				<el-select v-model="value1" clearable placeholder="请选择" size="small">
					<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type='primary' size='mini'>确定</el-button>
			</div>
			<div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchform.pageNum"
				 :page-sizes="[2, 5, 10,15]" :page-size="searchform.pageSize" :total= "total" layout="total, sizes, prev, pager, next, jumper"
				 >
				</el-pagination>
			</div>
		</div>
		<!-- sku编辑框 -->
		<template>
			<el-dialog title="编辑货品信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
				<div class="searchbox" style="display: flex;align-items: center;">
					<span>商品货号： {{pSn}}</span>
					<el-input v-model="state" size="small" placeholder="按sku编号搜索" style="margin-left: 20px;width: 250px;">
						<el-button slot="append" icon="el-icon-search">
						</el-button>
					</el-input>
				</div>
				<el-table :data="skudataFilter" border style="width: 100%;margin-top: 20px;">
					<el-table-column align="center" prop="id" label="SKU编号">
						<template v-slot="data">
							<el-input v-model="data.row.skuCode"></el-input>
						</template>
					</el-table-column>
					<template v-if="skudata.length>0">
						<template v-for="(item,index) in skudata[0].spData">
							<el-table-column align="center" :label="item.key">
								<!-- 当前行sku的值 -->
								<template v-slot="s">
									{{s.row.spData[index].value}}
								</template>
								{{skudata[index]}}
							</el-table-column>
						</template>
					</template>
					<el-table-column align="center" prop="name" label="销售价格">
						<template v-slot="data">
							<el-input v-model="data.row.price"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="address" label="商品库存">
						<template v-slot="data">
							<el-input v-model="data.row.stock"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="address" label="库存预警值">
						<template v-slot="data">
							<el-input v-model="data.row.lowStock"></el-input>
						</template>
					</el-table-column>
				</el-table>

				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="updatastock">确 定</el-button>
				</span>
			</el-dialog>
		</template>
	</div>

</template>


<script>
	import {
		getProductList,
		productPublishStatus,
		productnewStatus,
		productrecommendStatus,
		productdelectStatus,
		updatainfo
	} from '@/api/product.js'

	import {
		skuproductid,
		updatastock
	} from '@/api/skuproductid.js'

	import {
		getCatList
	} from '@/api/proCat.js'

	import {
		getBrandList
	} from '@/api/proBran.js'

	export default {
		data() {
			return {
				value1: '',
				tableData: [],
				dialogVisible: false,
				state: '',
				skudata: [],
				pSn: '',
				pid: '',
				options2: [],
				publishStatus: [{
					label: "上架",
					status: 1
				}, {
					label: "下架",
					status: 0
				}],
				verifyStatus: [{
					label: "已审核",
					status: 1
				}, {
					label: "未审核",
					status: 0
				}],
				searchform: {
					brandId: '',
					keyword: '',
					pageNum: 1,
					pageSize: 5,
					productCategoryId: '', //它是一个数组
					productSn: '',
					publishStatus: '',
					verifyStatus: ''
				},
				brandList: [],
				catList: [],
				total:0
			}
		},
		methods: {
			// sku数据
			skuproductid(pid, pSn) {
				this.dialogVisible = true;
				this.pSn = pSn;
				this.pid = pid;
				// 拿数据
				skuproductid(pid, {
						keyword: null
					})
					.then(resp => {
						this.skudata = resp.data
						this.skudata.forEach(item => {
							item.spData = JSON.parse(item.spData)
						})
						console.log(this.skudata)
					})

			},
			// 重置按钮
			resetForm(){
				this.$refs['searchform'].resetFields();
			},
			//编辑按钮
			Btnedit(pid){
				// 路由带参
				this.$router.push({
					path:"/product/add",
					query:{id:pid}
				});
			},
			// 上架
			openPublishStatus(id, status) {
				console.log(status);
				productPublishStatus({
						ids: id,
						publishStatus: status
					})
					.then(resp => {
						if (resp.code == 200) {
							this.$message({
								message: '修改成功',
								type: 'success'
							});
						}
					})
			},
			// 新品
			opennewStatus(id, status) {
				console.log(status);
				productnewStatus({
						ids: id,
						newStatus: status
					})
					.then(resp => {
						if (resp.code == 200) {
							this.$message({
								message: '修改成功',
								type: 'success'
							});
						}
					})
			},
			// 推荐
			openrecommendStatus(id, status) {
				console.log(status,);
				productrecommendStatus({
						ids: id,
						recommendStatus: status,
					})
					.then(resp => {
						if (resp.code == 200) {
							this.$message({
								message: '修改成功',
								type: 'success'
							});
						}
					})
			},
			// 更新sku库存
			updatastock() {
				this.skudata.forEach(item => {
					item.spData = JSON.stringify(item.spData)
				})
				updatastock(this.pid, this.skudata)
					.then(resp => {
						if (resp.code == 200) {
							this.$confirm('确认提交？')
								.then(e => {
									this.dialogVisible = false;
								})
						}
					})
			},
			// 关闭提示
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			// 获取当前页的多少条
			handleSizeChange(val) {
				this.searchform.pageSize = val;
				this.queryResult()
			},
			// 获取当前页是第几页
			handleCurrentChange(val) {
				this.searchform.pageNum = val;
				this.queryResult()
			},
			// 查询结果按钮
			queryResult() {
				getProductList(this.searchform)
					.then(resp => {
						this.tableData = resp.data.list;
						this.total = resp.data.total;
						console.log(resp.data);
					})
			},
			
			// 删除按钮
			Btndelect(pid){
				productdelectStatus({
					ids:pid,
					deleteStatus:1
				}).then(resp =>{
					if(resp.code == 200){
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.queryResult()
					}
				})
			}
			
		},
		computed: {
			//sku编辑的搜索
			skudataFilter() {
				return this.skudata.filter(item => {
					if (this.state == "") {
						return item;
					}
					return item.skuCode.toString().includes(this.state);
				})
			}

		},
		mounted() {
			// 获取品牌列表
			getBrandList().then(resp => this.brandList = resp.data);

			// 获取分类列表
			getCatList().then(resp => {
				this.catList = resp.data;
			})

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

					button:nth-child(2) {
						width: 85px;
						height: 33px;
						padding: 0;
						margin-left: 16px;

						span {
							margin: 0;
						}
					}
				}
			}


			.el-row {
				.el-col {
					height: 50px;

					.grid-content {
						color: #606266;
						font-size: 14px;
						margin: 5px;
					}
				}

			}

		}
	}

	.datatab {
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #C0CCDA;
		margin: 0 auto;
		border-radius: 3px;
		padding: 20px 10px;
		margin-bottom: 20px;
		clear: both;
		overflow: hidden;
		text-align: center;

		div:first-child {
			float: left;
			font-size: 16px;

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

	.data {
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		border-radius: 3px;
		margin-bottom: 20px;

	}

	.footer {
		display: flex;
		justify-content: space-between;
	}
</style>
