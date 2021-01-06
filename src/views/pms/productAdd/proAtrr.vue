<template>
	<div class="info">
	<el-form  label-width="100px">
		<el-form-item label="属性类型:" style="width:80%;">
			<el-select @change="attrCatChangeHandler" v-model="product.productAttributeCategoryId"  placeholder="请选择" size="small" >
				<el-option v-for="item in pAttrlist" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="商品规格:">
			<div class="box">
			<div class="box1" v-for="(item,index) in attrCatList" >
				<span>{{item.name}}</span>
				<template v-if="item.inputList">
					<el-checkbox-group v-model="checkList[index]">
						<template v-for="item2 in item.inputList.split(',')">
							<el-checkbox :label="item2"></el-checkbox>
						</template>
					</el-checkbox-group>
				</template>
				<template v-else>
					<div>
						<el-checkbox-group v-model="checkList[index]">
							<template v-for="item3 in checkList2Items">
								<el-checkbox :label="item3"></el-checkbox>
							</template>
						</el-checkbox-group>
						<el-input placeholder="请输入内容" v-model="input" size="mini" style="width:130px" clearable>
						</el-input>
						<el-button @click="handleAdd" size="mini">新增</el-button>
					</div>
				</template>
			</div>
				  <el-table
				      border
				      :data="tableData"
				      style="width: 100%;margin-top:30px;">
				      <el-table-column
				        prop="date"
				        label="销售价格"
						align="center"
						width="100">
				      </el-table-column>
				      <el-table-column
				        prop="name"
				        label="商品库存"
						align="center"
						width="100">
				      </el-table-column>
				      <el-table-column
				        prop="address"
				        label="商品预警值"
						align="center"
						width="100">
				      </el-table-column>
					  <el-table-column
					    prop="address"
					    label="sku编号"
						align="center">
					  </el-table-column>
					  <el-table-column
					    prop="address"
					    label="操作"
						align="center"
						width="100">
					  </el-table-column>
				    </el-table>
			</div>
		</el-form-item>
		<el-form-item>
		 <el-button type="primary" size="small" @click="flushList">刷新列表</el-button>
		 <el-button type="primary" size="small" @click="open">同步价格</el-button>
		 <el-button type="primary" size="small" @click="open">同步库存</el-button>
		</el-form-item>
		<el-form-item label="商品参数:">
			<div class="box">
			<div class="box1" v-for="(item,index) in attrCatList">
				<span>{{item.name}}</span>
				<template v-if="item.inputList">
					<el-checkbox-group v-model="checkList[index]">
						<template v-for="item2 in item.inputList.split(',')">
							<el-checkbox :label="item2"></el-checkbox>
						</template>
					</el-checkbox-group>
				</template>
				<template v-else>
					<div>
						<el-checkbox-group v-model="checkList[index]">
							<template v-for="item3 in checkList2Items">
								<el-checkbox :label="item3"></el-checkbox>
							</template>
						</el-checkbox-group>
						<el-input placeholder="请输入内容" v-model="input" size="mini" style="width:130px" clearable>
						</el-input>
						<el-button @click="handleAdd" size="mini">新增</el-button>
					</div>
				</template>
			</div>
			</div>
		</el-form-item>
		<el-form-item label="商品相册:" >
			<el-upload
			  action="#"
			  list-type="picture-card"
			  :auto-upload="false" style="margin-top: 20px;"
			  :on-change="handlechange">
			    <i slot="default" class="el-icon-plus"></i>
			    <div slot="file" slot-scope="{file}">
			      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
			      <span class="el-upload-list__item-actions">
			        <span
			          class="el-upload-list__item-preview"
			          @click="handlePictureCardPreview(file)">
			          <i class="el-icon-zoom-in"></i>
			        </span>
			        <span
			          v-if="!disabled"
			          class="el-upload-list__item-delete"
			          @click="handleDownload(file)">
			          <i class="el-icon-download"></i>
			        </span>
			        <span
			          v-if="!disabled"
			          class="el-upload-list__item-delete"
			          @click="handleRemove(file)">
			          <i class="el-icon-delete"></i>
			        </span>
			      </span>
				  </div>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="product.albumPics" alt="" />
			</el-dialog>
		</el-form-item>
		<el-form-item label="规格参数:" style="width: 130%;">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		    <el-tab-pane label="电脑端详情" name="first">
				<div id="div1"></div>
			</el-tab-pane>
		    <el-tab-pane label="移动端详情" name="second">
				<div id="div2"></div>
			</el-tab-pane>
		  </el-tabs>
		 </el-form-item>
	</el-form>
	<div class="btn-box">
		<el-button size="small" type="primary" @click="$emit('input',1)">上一步，填写促销信息</el-button>
		<el-button size="small" type="primary" @click="stepNext">下一步，填写商品关联</el-button>
	</div>
	</div>
</template>

