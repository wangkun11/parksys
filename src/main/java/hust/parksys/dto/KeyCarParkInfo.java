/**
 * 
 */
package hust.parksys.dto;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
public class KeyCarParkInfo {
	private String carNum;
    private String roomNum; 
    private String tel;
    private String time;
    private String type;//出入口
    private String parkName;
	public String getCarNum() {
		return carNum;
	}
	public void setCarNum(String carNum) {
		this.carNum = carNum;
	}
	public String getRoomNum() {
		return roomNum;
	}
	public void setRoomNum(String roomNum) {
		this.roomNum = roomNum;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
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
	@Override
	public String toString() {
		return "KeyCarParkInfo [carNum=" + carNum + ", roomNum=" + roomNum
				+ ", tel=" + tel + ", time=" + time + ", type=" + type
				+ ", parkName=" + parkName + "]";
	}
    
}
