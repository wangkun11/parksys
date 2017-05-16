/**
 * 
 */
package hust.parksys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hust.parksys.dao.CarInfoDao;
import hust.parksys.entity.CarInfo;
import hust.parksys.service.CarInfoService;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
@Service
public class CarInfoServiceImpl implements CarInfoService {

	@Autowired
	private CarInfoDao carInfoDao;
	public List<CarInfo> selectSpecialcars() {
		return carInfoDao.selectSpecialcars();
	}

}
