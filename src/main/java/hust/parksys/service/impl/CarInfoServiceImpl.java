/**
 * 
 */
package hust.parksys.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hust.parksys.dao.CarInfoDao;
import hust.parksys.dto.DtoCar;
import hust.parksys.dto.DtoKeyCarPercent;
import hust.parksys.entity.CarInfo;
import hust.parksys.entity.CommonMap;
import hust.parksys.service.CarInfoService;
import hust.parksys.util.MyUtil;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
@Service
public class CarInfoServiceImpl implements CarInfoService {

	@Autowired
	private CarInfoDao carInfoDao;
	public List<DtoCar> selectAllCars() {
		List<CarInfo> carInfos=carInfoDao.selectAllCars();		
		return MyUtil.CarInfoToDtoCar(carInfos);
	}
	
	public DtoKeyCarPercent selectKeycarpercent() {
		int keyCarCount=carInfoDao.selectKeyCarCount();
		int allCarCount=carInfoDao.selectAllCarCount();
		DtoKeyCarPercent dtoKeyCarPercent = new DtoKeyCarPercent();
		dtoKeyCarPercent.setKeyCarCount(keyCarCount+"");
		dtoKeyCarPercent.setAllCarCount(allCarCount+"");
		return dtoKeyCarPercent;
	}

	public List<DtoCar> selectKeycars() {
		List<CarInfo> carInfos=carInfoDao.selectKeyCars();		
		return MyUtil.CarInfoToDtoCar(carInfos);
	}

	public void addKeycar(String carNum) {
		carInfoDao.addKeycar(carNum);		
	}

	public void delKeycar(String carNum) {
		carInfoDao.delKeycar(carNum);		
	}

	public List<CommonMap> selectCarPerProvince() {
		List<CommonMap> list=carInfoDao.selectCarPerProvince();
		return MyUtil.clearProvince(list);
	}
	
	public List<CommonMap> selectCarPerBlock() {
		List<CommonMap> list=carInfoDao.selectCarPerBlock();
		return MyUtil.clearBlock(list);
	}

	public List<DtoCar> selectBlockCarDetail(String dh) {
		List<CarInfo> carInfos=carInfoDao.selectBlockCars(dh+"%");
		return MyUtil.CarInfoToDtoCar(carInfos);
	}

	public String isKeyCar(String carNum) {
		
		String string=carInfoDao.selectRemark(carNum);
		if ("1".equals(string)) {
			return string;
		}else {
			return "0";
		} 
	}

	public List<DtoCar> selectDayCarDetail(String day) {
		String timeStart=day+" 00:00:00";
		String timeEnd=day+" 24:00:00";
		List<CarInfo> carInfos=carInfoDao.selectDayCars(timeStart,timeEnd);
		return MyUtil.CarInfoToDtoCar(carInfos);
	}

}
