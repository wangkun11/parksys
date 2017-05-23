package hust.parksys.service;

import java.util.List;

import hust.parksys.dto.DtoCar;
import hust.parksys.dto.DtoKeyCarPercent;
import hust.parksys.entity.CarInfo;
import hust.parksys.entity.CommonMap;

public interface CarInfoService {
	
	List<DtoCar> selectAllCars();

	DtoKeyCarPercent selectKeycarpercent();

	List<DtoCar> selectKeycars();

	void addKeycar(String carNum);

	void delKeycar(String carNum);

	List<CommonMap> selectCarPerProvince();

	List<CommonMap> selectCarPerBlock();

	List<DtoCar> selectBlockCarDetail(String dh);
}