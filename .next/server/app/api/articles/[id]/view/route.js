"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/articles/[id]/view/route";
exports.ids = ["app/api/articles/[id]/view/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&page=%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute.ts&appDir=D%3A%5CwebsiteLeFoin%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CwebsiteLeFoin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&page=%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute.ts&appDir=D%3A%5CwebsiteLeFoin%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CwebsiteLeFoin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_websiteLeFoin_src_app_api_articles_id_view_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/articles/[id]/view/route.ts */ \"(rsc)/./src/app/api/articles/[id]/view/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/articles/[id]/view/route\",\n        pathname: \"/api/articles/[id]/view\",\n        filename: \"route\",\n        bundlePath: \"app/api/articles/[id]/view/route\"\n    },\n    resolvedPagePath: \"D:\\\\websiteLeFoin\\\\src\\\\app\\\\api\\\\articles\\\\[id]\\\\view\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_websiteLeFoin_src_app_api_articles_id_view_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/articles/[id]/view/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhcnRpY2xlcyUyRiU1QmlkJTVEJTJGdmlldyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYXJ0aWNsZXMlMkYlNUJpZCU1RCUyRnZpZXclMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhcnRpY2xlcyUyRiU1QmlkJTVEJTJGdmlldyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDd2Vic2l0ZUxlRm9pbiU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q3dlYnNpdGVMZUZvaW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0I7QUFDN0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUM2Sjs7QUFFN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZS1mb2luLz8zYzA5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXHdlYnNpdGVMZUZvaW5cXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXJ0aWNsZXNcXFxcW2lkXVxcXFx2aWV3XFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hcnRpY2xlcy9baWRdL3ZpZXcvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hcnRpY2xlcy9baWRdL3ZpZXdcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FydGljbGVzL1tpZF0vdmlldy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkQ6XFxcXHdlYnNpdGVMZUZvaW5cXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXJ0aWNsZXNcXFxcW2lkXVxcXFx2aWV3XFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FydGljbGVzL1tpZF0vdmlldy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&page=%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute.ts&appDir=D%3A%5CwebsiteLeFoin%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CwebsiteLeFoin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/articles/[id]/view/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/articles/[id]/view/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pages_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/pages/api/auth/[...nextauth] */ \"(rsc)/./src/pages/api/auth/[...nextauth].ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\nasync function POST(req, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_pages_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_1__.authOptions);\n        // Chỉ lưu lịch sử nếu user đã đăng nhập\n        if (!session?.user?.email) {\n            return new Response(JSON.stringify({\n                message: \"Not logged in\"\n            }), {\n                status: 200\n            });\n        }\n        const articleId = Number(params.id);\n        // Kiểm tra bài viết có tồn tại không\n        const article = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].article.findUnique({\n            where: {\n                id: articleId\n            }\n        });\n        if (!article) {\n            return new Response(JSON.stringify({\n                error: \"Article not found\"\n            }), {\n                status: 404\n            });\n        }\n        // Lấy user\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].user.findUnique({\n            where: {\n                email: session.user.email\n            }\n        });\n        if (!user) {\n            return new Response(JSON.stringify({\n                error: \"User not found\"\n            }), {\n                status: 404\n            });\n        }\n        // Lưu hoặc cập nhật lịch sử xem\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].articleView.upsert({\n            where: {\n                userId_articleId: {\n                    userId: user.id,\n                    articleId: articleId\n                }\n            },\n            update: {\n                viewedAt: new Date()\n            },\n            create: {\n                userId: user.id,\n                articleId: articleId,\n                viewedAt: new Date()\n            }\n        });\n        return new Response(JSON.stringify({\n            success: true\n        }), {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Error saving article view:\", error);\n        return new Response(JSON.stringify({\n            error: \"Internal server error\"\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hcnRpY2xlcy9baWRdL3ZpZXcvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDNkM7QUFDZ0I7QUFDM0I7QUFFM0IsZUFBZUcsS0FBS0MsR0FBZ0IsRUFBRSxFQUFFQyxNQUFNLEVBQThCO0lBQ2pGLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1OLDJEQUFnQkEsQ0FBQ0Msa0VBQVdBO1FBRWxELHdDQUF3QztRQUN4QyxJQUFJLENBQUNLLFNBQVNDLE1BQU1DLE9BQU87WUFDekIsT0FBTyxJQUFJQyxTQUFTQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVDLFNBQVM7WUFBZ0IsSUFBSTtnQkFBRUMsUUFBUTtZQUFJO1FBQ2xGO1FBRUEsTUFBTUMsWUFBWUMsT0FBT1YsT0FBT1csRUFBRTtRQUVsQyxxQ0FBcUM7UUFDckMsTUFBTUMsVUFBVSxNQUFNZixtREFBTUEsQ0FBQ2UsT0FBTyxDQUFDQyxVQUFVLENBQUM7WUFDOUNDLE9BQU87Z0JBQUVILElBQUlGO1lBQVU7UUFDekI7UUFFQSxJQUFJLENBQUNHLFNBQVM7WUFDWixPQUFPLElBQUlSLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztnQkFBRVMsT0FBTztZQUFvQixJQUFJO2dCQUFFUCxRQUFRO1lBQUk7UUFDcEY7UUFFQSxXQUFXO1FBQ1gsTUFBTU4sT0FBTyxNQUFNTCxtREFBTUEsQ0FBQ0ssSUFBSSxDQUFDVyxVQUFVLENBQUM7WUFDeENDLE9BQU87Z0JBQUVYLE9BQU9GLFFBQVFDLElBQUksQ0FBQ0MsS0FBSztZQUFDO1FBQ3JDO1FBRUEsSUFBSSxDQUFDRCxNQUFNO1lBQ1QsT0FBTyxJQUFJRSxTQUFTQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVTLE9BQU87WUFBaUIsSUFBSTtnQkFBRVAsUUFBUTtZQUFJO1FBQ2pGO1FBRUEsZ0NBQWdDO1FBQ2hDLE1BQU1YLG1EQUFNQSxDQUFDbUIsV0FBVyxDQUFDQyxNQUFNLENBQUM7WUFDOUJILE9BQU87Z0JBQ0xJLGtCQUFrQjtvQkFDaEJDLFFBQVFqQixLQUFLUyxFQUFFO29CQUNmRixXQUFXQTtnQkFDYjtZQUNGO1lBQ0FXLFFBQVE7Z0JBQ05DLFVBQVUsSUFBSUM7WUFDaEI7WUFDQUMsUUFBUTtnQkFDTkosUUFBUWpCLEtBQUtTLEVBQUU7Z0JBQ2ZGLFdBQVdBO2dCQUNYWSxVQUFVLElBQUlDO1lBQ2hCO1FBQ0Y7UUFFQSxPQUFPLElBQUlsQixTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRWtCLFNBQVM7UUFBSyxJQUFJO1lBQUVoQixRQUFRO1FBQUk7SUFDdkUsRUFBRSxPQUFPTyxPQUFPO1FBQ2RVLFFBQVFWLEtBQUssQ0FBQyw4QkFBOEJBO1FBQzVDLE9BQU8sSUFBSVgsU0FBU0MsS0FBS0MsU0FBUyxDQUFDO1lBQUVTLE9BQU87UUFBd0IsSUFBSTtZQUFFUCxRQUFRO1FBQUk7SUFDeEY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2xlLWZvaW4vLi9zcmMvYXBwL2FwaS9hcnRpY2xlcy9baWRdL3ZpZXcvcm91dGUudHM/YmEzMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCc7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdJztcclxuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCwgeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgaWQ6IHN0cmluZyB9IH0pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xyXG4gICAgXHJcbiAgICAvLyBDaOG7iSBsxrB1IGzhu4tjaCBz4butIG7hur91IHVzZXIgxJHDoyDEkcSDbmcgbmjhuq1wXHJcbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmVtYWlsKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnTm90IGxvZ2dlZCBpbicgfSksIHsgc3RhdHVzOiAyMDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXJ0aWNsZUlkID0gTnVtYmVyKHBhcmFtcy5pZCk7XHJcbiAgICBcclxuICAgIC8vIEtp4buDbSB0cmEgYsOgaSB2aeG6v3QgY8OzIHThu5NuIHThuqFpIGtow7RuZ1xyXG4gICAgY29uc3QgYXJ0aWNsZSA9IGF3YWl0IHByaXNtYS5hcnRpY2xlLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogYXJ0aWNsZUlkIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpZiAoIWFydGljbGUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnQXJ0aWNsZSBub3QgZm91bmQnIH0pLCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEzhuqV5IHVzZXJcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ1VzZXIgbm90IGZvdW5kJyB9KSwgeyBzdGF0dXM6IDQwNCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMxrB1IGhv4bq3YyBj4bqtcCBuaOG6rXQgbOG7i2NoIHPhu60geGVtXHJcbiAgICBhd2FpdCBwcmlzbWEuYXJ0aWNsZVZpZXcudXBzZXJ0KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICB1c2VySWRfYXJ0aWNsZUlkOiB7XHJcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICBhcnRpY2xlSWQ6IGFydGljbGVJZFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdXBkYXRlOiB7XHJcbiAgICAgICAgdmlld2VkQXQ6IG5ldyBEYXRlKClcclxuICAgICAgfSxcclxuICAgICAgY3JlYXRlOiB7XHJcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxyXG4gICAgICAgIGFydGljbGVJZDogYXJ0aWNsZUlkLFxyXG4gICAgICAgIHZpZXdlZEF0OiBuZXcgRGF0ZSgpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiB0cnVlIH0pLCB7IHN0YXR1czogMjAwIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgYXJ0aWNsZSB2aWV3OicsIGVycm9yKTtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSksIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJQT1NUIiwicmVxIiwicGFyYW1zIiwic2Vzc2lvbiIsInVzZXIiLCJlbWFpbCIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJhcnRpY2xlSWQiLCJOdW1iZXIiLCJpZCIsImFydGljbGUiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlcnJvciIsImFydGljbGVWaWV3IiwidXBzZXJ0IiwidXNlcklkX2FydGljbGVJZCIsInVzZXJJZCIsInVwZGF0ZSIsInZpZXdlZEF0IiwiRGF0ZSIsImNyZWF0ZSIsInN1Y2Nlc3MiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/articles/[id]/view/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQThDO0FBRTlDLE1BQU1DLGtCQUFrQkM7QUFJakIsTUFBTUMsU0FBU0YsZ0JBQWdCRSxNQUFNLElBQUksSUFBSUgsd0RBQVlBLEdBQUc7QUFFbkUsSUFBSUksSUFBeUIsRUFBY0gsZ0JBQWdCRSxNQUFNLEdBQUdBO0FBRXBFLGlFQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGUtZm9pbi8uL3NyYy9saWIvcHJpc21hLnRzPzAxZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcclxuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyAiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./src/pages/api/auth/[...nextauth].ts":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/facebook */ \"(rsc)/./node_modules/next-auth/providers/facebook.js\");\n/* harmony import */ var next_auth_providers_github__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/github */ \"(rsc)/./node_modules/next-auth/providers/github.js\");\n/* harmony import */ var next_auth_providers_linkedin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/providers/linkedin */ \"(rsc)/./node_modules/next-auth/providers/linkedin.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\n\n\n\n\nconst authOptions = {\n    // adapter: PrismaAdapter(prisma), // Bỏ comment nếu muốn lưu user vào DB\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_5__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                // Gọi API backend để xác thực user\n                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {\n                    method: \"POST\",\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    },\n                    body: JSON.stringify({\n                        email: credentials?.email,\n                        password: credentials?.password\n                    })\n                });\n                const user = await res.json();\n                if (res.ok && user) {\n                    return user;\n                }\n                return null;\n            }\n        }),\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID || \"\",\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET || \"\"\n        }),\n        (0,next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            clientId: process.env.FACEBOOK_CLIENT_ID || \"\",\n            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || \"\"\n        }),\n        (0,next_auth_providers_github__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            clientId: process.env.GITHUB_CLIENT_ID || \"\",\n            clientSecret: process.env.GITHUB_CLIENT_SECRET || \"\"\n        }),\n        (0,next_auth_providers_linkedin__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({\n            clientId: process.env.LINKEDIN_CLIENT_ID || \"\",\n            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || \"\"\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.firstName = user.firstName;\n                token.lastName = user.lastName;\n                token.avatar = user.avatar || token.avatar;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.firstName = token.firstName;\n                session.user.lastName = token.lastName;\n                // Truy vấn lại user từ database để lấy avatar mới nhất\n                const userDb = await _lib_prisma__WEBPACK_IMPORTED_MODULE_6__[\"default\"].user.findUnique({\n                    where: {\n                        email: session.user.email\n                    }\n                });\n                session.user.avatar = userDb?.avatar || token.avatar;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth\"\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ3VCO0FBQ0k7QUFDSjtBQUNJO0FBQ007QUFFaEM7QUFpQzNCLE1BQU1PLGNBQWM7SUFDekIseUVBQXlFO0lBQ3pFQyxXQUFXO1FBQ1RILDJFQUFtQkEsQ0FBQztZQUNsQkksTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVcsRUFBRU0sR0FBRztnQkFDOUIsbUNBQW1DO2dCQUNuQyxNQUFNQyxNQUFNLE1BQU1DLE1BQU0sQ0FBQyxFQUFFQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDcEVDLFFBQVE7b0JBQ1JDLFNBQVM7d0JBQUUsZ0JBQWdCO29CQUFtQjtvQkFDOUNDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQzt3QkFDbkJmLE9BQU9ELGFBQWFDO3dCQUNwQkcsVUFBVUosYUFBYUk7b0JBQ3pCO2dCQUNGO2dCQUNBLE1BQU1hLE9BQU8sTUFBTVYsSUFBSVcsSUFBSTtnQkFDM0IsSUFBSVgsSUFBSVksRUFBRSxJQUFJRixNQUFNO29CQUNsQixPQUFPQTtnQkFDVDtnQkFDQSxPQUFPO1lBQ1Q7UUFDRjtRQUNBMUIsc0VBQWNBLENBQUM7WUFDYjZCLFVBQVVYLFFBQVFDLEdBQUcsQ0FBQ1csZ0JBQWdCLElBQUk7WUFDMUNDLGNBQWNiLFFBQVFDLEdBQUcsQ0FBQ2Esb0JBQW9CLElBQUk7UUFDcEQ7UUFDQS9CLHdFQUFnQkEsQ0FBQztZQUNmNEIsVUFBVVgsUUFBUUMsR0FBRyxDQUFDYyxrQkFBa0IsSUFBSTtZQUM1Q0YsY0FBY2IsUUFBUUMsR0FBRyxDQUFDZSxzQkFBc0IsSUFBSTtRQUN0RDtRQUNBaEMsc0VBQWNBLENBQUM7WUFDYjJCLFVBQVVYLFFBQVFDLEdBQUcsQ0FBQ2dCLGdCQUFnQixJQUFJO1lBQzFDSixjQUFjYixRQUFRQyxHQUFHLENBQUNpQixvQkFBb0IsSUFBSTtRQUNwRDtRQUNBakMsd0VBQWdCQSxDQUFDO1lBQ2YwQixVQUFVWCxRQUFRQyxHQUFHLENBQUNrQixrQkFBa0IsSUFBSTtZQUM1Q04sY0FBY2IsUUFBUUMsR0FBRyxDQUFDbUIsc0JBQXNCLElBQUk7UUFDdEQ7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVqQixJQUFJLEVBQTZCO1lBQ2xELElBQUlBLE1BQU07Z0JBQ1JpQixNQUFNQyxFQUFFLEdBQUdsQixLQUFLa0IsRUFBRTtnQkFDbEJELE1BQU1FLElBQUksR0FBR25CLEtBQUttQixJQUFJO2dCQUN0QkYsTUFBTUcsU0FBUyxHQUFHcEIsS0FBS29CLFNBQVM7Z0JBQ2hDSCxNQUFNSSxRQUFRLEdBQUdyQixLQUFLcUIsUUFBUTtnQkFDOUJKLE1BQU1LLE1BQU0sR0FBR3RCLEtBQUtzQixNQUFNLElBQUlMLE1BQU1LLE1BQU07WUFDNUM7WUFDQSxPQUFPTDtRQUNUO1FBQ0EsTUFBTUosU0FBUSxFQUFFQSxPQUFPLEVBQUVJLEtBQUssRUFBZ0M7WUFDNUQsSUFBSUEsT0FBTztnQkFDVEosUUFBUWIsSUFBSSxDQUFDa0IsRUFBRSxHQUFHRCxNQUFNQyxFQUFFO2dCQUMxQkwsUUFBUWIsSUFBSSxDQUFDbUIsSUFBSSxHQUFHRixNQUFNRSxJQUFJO2dCQUM5Qk4sUUFBUWIsSUFBSSxDQUFDb0IsU0FBUyxHQUFHSCxNQUFNRyxTQUFTO2dCQUN4Q1AsUUFBUWIsSUFBSSxDQUFDcUIsUUFBUSxHQUFHSixNQUFNSSxRQUFRO2dCQUN0Qyx1REFBdUQ7Z0JBQ3ZELE1BQU1FLFNBQVMsTUFBTTVDLG1EQUFNQSxDQUFDcUIsSUFBSSxDQUFDd0IsVUFBVSxDQUFDO29CQUFFQyxPQUFPO3dCQUFFekMsT0FBTzZCLFFBQVFiLElBQUksQ0FBQ2hCLEtBQUs7b0JBQUM7Z0JBQUU7Z0JBQ25GNkIsUUFBUWIsSUFBSSxDQUFDc0IsTUFBTSxHQUFHQyxRQUFRRCxVQUFVTCxNQUFNSyxNQUFNO1lBQ3REO1lBQ0EsT0FBT1Q7UUFDVDtJQUNGO0lBQ0FhLE9BQU87UUFDTEMsUUFBUTtJQUNWO0FBQ0YsRUFBRTtBQUVGLE1BQU1DLFVBQVV2RCxnREFBUUEsQ0FBQ087QUFDekIsaUVBQWVnRCxPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGUtZm9pbi8uL3NyYy9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzPzUwYTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSc7XHJcbmltcG9ydCBGYWNlYm9va1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZmFjZWJvb2snO1xyXG5pbXBvcnQgR2l0aHViUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9naXRodWInO1xyXG5pbXBvcnQgTGlua2VkSW5Qcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2xpbmtlZGluJztcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBTZXNzaW9uU3RyYXRlZ3kgfSBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcclxuXHJcbi8vIEV4dGVuZCBOZXh0QXV0aCB0eXBlc1xyXG5kZWNsYXJlIG1vZHVsZSBcIm5leHQtYXV0aFwiIHtcclxuICBpbnRlcmZhY2UgU2Vzc2lvbiB7XHJcbiAgICB1c2VyOiB7XHJcbiAgICAgIGlkPzogc3RyaW5nO1xyXG4gICAgICBlbWFpbD86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgIHJvbGU/OiBzdHJpbmc7XHJcbiAgICAgIGZpcnN0TmFtZT86IHN0cmluZztcclxuICAgICAgbGFzdE5hbWU/OiBzdHJpbmc7XHJcbiAgICAgIG5hbWU/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICBpbWFnZT86IHN0cmluZyB8IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGludGVyZmFjZSBVc2VyIHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgcm9sZTogc3RyaW5nO1xyXG4gICAgZmlyc3ROYW1lPzogc3RyaW5nO1xyXG4gICAgbGFzdE5hbWU/OiBzdHJpbmc7XHJcbiAgfVxyXG59XHJcblxyXG5kZWNsYXJlIG1vZHVsZSBcIm5leHQtYXV0aC9qd3RcIiB7XHJcbiAgaW50ZXJmYWNlIEpXVCB7XHJcbiAgICBpZD86IHN0cmluZztcclxuICAgIHJvbGU/OiBzdHJpbmc7XHJcbiAgICBmaXJzdE5hbWU/OiBzdHJpbmc7XHJcbiAgICBsYXN0TmFtZT86IHN0cmluZztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcclxuICAvLyBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksIC8vIELhu48gY29tbWVudCBu4bq/dSBtdeG7kW4gbMawdSB1c2VyIHbDoG8gREJcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzLCByZXEpIHtcclxuICAgICAgICAvLyBH4buNaSBBUEkgYmFja2VuZCDEkeG7gyB4w6FjIHRo4buxYyB1c2VyXHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuTkVYVEFVVEhfVVJMfS9hcGkvYXV0aC9sb2dpbmAsIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHM/LmVtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogY3JlZGVudGlhbHM/LnBhc3N3b3JkLFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlcy5vayAmJiB1c2VyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCB8fCAnJyxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcclxuICAgIH0pLFxyXG4gICAgRmFjZWJvb2tQcm92aWRlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19DTElFTlRfSUQgfHwgJycsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcclxuICAgIH0pLFxyXG4gICAgR2l0aHViUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR0lUSFVCX0NMSUVOVF9JRCB8fCAnJyxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HSVRIVUJfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcclxuICAgIH0pLFxyXG4gICAgTGlua2VkSW5Qcm92aWRlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5MSU5LRURJTl9DTElFTlRfSUQgfHwgJycsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuTElOS0VESU5fQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6ICdqd3QnIGFzIFNlc3Npb25TdHJhdGVneSxcclxuICB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfTogeyB0b2tlbjogYW55OyB1c2VyOiBhbnkgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlO1xyXG4gICAgICAgIHRva2VuLmZpcnN0TmFtZSA9IHVzZXIuZmlyc3ROYW1lO1xyXG4gICAgICAgIHRva2VuLmxhc3ROYW1lID0gdXNlci5sYXN0TmFtZTtcclxuICAgICAgICB0b2tlbi5hdmF0YXIgPSB1c2VyLmF2YXRhciB8fCB0b2tlbi5hdmF0YXI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9OiB7IHNlc3Npb246IGFueTsgdG9rZW46IGFueSB9KSB7XHJcbiAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZztcclxuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgc3RyaW5nO1xyXG4gICAgICAgIHNlc3Npb24udXNlci5maXJzdE5hbWUgPSB0b2tlbi5maXJzdE5hbWUgYXMgc3RyaW5nO1xyXG4gICAgICAgIHNlc3Npb24udXNlci5sYXN0TmFtZSA9IHRva2VuLmxhc3ROYW1lIGFzIHN0cmluZztcclxuICAgICAgICAvLyBUcnV5IHbhuqVuIGzhuqFpIHVzZXIgdOG7qyBkYXRhYmFzZSDEkeG7gyBs4bqleSBhdmF0YXIgbeG7m2kgbmjhuqV0XHJcbiAgICAgICAgY29uc3QgdXNlckRiID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwgfSB9KTtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuYXZhdGFyID0gdXNlckRiPy5hdmF0YXIgfHwgdG9rZW4uYXZhdGFyIGFzIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiAnL2F1dGgnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyOyAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIkZhY2Vib29rUHJvdmlkZXIiLCJHaXRodWJQcm92aWRlciIsIkxpbmtlZEluUHJvdmlkZXIiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwicmVxIiwicmVzIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfVVJMIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlciIsImpzb24iLCJvayIsImNsaWVudElkIiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwiRkFDRUJPT0tfQ0xJRU5UX0lEIiwiRkFDRUJPT0tfQ0xJRU5UX1NFQ1JFVCIsIkdJVEhVQl9DTElFTlRfSUQiLCJHSVRIVUJfQ0xJRU5UX1NFQ1JFVCIsIkxJTktFRElOX0NMSUVOVF9JRCIsIkxJTktFRElOX0NMSUVOVF9TRUNSRVQiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImlkIiwicm9sZSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiYXZhdGFyIiwidXNlckRiIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwicGFnZXMiLCJzaWduSW4iLCJoYW5kbGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/yallist","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&page=%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Farticles%2F%5Bid%5D%2Fview%2Froute.ts&appDir=D%3A%5CwebsiteLeFoin%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CwebsiteLeFoin&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();