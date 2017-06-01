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
            alert("日期错误！请重新选择！");
        }else if(endDay==""){
            alert("日期错误！请重新选择！");
        }else if(startDay>endDay){
            alert("查询开始日期不能大于结束日期！请重新选择！");
        }else if(timeSlot==""){
            alert("查询时间段不能为空！请重新选择！");
        }else if(parkName==""){
            alert("查询来源不能为空！请重新选择！");
        }else{
            var data={"startDay":startDay,"endDay":endDay,"timeSlot":timeSlot,"parkName":parkName};
            render_tssd(data);
        }


    });
})










