<template>
	<div class="nav-box">
	<div class="nav-title">
		<i class="el-icon-s-fold" @click="UPDATE_IS_COLLAPSE" :style="{transform:transform}"></i>
		<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <template v-if="$route.path != '/home'">
		  <template v-for="item in this.$route.matched">
			  <el-breadcrumb-item><router-link :to="item.path">{{item.meta.name}}</router-link></el-breadcrumb-item>
		  </template>
		  </template>
		</el-breadcrumb>
		</div>
	</div>
	<div>
		<el-dropdown trigger="click">
		      <span class="el-dropdown-link">
				<img src="../../../../../1116/imgs/电影票.png" alt="">
		      </span>
		      <el-dropdown-menu slot="dropdown" >
		              <el-dropdown-item >首页</el-dropdown-item>
		              <el-dropdown-item ><span @click='rmcookie'>退出</span></el-dropdown-item>
		            </el-dropdown-menu>
		      </el-dropdown>
		 </el-dropdown>
	</div>
	</div>
</template>

<script>
	import Cookies from "js-cookie"
	import {
		mapState
	} from 'vuex'
	import {
		mapMutations
	} from 'vuex'
	  export default {
		  data(){
			  return{
				  transform:"rotate(0deg)"
			  }
		  },
		  methods:{
			...mapMutations(["UPDATE_IS_COLLAPSE"]),
			
			  rmcookie(){
				  if(confirm('确定退出吗？')){
					  Cookies.remove("loginToken");
					  this.$router.push('/login')
					}
			  }
		  },
		  computed: {
		  	...mapState(["isCollapse"]),
		  },
		  watch: {
		  	isCollapse(n) {
		  		if (n) {
		  			this.transform = 'rotate(90deg)'
		  		} else {
		  			this.transform = 'rotate(0deg)'
		  		}
		  	}
		  },
		  
		 mounted() {
		 	console.log("路由-->",this.$route);
		 },
		 updated() {
		 	// console.log("路由-->",this.$route);
		 }
		  
	  }
</script>

<style lang="scss" scoped="scoped">
	
	.nav-box{
		display: flex;
		justify-content: space-between;
		.nav-title{
			color: #BFCBD9 ;
			i{
				font-size: 30px ;
				vertical-align: middle;
				padding-left: 10px;
			}
			div{
				display: inline-block;
				font-size: 14px;
				vertical-align: middle;
				
			}
		}
		div:last-child{
			.el-dropdown-link{
					img{
						width: 50px;
					}
			}
			
		}
	}
</style>
