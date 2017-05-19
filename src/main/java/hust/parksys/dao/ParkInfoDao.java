package hust.parksys.dao;

import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;
import hust.parksys.entity.ParkDetail;
import hust.parksys.entity.ParkInfo;

import java.util.List;

public interface ParkInfoDao {

	// 在指定时间段，所有车的进出频度	
	List<Integer> selectFreByTime(String timeStart, String timeEnd,
			String parkName);
	// 统计每天的停车数量	
	List<CountByDays> selectCountByDay(String timeStart, String timeEnd,
			String parkName);
	// 指定日期统计每辆车的进出频度	
	List<CommonMap> selectCountBycar(String timeStart, String timeEnd,
			String parkName);
	// 指定日期车辆的停车信息和自身信息
	List<ParkDetail> selectByTime(String timeStart, String timeEnd,
			String parkName);
}