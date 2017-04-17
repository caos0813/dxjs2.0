/***
 @desc masajs demo
 @author:liuzhifang
*/
require([], function () {
    // 业务代码 
    var demo = Masa.View({
        el: "#demo1",// 视图上下文
        //页面委托事件
        events: {
          'click #alert': 'alert',
          'click #confirm': 'confirm' 
        },
        Model: {
          data: {
                reportType: 0,
                reportList:[],
                searchText: ''
            }
        },// VUE 的实例，默认不使用
        initialize: function () {
             // 页面运行初始化函数
            var that = this;
            //pager
            that.ininPager();
            that.initGrid();
            // that.onInitRangeSlider();
            that.initAutoComplete();
        },
        alert: function(){
          Masa.ui.alert('弹出内容');
        },
        confirm: function(){
          var reportTitle = '确认框', confirmText = '<p>是否继续操作?</p><span class="check-box"><label><input type="checkbox"  >删除关联</label></span>';
          Masa.ui.confirm(reportTitle, confirmText, function () {

          });
        },
        //Grid
        initGrid: function(){
          var _grid = Masa.ui.createWidget("Grid", "#grid", {
              dataSource: {
                  transport: {
                      name: "deal-statis-simpl1",
                      // url: ""
                      data:function(){
                        return {
                          cityId: 1,
                          pName: "一品",
                          pageNo: 1,
                          pageSize: 20
                        };
                      }
                  }
              },
              // pager: true,
              columns: [
                {title: '序号', field: 'presellId'},
                {title: '项目名', field: 'projectName'},
                {title: '推广名', field: 'promotionName'},
                {title: '许可证名称', field: 'presellName'},
                {title: '成交总面积(万平)', field: 'dealArea'},
                {title: '成交总金额(万元)', field: 'dealAmout'},
                {title: '成交均价(万元/平)', field: 'avgPrice'},
                {
                  title: '操作', 
                  commands: [{
                    name: 'detail',
                    command: function(d){
                      Masa.ui.alert(d.name);
                    }
                  },{
                    name: 'del',
                    command: function(d){
                      Masa.ui.alert(d.name);
                    }
                  }]
                }
              ]
          });
        },
        //pager
        ininPager: function(){
          var pager = Masa.ui.createWidget('Pager', '#pager', {
              dataSource: {
                  transport: {
                      name: "report-list",
                      inShowLoading: true,
                      isCustomerError: false,
                      data: function () {
                          return {
                              reportType: that.Model.reportType,
                          };
                      },
                      parseData: function (d) {
                          return d.data;
                      }
                  }
              },
              autoBind: false,
              pageSize: 20,
              parseTotal: function (d) {
                  return d.totalCount;
              },
              pageIndexField: "pageNo",
              pageSizeField: "pageSize",
              pagerClass: "pagination",
              onPageChange: function () {
                  var data = this.dataSource.getData();
                  if (data) {
                      that.Model.reportList = data;
                  }
              }
          });
        },
        //RangeSlider
        onInitRangeSlider: function(){
          var _rangeSlider = Masa.ui.createWidget("RangeSlider", "#rangeSlider", {
            step: 1,
            splits: [{value:"0",title:"0平米",offset:[-10,0]},
                {value:"20",title:"20平米",offset:[-10,0]},
                {value:"50",title:"50平米",offset:[-10,0]},
                {value:"100",title:"100平米",offset:[-10,0]},
                {value:"150",title:"150平米",offset:[-10,0]},
                {value:"200",title:"200平米",offset:[-10,0]},
                {value:"250",title:"250平米",offset:[-10,0]},
                {value:"300",title:"300平米",offset:[-10,0],width:'80px'}],
            onRangeChange: function(e){
                console.log('onRangeChange' + e.selectValue + ',value:' + e.value);
            },
            onRangeMove: function(e){}
          });
        },
        initAutoComplete: function(){
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
        }
    });
});