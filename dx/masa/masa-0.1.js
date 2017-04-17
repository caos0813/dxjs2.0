(function (root, factory) {
    if (typeof define == "function" && typeof define.amd == "object"&&define.amd)
    {
        define(['jquery', 'lodash'], function ($,_) {
            return root['Masa'] = factory($, _);
        });
    }else
    {
        root['Masa'] = factory(root['jQuery'],root['_']);
    }
        
}(this, function () {
        
    return (function (modules) {
    	var installedModules = {};
       	function __webpack_require__(moduleId) {
       	    if (installedModules[moduleId]) {
       	        return installedModules[moduleId].exports;
       	    }
     		var module = installedModules[moduleId] = {exports: {},id: moduleId,loaded: false};
     		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
      	__webpack_require__.m = modules;
      	__webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
    })([
        function (module, exports, __webpack_require__)
        {
            module.exports = {



            };
        }
    ]);
}));