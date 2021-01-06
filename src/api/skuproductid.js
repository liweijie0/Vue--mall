import Service from '@/util/request.js'

//根据商品的id查找对应的sku列表
export function skuproductid(pid,params){
	return Service({
		method:"GET",
		url:`/sku/${pid}`,
		params:params
	})
}

//根据商品的id更新sku列表
export function updatastock(pid,skuStockList){
	return Service({
		method:"Post",
		url:`/sku/update/${pid}`,
		data:skuStockList
	})
}