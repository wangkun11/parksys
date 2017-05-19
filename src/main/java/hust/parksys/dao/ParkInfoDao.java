package hust.parksys.dao;

import hust.parksys.dto.CarParkInfo;
import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;
import hust.parksys.entity.ParkTime;

import java.util.List;

public interface ParkInfoDao {

	// 统计每辆车的进出频度
	List<CommonMap> selectCountBycar(String timeStart, String timeEnd,
			String parkName);
	// 统计每天的停车数量
	List<CountByDays> selectCountByDay(String timeStart, String timeEnd,
			String parkName);
	// 统计每辆车的进出频度	(只返回20条)
	List<CommonMap> selectCountBycar1(String timeStart, String timeEnd,
			String parkName);
	// 车辆的停车信息和车主自身信息
	List<CarParkInfo> selectCarParkInfo(String timeStart, String timeEnd,
			String parkName);
	
	//某一辆车的所有出入记录
	List<ParkTime> selectParkTimeByCar(String carNum);
}