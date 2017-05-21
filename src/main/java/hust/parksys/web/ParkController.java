package hust.parksys.web;

import hust.parksys.dto.CarParkInfo;
import hust.parksys.dto.KeyCarParkInfo;
import hust.parksys.dto.ParkFrequency;
import hust.parksys.dto.ParkTimeAndType;
import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;
import hust.parksys.service.CarInfoService;
import hust.parksys.service.ParkInfoService;

import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by lisa on 2016/8/30.
 */
@Controller
// @Service @Compent
public class ParkController {
	private final org.slf4j.Logger logger = LoggerFactory.getLogger(this
			.getClass());
	@Autowired
	private ParkInfoService parkInfoService;
	@Autowired
	private CarInfoService carInfoService;

	@ResponseBody
	@RequestMapping(value = "/keycar")
	// 1、特殊车辆出入记录
	public List<KeyCarParkInfo> selectKeyCars(
			@RequestParam(value = "startDay", defaultValue = "2017-03-20") String startDay,
			@RequestParam(value = "endDay", defaultValue = "2017-03-22") String endDay,
			@RequestParam(value = "parkName", defaultValue = "理想城停车场") String parkName) {
		System.out.println("进入keycar");
		System.out.println(startDay + " " + endDay + " " + parkName);
		List<KeyCarParkInfo> list = parkInfoService.selectKeyCars(startDay,
				endDay, parkName);
		System.out.println(list.size() + " ");
		for (KeyCarParkInfo keyCarParkInfo : list) {
			System.out.println(keyCarParkInfo.toString());
		}
		return list;
	}

	// 2 特殊时段
	@RequestMapping(value = "/specialtime")
	@ResponseBody
	public List<CarParkInfo> specialtime(
			@RequestParam(value = "startDay", defaultValue = "2017-04-05") String startDay,
			@RequestParam(value = "endDay", defaultValue = "2017-04-20") String endDay,
			@RequestParam(value = "timeSlot", defaultValue = "08:00-10:00") String timeSlot,
			@RequestParam(value = "parkName", defaultValue = "理想城停车场") String parkName) {
		// timeStart="2017-03-29 22:39:51";
		// timeEnd="2017-03-30 22:39:51";
		System.out.println("startDay:" + startDay + "endDay:" + endDay
				+ ",timeSlot:" + timeSlot);
		List<CarParkInfo> parkList = parkInfoService.selectByTime(startDay,endDay,
				timeSlot, parkName);
		return parkList;

	}

	// 3特殊频度
	@RequestMapping(value = "/sepcialfre")
	@ResponseBody
	public List<ParkFrequency> sepcialFrequencies(
			@RequestParam(value = "startDay", defaultValue = "2017-03-20") String startDay,
			@RequestParam(value = "endDay", defaultValue = "2017-04-22") String endDay,
			@RequestParam(value = "parkName", defaultValue = "理想城停车场") String parkName) {
		System.out.println("进入sepcialfrequencies");
		System.out.println(startDay + " " + endDay + " " + parkName);
		List<ParkFrequency> list = parkInfoService.selectFreByTime(startDay,
				endDay, parkName);
		return list;
	}
	// 3.1 大于某一频度的所有车辆的详细信息
	@RequestMapping(value = "/sepcialfredetail")
	@ResponseBody
	public List<CarParkInfo> sepcialFreDetail(
			@RequestParam(value = "startDay", defaultValue = "2017-04-15") String startDay,
			@RequestParam(value = "endDay", defaultValue = "2017-04-22") String endDay,
			@RequestParam(value = "fre", defaultValue = "20") String fre,
			@RequestParam(value = "parkName", defaultValue = "理想城停车场") String parkName) {
		System.out.println("进入sepcialfredetail");
		System.out.println(startDay + " " + endDay + " "+fre+ " " + parkName);
		List<CarParkInfo> list = parkInfoService.selectSepcialFreDetail(startDay,
				endDay, fre,parkName);
		System.out.println(list.size());
		return list;
	}

	// 4.1总停车辆
	@RequestMapping(value = "/prakcount")
	@ResponseBody
	public List<CountByDays> prakcount(
			@RequestParam(value = "startDay", defaultValue = "2017-04-12") String startDay,
			@RequestParam(value = "endDay", defaultValue = "2017-04-22") String endDay,
			@RequestParam(value = "parkName", defaultValue = "理想城停车场") String parkName) {
		System.out.println("进入sepcialfrequencies");
		System.out.println(startDay + " " + endDay + " " + parkName);
		List<CountByDays> list = parkInfoService.selectCountByDays(startDay,
				endDay, parkName);
		return list;
	}

	@ResponseBody
	@RequestMapping(value = "/countbycar")
	// 4.2每辆车的频度
	public List<CommonMap> selectCountBycar(
			@RequestParam(value = "startDay", defaultValue = "2017-03-20") String startDay,
			@RequestParam(value = "endDay", defaultValue = "2017-04-22") String endDay,
			@RequestParam(value = "parkName", defaultValue = "理想城停车场") String parkName) {
		System.out.println("进入countbycar");
		System.out.println(startDay + " " + endDay + " " + parkName);
		return parkInfoService.selectCountBycar(startDay, endDay, parkName);
	}
	//通用接口：查询某辆车的所有进出时间
	@ResponseBody
	@RequestMapping(value = "/parktimeandtype")
	public List<ParkTimeAndType> selectParkTimeAndType(
			@RequestParam(value = "carNum", defaultValue = "鄂A92D3D") String carNum,
			@RequestParam(value = "parkName", defaultValue = "理想城停车场") String parkName){
		System.out.println("进入sepcialfrequencies");
		System.out.println(carNum+" "+parkName);
		return parkInfoService.selectParkTimeAndType(carNum,parkName);
	}
}
