/**
 * Created by Administrator on 2017/5/18.
 */
//tytj
function render_preDayCarModal(param){
    //console.log(param.name);
    $("#preDayCarModal").modal('toggle');
    $("#preDayCarModal").find('.modal-title').text(param.name);
    $.ajax({
        cache:false,
        type:'post',
        //url:'preDayCarModal_data.json',
        url:'/parksys/daycardetail',
        dataType:'json',
        data:{'day':param.name},
        success:function(data){
            $('#preDayCar-modal-table').bootstrapTable({
                //cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                //showRefresh:true,//刷新按钮
                showColumns:true,
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field:'carNum',
                    title:'车牌号',
                    align: 'center'
                },{
                    field:'dh',
                    title:'栋号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field:'dyh',
                    title:'单元号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field:'fjh',
                    title:'房间号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'tel',
                    title: '联系电话',
                    align: 'center',
                },{
                    field: 'iskeyCar',
                    title: '重点车辆',
                    align: 'center'
                },{
                    field: 'block',
                    title: '小区',
                    align: 'center'
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#preDayCar-modal-table').bootstrapTable('load',data);
        }
    });
}

function tytjChart01(chart,data1,data2){
    option = {
        color:'#5182e4',
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        //title: {
        //    text: '每天的停车量',
        //    left: 'center',
        //    textStyle: {
        //        color: '#fff'
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
            right:20,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            color:'#999'
        },
        legend: {
            //top:'bottom',
            top:55,
            data:['总停车量'],
            textStyle: {
                color: '#999'
            }
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
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#999',
                        width:1
                    }
                },
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
                    formatter: '{value}',
                    textStyle: {
                        color: '#999'
                    }
                },
                splitLine:{
                    show:false
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    lineStyle:{
                        color:'#999',
                        width:1
                    }
                },
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
                        color:'#5182e4'//'rgb(255, 70, 131)'
                    }
                },
                data:data2
            }
        ]
    };

    chart.setOption(option);
    chart.on('click', render_preDayCarModal);
}

