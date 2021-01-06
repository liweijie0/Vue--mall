import Service from '@/util/request.js'

//分页查询商品分类
export function getTypeList(parentId){
	return Service({
		method:"GET",
		url:'/productCategory/list/{parentId}'
	})
}


// 分页获取所有商品属性分类
export function getAttrTypeList(Params){
	return Service({
		method:"GET",
		url:'/productAttribute/category/list',
		Params:Params
	})
}