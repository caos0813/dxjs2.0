require(['masa', 'echarts'], function (Masa, echarts) {

    Masa.Vue.component('listmenu', Masa.Vue.extend({
        props: ['item', 'index', 'selectedIndex'],
        data: function () {
            return { colors: ['bg-plum', 'bg-blue', 'bg-red', 'bg-green'] }
        },
        methods: {
            getColor: function (index) {
                var len = this.colors.length, i = Math.floor(index / 2) % len;
                return this.colors[i] + (index == this.selectedIndex ? ' active' : '');
            }
        },
        template: '<div class="col-lg-6 col-md-6 col-sm-6" ><listmenutwochild :item="item" :class="getColor(index)"></listmenutwochild></div>',
    }));
    Masa.Vue.component('listmenuchild',  Masa.Vue.extend({
        template: '<div class="item-btn"> <div class="desc">{{item[3]}}</div><div class="three-desc">    <p><strong>{{item[0]}}</strong><span>中位数</span></p>  <p><strong>{{item[1]}}</strong><span>平均数</span></p></div></div>',
    }));
    Masa.Vue.component('listmenutwochild', Masa.Vue.extend({
        props: ['item'],
        template: '<div class="item-btn" ><div class="desc">{{item[3]}}</div><div class="sec-desc">{{item[2]}}</div></div>',
    }));
    var dealfeatureView = Masa.View({
        el: '#container',
        Model:{
            data: {
                selectedIndex:0,
                listMenu: []
            },
            methods: {
                showChart:function(index)
                {
                    this.selectedIndex = index;
                    dealfeatureView.showChart(index);
                }
            }
        },
        initialize:function()
        {
            this.showLeftMenu();
            this.initChart();
        },
        initChart:Masa._.once(function(){
            var myChart = echarts.init(document.getElementById('chartView'));
            this.chartOptions = {
                 title: {
                     text: '客户年龄统计',
                     left: 'left',
                     textStyle: {
                         color: '#008B8B',
                         fontWeight: 'normal'
                     }
                 },
                 tooltip: {
                     trigger: 'item',
                     formatter: "{a} <br/>{b}: {c} ({d}%)"
                 },
                 series: [
                     {
                         name: '家庭结构',
                         type: 'pie',
                         radius: [0, '75%'],
                         color: ['rgb(23,144,207)', 'rgb(27,178,216)', 'rgb(153,210,221)', 'rgb(136,178,187)', 'rgb(28,112,153)', 'rgb(3,140,196)'],
                         avoidLabelOverlap: false,
                         labelLine: {
                             normal: {
                                 length: 30,
                                 length2: 20
                             }
                         },
                         data: [
                             { value: 0.6, name: '20岁以下' },
                             { value: 5.06, name: '20-29岁' },
                             { value: 2.98, name: '30-39岁' },
                             { value: 77.98, name: '40-49岁' },
                             { value: 11.76, name: '50-59岁' },
                             { value: 1.64, name: '60岁以上' }
                         ]
                     }
                 ]
             };
          
             this.myChart = myChart;
        }),
        parseChartOptions:function(d)
        {
            
            var chartOptions = this.chartOptions, data = Masa._.map(d, function (item) { return { value: item.data, name: item.label }; });
            chartOptions.series[0].data = data;
            return chartOptions;
        },
        showChart:function(index)
        {
            var that = this, item = that.Model.listMenu[index], id = item[4];
            that.myChart.showLoading();
            Masa.getRequest("dealclientList", { data: { labelTypeId: id } }).done(function (d) {
                that.myChart.setOption(that.parseChartOptions(d));
            }).always(function () {
               that.myChart.hideLoading();
            });
        },
        showLeftMenu:function()
        {
            var that = this;
            Masa.getRequest("dealclientStatis").done(function (d) {
                that.Model.listMenu = d;
                that.showChart(0);
            });
        }
    });

});