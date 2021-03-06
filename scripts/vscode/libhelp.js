(function () {
    function applyDoc(obj, docMethods) {
        if (obj) {
            for (var m in docMethods) {
                var docm = docMethods[m];
                if (typeof docm != "function")
                    continue;
                var original = obj[m];
                if (original && typeof original == "function") {
                    original._$doc = docm;
                }
            }
            _$nonRemovable(obj);
        }
    }

    function applyHooks(obj, type, docMethods) {
        var createHook = typeof type == "function" ? 
            function (original, doc) {
                function hook() {
                    var result = original.apply(this, arguments);
                    if (result === null)
                        return _$getTrackingNull(new type());
                    else if(result === undefined)
                        return _$getTrackingUndefined(new type());
                    else if (typeof result == "object" && result._$isExceptionObject)
                        return new type();
                    return result;
                } 
                hook._$doc = doc;
                return hook;
            } :
            function (original, doc) {
                function hook() {
                    var result = original.apply(this, arguments);
                    if (result === null)
                        return _$getTrackingNull(type);
                    else if(result === undefined)
                        return _$getTrackingUndefined(type);
                    else if (typeof result == "object" && result._$isExceptionObject)
                        return type;
                    return result;
                } 
                hook._$doc = doc;
                return hook;
            };
        for (var m in docMethods) {
            var docm = docMethods[m];
            if (typeof docm != "function")
                continue;
            var original = obj[m];
            if (original && typeof original == "function") 
                obj[m] = createHook(original, docm);
        }
        _$nonRemovable(obj);
    }

    // RegExp object    
    applyDoc(RegExp.prototype, {
        exec: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <returns type="Array" />
            /// </signature>
        },
        compile: function () {
            /// <signature>
            ///     <param name="pattern" type="RegExp" />
            ///     <param name="flags" type="String" optional="true" />
            ///     <returns type="RegExp" />
            /// </signature>
        },
        test: function (string) {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        }
    });

    applyDoc(JSON, {
        parse: function () {
            /// <signature>
            ///     <param name="text" type="String" />
            ///     <param name="reviver" type="Function" optional="true" />
            /// </signature>
        },
        stringify: function () {
            /// <signature>
            ///     <param name="value" />
            ///     <param name="replacer" optional="true" />
            ///     <param name="space" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        }
    });

    // Object prototype
    applyDoc(Object.prototype, {
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        valueOf: function () {
            /// <signature>
            /// </signature>
        },
        hasOwnProperty: function () {
            /// <signature>
            ///     <param name="V" type="String" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        isPrototypeOf: function () {
            /// <signature>
            ///     <param name="V" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        propertyIsEnumerable: function () {
            /// <signature>
            ///     <param name="V" type="String" />
            ///     <returns type="Boolean" />
            /// </signature>
        }
    });

    // Array prototype
    applyDoc(Array.prototype, {
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        concat: function () {
            /// <signature>
            ///     <param name="..." optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        copyWithin: function () {
            /// <signature>
            ///     <param name="target" type="Number" />
            ///     <param name="start" type="Number" />
            ///     <param name="end" type="Number" optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        entries: function() {
            /// <signature>
            ///     <returns type="Object" />
            /// </signature>
        },
        values: function() {
            /// <signature>
            ///     <returns type="Object" />
            /// </signature>
        },
        fill: function () {
            /// <signature>
            ///     <param name="value" />
            ///     <param name="start" type="Number" optional="true" />
            ///     <param name="end" type="Number" optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        join: function () {
            /// <signature>
            ///     <param name="separator" type="String" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        pop: function () {
            /// <signature>
            /// </signature>
        },
        push: function () {
            /// <signature>
            ///     <param name="..." optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        reverse: function () {
            /// <signature>
            ///     <returns type="Array" />
            /// </signature>
        },
        shift: function () {
            /// <signature>
            /// </signature>
        },
        slice: function () {
            /// <signature>
            ///     <param name="start" type="Number" />
            ///     <param name="end" type="Number" />
            ///     <returns type="Array" />
            /// </signature>
        },
        sort: function () {
            /// <signature>
            ///     <param name="comparefn" type="Function" />
            ///     <returns type="Array" />
            /// </signature>
        },
        splice: function () {
            /// <signature>
            ///     <param name="start" type="Number" />
            ///     <param name="deleteCount" type="Number" />
            ///     <param name="..." optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        unshift: function () {
            /// <signature>
            ///     <param name="..." optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        indexOf: function () {
            /// <signature>
            ///     <param name="searchElement" />
            ///     <param name="fromIndex" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        lastIndexOf: function () {
            /// <signature>
            ///     <param name="searchElement" />
            ///     <param name="fromIndex" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        every: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        some: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        forEach: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            /// </signature>
        },
        map: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        filter: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        find: function() {
            /// <signature>
            ///     <param name="predicate" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            /// </signature>
        },
        findIndex: function() {
            /// <signature>
            ///     <param name="predicate" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        keys: function() {
            /// <signature>
            ///     <returns type="Object" />
            /// </signature>
        },
        reduce: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="previousValue" />
            ///             <param name="currentValue" />
            ///             <param name="currentIndex" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="initialValue" optional="true"/>
            /// </signature>
        },
        reduceRight: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="previousValue" />
            ///             <param name="currentValue" />
            ///             <param name="currentIndex" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="initialValue" optional="true"/>
            /// </signature>
        }
    });

    // String prototype
    applyDoc(String.prototype, {
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        valueOf: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        charAt: function () {
            /// <signature>
            ///     <param name="pos" type="Number" />
            ///     <returns type="String" />
            /// </signature>
        },
        charCodeAt: function () {
            /// <signature>
            ///     <param name="pos" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        codePointAt: function () {
            /// <signature>
            ///     <param name="pos" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        concat: function () {
            /// <signature>
            ///     <param name="..." type="String" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        includes: function () {
            /// <signature>
            ///     <param name="searchString" type="String" />
            ///     <param name="position" type="Number" optional="true" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        endsWith: function () {
            /// <signature>
            ///     <param name="searchString" type="String" />
            ///     <param name="endPosition" type="Number" optional="true" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        indexOf: function () {
            /// <signature>
            ///     <param name="searchString" type="String" />
            ///     <param name="position" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        lastIndexOf: function () {
            /// <signature>
            ///     <param name="searchString" type="String" />
            ///     <param name="position" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        localeCompare: function () {
            /// <signature>
            ///     <param name="that" type="String" />
            ///     <param name="position" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        match: function () {
            /// <signature>
            ///     <param name="regexp" type="RegExp" />
            ///     <returns type="Array" />
            /// </signature>
        },
        normalize: function () {
            /// <signature>
            ///     <param name="form" type="String" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        repeat: function () {
            /// <signature>
            ///     <param name="count" type="Number" />
            ///     <returns type="String" />
            /// </signature>
        },
        replace: function () {
            /// <signature>
            ///     <param name="searchValue" type="String" />
            ///     <param name="replaceValue" type="String" />
            ///     <returns type="String" />
            /// </signature>
            /// <signature>
            ///     <param name="searchRegexp" type="RegExp" />
            ///     <param name="replaceValue" type="String" />
            ///     <returns type="String" />
            /// </signature>
            /// <signature>
            ///     <param name="searchRegexp" type="RegExp" />
            ///     <param name="replaceFunction" type="Function" />
            ///     <returns type="String" />
            /// </signature>
            /// <signature>
            ///     <param name="searchValue" type="String" />
            ///     <param name="replaceFunction" type="Function" />
            ///     <returns type="String" />
            /// </signature>
        },
        search: function () {
            /// <signature>
            ///     <param name="regexp" type="RegExp" />
            ///     <returns type="Number" />
            /// </signature>
        },
        slice: function () {
            /// <signature>
            ///     <param name="start" type="Number" />
            ///     <param name="end" type="Number" />
            ///     <returns type="String" />
            /// </signature>
        },
        split: function () {
            /// <signature>
            ///     <param name="separator" type="String" />
            ///     <param name="limit" type="Number" />
            ///     <returns type="Array" />
            /// </signature>
            /// <signature>
            ///     <param name="separator" type="RegExp" />
            ///     <param name="limit" type="Number" />
            ///     <returns type="Array" />
            /// </signature>
        },
        startsWith: function () {
            /// <signature>
            ///     <param name="searchString" type="String" />
            ///     <param name="position" type="Number" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        substring: function () {
            /// <signature>
            ///     <param name="start" type="Number" />
            ///     <param name="end" type="Number" />
            ///     <returns type="String" />
            /// </signature>
        },
        toLowerCase: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleLowerCase: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toUpperCase: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleUpperCase: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        trim: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        substr: function () {
            /// <signature>
            ///     <param name="start" type="Number" />
            ///     <param name="length" type="Number" />
            ///     <returns type="String" />
            /// </signature>
        },
        anchor: function () {
            /// <signature>
            ///     <param name="name" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        big: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        blink: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        bold: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        fixed: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        fontcolor: function () {
            /// <signature>
            ///     <param name="color" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        fontsize: function () {
            /// <signature>
            ///     <param name="size" type="Number" />
            ///     <returns type="String" />
            /// </signature>
        },
        italics: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        link: function () {
            /// <signature>
            ///     <param name="href" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        small: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        strike: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        sub: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        sup: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        }
    });

    // Boolean prototype
    applyDoc(Boolean.prototype, {
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        valueOf: function () {
            /// <signature>
            ///     <returns type="Boolean" />
            /// </signature>
        }
    });
    
    applyDoc(Number, {
        isFinite: function () {
            /// <signature>
            ///     <param name="number" type="Number" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        isInteger: function () {
            /// <signature>
            ///     <param name="number" type="Number" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        isNaN: function () {
            /// <signature>
            ///     <param name="number" type="Number" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        isSafeInteger: function () {
            /// <signature>
            ///     <param name="number" type="Number" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        parseFloat: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <returns type="Number" />
            /// </signature>
        },
        parseInt: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <param name="radix" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        }
    });

    // Number prototype
    applyDoc(Number.prototype, {
        toString: function () {
            /// <signature>
            ///     <param name="radix" type="Number" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        valueOf: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        toFixed: function () {
            /// <signature>
            ///     <param name="fractionDigits" type="Number" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        toExponential: function () {
            /// <signature>
            ///     <param name="fractionDigits" type="Number" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        toPrecision: function () {
            /// <signature>
            ///     <param name="precision" type="Number" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        }
    });

    // Math
    if (Math.imul && Math.fround) {
        applyDoc(Math, {
            imul: function () {
                /// <signature>
                ///     <param name="x" type="Number" />
                ///     <param name="y" type="Number" />
                ///     <returns type="Number" />
                /// </signature>
            },
            fround: function () {
                /// <signature>
                ///     <param name="x" type="Number" />
                ///     <returns type="Number" />
                /// </signature>
            }
        });
    }

    applyDoc(Math, {
        abs: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        acos: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        acosh: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        asin: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        asinh: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        atan: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        atanh: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        atan2: function () {
            /// <signature>
            ///     <param name="y" type="Number" />
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        cbrt: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>

        },
        ceil: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        clz32: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>

        },
        cos: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        cosh: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        exp: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        expm1: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        floor: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        hypot: function () {
            /// <signature>
            ///     <param name="value1" type="Number" />
            ///     <param name="value2" type="Number" />
            ///     <param name="..." optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        log: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        log10: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        log2: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        max: function () {
            /// <signature>
            ///     <param name="value1" type="Number" />
            ///     <param name="value2" type="Number" />
            ///     <param name="..." optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        min: function () {
            /// <signature>
            ///     <param name="value1" type="Number" />
            ///     <param name="value2" type="Number" />
            ///     <param name="..." optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        pow: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <param name="y" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        random: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        round: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        sign: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        sin: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        sinh: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        sqrt: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        tan: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        tanh: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        trunc: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        }
    });

    // SIMD
    applyDoc(SIMD, {
        float32x4: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <param name="y" type="Number" />
            ///     <param name="z" type="Number" />
            ///     <param name="w" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        float64x2: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <param name="y" type="Number" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        int32x4: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <param name="y" type="Number" />
            ///     <param name="z" type="Number" />
            ///     <param name="w" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        }
    });

    applyDoc(SIMD.float32x4, {
        zero: function () {
            /// <signature>
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        splat: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        fromFloat64x2: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        fromFloat64x2Bits: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        fromInt32x4: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        fromInt32x4Bits: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        withX: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.float32x4" />
            ///     <param name="x" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        withY: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.float32x4" />
            ///     <param name="y" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        withZ: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.float32x4" />
            ///     <param name="z" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        withW: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.float32x4" />
            ///     <param name="w" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        abs: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        neg: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        not: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        reciprocal: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        reciprocalsqrt: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        sqrt: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        add: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        sub: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        mul: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        div: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        and: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        or: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        xor: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        min: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        max: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        scale: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        lessThan: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        lessThanOrEqual: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        equal: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        notEqual: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        greaterThan: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        greaterThanOrEqual: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        shuffle: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="mask" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        shuffleMix: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="y" type="SIMD.float32x4" />
            ///     <param name="mask" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        clamp: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <param name="upper" type="SIMD.float32x4" />
            ///     <param name="lower" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        select: function () {
            /// <signature>
            ///     <param name="maskValue" type="SIMD.int32x4" />
            ///     <param name="trueValue" type="SIMD.float32x4" />
            ///     <param name="falseValue" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        }
    });

    applyDoc(SIMD.float64x2, {
        zero: function () {
            /// <signature>
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        splat: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        fromFloat32x4: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        fromFloat32x4Bits: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        fromInt32x4: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        fromInt32x4Bits: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        withX: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.float64x2" />
            ///     <param name="x" type="Number" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        withY: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.float64x2" />
            ///     <param name="y" type="Number" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        abs: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        neg: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        not: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        reciprocal: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        reciprocalsqrt: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        sqrt: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        add: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        sub: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        mul: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        div: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        and: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        or: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        xor: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        min: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        max: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        scale: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="Number" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        lessThan: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        lessThanOrEqual: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        equal: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        notEqual: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        greaterThan: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        greaterThanOrEqual: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        shuffle: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="mask" type="float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        shuffleMix: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="y" type="SIMD.float64x2" />
            ///     <param name="mask" type="Number" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        clamp: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <param name="upper" type="SIMD.float64x2" />
            ///     <param name="lower" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        },
        select: function () {
            /// <signature>
            ///     <param name="maskValue" type="SIMD.int32x4" />
            ///     <param name="trueValue" type="SIMD.float64x2" />
            ///     <param name="falseValue" type="SIMD.float64x2" />
            ///     <returns type="SIMD.float64x2" />
            /// </signature>
        }
    });

    applyDoc(SIMD.int32x4, {
        zero: function () {
            /// <signature>
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        splat: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        bool: function () {
            /// <signature>
            ///     <param name="x" type="Number" />
            ///     <param name="y" type="Number" />
            ///     <param name="z" type="Number" />
            ///     <param name="w" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        fromFloat32x4: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        fromFloat32x4Bits: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        fromFloat64x2: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        fromFloat64x2Bits: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.float64x2" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withX: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="x" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withY: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="y" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withZ: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="z" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withW: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="w" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withFlagX: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="x" type="Boolean" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withFlagY: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="x" type="Boolean" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withFlagZ: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="x" type="Boolean" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        withFlagW: function () {
            /// <signature>
            ///     <param name="t" type="SIMD.int32x4" />
            ///     <param name="x" type="Boolean" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        abs: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        neg: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        not: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        add: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        sub: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        mul: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        and: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        or: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        xor: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        min: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        max: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        lessThan: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        equal: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        greaterThan: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        shuffle: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="mask" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        shuffleMix: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="y" type="SIMD.int32x4" />
            ///     <param name="mask" type="Number" />
            ///     <returns type="SIMD.float32x4" />
            /// </signature>
        },
        shiftLeft: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="bits" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        shiftRightLogical: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="bits" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        shiftRightArithmatic: function () {
            /// <signature>
            ///     <param name="x" type="SIMD.int32x4" />
            ///     <param name="bits" type="Number" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        },
        select: function () {
            /// <signature>
            ///     <param name="maskValue" type="SIMD.int32x4" />
            ///     <param name="trueValue" type="SIMD.int32x4" />
            ///     <param name="falseValue" type="SIMD.int32x4" />
            ///     <returns type="SIMD.int32x4" />
            /// </signature>
        }
    });

    // Date prototype
    applyDoc(Date.prototype, {
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toDateString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toTimeString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleDateString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleTimeString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        valueOf: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getTime: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getFullYear: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCFullYear: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getMonth: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCMonth: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getDate: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCDate: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getDay: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCDay: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getHours: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCHours: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getMinutes: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCMinutes: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getSeconds: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCSeconds: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getMilliseconds: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getUTCMilliseconds: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        getTimezoneOffset: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        setTime: function () {
            /// <signature>
            ///     <param name="time" type="Number"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setMilliseconds: function () {
            /// <signature>
            ///     <param name="ms" type="Number"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setUTCMilliseconds: function () {
            /// <signature>
            ///     <param name="ms" type="Number"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setSeconds: function () {
            /// <signature>
            ///     <param name="sec" type="Number"/>
            ///     <param name="ms" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        setUTCSeconds: function () {
            /// <signature>
            ///     <param name="sec" type="Number" />
            ///     <param name="ms" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        setMinutes: function () {
            /// <signature>
            ///     <param name="min" type="Number" />
            ///     <param name="sec" type="Number" optional="true"/>
            ///     <param name="ms" type="Number" optional="true"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setUTCMinutes: function () {
            /// <signature>
            ///     <param name="min" type="Number" />
            ///     <param name="sec" type="Number" optional="true"/>
            ///     <param name="ms" type="Number" optional="true"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setHours: function () {
            /// <signature>
            ///     <param name="hour" type="Number" />
            ///     <param name="min" type="Number" optional="true" />
            ///     <param name="sec" type="Number" optional="true" />
            ///     <param name="ms" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        setUTCHours: function () {
            /// <signature>
            ///     <param name="hour" type="Number" />
            ///     <param name="min" type="Number" optional="true"/>
            ///     <param name="sec" type="Number" optional="true"/>
            ///     <param name="ms" type="Number" optional="true"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setDate: function () {
            /// <signature>
            ///     <param name="date" type="Number"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setUTCDate: function () {
            /// <signature>
            ///     <param name="date" type="Number"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setMonth: function () {
            /// <signature>
            ///     <param name="month" type="Number" />
            ///     <param name="date" type="Number" optional="true"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setUTCMonth: function () {
            /// <signature>
            ///     <param name="month" type="Number"/>
            ///     <param name="date" type="Number" optional="true"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setFullYear: function () {
            /// <signature>
            ///     <param name="year" type="Number"/>
            ///     <param name="month" type="Number" optional="true"/>
            ///     <param name="date" type="Number" optional="true"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        setUTCFullYear: function () {
            /// <signature>
            ///     <param name="year" type="Number" />
            ///     <param name="month" type="Number" optional="true" />
            ///     <param name="date" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        toUTCString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toISOString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toJSON: function () {
            /// <signature>
            ///     <param name="key" type="Number"/>
            ///     <returns type="String" />
            /// </signature>
        },
        getYear: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        setYear: function () {
            /// <signature>
            ///     <param name="year" type="Number"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        toGMTString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        getVarDate: function () {
            /// <signature>
            ///     <returns type="VariantDate" />
            /// </signature>
        }
    });

    // Function 
    applyDoc(Function.prototype, {
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        apply: function () {
            /// <signature>
            /// <param name="thisArg" />
            /// <param name="argArray" type="Array" />
            /// </signature>
        },
        call: function () {
            /// <signature>
            ///     <param name="thisArg" />
            ///     <param name="..." optional="true" />
            /// </signature>   
        },
        bind: function () {
            /// <signature>
            ///     <param name="thisArg" />
            ///     <param name="..." optional="true" />
            ///     <returns type="Function" />
            /// </signature>   
        },
        toMethod: function () {
            /// <signature>
            ///     <param name="thisArg" />
            ///     <param name="newHome" type="Object" />
            ///     <returns type="Function" />
            /// </signature>   
        }
    });

    // Global object
    applyDoc(this, {
        eval: function () {
            /// <signature>
            ///     <param name="x" type="String" />
            /// </signature>
        },
        parseInt: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <param name="radix" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        parseFloat: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <returns type="Number" />
            /// </signature>
        },
        isNaN: function (number) {
            /// <signature>
            ///     <param name="number" type="Number" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        isFinite: function (number) {
            /// <signature>
            ///     <param name="number" type="Number" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        decodeURI: function (encodedURI) {
            /// <signature>
            ///     <param name="encodedURI" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        decodeURIComponent: function (encodedURIComponent) {
            /// <signature>
            ///     <param name="encodedURIComponent" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        encodeURI: function (uri) {
            /// <signature>
            ///     <param name="uri" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        encodeURIComponent: function (uriComponent) {
            /// <signature>
            ///     <param name="uriComponent" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        escape: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        unescape: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        Object: function () {
            /// <signature>
            /// </signature>
            /// <signature>
            ///     <param name="value" />
            /// </signature>
        },
        Function: function () {
            /// <signature>
            ///     <returns type="Function" />
            /// </signature>
            /// <signature>
            ///     <param name="body" type="String" />
            ///     <returns type="Function" />
            /// </signature>
            /// <signature>
            ///     <param name="..." type="String" optional="true" />
            ///     <param name="body" type="String" />
            ///     <returns type="Function" />
            /// </signature>
        },
        Array: function () {
            /// <signature>
            ///     <returns type="Array" />
            /// </signature>
            /// <signature>
            ///     <param name="len" type="Number" />
            ///     <returns type="Array" />
            /// </signature>
            /// <signature>
            ///     <param name="arg1" />
            ///     <param name="arg2" />
            ///     <param name="..." optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        String: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
            /// <signature>
            ///     <param name="value" />
            ///     <returns type="String" />
            /// </signature>
        },
        Boolean: function () {
            /// <signature>
            ///     <returns type="Boolean" />
            /// </signature>
            /// <signature>
            ///     <param name="value" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        Number: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
            /// <signature>
            ///     <param name="value" />
            ///     <returns type="Number" />
            /// </signature>
        },
        Date: function () {
            /// <signature>
            ///     <returns type="Date" />
            /// </signature>
            /// <signature>
            ///     <param name="date" type="String" />
            ///     <returns type="Date" />
            /// </signature>
            /// <signature>
            ///     <param name="year" type="Number"/>
            ///     <param name="month" type="Number"/>
            ///     <param name="date" type="Number" optional="true" />
            ///     <param name="hours" type="Number" optional="true" />
            ///     <param name="minutes" type="Number" optional="true" />
            ///     <param name="seconds" type="Number" optional="true" />
            ///     <param name="ms" type="Number" optional="true" />
            ///     <returns type="Date" />
            /// </signature>
        },
        RegExp: function () {
            /// <signature>
            ///     <param name="pattern" type="RegExp" />
            ///     <param name="flags" type="String" optional="true" />
            ///     <returns type="RegExp" />
            /// </signature>
        },
        Error: function () {
            /// <signature>
            ///     <param name="message" type="String" optional="true" />
            ///     <returns type="Error" />
            /// </signature>
        },
        EvalError: function () {
            /// <signature>
            ///     <param name="message" type="String" optional="true" />
            ///     <returns type="EvalError" />
            /// </signature>
        },
        RangeError: function () {
            /// <signature>
            ///     <param name="message" type="String" optional="true" />
            ///     <returns type="RangeError" />
            /// </signature>
        },
        ReferenceError: function () {
            /// <signature>
            ///     <param name="message" type="String" optional="true" />
            ///     <returns type="ReferenceError" />
            /// </signature>
        },
        SyntaxError: function () {
            /// <signature>
            ///     <param name="message" type="String" optional="true" />
            ///     <returns type="SyntaxError" />
            /// </signature>
        },
        TypeError: function () {
            /// <signature>
            ///     <param name="message" type="String" optional="true" />
            ///     <returns type="TypeError" />
            /// </signature>
        },
        URIError: function () {
            /// <signature>
            ///     <param name="message" type="String" optional="true" />
            ///     <returns type="URIError" />
            /// </signature>
        },
        Int8Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Int8Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Int8Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Int8Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Int8Array" />
            /// </signature>
        },
        Uint8Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint8Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Uint8Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Uint8Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint8Array" />
            /// </signature>
        },
        Uint8ClampedArray: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint8ClampedArray" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Uint8ClampedArray" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Uint8ClampedArray" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint8ClampedArray" />
            /// </signature>
        },
        Int16Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Int16Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Int16Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Int16Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Int16Array" />
            /// </signature>
        },
        Uint16Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint16Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Uint16Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Uint16Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint16Array" />
            /// </signature>
        },
        Int32Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Int32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Int32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Int32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Int32Array" />
            /// </signature>
        },
        Uint32Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Uint32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Uint32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Uint32Array" />
            /// </signature>
        },
        Float32Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Float32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Float32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Float32Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Float32Array" />
            /// </signature>
        },
        Float64Array: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Float64Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray"/>
            ///     <returns type="Float64Array" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType='Number' />
            ///     <returns type="Float64Array" />
            /// </signature>
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number"/>
            ///     <param name="length" type="Number"/>
            ///     <returns type="Float64Array" />
            /// </signature>
        },
        ArrayBuffer: function () {
            /// <signature>
            ///     <param name="length" type="Number"/>
            ///     <returns type="ArrayBuffer" />
            /// </signature>
        },
        DataView: function () {
            /// <signature>
            ///     <param name="buffer" type="ArrayBuffer"/>
            ///     <param name="byteOffset" type="Number" optional="true"/>
            ///     <param name="byteLength" type="Number" optional="true"/>
            ///     <returns type="DataView" />
            /// </signature>
        },
        ScriptEngine: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        ScriptEngineMajorVersion: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        ScriptEngineMinorVersion: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        ScriptEngineBuildVersion: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        },
        CollectGarbage: function () {
            /// <signature>
            /// </signature>
        },
        CanvasPixelArray: function () {
            /// <signature>
            ///     <returns type="CanvasPixelArray" />
            /// </signature>
        }
    });

    // Date
    applyDoc(Date, {
        parse: function () {
            /// <signature>
            ///     <param name="string" type="String" />
            ///     <returns type="Number" />
            /// </signature>
        },
        UTC: function () {
            /// <signature>
            ///     <param name="year" type="Number"/>
            ///     <param name="month" type="Number"/>
            ///     <param name="date" type="Number" optional="true"/>
            ///     <param name="hours" type="Number" optional="true"/>
            ///     <param name="minutes" type="Number" optional="true"/>
            ///     <param name="seconds" type="Number" optional="true"/>
            ///     <param name="ms" type="Number" optional="true"/>
            ///     <returns type="Number" />
            /// </signature>
        },
        now: function () {
            /// <signature>
            ///     <returns type="Number" />
            /// </signature>
        }
    });

    // String object
    applyDoc(String, {
        fromCharCode: function () {
            /// <signature>
            ///     <param name="char0" type="Number" optional="true" />
            ///     <param name="..." optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        fromCodePoint: function () {
            /// <signature>
            ///     <param name="char0" type="Number" optional="true" />
            ///     <param name="..." optional="true" />
            ///     <returns type="String" />
            /// </signature>
        },
        raw: function () {
            /// <signature>
            ///     <param name="callSite" type="Object" />
            ///     <param name="..." optional="true" />
            ///     <returns type="String" />
            /// </signature>
        }
    });

    // Error object
    applyDoc(Error.prototype, {
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        }
    });

    // Object object
    applyHooks(Object, Object, {
        assign: function () {
            /// <signature>
            ///     <param name="target" type="Object" />
            ///     <param name="..." optional="true" />
            ///     <returns type="Object" />
            /// </signature>
        },
        create: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <param name="Properties" optional="true" />
            /// </signature>
        },
        defineProperty: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <param name="P" type="String" />
            ///     <param name="Attributes" type="Object" />
            /// </signature>
        },
        defineProperties: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <param name="Properties" type="Object" />
            /// </signature>
        },
        setPrototypeOf: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <param name="proto" type="Object" />
            ///     <returns type="Object" />
            /// </signature>
        },
        getPrototypeOf: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            /// </signature>
        },
        freeze: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Object" />
            /// </signature>
        },
        preventExtensions: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Object" />
            /// </signature>
        },
        seal: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Object" />
            /// </signature>
        }
    });

    applyHooks(Object, { value: true, writable: true, enumerable: true, configurable: true}, {
        getOwnPropertyDescriptor: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <param name="P" type="String" />
            /// </signature>
        }
    });

    applyHooks(Object, [""], {
        getOwnPropertyNames: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Array" />
            /// </signature>
        },
        getOwnPropertySymbols: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Array" />
            /// </signature>
        },
        keys: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Array" />
            /// </signature>
        }
    });

    applyHooks(Object, true, {
        isSealed: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        isFrozen: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        isExtensible: function () {
            /// <signature>
            ///     <param name="O" type="Object" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        is: function () {
            /// <signature>
            ///     <param name="value1" />
            ///     <param name="value2" />
            ///     <returns type="Boolean" />
            /// </signature>
        }
    });

    // Array
    applyDoc(Array, {
        isArray: function () {
            /// <signature>
            ///     <param name="arg" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        from: function () {
            /// <signature>
            ///     <param name="arrayLike" />
            ///     <param name="mapfn" type="Function" optional="true" />
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        },
        of: function () {
            /// <signature>
            ///     <param name="..." optional="true" />
            ///     <returns type="Array" />
            /// </signature>
        }
    });

    var dataViewDoc = {
        getByte: function () {
            /// <signature>
            ///     <param name="byteOffset" type="Number" />
            ///     <returns type="Number" />
            /// </signature>
        },
        getBytes: function () {
            /// <signature>
            ///     <param name="byteOffset" type="Number" />
            ///     <param name="littleEndian" type="Boolean" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        setByte: function () {
            /// <signature>
            ///     <param name="byteOffset" type="Number" />
            ///     <param name="value" type="Number" />
            /// </signature>
        },
        setBytes: function () {
            /// <signature>
            ///     <param name="byteOffset" type="Number" />
            ///     <param name="value" type="Number" />
            ///     <param name="littleEndian" type="Boolean" optional="true" />
            /// </signature>
        }
    };

    // DataView object
    applyDoc(DataView.prototype, {
        getFloat32: dataViewDoc.getBytes,
        getFloat64: dataViewDoc.getBytes,
        getInt8: dataViewDoc.getByte,
        getUint8: dataViewDoc.getByte,
        getInt16: dataViewDoc.getBytes,
        getUint16: dataViewDoc.getBytes,
        getInt32: dataViewDoc.getBytes,
        getUint32: dataViewDoc.getBytes,
        setFloat32: dataViewDoc.setBytes,
        setFloat64: dataViewDoc.setBytes,
        setInt8: dataViewDoc.setByte,
        setUint8: dataViewDoc.setByte,
        setInt16: dataViewDoc.setBytes,
        setUint16: dataViewDoc.setBytes,
        setInt32: dataViewDoc.setBytes,
        setUint32: dataViewDoc.setBytes
    });

    // Typed array
    var typedArrayMembers = {
        of: function() {
            /// <signature>
            ///     <param name="..." type="Object" optional="true" />
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        from: function() {
            /// <signature>
            ///     <param name="source" type="Object" />
            ///     <param name="mapfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="TypedArray" />
            /// </signature>
        }
    };
    
    var typedArrayPrototypeMembers = {
        copyWithin: function() {
            /// <signature>
            ///     <param name="target" type="Number" />
            ///     <param name="start" type="Number" />
            ///     <param name="end" type="Number" optional="true" />
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        entries: function() {
            /// <signature>
            ///     <returns type="Object" />
            /// </signature>
        },
        every: function() {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        fill: function() {
            /// <signature>
            ///     <param name="value" />
            ///     <param name="start" type="Number" optional="true" />
            ///     <param name="end" type="Number" optional="true" />
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        filter: function() {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        find: function() {
            /// <signature>
            ///     <param name="predicate" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            /// </signature>
        },
        findIndex: function() {
            /// <signature>
            ///     <param name="predicate" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        forEach: function() {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            /// </signature>
        },
        indexOf: function() {
            /// <signature>
            ///     <param name="searchElement" />
            ///     <param name="fromIndex" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        join: function() {
            /// <signature>
            ///     <param name="separator" type="String" />
            ///     <returns type="String" />
            /// </signature>
        },
        keys: function() {
            /// <signature>
            ///     <returns type="Object" />
            /// </signature>
        },
        lastIndexOf: function() {
            /// <signature>
            ///     <param name="searchElement" />
            ///     <param name="fromIndex" type="Number" optional="true" />
            ///     <returns type="Number" />
            /// </signature>
        },
        map: function() {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        reduce: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="previousValue" />
            ///             <param name="currentValue" />
            ///             <param name="currentIndex" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="initialValue" optional="true"/>
            /// </signature>
        },
        reduceRight: function () {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="previousValue" />
            ///             <param name="currentValue" />
            ///             <param name="currentIndex" type="Number" />
            ///             <param name="traversedObject" />
            ///         </signature>
            ///     </param>
            ///     <param name="initialValue" optional="true"/>
            /// </signature>
        },
        reverse: function() {
            /// <signature>
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        set: function () {
            /// <signature>
            ///     <param name="index" type="Number" />
            ///     <param name="value" type="Number" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="TypedArray" />
            ///     <param name="offset" type="Number" optional="true" />
            /// </signature>
            /// <signature>
            ///     <param name="array" type="Array" elementType="Number" />
            ///     <param name="offset" type="Number" optional="true" />
            /// </signature>
        },
        slice: function() {
            /// <signature>
            ///     <param name="start" type="Number" />
            ///     <param name="end" type="Number" />
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        some: function() {
            /// <signature>
            ///     <param name="callbackfn" type="Function">
            ///         <signature>
            ///             <param name="value" />
            ///             <param name="index" type="Number" />
            ///             <param name="traversedObject" />
            ///             <returns type="Boolean" />
            ///         </signature>
            ///     </param>
            ///     <param name="thisArg" optional="true" />
            ///     <returns type="Boolean" />
            /// </signature>
        },
        sort: function() {
            /// <signature>
            ///     <param name="comparefn" type="Function" />
            ///     <returns type="Number" />
            /// </signature>
        },
        subarray: function () {
            /// <signature>
            ///     <param name="begin" type="Number" optional="true" />
            ///     <param name="end" type="Number" optional="true" />
            ///     <returns type="TypedArray" />
            /// </signature>
        },
        toString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        toLocaleString: function () {
            /// <signature>
            ///     <returns type="String" />
            /// </signature>
        },
        values: function() {
            /// <signature>
            ///     <returns type="Object" />
            /// </signature>
        }
    };
    
    applyDoc(Int8Array, typedArrayMembers);
    applyDoc(Uint8Array, typedArrayMembers);
    applyDoc(Uint8ClampedArray, typedArrayMembers);
    applyDoc(Int16Array, typedArrayMembers);
    applyDoc(Uint16Array, typedArrayMembers);
    applyDoc(Int32Array, typedArrayMembers);
    applyDoc(Uint32Array, typedArrayMembers);
    applyDoc(Float32Array, typedArrayMembers);
    applyDoc(Float64Array, typedArrayMembers);
    
    applyDoc(Int8Array.prototype, typedArrayPrototypeMembers);
    applyDoc(Uint8Array.prototype, typedArrayPrototypeMembers);
    applyDoc(Uint8ClampedArray.prototype, typedArrayPrototypeMembers);
    applyDoc(Int16Array.prototype, typedArrayPrototypeMembers);
    applyDoc(Uint16Array.prototype, typedArrayPrototypeMembers);
    applyDoc(Int32Array.prototype, typedArrayPrototypeMembers);
    applyDoc(Uint32Array.prototype, typedArrayPrototypeMembers);
    applyDoc(Float32Array.prototype, typedArrayPrototypeMembers);
    applyDoc(Float64Array.prototype, typedArrayPrototypeMembers);
    
    Error.prototype.stack = "";

    // Intl object
    // Make sure you also update IntlHelpers.js if you add functions here
    if (Intl) {
        applyDoc(Intl, {
            Collator: function () {
                /// <signature>
                ///     <param name="locales" type="Array" elementType="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Intl.Collator" />
                /// </signature>
                /// <signature>
                ///     <param name="locales" type="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Intl.Collator" />
                /// </signature>
            },
            NumberFormat: function () {
                /// <signature>
                ///     <param name="locales" type="Array" elementType="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Intl.NumberFormat" />
                /// </signature>
                /// <signature>
                ///     <param name="locales" type="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Intl.NumberFormat" />
                /// </signature>
            },
            DateTimeFormat: function () {
                /// <signature>
                ///     <param name="locales" type="Array" elementType="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Intl.DateTimeFormat" />
                /// </signature>
                /// <signature>
                ///     <param name="locales" type="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Intl.DateTimeFormat" />
                /// </signature>
            }
        });

        // Intl object statics
        var intlStatics = {
            supportedLocalesOf: function () {
                /// <signature>
                ///     <param name="locales" type="Array" elementType="String" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Array" elementType="String" />
                /// </signature>
                /// <signature>
                ///     <param name="locales" type="String" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Array" elementType="String" />
                /// </signature>
            }
        };

        applyDoc(Intl.Collator, intlStatics);
        applyDoc(Intl.NumberFormat, intlStatics);
        applyDoc(Intl.DateTimeFormat, intlStatics);

        applyDoc(Intl.Collator.prototype, {
            compare: function () {
                /// <signature>
                ///     <param name="a" type="String" />
                ///     <param name="b" type="String" />
                ///     <returns type="Number" />
                /// </signature>
            },
            resolvedOptions: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            }
        });


        applyDoc(Intl.NumberFormat.prototype, {
            format: function () {
                /// <signature>
                ///     <param name="n" type="Number" />
                ///     <returns type="String" />
                /// </signature>
            },
            resolvedOptions: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            }
        });

        applyDoc(Intl.DateTimeFormat.prototype, {
            format: function () {
                /// <signature>
                ///     <param name="date" type="Number" optional="true" />
                ///     <returns type="String" />
                /// </signature>
            },
            resolvedOptions: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            }
        });

        // Updated doc comments for locale sensitive functions
        applyDoc(String.prototype, {
            localeCompare: function () {
                /// <signature>
                ///     <param name="that" type="String" />
                ///     <param name="locales" type="Array" elementType="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Number" />
                /// </signature>
                /// <signature>
                ///     <param name="that" type="String" />
                ///     <param name="locales" type="String" optional="true" />
                ///     <param name="options" optional="true" />
                ///     <returns type="Number" />
                /// </signature>
            }
        });

        var toLocaleStringFunc = function () {
            /// <signature>
            ///     <param name="locales" type="Array" elementType="String" optional="true" />
            ///     <param name="options" optional="true" />
            ///     <returns type="String" />
            /// </signature>
            /// <signature>
            ///     <param name="locales" type="String" optional="true" />
            ///     <param name="options" optional="true" />
            ///     <returns type="String" />
            /// </signature>
        };

        applyDoc(Number.prototype, {
            toLocaleString: toLocaleStringFunc
        });

        applyDoc(Date.prototype, {
            toLocaleString: toLocaleStringFunc,
            toLocaleDateString: toLocaleStringFunc,
            toLocaleTimeString: toLocaleStringFunc
        });
    }
    
    if (WeakSet) {
        applyDoc(this, {
            WeakSet: function() {
                /// <signature>
                ///     <returns type="WeakSet" />
                /// </signature>
            }
        });
        
        var weakSetMembers = {
            add: function() {
                /// <signature>
                ///     <param name="value" />
                ///     <returns type="WeakSet" />
                /// </signature>
            },
            "delete": function () {
                /// <signature>
                ///     <param name="value" />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            has: function () {
                /// <signature>
                ///     <param name="value" />
                ///     <returns type="Boolean" />
                /// </signature>
            }
        };

        applyDoc(WeakSet.prototype, weakSetMembers);
    }

    // Map, WeakMap, and Set
    if (Map && WeakMap && Set) {
        applyDoc(this, {
            Map: function () {
                /// <signature>
                ///     <returns type="Map" />
                /// </signature>
            },
            WeakMap: function () {
                /// <signature>
                ///     <returns type="WeakMap" />
                /// </signature>
            },
            Set: function () {
                /// <signature>
                ///     <returns type="Set" />
                /// </signature>
            }
        });

        var mapCommonMembers = {
            "delete": function () {
                /// <signature>
                ///     <param name="key" />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            get: function () {
                /// <signature>
                ///     <param name="key" />
                ///     <returns type="Object" />
                /// </signature>
            },
            has: function () {
                /// <signature>
                ///     <param name="key" />
                ///     <returns type="Boolean" />
                /// </signature>
            }
        };

        applyDoc(Map.prototype, mapCommonMembers);
        applyDoc(Map.prototype, {
            clear: function () {
                /// <signature />
            },
            forEach: function () {
                /// <signature>
                ///     <param name="callbackfn" type="Function">
                ///         <signature>
                ///             <param name="value" />
                ///             <param name="key" />
                ///             <param name="traversedObject" />
                ///         </signature>
                ///     </param>
                ///     <param name="thisArg" optional="true" />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            set: function () {
                /// <signature>
                ///     <param name="key" />
                ///     <param name="value" />
                ///     <returns type="Map" />
                /// </signature>
            },
            entries: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            },
            keys: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            },
            values: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            }
        });

        applyDoc(WeakMap.prototype, mapCommonMembers);
        applyDoc(WeakMap.prototype, {
            set: function () {
                /// <signature>
                ///     <param name="key" />
                ///     <param name="value" />
                ///     <returns type="WeakMap" />
                /// </signature>
            }
        });

        applyDoc(Set.prototype, {
            add: function () {
                /// <signature>
                ///     <param name="value" />
                ///     <returns type="Set" />
                /// </signature>
            },
            clear: function () {
                /// <signature />
            },
            "delete": function () {
                /// <signature>
                ///     <param name="value" />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            forEach: function () {
                /// <signature>
                ///     <param name="callbackfn" type="Function">
                ///         <signature>
                ///             <param name="value" />
                ///             <param name="value" />
                ///             <param name="traversedObject" />
                ///         </signature>
                ///     </param>
                ///     <param name="thisArg" optional="true" />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            has: function () {
                /// <signature>
                ///     <param name="value" />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            entries: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            },
            keys: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            },
            values: function () {
                /// <signature>
                ///     <returns type="Object" />
                /// </signature>
            }
        });
    }

    if (Proxy && Reflect) {
        applyDoc(this, {
            Proxy: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='handler' />
                /// </signature>
            }
        });

        applyDoc(Proxy, {
            revocable: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='handler' />
                /// </signature>
            }
        });

        applyDoc(Reflect, {
            apply: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='thisArgument' />
                ///     <param name='argumentsList' />
                /// </signature>
            },
            construct: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='argumentsList' />
                /// </signature>
            },
            defineProperty: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='propertyKey' />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            deleteProperty: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='propertyKey' />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            enumerate: function () {
                /// <signature>
                ///     <param name='target' />
                /// </signature>
            },
            get: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='thisArgument' />
                ///     <param name='receiver' optional = "true"/>
                /// </signature>
            },
            getOwnPropertyDescriptor: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='propertyKey' />
                /// </signature>
            },
            getPrototypeOf: function () {
                /// <signature>
                ///     <param name='target' />
                /// </signature>
            },
            has: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='propertyKey' />
                ///     <returns type='Boolean'/>
                /// </signature>
            },
            isExtensible: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <returns type='Boolean'/>
                /// </signature>
            },
            ownKeys: function () {
                /// <signature>
                ///     <param name='target' />
                /// </signature>
            },
            preventExtensions: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <returns type="Boolean" />
                /// </signature>
            },
            set: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name='propertyKey' />
                ///     <param name='receiver' optional='true'/>
                ///     <returns type="Boolean" />
                /// </signature>
            },
            setPrototypeOf: function () {
                /// <signature>
                ///     <param name='target' />
                ///     <param name="proto" />
                ///     <returns type="Boolean" />
                /// </signature>
            },
        })
    };
    
    if (Symbol) {
        applyDoc(this, {
            Symbol: function () {
                /// <signature>
                ///     <param name='description' />
                /// </signature>
            }
        });

        applyDoc(Symbol, {
            'for': function () {
                /// <signature>
                ///     <param name='key' />
                /// </signature>
            },
            keyFor: function () {
                /// <signature>
                ///     <param name='sym' />
                /// </signature>
            }
        });
        
        applyDoc(Symbol.prototype, {
            toString: function () {
                /// <signature>
                ///     <returns type="String" />
                /// </signature>
            },
            valueOf: function () {
                /// <signature />
            }
        });
    };
    
    applyDoc(ArrayBuffer, {
        isView: function () {
            /// <signature>
            ///     <param name='arg' />
            ///     <returns type='Boolean' />
            /// </signature>
        }
    });
    
    applyDoc(ArrayBuffer.prototype, {
        slice: function () {
            /// <signature>
            ///     <param name='start' type='Number' />
            ///     <param name='end' type='Number' />
            ///     <returns type='ArrayBuffer' />
            /// </signature>
        }
    });
    
    if (Promise) {
        applyDoc(this, {
            Promise: function () {
                /// <signature>
                ///     <param name='executor' type="Function" />
                ///     <returns type='Promise' />
                /// </signature>
            }
        });
        
        applyDoc(Promise, {
            all: function () {
                /// <signature>
                ///     <param name='iterable' type='Object' />
                ///     <returns type='Promise' />
                /// </signature>
            },
            race: function () {
                /// <signature>
                ///     <param name='iterable' type='Object' />
                ///     <returns type='Promise' />
                /// </signature>
            },
            reject: function () {
                /// <signature>
                ///     <param name='r' />
                ///     <returns type='Promise' />
                /// </signature>
            },
            resolve: function () {
                /// <signature>
                ///     <param name='x' />
                ///     <returns type='Promise' />
                /// </signature>
            }
        });
        
        applyDoc(Promise.prototype, {
            catch: function () {
                /// <signature>
                ///     <param name='onRejected' type="Function" />
                ///     <returns type='Promise' />
                /// </signature>
            },
            then: function () {
                /// <signature>
                ///     <param name='onFulfilled' type="Function" />
                ///     <param name='onRejected' type="Function" />
                ///     <returns type='Promise' />
                /// </signature>
            }
        });
    };

})();

