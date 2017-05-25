/**
 * 
 */
package hust.parksys.util;

import hust.parksys.dto.DtoCar;
import hust.parksys.entity.CarInfo;
import hust.parksys.entity.CommonMap;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
public class MyUtil {

	/**
	 * @param carInfos
	 * @return
	 */
	public static List<DtoCar> CarInfoToDtoCar(List<CarInfo> carInfos) {
		List<DtoCar> dtoCars=new ArrayList<DtoCar>();
		for (CarInfo carInfo : carInfos) {
			DtoCar dtoCar=new DtoCar();
			dtoCar.setCarNum(carInfo.getCarNum());
			dtoCar.setTel(carInfo.getTel());
			
			if (carInfo.getRemark()==null||!("1".equals(carInfo.getRemark().trim()))) {
				dtoCar.setIskeyCar("否");
			}else {
				dtoCar.setIskeyCar("是");
			}
			//System.out.println(dtoCar.getIskeyCar());
			dtoCar.setBlock("理想城");
			String string=carInfo.getRoomNum();
			if (string==null) {
				continue;
			}
			String[] temps=string.split("-");			
			String dh="";
			String dyh="";
			String fjh="";
			if (temps.length==3) {
				dh=temps[0];
				dyh=temps[1];
				fjh=temps[2];
			}else if (temps.length==2) {
				dh=temps[0];
				dyh=temps[1].substring(0,1);
				fjh=temps[1].substring(1);
			}else if (temps.length==1) {
				fjh=string;
			}
			dtoCar.setDh(dh);
			dtoCar.setDyh(dyh);
			dtoCar.setFjh(fjh);
			dtoCars.add(dtoCar);
		}
		return dtoCars;
	}

	/**
	 * @param list
	 * @return
	 */
	public static List<CommonMap> clearProvince(List<CommonMap> list) {
		List<CommonMap> list1=new ArrayList<CommonMap>();
		for (CommonMap commonMap : list) {
			CommonMap commonMap2=new CommonMap();
			commonMap2.setValue2(commonMap.getValue2());
			if ("".equals(commonMap.getValue1())||
					"临".equals(commonMap.getValue1())||
					"2".equals(commonMap.getValue1())) {
				continue;
			}else {
				commonMap2.setValue1(commonMap.getValue1());
				list1.add(commonMap2);
			}
		}
		return list1;
	}

	/**
	 * @param list
	 * @return
	 */
	public static List<CommonMap> clearBlock(List<CommonMap> list) {
		List<CommonMap> list1=new ArrayList<CommonMap>();
		Set<String> set=new HashSet<String>();
		set.add("1");
		set.add("2");
		set.add("3");
		set.add("4");
		set.add("5");
		set.add("6");
		set.add("7");
		set.add("8");
		set.add("9");
		for (CommonMap commonMap : list) {
			if (set.contains(commonMap.getValue1())) {
				list1.add(commonMap);
			}
		}
		return list1;
	}

}
