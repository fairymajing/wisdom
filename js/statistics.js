/**
 * Created by majing on 2017/11/2.
 */
$(document).ready(function() {
    $(".statistics-header").load("../../views/common/public.html #home-header");
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
    option = {
        title: {
            text: '阶段正确率曲线',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['个人正确率','班级正确率']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['7-21','7-22','7-23','7-24','7-25']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} %',

            }

        },
        series: [
            {
                name:'个人正确率',
                type:'line',
                data:[49, 52, 50, 45, 55, 53, 50],
            },
            {
                name:'班级正确率',
                type:'line',
                data:[52, 48, 53, 49, 48, 50, 51],
            }
        ]
    };
// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})
