/**
 * 
 */
package hust.parksys.entity;

import java.sql.Date;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
public class ParkTime {
	private Date timeIn;
	private Date timeOut;
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
	
}
