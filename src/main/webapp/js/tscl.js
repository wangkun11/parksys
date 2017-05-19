/**
 * Created by Administrator on 2017/5/18.
 */
$(function () {
    $("#tscl-recentDays").change(function (){
        var today=new Date();
        var lastDay=new Date(new Date()-24*60*60*1000);//取前一天的时间
        var last3Day=new Date(new Date()-3*24*60*60*1000);
        var last7Day=new Date(new Date()-7*24*60*60*1000);
        var last10Day=new Date(new Date()-10*24*60*60*1000);

        var tscl_startDay=$("#tscl-startDay");
        var tscl_endDay=$("#tscl-endDay");

        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var startDay="";
        var endDay = today.getFullYear()+"-"+(month)+"-"+(day) ;
        var index=$('#tscl-recentDays option:selected').index();
        if(index==1){
            day=("0" + lastDay.getDate()).slice(-2);
            month = ("0" + (lastDay.getMonth() + 1)).slice(-2);
            startDay=lastDay.getFullYear()+"-"+(month)+"-"+(day) ;
            //var endDay=date.toLocaleDateString();
            //$("#tscl-endDay").attr("value",endDay); //也可行
            tscl_startDay.val(startDay);
            tscl_endDay.val(endDay);

            tscl_startDay.attr("disabled",true);
            //$("#tscl-startDay").disabled=true; //不起作用
            tscl_endDay.attr("disabled",true);
            //console.log($("#tscl-startDay").val());
        }else if(index==2){
            day=("0" + last3Day.getDate()).slice(-2);
            month = ("0" + (last3Day.getMonth() + 1)).slice(-2);
            startDay=last3Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tscl_startDay.val(startDay);
            tscl_endDay.val(endDay);
            tscl_startDay.attr("disabled",true);
            tscl_endDay.attr("disabled",true);
        }else if(index==3){
            day=("0" + last7Day.getDate()).slice(-2);
            month = ("0" + (last7Day.getMonth() + 1)).slice(-2);
            startDay=last7Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tscl_startDay.val(startDay);
            tscl_endDay.val(endDay);
            tscl_startDay.attr("disabled",true);
            tscl_endDay.attr("disabled",true);
        }else if(index==4){
            day=("0" + last10Day.getDate()).slice(-2);
            month = ("0" + (last10Day.getMonth() + 1)).slice(-2);
            startDay=last10Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tscl_startDay.val(startDay);
            tscl_endDay.val(endDay);
            tscl_startDay.attr("disabled",true);
            tscl_endDay.attr("disabled",true);
        }else{
            tscl_startDay.attr("disabled",false);
            tscl_endDay.attr("disabled",false);
        }

    });

    $("#tscl-btn").click(function(){
        var startDay=$("#tscl-startDay").val();
        var endDay=$("#tscl-endDay").val();
        var recentDays=$("#tscl-recentDays option:selected").attr('value');
        var parkName=$("#tscl-parkName option:selected").attr('value');

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
                //url:'tscl_data.json',
                url:'/parksys/keycar',
                dataType:'json',
                data:{"startDay":startDay,"endDay":endDay,"parkName":parkName},
                success:function(data){
                    //data = {"res":data}
                    var piechart=echarts.init(document.getElementById("tscl-chart"));
                    //var data=JSON.parse(data.res);
                    //var data=data.res;
                    var data1=[];
                    var data2=[];
                    //for(var i=0;i<data.length;i++){
                    //    data1.push(data[i].frequency);
                    //    data2.push(data[i].count);
                    //}
                    pieChart(piechart,data1,data2);

                    $('#tscl-table').bootstrapTable({
                        cache:false,
                        //data:data,
                        striped: true, //是否显示行间隔色
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
                            field: 'carNum',
                            title: '车牌号',
                            align: 'center'
                        }, {
                            field: 'roomNum',
                            title: '房间号',
                            align: 'center',
                            sortable: true,
                            sortOrder: 'desc',
                        }, {
                            field: 'tel',
                            title: '联系电话',
                            align: 'center'
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
                        },{
                            field: 'parkName',
                            title: '停车场名称',
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
    });
});

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
            data: ['重点车辆','其他车辆']
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
                value: 30,
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
                value: 523,
                name: '其他车辆',
                label: {
                    normal: {
                        formatter: '{d} %',
                        textStyle: {
                            fontSize: 30
                        }
                    }
                },
                //tooltip: {
                //    show: false
                //},
                //itemStyle: {
                //    normal: {
                //        color: '#aaa'
                //    },
                //    emphasis: {
                //        color: '#aaa'
                //    }
                //},
                //hoverAnimation: false
            }]
        }]
    };
    piechart.setOption(option);
}