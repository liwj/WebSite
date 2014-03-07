package com.cst.demo.po;

import java.io.Serializable;

/**
 * @author Administrator
 * 用户角色关系表
 */
public class UserToRole implements Serializable {
	private static final long serialVersionUID = 1L;
	private String relation_id;
	private String user_id;
	private String role_id;
	public UserToRole() {
		super();
	}
	public UserToRole(String relation_id, String user_id, String role_id) {
		super();
		this.relation_id = relation_id;
		this.user_id = user_id;
		this.role_id = role_id;
	}
	public String getRelation_id() {
		return relation_id;
	}
	public void setRelation_id(String relation_id) {
		this.relation_id = relation_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getRole_id() {
		return role_id;
	}
	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}
}
