/**
@author:fanyonglonng
@desc 组件
*/
define(['tongcedata', 'bootstrap', 'kendo.all.min', 'kendolanguage', 'kendoCullanguage'], function () {
    var widgets = {},
        createWidget = function (name, options) {
            var widget = widgets[name], view;
            if (!widget) {
                throw "not found widget :" + name;
            }
            view = new widget(options);
            return view;
        },
		Widget = Tc.Class.extend({
		    options: {},
		    events: [],
		    constructor: function () {
		        var that = this, args = Tc._.toArray(arguments);
		        that.__self__ = that.constructor;
		        that.__super__ = that.__self__.__super__;
		        that.widgetid = Tc._.uniqueId(that.widgettype);
		        that.initialize.apply(that, arguments);
		    },
		    parseDataSource: function (dataSource) {
		        return Tc.hasInstanceof(dataSource, Tc.dataSource) ? dataSource : Tc.dataSource(dataSource);
		    },
		    delegateEvents: function (element, name, selector, handler) {
		        var that = this;
		        if (typeof selector == "function") {
		            handler = selector;
		            selector = null;
		        }
		        name = name.split(' ');
		        name = Tc._.map(name, function (n) {
		            return n + "." + that.widgetid;
		        });
		        element.on(name.join(' '), selector, Tc._.bind(handler, this));
		    },
		    destroy: function () {
		        if (this.wrapper) {
		            this.wrapper.off("." + this.widgetid);
		        }
		    },
		    setOptions: function (options) {
		        this.options = Tc.$.extend(true, {}, this.options, options);
		        return this.options;
		    },
		    setEvents: function (events) {
		        var that = this;
		        Tc._.forEach(events, function (handler, name) {
		            that.on(name, handler);
		        });
		    },
		    initialize: function (options) {
		        options = this.setOptions(options);
		        this.setEvents(Tc._.pick(options, this.events));
		        return options;
		    },
		    loadTemplateHtml: function (url) {
		        return Tc.geHtmlTemplate(url);
		    },
		    pixelsParseInt: function (value) {
		        return parseInt(value);
		    }
		});
    kendo.culture("zh-CN");
    Widget.mixin(Tc.Events);
    Tc.extendWidget = function (name, options, staticPro) {
        if (widgets[name]) {
            throw "already exist";
        }
        widgets[name] = Widget.extend(options, staticPro);
        widgets[name].prototype.widgettype = name;
        return widgets[name];
    }
    Tc.extendWidget("Grid", {
        options: {
            url: null,
            data: null,
            pageSize: 15,
            tools: ['select', 'add', 'delete', 'more'],
            headTools: null,
            columns: null,
            checkboxs: false,
            windows: {
                element: "",
                top: 200
            },
            grid: {
                dataSource: {
                    transport: {
                        read: {
                            url: "",
                            dataType: "json",
                            type: "POST"
                        },
                        parameterMap: function (d, operation) {
                            if (operation == "read") {
                                var data = {};
                                data.pageNo = d.page;
                                if (d.sort && d.sort.length) {
                                    data.orderBy = d.sort[0].field + " " + d.sort[0].dir;
                                }
                                Tc.extend(data, Tc._.omit(d, 'page', 'skip', 'take', 'sort'));
                                return data;
                            } else if (d.models) {
                                return { models: kendo.stringify(d.models) };
                            }
                        }
                    },
                    schema: {
                        data: function (d) {return d.retBody.list;},
                        total: function (d) { return d.retBody.totalCount; }
                    },
                    batch: false,
                    serverGrouping: false,
                    aggregate: false,
                    pageSize: 15,
                    serverPaging: true,
                    serverFiltering: false,
                    serverSorting: true
                },
                noRecords: {
                    template: '没有查询到任何记录!'
                },
                autoBind: true,
                resizable: true,
                groupable: false,
                sortable: true,
                editable: false,
                filterable: false,
                selectable: false,// selectable: "multiple,row",
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 10
                }
            }
        },
        initialize: function (options) {
            options = Tc.extend({}, this.options, options);
            options.grid = Tc.extend(true, {}, this.options.grid, options.grid);
            options.windows = Tc.extend(true, {}, this.options.windows, options.windows);
            var that = this, gridOptions;
            that.options = options;
            that.element = $(options.element);
            that.gridOptions = gridOptions = options.grid;
            if (options.url) {
                gridOptions.dataSource.transport.read.url = Tc.config.getUrl(options.url);
            }
            if (options.data) {
                gridOptions.dataSource.transport.read.data = options.data;
            }
            if (options.headTools) {
                gridOptions.toolbar = [{ template: kendo.template($(options.headTools).html()) }];
            }
            gridOptions.dataSource.pageSize = options.pageSize;
            gridOptions.dataSource.requestEnd= function (e) {
                var response = e.response;
                if(response.retStatus!="000")
                {
                    that.grid.options.noRecords.template = "服务器查询出错:" + response.retMsg.replace(/#/g,'\\#');
                    that.grid.noRecordsTemplate = that.grid._noRecordsTmpl();
                    response.retBody = { totalCount: 0, list: [] };
                } else {
                    that.grid.options.noRecords.template = "没有查询到任何记录!";
                }
            }
            if (options.columns) {
                gridOptions.columns = options.columns;
            }
            that._initWindow();
            that._initTools();
            that._buildCheckboxs();
            that.element.kendoGrid(gridOptions);
            that.grid=that.kendo = that.element.data('kendoGrid');

        },
        _buildCheckboxs:function()
        {
            var that = this, options = that.options, gridOptions = that.gridOptions, checoboxid, columns;
            if (options.checkboxs) {
                 checoboxid = that.widgetid + "_checkbox", isCheckboxFu = typeof options.checkboxs == "function";
                 columns = gridOptions.columns, checkboxColumn = {
                    headerTemplate: '<input type="checkbox" class="k-checkbox"  id="' + checoboxid + '"/><label style="margin-bottom:15px;" class="k-checkbox-label"  for="' + checoboxid + '"></label>',
                    width: 50,
                    template: function (e) {
                        if (isCheckboxFu && options.checkboxs(e) === false) {
                            return '<input type="checkbox" disabled="disabled" data-checkbox="' + checoboxid + '" id="' + e.uid + "_cb" + '" class="k-checkbox" /><label style="margin-bottom:15px;" class="k-checkbox-label" for="' + e.uid + "_cb" + '"  ></label>';
                        }
                        return '<input type="checkbox" data-checkbox="' + checoboxid + '" id="' + e.uid + "_cb" + '" class="k-checkbox" /><label style="margin-bottom:15px;" class="k-checkbox-label" for="' + e.uid + "_cb" + '"  ></label>';
                    }
                };
                columns.unshift(checkboxColumn);
                that.element.on("click", "#" + this.widgetid + "_checkbox", function () {
                    var checked = this.checked;
                    that.grid.wrapper.find('[data-checkbox="' + checoboxid + '"]:not([disabled])').prop('checked', checked);
                });
            }
        },
        _getTools:function()
        {
            var that = this, options = that.options,ctools=[], tools = options.tools, templates = that.__self__.templates, icons = templates.icons, template = Tc.template(templates.tools);
            tools = Tc._.forEach(tools, function (t) {
                var btns;
                if (Tc._.isString(t))
                {
                    btns = icons[t];
                    btns && ctools.push({ action: t, text: btns.text, iconClass: btns.iconClass});
                }else if(Tc._.isPlainObject(t)&&t.action)
                {
                    btns = icons[t.action];
                    if (btns)
                    {
                        t = Tc.extend({}, btns, t);
                    }
                    ctools.push(t);
                }
            });
            return template(ctools);
        },
        read: function (options) {
            this.grid.dataSource.read(options);
        },
        refresh:function()
        {
            this.grid.dataSource.read();
        },
        page:function(index)
        {
            this.grid.dataSource.page(index);
        },
        _initTools: function () {
       
            var that = this, options = that.options, gridOptions = that.gridOptions;
            if (options.tools && options.tools.length > 0) {
                elTools = $('<div class="tc-grid-buttons"></div>');
                elTools.html(that._getTools());
                elTools.insertBefore(that.element);
                elTools.on("click", '[data-action]', Tc.bind(function (e) {
                    var element = e.currentTarget, action = element.getAttribute('data-action');
                    this.trigger('on' + Tc._.upperFirst(action), e);
                },that));
                if (gridOptions.selectable) {
                    that.on("onSelect", Tc.bind(that._SelectRow, that));
                }
            }
            that.tooltip = createWidget('Tooltip');
        },
        _SelectRow: function (e) {
            var grid = this.grid;
            var element = $(e.currentTarget), span = element.children(".glyphicon");
            if (span.hasClass("glyphicon-unchecked")) {
                span.removeClass("glyphicon-unchecked").addClass("glyphicon-check");
                grid.select("tr");
            } else {
                span.removeClass("glyphicon-check").addClass("glyphicon-unchecked");
                grid.clearSelection();
            }
        },
        getCheckedRowData: function () {
            var grid = this.grid, rows = grid.wrapper.find('tr:has([data-checkbox]:checked)'), result = [];
            if (rows.length <= 0) {
                return result;
            }
            Tc._.forEach(Tc._.toArray(rows), function (tr) {
                result.push(grid.dataItem(tr));
            })
            return result;
        },
        getSelectedRowData: function () {
            var grid = this.grid, rows = grid.select(), result = [];
            if (rows.length <= 0) {
                return result;
            }
            Tc._.forEach(Tc._.toArray(rows), function (tr) {
                result.push(grid.dataItem(tr));
            })
            return result;
        },
        _initWindow: function () {
            var that = this,options=that.options;
            if (!options.windows.element) {
                return;
            }
            that.infowindow = $(options.windows.element).TcWidget("Window", {
                isOpenAction:false,
                close: function (e) {
                    if (that.isSubmiting) {
                        e.preventDefault();
                    }
                }
            });
            that.infowindow.wrapper.on("click", '.k-edit-buttons>[data-action]', Tc.bind(function (e) {
                var element = e.currentTarget, action = element.getAttribute("data-action");
                if (action == "update") {
                    if (this.isSubmiting) {
                        return;
                    }
                    this.trigger('onUpdate', e);
                } else if (action == "cancel") {
                    if (this.isSubmiting) {
                        return;
                    }
                    this.closeWindow();
                    this.trigger('onCancel', e);
                } else {
                    this.trigger('on' + Tc._.upperFirst(action), e);
                }
            },that));

        },
        submiting: function (text) {
            this.isSubmiting = true;
            this.infowindow.showProgress(true);
        },
        resetSubmit: function (text) {
            this.isSubmiting = false;
            this.infowindow.showProgress(false);
        },
        closeWindow: function () {
            this.infowindow.close();
        },
        openWindow: function (title) {
            this.infowindow.setTitle(title);
            this.infowindow.center();
            this.infowindow.open();
        },
        dataItem:function(tr)
        {
            return this.grid.dataItem(tr);
        },
        getRowData: function (e) {
            var tr = $(e.currentTarget).closest("tr");
            return this.dataItem(tr);
        }
    }, {
        templates: {
            icons: {
                'select': {
                    text: '全选/反选',
                    iconClass: "glyphicon glyphicon-unchecked"
                },
                'add': {
                    text: '新增',
                    iconClass: "glyphicon glyphicon-plus"
                },
                'delete': {
                    text: '删除',
                    iconClass: "glyphicon glyphicon-trash"
                },
                'more': {
                    text: "更多操作",
                    items:[{
                        action: "del",
                        text: '导入'
                    }, {
                        action: "del",
                        text: '导入'
                    }]
                }
            },
            tools: '<%    var data=obj,len=data.length,i=0,item,list,listitem,k=0,btnClass="btn btn-default";    %><%if(len>0){%><%    for(;i<len;i++){                      item=data[i];               list=item.items;               %><%if(list){%><div class="btn-group"><button type="button" class="<%=btnClass%> dropdown-toggle" data-toggle="dropdown"> 更多操作<span class="caret"></span></button><ul class="dropdown-menu" role="menu"><%for(;k<list.length;k++){                       listitem=list[k];                                   %><%if(k>0){%><li class="divider"></li><%}%><li><a href="#" data-action="<%=listitem.action%>"><%if(listitem.iconClass){%><span class="<%=listitem.iconClass%>"></span><%}%><%=listitem.text%></a></li><%}%></ul></div><%}else{%><button class="<%=btnClass%>" type="button" data-action="<%=item.action%>"><%if(item.iconClass){%><span class="<%=item.iconClass%>"></span><%}%><%=item.text%></button><%}%><%}%><%}%>'
        }
    }
	);
    Tc.kendo = kendo;
    Tc.extendWidget('Tooltip', {
        options: {
            delay: 2000,
            position: "top"
        },
        initialize: function (options) {
            this.__super__.initialize.call(this, options);
            var html = '<div class="tooltip ' + this.options.position + '" style="opacity:0;display:none;z-Index:99999"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
            var element = $(html);
            this.element = element;
            element.appendTo(document.body);
        },
        getPostionOffset: function (w, h, l, t, position) {
            var that = this, result = {}, x, y, sw = that.element.outerWidth(), sh = that.element.outerHeight();
            if (position == "top") {
                x = l + ((w - sw) / 2);
                y = t - sh;
            } else if (position == "bottom") {
                x = l + ((w - sw) / 2);
                y = t + h;
            } else if (position == "left") {
                x = l - sw;
                y = t + (h - sh) / 2;
            } else if (position == "right") {
                x = l + w;
                y = t + (h - sh) / 2;
            }
            result.x = Math.max(x, 0);
            result.y = Math.max(y, 0);
            return result;
        },
        show: function (element, text, argOffset) {
            element = $(element);
            argOffset = Tc.extend({ x: 0, y: 0, position: this.options.position }, argOffset);
            this.element.find('.tooltip-inner').html(text);
            this.element.stop();

            this.element.css({
                opacity: 0,
                display: "block"
            });
            var that = this, offsetPos, position = that.options.position, w = element.outerWidth(), h = element.outerHeight(), offset = element.offset();
            offsetPos = that.getPostionOffset(w, h, offset.left, offset.top, argOffset.position);
            that.element.prop('className', "tooltip " + argOffset.position);
            that.element.css({
                left: offsetPos.x + argOffset.x,
                top: offsetPos.y + argOffset.y
            });
            that.element.animate({
                opacity: 1
            }, 500);

            setTimeout(function () {
                that.close();
            }, that.options.delay)
        },
        close: function () {
            var that = this;
            that.element.animate({
                opacity: 0
            }, function () {
                that.element.css('display','none');
            });
        }
    });
    Tc.extendWidget("Window", {
        options: {
            isOpenAction:true,
            title: "About Alvar Aalto",
            visible: false,
            content: "",
            modal: true,
            actions: [
                "Minimize",
                "Maximize",
                "Close"
            ]
        },
        initialize: function (options) {
            options = this.setOptions(options);
            this.element = $(options.element);
            this.window = this.element.kendoWindow(options).data('kendoWindow');
            this.wrapper = this.window.wrapper;
            var that = this;
            if (options.isOpenAction) {
                that.element.on("click", '[data-action]', function (e) {
                    e.preventDefault();
                    that.trigger("on" + Tc._.upperFirst(e.currentTarget.getAttribute("data-action")), e);
                });
            }
        },
        showProgress: function (state)
        {
            kendo.ui.progress(this.wrapper, state)
        },
        center: function () {
            this.window.center();
            return this;
        },
        getEl:function(selector)
        {
            return $(selector, this.element);
        },
        setTop: function (top) {
            var documentWindow = $(window), wrapper = this.wrapper;
            wrapper.css({
                left: documentWindow.scrollLeft() + Math.max(0, (documentWindow.width() - wrapper.width()) / 2),
                top: documentWindow.scrollTop() + top
            });
            return this;
        },
        setTitle: function (title) {
            this.window.title(title);
            return this;
        },
        open: function () {
            this.window.open();
            return this;
        },
        close: function () {
            this.window.close();
            return this;
        }
    });
    Tc.extendWidget("Scrollbar", function () {
        function setContentScroll(y, isWheel) {
            var that = this, wheelstep = 20, delta, cTop, top = parseInt(this.scrollbar.css('top')), maxTop = that.height - that.barHeight, maxScrollHeight = that.scrollHeight - that.height;
            if (isWheel) {
                delta = top + y * wheelstep / 100 * that.barHeight;
                delta = Math.min(Math.max(delta, 0), maxTop);
                y = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
            }
            y = Math.max(y, 0);
            y = Math.min(y, maxTop);

            cTop = y / maxTop * maxScrollHeight;
            this.scrollbar.css("top", y);
            this.element.scrollTop(cTop);
        }

        function wheelscroll(e) {
            if (this.disabledScroll) {
                return;
            }
            if (!this.isHoverWrapper) {
                return;
            }
            var event = e.originalEvent, delta = 0;

            if (event.wheelDelta) {
                delta = -event.wheelDelta / 120;
            }
            if (event.detail) {
                delta = event.detail / 3;
            }
            var currentTarget = $(e.target);
            if (currentTarget.closest('.dx-scrollcontainer').is(this.wrapper)) {
                setContentScroll.call(this, delta, true);
            }
            e.preventDefault();
            e.stopPropagation();
        }
        function scrollbarmousedown(e) {
            this.downbartop = parseFloat(this.scrollbar.css('top'));
            this.pageY = e.pageY;
            this.delegateEvents(this.doc, 'mousemove', scrollbarmousemove);
            this.delegateEvents(this.doc, 'mouseup', scrollbarmouseup);
            e.preventDefault();
        }
        function scrollbarmousemove(e) {
            var top = this.downbartop + e.pageY - this.pageY;
            setContentScroll.call(this, top);
        }
        function scrollbarmouseup(e) {
            this.removeEvents();
        }
        return {
            options: {
                height: '200px',
                width: 'auto',
                alwaysScrollbar: true,
                barColor: '#398ddc',
                barWidth: '6px',
                visibleRail: true,
                disabledWheel: false,
                disabledWheelSelector: null
            },
            initialize: function (options) {
                this.__super__.initialize.call(this, options);
                options = this.options;
                var tagElement = '<div></div>';
                var element = this.element = $(options.element);
                var wrapper = this.wrapper = $(tagElement).addClass('dx-scrollcontainer');
                var scrollbar = this.scrollbar = $(tagElement).addClass('dx-scrollbar');
                var scrollrail = this.scrollrail = $(tagElement).addClass('dx-scrollrail');

                wrapper.css({
                    position: 'relative',
                    width: options.width,
                    height: options.height,
                    overflow: 'hidden'
                });
                element.css({
                    width: options.width,
                    height: options.height,
                    overflow: 'hidden'
                });
                scrollbar.css({
                    "position": "absolute",
                    "top": "0px",
                    "right": "0px",
                    "width": options.barWidth,
                    "border-radius": "3px",
                    "z-index": "99",
                    "background-color": options.barColor
                });
                scrollrail.css({
                    "position": "absolute",
                    "top": "0px",
                    "right": "0px",
                    "width": options.barWidth,
                    "height": "100%",
                    "border-radius": "3px",
                    "z-index": "98",
                    "opacity": 0.1,
                    "background-color": options.barColor
                });
                this.render();
                this.initEvents();

            },
            render: function () {
                this.doc = $(window.document);
                this.element.wrap(this.wrapper);
                this.wrapper = this.element.parent('.dx-scrollcontainer');
                this.scrollbar.appendTo(this.wrapper);
                this.scrollrail.appendTo(this.wrapper);

                this.setBarHeight();
                if (!this.options.visibleRail) {
                    this.scrollrail.hide();
                }
                this.disabledWheelSelector = [];
                if (this.options.disabledWheelSelector) {
                    this.disabledWheelSelector = this.options.disabledWheelSelector.split(',')
                    this.setDisabledWheel();
                }
            },
            setBarHeight: function () {
                var height = this.element.outerHeight(), scrollHeight = this.element[0].scrollHeight, barHeight;
                this.height = height;
                this.scrollHeight = scrollHeight;
                this.barHeight = barHeight = Math.max(height / scrollHeight * height, 30);
                if (scrollHeight > height) {
                    this.scrollbar.height(barHeight);
                    this.showBar();
                } else {
                    this.hideBar();
                }
            },
            showBar: function () {
                this.scrollbar.show();
                if (this.options.visibleRail) {
                    this.scrollrail.show();
                }
                this.disabledScroll = false;
            },
            hideBar: function () {
                this.disabledScroll = true;
                this.scrollbar.hide();
                this.scrollrail.hide();
            },
            setDisabledWheel: function () {
                var that = this;
                Tc._.forEach(this.disabledWheelSelector, function (name) {
                    $(name).hover(function () {
                        that.isHoverWrapper = false;
                    }, function () {
                        that.isHoverWrapper = true;
                    });
                });

            },
            initEvents: function () {
                var that = this;
                that.isHoverWrapper = true;
                that.delegateEvents(that.scrollbar, 'mousedown', scrollbarmousedown);
                that.delegateEvents(that.scrollbar, 'selectstart', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });
                that.wrapper.hover(function (e) {
                    that.isHoverWrapper = true;
                    that.setBarHeight();
                }, function () {
                    that.isHoverWrapper = false;
                    ;
                });
                if (!that.options.disabledWheel) {
                    that.doc.on('mousewheel DOMMouseScroll', $.proxy(wheelscroll, that));
                }

            },
            removeEvents: function () {
                this.doc.off('.' + this.widgetid);
            },
            scrollTop: function (top) {
                setContentScroll.call(this, top);
            }


        };
    }());
    Tc.extendWidget("Dialog", function () {
        var
            isregHtml = /<([a-zA-Z]+?).*?>[\s\S]*<\/\1>/,
            Dialog = Widget.extend({
                options: {
                    title: "",
                    content: "",
                    confirmText: "确定",
                    cancelText: "取消",
                    customScrollbar: null,
                    keyboard: false,
                    backdrop: 'static',
                    show: false,
                    styles: {},
                    hiddenFooter: false,
                    position: 'top',
                    offsetTop: 200,
                    zIndex:100000
                },
                events: ['onConfirm', 'onClose', 'onShown', 'onShow'],
                initialize: function (dialogTemplate, options) {
                    var that = this;
                    that.__super__.initialize.call(that, options);
                    that.dialogTemplate = dialogTemplate;
                    that.init();
                },
                setPosition: function () {
                    var that = this, options = that.options, position = options.position, h = options.offsetTop
                        , doc, w, pt;
                    if (position == 'center') {
                        w = Tc.browser.getWindowSize();
                        pt = (w.h / 2) - h;
                    }
                    if (position == 'top') {
                        pt = h;
                    }
                    that.element.css('top', Math.max(pt, 0));
                },
                init: function () {
                    var that = this, options = that.options;
                    that.on('onShow', that.setPosition);
                    var element = that.element = $(that.dialogTemplate(options)).hide().appendTo('body');
                    element.css('zIndex',options.zIndex);
                    element.on("click", "[data-command]", function (e) {
                        var currentElement = e.currentTarget, command = currentElement.getAttribute("data-command");
                        that._execCommand(command, e);
                        e.preventDefault();
                        e.stopPropagation();
                    });

                    if (options.dialogType == "windows") {
                        that.on("onShown", function (e) {
                            if (this.options.customScrollbar && this.scrollbar) {
                                this.scrollbar.setBarHeight();
                                this.scrollbar.scrollTop(0);
                            }
                        });
                        element.find('.modal-body').css(options.styles);

                        that.content = $(options.content);
                        that.content.hide();
                        that.setContent(that.content);
                        that.content.show();
                    } else if (options.dialogType == "alert") {
                        that.on("onClose", function (e) {
                            that.remove();
                        });

                    } else if (options.dialogType == "confirm") {
                        that.on("onClose", function (e) {
                            this.remove();
                        });
                        that.on("onConfirm", function () {
                            that.off("onClose");
                            that._close();
                        });
                    }
                    if (options.hiddenFooter) {
                        this.hideFooter();
                    }
                    element.on("hidden.bs.modal", function (e) {
                        that.trigger('onClose');
                    });
                    element.on("shown.bs.modal", function (e) {
                        that.trigger('onShown');
                    });
                    element.on("show.bs.modal", function (e) {
                        that.trigger('onShow');
                    });
                    that.element.modal(Tc._.pick(options, "keyboard", "backdrop", "show"));
                },
                addEventListener: function (method, handler) {
                    this.element.on(method, handler);
                },
                remove: function () {
                    this.element.remove();
                    return this;
                },
                _execCommand: function (name, e) {
                    if (this.submitingState) {
                        return;
                    }
                    name = "_" + name;
                    this[name] && this[name](e);
                },
                _confirm: function (e) {
                    this.trigger('onConfirm', e);
                },
                _close: function () {
                    this.hide();
                },
                submiting: function (text) {
                    this.submitingState = true;
                    this.element.find('button[data-command="confirm"]').text(text);
                    return this;
                },
                resetSubmit: function () {
                    this.submitingState = false;
                    this.element.find('button[data-command="confirm"]').text(this.options.confirmText);
                    return this;
                },
                show: function () {
                    this.element.modal('show');
                    return this;
                },
                hide: function () {
                    this.element.modal('hide');
                    return this;
                },
                setContent: function (content) {
                    var that = this;
                    this.element.find('.modal-body').html(content);
                    if (this.options.customScrollbar) {
                        that.scrollbar = $(content).TcWidget('Scrollbar', that.options.customScrollbar);
                    }
                    return this;
                },
                showFooter: function () {
                    this.element.find('.modal-footer').show();
                },
                hideFooter: function () {
                    this.element.find('.modal-footer').hide();
                },
                setFooter: function (content) {
                    this.element.find('.modal-footer').html(content);
                    return this;
                },
                setTitle: function (title) {
                    this.element.find('.modal-title').html(title);
                    return this;
                }
            });
        return {
            initialize: function () {
                var that = this;
                that.dialogTemplate = '<%if(dialogType=="alert"){%><div class="modal fade bs-example-modal-sm"  ><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close"  data-command="close" ><span >&times;</span></button><h4 class="modal-title" ><%-title%></h4></div><div class="modal-body"><%-content%></div><div class="modal-footer btn_1"><button type="button" class="btn btn-primary" data-command="close"><%-confirmText%></button></div></div></div></div><%}else if(dialogType=="confirm"){%><div class="modal fade bs-example-modal-sm" ><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-command="close"><span>&times;</span></button><h4 class="modal-title"><%-title%></h4></div><div class="modal-body"><%-content%></div><div class="modal-footer btn_1"><button type="button" class="btn btn-danger" data-command="close"><%-cancelText%></button><button type="button" class="btn btn-primary" data-command="confirm"><%-confirmText%></button></div></div></div></div><%}else if(dialogType=="windows"){%><div class="modal fade" ><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-command="close"><span>&times;</span></button><h4 class="modal-title"><%-title%></h4></div><div class="modal-body"></div><div class="modal-footer btn_1"><button type="button" data-command="close" class="btn btn-danger" style="min-width:120px" ><%-cancelText%></button><button type="button"   data-command="confirm" class="btn btn-primary" style="min-width:120px"><%-confirmText%></button></div></div></div></div><%}%>';
                that.dialogTemplate = Tc.template(that.dialogTemplate);

            },
            alert: function (title, content, callback) {
                if (typeof content == "function") {
                    callback = content;
                    content = title;
                    title = "";
                }
                if (!content) {
                    content = title;
                    title = "";
                }
                title = title || "温馨提示";
                var that = this, options = { title: title, content: content };
                if (Tc.$.isPlainObject(content)) {
                    options = content;
                }
                options.dialogType = "alert";
                options.show = true;
                callback = callback || function () { };
                return new Dialog(this.dialogTemplate, options).on('onClose', callback);
            },
            confirm: function (title, content, confirmcallback, cancelcallback) {
                if (typeof content == "function") {
                    cancelcallback = confirmcallback;
                    confirmcallback = content;
                    content = title;
                    title = "";
                }
                if (!content) {
                    content = title;
                    title = "";
                }
                title = title || "温馨提示";
                var that = this, options = { title: title, content: content };
                if (Tc.$.isPlainObject(content)) {
                    options = content;
                }
                options.dialogType = "confirm";
                options.show = true;
                confirmcallback = confirmcallback || function () { };
                cancelcallback = cancelcallback || function () { };

                return new Dialog(this.dialogTemplate, options).on('onClose', cancelcallback).on("onConfirm", confirmcallback);
            },
            windows: function (title, content, confirmcallback, cancelcallback) {
                if (typeof content == "function") {
                    cancelcallback = confirmcallback;
                    confirmcallback = content;
                    content = title;
                    title = "";
                }
                if (!content) {
                    content = title;
                    title = "";
                }
                title = title || "温馨提示";
                var that = this, options = { title: title, content: content, confirmCallback: confirmcallback, cancalCallback: cancelcallback };
                if (Tc.$.isPlainObject(content)) {
                    options = content;
                }
                options.dialogType = "windows";
                return new Dialog(this.dialogTemplate, options);
            }

        };
    }());
    Tc.extendWidget("Validator", {
        options: {
        },
        initialize:function(options)
        {
            var element = this.element = $(options.element);
            this.validator=this.kendo = element.kendoValidator(options).data("kendoValidator");
        },
        validate:function()
        {
            return this.validator.validate();
        }

    });
    Tc.extendWidget("DropDownList", {
        options: {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: null,
            index: 0
        },
        initialize: function (options) {
            this.__super__.initialize.call(this,options);
            var element = this.element = $(options.element);
            this.dropDownList=this.kendo = element.kendoDropDownList(this.options).data("kendoDropDownList");
            
        },
        value:function(value)
        {
            return this.dropDownList.value(value);
        },
        addData:function(data)
        {
            this.dropDownList.dataSource.add(data);
        },
        contains:function(model)
        {
            var that = this, view = that.dropDownList.dataSource.data(), index, value = that.dropDownList._value(model);
            return Tc._.findIndex(view, function (d) { return that.dropDownList._value(d) == value; }) != -1;
        },
        change:function(callback)
        {
            this.dropDownList.bind("change", function () {
                var value = this.value();
                callback.call(this,value)
            })
        }

    });
    Tc.extendWidget("TabStrip", {
        options: {
            name: 'TabStrip',
            dataTextField: '',
            dataContentField: '',
            dataImageUrlField: '',
            dataUrlField: '',
            dataSpriteCssClass: '',
            dataContentUrlField: '',
            tabPosition: 'top',
            animation: {
                animation:  {
                    open: {
                        effects: "fadeIn"
                    }
                },
                close: { duration: 200 }
            },
            collapsible: false,
            navigatable: false,
            contentUrls: false,
            scrollable: { distance: 200 }
        },
        initialize:function(options)
        {
            var that = this, element;
            that.__super__.initialize.call(this, options);
            options = that.options;
            that.element = element = $(options.element);
            that.tabStrip = that.kendo = element.kendoTabStrip(options).data("kendoTabStrip");
        },
        get:function()
        {
            return this.tabStrip;
        },
        bind:function()
        {
            this.tabStrip.bind.apply(this.tabStrip, arguments);
        },
        select:function()
        {
            this.tabStrip.select.apply(this.tabStrip, arguments);
        }
    });
    Tc.extendWidget("Tab", {
        options: {
            element: null,
            tabSelector: ".tab-content",
            tabItem: ".nav-tabs>li",
            index: 0,
            selectedClass: "active",
            onTabChange: function () {

            }
        },
        events: ["onTabChange"],
        initialize: function () {
            this.__super__.initialize.apply(this, arguments);
            var that = this, options = that.options;
            that.wrapper = $(options.element);
            that.pages = this.wrapper.find(options.tabSelector);
            that.tabs = this.wrapper.find(options.tabItem);
            that.bindevents();
            that.showTab(options.index);

        },
        bindevents: function () {
            this.delegateEvents(this.wrapper, "click", this.options.tabItem, this._onShowTab);
        },
        _onShowTab: function (e) {
            var element = $(e.currentTarget);
            if (element.hasClass(this.options.selectedClass)) {
                return;
            }
            this.showTab(element.index());
            e.preventDefault();

        },
        getCurrentPage: function (currentIndex) {
            var that = this, options = that.options, pages = that.pages;
            if (currentIndex < pages.length) {
                return pages.eq(currentIndex);
            }
            return null;
        },
        showTab: function (index) {
            this.currentIndex = index;
            this.tabs.eq(index).addClass(this.options.selectedClass).siblings().removeClass(this.options.selectedClass);
            var pageConainer = this.getCurrentPage(index);
            if (pageConainer) {
                this.pages.hide();
                pageConainer.show()
            }
            this.trigger('onTabChange', this.currentIndex, this.getCurrentPage(this.currentIndex));
        }
    });
    Tc.extendWidget("ListViewSelect", {
        options: {
            url: "",
            dataTextField: "text",
            dataValueField: "value",
            selectable: "SINGLE",
            pageSize:10,
            template: '',
            pager:false,
        },
        initialize: function (options)
        {
            var that = this, element;
            that.__super__.initialize.call(that, options);
            options = that.options;
            that.element = element = $(options.element);
            that._template();
            that.listView = createWidget("ListView", { element: element, url: options.url, pageSize: options.pageSize, pager: options.pager, listViewOptions: { template: that.template, selectable: options.selectable } });
            that.kendo = that.listView.kendo;
        },
        _template:function()
        {
            var that = this;
            that.template = that.options.template;
            if (!that.template) {
                that.template = '<div>#:' + that.options.dataTextField + '#</div>';
            }
            that.template = Tc._.isString(that.template) ? Tc.kendo.template(that.template) : that.template;
        },
        value:function()
        {
            var that = this, data = that.getSelectData();
            if (data.length <= 0)
            {
                return null;
            }
            return data[0][that.options.dataValueField];
        },
        getSelectData:function()
        {
            var listView = this.kendo, rows = listView.select(), result = [];
            if (rows.length <= 0) {
                return result;
            }
            Tc._.forEach(Tc._.toArray(rows), function (tr) {
                result.push(listView.dataItem(tr));
            })
            return result;
        }
    });
    Tc.extendWidget("ListView", {
        options: {
            url: "",
            pageSize: 15,
            pager:false,
            listViewOptions: {
                autoBind: true,
                selectable: false,//SINGLE
                navigatable: false,
                template: '',
                altTemplate: '',
                editTemplate: '',
                dataSource: {
                    transport: {
                        read: {
                            url: "",
                            dataType: "json",
                            type: "POST"
                        },
                        parameterMap: function (d, operation) {
                            if (operation == "read") {
                                var data = {};
                                data.pageNo = d.page;
                                if (d.sort && d.sort.length) {
                                    data.orderBy = d.sort[0].field + " " + d.sort[0].dir;
                                }
                                Tc.extend(data, Tc._.omit(d, 'page', 'skip', 'take', 'sort'));
                                return data;
                            } else if (d.models) {
                                return { models: kendo.stringify(d.models) };
                            }
                        }
                    },
                    schema: {
                        data: function (d) { return d.retBody.list; },
                        total: function (d) { return d.retBody.totalCount; }
                    },
                    pageSize: 4,
                    serverPaging: true
                }
            }
        },
        initialize:function(options)
        {
            var that = this, element, listViewOptions;
            that.__super__.initialize.call(that, options);
            options = that.options;
            that.element = element = $(options.element);
            listViewOptions = that.options.listViewOptions;
            if (options.url) {
                listViewOptions.dataSource.transport.read.url = Tc.config.getUrl(options.url);
            }
            listViewOptions.dataSource.pageSize = options.pageSize;
            if (options.pager) {

                listViewOptions.dataSource = new kendo.data.DataSource(listViewOptions.dataSource);
                that.pager = $('<div></div>');
                that.pager.insertAfter(element);
                that.pager.kendoPager({
                    dataSource: listViewOptions.dataSource
                });
            }
    
            that.kendo = element.kendoListView(listViewOptions).data("kendoListView");
        }
    });
    Tc.dialog = createWidget("Dialog");
    $.fn.TcWidget = function (name, options) {
        var widget = $(this).data("TcWidget" + name);
        if (!widget) {
            options = options || {};
            options.element = this;
            widget = createWidget(name, options);
            $(this).data("TcWidget" + name, widget);
        }
        return widget;
    }
    
    return Tc.define({
        widget: createWidget,
        showProgress: function (state)
        {
            kendo.ui.progress($('body'), state)
        }
        
    });
});