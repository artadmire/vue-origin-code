/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    class Vue {\n        constructor(options) {\n            // 获取到根元素\n            this.el = document.querySelector(options.el) // #root\n            // 获取到数据\n            this.data = options.data\n            // 收集数据和订阅者，每一个数据都有很多个订阅者 myText: [订阅者1, 订阅者2, 订阅者3]\n            this._derective = {}\n            // 调用函数\n            this.Observer(this.data)\n            this.Compile(this.el)\n        }\n        // 负责劫持数据\n        Observer(data) {\n            console.log(data)\n            for(let key in data) {\n                this._derective[key] = []\n                const value = data[key]\n                const watch = this._derective[key]\n                Object.defineProperty(data, key, {\n                    get: () => value,\n                    set: (newValue) => {\n                        if(newValue !== value) {\n                            watch.forEatch(watcher => {\n                                // watcher是订阅实例\n                                watcher.undate()\n                            })\n                        }\n                    }\n                }) \n            }\n            // 劫持数据 更新实图\n            \n        }\n        // 负债解析指令 发布订阅者\n        Compile(el) {\n            console.log(el, 'el')\n            // 找到根元素下面所有的子节点\n            let nodesArr = el.children\n            console.log(nodesArr, 'nodesArr')\n            for(let i = 0, length = nodesArr.length; i < length; i++) {\n                // 如果每个字节点下面还有节点，需要再走一遍这个函数，这里用到了递归\n                if(nodesArr[i].children && nodesArr[i].children.length>0) {\n                    // 这里用递归处理\n                    this.Compile(nodesArr[i])\n                }\n                // node是当前元素 先查当前元素有没有指令属性，再取属性的值 然后发布订阅者\n                if(nodesArr[i].hasAttribute('v-text')) {\n                    const atrributeValue = nodesArr[i].getAttribute('v-text')\n                    const dataValue = this.data[atrributeValue]\n                    // 发布订阅者 生成下面格式的数据，每一个订阅者 都是一个使用了该数据的元素。 收集所有的订阅者\n                   // {myText: [订阅者1, 订阅者2, 订阅者3], myBox: [订阅者1, 订阅者2, 订阅者3]}\n                    this._derective[atrributeValue].push(new Watcher(nodesArr[i], this, dataValue, 'innerHTML'))\n                }\n                if(nodesArr[i].hasAttribute('v-model')) {\n                    const atrributeValue = nodesArr[i].getAttribute('v-model')\n                    const dataValue = this.data[atrributeValue]\n                    this._derective[atrributeValue].push(new Watcher(nodesArr[i], this, dataValue, 'value'))\n                }\n            }\n        }\n    }\n    // 订阅者 主要作用是更新试图\n    class Watcher {\n        constructor(el, vm, value, op) {\n            this.el = el\n            this.vm = vm\n            this.value = value\n            this.op = op\n            this.update()\n        }\n        update() {\n            this.el[this.op] = this.value\n        }\n    }\n    new Vue({\n        el: '#root',\n        data:{\n            myText: \"我是vue的数据双向绑定\",\n            myBox: \"我是vue的另外一个数据双向绑定\"\n        }\n    })\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });