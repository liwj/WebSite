package com.cst.demo.po;

import java.io.Serializable;

/**
 * @author Administrator
 * 用户持久化类
 */
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	private String user_id;
	private String login_name;
	private Integer user_disabled;
	private String user_password;
	private Integer user_isonline;
	private Integer user_logined;
	public User(String login_name,String user_password) {
		this.login_name = login_name;
		this.user_password = user_password;
	}
	public User(String user_id,Integer user_isonline){
		this.user_id = user_id;
		this.user_isonline = user_isonline;
	}
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
	public Integer getUser_disabled() {
		return user_disabled;
	}
	public void setUser_disabled(Integer user_disabled) {
		this.user_disabled = user_disabled;
	}
	public Integer getUser_isonline() {
		return user_isonline;
	}
	public void setUser_isonline(Integer user_isonline) {
		this.user_isonline = user_isonline;
	}
	public Integer getUser_logined() {
		return user_logined;
	}
	public void setUser_logined(Integer user_logined) {
		this.user_logined = user_logined;
	}
	public User() {
		super();
	}
	public String getUser_password() {
		return user_password;
	}
	public void setUser_password(String user_password) {
		this.user_password = user_password;
	}
	
}
