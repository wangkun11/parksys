package hust.parksys.dao;

import java.util.List;

import hust.parksys.entity.CarInfo;
import hust.parksys.entity.CommonMap;

public interface CarInfoDao {
   
	List<CarInfo> selectAllCars();

	int selectKeyCarCount();
	
	int selectAllCarCount();

	List<CarInfo> selectKeyCars();

	void addKeycar(String carNum);

	void delKeycar(String carNum);

	List<CommonMap> selectCarPerProvince();

	List<CommonMap> selectCarPerBlock();

	List<CarInfo> selectBlockCars(String dh);

	String selectRemark(String carNum);

	List<CarInfo> selectDayCars(String timeStart, String timeEnd);

	List<String> selectAllCarNum();

	List<CarInfo> selectProvenceCars(String string);
}