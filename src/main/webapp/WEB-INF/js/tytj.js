/**
 * Created by Administrator on 2017/5/18.
 */
$(function () {
    $("#tytj-recentDays-01").change(function (){
        var today=new Date();
        var lastDay=new Date(new Date()-24*60*60*1000);//取前一天的时间
        var last3Day=new Date(new Date()-3*24*60*60*1000);
        var last7Day=new Date(new Date()-7*24*60*60*1000);
        var last10Day=new Date(new Date()-10*24*60*60*1000);

        var tytj_startDay=$("#tytj-startDay-01");
        var tytj_endDay=$("#tytj-endDay-01");

        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var startDay="";
        var endDay = today.getFullYear()+"-"+(month)+"-"+(day) ;
        var index=$('#tytj-recentDays-01 option:selected').index();
        if(index==1){
            day=("0" + lastDay.getDate()).slice(-2);
            month = ("0" + (lastDay.getMonth() + 1)).slice(-2);
            startDay=lastDay.getFullYear()+"-"+(month)+"-"+(day) ;
            //var endDay=date.toLocaleDateString();
            //$("#tytj-endDay").attr("value",endDay); //也可行
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);

            tytj_startDay.attr("disabled",true);
            //$("#tytj-startDay").disabled=true; //不起作用
            tytj_endDay.attr("disabled",true);
            //console.log($("#tspd-startDay").val());
        }else if(index==2){
            day=("0" + last3Day.getDate()).slice(-2);
            month = ("0" + (last3Day.getMonth() + 1)).slice(-2);
            startDay=last3Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);
            tytj_startDay.attr("disabled",true);
            tytj_endDay.attr("disabled",true);
        }else if(index==3){
            day=("0" + last7Day.getDate()).slice(-2);
            month = ("0" + (last7Day.getMonth() + 1)).slice(-2);
            startDay=last7Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);
            tytj_startDay.attr("disabled",true);
            tytj_endDay.attr("disabled",true);
        }else if(index==4){
            day=("0" + last10Day.getDate()).slice(-2);
            month = ("0" + (last10Day.getMonth() + 1)).slice(-2);
            startDay=last10Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);
            tytj_startDay.attr("disabled",true);
            tytj_endDay.attr("disabled",true);
        }else{
            tytj_startDay.attr("disabled",false);
            tytj_endDay.attr("disabled",false);
        }

    });

    $("#tytj-btn-01").click(function(){
        var startDay=$("#tytj-startDay-01").val();
        var endDay=$("#tytj-endDay-01").val();
        var recentDays=$("#tytj-recentDays-01 option:selected").attr('value');
        var parkName=$("#tytj-parkName-01 option:selected").attr('value');

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
                //url:'tytj_data_01.json',
                url:'/parksys/prakcount',
                dataType:'json',
                data:{"startDay":startDay,"endDay":endDay,"parkName":parkName},
                success:function(data){
                    var chart=echarts.init(document.getElementById("tytj-chart-01"));
                    //var data=JSON.parse(data.res);
                    //var data=data.res;
                    var data1=[];
                    var data2=[];
                    for(var i=0;i<data.length;i++){
                        data1.push(data[i].day);
                        data2.push(data[i].value);
                    }
                    lineChart(chart,data1,data2);

                }
            });
        }
    });

    $("#tytj-recentDays-02").change(function (){
        var today=new Date();
        var lastDay=new Date(new Date()-24*60*60*1000);//取前一天的时间
        var last3Day=new Date(new Date()-3*24*60*60*1000);
        var last7Day=new Date(new Date()-7*24*60*60*1000);
        var last10Day=new Date(new Date()-10*24*60*60*1000);

        var tytj_startDay=$("#tytj-startDay-02");
        var tytj_endDay=$("#tytj-endDay-02");

        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var startDay="";
        var endDay = today.getFullYear()+"-"+(month)+"-"+(day) ;
        var index=$('#tytj-recentDays-02 option:selected').index();
        if(index==1){
            day=("0" + lastDay.getDate()).slice(-2);
            month = ("0" + (lastDay.getMonth() + 1)).slice(-2);
            startDay=lastDay.getFullYear()+"-"+(month)+"-"+(day) ;
            //var endDay=date.toLocaleDateString();
            //$("#tytj-endDay").attr("value",endDay); //也可行
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);

            tytj_startDay.attr("disabled",true);
            //$("#tytj-startDay").disabled=true; //不起作用
            tytj_endDay.attr("disabled",true);
            //console.log($("#tspd-startDay").val());
        }else if(index==2){
            day=("0" + last3Day.getDate()).slice(-2);
            month = ("0" + (last3Day.getMonth() + 1)).slice(-2);
            startDay=last3Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);
            tytj_startDay.attr("disabled",true);
            tytj_endDay.attr("disabled",true);
        }else if(index==3){
            day=("0" + last7Day.getDate()).slice(-2);
            month = ("0" + (last7Day.getMonth() + 1)).slice(-2);
            startDay=last7Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);
            tytj_startDay.attr("disabled",true);
            tytj_endDay.attr("disabled",true);
        }else if(index==4){
            day=("0" + last10Day.getDate()).slice(-2);
            month = ("0" + (last10Day.getMonth() + 1)).slice(-2);
            startDay=last10Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tytj_startDay.val(startDay);
            tytj_endDay.val(endDay);
            tytj_startDay.attr("disabled",true);
            tytj_endDay.attr("disabled",true);
        }else{
            tytj_startDay.attr("disabled",false);
            tytj_endDay.attr("disabled",false);
        }

    });

    $("#tytj-btn-02").click(function(){
        var startDay=$("#tytj-startDay-02").val();
        var endDay=$("#tytj-endDay-02").val();
        var recentDays=$("#tytj-recentDays-02 option:selected").attr('value');
        var parkName=$("#tytj-parkName-02 option:selected").attr('value');

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
                //url:'tytj_data_00.json',
                url:'/parksys/countbycar',
                dataType:'json',
                data:{"startDay":startDay,"endDay":endDay,"parkName":parkName},
                success:function(data){
                    var barchart=echarts.init(document.getElementById("tytj-chart-02"));
                    //var data=JSON.parse(data.res);
                    //var data=data.res;
                    var data1=[];
                    var data2=[];
                    for(var i=0;i<data.length;i++){
                        data1.push(data[i].value1);
                        data2.push(data[i].value2);
                    }
                    bar_Chart(barchart,data1,data2);

                }
            });
        }
    });
});

