import Service from '@/util/request.js'

//查询所有一级分类及子分类
export function getCatList(){
	return Service({
		method:"GET",
		url:`/productCategory/list/withChildren`
	})
}


// 分页查询商品分类
export function getCatData(parentId,params){
	return Service({
		method:"GET",
		url:`/productCategory/list/${parentId}`,
		params:params
	})
}

// 获取单个商品属性分类信息
export function getCatproSingle(id){
	return Service({
		method:"GET",
		url:`/productCategory/${id}`
	})
}