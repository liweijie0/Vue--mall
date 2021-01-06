<template>
	<div class="addbro">
		<el-steps :active="active" finish-status="success"  align-center>
		  <el-step title="填写商品信息"></el-step>
		  <el-step title="填写商品促销"></el-step>
		  <el-step title="填写商品属性"></el-step>
		  <el-step title="选择商品关联"></el-step>
		</el-steps>
		<proadd :product="product" v-show="shows[0]" v-model="active"></proadd>
		<procancellation :product="product" v-show="shows[1]" v-model="active"></procancellation>
		<proAtrr :product="product" v-show="shows[2]" v-model="active"></proAtrr>
		<proConnent :product="product" v-show="shows[3]" v-model="active"></proConnent>
	</div>
	
</template>

<script>
	 import proadd from '@/views/pms/productAdd/proadd.vue'
	 import procancellation from '@/views/pms/productAdd/procancellation.vue'
	 import proAtrr from '@/views/pms/productAdd/proAtrr.vue'
	 import proConnent from '@/views/pms/productAdd/proConnent.vue'
	 // product.js文件里面有多个export funtion 所以要用{}包裹着
	 import {proupdataEditeinfo} from '@/api/product.js'
	 
	   export default {
	      data() {
	        return {
				active: 0,
				shows:[true,false,false,false],
				product: {
					"albumPics": "", //相册图片，连产品图片限制为5张，以逗号分割
					"brandId": '', //品牌编号
					"brandName": "", //品牌名称
					"deleteStatus": 0, //删除状态
					"description": "", //商品描述
					"detailDesc": "", //详情描述
					"detailHtml": "string", //客户端网页内容
					"detailMobileHtml": "string", //移动端网页内容
					"detailTitle": "", //详情标题
					"feightTemplateId": 0, //
					"giftGrowth": 0, //赠送的成长值
					"giftPoint": 0, //赠送的积分
					"id": 0, //产品id,新增的时候不需要有
					"keywords": "", //商品关键字
					"lowStock": 0, //库存预警值
					"memberPriceList": [{ //商品会员价格设置
						"id": 0, //会员编号
						"memberLevelId": 0, //会员级别编号
						"memberLevelName": "string", //会员名称
						"memberPrice": 0, //会员价
						"productId": 0 //产品id
					}],
					"name": "", //商品名称
					"newStatus": 0, //新品状态:0->不是新品；1->新品
					"note": "", //商品备注
					"originalPrice": 0, //市场价
					"pic": "string", //商品相册
					"prefrenceAreaProductRelationList": [{ //优选专区和商品的关系
						"id": 0,
						"prefrenceAreaId": 0, //优选区id
						"productId": 0 //商品id
					}],
					"previewStatus": 0, //是否为预告商品：0->不是；1->是
					"price": 0, //商品价格
					"productAttributeCategoryId": "", //商品属性分类id
					"productAttributeValueList": [{ //商品参数集合
						"id": 0,
						"productAttributeId": 0, //商品参数id
						"productId": 0, //商品id
						"value": "string" //参数内容
					}],
					"productCategoryId": 0, //商品分类id
					"productCategoryName": "", //商品分类名称
					"productFullReductionList": [{ //商品满减价格设置
						"fullPrice": 0,
						"id": 0,
						"productId": 0,
						"reducePrice": 0
					}],
					"productLadderList": [{ //商品阶梯价格设置
						"count": 0,
						"discount": 0,
						"id": 0,
						"price": 0,
						"productId": 0
					}],
					"productSn": "", //货号
					"promotionEndTime": "2020-11-27T03:47:50.925Z", //促销结束时间
					"promotionPerLimit": 0, //活动限购数量
					"promotionPrice": 0, //促销价格
					"promotionStartTime": "2020-11-27T03:47:50.926Z", //促销开始时间
					"promotionType": 0, //促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购
					"publishStatus": 0, //上架状态：0->下架；1->上架
					"recommandStatus": 0, //推荐状态；0->不推荐；1->推荐
					"sale": 0, //销量
					"serviceIds": "string", //以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮
					"skuStockList": [{ //商品的sku库存信息
						"id": 0,
						"lockStock": 0,
						"lowStock": 0,
						"pic": "string",
						"price": 0,
						"productId": 0,
						"promotionPrice": 0,
						"sale": 0,
						"skuCode": "string",
						"spData": "string",
						"stock": 0
					}],
					"sort": 0, //排序
					"stock": 0, //库存
					"subTitle": "", //副标题
					"subjectProductRelationList": [{ //专题和商品关系
						"id": 0,
						"productId": 0,
						"subjectId": 0
					}],
					"unit": "", //单位
					"usePointLimit": 0, //限制使用的积分数
					"verifyStatus": 0, //审核状态：0->未审核；1->审核通过
					"weight": 0 //商品重量，默认为克
				}
	         }
	      },
		  mounted() {
			  let pid= this.$route.query.id;
			  // 判断id不为空即为编辑过来的
			  console.log(proupdataEditeinfo);
			  if(pid){
				  proupdataEditeinfo(pid).then(resp=>{
				  	this.product = resp.data;
					this.product.serviceIds=this.product.serviceIds.split(',')
				  })
			  }
		  	
		  },
	      
		  components:{
			  proadd,procancellation,proAtrr,proConnent
		  },
		  watch: {
		  	active(n, o) {
		  		this.shows[o] = false;
		  		this.shows[n] = true;
				console.log(n,o);
		  	}
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
		}
		
		
	}
</style>
