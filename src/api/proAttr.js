import Service from '@/util/request.js'

//获取所有商品属性分类及其下属性
export function withAttrlist(){
	return Service({
		method:"GET",
		url:"/productAttribute/category/list/withAttr"
	})
}

// 根据分类查询属性列表或参数列表
export function attrCatList(cid,params){
	return Service({
		method:"GET",
		url:`/productAttribute/list/${cid}`,
		params:params
	})
}


export function proValueList(cid,params){
	return Service({
		method:"GET",
		url:`/productAttribute/list/${cid}`,
		params:params
	})
}