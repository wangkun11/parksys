/**
 * Created by Administrator on 2017/5/18.
 */
$(function () {
    $("#tspd-recentDays").change(function (){
        var today=new Date();
        var lastDay=new Date(new Date()-24*60*60*1000);//取前一天的时间
        var last3Day=new Date(new Date()-3*24*60*60*1000);
        var last7Day=new Date(new Date()-7*24*60*60*1000);
        var last10Day=new Date(new Date()-10*24*60*60*1000);

        var tspd_startDay=$("#tspd-startDay");
        var tspd_endDay=$("#tspd-endDay");

        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var startDay="";
        var endDay = today.getFullYear()+"-"+(month)+"-"+(day) ;
        var index=$('#tspd-recentDays option:selected').index();
        if(index==1){
            day=("0" + lastDay.getDate()).slice(-2);
            month = ("0" + (lastDay.getMonth() + 1)).slice(-2);
            startDay=lastDay.getFullYear()+"-"+(month)+"-"+(day) ;
            //var endDay=date.toLocaleDateString();
            //$("#tspd-endDay").attr("value",endDay); //也可行
            tspd_startDay.val(startDay);
            tspd_endDay.val(endDay);

            tspd_startDay.attr("disabled",true);
            //$("#tssd-startDay").disabled=true; //不起作用
            tspd_endDay.attr("disabled",true);
            //console.log($("#tspd-startDay").val());
        }else if(index==2){
            day=("0" + last3Day.getDate()).slice(-2);
            month = ("0" + (last3Day.getMonth() + 1)).slice(-2);
            startDay=last3Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tspd_startDay.val(startDay);
            tspd_endDay.val(endDay);
            tspd_startDay.attr("disabled",true);
            tspd_endDay.attr("disabled",true);
        }else if(index==3){
            day=("0" + last7Day.getDate()).slice(-2);
            month = ("0" + (last7Day.getMonth() + 1)).slice(-2);
            startDay=last7Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tspd_startDay.val(startDay);
            tspd_endDay.val(endDay);
            tspd_startDay.attr("disabled",true);
            tspd_endDay.attr("disabled",true);
        }else if(index==4){
            day=("0" + last10Day.getDate()).slice(-2);
            month = ("0" + (last10Day.getMonth() + 1)).slice(-2);
            startDay=last10Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tspd_startDay.val(startDay);
            tspd_endDay.val(endDay);
            tspd_startDay.attr("disabled",true);
            tspd_endDay.attr("disabled",true);
        }else{
            tspd_startDay.attr("disabled",false);
            tspd_endDay.attr("disabled",false);
        }

    });

    $("#tspd-btn").click(function(){
        var startDay=$("#tspd-startDay").val();
        var endDay=$("#tspd-endDay").val();
        var recentDays=$("#tspd-recentDays option:selected").attr('value');
        var parkName=$("#tspd-parkName option:selected").attr('value');

        if(startDay==""){
            alert("查询开始日期不能为空！");
        }else if(endDay==""){
            alert("查询结束日期不能为空！");
        }else if(parkName==""){
            alert("查询来源不能为空！");
        }else{
            $.ajax({
                //cache:false,
                type:'post',
                //url:'http://115.156.208.192:8080/parksys/specialtime',
                //url:'tspd_data.json',
                url:'/parksys/sepcialfre',
                dataType:'json',
                data:{"startDay":startDay,"endDay":endDay,"parkName":parkName},
                success:function(data){
                    var barchart=echarts.init(document.getElementById("tspd-chart"));
                    //var data=JSON.parse(data.res);
                    //var data=data.res;
                    var data1=[];
                    var data2=[];
                    for(var i=0;i<data.length;i++){
                        data1.push(data[i].frequency);
                        data2.push(data[i].count);
                    }
                    barChart(barchart,data1,data2);

                }
            });
        }
    });
});

function barChart(chart,data1,data2){
    option = {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',

        color: ['#3398DB'],
        title: {
            top:40,
            text: '特定时段车辆出入库频度统计图',
            left: 'center',
            textStyle: {
                color: '#000'
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            top:'25%',
            right:'20%'
        },
        legend: {
            top:70,
            data:['车辆数量']
        },
        toolbox: {
            show : true,
            top:70,
            right:50,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar',]},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : data1.map(function(item){
                    return '≥'+item;
                }),
                name:'频次',
                axisPointer: {
                    type: 'shadow'
                },
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name:'数量'
            }
        ],
        dataZoom:[
            {
                type: 'inside',
                start: 0,  //dataZoom.start  dataZoom.end 是百分比形式
                end: 100
            }, {
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }
        ],
        series : [
            {
                name:'车辆数量',
                type:'bar',
                data:data2,
                //itemStyle: {
                //    normal: {
                //        color: function(params) {
                //            // build a color map as your need.
                //            var colorList = [
                //                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                //                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                //                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                //            ];
                //            return colorList[params.dataIndex]
                //        }
                //    }
                //}
            }
        ]
    };

    chart.setOption(option);
}