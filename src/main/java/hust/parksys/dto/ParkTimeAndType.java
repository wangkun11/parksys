/**
 * 
 */
package hust.parksys.dto;

import java.sql.Date;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
public class ParkTimeAndType {
	private Date time;
	private String type;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	
}
