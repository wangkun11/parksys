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
            alert("日期错误！请重新选择！");
        }else if(endDay==""){
            alert("日期错误！请重新选择！");
        }else if(startDay>endDay){
            alert("查询开始日期不能大于结束日期！请重新选择！");
        }else if(parkName==""){
            alert("查询来源不能为空！请重新选择！");
        }else{
            var data1={"startDay":startDay,"endDay":endDay,"parkName":parkName};
            render_tspd(data1);
        }
    });

});


