/**
 * 
 */
package hust.parksys.dto;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
public class DtoPark {
	private String carNum;
	private String time;
	private String type;
	private String parkName;
	
	public String getCarNum() {
		return carNum;
	}
	public void setCarNum(String carNum) {
		this.carNum = carNum;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time.substring(0,19);
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getParkName() {
		return parkName;
	}
	public void setParkName(String parkName) {
		this.parkName = parkName;
	}
	
}
