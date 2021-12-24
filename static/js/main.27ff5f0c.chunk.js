(this["webpackJsonpdesks-client"]=this["webpackJsonpdesks-client"]||[]).push([[0],{159:function(e,t,n){},171:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(58),s=n.n(r),i=(n(159),n(256)),o=n(26),j=n.n(o),d=n(42),u=n(9),b=n(250),l=n(103),h=n(267),O=n(243),x=n(259),f=n(96),p=n.n(f),k=n(258),m=n(242),v=n(88),g=n(245),w=n(238),y=n(174),C=n(239),S=c.a.createContext(null),T=n(1),_=function(e){var t=e.title,n=e.type,c=Object(a.useContext)(S),r=Object(u.a)(c.startTime,2),s=r[0],i=r[1],o=Object(a.useContext)(S),j=Object(u.a)(o.endTime,2),d=j[0],b=j[1];return Object(T.jsxs)(k.a,{children:[Object(T.jsx)(l.a,{variant:"subtitle1",children:t}),Object(T.jsx)(y.b,{dateAdapter:w.a,children:Object(T.jsx)(C.a,{value:"Start"===n?s:d,onChange:function(e){e&&("Start"===n&&i(e),"End"===n&&b(e))},renderInput:function(e){return Object(T.jsx)(g.a,Object(v.a)({},e))}})})]})};function D(e,t,n){return e>=t&&e<=n}function I(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),t.getHours(),t.getMinutes()).getTime()/1e3}var z=function(e,t){return I(e,t)-(Date.now()+36e5)/1e3<=0},P=function(e){return""===e},A=function(e,t,n){var a=I(e,t);return I(e,n)-a<=0},B=function(){var e=Object(a.useContext)(S),t=Object(u.a)(e.date,1)[0],n=Object(u.a)(e.startTime,1)[0],c=Object(u.a)(e.endTime,1)[0];return Object(T.jsxs)(k.a,{children:[Object(T.jsx)(_,{title:"Please select the start time for when you want to book a desk",type:"Start"}),z(t,n)?Object(T.jsx)(m.a,{severity:"warning",children:"Check if the time has passed"}):null,Object(T.jsx)(_,{title:"Please select the end time for when you want to book a desk",type:"End"}),A(t,n,c)?Object(T.jsx)(m.a,{severity:"warning",children:"The end time is earlier than the start time"}):null]})},E=n(249),H=function(){var e=Object(a.useContext)(S),t=Object(u.a)(e.date,2),n=t[0],c=t[1];return Object(T.jsx)(y.b,{dateAdapter:w.a,children:Object(T.jsx)(E.a,{orientation:"portrait",displayStaticWrapperAs:"desktop",openTo:"day",value:n,onChange:function(e){e&&c(e)},renderInput:function(e){return Object(T.jsx)(g.a,Object(v.a)({},e))}})})},F=function(){var e=Object(a.useContext)(S),t=Object(u.a)(e.date,1)[0],n=Object(u.a)(e.startTime,1)[0];return Object(T.jsxs)(k.a,{children:[Object(T.jsx)(l.a,{variant:"subtitle1",children:"Please select the date for when you want to book a desk"}),Object(T.jsx)(H,{}),z(t,n)?Object(T.jsx)(m.a,{severity:"warning",children:"Check if the date has passed"}):null]})},L=n(264),N=n(246),M=n(240),J=n(254),U=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useContext)(S),s=Object(u.a)(r.desk,2),i=s[0],o=s[1],b=Object(a.useContext)(S),l=Object(u.a)(b.startTime,1)[0],h=Object(a.useContext)(S),O=Object(u.a)(h.endTime,1)[0],x=Object(a.useContext)(S),f=Object(u.a)(x.date,1)[0];return Object(a.useEffect)((function(){var e=function(){var e=Object(d.a)(j.a.mark((function e(){var t,n,a,r,s,i,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/bookinglist"));case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,a=n.bookingList,r=a.filter((function(e){var t=I(f,l),n=I(f,O),a=D(e.start_time,t,n),c=D(e.end_time,t,n);return a||c})),e.next=10,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/list"));case 10:return s=e.sent,e.next=13,s.json();case 13:i=e.sent,o=i.deskList.filter((function(e){return!r.find((function(t){return t.booked_desk===e.desk_id}))})),c(o);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[O,l,f]),Object(T.jsxs)(L.a,{sx:{m:1,minWidth:120},children:[Object(T.jsx)(N.a,{children:"Desk"}),Object(T.jsx)(M.a,{value:i,label:"Desk",onChange:function(e){o(e.target.value)},children:n.map((function(e){return Object(T.jsx)(J.a,{value:e.desk_id,children:e.desk_id})}))})]})},G=function(){var e=Object(a.useContext)(S),t=Object(u.a)(e.desk,1)[0];return Object(T.jsxs)(k.a,{children:[Object(T.jsx)(l.a,{variant:"subtitle1",children:"Please select one of the available desks:"}),Object(T.jsx)(U,{}),P(t)?Object(T.jsx)(m.a,{severity:"warning",children:"There is no desk selected"}):""]})},K=n(247),W=n(266),Y=n(241),Q=n(251),R=function(){var e=["Select booking date","Select booking time","Select desk"],t=Object(a.useContext)(S),n=Object(u.a)(t.activeStep,2),c=n[0],r=n[1],s=Object(u.a)(t.date,1)[0],i=Object(u.a)(t.startTime,1)[0],o=Object(u.a)(t.endTime,1)[0],j=Object(u.a)(t.desk,1)[0],d=function(e){return 0===e&&z(s,i)||1===e&&A(s,i,o)||2===e&&P(j)};return Object(T.jsxs)(k.a,{children:[Object(T.jsx)(K.a,{nonLinear:!0,activeStep:c,children:e.map((function(e,t){return Object(T.jsx)(W.a,{children:Object(T.jsxs)(Y.a,{onClick:function(){r(t)},children:[Object(T.jsx)(l.a,{variant:"h5",children:e}),d(t)?Object(T.jsx)(l.a,{variant:"caption",color:"error",children:"Something here isnt filled in correctly"}):null]})},e)}))}),Object(T.jsxs)(k.a,{sx:{pt:2},children:[Object(T.jsx)(Q.a,{disabled:0===c,onClick:function(){r(c-1)},children:"Back"}),Object(T.jsx)(Q.a,{onClick:function(){var t=c===e.length-1;r(t?0:c+1)},children:"Next"})]})]})},q=n.p+"static/media/floor_plan_Ordina_B2.c52b3cd2.jpg",V=[Object(T.jsx)(F,{}),Object(T.jsx)(B,{}),Object(T.jsx)(G,{})],X=function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],c=t[1],r=function(){var e=Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/book"),{method:"PATCH",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify({booking_id:"booking ".concat(J,".").concat(Date.now()),start_time:I(F,w),end_time:I(F,D),booked_desk:J})});case 2:return t=e.sent,e.next=5,t.json();case 5:e.sent.booking&&c(!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=new Date;s.setHours(9,0,0,0);var i=new Date;i.setHours(17,0,0,0);var o=Object(a.useState)(0),f=Object(u.a)(o,2),k=f[0],m=f[1],v=Object(a.useState)(s),g=Object(u.a)(v,2),w=g[0],y=g[1],C=Object(a.useState)(i),_=Object(u.a)(C,2),D=_[0],B=_[1],E=Object(a.useState)(new Date(Date.now()+864e5)),H=Object(u.a)(E,2),F=H[0],L=H[1],N=Object(a.useState)(""),M=Object(u.a)(N,2),J=M[0],U=M[1],G={startTime:[w,y],endTime:[D,B],date:[F,L],desk:[J,U],activeStep:[k,m]};return Object(T.jsx)(S.Provider,{value:G,children:Object(T.jsxs)("div",{children:[Object(T.jsxs)(b.a,{container:!0,alignItems:"center",children:[Object(T.jsxs)(b.a,{item:!0,sm:12,lg:7,alignItems:"center",textAlign:"center",children:[Object(T.jsx)(l.a,{variant:"h4",children:"Floor plan"}),Object(T.jsx)("img",{src:q,alt:"layout img",width:"100%",height:"auto"})]}),Object(T.jsx)(b.a,{item:!0,sm:12,lg:5,height:1100,children:Object(T.jsxs)(b.a,{container:!0,direction:"column",justifyContent:"center",paddingTop:5,children:[Object(T.jsx)(b.a,{item:!0,md:4,children:Object(T.jsx)(R,{})}),Object(T.jsx)(b.a,{item:!0,md:6,justifyContent:"center",children:V[k]})]})})]}),Object(T.jsx)(h.a,{color:"secondary",disabled:P(J)||A(F,w,D)||z(F,w),onClick:r,style:{bottom:20,right:20,position:"fixed"},children:"Book"}),Object(T.jsx)(O.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:n,action:Object(T.jsx)(x.a,{onClick:function(){return c(!1)},children:Object(T.jsx)(p.a,{color:"primary"})}),autoHideDuration:6e3,onClose:function(){c(!1)},message:"Your booking for desk ".concat(J," was succesful")})]})})},Z=n(232),$=n(265),ee=n(248),te=function(e){var t=e.desk;return Object(T.jsx)(ee.a,{children:t.desk_id})},ne=function(e){return D(Date.now()/1e3,e.start_time-18e5,e.end_time)},ae=function(e){var t=e.deskId,n=Object(a.useState)([]),c=Object(u.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){var e=function(){var e=Object(d.a)(j.a.mark((function e(){var n,a,c,r,i,o,d,u,b,l;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/list"));case 2:return n=e.sent,e.next=5,n.json();case 5:return a=e.sent,c=a.deskList,e.next=9,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/bookinglist"));case 9:return r=e.sent,e.next=12,r.json();case 12:i=e.sent,o=i.bookingList,d=c.findIndex((function(e){return e.desk_id===t})),u=function(e){return c.find((function(t){return t.desk_id===e.booked_desk}))},(b=o.filter(ne).map(u)).find((function(e){return(null===e||void 0===e?void 0:e.desk_id)===t}))&&(l=c.filter((function(e,t){var n=b.find((function(t){return(null===t||void 0===t?void 0:t.desk_id)===e.desk_id})),a=d-t;return!(d===t)&&(a>=-2&&a<=2)&&!n})),s(l));case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[t]),Object(T.jsxs)(Z.a,{children:[r.length<=0?"":"This desk is not available, but these are:",Object(T.jsx)($.a,{style:{maxHeight:200,overflow:"auto"},children:r.map((function(e){return Object(T.jsx)(te,{desk:e},e.desk_id)}))})]})},ce=function(){var e=document.location.search.substr(1),t=Object(a.useState)("free"),n=Object(u.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!1),i=Object(u.a)(s,2),o=i[0],b=i[1];Object(a.useEffect)((function(){var t=function(){var t=Object(d.a)(j.a.mark((function t(){var n,a;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/").concat(e));case 2:return n=t.sent,t.next=5,n.json();case 5:a=t.sent,r(a.deskState);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[e]);var h=function(){var t=Object(d.a)(j.a.mark((function t(){var n,a;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/").concat(e),{method:"PATCH",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify({deskState:c,deskId:e})});case 2:return n=t.sent,t.next=5,n.json();case 5:a=t.sent,r(a.deskState),b(!0);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(T.jsxs)("div",{className:"CheckinPage",children:[Object(T.jsxs)(Z.a,{spacing:2,children:[Object(T.jsx)(l.a,{variant:"h5",children:e}),Object(T.jsx)(Q.a,{variant:"contained",color:"secondary",disabled:"unavailable"===c,onClick:h,children:"free"===c?"Check in":"Check uit"}),Object(T.jsx)(ae,{deskId:e})]}),Object(T.jsx)(O.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:o,autoHideDuration:6e3,onClose:function(){b(!1)},action:Object(T.jsx)(x.a,{onClick:function(){return b(!1)},children:Object(T.jsx)(p.a,{color:"primary"})}),message:"free"===c?"uitgechecked":"ingechecked"})]})},re=n(268),se=n(269),ie=n(132),oe=n.n(ie),je=function(){return Object(T.jsx)(re.a,{position:"static",children:Object(T.jsxs)(se.a,{variant:"dense",children:[Object(T.jsx)(l.a,{variant:"h6",color:"inherit",component:"div",sx:{flexGrow:1},children:"Username"}),Object(T.jsx)(x.a,{size:"large",color:"inherit",children:Object(T.jsx)(oe.a,{})})]})})},de=n(20),ue=n(255),be=n(233),le=n(234),he=n(235),Oe=n(270),xe=n(271),fe=n(272),pe=n(273),ke=n(261),me=n(274),ve="/desks/book",ge="Make a new booking",we="/desks/checkin/?b2.",ye="Check in at desk b2.",Ce=function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!1),s=Object(u.a)(r,2),i=s[0],o=s[1],b=Object(a.useState)(1),h=Object(u.a)(b,2),O=h[0],x=h[1],f=function(){var e=Object(d.a)(j.a.mark((function e(){var t,n,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),e.prev=1,e.next=4,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/list"));case 4:return t=e.sent,e.next=7,t.json();case 7:if(n=e.sent,a=n.deskList,Array.isArray(a)){e.next=11;break}throw new Error("No desks in response");case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0),o(!0);case 17:c(!1);case 18:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){f()}),[]);return Object(T.jsxs)(k.a,{sx:{display:"flex"},children:[Object(T.jsxs)(ue.a,{variant:"permanent",anchor:"left",sx:{width:240,flexShrink:0,"& .MuiDrawer-paper":{width:240,boxSizing:"border-box"}},children:[Object(T.jsx)(se.a,{}),Object(T.jsx)(be.a,{}),!i&&Object(T.jsxs)($.a,{children:[Object(T.jsx)(ee.a,{children:Object(T.jsx)(le.a,{component:"a",href:ve,children:Object(T.jsx)(he.a,{primary:ge})})}),Object(T.jsx)(ee.a,{children:Object(T.jsx)(le.a,{component:"a",href:"".concat(we).concat(O),children:Object(T.jsx)(he.a,{primary:"".concat(ye).concat(O)})})})]})]}),Object(T.jsxs)(k.a,{component:"main",sx:{flexGrow:1,p:3},children:[n&&Object(T.jsx)(Oe.a,{}),Object(T.jsxs)(xe.a,{children:[Object(T.jsx)(fe.a,{title:"Smart desk booking",subheader:"Ordina"}),Object(T.jsxs)(pe.a,{children:[i&&Object(T.jsx)(m.a,{severity:"error",children:"Error: API not available or failing!"}),Object(T.jsx)(l.a,{variant:"h6",gutterBottom:!0,children:"Booking a desk"}),Object(T.jsx)(l.a,{gutterBottom:!0,children:"Here you can book a desk for you and your team. Keep in mind ..."}),Object(T.jsx)(l.a,{variant:"h6",gutterBottom:!0,children:"Checking in"}),Object(T.jsx)(l.a,{children:"To check in you can scan the QR code on the desk or type in the desk number below. Keep in mind ..."}),Object(T.jsx)(g.a,{label:"Desk number",id:"outlined-start-adornment",sx:{m:1,width:"25ch"},InputProps:{startAdornment:Object(T.jsx)(ke.a,{position:"start",children:"B2."})},value:O,onChange:function(e){var t=parseInt(e.target.value,10);isNaN(t)?console.error("Error: not a number, might be an intermediate value"):x(t)},type:"number"})]}),!i&&Object(T.jsxs)(me.a,{children:[Object(T.jsx)(Q.a,{component:"a",href:ve,children:ge}),Object(T.jsx)(Q.a,{component:"a",href:"".concat(we).concat(O),color:"secondary",children:"".concat(ye).concat(O)})]})]})]})]})},Se=n(237),Te=n(134),_e=n(71),De=n(236),Ie=Object(Te.a)({palette:{primary:{main:_e.a[500]},secondary:{main:De.a[500]}}});var ze=function(){return Object(T.jsx)("div",{className:"App",children:Object(T.jsxs)(i.a,{theme:Ie,children:[Object(T.jsx)(Se.a,{}),Object(T.jsx)(je,{}),Object(T.jsx)(de.a,{path:"/desks/book",component:X}),Object(T.jsx)(de.a,{path:"/desks/checkin",component:ce}),Object(T.jsx)(de.a,{exact:!0,path:"/",component:Ce})]})})},Pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,275)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))},Ae=n(111);s.a.render(Object(T.jsx)(c.a.StrictMode,{children:Object(T.jsx)(Ae.a,{children:Object(T.jsx)(ze,{})})}),document.getElementById("root")),Pe()}},[[171,1,2]]]);
//# sourceMappingURL=main.27ff5f0c.chunk.js.map