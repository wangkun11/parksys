/**
 * Created by Administrator on 2017/5/17.
 */

$(function () {
    $("#tssd-recentDays").change(function (){
        var today=new Date();
        var lastDay=new Date(new Date()-24*60*60*1000);//取前一天的时间
        var last3Day=new Date(new Date()-3*24*60*60*1000);
        var last7Day=new Date(new Date()-7*24*60*60*1000);
        var last10Day=new Date(new Date()-10*24*60*60*1000);

        var tssd_startDay=$("#tssd-startDay");
        var tssd_endDay=$("#tssd-endDay");

        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var startDay="";
        var endDay = today.getFullYear()+"-"+(month)+"-"+(day) ;
        var index=$('#tssd-recentDays option:selected').index();
        if(index==1){
            day=("0" + lastDay.getDate()).slice(-2);
            month = ("0" + (lastDay.getMonth() + 1)).slice(-2);
            startDay=lastDay.getFullYear()+"-"+(month)+"-"+(day) ;
            tssd_startDay.val(startDay);
            tssd_endDay.val(endDay);
            tssd_startDay.attr("disabled",true);
            tssd_endDay.attr("disabled",true);
        }else if(index==2){
            day=("0" + last3Day.getDate()).slice(-2);
            month = ("0" + (last3Day.getMonth() + 1)).slice(-2);
            startDay=last3Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tssd_startDay.val(startDay);
            tssd_endDay.val(endDay);
            tssd_startDay.attr("disabled",true);
            tssd_endDay.attr("disabled",true);
        }else if(index==3){
            day=("0" + last7Day.getDate()).slice(-2);
            month = ("0" + (last7Day.getMonth() + 1)).slice(-2);
            startDay=last7Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tssd_startDay.val(startDay);
            tssd_endDay.val(endDay);
            tssd_startDay.attr("disabled",true);
            tssd_endDay.attr("disabled",true);
        }else if(index==4){
            day=("0" + last10Day.getDate()).slice(-2);
            month = ("0" + (last10Day.getMonth() + 1)).slice(-2);
            startDay=last10Day.getFullYear()+"-"+(month)+"-"+(day) ;
            tssd_startDay.val(startDay);
            tssd_endDay.val(endDay);
            tssd_startDay.attr("disabled",true);
            tssd_endDay.attr("disabled",true);
        }else{
            tssd_startDay.attr("disabled",false);
            tssd_endDay.attr("disabled",false);
        }

    });

    $("#tssd-btn").click(function(){
        var startDay=$("#tssd-startDay").val();
        var endDay=$("#tssd-endDay").val();
        var timeSlot=$("#tssd-time option:selected").attr('value');
        var parkName=$("#tssd-parkName option:selected").attr('value');
        if(startDay==""){
            alert("查询开始日期不能为空！");
        }else if(endDay==""){
            alert("查询结束日期不能为空！");
        }else if(timeSlot==""){
            alert("查询时间段不能为空！");
        }else if(parkName==""){
            alert("查询来源不能为空！");
        }else{
            //console.log("timeSlot="+timeSlot);
            $.ajax({
                //cache:false,
                type:'post',
                //url:'http://115.156.208.192:8080/parksys/specialtime',
                //url:'tssd_data.json',
                url:'/parksys/specialtime',
                dataType:'json',
                //data:$("#tdsd-form").serialize(),//改了button后，form不再自动提交了
                data:{"startDay":startDay,"endDay":endDay,"timeSlot":timeSlot,"parkName":parkName},
                success:function(data){
                    //console.log(data);
                    $('#tssd-table').bootstrapTable({
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
                                var a = '<a class="tssd" href="#carModal" data-toggle="modal" data-target="#carModal" onclick="loadModal(this,'+"tssd"+')">'+value+'</a>';
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
                    $('#tssd-table').bootstrapTable('load',data);
                }
            });
        }


    });
})










