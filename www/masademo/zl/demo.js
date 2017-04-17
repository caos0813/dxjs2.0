// Demo

    var DemoView = Masa.View({
        el: 'body',
        events: {
            'click #alertBtn': "onAlert",
            'click #confirmBtn': "onConfirm",
            'click #customBtn': "onCustom"
        },
        Model: {
            data: {
                reportType: 0,
                searchText: '',
                eventCount: 1
            }
        },
        initialize: function(){
            this.onGridAndPager();
            this.onAutoComplete();

        },
        // Grid & Pager
        onGridAndPager: function () {
            var dataSource = {
                transport: {
                    name: "report-log",
                    data: {
                        reportId: 15
                    },
                    parseData:function(d)
                    {
                        return Masa._.map(d.data, function (i,index) {
                            i.$index = index+1;
                            return i;
                        });
                    }
                }
            };
            var grid = Masa.ui.createWidget('Grid', '#grid', {
                dataSource: dataSource,
                pager: {
                    parseTotal:function(d)
                    {
                        return d.totalCount;
                    },
                    pageSize: 3,
                    pageIndexField: "pageNo",
                    pageSizeField: "pageSize"
                },
                // 需要显示的表格内容
                columns: [
                    {
                        title: "序号",
                        width: "10%",
                        field: "$index"
                    },
                    {
                        title: "修改人",
                        width: "15%",
                        field: "userName"
                    },
                    {
                        title: "修改时间",
                        field: "updTime"
                    }
                ]
            });
            this.grid = grid;
        },
        // 警告提示框
        onAlert: function () {
            Masa.ui.alert('Tips!');
        },
        // 确认提示框
        onConfirm: function () {
            Masa.ui.confirm('是否取消?');
        },
        // 自定义模态框
        onCustom: function () {
            Masa.ui.confirm({
                title: "删除报告",
                content: '<p>该报告有一个未发布版本,是否继续操作?</p><span class="check-box"><label><input type="checkbox"  >删除已发布版本和副本</label></span>',
                styles: {
                    width:'350px'
                },
                confirmText: "确认删除!",
                cancelText: "取消删除!"
            },
            function(){ // 确认回调函数
                Masa.ui.alert('确认删除');
            },
            function(){ // 取消回调函数
                Masa.ui.alert('取消删除');
            });
        },
        // autoComplete
        onAutoComplete: function () {
            var that = this;
            var autoComplete = Masa.ui.createWidget('AutoComplete','#inputSearch', {
                source: {
                    transport: {
                        name: "dealProjectList",
                        data: function(){
                            return {
                                cityId: 1,
                                pName: that.Model.searchText
                            }
                        },
                        parseData: function (d) {
                            return d;
                        }
                    }
                },
                isKey:true,
                serverFilter: true,
                dataValueField: "projectName",
                template: '<div class="auto-complete-container" style="top:47px;z-index:100;"></div>',
                itemTemplate: '<li data-command="getSearch"><p><strong><%=projectName%></strong><span><%=districtName%></span></p></li>',
                emptyMessage: '<li style="color:red"><p>没有您查询的项目</p></li>',
                errorMessage: '<li style="color:red"><p>请求错误</p></li>'
            });
            this.autoComplete = autoComplete;
        },



    })