function tytjChart02(chart,data1,data2){
    var data=[];
    var sum=0;
    var HBNum=0;
    for(var i=0;i<data1.length;i++){
        if(data1[i]=='鄂'){
            HBNum=data2[i];
        }
        data.push({value:data2[i],name:data1[i]});
        sum+=data2[i];
    }
    var HBCarPercent=Math.round(HBNum / sum * 10000) / 100.00 + "%";
    option = {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        title: [{
            text: '本省车辆',
            left: '49%',
            top: '40%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#5481E6',
                fontWeight: 'normal',
                fontSize: 30
            }
        },{
            text: HBCarPercent,
            left: '49%',
            top: '50%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 40
            }
        }],
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        toolbox: {
            top:5,
            right:20,
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            orient: 'vertical',
            right: '0%',
            bottom:'4%',
            data: data1,
            textStyle: {
                color: '#999'
            }
        },
        series: [{
            type: 'pie',
            selectedMode: 'single',
            radius: ['60%', '80%'],
            center:['50%','50%'],
            color: ['#FFBBFF','#5482E4','#F88D47','#86D560', '#68228B','#CD8500', '#00E5EE','#7CCD7C','#51b3F0','#9CCC61','#6964de','#41B271','#FF999A','#AF89D6', '#59ADF3','#FF6A6A','#CAFF70', '#FFCC67','#436EEE','#00868B','#5F9EA0','#FF999A','#AF89D6', '#59ADF3'],
            label: {
                normal: {
                    position: 'inner',
                    formatter: '{d}%',
                    textStyle: {
                        color: '#fff',
                        //fontWeight: 'bold',
                        fontSize: 16
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:data,
        }]
    };

    chart.setOption(option);
}

function render_preBlockCarModal(param){
    //console.log(param.name);
    $("#preBlockCarModal").modal('toggle');
    $("#preBlockCarModal").find('.modal-title').text(param.name+'栋');
    $.ajax({
        cache:false,
        type:'post',
        //url:'preBlockCarModal_data.json',
        url:'/parksys/blockcardetail',
        dataType:'json',
        data:{'dh':param.name},
        success:function(data){
            $('#preBlockCar-modal-table').bootstrapTable({
                //cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                //showRefresh:true,//刷新按钮
                showColumns:true,
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field:'carNum',
                    title:'车牌号',
                    align: 'center'
                },{
                    field:'dh',
                    title:'栋号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field:'dyh',
                    title:'单元号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field:'fjh',
                    title:'房间号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'tel',
                    title: '联系电话',
                    align: 'center',
                },{
                    field: 'iskeyCar',
                    title: '重点车辆',
                    align: 'center'
                },{
                    field: 'block',
                    title: '小区',
                    align: 'center'
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#preBlockCar-modal-table').bootstrapTable('load',data);
        }
    });
}

function tytjChart03(chart,data1,data2){
    option = {
        //title: {
        //    text: '特性示例：渐变色 阴影 点击缩放',
        //    subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
        //},
        xAxis: {
            type: 'category',
            name:'栋号',
            data: data1,
            axisLabel: {
                outside: true,
                textStyle: {
                    color: '#999'
                }
            },
            axisPointer: {
                type: 'shadow'
            },
            axisTick: {
                alignWithLabel: true
            },
            axisLine:{
                lineStyle:{
                    color:'#999',
                    width:1
                }
            },
        },
        yAxis: {
            type: 'value',
            name:'数量',
            splitLine: {
                show: false
            },
            axisTick: {
                show: true
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#999',
                    width:1
                }
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter: "{b}栋 <br/> {a}: {c}"
        },
        grid:{
            top:'25%',
            containLabel: true
        },
        legend: {
            //top:'bottom',
            top:55,
            data:['车辆数'],
            textStyle: {
                color: '#999'
            }
        },
        toolbox: {
            top:55,
            right:20,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
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
                type: 'bar',
                name:'车辆数',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data2
            }
        ]
    };

    chart.setOption(option);
    chart.on('click', render_preBlockCarModal);
}

//tscl
function loadTsclCar(param){
    console.log(param.dataIndex);
    if(param.dataIndex==0){
        $("#tsCarModal").modal('toggle');
        $("#tsCarModal").find('.modal-title').text('重点车辆');
        $.ajax({
            cache:false,
            type:'post',
            //url:'importantCar_data.json',
            url:'/parksys/keycardetail',
            dataType:'json',
            //data:{"carNum":carNum,"parkName":parkName},
            success:function(data){
                $('#tsCar-modal-table').bootstrapTable({
                    //cache:false,
                    //data:data,
                    striped: false, //是否显示行间隔色
                    pagination:true,//是否分页
                    //dataField: "res",
                    pageNumber: 1, //初始化加载第一页，默认第一页
                    queryParamsType:'limit',//查询参数组织方式
                    sidePagination:'client',//默认是客户端分页
                    //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                    pageSize:10,//单页记录数
                    pageList:[10,15,20],//分页步进值
                    //showRefresh:true,//刷新按钮
                    showColumns:true,
                    clickToSelect: true,//是否启用点击选中行
                    buttonsAlign:'right',//按钮对齐方式
                    columns: [{
                        //field: 'Number',//可不加
                        title: '序号',//标题  可不加
                        formatter: function (value, row, index) {
                            return index+1;
                        }
                    },{
                        field:'carNum',
                        title:'车牌号',
                        align: 'center'
                    },{
                        field:'dh',
                        title:'栋号',
                        align: 'center',
                        sortable: true,
                        sortOrder: 'desc',
                    },{
                        field:'dyh',
                        title:'单元号',
                        align: 'center',
                        sortable: true,
                        sortOrder: 'desc',
                    },{
                        field:'fjh',
                        title:'房间号',
                        align: 'center',
                        sortable: true,
                        sortOrder: 'desc',
                    },{
                        field: 'tel',
                        title: '联系电话',
                        align: 'center',
                    },{
                        field: 'iskeyCar',
                        title: '重点车辆',
                        align: 'center'
                    },{
                        field: 'block',
                        title: '小区',
                        align: 'center'
                    }],
                    locale:'zh-CN',//中文支持,
                    //responseHandler:function(data){
                    //    //在ajax获取到数据，渲染表格之前，修改数据源
                    //    return data.response.rows;
                    //}
                });
                $('#tsCar-modal-table').bootstrapTable('load',data);

            }
        });
    }
}

function pieChart(piechart,data1,data2){
    option = {
        color:['rgb(194, 53, 49)','rgb(170, 170, 170)'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            top: 20,
            data: [
                {name:'重点车辆',
                textStyle:{
                    color:'#999',
                }},
                {name:'其他车辆',
                textStyle:{
                    color:'#999',
                }}
            ],
        },
        series: [
            {
                name:'重点车辆比例',
                type: 'pie',
                radius: ['45%', '55%'],
                center:['50%','60%'],
                label: {
                    normal: {
                        position: 'center',
                        normal: {
                            formatter: '{b}\n{d}%'
                        }
                    }
                },
                data: [{
                    value: data1,
                    name: '重点车辆',
                    label: {
                        normal: {
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 30
                            }
                        }
                    }
                }, {
                    value: data2-data1,
                    name: '其他车辆',
                    label: {
                        normal: {
                            formatter: ''
                        }
                    }
                },
                    {tooltip: {
                            show: false
                        },
                        label: {
                            normal: {
                                formatter: '总车辆\n'+data2,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 26
                                }
                            }
                        }
                    }]
            }]
    };
    piechart.setOption(option);
    piechart.on('click',loadTsclCar);
}

