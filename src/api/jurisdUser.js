import Service from '@/util/request.js'


// 根据用户名或姓名分页获取用户列表
export function Userlist(form){
	return Service({
		method:"GET",
		url:"/admin/list",
		params:form
	})
}

//获取指定用户的角色
export function UserRinfo(id){
	return Service({
		method:"GET",
		url:`/admin/role/${id}`
	})
}