package hust.parksys.service.impl;

import hust.parksys.dao.CarInfoDao;
import hust.parksys.dao.ParkInfoDao;
import hust.parksys.dto.DtoCar;
import hust.parksys.dto.DtoPark;
import hust.parksys.dto.ParkFrequency;
import hust.parksys.dto.ParkTimeAndType;
import hust.parksys.entity.CarInfo;
import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;
import hust.parksys.entity.ParkInfo;
import hust.parksys.entity.ParkTime;
import hust.parksys.service.ParkInfoService;
import hust.parksys.util.MyUtil;

import java.text.SimpleDateFormat;
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
	@Autowired
	private CarInfoDao carInfoDao;
	
	public List<DtoPark> selectByTime(String startDay, String endDay,
			String timeSlot, String parkName) {
		//ymd=2017-03-20 time=12:00-14:00
		String timeStart=startDay+" "+timeSlot.split("-")[0]+":00";
		String timeEnd=endDay+" "+timeSlot.split("-")[1]+":00";
		List<ParkInfo> list=parkInfoDao.selectParkInfoByTime(timeStart,timeEnd,parkName);
		List<DtoPark> list2=new ArrayList<DtoPark>();
		SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd HH:MM:ss");
		for (ParkInfo parkInfo : list) {
			DtoPark dtoPark=new DtoPark();
			dtoPark.setCarNum(parkInfo.getCarNum());
			dtoPark.setTime(df.format(parkInfo.getTimeIn()));
			dtoPark.setType("入口");
			dtoPark.setParkName(parkInfo.getParkName());
			DtoPark dtoPark1=new DtoPark();
			dtoPark1.setCarNum(parkInfo.getCarNum());
			dtoPark1.setTime(df.format(parkInfo.getTimeOut()));
			dtoPark1.setType("出口");
			dtoPark1.setParkName(parkInfo.getParkName());

			list2.add(dtoPark);
			list2.add(dtoPark1);
		}
		return list2;
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

	public List<DtoCar> selectSepcialFreDetail(String startDay,
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
    	List<CarInfo> carInfos=carInfoDao.selectAllCars();
    	List<CarInfo> list1=new ArrayList<CarInfo>();
    	for (CarInfo carInfo : carInfos) {
			if (carNums.contains(carInfo.getCarNum())) {
				list1.add(carInfo);
			}
		}
		return MyUtil.CarInfoToDtoCar(list1);
	}
	
	public List<ParkTimeAndType> selectParkTimeAndType(String carNum,
			String parkName) {
		List<ParkTimeAndType> list =new ArrayList<ParkTimeAndType>();
		List<ParkTime> list2=parkInfoDao.selectParkTimeByCar(carNum);
		SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd HH:MM:ss");
		for (ParkTime parkTime : list2) {
			ParkTimeAndType parkTimeAndType=new ParkTimeAndType();
			parkTimeAndType.setTime(df.format(parkTime.getTimeIn()));
			parkTimeAndType.setType("入口");
			ParkTimeAndType parkTimeAndType1=new ParkTimeAndType();
			parkTimeAndType1.setTime(df.format(parkTime.getTimeOut()));
			parkTimeAndType1.setType("出口");
			list.add(parkTimeAndType);
			list.add(parkTimeAndType1);
		}
		return list;
	}
	
	
}