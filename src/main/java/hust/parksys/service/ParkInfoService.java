package hust.parksys.service;

import hust.parksys.dto.CarParkInfo;
import hust.parksys.dto.DtoCar;
import hust.parksys.dto.KeyCarParkInfo;
import hust.parksys.dto.ParkFrequency;
import hust.parksys.dto.ParkTimeAndType;
import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;

import java.util.List;

public interface ParkInfoService {
	// 标签1
	List<KeyCarParkInfo> selectKeyCars(String startDay, String endDay,
			String parkName);

	// 标签2
	List<CarParkInfo> selectByTime(String startDay, String endDay, String timeSlot, String parkName);

	// 标签3
	List<ParkFrequency> selectFreByTime(String startDay, String endDay,
			String parkName);

	// 标签4
	List<CountByDays> selectCountByDays(String startDay, String endDay,
			String parkName);

	// 标签4
	List<CommonMap> selectCountBycar(String startDay, String endDay,
			String parkName);
	// 标签3：详细信息
	List<DtoCar> selectSepcialFreDetail(String startDay, String endDay,
			String fre, String parkName);

	List<ParkTimeAndType> selectParkTimeAndType(String carNum, String parkName);

}