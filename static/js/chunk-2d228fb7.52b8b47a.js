(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d228fb7"],{dc02:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:!0}},[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("h1",{staticClass:"font-weight-bold mb-3"},[e._v("Все пользователи")]),a("v-breadcrumbs",{staticClass:"px-0 py-0 mb-3",attrs:{items:e.items,divider:"/"},scopedSlots:e._u([{key:"item",fn:function(t){var r=t.item;return[a("v-breadcrumbs-item",{attrs:{disabled:r.disabled,exact:!0,to:{name:r.to.name}}},[e._v(" "+e._s(r.text.toUpperCase())+" ")])]}}])})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("div",{staticClass:"mb-3"},[a("UsersTable",{attrs:{users:e.users},on:{changeFilter:e.change}})],1)])],1)],1)},n=[],s=a("1da1"),i=a("5530"),o=(a("96cf"),a("2f62")),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-data-table",{staticClass:"elevation-4",attrs:{headers:e.headers,items:e.users,page:e.filter.page,options:{page:1,itemsPerPage:10},"items-per-page":e.filter.itemsPerPage,"server-items-length":40},on:{pagination:e.updatePaginate},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Все пользователи")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer")],1)]},proxy:!0},{key:"item.id",fn:function(t){var a=t.item;return[e._v(" "+e._s(a.id)+" ")]}},{key:"item.name",fn:function(t){var a=t.item;return[e._v(" "+e._s(a.information.first_name)+" ")]}},{key:"item.surname",fn:function(t){var a=t.item;return[e._v(" "+e._s(a.information.last_name)+" ")]}},{key:"item.actions",fn:function(t){var r=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(r)}}},[e._v(" mdi-pencil ")]),a("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(r)}}},[e._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"}},[e._v(" Reset ")])]},proxy:!0}])})},l=[],u=(a("4de4"),a("d3b7"),{name:"UsersTable",data:function(){return{headers:[{text:"Идетификатор",align:"start",sortable:!1,value:"id"},{text:"Имя",value:"name",sortable:!1},{text:"Фамилия",value:"surname",sortable:!1},{text:"Действия",value:"actions",sortable:!1}],filter:{page:1,pageCount:3,itemsPerPage:20},options:{page:1,itemsPerPage:20}}},methods:{editItem:function(){},deleteItem:function(){},updatePaginate:function(e){this.filter=Object(i["a"])({},e)}},watch:{filter:{deep:!0,handler:function(){this.$emit("changeFilter",this.filter)}}},props:{users:{type:Array,required:!0}}}),m=u,d=a("2877"),f=a("6544"),v=a.n(f),b=a("8336"),p=a("8fea"),g=a("ce7e"),h=a("132d"),_=a("2fa4"),x=a("71d9"),w=a("2a7f"),k=Object(d["a"])(m,c,l,!1,null,null,null),y=k.exports;v()(k,{VBtn:b["a"],VDataTable:p["a"],VDivider:g["a"],VIcon:h["a"],VSpacer:_["a"],VToolbar:x["a"],VToolbarTitle:w["a"]});var U={name:"Users",metaInfo:{title:"Глазурь | Пользователи"},data:function(){return{items:[{text:"Панель",disabled:!1,to:{name:"Home"}},{text:"Все пользователи",disabled:!0,to:{name:"Users"}}]}},methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])({loadUsers:"fetchUsers",loadUser:"fetchUser"})),{},{change:function(e){console.log(e)}}),computed:Object(i["a"])({},Object(o["c"])({users:"getUsers",user:"getUser"})),components:{UsersTable:y},beforeMount:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.loadUsers();case 2:case"end":return t.stop()}}),t)})))()}},V=U,C=a("2bc5"),P=a("f625"),j=a("62ad"),O=a("a523"),I=a("0fd9"),T=Object(d["a"])(V,r,n,!1,null,"565f2ca1",null);t["default"]=T.exports;v()(T,{VBreadcrumbs:C["a"],VBreadcrumbsItem:P["a"],VCol:j["a"],VContainer:O["a"],VRow:I["a"]})}}]);
//# sourceMappingURL=chunk-2d228fb7.52b8b47a.js.map