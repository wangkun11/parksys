package hust.parksys.service;

import java.util.List;

import hust.parksys.dto.ParkDetail;
import hust.parksys.entity.ParkInfo;

public interface ParkInfoService {
    
	List<ParkInfo> selectAll();

	List<ParkDetail> selectByCarnum(String carnum);

	
	List<ParkDetail> selectByTime(String timeStart, String timeEnd);
}