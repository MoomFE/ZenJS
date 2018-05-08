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