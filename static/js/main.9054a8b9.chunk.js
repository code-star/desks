(this["webpackJsonpdesks-client"]=this["webpackJsonpdesks-client"]||[]).push([[0],{160:function(e,t,n){},172:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(58),s=n.n(r),i=(n(160),n(257)),o=n(8),j=n(26),d=n.n(j),u=n(42),b=n(261),l=n(269),h=n(244),O=n(260),x=n(97),f=n.n(x),p=n(251),k=n(248),m=n(268),v=n(242),g=n(105),w=n(252),y=n(259),C=n(243),S=n(89),T=n(246),_=n(239),D=n(175),N=n(240),z=c.a.createContext(null),A=n(1),I=function(e){var t=e.title,n=e.type,c=Object(a.useContext)(z),r=Object(o.a)(c.startTime,2),s=r[0],i=r[1],j=Object(a.useContext)(z),d=Object(o.a)(j.endTime,2),u=d[0],b=d[1];return Object(A.jsxs)(y.a,{children:[Object(A.jsx)(g.a,{className:"subText",children:t}),Object(A.jsx)(D.b,{dateAdapter:_.a,children:Object(A.jsx)(N.a,{value:"Start"===n?s:u,onChange:function(e){e&&("Start"===n&&i(e),"End"===n&&b(e))},renderInput:function(e){return Object(A.jsx)(T.a,Object(S.a)({},e))}})})]})};function P(e,t,n){return e>=t&&e<=n}function B(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),t.getHours(),t.getMinutes()).getTime()/1e3}var E=function(e,t){return B(e,t)-(Date.now()+36e5)/1e3<=0},L=function(e){return""===e},H=function(e,t,n){var a=B(e,t);return B(e,n)-a<=0},F=function(){var e=Object(a.useContext)(z),t=Object(o.a)(e.date,1)[0],n=Object(o.a)(e.startTime,1)[0],c=Object(o.a)(e.endTime,1)[0];return Object(A.jsxs)(y.a,{children:[Object(A.jsx)(I,{title:"Please select the start time for when you want to book a desk",type:"Start"}),E(t,n)?Object(A.jsx)(C.a,{severity:"warning",children:"Check if the time has passed"}):null,Object(A.jsx)(I,{title:"Please select the end time for when you want to book a desk",type:"End"}),H(t,n,c)?Object(A.jsx)(C.a,{severity:"warning",children:"The end time is earlier than the start time"}):null]})},M=n(250),J=function(e){return B(e,e)<Date.now()/1e3},W=function(){var e=Object(a.useContext)(z),t=Object(o.a)(e.date,2),n=t[0],c=t[1];return Object(A.jsx)(D.b,{dateAdapter:_.a,children:Object(A.jsx)(M.a,{orientation:"portrait",displayStaticWrapperAs:"desktop",openTo:"day",value:n,shouldDisableDate:J,onChange:function(e){e&&c(e)},renderInput:function(e){return Object(A.jsx)(T.a,Object(S.a)({},e))}})})},G=function(){var e=Object(a.useContext)(z),t=Object(o.a)(e.date,1)[0],n=Object(o.a)(e.startTime,1)[0];return Object(A.jsxs)(y.a,{children:[Object(A.jsx)(g.a,{className:"subText",children:"Please select the date for when you want to book a desk"}),Object(A.jsx)(W,{}),E(t,n)?Object(A.jsx)(C.a,{severity:"warning",children:"Check if the date has passed"}):null]})},K=n(267),U=n(245),Y=n(265),Q=n(247),R=n(241),q=n(255),V=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(a.useContext)(z),s=Object(o.a)(r.desk,2),i=s[0],j=s[1],b=Object(a.useContext)(z),l=Object(o.a)(b.startTime,1)[0],h=Object(a.useContext)(z),O=Object(o.a)(h.endTime,1)[0],x=Object(a.useContext)(z),f=Object(o.a)(x.date,1)[0],p=Object(a.useContext)(z),k=Object(o.a)(p.bookingSucces,1)[0];return Object(a.useEffect)((function(){var e=function(){var e=Object(u.a)(d.a.mark((function e(){var t,n,a,r,s,i,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/bookinglist"));case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,a=n.bookingList,r=a.filter((function(e){var t=B(f,l),n=B(f,O),a=P(e.start_time,t,n),c=P(e.end_time,t,n);return a||c})),e.next=10,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/list"));case 10:return s=e.sent,e.next=13,s.json();case 13:i=e.sent,o=i.deskList.filter((function(e){return!r.find((function(t){return t.booked_desk===e.desk_id}))})),c(o);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[k,O,l,f]),Object(A.jsxs)(Y.a,{sx:{m:1,minWidth:120},children:[Object(A.jsx)(Q.a,{children:"Desk"}),Object(A.jsx)(R.a,{value:i,label:"Desk",onChange:function(e){j(e.target.value)},children:n.map((function(e){return Object(A.jsx)(q.a,{value:e.desk_id,children:e.desk_id})}))})]})},X=n.p+"static/media/floor_plan_Ordina_B2.c52b3cd2.jpg",Z=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(a.useContext)(z),s=Object(o.a)(r.desk,1)[0];return Object(A.jsxs)("div",{children:[Object(A.jsxs)(p.a,{container:!0,children:[Object(A.jsxs)(p.a,{item:!0,xs:4,children:[Object(A.jsx)(g.a,{className:"subText",children:"Please select one of the available desks:"}),Object(A.jsx)(V,{}),L(s)?Object(A.jsx)(C.a,{severity:"warning",children:"There is no desk selected"}):""]}),Object(A.jsxs)(p.a,{item:!0,xs:8,children:[Object(A.jsx)(K.a,{children:Object(A.jsx)("img",{className:"image",onClick:function(){return c(!0)},src:X,alt:"Layout"})}),Object(A.jsx)(g.a,{variant:"subtitle2",children:"Click image to enlarge"})]})]}),Object(A.jsx)(U.a,{open:n,onClose:function(){return c(!1)},children:Object(A.jsx)("img",{className:"modal-content",alt:"zoomedLayout",src:X})})]})},$=function(){var e=[Object(A.jsx)(G,{}),Object(A.jsx)(F,{}),Object(A.jsx)(Z,{})],t=["Select booking date","Select booking time","Select desk"],n=Object(a.useContext)(z),c=Object(o.a)(n.activeStep,2),r=c[0],s=c[1],i=Object(o.a)(n.date,1)[0],j=Object(o.a)(n.startTime,1)[0],d=Object(o.a)(n.endTime,1)[0],u=Object(o.a)(n.desk,1)[0],b=function(e){return 1===e&&H(i,j,d)||2===e&&L(u)};return Object(A.jsxs)(p.a,{container:!0,height:550,maxWidth:1,direction:"column",justifyContent:"space-between",children:[Object(A.jsx)(p.a,{item:!0,children:Object(A.jsx)(k.a,{nonLinear:!0,activeStep:r,children:t.map((function(e,t){return Object(A.jsx)(m.a,{className:"headerText",children:Object(A.jsxs)(v.a,{onClick:function(){s(t)},children:[Object(A.jsx)(g.a,{variant:"h5",children:e}),b(t)?Object(A.jsx)(g.a,{variant:"caption",color:"error",children:"Missing/ wrong information"}):null]})},e)}))})}),Object(A.jsx)(p.a,{item:!0,children:e[r]}),Object(A.jsxs)(p.a,{item:!0,children:[Object(A.jsx)(w.a,{disabled:0===r,onClick:function(){s(r-1)},children:"Back"}),Object(A.jsx)(w.a,{onClick:function(){var e=r===t.length-1;s(e?0:r+1)},children:"Next"})]})]})},ee=(n(85),function(){var e=function(){var e=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/book"),{method:"PATCH",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify({booking_id:"booking ".concat(K,".").concat(Date.now()),start_time:B(M,S),end_time:B(M,N),booked_desk:K})});case 2:return t=e.sent,e.next=5,t.json();case 5:e.sent.booking&&(w(!0),i(K),U(""));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=new Date;t.setHours(9,0,0,0);var n=new Date;n.setHours(17,0,0,0);var c=Object(a.useState)(""),r=Object(o.a)(c,2),s=r[0],i=r[1],j=Object(a.useState)(0),x=Object(o.a)(j,2),p=x[0],k=x[1],m=Object(a.useState)(!1),v=Object(o.a)(m,2),g=v[0],w=v[1],y=Object(a.useState)(t),C=Object(o.a)(y,2),S=C[0],T=C[1],_=Object(a.useState)(n),D=Object(o.a)(_,2),N=D[0],I=D[1],P=Object(a.useState)(new Date(Date.now()+864e5)),F=Object(o.a)(P,2),M=F[0],J=F[1],W=Object(a.useState)(""),G=Object(o.a)(W,2),K=G[0],U=G[1],Y={startTime:[S,T],endTime:[N,I],date:[M,J],desk:[K,U],activeStep:[p,k],bookingSucces:[g,w]};return Object(A.jsx)(z.Provider,{value:Y,children:Object(A.jsxs)("div",{style:{textAlign:"center",padding:"1%"},children:[Object(A.jsxs)(b.a,{elevation:6,style:{width:"80%",minWidth:800,height:"auto",margin:"auto",padding:"2%"},children:[Object(A.jsx)($,{}),Object(A.jsx)(l.a,{color:"secondary",disabled:L(K)||H(M,S,N)||E(M,S),onClick:e,style:{bottom:20,right:20,position:"fixed"},children:"Book"})]}),Object(A.jsx)(h.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:g,action:Object(A.jsx)(O.a,{onClick:function(){w(!1)},children:Object(A.jsx)(f.a,{color:"primary"})}),autoHideDuration:6e3,onClose:function(){w(!1)},message:"Your booking for desk ".concat(s," was succesful")})]})})}),te=n(233),ne=n(266),ae=n(249),ce=function(e){var t=e.desk;return Object(A.jsx)(ae.a,{children:t.desk_id})},re=function(e){return P(Date.now()/1e3,e.start_time-18e5,e.end_time)},se=function(e){var t=e.deskId,n=Object(a.useState)([]),c=Object(o.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){var e=function(){var e=Object(u.a)(d.a.mark((function e(){var n,a,c,r,i,o,j,u,b,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/list"));case 2:return n=e.sent,e.next=5,n.json();case 5:return a=e.sent,c=a.deskList,e.next=9,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/bookinglist"));case 9:return r=e.sent,e.next=12,r.json();case 12:i=e.sent,o=i.bookingList,j=c.findIndex((function(e){return e.desk_id===t})),u=function(e){return c.find((function(t){return t.desk_id===e.booked_desk}))},(b=o.filter(re).map(u)).find((function(e){return(null===e||void 0===e?void 0:e.desk_id)===t}))&&(l=c.filter((function(e,t){var n=b.find((function(t){return(null===t||void 0===t?void 0:t.desk_id)===e.desk_id})),a=j-t;return!(j===t)&&(a>=-2&&a<=2)&&!n})),s(l));case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[t]),Object(A.jsxs)(te.a,{children:[r.length<=0?"":"This desk is not available, but these are:",Object(A.jsx)(ne.a,{style:{maxHeight:200,overflow:"auto"},children:r.map((function(e){return Object(A.jsx)(ce,{desk:e},e.desk_id)}))})]})},ie=function(){var e=document.location.search.substr(1),t=Object(a.useState)("free"),n=Object(o.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!1),i=Object(o.a)(s,2),j=i[0],b=i[1];Object(a.useEffect)((function(){var t=function(){var t=Object(u.a)(d.a.mark((function t(){var n,a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/").concat(e));case 2:return n=t.sent,t.next=5,n.json();case 5:a=t.sent,r(a.deskState);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[e]);var l=function(){var t=Object(u.a)(d.a.mark((function t(){var n,a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/").concat(e),{method:"PATCH",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify({deskState:c,deskId:e})});case 2:return n=t.sent,t.next=5,n.json();case 5:a=t.sent,r(a.deskState),b(!0);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(A.jsxs)("div",{children:[Object(A.jsxs)(te.a,{spacing:2,children:[Object(A.jsx)(g.a,{className:"headerText",children:e}),Object(A.jsx)(w.a,{variant:"contained",color:"secondary",disabled:"unavailable"===c,onClick:l,children:"free"===c?"Check in":"Check uit"}),Object(A.jsx)(se,{deskId:e})]}),Object(A.jsx)(h.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:j,autoHideDuration:6e3,onClose:function(){b(!1)},action:Object(A.jsx)(O.a,{onClick:function(){return b(!1)},children:Object(A.jsx)(f.a,{color:"primary"})}),message:"free"===c?"uitgechecked":"ingechecked"})]})},oe=n(270),je=n(271),de=n(133),ue=n.n(de),be=function(){return Object(A.jsx)(oe.a,{position:"static",children:Object(A.jsxs)(je.a,{variant:"dense",children:[Object(A.jsx)(g.a,{className:"headerText",color:"inherit",component:"div",sx:{flexGrow:1},children:"Ordina"}),Object(A.jsx)(O.a,{size:"large",color:"inherit",children:Object(A.jsx)(ue.a,{})})]})})},le=n(98),he=n(20),Oe=n(256),xe=n(234),fe=n(235),pe=n(236),ke=n(272),me=n(273),ve=n(274),ge=n(262),we=n(275),ye="/desks/book",Ce="Make a new booking",Se="/desks/checkin/?b2.",Te="Check in at desk b2.",_e=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!1),s=Object(o.a)(r,2),i=s[0],j=s[1],b=Object(a.useState)(1),l=Object(o.a)(b,2),h=l[0],O=l[1],x=function(){var e=Object(u.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),e.prev=1,e.next=4,fetch("".concat("https://ordina-smartdesk-api.azurewebsites.net/","api/desk/list"));case 4:return t=e.sent,e.next=7,t.json();case 7:if(n=e.sent,a=n.deskList,Array.isArray(a)){e.next=11;break}throw new Error("No desks in response");case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0),j(!0);case 17:c(!1);case 18:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){x()}),[]);return Object(A.jsxs)(y.a,{sx:{display:"flex"},children:[Object(A.jsxs)(Oe.a,{variant:"permanent",anchor:"left",sx:{width:240,flexShrink:0,"& .MuiDrawer-paper":{width:240,boxSizing:"border-box"}},children:[Object(A.jsx)(je.a,{}),Object(A.jsx)(xe.a,{}),!i&&Object(A.jsxs)(ne.a,{children:[Object(A.jsx)(ae.a,{children:Object(A.jsx)(fe.a,{component:"a",href:ye,children:Object(A.jsx)(pe.a,{primary:Ce})})}),Object(A.jsx)(ae.a,{children:Object(A.jsx)(fe.a,{component:"a",href:"".concat(Se).concat(h),children:Object(A.jsx)(pe.a,{primary:"".concat(Te).concat(h)})})})]})]}),Object(A.jsxs)(y.a,{component:"main",sx:{flexGrow:1,p:3},children:[n&&Object(A.jsx)(ke.a,{}),Object(A.jsxs)(K.a,{children:[Object(A.jsx)(me.a,{title:"Smart desk booking",subheader:"Ordina"}),Object(A.jsxs)(ve.a,{children:[i&&Object(A.jsx)(C.a,{severity:"error",children:"Error: API not available or failing!"}),Object(A.jsx)(g.a,{variant:"h6",gutterBottom:!0,children:"Booking a desk"}),Object(A.jsx)(g.a,{gutterBottom:!0,children:"Here you can book a desk for you and your team. Keep in mind ..."}),Object(A.jsx)(g.a,{variant:"h6",gutterBottom:!0,children:"Checking in"}),Object(A.jsx)(g.a,{children:"To check in you can scan the QR code on the desk or type in the desk number below. Keep in mind ..."}),Object(A.jsx)(T.a,{label:"Desk number",id:"outlined-start-adornment",sx:{m:1,width:"25ch"},InputProps:{startAdornment:Object(A.jsx)(ge.a,{position:"start",children:"B2."})},value:h,onChange:function(e){var t=parseInt(e.target.value,10);isNaN(t)?console.error("Error: not a number, might be an intermediate value"):O(t)},type:"number"})]}),!i&&Object(A.jsxs)(we.a,{children:[Object(A.jsx)(w.a,{component:"a",href:ye,children:Ce}),Object(A.jsx)(w.a,{component:"a",href:"".concat(Se).concat(h),color:"secondary",children:"".concat(Te).concat(h)})]})]})]})]})},De=n(238),Ne=n(135),ze=n(71),Ae=n(237),Ie=Object(Ne.a)({palette:{primary:{main:ze.a[500]},secondary:{main:Ae.a[500]}}});var Pe=function(){return Object(A.jsx)("div",{className:"App",children:Object(A.jsx)(i.a,{theme:Ie,children:Object(A.jsxs)(le.a,{children:[Object(A.jsx)(De.a,{}),Object(A.jsx)(be,{}),Object(A.jsxs)(he.c,{children:[Object(A.jsx)(he.a,{path:"/desks/book",component:ee}),Object(A.jsx)(he.a,{path:"/desks/checkin",component:ie}),Object(A.jsx)(he.a,{component:_e})]})]})})})},Be=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,276)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(A.jsx)(c.a.StrictMode,{children:Object(A.jsx)(le.a,{children:Object(A.jsx)(Pe,{})})}),document.getElementById("root")),Be()},85:function(e,t,n){}},[[172,1,2]]]);
//# sourceMappingURL=main.9054a8b9.chunk.js.map