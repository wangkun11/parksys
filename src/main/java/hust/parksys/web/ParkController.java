package hust.parksys.web;

import hust.parksys.dto.ParkDetail;
import hust.parksys.entity.CarInfo;
import hust.parksys.service.CarInfoService;
import hust.parksys.service.ParkInfoService;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by lisa on 2016/8/30.
 */
@Controller//@Service @Compent
public class ParkController {
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private ParkInfoService parkInfoService;
    @Autowired
    private CarInfoService carInfoService;
    
    //一：特殊车辆：
    //特殊车辆列表
    @RequestMapping(value = "/specialcars", method = RequestMethod.GET)
    public String specialcars(Model model) {
        //list.jsp+model=ModelAndView
        List<CarInfo> specialcars = carInfoService.selectSpecialcars();
        for (int i = 0; i < specialcars.size(); i++) {
			System.out.println(specialcars.get(i).getCarNum());
		}
        model.addAttribute("specialcars", specialcars);// 前端使用<c:forEach var="cars" items="${specialcars}">获取
        return "hello";//返回显示界面xx.jsp
    }
    //某一辆车的详细出入记录
    @RequestMapping(value = "/specialcars/{carnum}", method = RequestMethod.GET)
    public String datail(@PathVariable("carnum") String carnum, Model model) {
        //查询carnum的parkdetail
    	List<ParkDetail> parkList=parkInfoService.selectByCarnum(carnum);
    	for (int i = 0; i < parkList.size(); i++) {
			System.out.println(parkList.get(i).getCarNum());
		}
        model.addAttribute("parkList", parkList);
        return "hello";
    }

    //特殊时段
    @RequestMapping(value = "/specialtime")
    public String datail(HttpServletRequest request, Model model) {
        //查询carnum的parkdetail
    	String timeStart=request.getParameter("timeStart");
    	String timeEnd=request.getParameter("timeEnd");
    	timeStart="2017-03-29 22:39:51";
    	timeEnd="2017-03-30 22:39:51";
    	List<ParkDetail> parkList=parkInfoService.selectByTime(timeStart,timeEnd);
    	for (int i = 0; i < parkList.size(); i++) {
			System.out.println(parkList.get(i).getCarNum());
		}
        model.addAttribute("parkList", parkList);
        return "hello";
    }
    //特殊频度
}
