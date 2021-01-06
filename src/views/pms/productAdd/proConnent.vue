<template>
	<div class="info">
	<el-form style="width: 100%;">
		<el-form-item label="关联专题:">
		<el-transfer 
			:titles="['待选择', '已选择']"
		    filterable
		    filter-placeholder="请输入专题名称"
			:props="{label:'title',key:'id'}"
		    v-model="product.SelectedSubjectlist"
		    :data="Subjectlist"
			@change="selectchang">
		  </el-transfer>
		</el-form-item>
		<el-form-item label="关联优选:">
		<el-transfer 
			:titles="['待选择', '已选择']"
		    filterable
		    filter-placeholder="请输入专题名称"
			:props="{label:'name',key:'id'}"
		    v-model="SelectedPrefrencelist"
		    :data="Prefrencelist">
		  </el-transfer>
		</el-form-item>
	</el-form>
	<div class="btn-box">
		<el-button size="small" type="primary" @click="$emit('input',2)">上一步，填写商品属性</el-button>
		<el-button size="small" type="primary" @click="submit">已完成</el-button>
	</div>
	</div>
</template>

<script>
	import {
		Subjectlist,Prefrencelist,productAdd,proupdataEditeinfo,productUpdate
	} from '@/api/product.js'
	export default{
		props:['value','product'],
		data() {
			return{
				Subjectlist:[],
				// SelectedSubjectlist:[],
				Prefrencelist:[],
				SelectedPrefrencelist:[],
				
			}
		
      },
	  mounted() {
		  // 获取关联专题列表
		this.product.subjectProductRelationList = [];
	  	Subjectlist().then(resp=>{this.Subjectlist = resp.data
		resp.data.forEach(i=>{
			let subjectList={ //专题和商品关系
				id: 0,
				productId: 0,
				subjectId: i.id
			}
			this.product.subjectProductRelationList.push(subjectList)
		})
		
		
		});
		  // 获取优选专题列表
		Prefrencelist().then(resp=>{this.Prefrencelist = resp.data});
	  },
	  methods:{
		  selectchang(left){
			  	this.subjectProductRelationList.id = left
			  	
			 
		  },
		  submit(){
			// 判断是更新商品还是新增商品
			  if(this.product.id != 0){
				  // console.log("更新");
				  // 再把数组重新转换成字符串返回给后台
				  // this.product.serviceIds = this.product.serviceIds.join(',');
				 productUpdate(this.product.id,this.product).then(resp=>{
					 this.$message({
					   type: 'success',
					   message: '更新商品成功!'
					 });
					 this.$router.push("/product/list")
				 })
			  }else{
				  // console.log("新增");
				  productAdd(this.product).then(resp=>{
					  this.$message({
					    type: 'success',
					    message: '新增商品成功!'
					  });
					  this.$router.push("/product/list")
				  })
			  }
			  
		  }
	  }
	  
    }
  
		
		
</script>

<style lang="scss">
	.info{
		margin-top: 60px;
		
		}
</style>