(function () {
    var originalBind = Function.prototype.bind;
    var newBind;
    var listening = false;
    Function.prototype.bind = newBind = function () {
        var result = originalBind.apply(this, arguments);
        intellisense.annotate(result, this);
        if (arguments.length > 1) {
            result._$bind = arguments.length - 1;
            if (!listening) {
                listening = true;
                intellisense.addEventListener('signaturehelp', function (e) {
                    if (e.target._$bind) 
                        e.functionHelp.signatures[0].params.splice(0, e.target._$bind);
                });
            }
        }
        return result;
    };
    intellisense.redirectDefinition(newBind, originalBind);
})();
// SIG // Begin signature block
// SIG // MIIanQYJKoZIhvcNAQcCoIIajjCCGooCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFKTo+duWuaX7
// SIG // vWfhRS4Wv9nI5NesoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AACampsWwoPa1cIAAAAAAJowDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE2MDMzMDE5
// SIG // MjEyOVoXDTE3MDYzMDE5MjEyOVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpCMUI3LUY2N0YtRkVDMjEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAKZGcyHKAK1+KMPlE5szicc4CJIlJq0R/J8UFYJz
// SIG // YmMl8u5Me1+ZqDys5iCAV+aHEnUP3noHraQ8R7DXhYSg
// SIG // Tpdd35govgBRMWpxghNHe/vJe/YXSUkkzhe2TXlHhE1j
// SIG // j+O0JQyknC4q9qi2dcccePDGAKm0jt9MuccG/XAq+I7Q
// SIG // IR6DgWUMnECilK4qJilajEqeW2FMnFSesDzqkidwXk7j
// SIG // J2Li4DZKnPXh/Vs33s9dAcsKdcz83tvYtINUy3uDKYZR
// SIG // ECNHwStxzK+Wzlx8yprFXADBj2rK1JKn2K/rvhWbtKgd
// SIG // xGuEfFh0sDZkj9KCLPgMuSwKVnof6AmHqQbfHNUCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBQmmgbvkXTwOgin21sU
// SIG // 7d0HCiAvCTAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQCJehwGFIbD
// SIG // v+5TfA//GKMWAGxUw9KZZvNqxbNTH3/VgV9R8/z6Lqiv
// SIG // 0Y0RH9q3RKNwAhBNsIT2njVXk4PeJqyb4884skOIK8vl
// SIG // V0vWUmtcbTARAu+pUZbB4oK/Z6uaECCEFKny/OromIJS
// SIG // dXwD3txRJK1umXshuqEqLPVjxAE01+WgDEnUCt1uAQux
// SIG // L2lxU/GPEcPl2w0LfSyUhk1nF3nYKHrloO5UvDdy8ZqL
// SIG // 1Hc4YFOvg2ScMl6+Vy6dpeZ78el6NHeRHnRMqsdL59xq
// SIG // 4XlayVog0TOb5ffjo7l67nWYUo/ViOKrtyqsfoqBKRvR
// SIG // cKkPD7NmpVq1jr1cvPdVvPkQMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAAQosea7XeXumrAABAAABCjANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xNTA2
// SIG // MDQxNzQyNDVaFw0xNjA5MDQxNzQyNDVaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCS/G82u+ED
// SIG // uSjWRtGiYbqlRvtjFj4u+UfSx+ztx5mxJlF1vdrMDwYU
// SIG // EaRsGZ7AX01UieRNUNiNzaFhpXcTmhyn7Q1096dWeego
// SIG // 91PSsXpj4PWUl7fs2Uf4bD3zJYizvArFBKeOfIVIdhxh
// SIG // RqoZxHpii8HCNar7WG/FYwuTSTCBG3vff3xPtEdtX3gc
// SIG // r7b3lhNS77nRTTnlc95ITjwUqpcNOcyLUeFc0Tvwjmfq
// SIG // MGCpTVqdQ73bI7rAD9dLEJ2cTfBRooSq5JynPdaj7woY
// SIG // SKj6sU6lmA5Lv/AU8wDIsEjWW/4414kRLQW6QwJPIgCW
// SIG // Ja19NW6EaKsgGDgo/hyiELGlAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUif4K
// SIG // MeomzeZtx5GRuZSMohhhNzQwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1KzA0
// SIG // MDc5MzUwLTE2ZmEtNGM2MC1iNmJmLTlkMmIxY2QwNTk4
// SIG // NDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEApqhTkd87Af5hXQZa62bwDNj32YTTAFEOENGk0Rco
// SIG // 54wzOCvYQ8YDi3XrM5L0qeJn/QLbpR1OQ0VdG0nj4E8W
// SIG // 8H6P8IgRyoKtpPumqV/1l2DIe8S/fJtp7R+CwfHNjnhL
// SIG // YvXXDRzXUxLWllLvNb0ZjqBAk6EKpS0WnMJGdAjr2/TY
// SIG // pUk2VBIRVQOzexb7R/77aPzARVziPxJ5M6LvgsXeQBkH
// SIG // 7hXFCptZBUGp0JeegZ4DW/xK4xouBaxQRy+M+nnYHiD4
// SIG // BfspaxgU+nIEtwunmmTsEV1PRUmNKRot+9C2CVNfNJTg
// SIG // FsS56nM16Ffv4esWwxjHBrM7z2GE4rZEiZSjhjCCBbww
// SIG // ggOkoAMCAQICCmEzJhoAAAAAADEwDQYJKoZIhvcNAQEF
// SIG // BQAwXzETMBEGCgmSJomT8ixkARkWA2NvbTEZMBcGCgmS
// SIG // JomT8ixkARkWCW1pY3Jvc29mdDEtMCsGA1UEAxMkTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // MB4XDTEwMDgzMTIyMTkzMloXDTIwMDgzMTIyMjkzMlow
// SIG // eTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWlj
// SIG // cm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EwggEiMA0GCSqG
// SIG // SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCycllcGTBkvx2a
// SIG // YCAgQpl2U2w+G9ZvzMvx6mv+lxYQ4N86dIMaty+gMuz/
// SIG // 3sJCTiPVcgDbNVcKicquIEn08GisTUuNpb15S3GbRwfa
// SIG // /SXfnXWIz6pzRH/XgdvzvfI2pMlcRdyvrT3gKGiXGqel
// SIG // cnNW8ReU5P01lHKg1nZfHndFg4U4FtBzWwW6Z1KNpbJp
// SIG // L9oZC/6SdCnidi9U3RQwWfjSjWL9y8lfRjFQuScT5EAw
// SIG // z3IpECgixzdOPaAyPZDNoTgGhVxOVoIoKgUyt0vXT2Pn
// SIG // 0i1i8UU956wIAPZGoZ7RW4wmU+h6qkryRs83PDietHdc
// SIG // pReejcsRj1Y8wawJXwPTAgMBAAGjggFeMIIBWjAPBgNV
// SIG // HRMBAf8EBTADAQH/MB0GA1UdDgQWBBTLEejK0rQWWAHJ
// SIG // Ny4zFha5TJoKHzALBgNVHQ8EBAMCAYYwEgYJKwYBBAGC
// SIG // NxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQU/dExTtMm
// SIG // ipXhmGA7qDFvpjy82C0wGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwHwYDVR0jBBgwFoAUDqyCYEBWJ5flJRP8
// SIG // KuEKU5VZ5KQwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwDQYJKoZIhvcNAQEFBQADggIBAFk5
// SIG // Pn8mRq/rb0CxMrVq6w4vbqhJ9+tfde1MOy3XQ60L/svp
// SIG // LTGjI8x8UJiAIV2sPS9MuqKoVpzjcLu4tPh5tUly9z7q
// SIG // QX/K4QwXaculnCAt+gtQxFbNLeNK0rxw56gNogOlVuC4
// SIG // iktX8pVCnPHz7+7jhh80PLhWmvBTI4UqpIIck+KUBx3y
// SIG // 4k74jKHK6BOlkU7IG9KPcpUqcW2bGvgc8FPWZ8wi/1wd
// SIG // zaKMvSeyeWNWRKJRzfnpo1hW3ZsCRUQvX/TartSCMm78
// SIG // pJUT5Otp56miLL7IKxAOZY6Z2/Wi+hImCWU4lPF6H0q7
// SIG // 0eFW6NB4lhhcyTUWX92THUmOLb6tNEQc7hAVGgBd3TVb
// SIG // Ic6YxwnuhQ6MT20OE049fClInHLR82zKwexwo1eSV32U
// SIG // jaAbSANa98+jZwp0pTbtLS8XyOZyNxL0b7E8Z4L5UrKN
// SIG // MxZlHg6K3RDeZPRvzkbU0xfpecQEtNP7LN8fip6sCvsT
// SIG // J0Ct5PnhqX9GuwdgR2VgQE6wQuxO7bN2edgKNAltHIAx
// SIG // H+IOVN3lofvlRxCtZJj/UBYufL8FIXrilUEnacOTj5XJ
// SIG // jdibIa4NXJzwoq6GaIMMai27dmsAHZat8hZ79haDJLmI
// SIG // z2qoRzEvmtzjcT3XAH5iR9HOiMm4GPoOco3Boz2vAkBq
// SIG // /2mbluIQqBC0N1AI1sM9MIIGBzCCA++gAwIBAgIKYRZo
// SIG // NAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJbWlj
// SIG // cm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1
// SIG // MzA5WhcNMjEwNDAzMTMwMzA5WjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7d
// SIG // GE4kD+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr
// SIG // 6Hu97IkHD/cOBJjwicwfyzMkh53y9GccLPx754gd6udO
// SIG // o6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
// SIG // KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd+
// SIG // +NIT8wi3U21StEWQn0gASkdmEScpZqiX5NMGgUqi+YSn
// SIG // EUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68e
// SIG // eEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiAL
// SIG // AgMBAAGjggGrMIIBpzAPBgNVHRMBAf8EBTADAQH/MB0G
// SIG // A1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWzDzALBgNV
// SIG // HQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1Ud
// SIG // IwSBkDCBjYAUDqyCYEBWJ5flJRP8KuEKU5VZ5KShY6Rh
// SIG // MF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJ
// SIG // k/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQ
// SIG // ea0WoUqgpa1Mc1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BB
// SIG // hj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmww
// SIG // VAYIKwYBBQUHAQEESDBGMEQGCCsGAQUFBzAChjhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDANBgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wD
// SIG // RDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQSooxt
// SIG // YrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB
// SIG // 7uK+jwoFyI1I4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mR
// SIG // KiQicPv2/OR4mS4N9wficLwYTp2OawpylbihOZxnLcVR
// SIG // DupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPf
// SIG // wgphjvDXuBfrTot/xTUrXqO/67x9C0J71FNyIe4wyrt4
// SIG // ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGys
// SIG // OUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89D
// SIG // s+X57H2146SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BN
// SIG // Z8ifQv+AeSGAnhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU
// SIG // 2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LB
// SIG // J1S2sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJ
// SIG // Zr2dHYcSZAI9La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCl
// SIG // eKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
// SIG // mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6
// SIG // L54/LlUWa8kTo/0xggSHMIIEgwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAQosea7XeXumrAAB
// SIG // AAABCjAJBgUrDgMCGgUAoIGgMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRCIKyYjP9U
// SIG // K+R55vMjGDRc2j1RwTBABgorBgEEAYI3AgEMMTIwMKAW
// SIG // gBQAbABpAGIAaABlAGwAcAAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQAy
// SIG // JEz8KabpBD4J/jkVORYxA6gotUG8mcxRnuzeQHwUK5ur
// SIG // KDmn6LvSIKW3IKpZW3aqT5YMLmhrEjR+BRG9wjUFlbLA
// SIG // 5GMRoZP08EGQIvSuuu6JlEGRB/AkBvwLSMEpZ6ZZIlk8
// SIG // tJh+zB+pe7+HUNxfZqhX5q3oyONfABVfud1jJaEBo5a1
// SIG // +n3kf2z6TGQPZkIpH33GG4y0UBQpEtUe6kWvNXbEphBm
// SIG // AZrFn7HfbYKq2y4ILnWtoVT9iR0tjGpagw0/FurokWFU
// SIG // WwSf+Q6HG13PAJ+Lhuhx9bU565qy0L3xuiHdCkLiUAAU
// SIG // XihDuJDaS1jqSEpfvleVC9wE5HTIgKEKoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAAJqamxbCg9rVwgAAAAAA
// SIG // mjAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTYwNzI3MDYw
// SIG // MTQ4WjAjBgkqhkiG9w0BCQQxFgQU1kdjAHHulaVaj9Ct
// SIG // L8OJ4U0yeAcwDQYJKoZIhvcNAQEFBQAEggEAUswSjWvZ
// SIG // EEKpqOkmfo7sKApewzdqALItj57fpqCf9KypAuxycljs
// SIG // /+ijnfNUNg+ZaEIv+kiQAanCEeQa1RKrIsvz+4RqGULA
// SIG // iF2uq3Mna5MV4jIocArOyVq46MnlHwMjQeopbqgRDrNW
// SIG // gmrVFVkOMjty8C2ej+3ky+nR0sv1XUP8VqL+6g6JqJAZ
// SIG // qMNEUU9e4fKaTMB02hGflXP290Jx5lTqn1DEErUpV8pX
// SIG // 6ifgSIcpF44pSfLwwtXhRefAT/TqVDnhmdfo4L07xib5
// SIG // ZaRTb7fA0wTSVJMaiswPXNFigNTXRtMIxqFLvChoUjMU
// SIG // o4FAADTEDr0SpL4nNsImh2Xlng==
// SIG // End signature block
