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
exports.id = "app/api/auth/session/route";
exports.ids = ["app/api/auth/session/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsession%2Froute&page=%2Fapi%2Fauth%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsession%2Froute.ts&appDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsession%2Froute&page=%2Fapi%2Fauth%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsession%2Froute.ts&appDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var _Users_gh0zi0_Desktop_Projects_GitHub_erbilcarrental_nextjs_app_api_auth_session_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/api/auth/session/route.ts */ \"(rsc)/./app/api/auth/session/route.ts\");\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/session/route\",\n        pathname: \"/api/auth/session\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/session/route\"\n    },\n    resolvedPagePath: \"/Users/gh0zi0/Desktop/Projects/GitHub/erbilcarrental.nextjs/app/api/auth/session/route.ts\",\n    nextConfigOutput,\n    userland: _Users_gh0zi0_Desktop_Projects_GitHub_erbilcarrental_nextjs_app_api_auth_session_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/session/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGc2Vzc2lvbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYXV0aCUyRnNlc3Npb24lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdXRoJTJGc2Vzc2lvbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmdoMHppMCUyRkRlc2t0b3AlMkZQcm9qZWN0cyUyRkdpdEh1YiUyRmVyYmlsY2FycmVudGFsLm5leHRqcyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZnaDB6aTAlMkZEZXNrdG9wJTJGUHJvamVjdHMlMkZHaXRIdWIlMkZlcmJpbGNhcnJlbnRhbC5uZXh0anMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ3VEO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ2lKOztBQUVqSiIsInNvdXJjZXMiOlsid2VicGFjazovL21vdG9yeC8/YzBhZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZ2gwemkwL0Rlc2t0b3AvUHJvamVjdHMvR2l0SHViL2VyYmlsY2FycmVudGFsLm5leHRqcy9hcHAvYXBpL2F1dGgvc2Vzc2lvbi9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9zZXNzaW9uL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9zZXNzaW9uXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL3Nlc3Npb24vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvZ2gwemkwL0Rlc2t0b3AvUHJvamVjdHMvR2l0SHViL2VyYmlsY2FycmVudGFsLm5leHRqcy9hcHAvYXBpL2F1dGgvc2Vzc2lvbi9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL3Nlc3Npb24vcm91dGVcIjtcbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsession%2Froute&page=%2Fapi%2Fauth%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsession%2Froute.ts&appDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/session/route.ts":
/*!***************************************!*\
  !*** ./app/api/auth/session/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"(rsc)/./node_modules/firebase/firestore/dist/index.mjs\");\n/* harmony import */ var _app_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/firebase */ \"(rsc)/./app/firebase.js\");\n\n\n\nasync function POST(request) {\n    try {\n        const { user } = await request.json();\n        if (!user || !user.uid) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Invalid user data\"\n            }, {\n                status: 400\n            });\n        }\n        // Get user role from Firestore\n        const userDoc = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_app_firebase__WEBPACK_IMPORTED_MODULE_2__.db, \"users\", user.uid));\n        const role = userDoc.exists() ? userDoc.data().role || \"user\" : \"user\";\n        // Create response with session data\n        const response = next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            role\n        });\n        // Set a session cookie with the user's ID\n        response.cookies.set({\n            name: \"session\",\n            value: user.uid,\n            maxAge: 60 * 60 * 24 * 5,\n            httpOnly: false,\n            secure: true,\n            path: \"/\",\n            sameSite: \"none\"\n        });\n        return response;\n    } catch (error) {\n        console.error(\"Session creation error:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Failed to create session\"\n        }, {\n            status: 401\n        });\n    }\n}\nasync function DELETE() {\n    const response = next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n        status: \"success\"\n    });\n    response.cookies.set({\n        name: \"session\",\n        value: \"\",\n        maxAge: 0,\n        httpOnly: false,\n        secure: true,\n        path: \"/\",\n        sameSite: \"none\"\n    });\n    return response;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvc2Vzc2lvbi9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNNO0FBQ2I7QUFFN0IsZUFBZUksS0FBS0MsT0FBZ0I7SUFDdkMsSUFBSTtRQUNBLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTUQsUUFBUUUsSUFBSTtRQUVuQyxJQUFJLENBQUNELFFBQVEsQ0FBQ0EsS0FBS0UsR0FBRyxFQUFFO1lBQ3BCLE9BQU9SLGtGQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVFLE9BQU87WUFBb0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzNFO1FBRUEsK0JBQStCO1FBQy9CLE1BQU1DLFVBQVUsTUFBTVYsMERBQU1BLENBQUNDLHVEQUFHQSxDQUFDQyw2Q0FBRUEsRUFBRSxTQUFTRyxLQUFLRSxHQUFHO1FBQ3RELE1BQU1JLE9BQU9ELFFBQVFFLE1BQU0sS0FBS0YsUUFBUUcsSUFBSSxHQUFHRixJQUFJLElBQUksU0FBUztRQUVoRSxvQ0FBb0M7UUFDcEMsTUFBTUcsV0FBV2Ysa0ZBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFSztRQUFLO1FBRTFDLDBDQUEwQztRQUMxQ0csU0FBU0MsT0FBTyxDQUFDQyxHQUFHLENBQUM7WUFDakJDLE1BQU07WUFDTkMsT0FBT2IsS0FBS0UsR0FBRztZQUNmWSxRQUFRLEtBQUssS0FBSyxLQUFLO1lBQ3ZCQyxVQUFVO1lBQ1ZDLFFBQVE7WUFDUkMsTUFBTTtZQUNOQyxVQUFVO1FBQ2Q7UUFFQSxPQUFPVDtJQUNYLEVBQUUsT0FBT04sT0FBTztRQUNaZ0IsUUFBUWhCLEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU9ULGtGQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRUUsT0FBTztRQUEyQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNsRjtBQUNKO0FBRU8sZUFBZWdCO0lBQ2xCLE1BQU1YLFdBQVdmLGtGQUFZQSxDQUFDTyxJQUFJLENBQUM7UUFBRUcsUUFBUTtJQUFVO0lBRXZESyxTQUFTQyxPQUFPLENBQUNDLEdBQUcsQ0FBQztRQUNqQkMsTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLE1BQU07UUFDTkMsVUFBVTtJQUNkO0lBRUEsT0FBT1Q7QUFDWCIsInNvdXJjZXMiOlsid2VicGFjazovL21vdG9yeC8uL2FwcC9hcGkvYXV0aC9zZXNzaW9uL3JvdXRlLnRzP2EyYWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0RG9jLCBkb2MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2FwcC9maXJlYmFzZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnVpZCkge1xuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIHVzZXIgZGF0YScgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB1c2VyIHJvbGUgZnJvbSBGaXJlc3RvcmVcbiAgICAgICAgY29uc3QgdXNlckRvYyA9IGF3YWl0IGdldERvYyhkb2MoZGIsICd1c2VycycsIHVzZXIudWlkKSk7XG4gICAgICAgIGNvbnN0IHJvbGUgPSB1c2VyRG9jLmV4aXN0cygpID8gdXNlckRvYy5kYXRhKCkucm9sZSB8fCAndXNlcicgOiAndXNlcic7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHJlc3BvbnNlIHdpdGggc2Vzc2lvbiBkYXRhXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLmpzb24oeyByb2xlIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gU2V0IGEgc2Vzc2lvbiBjb29raWUgd2l0aCB0aGUgdXNlcidzIElEXG4gICAgICAgIHJlc3BvbnNlLmNvb2tpZXMuc2V0KHtcbiAgICAgICAgICAgIG5hbWU6ICdzZXNzaW9uJyxcbiAgICAgICAgICAgIHZhbHVlOiB1c2VyLnVpZCxcbiAgICAgICAgICAgIG1heEFnZTogNjAgKiA2MCAqIDI0ICogNSwgLy8gNSBkYXlzXG4gICAgICAgICAgICBodHRwT25seTogZmFsc2UsXG4gICAgICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgICAgICBwYXRoOiAnLycsXG4gICAgICAgICAgICBzYW1lU2l0ZTogJ25vbmUnLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU2Vzc2lvbiBjcmVhdGlvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGNyZWF0ZSBzZXNzaW9uJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURSgpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IE5leHRSZXNwb25zZS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycgfSk7XG4gICAgXG4gICAgcmVzcG9uc2UuY29va2llcy5zZXQoe1xuICAgICAgICBuYW1lOiAnc2Vzc2lvbicsXG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgbWF4QWdlOiAwLFxuICAgICAgICBodHRwT25seTogZmFsc2UsXG4gICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgcGF0aDogJy8nLFxuICAgICAgICBzYW1lU2l0ZTogJ25vbmUnLFxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXNwb25zZTtcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldERvYyIsImRvYyIsImRiIiwiUE9TVCIsInJlcXVlc3QiLCJ1c2VyIiwianNvbiIsInVpZCIsImVycm9yIiwic3RhdHVzIiwidXNlckRvYyIsInJvbGUiLCJleGlzdHMiLCJkYXRhIiwicmVzcG9uc2UiLCJjb29raWVzIiwic2V0IiwibmFtZSIsInZhbHVlIiwibWF4QWdlIiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJwYXRoIiwic2FtZVNpdGUiLCJjb25zb2xlIiwiREVMRVRFIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/session/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/firebase.js":
/*!*************************!*\
  !*** ./app/firebase.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   storage: () => (/* binding */ storage)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"(rsc)/./node_modules/firebase/app/dist/index.mjs\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"(rsc)/./node_modules/firebase/auth/dist/index.mjs\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/storage */ \"(rsc)/./node_modules/firebase/storage/dist/index.mjs\");\n/* harmony import */ var _firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @firebase/firestore */ \"(rsc)/./node_modules/@firebase/firestore/dist/index.node.mjs\");\n\n\n\n\n\n// Corrected storageBucket URL\nconst firebaseConfig = {\n    apiKey: \"AIzaSyAc70bPjm4H43-lFNE0337L9u3eGG6MSQ0\",\n    authDomain: \"erbilcarrentalnet.firebaseapp.com\",\n    projectId: \"erbilcarrentalnet\",\n    storageBucket: \"erbilcarrentalnet.firebasestorage.app\",\n    messagingSenderId: \"981983743725\",\n    appId: \"1:981983743725:web:610d86c1d80ecc00afc6e4\",\n    measurementId: \"G-46KX3GXKX3\"\n};\n// Initialize Firebase\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst db = (0,_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getFirestore)(app);\nconst storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getStorage)(app);\n// Enable Firestore offline persistence\n(0,_firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.enableIndexedDbPersistence)(db).catch((err)=>{\n    if (err.code === \"failed-precondition\") {\n        console.error(\"Multiple tabs open, persistence can only be enabled in one tab at a time.\");\n    } else if (err.code === \"unimplemented\") {\n        console.error(\"The current browser does not support all of the features required to enable persistence.\");\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvZmlyZWJhc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE2QztBQUNMO0FBQ007QUFDa0M7QUFDdEQ7QUFDMUIsOEJBQThCO0FBQzlCLE1BQU1LLGlCQUFpQjtJQUNyQkMsUUFBUTtJQUNSQyxZQUFZO0lBQ1pDLFdBQVc7SUFDWEMsZUFBZTtJQUNmQyxtQkFBbUI7SUFDbkJDLE9BQU87SUFDUEMsZUFBZTtBQUNqQjtBQUVBLHNCQUFzQjtBQUN0QixNQUFNQyxNQUFNYiwyREFBYUEsQ0FBQ0s7QUFDbkIsTUFBTVMsT0FBT2Isc0RBQU9BLENBQUNZLEtBQUs7QUFDMUIsTUFBTUUsS0FBS1osaUVBQVlBLENBQUNVLEtBQUs7QUFDN0IsTUFBTUcsVUFBVWQsNERBQVVBLENBQUNXLEtBQUs7QUFFdkMsdUNBQXVDO0FBQ3ZDVCwrRUFBMEJBLENBQUNXLElBQUlFLEtBQUssQ0FBQyxDQUFDQztJQUNwQyxJQUFJQSxJQUFJQyxJQUFJLEtBQUssdUJBQXVCO1FBQ3RDQyxRQUFRQyxLQUFLLENBQ1g7SUFFSixPQUFPLElBQUlILElBQUlDLElBQUksS0FBSyxpQkFBaUI7UUFDdkNDLFFBQVFDLEtBQUssQ0FDWDtJQUVKO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb3RvcngvLi9hcHAvZmlyZWJhc2UuanM/MzEzYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XG5pbXBvcnQgeyBnZXRTdG9yYWdlIH0gZnJvbSBcImZpcmViYXNlL3N0b3JhZ2VcIjtcbmltcG9ydCB7IGdldEZpcmVzdG9yZSAsIGVuYWJsZUluZGV4ZWREYlBlcnNpc3RlbmNlIH0gZnJvbSBcIkBmaXJlYmFzZS9maXJlc3RvcmVcIjtcbmltcG9ydCBcImZpcmViYXNlL3N0b3JhZ2VcIjtcbi8vIENvcnJlY3RlZCBzdG9yYWdlQnVja2V0IFVSTFxuY29uc3QgZmlyZWJhc2VDb25maWcgPSB7XG4gIGFwaUtleTogXCJBSXphU3lBYzcwYlBqbTRINDMtbEZORTAzMzdMOXUzZUdHNk1TUTBcIixcbiAgYXV0aERvbWFpbjogXCJlcmJpbGNhcnJlbnRhbG5ldC5maXJlYmFzZWFwcC5jb21cIixcbiAgcHJvamVjdElkOiBcImVyYmlsY2FycmVudGFsbmV0XCIsXG4gIHN0b3JhZ2VCdWNrZXQ6IFwiZXJiaWxjYXJyZW50YWxuZXQuZmlyZWJhc2VzdG9yYWdlLmFwcFwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCI5ODE5ODM3NDM3MjVcIixcbiAgYXBwSWQ6IFwiMTo5ODE5ODM3NDM3MjU6d2ViOjYxMGQ4NmMxZDgwZWNjMDBhZmM2ZTRcIixcbiAgbWVhc3VyZW1lbnRJZDogXCJHLTQ2S1gzR1hLWDNcIlxufTtcblxuLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxuY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XG5leHBvcnQgY29uc3QgYXV0aCA9IGdldEF1dGgoYXBwKTtcbmV4cG9ydCBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xuZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKGFwcCk7XG5cbi8vIEVuYWJsZSBGaXJlc3RvcmUgb2ZmbGluZSBwZXJzaXN0ZW5jZVxuZW5hYmxlSW5kZXhlZERiUGVyc2lzdGVuY2UoZGIpLmNhdGNoKChlcnIpID0+IHtcbiAgaWYgKGVyci5jb2RlID09PSBcImZhaWxlZC1wcmVjb25kaXRpb25cIikge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBcIk11bHRpcGxlIHRhYnMgb3BlbiwgcGVyc2lzdGVuY2UgY2FuIG9ubHkgYmUgZW5hYmxlZCBpbiBvbmUgdGFiIGF0IGEgdGltZS5cIlxuICAgICk7XG4gIH0gZWxzZSBpZiAoZXJyLmNvZGUgPT09IFwidW5pbXBsZW1lbnRlZFwiKSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIFwiVGhlIGN1cnJlbnQgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFsbCBvZiB0aGUgZmVhdHVyZXMgcmVxdWlyZWQgdG8gZW5hYmxlIHBlcnNpc3RlbmNlLlwiXG4gICAgKTtcbiAgfVxufSk7XG4iXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUFwcCIsImdldEF1dGgiLCJnZXRTdG9yYWdlIiwiZ2V0RmlyZXN0b3JlIiwiZW5hYmxlSW5kZXhlZERiUGVyc2lzdGVuY2UiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsIm1lYXN1cmVtZW50SWQiLCJhcHAiLCJhdXRoIiwiZGIiLCJzdG9yYWdlIiwiY2F0Y2giLCJlcnIiLCJjb2RlIiwiY29uc29sZSIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/firebase.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@firebase","vendor-chunks/@grpc","vendor-chunks/firebase","vendor-chunks/protobufjs","vendor-chunks/long","vendor-chunks/@protobufjs","vendor-chunks/tslib","vendor-chunks/lodash.camelcase","vendor-chunks/idb"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsession%2Froute&page=%2Fapi%2Fauth%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsession%2Froute.ts&appDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fgh0zi0%2FDesktop%2FProjects%2FGitHub%2Ferbilcarrental.nextjs&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();