(function () {
    var _eventManager = _$createEventManager(
        function getEventObject(type, attach, obj, ignoreCase) {
            function _eventTypeToObject(type, attach) {
                if (attach) return Event;
                
                switch (type) {
                    case 'close': return CloseEvent;
                    case 'error': return ErrorEvent;
                    case 'loadend': return ProgressEvent;
                    case 'message': return MessageEvent;
                    case 'progress': return ProgressEvent;
                    case 'upgradeneeded': return IDBVersionChangeEvent;
                }
                return Event;
            }
            var e = _eventTypeToObject(type, attach);
            var eventObject = Object.create(e);
            eventObject.target = obj;
            eventObject.currentTarget = obj;
            eventObject.type = type;
            if (eventObject.relatedTarget)
                eventObject.relatedTarget = obj;
            return eventObject;
        });
    var _events = _eventManager.createEventProperties;

    
    var Blob = {};
    var BlobCtor = function() { return Object.create(Blob); };
    var Console = {};
    var DOMError = {};
    var DOMException = {};
    var DOMStringList = {};
    var Event = {};
    var EventCtor = function(type, eventInitDict) { 
        /// <signature>
        /// <param name='type' type='String'/>
        /// <param name='eventInitDict' type='EventInit' optional='true' />
        /// </signature>
        return Object.create(Event);
    };
    var EventTarget = {};
    var FileList = {};
    var IDBCursor = {};
    var IDBFactory = {};
    var IDBIndex = {};
    var IDBKeyRange = {};
    var IDBObjectStore = {};
    var ImageData = {};
    var MSApp = {};
    var MSBlobBuilder = {};
    var MSBlobBuilderCtor = function() { return Object.create(MSBlobBuilder); };
    var MSStream = {};
    var MessageChannel = {};
    var MessageChannelCtor = function() { return Object.create(MessageChannel); };
    var EventListener = {};
    var AbstractWorker = {};
    var MSBaseReader = {};
    var NavigatorID = {};
    var NavigatorOnLine = {};
    var WindowBase64 = {};
    var WindowConsole = {};
    var XMLHttpRequestEventTarget = {};
    var FileReaderSync = {};
    var FileReaderSyncCtor = function() { return Object.create(FileReaderSync); };
    var WorkerLocation = {};
    var DedicatedWorkerGlobalScope = {};
    var CloseEvent = _$inherit(Event);
    var ErrorEvent = _$inherit(Event);
    var File = _$inherit(Blob);
    var FileReader = _$inherit(EventTarget);
    var FileReaderCtor = function() { return Object.create(FileReader); };
    var IDBCursorWithValue = _$inherit(IDBCursor);
    var IDBDatabase = _$inherit(EventTarget);
    var IDBRequest = _$inherit(EventTarget);
    var IDBTransaction = _$inherit(EventTarget);
    var IDBVersionChangeEvent = _$inherit(Event);
    var MSStreamReader = _$inherit(EventTarget);
    var MSStreamReaderCtor = function() { return Object.create(MSStreamReader); };
    var MessageEvent = _$inherit(Event);
    var MessagePort = _$inherit(EventTarget);
    var ProgressEvent = _$inherit(Event);
    var WebSocket = _$inherit(EventTarget);
    var WebSocketCtor = function(url, protocols) { 
        /// <signature>
        /// <param name='url' type='String'/>
        /// <param name='protocols' type='String' optional='true' />
        /// </signature>
        /// <signature>
        /// <param name='url' type='String'/>
        /// <param name='protocols' type='Object' optional='true' />
        /// </signature>
        return Object.create(WebSocket);
    };
    var Worker = _$inherit(EventTarget);
    var WorkerCtor = function(stringUrl) { 
        /// <signature>
        /// <param name='stringUrl' type='String'/>
        /// </signature>
        return Object.create(Worker);
    };
    var XMLHttpRequest = _$inherit(EventTarget);
    var XMLHttpRequestCtor = function() { return Object.create(XMLHttpRequest); };
    var WorkerNavigator = {};
    var WorkerUtils = {};
    var IDBOpenDBRequest = _$inherit(IDBRequest);
    var WorkerGlobalScope = this;
    var ErrorEventHandler = function(event, source, fileno, columnNumber) {
        /// <signature>
        /// <param name='event' type='Event'/>
        /// <param name='source' type='String' optional='true' />
        /// <param name='fileno' type='Number' optional='true' />
        /// <param name='columnNumber' type='Number' optional='true' />
        /// </signature>
        /// <signature>
        /// <param name='event' type='String'/>
        /// <param name='source' type='String' optional='true' />
        /// <param name='fileno' type='Number' optional='true' />
        /// <param name='columnNumber' type='Number' optional='true' />
        /// </signature>
    };
    var PositionCallback = function(position) {
        /// <signature>
        /// <param name='position' type='Position'/>
        /// </signature>
    };
    var PositionErrorCallback = function(error) {
        /// <signature>
        /// <param name='error' type='PositionError'/>
        /// </signature>
    };
    var MediaQueryListListener = function(mql) {
        /// <signature>
        /// <param name='mql' type='MediaQueryList'/>
        /// </signature>
    };
    var MSLaunchUriCallback = function() {
    };
    var FrameRequestCallback = function(time) {
        /// <signature>
        /// <param name='time' type='Number'/>
        /// </signature>
    };
    var MutationCallback = function(mutations, observer) {
        /// <signature>
        /// <param name='mutations' type='Array' elementType='MutationRecord' />
        /// <param name='observer' type='MutationObserver'/>
        /// </signature>
    };
    var DecodeSuccessCallback = function(decodedData) {
        /// <signature>
        /// <param name='decodedData' type='AudioBuffer'/>
        /// </signature>
    };
    var DecodeErrorCallback = function() {
    };
    var FunctionStringCallback = function(data) {
        /// <signature>
        /// <param name='data' type='String'/>
        /// </signature>
    };
    var NavigatorUserMediaSuccessCallback = function(stream) {
        /// <signature>
        /// <param name='stream' type='MediaStream'/>
        /// </signature>
    };
    var NavigatorUserMediaErrorCallback = function(error) {
        /// <signature>
        /// <param name='error' type='MediaStreamError'/>
        /// </signature>
    };
    
    /* -- type: Blob -- */
    
    Blob.size = 0;
    Blob.type = '';
    Blob.msClose = function() {
    };
    Blob.msDetachStream = function() {
        /// <signature>
        /// <returns type='Object'/>
        /// </signature>
        return {};
    };
    Blob.slice = function(start, end, contentType) {
        /// <signature>
        /// <param name='start' type='Number' optional='true' />
        /// <param name='end' type='Number' optional='true' />
        /// <param name='contentType' type='String' optional='true' />
        /// <returns type='Blob'/>
        /// </signature>
        return Blob;
    };
    
    /* -- type: Console -- */
    
    Console.assert = function(test, message, optionalParams) {
        /// <signature>
        /// <param name='test' type='Boolean' optional='true' />
        /// <param name='message' type='String' optional='true' />
        /// <param name='optionalParams' type='Object'/>
        /// </signature>
    };
    Console.clear = function() {
    };
    Console.count = function(countTitle) {
        /// <signature>
        /// <param name='countTitle' type='String' optional='true' />
        /// </signature>
    };
    Console.debug = function(message, optionalParams) {
        /// <signature>
        /// <param name='message' type='String' optional='true' />
        /// <param name='optionalParams' type='Object'/>
        /// </signature>
    };
    Console.dir = function(value, optionalParams) {
        /// <signature>
        /// <param name='value' type='Object' optional='true' />
        /// <param name='optionalParams' type='Object'/>
        /// </signature>
    };
    Console.dirxml = function(value) {
        /// <signature>
        /// <param name='value' type='Object'/>
        /// </signature>
    };
    Console.error = function(message, optionalParams) {
        /// <signature>
        /// <param name='message' type='String' optional='true' />
        /// <param name='optionalParams' type='Object'/>
        /// </signature>
    };
    Console.group = function(groupTitle) {
        /// <signature>
        /// <param name='groupTitle' type='String' optional='true' />
        /// </signature>
    };
    Console.groupCollapsed = function(groupTitle) {
        /// <signature>
        /// <param name='groupTitle' type='String' optional='true' />
        /// </signature>
    };
    Console.groupEnd = function() {
    };
    Console.info = function(message, optionalParams) {
        /// <signature>
        /// <param name='message' type='String' optional='true' />
        /// <param name='optionalParams' type='Object'/>
        /// </signature>
    };
    Console.log = function(message, optionalParams) {
        /// <signature>
        /// <param name='message' type='String' optional='true' />
        /// <param name='optionalParams' type='Object'/>
        /// </signature>
    };
    Console.msIsIndependentlyComposed = function(element) {
        /// <signature>
        /// <param name='element' type='Object'/>
        /// <returns type='Boolean'/>
        /// </signature>
        return false;
    };
    Console.profile = function(reportName) {
        /// <signature>
        /// <param name='reportName' type='String' optional='true' />
        /// </signature>
    };
    Console.profileEnd = function() {
    };
    Console.select = function(element) {
        /// <signature>
        /// <param name='element' type='Object'/>
        /// </signature>
    };
    Console.time = function(timerName) {
        /// <signature>
        /// <param name='timerName' type='String' optional='true' />
        /// </signature>
    };
    Console.timeEnd = function(timerName) {
        /// <signature>
        /// <param name='timerName' type='String' optional='true' />
        /// </signature>
    };
    Console.trace = function() {
    };
    Console.warn = function(message, optionalParams) {
        /// <signature>
        /// <param name='message' type='String' optional='true' />
        /// <param name='optionalParams' type='Object'/>
        /// </signature>
    };
    
    /* -- type: DOMError -- */
    
    DOMError.name = '';
    DOMError.toString = function() {
        /// <signature>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    
    /* -- type: DOMException -- */
    
    DOMException.code = 0;
    DOMException.message = '';
    DOMException.name = '';
    DOMException.ABORT_ERR = 20;
    DOMException.DATA_CLONE_ERR = 25;
    DOMException.DOMSTRING_SIZE_ERR = 2;
    DOMException.HIERARCHY_REQUEST_ERR = 3;
    DOMException.INDEX_SIZE_ERR = 1;
    DOMException.INUSE_ATTRIBUTE_ERR = 10;
    DOMException.INVALID_ACCESS_ERR = 15;
    DOMException.INVALID_CHARACTER_ERR = 5;
    DOMException.INVALID_MODIFICATION_ERR = 13;
    DOMException.INVALID_NODE_TYPE_ERR = 24;
    DOMException.INVALID_STATE_ERR = 11;
    DOMException.NAMESPACE_ERR = 14;
    DOMException.NETWORK_ERR = 19;
    DOMException.NOT_FOUND_ERR = 8;
    DOMException.NOT_SUPPORTED_ERR = 9;
    DOMException.NO_DATA_ALLOWED_ERR = 6;
    DOMException.NO_MODIFICATION_ALLOWED_ERR = 7;
    DOMException.PARSE_ERR = 81;
    DOMException.QUOTA_EXCEEDED_ERR = 22;
    DOMException.SECURITY_ERR = 18;
    DOMException.SERIALIZE_ERR = 82;
    DOMException.SYNTAX_ERR = 12;
    DOMException.TIMEOUT_ERR = 23;
    DOMException.TYPE_MISMATCH_ERR = 17;
    DOMException.URL_MISMATCH_ERR = 21;
    DOMException.VALIDATION_ERR = 16;
    DOMException.WRONG_DOCUMENT_ERR = 4;
    DOMException.toString = function() {
        /// <signature>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    
    /* -- type: DOMStringList -- */
    
    DOMStringList.length = 0;
    DOMStringList.contains = function(str) {
        /// <signature>
        /// <param name='str' type='String'/>
        /// <returns type='Boolean'/>
        /// </signature>
        return false;
    };
    DOMStringList.item = function(index) {
        /// <signature>
        /// <param name='index' type='Number'/>
        /// <returns type='String'/>
        /// </signature>
        return this[index] || _$getTrackingNull('');
    };
    /* Add a single array element */
    DOMStringList[0] = _$getTrackingNull('');
    
    /* -- type: Event -- */
    
    EventCtor.AT_TARGET = 2;
    EventCtor.BUBBLING_PHASE = 3;
    EventCtor.CAPTURING_PHASE = 1;
    Event.bubbles = false;
    Event.cancelBubble = false;
    Event.cancelable = false;
    Event.currentTarget = EventTarget;
    Event.defaultPrevented = false;
    Event.eventPhase = 0;
    Event.isTrusted = false;
    Event.returnValue = false;
    Event.srcElement = {};
    Event.target = EventTarget;
    Event.timeStamp = 0;
    Event.type = '';
    Event.AT_TARGET = 2;
    Event.BUBBLING_PHASE = 3;
    Event.CAPTURING_PHASE = 1;
    Event.initEvent = function(eventTypeArg, canBubbleArg, cancelableArg) {
        /// <signature>
        /// <param name='eventTypeArg' type='String'/>
        /// <param name='canBubbleArg' type='Boolean'/>
        /// <param name='cancelableArg' type='Boolean'/>
        /// </signature>
    };
    Event.preventDefault = function() {
    };
    Event.stopImmediatePropagation = function() {
    };
    Event.stopPropagation = function() {
    };
    
    /* -- type: EventTarget -- */
    
    EventTarget.addEventListener = function(type, listener, useCapture) {
        /// <signature>
        /// <param name='type' type='String'/>
        /// <param name='listener' type='EventListener'/>
        /// <param name='useCapture' type='Boolean' optional='true' />
        /// </signature>
        _eventManager.add(this, type, listener);
    };
    EventTarget.dispatchEvent = function(evt) {
        /// <signature>
        /// <param name='evt' type='Event'/>
        /// <returns type='Boolean'/>
        /// </signature>
        return false;
    };
    EventTarget.removeEventListener = function(type, listener, useCapture) {
        /// <signature>
        /// <param name='type' type='String'/>
        /// <param name='listener' type='EventListener'/>
        /// <param name='useCapture' type='Boolean' optional='true' />
        /// </signature>
    };
    
    /* -- type: FileList -- */
    
    FileList.length = 0;
    FileList.item = function(index) {
        /// <signature>
        /// <param name='index' type='Number'/>
        /// <returns type='File'/>
        /// </signature>
        return this[index] || _$getTrackingNull(Object.create(File));
    };
    /* Add a single array element */
    FileList[0] = _$getTrackingNull(Object.create(File));
    
    /* -- type: IDBCursor -- */
    
    IDBCursor.direction = '';
    IDBCursor.key = {};
    IDBCursor.primaryKey = {};
    IDBCursor.source = {};
    IDBCursor.NEXT = "next";
    IDBCursor.NEXT_NO_DUPLICATE = "nextunique";
    IDBCursor.PREV = "prev";
    IDBCursor.PREV_NO_DUPLICATE = "prevunique";
    IDBCursor.advance = function(count) {
        /// <signature>
        /// <param name='count' type='Number'/>
        /// </signature>
    };
    IDBCursor.continue = function(key) {
        /// <signature>
        /// <param name='key' type='Object' optional='true' />
        /// </signature>
    };
    IDBCursor.delete = function() {
        /// <signature>
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, undefined);
    };
    IDBCursor.update = function(value) {
        /// <signature>
        /// <param name='value' type='Object'/>
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, value);
    };
    
    /* -- type: IDBFactory -- */
    
    IDBFactory.cmp = function(first, second) {
        /// <signature>
        /// <param name='first' type='Object'/>
        /// <param name='second' type='Object'/>
        /// <returns type='Number'/>
        /// </signature>
        return 0;
    };
    IDBFactory.deleteDatabase = function(name) {
        /// <signature>
        /// <param name='name' type='String'/>
        /// <returns type='IDBOpenDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBOpenDBRequest, null, null);
    };
    IDBFactory.open = function(name, version) {
        /// <signature>
        /// <param name='name' type='String'/>
        /// <param name='version' type='Number' optional='true' />
        /// <returns type='IDBOpenDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBOpenDBRequest, null, Object.create(IDBDatabase));
    };
    
    /* -- type: IDBIndex -- */
    
    IDBIndex.keyPath = '';
    IDBIndex.name = '';
    IDBIndex.objectStore = IDBObjectStore;
    IDBIndex.unique = false;
    IDBIndex.count = function(key) {
        /// <signature>
        /// <param name='key' type='Object' optional='true' />
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, 0);
    };
    IDBIndex.get = function(key) {
        /// <signature>
        /// <param name='key' type='Object'/>
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this.objectStore, {});
    };
    IDBIndex.getKey = function(key) {
        /// <signature>
        /// <param name='key' type='Object'/>
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this.objectStore, {});
    };
    IDBIndex.openCursor = function(range, direction) {
        /// <signature>
        /// <param name='range' type='IDBKeyRange' optional='true' />
        /// <param name='direction' type='String' optional='true' />
        /// <returns type='IDBRequest'/>
        /// </signature>
        var cursor = Object.create(IDBCursorWithValue); cursor.source = this; return _createIDBRequest(IDBRequest, this, cursor);
    };
    IDBIndex.openKeyCursor = function(range, direction) {
        /// <signature>
        /// <param name='range' type='IDBKeyRange' optional='true' />
        /// <param name='direction' type='String' optional='true' />
        /// <returns type='IDBRequest'/>
        /// </signature>
        var cursor = Object.create(IDBCursor); cursor.source = this; return _createIDBRequest(IDBRequest, this.objectStore, cursor);
    };
    
    /* -- type: IDBKeyRange -- */
    
    IDBKeyRange.lower = {};
    IDBKeyRange.lowerOpen = false;
    IDBKeyRange.upper = {};
    IDBKeyRange.upperOpen = false;
    IDBKeyRange.bound = function(lower, upper, lowerOpen, upperOpen) {
        /// <signature>
        /// <param name='lower' type='Object'/>
        /// <param name='upper' type='Object'/>
        /// <param name='lowerOpen' type='Boolean' optional='true' />
        /// <param name='upperOpen' type='Boolean' optional='true' />
        /// <returns type='IDBKeyRange'/>
        /// </signature>
        return IDBKeyRange;
    };
    IDBKeyRange.lowerBound = function(bound, open) {
        /// <signature>
        /// <param name='bound' type='Object'/>
        /// <param name='open' type='Boolean' optional='true' />
        /// <returns type='IDBKeyRange'/>
        /// </signature>
        return IDBKeyRange;
    };
    IDBKeyRange.only = function(value) {
        /// <signature>
        /// <param name='value' type='Object'/>
        /// <returns type='IDBKeyRange'/>
        /// </signature>
        return IDBKeyRange;
    };
    IDBKeyRange.upperBound = function(bound, open) {
        /// <signature>
        /// <param name='bound' type='Object'/>
        /// <param name='open' type='Boolean' optional='true' />
        /// <returns type='IDBKeyRange'/>
        /// </signature>
        return IDBKeyRange;
    };
    
    /* -- type: IDBObjectStore -- */
    
    IDBObjectStore.indexNames = DOMStringList;
    IDBObjectStore.keyPath = '';
    IDBObjectStore.name = '';
    IDBObjectStore.transaction = IDBTransaction;
    IDBObjectStore.add = function(value, key) {
        /// <signature>
        /// <param name='value' type='Object'/>
        /// <param name='key' type='Object' optional='true' />
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, key);
    };
    IDBObjectStore.clear = function() {
        /// <signature>
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, undefined);
    };
    IDBObjectStore.count = function(key) {
        /// <signature>
        /// <param name='key' type='Object' optional='true' />
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, 0);
    };
    IDBObjectStore.createIndex = function(name, keyPath, optionalParameters) {
        /// <signature>
        /// <param name='name' type='String'/>
        /// <param name='keyPath' type='String'/>
        /// <param name='optionalParameters' type='Object' optional='true' />
        /// <returns type='IDBIndex'/>
        /// </signature>
        return IDBIndex;
    };
    IDBObjectStore.delete = function(key) {
        /// <signature>
        /// <param name='key' type='Object'/>
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, undefined);
    };
    IDBObjectStore.deleteIndex = function(indexName) {
        /// <signature>
        /// <param name='indexName' type='String'/>
        /// </signature>
    };
    IDBObjectStore.get = function(key) {
        /// <signature>
        /// <param name='key' type='Object'/>
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, {});
    };
    IDBObjectStore.index = function(name) {
        /// <signature>
        /// <param name='name' type='String'/>
        /// <returns type='IDBIndex'/>
        /// </signature>
        return IDBIndex;
    };
    IDBObjectStore.openCursor = function(range, direction) {
        /// <signature>
        /// <param name='range' type='Object' optional='true' />
        /// <param name='direction' type='String' optional='true' />
        /// <returns type='IDBRequest'/>
        /// </signature>
        var cursor = Object.create(IDBCursorWithValue); cursor.source = this; return _createIDBRequest(IDBRequest, this, cursor);
    };
    IDBObjectStore.put = function(value, key) {
        /// <signature>
        /// <param name='value' type='Object'/>
        /// <param name='key' type='Object' optional='true' />
        /// <returns type='IDBRequest'/>
        /// </signature>
        return _createIDBRequest(IDBRequest, this, key);
    };
    
    /* -- type: ImageData -- */
    
    ImageData.data = new UInt8ClampedArray();
    ImageData.height = 0;
    ImageData.width = 0;
    
    /* -- type: MSApp -- */
    
    MSApp.CURRENT = "current";
    MSApp.HIGH = "high";
    MSApp.IDLE = "idle";
    MSApp.NORMAL = "normal";
    MSApp.clearTemporaryWebDataAsync = function() {
        /// <signature>
        /// <returns type='MSAppAsyncOperation'/>
        /// </signature>
        return MSAppAsyncOperation;
    };
    MSApp.createBlobFromRandomAccessStream = function(type, seeker) {
        /// <signature>
        /// <param name='type' type='String'/>
        /// <param name='seeker' type='Object'/>
        /// <returns type='Blob'/>
        /// </signature>
        return Blob;
    };
    MSApp.createDataPackage = function(object) {
        /// <signature>
        /// <param name='object' type='Object'/>
        /// <returns type='Object'/>
        /// </signature>
        return {};
    };
    MSApp.createDataPackageFromSelection = function() {
        /// <signature>
        /// <returns type='Object'/>
        /// </signature>
        return {};
    };
    MSApp.createFileFromStorageFile = function(storageFile) {
        /// <signature>
        /// <param name='storageFile' type='Object'/>
        /// <returns type='File'/>
        /// </signature>
        return File;
    };
    MSApp.createStreamFromInputStream = function(type, inputStream) {
        /// <signature>
        /// <param name='type' type='String'/>
        /// <param name='inputStream' type='Object'/>
        /// <returns type='MSStream'/>
        /// </signature>
        return MSStream;
    };
    MSApp.execAsyncAtPriority = function(asynchronousCallback, priority, args) {
        /// <signature>
        /// <param name='asynchronousCallback' type='MSExecAtPriorityFunctionCallback'/>
        /// <param name='priority' type='String'/>
        /// <param name='args' type='Object'/>
        /// </signature>
    };
    MSApp.execAtPriority = function(synchronousCallback, priority, args) {
        /// <signature>
        /// <param name='synchronousCallback' type='MSExecAtPriorityFunctionCallback'/>
        /// <param name='priority' type='String'/>
        /// <param name='args' type='Object'/>
        /// <returns type='Object'/>
        /// </signature>
        return {};
    };
    MSApp.getCurrentPriority = function() {
        /// <signature>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    MSApp.getHtmlPrintDocumentSourceAsync = function(htmlDoc) {
        /// <signature>
        /// <param name='htmlDoc' type='Object'/>
        /// <returns type='Promise'/>
        /// </signature>
        return new Promise(function(resolve, reject) { });
    };
    MSApp.getViewId = function(view) {
        /// <signature>
        /// <param name='view' type='Object'/>
        /// <returns type='Object'/>
        /// </signature>
        return {};
    };
    MSApp.isTaskScheduledAtPriorityOrHigher = function(priority) {
        /// <signature>
        /// <param name='priority' type='String'/>
        /// <returns type='Boolean'/>
        /// </signature>
        return false;
    };
    MSApp.pageHandlesAllApplicationActivations = function(enabled) {
        /// <signature>
        /// <param name='enabled' type='Boolean'/>
        /// </signature>
    };
    MSApp.suppressSubdownloadCredentialPrompts = function(suppress) {
        /// <signature>
        /// <param name='suppress' type='Boolean'/>
        /// </signature>
    };
    MSApp.terminateApp = function(exceptionObject) {
        /// <signature>
        /// <param name='exceptionObject' type='Object'/>
        /// </signature>
    };
    
    /* -- type: MSBlobBuilder -- */
    
    MSBlobBuilder.append = function(data, endings) {
        /// <signature>
        /// <param name='data' type='Object'/>
        /// <param name='endings' type='String' optional='true' />
        /// </signature>
    };
    MSBlobBuilder.getBlob = function(contentType) {
        /// <signature>
        /// <param name='contentType' type='String' optional='true' />
        /// <returns type='Blob'/>
        /// </signature>
        return Blob;
    };
    
    /* -- type: MSStream -- */
    
    MSStream.type = '';
    MSStream.msClose = function() {
    };
    MSStream.msDetachStream = function() {
        /// <signature>
        /// <returns type='Object'/>
        /// </signature>
        return {};
    };
    
    /* -- type: MessageChannel -- */
    
    MessageChannel.port1 = MessagePort;
    MessageChannel.port2 = MessagePort;
    
    /* -- type: EventListener -- */
    
    EventListener.handleEvent = function(evt) {
        /// <signature>
        /// <param name='evt' type='Event'/>
        /// </signature>
    };
    
    /* -- type: AbstractWorker -- */
    
    _events(AbstractWorker, "onerror");
    
    /* -- type: MSBaseReader -- */
    
    MSBaseReader.readyState = 0;
    MSBaseReader.result = {};
    MSBaseReader.DONE = 2;
    MSBaseReader.EMPTY = 0;
    MSBaseReader.LOADING = 1;
    MSBaseReader.abort = function() {
    };
    _events(MSBaseReader, "onabort", "onerror", "onload", "onloadend", "onloadstart", "onprogress");
    
    /* -- type: NavigatorID -- */
    
    NavigatorID.appName = '';
    NavigatorID.appVersion = '';
    NavigatorID.platform = '';
    NavigatorID.product = '';
    NavigatorID.productSub = '';
    NavigatorID.userAgent = '';
    NavigatorID.vendor = '';
    NavigatorID.vendorSub = '';
    
    /* -- type: NavigatorOnLine -- */
    
    NavigatorOnLine.onLine = false;
    
    /* -- type: WindowBase64 -- */
    
    WindowBase64.atob = function(encodedString) {
        /// <signature>
        /// <param name='encodedString' type='String'/>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    WindowBase64.btoa = function(rawString) {
        /// <signature>
        /// <param name='rawString' type='String'/>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    
    /* -- type: WindowConsole -- */
    
    WindowConsole.console = Console;
    
    /* -- type: XMLHttpRequestEventTarget -- */
    
    _events(XMLHttpRequestEventTarget, "onabort", "onerror", "onload", "onloadend", "onloadstart", "onprogress", "ontimeout");
    
    /* -- type: FileReaderSync -- */
    
    FileReaderSync.readAsArrayBuffer = function(blob) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// <returns type='Object'/>
        /// </signature>
        return {};
    };
    FileReaderSync.readAsBinaryString = function(blob) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// </signature>
    };
    FileReaderSync.readAsDataURL = function(blob) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    FileReaderSync.readAsText = function(blob, encoding) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// <param name='encoding' type='String' optional='true' />
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    
    /* -- type: WorkerLocation -- */
    
    WorkerLocation.hash = '';
    WorkerLocation.host = '';
    WorkerLocation.hostname = '';
    WorkerLocation.href = '';
    WorkerLocation.pathname = '';
    WorkerLocation.port = '';
    WorkerLocation.protocol = '';
    WorkerLocation.search = '';
    WorkerLocation.toString = function() {
        /// <signature>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    
    /* -- type: DedicatedWorkerGlobalScope -- */
    
    DedicatedWorkerGlobalScope.postMessage = function(data) {
        /// <signature>
        /// <param name='data' type='Object'/>
        /// </signature>
    };
    DedicatedWorkerGlobalScope.onmessage = function () {};
    
    /* -- type: CloseEvent -- */
    
    CloseEvent.code = 0;
    CloseEvent.reason = '';
    CloseEvent.wasClean = false;
    CloseEvent.initCloseEvent = function(typeArg, canBubbleArg, cancelableArg, wasCleanArg, codeArg, reasonArg) {
        /// <signature>
        /// <param name='typeArg' type='String'/>
        /// <param name='canBubbleArg' type='Boolean'/>
        /// <param name='cancelableArg' type='Boolean'/>
        /// <param name='wasCleanArg' type='Boolean'/>
        /// <param name='codeArg' type='Number'/>
        /// <param name='reasonArg' type='String'/>
        /// </signature>
    };
    
    /* -- type: ErrorEvent -- */
    
    ErrorEvent.colno = 0;
    ErrorEvent.error = {};
    ErrorEvent.filename = '';
    ErrorEvent.lineno = 0;
    ErrorEvent.message = '';
    ErrorEvent.initErrorEvent = function(typeArg, canBubbleArg, cancelableArg, messageArg, filenameArg, linenoArg) {
        /// <signature>
        /// <param name='typeArg' type='String'/>
        /// <param name='canBubbleArg' type='Boolean'/>
        /// <param name='cancelableArg' type='Boolean'/>
        /// <param name='messageArg' type='String'/>
        /// <param name='filenameArg' type='String'/>
        /// <param name='linenoArg' type='Number'/>
        /// </signature>
    };
    
    /* -- type: File -- */
    
    File.lastModifiedDate = {};
    File.name = '';
    
    /* -- type: FileReader -- */
    
    _$implement(FileReader, MSBaseReader);
    FileReader.error = DOMError;
    FileReader.readAsArrayBuffer = function(blob) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// </signature>
    };
    FileReader.readAsBinaryString = function(blob) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// </signature>
    };
    FileReader.readAsDataURL = function(blob) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// </signature>
    };
    FileReader.readAsText = function(blob, encoding) {
        /// <signature>
        /// <param name='blob' type='Blob'/>
        /// <param name='encoding' type='String' optional='true' />
        /// </signature>
    };
    
    /* -- type: IDBCursorWithValue -- */
    
    IDBCursorWithValue.value = {};
    
    /* -- type: IDBDatabase -- */
    
    IDBDatabase.name = '';
    IDBDatabase.objectStoreNames = DOMStringList;
    IDBDatabase.version = '';
    IDBDatabase.close = function() {
    };
    IDBDatabase.createObjectStore = function(name, optionalParameters) {
        /// <signature>
        /// <param name='name' type='String'/>
        /// <param name='optionalParameters' type='Object' optional='true' />
        /// <returns type='IDBObjectStore'/>
        /// </signature>
        return IDBObjectStore;
    };
    IDBDatabase.deleteObjectStore = function(name) {
        /// <signature>
        /// <param name='name' type='String'/>
        /// </signature>
    };
    IDBDatabase.transaction = function(storeNames, mode) {
        /// <signature>
        /// <param name='storeNames' type='Object'/>
        /// <param name='mode' type='String' optional='true' />
        /// <returns type='IDBTransaction'/>
        /// </signature>
        return IDBTransaction;
    };
    _events(IDBDatabase, "onabort", "onerror");
    
    /* -- type: IDBRequest -- */
    
    IDBRequest.error = DOMError;
    IDBRequest.readyState = '';
    IDBRequest.result = {};
    IDBRequest.source = {};
    IDBRequest.transaction = IDBTransaction;
    _events(IDBRequest, "onerror", "onsuccess");
    
    /* -- type: IDBTransaction -- */
    
    IDBTransaction.db = IDBDatabase;
    IDBTransaction.error = DOMError;
    IDBTransaction.mode = '';
    IDBTransaction.READ_ONLY = "readonly";
    IDBTransaction.READ_WRITE = "readwrite";
    IDBTransaction.VERSION_CHANGE = "versionchange";
    IDBTransaction.abort = function() {
    };
    IDBTransaction.objectStore = function(name) {
        /// <signature>
        /// <param name='name' type='String'/>
        /// <returns type='IDBObjectStore'/>
        /// </signature>
        return IDBObjectStore;
    };
    _events(IDBTransaction, "onabort", "oncomplete", "onerror");
    
    /* -- type: IDBVersionChangeEvent -- */
    
    IDBVersionChangeEvent.newVersion = 0;
    IDBVersionChangeEvent.oldVersion = 0;
    
    /* -- type: MSStreamReader -- */
    
    _$implement(MSStreamReader, MSBaseReader);
    MSStreamReader.error = DOMError;
    MSStreamReader.readAsArrayBuffer = function(stream, size) {
        /// <signature>
        /// <param name='stream' type='MSStream'/>
        /// <param name='size' type='Number' optional='true' />
        /// </signature>
    };
    MSStreamReader.readAsBinaryString = function(stream, size) {
        /// <signature>
        /// <param name='stream' type='MSStream'/>
        /// <param name='size' type='Number' optional='true' />
        /// </signature>
    };
    MSStreamReader.readAsBlob = function(stream, size) {
        /// <signature>
        /// <param name='stream' type='MSStream'/>
        /// <param name='size' type='Number' optional='true' />
        /// </signature>
    };
    MSStreamReader.readAsDataURL = function(stream, size) {
        /// <signature>
        /// <param name='stream' type='MSStream'/>
        /// <param name='size' type='Number' optional='true' />
        /// </signature>
    };
    MSStreamReader.readAsText = function(stream, encoding, size) {
        /// <signature>
        /// <param name='stream' type='MSStream'/>
        /// <param name='encoding' type='String' optional='true' />
        /// <param name='size' type='Number' optional='true' />
        /// </signature>
    };
    
    /* -- type: MessageEvent -- */
    
    MessageEvent.data = {};
    MessageEvent.origin = '';
    MessageEvent.ports = {};
    MessageEvent.source = {};
    MessageEvent.initMessageEvent = function(typeArg, canBubbleArg, cancelableArg, dataArg, originArg, lastEventIdArg, sourceArg) {
        /// <signature>
        /// <param name='typeArg' type='String'/>
        /// <param name='canBubbleArg' type='Boolean'/>
        /// <param name='cancelableArg' type='Boolean'/>
        /// <param name='dataArg' type='Object'/>
        /// <param name='originArg' type='String'/>
        /// <param name='lastEventIdArg' type='String'/>
        /// <param name='sourceArg' type='Object'/>
        /// </signature>
    };
    
    /* -- type: MessagePort -- */
    
    MessagePort.close = function() {
    };
    MessagePort.postMessage = function(message, ports) {
        /// <signature>
        /// <param name='message' type='Object' optional='true' />
        /// <param name='ports' type='Object' optional='true' />
        /// </signature>
    };
    MessagePort.start = function() {
    };
    _events(MessagePort, "onmessage");
    
    /* -- type: ProgressEvent -- */
    
    ProgressEvent.lengthComputable = false;
    ProgressEvent.loaded = 0;
    ProgressEvent.total = 0;
    ProgressEvent.initProgressEvent = function(typeArg, canBubbleArg, cancelableArg, lengthComputableArg, loadedArg, totalArg) {
        /// <signature>
        /// <param name='typeArg' type='String'/>
        /// <param name='canBubbleArg' type='Boolean'/>
        /// <param name='cancelableArg' type='Boolean'/>
        /// <param name='lengthComputableArg' type='Boolean'/>
        /// <param name='loadedArg' type='Number'/>
        /// <param name='totalArg' type='Number'/>
        /// </signature>
    };
    
    /* -- type: WebSocket -- */
    
    WebSocketCtor.CLOSED = 3;
    WebSocketCtor.CLOSING = 2;
    WebSocketCtor.CONNECTING = 0;
    WebSocketCtor.OPEN = 1;
    WebSocket.binaryType = '';
    WebSocket.bufferedAmount = 0;
    WebSocket.extensions = '';
    WebSocket.protocol = '';
    WebSocket.readyState = 0;
    WebSocket.url = '';
    WebSocket.CLOSED = 3;
    WebSocket.CLOSING = 2;
    WebSocket.CONNECTING = 0;
    WebSocket.OPEN = 1;
    WebSocket.close = function(code, reason) {
        /// <signature>
        /// <param name='code' type='Number' optional='true' />
        /// <param name='reason' type='String' optional='true' />
        /// </signature>
    };
    WebSocket.send = function(data) {
        /// <signature>
        /// <param name='data' type='Object'/>
        /// </signature>
    };
    _events(WebSocket, "onclose", "onerror", "onmessage", "onopen");
    
    /* -- type: Worker -- */
    
    _$implement(Worker, AbstractWorker);
    Worker.postMessage = function(message, ports) {
        /// <signature>
        /// <param name='message' type='Object'/>
        /// <param name='ports' type='Object' optional='true' />
        /// </signature>
    };
    Worker.terminate = function() {
    };
    _events(Worker, "onmessage", "onerror");
    
    /* -- type: XMLHttpRequest -- */
    
    _$implement(XMLHttpRequest, XMLHttpRequestEventTarget);
    XMLHttpRequestCtor.DONE = 4;
    XMLHttpRequestCtor.HEADERS_RECEIVED = 2;
    XMLHttpRequestCtor.LOADING = 3;
    XMLHttpRequestCtor.OPENED = 1;
    XMLHttpRequestCtor.UNSENT = 0;
    XMLHttpRequest.msCaching = '';
    XMLHttpRequest.readyState = 0;
    XMLHttpRequest.response = {};
    XMLHttpRequest.responseBody = {};
    XMLHttpRequest.responseText = '';
    XMLHttpRequest.responseType = '';
    XMLHttpRequest.responseXML = {};
    XMLHttpRequest.status = 0;
    XMLHttpRequest.statusText = '';
    XMLHttpRequest.timeout = 0;
    XMLHttpRequest.upload = XMLHttpRequestUpload;
    XMLHttpRequest.withCredentials = false;
    XMLHttpRequest.DONE = 4;
    XMLHttpRequest.HEADERS_RECEIVED = 2;
    XMLHttpRequest.LOADING = 3;
    XMLHttpRequest.OPENED = 1;
    XMLHttpRequest.UNSENT = 0;
    XMLHttpRequest.abort = function() {
    };
    XMLHttpRequest.create = function() {
        /// <signature>
        /// <returns type='XMLHttpRequest'/>
        /// </signature>
        return XMLHttpRequest;
    };
    XMLHttpRequest.getAllResponseHeaders = function() {
        /// <signature>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    XMLHttpRequest.getResponseHeader = function(header) {
        /// <signature>
        /// <param name='header' type='String'/>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    XMLHttpRequest.msCachingEnabled = function() {
        /// <signature>
        /// <returns type='Boolean'/>
        /// </signature>
        return false;
    };
    XMLHttpRequest.open = function(method, url, async, user, password) {
        /// <signature>
        /// <param name='method' type='String'/>
        /// <param name='url' type='String'/>
        /// <param name='async' type='Boolean' optional='true' />
        /// <param name='user' type='String' optional='true' />
        /// <param name='password' type='String' optional='true' />
        /// </signature>
    };
    XMLHttpRequest.overrideMimeType = function(mime) {
        /// <signature>
        /// <param name='mime' type='String'/>
        /// </signature>
    };
    XMLHttpRequest.send = function(data) {
        /// <signature>
        /// <param name='data' type='Object' optional='true' />
        /// </signature>
        /// <signature>
        /// <param name='data' type='String' optional='true' />
        /// </signature>
        this.status = 200; this.readyState = XMLHttpRequest.DONE; this.status = 4; this.statusText = "OK";
    };
    XMLHttpRequest.setRequestHeader = function(header, value) {
        /// <signature>
        /// <param name='header' type='String'/>
        /// <param name='value' type='String'/>
        /// </signature>
    };
    _events(XMLHttpRequest, "onreadystatechange", "onabort", "onerror", "onload", "onloadend", "onloadstart", "onprogress", "ontimeout");
    
    /* -- type: WorkerNavigator -- */
    
    _$implement(WorkerNavigator, NavigatorID);
    _$implement(WorkerNavigator, NavigatorOnLine);
    
    /* -- type: WorkerUtils -- */
    
    _$implement(WorkerUtils, WindowBase64);
    WorkerUtils.indexedDB = IDBFactory;
    WorkerUtils.msIndexedDB = IDBFactory;
    WorkerUtils.navigator = WorkerNavigator;
    WorkerUtils.clearImmediate = function(handle) {
        /// <signature>
        /// <param name='handle' type='Number'/>
        /// </signature>
        _$clearTimeout(handle);
    };
    WorkerUtils.clearInterval = function(handle) {
        /// <signature>
        /// <param name='handle' type='Number'/>
        /// </signature>
        _$clearTimeout(handle);
    };
    WorkerUtils.clearTimeout = function(handle) {
        /// <signature>
        /// <param name='handle' type='Number'/>
        /// </signature>
        _$clearTimeout(handle);
    };
    WorkerUtils.importScripts = function(urls) {
        /// <signature>
        /// <param name='urls' type='String'/>
        /// </signature>
        for (var i = 0; i < arguments.length; i++) _$asyncRequests.add({ src: arguments[i] });
    };
    WorkerUtils.setImmediate = function(handler, args) {
        /// <signature>
        /// <param name='handler' type='Object'/>
        /// <param name='args' type='Object' optional='true' />
        /// <returns type='Number'/>
        /// </signature>
        return _$setTimeout(handler, 0, args);
    };
    WorkerUtils.setInterval = function(handler, timeout, args) {
        /// <signature>
        /// <param name='handler' type='Object'/>
        /// <param name='timeout' type='Object' optional='true' />
        /// <param name='args' type='Object'/>
        /// <returns type='Number'/>
        /// </signature>
        return _$setTimeout(handler, timeout, args);
    };
    WorkerUtils.setTimeout = function(handler, timeout, args) {
        /// <signature>
        /// <param name='handler' type='Object'/>
        /// <param name='timeout' type='Object' optional='true' />
        /// <param name='args' type='Object'/>
        /// <returns type='Number'/>
        /// </signature>
        return _$setTimeout(handler, timeout, args);
    };
    
    /* -- type: IDBOpenDBRequest -- */
    
    _events(IDBOpenDBRequest, "onblocked", "onupgradeneeded", "onerror", "onsuccess");
    
    /* -- type: WorkerGlobalScope -- */
    
    _$implement(WorkerGlobalScope, WorkerUtils);
    _$implement(WorkerGlobalScope, DedicatedWorkerGlobalScope);
    _$implement(WorkerGlobalScope, WindowConsole);
    _$implement(WorkerGlobalScope, EventTarget);
    WorkerGlobalScope.location = WorkerLocation;
    WorkerGlobalScope.self = _$getTrackingNull(Object.create(WorkerGlobalScope));
    WorkerGlobalScope.close = function() {
    };
    WorkerGlobalScope.msWriteProfilerMark = function(profilerMarkName) {
        /// <signature>
        /// <param name='profilerMarkName' type='String'/>
        /// </signature>
    };
    WorkerGlobalScope.toString = function() {
        /// <signature>
        /// <returns type='String'/>
        /// </signature>
        return '';
    };
    WorkerGlobalScope.onerror = function () {};
    WorkerGlobalScope.onmessage = function () {};

    function _publicInterface(name, interface, interfacePrototype) {
        _$nonRemovable(interface);
        WorkerGlobalScope[name] = interface;
        WorkerGlobalScope[name].prototype = interfacePrototype;
    }

    function _publicObject(name, obj) {
        _$nonRemovable(obj);
        WorkerGlobalScope[name] = obj;
    }
    
    _publicInterface('IDBOpenDBRequest', {}, IDBOpenDBRequest);
    _publicInterface('WorkerGlobalScope', {}, WorkerGlobalScope);
    _publicInterface('ProgressEvent', {}, ProgressEvent);
    _publicInterface('MessagePort', {}, MessagePort);
    _publicInterface('MessageEvent', {}, MessageEvent);
    _publicInterface('IDBVersionChangeEvent', {}, IDBVersionChangeEvent);
    _publicInterface('IDBTransaction', {'READ_ONLY' : readonly,'READ_WRITE' : readwrite,'VERSION_CHANGE' : versionchange}, IDBTransaction);
    _publicInterface('IDBRequest', {}, IDBRequest);
    _publicInterface('IDBDatabase', {}, IDBDatabase);
    _publicInterface('IDBCursorWithValue', {}, IDBCursorWithValue);
    _publicInterface('File', {}, File);
    _publicInterface('ErrorEvent', {}, ErrorEvent);
    _publicInterface('CloseEvent', {}, CloseEvent);
    _publicInterface('WorkerNavigator', {}, WorkerNavigator);
    _publicInterface('WorkerLocation', {}, WorkerLocation);
    _publicInterface('MSStream', {}, MSStream);
    _publicObject('MSApp', MSApp);
    _publicInterface('ImageData', {}, ImageData);
    _publicInterface('IDBObjectStore', {}, IDBObjectStore);
    _publicInterface('IDBKeyRange', {'bound' : IDBKeyRange.bound,'lowerBound' : IDBKeyRange.lowerBound,'only' : IDBKeyRange.only,'upperBound' : IDBKeyRange.upperBound}, IDBKeyRange);
    _publicInterface('IDBIndex', {}, IDBIndex);
    _publicInterface('IDBFactory', {}, IDBFactory);
    _publicInterface('IDBCursor', {'NEXT' : next,'NEXT_NO_DUPLICATE' : nextunique,'PREV' : prev,'PREV_NO_DUPLICATE' : prevunique}, IDBCursor);
    _publicInterface('FileList', {}, FileList);
    _publicInterface('EventTarget', {}, EventTarget);
    _publicInterface('DOMStringList', {}, DOMStringList);
    _publicInterface('DOMException', {'ABORT_ERR' : 20,'DATA_CLONE_ERR' : 25,'DOMSTRING_SIZE_ERR' : 2,'HIERARCHY_REQUEST_ERR' : 3,'INDEX_SIZE_ERR' : 1,'INUSE_ATTRIBUTE_ERR' : 10,'INVALID_ACCESS_ERR' : 15,'INVALID_CHARACTER_ERR' : 5,'INVALID_MODIFICATION_ERR' : 13,'INVALID_NODE_TYPE_ERR' : 24,'INVALID_STATE_ERR' : 11,'NAMESPACE_ERR' : 14,'NETWORK_ERR' : 19,'NOT_FOUND_ERR' : 8,'NOT_SUPPORTED_ERR' : 9,'NO_DATA_ALLOWED_ERR' : 6,'NO_MODIFICATION_ALLOWED_ERR' : 7,'PARSE_ERR' : 81,'QUOTA_EXCEEDED_ERR' : 22,'SECURITY_ERR' : 18,'SERIALIZE_ERR' : 82,'SYNTAX_ERR' : 12,'TIMEOUT_ERR' : 23,'TYPE_MISMATCH_ERR' : 17,'URL_MISMATCH_ERR' : 21,'VALIDATION_ERR' : 16,'WRONG_DOCUMENT_ERR' : 4}, DOMException);
    _publicInterface('DOMError', {}, DOMError);
    _publicInterface('Console', {}, Console);
    _publicInterface('XMLHttpRequest', XMLHttpRequestCtor , XMLHttpRequest);
    _publicInterface('Worker', WorkerCtor , Worker);
    _publicInterface('WebSocket', WebSocketCtor , WebSocket);
    _publicInterface('MSStreamReader', MSStreamReaderCtor , MSStreamReader);
    _publicInterface('FileReader', FileReaderCtor , FileReader);
    _publicInterface('FileReaderSync', FileReaderSyncCtor , FileReaderSync);
    _publicInterface('MessageChannel', MessageChannelCtor , MessageChannel);
    _publicInterface('MSBlobBuilder', MSBlobBuilderCtor , MSBlobBuilder);
    _publicInterface('Event', EventCtor , Event);
    _publicInterface('Blob', BlobCtor , Blob);

    this.XMLHttpRequest.create = this.XMLHttpRequest;
})();

