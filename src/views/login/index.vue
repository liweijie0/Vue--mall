<template>
	<div class="logobg">
		<p></p>
		<el-card class="box-card">
		  <div>
			  <i class="el-icon-s-shop"></i>
			  <p>mall-admin-web</p>
			  <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			    <el-form-item  prop="username">
			      <el-input v-model="ruleForm.username"  prefix-icon="el-icon-user-solid" required></el-input>
			    </el-form-item>
				<el-form-item  prop="password">
				  <el-input v-model="ruleForm.password"  prefix-icon="el-icon-lock" required></el-input>
				</el-form-item>
			    <el-form-item>
			      <el-button type="primary" @click="login">登录</el-button>
			      <el-button type="primary" @click="resetForm('ruleForm')">获取体验账号</el-button>
			    </el-form-item>
			  </el-form>
			 
		  </div>
		</el-card>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import Cookies from 'js-cookie'
	export default {
	    data() {
	      return {
	        ruleForm: {
	          username: 'admin',
			  password:'macro123'
	        },
			rules: {
				username: [
					// 必填吗?必填，提示消息：请输入活动名称,什么时候检验:blur（失去焦点)
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},
					// 最小长度为3，最大长度为5，提示信息是。。。，什么时候检验(失焦点)
					{
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}
				],
				password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 10,
						message: '长度在 3 到 10 个字符',
						trigger: 'blur'
					}
				]
			}
	        
	      };
	    },
	    methods: {
	      login(){
				// 怎么调用表单的方法
				this.$refs.ruleForm.validate((is)=>{
					if(is){
						axios.post("http://8.129.43.113:8080/admin/login",this.ruleForm)
						.then((resp)=>{
							if(resp.status == 200){
								// 将正确的内容保存到cookie中   Authorization
								let loginToken = resp.data.data.tokenHead+resp.data.data.token;
								Cookies.set("loginToken",loginToken);
								// 页面跳转
								this.$router.push("/home");
							}
						})
						return;
					}
				});
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
	  }
</script>

<style lang="scss" scoped="scoped">
	.logobg{
		width: 100%;
		height: 300px;
		max-height:100%;
		background-color:#409eff ;
		background-image:url('../../assets/loginbg.png');
		background-size: 100%;
		margin-top: 200px;
		position: relative;
		
		.box-card{
			position: absolute;
			top: -15%;
			left: 37%;
			width: 360px;
			height: 400px;
			text-align: center;
			p:first-child{
				display: inline-block;
				width: 100%;
				height: 10px;
				margin: 0;
				padding: 0;
				
			}
			div:last-child{
				>i{
					font-size: 70px;
					color:#409eff ;
				}
				p{
					color:#409eff ;
					font-size: 25px;
					font-weight: bold;
					font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
				}
				
					.el-form-item{
						padding-right: 5px;
						.el-icon-user-solid,.el-icon-lock{
							color: #409eff;
						}
						.el-form-item__label{
							width: 50px !important;
						}
						.el-form-item__content{
							margin-left:0px !important;
						}
						.el-button{
							width: 45%;
							margin: 5px;
						}
					}
				
			}
		}
	}
</style>
