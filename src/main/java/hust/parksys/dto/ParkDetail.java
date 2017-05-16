/**
 * 
 */
package hust.parksys.dto;

import java.util.Date;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
public class ParkDetail {
	private String carNum;
    private String tollman; 
    private String parkName;   
    private Date timeIn;
    private Date timeOut;
    private String duration;
	public String getCarNum() {
		return carNum;
	}
	public void setCarNum(String carNum) {
		this.carNum = carNum;
	}
	public String getTollman() {
		return tollman;
	}
	public void setTollman(String tollman) {
		this.tollman = tollman;
	}
	public String getParkName() {
		return parkName;
	}
	public void setParkName(String parkName) {
		this.parkName = parkName;
	}
	public Date getTimeIn() {
		return timeIn;
	}
	public void setTimeIn(Date timeIn) {
		this.timeIn = timeIn;
	}
	public Date getTimeOut() {
		return timeOut;
	}
	public void setTimeOut(Date timeOut) {
		this.timeOut = timeOut;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	/**
	 * @param carNum
	 * @param tollman
	 * @param parkName
	 * @param timeIn
	 * @param timeOut
	 * @param duration
	 */
}
