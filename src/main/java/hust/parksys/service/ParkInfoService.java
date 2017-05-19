package hust.parksys.service;

import java.util.List;

import hust.parksys.dto.KeyCarParkInfo;
import hust.parksys.dto.ParkFrequency;
import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;
import hust.parksys.entity.ParkDetail;
import hust.parksys.entity.ParkInfo;

public interface ParkInfoService {
	// 标签1
	List<KeyCarParkInfo> selectKeyCars(String startDay, String endDay,
			String parkName);

	// 标签2
	List<ParkDetail> selectByTime(String startDay, String endDay, String timeSlot, String parkName);

	// 标签3
	List<ParkFrequency> selectFreByTime(String startDay, String endDay,
			String parkName);

	// 标签4
	List<CountByDays> selectCountByDays(String startDay, String endDay,
			String parkName);

	// 标签4
	List<CommonMap> selectCountBycar(String startDay, String endDay,
			String parkName);
}