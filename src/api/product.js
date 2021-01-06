import Service from '@/util/request.js'

export function getProductList(form){
	return Service({
		method:"GET",
		url:"/product/list",
		params:form
	})
}

// 商品上架
export function productPublishStatus(params){
	return Service({
		url:"/product/update/publishStatus",
		params:params
	})
}

// 商品新品
export function productnewStatus(params){
	return Service({
		url:"/product/update/newStatus",
		params:params
	})
}
// 商品推荐
export function productrecommendStatus(params){
	return Service({
		url:"/product/update/recommendStatus",
		params:params
	})
}

// 编辑商品信息
export function proupdataEditeinfo(id){
	return Service({
		method:'GET',
		url:`/product/updateInfo/${id}`
	})
}

// 更新商品
export function productUpdate(id,params){
	return Service({
		url:"/product/update/"+id,
		data:params
	})
}

// 修改商品的删除状态
export function productdelectStatus(params){
	return Service({
		url:"/product/update/deleteStatus",
		params:params
	})
}

// 获取所有商品优选
export function Prefrencelist(){
	return Service({
		method:"GET",
		url:"/prefrenceArea/listAll"
	})
}

// 获取全部商品专题
export function Subjectlist(){
	return Service({
		method:"GET",
		url:"/subject/listAll"
	})
}

// 获取添加商品的所有信息提交到后台
export function productAdd(params){
	return Service({
		url:"/product/create",
		data:params
	})
}