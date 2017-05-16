package hust.parksys.dao;

import java.util.List;

import hust.parksys.entity.CarInfo;

public interface CarInfoDao {
   
	List<CarInfo> selectSpecialcars();
}