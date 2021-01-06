<template>
	<div class="info">
	<el-form  label-width="100px" class="demo-ruleForm">
	  <el-form-item label="商品分类:" style="width:80%;" required>
	    <el-cascader
		  size="small"
		  placeholder="请选择" 
	      v-model="product.productCategoryId"
	      :options="catlist"
		  :props="{label:'name',value:'id'}"
		  @change="handleChange">
		  </el-cascader>
	  </el-form-item>
	  <el-form-item label="商品名称:" prop="name" required>
	    <el-input v-model="product.name" size="small" ></el-input>
	  </el-form-item>
	  <el-form-item label="副标题:" prop="subTitle" required>
	    <el-input v-model="product.subTitle" size="small"></el-input>
	  </el-form-item>
	    <el-form-item label="商品品牌:" style="width:80%;" required>
	     <el-select v-model="product.brandId" placeholder="请选择" size="small" @change="handleChangeBrand">
	     	<el-option v-for="item in brandlist" :key="item.id" :label="item.name" :value="item.id">
	     	</el-option>
	     </el-select>
	    </el-form-item>
		<el-form-item label="商品介绍:" prop="description">
		  <el-input type="textarea" v-model="product.description"  placeholder="请输入内容" size="small"></el-input>
		</el-form-item>
	  <el-form-item label="商品货号:">
	  <el-input v-model="product.productSn" size="small"></el-input>
		</el-form-item>
		<el-form-item label="商品售价：">
		<el-input v-model="product.price" size="small"></el-input>
		</el-form-item>
		<el-form-item label="市场价：">
		  <el-input v-model="product.originalPrice" size="small"></el-input>
			</el-form-item>
		<el-form-item label="商品库存:">
			<el-input v-model="product.stock" size="small"></el-input>
		  </el-form-item>
		<el-form-item label="计量单位:">
		<el-input v-model="product.unit" size="small"></el-input>
		</el-form-item>
		<el-form-item label="商品重量:" >
			<el-row>
				<el-col :span="16"><el-input v-model="product.weight" size="small"></el-input></el-col>
				<el-col :span="2" :offset="2">克</el-col>
			</el-row>
		 </el-form-item>
		 <el-form-item label="排序:">
		 	<el-input v-model="product.sort" size="small"></el-input>
		 </el-form-item>
	</el-form>
	<div class="btn-box">
	<el-button type="primary" @click="$emit('input',1)" >下一步,填写商品促销</el-button>
	</div>
	</div>
</template>

<script>
	import {
		getCatList
	} from '@/api/proCat.js'
	import {
		getBrandList
	} from '@/api/proBran.js'
	
	export default{
		props:['value','product'],
		data(){
			return{
				catlist:[],
				brandlist:[],
				ruleForm:{
					name:''
				},
				options2: [],
				  rules:{
					name: [
					   { required: true, message: '请输入商品名称', trigger: 'blur' },
					   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					 ],
					 region: [
					   { required: true, message: '请选择活动区域', trigger: 'change' }
					 ],
					 desc: [
					   { required: true, message: '请填写活动形式', trigger: 'blur' }
					 ]
				   }
				}
		},
		methods:{
			handleChange(val){
				this.product.productCategoryId = val[1];
				this.catlist[0].children.forEach(e=>{
					if(e.id == this.product.productCategoryId){
						this.product.productCategoryName = e.name
					}
				})
			},
			handleChangeBrand(val){
				this.brandlist.forEach(e=>{
					if(e.id == this.product.brandId){
						this.product.brandName = e.name
					}
				})
			},
			
			
		},
		mounted() {
			getCatList().then(resp=>{
				this.catlist = resp.data
				console.log(this.catlist);
			})
			getBrandList().then(resp=>{
				this.brandlist = resp.data
			})
			
		}
	}
</script>

<style lang="scss">
	.addbro{
		width: 60%;
		border: 1px solid #BFCBD9;
		padding: 50px;
		margin: 0 auto;
		
		.info{
			margin-top: 60px;
			.el-form{
				width: 80%;
				
			}
			.btn-box{
				text-align: center;
			}
		}
		
	}
</style>
