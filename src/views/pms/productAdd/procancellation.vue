<template>
	<div class="info">
	<el-form label-width="100px">
		<el-form-item label="赠送积分：">
		<el-input v-model="product.giftPoint" size="small"></el-input>
		</el-form-item>
		<el-form-item label="赠送成长值:">
		<el-input v-model="product.giftGrowth" size="small"></el-input>
		</el-form-item>
		<el-form-item label="积分购买限制:">
		<el-input v-model="product.usePointLimit" :active-value='1' :inactive-value='0' size="small"></el-input>
		</el-form-item>
		<el-form-item label="预告商品:">
		<el-switch v-model="product.previewStatus" :active-value='1' :inactive-value='0'></el-switch>
		</el-form-item>
		<el-form-item label="商品上架:">
		<el-switch v-model="product.publishStatus" :active-value='1' :inactive-value='0'></el-switch>
		</el-form-item>
		<el-form-item label="商品推荐:">
		新品<el-switch  v-model="product.newStatus" :active-value='1' :inactive-value='0'></el-switch>
		推荐<el-switch  v-model="product.recommandStatus" :active-value='1' :inactive-value='0'></el-switch>
		</el-form-item>
		<el-form-item label="服务保证:" >
		<el-checkbox-group v-model="serviceIds">
		<el-checkbox :label='1'>无忧退货</el-checkbox>
		<el-checkbox :label='2'>快速退款</el-checkbox>	
		<el-checkbox :label='3'>免费包邮</el-checkbox>
		</el-checkbox-group>
		</el-form-item>
		<el-form-item label="详细页标题:">
		<el-input v-model="product.detailTitle" size="small"></el-input>
		</el-form-item>
		<el-form-item label="详细页描述:">
		<el-input v-model="product.detailDesc" size="small"></el-input>
		</el-form-item>
		<el-form-item label="商品关键字:">
		<el-input v-model="product.keywords" size="small"></el-input>
		</el-form-item>
		<el-form-item label="商品备注:">
		    <el-input type="textarea" v-model="product.note"></el-input>
		  </el-form-item>
		<el-form-item label="选择优惠方式:">
		   <el-tabs v-model="tabPosition" style="height: 200px;">
		     <el-tab-pane label="无优惠"></el-tab-pane>
		     <el-tab-pane label="特惠促销">特惠促销</el-tab-pane>
		     <el-tab-pane label="会员价格">会员价格</el-tab-pane>
		     <el-tab-pane label="阶梯价格">阶梯价格</el-tab-pane>
			 <el-tab-pane label="满减价格">满减价格</el-tab-pane>
		   </el-tabs>
		</el-form-item>
	</el-form>
	<div class="btn-box">
		<el-button size="small" type="primary" @click="$emit('input',0)">上一步，填写商品信息</el-button>
		<el-button size="small" type="primary" @click="$emit('input',2)">下一步，填写商品属性</el-button>
	</div>
	</div>
</template>

<script>
	export default{
		props:['value','product'],
		data(){
			return{
					name:'',
					desc:'',
					serviceIds:[],
				 tabPosition: '无优惠',
			}
		},
		mounted() {
			
		},
		methods:{
			handleClick(tab, event) {
			        console.log(tab, event);
			      }
		},
		watch:{
			// 监听复选框值的变动，转成字符串每多一个值后加一个","隔开
			serviceIds(){
				this.product.serviceIds = this.serviceIds.join(',');
			}
		}
		
	}
</script>

<style lang="scss">
	.info{
		margin-top: 60px;
		.el-form{
			width: 80%;
			
		}
		.btn-box{
			text-align: center;
		}
		}
</style>