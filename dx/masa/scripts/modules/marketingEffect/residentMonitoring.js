/**	
* 到访监测
**/
require(['masa', 'echarts'], function (Masa, echarts) {
    
    var dealfeatureView = Masa.View({
        el:"#container",
        initialize:function()
        {
            this.showMenuVal();
            this.initChart();
            $('.icon-arrrightlight').tooltip();
        },
        initChart:function(){
            var dailyVariation = [], timeVariation = [];
            Masa.getRequest("visitcounts").done(function(d){
            	$.each(d, function(i, n){
            		timeVariation.push(n[0]);
            		dailyVariation.push(n[1]);
            	})
            	
	            var myChart = echarts.init(document.getElementById('chartView'));
	            var options = {
		            tooltip: {
		              trigger: 'item',
		              axisPointer: {
		                show: !0
		              }
		            },
		            toolbox: {
		              show: !0,
		              feature: {
		                saveAsImage: {
		                  show: !0
		                }
		              }
		            },
		            legend: {
		              data: ['客户日到访量变化']
		            },            
		            xAxis: [
		              {
		                type: 'category',
		                axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							rotate: '35',
							interval: 0,
							textStyle: {
								color: 'rgb(0,0,0)'
							}
						},              
		                data: timeVariation
		              }
		            ],
		            yAxis: [
		              {
		                type: 'value',
		                minInterval: 1,
		                name: '',
		                axisTick: {
		                  show: false
		                },                  
		                axisLabel: {
		                  show: !0
		                },   
		                splitLine: {
		                  show: !0
		                }, 
		              }
		            ],
		            noDataLoadingOption: {
		              text: '暂无数据',
		              effect: 'bubble',
		              textStyle: {
		                fontSize: 20
		              }
		            },
		            series: [
		              {
		                name: '客户日到访量变化',
		                type: 'line',
		                data: dailyVariation,
		                tooltip: {
		                  trigger: 'axis',
		                  formatter: function (a) {
		                    return '日期：' + a[0].name
		                  }
		                }
		              }           
		            ]
		        };
		        // myChart.hideLoading(),
		        myChart.setOption(options)
            })
        },
        showMenuVal:function()
        {
            Masa.getRequest("marketdashboard").done(function (d) {
            	var last_month = d.last_month;
            	var last_week = d.last_week;
            	var yesterday = d.yesterday;
            	$("#yesterday number").html(yesterday);
            	$("#yesterday i").attr("data-original-title","前天累计到访客户: "+yesterday+"<br/>环比呈稳定趋势");
            	$("#last_week number").html(last_week);
            	$("#last_week i").attr("data-original-title","大上周累计到访客户: "+last_week+"<br/>环比呈稳定趋势。")
            	$("#last_month number").html(last_month);
            	$("#last_month i").attr("data-original-title","大上个月累计到访客户: "+last_month+"<br/>环比呈稳定趋势。")
                
            });
        }
    
        
    })
    
});