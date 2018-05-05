/*
  中云软件 UI
  Author      : Zhang_Wei
  Version     : 2.0.0
  Last Update : 2018-01-04
*/

/* 浏览器兼容检测 */
!function(){
    "use strict";

    /*! modernizr 3.5.0 (Custom Build) | MIT *
     * https://modernizr.com/download/?-arrow-cssanimations-es6collections-generators-promises-templatestrings-touchevents-domprefixes-setclasses !*/
    /* Zui Edit "Moz O ms Webkit" -> "Webkit" */
    !function(window,document,undefined){function is(e,t){return typeof e===t}function testRunner(){var e,t,n,o,r,s,i;for(var l in tests)if(tests.hasOwnProperty(l)){if(e=[],t=tests[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=is(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)s=e[r],i=s.split("."),1===i.length?Modernizr[i[0]]=o:(!Modernizr[i[0]]||Modernizr[i[0]]instanceof Boolean||(Modernizr[i[0]]=new Boolean(Modernizr[i[0]])),Modernizr[i[0]][i[1]]=o),classes.push((o?"":"no-")+i.join("-"))}}function setClasses(e){var t=docElement.className,n=Modernizr._config.classPrefix||"";if(isSVG&&(t=t.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),isSVG?docElement.className.baseVal=t:docElement.className=t)}function createElement(){return"function"!=typeof document.createElement?document.createElement(arguments[0]):isSVG?document.createElementNS.call(document,"http://www.w3.org/2000/svg",arguments[0]):document.createElement.apply(document,arguments)}function getBody(){var e=document.body;return e||(e=createElement(isSVG?"svg":"body"),e.fake=!0),e}function injectElementWithStyles(e,t,n,o){var r,s,i,l,d="modernizr",a=createElement("div"),u=getBody();if(parseInt(n,10))for(;n--;)i=createElement("div"),i.id=o?o[n]:d+(n+1),a.appendChild(i);return r=createElement("style"),r.type="text/css",r.id="s"+d,(u.fake?u:a).appendChild(r),u.appendChild(a),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e)),a.id=d,u.fake&&(u.style.background="",u.style.overflow="hidden",l=docElement.style.overflow,docElement.style.overflow="hidden",docElement.appendChild(u)),s=t(a,e),u.fake?(u.parentNode.removeChild(u),docElement.style.overflow=l,docElement.offsetHeight):a.parentNode.removeChild(a),!!s}function contains(e,t){return!!~(""+e).indexOf(t)}function cssToDOM(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function fnBind(e,t){return function(){return e.apply(t,arguments)}}function testDOMProps(e,t,n){var o;for(var r in e)if(e[r]in t)return n===!1?e[r]:(o=t[e[r]],is(o,"function")?fnBind(o,n||t):o);return!1}function domToCSS(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function computedStyle(e,t,n){var o;if("getComputedStyle"in window){o=getComputedStyle.call(window,e,t);var r=window.console;if(null!==o)n&&(o=o.getPropertyValue(n));else if(r){var s=r.error?"error":"log";r[s].call(r,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&e.currentStyle&&e.currentStyle[n];return o}function nativeTestProps(e,t){var n=e.length;if("CSS"in window&&"supports"in window.CSS){for(;n--;)if(window.CSS.supports(domToCSS(e[n]),t))return!0;return!1}if("CSSSupportsRule"in window){for(var o=[];n--;)o.push("("+domToCSS(e[n])+":"+t+")");return o=o.join(" or "),injectElementWithStyles("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==computedStyle(e,null,"position")})}return undefined}function testProps(e,t,n,o){function r(){i&&(delete mStyle.style,delete mStyle.modElem)}if(o=is(o,"undefined")?!1:o,!is(n,"undefined")){var s=nativeTestProps(e,n);if(!is(s,"undefined"))return s}for(var i,l,d,a,u,c=["modernizr","tspan","samp"];!mStyle.style&&c.length;)i=!0,mStyle.modElem=createElement(c.shift()),mStyle.style=mStyle.modElem.style;for(d=e.length,l=0;d>l;l++)if(a=e[l],u=mStyle.style[a],contains(a,"-")&&(a=cssToDOM(a)),mStyle.style[a]!==undefined){if(o||is(n,"undefined"))return r(),"pfx"==t?a:!0;try{mStyle.style[a]=n}catch(f){}if(mStyle.style[a]!=u)return r(),"pfx"==t?a:!0}return r(),!1}function testPropsAll(e,t,n,o,r){var s=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+cssomPrefixes.join(s+" ")+s).split(" ");return is(t,"string")||is(t,"undefined")?testProps(i,t,o,r):(i=(e+" "+domPrefixes.join(s+" ")+s).split(" "),testDOMProps(i,t,n))}function testAllProps(e,t,n){return testPropsAll(e,undefined,undefined,t,n)}var classes=[],tests=[],ModernizrProto={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){tests.push({name:e,fn:t,options:n})},addAsyncTest:function(e){tests.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=ModernizrProto,Modernizr=new Modernizr,Modernizr.addTest("templatestrings",function(){var supports;try{eval("``"),supports=!0}catch(e){}return!!supports}),Modernizr.addTest("arrow",function(){try{eval("()=>{}")}catch(e){return!1}return!0}),Modernizr.addTest("es6collections",!!(window.Map&&window.Set&&window.WeakMap&&window.WeakSet)),Modernizr.addTest("generators",function(){try{new Function("function* test() {}")()}catch(e){return!1}return!0}),Modernizr.addTest("promises",function(){return"Promise"in window&&"resolve"in window.Promise&&"reject"in window.Promise&&"all"in window.Promise&&"race"in window.Promise&&function(){var e;return new window.Promise(function(t){e=t}),"function"==typeof e}()});var docElement=document.documentElement,isSVG="svg"===docElement.nodeName.toLowerCase(),omPrefixes="Webkit",domPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.toLowerCase().split(" "):[];ModernizrProto._domPrefixes=domPrefixes;var prefixes=ModernizrProto._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];ModernizrProto._prefixes=prefixes;var testStyles=ModernizrProto.testStyles=injectElementWithStyles;Modernizr.addTest("touchevents",function(){var e;if("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)e=!0;else{var t=["@media (",prefixes.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");testStyles(t,function(t){e=9===t.offsetTop})}return e});var cssomPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.split(" "):[];ModernizrProto._cssomPrefixes=cssomPrefixes;var modElem={elem:createElement("modernizr")};Modernizr._q.push(function(){delete modElem.elem});var mStyle={style:modElem.elem.style};Modernizr._q.unshift(function(){delete mStyle.style}),ModernizrProto.testAllProps=testPropsAll,ModernizrProto.testAllProps=testAllProps,Modernizr.addTest("cssanimations",testAllProps("animationName","a",!0)),testRunner(),setClasses(classes),delete ModernizrProto.addTest,delete ModernizrProto.addAsyncTest;for(var i=0;i<Modernizr._q.length;i++)Modernizr._q[i]();window.Modernizr=Modernizr}(window,document);

    /** [ 当前已加载完的script合集 ] */
    var scripts    = document.scripts;
    /** [ 当前文件路径 ] */
    var scriptSrc  = scripts[ scripts.length - 1 ].src;
    /** [ 当前文件文件夹路径 ] */
    var scriptDir  = scriptSrc.substring( 0, scriptSrc.lastIndexOf( '/' ) + 1 );
    /** [ 当前库根目录 ] */
    var scriptBase = scriptDir.replace( /\w+?\/\w+?\/$/, '' );
    /** [ 当前客户端使用的代码模式 ] */
    var scriptMin  = scriptDir.match( /\w+/g ).pop();

    /** 核心库依赖库地址 */
    var _CoreDepsPath = 'Lib/Core.Deps';

    var _Config = window._Config = {
        /** [ 路径信息 ] */
        location: { base: scriptBase, dir: scriptDir, min: scriptMin },
        /** [ Zui 中 RequireJS 的配置文件 ] */
        requireConfig: {
            /** [ 校正 RequireJS 的 base 路径 ] */
            baseUrl: scriptBase,
            /** [ 各个类库的文件路径 ] */
            paths: {
                /** [ 核心库 ] */
                Core: 'Core/' + scriptMin + '/ZoYun.Core',
                /** [ 组件库 ] */
                Component: 'Core/' + scriptMin + '/ZoYun.Component',

                    /* ------ 核心库依赖 ------ */
                        /** [ Require-CSS v1.0.0 ] */
                            css: _CoreDepsPath + '/require/require-css/' + scriptMin + '/require-css',
                        /** [ Vue.js v2.5.11 ] */
                            Vue: _CoreDepsPath + '/Vue/' + scriptMin + '/Vue',
                        /** [ Element UI v2.0.8 ] */
                            Element: _CoreDepsPath + '/ElementUI/index',
                            ElementCss: _CoreDepsPath + '/ElementUI/theme-chalk/index',
                        /** [ Sass ] */
                            Sass: _CoreDepsPath + '/Sass/sass.worker.min',
                    /* ------ Func Shim ------ */
                        /** [ Promise API ] */
                            Promise: _CoreDepsPath + '/Promise/' + scriptMin + '/Promise',
                    /* ------ 其他开发类库 ------ */
                        /** [ echarts v3.8.4 ] */
                            echarts: 'Lib/echarts/Min/echarts',
                        /** [ echarts v3.8.4 ] */
                            three: 'Lib/three/' + scriptMin + '/three',
                        /** [ web-animations ] */
                            animate: 'Lib/web-animations/web-animations.min'
            },
            shim: {
                Core: { deps: [ 'Element', 'Sass' ] },
                Component: { deps: [ 'Core' ] },

                Vue: { deps: [ Modernizr.promises || 'Promise' ] },
                Element: { deps: [ 'Vue', 'css!ElementCss' ] }
            },
            /* 解决模块加载超时的问题 */
            waitSeconds: 0
        },
        /** [ 记录当前时间, 作为页面刚载入时的初始时间 ] */
        startTime: new Date().getTime(),
        /** [ 浏览器是否通过检查, 是可兼容的范围内的浏览器 ] */
        BrowserCheck: false,
        /** [ 页面中的 script 标签拥有以下 type 后, 将以 ES6 解析 ] */
        scriptTypes: [
            'text/Zui','text/zui',
            'text/Zw','text/zw',
            'text/_',
            'text/es6'
        ]
    }

    if(
        // CSS 特性检测
        Modernizr.cssanimations &&
        // JS window.CSS.supports
        window.CSS && CSS.supports &&
        // CSS calc
        CSS.supports( 'height', 'calc( 100% - 36px )' ) &&
        // CSS variables
        CSS.supports( '--ZoYun', '#008DC4' ) &&
        // CSS pointerevents
        CSS.supports( 'pointer-events', 'none' ) &&
        // CSS / JS transition
        CSS.supports( 'transition', 'none' ) &&
        // ES6 检测
        Modernizr.arrow && Modernizr.es6collections && Modernizr.generators && Modernizr.templatestrings
    ){
        _Config.BrowserCheck = true;
    }else{
        location.href = scriptBase + 'Other/UpdateBrowser/UpdateBrowser.html?redirectURL=' + encodeURIComponent( location.href );
    }

}();

/* 核心创建 */
!function(){
    "use strict";

    var hasOwnProperty = Object.prototype.hasOwnProperty,
        ArrayProto     = Array.prototype,
        BrowserCheck   = _Config.BrowserCheck;

    /**
     * [ 可向对象内添加属性, 如果对象内没有该属性或规定强制添加, 则将属性添加到对象内 ]
     * @param {Object}  parent   [ 需要添加属性的父级元素 ]
     * @param {String}  propName [ 需要添加的属性的属性名, 也可传入JSON 或 Function 数据, 为 Function 时需要返回 JSON 数据 ]
     * @param {Object}  prop     [ 需要添加到父级元素内的属性 ]
     * @param {Boolean} coercion [ 是否需要将属性强制添加到父级元素 ]
     * @param {Boolean} isFunc   [ 若设置为 true, 则标记传入的 prop 为 Function, 将在确认添加属性后执行 ]
     * @return {arguments} [ arguments ]
     */
    var _define = window._define = function( parent, propName, prop, coercion, isFunc ){
        switch( typeof propName ){
            case 'string'  :
                /* 如果属性名有空格, 视为向父级元素上添加多个属性 */
                if( propName.indexOf(' ') > -1 && ( propName = propName.split(' ') ) ){
                    for( var i = 0, len = propName.length; i < len; i++ ){
                        _define( parent, propName[ i ], prop, coercion )
                    }
                }else if( coercion || !hasOwnProperty.call( parent, propName ) ){
                    if( isFunc ){ prop = prop() }
                    /* 父级元素是数组, 视为向多个父级元素添加属性 */
                    if( parent.join && parent !== Array && parent !== ArrayProto ){
                        for( var i = 0, len = parent.length; i < len; i++ ){
                            _define( parent[ i ], propName, prop, coercion )
                        }
                    }else{
                        parent[ propName ] = prop;
                    }
                }
                break;
            case 'function': _define( parent, propName() || {}, prop, coercion ); break;
            case 'object'  :
                for( var _prop in propName ){
                    _define( parent, _prop, propName[ _prop ], prop, coercion );
                }
                break;
        }
        return arguments;
    }

    /**
     * [ Noop Function ]
     * -- 空方法, 供以后的方法处理默认参数用
     */
    var noop = _define( window, 'noop', function(){}, true )[ 2 ];

    /**
     * [ Core Function ]
     * -- 的核心方法
     * -- 可在任何环境下使用, 但是浏览器不通过检测, 传入的方法将不会被执行
     * -- 方法可以用 Function[ call/ apply ] 的方式使用, 可传入其他 document, 比如 iframe 的 document
     * 
     * @param {Function} func        [ 需要执行的方法 ]
     * @param {Object}   data        [ 需要传入方法中的数据 ]
     */
    var Zui = _define( window, 'ZYUI Zui Zw _', BrowserCheck ? function( func, data ){
        return func.apply( this || window, data );
    } : noop, true)[ 2 ];

    _define( Zui, {
        /** [ 版本号 ] */
        version: '2.0.0',
        /** [ 用作内部唯一ID ] */
        guid: 1,
        /** [ 返回当前事件戳 ] */
        now: function(){
            return +new Date
        }
    }, true);

    /** [ 唯一性 ] */
    _define( Zui, 'expando', 'Zui-' + Zui.version + '_' + Zui.now(), true );

    /**
     * [ 页面框架加载完毕后执行传入代码 ]
     * -- 可在任何环境下使用, 但是浏览器不通过检测, 传入的方法将不会被执行
     * -- 方法可以用 Function[ call/ apply ] 的方式使用, 可传入其他 document, 比如 iframe 的 document
     * 
     * @param {Function} func [ 需要执行的方法 ]
     * @param {Object}   data [ 需要传入方法的数据 ]
     */
    var domReady = _define( document, 'ready', BrowserCheck ? function( func, data ){
        if( this.readyState === "complete" || ( this.readyState !== "loading" && !this.documentElement.doScroll ) ) return func.apply( window, data );
        this.addEventListener('DOMContentLoaded', function callback( event ){
            this.removeEventListener( event.type, callback );
            func.apply( window, data );
        });
    } : noop, true)[ 2 ];

    /**
     * [ 页面完全加载完毕后执行的代码 ]
     * -- 可在任何环境下使用, 但是浏览器不通过检测, 传入的方法将不会被执行
     * -- 方法可以用 Function[ call/ apply ] 的方式使用, 可传入其他 window, 比如 iframe 的 window
     *
     * @param {Function} func [ 需要执行的方法 ]
     * @param {Object}   data [ 需要传入方法的数据 ]
     */
    _define( window, 'ready', BrowserCheck ? function( func, data ){
        if( this.document.readyState === 'complete' ) return func.apply( this, data );
        this.addEventListener('load', function callback( event ){
            this.removeEventListener( event.type, callback );
            func.apply( this, data );
        })
    }: noop, true);

    /** [ 当前页面是否是顶层窗口 ] */
    var isWindowTop = _define( window, 'isWindowTop', window.top === window.self, true )[ 2 ];

    /** [ 当前页面是否被跨域 ] */
    _define( window, function(){
        var isCrossDomain = false,
            showMsg = function(){console.log(decodeURIComponent('%25c%E5%80%9A%E7%AA%97%E5%90%AC%E9%9B%A8%20%E3%81%A5%E9%86%89%E6%97%A0%E5%BF%83%20%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%0A%20%20%20%20--%20Carpe%20Diem%2C%20Con%20Respicio%20!%0A%20%20%20%20--%20http%3A%2F%2Fwww.zw-blog.com%2F'),'color:#279F76')};

        if( isWindowTop ) showMsg();//当前页面是顶层窗口
        else{
            try{//可能会遇到跨域问题,会报错
                window.top.Zw || showMsg();//如果是同一个域名下,但是没有对象
            }catch(e){//如果出现跨域问题,就依旧提示信息
                showMsg();
                isCrossDomain = true;
            }
        }

        return { isCrossDomain: isCrossDomain }
    }, true);

}();

/* 对于 ECMAScript 的扩展 */
_(function(){
    "use strict";

    var StringProto  = String.prototype,
        ElementProto = Element.prototype;

    /* ------ Window ------ */

        /** [ Copy from jQuery > DOMEval ] */
        _define( window, 'DOMEval', function( code, doc ){
            doc = doc || document;
            var script = doc.createElement( 'script' );
                script.text = code;
            doc.head.appendChild( script ).parentNode.removeChild( script );
        }, true);

        /** [ 判断传入参数是否为window对象 ] */
        var isWindow = _define( window, 'isWindow', function( obj ){
            return obj != null && obj === obj.window;
        }, true)[ 2 ];

        /** [ 判断传入对象的类型 ] */
        var type = _define( window, 'type', function( obj, type ){
            if( obj == null ) return obj + '';
            return ( type = typeof obj ) == 'object'
                        ? ArrayIsArray( obj ) ? 'array' : type
                        : type;
        }, true)[ 2 ];

        var defineProperty = Object.defineProperty;

        /**
         * [ 对 Object.defineProperty 的扩展 ]
         * 1. _oDefine( Object, name, descriptor )
         * 2. _oDefine( Object, name, descriptor, cantDelete )
         * 3. _oDefine( Object, JSON[name:descriptor] )
         * 4. _oDefine( Object, JSON[name:descriptor], cantDelete )
         * 5. _oDefine( Object, name, descriptorName, descriptorValue )
         * 6. _oDefine( Object, name, descriptorName, descriptorValue, cantDelete )
         * 7. _oDefine( Object, name, descriptorName, descriptorValue, [ cantDelete, isFunction ] )
         * 8. _oDefine( Object, name, getFunction, cantDelete )
         * 9. _oDefine( Object, name, cantDelete )
         */
        _define( window, function(){

            function toDefineProperty( obj, name, descriptor, cantDelete ){
                // 设置不可删除属性不可检索属性
                descriptor.configurable = descriptor.enumerable = !cantDelete;
                // 属性注入
                defineProperty( obj, name, descriptor );
            }

            return {
                _oDefine: function( obj, name, descriptor, options, temp ){
                    if( type( name ) == 'object' )// [ 3, 4 ]
                        return each( name, function( name, value ){ _oDefine( obj, name, value, options ) }),
                               arguments;
                    switch( type( descriptor ) ){
                        // [ 8 ]
                        case 'function': toDefineProperty( obj, name, { get: function(){ return descriptor } }, options );
                                         break;
                        // [ 9 ]
                        case 'boolean' : toDefineProperty( obj, name, {}, options );
                                         break;
                        // [ 5,6,7 ]
                        case 'string'  : toDefineProperty.apply( window,
                                             [ obj, name, {}._set_( descriptor, options ) ].concat(
                                                Array.isArray( temp ) ? temp.concat( descriptor )
                                                                      : [ temp ]
                                             )
                                         );
                                         break;
                        // [ 1, 2 ]
                        default: toDefineProperty( obj, name, descriptor, options );
                    }
                    return arguments;
                }
            }
        }, true);
    
    /* ------ Object ------ */

        /**
         * [ 判断一个对象是否是空对象 ]
         */
        var isEmptyObject = _define( Object, 'isEmptyObject', function( obj ){
            for ( var name in obj )
                return false;
            return true;
        }, true)[ 2 ];

    /* ------ document ------ */

        /** [ 将 html 标签的引用放入 documnet ] */
        _define( document, 'html', document.documentElement, true );

    /* ------ String.prototype ------ */

        /** [ 可通过此参数快速判断参数是否为 String ] */
        _define( StringProto, 'isString', true, true );

        /** [ 将字符串首字母大写 ] */
        _define( StringProto, 'toCapitalize', function(){
            return this.substr(0,1).toUpperCase() + this.substr(1)
        }, true);

        /**
         * [ 判断一个字符串是否包含在另一个字符串中 ]
         * -- String.prototype.includes Polyfill
         * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
         */
        _define( StringProto, 'includes', function(a,b){"use strict";return"number"!=typeof b&&(b=0),b+a.length>this.length?!1:-1!==this.indexOf(a,b)} );

        /**
         * [ 用来判断当前字符串是否是以另外一个给定的子字符串开头的 ]
         * -- String.prototype.startsWith Polyfill
         * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
         */
        _define( StringProto, 'startsWith', function(a,b){return this.substr(b||0,a.length)===a} );

        /**
         * [ 用来判断当前字符串是否是以另外一个给定的子字符串结尾的 ]
         * -- String.prototype.endsWith Polyfill
         * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
         */
        _define( StringProto, 'endsWith', function(a,b){return b<this.length?b|=0:b=this.length,this.substr(b-a.length,a.length)===a} );

        /**
         * [ 将字符串重复指定次数并返回 ]
         * [ String.prototype.repeat Polyfill ]
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
         */
        _define( StringProto, 'repeat', function(a){"use strict";var c,b=""+this;if(a=+a,a!=a&&(a=0),a=Math.floor(a),0==b.length||0==a)return"";for(c="";1==(1&a)&&(c+=b),a>>>=1,0!=a;)b+=b;return c} );

        /**
         * [ 用第二个参数中指定的填充字符串, 在当前字符串的头部部不断填充, 直到它达到第一个参数中指定的目标长度 ]
         * -- String.prototype.padStart Polyfill
         * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
         */
        _define( StringProto, 'padStart', function(a,b){return a>>=0,b=String(b||" "),this.length>a?String(this):(a-=this.length,a>b.length&&(b+=b.repeat(a/b.length)),b.slice(0,a)+String(this))} );

        /**
         * [ 用第二个参数中指定的填充字符串, 在当前字符串的尾部不断填充, 直到它达到第一个参数中指定的目标长度 ]
         * -- String.prototype.padEnd Polyfill
         * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
         */
        _define( StringProto, 'padEnd', function(a,b){return a>>=0,b=String(b||" "),this.length>a?String(this):(a-=this.length,a>b.length&&(b+=b.repeat(a/b.length)),String(this)+b.slice(0,a))} );

    /* ------ Function.prototype ------ */

        /** [ 可通过此参数快速判断参数是否为 Function ] */
        _define( Function.prototype, 'isFunction', true, true );

    /* ------ Boolean.prototype ------ */

        /** [ 可通过此参数快速判断参数是否为 Boolean ] */
        _define( Boolean.prototype, 'isBoolean', true, true );
        
            /* ------ RegExp.prototype ------ */
        
                /** [ 可通过此参数快速判断参数是否为 RegExp ] */
                _define( RegExp.prototype, 'isRegExp', true, true );
            
            /* ------ Number ------ */
        
                /** [ 判断传入参数是否为数字 ] */
                _define( Number, 'isNumber', function( obj, type ){
                    return ( ( type = typeof( obj ) ) == 'number' || type == 'string' ) && !isNaN( obj - parseFloat( obj ) );
                }, true);
        
            /* ------ Array ------ */
        
                /** [ 判断传入参数是否是数组 ] */
                var ArrayIsArray = Array.isArray;
        
                /** [ 判断传入参数是否为为类 Array 对象 ] */
                _define( Array, 'isArrayLike', function( obj ){
                    var _type = type( obj ), length;
        
                    return _type == 'array'
                                ? true
                                : [ 'boolean', 'number', 'string' ,'function' ].inArray( _type ) || isWindow( obj )
                                    ? false
                                    : ( length = !!obj && "length" in obj && obj.length ) === 0 || typeof length == "number" && length > 0 && ( length - 1 ) in obj
                }, true);
        
                /**
                 * [ 把类似数组的对象转为数组 ]
                 * @param  {Object} likeArray [ 类似数组的对象 ]
                 * @return {Array}            [ 转换完毕的数组 ]
                 */
                var toArray = _define( Array, 'toArray copy', function( likeArray ){
                    return ArraySlice.call( likeArray );
                }, true)[ 2 ];
        
                /**
                 * [ 快捷创建数组 ]
                 * @param {Number} length [ 需要创建的数组的长度 ]
                 * @param {Object} insert [ 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index ]
                 */
                _define( Array, 'createArray', function( length, insert ){
                    length >>= 0;
                    for( var i = 0, result = []; i < length; i++ )
                        result.push( insert && insert.isFunction ? insert( i ) : insert );
                    return result;
                }, true);
        
            /* ------ Array.prototype ------ */
        
                var ArrayProto = Array.prototype;
        
                /** [ 选择一个范围进行数组浅拷贝, 原数组不会被改动 ] */
                var ArraySlice = ArrayProto.slice;
        
                /** [ 可通过此参数快速判断参数是否为 Array ] */
                _define( ArrayProto, 'isArray', true, true );
        
                /**
                 * [ 查找数组内是否有此传入参数 ]
                 * -- 弱检测
                 * -- 强检测请使用 Array.prototype.includes
                 */
                _define( ArrayProto, 'inArray', function( elem ){
                    for( var i = 0, length = this.length; i < length; i++ )
                        if( this[ i ] == elem ) return true
                    return false;
                }, true);
        
                /**
                 * [ 用来判断一个数组是否包含一个指定的值 ]
                 * -- Array.prototype.includes Polyfill
                 * -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
                 */
                _define( ArrayProto, 'includes', function(a,b){var e,f,c=Object(this),d=c.length>>>0;if(0===d)return!1;for(e=0|b,f=Math.max(e>=0?e:d-Math.abs(e),0);d>f;){if(c[f]===a)return!0;f++}return!1} );
        
                /** [ 在数组指定位置添加元素 ] */
                _define( ArrayProto, 'add', function( index, value ){
                    return this.splice( index, 0, value ), this;
                }, true);
        
                /** [ 删除数组元素, 返回本身 ] */
                _define( ArrayProto, 'delete remove', function( index, num ){
                    return this.splice( index, num == null ? 1 : num ), this
                }, true);
        
                /** [ 将数字指定位置元素设置为新值 ] */
                _define( ArrayProto, 'set edit', function( index, value ){
                    return this.splice( index, 1, value ), this;
                }, true);
        
                /** [ 将数组中的指定值过滤 ] */
                _define( ArrayProto, 'deleteValue removeValue', function( value ){
                    var i = 0, len = this.length;
                    for( ; i < len; i++ )
                        if( this[ i ] === value ){ this.delete( i ); len --; i -- }
                    return this;
                }, true);
        
                /** [ 向数组末尾添加元素, 然后返回本身 ] */
                _define( ArrayProto, '_push', function(){ return this.push.apply( this, arguments ), this }, true );
        
                /** [ 向数组前端添加元素, 然后返回本身 ] */
                _define( ArrayProto, '_unshift', function(){ return this.unshift.apply( this, arguments ), this }, true );
        
            /* ------ Object.prototype ------ */
        
                var keys        = Object.keys,
                    ObjectProto = Object.prototype;
        
                /** [ 对象遍历方法 ] */
                var ObjectEach = _oDefine( ObjectProto, 'each', {
                    get: function(){
                        return this._zui_each_ || function( callback ){
                            var nameArr = keys( this ), i = 0, len = nameArr.length;
                            for( ; i < len; i++ ){
                                var name  = nameArr[ i ], value = this[ name ];
                                if( callback.call( value, name, value, this ) === false )
                                    break;
                            }
                            return this;
                        }
                    },
                    set: function( setter ){
                        _oDefine( this, '_zui_each_', { value: setter, enumerable: false });
                    }
                }, true )[ 2 ].get();
        
                /** [ 给对象设置一个值 ] */
                _oDefine( ObjectProto, '_set_', function( name, value, func ){
                    return ( this[ name ] = func ? func( value ) : value ), this;
                }, true);
        
                /** [ 获取对象一个值 ] */
                _oDefine( ObjectProto, '_get_', function( name ){ return this[ name ] }, true);
        
                /** [ 可返回对象本身 ] */
                _oDefine( ObjectProto, '_self_', function(){ return this } , true );
        
                /** [ 可返回对象本身 ] */
                _oDefine( ObjectProto, '__self__', 'get', function(){ return this } , true );
        
                /** [ 删除对象内值和传入参数相同的键值对 ] */
                _oDefine( ObjectProto, 'removeValue', function( value ){
                    var self = this;
                    return this.each(function( name, _value ){
                        return _value === value && delete self[ name ];
                    });
                }, true );
        
                /* ------ Window ------ */
        
                    /** [ 可对传入对象进行遍历 ] */
                    _define( window, 'each', function( obj, callback ){
                        return ObjectEach.call( obj, callback )
                    }, true);
        
        
            /* ------ Element.prototype ------ */
        
                /* [ 元素查找重命名 ] */
                [ document, ElementProto ].forEach( function( self ){
                    _define( self, { 'query find': self.querySelectorAll, 'queryFirst findFirst': self.querySelector }, true);
                });
        
                /** [ 判断元素是否被指定的选择器字符串选择 ] */
                _define( ElementProto, 'matches', function(){
                    return ElementProto.webkitMatchesSelector || ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.matchesSelector;
                }, false, true);
        
                _define( ElementProto, {
                    /** [ 判断元素是否是指定类型 ] */
                    is: function( selector ){
                        return selector.nodeType ? this === selector
                                                 : typeof selector == 'string' ? this.matches( selector )
                                                                               : false;
                    },
                    /**
                     * [ is 方法的相反引用 ]
                     * 
                     * @add 1.1.0
                     */
                    not: function( selector ){
                        return !this.is( selector );
                    }
                }, true );
        
                /** [ 有些方法, 需要同时绑定到多个父级元素中 ] */
                var _SomeParent = [ ElementProto, document, window ];
        
                /** [ 在元素上存储数据 ] */
                _define( _SomeParent, function(){
        
                    function get( elem ){
                        return elem[ elem ] || ( elem[ elem ] = {} )
                    }
        
                    return {
                        /** [ 设置或读取元素上的数据 ] */
                        data: function( name, value ){
                            if( arguments.length > 1 ) return get( this )[ name ] = value, this;
                            return name == null ? get( this )
                                                : get( this )[ name ];
                        },
                        /** [ 判断元素上是否有传入数据 ] */
                        hasData: function( name ){
                            return name == null ? !!get( this )
                                                : get( this ).hasOwnProperty( name );
                        },
                        /** [ 移除元素上的数据 ] */
                        'removeData deleteData': function( names ){
                            var self = this;
                            names.split(' ').forEach(function( name ){
                                delete get( self )[ name ];
                            });
                            return this;
                        }
                    }
                }, true);

/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
        /* ------ 事件处理移植自 jQuery v3.2.1 ------ 特此声明 ------ */

        [ 'addEventListener', 'removeEventListener' ].forEach(function( event ){
            _SomeParent.forEach(function( parent ){
                parent[ '_' + event ] = parent[ event ];
            });
        });

        function returnTrue(){
            return true
        };
        function returnFalse(){
            return false
        };
        function acceptData( owner ) {
            return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
        };
        function nodeName( elem, name ){
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        };

        var hasOwn = _Config.hasOwnProperty;
        var assign = Object.assign;

        var rkeyEvent      = /^key/,
            rmouseEvent    = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)/,
            rnothtmlwhite  = /[^\x20\t\r\n\f]+/g,
            needsContext   = /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
            rfocusMorph    = /^(?:focusinfocus|focusoutblur)$/;

        // Event is based on DOM3 Events as specified by the ECMAScript Language Binding
        // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
        var Event = ( Zui.Event = Object.create( null ) ).Event =function( src, props ){

            if( !( this instanceof Event ) ){// 允许实例化时不使用 new 关键字
                return new Event( src, props );
            }
            // Event object
            if ( src && src.type ) {
                this.originalEvent = src;
                this.type = src.type;
                // Events bubbling up the document may have been marked as prevented
                // by a handler lower down the tree; reflect the correct value.
                this.isDefaultPrevented = src.defaultPrevented ||
                        src.defaultPrevented === undefined &&
                        // Support: Android <=2.3 only
                        src.returnValue === false ? returnTrue : returnFalse;
                // Create target properties
                // Support: Safari <=6 - 7 only
                // Target should not be a text node (#504, #13143)
                this.target = ( src.target && src.target.nodeType === 3 ) ?
                    src.target.parentNode :
                    src.target;
                this.currentTarget = src.currentTarget;
                this.relatedTarget = src.relatedTarget;
            // Event type
            } else {
                this.type = src;
            }
            // Put explicitly provided properties onto the event object
            if ( props ) {
                assign( this, props );
            }
            // Create a timestamp if incoming event doesn't have one
            this.timeStamp = src && src.timeStamp || +new Date;
            // Mark it as fixed
            this[ Zui.expando ] = true;
        }
        Event.prototype = {
            constructor: Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: false,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if ( e && !this.isSimulated ) {
                    e.preventDefault();
                }
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if ( e && !this.isSimulated ) {
                    e.stopPropagation();
                }
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue;
                if ( e && !this.isSimulated ) {
                    e.stopImmediatePropagation();
                }
                this.stopPropagation();
            }
        }

        each({
            altKey: true, bubbles: true, cancelable: true, changedTouches: true, ctrlKey: true, detail: true, eventPhase: true, metaKey: true, pageX: true, pageY: true, shiftKey: true, view: true, "char": true, charCode: true, key: true, keyCode: true, button: true, buttons: true, clientX: true, clientY: true, offsetX: true, offsetY: true, pointerId: true, pointerType: true, screenX: true, screenY: true, targetTouches: true, toElement: true, touches: true,
            which: function( event ) {
                var button = event.button;
                if ( event.which == null && rkeyEvent.test( event.type ) ) {
                    return event.charCode != null ? event.charCode : event.keyCode;
                }
                if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
                    if ( button & 1 ) return 1;
                    if ( button & 2 ) return 3;
                    if ( button & 4 ) return 2;
                    return 0;
                }
                return event.which;
            }
        }, function( name, hook ){
            Object.defineProperty( Event.prototype, name, {
                enumerable: true,
                configurable: true,
                get: hook.isFunction
                        ? function(){
                            if( this.originalEvent )
                                return hook( this.originalEvent );
                        }
                        : function(){
                            if( this.originalEvent )
                                return this.originalEvent[ name ];
                        },
                set: function( value ){
                    Object.defineProperty( this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                }
            });
        });


        /**
         * [ 事件处理第二层 ]
         */
        var event = Zui.Event.event = {

            global: {},

            /** [ 添加事件到元素缓存中, 绑定事件 ] */
            add: function( elem, types, handler, data, selector ){

                var handleObjIn, eventHandle, tmp,
                /** [ 保存该元素的事件列表 ] */
                events,
                t, handleObj,
                special, handlers, type, namespaces, origType, isSelf,
                /** [ 通过元素本身缓存元素数据 ] */
                elemData = elem.data();
        
                // 如果 handler 是个包含 handler 和 selector 的对象, 则定位必要的参数
                // what's this ?
                if( handler.handler ) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector;
                }
        
                // 如果handler没有ID, 则给个ID给他, 用于未来寻找或者删除handler
                handler.guid || ( handler.guid = Zui.guid++ );
                // 初始化元素数据中的 events 数据
                events = elemData.events || ( elemData.events = {} );
        
                // 初始化elemData.handle
                if( !( eventHandle = elemData.handle ) ){
                    eventHandle = elemData.handle = function( e ){
                        // 忽略 trigger 事件, 否则调用 dispatch 方法
                        // handle方法类似于一个代理, 把真正的工作交给 dispatch
                        return event.triggered !== e.type && event.dispatch.apply( elem, arguments );
                    }
                }

                // 事件可能是通过空格键分隔的字符串, 所以将其变成字符串数组
                types = ( types || '' ).match( rnothtmlwhite ) || [ '' ];
                t = types.length;// 事件的长度
                while( t-- ){// 遍历所有事件
                    // 尝试取出事件命名空间
                    // 'mouseover.a.b' => [ 'mouseover.a.b', 'mouseover', 'a.b' ]
                    tmp = rtypenamespace.exec( types[ t ] ) || [];
                    // 取出事件
                    type = origType = tmp[ 1 ];
                    // 取出事件命名空间
                    // 'a.b' => [ 'a', 'b' ]
                    namespaces = ( tmp[ 2 ] || '' ).split( '.' ).sort();

                    /**
                     * @Update:
                     *      @1.1.0: 在绑定事件时, 末尾添加 '.self' 可以指定只能自身元素触发
                     */
                    if( ( isSelf = namespaces.length ) && namespaces[ isSelf - 1 ] == 'self' ){
                        namespaces.pop( isSelf = true );
                    }

                    // 事件不存在, 跳过
                    if( !type ) continue;
        
                    // 兼容性处理
                    special = event.special[ type ] || {};
                    type = ( selector ? special.delegateType : special.bindType ) || type;
                    special = event.special[ type ] || {};
        
                    // 创建事件处理对象
                    // 这里保存了事件的各种属性, 包括事件名称, 数据, guid, 委托标签(selector), 处理函数等等
                    handleObj = assign({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && needsContext.test( selector ),
                        namespace: namespaces.join( '.' ),
                        isSelf: isSelf === true
                    }, handleObjIn);
        
                    // 针对当前事件类型, 初始化事件处理列队, 如果是第一次使用, 则执行初始化
                    if( !( handlers = events[ type ] ) ){
                        handlers = events[ type ] = [];
                        handlers.delegateCount = 0;
        
                        // 真正的逻辑在这里, 先不考虑兼容性处理, 把上面的事件处理器绑定到DOM对象中去
                        if( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ){
                            elem._addEventListener( type, eventHandle );
                        }
                    }
                    // 兼容性处理
                    if( special.add ){
                        special.add.call( elem, handleObj );
        
                        if( !handleObj.handler.guid ){
                            handleObj.handler.guid = handler.guid;
                        }
                    }

                    // 如果有委托参数, 将委托函数插入队列的前排头等舱位置
                    if( selector ){
                        handlers.splice( handlers.delegateCount++, 0, handleObj );
                    }else{
                        handlers.push( handleObj );
                    }
        
                    // 标示当前事件曾经处理过, 用于事件优化
                    event.global[ type ] = true;
                }
            },

            dispatch: function( nativeEvent ){

                // 重写原生事件对象, 变成一个可读写的对象, 方便未来修改、扩展
                var _event = event.fix( nativeEvent );

                var i, j, ret, matched, handleObj, handlerQueue,
                    // 把参数转成数组
                    args = new Array( arguments.length ),
                    // 从内部数据中查找该元素的对应事件处理器列表中的对应处理器，否则为空数组
                    handlers = ( this.data('events') || {} )[ _event.type ] || [],
                    // 尝试将事件转成特殊事件
                    special = event.special[ _event.type ] || {};

                // 将参数数组中的原生事件对象换成重写的事件对象
                args[ 0 ] = _event;
                // 将传入的其他参数添加到 args 中
                for ( i = 1; i < arguments.length; i++ ) {
                    args[ i ] = arguments[ i ];
                }
                // 存储受委托的 DOM 元素
                _event.delegateTarget = this;

                // 尝试使用特殊事件的preDispatch钩子来绑定事件，并在必要时退出
                if ( special.preDispatch && special.preDispatch.call( this, _event ) === false ) {
                    return;
                }
                
                // 组装事件处理包{elem, handlerObjs}(这里是各种不同元素)的队列
                handlerQueue = event.handlers.call( this, _event, handlers );

                i = 0;
                // 遍历事件处理包{elem, handlerObjs}(取出来则对应一个包了)，且事件不需要阻止冒泡
                while ( ( matched = handlerQueue[ i++ ] ) && !_event.isPropagationStopped() ) {
                    // 定义当前 Target 为事件处理对象对应的元素
                    _event.currentTarget = matched.elem;

                    j = 0;
                    // 如果事件处理对象{handleObjs}存在(一个元素可能有很多handleObjs)，且事件不需要立刻阻止冒泡
                    while ( ( handleObj = matched.handlers[ j++ ] ) && !_event.isImmediatePropagationStopped() ) {

                        // 触发的事件必须满足其一：
                        // 1) 没有命名空间
                        // 2) 有命名空间，且被绑定的事件是命名空间的一个子集
                        if ( !_event.rnamespace || _event.rnamespace.test( handleObj.namespace ) ) {

                            _event.handleObj = handleObj;
                            _event.data = handleObj.data;

                            /**
                             * @Update:
                             *      @1.1.0: 在绑定事件时, 末尾添加 '.self' 可以指定只能自身元素触发
                             */
                            if( handleObj.isSelf ){
                                if( _event.target != _event.currentTarget ){
                                    return;
                                }
                            }

                            // 尝试通过特殊事件获取处理函数，否则使用handleObj中保存的handler(所以handleObj中还保存有handler)
                            ret = ( ( event.special[ handleObj.origType ] || {} ).handle || handleObj.handler ).apply( matched.elem, args );

                            // 如果处理函数存在
                            if ( ret !== undefined ) {
                                // 如果处理函数返回值是false，则阻止冒泡，阻止默认动作
                                if ( ( _event.result = ret ) === false ) {
                                    _event.preventDefault();
                                    _event.stopPropagation();
                                }
                            }
                        }
                    }
                }

                // 尝试通过special.postDispatch勾住这个映射关系，未来可以优化
                if ( special.postDispatch ) {
                    special.postDispatch.call( this, _event );
                }

                // 返回事件函数
                return _event.result;
            },

            fix: function( originalEvent ){
                return  originalEvent[ Zui.expando ] ? originalEvent
                                                        : new Event( originalEvent );
            },

            handlers: function( event, handlers ){
                var i, handleObj, sel, matchedHandlers, matchedSelectors,
                    handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    // 当前事件触发元素
                    cur = event.target;
                
                // 如果有 delegateCount，代表该事件是 delegate 类型的绑定
                // 找出所有delegate的处理函数列队
                if ( delegateCount && cur.nodeType && !( event.type === "click" && event.button >= 1 ) ) {
                    
                    // 遍历元素及元素父级节点
                    for ( ; cur !== this; cur = cur.parentNode || this ) {
        
                        // 防止单击被禁用的元素时触发事件
                        if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
                            // 开始组装符合要求的事件处理对象
                            matchedHandlers = [];
                            matchedSelectors = {};
                            // 遍历所有事件处理对象
                            for ( i = 0; i < delegateCount; i++ ) {
                                handleObj = handlers[ i ];

                                // 选择器，用于过滤
                                sel = handleObj.selector + " ";

                                // 如果matches上没有绑定该选择器数量
                                if ( matchedSelectors[ sel ] === undefined ) {
                                    // 在matches上绑定该选择器数量
                                    matchedSelectors[ sel ] = handleObj.needsContext
                                        ? toArray( this.query( sel ) ).includes( cur )
                                        : toArray( this.query( sel ) ).filter(function( elem ){ return cur === elem }).length
                                }
                                // 再次确定是否绑定选择器数量
                                if ( matchedSelectors[ sel ] ) {
                                    matchedHandlers.push( handleObj );
                                }
                            }
                            if ( matchedHandlers.length ) {
                                handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
                            }
                        }
                    }
                }

                cur = this;
                // 如果还有事件剩余，则将剩余的装包，推入列队
                if ( delegateCount < handlers.length ) {
                    handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
                }
        
                return handlerQueue;
            },

            special: {
                // 防止 image.load 冒泡到 window.load
                load: { noBubble: true },
                focus: {
                    trigger: function() {
                        if ( this !== document.activeElement && this.focus ) {
                            this.focus();
                            return false;
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if ( this === document.activeElement && this.blur ) {
                            this.blur();
                            return false;
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ( this.type === "checkbox" && this.click && nodeName( this, 'input' ) ) {
                            this.click();
                            return false;
                        }
                    },
                    _default: function( event ) {
                        var self = event.target;
                        return nodeName( self, 'a' );
                    }
                },
                beforeunload: {
                    postDispatch: function( event ) {
                        if ( event.result !== undefined && event.originalEvent ) {
                            event.originalEvent.returnValue = event.result;
                        }
                    }
                }
            },

            remove: function( elem, types, handler, selector, mappedTypes ){

                var j, origCount, tmp,
                    events, t, handleObj,
                    special, handlers, type, namespaces, origType,
                    elemData = elem.hasData() && elem.data();
                
                // 如果没有相关缓存数据，或者缓存中没有相关处理列表，则这个对象没事件可删除
                if ( !elemData || !( events = elemData.events ) ) {
                    return;
                }

                // types可能是通过空格分隔的多个type，转成数组
                types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
                t = types.length;
                while ( t-- ) {
                    // 分解type和namespace
                    tmp = rtypenamespace.exec( types[ t ] ) || [];
                    // 得到type
                    type = origType = tmp[ 1 ];
                    // 得到namespace
                    namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
        
                    // 如果type是undefined，即原来的type是.xxx.xxx之类的命名空间
                    if ( !type ) {
                        // 从事件列表读取所有事件
                        for ( type in events ) {
                            // 添加命名空间，删除掉这些事件
                            event.remove( elem, type + types[ t ], handler, selector, true );
                        }
                        continue;
                    }
        
                    // 尝试得到特殊事件
                    special = event.special[ type ] || {};
                    type = ( selector ? special.delegateType : special.bindType ) || type;
                    handlers = events[ type ] || [];
                    tmp = tmp[ 2 ] &&
                        new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
        
                    // 删除掉满足的事件
                    origCount = j = handlers.length;
                    while ( j-- ) {
                        // 得到事件对象
                        handleObj = handlers[ j ];
        
                        // 参数mappedTypes存在或当前事件和handleObj中的当前事件相同
                        if ( ( mappedTypes || origType === handleObj.origType ) &&
                            // 并且参数handler不存在，或handler的ID与handleObj的ID相同
                            ( !handler || handler.guid === handleObj.guid ) &&
                            // 并且没有命名空间，或者是handleObj的命名空间子集
                            ( !tmp || tmp.test( handleObj.namespace ) ) &&
                            // 并且没有selector，或者selector与handleObj的selector相同，
                            // 或者selector为"**"(表示任意)并且handleObj的selector存在
                            ( !selector || selector === handleObj.selector ||
                                selector === "**" && handleObj.selector ) ) {
                            // 全部满足则删除掉当前事件对象
                            handlers.splice( j, 1 );
        
                            // 如果handleObj有selector
                            if ( handleObj.selector ) {
                                handlers.delegateCount--;
                            }
                            // 如果特殊事件remove存在，则调用special.remove
                            // 应该和special.add对应，目前应当没什么用
                            if ( special.remove ) {
                                special.remove.call( elem, handleObj );
                            }
                        }
                    }
        
                    // 如果缓存中本来存在事件处理对象，且当前没有事件处理对象
                    // 证明全部在上面循环中删除掉了，就清除掉
                    // 避免潜在的特殊事件处理程序无限递归
                    if ( origCount && !handlers.length ) {
                        // 则尝试用special.teardown删除事件对handle的绑定
                        if ( !special.teardown ||
                            special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
                            // 不成功则使用removeEventListener删除绑定
                            // 这里虽然还是这么写但实际上就是removeEventListener了
                            elem._removeEventListener( type, elemData.handle );
                        }
        
                        // 删除缓存中对应事件处理函数列表
                        delete events[ type ];
                    }
                }
                // 如果缓存events已经空了，该对象没有任何事件绑定了
                if ( isEmptyObject( events ) ) {
                    // 清除掉events
                    elem.removeData('handle events');
                }
            },

            trigger: function( _event, data, elem, onlyHandlers ){

                var i, cur, tmp, bubbleType, ontype, handle, special,
                    // 需要触发事件的所有元素队列    
                    eventPath = [ elem || document ],
                    // 指定事件类型
                    type = hasOwn.call( _event, "type" ) ? _event.type : _event,
                    // 事件是否有命名空间，有则分割成数组
                    namespaces = hasOwn.call( _event, "namespace" ) ? _event.namespace.split( "." ) : [];

                cur = tmp = elem = elem || document;

                // 仅对focus/blur事件变种成focusin/out进行处理
                // 如果浏览器原生支持focusin/out，则确保当前不触发他们
                if ( rfocusMorph.test( type + event.triggered ) ) {
                    return;
                }

                // 如果type有命名空间
                if ( type.indexOf( "." ) > -1 ) {
                    // 重新组装事件
                    namespaces = type.split( "." );
                    type = namespaces.shift();
                    namespaces.sort();
                }
                // 看看是否需要改成ontype形式
                ontype = type.indexOf( ":" ) < 0 && "on" + type;

                // 看看这个是不是由Event生成的实例，否则用Event改造
                _event = _event[ Zui.expando ]
                            ? _event
                            : new Event( type, typeof _event === "object" && _event );

                // 对event预处理
                _event.isTrigger = onlyHandlers ? 2 : 3;
                _event.namespace = namespaces.join( "." );
                _event.rnamespace = _event.namespace ?
                    new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
                    null;

                // 清除数据，以重新使用
                _event.result = undefined;
                // 如果事件没有触发元素，则用elem代替
                if ( !_event.target ) {
                    _event.target = elem;
                }

                // 如果data为空，则传入处理函数的是event，否则由data和event组成
                data = data == null
                    ? [ _event ]
                    : [ _event ].concat( toArray( data ) )

                // 尝试通过特殊事件进行处理，必要时候退出函数
                special = event.special[ type ] || {};
                if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
                    return;
                }

                // 如果需要冒泡，特殊事件不需要阻止冒泡，且elem不是window对象
                if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {
        
                    // 冒泡时是否需要转成别的事件(用于事件模拟)
                    bubbleType = special.delegateType || type;
                    // 如果不是变形来的foucusin/out事件
                    if ( !rfocusMorph.test( bubbleType + type ) ) {
                        // 则定义当前元素父节点
                        cur = cur.parentNode;
                    }
                    // 遍历自身及所有父节点
                    for ( ; cur; cur = cur.parentNode ) {
                        // 推入需要触发事件的所有元素队列
                        eventPath.push( cur );
                        // 存一下循环中最后一个cur
                        tmp = cur;
                    }
        
                    // 如果循环中最后一个cur是document，那么事件是需要最后触发到window对象上的
                    // 将window对象推入元素队列
                    if ( tmp === ( elem.ownerDocument || document ) ) {
                        eventPath.push( tmp.defaultView || tmp.parentWindow || window );
                    }
                }

                // 触发所有该事件对应元素的事件处理器
                i = 0;
                // 遍历所有元素，并确保事件不需要阻止冒泡
                while ( ( cur = eventPath[ i++ ] ) && !_event.isPropagationStopped() ) {

                    // 先确定事件绑定类型是delegateType还是bindType
                    _event.type = i > 1 ?
                        bubbleType :
                        special.bindType || type;

                    // 确保缓存中该元素对应事件中包含事件处理器，
                    // 则取出主处理器(jQuery handle)来控制所有分事件处理器
                    handle = ( cur.data('events') || {} )[ _event.type ] &&
                        cur.data('handle');
                    // 如果主处理器(jQuery handle)存在
                    if ( handle ) {
                        // 触发处理器
                        handle.apply( cur, data );
                    }

                    // 取出原生事件处理器elem.ontype
                    // 比如click事件就是elem.onclick
                    handle = ontype && cur[ ontype ];
                    // 如果原生事件处理器存在，看看需不需要阻止事件在浏览器上的默认动作
                    if ( handle && handle.apply && acceptData( cur ) ) {
                        _event.result = handle.apply( cur, data );
                        if ( _event.result === false ) {
                            _event.preventDefault();
                        }
                    }
                }
                // 保存事件类型，因为这时候事件可能变了
                _event.type = type;

                // 如果不需要阻止默认动作，立即执行
                if ( !onlyHandlers && !_event.isDefaultPrevented() ) {
        
                    // 尝试通过特殊事件触发默认动作
                    if ( ( !special._default ||
                        special._default.apply( eventPath.pop(), data ) === false ) &&
                        acceptData( elem ) ) {
        
                        // 调用一个原生的DOM方法具有相同名称的名称作为事件的目标。
                        // 例如对于事件click，elem.click()是触发该事件
                        // 并确保不对window对象阻止默认事件
                        if ( ontype && typeof elem[ type ] == 'function' && !isWindow( elem ) ) {
        
                            // 防止我们触发FOO()来触发其默认动作时，onFOO事件又触发了
                            tmp = elem[ ontype ];
        
                            // 清除掉该事件监听
                            if ( tmp ) {
                                elem[ ontype ] = null;
                            }
        
                            // 当我们已经将事件向上起泡时，防止相同事件再次触发
                            event.triggered = type;
                            // 触发事件
                            elem[ type ]();
                            // 完成清除标记
                            event.triggered = undefined;
        
                            // 事件触发完了，可以把监听重新绑定回去
                            if ( tmp ) {
                                elem[ ontype ] = tmp;
                            }
                        }
                    }
                }
        
                return _event.result;
            },

            simulate: function( type, elem, event ){
                event.trigger( assign( new Event(), event, { type: type, isSimulated: true } ), null, elem );
            }
        };


        /**
         * [ 对于默认原型方法进行 封装/重写 ]
         */
        _define( _SomeParent, function(){

            /**
             * [ 事件绑定参数适配器 ]
             * -- 事件处理第一层
             * -- 将各种情况进行统一处理
             */
            function on( elem, types, selector, data, fn, one ){
                var origFn, type;

                // 传入了 JSON 对象的格式
                if( typeof types == 'object' ){// on( JSON, selector, data )
                    if( selector && !selector.isString ){// on( JSON, data )
                        data = data || selector;
                        selector = undefined
                    }
                    // 遍历 JSON 对象递归调用 on 方法
                    for( type in types ){
                        on( elem, type, selector, data, types[ type ], one );
                    }
                    return elem;
                }

                // on( types, fn, false || true )  原生调用
                if( selector != null && data != null && selector.isFunction && data.isBoolean ){
                    fn = selector;
                    data = selector = undefined;
                }

                if( data == null && fn == null ){
                    fn = selector;
                    data = selector = undefined;
                }else if( fn == null ){
                    if( selector.isString ){// on( types, selector, fn )
                        fn = data;
                        data = undefined;
                    }else{// on( types, data, fn )
                        fn = data;
                        data = selector;
                        selector = undefined;
                    }
                }

                if( fn === false ){// 便捷调用, 直接返回 false 等于阻止冒泡和取消默认事件
                    fn = returnFalse;
                }else if( !fn ){
                    return elem;
                }

                if( one === 1 ){// 只执行一次的方法, 执行一次后删除本事件对象
                    origFn = fn;
                    fn = function( event ){
                        this.off( event );
                        return origFn.apply( this, arguments );
                    }
                    fn.guid = origFn.guid || ( origFn.guid = Zui.guid++ );
                }

                return event.add( elem, types, fn, data, selector ), elem;
            }

            return {
                /** [ 绑定事件 ] */
                'addEventListener on': function( types, selector, data, fn ){
                    return on( this, types, selector, data, fn );
                },
                /** [ 绑定事件且事件仅运行一次 ] */
                'one': function( types, selector, data, fn ){
                    return on( this, types, selector, data, fn, 1 );
                },
                /** [ 取消绑定事件 ] */
                'removeEventListener off': function( types, selector, fn ){
                    var handleObj, type;

                    // 如果传入的是封装过的 Event 对象
                    if( types && types.preventDefault && types.handleObj ){// off( $event )
                        // 通过 types 获取handleObj
                        handleObj = types.handleObj;
                        // 转成字符串来取消事件
                        types.delegateTarget.off(
                            handleObj.namespace ? handleObj.origType + "." + handleObj.namespace
                                                : handleObj.origType,
                            handleObj.selector,
                            handleObj.handler
                        );
                        return this;
                    }
                    // 如果 types 是 JSON 键值对
                    if( typeof types == 'object' ){// off( JSON, [, selector] )
                        for( type in types ){
                            this.off( type, selector, types[ type ] );
                        }
                        return this;
                    }
                    if( selector === false || typeof selector === 'function' ){// off( types [, fn] )
                        fn = selector;
                        selector = undefined
                    }
                    if( fn === false ){
                        fn = returnFalse;
                    }

                    event.remove( this, types, fn, selector );
                },
                /** [ 触发浏览器默认行为及触发绑定在元素上的事件 ] */
                'trigger emit': function( type, data ){
                    event.trigger( type, data, this )
                },
                /** [ 只触发绑定在元素上的事件 ] */
                'triggerHandler emitHandler emitFunc': function( type, data ){
                    event.trigger( type, data, this, true );
                }
            }
        }, true);

/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
/* ------------------------------------ 事件处理 ------------------------------------ */
});

/* 引入其他类库 */
_(function(){

    var requirejs, require, define;

    /** RequireJS 2.3.5 Copyright jQuery Foundation and other contributors. */
    !function(global,setTimeout){function commentReplace(e,t){return t||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var i;for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}}function eachReverse(e,t){if(e){var i;for(i=e.length-1;i>-1&&(!e[i]||!t(e[i],i,e));i-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}function mixin(e,t,i,r){return t&&eachProp(t,function(t,n){!i&&hasProp(e,n)||(!r||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,i,r)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,i,r){var n=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=r,i&&(n.originalError=i),n}function newContext(e){function t(e){var t,i;for(t=0;t<e.length;t++)if("."===(i=e[t]))e.splice(t,1),t-=1;else if(".."===i){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}function i(e,i,r){var n,o,a,s,u,c,d,p,f,l,h=i&&i.split("/"),m=y.map,g=m&&m["*"];if(e&&(c=(e=e.split("/")).length-1,y.nodeIdCompat&&jsSuffixRegExp.test(e[c])&&(e[c]=e[c].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&h&&(e=h.slice(0,h.length-1).concat(e)),t(e),e=e.join("/")),r&&m&&(h||g)){e:for(a=(o=e.split("/")).length;a>0;a-=1){if(u=o.slice(0,a).join("/"),h)for(s=h.length;s>0;s-=1)if((n=getOwn(m,h.slice(0,s).join("/")))&&(n=getOwn(n,u))){d=n,p=a;break e}!f&&g&&getOwn(g,u)&&(f=getOwn(g,u),l=a)}!d&&f&&(d=f,p=l),d&&(o.splice(0,p,d),e=o.join("/"))}return getOwn(y.pkgs,e)||e}function r(e){isBrowser&&each(scripts(),function(t){if(t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===q.contextName)return t.parentNode.removeChild(t),!0})}function n(e){var t=getOwn(y.paths,e);if(t&&isArray(t)&&t.length>1)return t.shift(),q.require.undef(e),q.makeRequire(null,{skipMap:!0})([e]),!0}function o(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function a(e,t,r,n){var a,s,u,c,d=null,p=t?t.name:null,f=e,l=!0,h="";return e||(l=!1,e="_@r"+(T+=1)),c=o(e),d=c[0],e=c[1],d&&(d=i(d,p,n),s=getOwn(j,d)),e&&(d?h=r?e:s&&s.normalize?s.normalize(e,function(e){return i(e,p,n)}):-1===e.indexOf("!")?i(e,p,n):e:(d=(c=o(h=i(e,p,n)))[0],h=c[1],r=!0,a=q.nameToUrl(h))),u=!d||s||r?"":"_unnormalized"+(A+=1),{prefix:d,name:h,parentMap:t,unnormalized:!!u,url:a,originalName:f,isDefine:l,id:(d?d+"!"+h:h)+u}}function s(e){var t=e.id,i=getOwn(S,t);return i||(i=S[t]=new q.Module(e)),i}function u(e,t,i){var r=e.id,n=getOwn(S,r);!hasProp(j,r)||n&&!n.defineEmitComplete?(n=s(e)).error&&"error"===t?i(n.error):n.on(t,i):"defined"===t&&i(j[r])}function c(e,t){var i=e.requireModules,r=!1;t?t(e):(each(i,function(t){var i=getOwn(S,t);i&&(i.error=e,i.events.error&&(r=!0,i.emit("error",e)))}),r||req.onError(e))}function d(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(q.defQueueMap[t]=!0),O.push(e)}),globalDefQueue=[])}function p(e){delete S[e],delete k[e]}function f(e,t,i){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,n){var o=r.id,a=getOwn(S,o);!a||e.depMatched[n]||i[o]||(getOwn(t,o)?(e.defineDep(n,j[o]),e.check()):f(a,t,i))}),i[r]=!0)}function l(){var e,t,i=1e3*y.waitSeconds,o=i&&q.startTime+i<(new Date).getTime(),a=[],s=[],u=!1,d=!0;if(!x){if(x=!0,eachProp(k,function(e){var i=e.map,c=i.id;if(e.enabled&&(i.isDefine||s.push(e),!e.error))if(!e.inited&&o)n(c)?(t=!0,u=!0):(a.push(c),r(c));else if(!e.inited&&e.fetched&&i.isDefine&&(u=!0,!i.prefix))return d=!1}),o&&a.length)return e=makeError("timeout","Load timeout for modules: "+a,null,a),e.contextName=q.contextName,c(e);d&&each(s,function(e){f(e,{},{})}),o&&!t||!u||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,l()},50)),x=!1}}function h(e){hasProp(j,e[0])||s(a(e[0],null,!0)).init(e[1],e[2])}function m(e,t,i,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,q.onScriptLoad,"load","onreadystatechange"),m(t,q.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e;for(d();O.length;){if(null===(e=O.shift())[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));h(e)}q.defQueueMap={}}var x,b,q,E,w,y={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},S={},k={},M={},O=[],j={},P={},R={},T=1,A=1;return E={require:function(e){return e.require?e.require:e.require=q.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?j[e.map.id]=e.exports:e.exports=j[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(y.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},b=function(e){this.events=getOwn(M,e.id)||{},this.map=e,this.shim=getOwn(y.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,i,r){r=r||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,q.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();q.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;P[e]||(P[e]=!0,q.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,i=this.map.id,r=this.depExports,n=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{n=q.execCb(i,o,r,n)}catch(t){e=t}else n=q.execCb(i,o,r,n);if(this.map.isDefine&&void 0===n&&((t=this.module)?n=t.exports:this.usingExports&&(n=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e)}else n=o;if(this.exports=n,this.map.isDefine&&!this.ignore&&(j[i]=n,req.onResourceLoad)){var a=[];each(this.depMaps,function(e){a.push(e.normalizedMap||e)}),req.onResourceLoad(q,this.map,a)}p(i),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(q.defQueueMap,i)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,r=a(e.prefix);this.depMaps.push(r),u(r,"defined",bind(this,function(r){var n,o,d,f=getOwn(R,this.map.id),l=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,m=q.makeRequire(e.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(r.normalize&&(l=r.normalize(l,function(e){return i(e,h,!0)})||""),o=a(e.prefix+"!"+l,this.map.parentMap,!0),u(o,"defined",bind(this,function(e){this.map.normalizedMap=o,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),void((d=getOwn(S,o.id))&&(this.depMaps.push(o),this.events.error&&d.on("error",bind(this,function(e){this.emit("error",e)})),d.enable()))):f?(this.map.url=q.nameToUrl(f),void this.load()):((n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})})).error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(S,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),c(e)}),n.fromText=bind(this,function(i,r){var o=e.name,u=a(o),d=useInteractive;r&&(i=r),d&&(useInteractive=!1),s(u),hasProp(y.config,t)&&(y.config[o]=y.config[t]);try{req.exec(i)}catch(e){return c(makeError("fromtexteval","fromText eval for "+t+" failed: "+e,e,[t]))}d&&(useInteractive=!0),this.depMaps.push(u),q.completeLoad(o),m([o],n)}),void r.load(e.name,m,n,y))})),q.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){k[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var i,r,n;if("string"==typeof e){if(e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(E,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,u(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?u(e,"error",bind(this,this.errback)):this.events.error&&u(e,"error",bind(this,function(e){this.emit("error",e)}))}i=e.id,r=S[i],hasProp(E,i)||!r||r.enabled||q.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(S,e.id);t&&!t.enabled&&q.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},q={config:y,contextName:e,registry:S,defined:j,urlFetched:P,defQueue:O,defQueueMap:{},Module:b,makeModuleMap:a,nextTick:req.nextTick,onError:c,configure:function(e){if(e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs){var t=e.urlArgs;e.urlArgs=function(e,i){return(-1===i.indexOf("?")?"?":"&")+t}}var i=y.shim,r={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?(y[t]||(y[t]={}),mixin(y[t],e,!0,!0)):y[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(R[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=q.makeShimExports(e)),i[t]=e}),y.shim=i),e.packages&&each(e.packages,function(e){var t;t=(e="string"==typeof e?{name:e}:e).name,e.location&&(y.paths[t]=e.location),y.pkgs[t]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(S,function(e,t){e.inited||e.map.unnormalized||(e.map=a(t,null,!0))}),(e.deps||e.callback)&&q.require(e.deps||[],e.callback)},makeShimExports:function(e){return function(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}},makeRequire:function(t,n){function o(i,r,u){var d,p,f;return n.enableBuildCallback&&r&&isFunction(r)&&(r.__requireJsBuild=!0),"string"==typeof i?isFunction(r)?c(makeError("requireargs","Invalid require call"),u):t&&hasProp(E,i)?E[i](S[t.id]):req.get?req.get(q,i,t,o):(p=a(i,t,!1,!0),d=p.id,hasProp(j,d)?j[d]:c(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),q.nextTick(function(){v(),(f=s(a(null,t))).skipMap=n.skipMap,f.init(i,r,u,{enabled:!0}),l()}),o)}return n=n||{},mixin(o,{isBrowser:isBrowser,toUrl:function(e){var r,n=e.lastIndexOf("."),o=e.split("/")[0],a="."===o||".."===o;return-1!==n&&(!a||n>1)&&(r=e.substring(n,e.length),e=e.substring(0,n)),q.nameToUrl(i(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(j,a(e,t,!1,!0).id)},specified:function(e){return e=a(e,t,!1,!0).id,hasProp(j,e)||hasProp(S,e)}}),t||(o.undef=function(e){d();var i=a(e,t,!0),n=getOwn(S,e);n.undefed=!0,r(e),delete j[e],delete P[i.url],delete M[e],eachReverse(O,function(t,i){t[0]===e&&O.splice(i,1)}),delete q.defQueueMap[e],n&&(n.events.defined&&(M[e]=n.events),p(e))}),o},enable:function(e){getOwn(S,e.id)&&s(e).enable()},completeLoad:function(e){var t,i,r,o=getOwn(y.shim,e)||{},a=o.exports;for(d();O.length;){if(null===(i=O.shift())[0]){if(i[0]=e,t)break;t=!0}else i[0]===e&&(t=!0);h(i)}if(q.defQueueMap={},r=getOwn(S,e),!t&&!hasProp(j,e)&&r&&!r.inited){if(!(!y.enforceDefine||a&&getGlobal(a)))return n(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]));h([e,o.deps||[],o.exportsFn])}l()},nameToUrl:function(e,t,i){var r,n,o,a,s,u,c,d=getOwn(y.pkgs,e);if(d&&(e=d),c=getOwn(R,e))return q.nameToUrl(c,t,i);if(req.jsExtRegExp.test(e))s=e+(t||"");else{for(r=y.paths,o=(n=e.split("/")).length;o>0;o-=1)if(a=n.slice(0,o).join("/"),u=getOwn(r,a)){isArray(u)&&(u=u[0]),n.splice(0,o,u);break}s=n.join("/"),s=("/"===(s+=t||(/^data\:|^blob\:|\?/.test(s)||i?"":".js")).charAt(0)||s.match(/^[\w\+\.\-]+:/)?"":y.baseUrl)+s}return y.urlArgs&&!/^blob\:/.test(s)?s+y.urlArgs(e,s):s},load:function(e,t){req.load(q,e,t)},execCb:function(e,t,i,r){return t.apply(r,i)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);q.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);if(!n(t.id)){var i=[];return eachProp(S,function(e,r){0!==r.indexOf("_@r")&&each(e.depMaps,function(e){if(e.id===t.id)return i.push(r),!0})}),c(makeError("scripterror",'Script error for "'+t.id+(i.length?'", needed by: '+i.join(", "):'"'),e,[t.id]))}}},q.require=q.makeRequire(),q}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.5",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(void 0!==requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,i,r){var n,o,a=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=i,i=r):e=[]),o&&o.context&&(a=o.context),(n=getOwn(contexts,a))||(n=contexts[a]=req.s.newContext(a)),o&&n.configure(o),n.require(e,t,i)},req.config=function(e){return req(e)},req.nextTick=void 0!==setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],(baseElement=document.getElementsByTagName("base")[0])&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,i){var r=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return r.type=e.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r},req.load=function(e,t,i){var r,n=e&&e.config||{};if(isBrowser)return(r=req.createNode(n,t,i)).setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=i,n.onNodeCreated&&n.onNodeCreated(r,n,t,i),currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{setTimeout(function(){},0),importScripts(i),e.completeLoad(t)}catch(r){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+i,r,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){if(head||(head=e.parentNode),dataMain=e.getAttribute("data-main"))return mainScript=dataMain,cfg.baseUrl||-1!==mainScript.indexOf("!")||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(e,t,i){var r,n;"string"!=typeof e&&(i=t,t=e,e=null),isArray(t)||(i=t,t=null),!t&&isFunction(i)&&(t=[],i.length&&(i.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(e,i){t.push(i)}),t=(1===i.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript())&&(e||(e=r.getAttribute("data-requiremodule")),n=contexts[r.getAttribute("data-requirecontext")]),n?(n.defQueue.push([e,t,i]),n.defQueueMap[e]=!0):globalDefQueue.push([e,t,i])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this,"undefined"==typeof setTimeout?void 0:setTimeout);

    window.require = require;
    window.define  = define;

    require.config( _Config.requireConfig );

    /* axios v0.17.1 | (c) 2017 by Matt Zabriskie */
    !function(e,t){e.ajax=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"[object ArrayBuffer]"===R.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===R.call(e)}function d(e){return"[object File]"===R.call(e)}function l(e){return"[object Blob]"===R.call(e)}function h(e){return"[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function v(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function b(e,t,n){return v(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:v,merge:x,extend:b,trim:w}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(6),i=n(2),s=n(17),u=n(18);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase();var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={}}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u)}),e.exports=a},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w)}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=n(16),v=(e.withCredentials||u(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t){"use strict";function n(){this.message="String contains an invalid character"}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(19),s=n(20),u=n(6),a=n(21),c=n(22);e.exports=function(e){r(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});

});

/* ------ 一些关于页面的自定义 ------ */
_(function(){

    _Config = Object.assign( Object.create( null ), _Config );

    /** [ 存储 页面 / 应用 的一次性状态 ] */
    var State = Zui.State = Object.create( null );

    document.ready(function(){
        State.DomReady = true;
    });

    window.ready(function(){
        State.DomLoad = true;
    });

    require(['Core']);

});