/**
 * Created by Administrator on 2017/5/18.
 */

$(function(){



    function render_tscl(data){
        $.ajax({
            //cache:false,
            type:'post',
            //url:'http://115.156.208.192:8080/parksys/specialtime',
            //url:'tscl_data.json',
            url:'/parksys/keycar',
            dataType:'json',
            //data:{"startDay":startDay,"endDay":endDay,"parkName":parkName},
            data:''||data,
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
                            var a = '<a class="tscl"  href="#carModal" data-toggle="modal" data-target="#carModal" onclick="loadModal(this,'+"tscl"+')">'+value+'</a>';
                            return a;
                        }
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

    //$("a[name='tscl']").click(function(e){
    //    e.preventDefault();
    //    $("#carModal").modal("hide");
    //    console.log("dddd") ;
    //});


    function render_tssd(data){
        $.ajax({
            //cache:false,
            type:'post',
            //url:'http://115.156.208.192:8080/parksys/specialtime',
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

    function render_tspd(data){
        $.ajax({
            //cache:false,
            type:'post',
            //url:'http://115.156.208.192:8080/parksys/specialtime',
            //url:'tspd_data.json',
            url:'/parksys/sepcialfre',
            dataType:'json',
            data:''||data,
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
            data:''||data,
            success:function(data){
                //console.log(data);
                $('#tspd-table').bootstrapTable({
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
                            var a = '<a class="tspd" href="#carModal" data-toggle="modal" data-target="#carModal" onclick="loadModal(this,'+"tspd"+')">'+value+'</a>';
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

    function render_tytj(data){
        $.ajax({
            //cache:false,
            type:'post',
            //url:'http://115.156.208.192:8080/parksys/specialtime',
            //url:'tytj_data_01.json',
            url:'/parksys/prakcount',
            dataType:'json',
            data:''||data,
            success:function(data){
                var chart=echarts.init(document.getElementById("tytj-chart-01"));
                //var data=JSON.parse(data.res);
                var data1=[];
                var data2=[];
                for(var i=0;i<data.length;i++){
                    data1.push(data[i].day);
                    data2.push(data[i].value);
                }
                lineChart(chart,data1,data2);

            }
        });
        $.ajax({
            //cache:false,
            type:'post',
            //url:'http://115.156.208.192:8080/parksys/specialtime',
            //url:'tytj_data_00.json',
            url:'/parksys/countbycar',
            dataType:'json',
            data:''||data,
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
                bar_Chart(barchart,data1,data2);

            }
        });
    }

    render_tscl();

    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        //console.log(this.getAttribute("data-clicked"));

        var isClicked = this.getAttribute("data-clicked");
        if(this.name == "tscl" && isClicked == "false" ){
            //render tscl
            render_tscl();
        }else if(this.name == "tssd" && isClicked == "false"){
            //render tssd
            render_tssd();
        }else if(this.name == "tspd"&& isClicked == "false"){
            //render tspd
            render_tspd();
        }else if(this.name =="tytj"&& isClicked == "false"){
            //render tytj
            render_tytj();
        }
        this.setAttribute("data-clicked", true);
    });
});