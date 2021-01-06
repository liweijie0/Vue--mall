import Service from '@/util/request.js'

//查询所有的品牌
export function getBrandList(){
	return Service({
		method:"GET",
		url:'/brand/listAll'
	})
}

// 根据品牌名称分页获取品牌列表
export function getBrandpagelist(form){
	return Service({
		method:"GET",
		url:`/brand/list`,
		params:form
	})
}

// 删除品牌
export function Deletebrand(id){
	return Service({
		method:"GET",
		url:`/brand/delete/${id}`
	})
}