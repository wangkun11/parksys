package hust.parksys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hust.parksys.dao.ParkInfoDao;
import hust.parksys.dto.ParkDetail;
import hust.parksys.entity.ParkInfo;
import hust.parksys.service.ParkInfoService;

@Service
public class ParkInfoServiceImpl implements ParkInfoService{
	@Autowired
	private ParkInfoDao parkInfoDao;
	
	public List<ParkInfo> selectAll() {
		
		return parkInfoDao.selectAll();
	}

	public List<ParkDetail> selectByCarnum(String carnum) {
		return parkInfoDao.selectByCarnum(carnum);
	}

	public List<ParkDetail> selectByTime(String timeStart, String timeEnd) {
		return parkInfoDao.selectByTime(timeStart,timeEnd);
	}
   
}