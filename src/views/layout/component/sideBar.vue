<template>
	<div class="side-box"  :style="{width:sidewidth}">
		<el-menu default-active="1"  class="el-menu-vertical-demo" background-color='#2E3E52' text-color="#BFCBD9"
		 active-text-color="#258EFF" :collapse="isCollapse" >
			<el-menu-item index="0" :style="{paddingLeft:mip}">
				<i class="el-icon-location"></i><span @click="index">首页</span></el-menu-item>
			<template v-for="(item,index) in routerData">
				<!-- 判断导航菜单哪些需要显示 -->
				<template v-if="item.meta.isMenu" >
					<el-submenu :index="index + ''" :class="{'abcd':isBgc, 'defg':isCblue}">
						<template slot="title">
							<i :class="item.meta.icon"></i>
							<span >{{item.meta.name}}</span>
						</template>
						<!-- 判断导航菜单哪些需要显示 -->
						<template v-for="(item2,index2) in item.children" v-if="!item2.meta.isMenu">
							<router-link :to="item2.path" style='text-decoration: none;'>
								<el-menu-item :index="index+'-'+index2" ><i :class="item2.meta.icon"></i>{{item2.meta.name}}</el-menu-item>
							</router-link>
						</template>
					</el-submenu>
				</template>
			</template>
		</el-menu>
		
	</div>
</template>

<script>
	
	import { mapState } from 'vuex'
	export default {
		data(){
			return{
				routerData:[],
				sidewidth:'180px',
				mip:'20px',
				isBgc:true,
				isCblue:false
			}
		},
		methods: {
			 handleOpen(key, keyPath) {
			        console.log(key, keyPath);
			      },
			      handleClose(key, keyPath) {
			        console.log(key, keyPath);
			     },
				 index(){
					 this.$router.push("/home")
				 }
				 
		},
		computed:{
			...mapState(["isCollapse"]),
		},
		watch:{
			isCollapse(n){
				if(n){
					this.sidewidth = "23px";
					this.mip = "0px";
					this.isCblue = true;
					this.isBgc = false;
				}else{
					this.sidewidth = "179px";
					this.isCblue = false;
					this.isBgc = true;
					this.mip = "20px";
				}
			}
		},
		mounted() {
			this.routerData = this.$router.options.routes
			console.log(this.$router,9999)
			
		
		},
		

	}
</script>

<style lang="scss" scoped="scoped">
	.side-box{
		transition: width .3s linear;
		
			.abcd{
				.el-menu-item{
					min-width: 179px;
					padding-left: 20px !important;
					background-color: #1F2D3D !important;
					
				}
				.el-menu-item:hover{
					background-color:#001528 !important;
					text-decoration: none;
				}
				
			}
		
			.defg{
				width:20px !important;
				padding-left: 0px !important;
				.el-menu-item {
					padding-left: 0px !important;
					background-color: #192D3D !important;
					
				}
				.el-menu-item:hover {
					background-color: #001528 !important;
				}
				.el-submenu__title{
					padding-left:0px !important;
				}
				
			}
		
	}
	
</style>
