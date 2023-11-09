"use strict";(self.webpackChunktaskit_project=self.webpackChunktaskit_project||[]).push([[272],{6272:(O,d,a)=>{a.r(d),a.d(d,{TasksListModule:()=>v});var m=a(6208),g=a(51),u=a(319),p=a(9306),t=a(4946),_=a(1294),b=a(6814);let h=(()=>{class n{constructor(e){this.tasksService=e,this.tasks=[]}static#t=this.\u0275fac=function(s){return new(s||n)(t.Y36(_.C))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-view-task"]],decls:14,vars:0,consts:[["id","viewTaskModal","tabindex","-1","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title","fs-5"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-primary"]],template:function(s,o){1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1",4),t._uU(5,"Modal title"),t.qZA(),t._UZ(6,"button",5),t.qZA(),t.TgZ(7,"div",6),t._uU(8," ... "),t.qZA(),t.TgZ(9,"div",7)(10,"button",8),t._uU(11,"Close"),t.qZA(),t.TgZ(12,"button",9),t._uU(13,"Save changes"),t.qZA()()()()())},styles:[".dropdown[_ngcontent-%COMP%]{color:#d3d3d3}.dropdown-menu[_ngcontent-%COMP%]{min-width:225px}.dropdown-toggle[_ngcontent-%COMP%]{border-color:#dee2e6}.dropdown-toggle[_ngcontent-%COMP%]:after{margin-left:190px}.low[_ngcontent-%COMP%]{color:#32cd32}.med[_ngcontent-%COMP%]{color:gold}.high[_ngcontent-%COMP%]{color:#dc143c}.text[_ngcontent-%COMP%]{color:#000}.op[_ngcontent-%COMP%]{font-family:Bootstrap-icons}"]})}return n})(),k=(()=>{class n{constructor(){this.blankTask=new u.i(0,"","","","","","",0,0),this.collator=new Intl.Collator}transform(e,s,o){let i;return i=e.sort((c,l)=>0===c.id?1:0===l.id?-1:"asc"===o?this.collator.compare(c[s].toString(),l[s].toString()):"desc"===o?this.collator.compare(l[s].toString(),c[s].toString()):void 0),i}static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275pipe=t.Yjl({name:"sortTasks",type:n,pure:!0})}return n})();function T(n,r){if(1&n&&(t.TgZ(0,"p",39),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.hij("Are you sure you want to delete task '",e.tasks[e.deleteIndex].title,"'?")}}function f(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"li")(1,"a",41),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit,i=t.oxw();return t.KtG(i.filterTasksByDate(o.unformattedDate))}),t._uU(2),t.qZA()()}if(2&n){const e=t.oxw().$implicit;t.xp6(2),t.Oqu(e.dueDate)}}function Z(n,r){if(1&n&&(t.ynx(0),t.YNc(1,f,3,1,"li",40),t.BQk()),2&n){const e=r.$implicit;t.xp6(1),t.Q6J("ngIf",""!==e.dueDate)}}function w(n,r){if(1&n&&(t.TgZ(0,"span"),t._uU(1,"\xa0"),t.qZA()),2&n){const e=t.oxw(2).$implicit;t.Gre("bi bi-circle-fill ",e.priority.toLowerCase(),"")}}function x(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"select",46),t.NdJ("change",function(o){t.CHM(e);const i=t.oxw(2).index,c=t.oxw();return t.KtG(c.changeStatus(o.target.value,i))}),t.TgZ(1,"option",47),t._uU(2),t.qZA(),t.TgZ(3,"option",48),t._uU(4,"To Do"),t.qZA(),t.TgZ(5,"option",49),t._uU(6,"In Progress"),t.qZA(),t.TgZ(7,"option",50),t._uU(8,"Done"),t.qZA()()}if(2&n){const e=t.oxw(2).$implicit;t.xp6(2),t.Oqu(e.status)}}function C(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div")(1,"i",51),t.NdJ("click",function(){t.CHM(e);const o=t.oxw(2).index,i=t.oxw();return t.KtG(i.onTaskModal(o))}),t.qZA(),t.TgZ(2,"i",52),t.NdJ("click",function(){t.CHM(e);const o=t.oxw(2).index,i=t.oxw();return t.KtG(i.onTaskModal(o))}),t.qZA(),t.TgZ(3,"i",53),t.NdJ("click",function(){t.CHM(e);const o=t.oxw(2).index,i=t.oxw();return t.KtG(i.showDeleteModal(o))}),t.qZA()()}}function M(n,r){if(1&n&&(t.ynx(0),t.TgZ(1,"td",43),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t.YNc(6,w,2,3,"span",44),t._uU(7),t.qZA(),t.TgZ(8,"td"),t.YNc(9,x,9,1,"select",45),t.qZA(),t.TgZ(10,"td"),t.YNc(11,C,4,0,"div",40),t.qZA(),t.BQk()),2&n){const e=t.oxw().$implicit;t.xp6(2),t.Oqu(e.title),t.xp6(2),t.Oqu(e.dueDate),t.xp6(2),t.Q6J("ngIf",""!==e.priority),t.xp6(1),t.Oqu(e.priority),t.xp6(2),t.Q6J("ngIf",""!==e.priority),t.xp6(2),t.Q6J("ngIf",""!==e.priority)}}function A(n,r){if(1&n&&(t.TgZ(0,"tr",42),t.YNc(1,M,12,6,"ng-container",40),t.qZA()),2&n){const e=r.index,s=t.oxw();t.xp6(1),t.Q6J("ngIf",e>=15*(s.pageNum-1)&&e<15*(s.pageNum-1)+15)}}const P=[{path:"",component:(()=>{class n{constructor(e){this.tasksService=e,this.tasks=[],this.blankTask=new u.i(0,"","","","","","",0,0),this.totalPages=1,this.pageNum=1,this.pageRows=15,this.taskSort="unformattedDate",this.taskSortDir="asc"}ngOnInit(){this.tasks=this.tasksService.getTasks(),this.totalPages=Math.ceil(this.tasks.length/15),this.generatePage(),this.tasksSub=this.tasksService.tasksChanged.subscribe(e=>{this.tasks=e.tasks,this.totalPages=Math.ceil(this.tasks.length/15),this.generatePage()}),this.pageSub=this.tasksService.changePage.subscribe(e=>{this.pageNum=e})}ngOnDestroy(){this.tasksSub.unsubscribe(),this.pageSub.unsubscribe()}onTaskModal(e){void 0===e?this.taskModal.showModal():this.taskModal.showModal(e)}showDeleteModal(e){this.deleteIndex=e,new window.bootstrap.Modal(document.getElementById("deleteTaskModal")).show()}deleteTask(e){this.tasksService.deleteTask(e)}generatePage(){for(let e=0;e<this.tasks.length;e++)this.tasks.length<15*this.totalPages&&this.tasks.push(this.blankTask)}prevPage(){1!==this.pageNum&&(this.pageNum--,this.generatePage())}nextPage(){this.pageNum!==Math.ceil(this.tasks.length/15)&&(this.pageNum++,this.generatePage())}changeStatus(e,s){this.statusIndex=s+(this.pageNum-1)*this.pageRows,this.tasksService.changeStatus(e,this.statusIndex)}sortTasks(e){e===this.taskSort?this.taskSortDir="asc"===this.taskSortDir?"desc":"asc":(this.taskSortDir="asc",this.taskSort=e)}filterTasksByDate(e){console.log(e)}static#t=this.\u0275fac=function(s){return new(s||n)(t.Y36(_.C))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-tasks-list"]],viewQuery:function(s,o){if(1&s&&t.Gf(p.H,5),2&s){let i;t.iGM(i=t.CRH())&&(o.taskModal=i.first)}},decls:98,vars:10,consts:[["id","deleteTaskModal","tabindex","-1","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"d-flex","justify-content-end","btn-close-div"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body","text-center","mt-3"],["class","mb-4","style","font-weight: bold; font-size: 28px;",4,"ngIf"],[1,"mb-5"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary","dlt-btn","me-4"],["type","button","data-bs-dismiss","modal",1,"btn","btn-danger","dlt-btn",3,"click"],[1,"container","mt-5"],[1,"mb-4"],[1,"d-flex","flex-row","mb-3","top-bar"],[1,"me-2","mt-2",2,"font-weight","bold"],[1,"dropdown","me-2"],["type","button","data-bs-toggle","dropdown",1,"btn","btn-default","btn-sm","dropdown-toggle","mt-1","unformattedDate","select-box"],[1,"dropdown-menu"],[1,"dropdown-item"],[4,"ngFor","ngForOf"],["type","button","data-bs-toggle","dropdown",1,"btn","btn-default","btn-sm","dropdown-toggle","mt-1","priority","select-box"],[1,"dropdown-menu","priority"],[1,"bi","bi-circle-fill","low"],[1,"bi","bi-circle-fill","medium"],[1,"bi","bi-circle-fill","high"],[1,"dropdown"],["type","button","data-bs-toggle","dropdown",1,"btn","btn-default","btn-sm","dropdown-toggle","mt-1","status","select-box"],[1,"flex-grow-1"],[1,"btn","btn-success","btn-sm","new-task-btn","mt-1",3,"click"],[1,"container"],[1,"table-responsive"],["id","taskTable",1,"table","table-bordered","table-hover","rounded-3"],["scope","col",1,"header","can-sort",3,"click"],[1,"bi","bi-caret-down"],["scope","col",1,"header"],["class","border-bottom",4,"ngFor","ngForOf"],[1,"pages","text-center"],[1,"btn","btn-sm","btn-arrow","me-1",3,"disabled","click"],[1,"btn","btn-sm","btn-num","me-1"],[1,"btn","btn-sm","btn-arrow",3,"disabled","click"],[1,"mb-4",2,"font-weight","bold","font-size","28px"],[4,"ngIf"],[1,"dropdown-item",3,"click"],[1,"border-bottom"],["scope","row",1,"title"],[3,"class",4,"ngIf"],["class","status-dropdown","id","status-change",3,"change",4,"ngIf"],["id","status-change",1,"status-dropdown",3,"change"],["selected","","hidden",""],["value","To Do-1"],["value","In Progress-2"],["value","Done-3"],["title","View",1,"bi","bi-eye","action","me-3",3,"click"],["title","Edit",1,"bi","bi-pencil-square","action","me-3",3,"click"],["title","Delete",1,"bi","bi-trash","action",3,"click"]],template:function(s,o){1&s&&(t._UZ(0,"app-view-task")(1,"app-task-modal"),t.TgZ(2,"div",0)(3,"div",1)(4,"div",2)(5,"div",3),t._UZ(6,"button",4),t.qZA(),t.TgZ(7,"div",5),t.YNc(8,T,2,1,"p",6),t.TgZ(9,"div",7)(10,"button",8),t._uU(11,"Cancel"),t.qZA(),t.TgZ(12,"button",9),t.NdJ("click",function(){return o.deleteTask(o.deleteIndex)}),t._uU(13,"Delete"),t.qZA()()()()()(),t.TgZ(14,"div",10)(15,"h1",11),t._uU(16,"Task List"),t.qZA(),t.TgZ(17,"div",12)(18,"label",13),t._uU(19,"Filters:"),t.qZA(),t.TgZ(20,"div",14)(21,"button",15),t._uU(22,"Due Date"),t.qZA(),t.TgZ(23,"ul",16)(24,"li")(25,"a",17),t._uU(26,"Show All"),t.qZA()(),t.YNc(27,Z,2,1,"ng-container",18),t.qZA()(),t.TgZ(28,"div",14)(29,"button",19),t._uU(30,"Priority"),t.qZA(),t.TgZ(31,"ul",20)(32,"li")(33,"a",17),t._uU(34,"Show All"),t.qZA()(),t.TgZ(35,"li")(36,"a",17)(37,"span",21),t._uU(38,"\xa0"),t.qZA(),t._uU(39,"Low"),t.qZA()(),t.TgZ(40,"li")(41,"a",17)(42,"span",22),t._uU(43,"\xa0"),t.qZA(),t._uU(44,"Medium"),t.qZA()(),t.TgZ(45,"li")(46,"a",17)(47,"span",23),t._uU(48,"\xa0"),t.qZA(),t._uU(49,"High"),t.qZA()()()(),t.TgZ(50,"div",24)(51,"button",25),t._uU(52,"Status"),t.qZA(),t.TgZ(53,"ul",16)(54,"li")(55,"a",17),t._uU(56,"Show All"),t.qZA()(),t.TgZ(57,"li")(58,"a",17),t._uU(59,"To Do"),t.qZA()(),t.TgZ(60,"li")(61,"a",17),t._uU(62,"In Progress"),t.qZA()(),t.TgZ(63,"li")(64,"a",17),t._uU(65,"Done"),t.qZA()()()(),t._UZ(66,"span",26),t.TgZ(67,"button",27),t.NdJ("click",function(){return o.onTaskModal()}),t._uU(68,"Add New Task"),t.qZA()()(),t.TgZ(69,"div",28)(70,"div",29)(71,"table",30)(72,"thead")(73,"tr")(74,"th",31),t.NdJ("click",function(){return o.sortTasks("title")}),t._uU(75,"Task\xa0"),t._UZ(76,"span",32),t.qZA(),t.TgZ(77,"th",31),t.NdJ("click",function(){return o.sortTasks("unformattedDate")}),t._uU(78,"Due Date\xa0"),t._UZ(79,"span",32),t.qZA(),t.TgZ(80,"th",31),t.NdJ("click",function(){return o.sortTasks("priorityNumber")}),t._uU(81,"Priority\xa0"),t._UZ(82,"span",32),t.qZA(),t.TgZ(83,"th",31),t.NdJ("click",function(){return o.sortTasks("statusNumber")}),t._uU(84,"Status\xa0"),t._UZ(85,"span",32),t.qZA(),t.TgZ(86,"th",33),t._uU(87,"Actions"),t.qZA()()(),t.TgZ(88,"tbody"),t.YNc(89,A,2,1,"tr",34),t.ALo(90,"sortTasks"),t.qZA()(),t.TgZ(91,"div",35)(92,"button",36),t.NdJ("click",function(){return o.prevPage()}),t._uU(93,"\xab"),t.qZA(),t.TgZ(94,"button",37),t._uU(95),t.qZA(),t.TgZ(96,"button",38),t.NdJ("click",function(){return o.nextPage()}),t._uU(97,"\xbb"),t.qZA()()()()),2&s&&(t.xp6(8),t.Q6J("ngIf",void 0!==o.deleteIndex),t.xp6(19),t.Q6J("ngForOf",o.tasks),t.xp6(62),t.Q6J("ngForOf",t.Dn7(90,6,o.tasks,o.taskSort,o.taskSortDir)),t.xp6(3),t.Q6J("disabled",1===o.pageNum),t.xp6(3),t.Oqu(o.pageNum),t.xp6(1),t.Q6J("disabled",o.pageNum===o.totalPages))},dependencies:[b.sg,b.O5,p.H,h,k],styles:['@-moz-document url-prefix(){select{border:1px solid darkgrey;border-radius:3px;background-color:#fff;padding-left:5px}}.table[_ngcontent-%COMP%]{border:1px solid darkgrey;border-collapse:separate;border-spacing:0;border-radius:10px;overflow:hidden;background-color:#fff}td.title[_ngcontent-%COMP%]{font-weight:700}.top-bar[_ngcontent-%COMP%]{width:100%}.select-box[_ngcontent-%COMP%]{color:#a9a9a9;width:125px;border-radius:5px;border-color:#a9a9a9}.select-box-filtered[_ngcontent-%COMP%]{color:#000}.dropdown-item[_ngcontent-%COMP%]{cursor:pointer;font-size:14px;color:#000;width:123px}.dropdown-menu[_ngcontent-%COMP%]{min-width:120px}.status-dropdown[_ngcontent-%COMP%]{border-color:#a9a9a9;border-radius:5px;min-width:110px;font-size:14px;height:23px}.new-task-btn[_ngcontent-%COMP%]{font-size:13px;width:150px;background-color:#32cd32;border:none;color:#fff}.new-task-btn[_ngcontent-%COMP%]:hover{background-color:transparent;box-shadow:inset 0 0 0 1px #32cd32;color:#32cd32;transition:background-color .3s,box-shadow .3s,color .3s}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{border:none}tr.border-bottom[_ngcontent-%COMP%]:not(:nth-child(15n))   td[_ngcontent-%COMP%]{border-bottom:1px solid darkgrey}tr.border-bottom[_ngcontent-%COMP%]:not(:nth-child(15n))   th[_ngcontent-%COMP%]{border-bottom:1px solid darkgrey}td[_ngcontent-%COMP%]:empty:after{content:"\\a0"}.header[_ngcontent-%COMP%]{border-bottom:1px solid grey;color:#a9a9a9;font-weight:500}.can-sort[_ngcontent-%COMP%]{cursor:pointer}.bi-caret-down[_ngcontent-%COMP%]{color:transparent;transition:color .3s}.can-sort[_ngcontent-%COMP%]:hover   .bi-caret-down[_ngcontent-%COMP%]{color:inherit}.low[_ngcontent-%COMP%]{color:#32cd32}.medium[_ngcontent-%COMP%]{color:gold}.high[_ngcontent-%COMP%]{color:#dc143c}.bi.action[_ngcontent-%COMP%]{cursor:pointer}.action[_ngcontent-%COMP%]:hover{color:#a9a9a9}.btn-close-div[_ngcontent-%COMP%]{margin-top:12px;margin-right:12px}.btn-close[_ngcontent-%COMP%]{width:5px;height:5px}.dlt-btn[_ngcontent-%COMP%]{width:110px;height:35px;font-size:13px}.pages[_ngcontent-%COMP%]   .btn-arrow[_ngcontent-%COMP%]{background-color:#32cd32;color:#fff;border:none;width:50px}.pages[_ngcontent-%COMP%]   .btn-arrow[_ngcontent-%COMP%]:hover{background-color:transparent;box-shadow:inset 0 0 0 1px #32cd32;color:#32cd32;font-weight:bolder;transition:background-color .3s,box-shadow .3s,color .3s}.pages[_ngcontent-%COMP%]   .btn-num[_ngcontent-%COMP%]{background-color:#32cd32;color:#fff;border:none;width:30px}.pages[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:disabled{background-color:transparent;box-shadow:inset 0 0 0 1px #32cd32;color:#32cd32;font-weight:bolder;opacity:30%}']})}return n})()}];let v=(()=>{class n{static#t=this.\u0275fac=function(s){return new(s||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[m.m,g.Bz.forChild(P),g.Bz]})}return n})()}}]);