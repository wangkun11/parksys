/**
 * 
 */
package hust.parksys.service.impl;

import hust.parksys.dao.ParkCurrentDao;
import hust.parksys.dto.DtoPark;
import hust.parksys.entity.ParkCurrent;
import hust.parksys.service.ParkCurrentService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.javassist.expr.NewArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
@Service
public class ParkCurrentServiceImpl implements ParkCurrentService{

	@Autowired
	private ParkCurrentDao parkCurrentDao;
	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoCurrentService#deleteByPrimaryKey(java.lang.Integer)
	 */
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoCurrentService#insert(hust.parksys.entity.ParkInfoCurrent)
	 */
	public int insert(ParkCurrent record) {
		// TODO Auto-generated method stub
		return parkCurrentDao.insert(record);
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoCurrentService#insertSelective(hust.parksys.entity.ParkInfoCurrent)
	 */
	public int insertSelective(ParkCurrent record) {
		// TODO Auto-generated method stub
		return 0;
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoCurrentService#selectByPrimaryKey(java.lang.Integer)
	 */
	public ParkCurrent selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoCurrentService#updateByPrimaryKeySelective(hust.parksys.entity.ParkInfoCurrent)
	 */
	public int updateByPrimaryKeySelective(ParkCurrent record) {
		// TODO Auto-generated method stub
		return 0;
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoCurrentService#updateByPrimaryKey(hust.parksys.entity.ParkInfoCurrent)
	 */
	public int updateByPrimaryKey(ParkCurrent record) {
		// TODO Auto-generated method stub
		return 0;
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkInfoCurrentService#selectToDay()
	 */
	public List<DtoPark> selectToDay() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String date=df.format(new Date());
		String timeStart=date+" 00:00:00";
		String timeEnd=date+" 24:00:00";
		return parkCurrentDao.selectToDay(timeStart,timeEnd);
	}

	/* (non-Javadoc)
	 * @see hust.parksys.service.ParkCurrentService#selectToDayKeyCars()
	 */
	public List<DtoPark> selectToDayKeyCars(List<String> carNums) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String date=df.format(new Date());
		String timeStart=date+" 00:00:00";
		String timeEnd=date+" 24:00:00";
		return parkCurrentDao.selectToDayKeyCars(timeStart,timeEnd,carNums);
	}

}