<script>
	import E from 'wangeditor'

	import {
		withAttrlist,attrCatList,
		proValueList
	} from '@/api/proAttr.js'
	
	export default{
		props:['value','product'],
		data(){
			return{
				pAttrlist:[],
				attrCatList:[],
				proValueList:[],
				tableData:[],
				checkList: [[],[],[],[],[],[]],
				checkList2Items: [],
				input: '',
				skuDataFilter:[],
				skuData:[],
				editor:'',
				editor2:'',
				activeName: 'first',
				albumPics: '',
				dialogVisible: false,
				disabled: false,
			}
		},
		methods:{
			 open() {
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
			attrCatChangeHandler(){
				let id = this.product.productAttributeCategoryId;
				//发送请求获取属性列表
				attrCatList(id,{pageNum:1,pageSize:100,type:1})
				.then(resp=>{
					this.attrCatList = resp.data.list
				})
			},
			handleClick(tab, event) {
				console.log(tab, event);
				      
			},
			// 上传图片
			handlechange(file, fileList){
				console.log("file",file,"fileList", fileList);
				let url = '';
				if(fileList.length>0){
					// 判断数组有值的时候才获取
					this.product.albumPics = fileList[0].url;
				}
				fileList.forEach(e=>{
					// 本身加上新的图片(第一次为空+新图片)
					url = url + e.url + ",";
				})
				// 截取本身长度的最后一个标点符号(优化)
				url = url.substr(0, url.length - 1);
				this.product.albumPics = url;
			},
			//删除图片
			 handleRemove(file) {
			        console.log(file);
			  },
			  //上传中
			  handlePictureCardPreview(file) {
				  console.log(flielist);
				
			  },
			  handleDownload(file) {
				console.log(file);
			  },
			// 新增
			  handleAdd(){
				// checkList2Items: [],
				// input: '',
				this.checkList2Items.push(this.input);
				this.input = ""
			},
			// 刷新列表按钮
			flushList(){
				this.product.skuStockList = [];
				//获取选中的属性列表
				//循环选中的属性列表   [[3,4,5],[1,2,3]]
				//将值添加到skuData中去    product.skuStockList  []    {spData:[{"颜色":"金色"},{“容量":"18G"}]}     
				this.checkList = this.checkList.filter(item=>{
					return item.length>0;
				})
				let narr=[];
				let arr = [];    //skuData   [[{"颜色":"红色"},{"容量":"12G"}],[{"颜色":"红色"},{“容量":"24G"}]]
								// checkList  [["红色",“黄色"]，[”12G“，”24G“]]
				for(let i=0;i<this.checkList.length;i++){
					let one = this.checkList[i];
					if(arr.length==0){
						//第一次直接装
						for(let k = 0;k<one.length;k++){
							let n = {}
							// n[this.attrPropList[i].name] = one[k];
							n['value'] = one[k];
							arr.push([n]);
						}
					}else{
						for(let x=0;x<one.length;x++){
							for(let y=0;y<arr.length;y++){
								let zz = {}
								// zz[this.attrPropList[i].name] = one[x];
								zz['value'] = one[x];
								console.log("arr[y]:",arr[y]);
								console.log("zz:",zz);
								let nnn = JSON.parse(JSON.stringify(arr[y]));
								nnn.push(zz);
								narr.push(nnn);
							}
						}
					}
				}
				console.log("arr...:",arr)
				console.log("narr...",narr);
				narr.forEach(item=>{
					let dx = { //商品的sku库存信息
						"id": 0,
						"lockStock": 0,
						"lowStock": 0,
						"pic": "string",
						"price": 0,
						"productId": 0,
						"promotionPrice": 0,
						"sale": 0,
						"skuCode": "string",
						"spData": item,
						"stock": 0
					}
					
					this.product.skuStockList.push(dx);
				})
				
			},
			  stepNext(){
				   this.$emit('input',3)
				  // 把富文本的内容提交上product对象里面的参数(客户端参数)
				 this.product.detailHtml = this.editor.txt.html();
				 this.product.detailHtml = this.editor2.txt.html();
				 // 移动端参数
				 this.product.detailMobileHtml = this.editor.txt.html();
				 this.product.detailMobileHtml = this.editor2.txt.html();
				 
			  }
					
			},
			mounted() {
				// 创建一个富文本编辑器
				this.editor = new E('#div1')
				this.editor.create()
				
				this.editor2 = new E('#div2')
				this.editor2.create()
				
				
				withAttrlist()
				.then(resp=>{
				 this.pAttrlist	= resp.data
				})
			}
		
	}
</script>

<style lang="scss">
	.info{
		margin-top: 60px;
		.el-form{
			width: 80%;
			.box{
				width: 135%;
				.box1{
					width: 100%;
					// height: 40px;
					min-height: 40px;
					background-color: #F8F9FC;
					border: 1px solid #EBEEF5;
				}
			}
		}
		}
</style>
