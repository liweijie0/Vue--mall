import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const  UPDATE_IS_COLLAPSE = "UPDATE_IS_COLLAPSE";
export default new Vuex.Store({
  state: {
	  isCollapse:false,
  },
  mutations: {
	  // 导航菜单栏是否展开
	  [UPDATE_IS_COLLAPSE]:(s)=>{
	  		s.isCollapse = !s.isCollapse;
	  }
  },
  actions: {
  },
  modules: {
  }
})
