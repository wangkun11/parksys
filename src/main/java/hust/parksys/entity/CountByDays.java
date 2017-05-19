/**
 * 
 */
package hust.parksys.entity;

import java.sql.Date;

/**
 * @author 华中科技大学 王坤 （377816164@qq.com）
 *
 */
public class CountByDays {
	private Date day;
	private Integer value;
	
	public Date getDay() {
		return day;
	}
	public void setDay(Date day) {
		this.day = day;
	}
	public Integer getValue() {
		return value;
	}
	public void setValue(Integer value) {
		this.value = value;
	}
	
}
