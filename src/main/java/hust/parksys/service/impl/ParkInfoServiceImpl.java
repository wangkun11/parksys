package hust.parksys.service.impl;

import hust.parksys.dao.ParkInfoDao;
import hust.parksys.dto.CarParkInfo;
import hust.parksys.dto.KeyCarParkInfo;
import hust.parksys.dto.ParkFrequency;
import hust.parksys.dto.ParkTimeAndType;
import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;
import hust.parksys.entity.ParkTime;
import hust.parksys.service.ParkInfoService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParkInfoServiceImpl implements ParkInfoService{
	@Autowired
	private ParkInfoDao parkInfoDao;
	
	public List<CarParkInfo> selectByTime(String startDay, String endDay,
			String timeSlot, String parkName) {
		//ymd=2017-03-20 time=12:00-14:00
		String timeStart=startDay+" "+timeSlot.split("-")[0]+":00";
		String timeEnd=endDay+" "+timeSlot.split("-")[1]+":00";
		return parkInfoDao.selectCarParkInfo(timeStart,timeEnd,parkName);
	}
    public List<ParkFrequency> selectFreByTime(String startDay,String endDay,String parkName){
    	startDay+=" 00:00:00";
    	endDay+=" 24:00:00";
    	List<ParkFrequency> list=new ArrayList<ParkFrequency>();
    	for (int i = 0; i < 5; i++) {
			ParkFrequency parkFrequency=new ParkFrequency();
			parkFrequency.setFrequency((i+1)*10);
			list.add(parkFrequency);
		}
    	List<CommonMap> list2=parkInfoDao.selectCountBycar(startDay, endDay,parkName);    	
    	int x1=0;
    	int x2=0;
    	int x3=0;
    	int x4=0;
    	int x5=0;    	
    	for (CommonMap entry : list2) {
			if (entry.getValue2()>=50) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
				list.get(2).setCount(x3++);
				list.get(3).setCount(x4++);
				list.get(4).setCount(x5++);
			} else if (entry.getValue2()>=40) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
				list.get(2).setCount(x3++);
				list.get(3).setCount(x4++);
			}else if (entry.getValue2()>=30) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
				list.get(2).setCount(x3++);
			}else if (entry.getValue2()>=20) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
			}else if (entry.getValue2()>=10) {
				list.get(0).setCount(x1++);
			}
		}
    	return list;
    }
	public List<CountByDays> selectCountByDays(String startDay, String endDay,
			String parkName) {
		startDay+=" 00:00:00";
    	endDay+=" 24:00:00";
    	List<CountByDays> list=parkInfoDao.selectCountByDay(startDay, endDay, parkName);
    	return list;
	}

	public List<CommonMap> selectCountBycar(String startDay, String endDay,
			String parkName) {
		startDay+=" 00:00:00";
    	endDay+=" 24:00:00";
    	return parkInfoDao.selectCountBycar1(startDay, endDay, parkName);
	}

	public List<KeyCarParkInfo> selectKeyCars(String startDay, String endDay,
			String parkName) {
		startDay+=" 00:00:00";
    	endDay+=" 24:00:00";
    	//特殊车辆集合
    	Set<String> set=new HashSet<String>();
    	set.add("鄂AZF408");
    	set.add("鄂A52PY8");
    	set.add("鄂A18306");
    	set.add("鄂A90DY7");
    	set.add("鄂AK7L13");
    	List<CarParkInfo> list1=parkInfoDao.selectCarParkInfo(startDay, endDay, parkName);
    	List<KeyCarParkInfo> list2=new ArrayList<KeyCarParkInfo>();
    	for (CarParkInfo parkDetail : list1) {
			if (set.contains(parkDetail.getCarNum())) {
				KeyCarParkInfo keyCarParkInfo=new KeyCarParkInfo();
				keyCarParkInfo.setCarNum(parkDetail.getCarNum());
				keyCarParkInfo.setRoomNum(parkDetail.getRoomNum());
				keyCarParkInfo.setTel(parkDetail.getTel());
				keyCarParkInfo.setTime(parkDetail.getTimeIn());
				keyCarParkInfo.setType("入口");
				keyCarParkInfo.setParkName(parkDetail.getParkName());
				
				KeyCarParkInfo keyCarParkInfo1=new KeyCarParkInfo();
				keyCarParkInfo1.setCarNum(parkDetail.getCarNum());
				keyCarParkInfo1.setRoomNum(parkDetail.getRoomNum());
				keyCarParkInfo1.setTel(parkDetail.getTel());
				keyCarParkInfo1.setTime(parkDetail.getTimeOut());
				keyCarParkInfo1.setType("出口");
				keyCarParkInfo1.setParkName(parkDetail.getParkName());
				
				list2.add(keyCarParkInfo);
				list2.add(keyCarParkInfo1);
			}
		}
		return list2;
	}
	public List<CarParkInfo> selectSepcialFreDetail(String startDay,
			String endDay, String fre, String parkName) {
		startDay+=" 00:00:00";
    	endDay+=" 24:00:00";
    	Set<String> carNums=new HashSet<String>();
    	int x=Integer.valueOf(fre.trim());
    	List<CommonMap> list2=parkInfoDao.selectCountBycar(startDay, endDay,parkName);    	    	
    	for (CommonMap entry : list2) {
			if (entry.getValue2()>=x) {
				carNums.add(entry.getValue1());
			} 
		}
    	List<CarParkInfo> list=parkInfoDao.selectCarParkInfo(startDay, endDay, parkName);
    	List<CarParkInfo> list1=new ArrayList<CarParkInfo>();
    	for (CarParkInfo carParkInfo : list) {
			if (carNums.contains(carParkInfo.getCarNum())) {
				list1.add(carParkInfo);
			}
		}
		return list1;
	}
	
	public List<ParkTimeAndType> selectParkTimeAndType(String carNum,
			String parkName) {
		List<ParkTimeAndType> list =new ArrayList<ParkTimeAndType>();
		List<ParkTime> list2=parkInfoDao.selectParkTimeByCar(carNum);
		for (ParkTime parkTime : list2) {
			ParkTimeAndType parkTimeAndType=new ParkTimeAndType();
			parkTimeAndType.setTime(parkTime.getTimeIn());
			parkTimeAndType.setType("入口");
			ParkTimeAndType parkTimeAndType1=new ParkTimeAndType();
			parkTimeAndType1.setTime(parkTime.getTimeOut());
			parkTimeAndType1.setType("出口");
			list.add(parkTimeAndType);
			list.add(parkTimeAndType1);
		}
		return list;
	}
}