package com.cst.demo.po;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Administrator
 * 用户基本信息表
 */
public class UserInfo implements Serializable {
	private static final long serialVersionUID = 7702472148379777894L;
	private String userinfo_id;
	private String user_id;
	private Integer dept_id;
	private String user_name;
	private String user_email;
	private String user_tel;
	private String user_mobile;
	private String updateuserid;
	private Date updatetime;
	public UserInfo() {
		super();
	}
	public UserInfo(String userinfo_id, String user_id, Integer dept_id,
			String user_name, String user_email, String user_tel,
			String user_mobile, String updateuserid, Date updatetime) {
		super();
		this.userinfo_id = userinfo_id;
		this.user_id = user_id;
		this.dept_id = dept_id;
		this.user_name = user_name;
		this.user_email = user_email;
		this.user_tel = user_tel;
		this.user_mobile = user_mobile;
		this.updateuserid = updateuserid;
		this.updatetime = updatetime;
	}
	public String getUserinfo_id() {
		return userinfo_id;
	}
	public void setUserinfo_id(String userinfo_id) {
		this.userinfo_id = userinfo_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public Integer getDept_id() {
		return dept_id;
	}
	public void setDept_id(Integer dept_id) {
		this.dept_id = dept_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public String getUser_tel() {
		return user_tel;
	}
	public void setUser_tel(String user_tel) {
		this.user_tel = user_tel;
	}
	public String getUser_mobile() {
		return user_mobile;
	}
	public void setUser_mobile(String user_mobile) {
		this.user_mobile = user_mobile;
	}
	public String getUpdateuserid() {
		return updateuserid;
	}
	public void setUpdateuserid(String updateuserid) {
		this.updateuserid = updateuserid;
	}
	public Date getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
}
