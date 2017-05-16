package hust.parksys.service;

import java.util.List;

import hust.parksys.entity.CarInfo;

public interface CarInfoService {
	//安装指定规则查询特殊车辆
	List<CarInfo> selectSpecialcars();
}