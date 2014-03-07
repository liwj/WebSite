package com.cst.demo.util;

import java.util.Date;

/**
 * @author Administrator
 * 用户信息
 */
public class UserInfoBean {
	private String user_id;
	private String login_name;
	private String user_name;
	private String user_password;
	private String user_disabled;
	private String user_mobile;
	private String user_email;
	private String user_tel;
	private Integer user_isonline;
	private String dept_name;
	private String update_name;
	private Date updatetime;
	private String role_name;
	private String role_id;
	private Integer dept_id;
	private String updateuserid;
	
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getLogin_name() {
		return login_name;
	}
	public void setLogin_name(String login_name) {
		this.login_name = login_name;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_mobile() {
		return user_mobile;
	}
	public void setUser_mobile(String user_mobile) {
		this.user_mobile = user_mobile;
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
	public Integer getUser_isonline() {
		return user_isonline;
	}
	public void setUser_isonline(Integer user_isonline) {
		this.user_isonline = user_isonline;
	}
	public String getUser_disabled() {
		return user_disabled;
	}
	public void setUser_disabled(String userDisabled) {
		user_disabled = userDisabled;
	}
	public String getDept_name() {
		return dept_name;
	}
	public void setDept_name(String deptName) {
		dept_name = deptName;
	}
	public String getUser_password() {
		return user_password;
	}
	public void setUser_password(String userPassword) {
		user_password = userPassword;
	}
	public String getUpdate_name() {
		return update_name;
	}
	public void setUpdate_name(String updateName) {
		update_name = updateName;
	}
	public Date getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	public String getRole_id() {
		return role_id;
	}
	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}
	public Integer getDept_id() {
		return dept_id;
	}
	public void setDept_id(Integer dept_id) {
		this.dept_id = dept_id;
	}
	public String getUpdateuserid() {
		return updateuserid;
	}
	public void setUpdateuserid(String updateuserid) {
		this.updateuserid = updateuserid;
	}
}
