<template>
	<div class="rules">
	<div class="lessonlist">
		<ul>
			<li>
				<p>后台项目</p>
				<p>mall</p>
			</li>
			<li>
				<p>后台项目</p>
				<p>mall</p>
			</li>
			<li>
				<p>后台项目</p>
				<p>mall</p>
			</li>
			<li>
				<div>
				<i class="el-icon-menu"></i>
				<div>
					<p>今日订单</p>
					<p>200</p>
				</div>
				</div>
			</li>
			<li>
				<div>
				<i class="el-icon-menu"></i>
				<div>
					<p>今日订单</p>
					<p>200</p>
				</div>
				</div>
			</li>
			
			<li>
				<div>
				<i class="el-icon-menu"></i>
				<div>
					<p>今日订单</p>
					<p>200</p>
				</div>
				</div>
			</li>
		</ul>
		<div class="tu">
			<img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg" />
			<p>mall全套学习教程连载中!</p>
			<p><span>关注公号</span><span>,第一时间获取。</span></p>
		</div>
	</div>
	<div class="affair">
		<p>待处理事务</p>
		<ul>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
			<li><span>代付款订单</span><span>(10)</span></li>
		</ul>
	</div>
	<div class="goods">
		<div>
			<p>商品总览</p>
			<ul>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
			</ul>
		</div>
		<div>
			<p>用户总览</p>
			<ul>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
				<li>
					<p>100</p>
					<p>已下架</p>
				</li>
			</ul>
		</div>
	</div>
	<div class="order">
		<p>订单统计</p>
		<div>
			<div>
				<ul>
					<li>
						<P>本月订单总数</P>
						<p>10000</p>
						<p><span>+10%</span>同比上月</p>
					</li>
					<li>
						<P>本月订单总数</P>
						<p>10000</p>
						<p><span>-10%</span>同比上月</p>
					</li>
					<li>
						<P>本月订单总数</P>
						<p>10000</p>
						<p><span>+10%</span>同比上月</p>
					</li>
					<li>
						<P>本月订单总数</P>
						<p>10000</p>
						<p><span>-10%</span>同比上月</p>
					</li>
				</ul>
			</div>
			<div>
				<div class="block">
				   <el-date-picker
				     v-model="mytime"
				     type="daterange"
				     align="center"
				     unlink-panels
				     range-separator="至"
				     start-placeholder="开始日期"
				     end-placeholder="结束日期"
				     @change="check">
				   </el-date-picker>
				 </div>
				
				  <ve-line class='shujutu' :legend-visible="false" :data="chartData" :settings="chartSettings" height='400px'></ve-line>
				
			</div>
		</div>
		
	</div>
	</div>
</template>

<script>
	export default {
			methods:{
				check(){
					this.chartData.rows=this.rows2.filter(item=>{
						return new Date(item.日期) >= this.mytime[0] && new Date(item.日期) <= this.mytime[1];
					})
				}
			},
		    data () {
		         this.chartSettings = {
		             xAxisType: 'time',
					 area:true,
					 axisSite: { right: ['订单金额'] }
		         }
		         return {
					mytime:'',
					// 是图表数据
					chartData: {
		             columns: ['日期', '订单数量', '订单金额'],
		             rows: []
		           },
					rows2:[
						{ '日期': '2020-11-01', '订单数量': 20, '订单金额': 2000 },
						{ '日期': '2020-11-02', '订单数量': 33, '订单金额': 5000 },
						{ '日期': '2020-11-03', '订单数量': 50, '订单金额':  10000},
						{ '日期': '2020-11-04', '订单数量': 78, '订单金额':  8000},
						{ '日期': '2020-11-05', '订单数量': 40, '订单金额':  4000},
						{ '日期': '2020-11-06', '订单数量': 25, '订单金额':  2000},
						{ '日期': '2020-11-07', '订单数量': 50, '订单金额':  10000}
					]
		         }
		       },
			   mounted() {
			   	this.chartData.rows = this.rows2;
			   }
		  }
