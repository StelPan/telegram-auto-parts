(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a6c1d09a"],{1681:function(t,e,r){},"6ca7":function(t,e,r){},ac7c:function(t,e,r){"use strict";var a=r("15fd"),s=r("5530"),i=(r("d3b7"),r("25f0"),r("6ca7"),r("ec29"),r("9d26")),n=r("c37a"),o=(r("4de4"),r("5607")),c=r("2b0e"),l=c["a"].extend({name:"rippleable",directives:{ripple:o["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),u=r("8547"),d=r("58df");function h(t){t.preventDefault()}var p=Object(d["a"])(n["a"],l,u["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,r=this.internalValue;return this.isMultiple?!!Array.isArray(r)&&r.some((function(r){return t.valueComparator(r,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,r):Boolean(r):this.valueComparator(r,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:h},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:h},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,r=this.internalValue;if(this.isMultiple){Array.isArray(r)||(r=[]);var a=r.length;r=r.filter((function(r){return!t.valueComparator(r,e)})),r.length===a&&r.push(e)}else r=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(r,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(r,e)?null:e:!r;this.validate(!0,r),this.internalValue=r,this.hasColor=r}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),m=["title"];e["a"]=p.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){var t=this.attrs$,e=(t.title,Object(a["a"])(t,m));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(i["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},e),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},c6078:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:!0}},[t.order?[r("UpdateOrderDialog",{attrs:{order:t.order,statuses:t.statuses},on:{toggleUpdate:t.changeOrder}})]:t._e(),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h1",{staticClass:"font-weight-bold mb-3"},[t._v("Все заказы")]),r("v-breadcrumbs",{staticClass:"px-0 py-0 mb-3",attrs:{items:t.items,divider:"/"},scopedSlots:t._u([{key:"item",fn:function(e){var a=e.item;return[r("v-breadcrumbs-item",{attrs:{disabled:a.disabled,exact:!0,to:{name:a.to.name}}},[t._v(" "+t._s(a.text.toUpperCase())+" ")])]}}])})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("div",{staticClass:"mb-3"},[r("OrdersTable",{attrs:{orders:t.orders},on:{toggleEdit:t.showEditOrder}})],1)])],1)],2)},s=[],i=r("1da1"),n=r("5530"),o=(r("96cf"),r("2f62")),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-data-table",{staticClass:"elevation-4",attrs:{items:t.orders,headers:t.headers,"server-items-length":40,options:{page:1,itemsPerPage:10}},scopedSlots:t._u([{key:"item.id",fn:function(e){var r=e.item;return[t._v(" "+t._s(r.id)+" ")]}},{key:"item.user",fn:function(e){var r=e.item;return[t._v(" "+t._s(r.user.information.first_name)+" ")]}},{key:"item.status",fn:function(e){var r=e.item;return[t._v(" "+t._s(r.status.name)+" ")]}},{key:"item.total_sum",fn:function(e){var r=e.item;return[t._v(" "+t._s(r.total_cash+" руб.")+" ")]}},{key:"item.actions",fn:function(e){var a=e.item;return[r("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(a.id)}}},[t._v(" mdi-pencil ")]),r("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(a)}}},[t._v(" mdi-delete ")])]}}])})},l=[],u={name:"OrdersTable",data:function(){return{headers:[{text:"Номер",align:"start",sortable:!1,value:"id"},{text:"Клиент",sortable:!1,value:"user"},{text:"Статус заказа",sortable:!1,value:"status"},{text:"Итоговая сумма",sortable:!1,value:"total_sum"},{text:"Действия",sortable:!1,value:"actions"}]}},methods:{editItem:function(t){this.$emit("toggleEdit",t)},deleteItem:function(){}},props:{orders:{type:Array,required:!0}}},d=u,h=r("2877"),p=r("6544"),m=r.n(p),f=r("8fea"),v=r("132d"),b=Object(h["a"])(d,c,l,!1,null,"70281b02",null),g=b.exports;m()(b,{VDataTable:f["a"],VIcon:v["a"]});var w=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{width:"750"},on:{"click:outside":t.close},model:{value:t.$store.state.dialogs.dialogs.order.update,callback:function(e){t.$set(t.$store.state.dialogs.dialogs.order,"update",e)},expression:"$store.state.dialogs.dialogs.order.update"}},[r("v-card",[r("v-card-title",[r("span",{staticClass:"text-h5 font-weight-bold"},[t._v(" Заказ №"+t._s(t.order.id)+" ")])]),r("v-card-text",{staticClass:"mx-0 my-0"},[r("v-container",{attrs:{fluid:!0}},[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h2",{staticClass:"font-weight-bold h1 mb-3"},[t._v(" Реквизиты заказа ")]),r("v-row",{attrs:{"no-gutters":""}},[r("v-col",[t._v("Клиент:")]),r("v-col",[t._v(t._s(t.order.user.information.first_name))])],1)],1),r("v-col",{attrs:{cols:"12"}},[r("v-row",{attrs:{"no-gutters":""}},[r("v-col",[t._v("Адрес:")]),r("v-col",[t._v(t._s(t.order.data.address))])],1)],1),r("v-col",{attrs:{cols:"12"}},[r("v-row",{attrs:{"no-gutters":""}},[r("v-col",[t._v("Моб. телефон:")]),r("v-col",[t._v(t._s(t.order.data.phone))])],1)],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h2",{staticClass:"font-weight-bold h1 mb-3"},[t._v(" Статус заказа ")])]),r("v-col",{attrs:{cols:"12"}},[r("v-select",{attrs:{items:t.statuses,"item-text":"name","return-object":""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h2",{staticClass:"font-weight-bold h1 mb-3"},[t._v(" Состав заказа ")])]),r("v-col",{attrs:{cols:"12"}},[r("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[r("thead",[r("tr",[r("th",{staticClass:"text-left"},[t._v(" Название товара ")]),r("th",{staticClass:"text-left"},[t._v(" Цена ")])])]),r("tbody",t._l(t.orderProducts,(function(e){return r("tr",{key:e.name},[r("td",[t._v(t._s(e.name))]),r("td",[t._v(t._s(e.price))])])})),0)]},proxy:!0}])})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h2",{staticClass:"font-weight-bold h1 mb-3"},[t._v(" Комментарий к заказу ")])]),r("v-col",{attrs:{cols:"12"}},[r("v-textarea",{staticClass:"orange-darken-4 p-2",attrs:{"background-color":"amber lighten-4"},model:{value:t.form.worker_comments,callback:function(e){t.$set(t.form,"worker_comments",e)},expression:"form.worker_comments"}})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-checkbox",{attrs:{label:"Уведомить клиента об изменении"},model:{value:t.notify,callback:function(e){t.notify=e},expression:"notify"}})],1)],1)],1)],1),r("v-divider"),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{disabled:!t.isChanged,color:"primary"},on:{click:t.update}},[t._v(" Обновить заказ ")])],1)],1)],1)},_=[],x=r("2909"),O=(r("d3b7"),r("159b"),r("7db0"),r("b0c0"),{name:"UpdateOrderDialog",data:function(){return{notify:!1,cache:{status:null,products:[],worker_comments:""},form:{status:null,products:[],worker_comments:""}}},methods:{update:function(){this.$emit("toggleUpdate",{id:this.$props.order.id,form:this.form,notify:this.notify}),this.cache.form=Object(n["a"])({},this.form.products),this.cache.status=Object(n["a"])({},this.form.status)},close:function(){var t={status:null,products:[],worker_comments:""};this.form=Object(n["a"])({},t),this.cache=Object(n["a"])({},t)}},computed:{orderProducts:function(){return this.order.products},isChanged:function(){var t=!1;return this.lodash.isEqual(this.form,this.cache)||(t=!0),t}},props:{order:{type:Object,required:!0},statuses:{type:Array,required:!0}},watch:{order:{immediate:!0,handler:function(){var t=this;this.cache.worker_comments=this.$props.order.worker_comments,this.cache.products=Object(x["a"])(this.form.products),this.orderProducts.forEach((function(e){return t.form.products.push(e.id)})),this.form.worker_comments=this.$props.order.worker_comments,this.form.status=this.cache.status=this.$props.statuses.find((function(e){return e.name===t.order.status.name}))}}}}),k=O,y=r("8336"),C=r("b0af"),V=r("99d9"),I=r("ac7c"),$=r("62ad"),j=r("a523"),S=r("169a"),D=r("ce7e"),A=r("0fd9"),T=r("b974"),E=r("1f4f"),R=r("2fa4"),H=(r("a9e3"),r("1681"),r("8654")),B=r("58df"),z=Object(B["a"])(H["a"]),G=z.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(n["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},H["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{autoGrow:function(t){var e=this;this.$nextTick((function(){var r;t?e.calculateInputHeight():null==(r=e.$refs.input)||r.style.removeProperty("height")}))},lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,r=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(r,e)+"px"}},genInput:function(){var t=H["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){H["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}}),P=Object(h["a"])(k,w,_,!1,null,"76671b46",null),F=P.exports;m()(P,{VBtn:y["a"],VCard:C["a"],VCardActions:V["a"],VCardText:V["b"],VCardTitle:V["c"],VCheckbox:I["a"],VCol:$["a"],VContainer:j["a"],VDialog:S["a"],VDivider:D["a"],VRow:A["a"],VSelect:T["a"],VSimpleTable:E["a"],VSpacer:R["a"],VTextarea:G});var U={name:"Orders",metaInfo:{title:"Шестерёнка | Заказы"},data:function(){return{items:[{text:"Панель",disabled:!1,to:{name:"Orders"}},{text:"Все заказы",disabled:!1,to:{name:"Orders"}}],dialog:!1,selectOrder:null}},methods:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(o["d"])({changeOrderInOrdersState:"updateOrderInOrdersList"})),Object(o["b"])({loadOrders:"fetchOrders",loadOrder:"fetchOrder",updateOrder:"fetchUpdateOrder",loadStatuses:"fetchOrderStatuses",showDialog:"show"})),{},{showEditOrder:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.loadOrder(t);case 2:e.showDialog("order:update");case 3:case"end":return r.stop()}}),r)})))()},changeOrder:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.updateOrder(t);case 2:return r.next=4,e.loadOrders();case 4:e.showDialog("order:update");case 5:case"end":return r.stop()}}),r)})))()}}),computed:Object(n["a"])({},Object(o["c"])({statuses:"getOrderStatuses",orders:"getOrders",order:"getOrder"})),components:{OrdersTable:g,UpdateOrderDialog:F},beforeMount:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.loadOrders();case 2:return e.next=4,t.loadStatuses();case 4:case"end":return e.stop()}}),e)})))()}},N=U,M=r("2bc5"),q=r("f625"),L=Object(h["a"])(N,a,s,!1,null,null,null);e["default"]=L.exports;m()(L,{VBreadcrumbs:M["a"],VBreadcrumbsItem:q["a"],VCol:$["a"],VContainer:j["a"],VRow:A["a"]})},ec29:function(t,e,r){}}]);
//# sourceMappingURL=chunk-a6c1d09a.950c3de5.js.map