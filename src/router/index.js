import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Layout from '../views/layout/index.vue'

import Cookies from 'js-cookie'
import VCharts from 'v-charts'
Vue.use(VCharts)

// 建立vue与路由的关系
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'index',
		component: Layout,
		redirect: "home",
		meta: {
			isMenu: false
		},
		children: [{
			path: "/home",
			meta: {
				name: "首页"
			},
			component: Home
		}]
	},
	{
		path: '/login',
		meta: {
			isMenu: false,
			name: '登录'
		},
		component: () => import( /* webpackChunkName: "about" */ '../views/login/index.vue')
	},
	{
		path: '/register',
		meta: {
			isMenu: false,
			name: '注册'
		},
		component: () => import( /* webpackChunkName: "about" */ '../views/login/index.vue')
	},
	{
		path: '/pms',
		meta: {
			isMenu: true,
			name: "商品",
			icon:'el-icon-goods'
		},
		component: Layout,
		redirect: '/product/list',
		children: [{
				path: "/product/list",
				meta: {
					name: '商品列表',
					icon:'el-icon-s-unfold'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/product/index.vue')
			},
			{
				path: "/product/add",
				meta: {
					name: '商品添加',
					icon:'el-icon-folder-add'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/productAdd/add.vue'),
				
			},
			{
				path: '/productCat/productCat',
				meta: {
					name: '商品分类',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/productCat/index.vue'),
				
			},
			{
				path: '/productType/productType',
				meta: {
					name: '商品类型',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/productType/index.vue')
			},
			{
				path: '/productBind/productBind',
				meta: {
					name: '商品品牌',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/productBind/index.vue')
			},
			{
				path: "/reProductCat/reProductCat",
				meta: {
					isMenu: true,
					name: '商品修改'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/productCat/reproduct.vue')
			},
			{
				path: "/AttributeList;/AttributeList",
				meta: {
					isMenu: true,
					name: '属性列表'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/productType/AttributeList.vue')
			},
			{
				path: "/parameterList;/parameterList",
				meta: {
					isMenu: true,
					name: '参数列表'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/pms/productType/parameterList.vue')
			},
		]
	},
	{
		path: '/order',
		component: Layout,
		meta: {
			isMenu: true,
			name: '订单',
			icon:'el-icon-menu'
		},
		redirect: '/orderlist/orderlist',
		children: [{
				path: '/orderlist/orderlist',
				meta: {
					name: '订单列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/order/orderlist.vue')
			},
			{
				path: '/orderReason/orderReason',
				meta: {
					name: '退货原因设置',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/order/orderReason.vue')
			},
			{
				path: '/orderreturn/orderreturn',
				meta: {
					name: '退货申请处理',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/order/orderreturn.vue')
			},
			{
				path: '/ordersetup/ordersetup',
				meta: {
					name: '订单设置',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/order/ordersetup.vue')
			}
		]
	},
	{
		path: '/Marketing',
		component: Layout,
		meta: {
			isMenu: true,
			name: '营销',
			icon:'el-icon-menu'
		},
		redirect: '/Marketing/seckill',
		children: [{
				path: '/seckill/seckill',
				meta: {
					name: '秒杀活动列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views//Marketing/seckill.vue')
			},
			{
				path: '/coupon/coupon',
				meta: {
					name: '优惠券列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/Marketing/coupon.vue')
			},
			{
				path: '/Bind/Bind',
				meta: {
					name: '品牌推荐',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/Marketing/Bind.vue')
			},
			{
				path: '/hot/hot',
				meta: {
					name: '人气推荐',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/Marketing/hot.vue')
			},
			{
				path: '/newgoods/newgoods',
				meta: {
					name: '新品推荐',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/Marketing/newgoods.vue')
			},
			{
				path: '/special/special',
				meta: {
					name: '专题推荐',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/Marketing/special.vue')
			},
			{
				path: '/advertisement/advertisement',
				meta: {
					name: '广告列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/Marketing/advertisement.vue')
			},

		]
	},
	{
		path: '/jurisdiction',
		component: Layout,
		meta: {
			isMenu: true,
			name: '权限',
			icon:'el-icon-menu'
		},
		redirect: '/userlist/userlist',
		children: [{
				path: '/userlist/userlist',
				meta: {
					name: '用户列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/jurisdiction/userlist.vue')
			},
			{
				path: '/rolelist/rolelist',
				meta: {
					name: '角色列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/jurisdiction/rolelist.vue')
			},
			{
				path: '/menulist/menulist',
				meta: {
					name: '菜单列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/jurisdiction/menulist.vue')
			},
			{
				path: '/resourceslist/resourceslist',
				meta: {
					name: '资源列表',
					icon:'el-icon-menu'
				},
				component: () => import( /* webpackChunkName: "about" */ '../views/jurisdiction/resourceslist.vue')
			}
		]
	},
	{
		path: '*',
		name: 'Error',
		meta: {
			isMenu: false
		},
		component: () => import( /* webpackChunkName: "about" */ '../views/404.vue')
	}
]

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	//查看访问路径是否是登录(/login)，如果是/login,直接放行
	if(to.path == "/login"){
		next();
		return;
	}
	//否则看是否登录了，如果登录了，直接放行，否则跳转到登录
	if(Cookies.get("loginToken") != null){
		next();
		return;
	}
	next("/login");
})

// 这里使用export default ruoter  导出当前文件里面的router对象
// 在另一个文件里面就可以使用import 随便一个名字 from 上面的文件（文件)
export default router
