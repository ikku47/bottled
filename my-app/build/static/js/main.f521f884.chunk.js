(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[1],{27:function(e,t,n){e.exports={container:"navbar_container__KgCiU"}},29:function(e,t,n){e.exports=n(54)},34:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n(2),r=n(26),o=n(9),u=n(10),c=n(27),i=n.n(c);var f=Object(u.withRouter)((function(e){var t=e.history;return a.default.createElement("nav",{className:i.a.container},a.default.createElement("span",null,a.default.createElement(u.Link,{class:"wordmark",href:"/"},a.default.createElement("img",{src:"/logo192.png"})," ",a.default.createElement("span",null,"Bottle"))),a.default.createElement("span",null,Object(o.a)()&&a.default.createElement(a.default.Fragment,null,a.default.createElement(u.Link,{to:"/"},"Send your own message."),a.default.createElement("button",{onClick:function(){localStorage.removeItem("token"),t.push("/login")}},"Logout"))))}));var m=Object(l.withRouter)((function(e){var t=e.component,n=e.history,u=Object(r.a)(e,["component","history"]);return Object(a.useEffect)((function(){Object(o.a)()||n.push("/login")}),[n]),a.default.createElement(a.default.Fragment,null,a.default.createElement(l.Route,Object.assign({},u,{render:function(e){return a.default.createElement(t,e)}})))})),s=(n(34),Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,69))}))),d=Object(a.lazy)((function(){return n.e(4).then(n.bind(null,70))})),p=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(6),n.e(5)]).then(n.bind(null,71))}));function E(e){return function(t){return a.default.createElement(a.Suspense,{fallback:a.default.createElement("div",{className:"loading"},a.default.createElement(a.default.Fragment,null,"Loading"))},a.default.createElement(e,t))}}var h=function(){return a.default.createElement("div",{className:"App"},a.default.createElement(f,null),a.default.createElement(l.Switch,null,a.default.createElement(l.Route,{exact:!0,path:"/login",component:E(d)}),a.default.createElement(l.Route,{exact:!0,path:"/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})",component:E(s)}),a.default.createElement(m,{exact:!0,path:"/",component:E(p)})))},g=n(12),b=n.n(g),v=(n(52),n(11)),w=n(8);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(53);b.a.defaults.baseURL="/api",b.a.interceptors.request.use((function(e){var t=localStorage.getItem("token");return v.a.isEmpty(t)||(e.headers.Authorization=t),console.log(e),e}),(function(e){return Promise.reject(e)})),a.default.render(a.default.createElement(a.default.StrictMode,null,a.default.createElement(w.a,null,a.default.createElement(h,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(11),l=function(){return!a.a.isEmpty(localStorage.getItem("token"))}}},[[29,2,3]]]);
//# sourceMappingURL=main.f521f884.chunk.js.map