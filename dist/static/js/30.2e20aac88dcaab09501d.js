webpackJsonp([30,53],{"B/IR":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"允许访问服务"}},[i("el-select",{attrs:{multiple:"",filterable:"",remote:"",placeholder:"请输入服务关键词","remote-method":e.remoteMethod,loading:e.loading},model:{value:e.clients,callback:function(t){e.clients=t},expression:"clients"}},e._l(e.items,function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),i("el-form-item",[e.serviceManager_btn_clientManager?i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]):e._e()],1)],1)},staticRenderFns:[]}},WqJB:function(e,t,i){"use strict";function n(e){return i.i(u.a)({url:"/api/auth/service/page",method:"get",params:e})}function a(e){return i.i(u.a)({url:"/api/auth/service",method:"post",data:e})}function r(e){return i.i(u.a)({url:"/api/auth/service/"+e,method:"get"})}function s(e){return i.i(u.a)({url:"/api/auth/service/"+e,method:"delete"})}function l(e,t){return i.i(u.a)({url:"/api/auth/service/"+e,method:"put",data:t})}function o(e){return i.i(u.a)({url:"/api/auth/service/"+e+"/client",method:"get"})}function c(e,t){return i.i(u.a)({url:"/api/auth/service/"+e+"/client",method:"put",params:t})}t.a=n,t.d=a,t.b=r,t.c=s,t.e=l,t.g=o,t.f=c;var u=i("Vo7i")},nL73:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("Dd8w"),a=i.n(n),r=i("WqJB"),s=i("NYxO");t.default={props:{serviceId:{default:"1"}},data:function(){return{items:[],clients:[],list:[],loading:!1,serviceManager_btn_clientManager:!1}},created:function(){this.initClients(),this.serviceManager_btn_clientManager=this.elements["serviceManager:btn_clientManager"]},computed:a()({},i.i(s.b)(["elements"])),methods:{remoteMethod:function(e){var t=this;""!==e?(this.loading=!0,i.i(r.a)({name:e}).then(function(e){t.items=e.data.rows,t.total=e.data.total,t.loading=!1})):this.items=[]},onSubmit:function(){var e=this,t={};this.clients.length>0&&(t.clients=this.clients.join()),i.i(r.f)(this.serviceId,t).then(function(){e.$emit("closeClientDialog"),e.$notify({title:"成功",message:"保存成功",type:"success",duration:2e3})})},initClients:function(){var e=this;i.i(r.g)(this.serviceId).then(function(t){e.items=t.data;for(var i=[],n=0;n<t.data.length;n++)i.push(t.data[n].id);e.clients=i})}}}},"s/n5":function(e,t,i){var n=i("VU/8")(i("nL73"),i("B/IR"),null,null,null);e.exports=n.exports}});