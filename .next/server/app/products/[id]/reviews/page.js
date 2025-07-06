(()=>{var e={};e.id=8379,e.ids=[8379],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},23413:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>d});var s=a(50482),r=a(69108),i=a(62563),n=a.n(i),o=a(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let d=["",{children:["products",{children:["[id]",{children:["reviews",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,53827)),"D:\\websiteLeFoin_demo_gg\\src\\app\\products\\[id]\\reviews\\page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,58188)),"D:\\websiteLeFoin_demo_gg\\src\\app\\layout.tsx"],error:[()=>Promise.resolve().then(a.bind(a,24117)),"D:\\websiteLeFoin_demo_gg\\src\\app\\error.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,69361,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\websiteLeFoin_demo_gg\\src\\app\\products\\[id]\\reviews\\page.tsx"],m="/products/[id]/reviews/page",p={require:a,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/products/[id]/reviews/page",pathname:"/products/[id]/reviews",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},20607:(e,t,a)=>{Promise.resolve().then(a.bind(a,24689))},90978:(e,t)=>{"use strict";function a(){return null}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},24689:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p});var s=a(95344),r=a(3729),i=a(8428),n=a(90978),o=a.n(n),l=a(47674),d=a(44669);function c({productId:e,productName:t}){let{data:a}=(0,l.useSession)(),[i,n]=(0,r.useState)([]),[o,c]=(0,r.useState)(null),[m,p]=(0,r.useState)(!0),[u,g]=(0,r.useState)(!1),[x,h]=(0,r.useState)(5),[f,b]=(0,r.useState)(""),[y,v]=(0,r.useState)(!1);(0,r.useEffect)(()=>{j()},[e]);let j=async()=>{try{let t=await fetch(`/api/reviews?productId=${e}`);if(t.ok){let e=await t.json();n(e.reviews),c({averageRating:e.averageRating,totalReviews:e.totalReviews,ratingCounts:e.ratingCounts})}}catch(e){console.error("Error fetching reviews:",e)}finally{p(!1)}},N=async t=>{if(t.preventDefault(),!a){d.ZP.error("Vui l\xf2ng đăng nhập để đ\xe1nh gi\xe1 sản phẩm");return}v(!0);try{let t=await fetch("/api/reviews",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({productId:e,rating:x,comment:f})});if(t.ok)d.ZP.success("Cảm ơn bạn đ\xe3 đ\xe1nh gi\xe1 sản phẩm!"),g(!1),h(5),b(""),j();else{let e=await t.json();d.ZP.error(e.error||"C\xf3 lỗi xảy ra khi gửi đ\xe1nh gi\xe1")}}catch(e){console.error("Error submitting review:",e),d.ZP.error("C\xf3 lỗi xảy ra khi gửi đ\xe1nh gi\xe1")}finally{v(!1)}},w=(e,t=!1)=>s.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(a=>s.jsx("button",{type:t?"button":void 0,onClick:t?()=>h(a):void 0,className:`text-xl ${t?"cursor-pointer":""}`,disabled:!t,children:a<=e?"⭐":"☆"},a))}),k=e=>new Date(e).toLocaleDateString("vi-VN",{year:"numeric",month:"long",day:"numeric"});return m?(0,s.jsxs)("div",{className:"text-center py-8",children:[s.jsx("div",{className:"inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"}),s.jsx("p",{className:"mt-2",children:"Đang tải đ\xe1nh gi\xe1..."})]}):(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",children:[s.jsx("h3",{className:"text-2xl font-bold text-leaf mb-6",children:"Đ\xe1nh gi\xe1 sản phẩm"}),o&&(0,s.jsxs)("div",{className:"flex items-center gap-8 mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg",children:[(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("div",{className:"text-3xl font-bold text-amber-600",children:o.averageRating}),s.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Điểm trung b\xecnh"})]}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[w(Math.round(o.averageRating)),(0,s.jsxs)("span",{className:"text-sm text-gray-600 dark:text-gray-300",children:["(",o.totalReviews," đ\xe1nh gi\xe1)"]})]}),s.jsx("div",{className:"space-y-1",children:[5,4,3,2,1].map(e=>(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsxs)("span",{className:"text-sm w-8",children:[e,"⭐"]}),s.jsx("div",{className:"flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2",children:s.jsx("div",{className:"bg-amber-500 h-2 rounded-full",style:{width:`${o.totalReviews>0?o.ratingCounts[e]/o.totalReviews*100:0}%`}})}),s.jsx("span",{className:"text-sm text-gray-600 dark:text-gray-300 w-8",children:o.ratingCounts[e]})]},e))})]})]}),a&&!u&&s.jsx("button",{onClick:()=>g(!0),className:"mb-6 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors",children:"Viết đ\xe1nh gi\xe1"}),u&&(0,s.jsxs)("form",{onSubmit:N,className:"mb-8 p-4 border border-gray-200 dark:border-gray-600 rounded-lg",children:[s.jsx("h4",{className:"font-semibold text-leaf mb-4",children:"Đ\xe1nh gi\xe1 của bạn"}),(0,s.jsxs)("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Đ\xe1nh gi\xe1"}),w(x,!0)]}),(0,s.jsxs)("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Nhận x\xe9t (t\xf9y chọn)"}),s.jsx("textarea",{value:f,onChange:e=>b(e.target.value),className:"w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white",rows:4,placeholder:"Chia sẻ trải nghiệm của bạn với sản phẩm n\xe0y..."})]}),(0,s.jsxs)("div",{className:"flex gap-2",children:[s.jsx("button",{type:"submit",disabled:y,className:"bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50",children:y?"Đang gửi...":"Gửi đ\xe1nh gi\xe1"}),s.jsx("button",{type:"button",onClick:()=>g(!1),className:"bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors",children:"Hủy"})]})]}),s.jsx("div",{className:"space-y-6",children:0===i.length?s.jsx("p",{className:"text-center text-gray-500 dark:text-gray-400 py-8",children:"Chưa c\xf3 đ\xe1nh gi\xe1 n\xe0o cho sản phẩm n\xe0y."}):i.map(e=>s.jsx("div",{className:"border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0",children:(0,s.jsxs)("div",{className:"flex items-start gap-4",children:[s.jsx("div",{className:"w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold",children:e.user.firstName?e.user.firstName.charAt(0).toUpperCase():e.user.email.charAt(0).toUpperCase()}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[s.jsx("span",{className:"font-semibold text-leaf",children:e.user.firstName?`${e.user.firstName} ${e.user.lastName||""}`:e.user.email}),s.jsx("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:k(e.createdAt)})]}),s.jsx("div",{className:"mb-2",children:w(e.rating)}),e.comment&&s.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:e.comment})]})]})},e.id))})]})}var m=a(95231);function p(){var e;let t=(0,i.useParams)(),a=t?.id?parseInt(t.id):0,[n,l]=(0,r.useState)(null),[d,p]=(0,r.useState)(!0);(0,r.useEffect)(()=>{a&&u()},[a]);let u=async()=>{try{let e=await fetch(`/api/products/${a}`);if(e.ok){let t=await e.json();l(t)}else l({id:a,name:`Sản phẩm #${a}`,description:"Th\xf4ng tin sản phẩm",price:0,image:"/images/default-product.jpg"})}catch(e){console.error("Error fetching product:",e),l({id:a,name:`Sản phẩm #${a}`,description:"Th\xf4ng tin sản phẩm",price:0,image:"/images/default-product.jpg"})}finally{p(!1)}};return d?(0,s.jsxs)("div",{className:"text-center py-12",children:[s.jsx("div",{className:"inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"}),s.jsx("p",{className:"mt-2",children:"Đang tải th\xf4ng tin sản phẩm..."})]}):n?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(o(),{children:[(0,s.jsxs)("title",{children:["Đ\xe1nh gi\xe1 - ",n.name," | Le Foin"]}),s.jsx("meta",{name:"description",content:`Đ\xe1nh gi\xe1 v\xe0 nhận x\xe9t về sản phẩm ${n.name} từ Le Foin`})]}),(0,s.jsxs)("div",{className:"max-w-4xl mx-auto px-4 py-8",children:[s.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8",children:(0,s.jsxs)("div",{className:"flex items-center gap-6",children:[s.jsx("div",{className:"flex-shrink-0",children:s.jsx("img",{src:n.image||"/images/default-product.jpg",alt:n.name,className:"w-24 h-24 object-cover rounded-lg"})}),(0,s.jsxs)("div",{className:"flex-1",children:[s.jsx("h1",{className:"text-2xl font-bold text-leaf mb-2",children:n.name}),n.description&&s.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-2",children:n.description}),n.category&&s.jsx("span",{className:"inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mb-2",children:n.category}),s.jsx("div",{className:"text-xl font-bold text-amber-600",children:(e=n.price,new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(e))})]}),s.jsx("div",{className:"flex-shrink-0",children:s.jsx("a",{href:`https://shopee.vn/search?keyword=${encodeURIComponent(n.name)}`,target:"_blank",rel:"noopener noreferrer",className:"bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors",children:"Mua tr\xean Shopee"})})]})}),s.jsx(m.Z,{productId:a}),s.jsx(c,{productId:a,productName:n.name})]})]}):(0,s.jsxs)("div",{className:"text-center py-12",children:[s.jsx("h1",{className:"text-2xl font-bold text-red-600 mb-4",children:"Kh\xf4ng t\xecm thấy sản phẩm"}),s.jsx("p",{className:"text-gray-600",children:"Sản phẩm bạn đang t\xecm kiếm kh\xf4ng tồn tại."})]})}},95231:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var s=a(95344),r=a(3729);function i({productId:e}){let[t,a]=(0,r.useState)(null),[i,n]=(0,r.useState)(!0);(0,r.useEffect)(()=>{o()},[e]);let o=async()=>{try{let t=e?`/api/reviews/stats?productId=${e}`:"/api/reviews/stats",s=await fetch(t);if(s.ok){let e=await s.json();a(e)}}catch(e){console.error("Error fetching review stats:",e)}finally{n(!1)}};return i?(0,s.jsxs)("div",{className:"text-center py-8",children:[s.jsx("div",{className:"inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"}),s.jsx("p",{className:"mt-2",children:"Đang tải thống k\xea..."})]}):t&&0!==t.totalReviews?(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",children:[s.jsx("h3",{className:"text-xl font-bold text-leaf mb-4",children:"Đ\xe1nh gi\xe1 từ kh\xe1ch h\xe0ng"}),(0,s.jsxs)("div",{className:"flex items-center gap-6 mb-6",children:[(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("div",{className:"text-3xl font-bold text-amber-600",children:t.averageRating}),s.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:"Điểm trung b\xecnh"})]}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(e=>{let t=Math.floor(e),a=e%1!=0;return s.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(e=>s.jsx("span",{className:"text-lg",children:e<=t?"⭐":e===t+1&&a?"⭐":"☆"},e))})})(Math.round(t.averageRating)),(0,s.jsxs)("span",{className:"text-sm text-gray-600 dark:text-gray-300",children:["(",t.totalReviews," đ\xe1nh gi\xe1)"]})]}),s.jsx("div",{className:"space-y-1",children:[5,4,3,2,1].map(e=>(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsxs)("span",{className:"text-sm w-8",children:[e,"⭐"]}),s.jsx("div",{className:"flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2",children:s.jsx("div",{className:"bg-amber-500 h-2 rounded-full",style:{width:`${t.totalReviews>0?t.ratingCounts[e]/t.totalReviews*100:0}%`}})}),s.jsx("span",{className:"text-sm text-gray-600 dark:text-gray-300 w-8",children:t.ratingCounts[e]})]},e))})]})]}),s.jsx("div",{className:"text-center",children:(0,s.jsxs)("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:["Dựa tr\xean ",t.totalReviews," đ\xe1nh gi\xe1 từ kh\xe1ch h\xe0ng thực tế"]})})]}):null}},53827:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>n});let s=(0,a(86843).createProxy)(String.raw`D:\websiteLeFoin_demo_gg\src\app\products\[id]\reviews\page.tsx`),{__esModule:r,$$typeof:i}=s,n=s.default},44669:(e,t,a)=>{"use strict";a.d(t,{x7:()=>ed,ZP:()=>ec,Am:()=>O});var s,r=a(3729);let i={data:""},n=e=>e||i,o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let a="",s="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+n+";":s+="f"==i[1]?c(n,i):i+"{"+c(n,"k"==i[1]?"":t)+"}":"object"==typeof n?s+=c(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(i,n):i+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+s},m={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e},u=(e,t,a,s,r)=>{let i=p(e),n=m[i]||(m[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!m[n]){let t=i!==e?e:(e=>{let t,a,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(a=t[3].replace(d," ").trim(),s.unshift(s[0][a]=s[0][a]||{})):s[0][t[1]]=t[2].replace(d," ").trim();return s[0]})(e);m[n]=c(r?{["@keyframes "+n]:t}:t,a?"":"."+n)}let u=a&&m.g?m.g:null;return a&&(m.g=m[n]),((e,t,a,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(m[n],t,s,u),n},g=(e,t,a)=>e.reduce((e,s,r)=>{let i=t[r];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function x(e){let t=this||{},a=e.call?e(t.p):e;return u(a.unshift?a.raw?g(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,n(t.target),t.g,t.o,t.k)}x.bind({g:1});let h,f,b,y=x.bind({k:1});function v(e,t){let a=this||{};return function(){let s=arguments;function r(i,n){let o=Object.assign({},i),l=o.className||r.className;a.p=Object.assign({theme:f&&f()},o),a.o=/ *go\d+/.test(l),o.className=x.apply(a,s)+(l?" "+l:""),t&&(o.ref=n);let d=e;return e[0]&&(d=o.as||e,delete o.as),b&&d[0]&&b(o),h(d,o)}return t?t(r):r}}var j=e=>"function"==typeof e,N=(e,t)=>j(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),_=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return _(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},E=[],P={toasts:[],pausedAt:void 0},$=e=>{P=_(P,e),E.forEach(e=>{e(P)})},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={})=>{let[t,a]=(0,r.useState)(P),s=(0,r.useRef)(P);(0,r.useEffect)(()=>(s.current!==P&&a(P),E.push(a),()=>{let e=E.indexOf(a);e>-1&&E.splice(e,1)}),[]);let i=t.toasts.map(t=>{var a,s,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...t,toasts:i}},D=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||w()}),R=e=>(t,a)=>{let s=D(t,e,a);return $({type:2,toast:s}),s.id},O=(e,t)=>R("blank")(e,t);O.error=R("error"),O.success=R("success"),O.loading=R("loading"),O.custom=R("custom"),O.dismiss=e=>{$({type:3,toastId:e})},O.remove=e=>$({type:4,toastId:e}),O.promise=(e,t,a)=>{let s=O.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?N(t.success,e):void 0;return r?O.success(r,{id:s,...a,...null==a?void 0:a.success}):O.dismiss(s),e}).catch(e=>{let r=t.error?N(t.error,e):void 0;r?O.error(r,{id:s,...a,...null==a?void 0:a.error}):O.dismiss(s)}),e};var A=(e,t)=>{$({type:1,toast:{id:e,height:t}})},I=()=>{$({type:5,time:Date.now()})},M=new Map,F=1e3,q=(e,t=F)=>{if(M.has(e))return;let a=setTimeout(()=>{M.delete(e),$({type:4,toastId:e})},t);M.set(e,a)},L=e=>{let{toasts:t,pausedAt:a}=S(e);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),s=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&O.dismiss(t.id);return}return setTimeout(()=>O.dismiss(t.id),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[t,a]);let s=(0,r.useCallback)(()=>{a&&$({type:6,time:Date.now()})},[a]),i=(0,r.useCallback)((e,a)=>{let{reverseOrder:s=!1,gutter:r=8,defaultPosition:i}=a||{},n=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...s?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[t]);return(0,r.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)q(e.id,e.removeDelay);else{let t=M.get(e.id);t&&(clearTimeout(t),M.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:A,startPause:I,endPause:s,calculateOffset:i}}},z=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Z=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,H=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${H} 1s linear infinite;
`,V=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,J=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,K=v("div")`
  position: absolute;
`,X=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Y=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return void 0!==t?"string"==typeof t?r.createElement(Q,null,t):t:"blank"===a?null:r.createElement(X,null,r.createElement(U,{...s}),"loading"!==a&&r.createElement(K,null,"error"===a?r.createElement(G,{...s}):r.createElement(J,{...s})))},ee=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,et=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,es=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,er=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ee(a),et(a)];return{animation:t?`${y(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=r.memo(({toast:e,position:t,style:a,children:s})=>{let i=e.height?er(e.position||t||"top-center",e.visible):{opacity:0},n=r.createElement(W,{toast:e}),o=r.createElement(es,{...e.ariaProps},N(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof s?s({icon:n,message:o}):r.createElement(r.Fragment,null,n,o))});s=r.createElement,c.p=void 0,h=s,f=void 0,b=void 0;var en=({id:e,className:t,style:a,onHeightUpdate:s,children:i})=>{let n=r.useCallback(t=>{if(t){let a=()=>{s(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return r.createElement("div",{ref:n,className:t,style:a},i)},eo=(e,t)=>{let a=e.includes("top"),s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...s}},el=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ed=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:i,containerStyle:n,containerClassName:o})=>{let{toasts:l,handlers:d}=L(a);return r.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:o,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(a=>{let n=a.position||t,o=eo(n,d.calculateOffset(a,{reverseOrder:e,gutter:s,defaultPosition:t}));return r.createElement(en,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?el:"",style:o},"custom"===a.type?N(a.message,a):i?i(a):r.createElement(ei,{toast:a,position:n}))}))},ec=O}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[1638,2659,2263],()=>a(23413));module.exports=s})();