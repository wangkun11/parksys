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
            alert("日期错误！请重新选择！");
        }else if(endDay==""){
            alert("日期错误！请重新选择！");
        }else if(startDay>endDay){
            alert("查询开始日期不能大于结束日期！请重新选择！");
        }else if(parkName==""){
            alert("查询来源不能为空！请重新选择！");
        }else{
            $.ajax({
                cache:false,
                type:'post',
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
                    tytjChart01(chart,data1,data2);

                }
            });
        }
    });
});