//tspd
function loadTspdCar(param) {
    var startDay=$("#tspd-startDay").val();
    var endDay=$("#tspd-endDay").val();
    var parkName=$("#tspd-parkName option:selected").attr('value');
    var fre=parseInt(param.name.replace('≥',''));
    //console.log(param.type);
    //console.log(param.name.split('≥'));
    //console.log(fre);
    $.ajax({
        type:'post',

        //url:'tspd_data_02.json',
        url:'/parksys/sepcialfredetail',
        dataType:'json',
        data:{"startDay":startDay,"endDay":endDay,"fre":fre,"parkName":parkName},
        success:function(data){
            //console.log(data);
            $('#tspd-table').bootstrapTable({
                cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                showRefresh:true,//刷新按钮
                showColumns:true,
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field: 'carNum',
                    title: '车牌号',
                    align: 'center',
                    formatter:function(value,row,index){
                        var a = '<a class="tspd" href="#carModal" data-toggle="modal" onclick="loadModal(this,'+"tspd"+')">'+value+'</a>';
                        return a;
                    }
                }, {
                    field: 'roomNum',
                    title: '房屋号',
                    align: 'center'
                }, {
                    field: 'tel',
                    title: '联系电话',
                    align: 'center'
                },{
                    field: 'timeIn',
                    title: '入场时间',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'timeOut',
                    title: '出场时间',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'parkName',
                    title: '停车场名称',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#tspd-table').bootstrapTable('load',data);
        }
    });

}

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
                color: '#999'
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
            data:[
                {name:'车辆数量',
                    textStyle:{
                        color:'#999'
                    }
                }
            ]
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
                },
                axisLine:{
                    lineStyle:{
                        color:'#999',
                        width:1
                    }
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                name:'数量',
                axisLine:{
                    lineStyle:{
                        color:'#999',
                        width:1
                    }
                },
                splitLine:{
                    show:false
                },
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
    chart.on('click', loadTspdCar);
}

//render modal
function render_allCarModal(data){
    $("#allCarModal").modal('toggle');
    $("#allCarModal").find('.modal-title').text(data.carNum);
    $.ajax({
        cache:false,
        type:'post',
        //url:'modal_table_data.json',
        url:'/parksys/parktimeandtype',
        dataType:'json',
        data:''||data,
        success:function(data){
            $('#allCar-modal-table').bootstrapTable({
                //cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                //showRefresh:true,//刷新按钮
                showColumns:true,
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field: 'time',
                    title: '通过时间',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'type',
                    title: '出入口',
                    align: 'center'
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#allCar-modal-table').bootstrapTable('load',data);
        }
    });

    $.ajax({
        cache:false,
        type:'post',
        //url:'isKeyCar_data.json',
        url:'/parksys/iskeycar',
        dataType:'json',
        data:''||data,
        success:function(data){
        	console.log(data);
            if(data==1){
                $("#setKeyCar-btn").text("取消重点车辆");
                $("#setKeyCar-btn").attr("value",1);
            }else{
                $("#setKeyCar-btn").text("设为重点车辆");
                $("#setKeyCar-btn").attr("value",0);
            }
        }
    });
}

//render tscl
function render_tscl(data){
    $.ajax({
        //cache:false,
        type:'post',
        //url:'tscl_pie_data.json',
        url:'/parksys/keycarpercent',
        dataType:'json',
        success:function(data){
            var piechart=echarts.init(document.getElementById("tscl-chart"));
            pieChart(piechart,parseInt(data.keyCarCount),parseInt(data.allCarCount));
        }
    });

    $.ajax({
        //cache:false,
        type:'post',
        //url:'tscl_data.json',
        url:'/parksys/allcars',
        dataType:'json',
        //data:{"startDay":startDay,"endDay":endDay,"parkName":parkName},
        //data:''||data,
        success:function(data){
            $('#tscl-table').bootstrapTable({
                cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                //showRefresh:true,//刷新按钮
                search: true,
                showToggle: true,
                showColumns:true,
                showExport: true,
                exportTypes:['excel','csv','doc','txt'],  //导出文件类型
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                //exportOptions:{
                //    ignoreColumn: [0,1],  //忽略某一列的索引
                //    fileName: '总台帐报表',  //文件名称设置
                //    worksheetName: 'sheet1',  //表格工作区名称
                //    tableName: '总台帐报表',
                //    excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
                //    onMsoNumberFormat: DoOnMsoNumberFormat
                //},
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field: 'carNum',
                    title: '车牌号',
                    align: 'center',
                    formatter:function(value,row,index){
                        //var a = '<span type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">'+value+'</span>';
                        var a = '<a class="tscl"  href="#CarModal" data-toggle="modal" onclick="loadModal(this,'+"tscl"+')">'+value+'</a>';
                        return a;
                    }
                },{
                    field:'dh',
                    title:'栋号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                    formatter:function(value,row,index){
                        var a = '<a class="tscl" href="#CarModal" data-toggle="modal" onclick="render_preBlockCarModal({name:'+value+'})">'+value+'</a>';
                        return a;
                    }
                },{
                    field:'dyh',
                    title:'单元号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field:'fjh',
                    title:'房间号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'tel',
                    title: '联系电话',
                    align: 'center',
                },{
                    field: 'iskeyCar',
                    title: '重点车辆',
                    align: 'center'
                },{
                    field: 'block',
                    title: '小区',
                    align: 'center'
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#tscl-table').bootstrapTable('load',data);
        }
    });

}

$("#setKeyCar-btn").click(function(){
    var carNum=$("#allCarModal").find('.modal-title').text();
    if($("#setKeyCar-btn").attr("value")==1){
        $.ajax({
            cache:false,
            type:'post',
            //url:'delKeyCar_data.json',
            url:'/parksys/delkeycar',
            dataType:'json',
            data:{'carNum':carNum},
            success:function(data){
                $("#setKeyCar-btn").text("设为重点车辆");
                $("#setKeyCar-btn").attr("value",0);
            }
        });
    }else{
        $.ajax({
            cache:false,
            type:'post',
            //url:'addKeyCar_data.json',
            url:'/parksys/addkeycar',
            dataType:'json',
            data:{'carNum':carNum},
            success:function(data){
                $("#setKeyCar-btn").text("取消重点车辆");
                $("#setKeyCar-btn").attr("value",1);
            }
        });
    }

    render_tscl();
});

function render_preCarModal(data){
    $("#preCarModal").modal('toggle');
    $("#preCarModal").find('.modal-title').text(data.carNum);
    $.ajax({
        cache:false,
        type:'post',
        //url:'modal_table_data.json',
        url:'/parksys/parktimeandtype',
        dataType:'json',
        data:''||data,
        success:function(data){
            $('#preCar-modal-table').bootstrapTable({
                //cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                //showRefresh:true,//刷新按钮
                showColumns:true,
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field: 'time',
                    title: '通过时间',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'type',
                    title: '出入口',
                    align: 'center'
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#preCar-modal-table').bootstrapTable('load',data);
        }
    });
}


//load modal
function loadModal(obj,param) {
    //console.log(param);
    //console.log(param.getAttribute('id'));
    //console.log('$(this).val()'+$(obj).text());
    var tabName=param.getAttribute('id');
    var carNum=$(obj).text();
    var parkName='';
    var data={};
    switch (tabName){
        case 'tscl':
            //parkName=$("#tscl-parkName option:selected").attr('value');
            data={'carNum':carNum};
            render_allCarModal(data);
            break;
        case 'tssd':
            parkName=$("#tssd-parkName option:selected").attr('value')
            data={'carNum':carNum,'parkName':parkName};
            render_preCarModal(data);
            break;
        case 'tspd':
            parkName=$("#tspd-parkName option:selected").attr('value')
            ata={'carNum':carNum,'parkName':parkName};
            render_preCarModal(data);
            break;
        default :
            break;
    }
}

//render function
function render_tytj(data1,data2,data3){
    $.ajax({
        //cache:false,
        type:'post',
        //url:'tytj_labeldata01.json',
        url:'/parksys/allcarount',
        dataType:'json',
        success:function(data){
            $("#num1").text(data);
        }
    });

    $.ajax({
        //cache:false,
        type:'post',
        //url:'tytj_labeldata02.json',
        url:'/parksys/allparkcount',
        dataType:'json',
        success:function(data){
            $("#num2").text(data);
        }
    });

    $.ajax({
        //cache:false,
        type:'post',
        //url:'tytj_data_01.json',
        url:'/parksys/prakcount',
        dataType:'json',
        data:''||data1,
        success:function(data){
            var chart=echarts.init(document.getElementById("tytj-chart-01"));
            //var data=JSON.parse(data.res);
            var data1=[];
            var data2=[];
            for(var i=0;i<data.length;i++){
                data1.push(data[i].day);
                data2.push(data[i].value);
            }
            tytjChart01(chart,data1,data2);

        }
    });

    $.ajax({
        //cache:false,
        type:'post',
        //url:'tytj_data_00.json',
        url:'/parksys/carperprovince',
        dataType:'json',
        data:''||data2,
        success:function(data){
            var barchart=echarts.init(document.getElementById("tytj-chart-02"));
            //var data=JSON.parse(data.res);
            var data=data;
            var data1=[];
            var data2=[];
            for(var i=0;i<data.length;i++){
                data1.push(data[i].value1);
                data2.push(data[i].value2);
            }
            tytjChart02(barchart,data1,data2);

        }
    });

    $.ajax({
        //cache:false,
        type:'post',
        //url:'tytj_data_03.json',
        url:'/parksys/carperblock',
        dataType:'json',
        data:''||data3,
        success:function(data){
            var barchart=echarts.init(document.getElementById("tytj-chart-03"));
            //var data=JSON.parse(data.res);
            var data=data;
            var data1=[];
            var data2=[];
            for(var i=0;i<data.length;i++){
                data1.push(data[i].value1);
                data2.push(data[i].value2);
            }
            tytjChart03(barchart,data1,data2);
        }
    });

}



function render_tssd(data){
    $.ajax({
        //cache:false,
        type:'post',
        //url:'tssd_data.json',
        url:'/parksys/specialtime',
        dataType:'json',
        //data:$("#tdsd-form").serialize(),//改了button后，form不再自动提交了
        data:''||data,
        success:function(data){
            //console.log(data);
            $('#tssd-table').bootstrapTable({
                cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                search: true,
                showToggle: true,
                showColumns:true,
                showExport: true,
                exportTypes:['excel','csv','doc','txt'],  //导出文件类型
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field: 'carNum',
                    title: '车牌号',
                    align: 'center',
                    formatter:function(value,row,index){
                        var a = '<a class="tssd" href="#CarModal" data-toggle="modal" onclick="loadModal(this,'+"tssd"+')">'+value+'</a>';
                        return a;
                    }
                }, {
                    field: 'roomNum',
                    title: '房屋号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                }, {
                    field: 'tel',
                    title: '联系电话',
                    align: 'center'
                },{
                    field: 'timeIn',
                    title: '入场时间',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'timeOut',
                    title: '出场时间',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'parkName',
                    title: '停车场名称',
                    align: 'center',
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#tssd-table').bootstrapTable('load',data);
        }
    });
}

function render_tspd(data1,data2){
    $.ajax({
        //cache:false,
        type:'post',
        //url:'tspd_data.json',
        url:'/parksys/sepcialfre',
        dataType:'json',
        data:''||data1,
        success:function(data){
            var barchart=echarts.init(document.getElementById("tspd-chart"));
            //var data=JSON.parse(data.res);
            var data=data;
            var data1=[];
            var data2=[];
            for(var i=0;i<data.length;i++){
                data1.push(data[i].frequency);
                data2.push(data[i].count);
            }
            //barChart(barchart,data1,data2);
            barChart(barchart,data1,data2);

        }
    });

    $.ajax({
        type:'post',

        //url:'tspd_data_02.json',
        url:'/parksys/sepcialfredetail',
        dataType:'json',
        data:''||data2,
        success:function(data){
            //console.log(data);
            $('#tspd-table').bootstrapTable({
                cache:false,
                //data:data,
                striped: false, //是否显示行间隔色
                pagination:true,//是否分页
                //dataField: "res",
                pageNumber: 1, //初始化加载第一页，默认第一页
                queryParamsType:'limit',//查询参数组织方式
                sidePagination:'client',//默认是客户端分页
                //客户端分页是一次性将所有的数据加载到浏览器的缓存中，因此无需服务端进行计算总页数。
                pageSize:10,//单页记录数
                pageList:[10,15,20],//分页步进值
                search: true,
                showToggle: true,
                showColumns:true,
                showExport: true,
                exportTypes:['excel','csv','doc','txt'],  //导出文件类型
                clickToSelect: true,//是否启用点击选中行
                buttonsAlign:'right',//按钮对齐方式
                columns: [{
                    //field: 'Number',//可不加
                    title: '序号',//标题  可不加
                    formatter: function (value, row, index) {
                        return index+1;
                    }
                },{
                    field: 'carNum',
                    title: '车牌号',
                    align: 'center',
                    formatter:function(value,row,index){
                        var a = '<a class="tspd" href="#CarModal" data-toggle="modal" onclick="loadModal(this,'+"tspd"+')">'+value+'</a>';
                        return a;
                    }
                },{
                    field:'dh',
                    title:'栋号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                    formatter:function(value,row,index){
                        var a = '<a class="tspd"  href="#CarModal" data-toggle="modal" onclick="render_preBlockCarModal({name:'+value+'})">'+value+'</a>';
                        return a;
                    }
                },{
                    field:'dyh',
                    title:'单元号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field:'fjh',
                    title:'房间号',
                    align: 'center',
                    sortable: true,
                    sortOrder: 'desc',
                },{
                    field: 'tel',
                    title: '联系电话',
                    align: 'center',
                },{
                    field: 'iskeyCar',
                    title: '重点车辆',
                    align: 'center'
                },{
                    field: 'block',
                    title: '小区',
                    align: 'center'
                }],
                locale:'zh-CN',//中文支持,
                //responseHandler:function(data){
                //    //在ajax获取到数据，渲染表格之前，修改数据源
                //    return data.response.rows;
                //}
            });
            $('#tspd-table').bootstrapTable('load',data);
        }

    });
}

$(function(){

    render_tytj();

    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        //console.log(this.getAttribute("data-clicked"));

        var isClicked = this.getAttribute("data-clicked");

        if(this.name =="tytj"&& isClicked == "false"){
            //render tytj
            render_tytj();
        }else if(this.name == "tscl" && isClicked == "false" ){
            //render tscl
            render_tscl();
        }else if(this.name == "tssd" && isClicked == "false"){
            //render tssd
            render_tssd();
        }else if(this.name == "tspd"&& isClicked == "false"){
            //render tspd
            render_tspd();
        }
        this.setAttribute("data-clicked", true);
    });
});