/**
 * Created by Administrator on 2017/5/17.
 */

$(function () {
    $("#tssd-btn").click(function(){
        var date=$("#tssd-date").val();
        var timeSlot=$("#tssd-time option:selected").attr('value');
        var parkName=$("#tssd-parkName option:selected").attr('value');
        if(date==""){
            alert("查询日期不能为空！");
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
                data:{"date":date,"timeSlot":timeSlot,"parkName":parkName},
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
                            field: 'carNum',
                            title: '车牌号',
                            align: 'center'
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