</script>

<style lang="scss">
	$color:#60627D;
	$backgroundColor:#F2F6FC;
	$textindent: 1em;
	$border: 1px solid #DCDFE6;
	.rules{
		width: 75%;
		margin: 0 auto;
	}
	.lessonlist{
		width: 100%;
		height: 210px;
		margin-top: 70px;
		display: flex;
		position: relative;
		ul{
			width: 80%;
			display: flex;
			list-style: none;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			padding: 0;
			margin: 0;
			li{
				width: 31%;
				height: 50%;
				border:$border;
				margin-bottom: 20px;
				text-indent: $textindent;
				>p:first-child{
					margin: 0;
					line-height: 40px;
					background-color:$backgroundColor;
					color: $color;
					font-weight: bold;
				}
				>p{
					color: #258EFF;
				}
				div{
					height: 100%;
					display: flex;
					align-items: center;
					i{
						font-size: 80px;
						color: #258EFF;
						vertical-align: bottom;
					}
					div{
						height: 80px;
						display: inline-block;
						vertical-align: bottom;
						p:first-child{
							color:$color ;
							font-size: 16px;
						}
						p:last-child{
							color: #606266;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
	.tu{
		width: 26%;
		height:115%;
		position: absolute;
		right: 1px;
		top: -3px;
		background-color: #fff;
		box-shadow: 0 0 4px #999999;
		line-height: 10px;
		text-align: center;
		img{
			width: 65%;
			padding-top: 10px;
		}
	}
	.affair{
		width: 100%;
		height: 210px;
		margin-top: 60px;
		border: $border;
		box-sizing: border-box;
		p{
			margin: 0;
			height: 50px;
			background-color:$backgroundColor;
			line-height: 50px;
			font-weight: bold;
			color: $color;
			text-indent: $textindent;
		}
		ul{
			width: 90%;
			display: flex;
			list-style: none;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			line-height: 2.8;
			li{
				width: 30%;
				margin: 0;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid $backgroundColor;
				span:first-child{
					color: $color;
				}
				span:last-child{
					color: #F56C6C;
				}
				
			}
		}
	}
	.goods{
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
		div{
			width: 48%;
			border: $border;
			>p{
				margin: 0;
				height: 50px;
				background-color:$backgroundColor;
				line-height: 50px;
				font-weight: bold;
				color: $color;
				text-indent: $textindent;
			}
			ul{
				display: flex;
				justify-content: space-evenly;
				text-align: center;
				list-style: none;
				padding: 0;
				li{
					p:first-child{
						color: #F56C6C;
						font-size: 18px;
						font-weight: bold;
					}
					p:last-child{
						color: $color;
					}
				}
			}
		}
	}
	.order{
		width: 100%;
		height: 500px;
		margin-top: 30px;
		border: $border;
		box-sizing: border-box;
		>p{
			margin: 0;
			height: 50px;
			background-color:$backgroundColor;
			line-height: 50px;
			font-weight: bold;
			color: $color;
			text-indent: $textindent;
		}
		>div{
			width: 100%;
			height:450px;
			display: flex;
			>div:first-child{
				width:20%;
				border-right:$border;
				box-sizing: border-box;
				ul{	
					padding:0;
					margin: 0;
					line-height: 15px;
					list-style: none;
					li{
						width: 100%;
						padding-bottom: 5px;
						text-align: center;
						color:$color;
						p:nth-child(2){
							font-weight: bold;
						}
					}
					li:nth-child(odd) span{
							color: greenyellow;
					}
					li:nth-child(even) span{
							color: red;
					}
				} 
			}
			div:last-child{
				width:80%;
				border: 0;
				.block {
				    width: 50%;
				    border: 1px solid #DCDFE6;
					float: right;
					text-align: center;
					margin: 10px;
					box-sizing: border-box;
				}
				.shujutu{
					margin-top: 90px;
					border-right: 0;
				}
			}
		}
	}
</style>