function lineChart(chart,data1,data2){
    option = {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        //title: {
        //    text: title,
        //    left: 'center',
        //    textStyle: {
        //        color: '#000'
        //    }
        //},
        tooltip: {
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
            containLabel: true
        },
        toolbox: {
            top:55,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            //top:'bottom',
            top:55,
            data:['总停车量']
        },
        xAxis: [
            {
                type: 'category',
                name:'日期',
                scale:true,
                data: data1,
                axisPointer: {
                    type: 'shadow'
                },
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '数量',
                //min:0,
                //max: 250,
                //interval: 50,
                scale:true,
                //boundaryGap: ['10%', '100%'],
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine:{
                    show:false
                },
                axisTick: {
                    alignWithLabel: true
                }
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
        series: [
            {
                name:'总停车量',
                type:'line',
                //smooth:true,
                itemStyle:{
                    normal:{
                        color:'#ff9933'//'rgb(255, 70, 131)'
                    }
                },
                data:data2
            }
        ]
    };

    chart.setOption(option);
}

function bar_Chart(chart,data1,data2){
    option = {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        //title: {
        //    text: title,
        //    left: 'center',
        //    textStyle: {
        //        color: '#000'
        //    }
        //},
        color: ['#3398DB'],
        tooltip: {
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
            containLabel: true
        },
        toolbox: {
            top:55,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            //top:'bottom',
            top:55,
            data:['停车频次']
        },
        xAxis: [
            {
                type: 'category',
                name:'车牌号',
                scale:true,
                data: data1,
                axisPointer: {
                    type: 'shadow'
                },
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '次数',
                //min:0,
                //max: 250,
                //interval: 50,
                scale:true,
                //boundaryGap: ['10%', '100%'],
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine:{
                    show:false
                },
                axisTick: {
                    alignWithLabel: true
                }
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
        series: [
            {
                name:'停车频次',
                type:'bar',
                //smooth:true,
                //itemStyle:{
                //    normal:{
                //        color:'#ff9933'//'rgb(255, 70, 131)'
                //    }
                //},
                data:data2
            }
        ],
        label: {
            normal: {
                show: true,
                position: 'top',
                formatter: '{c}'
            }
        },
        itemStyle: {
            normal: {

                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(17, 168,171, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(17, 168,171, 0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        }
    };

    chart.setOption(option);
}