function _$getActiveXObject(className, location) {
    if ((/XMLHTTP/i).test(className))
        return new window.XMLHttpRequest();
}

// SIG // Begin signature block
// SIG // MIIarQYJKoZIhvcNAQcCoIIanjCCGpoCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFHEEVzkYK2qi
// SIG // jwArzzKJmmUdyp4yoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AACb4HQ3yz1NjS4AAAAAAJswDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE2MDMzMDE5
// SIG // MjEyOVoXDTE3MDYzMDE5MjEyOVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjo3MjhELUM0NUYtRjlFQjEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAI2j4s+Bi9fLvwOiYPY7beLUGLA3BdWNNpwOc85N
// SIG // f6IQsnxDeywYV7ysp6aGfXmhtd4yZvmO/CDNq3N3z3ed
// SIG // b2Cca3jzxa2pvVtMK1WqUoBBQ0FmmaXwMGiGug8hch/D
// SIG // dT+SdsEA15ksqFk/wWKRbQn2ztMiui0An2bLU9HKVjpY
// SIG // TCGyhaOYZYzHiUpFWHurU0CfjGqyBcX+HuL/CqGootvL
// SIG // IY18lTDeMReKDelfzEJwyqQVFG6ED8LC/WwCTJOxTLbO
// SIG // tuzitc2aGhD1SOVXEHfqgd1fhEIycETJyryw+/dIOdhg
// SIG // dUmts79odC6UDhy+wXBydBAOzNtrUB8x6jT6bD0CAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBSWlbGeE1O6WCFGNOJ8
// SIG // xzlKbCDwdzAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAhHbNT6TtG
// SIG // gaH6KhPjWiAkunalO7Z3yJFyBNbq/tKbIi+TCKKwbu8C
// SIG // pblWXv1l9o0Sfeon3j+guC4zMteWWj/DdDnJD6m2utr+
// SIG // EGjPiP2PIN6ysdZdKJMnt8IHpEclZbtS1XFNKWnoC1DH
// SIG // jJWWoF6sNzkC1V7zVCh5cdsXw0P8zWor+Q85QER8LGjI
// SIG // 0oHomSKrIFbm5O8khptmVk474u64ZPfln8p1Cu58lp9Z
// SIG // 4aygt9ZpvUIm0vWlh1IB7Cl++wW05tiXfBOAcTVfkybn
// SIG // 5F90lXF8A421H3X1orZhPe7EbIleZAR/KUts1EjqSkpM
// SIG // 54JutTq/VyYRyHiA1YDNDrtkMIIE7DCCA9SgAwIBAgIT
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
// SIG // L54/LlUWa8kTo/0xggSXMIIEkwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAQosea7XeXumrAAB
// SIG // AAABCjAJBgUrDgMCGgUAoIGwMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRDq1nvqynF
// SIG // 40PgZ2DMhDLg9BCkxTBQBgorBgEEAYI3AgEMMUIwQKAm
// SIG // gCQAZABlAGQAaQBjAGEAdABlAGQAdwBvAHIAawBlAHIA
// SIG // LgBqAHOhFoAUaHR0cDovL21pY3Jvc29mdC5jb20wDQYJ
// SIG // KoZIhvcNAQEBBQAEggEATl4TALie+y/v22tt/S3r5f9d
// SIG // nVpxcJkJE+b1dxJsLz3+ydr16CAbKLUaEDgjKCD1KXzg
// SIG // hs6ll68u8wE+TzhJgjmsolSBJiWb0ort/PulWvBIUand
// SIG // EzfMvDpuigGxjhwJ46z3iAb0zd+j387U0zBbwfgPK+hw
// SIG // 9E0iQoU3+UVLq3kBsXlbGGEq4nZtZZhXP0X8MbNR0ANc
// SIG // ngOwKMpNC5kokzIiKBoO1U27kWq9k0LyIIMGpJTnQ/nz
// SIG // UX7OnQicUDXLsXdCe4o/zJVNXg9fZShnbal/0HdjPCkn
// SIG // AlJaVmS2AU+OeuENBK22Y+9Fffo+KpsFWC4DdoTTr0uq
// SIG // A7PTAG534KGCAigwggIkBgkqhkiG9w0BCQYxggIVMIIC
// SIG // EQIBATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYD
// SIG // VQQDExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMA
// SIG // AACb4HQ3yz1NjS4AAAAAAJswCQYFKw4DAhoFAKBdMBgG
// SIG // CSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcN
// SIG // AQkFMQ8XDTE2MDcyNzA2MDE0OFowIwYJKoZIhvcNAQkE
// SIG // MRYEFDuC1bPq6+DVpANvEYXM6B0GBrX7MA0GCSqGSIb3
// SIG // DQEBBQUABIIBABJqL6OxKOldMDP68dT17E58ch74yy4Y
// SIG // 1bDUhqOKMOJ6n9M6Z+vFePk6TpYeBonZ+ThRiTN3QG00
// SIG // 6znFV0oSvLupKEmokSd1wWgVMjXTD0OcVscUNgj1mZFT
// SIG // TKSslDUFLvXKXjk5kr0Hf/VgwFomgMd99zyGMo4YaVh8
// SIG // gMNjA+B9pQt0gDkoXm/vBgmuK41LmnNhK6bl4WteqV6o
// SIG // Wnke/I9ZrVwpOnfDxpAetty3KcTpOBqSE7l5MSn3F+g/
// SIG // FvGqR0Eiy2gLoCz/ID/xguOKlVs2L1jI7S6djV1vsdwF
// SIG // LFwZMyppuXgygu9jxEy8hV59ozw3JQ45s5ZP3RlTTw2YrWs=
// SIG // End signature block
