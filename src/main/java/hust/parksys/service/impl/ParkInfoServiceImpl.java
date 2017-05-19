package hust.parksys.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hust.parksys.dao.ParkInfoDao;
import hust.parksys.dto.KeyCarParkInfo;
import hust.parksys.dto.ParkFrequency;
import hust.parksys.entity.CommonMap;
import hust.parksys.entity.CountByDays;
import hust.parksys.entity.ParkDetail;
import hust.parksys.entity.ParkInfo;
import hust.parksys.service.ParkInfoService;

@Service
public class ParkInfoServiceImpl implements ParkInfoService{
	@Autowired
	private ParkInfoDao parkInfoDao;
	
	public List<ParkDetail> selectByTime(String startDay, String endDay,
			String timeSlot, String parkName) {
		//ymd=2017-03-20 time=12:00-14:00
		String timeStart=startDay+" "+timeSlot.split("-")[0]+":00";
		String timeEnd=endDay+" "+timeSlot.split("-")[1]+":00";
		return parkInfoDao.selectByTime(timeStart,timeEnd,parkName);
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
    	List<Integer> list2=parkInfoDao.selectFreByTime(startDay, endDay,parkName);
    	int x1=0;
    	int x2=0;
    	int x3=0;
    	int x4=0;
    	int x5=0;    	
    	for (Integer entry : list2) {
			if (entry>=50) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
				list.get(2).setCount(x3++);
				list.get(3).setCount(x4++);
				list.get(4).setCount(x5++);
			} else if (entry>=40) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
				list.get(2).setCount(x3++);
				list.get(3).setCount(x4++);
			}else if (entry>=30) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
				list.get(2).setCount(x3++);
			}else if (entry>=20) {
				list.get(0).setCount(x1++);
				list.get(1).setCount(x2++);
			}else if (entry>=10) {
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
    	return parkInfoDao.selectCountByDay(startDay, endDay, parkName);
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoService#selectCountBycar(java.lang.String, java.lang.String, java.lang.String)
	 */
	public List<CommonMap> selectCountBycar(String startDay, String endDay,
			String parkName) {
		startDay+=" 00:00:00";
    	endDay+=" 24:00:00";
    	return parkInfoDao.selectCountBycar(startDay, endDay, parkName);
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoService#selectKeyCars(java.lang.String, java.lang.String, java.lang.String)
	 */
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
    	List<ParkDetail> list1=parkInfoDao.selectByTime(startDay, endDay, parkName);
    	List<KeyCarParkInfo> list2=new ArrayList<KeyCarParkInfo>();
    	for (ParkDetail parkDetail : list1) {
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
}