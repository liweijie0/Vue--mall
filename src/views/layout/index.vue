<template>
	<div class="all">
		<div class="side" style="overflow: scroll">
			<sidebar></sidebar>
		</div>
		<div class="content-box" style="overflow: scroll">
			<navbar></navbar>
			<mainbar></mainbar>
		</div>
	</div>
</template>

<script>
	import sidebar from '@/views/layout/component/sideBar.vue'
	import navbar from '@/views/layout/component/navBar.vue'
	import mainbar from '@/views/layout/component/mainBar.vue'
	export default {
		components:{sidebar,navbar,mainbar},
		mounted(){
			
		}
	}
</script>
<!-- 表示使用sass编程 -->
<style lang="scss" >
	body{
		overflow: hidden;
	}
	.side::-webkit-scrollbar{
		display: none;
	}
	.side{
		height: 100vh;
	}
	.all{
		display:flex;	
		min-height:205vh;
		.side-box{
			width: 179px;
			background-color: #294256;
			height:100vh;
			.el-menu{
				border-right:0;
			}
		}
		.content-box{
			flex:1;
			min-width: 50%;
			height: 100vh;
			left: 143px;
			.nav-box{
				height:50px;
				border:1px solid #ccc;
				line-height: 50px;
				
			}
			.main-box{
				padding: 20px;
			}
		}
	}
</style>
